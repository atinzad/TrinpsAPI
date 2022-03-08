const User = require("../../models/User");

exports.controllerGetUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    console.log(users);
    res.json({ msg: "Users fetched", payload: users });
  } catch (error) {
    next(error);
  }
};
