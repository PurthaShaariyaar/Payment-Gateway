const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  encryptedCardInfo: String, // Encrypted credit card information
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'Pending', // Other statuses: Completed, Failed
    enum: ['Pending', 'Completed', 'Failed']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', paymentSchema);
