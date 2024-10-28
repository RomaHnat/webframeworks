const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    author: String,
    rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
    },
    timestamp: {
    type: Date,
    'default': Date.now
    },
    text: String
    });

const gameSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true
        },
    developer: String,
    rating: {
        type: Number,
        'default': 0,
        min: 0,
        max: 5
        },
    poster: String,
    description: String,
    tags: [String],
    reviews: [reviewSchema]
});

mongoose.model('Game', gameSchema, 'games');


