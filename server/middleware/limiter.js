const rateLimit = require('express-rate-limit');

// Create a rate limiter with a 20 requests per hour limit
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 min in milliseconds
    max: 20, // Limit each IP to 20 requests per `windowMs`
    keyGenerator: (req, res) => {
        return req.userID; // Use the user ID as the key
    },
    handler: (req, res, next, options) => {
        const userID = req.userID;
        console.log(`User ${userID} has made ${req.rateLimit.current} requests so far within this time window.`);
        res.status(429).json({
            status: 429,
            message: "Too many requests, please try again after a minute"
        });
    },
});

module.exports = { limiter };