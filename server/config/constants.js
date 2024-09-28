const path = require('path');


require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});



module.exports = {
    MONGOURI: process.env.MONGOURI,
    PORT: process.env.PORT,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_REDIRECT_URI: process.env.GITHUB_REDIRECT_URI,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    FRONTEND_URL: process.env.FRONTEND_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    SERVER_ENDPOINT: process.env.SERVER_ENDPOINT,
    COOKIE_SECURE: true,
    COOKIE_DOMAIN: "https://sde-track.vercel.app"
};