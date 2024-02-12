const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
    first_name:{
        type:String,
    },
    last_name:{
        type:String,
    },
    country_code:{
        type:String,
    },
    phone_number:{
        type:String
    },
    description:{
        type:String,
    },
    email:{
        type:String
    },
},{timestamps:true})

contactSchema.set("toJSON",{
    transform:(document, returnObject)=>{
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v
        delete  returnObject.password
    }
})

module.exports = mongoose.model('contact',contactSchema)