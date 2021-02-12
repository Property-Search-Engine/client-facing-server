const Joi = require("joi")

const newBookingSchema = Joi.object({
    propertyId: Joi.string().trim().required(),
    contactInfo: Joi.object({
        message: Joi.string().trim().required(),
        name: Joi.string().min(3).trim().required()
    }).required()
});

const updateBookingAddressSchema = Joi.object({
    street: Joi.string().trim().required(),
    number: Joi.number().min(0).required(),
    city: Joi.string().trim().required(),
    state: Joi.string().trim().required(),
    country: Joi.string().trim().required(),
});
const setStatusSchema = Joi.object({
    status: Joi.string().trim().required().valid("pending", "rejected", "accepted"),
});

async function validateNewBooking(req, res, next) {
    try {
        req.body = await newBookingSchema.validateAsync(req.body);
        next();
    } catch (err) {
        next({ statusCode: 400, message: err.details });
    }
}

async function validateUpdateBookingAddress(req, res, next) {
    try {
        req.body = await updateBookingAddressSchema.validateAsync(req.body);
        next();
    } catch (err) {
        next({ statusCode: 400, message: err.details });
    }
}
async function validateSetStatus(req, res, next) {
    try {
        req.body = await setStatusSchema.validateAsync(req.body);
        next();
    } catch (err) {
        next({ statusCode: 400, message: err.details });
    }
}

module.exports = { validateNewBooking, validateUpdateBookingAddress, validateSetStatus };
