const http = require('http');
const fs = require('fs')
const server = http.createServer((req, res) => {
    // console.log(req.url, req.method,req.headers);
    
    /* Chuyển hướng đến /message */
    const url = req.url;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
      }
    /* Thoát khỏi server */
    // process.exit(); 

    /* Chuyển hướng từ /message về trang chủ / */
    const method = req.method
    if (url === '/message' && method === 'POST') {
        fs.writeFileSync('message.txt', 'DUMMY')
        res.statusCode = 302
        res.setHeader('location', '/');
        return res.end()
    }

    // Cách cài đặt response trên máy chủ trả về dữ liệu có dạng html
    res.setHeader('Content-Type', 'text/html');
    res.write('<http>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js server!</h1></body>');
    res.write('</http>');
    res.end();
});

server.listen(3000) /* khởi chạy server port 3000 hoặc port bất kì */