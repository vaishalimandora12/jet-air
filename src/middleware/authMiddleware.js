const JWT = require("jsonwebtoken");
const ADMIN = require("../model/adminModel");
const SESSION=require("../model/sessionModel");
const error = require("../utils/error");
const {SECRET_KEY} = require("../utils/constants");

const verifyAdmin=async(req,res,next)=>{
    try{
        let token=req.headers.authorization;
        if(!token){
            return res.status(error.status.Unauthorized).json({
                message: "Invalid token",
                status: error.status.Unauthorized
            })  
        }
        const session= await SESSION.findOne({access_token:token})
        if(session){
        let decode= await JWT.verify(token, SECRET_KEY)
        if(!decode) {
            return res.status(error.status.Unauthorized).json({
                message: "Unauthorized",
                status:error.status.Unauthorized
            })
        }
        let adminData = await ADMIN.findOne({ _id: decode._id, email: decode.email });
        if(!adminData){
            return res.status(error.status.Unauthorized).json({
                message: "Unauthorized",
                status:error.status.Unauthorized
            })
        }
        else{
         req.loginAdmin = adminData;
         req.adminToken =token;
        }
    }
        next();
    }catch (e) {
        return res.status(error.status.InternalServerError).json({
            message:e.message
        });
    }
}
module.exports = verifyAdmin;