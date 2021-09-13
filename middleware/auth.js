const config = require('config');
const jwt = require('jsonwebtoken');

function validateAuth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).send('Token not provided.');
    }

    try {
        const decoded = jwt.decode(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch {
        return res.status(400).send('Invalid token');
    }
}

module.exports = validateAuth;
