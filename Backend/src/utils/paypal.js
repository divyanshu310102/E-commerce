import paypal from 'paypal-rest-sdk'

paypal.configure({
    mode: "sandbox",
    client_id: "AfNUvkA39BV0VYGdYZS4IuG6JB3enVx2-tuXO1RP-yEbB8nOPHJ3P1Amb1RWcOEYw508B8lrSKG3tWJJ",
    client_secret: "EKmrFQ9-m2M0xjohBNoLNz8wsBA3uHej8cE2b9dRbOPK0id-hT7EO9Lqou1OzNtxOOlFdgGraT7wNjmf",
  });

  export {paypal}