const express = require("express");
router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Booking = require("../models/Booking");
const stripe = require("stripe")(
  "sk_test_51LbLZjLOMUpyuAnrFpTNQWin9nkLkhgpMmN4YAK1PaegMP20KCmFw1FBR0x71n0goKuGHDRPaA6n9bX4Fe4DK77F00Vx50z7Gl"
);
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");
const PaymentInfo = require("../models/PaymentInfo");

// ROUTE 1 - Create makepayment using: POST "payment/create/". Login required
router.post("/create", fetchuser, async (req, res) => {
  var success = false;

  const booking = req.body.booking;

  const userId = req.user.id;
  const user = await User.findById(userId);
  const idempotencyKey = uuidv4();
  if (booking.user != userId) {
    return res.status(400).json({
      success: success,
      error: "You are not authorized to make payment for this booking.",
    });
  }
  return stripe.customers
    .create({
      email: req.body.token.email,
      source: req.body.token.id,
    })
    .then((customer) => {
      return stripe.charges.create(
        {
          amount: booking.cost * 100,
          currency: "usd",
          customer: customer.id,
          description: "Payment for booking",

          //shipping address from card
          shipping: {
            name: req.body.token.card.name,
            address: {
              line1: req.body.token.card.address_line1,
              line2: req.body.token.card.address_line2,
              city: req.body.token.card.address_city,
              country: req.body.token.card.address_country,
              postal_code: req.body.token.card.address_zip,
            },
          },
        },
        { idempotencyKey }
      );
    })
    .then((result) => {
      // console.log(result);
      //insert payment info into booking

      const paymentInfo = PaymentInfo.create({
        paidAmount: result.amount / 100,
        paymentMethod: result.payment_method,
        billingAddress: result.billing_details.address,
        bookingID: booking._id,
      }).then((paymentInfo) => {
        console.log("payment", paymentInfo);
        const bookin = Booking.findByIdAndUpdate(
            booking._id,
            { paymentID: paymentInfo._id, status:"confirmed"
             }).then((booking) => {
                console.log("booking", booking);
            }).catch((err) => {
                console.log(err);
            });
        });

      //update Booking table with payment info
      //update Booking table with paymentID


      

      success = true;

      return res.json({
        success: success,
        result: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: success,
        error: err.message,
      });
    });
});

///get payment for a bookingID "/payment/:bookingID"
router.get("/:bookingID", fetchuser, async (req, res) => {
  const bookingID = req.params.bookingID;
  const paymentInfo = await PaymentInfo.findOne({ bookingID: bookingID });
  if (!paymentInfo) {
    return res.status(400).json({
      success: false,
      error: "No payment found for this booking.",
    });
  }
  return res.json({
    success: true,
    paymentInfo: paymentInfo,
  });
});

module.exports = router;
