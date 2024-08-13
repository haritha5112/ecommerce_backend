// const mongoose = require ('mongoose')

// const productSchema = new mongoose.Schema({
//     id:String,
//     title:String,
//     description:String,
//     price:Number,
//     category:String,
//     imgage:String ,
//     rating:{
//         rate:Number,                              //when having the more object, we 
//         count:Number,
//     }
// })


// const Product = new mongoose.model(' Product',productSchema)          //creating the model

// module.exports=Product;                   //exporting the module


const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    cost: Number,
    category: String,
    url: String,
    rating:Number,
    
});

const Product = mongoose.model('Product', productSchema); // Creating the model

module.exports = Product; // Exporting the module
