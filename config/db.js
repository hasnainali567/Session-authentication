import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://hasnain:hasnain@cluster0.tmydcen.mongodb.net/?appName=Cluster0/sessionDB');
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);

    }
}

export default connectDB;