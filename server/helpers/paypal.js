const paypal = require("paypal-rest-sdk"); //The paypal-rest-sdk is the official SDK provided by PayPal for Node.js, which allows you to manage payments, transactions.

paypal.configure({
  mode: "sandbox",  // The environment to operate in, either sandbox (for testing)
  client_id: process.env.PAYPAL_CLIENT_ID,  //stored in the environment variable PAYPAL_CLIENT_ID for security
  client_secret: process.env.PAYPAL_SECRET_ID,
});

module.exports = paypal;
