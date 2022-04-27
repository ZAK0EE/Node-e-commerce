const { request } = require('express');
const express = require('express');
const router = express.Router();
const User = require('../../models/user.js');
const { verify, verifyAndAuthorization, verifyAndAdmin } = require('../verifyToken')

router.get('/address/:id', verifyAndAuthorization, async (req, res) => {
    try {
        const userAddress = await User.findById(request.params.id).address;
        res.status(200).json(userAddress);
    }
    catch (err) {
        res.status(500).json({ Message: 'there was an ERROR fetching address', Error: err });
    }
})

router.post('/create', async (req, res) => {
    try {
        const newAddress = new User.address = ({
            address: request.body.address,
            city: request.body.city,
            country: request.body.country,
        });
        await newAddress.save()
        res.status(201).json.apply(newAddress)
    } catch (err) {
        res.status(500).json({ Message: 'there was an ERROR adding address', Error: err });
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const removed = await User.updateOne(
            { _id: request.params.id },
            {
                $set: {
                    address: null
                }
            }
        );
        res.status(200).json(removed);
    } catch (err) {
        res.status(500).json({ Message: "the address hasn't been deleted", Error: err });
    }
})

router.put('/update', async (req, res) => {
    try {
        const updated = await user.updateOne(
            { _id: request.params.id },
            {
                $set: {
                    address: {
                        address: request.body.address,
                        city: request.body.city,
                        country: request.body.country,
                    }
                }
            });
        responce.status(201).json(updated);
    } catch (err) {
        res.status(500).json({ Message: `There was an ERROR Updating the user address : ${request.params.id}`, Error: err });
    }
})

module.exports = router;