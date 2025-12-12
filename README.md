# Session Authentication

A Node.js application demonstrating user authentication using Express sessions with MongoDB for session storage.

## Features

- User registration and login
- Session-based authentication
- Password hashing with bcrypt
- Data validation with Joi
- EJS templating for views
- MongoDB integration with Mongoose
- Session persistence with connect-mongo

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Express-session with MongoDB store
- **Password Security**: Bcrypt
- **Validation**: Joi
- **Templating**: EJS
- **Dev Tools**: Nodemon

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Session-authentication
```

2. Install dependencies:
```bash
npm install
```

3. Ensure MongoDB is running on your local machine:
```bash
mongod
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:<PORT>` (default port configured in index.js).

## Project Structure

```
├── index.js                 # Main application file
├── package.json             # Project dependencies
├── config/
│   └── db.js               # Database configuration
├── models/
│   └── user.model.js       # User schema and model
├── validation/
│   └── validator.js        # Joi validation schemas
└── views/
    ├── login.ejs           # Login page
    ├── register.ejs        # Registration page
    ├── profile.ejs         # User profile page
    └── partials/
        └── header.ejs      # Header partial template
```

## Available Scripts

- `npm start` - Start the application
- `npm run dev` - Start with nodemon for development
- `npm test` - Run tests 

## API Endpoints

- `GET /` - Home page
- `GET /register` - Register page
- `POST /register` - Handle user registration
- `GET /login` - Login page
- `POST /login` - Handle user login
- `GET /profile` - User profile (protected route)
- `GET /logout` - Logout user

## Configuration

The application uses the following default configurations:

- **MongoDB**: `mongodb://127.0.0.1:27017/sessionDB`
- **Session Secret**: `mysecretkey` (change in production)
- **Session Collection**: `sessions`

## Security Notes

⚠️ **Important**: Before deploying to production:
- Change the session secret to a strong, random string
- Use environment variables for sensitive configuration
- Enable HTTPS
- Set secure cookie options in session middleware
- Use a production-grade database

## License

ISC
