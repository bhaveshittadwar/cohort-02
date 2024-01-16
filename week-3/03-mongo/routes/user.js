const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require('../db/index')

// User Routes
router.post('/signup', async (req, res) => {
    let user = await User.findOne({username: req.body.username});
    if(!!user) res.status(409).send('User already exists')
    else {
        try {
            user = new User(req.body)
            await user.save();
            res.status(200).send('User created sucessfully')
        } catch (error) {
            res.status(500).send('Something when wrong')
        }
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try {
        const courses = await Course.find({});
        res.status(200).send(courses);
    } catch (error) {
        res.status(500).send('Something when wrong')
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    await User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    })

    res.status(200).json({
        message: "Purchase Complete"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    try {
        const username = req.headers.username;
        const user = await User.findOne({username: username});
        const purchasedCourses = await Course.find({_id: {
            $in: user.purchasedCourses
        }});
        console.log(purchasedCourses)
        res.status(200).json({purchasedCourses: purchasedCourses});
    } catch (error) {
        res.status(500).send('Something went wrong');
    }
});

module.exports = router