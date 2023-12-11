const express = require("express");
const app = express();
require("dotenv").config();

// db connection
require("./configs/db.config").dbConnection();

// json in body
app.use(express.json());

// routes
app.use("/api", require("./routes/api"));

// if route not found
app.use("*", (req, res, next) => {
  try {
    let err = new Error("Not Found");
    err.status = 404;
    throw err;
  } catch (error) {
    next(error);
  }
});
// errorHandler
app.use(require("./middleware/errorHandler"));

app.listen(process.env.PORT, () => {
  console.log(`listen in port ${process.env.PORT}`);
});
