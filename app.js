const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method,req.headers);

    /* Thoát khỏi server */
    // process.exit(); 

    // Cách cài đặt response trên máy chủ trả về dữ liệu có dạng html
    res.setHeader('Content-Type', 'text/html')
    res.write('<http>')
    res.write('<header><title>My First Page</title></header>')
    res.write('<body><h1>Hello from my Node.js server!</h1></body>')
    res.write('</http>')
    // res.write('<h1>THis is a test</h1>')
    res.end()
});

server.listen(3000) /* khởi chạy server port 3000 hoặc port bất kì */