const mongoose = require("mongoose");
const sellSchema = new mongoose.Schema({
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
    aircraft_name:{
        type:String,
    },
    aircraft_category:{
        type:String,
    },
    highlights:{
        type:String
    },
    airframe:{
        type:String,
    },
    aircraft_service_changes:{
        type:String
    },
    interior:{
        type:String,
    },
    floor_plan:{
        type:String
    },
    images:{
        type:[],
        default: undefined
    },
    engine_detail_pdf:{
        type:String,
    },
    apu_pdf:{
        type:String,
       
    },
    avionics:{
        type:String,
    },
    fuel:{
        type:Number,
    },
    range:{
        type:Number,
       
    },
    passenger :{
        type:Number,
    },
    status:{
        type:Boolean,
        default:false
    }


},{timestamps:true})

sellSchema.set("toJSON",{
    transform:(document, returnObject)=>{
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v
        delete  returnObject.password
    }
})

module.exports = mongoose.model('sell',sellSchema)