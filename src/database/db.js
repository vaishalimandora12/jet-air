const mongoose = require('mongoose');
require('dotenv').config();
const {DB_URL} = require("../utils/constants");


// *************************use before push the code ************************//


mongoose.connect(DB_URL);


var db = mongoose.connection;
db.on("connected",()=>{
    console.log("Database Connected")
})
db.on("error",(err)=>{
    console.log(err)
})

exports.mongoose = mongoose