const e = require("express");
const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/v1/todos", (req, res) => {
  fs.readFile(`./dev-data/todos.json`, (err, data) => {
    res.status(201).json(JSON.parse(data));
  });
});

app.post("/api/v1/todos", (req, res) => {
  let newTodo = req.body;
  newTodo.userId = Number(newTodo.userId);
  newTodo.id = Number(newTodo.id);
  newTodo.completed = Boolean(newTodo.completed);
  console.log(newTodo);
  fs.readFile(`./dev-data/todos.json`, (err, data) => {
    let todos = JSON.parse(data);
    let todo = todos.find((e) => e.title === newTodo.title);
    console.log(todo);
    if (!todo) {
      todos.push(newTodo);
      fs.writeFile("./dev-data/todos.json", JSON.stringify(todos), (err) => {
        if (err) {
          console.log(err);
        } else {
          res.status(201).json({ message: "Create successfully" });
        }
      });
    } else {
      res.status(201).json({ message: "Todo already exists" });
    }
  });
  next();
});

app.put("/api/v1/todos/", (req, res) => {
  let update = req.body;
  update.userId = Number(update.userId);
  update.id = Number(update.id);
  update.completed = Boolean(update.completed);
  fs.readFile(`./dev-data/todos.json`, (err, data) => {
    let todos = JSON.parse(data);
    console.log(update);
    let todoIndex = todos.findIndex((e) => e.id == update.id);
    console.log(todoIndex);
    if (todoIndex >= -1) {
      todos[todoIndex] = update;
      fs.writeFile("./dev-data/todos.json", JSON.stringify(todos), (err) => {
        if (err) {
          console.log(err);
        } else {
          res.status(201).json({ message: "Update successfully" });
        }
      });
    } else {
      res.status(201).json({ message: "Todo not found" });
    }
  });
  next();
});

app.delete("/api/v1/todos", (req, res) => {
  fs.readFile(`./dev-data/todos.json`, (err, data) => {
    let todos = JSON.parse(data);
    let deleteIndex = todos.findIndex((e) => e.id == req.body.id);
    console.log(deleteIndex);
    if (deleteIndex >= 0) {
      todos.splice(deleteIndex, 1);
      fs.writeFile("./dev-data/todos.json", JSON.stringify(todos), (err) => {
        if (err) {
          console.log(err);
        } else {
          res.status(201).json({ message: "Delete successfully" });
        }
      });
    } else {
      res.status(201).json({ message: "Todo not found" });
    }
  });
});
app.get("/api/v1/todos/:id", (req, res) => {
  fs.readFile(`./dev-data/todos.json`, (err, data) => {
    let todos = JSON.parse(data);
    let idIndex = todos.findIndex((e) => e.id == req.params.id);
    res.status(201).json(todos[idIndex]);
  });
});
app.get("/", (req, res) => {
  res.status(200).sendFile(`${__dirname}/public/index.html`);
});
app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`);
});
