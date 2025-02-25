const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

const counterServiceUrl = 'http://localhost:4000/increment'; 

app.use(express.static('public'));

app.get('/', async (_, res) => {
    try {
        const response = await axios.post('counterServiceUrl');
        console.log("Success:", response.data);
        res.status(200).send("Counter updated successfully");
    } catch (error) {
        console.error('Error updating counter:', error);
        res.status(500).send('Error updating counter');
    }
});




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
