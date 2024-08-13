const express = require('express');
 const Router = express.Router();
 const orderController = require('../controllers/orderController');
 const auth=require('../middleware/auth');
 Router.post('/createorder',auth,orderController.manageOrder);
Router.get('/getorder',auth,orderController.getOrders);


 module.exports = Router;