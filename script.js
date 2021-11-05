// Front page DOM
const gameWeekDisplay = document.getElementById('gameweek');
const gameWeekHeadline = document.getElementById('gameweek-headline');

// Manager of the week


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

const Monty = document.getElementById('selected-player');
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

// Monty DOM
const clueContainer = document.getElementById('clue-container');
const riddleInput = document.getElementById('riddle-input');
const riddleSubmit = document.getElementById('riddle-submit');
const riddleRefresh = document.getElementById('riddle-refresh')

const cross1 = document.getElementById('cross1');
const cross2 = document.getElementById('cross2');
const cross3 = document.getElementById('cross3');
const cross4 = document.getElementById('cross4');
const cross5 = document.getElementById('cross5');

const overlayWin = document.getElementById('overlay-win');
const playAgain = document.getElementById('play-again');
const overlayLose = document.getElementById('overlay-lose');
const tryAgain = document.getElementById('try-again');

// Manager of the week






// find  and display current gameweek stats
function findGameWeek() {
  var gameWeek = 0;
  fetch('bootstrap-static.json')
    .then(res => res.json())
    .then(data => {
      const gameWeeks = data.events;
      const players = data.elements;


      for (i = 0; i < gameWeeks.length - 1; i++) {
        if (gameWeeks[i].is_current === true) {
          // get current week
          gameWeek = gameWeeks[i];
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
          var mostMonty = players[i];
        }
      }
      console.log(mostMonty);

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
      Monty.innerHTML = `${mostMonty.web_name}<hr>Selected by ${mostMonty.selected_by_percent}% of managers`;
      selectedImg.innerHTML = `<img src="https://resources.premierleague.com/premierleague/photos/players/250x250/p${mostMonty.photo.replace('jpg', 'png')}" alt=""></div>`;

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
    });

  function findH2H(initials1, initials2, gameNum) {
    fetch('week10data/' + initials1 + 'week10.json')
      .then(res => res.json())
      .then(data => {
        var weeks = data.current;

        fetch('week10data/' + initials2 + 'week10.json')
          .then(res => res.json())
          .then(data2 => {
            var weeks2 = data2.current;
            console.log(weeks2);

            fetch('week10data/h2h.json')
              .then(res => res.json())
              .then(h2hData => {
                var team1and2 = [h2hData.results[gameNum].entry_1_name, h2hData.results[gameNum].entry_2_name];
                console.log(game1);
                console.log(gameWeek);
              


            var xValues = ['GW1', 'GW2', 'GW3', 'GW4', 'GW5', 'GW6', 'GW7', 'GW8', 'GW9'];
            var yValues = [
              weeks[0].points,
              weeks[1].points,
              weeks[2].points,
              weeks[3].points,
              weeks[4].points,
              weeks[5].points,
              weeks[6].points,
              weeks[7].points,
              weeks[8].points,
              weeks[9].points,
             
            ];

            var yValues2 = [
              weeks2[0].points,
              weeks2[1].points,
              weeks2[2].points,
              weeks2[3].points,
              weeks2[4].points,
              weeks2[5].points,
              weeks2[6].points,
              weeks2[7].points,
              weeks2[8].points,
              weeks2[9].points,
           
            ];

            new Chart('game' + gameNum, {
              type: "line",
              data: {
                labels: xValues,
                datasets: [{
                    label: team1and2[0],
                    borderColor: "#446df6",
                    data: yValues,
                    fill: false,
                    lineTension: 0,

                  },
                  {
                    label: team1and2[1],
                    borderColor: "#b4e1ff",
                    data: yValues2,
                    fill: false,
                    lineTension: 0,
                  }
                ]
              },
              options: {

                title: {
                  display: false,
                  text: 'Game ' + gameNum+1
                },

                legend: {
                  display: true,
                },
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                  yAxes: [{
                    ticks: {
                      min: 0,
                      max: 100,
                      stepSize: 10,

                    }
                  }]
                },

              }
            })
            });
          })

      })
  }

  findH2H('LW', 'TN', 0);
  findH2H('CT', 'DH', 1);
  findH2H('PP', 'WN', 2);
  findH2H('TW', 'PN', 3);
  findH2H('CE', 'DP', 4);
  findH2H('AE', 'BW', 5);



}

// Chucks

const reasons = ['Caught drunk driving', 'Cancelled', 'Deported', 'Shit', 'Caught flouting lockdown rules', 'Struck a fan', 'Prick', 'Changing room drama', 'Massive allegations'];

function createChuckedBox(item) {
  const card = document.createElement('div');
  let {
    transfers_out,
    transfers_out_event,
    web_name,
    news,
    photo
  } = item;

  if (news === '') {
    news = reasons[Math.floor(Math.random() * reasons.length)]
  }

  card.classList.add('worst-player');

  card.innerHTML = `
    <div class="player-card">
    <h3 class="player-name">${web_name}</h3>
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

function fetchRiddleData() {
  fetch('bootstrap-static.json')
    .then(res => res.json())
    .then(data => {
      const players = data.elements;
      const teams = data.teams;

      riddleInput.value = ''

      // Sort and remove players with 0 points
      let goodPlayers = players.sort(function (a, b) {
        return b.total_points - a.total_points;
      })
      goodPlayers = goodPlayers.splice(0, 300);

      console.log(goodPlayers);
      const randomPlayer = goodPlayers[Math.floor(Math.random() * goodPlayers.length)]

      const {
        points_per_game,
        total_points,
        minutes,
        web_name,
        team_code
      } = randomPlayer;

      const correctAnswer = randomPlayer.web_name.normalize('NFC');

      function getTeamName() {
        for (let i = 0; i < 20; i++) {
          if (team_code === teams[i].code) {
            return teams[i].name;
          }
        }
      }

      console.log(correctAnswer);

      let montyLives = 5;

      if (montyLives === 5) {
        cross1.style.display = 'none';
        cross2.style.display = 'none';
        cross3.style.display = 'none';
        cross4.style.display = 'none';
        cross5.style.display = 'none';
      }

      riddleRefresh.addEventListener('click', () => {
        fetchRiddleData();
      });

      playAgain.addEventListener('click', () => {
        overlayWin.style.display = 'none';
        
        fetchRiddleData();
      })

      tryAgain.addEventListener('click', () =>{
        overlayLose.style.display = 'none';
        fetchRiddleData();
      })

      

      riddleSubmit.addEventListener('click', () => {
        if (correctAnswer === riddleInput.value) {
          console.log(riddleInput.value);
          overlayWin.style.display = 'inline';

          fetchRiddleData();
        } else {
          montyLives--;
          console.log(montyLives);

          if (montyLives === 4) {
            cross1.style.display = 'inline';
          } else if (montyLives === 3) {
            cross2.style.display = 'inline';
          } else if (montyLives === 2) {
            cross3.style.display = 'inline';
          } else if (montyLives === 1) {
            cross4.style.display = 'inline';
          } else if (montyLives === 0) {
            cross5.style.display = 'inline';
            overlayLose.style.display = 'flex';

            fetchRiddleData();

          }
        }
      })

      clueContainer.innerHTML = `
    <div class="clue">He plays for ${getTeamName()}</div>
    <div class="clue">The second letter of his surname is '${web_name.charAt(1)}'</div>
    <div class="clue">On average, he scores ${points_per_game} points per game</div>
    <div class="clue">He has scored ${total_points} points this season</div>
    <div class="clue">He has played ${minutes} minutes this season</div>
    <div>BUT WHO IS HE?</div>
    `
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

findGameWeek()

fetchRiddleData()

/*

// Monty DOM
const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const input = document.getElementById('monty-input');
const clue1 = document.getElementById('clue1');
const clue2 = document.getElementById('clue2');
const clue3 = document.getElementById('clue3');

const figureParts = document.querySelectorAll('.figure-part');

const correctLetters = ['a', 'e', 'i'];
const wrongLetters = [];

function findMontyPlayer() {
  fetch('bootstrap-static.json')
    .then(res => res.json())
    .then(data => {
      const players = data.elements;
      const montyPlayers = [];
      const teams = data.teams;
      for (let i = 0; i < players.length; i++) {
        montyPlayers.push(players[i].web_name);
      }
      var selectedMontyPlayer = montyPlayers[Math.floor(Math.random() * montyPlayers.length)].toLowerCase();
      console.log(selectedMontyPlayer);







      var {
        web_name
      } = selectedMontyPlayer;


      clue1.innerHTML = `His name is ${selectedMontyPlayer}`

      function displayWord() {
        wordEl.innerHTML = `
          ${selectedMontyPlayer
            .split('')
            .map(letter => `
            <span class="letter">
              ${correctLetters.includes(letter) ? letter : ''}
              </span>
              `).join('')}
        `;
        const innerWord = wordEl.innerText.replace(/\n/g, '');

        if (innerWord === selectedMontyPlayer) {
          finalMessage.innerText = 'Congratulations!';
          popup.style.display = 'flex';
        }
      }
      //Update the wrong letters
      function updateWrongLettersEl() {
        wrongLettersEl.innerHTML = `
          ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
          ${wrongLetters.map(letter => `<span>${letter}</span>`)}
        `;

        figureParts.forEach((part, index) => {
          const errors = wrongLetters.length;

          if (index < errors) {
            part.style.display = 'block';
          } else {
            part.style.display = 'none';
          }
        })

        // Check if lost
        if (wrongLetters.length === figureParts.length) {
          finalMessage.innerText = `You lose! It was, of course ${selectedMontyPlayer}`;
          popup.style.display = 'flex';
        }
      }


      // show notification
      function showNotification() {
        notification.classList.add('show');

        setTimeout(() => {
          notification.classList.remove('show');
        }, 2000)
      }

      //Keydown letter press
      window.addEventListener('keydown', e => {
        if (e.key >= 'a' && e.key <= 'z') {
          const letter = e.key;

          if (selectedMontyPlayer.includes(letter)) {
            if (!correctLetters.includes(letter)) {
              correctLetters.push(letter);

              displayWord()
            } else {
              showNotification()
            }
          } else {
            if (!wrongLetters.includes(letter)) {
              wrongLetters.push(letter);

              updateWrongLettersEl();
            } else {
              showNotification()
            }
          }
        }
      });


      displayWord();

      // Restart game and play again
      playAgainBtn.addEventListener('click', () => {
        // Empty arrays 
        correctLetters.splice(0);
        wrongLetters.splice(0);

        selectedMontyPlayer = montyPlayers[Math.floor(Math.random() * montyPlayers.length)].toLowerCase();

        displayWord();

        updateWrongLettersEl();

        popup.style.display = 'none';

        input.value = '';
      })

    })



}

findMontyPlayer()
*/
