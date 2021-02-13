const { Router } = require("express");
const auth = require("../middleware/auth-middleware");
const validateJWT = require("../middleware/jwt-middleware");
const { validateNewBooking, validateUpdateBookingAddress, validateSetStatus } = require("../middleware/validators/bookings-validator");

const bookingsRouter = Router();

const {
    getBookings,
    cancelBooking,
    bookProperty,
    updateBookingAddress,
    getBookingsByEmployeeId,
    setStatus
} = require("../controllers/bookings-controller");

bookingsRouter.get("/employees/:eid", validateJWT, getBookingsByEmployeeId);
bookingsRouter.patch("/:propertyId/address", validateJWT, validateUpdateBookingAddress, updateBookingAddress);
bookingsRouter.post("/:propertyId", validateJWT, validateSetStatus, setStatus);

bookingsRouter.delete("/:propertyId", auth(), cancelBooking);
bookingsRouter.get("/all", auth(), getBookings);
bookingsRouter.post("/", auth(), validateNewBooking, bookProperty);

module.exports = bookingsRouter;
