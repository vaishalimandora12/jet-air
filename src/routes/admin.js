const express = require("express")
const router=express.Router();
const adminController=require("../controlller/admin/authenticateController");
const adminUserController=require("../controlller/admin/userController");
const adminTourController=require("../controlller/admin/tourController");
const adminContentController=require("../controlller/admin/contentController");
const adminDashboardController=require("../controlller/admin/dashboardController");
const adminClientController=require("../controlller/admin/clientController");
const adminAboutController=require("../controlller/admin/aboutUsController");
const adminFaqController=require("../controlller/admin/faqController")
const message=require("../middleware/validationError");
const validation=require("../validations/adminValidation");
const VERIFY_ADMIN=require("../middleware/authMiddleware");

 //auth management 
 router.post("/adminLogin",validation.adminLoginValidate,message.errorResponse,adminController.adminLogin);
 router.post("/adminLogout",VERIFY_ADMIN,adminController.adminLogout);
    
 // users management
 router.get("/getUsers",VERIFY_ADMIN,adminUserController.getUsers);
 router.get("/getVerifiedUser",VERIFY_ADMIN,adminUserController.getVerifiedUser);
 router.get("/getNotVerifiedUser",VERIFY_ADMIN,adminUserController.getNotVerifiedUser);


 //tour management
 router.post("/createTour",VERIFY_ADMIN,validation.createTourValidation,message.errorResponse,adminTourController.createTour);
 router.patch("/editTour",VERIFY_ADMIN,validation.updateTourValidation,message.errorResponse,adminTourController.editTour);
 router.get("/getTours",VERIFY_ADMIN,adminTourController.getTours),
 router.delete("/deleteTour/:id",VERIFY_ADMIN,adminTourController.deleteTour)


 //leads management
 router.get("/getLeads",VERIFY_ADMIN,adminUserController.getLeads);
 router.get("/getUserEnquiryListings/:id", VERIFY_ADMIN, adminUserController.getUserEnquiryListings);
 router.patch("/updateSellJetStatus",VERIFY_ADMIN,adminUserController.updateStatus);

//  router.get("/getListOfBuyOfUser/:id", VERIFY_ADMIN, adminUserController.getBuyListingsForUser);
//  router.get("/getSellListingsForUser/:id", VERIFY_ADMIN, adminUserController.getSellListingsForUser);
//  router.get("/getTourListingsForUser/:id", VERIFY_ADMIN, adminUserController.getTourListingsForUser);
//  router.get("/getContactListingsForUser/:id",VERIFY_ADMIN,adminUserController.getContactListingsForUser);
 
//CMS management
router.post("/AddContent",VERIFY_ADMIN,validation.createContentValidation,message.errorResponse,adminContentController.AddContent);
router.get("/getContent/:type",adminContentController.getContent);

// faq management
router.post("/createFaq",VERIFY_ADMIN,validation.createFaqValidation,message.errorResponse,adminFaqController.createFaq);
router.patch("/editFaq",VERIFY_ADMIN,validation.updateFaqValidation,message.errorResponse,adminFaqController.editFaq);
router.delete("/deleteFaq/:id",VERIFY_ADMIN,adminFaqController.deleteFaq)
router.get("/getFaq",VERIFY_ADMIN,adminFaqController.getFaq),

//dashboard management
router.get("/dashboard",VERIFY_ADMIN,adminDashboardController.dashboard);

// about us management
router.post("/sectionAaboutUs",VERIFY_ADMIN,validation.createSectionFirstAboutValidation,message.errorResponse,adminAboutController.sectionAaboutUs);
router.post("/sectionBaboutUs",VERIFY_ADMIN,validation.createSectionSecondAboutValidation,message.errorResponse,adminAboutController.sectionBaboutUs);
router.post("/sectionCaboutUs",VERIFY_ADMIN,validation.createSectionThirdAboutValidation,message.errorResponse,adminAboutController.sectionCaboutUs);
router.get("/getAboutUs",VERIFY_ADMIN,adminAboutController.getAboutUs);

// client management --  meet the team 
router.post("/addClient",VERIFY_ADMIN,validation.createClientValidation,message.errorResponse,adminClientController.addClient);
router.patch("/editClient",VERIFY_ADMIN,validation.updateClientValidation,message.errorResponse,adminClientController.editClient);
router.delete("/deleteClient/:id",VERIFY_ADMIN,adminClientController.deleteClient);
router.get("/getClient",VERIFY_ADMIN,adminClientController.getClient),

//test
// router.get("/getData",adminDashboardController.getdata);


module.exports=router;