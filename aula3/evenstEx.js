const http = require('http');

const server = http.createServer();

server.on('conect',(req,res)=>{
    console.log("conecting...");
    res.end("conected server")
})

server.listen(3000,"127.0.0.1",()=>{
    console.log('conected on the port 3000');
})