const Trip = require("../../models/Trip");

exports.controllerGetTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find().populate({
      path: "owner",
      select: ["username", "email", "firstName", "lastName"],
    });

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

exports.controllerFetchTrip = async (tripId, next) => {
  try {
    const trip = await Trip.findById(tripId);

    if (trip) return trip;
    else {
      const error = new Error("Trip ID was not found!");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

exports.controllerDeleteTrip = async (req, res, next) => {
  try {
    if (JSON.stringify(req.trip.owner) === JSON.stringify(req.user._id)) {
      await req.trip.remove();
      res.status(204).end();
    } else {
      res.status(401).json({ msg: "You are not the trip owner" });
    }
  } catch (error) {
    next(error);
  }
};
