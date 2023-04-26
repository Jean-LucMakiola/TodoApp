const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;


const secret = 'supersecret';
function generateToken(user) {
    const payload = { username: user.username };
    return jwt.sign(payload, secret, { expiresIn: '1h' });
  }
  
  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      res.sendStatus(401);
      return;
    }
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        res.sendStatus(403);
        return;
      }
      req.user = user;
      next();
    });
  }
  app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hash });
    await user.save();
    const token = generateToken(user);
    res.json({ token });
  });
  
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.sendStatus(401);
      return;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.sendStatus(401);
      return;
    }
    const token = generateToken(user);
    res.json({ token });
  });
  
  app.get('/todos', authenticateToken, (req, res) => {
    res.json([
      { id: 1, title: 'Learn JavaScript', description: 'Read a book or take a course', completed: false },
      { id: 2, title: 'Build a Todo app', description: 'Using a web framework or vanilla JS', completed: false },
      { id: 3, title: 'Deploy Todo app', description: 'Using a cloud hosting platform', completed: false },
    ]);
  });
  