const mongoose = require("mongoose");
const env = process.env;

function dbConnection() {
  mongoose.connect(env.DB_URL).then(() => {
    console.log("db is connect");
  });
}

module.exports = { dbConnection };
