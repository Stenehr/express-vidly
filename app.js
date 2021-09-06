const express = require('express');
const genres = require('./routes/genres');

const app = express();

app.use(express.json());

// routes
app.use('/api/genres', genres);

app.listen(3000, () => console.log("Listening on port 3000"));
