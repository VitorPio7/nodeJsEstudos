const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,'A tour must have a name'],
        unique:true,
        trim:true
    },
    durations:{
        type:Number,
        required:[true,'A tour must have a duration']
    },
    maxGroupSize:{
        type:Number,
        required:[true,'A tour must have a duration']
    },
    difficulty:{
        type:Number,
        required:[true,'A tour must have a difficulty']
    },
    ratingsAverage:{
        type:Number,
        default:4.5
    },
    ratingsQuantity:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:[true,'A tour must have a price']
    },
    priceDiscount:Number,
    summary:{
        type: String,
        trim:true/*vai remover o espaco em branco do inicio e do fim */

    } ,
    description:{
        type:String,
        trim:true,
    },
    imageCover:{
        type:String,
        required:[true,'A tour must have a cover image']
    },
    images:[String],
    createAt:{
        type:Date,
        default:Date.now(),/*vai deixar a data atual vai ser automaticamente convertido no formato padrão */
        select:false
    },
    startDates:[Date]
});
/*model, é a representacao funcional de uma colecao do Schema*/
const Tour = mongoose.model('Tour',tourSchema);

module.exports = Tour;
