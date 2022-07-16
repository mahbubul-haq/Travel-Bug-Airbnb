const express = require('express');
const ExperienceHosting = require("../models/ExperienceHosting");

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

module.exports = router;