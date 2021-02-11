const { Router } = require("express");
const auth = require("../middleware/auth-middleware");
const validateJWT = require("../middleware/jwt-middleware");
const { validateNewBooking, validateUpdateBookingAddress } = require("../middleware/validators/bookings-validator");

const bookingsRouter = Router();

const {
    getBookings,
    cancelBooking,
    bookProperty,
    updateBookingAddress
} = require("../controllers/bookings-controller");

bookingsRouter.post("/", auth, validateNewBooking, bookProperty);
bookingsRouter.delete("/:propertyId", auth, cancelBooking);
bookingsRouter.get("/all", auth, getBookings);

bookingsRouter.patch("/:propertyId", validateUpdateBookingAddress, updateBookingAddress);

module.exports = bookingsRouter;
