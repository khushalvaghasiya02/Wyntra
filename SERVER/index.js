/* eslint-disable prettier/prettier */
const express = require('express');
const paymentRoutes = require('./src/routes/paymentRoute');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

app.use('/payments', paymentRoutes);

app.get('/', (req, res) => {
  res.send('<h2>Hello world </h2>');
});

app.listen(PORT, () => {
  console.log('API is listening on port', PORT);
});
