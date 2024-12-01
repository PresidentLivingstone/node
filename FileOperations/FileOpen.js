const fs = require('fs');

// Asynchronous
fs.open('myfile.txt', 'r', 0o644, (err, fd) => {
  if (err) throw err;
  console.log('File opened successfully [open]:', fd);
  
  // Close the file descriptor
  fs.close(fd, (closeErr) => {
    if (closeErr) throw closeErr;
    console.log('File closed successfully [close].');
  });
});

// Synchronous
try {
  const fd = fs.openSync('myfile.txt', 'r', 0o644);
  console.log('File opened successfully [openSync]:', fd);
  
  // Close the file descriptor
  fs.closeSync(fd);
  console.log('File closed successfully [closeSync].');
} catch (err) {
  console.error('Error handling file:', err);
}
 