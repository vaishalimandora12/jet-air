const FAQ=require("../../model/faqModel")
const error = require("../../utils/error")

exports.createFaq=async (req,res)=>{
    try {
        const {question,answer}=req.body;
        const refData={
            question:question,
            answer:answer
        }
        const  createFaq =await FAQ.create(refData);
        if(createFaq) {
            return res.status(error.status.OK).send({
                message: "FAQ Create Successfully.",
                data:createFaq,
                status:error.status.OK,
            })   
        }
    }catch (e){
        return res.status(error.status.InternalServerError).json({
            message:e.message,
            status:error.status.InternalServerError
        })
    }
}


exports.editFaq = async (req, res) => {
    try {
        const arrayOfEditKeys = ["question", "answer"];
        const objectUpdate = {};
        for (const key of arrayOfEditKeys) {
            if (req.body[key] != null) {
                objectUpdate[key] = req.body[key];
            }
        }
        const update = await FAQ.findByIdAndUpdate({ _id: req.body.faq_id }, objectUpdate, { new: true });
        if (update) {
            return res.status(error.status.OK).send({
                message: "FAQ Updated Successfully.",
                status: error.status.OK,
                data: update,
            });
        }
    } catch (e) {
        return res.status(error.status.InternalServerError).json({
            message: e.message,
            status: error.status.InternalServerError,
        });
    }
}


exports.deleteFaq = async (req, res) => {
    try {
      const deleteResult = await FAQ.deleteOne({ _id: req.params.id });
      if (deleteResult) {
        return res.status(error.status.OK).json({
          message: "Deleted Successfully",
        });
      }
    } catch (e) {
      return res.status(error.status.InternalServerError).json({
        message: e.message,
      });
    }
  };


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
