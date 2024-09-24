const express = require("express");
const cors = require("cors");
const ApiRouter = require("./routes");
const { DbConnectionMiddleware } = require("./middleware");
const { ServerConfig, ConnectDB } = require("./config");


const app = express();

app.use(express.json());
app.use(cors());

app.use(DbConnectionMiddleware.dbConnectionMiddleware);

app.use("/api", ApiRouter);

app.listen(ServerConfig.PORT, async () => {
  await ConnectDB();
  console.log(`Server is up at ${ServerConfig.PORT}`);
});

// module.exports = app;
