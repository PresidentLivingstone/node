const fs = require('fs');

// File path and buffer configuration
const buffer = Buffer.alloc(1024); // Allocate a buffer of 1024 bytes

// Asynchronous Read
fs.open('myfile.txt', 'r', (err, fd) => {
  if (err) {
    console.error('Error opening file (async):', err);
    return;
  }

  fs.read(fd, buffer, 0, buffer.length, 0, (readErr, bytesRead, data) => {
    if (readErr) {
      console.error('Error reading file (async):', readErr);
    } else {
      console.log(`Asynchronous: Read ${bytesRead} bytes from file.`);
      console.log('Data:', data.toString('utf8', 0, bytesRead));
    }
    // Close the file descriptor
    fs.close(fd, (closeErr) => {
      if (closeErr) console.error('Error closing file (async):', closeErr);
      else console.log('File closed successfully (async).');
    });
  });
});

// Synchronous Read
try {
  const fd = fs.openSync('myfile.txt', 'r'); // Open file for reading
  const bytesRead = fs.readSync(fd, buffer, 0, buffer.length, 0);
  console.log(`Synchronous: Read ${bytesRead} bytes from file.`);
  console.log('Data:', buffer.toString('utf8', 0, bytesRead));
  fs.closeSync(fd); // Close the file descriptor
  console.log('File closed successfully (sync).');
} catch (err) {
  console.error('Error handling file (sync):', err);
}
