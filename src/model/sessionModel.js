const mongoose = require("mongoose");
const sessionSchema = new mongoose.Schema({
    admin_id:{
        type: mongoose.Types.ObjectId,
        ref:"admin"
    },
    access_token:{
        type:String,
        required:true
    }


},{timestamps:true})

sessionSchema.set("toJSON",{
    transform:(document, returnObject)=>{
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v
        delete  returnObject.password
    }
})
module.exports = mongoose.model('session',sessionSchema)