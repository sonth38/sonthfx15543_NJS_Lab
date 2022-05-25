const http = require('http');
const routes = require('./routes')

console.log(routes.someText)
const server = http.createServer(routes.handler);

server.listen(3000) /* khởi chạy server port 3000 hoặc port bất kì */