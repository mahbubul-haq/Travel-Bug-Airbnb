const express = require('express');
const Message = require('../models/Message');
const User = require('../models/User');
const fetchuser = require("../middleware/fetchUser");

router = express.Router();

// ROUTE 1 - send a message using: POST "message/send". Login required
router.post('/send', async (req, res) => {
    try {
        // save message to database
        const newMessage = await Message.create({
            messageText: req.body.messageText,
            sender: req.body.sender,
            receiver: req.body.receiver,
        });

        //send a response after sending message
        res.json({
            'success': true,
            'message': newMessage,
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error from message/send');
    }
});

// ROUTE 2 - get all messages using: GET "message/all". Login required
router.get('/all', fetchuser, async (req, res) => {
    try {
        //get all messages
        const userId = req.user.id;
        const messages = await Message.find({sender: userId});

        //send a response after getting messages
        res.json(messages);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error from message/all');
    }
});


module.exports = router;