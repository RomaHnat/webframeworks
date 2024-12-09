const request = require('request');
const apiOptions = {
server : 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
apiOptions.server = ' https://helloexpressrh.onrender.com';
}

const gamesList = function(req, res){
  const path = '/api/games';
  const requestOptions = {
  url : apiOptions.server + path,
  method : 'GET',
  json : {},
  qs : {
    maxRating: 5
  }
  };
  request(requestOptions, (err, response, body) => {
    _renderHomepage(req, res, body);
  }
  );
  };
  
  const _renderHomepage = function(req, res, responseBody){
    res.render('games-list', {
    title: 'Gamer2 - Let the game unite us!',
    pageHeader: {
      title: 'Gamer²',
      strapline: 'Let the Game Unite Us!'
      },
      games: responseBody
    });
    };


/* GET 'Game info'  */
const gameInfo = function (req, res) {
  const gameid = req.params.gameid;
  const path = `/api/games/${gameid}`;
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
  };

  request(requestOptions, (err, response, body) => {
    if (response.statusCode === 200) {
      _renderGameInfoPage(req, res, body);
    } else {
      res.status(response.statusCode).render('error', {
        message: 'Game not found.',
        error: response,
      });
    }
  });
};

const _renderGameInfoPage = function (req, res, gameDetails) {
  res.render('game-info', {
    title: `Game Info - ${gameDetails.name}`,
    game: gameDetails,
  });
};


module.exports = {
  gamesList,
  gameInfo,
};