const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema, genreValidationSchema } = require('./genre');

const Movie = mongoose.model(
    'Movie',
    mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        genre: {
            type: genreSchema,
            required: true,
        },
        numberInStock: {
            type: Number,
            default: 0,
        },
        dailyRentalRate: {
            type: Number,
            default: 0,
        },
    })
);

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number(),
        dailyRentalRate: Joi.number(),
    });

    return schema.validate(movie);
}

module.exports = {
    Movie,
    validateMovie,
};
