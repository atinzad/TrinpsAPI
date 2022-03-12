const express = require("express");
const passport = require("passport");

const upload = require("../../middleware/multer");
const {
  controllerGetTrips,
  controllerAddTrip,
  controllerFetchTrip,
  controllerDeleteTrip,
  controllerUpdateTrip,
} = require("./tripControllers");

const router = express.Router();

router.param("tripId", async (req, res, next, tripId) => {
  const trip = await controllerFetchTrip(tripId, next);
  if (trip) {
    req.trip = trip;
    next();
  } else {
    const err = new Error("Trip Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", controllerGetTrips);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  controllerAddTrip
);
router.delete(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  controllerDeleteTrip
);
router.put(
  "/:tripId",
  //   passport.authenticate("jwt", { session: false }),
  controllerUpdateTrip
);

module.exports = router;
