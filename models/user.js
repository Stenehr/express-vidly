const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            id: this._id,
            isAdmin: this.isAdmin,
        },
        config.get('jwtPrivateKey')
    );
    return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email(),
        password: Joi.string().required(),
    });

    return schema.validate(user);
}

module.exports = {
    User,
    validateUser,
};
