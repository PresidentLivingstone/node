// const express = require('express');
// const app = express();

// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// });

// app.get('/', (req, res) => res.send('Welcome to Home Page'));
// app.listen(3000, () => console.log('Server running on port 3000'));


// const express = require('express');
// const app = express();

// // Custom middleware to log request time
// app.use((req, res, next) => {
//     console.log(`Request received at: ${new Date().toISOString()}`);
//     next();
// });

// app.get('/', (req, res) => res.send('Hello, Middleware!'));
// app.listen(3000, () => console.log('Server running on port 3000'));

const express = require('express');
const app = express();

// Static route
app.get('/', (req, res) => res.send('Welcome!'));

// Dynamic route
app.get('/user/:id', (req, res) => {
    res.send(`User ID: ${req.params.id}`);
});


app.listen(3000, () => console.log('Server running on port 3000'));
