const db = require("../models");
const { getPropertyById } = require("./property-controller");

async function bookProperty(req, res, next) {
    const { uid } = req.user;
    const { propertyId, contactInfo } = req.body;
    try {
        const property = await getPropertyById(propertyId);

        const booking = await db.Bookings.create({
            clientId: uid,
            employeeId: property.employee_id,
            property: {
                id: propertyId,
                address: property.address
            },
            contactInfo
        });
        
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

async function cancelBooking(req, res, next) {
    const { uid } = req.user;
    const { propertyId } = req.params;
    try {
        const booking = db.Bookings.findOneAndDelete({ "property.id": propertyId, clientId: uid }).lean().exec();
        res.status(200).send({
            data: booking,
            error: null
        })
    } catch (err) {
        next(err);
    }
}

async function updateBookingAddress(req, res, next) {
    const { propertyId } = req.params;
    const { address } = req.body;
    try {
        const bookings = db.Bookings.updateMany({ "property.id": propertyId }, {
            $set: { address }
        }, { new: true })
            .lean().exec();
        res.status(200).send({
            data: bookings,
            error: null
        })
    } catch (err) {
        next(err);
    }
}

module.exports = { getBookings, bookProperty, cancelBooking, updateBookingAddress };