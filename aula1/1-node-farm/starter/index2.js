const fs = require('fs');
const http = require('http');


http.createServer((request,response)=>{
   response.end('Hello from the server!')
})
