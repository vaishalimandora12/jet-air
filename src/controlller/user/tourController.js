const TOUR=require("../../model/tourEnquiryModel")
const TOURMODEL=require("../../model/tourModel")
const error = require("../../utils/error");
const OTP=require("../../model/userOtpModel")
const {SendOTPMail}=require("../../utils/sendMail")
const {SendTHANKMail}=require("../../utils/sendMail")
const {SendAdminMail}=require("../../utils/sendMail")

exports.tourEnquiry = async (req, res) => {
    try {
        const {first_name,last_name,email,country_code, phone_number,description,jet_type,tour_title,pickup_vehicle,pickup_location}=req.body;
        let isEmailVerified = await OTP.findOne({ email: email,isVerify: true})
        if(isEmailVerified){
            const refDate = {
                first_name: first_name,
                last_name: last_name,
                email:email,
                country_code: country_code,
                phone_number: phone_number,
                description:description,
                jet_type: jet_type,
                tour_title: tour_title,
                pickup_vehicle:pickup_vehicle,
                pickup_location:pickup_location
            };
            const createContact = await TOUR.create(refDate);
            if(createContact) {
                await SendTHANKMail(req.body.email);
                await SendAdminMail(createContact);
                return res.status(error.status.OK).send({
                    message: "Sent Successfully",
                    data:createContact,
                    status:error.status.OK,
                })   
            }
        }
        const refDate = {
            first_name: first_name,
            last_name: last_name,
            email:email,
            country_code: country_code,
            phone_number: phone_number,
            description:description,
            jet_type: jet_type,
            tour_title: tour_title,
            pickup_vehicle:pickup_vehicle,
            pickup_location:pickup_location
        };
        const createTour = await TOUR.create(refDate);
        const existingOtp = await OTP.findOne({ email: email });
        if (existingOtp) {
          const sendOtp = await SendOTPMail(req.body.email);
          console.log(sendOtp,"LLLLLLLLLL")
          const update = await OTP.findOneAndUpdate(
            { email: email },
            { $set: { otp: sendOtp.otp, otpTime: sendOtp.otpTime, enquiry: createTour } },
            { new: true }
          );
        }
        else{
            const sendOtp = await SendOTPMail(req.body.email);
            const ref = {
              email: email,
              first_name: first_name,
              country_code: country_code,
              phone_number: phone_number,
              otp: sendOtp.otp,
              otpTime: sendOtp.otpTime,
              enquiry: createTour,
            };
            const create = await OTP.create(ref);
          }
            return res.status(error.status.OK).send({
                message: " OTP Sent Successfully",
                data:createTour,
                status:error.status.OK,
            })   

    } catch (e){
        return res.status(error.status.InternalServerError).json({
            message:e.message,
            status:error.status.InternalServerError
        })
    }
}


exports.getjetType = async (req, res) => {
    try {
        const get = await TOURMODEL.distinct("jet_type");
      if (get.length > 0) {
        return res.status(error.status.OK).send({
          message: "jetTypes get Successfully.",
          status: error.status.OK,
          data: get,
        });
      }
    } catch (e) {
      return res.status(error.status.InternalServerError).json({
        message: e.message,
        status: error.status.InternalServerError,
      });
    }
  };

  
  exports.getTourTitles = async (req, res) => {
    try {
      const get = await TOURMODEL.distinct("tour_title");
      if (get.length > 0) {
        return res.status(error.status.OK).send({
          message: "tour_title get Successfully.",
          status: error.status.OK,
          data: get,
        });
      }
    } catch (e) {
      return res.status(error.status.InternalServerError).json({
        message: e.message,
        status: error.status.InternalServerError,
      });
    }
  };


  exports.getPickupVehicle = async (req, res) => {
    try {
      const get = await TOURMODEL.distinct("pickup_vehicle");
      if (get.length > 0) {
        return res.status(error.status.OK).send({
          message: "pickup_vehicle get Successfully.",
          status: error.status.OK,
          data: get,
        });
      }
    } catch (e) {
      return res.status(error.status.InternalServerError).json({
        message: e.message,
        status: error.status.InternalServerError,
      });
    }
  };

  exports.getTours =async (req, res) => {
    try {
        const get = await TOURMODEL.find();
        if (get.length > 0) {
            const totalDocuments = await TOURMODEL.countDocuments();
            return res.status(error.status.OK).send({
                message: "Tours get Successfully.",
                status: error.status.OK,
                data: get,
                totalDocuments:totalDocuments
            });
        }
        return res.status(error.status.OK).send({
          message: "No Tours.",
          status: error.status.OK,
          data:null
        });
    }catch (e) {
        return res.status(error.status.InternalServerError).json({
            message: e.message,
            status: error.status.InternalServerError,
        });
    }
};