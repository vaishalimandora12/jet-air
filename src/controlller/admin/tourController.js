const TOUR=require("../../model/tourModel")
const error = require("../../utils/error");


exports.createTour = async (req, res) => {
    try {
        const { tour_location, hotel, short_description, long_description, about_trip, what_include, images,jet_type,tour_title,pickup_vehicle} = req.body;
            const refDate = {
                tour_location: tour_location,
                hotel: hotel,
                short_description: short_description,
                long_description: long_description,
                about_trip: about_trip,
                what_include: what_include,
                images:images,
                jet_type:jet_type,
                tour_title:tour_title,
                pickup_vehicle:pickup_vehicle,
            };

            const createTour = await TOUR.create(refDate);
            return res.status(error.status.OK).send({
                message: "New Tour Added Successfully.",
                status: error.status.OK,
                data: createTour,
            });
    } catch (e) {
        return res.status(error.status.InternalServerError).json({
            message: e.message,
            status: error.status.InternalServerError,
        });
    }
};

exports.editTour = async (req, res) => {
        try {
            const arrayOfEditKeys = ["tour_location", "hotel", "short_description","long_description", "about_trip", "what_include","images", "jet_type", "tour_title","pickup_vehicle"];
            const objectUpdate = {};
            for (const key of arrayOfEditKeys) {
                if (req.body[key] != null) {
                    objectUpdate[key] = req.body[key];
                }
            }
            const update = await TOUR.findByIdAndUpdate({ _id: req.body.tour_id }, objectUpdate, { new: true });
            if (update) {
                return res.status(error.status.OK).send({
                    message: "Tour Updated Successfully.",
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

 exports.getTours =async (req, res) => {
    console.log(req)
            try {
                const get = await TOUR.find();
                if (get.length > 0) {
                    const totalDocuments = await TOUR.countDocuments();
                    return res.status(error.status.OK).send({
                        message: "Tour get Successfully.",
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


    exports.deleteTour = async (req, res) => {
      try {
        const deleteResult = await TOUR.deleteOne({ _id: req.params.id });
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

