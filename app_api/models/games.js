const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, 
  author: { type: String, required: true }, 
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5 
  },
  timestamp: {
    type: Date,
    default: Date.now 
  },
  text: { type: String, required: true } 
});

const gameSchema = new mongoose.Schema({
    name: {type: String, required: true}, 
    developer: {type: String, required: true},
    rating: {type: Number, "default": 0, min: 0, max: 5}, 
    poster: {type: String, required: true},
    description: {type: String, required: true},
    tags: [String], 
  reviews: [reviewSchema]
});

mongoose.model('Game', gameSchema);