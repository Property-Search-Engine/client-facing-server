const mockAuth = (clientId, mail) => {
    return (req, _, next) => {
        req.user = {
            uid: clientId,
            email: mail
        }
        next();
    }
};

module.exports = mockAuth;