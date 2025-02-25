const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const counterServiceUrl = 'http://localhost:4000/update-visits'; 

app.get('/', async (req, res) => {
  try {
    await axios.post(counterServiceUrl);
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } catch (err) {
    console.error("Error contacting counter service:", err);
    res.status(500).send("Error updating visit count.");
  }
});

app.listen(port, () => {
  console.log(`Web service is listening on port ${port}`);
});
