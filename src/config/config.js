const mongoose = require('mongoose');
require('dotenv').config();

const connectToMongoDB = async () => {
    try {
        const url = process.env.MONGODB;
        console.log(url);
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the application if MongoDB connection fails
    }
};

module.exports = connectToMongoDB;
