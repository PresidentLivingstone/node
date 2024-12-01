const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse incoming JSON data
app.use(express.json());

// Assuming you have a data store (e.g., in-memory array)
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// Handle GET /users
app.get('/users', (req, res) => {
  res.json(users);
});

// Handle GET /users/:id
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Handle POST /users
app.post('/users', (req, res) => {
  const newUser = req.body;
  
  // Ensure the new user has a name
  if (!newUser.name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  // Generate a new ID for the user (incremental)
  const newId = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
  newUser.id = newId;

  users.push(newUser);
  res.status(201).json(newUser);
});

// Handle DELETE /users/:id
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.json({ message: 'User deleted' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
