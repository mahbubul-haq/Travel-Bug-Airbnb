const express = require("express");
const User = require("../models/User");
const ExperienceHosting = require("../models/ExperienceHosting");
const Activity = require("../models/Activity");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const Location = require("../models/Location");
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
router = express.Router();
const multer = require("multer");
const path = require("path");

const updateCategory = async (categoryId, experienceId) => {
  //check if the category has experienceId in experiences
  const category = await Category.findById(categoryId);
  var flag = false;
  for (var i = 0; i < category.experiences.length; i++) {
    if (category.experiences[i].toString() == experienceId.toString()) {
      flag = true;
      break;
    }
  }
  if (!flag) {
    await Category.updateOne(
      { _id: categoryId },
      { $push: { experiences: experienceId } }
    );
  }
};
const updateSubCategory = async (subCategoryId, experienceId) => {
  //check if the subcategory has experienceId in experiences
  const subCategory = await SubCategory.findById(subCategoryId);
  var flag = false;
  for (var i = 0; i < subCategory.experiences.length; i++) {
    if (subCategory.experiences[i].toString() == experienceId.toString()) {
      flag = true;
      break;
    }
  }
  if (!flag) {
    await SubCategory.updateOne(
      { _id: subCategoryId },
      { $push: { experiences: experienceId } }
    );
  }
};

const insertLocation = async (longitude, latitude, address) => {
  console.log("called", longitude, latitude, address);
  const location = new Location({
    longitude: longitude,
    latitude: latitude,
    address: address,
  });
  await location.save();
  return location._id;
};

//ROUTE 1 - Post an experience hosting using: POST "host/experience". Login required
router.post("/", fetchuser, [], async (req, res) => {
  var success = false;
  try {
    //if error, return bad request as response
    //console.log("before validation");
    // const errors = validationResult(req);
    // //console.log("after validation");
    // if (!errors.isEmpty()) {
    //   return res
    //     .status(400)
    //     .json({ errors: errors.array(), success: success });
    // }

    var locationId = null;
    if (
      req.body.location &&
      "id" in req.body.location &&
      req.body.location.id !== null
    ) {
      locationId = req.body.location.id;
    } else if (req.body.location) {
      locationId = await insertLocation(
        req.body.location.x,
        req.body.location.y,
        req.body.location.label
      );
    }
    const userId = req.user.id;
    var categoryIds = req.body.category.map((category) => {
      if (category) return category.id;
      else return null;
    });
    console.log("cat ids", categoryIds);
    var subCategoryIds = req.body.subCategory.map((subCategory) => {
      if (subCategory) return subCategory.id;
      else return null;
    });

    //filter null from categoryIds and subCategoryIds
    categoryIds = categoryIds.filter((category) => category !== null);
    subCategoryIds = subCategoryIds.filter(
      (subCategory) => subCategory !== null
    );
      console.log("sub ids", subCategoryIds);
    //create experience hosting
    var experienceHosting;

    if ("id" in req.body && req.body.id !== null) {

      const exp = await ExperienceHosting.findById(req.body.id);
      //remove all activities from Activity model
      await Activity.deleteMany({ experienceId: exp._id });
      //remove all activities from experience hosting
      await ExperienceHosting.updateOne({_id: req.body.id}, {$set: {activities: []}});

      //update experience hosting if id is provided
      experienceHosting = await ExperienceHosting.findByIdAndUpdate(
        { _id: req.body.id },
        {
          $set: {
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
            location: locationId,
          },
        }
      );
    } else {
      experienceHosting = await ExperienceHosting.create({
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
        location: locationId,
      });
    }
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
      error: "Experience not hosted",
    });
  }
});

// ROUTE 2 - Get all experience hosting using: GET "host/experience/all". Login required
router.get("/all", fetchuser, async (req, res) => {
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
    res
      .status(500)
      .send("Internal Server Error from get all experience hosting");
  }
});

// ROUTE 3 - Get an experience hosting using: GET "host/experience/hostingid/:id". Login required
router.get("/hostingid/:id", fetchuser, async (req, res) => {
  try {
    //get the user data
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password"); //except the password

    //get an experience hosting
    const experienceHosting = await ExperienceHosting.findById(req.params.id);
    console.log(experienceHosting);
    //send a response after getting experience hosting
    res.json(experienceHosting, user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error from get experience hosting");
  }
});
// ROUTE 4 posting an activity using : POST "host/activity/hostingid".
router.post(
  "/activity/:id",
  [body("activityTitle", "Enter a valid hosting title").isLength({ min: 1 })],
  async (req, res) => {
    try {
      //if error, return bad request as response
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      console.log(req.params.id);

      //create experience hosting
      const activity = await Activity.create({
        activityTitle: req.body.activityTitle,
        dayTimeSlots: req.body.activityDayTimeSlot,
        activityDuration: req.body.activityDuration,
        activityCost: req.body.activityCost,
        additionalRequirements: req.body.additionalRequirements,
        hostingId: req.params.id,
      });

      await ExperienceHosting.updateOne(
        { _id: req.params.id },
        { $push: { activities: activity._id } }
      );

      //send a response after creating experience hosting
      res.json({
        activity: activity,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error from host");
    }
  }
);
// ROUTE 5 posting an activity using : GET "host/activity/hostingid".
router.get("/activity/:id", [], async (req, res) => {
  try {
    //get all activities
    const activities = await Activity.find({ hostingId: req.params.id });

    //send a response after getting experience hosting
    res.json({
      activities,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error from get experience hosting");
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
  },
});
const upload = multer({
  storage: fileStorage,
});

router.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  console.log(path.dirname(path.basename(__dirname)));
  res.send(req.file.filename);
});

router.get("/getimage/:name", (req, res) => {
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
  res.sendFile(path.join(__dirname, "/uploads/", req.params.name));
});

router.post("/update/:id", async (req, res) => {
  try {
    if ("location" in req.body.obj) {
      console.log("loc - ", req.body.obj);

      const locationId = await insertLocation(
        req.body.obj.location.longitude,
        req.body.obj.location.latitude,
        req.body.obj.location.address
      );
      const experience = await ExperienceHosting.updateOne(
        { _id: req.params.id },
        { $set: { location: locationId } }
      );
      res.json(experience);
    } else if ("activities" in req.body.obj) {
      //find all activities of the current experience hosting that is in ExperienceHosting.activities
      const activities = await ExperienceHosting.findById(req.params.id).select(
        "activities"
      );
      console.log(activities.activities);
      //console.log(req.body.obj.activities);
      //console.log(activities.activities[0], req.body.obj.activities[0]._id);

      const activityIds = req.body.obj.activities
        .map((activity) => activity._id)
        .filter((activity) => typeof activity !== "undefined");
      //console.log(activityIds);

      const activitiesToDelete = [];

      for (var i = 0; i < activities.activities.length; i++) {
        var found = false;
        for (var j = 0; j < activityIds.length; j++) {
          if (
            activities.activities[i]._id.toString() ===
            activityIds[j].toString()
          ) {
            found = true;
            break;
          }
        }
        if (!found) {
          activitiesToDelete.push(activities.activities[i]._id);
        }
      }

      console.log("to delete", activitiesToDelete);

      for (var i = 0; i < activitiesToDelete.length; i++) {
        ///delete activity from activity collection
        await Activity.deleteOne({ _id: activitiesToDelete[i] });
      }

      for (var i = 0; i < req.body.obj.activities.length; i++) {
        if (!("_id" in req.body.obj.activities[i])) {
          const activity = await Activity.create({
            activityTitle: req.body.obj.activities[i].activityTitle,
            dayTimeSlots: req.body.obj.activities[i].dayTimeSlots,
            activityDuration: req.body.obj.activities[i].activityDuration,
            activityCost: req.body.obj.activities[i].activityCost,
            additionalRequirements:
              req.body.obj.activities[i].additionalRequirements,
            hostingId: req.params.id,
          });
          activityIds.push(activity._id);
        }
      }

      const experience = await ExperienceHosting.updateOne(
        { _id: req.params.id },
        { $set: { activities: activityIds } }
      );

      res.json(experience);
    } else {
      const experience = await ExperienceHosting.updateOne(
        { _id: req.params.id },
        { $set: req.body.obj }
      );
      res.json(experience);
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .send("Internal Server Error from update experience hosting");
  }
});

module.exports = router;
