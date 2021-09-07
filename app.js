const mongoose = require('mongoose');
const express = require('express');
const genreRoutes = require('./routes/genres');
const customerRoutes = require('./routes/customers');

const app = express();

mongoose.connect('mongodb://localhost:27017/vidly')
    .then(() => console.log('Connected to MongoDb...'))
    .catch(err => console.log(err));

app.use(express.json());

// routes
app.use('/api/genres', genreRoutes);
app.use('/api/customers', customerRoutes);

app.listen(3000, () => console.log("Listening on port 3000"));
