const mongoose = require("mongoose");
const clientSchema = new mongoose.Schema({
    client_name:{
        type:String,
    },
    client_post:{
        type:String,
    },
    image:{
        type:String,
    },

},{timestamps:true})

clientSchema.set("toJSON",{
    transform:(document, returnObject)=>{
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v
        delete  returnObject.password
    }
})

module.exports = mongoose.model('client',clientSchema)