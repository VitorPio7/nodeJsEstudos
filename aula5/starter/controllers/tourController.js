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
 
 class APIFeatures{
    constructor(query,queryString){
        this.query = query;
        this.queryString= queryString;
    }
    filter(){
    // 1A) Filtering  
    const queryObj = {...this.queryString};
    const excludedFields = ['page','sort','limit','fields'];/*campos que nao devem ser usados para filtrar o banco */
    excludedFields.forEach(el=> delete queryObj[el]);
    
    // 1B) Advanced filtering  
    let queryStr = JSON.stringify(queryObj);
    queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match=>`$${match}`);
    // const query = Tour.find(JSON.parse(queryStr));
    this.query.find(JSON.parse(queryStr));
     return this;
    }
    sort() {
        if (this.queryString.sort){
        const sortBy = this.queryString.sort.split(',').join(' ')
        console.log(sortBy);
        this.query = this.query.sort(sortBy);
        //sort('price ratingAverage');
       }else{
        this.query = query.sort('-createdAt')/*vai ordenar em ordem crescente "-" */
      }
      return this;
    }
 }
 exports.getTours = async(req,res)=>{
 try{
   /*eu posso usar dessa forma */
   //BUILD QUERY
   // 1A) Filtering  
    const queryObj = {...req.query};
    const excludedFields = ['page','sort','limit','fields'];/*campos que nao devem ser usados para filtrar o banco */
    excludedFields.forEach(el=> delete queryObj[el]);
    
    // 1B) Advanced filtering  
    let queryStr = JSON.stringify(queryObj);
    queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match=>`$${match}`);
    const query = Tour.find(JSON.parse(queryStr));

    // 2) Sorting
    /**127.0.0.1:8000/api/v1/tours?sort=price,ratingsAverage */
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ')
        console.log(sortBy);
        query = query.sort(sortBy);
        //sort('price ratingAverage');
    }else{
        query = query.sort('-createdAt')/*vai ordenar em ordem crescente "-" */
    }
    // 3) Field limiting
    //**127.0.0.1:8000/api/v1/tours?fields=-name,duration */
    if(req.query.fields){/*verifica se existe algum campo na URL com fields */
        const fields = req.query.fields.split(',').join(' ');/*divide por virgula e agrupa em espaço */
        query = query.select(fields);/*O campo no Mongoose espera uma string assim "ex: nome autor preco" */
    }else{
        query = query.select('-__v')/*caso a primeira for false ele exclui o controle de versão '-__v' */
    }
    //4) Pagination
    //**.../api/v1/tours?page=2&limit=10 */
    const page = req.query.page*1||1;/*pega o número da pagina passado na URL e multiplica por 1 para transformar em number, se nada for passado usará 1 */
    const limit = req.query.limit*1||100;/*define quantos documentos serão retornados por páginas, se não for retornado nada ele vai retornar 100 */
    const skip = (page-1)*limit;/*pular os dados da página anterior e trazer apenas os da pagina atual*/
    /* const page = 3;
       const limit = 5;
       const skip = (3 - 1) * 5;  */
    query = query.skip(skip).limit(limit);/*skip pula os dois primeiros documentos apresentados, limit é o maximo de documentos retornados apartir do skip */
    if(req.query.page){
        const numTours = await Tour.countDocuments();
        if(skip>numTours) throw new Erro("this page doesnt exist");
    }
    
    //EXECUTE QUERY
    const features = new APIFeatures(Tour.find(),req.query).filter().sort();
    const tours = await features.query;

  /*esse find vai retornar um array com todos os docs do DB de tour */
   
   /*ou dessa forma*/
// const tours = await Tour.find()
//    .where('duration')
//    .equals(5)
//    .where('difficulty')
//    .equals('easy');

    //SEND RESPONSE
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

exports.aliasTopTours = async(req,res)=>{
    ///tours?limit=5&sort=ratingsAverage,price
    req.query.limit = '5';
    req.query.sort ='-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();

}
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