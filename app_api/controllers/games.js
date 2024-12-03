const mongoose = require('mongoose');
const Game = mongoose.model('Game');

const _buildGameList = function(req, res, results) {
  let games = [];
  results.forEach((doc) => {
    games.push({
      name: doc.name,
      developer: doc.developer,
      rating: doc.rating,
      poster: doc.poster,
      description: doc.description,
      tags: doc.tags,
      _id: doc._id
    });
  });
  return games;
};

const gamesList = function (req, res) {
  Game.find() 
      .sort({ rating: -1 }) 
      .exec(function(err, results) {
          if (err) {
              console.log('Error fetching games:', err);
              return res.status(500).json({ message: 'An error occurred while fetching games' });
          }
          
          const games = _buildGameList(req, res, results);
          console.log('Games Results', results);

          res.status(200).json(games);
      });
};
  

const gamesCreate = function (req, res) {
  Game.create({
    name: req.body.name,
    developer: req.body.developer,
    rating: req.body.rating,
    poster: req.body.poster,
    description: req.body.description,
    tags: req.body.facilities.split(",")  
  }, (err, game) => {
    if (err) {
      res
        .status(400)
        .json(err);
    } else {
      res
        .status(201)
        .json(game);
    }
  });
};

const gamesReadOne = function (req, res) {
  if (req.params && req.params.gameid) {
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
        res		
          .status(200)
          .json(game);
      });
  } else {		
    res		
      .status(404) 	
      .json({	
        "message": "No gameid in request"
      });		
  }
};

const gamesUpdateOne = function (req, res) {
  if (!req.params.gameid) {
    res
      .status(404)
      .json({
        "message": "Not found, gameid is required"
      });
    return;
  }
  Game
    .findById(req.params.gameid)
    .select('-reviews -rating')
    .exec((err, game) => {
      if (!game) {
        res
          .json(404)
          .status({
            "message": "gameid not found"
          });
        return;
      } else if (err) {
        res
          .status(400)
          .json(err);
        return;
      }
        game.name = req.body.name,
        game.developer = req.body.developer,
        game.rating = req.body.rating,
        game.poster = req.body.poster,
        game.description = req.body.description,
        game.tags = req.body.facilities.split(",");
      
      game.save((err, game) => {
        if (err) {
          res
            .status(404)
            .json(err);
        } else {
          res
            .status(200)
            .json(game);
        }
      });
    }
  );
};

const gamesDeleteOne = function (req, res) {
  const gameid = req.params.gameid;
  if (gameid) {
    Game
      .findByIdAndRemove(gameid) 
      .exec((err, game) => {
          if (err) {
            res
              .status(404)
              .json(err);
            return;
          }
          res
            .status(204)
            .json(null);
        }
    );
  } else {
    res
      .status(404)
      .json({
        "message": "No gameid"
      });
  }
};

module.exports = {
  gamesList,
  gamesCreate,
  gamesReadOne,
  gamesUpdateOne,
  gamesDeleteOne
};