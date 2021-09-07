const Joi = require('joi');

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().required(),
        isGold: Joi.bool().optional(),
        phone: Joi.string()
    });

    return schema.validate(customer);
}

module.exports = validateCustomer;
