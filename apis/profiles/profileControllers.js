const Profile = require("../../models/Profile");

exports.fetchProfile = async (profileId, next) => {
  try {
    const profile = await Profile.findById(profileId);
    if (profile) {
      return profile;
    } else {
      const error = new Error(`could not find ${profileId}`);
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

exports.controllerGetProfiles = async (req, res, next) => {
  try {
    const profile = await Profile.find();
    res.json({ msg: "Products fetched", payload: profile });
  } catch (error) {
    next(error);
  }
};

exports.controllerUpdateProfile = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const profileId = req.profile._id;
    const profile = req.body;
    const profileUpdated = await Profile.findOneAndUpdate(profileId, profile, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ msg: "Profile Updated", payload: profileUpdated });
  } catch (error) {
    next(error);
  }
};
