const express = require("express");
const { controllerGetUsers } = require("./userControllers");

const router = express.Router();

router.get("/", controllerGetUsers);

module.exports = router;
