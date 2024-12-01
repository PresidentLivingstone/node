const express = require('express')
const app = express();
const port = 3000;

// Handle GET requests for the root URL (/)
app.get('/', (req, res) => {
    res.send('<h1>Hello, World!</h1>');
});
  
// Handle GET requests for the /about URL
  app.get('/about', (req, res) => {
    res.send('<h1>This is the About page.</h1>');
});
  
app.listen(port, () => {
    console.log(`Server listening on port ${port}........http://localhost:3000`);
});

// STEPS

// 1. mkdir express-server
//    cd express-server
//    npm init -y

// 2. npm install express

// 3. Creating the Server:
//    Create a new file named index.js and add the following code:

// 4. node index.js

// Open your web browser and navigate to http://localhost:3000 to see the "Hello, World!" message.
// Navigate to http://localhost:3000/about to see the "This is the About page." message.