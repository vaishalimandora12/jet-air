const SELL=require("../../model/sellModel");
const error = require("../../utils/error");
const OTP=require("../../model/userOtpModel")
const {SendOTPMail}=require("../../utils/sendMail")
const {SendTHANKMail}=require("../../utils/sendMail")
const {SendAdminMail}=require("../../utils/sendMail");

exports.sellJet = async (req, res) => {
        try {
            const { first_name, last_name, country_code, phone_number, description, email,aircraft_name, aircraft_category, highlights, airframe, aircraft_service_changes,interior, floor_plan,images,engine_detail_pdf,apu_pdf,avionics,fuel,range,passenger} = req.body
            let isEmailVerified = await OTP.findOne({ email: email,isVerify: true});
            if(isEmailVerified){
            const refData = {
                    first_name: first_name,
                    last_name: last_name,
                    country_code: country_code,
                    phone_number: phone_number,
                    description: description,
                    email: email,
                    highlights:highlights,
                    aircraft_name: aircraft_name,
                    aircraft_category: aircraft_category,
                    airframe: airframe,
                    aircraft_service_changes: aircraft_service_changes,
                    interior: interior,
                    floor_plan: floor_plan,
                    images: images,
                    engine_detail_pdf: engine_detail_pdf,
                    apu_pdf: apu_pdf,
                    avionics: avionics,
                    fuel: fuel,
                    range: range,
                    passenger: passenger,

                }
                const selJet = await SELL.create(refData);
                if (selJet) {
                    await SendTHANKMail(req.body.email)
                    await SendAdminMail(selJet);
                    return res.status(error.status.OK).send({
                        message: "Sent Successfully",
                        data:selJet,
                        status:error.status.OK,
                    })   
                }   
            }
            const refData = {
                first_name: first_name,
                last_name: last_name,
                country_code: country_code,
                phone_number: phone_number,
                description: description,
                email: email,
                highlights:highlights,
                aircraft_name: aircraft_name,
                aircraft_category: aircraft_category,
                airframe: airframe,
                aircraft_service_changes: aircraft_service_changes,
                interior: interior,
                floor_plan: floor_plan,
                images: images,
                engine_detail_pdf: engine_detail_pdf,
                apu_pdf: apu_pdf,
                avionics: avionics,
                fuel: fuel,
                range: range,
                passenger: passenger,
           
            }
            const selJet = await SELL.create(refData)
            const existingOtp = await OTP.findOne({ email: email });
            if (existingOtp) {
              const sendOtp = await SendOTPMail(req.body.email);
              const update = await OTP.findOneAndUpdate(
                { email: email },
                { $set: { otp: sendOtp.otp, otpTime: sendOtp.otpTime, enquiry: selJet } },
                { new: true }
              );
            }
            else {
                const sendOtp = await SendOTPMail(req.body.email);
                const ref = {
                  email: email,
                  first_name: first_name,
                  country_code: country_code,
                  phone_number: phone_number,
                  otp: sendOtp.otp,
                  otpTime: sendOtp.otpTime,
                  enquiry: selJet,
                };
                const create = await OTP.create(ref);
              }
                return res.status(error.status.OK).send({
                    message: "OTP Sent Successfully",
                    data:selJet,
                    status:error.status.verifyEmailId,
                })   
        }
        catch (e){
            return res.status(error.status.InternalServerError).json({
                message:e.message,
                status:error.status.InternalServerError
            })
        }
    }

 exports.getLiveJets = async (req, res) => {
   try {
     const get = await SELL.find({ status: true });
     if (get.length > 0) {
       return res.status(error.status.OK).send({
         message: "Live Jets get Successfully.",
         status: error.status.OK,
         data: get,
       });
     }
     return res.status(error.status.OK).send({
        message: "No Jets are Live.",
        status: error.status.OK,
        data:null
      });

   } catch (e) {
     return res.status(error.status.InternalServerError).json({
       message: e.message,
       status: error.status.InternalServerError,
     });
   }
 };

 