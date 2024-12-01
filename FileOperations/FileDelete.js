const fs = require('fs');


// Asynchronous Delete
fs.unlink('myfile.txt', (err) => {
  if (err) {
    console.error('Error deleting file (async):', err);
  } else {
    console.log('Asynchronous: File deleted successfully(async).');
  }
});


// Synchronous Delete
try {
  fs.unlinkSync('myfile.txt');
  console.log('Synchronous: File deleted successfully(sync).');
} catch (err) {
  console.error('Error deleting file (sync):', err);
}
