// const express = require ("express");

// const app= express();
// const productModel = require("./routes/productRoutes")
// const mongoose = require("mongoose");

// mongoose.connect(
//     "mongodb+srv://akalya:akalya@cluster0.sddcejm.mongodb.net/e_commerce"
// ).then(()=>{
//     console.log("connected  to database");
// });

// app.use("/products", productRoutes )
// app.listen(3000,()=>{
//     console.log("server is running on port 3000");
// })


// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const productRoutes = require("./routes/productRoutes"); // Correct import
// const userRoutes = require("./routes/userRoutes"); // Correct import
// const user2Routes = require("./routes/user2Routes"); // Correct import
// const cartRoutes = require("./routes/cartRoutes"); // Correct import


// app.use(express.json());

// mongoose.connect(
//     "mongodb+srv://akalya:akalya@cluster0.ntdxaml.mongodb.net/e_commerce"
    
// ).then(() => {
//     console.log("connected to database");
// });

// app.use("/products", productRoutes);
// app.use("/user", userRoutes);
// app.use("/user2", user2Routes);
// app.use("/cart", cartRoutes);




// app.listen(3000, () => {
//     console.log("server is running on port 3000");
// });



//correct code for this upto cart 
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const productRoutes = require("./routes/productRoutes");
// const userRoutes = require("./routes/userRoutes");
// const cartRoutes = require("./routes/cartRoutes");

// app.use(express.json());

// mongoose.connect(
//     "mongodb://localhost:27017/e_commerce"
// ).then(() => {
//     console.log("connected to database");
// }).catch(err => {
//     console.error("Database connection error:", err);
// });

// app.use("/products", productRoutes);
// app.use("/user", userRoutes);
// app.use("/cart", cartRoutes);

// app.listen(3000, () => {
//     console.log("server is running on port 3000");
// });


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes"); // Added line

app.use(express.json());

mongoose.connect(
    // "mongodb://localhost:27017/e_commerce"
    "mongodb+srv://haritha-59:Mharitha5119@cluster.x4cyoij.mongodb.net/e_commerce"
).then(() => {
    console.log("connected to database");
}).catch(err => {
    console.error("Database connection error:", err);
});

app.use("/products", productRoutes);
app.use("/user", userRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes); // Added line

app.listen(3000, () => {
    console.log("server is running on port 3000");
});
