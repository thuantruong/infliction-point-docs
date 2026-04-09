'use strict';

const NAMESPACE = 'urn:x-cast:dev.2an.inflictionpoint.score';

const scoreboardEl = document.getElementById('scoreboard');
const idleEl = document.getElementById('idle');

// Point display elements
const points1El = document.getElementById('points1');
const points2El = document.getElementById('points2');
const serve1El = document.getElementById('serve1');
const serve2El = document.getElementById('serve2');
const winner1El = document.getElementById('winner1');
const winner2El = document.getElementById('winner2');

// Center overlay elements
const formatLabelEl = document.getElementById('format-label');
const scoreRowEl = document.getElementById('score-row');
const dotsRowEl = document.getElementById('dots-row');

function showIdle() {
  scoreboardEl.classList.add('hidden');
  idleEl.classList.remove('hidden');
}

function showScoreboard() {
  idleEl.classList.add('hidden');
  scoreboardEl.classList.remove('hidden');
}

// --- Rendering ---

function renderMatchState(state) {
  showScoreboard();

  const config = state.config;
  const format = config.matchFormat;

  // Points display
  if (format === 'FIXED_POINT') {
    points1El.textContent = state.sets[state.currentSetIndex].gamesTeam1;
    points2El.textContent = state.sets[state.currentSetIndex].gamesTeam2;
  } else if (state.isTiebreak) {
    points1El.textContent = state.tiebreakPointsTeam1;
    points2El.textContent = state.tiebreakPointsTeam2;
  } else if (state.isDeuce) {
    if (state.advantageTeam === 'TEAM_1') {
      points1El.textContent = 'AD';
      points2El.textContent = '\u2014';
    } else if (state.advantageTeam === 'TEAM_2') {
      points1El.textContent = '\u2014';
      points2El.textContent = 'AD';
    } else {
      points1El.textContent = '40';
      points2El.textContent = '40';
    }
  } else {
    points1El.textContent = pointDisplayValue(state.pointsTeam1);
    points2El.textContent = pointDisplayValue(state.pointsTeam2);
  }

  // Match over: show draw dashes
  if (state.isMatchOver && !state.matchWinner) {
    points1El.textContent = '\u2014';
    points2El.textContent = '\u2014';
  }

  // Serve indicator
  serve1El.classList.toggle('hidden', state.servingTeam !== 'TEAM_1' || state.isMatchOver);
  serve2El.classList.toggle('hidden', state.servingTeam !== 'TEAM_2' || state.isMatchOver);

  // Winner crown
  winner1El.classList.toggle('hidden', state.matchWinner !== 'TEAM_1');
  winner2El.classList.toggle('hidden', state.matchWinner !== 'TEAM_2');
  winner1El.textContent = '\uD83D\uDC51';
  winner2El.textContent = '\uD83D\uDC51';

  // Center overlay
  renderCenterOverlay(state, config, format);
}

function renderCenterOverlay(state, config, format) {
  // Format label
  switch (format) {
    case 'CLASSIC':
      if (config.bestOfSets === 1) {
        formatLabelEl.textContent = 'CLASSIC';
      } else {
        formatLabelEl.textContent = 'CLASSIC (' + config.bestOfSets + ' SETS)';
      }
      break;
    case 'TOTAL_GAMES':
      formatLabelEl.textContent = 'TOTAL GAMES';
      break;
    case 'FIXED_POINT':
      formatLabelEl.textContent = config.totalPoints + ' POINTS';
      break;
    default:
      formatLabelEl.textContent = '';
  }

  // Score row
  scoreRowEl.innerHTML = '';
  if (format === 'CLASSIC') {
    if (config.bestOfSets === 1) {
      // Single set: show game score
      renderScoreValues(state.sets[0].gamesTeam1, state.sets[0].gamesTeam2);
    } else {
      // Multi-set: show sets won
      const setsWon1 = state.sets.filter(s => s.winner === 'TEAM_1').length;
      const setsWon2 = state.sets.filter(s => s.winner === 'TEAM_2').length;
      renderScoreValues(setsWon1, setsWon2);
    }
  } else if (format === 'TOTAL_GAMES') {
    const gamesWon1 = state.sets.reduce((sum, s) => sum + s.gamesTeam1, 0);
    const gamesWon2 = state.sets.reduce((sum, s) => sum + s.gamesTeam2, 0);
    renderScoreValues(gamesWon1, gamesWon2);
  } else if (format === 'FIXED_POINT') {
    // Fixed point: center shows total played / total points
    const played = state.sets[0].gamesTeam1 + state.sets[0].gamesTeam2;
    formatLabelEl.textContent = played + ' / ' + config.totalPoints + ' POINTS';
    scoreRowEl.innerHTML = '';
  }

  // Dots
  renderDots(state, config, format);
}

function renderScoreValues(score1, score2) {
  const s1 = document.createElement('span');
  s1.className = 'score-team1';
  s1.textContent = score1;

  const sep = document.createElement('span');
  sep.className = 'score-separator';
  sep.textContent = '\u2013';

  const s2 = document.createElement('span');
  s2.className = 'score-team2';
  s2.textContent = score2;

  scoreRowEl.appendChild(s1);
  scoreRowEl.appendChild(sep);
  scoreRowEl.appendChild(s2);
}

function renderDots(state, config, format) {
  dotsRowEl.innerHTML = '';

  if (format === 'CLASSIC') {
    if (config.bestOfSets === 1) {
      // Game dots for single-set mode
      const totalGames = config.gamesPerSet * 2 - 1;
      const gameWinners = state.gameWinners || [];
      for (let i = 0; i < totalGames; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i < gameWinners.length) {
          dot.classList.add(gameWinners[i] === 'TEAM_1' ? 'team1-won' : 'team2-won');
        } else if (i === gameWinners.length && !state.isMatchOver) {
          dot.classList.add('current');
        }
        dotsRowEl.appendChild(dot);
      }
    } else {
      // Set dots
      for (let i = 0; i < config.bestOfSets; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i < state.sets.length && state.sets[i].isComplete) {
          dot.classList.add(state.sets[i].winner === 'TEAM_1' ? 'team1-won' : 'team2-won');
        } else if (i === state.currentSetIndex && !state.isMatchOver) {
          dot.classList.add('current');
        }
        dotsRowEl.appendChild(dot);
      }
    }
  } else if (format === 'TOTAL_GAMES') {
    const gameWinners = state.gameWinners || [];
    for (let i = 0; i < config.totalGames; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      if (i < gameWinners.length) {
        dot.classList.add(gameWinners[i] === 'TEAM_1' ? 'team1-won' : 'team2-won');
      } else if (i === gameWinners.length && !state.isMatchOver) {
        dot.classList.add('current');
      }
      dotsRowEl.appendChild(dot);
    }
  }
  // Fixed point: no dots
}

function pointDisplayValue(point) {
  switch (point) {
    case 'ZERO': return '0';
    case 'FIFTEEN': return '15';
    case 'THIRTY': return '30';
    case 'FORTY': return '40';
    default: return '0';
  }
}

// --- Cast Receiver Setup ---

const castContext = cast.framework.CastReceiverContext.getInstance();

castContext.addCustomMessageListener(NAMESPACE, function(event) {
  const data = event.data;
  let message;
  if (typeof data === 'string') {
    try { message = JSON.parse(data); } catch (e) { return; }
  } else {
    message = data;
  }

  switch (message.type) {
    case 'match_state':
      renderMatchState(message.state);
      break;
    case 'idle':
      showIdle();
      break;
  }
});

// Show idle on sender disconnect
castContext.addEventListener(cast.framework.system.EventType.SENDER_DISCONNECTED, function(event) {
  if (castContext.getSenders().length === 0) {
    showIdle();
  }
});

// Start receiver
const options = new cast.framework.CastReceiverOptions();
options.disableIdleTimeout = true;
castContext.start(options);

// Start in idle mode
showIdle();
