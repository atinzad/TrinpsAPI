const Profile = require("../../models/Profile");
const express = require("express");
const passport = require("passport");

const {
  fetchProfile,
  controllerGetProfiles,
  controllerUpdateProfile,
} = require("../profiles/profileControllers");

const router = express.Router();

router.param("profileId", async (req, res, next, profileId) => {
  try {
    const profile = await fetchProfile(profileId, next);
    req.profile = profile;
    next();
  } catch (error) {
    next(error);
  }
});

router.get("/", controllerGetProfiles);

router.put("/:profileId", controllerUpdateProfile);

module.exports = router;
