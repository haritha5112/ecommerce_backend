// const express = require('express');
// const CartController = require("../controllers/cartController");
// const router = express.Router();
// const auth = require("../middleware/auth");

// router.get("/", auth, CartController.getcarts);
// router.post("/createCart", auth, CartController.createCart);

// module.exports = router;


const express = require('express');
const CartController = require("../controllers/cartController");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/getCart", auth, CartController.getcarts);
router.post("/createCart", auth, CartController.createCart);
router.delete("/deleteCart/:id", auth, CartController.deleteCart); 
module.exports = router;
