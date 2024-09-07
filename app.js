const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const { pathname } = new URL(req.url, 'http://${req.headers.host}');

    function showFile(res, filepath, contentType) {
        fs.readFile(filepath, 'utf8', (err, content) => {
            if(err) {
                res.writeHead(500, {'Content-Type': 'text/plain'})
                res.end('500 Internal Server Error');
                return;
            }
            res.writeHead(200, {'Content-Type': contentType})
            res.end(content);
        })
    }

    //Handle homepage
    if(pathname === '/') {
        showFile(res, path.join(__dirname, 'views', 'index.html'), 'text/html');
    } else if (pathname === '/about') {
        showFile(res, path.join(__dirname, 'views', 'about.html'), 'text/html');
    } else if(pathname === '/contacts') {
        showFile(res, path.join(__dirname, 'views', 'contacts.html'), 'text/html');
    } else if(pathname === '/submit' && req.method === 'POST') {
        //req.on('end', () => {
            // res.writeHead(302, {'Location': '/feedback'})
            // res.end();
            showFile(res, path.join(__dirname, 'views', 'feedback.html'), 'text/html');

        //})
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 File not found');
    }

});

//Start server
server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000')
})