const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Song'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
