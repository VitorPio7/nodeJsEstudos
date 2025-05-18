const fs = require('fs');
const server = require('http').createServer();/*Criação do servidor*/

server.on('request',(req,res)=>{
    //Solution 1
    // fs.readFile('test-file.txt',(err,data)=>{
    //     if(err) console.log(err);
    //     res.end(data);
    // })/*esse arquivo é muito grande, e consome muito tempo para ser lido, pois 
    // o node.JS vai tentar consumilo de forma inteira */
  
    //Solution 2: Streams;
    /*com a criacao da stream é possivel que os dados sejam transferidos em chuncks(pedacos), nesse caso
    torna os dados, porem pode ocorrer o backPressure (velocidade de escrita maior que a da leitura)  */
    // const readable = fs.createReadStream('test-file.txt');
    // readable.on('data',chunk=>{
    //     res.write(chunk); /*criacao dos pedacos */
    // })
    // readable.on('end',()=>{
    //     res.end();/*representa a finalizacao da leitura do arquivo */
    // })
    // readable.on('error',err=>{
    //     console.log(err); /*caso dê erro */
    //     res.status(500);
    //     res.end('File not found!');
    // })

    //Solution 3: solucao para evitar o backpressure, ele vai agir conforme a velocidade da entrada e da saida, tornando equilibrado;
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);/*esse pipe vai resolver o problema do backpressure, precisamos colocar o res dentro do parametro, o que seria o response */

})


server.listen(8000,'127.0.0.1',()=>{
    console.log("running");
})