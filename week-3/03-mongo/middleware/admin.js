const {Admin} = require('../db/index')

// connectDb(mongoose);
// Middleware for handling auth
 function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    try {
        const {username, password} = req.headers;
        if(!username || !password) {
            throw new Error('Incomplete Information');
        }
        
        Admin.findOne({username, password}).then((user) => {
            if(user == null) throw new Error('Invalid Credentials')
            next();
        }).catch((err) => {
            res.statud(403).send(err.message)
        })
    } catch (error) {
        res.status(403).send(error.message)
    }
}

module.exports = adminMiddleware;