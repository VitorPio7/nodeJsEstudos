const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});/*informar o diretorio do caminho do dotenv */
const app = require('./app');

/*conexao com o banco de dados */
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB).then((con)=>{
    console.log("DB connection successfull!");
});
/*schema, é o formato do documento que deverá ser salvo no mongoDB*/

/*criacao de um noto dado no model */
// const testTour = new Tour({
//     name:'São João Pojuca',
//     rating:4.7,
//     price:497
// });
// /*salvar o dados no DB */
// testTour.save().then(doc=>{
//     console.log(doc)
// }).catch(err=>{
//     console.log('Error 🗽:',err);
// })
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`App running on ${port}...`);
});
