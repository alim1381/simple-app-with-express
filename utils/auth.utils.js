const jwt = require("jsonwebtoken");

const generateToken = async (userId, expireTime) => {
  const token = jwt.sign({ id: userId }, process.env.TOKEN_SECRET_KEY, {
    expiresIn: expireTime,
  });
  return token;
};

const tokenSeparator = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.status(403).json({
      message: "توکن یافت نشد",
      success: false,
    });
  }
};

module.exports = { tokenSeparator, generateToken };
