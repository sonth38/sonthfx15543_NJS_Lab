const http = require('http');

const express = require('express')

const app = express()

app.use((req, res, next)=>{
    console.log('In the middleware')
    next()
})

app.use('/add-product',(req, res, next)=>{
    console.log('In the another middleware 1')
    res.send('<h1>The Add product page</h1>')
})

app.use('/',(req, res, next)=>{
    console.log('In the another middleware 2')
    res.send('<h1>Hello from Express.js</h1>')
})


app.listen(3000);