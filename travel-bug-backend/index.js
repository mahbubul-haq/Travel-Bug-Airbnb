//dependencies
const connectToMongo = require('./db');
const express = require('express')

//connect to mongoDB
connectToMongo();

//initiate express js
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello Travel Bug!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`Browse http://localhost:${port}`)
});

