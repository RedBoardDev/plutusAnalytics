const express = require('express');
const app = express();
const port = 60839;

app.get('/', (req, res) => {
    res.status(200).send('API is running');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
