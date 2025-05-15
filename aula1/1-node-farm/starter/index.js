const fs = require('fs');

const textIn = fs.readFileSync('./txt/input.txt','utf-8');/*responsavel por ler o arquivo citado de forma syncrona */
console.log(textIn);

const textWrite = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;

const textOut = fs.writeFileSync('./txt/anotherText.txt',"This is my text again");/**Vai escrever um novo arquivo ou reescrever*/
console.log(textOut)
fs.readFile('./txt/anotherText.txt','utf-8',(err,data1)=>{
  console.log(data1) 
  fs.readFile(`./txt/${data1}`,(err,data2)=>{
      console.log(data2)
      fs.readFile('./txt/append.txt','utf-8',(err,data3)=>{
         console.log(data3);
         fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8',err=>{
             console.log('Your file has been written 🤷‍♀️')
         })
      })
   })
});/*Ler o arquivo de forma asyncrona */

console.log('Will read file!');