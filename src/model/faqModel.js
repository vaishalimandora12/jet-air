
const mongoose = require("mongoose");
const faqSchema = new mongoose.Schema({
    question:{
        type:String,
    },
    answer:{
        type:String,
    },

},{timestamps:true})

faqSchema.set("toJSON",{
    transform:(document, returnObject)=>{
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v
        delete  returnObject.password
    }
})

module.exports = mongoose.model('faq',faqSchema)
