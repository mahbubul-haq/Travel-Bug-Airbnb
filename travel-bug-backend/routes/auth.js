//dependencies
const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchUser");

const JWT_SECRET = 'travel-bug-secret-auth-token';

const router = express.Router();

//ROUTE 1 - create an user using: POST "api/auth/createuser". No login required
router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 1 }),
    body('firstName', 'Enter a valid first name').isLength({ min: 1 }),
    body('lastName', 'Enter a valid last name').isLength({ min: 1 }),
], async (req, res) => {
    //if error, return bad request as response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        //check whether the user exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ errors: 'Sorry. User with this email already exists' });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);

        //create user
        user = await User.create({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNo: req.body.phoneNo,
            password:secPass,
        });

        //send a response after creating user
        //sending a auth token
        const data = {
            user: {
                id: user.id,
            }
        };

        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({
            authToken: authToken
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});


//ROUTE 2 - Authenticate an user using: POST "api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
], async (req, res) => {
    //if error, return bad request as response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({ email: req.body.email });
        if(!user){
            return res.status(400).json({ errors: 'Please try to login with correct credentials' });
        }

        const passwordComapare = await bcrypt.compare(password, user.password);
        if(!passwordComapare){
            return res.status(400).json({ errors: 'Please try to login with correct credentials' });
        }

        //send a response after successful login
        //sending a auth token
        const data = {
            user: {
                id: user.id,
            }
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({
            authToken: authToken
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

});


//ROUTE 3 - Get logged in user details using: POST "api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password"); //except the password
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});


module.exports = router;
