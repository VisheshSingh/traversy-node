const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
  //   if (req.url === '/') {
  //     res.writeHead(200, { 'Content-Type': 'text/html' });
  //     res.end(`<h1>Home!</h1>`);
  //   }
  //   if (req.url === '/about') {
  //     res.writeHead(200, { 'Content-Type': 'text/html' });
  //     res.end(`<h1>About</h1>`);
  //   }
  //   if (req.url === '/') {
  //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
  //       res.writeHead(200, { 'Content-Type': 'text/html' });
  //       if (err) throw err;
  //       res.end(data);
  //     });
  //   }

  const filePath = path.join(
    __dirname,
    'public',
    req.url === '/' ? 'index.html' : req.url
  );

  const extname = path.extname(filePath);

  let contentType = 'text/html';

  switch (extname) {
    case '.js':
      contentType = 'text/js';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    default:
      contentType = contentType;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, data) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          if (err) throw err;
          res.end(data, 'utf8');
        });
      } else {
        res.writeHead(500);
        res.end();
      }
    } else {
      res.writeHead(404, { 'Content-Type': contentType });
      res.end(data, 'utf8');
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
