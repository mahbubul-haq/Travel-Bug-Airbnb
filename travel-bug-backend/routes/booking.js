const express = require("express");
const fetchuser = require("../middleware/fetchUser");
const Booking = require("../models/Booking");
const ExperienceHosting = require("../models/ExperienceHosting");
const Notification = require("../models/Notification");
router = express.Router();

// ROUTE 1 Post Booking : POST "booking/". Login  required
router.post("/", fetchuser, async (req, res) => {
  //console.log(req);
  var success = false;
  try {
    // //if error, return bad request as response
    // //console.log("before validation");
    // const errors = validationResult(req);
    // //console.log("after validation");
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array(), success: success });
    // }

    //create boooking

    const userId = req.user.id;
    const booking = await Booking.create({
      hostingID: req.body.hostingID,
      bookingStartDate: req.body.bookingStartDate,
      bookingEndDate: req.body.bookingEndDate,
      noOfGuests: req.body.noOfGuests,
      user: userId,
      paymentInfo: req.body.paymentInfo,
      selectedActivities: req.body.selectedActivities,
      status: req.body.status,
      cost: req.body.cost,
      host: req.body.host,
    });

    success = true;

    //send a response after creating booking
    res.json({
      success: success,
      booking: booking,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: success,
      error: "Booking not posted.",
    });
  }
});
//Route 2 Get notifications for a user : POST "booking/notifications/"
router.post("/getnotifications/", fetchuser, async (req, res) => {
  var success = false;
  try {
    const userId = req.user.id;
    const notifications = await Notification.find({ host: userId }).sort({
      timeStamp: -1,
    });
    success = true;
    res.json({
      success: success,
      notifications: notifications,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: success,
      error: "Notifications not found.",
    });
  }
});
//Route 3 Get notification count for a user : POST "booking/notificationcount/"
router.post("/notificationcount/", fetchuser, async (req, res) => {
  var success = false;
  try {
    const userId = req.user.id;
    const count = await Notification.countDocuments({
      host: userId,
      unread: true,
    });
    success = true;
    //console.log('count ',count);
    res.json({
      success: success,
      count: count,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: success,
      error: "Notification count not found.",
    });
  }
});

//Route 4 add notification for a user : POST "booking/notification/
router.post("/notification/", fetchuser, async (req, res) => {
  var success = false;
  console.log(req.body);
  const hosting = await ExperienceHosting.findById(req.body.hostingID);

  try {
    const notification = await Notification.create({
      notificationTitle: req.body.notificationTitle,
      timeStamp: req.body.timeStamp,
      host: hosting.host,
      bookingID: req.body.bookingID,
    });
    success = true;
    res.json({
      success: success,
      notification: notification,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: success,
      error: "Notification not added.",
    });
  }
});

module.exports = router;
