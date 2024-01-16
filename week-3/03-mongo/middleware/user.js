
const {User} = require('../db/index');
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    const password = req.headers.password;

    if(!username || !password) res.status(403).send('Oops, Incomplete Information');
    User.findOne({username: username, password: password})
        .then((user) => {
            if(user == null) throw new Error('Invalid Credentials')
            next();
        }).catch((error) => {
            res.status(403).send(error.message)
        })
}

module.exports = userMiddleware;