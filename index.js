const cors = require("cors");
const express = require("express");

const stripe = require("stripe")("sk_test_gj816UHvwI4jBaxqtWPxMqjA00m81fc2XG");
const uuid = require("uuid/v4");

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.send("IT WORKS AT LEARCODEONLINE");
});

app.post("/payment", (req, res) => {
  const { product, token } = req.body;
  console.log("PRODUCT ", product);
  console.log("PRICE ", product.price);
  const idempontencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id
    })
    .then(customer => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `purchase of ${product.name}`,
         
        },
        { idempontencyKey }
      );
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err));
});

//listen

//pk_test_z4qHynCYQSF8GbRGpAGbPLnw00zjODRCTg


app.listen(8282, () => console.log("LISTENING AT PORT 8282"));