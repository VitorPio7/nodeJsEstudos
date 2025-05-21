const fs = require('fs');

const tours = JSON.parse(
fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
exports.checkBody = (req,res,next,val)=>{
    if(!(req.body.name || req.body.price)){
          return res.status(404).json({
            status:'fail',
            message:'There is an error'
        })
    }
    next();
}/*funcao responsável por verificar se o corpo foi devidamente preenchido
ele será usado no middleware */
exports.chekID = (req,res,next,val)=>{
      if(req.params.id*1>tours.length){
        return res.status(404).json({
            status:'fail',
            message:'Invalid ID'
        })
    }
    next();
}/*essa funcao vai ser responsavel por verificar se o id é valido,
ela vai ser usada no params middleware */
 exports.getTours = (req,res)=>{
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
exports.getToursById = (req,res)=>{
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
exports.postTours = (req,res)=>{
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
exports.patchTours =(req,res)=>{
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
exports.deleteTours = (req,res)=>{
  
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