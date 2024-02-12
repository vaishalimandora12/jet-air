const CONTENT=require("../../model/contentModel")
const error = require("../../utils/error");

exports.AddContent = async (req, res) => {
    try {
        const { title, type, content } = req.body;
        if (!type) {
            return res.status(error.status.BadRequest).json({
                message: "Type is required",
                status: error.status.BadRequest,
            });
        }
        const refData = {
            title: title,
            type: type,
            content: content
        };

        const createdOrUpdatedContent = await CONTENT.findOneAndUpdate(
            { type: type },
            { $set: refData },
            { upsert: true, new: true }
        )
        return res.status(error.status.OK).json({
            message: "Content Updated Successfully.",
            data: createdOrUpdatedContent,
            status: error.status.OK,
        });
    } catch (e) {
        return res.status(error.status.InternalServerError).json({
            message: e.message,
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
  
  