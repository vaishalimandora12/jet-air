const express=require("express")
const router=express.Router();
const contactController=require("../controlller/user/contactController");
const tourController=require("../controlller/user/tourController")
const buyController=require("../controlller/user/buyController");
const sellController=require("../controlller/user/sellController");
const uploadController=require("../controlller/user/uploadController");
const message=require("../middleware/validationError")
const validation=require("../validations/userValidation");

// contact management    
router.post("/contactUs",validation.ContactUsValidate,message.errorResponse,contactController.contactUs);
router.post("/otpVerify",validation.OtpValidate,message.errorResponse,contactController.otpVerification);
router.post("/upload-file",uploadController.fileUpload);

// buy management
router.post("/buyJet",validation.BuyJetValidate,message.errorResponse,buyController.buyJet);

// sell management
router.post("/sellJet",validation.SellJetValidate,message.errorResponse,sellController.sellJet); 
router.get("/getLiveJets",sellController.getLiveJets);

// tour management
router.post("/tourEnquiry",validation.TourEnqiryValidate,message.errorResponse,tourController.tourEnquiry);
router.get("/getjetType",tourController.getjetType),
router.get("/getTourTitles",tourController.getTourTitles),
router.get("/getPickupVehicle",tourController.getPickupVehicle),
router.get("/getTours",tourController.getTours),

// cms management
router.get("/getContent/:type",contactController.getContent);
router.get("/getAboutUs",contactController.getAboutUs);
router.get("/getFaq",contactController.getFaq);

// client management
router.get("/getClient",contactController.getClient)




module.exports=router;