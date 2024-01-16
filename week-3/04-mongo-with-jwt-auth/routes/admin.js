const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin, Course} = require('../db');
const jwt = require('jsonwebtoken')
const secret = 'password'

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;
    if(!username || !password) res.status(400).send('Incomplete Info')
    else {
        await Admin.create({
            username,
            password
        });
        res.status(200).json({
            message: "Admin Created successfully"
        })
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const {username, password} = req.body
    const userExists = await Admin.exists({
        username,
        password
    })

    if(!userExists) res.status(404).send('User Not Found');
    else {
        const token = await jwt.sign({username, password}, secret)
        res.status(200).json({token});
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const {title, description, price, imageLink} = req.body;
    const course = await Course.create({
        title,
        description,
        price,
        imageLink
    });
    res.status(201).json({
        message: "Course Created Sucessfully",
        courseId: course._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find();
    res.status(200).json(courses)
});

module.exports = router;