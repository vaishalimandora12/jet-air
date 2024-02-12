const CONTACT = require("../../model/contactUsModel");
const CONTENT = require("../../model/contentModel");
const error = require("../../utils/error");
const OTP = require("../../model/userOtpModel");
const CLIENT=require("../../model/clientModel");
const ABOUT=require("../../model/aboutUsModel")
const FAQ=require("../../model/faqModel")
const { SendOTPMail } = require("../../utils/sendMail");
const { SendTHANKMail } = require("../../utils/sendMail");
const {SendAdminMail}=require("../../utils/sendMail");

exports.contactUs = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      country_code,
      phone_number,
      description,
    } = req.body;

    let isEmailVerified = await OTP.findOne({ email: email, isVerify: true });

    if (isEmailVerified) {
      const refData = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        country_code: country_code,
        phone_number: phone_number,
        description: description,
      };

      await SendTHANKMail(req.body.email);
      const createContact = await CONTACT.create(refData);
      const admin = await SendAdminMail(createContact);
      console.log(admin, ">>>>");
      return res.status(error.status.OK).send({
        message: "Sent Successfully.",
        status: error.status.OK,
        data: createContact,
      });
    }

    const refData = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      country_code: country_code,
      phone_number: phone_number,
      description: description,
    };

    const createContact = await CONTACT.create(refData);
    const existingOtp = await OTP.findOne({ email: email });
    if (existingOtp) {
      const sendOtp = await SendOTPMail(req.body.email);
      const update = await OTP.findOneAndUpdate(
        { email: email },
        { $set: { otp: sendOtp.otp, otpTime: sendOtp.otpTime, enquiry: createContact } },
        { new: true }
      );
    } else {
      const sendOtp = await SendOTPMail(req.body.email);
      const ref = {
        email: email,
        first_name: first_name,
        country_code: country_code,
        phone_number: phone_number,
        otp: sendOtp.otp,
        otpTime: sendOtp.otpTime,
        enquiry: createContact,
      };
      await OTP.create(ref);
    }

    return res.status(error.status.OK).send({
      message: "OTP Sent, Please verify.",
      data: createContact,
      status: error.status.OK,
    });
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
};




exports.otpVerification = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const find = await OTP.findOne({ email: email, otp: otp });
    if (find) {
      const otpData = find.otpTime;
      const currentTime = new Date();
      const otpCreationTime = new Date(otpData);

      const timeDifference = currentTime - otpCreationTime;
      //   console.log(timeDifference, ">>>");

      const otpExpirationTime = 5 * 60 * 1000;

      if (timeDifference <= otpExpirationTime) {
        const verified = await OTP.updateOne(
          { email: email },
          { isVerify: true }
        );
        if (verified) {
          await SendTHANKMail(req.body.email);
          const admin=await SendAdminMail(find);
          console.log(admin,">>>>")
          return res.status(error.status.OK).send({
            message: "OTP Verified",
            status: error.status.OK,
          });
        }
      }
    }

    return res.status(error.status.NotFound).send({
      message: "Invalid OTP",
      status: error.status.NotFound,
    });
  } catch (err) {
    return res.status(error.status.InternalServerError).json({
      message: err.message,
      status: error.status.InternalServerError,
    });
  }
};


exports.getContent= async (req,res)=> {
  try {
      const content = await CONTENT.findOne({type:req.params.type})
      return res.status(error.status.OK).json({
          message:"Success",
          data:content
      })
  }catch (e){
      return res.status(error.status.InternalServerError).json({
          message:e.message
      })
  }
}


exports.getClient =async (req, res) => {
  try {
      const get = await CLIENT.find();
      if (get.length > 0) {
          const totalDocuments = await CLIENT.countDocuments();
          return res.status(error.status.OK).send({
              message: "Clients get Successfully.",
              status: error.status.OK,
              data: get,
              totalDocuments:totalDocuments
          });
      }
  }catch (e) {
      return res.status(error.status.InternalServerError).json({
          message: e.message,
          status: error.status.InternalServerError,
      });
  }
}

exports.getAboutUs =async (req, res) => {
  try {
      const get = await ABOUT.find();
      if (get.length > 0) {
          return res.status(error.status.OK).send({
              message: "get Successfully.",
              status: error.status.OK,
              data: get,
          });
      }
  }catch (e) {
      return res.status(error.status.InternalServerError).json({
          message: e.message,
          status: error.status.InternalServerError,
      });
  }
}


exports.getFaq =async (req, res) => {
  try {
      const get = await FAQ.find();
      if (get.length > 0) {
          const totalDocuments = await FAQ.countDocuments();
          return res.status(error.status.OK).send({
              message: "FAQ get Successfully.",
              status: error.status.OK,
              data: get,
              totalDocuments:totalDocuments
          });
      }
  }catch (e) {
      return res.status(error.status.InternalServerError).json({
          message: e.message,
          status: error.status.InternalServerError,
      });
  }
}
