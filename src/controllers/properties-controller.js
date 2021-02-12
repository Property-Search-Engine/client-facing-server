const fetch = require("node-fetch");
const config = require("../config");
const { getPropertyById } = require("../utils/properties");

async function getProperty(req, res, next) {
    const { propertyId } = req.params;
    try {
        const response = await getPropertyById(propertyId);
        res.status(200).send(response);
    } catch (err) {
        next(err);
    }
}

async function searchProperties(req, res, next) {
    try {
        const response = await searchAdminProperties(req.query);
        res.status(200).send(response);
    } catch (err) {
        next(err);
    }
}

module.exports = { getProperty, searchProperties };