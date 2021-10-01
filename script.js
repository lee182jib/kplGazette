// Front page DOM
const gameWeekDisplay = document.getElementById('gameweek');
const gameWeekHeadline = document.getElementById('gameweek-headline');

// Gameweek DOM
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const loading = document.getElementById('loading');

const benchBoost = document.getElementById('benchboost');
const freeHit = document.getElementById('freehit');
const wildCard = document.getElementById('wildcard');
const trippleCaptain = document.getElementById('tripplecaptain');

const selectedPlayer = document.getElementById('selected-player');
const selectedImg = document.getElementById('selected-img');

const transferredPlayer = document.getElementById('transferred-player');
const transferredImg = document.getElementById('transferred-img');

const capPlayer = document.getElementById('cap-player');
const capImg = document.getElementById('cap-img');
const viceCapPlayer = document.getElementById('vice-cap-player');
const viceCapImg = document.getElementById('vice-cap-img')

// Chucks Player DOM 
const playerName = document.getElementById('player-name');
const playerTransfers = document.getElementById('player-transfers');
const playerNews = document.getElementById('player-news');
const playerPhoto = document.getElementById('player-photo');
const main = document.getElementById('chucked-main');

// David May DOM
const keeperArea = document.getElementById('keeper');
const defenderArea = document.getElementById('defenders');
const midfielderArea = document.getElementById('midfielders');
const forwardArea = document.getElementById('forwards');

const statKeeper = document.getElementById('stat-keeper');
const defStat = document.getElementById('def-stat');
const midStat = document.getElementById('mid-stat');
const fwdStat = document.getElementById('fwd-stat');


// Hipster DOM
const keeperAreaHipster = document.getElementById('keeper-hipster');
const defenderAreaHipster = document.getElementById('defenders-hipster');
const midfielderAreaHipster = document.getElementById('midfielders-hipster');
const forwardAreaHipster = document.getElementById('forwards-hipster');

const statKeeperHip = document.getElementById('stat-keeper-hip');
const defStatHip = document.getElementById('def-stat-hip');
const midStatHip = document.getElementById('mid-stat-hip');
const fwdStatHip = document.getElementById('fwd-stat-hip');

// find  and display current gameweek stats
function findGameWeek() {
  fetch('bootstrap-static.json')
    .then(res => res.json())
    .then(data => {
      const gameWeeks = data.events;
      const players = data.elements;
      

      for (i = 0; i < gameWeeks.length - 1; i++) {
        if (gameWeeks[i].is_current === true) {
          // get current week
          var gameWeek = gameWeeks[i];
          console.log(gameWeek);
          gameWeekDisplay.innerHTML = `${gameWeek.name}`;
          gameWeekHeadline.innerHTML = `${gameWeek.name} at a Glance`;
          // get next week
          var deadlineWeek = gameWeeks[i + 1];
        }

      }
      var deadline = deadlineWeek.deadline_time;

      
      console.log(new Date(deadline));

      // find most selected player
      const mostSelectedId = gameWeek.most_selected;
      for (i = 0; i < players.length; i++) {
        if (mostSelectedId === players[i].id) {
          var mostSelectedPlayer = players[i];
        }
      }
      console.log(mostSelectedPlayer);

      // find most transferred in player
      const mostTransferredInId = gameWeek.most_transferred_in;
      for (i = 0; i < players.length; i++) {
        if (mostTransferredInId === players[i].id) {
          var mostTransferredInPlayer = players[i];
        }
      }

      // find most captained and vice captained
      const mostCapId = gameWeek.most_captained;
      for (i = 0; i < players.length; i++) {
        if (mostCapId === players[i].id) {
          var mostCap = players[i];
        }
      }

      const mostViceCapId = gameWeek.most_vice_captained;
      for (i = 0; i < players.length; i++) {
        if (mostViceCapId === players[i].id) {
          var mostViceCap = players[i];
        }
      }

      // display most selected/transferred player
      selectedPlayer.innerHTML = `${mostSelectedPlayer.web_name}<hr>Selected by ${mostSelectedPlayer.selected_by_percent}% of managers`;
      selectedImg.innerHTML = `<img src="https://resources.premierleague.com/premierleague/photos/players/250x250/p${mostSelectedPlayer.photo.replace('jpg', 'png')}" alt=""></div>`;

      transferredPlayer.innerHTML = `${mostTransferredInPlayer.web_name}<hr>${mostTransferredInPlayer.transfers_in_event.toLocaleString()} transfers this week`;
      transferredImg.innerHTML = `<img src="https://resources.premierleague.com/premierleague/photos/players/250x250/p${mostTransferredInPlayer.photo.replace('jpg', 'png')}" alt=""></div>`;

      // display most captained and vice captained
      capPlayer.innerHTML = `${mostCap.web_name}`
      capImg.innerHTML = `<img src="https://resources.premierleague.com/premierleague/photos/players/250x250/p${mostCap.photo.replace('jpg', 'png')}" alt=""></div>`

      viceCapPlayer.innerHTML = `${mostViceCap.web_name}`
      viceCapImg.innerHTML = `<img src="https://resources.premierleague.com/premierleague/photos/players/250x250/p${mostViceCap.photo.replace('jpg', 'png')}" alt=""></div>`



      // find chip plays info
      const benchBoosts = gameWeek.chip_plays[0].num_played;
      const freeHits = gameWeek.chip_plays[1].num_played;
      const wildCards = gameWeek.chip_plays[2].num_played;
      const trippleCaptains = gameWeek.chip_plays[3].num_played
      console.log(trippleCaptains);

      function deadlineCountdown(deadline) {
        const total = Date.parse(deadline) - Date.parse(new Date());
        const s = Math.floor((total / 1000) % 60);
        const m = Math.floor((total / 1000 / 60) % 60);
        const h = Math.floor((total / (1000 * 60 * 60)) % 24);
        const d = Math.floor(total / (1000 * 60 * 60 * 24));

        days.innerHTML = d;
        hours.innerHTML = h < 10 ? '0' + h : h;
        minutes.innerHTML = m < 10 ? '0' + m : m;
        seconds.innerHTML = s < 10 ? '0' + s : s;

      }

      setInterval(function () {
        deadlineCountdown(deadline);
      }, 1000);

      console.log(gameWeek);

      

      benchBoost.innerHTML = `${benchBoosts.toLocaleString()}`;
      freeHit.innerHTML = `${freeHits.toLocaleString()}`;
      wildCard.innerHTML = `${wildCards.toLocaleString()}`;
      trippleCaptain.innerHTML = `${trippleCaptains.toLocaleString()}`;
    })
}

// Chucks

const reasons = ['Cancelled', 'Deported', 'Shit', 'Caught flouting lockdown rules', 'Struck a fan', 'Prick', 'Some changing room drama'];

function createChuckedBox(item) {
  const card = document.createElement('div');
  let {
    transfers_out,
    transfers_out_event,
    first_name,
    second_name,
    news,
    photo
  } = item;

  if (news === '') {
    news = reasons[Math.floor(Math.random() * reasons.length)]
  }

  card.classList.add('worst-player');

  card.innerHTML = `
    <div class="player-card">
    <h3 class="player-name">${first_name}  ${second_name}</h3>
    <div class="player-photo"><img src="https://resources.premierleague.com/premierleague/photos/players/250x250/p${photo.replace('jpg', 'png')}" alt=""></div>
    <div class="transfers-news">
      <div class="player-transfers">${transfers_out_event.toLocaleString()} transfers out this week</div>
      <div class="player-transfers">${transfers_out.toLocaleString()} transfers out this season</div>
      <hr>
      <div class="player-news"><em>${news}</em></div>
    </div>
  `
  main.appendChild(card);

}

function fetchChuckData() {
  fetch('bootstrap-static.json')
    .then(res => res.json())
    .then(data => {
      const playersOut = data.elements.sort(function (a, b) {
        return b.transfers_out_event - a.transfers_out_event;
      });

      playersOut.splice(10, playersOut.length);

      playersOut.forEach(createChuckedBox)
    })
}

fetchChuckData();

// David May


// find best keeper
function findBestGk() {
  fetch('bootstrap-static.json')
    .then(res => res.json())
    .then(data => {
      let keepers = data.elements.filter(gk => gk.element_type === 1);

      bestKeepers = keepers.sort(function (a, b) {
        return b.total_points - a.total_points;
      })

      var bestKeeper = bestKeepers[0]

      createKeeperBox(bestKeeper);
    })
}

// create best keeper card
function createKeeperBox(item) {

  const card = document.createElement('div');
  card.classList.add('keeper');

  let {
    web_name,
    photo,
    points_per_game,
    total_points
  } = item;


  card.innerHTML = `
  <div class="may-card"><img class="player-photo" src="https://resources.premierleague.com/premierleague/photos/players/250x250/p${photo.replace('jpg', 'png')}" alt="">
  <p class="may-name">${web_name}</p>
  </div>
`

  keeperArea.appendChild(card);

  statKeeper.innerHTML = `
  <p>${web_name}</p>
  <p>${points_per_game}</p>
  <p>${total_points}</p>`;
}




// find best defenders
function findBestDef() {
  fetch('bootstrap-static.json')
    .then(res => res.json())
    .then(data => {
      let defenders = data.elements.filter(df => df.element_type === 2);

      bestDefenders = defenders.sort(function (a, b) {
        return b.total_points - a.total_points;
      })

      var bestDefenders = defenders.slice(0, 3);

      bestDefenders.forEach(createDefBoxes);

    })
}

// create best defender cards
function createDefBoxes(item) {

  const card = document.createElement('div');
  card.classList.add('defender');
  let {
    web_name,
    photo,
    points_per_game,
    total_points
  } = item;


  card.innerHTML = `
  <div class="may-card"><img class="player-photo" src="https://resources.premierleague.com/premierleague/photos/players/250x250/p${photo.replace('jpg', 'png')}" alt="">
  <p class="may-name">${web_name}</p>
  </div>
  
`
  defenderArea.appendChild(card);

  defStat.insertAdjacentHTML('beforeend', `
  <div class="stat-def">
    <p>${web_name}</p>
    <p>${points_per_game}</p>
    <p>${total_points}</p>
  </div>
  `);

}

// find best midfielders
function findBestMid() {
  fetch('bootstrap-static.json')
    .then(res => res.json())
    .then(data => {
      let midfielders = data.elements.filter(md => md.element_type === 3);

      bestMidfielders = midfielders.sort(function (a, b) {
        return b.total_points - a.total_points;
      })

      var bestMidfielders = midfielders.slice(0, 4);

      bestMidfielders.forEach(createMidBoxes);
    })
}

// create best midfielder cards
function createMidBoxes(item) {

  const card = document.createElement('div');
  card.classList.add('midfielder');

  let {
    web_name,
    photo,
    points_per_game,
    total_points
  } = item;

  card.innerHTML = `
  <div class="may-card"><img class="player-photo" src="https://resources.premierleague.com/premierleague/photos/players/250x250/p${photo.replace('jpg', 'png')}" alt="">
  <p class="may-name">${web_name}</p>
  </div>
`
  midfielderArea.appendChild(card);

  midStat.insertAdjacentHTML('beforeend', `
  <div class="stat-mid">
    <p>${web_name}</p>
    <p>${points_per_game}</p>
    <p>${total_points}</p>
  </div>
  `);

}


// find best forwards
function findBestFwd() {
  fetch('bootstrap-static.json')
    .then(res => res.json())
    .then(data => {
      let forwards = data.elements.filter(fwd => fwd.element_type === 4);

      bestForwards = forwards.sort(function (a, b) {
        return b.total_points - a.total_points;
      })

      var bestForwards = forwards.slice(0, 2);
      console.log(bestForwards);
      bestForwards.forEach(createFwdBoxes);
    })
}

// create forward cards
function createFwdBoxes(item) {

  const card = document.createElement('div');
  card.classList.add('forward');

  let {
    web_name,
    photo,
    points_per_game,
    total_points
  } = item;

  card.innerHTML = `
  <div class="may-card"><img class="player-photo" src="https://resources.premierleague.com/premierleague/photos/players/250x250/p${photo.replace('jpg', 'png')}" alt="">
  <p class="may-name">${web_name}
  </div>
`
  forwardArea.appendChild(card);

  fwdStat.insertAdjacentHTML('beforeend', `
  <div class="stat-fwd">
    <p>${web_name}</p>
    <p>${points_per_game}</p>
    <p>${total_points}</p>
  </div>
  `);
  
}

// Hipster

// Find hipster GK

function findHipsterGk() {
  fetch('bootstrap-static.json')
    .then(res => res.json())
    .then(data => {
      let keepers = data.elements.filter(gk => gk.element_type === 1);

      // sort keepers by %
      let percentKeepers = keepers.sort(function (a, b) {
        return b.selected_by_percent - a.selected_by_percent;
      })

      // pick 10th most selected keeper
      const hipKeeper = percentKeepers[9];

      createHipsterKeeperBox(hipKeeper);
    })
}

// find hipster defenders

function findHipsterDefenders() {
  fetch('bootstrap-static.json')
    .then(res => res.json())
    .then(data => {
      let defenders = data.elements.filter(df => df.element_type === 2);

      const percentDefenders = defenders.sort(function (a, b) {
        return b.selected_by_percent - a.selected_by_percent;
      })

      const hipDefenders = percentDefenders.splice(15, 4);
      hipDefenders.forEach(createHipsterDefBoxes)
    })
}

// find hipster midfielders

function findHipsterMidfielders() {
  fetch('bootstrap-static.json')
    .then(res => res.json())
    .then(data => {
      let midfielders = data.elements.filter(df => df.element_type === 3);

      const percentMidfielders = midfielders.sort(function (a, b) {
        return b.selected_by_percent - a.selected_by_percent;
      })

      const hipMidfielders = percentMidfielders.splice(15, 4);
      hipMidfielders.forEach(createHipsterMidBoxes)
    })
}

// find hipster forwards

function findHipsterForwards() {
  fetch('bootstrap-static.json')
    .then(res => res.json())
    .then(data => {
      let forwards = data.elements.filter(df => df.element_type === 4);

      const percentForwards = forwards.sort(function (a, b) {
        return b.selected_by_percent - a.selected_by_percent;
      })

      const hipForwards = percentForwards.splice(10, 2);
      hipForwards.forEach(createHipsterFwdBoxes);
    })
}

// create hipster keeper card
function createHipsterKeeperBox(item) {

  const card = document.createElement('div');
  card.classList.add('keeper');

  let {
    web_name,
    photo,
    total_points,
    selected_by_percent
  } = item;


  card.innerHTML = `
  <div class="may-card"><img class="player-photo" src="https://resources.premierleague.com/premierleague/photos/players/250x250/p${photo.replace('jpg', 'png')}" alt="">
  <p class="may-name">${web_name}</p>
  </div>
`

  keeperAreaHipster.appendChild(card);

  statKeeperHip.insertAdjacentHTML('beforebegin', `
  <div class="stat-keeper-hip">
    <p>${web_name}</p>
    <p>${total_points}</p>
    <p>${selected_by_percent}%</p>
  </div>
  `);
}

// create hipster defender cards
function createHipsterDefBoxes(item) {

  const card = document.createElement('div');
  card.classList.add('defender');
  let {
    web_name,
    photo,
    total_points,
    selected_by_percent
  } = item;


  card.innerHTML = `
  <div class="may-card"><img class="player-photo" src="https://resources.premierleague.com/premierleague/photos/players/250x250/p${photo.replace('jpg', 'png')}" alt="">
  <p class="may-name">${web_name}</p>
  </div>
  
`
  defenderAreaHipster.appendChild(card);

  defStatHip.insertAdjacentHTML('beforeend', `
  <div class="stat-def-hip">
  <p>${web_name}</p>
  <p>${total_points}</p>
  <p>${selected_by_percent}%</p>
  </div>
  `);

}

// create hipster midfielder cards
function createHipsterMidBoxes(item) {

  const card = document.createElement('div');
  card.classList.add('midfielder');
  let {
    selected_by_percent,
    web_name,
    photo,
    total_points
  } = item;


  card.innerHTML = `
  <div class="may-card"><img class="player-photo" src="https://resources.premierleague.com/premierleague/photos/players/250x250/p${photo.replace('jpg', 'png')}" alt="">
  <p class="may-name">${web_name}
  </p>
  </div>
  
`
  midfielderAreaHipster.appendChild(card);

  midStatHip.insertAdjacentHTML('beforeend', `
  <div class="stat-mid-hip">
  <p>${web_name}</p>
  <p>${total_points}</p>
  <p>${selected_by_percent}%</p>
  </div>
  `);

}

// create hipster forward cards
function createHipsterFwdBoxes(item) {

  const card = document.createElement('div');
  card.classList.add('forward');
  let {
    web_name,
    photo,
    selected_by_percent,
    total_points
  } = item;


  card.innerHTML = `
  <div class="may-card"><img class="player-photo" src="https://resources.premierleague.com/premierleague/photos/players/250x250/p${photo.replace('jpg', 'png')}" alt="">
  <p class="may-name">${web_name}</p>
  </div>
  
`
  forwardAreaHipster.appendChild(card);

  fwdStatHip.insertAdjacentHTML('beforeend', `
  <div class="stat-fwd-hip">
  <p>${web_name}</p>
  <p>${total_points}</p>
  <p>${selected_by_percent}%</p>
  </div>
  `);

}

// Riddle time

let score = 0;
let randomPlayer = 0;

function fetchRiddleData() {
  fetch('bootstrap-static.json')
    .then(res => res.json())
    .then(data => {
      const players = data.elements;

      const teams = data.teams;

      // sort and shorten list to top 350 players
      let goodPlayers = players.sort(function (a, b) {
        return b.points_per_game - a.points_per_game;
      });
      goodPlayers = goodPlayers.splice(0, 350);



      randomPlayer = goodPlayers[Math.floor(Math.random() * 400)];

      console.log(randomPlayer.first_name, randomPlayer.second_name);
    })
}



findBestGk();
findBestDef();
findBestMid();
findBestFwd();

findHipsterGk();
findHipsterDefenders();
findHipsterMidfielders();
findHipsterForwards();

fetchRiddleData();

findGameWeek()
