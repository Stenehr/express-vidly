const express = require('express');
const { Genre } = require('../models/genre');
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
    const { error } = validateMovie(req.body);
    if (error) {
        return res.status(400).json(failureResult(error.details[0].message));
    }

    try {
    const movieDto = req.body;

    const genre = await Genre.findById(movieDto.genreId);
    if (!genre) {
        return res.status(404).json(failureResult("Genre not found!"));
    }

    const movie = new Movie({
        title: movieDto.title,
        genre: {
            _id: genre.id,
            name: genre.name
        },
        numberInStock: movieDto.numberInStock,
        dailyRentalRate: movieDto.dailyRentalRate
    });

    await movie.save();

    return res.status(200).json(successResult(movie));
    } catch (ex) {
        return res.status(404).json(failureResult(ex.message));
    }
});

router.put('/:id', async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) {
        return res.status(400).json(failureResult(error.details[0].message));
    }

    try {
        const movieDto = req.body;
        const genre = await Genre.findById(movieDto.genreId);
        if (!genre) {
            return res.status(404).json(failureResult("Genre not found!"));
        }

        const result = await Movie.findByIdAndUpdate(req.params.id, {
            $set: {
                title: movieDto.title,
                genre: {
                    name: genre.name
                },
                numberInStock: movieDto.numberInStock,
                dailyRentalRate: movieDto.dailyRentalRate
            }
        }, { new: true });

        return res.status(200).json(successResult(result));
    } catch (ex) {
        return res.status(404).json(failureResult(ex.message));
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Movie.findByIdAndRemove(req.params.id);
        return res.status(200).json(successResult(result));
    } catch (ex) {
        return res.status(404).json(failureResult(ex.message));
    }
});

module.exports = router;
