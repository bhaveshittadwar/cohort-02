const mongoose = require('mongoose')
const password = '<Your Password>'
const uri = `mongodb+srv://admin:moongopass@cluster0.z5qtrdg.mongodb.net/?retryWrites=true&w=majority`;

const connectDb = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

const userSchema = mongoose.Schema({
    name: String,
    socials: [
        {
            platform: String,
            link:  String
        }
    ],
    interests: Array
})

const User = mongoose.model('User', userSchema);

module.exports = {connectDb, User}
