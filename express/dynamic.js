const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form at the root
app.get('/', (req, res) => {
  const formHTML = `
    <html>
      <body>
        <h1>Enter your Name and Age</h1>
        <form action="/submit" method="POST">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required><br><br>
          <label for="age">Age:</label>
          <input type="text" id="age" name="age" required><br><br>
          <input type="submit" value="Submit">
        </form>
      </body>
    </html>
  `;
  res.send(formHTML);
});

// Handle form submission
app.post('/submit', (req, res) => {
  const name = req.body.name || 'Guest';
  const age = req.body.age || 'unknown';

  // Respond with dynamic content
  const dynamicResponse = `Hello, ${name}! You are ${age} years old.`;
  res.send(dynamicResponse);
});

// 404 for unmatched routes
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}....http://localhost:3000`);
});
