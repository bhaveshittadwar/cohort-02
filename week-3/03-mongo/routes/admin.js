const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const mongoose = require('mongoose');
const {
    connectDb,
    Admin,
    Course
} = require('../db');


connectDb(mongoose);

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic

    const userExists = await Admin.findOne({username: req.body.username})

    if (!!userExists) res.status(409).send('User already exists');
    else {
        try {
            const user = new Admin(req.body)
            await user.save()
            res.status(200).json({
                message: 'Admin added successfully'
            })
        } catch(err) {
            res.status(500).send('Something when wrong')
        }
    }
    
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const courses = await Course.findOne({title: req.body.title})
    if(!!courses) res.status(200).send('course already exists')
    else {
            try {
            const courses = new Course(req.body);
            await courses.save();
            res.status(200).json({
                message: "Course created sucessfully",
                courseId: courses._id
            })
        } catch (error) {
            res.status(500).send('Something when wrong')
        }
    }
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    try {
        const courses = Course.find()
            .then((courses) => {
                res.status(200).json(courses);
            })
    } catch (error) {
        res.status(500).send('Something when wrong')
    }
});

module.exports = router;