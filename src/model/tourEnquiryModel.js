const mongoose = require("mongoose");
const tourEnquirySchema = new mongoose.Schema({
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
    jet_type:{
        type:String,
        // enum:['GulfstreamG200','Glob5000','Airbus','Challenger604','Phenom300E']
    },
    tour_title:{
        type:String,
    },
    pickup_vehicle:{
        type:String,
        // enum:['Hatchback','Sedan','Convertable','Suv','Personal_luxury']
    },
    // pickup_location:{
    //     type:String,
    // }

},{timestamps:true})

tourEnquirySchema.set("toJSON",{
    transform:(document, returnObject)=>{
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v
        delete  returnObject.password
    }
})

module.exports = mongoose.model('tourEnquiry',tourEnquirySchema)