const otpGen=()=>{
    return Math.floor(1000+Math.random()*9000);
}     

require("dotenv").config()
const sgMail = require("@sendgrid/mail");
const {SENDGRID_API_KEY,SENDGRID_EMAIL_ID} = require("../utils/constants");

const { getMaxListeners } = require("../model/userOtpModel");
sgMail.setApiKey(
    SENDGRID_API_KEY
);
const SendOTPMail = async (receiver) => {
    const oneTimePassword = otpGen();
    const otpCreationTime = new Date();
    const msg = {
        to: receiver,
        from: {email:SENDGRID_EMAIL_ID,name:"Seven Air Aviation"},
        templateId: "d-eb6c94a32d7a4d4d98c5d5dd99c4160d",
        dynamic_template_data: {
            otp: oneTimePassword,
        },
    };
    try {
        let [sendGridResponse, _] = await sgMail.send(msg);
        return {
            otp: oneTimePassword,
            otpTime:otpCreationTime,
            sendGridResponse: sendGridResponse,
        };
    } catch (error) {
        console.log(error);
        return {
            error: error.message,
        };
    }
};

const SendTHANKMail = async (receiver) => {
    // const oneTimePassword = otpGen();
    const msg = {
        to: receiver,
        from: {email:SENDGRID_EMAIL_ID,name:"Seven Air Aviation"},
        templateId: "d-55d80708ea054799983b3bf4c65da06b",
        // dynamic_template_data: {
        //     otp: oneTimePassword,
        // },
    };
    try {
        let [sendGridResponse, _] = await sgMail.send(msg);
        return {
            // otp: oneTimePassword,
            sendGridResponse: sendGridResponse,
        };
    } catch (error) {
        console.log(error);
        return {
            error: error.message,
        };
    }
};


const SendAdminMail = async (enquiry) => {
    const msg = {
        from: {email:SENDGRID_EMAIL_ID,name:"Seven Air Aviation"},
        to: "leslie@sevenairaviation.com",
        templateId: "d-6983f24e8f2d49cea91ceded354eab1d",
        dynamic_template_data: {
            enquiry: enquiry,
        },
    };
    try {
        let [sendGridResponse, _] = await sgMail.send(msg);
        console.log("Email sent successfully:", sendGridResponse);
        return {
            enquiry: enquiry,
            sendGridResponse: sendGridResponse,
        };
    } catch (error) {
        console.log("Error sending email:", error);
        return {
            error: error.message,
        };
    }
};

module.exports = {
    SendOTPMail,
    SendTHANKMail,
    SendAdminMail
}