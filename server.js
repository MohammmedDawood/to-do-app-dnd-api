const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const { json } = require("body-parser");
const { nanoid } = require("nanoid");

dotenv.config({ path: "./config.env" });

const app = express();
//request logger
app.use(morgan("tiny"));

app.use(cors());
app.options("*", cors());
// add express json middleware
app.use(express.static(path.join(__dirname, "/src/build")));
app.use(express.json());

let todos = [
  {
    id: nanoid(),
    title: "todo1",
    description: "create react project",
    status: "In Progress",
  },
  {
    id: nanoid(),
    title: "todo2",
    description: "create react project",
    status: "In Progress",
  },
  {
    id: nanoid(),
    title: "todo3",
    description: "create react project",
    status: "In Progress",
  },
];

app.get("/todos", (req, res) => res.send(todos));

app.post("/todos", (req, res) => {
  const todo = {
    id: nanoid(),
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
  };
  todos.push(todo);
  return res.send(todo);
});

app.patch("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  const status = req.body.status;
  if (index > -1) {
    todos[index].status = status;
  }
  return res.send(todos[index]);
});

app.patch("/todos/edit/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  const title = req.body.title;
  const description = req.body.description;
  if (index > -1) {
    todos[index].title = title;
    todos[index].description = description;
  }
  return res.send(todos[index]);
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  if (index > -1) {
    todos.splice(index, 1);
  }

  res.send(todos);
});

app.get("/", (req, res) => {
  res.send("hello world");
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/src/build/index.html"));
// });
// set port, listen for requests
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`.green.bold);
});

// app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));
