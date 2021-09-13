const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const genreRoutes = require('./routes/genres');
const customerRoutes = require('./routes/customers');
const movieRoutes = require('./routes/movies');
const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

if (!config.get('jwtPrivateKey') && process.env.NODE_ENV === 'production') {
    console.error('Jwt private key not provided');
    process.exit(1);
}

const app = express();

mongoose
    .connect('mongodb://localhost:27017/vidly')
    .then(() => console.log('Connected to MongoDb...'))
    .catch((err) => console.log(err));

app.use(express.json());

// routes
app.use('/api/genres', genreRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(3000, () => console.log('Listening on port 3000'));
