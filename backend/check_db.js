const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
const result = dotenv.config({ path: path.join(__dirname, '.env') });

if (result.error) {
    console.error('Error loading .env file:', result.error);
} else {
    console.log('.env file loaded successfully');
}

const uri = process.env.MONGO_URI;
console.log('MONGO_URI:', uri ? uri.substring(0, 20) + '...' : 'undefined');

if (!uri) {
    console.error('MONGO_URI is not defined in .env');
    process.exit(1);
}

console.log('Attempting to connect to MongoDB...');
mongoose.connect(uri)
    .then(() => {
        console.log('Successfully connected to MongoDB!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    });
