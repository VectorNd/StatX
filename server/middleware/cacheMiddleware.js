// middlewares/cacheMiddleware.js
const { redisClient } = require('../index');

const cacheMiddleware = async (req, res, next) => {
    try {
      const cachedData = await new Promise((resolve, reject) => {
        redisClient.get(req.originalUrl, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
  
      if (cachedData) {
        res.status(200).json();
        return res.status(200).json({ status: "SUCCESS", data: JSON.parse(cachedData) });
      }

      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = { cacheMiddleware };
