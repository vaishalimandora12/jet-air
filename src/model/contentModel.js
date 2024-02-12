const mongoose = require("mongoose");
const contentSchema = new mongoose.Schema({
    content:{
        type:String
    },
    type:{
        type:String,
        required:true,
        enum:["PRIVACY_POLICY","TERMS_CONDITIONS"]
    },
    title:{
        type:String
    },

},{timestamps:true})

contentSchema.set("toJSON",{
    transform:(document, returnObject)=>{
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v
        delete  returnObject.password
    }
})

module.exports = mongoose.model('content',contentSchema)