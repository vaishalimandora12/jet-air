const CLIENT=require("../../model/clientModel")
const error = require("../../utils/error");


exports.addClient = async (req, res) => {
    try {
        const { client_name, client_post, image} = req.body;
            const refData = {
                client_name: client_name,
                client_post: client_post,
                image: image,
            };
            console.log(refData)
            const create = await CLIENT.create(refData);
            return res.status(error.status.OK).send({
                message: "New Client Added Successfully.",
                status: error.status.OK,
                data: create,
            });
    } catch (e) {
        return res.status(error.status.InternalServerError).json({
            message: e.message,
            status: error.status.InternalServerError,
        });
    }
};



exports.editClient = async (req, res) => {
    try {
        const arrayOfEditKeys = ['client_name', "client_post", "image"];
        const objectUpdate = {};
        for (const key of arrayOfEditKeys) {
            if (req.body[key] != null) {
                objectUpdate[key] = req.body[key];
            }
        }
        const update = await CLIENT.findByIdAndUpdate({ _id: req.body.client_id }, objectUpdate, { new: true });
        if (update) {
            return res.status(error.status.OK).send({
                message: "Client Updated Successfully.",
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


exports.deleteClient = async (req, res) => {
    try {
      const deleteResult = await CLIENT.deleteOne({ _id: req.params.id });
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
