const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchUser");
const Transport = require("../models/Transport");
const TransportProvider = require('../models/TransportProvider');
const TransportCategory = require('../models/TransportCategory');
const JWT_SECRET = 'travel-bug-secret-auth-token';

const router = express.Router();
//ROUTE 1 - create an user using: POST "transport/createuser". No login required
router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 1 }),
    body('firstName', 'Enter a valid first name').isLength({ min: 1 }),
    body('lastName', 'Enter a valid last name').isLength({ min: 1 }),
], async (req, res) => {
    let success = false;

    //if error, return bad request as response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: success, errors: errors.array() });
    }

    try {
        //check whether the user exists already
        let user = await TransportProvider.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success: success, errors: 'Sorry. User with this email already exists' });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);

        //create user
        user = await TransportProvider.create({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNo: req.body.phoneNo,
            password: secPass,
        });

        //send a response after creating user
        //sending a auth token
        const data = {
            user: {
                id: user.id,
            }
        };

        const authToken = jwt.sign(data, JWT_SECRET);

        success = true;
        res.json({
            success: success,
            authToken: authToken
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});
//ROUTE 2 - Get logged in user details using: POST "transport/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await TransportProvider.findById(userId).select("-password"); //except the password
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});
//ROUTE 3 - Authenticate an user using: POST "transport/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
], async (req, res) => {
    let success = false;
    //if error, return bad request as response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await TransportProvider.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ success: success, errors: 'Please try to login with correct credentials' });
        }

        const passwordComapare = await bcrypt.compare(password, user.password);
        if (!passwordComapare) {
            return res.status(400).json({ success: success, errors: 'Please try to login with correct credentials' });
        }

        //send a response after successful login
        //sending a auth token
        const data = {
            user: {
                id: user.id,
            }
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({
            success: success,
            authToken: authToken
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

});
// ROUTE 4 Get all transport categories of hosting using : GET "transport/categories". Login  required
router.get('/categories', async (req, res) => {
    try {
        //get all the categories
        const categories = await TransportCategory.find();

        //send a response after getting categories
        res.json(categories);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error from tansport/categories');
    }
});

// ROUTE 5 add a transport details using : POST "transport/addtransport". Login required
router.post('/addtransport', [
    body('transportName', 'Please enter a name').isLength({ min: 1 }),
    body('transportCategory', 'Please enter a category').isLength({ min: 1 }),
], fetchuser, async (req, res) => {
    let success = false;
    //if error, return bad request as response
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({success: success, errors: errors.array() });
    // }

    try {
        //get user id
        const userId = req.user.id;

        // create transport
        const transport = await Transport.create({
            transportName: req.body.transportName,
            transportCategory: req.body.transportCategory,
            timeSlots: req.body.timeSlots,
            transportProvider: userId,
            source: req.body.source,
            destination: req.body.destination,
            totalCost: req.body.totalCost,
            stopages: req.body.stopages,
        });
        success = true;
        res.json({
            success: success,
            transport: transport,
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error from tansport/addtransport');
    }
});

// ROUTE 6 get the transport guideline using POST: "transport/getguideline". Login required
router.post('/getguideline', async(req, res)=>{
    let success = false;
    console.log(req.body);
    const mySource = {
        "long": req.body.source.long,
        "lat": req.body.source.lat
    }

    const myDestination = {
        "long": req.body.destination.long,
        "lat": req.body.destination.lat
    }

    try {
        const data = await Transport.find();
        console.log(data);
        let myData = [];
        for(let i = 0; i<data.length; i++){
            const stopages = data[i].stopages;
            if(getDistanceFromLatLonInKm(mySource.lat, mySource.long, data[i].source.lat, data[i].source.long) <= 2){
                if(getDistanceFromLatLonInKm(myDestination.lat, myDestination.long, data[i].destination.lat, data[i].destination.long) <= 2){
                    myData.push(data[i]);
                    i++;
                }
                else{
                    for(let j = 0; j<stopages.length; j++){
                        if(getDistanceFromLatLonInKm(myDestination.lat, myDestination.long, stopages[j].lat, stopages[j].long) <= 2){
                            myData.push(data[i]);
                            i++;
                            break;
                        }
                    }
                }
            }
            else{
                for(let j = 0; j<stopages.length; j++){
                    if(getDistanceFromLatLonInKm(mySource.lat, mySource.long, stopages[j].lat, stopages[j].long) <= 2){
                        if(getDistanceFromLatLonInKm(myDestination.lat, myDestination.long, data[i].destination.lat, data[i].destination.long) <= 2){
                            myData.push(data[i]);
                            i++;
                        }
                        else{
                            for(let k = j+1; k<stopages.length; k++){
                                if(getDistanceFromLatLonInKm(myDestination.lat, myDestination.long, stopages[k].lat, stopages[k].long) <= 2){
                                    myData.push(data[i]);
                                    i++;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        success = true;
        res.json({
            success: success,
            guideline: myData,
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error from tansport/addtransport');
    }

});

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

module.exports = router;