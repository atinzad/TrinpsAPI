const express = require("express");

const upload = require("../../middleware/multer");
const { controllerGetTrips } = require("./tripControllers");

const router = express.Router();

router.get("/", controllerGetTrips);

module.exports = router;
