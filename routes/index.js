var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
const fs = require("fs");
const path = require("path");
const users = require("../data.json");
router.use(express.json()); // Middleware to pass JSON data

function saveUsersToFile(){
  const dataFilePath = path.join(__dirname, "../data.json");
  fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));
}
//Routes

//GET Request
// task 1(a)
//below code will send the response in JSON format(list of users) with details for API
router.get("/api/users", (req, res) => {
  return res.json(users);
});

//below code will send the response in HTML format(list of users in firstname lastname format)
router.get("/users", (req, res) => {
  const html = `
      <ul>
          ${users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join("")}
      </ul>`;
  res.send(html);
});

//find users for given dynamic id /:id

router.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
});
router.get("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    let html = `<h1>User Id: ${user.id}<br> User First Name: ${user.first_name}<br> User Last Name: ${user.last_name}</h1>`;
    res.send(html);
});



//POST request
router.use(express.json()); // Middleware to pass JSON data

// POST /users → Accepts a new user and adds it to the list.
//user is added in json data format.
// task 1(b)
router.post("/users", (req, res) => {
  const user = req.body;
  users.push(user);
  saveUsersToFile();
  res.status(201).json({
      message: "User added successfully",
      users: users
  });
});

// PUT /users/:id → Updates user details.
// task 1(c)
router.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...req.body };
      saveUsersToFile();
      res.status(200).json({
          message: "User updated successfully",
          user: users[userIndex]
      });
  } else {
      res.status(404).json({ message: "User not found" });
  }
});

// DELETE /users/:id → Deletes a user.
// task 1(d)
router.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex !== -1) {
      const deletedUser = users.splice(userIndex, 1);
      saveUsersToFile();
      res.status(200).json({
          message: "User deleted successfully",
          user: deletedUser
      });
  } else {
      res.status(404).json({ message: "User not found" });
  }
});

/*home page. */
router.get('/', function(req, res, next) {
  res.send(`
    <html>
      <head>
        <title>Home Page</title>
      </head>
      <body>
        <h1>Hello, this is the Home page!</h1>
        <ul>
          <li><a href="/users">Users</a></li>
          <li><a href="/database">Database</a></li>
        </ul>
      </body>
    </html>
  `);
});

module.exports = router;