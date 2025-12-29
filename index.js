import express from 'express';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import { registerSchema, loginSchema } from './validation/validator.js';
import bcrypt from 'bcrypt';
import connectDB from './config/db.js';
import User from './models/user.model.js'
import csurf from 'csurf';



const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongoUrl: 'mongodb://127.0.0.1:27017/sessionDB',
        collectionName: 'sessions'
    }),
}))

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return;
    }
    try {
        await mongoose.connect('mongodb+srv://hasnain:hasnain@cluster0.tmydcen.mongodb.net/?appName=Cluster0/sessionDB');
        isConnected = true;
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
};

app.use(async (req, res, next) => {
    if (!isConnected) {
        await connectDB();
    }
    next();
});

const csrfProtection = csurf({ cookie: false });

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/login');
    }
};

app.get('/', (req, res) => {
    if (req.session.user) {
        return res.send(`Welcome back, ${req.session.user.name}`);
    }

    res.send("Welcome to the Home Page");
});

app.get('/register', csrfProtection, (req, res) => {
    if (req.session.user) {
        return res.redirect('/profile')
    }
    res.render('register', { errors: null, csrfToken: req.csrfToken() });
});

app.post('/register', csrfProtection, async (req, res) => {

    try {
        await registerSchema.validateAsync(req.body);
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        req.session.user = user;
        res.redirect('/profile');
    } catch (error) {
        console.log(error);
        res.render('register', { errors: error.details[0]?.message, csrfToken: req.csrfToken() });
    }
});

app.get('/login', csrfProtection, (req, res) => {
    if (req.session.user) {
        return res.redirect('/profile')
    }
    res.render('login', { error: null, csrfToken: req.csrfToken() });
});

app.post('/login', csrfProtection, async (req, res) => {
    try {
        await loginSchema.validateAsync(req.body);
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if (!user) return res.render('login', { error: 'User not found' })
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.render('login', { error: 'Invalid credentials' })

        req.session.user = { name: user.name, email: user.email };
        res.redirect('/profile');
    } catch (error) {
        if (error.details) {
            return res.render('login', { error: error.details[0].message, csrfToken: req.csrfToken() });
        }
        res.status(500).send('Server error');
    }
});


app.get('/profile', isAuthenticated, (req, res) => {
    if (!req.session.user) {
        res.redirect('/login')
    }
    res.render('profile', { user: req.session.user });
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});



// connectDB()
// .then(()=> {
//     app.listen(3000, () => {
//         console.log('Server is running on port 3000');
        
//     })
// });