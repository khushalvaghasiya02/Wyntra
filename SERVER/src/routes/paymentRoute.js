/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(
  'sk_test_51PQjJtLiUPTed1yfpHGdl8NDdJr75hAVK3Hqj811E0HV7LCBNcrs2pFWoRZ8c2SIHInztLOtq5yiGUGdJ7klzSgB005kvSK61X',
);

// router endpoints
router.post('/intents', async (req, res) => {
  console.log(req.body.amount);
  try {

    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return res.json({paymentIntent: paymentIntent.client_secret});
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

module.exports = router;
