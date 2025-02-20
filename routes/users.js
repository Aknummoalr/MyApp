var express = require('express');
const authenticateToken = require('../middlewares/auth');
var router = express.Router();
//make login form or something 

router.get('/', authenticateToken, function(req, res, next) {
  //res.send('html or json message');
  const html = `
  <form action="/login" method="post">
    <label for="id">ID:</label><br>
    <input type="text" id="id" name="id"><br>

    <label for="username">Firstname:</label><br>
    <input type="text" id="username" name="username"><br>

    <label for="email">Email:</label><br>
    <input type="text" id="email" name="email"><br>

    <button type="submit">Submit</button>
  </form>`;
  // res.send(html);

  res.json({
    message: 'Welcome to the user page You have login through valid token :)',
  })
});


module.exports = router;
