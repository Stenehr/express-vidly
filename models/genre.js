
const Joi = require('joi');
const mongoose = require("mongoose");

const Genre = mongoose.model(
    "Genre",
    mongoose.Schema({
        name: {
            type: String,
            required: true
        }
    })
);


function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().required()
    });

    return schema.validate(genre);
}

module.exports = {
    Genre,
    validateGenre
};
