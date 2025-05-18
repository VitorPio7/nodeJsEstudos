const fs = require('fs')
const crypto = require('crypto');
setTimeout(()=>console.log('Timer 1 finished'),0);
setImmediate(()=> console.log('Immediate 1 finished'));
process.env.UV_THREADPOOL_SIZE = 1;
fs.readFile('test-file.txt',()=>{
    console.log('I/O finished');
    setTimeout(()=>console.log('Timer 2 finished'),0);
     setTimeout(()=>console.log('Timer 3 finished'),3000);
    setImmediate(()=> console.log('Immediate 2 finished'));
    process.nextTick(()=>console.log('Process.nexTick'))
})
crypto.pbkdf2Sync('password','salt',100000,1024,'sha512');/*Esse encrypt é uma operacao bloqueante, ou seja syncrono*/
crypto.pbkdf2('password','salt',100000,1024,'sha512',()=>{
     console.log('Password encrypted');
})/*Ja esse é asyncrono e é uma operacao nao bloqueante.*/
console.log("Hello from the top-level code");