const express = require('express');
const fetchuser = require("../middleware/fetchUser");
const Booking =require("../models/Booking");
router = express.Router();

// ROUTE 1 Post Booking : POST "booking/". Login  required
router.post('/', fetchuser, async (req, res) => {
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
        console.log(req.body);
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
        });
        success = true;

        //send a response after creating booking
        res.json({
            success: success,
            booking:booking,
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: success,
            error: "Booking not posted."
        });
    }
});
module.exports = router;