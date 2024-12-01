const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true); // Parse URL and query parameters
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (pathname === "/") {
      // Serve the index.html file
      fs.readFile("index.html", (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("File not found");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      });
    } else if (pathname === "/dynamic") {
      // Retrieve 'name' and 'age' from query parameters
      const name = query.name || "Livingstone";
      const age = query.age || "22";

      // Generate dynamic response
      const dynamicResponse = `Hello, ${name}! You are ${age} years old.`;

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(dynamicResponse);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Page not found");
    }
  }).listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
