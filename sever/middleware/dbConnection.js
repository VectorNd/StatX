// src/middleware/dbConnection.js
const ConnectDB = require("../config");

const dbConnectionMiddleware = async (req, res, next) => {
  try {
    await ConnectDB();
    next();
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { dbConnectionMiddleware };
