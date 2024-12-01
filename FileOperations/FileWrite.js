const fs = require('fs');
const dataToWrite = 'Hello, Node.js!';
const buffer = Buffer.from(dataToWrite);

// Asynchronous Write
fs.open('myfile.txt', 'w', (err, fd) => {
  if (err) {
    console.error('Error opening file (async):', err);
    return;
  }
  fs.write(fd, buffer, 0, buffer.length, 0, (writeErr, writtenBytes) => {
    if (writeErr) {
      console.error('Error writing file (async):', writeErr);
    } else {
      console.log(`Asynchronous: Wrote ${writtenBytes} bytes to file.`);
    }
    // Optional: Close file descriptor
    fs.close(fd, (closeErr) => {
      if (closeErr) console.error('Error closing file (async):', closeErr);
      else console.log('File closed successfully (async).');
    });
  });
});

// Synchronous Write
try {
  const fd = fs.openSync('myfile.txt', 'w');
  const writtenBytes = fs.writeSync(fd, buffer, 0, buffer.length, 0);
  console.log(`Synchronous: Wrote ${writtenBytes} bytes to file.`);
  // Optional: Close file descriptor
  fs.closeSync(fd);
  console.log('File closed successfully (sync).');
} catch (err) {
  console.error('Error handling file (sync):', err);
}
