const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 5500;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;
    
    // If root path, serve index.html
    if (pathname === '/') {
        pathname = 'index.html';
    }
    
    let filePath = path.join(__dirname, pathname);
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - Not Found</h1>');
            return;
        }
        
        let contentType = 'text/html';
        if (filePath.endsWith('.png')) contentType = 'image/png';
        else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) contentType = 'image/jpeg';
        else if (filePath.endsWith('.gif')) contentType = 'image/gif';
        else if (filePath.endsWith('.css')) contentType = 'text/css';
        else if (filePath.endsWith('.js')) contentType = 'application/javascript';
        
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
});

server.listen(PORT, () => {
    console.log(`🎉 Server running at http://localhost:${PORT}`);
    console.log(`📱 Test URL: http://localhost:${PORT}/?table=1&chair=1&guest=ADESAM Table 1 Chair 1`);
});
