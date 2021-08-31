
const express = require('express');
const validateGenre = require('../validations/genres');

const router = express.Router();

const genres = [
    { id: 1, name: "Action" },
    { id: 2, name: "Horror" }
]

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find((g) => g.id === Number(req.params.id));
    if (!genre) return res.status(404).send("The genre with the given id was not found.");

    res.send(genre);
})

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }

    genres.push(genre);

    res.status(201).send(genre);
});

router.put('/:id', (req, res) => {
    const genre = genres.find((g) => g.id === Number(req.params.id));
    if (!genre) return res.status(404).send("Genre not found");

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;

    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find((g) => g.id === Number(req.params.id));
    if (!genre) return res.status(404).send("Genre not found");

    genres.splice(genres.indexOf(genre), 1);

    res.send(genre);
});

module.exports = router;