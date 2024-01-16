const jwt = require('jsonwebtoken')
const secret = 'password'
const {Admin} = require('../db')

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const bearerToken = req.headers.authorization
    if(!bearerToken || !bearerToken.startsWith('Bearer')) {
        res.status(401).send("Unauthorized Access")
    } else {
        const token = bearerToken.split(" ")[1]
        const {username, password} = await jwt.verify(token, secret)
        const userValid = await Admin.exists({username, password})
        if(userValid) {
            next();
        } else {
            res.status(401).send("Unauthorized Access")
        }
    }
}

module.exports = adminMiddleware;
