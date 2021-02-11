const mongoose = require("mongoose");
const BookingSchema = require("./schemas/bookings-schema");

const Bookings = mongoose.model("Booking", BookingSchema);

module.exports = Bookings;