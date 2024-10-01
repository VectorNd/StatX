const express = require("express");
const cors = require("cors");
const ApiRouter = require("./routes");
const { DbConnectionMiddleware } = require("./middleware");
const { ServerConfig, ConnectDB } = require("./config");
const redis = require('redis');

const app = express();

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


app.use(express.json());
app.use(cors({
  origin: `*`,
  credentials: true, 
}));

app.use(DbConnectionMiddleware.dbConnectionMiddleware);

app.use("/api", ApiRouter);

app.listen(ServerConfig.PORT, async () => {
  await ConnectDB();
  console.log(`Server is up at ${ServerConfig.PORT}`);
});

module.exports = {app, redisClient };
