const http = require('http');

const hostname = '0.0.0.0',
      port = 5522,
      server = http.createServer((request, resolve) =>
      {
        resolve.statusCode = 200;
        resolve.setHeader('Content-Type', 'text/plain');
        resolve.end('Hello, World!');
      });

server.listen(port, hostname, () =>
{
    console.log(`Server running at http://${hostname}:${port}/`);
});