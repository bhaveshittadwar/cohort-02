const {connectDb, User} = require('./db')

const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000

connectDb()

app.use(express.json())
app.use(cors())

app.get('/cards', async (req, res) => {
    try {
        const cards = await User.find({});
        return res.status(200).json({cards});
    } catch (error) {
        return res.status(500).json(error);
    }
    
})

app.get('/card/:userId', (req, res) => {
    // TODO
})

app.post('/cards', async (req, res) => {
    const {name, socials, interests, description} = req.body;
    console.log(name, socials)
    try {
        const user = await User.create({name, socials, interests, description})
        console.log({user})
        return res.status(201).json({msg: 'User Created: ' + user._id});
    } catch (error) {
        return res.status(500).json({msg: 'Something went wrong: ' + error});
    }
})

app.listen(PORT, () => {
    console.log(`Connected on port: ${PORT}`)
})