// insertProducts.js
const mongoose = require('mongoose');
const Product = require('./product');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const products = [
  new Product({
    name: 'Product 1',
    description: 'Description for Product 1',
    price: 10.99,
    stockQuantity: 100
  }),
  // Add more products as needed
];

let done = 0;
for (let i = 0; i < products.length; i++) {
  products[i].save((err, result) => {
    done++;
    if (done === products.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
