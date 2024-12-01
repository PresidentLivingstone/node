const http = require("http");

server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write("WELCOME TO THE HOMEPAGE");
    console.log("WELCOME TO THE HOMEPAGE");

  } else if (req.url === '/about') {
    res.write("WELCOME TO THE ABOUT PAGE");
    console.log("WELCOME TO THE ABOUT PAGE");

  } else {
    res.write("PAGE NOT FOUND");

  }
  res.end();
});

server.listen(3000, () => console.log("SERVER RUNNING AT PORT 3000 ......"));
