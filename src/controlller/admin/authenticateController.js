const ADMIN = require("../../model/adminModel");
const SESSION=require("../../model/sessionModel");
const error = require("../../utils/error");
const bcrypt=require("bcrypt");
const salt = 10;
const JWT=require("jsonwebtoken");
const {SECRET_KEY} = require("../../utils/constants");


exports.adminLogin = async (req, res) => {
  try {
    const { password, email } = req.body;
    console.log(req);
    const findAdmin = await ADMIN.findOne({ email: email });
    if (findAdmin) {
      const com_pass = await bcrypt.compare(password, findAdmin.password);
      if (!com_pass) {
        return res.status(error.status.UnprocessableEntity).send({
          message: "Password invalid.",
          status: error.status.UnprocessableEntity,
        });
      }
      const signToken = JWT.sign(
        { _id: findAdmin._id, email: findAdmin.email },
        SECRET_KEY
      );
      console.log(findAdmin)
     const createSession= await SESSION.create({access_token:signToken,admin_id:findAdmin._id})
      return res.status(error.status.OK).send({
        message: "Login Successfully.",
        status: error.status.OK,
        data: findAdmin,
        access_Token: signToken,
        session:createSession,
      });
    }
  } catch (e) {
    console.log(e)
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
  }
};


exports.adminLogout=async (req,res)=>{
    const admin_id = req.loginAdmin._id;
    const access_token = req.adminToken;
    await SESSION.deleteOne({admin_id:admin_id,access_token:access_token});
    return res.status(error.status.OK).json({
        message:"Logout",

    })
}

// exports.adminSignUp = async (req, res) => {
//   try {
//     const { email, password, first_name, last_name } = req.body;
//     const hashed = await bcrypt.hash(password, salt);
//     const refData = {
//       email: email,
//       first_name: first_name,
//       last_name: last_name,
//       password: hashed,
//     };
//     const createAdmin = await ADMIN.create(refData);
//     if (createAdmin) {
//       return res.status(error.status.OK).send({
//         message: "admin create Successfully.",
//         status: error.status.OK,
//         data: createAdmin,
//       });
//     }
//   } catch (e) {
//     return res.status(error.status.InternalServerError).json({
//       message: e.message,
//       status: error.status.InternalServerError,
//     });
//   }
// };
