
const User = require("../models/userModel");
const { v4: uuidv4 } = require('uuid');
exports.getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        console.error(err);
    }
};


exports.createUser= async(req,res)=>{
    const {name, email,password}=req.body;
    const user =new User ({
        id:uuidv4(),
        name,                 
       email,
       password
    })


    await user.save();
    res.status(200).json("User created Successfully");
}




//key um variableum same ah irrunthuchuna, orey variable than use pannanum, other wise use : between the the key and the variable

// const User = require("../models/userModel");
const bcrypt = require("bcrypt"); // Correct import for bcrypt
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    console.log( req.body)
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json("Invalid Email or Password");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json("Invalid Email or Password");
        }
        const token = jwt.sign({ user_id: user._id }, "secret_token", {
            expiresIn: "1h",
        });

        res.status(200).json(token);
    } catch (err) {
        console.error(err);
    }
};
