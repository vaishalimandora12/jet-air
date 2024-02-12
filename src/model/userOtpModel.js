const mongoose = require("mongoose");
const UserOtpSchema = new mongoose.Schema({
    email:{
        type:String,
    },
    otp:{
        type:String,
    },
    first_name:{
        type:String
    },
    country_code:{
        type:String
    },
    phone_number:{
        type:Number
    },
    isVerify:{
        type:Boolean,
        default:false
    },
    otpTime: {
        type: Date,
    },
    enquiry:{
        type: mongoose.Schema.Types.Mixed
    }
},{timestamps:true})

UserOtpSchema.set("toJSON",{
    transform:(document, returnObject)=>{
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v
        delete  returnObject.password
    }
})

module.exports = mongoose.model('user',UserOtpSchema)