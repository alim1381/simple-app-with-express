const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const authUtils = require("../utils/auth.utils");

router.use(authUtils.tokenSeparator, (req, res, next) => {
  jwt.verify(req.token, process.env.TOKEN_SECRET_KEY, async (err, authData) => {
    if (err) {
      res.status(403).json({
        message: "توکن منقضی شده",
        success: false,
      });
    } else {
      try {
        let user = await User.findById(authData.id);
        req.userData = user;
        next();
      } catch (error) {
        res.status(403).json({
          message: "توکن منقضی شده",
          success: false,
        });
      }
    }
  });
});

module.exports = router;
