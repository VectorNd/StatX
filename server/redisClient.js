// redisClient.js
const redis = require("redis");
const { ServerConfig } = require("./config");

const redisClient = redis.createClient({
  socket: {
    host: "sdetrack-redis-1",
    port: 6379,
  }
});

(async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis on Render!");

    // Test setting and getting a value
    redisClient.on("error", (err) => {
      console.error("Redis Client Error", err);
    });
    await redisClient.set("testKey", "testValue");
    const value = await redisClient.get("testKey");
    console.log("Value from Redis:", value);

    // await redisClient.quit();
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
})();
module.exports = redisClient;
