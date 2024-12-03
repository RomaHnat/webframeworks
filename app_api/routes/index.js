const express = require('express');
const router = express.Router();
const ctrlGames = require('../controllers/games');
const ctrlReviews = require('../controllers/reviews');
const ctrlUsers = require('../controllers/users');

router
  .route('/users')
  .post(ctrlUsers.usersCreate);

// Login
router
  .route('/login')
  .post(ctrlUsers.login);

// Logout
router
  .route('/logout')
  .get(ctrlUsers.logout);


// games
router
  .route('/games')
  .get(ctrlGames.gamesList)
  .post(ctrlGames.gamesCreate);

router
  .route('/games/:gameid')
  .get(ctrlGames.gamesReadOne)
  .put(ctrlGames.gamesUpdateOne)
  .delete(ctrlGames.gamesDeleteOne);
  
// reviews
router
  .route('/games/:gameid/reviews')
  .post(ctrlReviews.reviewsCreate);

router
  .route('/games/:gameid/reviews/:reviewid')
  .get(ctrlReviews.reviewsReadOne)
  .put(ctrlReviews.reviewsUpdateOne)
  .delete(ctrlReviews.reviewsDeleteOne);

module.exports = router;
