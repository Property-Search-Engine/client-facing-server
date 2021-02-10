const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
    {
        street: {
            type: String,
            required: true,
            trim: true,
        },
        number: {
            type: Number,
            required: true,
            min: 0,
        },
        city: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        state: {
            type: String,
            required: true,
            trim: true,
        },
        country: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { _id: false },
);

const bookingSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true,
        ref: "Client",
        index: true
    },
    employeeId: {
        type: String,
        required: true,
        trim: true
    },
    property: {
        type: Object,
        required: true,
        id: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            index: true
        },
        address: {
            type: addressSchema,
            required: true,
        }
    },
    status: {
        type: String,
        enum: ["pending", "rejected", "accepted"],
        default: "pending"
    },
    contactInfo: {
        type: Object,
        required: true,
        message: {
            type: String,
            required: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
        }
    }
}, { timestamps: true });

module.exports = bookingSchema;