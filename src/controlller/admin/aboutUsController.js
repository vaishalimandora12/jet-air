const ABOUT=require("../../model/aboutUsModel")
const error = require("../../utils/error");


exports.sectionAaboutUs = async (req, res) => {
    try {
        const { a_heading, a_paragraph, a_image} = req.body;
        const refData = {
            section_a: {
              a_content: {
                a_heading: a_heading,
                a_paragraph:a_paragraph
              },
              a_image:a_image
            },
          }
        const createdOrUpdatedAboutUs = await ABOUT.findOneAndUpdate(
            {},
            { $set: refData },
            { upsert: true, new: true }
        )
        return res.status(error.status.OK).json({
            message: "Updated Successfully.",
            data: createdOrUpdatedAboutUs,
            status: error.status.OK,
        });
    } catch (e) {
        return res.status(error.status.InternalServerError).json({
            message: e.message,
            status: error.status.InternalServerError,
        });
    }
};


exports.sectionBaboutUs = async (req, res) => {
    try {
        const {b_heading,b_paragraph, b_image} = req.body;
        const refData = {
            section_b: {
              b_content: {
                b_heading:b_heading,
                b_paragraph:b_paragraph,
              },
              b_image:b_image,
            },
          }
        const createdOrUpdatedAboutUs = await ABOUT.findOneAndUpdate(
            {},
            { $set: refData },
            { upsert: true, new: true }
        )
        return res.status(error.status.OK).json({
            message: "Updated Successfully.",
            data: createdOrUpdatedAboutUs,
            status: error.status.OK,
        });
    } catch (e) {
        return res.status(error.status.InternalServerError).json({
            message: e.message,
            status: error.status.InternalServerError,
        });
    }
};




exports.sectionCaboutUs = async (req, res) => {
    try {
        const {c_heading,c_paragraph,c_image} = req.body;
        const refData = {
            section_c: {
              c_content: {
                c_heading:c_heading,
                c_paragraph:c_paragraph,
              },
              c_image:c_image,
            },
          }
        const createdOrUpdatedAboutUs = await ABOUT.findOneAndUpdate(
            {},
            { $set: refData },
            { upsert: true, new: true }
        )
        return res.status(error.status.OK).json({
            message: "Updated Successfully.",
            data: createdOrUpdatedAboutUs,
            status: error.status.OK,
        });
    } catch (e) {
        return res.status(error.status.InternalServerError).json({
            message: e.message,
            status: error.status.InternalServerError,
        });
    }
};









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