const express = require('express');
const User = require('../models/User');
const ExperienceHosting = require("../models/ExperienceHosting");
const Activity=require("../models/Activity");
const Category=require("../models/Category");
const SubCategory=require("../models/SubCategory");
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require('express-validator');
router = express.Router();
const multer = require("multer");
const path = require("path");

const updateCategory = async (categoryId, experienceId) => {
    await Category.updateOne({ _id: categoryId }, { $push: { experiences: experienceId } });
}
const updateSubCategory = async (subCategoryId, experienceId) => {
    await SubCategory.updateOne({ _id: subCategoryId }, { $push: { experiences: experienceId } });
}

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
            hostAvailability: req.body.dayTimeSlot,
            hostingDuration: req.body.duration,
        });
        success = true;

        //update category with experience id
        for (let i = 0; i < categoryIds.length; i++) {
            await updateCategory(categoryIds[i], experienceHosting._id);
        }
        // update subcategory with experience id
        for (let i = 0; i < subCategoryIds.length; i++) {
            await updateSubCategory(subCategoryIds[i], experienceHosting._id);
        }

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
// ROUTE 4 posting an activity using : POST "host/activity/hostingid".
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
            dayTimeSlots:req.body.activityDayTimeSlot,
            activityDuration:req.body.activityDuration,
            activityCost:req.body.activityCost,
            additionalRequirements:req.body.additionalRequirements,
            hostingId:req.params.id

        });

        await ExperienceHosting.updateOne({_id:req.params.id},{$push:{activities:activity._id}})

        //send a response after creating experience hosting
        res.json({
            activity:activity,
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error from host');
    }
});
// ROUTE 5 posting an activity using : GET "host/activity/hostingid".
router.get('/activity/:id',[], async (req, res) => {
    try {
         
        //get all activities
        const activities = await Activity.find({"hostingId":req.params.id});
        
        //send a response after getting experience hosting
        res.json({
            activities
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error from get experience hosting');
    }
});

//ROUTE 5 - upload a photo
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
       
        //console.log(`../${__dirname}/uploads`);
        cb(null, `${__dirname}/uploads`);
        //cb(null, '../../travel-bug-backend/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
        
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
    storage: fileStorage,
});

router.post('/upload', upload.single("image"), (req, res) => {
   
    console.log(req.file);
     console.log(path.dirname(path.basename(__dirname)));
    res.send(req.file.filename);
})

router.get('/getimage/:name', (req, res) => {

    // const protocol = req.protocol;
    // const host = req.hostname;
    // const url = req.originalUrl;
    // const port = process.env.PORT || 5000;

    // const lastPart = url.split("/").pop();
    // console.log(lastPart)

    // const fullUrl = `${protocol}://${host}:${port}${url}`
    // console.log(fullUrl);
    // //console.log(path.join(__dirname, '/uploads', req.body.filename));
    // console.log("dirname", __dirname);
    //res.send(__dirname + "/uploads/" + req.body.filename);
    //console.log(req.url);
    //.log(req.url);
    //res.send(fullUrl);
    res.sendFile(path.join(__dirname, '/uploads/', req.params.name));
})

module.exports = router;