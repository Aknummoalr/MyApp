var express = require('express');
const authenticateToken = require('../middlewares/auth');
var router = express.Router();
//make login form or something 

router.get('/', function(req, res, next) {
  //res.send('html or json message');
  const html = `
  <html>
    <head>
      <title>Login Form</title>
      <style>
        body {
          font-family: Arial, sans-sefirst
          background-color: #f4f4f4;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        form {
          background: #fff;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
        }
        input[type="text"] {
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          background-color: #4CAF50;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #45a049;
        }
      </style>
    </head>
    <body>
      <form action="/login" method="post">
        <label for="id">ID:</label>
        <input type="text" id="id" name="id"><br>

        <label for="firstname">Firstname:</label>
        <input type="text" id="firstname" name="firstname"><br>

        <label for="email">Email:</label>
        <input type="text" id="email" name="email"><br>
        
        <button type="submit">Submit</button>
      </form>
    </body>
  </html>`;
  res.send(html);

  // res.json({
  //   message: 'Welcome to the user page You have login through valid token :)',
  // })
});


module.exports = router;
