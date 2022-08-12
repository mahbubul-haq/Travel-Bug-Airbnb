const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchUser");
const TransportProvider = require('../models/TransportProvider');
const TransportCategory = require('../models/TransportCategory');
const JWT_SECRET = 'travel-bug-secret-auth-token';

const router = express.Router();
//ROUTE 1 - create an user using: POST "transport/createuser". No login required
router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 1 }),
    body('firstName', 'Enter a valid first name').isLength({ min: 1 }),
    body('lastName', 'Enter a valid last name').isLength({ min: 1 }),
], async (req, res) => {
    let success = false;

    //if error, return bad request as response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success: success, errors: errors.array() });
    }

    try {
        //check whether the user exists already
        let user = await TransportProvider.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success: success, errors: 'Sorry. User with this email already exists' });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);

        //create user
        user = await TransportProvider.create({
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
                id:  user.id,
            }
        };

        const authToken = jwt.sign(data, JWT_SECRET);

        success = true;
        res.json({
            success: success,
            authToken: authToken
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});
//ROUTE 2 - Get logged in user details using: POST "transport/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await TransportProvider.findById(userId).select("-password"); //except the password
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});
//ROUTE 3 - Authenticate an user using: POST "transport/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
], async (req, res) => {
    let success = false;
    //if error, return bad request as response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success: success, errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await TransportProvider.findOne({ email: req.body.email });
        if(!user){
            return res.status(400).json({success: success, errors: 'Please try to login with correct credentials' });
        }

        const passwordComapare = await bcrypt.compare(password, user.password);
        if(!passwordComapare){
            return res.status(400).json({success: success, errors: 'Please try to login with correct credentials' });
        }

        //send a response after successful login
        //sending a auth token
        const data = {
            user: {
                id: user.id,
            }
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({
            success: success,
            authToken: authToken
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

});
// ROUTE 4 Get all transport categories of hosting using : GET "transport/categories". Login  required
router.get('/categories', async (req, res) => {
    try {
        //get all the categories
        const categories = await TransportCategory.find();

        //send a response after getting categories
        res.json(categories);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error from tansport/categories');
    }
});
module.exports = router;