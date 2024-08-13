// const Product=require("../models/productModel");


// exports.getProducts = async(req,res)=>{
//     try{
//         const products = await Product.find()
//         res.send(products);
//     } catch(err){
//         console.error(err);
//     }
// };

const Product = require("../models/productModel");
const { v4: uuidv4 } = require('uuid');
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (err) {
        console.error(err);
    }
};


exports.createProduct= async(req,res)=>{
    const {name,description,rating,url,category,cost}=req.body;
    const product =new Product ({
        id:uuidv4(),
        name,                 
        description,
        cost,
        url,
        rating,
        category,
    })


    await product.save();
    res.status(200).json("Product created Successfully");
}



//key um variableum same ah irrunthuchuna, orey variable than use pannanum, other wise use : between the the key and the variable
