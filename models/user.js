const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}));

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email(),
        password: Joi.string().required()
    });

    return schema.validate(user);
}

module.exports = {
    User,
    validateUser
}
