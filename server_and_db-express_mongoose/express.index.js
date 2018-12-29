const express = require('express');
const cors = require('cors');
const router = require('./router');

const { PORT } = require('./config');
const app = express();

//  Middleware
app
.use(cors())
.use(express.json())
.use(router);

app.listen(PORT, () => {
  console.log(`Server is now listening to port ${PORT}.`)
});