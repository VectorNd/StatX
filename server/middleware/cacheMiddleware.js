// middlewares/cacheMiddleware.js
const redisClient = require("../redisClient");

const cacheMiddleware = async (req, res, next) => {
  try {
    const getAsync = promisify(redisClient.get).bind(redisClient);
    const cachedData = await getAsync(req.originalUrl);

    if (cachedData) {
      res.status(200).json();
      return res
        .status(200)
        .json({ status: "SUCCESS", data: JSON.parse(cachedData) });
    }

    next();
  } catch (error) {
    console.error("Cache middleware error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { cacheMiddleware };
