const dotenev = require("dotenv");
dotenev.config({ path: "./.env" });
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception occured! Shutting down...");
  process.exit(1);
});

const app = require("./app");

const PORT = process.env.PORT || 5000;

//connect to db and start server
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
  })
  .then((conn) => {
    //console.log(conn);
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection occured! Shutting down...");

  server.close(() => {
    process.exit(1);
  });
});
