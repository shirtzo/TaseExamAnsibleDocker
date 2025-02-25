const express = require('express');
const axios = require('axios');
const app = express();

app.get('/', async (req, res) => {
  try {
    await axios.post('http://localhost:8081/update-visits');

    res.send(`
      <html>
        <body>
          <h1>Hello World</h1>
          <p>Every time you visit this page, the visit count will be updated in the database.</p>
        </body>
      </html>
    `);
  } catch (err) {
    console.error("Error contacting counter service:", err);
    res.status(500).send("Error updating visit count.");
  }
});

app.listen(8080, () => {
  console.log('Web service is listening on port 8080');
});
