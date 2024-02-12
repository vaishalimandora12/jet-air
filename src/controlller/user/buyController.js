const BUY=require("../../model/buyModel")
const error = require("../../utils/error");
const OTP=require("../../model/userOtpModel")
const {SendOTPMail}=require("../../utils/sendMail")
const {SendTHANKMail}=require("../../utils/sendMail")
const {SendAdminMail}=require("../../utils/sendMail");

exports.buyJet = [
    async (req, res) => {
        try {
            const { first_name, last_name, country_code, phone_number, description, email, possess_jet, maintenance, aircraft_name, aircraft_category, highlights, airframe, aircraft_service_changes,interior, floor_plan,images,engine_detail_pdf,apu_pdf,avionics} = req.body
            let isEmailVerified = await OTP.findOne({ email: email, isVerify: true});
            if(isEmailVerified){
            if (possess_jet == 'no') {
                refData = {
                    possess_jet: 'no',
                    first_name: first_name,
                    last_name: last_name,
                    country_code: country_code,
                    phone_number: phone_number,
                    description: description,
                    email: email,
                }
                const createBuyJet = await BUY.create(refData);
                if (createBuyJet) {
                    await SendTHANKMail(req.body.email);
                    await SendAdminMail(createBuyJet);
                    return res.status(error.status.OK).send({
                        message: "Sent Successfully",
                        data:createBuyJet,
                        status:error.status.OK,
                    })   
                }
            }
            else if (possess_jet == 'yes') {
                refData = {
                    possess_jet: 'yes',
                    first_name: first_name,
                    last_name: last_name,
                    country_code: country_code,
                    phone_number: phone_number,
                    description: description,
                    email: email,
                    maintenance: maintenance,
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
                  
                };
                const addYesPossessJet = await BUY.create(refData);
                if (addYesPossessJet) {
                    await SendTHANKMail(req.body.email);
                    await SendAdminMail(addYesPossessJet);
                    return res.status(error.status.OK).send({
                        message: "Sent Successfully",
                        data:addYesPossessJet,
                        status:error.status.OK,
                    })   
                }   
            }
        }
        if (possess_jet == 'no') {
            refData = {
                possess_jet: 'no',
                first_name: first_name,
                last_name: last_name,
                country_code: country_code,
                phone_number: phone_number,
                description: description,
                email: email,
            }
            const createBuyJet = await BUY.create(refData);
            const existingOtp = await OTP.findOne({ email: email });
            if (existingOtp) {
                const sendOtp = await SendOTPMail(req.body.email);
                const update = await OTP.findOneAndUpdate(
                  { email: email },
                  { $set: { otp: sendOtp.otp, otpTime: sendOtp.otpTime, enquiry: createBuyJet } },
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
                  enquiry: createBuyJet,
                };
                const create = await OTP.create(ref);
            }
                return res.status(error.status.OK).send({
                    message: "OTP Sent Successfully",
                    data:createBuyJet,
                    status:error.status.OK,
                })   
        }
        else if (possess_jet == 'yes') {
            refData = {
                possess_jet: 'yes',
                first_name: first_name,
                last_name: last_name,
                country_code: country_code,
                phone_number: phone_number,
                description: description,
                email: email,
                maintenance: maintenance,
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
              
            };
            const addYesPossessJet = await BUY.create(refData);
            const existingOtp = await OTP.findOne({ email: email });
            if (existingOtp) {
                const sendOtp = await SendOTPMail(req.body.email);
                const update = await OTP.findOneAndUpdate(
                  { email: email },
                  { $set: { otp: sendOtp.otp, otpTime: sendOtp.otpTime, enquiry: addYesPossessJet } },
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
                  enquiry: addYesPossessJet,
                };
                const create = await OTP.create(ref);
            }
                return res.status(error.status.OK).send({
                    message: "OTP Sent Successfully",
                    data:addYesPossessJet,
                    status:error.status.OK,
                })   
        }
        }
        catch (e){
            return res.status(error.status.InternalServerError).json({
                message:e.message,
                status:error.status.InternalServerError
            })
        }
    }
]