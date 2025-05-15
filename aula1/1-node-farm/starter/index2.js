const fs = require('fs');/*responsavel por lidar com arquivos */
const http = require('http');/*responsavel por lidar com o http, como a porta e o IP */
const url = require('url');/*responsavel por pegar o endpoint da url */

////////////////////////SERVER////////////////////////
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');


const data =  fs.readFile(`${__dirname}/dev-data/data.json`,'utf-8', fs.readFile(`${__dirname}/dev-data/data.json`,'utf-8');
const productData = JSON.parse(data);
const server = http.createServer((req,res)=>{
   const pathName = req.url;
   //Overview page
   if(pathName === '/'|| pathName === '/overview'){
    res.end('This is the OVERVIEW');
    //Product page
   }else if(pathName === '/product'){
    res.end('This is the PRODUCT');
   }else if(pathName === '/api'){
     res.writable(200,{'Content-type':'application/json'});
     res.end(productData)    
}else{
    res.writeHead(404,{
        'Content-type':'text/html',
        'my-own-header':'hello-world'
    });/*head é responsavel por enviar uma informacao que vai ser retornada*/
    res.end('<h1>Page not found! </h1>');
   }
})/*criacao do servidor */

server.listen(8000,'127.0.0.1',(req,res)=>{
    console.log("Listening on the port 8000");
});/*porta 8000, ip atual e callback com a mensagem (opcional)*/