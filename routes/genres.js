const express = require("express");
const mongoose = require("mongoose");
const validateGenre = require("../validations/genres");

const router = express.Router();

const Genre = mongoose.model(
    "Genre",
    mongoose.Schema({
        name: {
            type: String,
            required: true
        }
    })
);

function operationResult(success, data, err) {
    return {
        success,
        data,
        error: err
    };
}

async function createGenre(name) {
    console.log(name);
    const genre = new Genre({
        name
    });

    try {
        const result = await genre.save();
        return operationResult(true, result);
    } catch (ex) {
        return operationResult(false, null, ex.message);
    }
}

async function getGenre(id) {
    try {
        const genres = await (!!id ? Genre.findById(id) : Genre.find().sort({ name: 1}));
        return operationResult(true, genres);
    } catch (ex) {
        return operationResult(false, null, ex.message);
    }
}

async function updateGenre(id, name) {
    const getGenreResult = await getGenre(id);

    if (!getGenreResult.success) return getGenreResult;

    const genre = getGenreResult.data;
    genre.set({
        name
    });

    try {
        const result = await genre.save();
        return operationResult(true, result);
    } catch (ex) {
        return operationResult(false, null, ex.message);
    }
}

async function removeGenre(id) {
    try {
        const result = await Genre.findByIdAndRemove(id);
        return operationResult(true, result);
    } catch (ex) {
        return operationResult(false, null, ex.message);
    }
}

router.get("/", async (req, res) => {
    const genres = await getGenre();
    res.status(200).json(genres);
});

router.get("/:id", async (req, res) => {
    const getGenreResult = await getGenre(req.params.id);
    if (!getGenreResult.success) return res.status(404).json(getGenreResult);

    res.status(200).json(getGenreResult);
});

router.post("/", async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(404).json(operationResult(false, null, error.details[0].message));

    const creationResult = await createGenre(req.body.name);

    if (!creationResult.success) return res.status(400).json(creationResult);

    res.status(201).json(creationResult);
});

router.put("/:id", async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).json(operationResult(false, null, error.details[0].message));

    const updateResult = await updateGenre(req.params.id, req.body.name);
    if (!updateResult.success) return res.status(400).json(updateResult);

    res.status(200).json(updateResult);
});

router.delete("/:id", async (req, res) => {
    const deleteResult = await removeGenre(req.params.id);
    if (!deleteResult.success) return res.status(400).json(deleteResult);

    res.status(200).json(deleteResult);
});

module.exports = router;
