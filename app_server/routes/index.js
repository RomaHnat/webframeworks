const express = require('express');
const router = express.Router();
const ctrlGames = require('../controllers/games');
const ctrlOthers = require('../controllers/others');
const ctrlRegister = require('../controllers/register')

/* Register/Login page */ 

router.get('/', ctrlRegister.register);

/* Games pages */
router.get('/games-list', ctrlGames.gamesList);
router.get('/game-info', ctrlGames.gameInfo);

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;