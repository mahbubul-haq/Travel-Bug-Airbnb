const express = require('express');
router = express.Router();

const stripe = require('stripe')('sk_test_51LOoHWHkY0nQm6DAupqMtonXNrHKfuUElsudLx8XHX2oc5oriDmoN7SOlkaRjBFoTGJsyFKG9Qdjhrs7tc3dsa1X00p0VY29FL');

// ROUTE 1 - Create makepayment using: POST "payment/create". Login required
router.post('/create', async (req, res) => {
    const paymentAmount = req.body.paymentAmount;
    console.log("Payment Amount = " + paymentAmount);

    // Create a payment using the above payment amount in USD
    const payment = await stripe.paymentIntents.create({
        amount: paymentAmount,
        currency: 'usd',
        payment_method_types: ['card'],
        // receipt_email: req.body.email,
        description: 'Payment for booking experience'
    });

    // Send the client the payment ID
    res.send({
        'success': true,
        clientSecret: payment.client_secret,
    });
});

module.exports = router;