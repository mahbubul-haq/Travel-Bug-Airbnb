//dependencies
const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')

//connect to mongoDB
connectToMongo();

//initiate express js
const app = express();
app.use(express.json());
app.use(cors());
const port = 5000;



//available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/host/experience', require('./routes/host'));
app.use('/experience', require('./routes/experience'));
app.use('/payment', require('./routes/payment'));

// app.get('/', (req, res) => {
//   res.send('Hello Travel Bug!');
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`Browse http://localhost:${port}`)
});

