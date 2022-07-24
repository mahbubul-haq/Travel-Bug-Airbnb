const express = require('express');
const User = require('../models/User');
const ExperienceHosting = require("../models/ExperienceHosting");
const Activity=require("../models/Activity");
const Category=require("../models/Category");
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require('express-validator');
router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {promisify} = require("util");
const pipeline = promisify(require("stream").pipeline)

//ROUTE 1 - Post an experience hosting using: POST "host/experience". Login required
router.post('/', fetchuser, [
    body('hostingTitle', 'Enter a valid hosting title').isLength({ min: 1 }),
    body('description', 'Enter a valid description').isLength({ min: 1 }),
], async (req, res) => {
    var success = false;
    try {
        //if error, return bad request as response
        //console.log("before validation");
        const errors = validationResult(req);
        //console.log("after validation");
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), success: success });
        }

        const userId = req.user.id;
        const categoryIds = req.body.category.map((category) => category.id);
        console.log(categoryIds)
        const subCategoryIds = req.body.subCategory.map((subCategory) => subCategory.id);

        //create experience hosting
        const experienceHosting = await ExperienceHosting.create({
            hostingTitle: req.body.hostingTitle,
            description: req.body.description,
            hostingDate: req.body.hostingDate,
            draft: req.body.draft,
            individualOrTeam: req.body.individualOrTeam,
            totalCost: req.body.totalCost,
            maxRefundDays: req.body.maxRefundDays,
            partialPayAllowed: req.body.partialPayAllowed,
            itemsToBring: req.body.itemsToBring,
            maxGroupSize: req.body.maxGroupSize,
            minAge: req.body.minAge,
            additionalRequirements: req.body.additionalRequirements,
            hostingPhotos: req.body.hostingPhotos,
            host: userId,
            categories: categoryIds,
            subCategories: subCategoryIds,
        });
        success = true;

        //send a response after creating experience hosting
        res.json({
            success: success,
            experienceHosting: experienceHosting,
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: success,
            error: "Experience not hosted"
        });
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

// ROUTE 3 - Get an experience hosting using: GET "host/experience/hostingid/:id". Login required
router.get('/hostingid/:id', fetchuser, async (req, res) => {
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
// ROUTE 4 posting an activity using : POST "host/activity".
router.post('/activity/:id',[
    body('activityTitle', 'Enter a valid hosting title').isLength({ min: 1 }),
], async (req, res) => {
    try {
        //if error, return bad request as response
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        //create experience hosting
        const activity = await Activity.create({
            activityTitle:req.body.activityTitle,
            dayTimeSlots:req.body.dayTimeSlots,
            activityDuration:req.body.activityDuration,
            activityCost:req.body.activityCost,
            additionalRequirements:req.body.additionalRequirements,
            hostingId:req.params.id

        });

        //send a response after creating experience hosting
        res.json({
            activity:activity,
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error from host');
    }
});

//ROUTE 5 - upload a photo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
        
        // const fileExtension = path.extname(file.originalname);
        // const fileName = file.originalname
        //         .replace(fileExtension, "")
        //         .toLowerCase()
        //         .split(" ")
        //         .join("-") + "-" + Date.now() + fileExtension;
        // cb(null, fileName);
    }
});
const upload = multer({
    //storage: storage,
});

router.post('/upload', upload.single("file"), async (req, res) => {
   // console.log(req.body.file);
    //console.log(req.body.title);
    console.log(req);
    res.send(req.body);

    
   // console.log(filename);
    //console.log(req.file);
    //console.log(fileName);
    //res.send(req.file.originalname);
})

module.exports = router;