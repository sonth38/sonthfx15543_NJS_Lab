const http = require('http');

const express = require('express')

const app = express()

const server = http.createServer(app);

server.listen(3000) /* khởi chạy server port 3000 hoặc port bất kì */