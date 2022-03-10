const express = require("express");
const passport = require("passport");

const upload = require("../../middleware/multer");
const { controllerGetTrips, controllerAddTrip } = require("./tripControllers");

const router = express.Router();

router.get("/", controllerGetTrips);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  controllerAddTrip
);

module.exports = router;
