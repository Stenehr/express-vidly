const mongoose = require('mongoose');
const express = require('express');
const genres = require('./routes/genres');

const app = express();

mongoose.connect('mongodb://localhost:27017/vidly')
    .then(() => console.log('Connected to MongoDb...'))
    .catch(err => console.log(err));

app.use(express.json());

// routes
app.use('/api/genres', genres);

app.listen(3000, () => console.log("Listening on port 3000"));
