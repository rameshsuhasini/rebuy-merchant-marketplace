const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors({ origin: 'http://localhost:4200' })); // allow Angular dev
app.use(express.json());

// 👉 import offers from separate file
let offers = require('./data.json');

// GET /offers -> list all
app.get('/offers', (req, res) => {
  res.json(offers);
});

// GET /offers/:id -> single offer
app.get('/offers/:id', (req, res) => {
  const id = Number(req.params.id);
  const offer = offers.find((o) => o.id === id);
  if (!offer) {
    return res.status(404).json({ message: 'Offer not found' });
  }
  res.json(offer);
});

// PATCH /offers/:id/vote { delta: +1 or -1 }
app.patch('/offers/:id/vote', (req, res) => {
  const id = Number(req.params.id);
  const { delta } = req.body;

  const index = offers.findIndex((o) => o.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Offer not found' });
  }

  const updated = {
    ...offers[index],
    votes: offers[index].votes + Number(delta || 0),
  };

  offers[index] = updated;

  res.json(updated);
});

app.listen(PORT, () => {
  console.log(`Local backend listening on http://localhost:${PORT}`);
});
