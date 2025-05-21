const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));/*esse morgan possibilita a visualizacao do 
  middleware através do console */
}
app.use(express.static(`${__dirname}/public`))/*middleware reponsável por dizer o repositorio estático */
app.use(express.json());/*esse é o middleware, ele tem o papel de ficar entre o req e res, ele pode lhe dar
com os dados que estao chegando */
app.use((req,res,next)=>{
    console.log('Hello from the middleware 👋')
    next();
})
app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
})
app.use('/api/v1/users',userRouter);
app.use('/api/v1/tours',tourRouter);

module.exports =app;