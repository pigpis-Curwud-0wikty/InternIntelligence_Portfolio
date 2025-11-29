const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error("MongoDB connection error:", error);
        // Do not exit process in serverless environment
        // process.exit(1); 
    }
}

module.exports = connectDB;