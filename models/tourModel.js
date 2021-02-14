const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.Now,
  },
  name: {
    type: String,
    required: [true, 'A tour must contain a name'],
    unique: [true, 'A tour with this name already exists'],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must contain a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
