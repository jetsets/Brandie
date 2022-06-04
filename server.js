const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful"));

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on ${port}...`);
});
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("unhandled rejection, shutting down");
  server.close(() => {
    process.exit(1);
  });
});
