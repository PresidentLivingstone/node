const fs = require('fs');


// Asynchronous Append
fs.appendFile('myfile.txt', 'Appended Text!', (err) => {
  if (err) {
    console.error('Error appending to file (async):', err);
  } else {
    console.log('Asynchronous: Data appended successfully[async].');
  }
});


// Synchronous Append
try {
  fs.appendFileSync('myfile.txt', 'Appended Text!');
  console.log('Synchronous: Data appended successfully[sync].');
} catch (err) {
  console.error('Error appending to file (sync):', err);
}

