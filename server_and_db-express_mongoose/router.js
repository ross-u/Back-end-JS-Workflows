const express = require('express');
const fs = require('fs');
const controller = require('./controller');
const Router = express.Router;

const router = new Router();
let _404;

fs.readFile('./404.html', (err, data) => {
  if (err) _404 = 'The requested URL was not found on this server.';
  else _404 = data;
});

router.get('/endpoint', controller.get);
router.post('/endpoint', controller.post);
router.put('/endpoint/:paramName', controller.increment);
router.put('/endpoint/:paramName', controller.decrement);
router.delete('/endpoint/:idParam', controller.delete);

// Catchcall for "Not Found"
router.get('/*', (req, res) => {
  res.status(404);
  res.send(_404);
    //`res.send() and `res.json()` both allow us to "send" some data, and both as well "end" the response,
    // so there's no need to explicitly call `res.end()` .
});

module.exports = router;  