
const http = require('http');
const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'dist', req.url === '/' ? 'index.html' : req.url);
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end();
    return;
  }
  let contentType = 'text/html';
  if (filePath.endsWith('.js')) contentType = 'text/javascript';
  if (filePath.endsWith('.css')) contentType = 'text/css';
  res.writeHead(200, { 'Content-Type': contentType });
  res.end(fs.readFileSync(filePath));
});

server.listen(3000, () => {
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('error', (err) => console.log('JSDOM_ERROR:', err));
  virtualConsole.on('jsdomError', (err) => console.log('JSDOM_INTERNAL_ERROR:', err));
  virtualConsole.on('log', (msg) => console.log('CONSOLE_LOG:', msg));

  JSDOM.fromURL('http://localhost:3000/', {
    runScripts: 'dangerously',
    resources: 'usable',
    virtualConsole
  }).then(dom => {
    setTimeout(() => {
      console.log('Finished waiting');
      process.exit(0);
    }, 4000);
  });
});

