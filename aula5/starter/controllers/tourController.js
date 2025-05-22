// const fs = require('fs');
const Tour = require('./../models/tourModel')

// const tours = JSON.parse(
// fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );
// exports.checkBody = (req,res,next,val)=>{
//     if(!(req.body.name || req.body.price)){
//           return res.status(404).json({
//             status:'fail',
//             message:'There is an error'
//         })
//     }
//     next();
// }/*funcao responsável por verificar se o corpo foi devidamente preenchido
//ele será usado no middleware */
// exports.chekID = (req,res,next,val)=>{
//       if(req.params.id*1>tours.length){
//         return res.status(404).json({
//             status:'fail',
//             message:'Invalid ID'
//         })
//     }
//     next();
// }/*essa funcao vai ser responsavel por verificar se o id é valido,
 //ela vai ser usada no params middleware */
 exports.getTours = async(req,res)=>{
 try{
   const tours = await Tour.find()/*esse find vai retornar um array com todos os docs do DB de tour */
   res.status(201).json({
       status:'success',
       results:tours.length,
       data:{
        tours
       }
    //    requestedAt:req.requestTime,
    //    results: tours.length,
    //    data:{
    //     tours:tours 
    //    }
   })}catch(err){
      res.status(404).json({
        status:'fail',
        message:err
      })
   }
}/*funcao callback que sera responsavel pela acao do tipo da requisicao */
exports.getToursById = async(req,res)=>{
//    const id = req.params.id *1;
//     const tour = tours.find(el=>el.id === id);
//    res.status(200).json({
//     status:'success',
//     data:{
//         tour
//     }
//    })
try{
   const tour = await Tour.findById(req.params.id);
   res.status(201).json({
    status:'success',
    data:{
        tour
    }
   })
}catch(err){
  res.status(404).json({
    status:'fail',
    message:err
  });
}
}
exports.postTours = async (req,res)=>{
    // const newId = tours[tours.length-1].id+1; /*vai fazer um novo id baseado no array lido de tours */
    // const newTour = Object.assign({id:newId},req.body);
    // tours.push(newTour);
    // fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,
    //   JSON.stringify(tours),
    //   err=>{
    // //   res.status(201).json({
    //     status:'success',
    //     data:{
    //         tour:newTour
    //     }
    //   });
//     });/*vai escrever as mudancas no arquivo desse diretório */
// }
try{
const newTour = await Tour.create(req.body);
res.status(201).json({
    status:'success',
    data:{
        tour:newTour
    }
})}catch(err){
    res.status(400).json({
        status:'fail',
        message:err
    })
}
}
exports.patchTours =async(req,res)=>{
try {
     const tour = await Tour.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators: true
     });
    res.status(201).json({
    status:'success',
    data:{
        tour:tour
    }
})} catch (err) {
        res.status(400).json({
        status:'fail',
        message:'Invalid data sent!'
    })
    }
}
exports.deleteTours = async(req,res)=>{
    //  const mydelete = tours.filter((el)=>{
    //     return el.id !== req.params.id
    //  });
    // fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(mydelete),
    try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(101).json({
        message:'it was deleted',
        data:null
     })     
    } catch (error) {
       res.status(400).json({
        message:error,
    })  
    }   
}