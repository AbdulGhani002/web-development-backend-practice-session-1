const { json } = require("body-parser");
const express = require("express");

const app = express();

const fs = require("fs");

const path = require("path");
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.send(`<h1>Hello Dear!</h1>`);
});

app.get("/currenttime", function (req, res) {
  res.send(`<h1>Current time : ${new Date().toISOString()}</h1>`);
});

app.get("/form", function (req, res) {
  res.send(`<form action="/store-username" method="POST">
    <label for="username">Username : </label>
    <input type="text" name="name" id="username">
    <button>Submit</button>
    </form>`);
});

app.get("/users", function (req, res) {
  const filePath = path.join(__dirname, "data", "users.json");

  const fileData = fs.readFileSync(filePath);

  const existingUsers = JSON.parse(fileData);

  let responseData = `<ul>`;

  for (const user of existingUsers) {
    responseData += `<li>${user}</li>`;
  }

  responseData += `</ul>`;

  res.send(responseData);
});

app.post("/store-username", function (req, res) {
  const name = req.body.name;

  const filePath = path.join(__dirname, "data", "users.json");

  const fileData = fs.readFileSync(filePath);

  const existingUsers = JSON.parse(fileData);

  existingUsers.push(name);

  fs.writeFileSync(filePath, JSON.stringify(existingUsers));

  res.redirect("/users");
});

app.listen(3000);
