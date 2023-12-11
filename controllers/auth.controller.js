const bcrypt = require("bcrypt");
const sult = 10;
const authUtils = require("../utils/auth.utils");
const Users = require("../models/users.model");

async function register(req, res, next) {
  try {
    // find user by this phone
    let findUser = await Users.findOne({ phone: req.body.username });

    // check for find phone number in DB
    if (findUser) {
      return res.status(409).json({
        message: "There is another user with this profile",
        success: false,
      });
    }

    // create new user
    let newUser = new Users({
      name: req.body.name,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, sult),
    });

    // save in DB
    newUser.save().then(async (result) => {
      // generate Token
      const token = await authUtils.generateToken(result._id, "4d");

      // send response ok
      return res.status(201).json({
        user: {
          id: result._id,
          name: result.name,
          token: token,
        },
        message: "New user successfully created",
        success: true,
      });
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    let user = await Users.findOne({ username: req.body.username });
    // check for exist username
    if (!user) {
      return res.status(404).json({
        message: "User with this username was not found",
        success: false,
      });
    }

    // check for password is correct
    if (await bcrypt.compare(req.body.password, user.password)) {
      // generate Token
      const token = await authUtils.generateToken(user._id, "4d");

      // send response ok
      return res.status(200).json({
        user: {
          id: user._id,
          name: user.name,
          token: token,
        },
        message: "You have successfully logged in",
        success: true,
      });
    } else {
      // send response password entered does not match
      return res.status(400).json({
        message: "The password entered does not match",
        success: false,
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login };
