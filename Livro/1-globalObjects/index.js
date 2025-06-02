let fs = require('fs');

fs.writeFile('myText.txt',"This is my text",(err, data)=>{
    console.log(err);
})

fs.readFile('myText.txt', (err, data)=>{
    console.log(data); // Output: a saida vai sair em forma de binário
    console.log(data.toString());//Output em formato de String
})