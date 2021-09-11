const express = require('express');
const Fawn = require('fawn');
const { Rental, validateRental } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const { successResult, failureResult } = require('../utils');

const router = express.Router();
Fawn.init('mongodb://localhost:27017/vidly');

router.get('/', async (req, res) => {
  try {
    const rentals = await Rental.find();
    return res.status(200).json(successResult(rentals));
  } catch (ex) {
    return res.status(404).json(failureResult(ex.message));
  }
});

router.post('/', async (req, res) => {
  const { error } = validateRental(req.body);
  if (error)
    return res.status(400).json(failureResult(error.details[0].message));

  try {
    const customer = await Customer.findById(req.body.customerId);
    if (!customer)
      return res.status(404).json(failureResult('Customer not found'));

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(404).json(failureResult('Movie not found'));

    const rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        isGold: customer.isGold,
        phone: customer.phone,
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
      dateReturned: new Date() + 5,
      rentalFee: movie.dailyRentalRate * 5,
    });

    const task = new Fawn.Task();
    task.save('rentals', rental);
    task.update(
      'movies',
      { _id: movie._id },
      {
        $inc: { numberInStock: -1 },
      }
    );
    task.run();

    return res.status(404).json(successResult(rental));
  } catch (ex) {
    return res.status(500).json(failureResult(ex.message));
  }
});

module.exports = router;
