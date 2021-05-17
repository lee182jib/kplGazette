// Worst Player DOM 
const wpName = document.getElementById('wp-name');
const wpTransfers = document.getElementById('wp-transfers');
const wpNews = document.getElementById('wp-news');
const wpPhoto = document.getElementById('wp-photo');
const main = document.getElementById('chucked-main');

// David May DOM 
const bestContainer = document.getElementById('best-container');
const bestName = document.getElementById('best-name');
const bestImg = document.getElementById('best-img');
const bestThreat = document.getElementById('best-threat');
const bestInfluence = document.getElementById('best-influence');
const bestCreativity = document.getElementById('best-creativity');

// Hipster DOM
const hipsterConatiner = document.getElementById('hipster-container');

// Spotlight DOM
const spotlightPast = document.getElementById('spotlight-past');
const spotlightCurrent = document.getElementById('spotlight-current');

// Monty DOM
const clueContainer = document.getElementById('clue-container');
const riddleInput = document.getElementById('riddle-input');
const riddleSubmit = document.getElementById('riddle-submit');
const riddleRefresh = document.getElementById('riddle-refresh')






// Best player box
function createBestBox(item) {
  let {
    influence,
    creativity,
    threat,
    first_name,
    second_name,
    photo
  } = item;

  const bestBox = document.createElement('div');

  bestBox.classList.add('best-player');

  const dmRating = Math.floor((+item.influence + +item.threat + +item.creativity) / 3);

  bestBox.innerHTML = `
  <div class="best-player">
    <div class="best-name">${first_name}  ${second_name}</div>
    
    <div class="dm-rating">DMFR: ${dmRating}</div>
    <div class="best-img dm-img"><img src="https://resources.premierleague.com/premierleague/photos/players/250x250/p${photo.replace('jpg', 'png')}" alt=""></div>
  </div>
  `
  bestContainer.appendChild(bestBox);
}

//David may box
function davidMayBox() {
  const mayBox = document.createElement('div');

  mayBox.classList.add('best-player');

  mayBox.innerHTML = `
    <div class="best-player">
    <div class="best-name">David May</div>
  
    <div class="dm-rating">DMFR: 10,000</div>
    <div class="best-img"><img src="img/dMay4.jpg"></div>
</div>
  `

  bestContainer.appendChild(mayBox);
}


// David May
function davidMayApproved() {
  fetch('bootstrap-static.json')
    .then(res => res.json())
    .then(data => {
      const players = data.elements;

      // filter array to players with 100 chance of playing this week and next
      const matchFit = players.filter(fit => fit.chance_of_playing_this_round === 100 && fit.chance_of_playing_next_round === 100);

      // Sort by threat and reduce to 30
      const threat = matchFit.sort(function (a, b) {
        return b.threat - a.threat;
      })
      threat.splice(30, matchFit.length)

      //sort by creativity and reduce to 20
      const creativity = threat.sort(function (a, b) {
        return b.creativity - a.creativity;
      })
      creativity.splice(20, threat.length);

      // Sort players by influence and reduce array to 10
      const influence = creativity.sort(function (a, b) {
        return b.influence - a.influence;
      })
      influence.splice(10, creativity.length);


      influence.forEach(createBestBox);
    })
}











// Hipster box
function createHipBox(item) {
  const hipBox = document.createElement('div');

  let {
    first_name,
    second_name,
    photo,
    selected_by_percent,
    points_per_game
  } = item;

  hipBox.classList.add('best-hipster');

  hipBox.innerHTML = `
    <div class="hip-player">

    <div class="hip-name">${first_name} ${second_name}</div>
   
    <div class="hip-percent">Selected by ${selected_by_percent}% of managers</div>

    <div class="hipPoints">${points_per_game} points per game</div>
   
    <div class="hip-img"><img src="https://resources.premierleague.com/premierleague/photos/players/250x250/p${photo.replace('jpg', 'png')}" alt=""></div>
    </div>
  `

  hipsterConatiner.appendChild(hipBox);
}


// Narrow down hipster players
function hipsterPlayers() {
  fetch('bootstrap-static.json')
    .then(res => res.json())
    .then(data => {
      const players = data.elements;

      // sort players by 'selected by percent'
      const percent = players.sort(function (a, b) {
        return b.selected_by_percent - a.selected_by_percent;
      })

      // remove top 50 players
      const hipPercent = percent.splice(0, 50);

      // reduce hipPercent array to 25
      let topHip = hipPercent.splice(25, hipPercent.length);
      topHip = topHip.sort(function (a,b){
        return b.points_per_game - a.points_per_game;
      })

      topHip.forEach(createHipBox);
    })
}










//Worst player 
const reasons = ['Cancelled', 'Deported', 'Shit', 'Caught flouting lockdown rules', 'Struck a fan', 'Prick'];

function createWorstBox(item) {

  const box = document.createElement('div');
  let {
    transfers_out_event,
    first_name,
    second_name,
    news,
    photo
  } = item;

  box.classList.add('worst-player');

  if (news === '') {
    news = reasons[Math.floor(Math.random() * reasons.length)]
  }

  box.innerHTML = `
    <div class="wp-info">
      <div class="wp-name">${first_name}  ${second_name}</div>
      <div class="wp-news">${news}</div>
      <div class="wp-transfers">${transfers_out_event} Chucks</div>
    </div>
      <div class="wp-photo"><img src="https://resources.premierleague.com/premierleague/photos/players/250x250/p${photo.replace('jpg', 'png')}" alt=""></div>
      
  `
  main.appendChild(box);

}

function fetchPlayerOutData() {
  fetch('bootstrap-static.json')
    .then(res => res.json())
    .then(data => {
      const players = data.elements;

      const playersOut = players.sort(function (a, b) {
        return b.transfers_out_event - a.transfers_out_event;
      });

      playersOut.splice(50, playersOut.length);

      playersOut.forEach(createWorstBox);

    });
};






// Create spotlight card for each season
function createSpotlightBox(item) {
  const spotlightBox = document.createElement('div');

  let {
    season_name,
    total_points,
    minutes,
    goals_scored,
    assists,
    own_goals,
  } = item;

  spotlightBox.classList.add('spotlight-box');

  spotlightBox.innerHTML = `
  <div><b>${season_name}</b></div>
  <div>Total Points: ${total_points}</div>
  <div>Minutes Played: ${minutes}</div>
  <div>Goals Scored: ${goals_scored}</div>
  <div>Assists: ${assists}</div>
  <div>Own Goals: ${own_goals}</div>
  `

  spotlightPast.appendChild(spotlightBox);
}

// Player Spotlight
function fetchSpotlightData() {
  fetch('rashford.json')
    .then(res => res.json())
    .then(data => {
      const spotlightData = data.history_past;

      spotlightData.forEach(createSpotlightBox);
    })

  fetch('bootstrap-static.json')
    .then(res => res.json())
    .then(data => {
      const rashData = data.elements[433];

      let {
        goals_scored,
        points_per_game,
        selected_by_percent,
        assists,
        own_goals,
        yellow_cards,
        red_cards,
        photo,
        total_points,
        minutes
      } = rashData;

      const currentSpotlight = document.createElement('div');

      currentSpotlight.classList.add('current-box');

      currentSpotlight.innerHTML = `
    <h1>2020/21</h1>
    <div>Total Points: ${total_points}</div>
    <div>Minutes Played: ${minutes}
    <div>Goals Scored: ${goals_scored}</div>
    <div>Assists: ${assists}</div>
    <div>Own Goals: ${own_goals}</div>
    <div>Yeallow Cards: ${yellow_cards}</div>
    <div>Red Cards: ${red_cards}</div>
    <div><img src="https://resources.premierleague.com/premierleague/photos/players/250x250/p${photo.replace('jpg', 'png')}" alt=""></div>
    <p>Should Marcus recieve bonus points for his important work feeding the nation's hungry children? This reporter believes he should.</p>

    `
      spotlightCurrent.appendChild(currentSpotlight);


    })

}


// Riddle time
function fetchRiddleData() {
  fetch('bootstrap-static.json')
    .then(res => res.json())
    .then(data => {
      const players = data.elements;
      const teams = data.teams;

      // Sort and remove players with 0 points
        const goodPlayers = players.sort(function (a,b) {
        return b.points_per_game - a.points_per_game;
      })
      console.log(goodPlayers);
      const randomPlayer = players[Math.floor(Math.random() * 700)]
      console.log(randomPlayer)
      const {
        goals_scored,
        points_per_game,
        selected_by_percent,
        assists,
        own_goals,
        yellow_cards,
        red_cards,
        photo,
        total_points,
        minutes,
        second_name,
        team_code
      } = randomPlayer;

      function getTeamName() {
        for (let i = 0; i < 20; i++) {
          if (team_code === teams[i].code) {
            return teams[i].name;
          }
        }
      }


      clueContainer.innerHTML = `
    <div class="clue">I have scored ${goals_scored} goals this season</div>
    <div class="clue">The second letter of my surname is '${second_name.charAt(1)}'</div>
    <div class="clue">On average, I score ${points_per_game} points per game</div>
    <div class="clue">I have scored ${total_points} points this season</div>
    <div class="clue">I play for ${getTeamName()}</div>
    <div>Who Am I?</div>
    `
    })

}


fetchRiddleData()

fetchSpotlightData();

hipsterPlayers();

fetchPlayerOutData();

davidMayApproved();

davidMayBox()