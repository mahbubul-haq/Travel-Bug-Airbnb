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
            timeStamp: req.body.timeStamp,
        });

        const newMessage1 = await Message.find({ _id: newMessage._id }).populate("sender receiver");

        //send a response after sending message
        res.json({
            'success': true,
            'message': newMessage1,
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
        const messages = await Message.find({$or : [{sender: userId}, {receiver: userId}]}).populate("sender receiver").sort({ timeStamp: -1 });

        //send a response after getting messages
        res.json(messages);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error from message/all');
    }
});

// get all messages of sender and receiver

// ROUTE 3 - get all users using: GET "message/users". Login required
router.get('/users', fetchuser, async (req, res) => {
    try {
        //get all users from User
        const users = await User.find({});
        //send a response after getting users
        res.json(users);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error from message/users');
    }
});



module.exports = router;