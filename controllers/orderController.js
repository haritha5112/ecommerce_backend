// const Order = require("../models/orderModel");
// // const Product = require("../models/productModel");
// exports.createOrder = async (req, res) => {
//     const { customerName, address, phoneNumber, products, orderName, estimatedDeliveryDate, userEmail } = req.body;

//     try {
//         const order = new Order({
//             customerName,
//             address,
//             phoneNumber,
//             products,
//             orderName,
//             estimatedDeliveryDate,
//             userEmail
//         });

//         await order.save();
//         res.status(201).json({ message: "Order created successfully", order });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };

// exports.getOrder = async (req, res) => {
//     const orderId = req.params.id;

//     try {
//         const order = await Order.findById(orderId);

//         if (!order) {
//             return res.status(404).json({ message: "Order not found" });
//         }

//         res.status(200).json({ order });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };

// exports.deleteOrder = async (req, res) => {
//     const orderId = req.params.id;

//     try {
//         const order = await Order.findByIdAndDelete(orderId);

//         if (!order) {
//             return res.status(404).json({ message: "Order not found" });
//         }

//         res.status(200).json({ message: "Order deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };
// // above code is correct

// // const Order = require("../models/orderModel");
// // const Cart = require("../models/cartModel");
// // const { v4: uuidv4 } = require("uuid");
// // const Product = require('../models/productModel');
// // const User = require('../models/userModel');

// // exports.createOrder = async (req, res) => {
// //   let { email, user_id } = req.user;
// //   const cart = await Cart.findOne({ user_id });
// //   console.log(cart.Products);
// //   const { name, address, PhoneNo } = req.body;
// //   try {
// //     if (!cart) {
// //       return res.status(400).json({ message: "No order exists" });
// //     } else {
// //       const order = new Order({
// //         id: uuidv4(),
// //         name,
// //         address,
// //         PhoneNo,
// //         email,
// //         Products: cart.Products,
// //       });
// //       await order.save();
// //       res.status(200).json({ message: "Order successfull" });
// //     }
// //   } catch (e) {
// //     console.log(e);
// //     res.status(404).json({ message: "Internal error" });
// //   }
// // };


const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const ProductModel = require("../models/productModel");
const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel');

const manageOrder = async (req, res) => {
    const { cust_name, cust_phno, cust_address } = req.body;
    try {
        const {  user_id, user_email } = req.user;
        console.log("email",user_email);
        console.log("user_id",user_id);


        const userCart = await Cart.findOne({  user_id: user_id });
        console.log("usercart:", user_id)
        if (!userCart) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const productDetails = [];

        for (const item of userCart.products) {
            const product = await ProductModel.findOne({ id: item.product_id });
            if (product) {
                productDetails.push({
                    product_id: item.product_id,
                    quantity: item.quantity
                });
            }
        }

        const newOrder = new Order({
            id: uuidv4(),
            user_id, // Use user_id from req.user
            user_email, 
            cust_name, 
            cust_phno,
            cust_address,
            products: productDetails,
            orderDate: new Date(), // order date
            estDate: new Date(Date.now() + 7*24*60*60*1000) // Estimated delivery date (1 week later)
        });

        const savedOrder = await newOrder.save();
        await userCart.deleteOne({ userId: user_id });

        return res.status(201).json({ message: 'Order placed successfully', order: savedOrder });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};


const getOrders = async (req, res) => {
    const userId = req.user.id; 
    try {
        const orderDetails = await Order.find({ userId });
        const allProducts = [];

        for (const order of orderDetails) {
            for (const product of order.products) {
                const productDetails = await ProductModel.findOne({ id: product.product_id });
                if (productDetails) {
                    allProducts.push({
                        productId: product.product_id,
                        quantity: product.quantity,
                        delDate: order.estDate,
                        name: productDetails.name, 
                        cost: productDetails.cost, 
                        image: productDetails.image
                    });
                } else {
                    console.error("Product not found", product.product_id);
                }
            }
        }

        return res.status(200).json({ orders: orderDetails, products: allProducts });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

module.exports = { manageOrder, getOrders };