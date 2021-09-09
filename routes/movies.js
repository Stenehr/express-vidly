const express = require('express');
const { Movie, validateMovie } = require('../models/movie');
const { successResult, failureResult } = require('../utils');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        return res.status(200).json(successResult(await Movie.find()));
    } catch (ex) {
        return res.status(400).json(failureResult(ex.message));
    }
});

router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json(failureResult('Movie not found.'))
        }

        return res.status(200).json(successResult(movie));
    } catch (ex) {
        return res.status(400).json(failureResult(ex.message));
    }
});

router.post('/', async (req, res) => {
    try {
    const { error } = validateMovie(req.body);
    if (error) {
        return res.status(400).json(failureResult(error.details[0].message));
    }
    const movieDto = req.body;

    const movie = new Movie({
        title: movieDto.title,
        genre: movieDto.genre,
        numberInStock: movieDto.numberInStock,
        dailyRentalRate: movieDto.dailyRentalRate
    });

    const result = await movie.save();

    return res.status(200).json(successResult(result));
    } catch (ex) {
        return res.status(404).json(failureResult(ex.message));
    }
});

module.exports = router;
