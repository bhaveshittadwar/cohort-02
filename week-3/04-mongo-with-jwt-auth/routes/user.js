const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require('../db');
const jwt = require('jsonwebtoken')
const secret = 'password'

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const {username, password} = req.body
    if(!username || !password) res.status(400).send('Incomplete Info')
    else {
        await User.create({
            username,
            password
        })
        res.status(200).json({
            message: 'User created sucessfully'
        })
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const {username, password} = req.body;
    const userValid = await User.exists({username, password})
    if(userValid) {
        const token = await jwt.sign({username, password}, secret)
        res.status(200).json({token})
    } else {
        res.status(404).send('User Not Found');
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find();
    res.status(200).json({courses})
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(' ')[1];
    const {username} = await jwt.verify(token, secret)
    console.log(courseId)
    
    await User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    })

    res.status(201).json({
        message: "Purchase Complete"
    })
});

router.get('/purchasedCourses', userMiddleware,  async(req, res) => {
    // Implement fetching purchased courses logic
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(' ')[1];
    const {username} = await jwt.verify(token, secret)

    const user = await User.findOne({username})
    const purchasedCourses = await Course.find({
        _id: {
            $in: user.purchasedCourses
        }
    })

    res.status(200).json({
        purchasedCourses
    })
});

module.exports = router