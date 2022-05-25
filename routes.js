const fs = require('fs')
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
      }

    if (url === '/message' && method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk);
        })

        req.on('end', () =>{
            const parsedBody = Buffer.concat(body).toString()
            const message = parsedBody.split('=')[1]
            fs.writeFile('message.txt', message, ()=>{
                res.statusCode = 302
                res.setHeader('location', '/');
                return res.end()
            })
        })
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<http>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js server!</h1></body>');
    res.write('</http>');
    res.end();
}

module.exports = {
    handler: requestHandler,
    someText: 'Hello guy!'
} 