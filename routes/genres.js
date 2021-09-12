const express = require('express');
const { Genre, validateGenre } = require('../models/genre');
const { successResult, failureResult } = require('../utils');

const router = express.Router();

async function createGenre(name) {
    try {
        const genre = new Genre({
            name,
        });

        await genre.save();
        return successResult(result);
    } catch (ex) {
        return failureResult(ex.message);
    }
}

async function getGenre(id) {
    try {
        const genres = await (!!id
            ? Genre.findById(id)
            : Genre.find().sort({ name: 1 }));
        if (!genres) {
            return failureResult('Genre not found');
        }
        return successResult(genres);
    } catch (ex) {
        return failureResult(ex.message);
    }
}

async function updateGenre(id, name) {
    const getGenreResult = await getGenre(id);

    if (!getGenreResult.success) return getGenreResult;

    const genre = getGenreResult.data;
    genre.set({
        name,
    });

    try {
        const result = await genre.save();
        return successResult(result);
    } catch (ex) {
        return failureResult(ex.message);
    }
}

async function removeGenre(id) {
    try {
        const result = await Genre.findByIdAndRemove(id);
        return successResult(result);
    } catch (ex) {
        return failureResult(ex.message);
    }
}

router.get('/', async (req, res) => {
    const getGenresResult = await getGenre();
    res.status(200).json(getGenresResult);
});

router.get('/:id', async (req, res) => {
    const getGenreResult = await getGenre(req.params.id);
    res.status(getGenreResult.success ? 200 : 404).json(getGenreResult);
});

router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) {
        return res.status(404).json(failureResult(error.details[0].message));
    }

    const creationResult = await createGenre(req.body.name);

    res.status(creationResult.success ? 201 : 400).json(creationResult);
});

router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) {
        return res.status(400).json(failureResult(error.details[0].message));
    }

    const updateResult = await updateGenre(req.params.id, req.body.name);

    res.status(updateResult.success ? 200 : 400).json(updateResult);
});

router.delete('/:id', async (req, res) => {
    const deleteResult = await removeGenre(req.params.id);

    res.status(deleteResult.success ? 200 : 400).json(deleteResult);
});

module.exports = router;
