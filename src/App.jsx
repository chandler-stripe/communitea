import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Grid, TextField} from '@mui/material';

import CheckoutForm from "./CheckoutForm";
import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51LVHceFpO6nr5bCj4mVEYWhePvtgFkHePOYg9QGRIHGp6Q18XQtIYdnlvO2x2bCmf9C7YslEPTlvTfzEHo2sRth200ugzm28jC");

export default function App() {
  const [clientSecret, setClientSecret] = useState("");
  const [health, setHealth] = useState(0);
  const [synergy, setSynergy] = useState(0);
  const [clearly, setClearly] = useState(0);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [health*4, synergy*5, clearly*6] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [health, synergy, clearly]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <div>
          <Grid container spacing={0} sx={{mt: 15}} direction="row" alignItems="center" justifyContent="center">
            <Grid item md={4}>
              <img width="200" height="200" src="https://m.media-amazon.com/images/I/716kdsfd1uS._SL1500_.jpg" />
            </Grid>
            <Grid item md={4}>
              <h1>Health-ADE</h1>
              <h3>$4</h3>
            </Grid>
            <Grid item md={4}>
              <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} value={health} onChange={e => setHealth(e.target.value)}/>
            </Grid>
            <Grid item md={4}>
              <img width="200" height="200" src="https://cdn.shopify.com/s/files/1/0287/2200/4021/files/Menu_Images_480x.png?v=1657053579" />
            </Grid>
            <Grid item md={4}>
              <h1>Synergy</h1>
              <h3>$5</h3>
            </Grid>
            <Grid item md={4}>
              <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} value={synergy} onChange={e => setSynergy(e.target.value)} />
            </Grid>
            <Grid item md={4}>
              <img width="200" height="200" src="https://cdn.shopify.com/s/files/1/0418/3746/1655/products/ck-raspberry-lemonade-bottle-1200x1600_1000x1000.png?v=1603111262" />
            </Grid>
            <Grid item md={4}>
              <h1>Clearly</h1>
              <h3>$6</h3>
            </Grid>
            <Grid item md={4}>
              <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} value={clearly} onChange={e => setClearly(e.target.value)} />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </Grid>
        </div>
      )}
    </div>
  );
}