const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product'); // Ensure this path matches the location of your Product model
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const PORT = 4000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json()); // For parsing application/json

// Products route
app.get('/products', (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      res.status(500).json({ message: "Internal server error" });
      return;
    }
    res.json(products);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
