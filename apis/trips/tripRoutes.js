const express = require("express");

const upload = require("../../middleware/multer");
const { controllerGetTrips, controllerAddTrip } = require("./tripControllers");

const router = express.Router();

router.get("/", controllerGetTrips);
router.post("/", controllerAddTrip);

module.exports = router;
