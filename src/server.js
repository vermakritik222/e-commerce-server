const mongoose = require("mongoose");
require("dotenv").config();
const dbConfig = require("./config/dbConfig");

const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

mongoose
  .connect(dbConfig.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB is connected to app.....");
  })
  .catch((err) => {
    console.log(`db error ${err.message}`);
  });

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`server is running on ${port} .......`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
