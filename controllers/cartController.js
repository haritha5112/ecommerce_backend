// const Cart = require("../models/cartModel");

// exports.createCart=async(req,res)=>{
//     const {user_id}=req.user;
//     const {product_id, quantity}= req.body;
//     let cart =await Cart.findOne({user_id});

//     if(!cart){
//         const  =new Cart({
//           user_id,
//           products:[
//             {
//                 product_id,
//                 quantity,
//             },
//           ],
//          });

//         }else{
//             const ProductIndex=cart.products.findIndex(
//                 (prod)=> prod.product_id === product_id
//             );
// if(ProductIndex > -1){
//     cart.products[ProductIndex].quantity = quantity;
// }else{
//     cart.products.path({ product_id,quantity});
// }
// }

//         }
//     // await newCart.save();
//     // return res.status(201).json({ message:"Cart created successfully"});
//     //     }
//         const ProductIndex=cart.products.findIndex(
//             (prod)=> prod.product_id === product_id
//         );
//         if(!ExistingProduct){
//             const newProducts=cart.products;
//             newProducts.push({product_id,quantity});
//            await Cart.findByIdAndUpdate({ user_id},{ products: newProducts});
//            return res
//                 .status(201)
//                 .json({ message:" product added to the cart successfully"})

//             });

//         }

//         if(!ExistingProduct){
//             const newProducts = cart.products;
//             newProducts.push({product_id,quantity});
//             const newCart = new Cart ({
//                 user_id,
//                 products:newProducts
//             });

//             ({
//               user_id,
//               products:[
//                 {
//                     product_id,
//                     quantity,
//                 },
//               ],
//              });

//         await newCart.save();
//     };

// const Cart=require ("../models/cartModel");

// exports.createCart=async (req,res)=>{
//     const {user_id}=req.user;
//     const {product_id,quantity}=req.body;
//     let cart=await Cart.findOne({user_id});//checking cart data/

//  if(!cart){
//     cart=new Cart({
//     user_id,
//     products:[ {
//             product_id,
//             quantity,
//         },],
//     });
//  }else{
//     const ProductIndex=cart.products.findIndex(       //if product is available
//         (prod)=>prod.product_id===product_id
//     );

// if(!ProductIndex > -1){
//     cart.products[ProductIndex].quantity=quantity;
//  }else{
//     cart.products.push({product_id,quantity}); //if pro not there. create the productds and push .
//  }
// }
// cart.save();
// res.status(200).json({message:"Product updated/added in cart",cart});
// };


// // Export the deleteCart function at the beginning
// exports.deleteCart=async(req,res)=>{
//     const {user_Id}=req.user;
//     // console.log({userId});
//     const product_id=req.params.id
//     try{
// let cart=await Cart.findOne({user_Id});
// if(!cart){
//     return res.status(404).json({message:"user not found"})
// }
// const cartIndex = cart.products.findIndex((product)=>product.product_id === product_id);

// if(cart.products.length<=1){
//     await Cart.deleteOne({
//         user_Id
//     })
//     return res.status(200).json({message:"Product deleted from cart"});
// }
// else{
//     cart.products=cart.products.filter((pr)=>
//         prod.id!=product_id
//     )
//     cart.save()
//     return res.status(200).json({message:"Product deleted from cart"});
// }
// }
//     catch(err){
//         return res.status(401).json({message:"internal server error",err})
//     }
// };





const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

exports.createCart = async (req, res) => {
  const { user_id } = req.user;
  const { product_id, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ user_id }); // Checking cart data

    if (!cart) {
      // If no cart, create a new one
      cart = new Cart({
        user_id,
        products: [{ product_id, quantity }],
      });
    } else {
      // If cart exists, check for the product
      const productIndex = cart.products.findIndex(
        (prod) => prod.product_id === product_id
      );

      if (productIndex > -1) {
        // If product exists, update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // If product doesn't exist, add it to the cart
        cart.products.push({ product_id, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Product updated/added in cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.getcarts = async (req, res) => {
//     const { user_id } = req.user;
//     try {
//         const cart = await Cart.findOne({ user_id });
//         if (!cart) {
//             return res.status(404).json({ message: "Cart not found" });
//         }
//         res.status(200).json(cart);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

//http://localhost:3000/cart/createCart



exports.getcarts = async (req, res) => {
  const { user_id } = req.user;
  const cart = await Cart.findOne({ user_id });
  console.log(cart);
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }
  try {
    let subTotal=0;
    const CartItems = await Promise.all(
        cart.products.map(async (product)  => {
        const productDetails = await Product.findOne({
          id: product.product_id,
        
        });
        console.log(productDetails)
   subTotal+=productDetails.cost*product.quantity;
        return {
          product_id: productDetails.id,
          name: productDetails.name,
          description: productDetails.description,
          cost: productDetails.cost,
          url: productDetails.url,
          category:productDetails.category,
          quantity: productDetails.quantity,
          rating:productDetails.rating,
        };
      })
    );
    res.status(200).json({ cartItems: CartItems, subTotal });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.deleteCart = async (req, res) => {
  const { userId } = req.user;
  const product_id = req.params.id;

  try {
      let cart = await Cart.findOne({ userId });

      if (!cart) {
          return res.status(404).json({ message: "User not found" });
      }

      const cartIndex = cart.products.findIndex((product) => product.product_id === product_id);

      if (cartIndex === -1) {
          return res.status(404).json({ message: "Product not found in cart" });
      }

      if (cart.products.length <= 1) {
          await Cart.deleteOne({ userId });
          return res.status(200).json({ message: "Product deleted from cart" });
      } else {
          cart.products = cart.products.filter((prod) => prod.product_id !== product_id);
          await cart.save();
          return res.status(200).json({ message: "Product deleted from cart" });
      }
  } catch (err) {
      return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};