'use strict';

const NAMESPACE = 'urn:x-cast:dev.2an.inflictionpoint.score';

const scoreboardEl = document.getElementById('scoreboard');
const idleEl = document.getElementById('idle');
const idleDefaultEl = document.getElementById('idle-default');
const playerEl = document.getElementById('player');

// Team panel elements
const points1El = document.getElementById('points1');
const points2El = document.getElementById('points2');
const scoreContainer1El = document.getElementById('score-container1');
const scoreContainer2El = document.getElementById('score-container2');
const label1El = document.getElementById('label1');
const label2El = document.getElementById('label2');
const serve1El = document.getElementById('serve1');
const serve2El = document.getElementById('serve2');
const medal1El = document.getElementById('medal1');
const medal2El = document.getElementById('medal2');

// Center overlay elements
const formatLabelEl = document.getElementById('format-label');
const scoreRow1El = document.getElementById('score-row-1');
const scoreRowLabelEl = document.getElementById('score-row-label');
const scoreRow2El = document.getElementById('score-row-2');
const dotsRowEl = document.getElementById('dots-row');
const badgeEl = document.getElementById('badge');

// --- Cast Receiver Setup ---

const castContext = cast.framework.CastReceiverContext.getInstance();
const playerManager = castContext.getPlayerManager();

// Auto-advance images via MEDIA_STATUS event
playerManager.addEventListener(cast.framework.events.EventType.MEDIA_STATUS, function(event) {
  if (imageTimer) {
    clearTimeout(imageTimer);
    imageTimer = null;
  }

  if (!slideshowActive) return;

  var status = event.mediaStatus;
  if (status.playerState === cast.framework.messages.PlayerState.PLAYING) {
    var media = status.media;
    if (media && media.contentType && media.contentType.startsWith('image/')) {
      var duration = 10;
      if (currentSlideData && currentSlideData.slides) {
        for (var i = 0; i < currentSlideData.slides.length; i++) {
          if (media.contentUrl && media.contentUrl.indexOf(currentSlideData.slides[i].src) !== -1) {
            duration = currentSlideData.slides[i].duration || 10;
            break;
          }
        }
      }
      imageTimer = setTimeout(function() {
        if (!slideshowActive) return;
        playerManager.getQueueManager().next();
      }, duration * 1000);
    }
  }
});

// --- Slideshow state ---

var currentPlaylistUrl = null;
var slideshowActive = false;
var imageTimer = null;
var currentSlideData = null; // reference to playlist data for duration lookup

function isVideoSrc(src) {
  return /\.(mp4|webm|ogg)$/i.test(src);
}

function getContentType(src) {
  if (isVideoSrc(src)) return 'video/mp4';
  var ext = src.split('.').pop().toLowerCase();
  switch (ext) {
    case 'webp': return 'image/webp';
    case 'png': return 'image/png';
    default: return 'image/jpeg';
  }
}

function stopSlideshow() {
  if (imageTimer) {
    clearTimeout(imageTimer);
    imageTimer = null;
  }
  if (slideshowActive) {
    try { playerManager.stop(); } catch (e) {}
    slideshowActive = false;
  }
  currentSlideData = null;
  playerEl.classList.add('hidden');
}

function showIdleDefault() {
  stopSlideshow();
  idleDefaultEl.classList.remove('hidden');
}

function startSlideshow(data, baseUrl) {
  idleDefaultEl.classList.add('hidden');
  playerEl.classList.remove('hidden');
  currentSlideData = data;

  var queueItems = data.slides.map(function(slide) {
    var mediaInfo = new cast.framework.messages.MediaInformation();
    mediaInfo.contentUrl = baseUrl + slide.src;
    mediaInfo.contentType = getContentType(slide.src);
    mediaInfo.streamType = cast.framework.messages.StreamType.BUFFERED;

    var metadata = new cast.framework.messages.GenericMediaMetadata();
    metadata.title = 'Infliction Point';
    mediaInfo.metadata = metadata;

    var queueItem = new cast.framework.messages.QueueItem();
    queueItem.media = mediaInfo;
    queueItem.autoplay = true;
    queueItem.preloadTime = 3;
    return queueItem;
  });

  var loadRequestData = new cast.framework.messages.LoadRequestData();
  var queueData = new cast.framework.messages.QueueData();
  queueData.items = queueItems;
  queueData.repeatMode = cast.framework.messages.RepeatMode.ALL;
  loadRequestData.queueData = queueData;

  playerManager.load(loadRequestData).then(function() {
    slideshowActive = true;
    playerManager.setRepeatMode(cast.framework.messages.RepeatMode.ALL);
  });
}

function showIdle(playlistUrl) {
  stopSlideshow();
  scoreboardEl.classList.add('hidden');
  idleEl.classList.remove('hidden');

  if (!playlistUrl) {
    currentPlaylistUrl = null;
    showIdleDefault();
    return;
  }

  var baseUrl = playlistUrl.endsWith('/') ? playlistUrl : playlistUrl + '/';
  currentPlaylistUrl = baseUrl;

  fetch(baseUrl + 'playlist.json')
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data && data.slides && data.slides.length > 0) {
        if (data.backgroundColor) {
          playerEl.style.setProperty('--background-color', data.backgroundColor);
        }
        startSlideshow(data, baseUrl);
      } else {
        showIdleDefault();
      }
    })
    .catch(function() {
      showIdleDefault();
    });
}

function showScoreboard() {
  slideshowActive = false;
  if (imageTimer) {
    clearTimeout(imageTimer);
    imageTimer = null;
  }
  try { playerManager.stop(); } catch (e) {}
  idleEl.classList.add('hidden');
  scoreboardEl.classList.remove('hidden');
}

// --- Rendering ---

function renderMatchState(state) {
  showScoreboard();

  var config = state.config;
  var format = config.matchFormat;

  // --- Team panels: big score text ---
  renderTeamPanels(state, format);

  // --- Center overlay ---
  renderCenterOverlay(state, config, format);
}

function renderTeamPanels(state, format) {
  var isOver = state.isMatchOver;
  var winner = state.matchWinner;
  var isDraw = isOver && !winner;

  // Serve indicators
  serve1El.classList.toggle('hidden', state.servingTeam !== 'TEAM_1' || isOver);
  serve2El.classList.toggle('hidden', state.servingTeam !== 'TEAM_2' || isOver);

  // Determine big score text for each team
  var text1, text2;

  if (isDraw) {
    text1 = '\u2014';
    text2 = '\u2014';
  } else if (isOver && winner) {
    // Winner gets trophy + team label, loser gets nothing
    if (winner === 'TEAM_1') {
      scoreContainer1El.classList.add('hidden');
      medal1El.classList.remove('hidden');
      label1El.classList.remove('hidden');
      scoreContainer2El.classList.add('hidden');
      medal2El.classList.add('hidden');
      label2El.classList.add('hidden');
    } else {
      scoreContainer2El.classList.add('hidden');
      medal2El.classList.remove('hidden');
      label2El.classList.remove('hidden');
      scoreContainer1El.classList.add('hidden');
      medal1El.classList.add('hidden');
      label1El.classList.add('hidden');
    }
    return;
  } else if (format === 'FIXED_POINT') {
    text1 = state.sets[state.currentSetIndex].gamesTeam1;
    text2 = state.sets[state.currentSetIndex].gamesTeam2;
  } else if (state.isTiebreak) {
    text1 = state.tiebreakPointsTeam1;
    text2 = state.tiebreakPointsTeam2;
  } else if (state.isDeuce) {
    if (state.advantageTeam === 'TEAM_1') {
      text1 = 'AD';
      text2 = '\u2014';
    } else if (state.advantageTeam === 'TEAM_2') {
      text1 = '\u2014';
      text2 = 'AD';
    } else {
      text1 = '40';
      text2 = '40';
    }
  } else {
    text1 = pointDisplayValue(state.pointsTeam1);
    text2 = pointDisplayValue(state.pointsTeam2);
  }

  // Show score containers, hide medals
  scoreContainer1El.classList.remove('hidden');
  scoreContainer2El.classList.remove('hidden');
  medal1El.classList.add('hidden');
  medal2El.classList.add('hidden');
  label1El.classList.remove('hidden');
  label2El.classList.remove('hidden');

  points1El.textContent = text1;
  points2El.textContent = text2;
}

function renderCenterOverlay(state, config, format) {
  // Clear all
  dotsRowEl.innerHTML = '';
  scoreRow1El.innerHTML = '';
  scoreRow1El.className = 'score-row';
  scoreRow2El.innerHTML = '';
  scoreRow2El.className = 'score-row';
  scoreRowLabelEl.classList.add('hidden');
  badgeEl.classList.add('hidden');

  var isOver = state.isMatchOver;
  var winner = state.matchWinner;
  var isDraw = isOver && !winner;

  if (format === 'CLASSIC') {
    if (config.bestOfSets === 1) {
      // Single-set: game dots + game score
      renderGameDots(state, config.gamesPerSet * 2 - 1);
      formatLabelEl.textContent = 'Games to ' + config.gamesPerSet;
      renderScoreRow(scoreRow1El, 'large',
        state.sets[0].gamesTeam1, state.sets[0].gamesTeam2);
    } else {
      // Multi-set: set dots + sets score + games score
      renderSetDots(state, config.bestOfSets);
      formatLabelEl.textContent = 'Best of ' + config.bestOfSets + ' Sets';
      var setsWon1 = state.sets.filter(function(s) { return s.winner === 'TEAM_1'; }).length;
      var setsWon2 = state.sets.filter(function(s) { return s.winner === 'TEAM_2'; }).length;
      renderScoreRow(scoreRow1El, 'medium', setsWon1, setsWon2);

      if (!isOver) {
        scoreRowLabelEl.textContent = 'Games to ' + config.gamesPerSet;
        scoreRowLabelEl.classList.remove('hidden');
        var currentSet = state.sets[state.currentSetIndex];
        renderScoreRow(scoreRow2El, 'large',
          currentSet.gamesTeam1, currentSet.gamesTeam2);
      }
    }
    // Tiebreak badge
    if (state.isTiebreak) {
      badgeEl.textContent = 'TIEBREAK';
      badgeEl.classList.remove('hidden');
    }
  } else if (format === 'TOTAL_GAMES') {
    renderGameDots(state, config.totalGames);
    formatLabelEl.textContent = 'Total ' + config.totalGames + ' Games';
    var gamesWon1 = state.sets.reduce(function(sum, s) { return sum + s.gamesTeam1; }, 0);
    var gamesWon2 = state.sets.reduce(function(sum, s) { return sum + s.gamesTeam2; }, 0);
    renderScoreRow(scoreRow1El, 'large', gamesWon1, gamesWon2);
    if (isDraw) {
      badgeEl.textContent = 'DRAW';
      badgeEl.classList.remove('hidden');
    }
  } else if (format === 'FIXED_POINT') {
    formatLabelEl.textContent = config.totalPoints + ' Points';
    var played = state.sets[0].gamesTeam1 + state.sets[0].gamesTeam2;
    if (played > config.totalPoints) {
      badgeEl.textContent = 'TIEBREAK';
      badgeEl.classList.remove('hidden');
    }
    if (isDraw) {
      badgeEl.textContent = 'DRAW';
      badgeEl.classList.remove('hidden');
    }
    if (isOver) {
      renderScoreRow(scoreRow1El, 'large',
        state.sets[0].gamesTeam1, state.sets[0].gamesTeam2);
    }
  }

  // Deuce badge (Classic/Total Games only)
  if (state.isDeuce && !state.advantageTeam && format !== 'FIXED_POINT') {
    badgeEl.textContent = 'DEUCE';
    badgeEl.classList.remove('hidden');
  }
}

function renderScoreRow(container, size, score1, score2) {
  container.className = 'score-row ' + size;
  container.innerHTML = '';

  var s1 = document.createElement('span');
  s1.className = 'score-team1';
  s1.textContent = score1;

  var sep = document.createElement('span');
  sep.className = 'score-separator';
  sep.textContent = '\u00B7';

  var s2 = document.createElement('span');
  s2.className = 'score-team2';
  s2.textContent = score2;

  container.appendChild(s1);
  container.appendChild(sep);
  container.appendChild(s2);
}

function renderGameDots(state, totalCount) {
  dotsRowEl.innerHTML = '';
  var gameWinners = state.gameWinners || [];
  for (var i = 0; i < totalCount; i++) {
    var dot = document.createElement('div');
    dot.className = 'dot';
    if (i < gameWinners.length) {
      dot.classList.add(gameWinners[i] === 'TEAM_1' ? 'team1-won' : 'team2-won');
    } else if (i === gameWinners.length && !state.isMatchOver) {
      dot.classList.add('current');
    }
    dotsRowEl.appendChild(dot);
  }
}

function renderSetDots(state, bestOfSets) {
  dotsRowEl.innerHTML = '';
  for (var i = 0; i < bestOfSets; i++) {
    var dot = document.createElement('div');
    dot.className = 'dot';
    if (i < state.sets.length && state.sets[i].isComplete) {
      dot.classList.add(state.sets[i].winner === 'TEAM_1' ? 'team1-won' : 'team2-won');
    } else if (i === state.currentSetIndex && !state.isMatchOver) {
      dot.classList.add('current');
    }
    dotsRowEl.appendChild(dot);
  }
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

// --- Message Handling ---

castContext.addCustomMessageListener(NAMESPACE, function(event) {
  var message = event.data;
  if (typeof message === 'string') {
    try { message = JSON.parse(message); } catch (e) { return; }
  }

  switch (message.type) {
    case 'match_state':
      if (message.state) renderMatchState(message.state);
      break;
    case 'idle':
      showIdle(message.playlistUrl);
      break;
  }
});

// Show idle on sender disconnect
castContext.addEventListener(cast.framework.system.EventType.SENDER_DISCONNECTED, function(event) {
  if (castContext.getSenders().length === 0) {
    showIdle(null);
  }
});

// Force autoplay and buffered stream type for all loaded media
playerManager.setMessageInterceptor(
  cast.framework.messages.MessageType.LOAD,
  function(loadRequestData) {
    loadRequestData.autoplay = true;
    if (loadRequestData.media) {
      loadRequestData.media.streamType = cast.framework.messages.StreamType.BUFFERED;
    }
    return loadRequestData;
  }
);

// Start receiver
var options = new cast.framework.CastReceiverOptions();
options.disableIdleTimeout = true;
castContext.start(options);

// Start in idle mode
showIdle(null);
