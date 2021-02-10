const fetch = require('node-fetch');
const mongoose = require("mongoose");
const config = require("../../config");

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


bookingSchema.pre("validate", async (next) => {
    try {
        const res = await fetch(`${config.admin_server_url}/${this.propertyId}`, {
            method: 'get',
            headers: { 'Accept': 'application/json' },
        });
        if (!res.ok) return next({ statusCode: res.status, message: res.statusText });
        const property = await res.json();
        delete this.propertyId;
        this.property = {
            id: this.propertyId,
            address: property.address
        }
        this.employeeId = property.employee_id;
    } catch (err) {
        next(err);
    }
});

module.exports = bookingSchema;