/* Before starting the server build, run below npm code in the terminal:

npm init
npm i express cors mongoose
npm i -save-dev nodemon eslint eslint-plugin-json

*/

const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 3001;


//Here import the controller.js file
const controller = require('./controller');

//  Middleware
app
.use(cors())
.use(express.json());

/* Http methods : GET, POST, PUT, DELETE

app
  .get('/topics', controller.controlerMethod)
  .post('/topics', controller.controlerMethod)
  .put('/topics/:paramName', controller.controlerMethod)
  .delete('/topics/:idParam', controller.controlerMethod);

*/

app.listen(PORT, () => {
  console.log(`Server is now listening to port ${PORT}.`)
});