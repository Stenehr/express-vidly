const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const Genre = mongoose.model('Genre', genreSchema);

const genreValidationSchema = Joi.object({
    name: Joi.string().required(),
});

function validateGenre(genre) {
    return genreValidationSchema.validate(genre);
}

module.exports = {
    Genre,
    genreSchema,
    genreValidationSchema,
    validateGenre,
};
