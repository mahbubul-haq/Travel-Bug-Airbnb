//dependencies
const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')

//connect to mongoDB
connectToMongo();

//initiate express js
const app = express();
app.use(cors());
const port = 5000;

app.use(express.json());

//available routes
app.use('/api/auth', require('./routes/auth'));

// app.get('/', (req, res) => {
//   res.send('Hello Travel Bug!');
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`Browse http://localhost:${port}`)
});

