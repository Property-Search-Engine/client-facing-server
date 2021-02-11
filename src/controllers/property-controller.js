const fetch = require("node-fetch");
const config = require("../config");

async function getPropertyById(propertyId) {
    const res = await fetch(`${config.admin_server_url}/properties/${propertyId}`, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Auth': config.jwt.token
        },
    });
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
}

module.exports = { getPropertyById };