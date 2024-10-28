/* GET 'Games List' page */
const gamesList = function(req, res){
  res.render('games-list', {
  title: 'Gamer2 - Games Review Website',
  pageHeader: {
  title: 'Gamer²',
  strapline: 'Let the Game Unite Us!'
  },
  games: [{
  poster: '/images/cyberpunk.jpg',
  name: 'Cyberpunk 2077',
  developer: 'CDProject Red',
  rating: 5,
  tags: ['RPG', 'Shooter', 'FPS', 'Open World', 'Futuristic']
  },{
  poster: '/images/rdr2.jpg',
  name: 'Red Dead Redemption 2',
  developer: 'Rockstar Games',
  rating: 5,
  tags: ['Western', 'Action', 'Third Person', 'Open World']
  },{
    poster: '/images/daysgone.jpg',
  name: 'Days Gone',
  developer: 'Bend Studio',
  rating: 4,
  tags: ['Zombies', 'Open World', 'Action', 'Third Person']
  }]
  });
  };

/* GET 'Game info' page for Cyberpunk 2077 */
const gameInfo = function(req, res) {
  res.render('game-info', {
    title: 'Game Info - Cyberpunk 2077',
    game: {
      name: 'Cyberpunk 2077',
      developer: 'CD Projekt Red',
      rating: 5, 
      poster: '/images/cyberpunk.jpg',
      description: `Cyberpunk 2077 is an open-world, action-adventure RPG set in the sprawling, futuristic metropolis of Night City. Developed by CD Projekt Red, the game thrusts players into a dark and gritty cyberpunk universe, where advanced technology, corporate power, and crime define everyday life. <br><br>
      
      You play as V, a mercenary for hire seeking immortality while navigating a dangerous world filled with ruthless gangs, corrupt megacorporations, and powerful AI. Featuring deep character customization, a vast array of cybernetic enhancements, and a branching narrative, Cyberpunk 2077 allows players to tailor their story and playstyle.<br><br>
      
      With breathtaking visuals, a rich storyline, and a living, breathing world, Cyberpunk 2077 offers an unforgettable experience full of high-tech weaponry, hacking, intense combat, and meaningful choices that shape the fate of both V and Night City itself.<br><br>`,
      tags: ['RPG', 'Shooter', 'FPS', 'Open World', 'Futuristic'],
      reviews: [
        {
          rating: 5,
          author: 'Romeros',
          timestamp: '7 October 2024',
          text: 'This is my favourite game. One of the best I\'ve ever played. Story, characters, locations, athmosphere - everything is perfect. Really must have in our times.'

        },
        {
          rating: 5,
          author: 'NeonVanguard',
          timestamp: '3 October 2024',
          text: 'Cyberpunk 2077 delivers an immersive, futuristic world with stunning visuals and a gripping narrative. The vibrant, dystopian Night City feels alive, with detailed environments and a deep sense of atmosphere. The story, centered around V and Johnny Silverhand, is both emotional and engaging, offering impactful choices that shape your experience.'
        },
        {
          rating: 4,
          author: 'PixelPhantom',
          timestamp: '2 October 2024',
          text: 'The RPG mechanics are robust, with diverse character customization, hacking, and combat options that allow for creative playstyles. With its expansive world, memorable characters, and rich lore, Cyberpunk 2077 stands as a must-play for fans of open-world RPGs. A stellar, unforgettable experience.'
        }
      ]
    }
  });
};

module.exports = {
  gamesList,
  gameInfo,
};