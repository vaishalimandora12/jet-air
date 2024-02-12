const mongoose = require("mongoose");
const tourSchema = new mongoose.Schema({
    short_description:{
        type:String,
    },
    long_description:{
        type:String,
    },
    about_trip:{
        type:String,
    },
    what_include:{
        type:String,
    },
    images:{
        type:[],
    },
    jet_type:{
        type:String,
    },
    tour_title:{
        type:String,
    },
    pickup_vehicle:{
        type:String,
    },
    tour_location: {
        from: {
            type: String,
        },
        to: {
            type: String,
        }
    },
    hotel:{
        type:String,
        enum:['THREE','FIVE','SEVEN']
    },

},{timestamps:true})

tourSchema.set("toJSON",{
    transform:(document, returnObject)=>{
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v
        delete  returnObject.password
    }
})

module.exports = mongoose.model('tour',tourSchema)