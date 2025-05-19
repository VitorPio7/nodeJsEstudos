const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json);/*esse é o middleware, ele tem o papel de ficar entre o req e res, ele pode lhe dar
com os dados que estao chegando */
app.use((req,res,next)=>{
    console.log('Hello from the middleware 👋')
    next();
})
app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
})
const tours = JSON.parse(
fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
let getTours = (req,res)=>{
   console.log(req.requestTime);
   res.status(200).json({
       status:'success',
       requestedAt:req.requestTime,
       results: tours.length,
       data:{
        tours:tours 
       }
   })
}/*funcao callback que sera responsavel pela acao do tipo da requisicao */
let getToursById = (req,res)=>{
   const id = req.params.id *1;
    const tour = tours.find(el=>el.id === id);
   if(!tour){
    return res.status(404).json({
        status:'fail',
        message:'Invalid ID'
    });
   }
   res.status(200).json({
    status:'success',
    data:{
        tour
    }
   })
}
let postTours = (req,res)=>{
    const newId = tours[tours.length-1].id+1; /*vai fazer um novo id baseado no array lido de tours */
    const newTour = Object.assign({id:newId},req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      err=>{
      res.status(201).json({
        status:'success',
        data:{
            tour:newTour
        }
      });
    });/*vai escrever as mudancas no arquivo desse diretório */
}
let patchTours =(req,res)=>{
    if(req.params.id*1>tours.length){
        return res.status(404).json({
            status:'fail',
            message:'Invalid ID'
        })
    }
   res.status(200).json({
    status:'success',
    data:{
        tour:'<Updated tour here...>'
    }
   })
}
let deleteTours = (req,res)=>{
    if(req.params.id*1>tours.length){
        return res.status(404).json({
            status:'fail',
            message:'Invalid ID'
        })
    }
     const mydelete = tours.filter((el)=>{
        return el.id !== req.params.id
     });
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(mydelete),
    res.status(204).json({
        message:'it was deleted',
        data:null
    })
)   
}

// app.get('/api/v1/tours',getTours);
// app.get('/api/v1/tours/:id',getToursById);
// app.post('/api/v1/tours',postTours)
// app.patch('/api/v1/tours/:id',patchTours)
// app.delete('/api/v1/tours/:id',deleteTours)
app.route('/api/v1/tours').get(getTours).post(postTours);/*essa é uma versão simplificada do codigo acima */
app.route('/api/v1/tours/:id').get(getToursById).patch(patchTours).delete(deleteTours);
const port = 8000;
app.listen(port,()=>{
    console.log(`App running on ${port}...`);
});
