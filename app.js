const http = require('http');

const express = require('express')

const app = express()

app.use((req, res, next)=>{
    console.log('In the middleware')
    next()
})

app.use((req, res, next)=>{
    console.log('In the another middleware')
})

const server = http.createServer(app);

server.listen(3000) /* khởi chạy server port 3000 hoặc port bất kì */