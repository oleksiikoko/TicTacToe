const RatingModel = require("../models/Rating");

class ProfileController {
  create = (req, res) => {
    const postData = {
      user: req.body._id
    };

    const rating = new RatingModel(postData);

    rating
      .save()
      .then(obj => {
        res.json(obj);
      })
      .catch(reason => {
        res.status(500).json({
          status: "error",
          message: reason
        });
      });
  };
}

exports.ProfileController = ProfileController;
