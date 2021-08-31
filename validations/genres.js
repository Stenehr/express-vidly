const Joi = require('joi');

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().required()
    });

    return schema.validate(genre);
}

module.exports = validateGenre;