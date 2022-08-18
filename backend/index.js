const express = require("express");
const app = express();
// This is your test secret API key.
const stripe = require("stripe")('sk_test_428DT589O8KAxCGbLmxyZDsH1k0qxHxkTytW2YbBTtus4fdpYyFm5PNaCk1Osw0IsAuB1S1dnoem2dmRmONmP9B8M00PkLAmLr9');

app.use(express.static("public"));
app.use(express.json());

const port = 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
