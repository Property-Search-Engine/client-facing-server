const db = require("../models");
const { getPropertyById } = require("../utils/properties");

async function bookProperty(req, res, next) {
    const { uid } = req.user;
    const { propertyId, contactInfo } = req.body;
    try {
        const response = await getPropertyById(propertyId);
        const property = response.data;
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
        const bookings = await db.Bookings
            .find({ clientId: uid })
            .select("-__v -contactInfo")
            .sort({ createdAt: -1 })
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
        const booking = await db.Bookings.findOneAndDelete({ "property.id": propertyId, clientId: uid }).lean().exec();
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
        const bookings = await db.Bookings.updateMany({ "property.id": propertyId }, {
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
async function getBookingsByEmployeeId(req, res, next) {
    const { eid } = req.params;
    try {
        const bookings = await db.Bookings
            .find({ employeeId: eid })
            .select("-__v -contactInfo")
            .sort({ createdAt: -1 })
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
async function setStatus(req, res, next) {
    const { propertyId } = req.params;
    const { status } = req.body;
    try {
        const booking = await db.Bookings
            .findByIdAndUpdate(propertyId, { status }, { new: true })
            .select("-__v -contactInfo")
            .lean()
            .exec();
        res.status(200).send({
            data: booking,
            error: null
        });
    } catch (err) {
        next(err);
    }
}
module.exports = { getBookings, bookProperty, cancelBooking, updateBookingAddress, getBookingsByEmployeeId, setStatus };
