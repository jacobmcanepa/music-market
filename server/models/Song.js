const mongoose = require('mongoose');

const { Schema } = mongoose;

const songSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0.01
  },
  quantity: {
    type: Number,
    min: 1,
    default: 1
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
