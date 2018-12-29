# Mongoose and Express - Workflow 

```js
📦server_and_db-express_mongoose
┣ 📂model
┃ ┗ 📜modelName.js
┣ 📂schemas
┃ ┗ 📜schemaName.js
┣ 📜README.md
┣ 📜config.js
┣ 📜controller.js
┣ 📜db.js
┣ 📜express.index.js
┗ 📜router.js
```



## Install Dependencies

```bash
npm init
npm i express cors mongoose
npm i -save-dev nodemon eslint eslint-plugin-json
```



## Setup Express

```javascript
//  `index.js`
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 3000;

//Here import the controller.js file
const controller = require('./controller');

//  Middleware
app
.use(cors())
.use(express.json());

/* Http methods (Router) : GET, POST, PUT, DELETE
app
  .get('/topics', controller.controlerMethod)
  .post('/topics', controller.controlerMethod)
  .put('/topics/:paramName', controller.controlerMethod)
  .delete('/topics/:idParam', controller.controlerMethod);
*/

app.listen(PORT, () => console.log(`Server is now listening to port ${PORT}.`));
```



# `index.js`

