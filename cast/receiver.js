'use strict';

const NAMESPACE = 'urn:x-cast:dev.2an.inflictionpoint.score';

const scoreboardEl = document.getElementById('scoreboard');
const idleEl = document.getElementById('idle');
const idleDefaultEl = document.getElementById('idle-default');
const slideshowEl = document.getElementById('slideshow');
const slideImgA = document.getElementById('slide-img-a');
const slideImgB = document.getElementById('slide-img-b');
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

// --- Slideshow state ---

var currentPlaylistUrl = null;
var slideshowActive = false;
var slideshowData = null;
var slideshowBaseUrl = null;
var currentSlideIndex = -1;
var imageTimer = null;
var videoPlaying = false;
var activeImg = null; // which img element is currently visible (A or B)

function isVideoSrc(src) {
  return /\.(mp4|webm|ogg)$/i.test(src);
}

function stopSlideshow() {
  if (imageTimer) {
    clearTimeout(imageTimer);
    imageTimer = null;
  }
  if (videoPlaying) {
    try { playerManager.stop(); } catch (e) {}
    videoPlaying = false;
  }
  slideshowActive = false;
  slideshowData = null;
  slideshowBaseUrl = null;
  currentSlideIndex = -1;
  slideImgA.classList.remove('visible');
  slideImgA.removeAttribute('src');
  slideImgB.classList.remove('visible');
  slideImgB.removeAttribute('src');
  activeImg = null;
  playerEl.classList.add('hidden');
  slideshowEl.classList.add('hidden');
}

function showIdleDefault() {
  stopSlideshow();
  idleDefaultEl.classList.remove('hidden');
}

function startSlideshow(data, baseUrl) {
  idleDefaultEl.classList.add('hidden');
  slideshowEl.classList.remove('hidden');

  var bg = data.backgroundColor || 'black';
  slideshowEl.style.backgroundColor = bg;
  slideImgA.style.backgroundColor = bg;
  slideImgB.style.backgroundColor = bg;

  slideshowData = data;
  slideshowBaseUrl = baseUrl;
  slideshowActive = true;
  currentSlideIndex = -1;
  showNextSlide();
}

function showNextSlide() {
  if (!slideshowActive || !slideshowData || !slideshowData.slides.length) return;

  currentSlideIndex = (currentSlideIndex + 1) % slideshowData.slides.length;
  var slide = slideshowData.slides[currentSlideIndex];
  var src = slideshowBaseUrl + slide.src;

  if (isVideoSrc(slide.src)) {
    showVideo(src);
  } else {
    showImage(src, slide.duration || 10);
  }
}

function showImage(src, duration) {
  // Stop any playing video
  if (videoPlaying) {
    try { playerManager.stop(); } catch (e) {}
    videoPlaying = false;
  }
  playerEl.classList.add('hidden');

  // Pick the inactive image element for the next slide
  var nextImg = (activeImg === slideImgA) ? slideImgB : slideImgA;
  var prevImg = activeImg;

  // Pre-load new image, then crossfade
  var preload = new Image();
  preload.onload = function() {
    if (!slideshowActive) return;
    nextImg.src = src;
    requestAnimationFrame(function() {
      // Bring next image to front and fade it in
      nextImg.style.zIndex = '2';
      nextImg.classList.add('visible');
      // Fade out previous image behind
      if (prevImg) {
        prevImg.style.zIndex = '1';
        prevImg.classList.remove('visible');
      }
      activeImg = nextImg;
    });
  };
  preload.onerror = function() {
    if (slideshowActive) {
      imageTimer = setTimeout(showNextSlide, 1000);
    }
  };
  preload.src = src;

  // Set timer for next slide
  if (imageTimer) clearTimeout(imageTimer);
  imageTimer = setTimeout(function() {
    if (slideshowActive) showNextSlide();
  }, duration * 1000);
}

function showVideo(src) {
  // Hide both images
  slideImgA.classList.remove('visible');
  slideImgB.classList.remove('visible');
  activeImg = null;

  // Show player
  playerEl.classList.remove('hidden');
  videoPlaying = true;

  // Clear image timer
  if (imageTimer) {
    clearTimeout(imageTimer);
    imageTimer = null;
  }

  // Load single video via Cast SDK
  var mediaInfo = new cast.framework.messages.MediaInformation();
  mediaInfo.contentUrl = src;
  mediaInfo.contentType = 'video/mp4';
  mediaInfo.streamType = cast.framework.messages.StreamType.BUFFERED;

  var loadRequestData = new cast.framework.messages.LoadRequestData();
  loadRequestData.media = mediaInfo;
  loadRequestData.autoplay = true;

  playerManager.load(loadRequestData).catch(function() {
    // Video failed — skip to next slide
    videoPlaying = false;
    if (slideshowActive) showNextSlide();
  });
}

// Advance to next slide when video ends
playerManager.addEventListener(cast.framework.events.EventType.MEDIA_FINISHED, function() {
  if (slideshowActive && videoPlaying) {
    videoPlaying = false;
    showNextSlide();
  }
});

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
  stopSlideshow();
  idleEl.classList.add('hidden');
  scoreboardEl.classList.remove('hidden');
}

// --- Rendering ---

function renderMatchState(state) {
  showScoreboard();

  var config = state.config;
  var format = config.matchFormat;

  renderTeamPanels(state, format);
  renderCenterOverlay(state, config, format);
}

function renderTeamPanels(state, format) {
  var isOver = state.isMatchOver;
  var winner = state.matchWinner;
  var isDraw = isOver && !winner;

  serve1El.classList.toggle('hidden', state.servingTeam !== 'TEAM_1' || isOver);
  serve2El.classList.toggle('hidden', state.servingTeam !== 'TEAM_2' || isOver);

  var text1, text2;

  if (isDraw) {
    text1 = '\u2014';
    text2 = '\u2014';
  } else if (isOver && winner) {
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
  } else if (state.advantageTeam === 'TEAM_1') {
    text1 = 'AD';
    text2 = '\u2014';
  } else if (state.advantageTeam === 'TEAM_2') {
    text1 = '\u2014';
    text2 = 'AD';
  } else if (state.isDeuce) {
    text1 = '40';
    text2 = '40';
  } else {
    text1 = pointDisplayValue(state.pointsTeam1);
    text2 = pointDisplayValue(state.pointsTeam2);
  }

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
      renderGameDots(state, config.gamesPerSet * 2 - 1);
      formatLabelEl.textContent = 'Games to ' + config.gamesPerSet;
      renderScoreRow(scoreRow1El, 'large',
        state.sets[0].gamesTeam1, state.sets[0].gamesTeam2);
    } else {
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

castContext.addEventListener(cast.framework.system.EventType.SENDER_DISCONNECTED, function(event) {
  if (castContext.getSenders().length === 0) {
    showIdle(null);
  }
});

// Start receiver
var options = new cast.framework.CastReceiverOptions();
options.disableIdleTimeout = true;
castContext.start(options);

// Start in idle mode
showIdle(null);
