const error = require("../../utils/error");
const OTP = require("../../model/userOtpModel");
const BUY=require("../../model/buyModel");
const SELL=require("../../model/sellModel");
const TOUR=require("../../model/tourEnquiryModel");
const CONTACT=require("../../model/contactUsModel");
const { set } = require("mongoose");

exports.getUsers=async(req,res)=>{
    try{
        const getUsers=await OTP.find()
        if(getUsers){
            return res.status(error.status.OK).send({
                message: "Registerd User Get Successfully.",
                status: error.status.OK,
                data: getUsers,
              });
        }
    } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
}

exports.getVerifiedUser=async(req,res)=>{
  try{
      const getUsers=await OTP.find({isVerify:true})
      if(getUsers){
          return res.status(error.status.OK).send({
              message: "Registerd User Get Successfully.",
              status: error.status.OK,
              data: getUsers,
            });
      }
  } catch (e) {
  return res.status(error.status.InternalServerError).json({
    message: e.message,
    status: error.status.InternalServerError,
  });
}
}

exports.getNotVerifiedUser=async(req,res)=>{
  try{
      const getUsers=await OTP.find({isVerify:false})
      if(getUsers){
          return res.status(error.status.OK).send({
              message: "Not Verified User Get Successfully.",
              status: error.status.OK,
              data: getUsers,
            });
      }
  } catch (e) {
  return res.status(error.status.InternalServerError).json({
    message: e.message,
    status: error.status.InternalServerError,
  });
}
}


exports.getLeads=async(req,res)=>{
  try{
      const getUsers=await OTP.find()
      if(getUsers){
          return res.status(error.status.OK).send({
              message: " Leads Get Successfully.",
              status: error.status.OK,
              data: getUsers,
            });
      }
  } catch (e) {
  return res.status(error.status.InternalServerError).json({
    message: e.message,
    status: error.status.InternalServerError,
  });
}
}




exports.getUserEnquiryListings = async (req, res) => {
  try {
    const userId = req.params.id;
    const otpUser = await OTP.findById(userId);

    if (!otpUser) {
      return res.status(error.status.NotFound).json({
        message: "User not found",
        status: error.status.NotFound,
      });
    }

    const email = otpUser.email;

    const userBuys = await BUY.find({ email: email });
    const userSell = await SELL.find({ email: email });
    const userTour = await TOUR.find({ email: email });
    const userContact = await CONTACT.find({ email: email });

    const responseData = {
      buys: userBuys,
      sells: userSell,
      tours: userTour,
      contacts: userContact,
    };

    return res.status(error.status.OK).send({
      message: "Listings for the specified user retrieved successfully.",
      status: error.status.OK,
      data: responseData,
    });
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
}


exports.updateStatus = async (req, res) => {
  try {
    const find = await SELL.findOne({ _id: req.body.sell_id });
    if (find) {
      if (find.status === true) {
        const update = await SELL.updateOne(
          { _id: find._id },
          { status: false }
        );
        if (update) {
          return res.status(error.status.OK).send({
            message: "Jet is not Live.",
            status: error.status.OK,
            data: update,
          });
        }
      }
      const update = await SELL.updateOne(
        { _id: find._id },
        { status: true }
      );
      if (update) {
        return res.status(error.status.OK).send({
          message: "Jet is Live Now",
          status: error.status.OK,
          data: update,
        });
      }
    }
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
};


// exports.getBuyListingsForUser = async (req, res) => {
//   try {
//     const userId = req.params.id; 
//     const otpUser = await OTP.findById(userId);

//     if (!otpUser) {
//       return res.status(error.status.NotFound).json({
//         message: "User not found ",
//         status: error.status.NotFound,
//       });
//     }
//     const email = otpUser.email;
//     const userBuys = await BUY.find({ email: email });

//     if (userBuys.length > 0) {
//       return res.status(error.status.OK).send({
//         message: "Buy listings for the specified user retrieved successfully.",
//         status: error.status.OK,
//         data: userBuys,
//       });
//     } else {
//       return res.status(error.status.NotFound).json({
//         message: "No buy listings found for the specified user.",
//         status: error.status.NotFound,
//       });
//     }
//   } catch (e) {
//     return res.status(error.status.InternalServerError).json({
//       message: e.message,
//       status: error.status.InternalServerError,
//     });
//   }
// }


// exports.getSellListingsForUser = async (req, res) => {
//   try {
//     const userId = req.params.id; 
//     const otpUser = await OTP.findById(userId);

//     if (!otpUser) {
//       return res.status(error.status.NotFound).json({
//         message: "User not found ",
//         status: error.status.NotFound,
//       });
//     }
//     const email = otpUser.email;
//     const userSell = await SELL.find({ email: email });

//     if (userSell.length > 0) {
//       return res.status(error.status.OK).send({
//         message: "Sell listings for the specified user retrieved successfully.",
//         status: error.status.OK,
//         data: userSell,
//       });
//     } else {
//       return res.status(error.status.NotFound).json({
//         message: "No sell listings found for the specified user.",
//         status: error.status.NotFound,
//       });
//     }
//   } catch (e) {
//     return res.status(error.status.InternalServerError).json({
//       message: e.message,
//       status: error.status.InternalServerError,
//     });
//   }
// }


// exports.getTourListingsForUser = async (req, res) => {
//   try {
//     const userId = req.params.id; 
//     const otpUser = await OTP.findById(userId);

//     if (!otpUser) {
//       return res.status(error.status.NotFound).json({
//         message: "User not found ",
//         status: error.status.NotFound,
//       });
//     }
//     const email = otpUser.email;
//     const userTour = await TOUR.find({ email: email });

//     if (userTour.length > 0) {
//       return res.status(error.status.OK).send({
//         message: "Tour listings for the specified user retrieved successfully.",
//         status: error.status.OK,
//         data: userTour,
//       });
//     } else {
//       return res.status(error.status.NotFound).json({
//         message: "No tour listings found for the specified user.",
//         status: error.status.NotFound,
//       });
//     }
//   } catch (e) {
//     return res.status(error.status.InternalServerError).json({
//       message: e.message,
//       status: error.status.InternalServerError,
//     });
//   }
// }


// exports.getContactListingsForUser = async (req, res) => {
//   try {
//     const userId = req.params.id; 
//     const otpUser = await OTP.findById(userId);

//     if (!otpUser) {
//       return res.status(error.status.NotFound).json({
//         message: "User not found ",
//         status: error.status.NotFound,
//       });
//     }
//     const email = otpUser.email;
//     const userContact = await CONTACT.find({ email: email });

//     if (userContact.length > 0) {
//       return res.status(error.status.OK).send({
//         message: "Contact listings for the specified user retrieved successfully.",
//         status: error.status.OK,
//         data: userContact,
//       });
//     } else {
//       return res.status(error.status.NotFound).json({
//         message: "No contact listings found for the specified user.",
//         status: error.status.NotFound,
//       });
//     }
//   } catch (e) {
//     return res.status(error.status.InternalServerError).json({
//       message: e.message,
//       status: error.status.InternalServerError,
//     });
//   }
// }
