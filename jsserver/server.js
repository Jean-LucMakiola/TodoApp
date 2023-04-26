const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let todos = [
  { id: 1, title: 'Learn JavaScript', description: 'Read a book or take a course', completed: false },
  { id: 2, title: 'Build a Todo app', description: 'Using a web framework or plain JS', completed: false },
];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const todo = req.body;
  todo.id = todos.length + 1;
  todos.push(todo);
  res.json(todo);
});

app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const completed = req.body.completed;
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    res.sendStatus(404);
    return;
  }
  todo.completed = completed;
  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) {
    res.sendStatus(404);
    return;
  }
  todos.splice(index, 1);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
