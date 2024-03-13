const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Completed', 'Cancelled']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Optional: Reference to payment
  // paymentId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Payment'
  // }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
