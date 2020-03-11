const RatingModel = require("../models/Rating");

class RatingController {
  create = _id => {
    console.log("_id", _id);
    const jsonRating = {
      user: _id,
      wins: 0,
      losing: 0,
      rating: 0
    };
    const rating = new RatingModel(jsonRating);

    rating
      .save()
      .then()
      .catch(reason => {
        console.log("reason", reason);
      });
  };

  userWin = _id => {
    RatingModel.findOne({ user: _id }, (err, rating) => {
      if (!err && rating) {
        RatingModel.findOneAndUpdate(
          {
            user: _id
          },
          {
            wins: rating.wins + 1,
            rating: rating.rating + 25
          },
          { new: true },
          (err, rating) => {
            console.log("ratingsssssssss09s8", rating);
          }
        );
      }
    });
  };

  userLose = _id => {
    RatingModel.findOne({ user: _id }, (err, rating) => {
      if (!err && rating) {
        RatingModel.findOneAndUpdate(
          {
            user: _id
          },
          {
            losing: rating.losing + 1,
            rating: rating.rating - 15
          },
          { new: true },
          (err, rating) => {
            console.log("ratingsssssssss09s8", rating);
          }
        );
      }
    });
  };

  getRatingNumber = async _id => {
    const ratings = await RatingModel.aggregate([{ $sort: { rating: 1 } }]);
    const ratingNumber = ratings.findIndex(rating => (rating.user = _id));

    console.log("ratings[ratingNumber]", ratings);
    return {
      ...ratings[ratingNumber],
      ratingNumber: ratingNumber + 1
    };
  };

  getRating = (req, res) => {
    const _id = req.body.userId;

    this.getRatingNumber(_id).then(rating => {
      console.log("rating", rating);
      res.json({
        wins: rating.wins,
        losing: rating.losing,
        rating: rating.rating,
        ratingNumber: rating.ratingNumber
      });
    });
  };
}

exports.RatingController = RatingController;
