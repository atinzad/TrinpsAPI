const Trip = require("../../models/Trip");

exports.controllerGetTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find().populate("owner");

    // console.log(users);
    res.json({ msg: "Trips fetched", payload: trips });
  } catch (error) {
    next(error);
  }
};

exports.controllerAddTrip = async (req, res, next) => {
  try {
    // if (req.file) {
    //   req.body.image = `/${req.file.path}`;
    // }
    req.body.owner = req.user._id;
    const trip = req.body;
    const createdTrip = await Trip.create(trip);
    res.status(200).json({ msg: "Trip Created", payload: createdTrip });
  } catch (error) {
    next(error);
  }
};
