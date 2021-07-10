const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
    const {username, password} = req.body;

    // simple validation
    if (!username || !password) {
        return res.status(400).json({success: false, message: 'Missing username and/or password'});
    }

    try {
        // check for existing user
        const user = await User.findOne({username: username});
        if (user) {
            return res.status(400).json({success: false, message: 'Username already taken'});
        }

        // all good
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({
            username: username,
            password: hashedPassword
        })
        await newUser.save();

        // return token
        const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET);
        return res.json({success: true, message: 'User created successfully', accessToken});

    } catch(error){

    }
})

module.exports = router;