const express = require('express');
const app = express();
const port = 3000;

// Custom middleware to log requests
const logger = (req, res, next) => {
  console.log(`${new Date()} ${req.method} ${req.url}`);
  next();
};

// Apply the logger middleware to all requests
app.use(logger);

// A basic route handler
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Middleware functions are functions that have access to the request and response objects, and the next middleware in the call stack. They are used to perform tasks like:

// Logging requests
// Authenticating users
// Parsing request bodies
// Validating input data