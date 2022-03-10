const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./database");
const path = require("path");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
dotenv.config();

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.path}`);
  next();
});

//Routers
const userRoutes = require("./apis/users/userRoutes");
app.use("/api/users", userRoutes);
const tripRoutes = require("./apis/trips/tripRoutes");
app.use("/api/trips", tripRoutes);

//? Error handler Middleware
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ msg: err.message || "Internal Server Error" });
  next();
});

//? Not Found Middleware
app.use((req, res, next) => {
  res.status(404).json({ msg: "Path Not Found" });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDB();
});
