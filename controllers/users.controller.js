const Users = require("../models/users.model");

async function getUsers(req, res, next) {
  try {
    // get all users from db
    const users = await Users.find({}).select("-__v -updatedAt");

    res.status(400).json({
      users: users,
      usersLength: users.length,
    });
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    // create new user
    const newUsers = new Users({ name: req.body.name, age: req.body.age });

    // save in db
    await newUsers.save();

    // send response
    res.status(400).json({
      user: newUsers,
      success: true,
      message: "create new user successfly",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getUsers, create };
