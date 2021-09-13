const Joi = require('joi');
const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const { successResult, failureResult } = require('../utils');

const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validateRequest(req.body);
    if (error) {
        return res.status(400).json(failureResult(error.details[0].message));
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json(failureResult('Invalid email or password'));
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(400).json(failureResult('Invalid email or password'));
    }

    const token = user.generateAuthToken();

    res.status(200).json(successResult(token));
});

function validateRequest(req) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    return schema.validate(req);
}

module.exports = router;
