async function getPropertyById(propertyId) {
    const res = await fetch(`${config.admin_server_url}/client/properties/${propertyId}`, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'auth': config.jwt.token
        },
    });
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
}

async function searchAdminProperties(queryParams) {
    const queryString = parseQueryParams(queryParams);
    const res = await fetch(`${config.admin_server_url}/client/properties?${queryString}`, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'auth': config.jwt.token
        },
    });
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
}

const parseQueryParams = (params) => {
    return Object.entries(params).reduce((acc, [key, value]) => {
        return acc + (Array.isArray(value) ?
            value.reduce((last, curr) => last + `${key}[]=${curr}&`, "") :
            `${key}=${value}&`)
    }, "")
}

module.exports = { getPropertyById, searchAdminProperties, parseQueryParams };