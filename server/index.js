const express = require("express");
const { getPublicAddress, recoverKey } = require("./utils/utils")

const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0x6d628b23243542c8b9a54077285470e5a05751dc": 100,
  "0x551d8083e1cd9a35bb20663b0cd9c9dcae807db6": 50,
  "0xb1ea530faf7edd852ae7f0aeea4add5723eeba95": 75,
};



app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, signature, recipient, amount } = req.body;

  const recoverPublicKey = recoverKey(signature);

  if (!recoverPublicKey)
    res.status(400).send({ message: "Invalid signature received." });

  const recoveredAddress = getPublicAddress(recoverPublicKey)
  if (!recoveredAddress)
    res.status(400).send({ message: "Could not retrieve address from signature." });

  if (recoveredAddress !== sender)
    res.status(400).send({ message: "Address from signature does not match with sender." });

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
