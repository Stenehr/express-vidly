const Joi = require('joi');
const mongoose = require('mongoose');

const Rental = mongoose.model('Rental', mongoose.Schema({
    customer: {
        type: mongoose.Schema({
            name: {
                type: String,
                required: true,
                trim: true
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                trim: true
            }
        })
    },
    movie: {
        type: mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true
            },
            dailyRentalRate: {
                type: Number,
                required: true
            }
        })
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: Date,
    rentalFee: {
        type: Number,
        min: 0
    }
}));

function validateRental(rental) {
    const schema = Joi.object({
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    });

    return schema.validate(rental);
}

module.exports = {
    Rental,
    validateRental
}
