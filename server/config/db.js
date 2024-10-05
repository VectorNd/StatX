const mongoose = require('mongoose');
const { MONGOURI } = require('./constants');

async function connectDB() {
    try {
        await mongoose.connect(MONGOURI, {
            // poolSize: 100,  // Increase pool size to handle concurrent requests
            // maxIdleTimeMS: 10000,  // Adjust idle timeout to free connections faster
        });
        console.log(`Connected to database successfully`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;