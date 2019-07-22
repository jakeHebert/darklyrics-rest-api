const express = require('express');
const app = express();
const cors = require('cors');
const lyricsRoute = require('./routes/lyrics');

// Middlewares
// app.use(bodyParser.json());     // Gives JSON return data on body
app.use(cors());
app.use('/lyrics', lyricsRoute);

app.listen(3000);
console.log('Server is listening on localhost:3000/');