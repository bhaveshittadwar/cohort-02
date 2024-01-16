const {User} = require('../db')
const jwt = require('jsonwebtoken')
const secret = 'password'

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const bearerToken = req.headers.authorization;
    if(!bearerToken || !bearerToken.startsWith('Bearer')) res.status(401).send('Unauthorized')
    else {
        const token = bearerToken.split(' ')[1];
        const {username, password} = await jwt.verify(token, secret)
        const userValid = await User.exists({username, password})
        if(userValid) {
            next();
        } else res.status(401).send('Unauthorized')
    }
}

module.exports = userMiddleware;