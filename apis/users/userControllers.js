const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { keys } = require("../../config/keys");
const Profile = require("../../models/Profile");

exports.controllerGetUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    // console.log(users);
    res.json({ msg: "Users fetched", payload: users });
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const { password } = req.body;
    const saltRounds = 10;
    req.body.password = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create(req.body);
    console.log("newUser: ", newUser);
    const newProfile = await Profile.create({
      bio: "",
      image: "",
      user: newUser._id,
    });

    newUser.profile = newProfile;
    await User.findByIdAndUpdate(newUser._id, newUser, {
      runValidators: true,
      new: true,
    });

    const payload = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      exp: Date.now() + keys.JWT_EXPIRATION_MS,
    };

    const token = jwt.sign(JSON.stringify(payload), keys.JWT_SECRET);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res, next) => {
  const user = req.user;

  const payload = {
    _id: user._id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    exp: Date.now() + keys.JWT_EXPIRATION_MS,
  };

  const token = jwt.sign(JSON.stringify(payload), keys.JWT_SECRET);

  res.status(201).json({ token });
};
