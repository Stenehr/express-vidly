const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model(
    'Customer',
    mongoose.Schema({
        isGold: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String
        }
    })
);

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().required(),
        isGold: Joi.bool().optional(),
        phone: Joi.string()
    });

    return schema.validate(customer);
}

module.exports = {
    Customer,
    validateCustomer
};
