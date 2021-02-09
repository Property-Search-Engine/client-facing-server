const db = require("../models");

async function bookProperty(req, res, next) {
    const { uid } = req.user;
    const {
        propertyId,
        contactInfo: {
            message,
            name
        }
    } = req.body;

    try {
        //TODO: On pre save, get the employee_id & address
        // TODO: On pre save, check if property exists
        const booking = await db.Bookings.create({ clientId: uid, propertyId, contactInfo });
        res.status(200).send({
            data: booking,
            error: null
        });
    } catch (err) {
        next(err);
    }
}

async function getBookings(req, res, next) {
    const { uid } = req.user;
    try {
        const bookings = db.Bookings
            .find({ clientId: uid })
            .select("-__v -contactInfo")
            .sort({ created_at: -1 })
            .lean()
            .exec();
        res.status(200).send({
            data: bookings,
            error: null
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { getBookings, bookProperty };