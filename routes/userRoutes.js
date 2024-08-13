const express = require('express');
const UserController = require("../controllers/userController");
const router = express.Router();

router.get("/", UserController.getUser);
router.post("/createuser", UserController.createUser);
router.post('/login', UserController.login);




module.exports = router;  // Ensure only the router is exported


// http://localhost:3000/user/login

