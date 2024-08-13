// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const userSchema = new mongoose.Schema({
//    name:{
//     type:String,
//     required:[true,"Name is required"]
//    },
//   email:{
//     type:String,
//     required:[true,"Name is required"]
//    },
//    password:{
//     type:String,
//     required:[true,"Name is required"]
//    }

// });
// userSchema.pre("save",async(next)=>{
//     if(!this.isModified("password")){
//         return next()
//     }
//     const salt=await bcrypt.genSalt(10);          //random pseudo code,
//     this.password=await bcrypt.hash(this.password,salt);               //password will be hashed
//     next() 
// }))
// const User = mongoose.model('User', userSchema); // Creating the model

// module.exports = User; // Exporting the module



const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
