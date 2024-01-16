const mongoose = require('mongoose');


const connectDb = async(mongoose) => {
    // Connect to MongoDB
    try {
        mongoose.connect(`mongodb+srv://admin:passwordatmongodb@cluster0.lilyeqn.mongodb.net/?retryWrites=true&w=majority`);
        console.log('db sucessfully connected')   
    } catch (error) {
        console.log('Oops db connection failed')
    }
}

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    image: String,
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course,
    connectDb
}