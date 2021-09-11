const express = require('express');
const { User, validateUser } = require('../models/user');
const { successResult, failureResult } = require('../utils');

const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.send(400).json(failureResult(error.details[0].message));

    try {
        const { name, email, password} = req.body;

        const user = new User({
            name,
            email,
            password
        });
    
        await user.save();
        return res.status(201).json(successResult(user));
    } catch (ex) {
        return res.status(500).json(failureResult(ex.message));
    }

});

module.exports = router;
