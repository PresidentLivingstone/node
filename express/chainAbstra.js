const express = require('express');
const app = express();
const port = 3000;

// Middleware to log requests with IP address and status
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Middleware to authenticate users
app.use('/protected', (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[0]; // "Bearer myToken"
  if (token === 'myToken') {
    req.user = { id: 1, name: 'John Doe', role: 'admin' };
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized. Invalid token.' });
  }
});

// Protected route handler with authentication
app.get('/protected', (req, res) => {
  res.json({
    message: `Hello, ${req.user.name}`,
    userId: req.user.id,
    role: req.user.role
  });
});

// Default route to test server
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// Centralized error handler (catch-all for unexpected errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
