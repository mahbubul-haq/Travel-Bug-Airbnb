const express = require('express');
const User = require('../models/User');
const ExperienceHosting = require("../models/ExperienceHosting");
const Category = require('../models/Category');
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require('express-validator');
router = express.Router();

//ROUTE 1 - Post an experience hosting using: POST "host/experience". Login required
router.post('/', fetchuser, [
    body('hostingTitle', 'Enter a valid hosting title').isLength({ min: 1 }),
    body('description', 'Enter a valid description').isLength({ min: 1 }),
], async (req, res) => {
    try {
        //if error, return bad request as response
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userId = req.user.id;

        //create experience hosting
        const experienceHosting = await ExperienceHosting.create({
            hostingTitle: req.body.hostingTitle,
            description: req.body.description,
            hostingDate: req.body.hostingDate,
            draft: req.body.draft,
            indivisualOrTeam: req.body.indivisualOrTeam,
            totalCost: req.body.totalCost,
            itemsToBring: req.body.itemsToBring,
            maxGroupSize: req.body.maxGroupSize,
            minAge: req.body.minAge,
            additionalRequirements: req.body.additionalRequirements,
            hostingPhotos: req.body.hostingPhotos,
            host: userId,
        });

        //send a response after creating experience hosting
        res.json({
            experienceHosting: experienceHosting,
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error from host');
    }
});

// ROUTE 2 - Get all experience hosting using: GET "host/experience/all". Login required
router.get('/all', fetchuser, async (req, res) => {
    try {
        //get the user data
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password"); //except the password
        
        //get all experience hosting
        const experienceHosting = await ExperienceHosting.find({ host: userId });
        
        //send a response after getting experience hosting
        res.json({
            experienceHosting: experienceHosting,
            user: user,
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error from get all experience hosting');
    }
});

// ROUTE 3 - Get an experience hosting using: GET "host/experience/hostingid:id". Login required
router.get('/hostingid:id', fetchuser, async (req, res) => {
    try {
         //get the user data
         const userId = req.user.id;
         const user = await User.findById(userId).select("-password"); //except the password

        //get an experience hosting
        const experienceHosting = await ExperienceHosting.findById(req.params.id);
        
        //send a response after getting experience hosting
        res.json({
            experienceHosting: experienceHosting,
            user: user,
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error from get experience hosting');
    }
});

// ROUTE 4 Get all categories of hosting using : GET "host/experience/categories". Login required
router.get('/categories', fetchuser, async (req, res) => {
    try {
        //get all the categories
        const categories = await Category.find();

        //send a response after getting categories
        res.json({
            categories: categories,
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error from host/experience/categories');
    }
});

        


module.exports = router;