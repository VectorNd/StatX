// redisClient.js
const redis = require('redis');
const { ServerConfig } = require('./config');

const redisClient = redis.createClient({
  password: ServerConfig.REDIS_PASSWORD,
  socket: {
    host: ServerConfig.REDIS_HOST,
    port: 17602
  }
});

redisClient.connect()
  .then(() => console.log('Connected to Redis...'))
  .catch((err) => console.error('Could not connect to Redis', err));

module.exports = redisClient;
