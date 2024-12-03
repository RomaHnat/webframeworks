const mongoose = require('mongoose');
const Game = mongoose.model('Game');

// EXPOSED METHODS

const reviewsCreate = function (req, res) {
  const gameid = req.params.gameid;
  if (gameid) {
    Game
      .findById(gameid)
      .select('reviews')
      .exec((err, game) => {
        if (err) {
          res
            .status(400)
            .json(err);
        } else {
          _doAddReview(req, res, game);
        }
      }
    );
  } else {
    res
      .status(404)
      .json({
        "message": "Not found, gameid required"
      });
  }
};

const reviewsReadOne = function (req, res) {
  if (req.params && req.params.gameid && req.params.reviewid) {
    Game
      .findById(req.params.gameid)
      .exec((err, game) => {
        if (!game) {
          res	
            .status(404) 
            .json({	
              "message": "gameid not found"
            });	 
          return;
        } else if (err) {
          res	
            .status(404) 
            .json(err); 
          return; 	
        }
        if (game.reviews && game.reviews.length > 0) {
          const review = game.reviews.id(req.params.reviewid);
          if (!review) {
            res
              .status(404)
              .json({
                "message": "reviewid not found"
            });
          } else {
            response = {
              game : {
                name : game.name,
                id : req.params.gameid
              },
              review : review
            };
            res
              .status(200)
              .json(response);
          }
        } else {
          res
            .status(404)
            .json({
              "message": "No reviews found"
          });
        } 
      });
  } else {		
    res		
      .status(404) 	
      .json({	
        "message": "Not found, gameid and reviewid are both required"
      });		
  }
};

const reviewsUpdateOne = function (req, res) {
  if (!req.params.gameid || !req.params.reviewid) {
    res
      .status(404)
      .json({
        "message": "Not found, gameid and reviewid are both required"
      });
    return;
  }
  Game
    .findById(req.params.gameid)
    .select('reviews')
    .exec((err, game) => {
      if (!game) {
        res
          .status(404)
          .json({
            "message": "gameid not found"
          });
        return;
      } else if (err) {
        res
          .status(400)
          .json(err);
        return;
      }
      
      if (game.reviews && game.reviews.length > 0) {
        let thisReview = game.reviews.id(req.params.reviewid);
        if (!thisReview) {
          res
            .status(404)
            .json({
              "message": "reviewid not found"
            });
        } else {
          thisReview.author = req.body.author;
          thisReview.rating = req.body.rating;
          thisReview.text = req.body.text;
          game.save((err, game) => {
            if (err) {
              res
                .status(404)
                .json(err);
            } else {
              _updateAverageRating(game._id);
              res
                .status(200)
                .json(thisReview);
            }
          });
        }
      } else {
        res
          .status(404)
          json({
            "message": "No review to update"
          });
      }
    }
  );
};

const reviewsDeleteOne = function (req, res) {
  if (!req.params.gameid || !req.params.reviewid) {
    res
      .status(404)
      .json({
        "message": "Not found, gameid and reviewid are both required"
      });
    return;
  }
  Game
    .findById(req.params.gameid)
    .select('reviews')
    .exec((err, game) => {
      if (!game) {
        res
          .status(404)
          .json({
            "message": "gameid not found"
          });
        return;
      } else if (err) {
        res
          .status(400)
          .json(err);
        return;
      }
      if (game.reviews && game.reviews.length > 0) {
        if (!game.reviews.id(req.params.reviewid)) {
          res
            .status(404)
            .json({
              "message": "reviewid not found"
            });
        } else {
          game.reviews.id(req.params.reviewid).remove();
          game.save((err) => {
            if (err) {
              res
                .status(404)
                .json(err);
            } else {
              updateAverageRating(game._id);
              res
                .status(204)
                .json(null);
            }
          });
        }
      } else {
        res
          .status(404)
          .json({
            "message": "No review to delete"
          });
      }
    }
  );
};

// PRIVATE HELPER METHODS

const _doAddReview = function(req, res, game) {
  if (!game) {
    res
      .status(404)
      .json({
        "message": "gameid not found"
      });
  } else {
    game.reviews.push({
      _id: mongoose.Types.ObjectId(), 
      author: req.body.author,
      rating: req.body.rating,
      text: req.body.text
    });
    game.save((err, game) => {
      if (err) {
        res
          .status(400)
          .json(err);
      } else {
        _updateAverageRating(game._id);
        let thisReview = game.reviews[game.reviews.length - 1];
         res
           .status(201)
           .json(thisReview);
      }
    });
  }
};

const _updateAverageRating = function(gameid) {
  Game
    .findById(gameid)
    .select('rating reviews')
    .exec((err, game) => {
      if (!err) {
        _doSetAverageRating(game); 
      }
    });
};

const _doSetAverageRating = function(game) {
  if (game.reviews && game.reviews.length > 0) {
    const reviewCount = game.reviews.length;
    let ratingTotal = 0;
    for (let i = 0; i < reviewCount; i++) {
      ratingTotal = ratingTotal + game.reviews[i].rating;
    }
    let ratingAverage = parseInt(ratingTotal / reviewCount, 10);
    game.rating = ratingAverage;
    game.save((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Average rating updated to", ratingAverage);
      }
    });
  }
};


module.exports = {
  reviewsCreate,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne
};
