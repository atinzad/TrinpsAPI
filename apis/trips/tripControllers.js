const Trip = require("../../models/Trip");

exports.controllerGetTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find();
    // console.log(users);
    res.json({ msg: "Trips fetched", payload: trips });
  } catch (error) {
    next(error);
  }
};
