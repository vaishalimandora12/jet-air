const error = require("../../utils/error");
const OTP = require("../../model/userOtpModel");
const BUY=require("../../model/buyModel");
const SELL=require("../../model/sellModel");
const TOUR=require("../../model/tourEnquiryModel");
const CONTACT=require("../../model/contactUsModel");

exports.dashboard = async (req, res) => {
  try {
    const totalUsersCount = await OTP.countDocuments();
    const totalVerCount = await OTP.countDocuments({isVerify:true});
    const totalUnVerCount = await OTP.countDocuments({isVerify:false});
    const totalEnquiryCount = await CONTACT.countDocuments();
    const totalToursCount = await TOUR.countDocuments();
    const totalSellsCount = await SELL.countDocuments();
    const totalBuysCount = await BUY.countDocuments();
    return res.status(error.status.OK).send({
      message: "Success.",
      status: error.status.OK,
      totalUsers: totalUsersCount,
      totalVerifiedUsers:totalVerCount,
      totalUnVerifiedUsers:totalUnVerCount,
      totalEnquiryCount:totalEnquiryCount,
      totalToursCount:totalToursCount,
      totalSellsCount:totalSellsCount,
      totalBuysCount:totalBuysCount 
    });
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
};



//test
// exports.getdata =async (req, res) => {
//   try {
//       const get = await TEST.find({type:req.query.type});
//       if (get.length > 0) {
//           const totalDocuments = await TEST.countDocuments();
//           return res.status(error.status.OK).send({
//               message: " get Successfully.",
//               status: error.status.OK,
//               data: get,
//               totalDocuments:totalDocuments
//           });
//       }
//   }catch (e) {
//       return res.status(error.status.InternalServerError).json({
//           message: e.message,
//           status: error.status.InternalServerError,
//       });
//   }
// }
