const express = require('express');
const mongoose = require('mongoose');
const NodeRSA = require('node-rsa');
const bodyParser = require('body-parser');
const Payment = require('./src/models/payment'); // Import the Payment model

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();
app.use(bodyParser.json());

// RSA Setup - Keys should be securely managed, example uses .env
const privateKey = new NodeRSA(process.env.PRIVATE_KEY); // Assume PRIVATE_KEY is in your .env file
const publicKey = new NodeRSA(process.env.PUBLIC_KEY); // Assume PUBLIC_KEY is in your .env file

const encryptCardInfo = (cardInfo) => {
  return publicKey.encrypt(cardInfo, 'base64');
};

const decryptCardInfo = (encryptedCardInfo) => {
  return privateKey.decrypt(encryptedCardInfo, 'utf8');
};

// Payment Endpoints
app.post('/payment', async (req, res) => {
  const { userId, cardInfo, amount } = req.body;
  const encryptedCardInfo = encryptCardInfo(cardInfo);

  const payment = new Payment({
    userId,
    encryptedCardInfo,
    amount
  });

  try {
    await payment.save();
    res.status(201).json({ message: 'Payment initiated' });
  } catch (error) {
    res.status(400).json({ message: 'Error processing payment', error: error.message });
  }
});

app.get('/payment/:paymentId', async (req, res) => {
  const { paymentId } = req.params;

  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    // Decrypting for demonstration; consider security implications
    payment.encryptedCardInfo = decryptCardInfo(payment.encryptedCardInfo);
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving payment', error: error.message });
  }
});

const PORT = 4003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
