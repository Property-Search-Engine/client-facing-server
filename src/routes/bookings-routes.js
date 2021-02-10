const { Router } = require("express");
const auth = require("../middleware/auth-middleware")

const bookingsRouter = Router();

const {
    getBookings,
    cancelBooking,
    bookProperty,
    updateBookingAddress
} = require("../controllers/bookings-controller");

//TODO: ADD JOI VALIDATION
bookingsRouter.post("/", auth, bookProperty);
bookingsRouter.delete("/:propertyId", auth, cancelBooking);
bookingsRouter.get("/all", auth, getBookings);

//TODO: ADD JWT MIDDLEWARE
bookingsRouter.patch("/:propertyId", updateBookingAddress);

module.exports = bookingsRouter;
