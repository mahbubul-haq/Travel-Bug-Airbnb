const express = require('express');
const ExperienceHosting = require("../models/ExperienceHosting");
const Category = require('../models/Category');

router = express.Router();

// ROUTE 1 - Get all experience using: GET "experience/all". Login not required
router.get('/all', async (req, res) => {
    try {
        //get all the experiences
        const experiences = await ExperienceHosting.find().populate('host', '-password'); //except the password

        //send a response after getting experiences
        res.json(
            experiences,
        );

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error from experience/all');
    }
});

// ROUTE 2 - Get an experience using: GET "experience/hostingid/:id". Login not required
router.get('/hostingid/:id', async (req, res) => {
    try {
        //get an experience
        const experience = await ExperienceHosting.findById(req.params.id).populate('host', '-password'); //except the password

        //send a response after getting experience
        res.json(experience);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error from experience/hostingid');
    }
});

// ROUTE 3 Get all experience categories of hosting using : GET "experience/categories". Login not required
router.get('/categories', async (req, res) => {
    try {
        //get all the categories
        const categories = await Category.find();

        //send a response after getting categories
        res.json(categories);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error from host/experience/categories');
    }
});


module.exports = router;