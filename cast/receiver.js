'use strict';

const NAMESPACE = 'urn:x-cast:dev.2an.inflictionpoint.score';

const scoreboardEl = document.getElementById('scoreboard');
const idleEl = document.getElementById('idle');
const idleDefaultEl = document.getElementById('idle-default');
const slideshowEl = document.getElementById('slideshow');
const slideContainerEl = document.getElementById('slide-container');

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

function showIdle(playlistUrl) {
  pauseSlideshow();
  scoreboardEl.classList.add('hidden');
  idleEl.classList.remove('hidden');

  if (!playlistUrl) {
    clearSlideshow();
    showIdleDefault();
    return;
  }

  var baseUrl = playlistUrl.endsWith('/') ? playlistUrl : playlistUrl + '/';

  // Same URL: resume existing slideshow without re-fetching
  if (baseUrl === currentPlaylistUrl && slideshowData) {
    resumeSlideshow();
    return;
  }

  // Different URL: clear old state and fetch new playlist
  clearSlideshow();
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
  pauseSlideshow();
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

// --- Slideshow ---

var slideshowTimer = null;
var slideshowData = null;
var slideshowBaseUrl = null;
var currentPlaylistUrl = null;
var currentSlideIndex = -1;
var slideshowPaused = false;
var nextPreloaded = null;       // pre-loaded element for next slide
var nextPreloadedIndex = -1;    // which slide index is pre-loaded
var currentDisplayed = null;    // element currently showing

function isVideoSrc(src) {
  return /\.(mp4|webm|ogg)$/i.test(src);
}

function releaseElement(el) {
  if (!el) return;
  if (el.tagName === 'VIDEO') {
    el.pause();
    el.removeAttribute('src');
    el.load(); // free media buffer
  }
  if (el.parentNode) el.parentNode.removeChild(el);
}

function pauseSlideshow() {
  // Pause without clearing state — allows resume
  if (slideshowTimer) {
    clearTimeout(slideshowTimer);
    slideshowTimer = null;
  }
  slideshowPaused = true;
  // Pause any playing video
  if (currentDisplayed && currentDisplayed.tagName === 'VIDEO') {
    currentDisplayed.pause();
  }
}

function clearSlideshow() {
  // Full cleanup — releases all resources
  if (slideshowTimer) {
    clearTimeout(slideshowTimer);
    slideshowTimer = null;
  }
  releaseElement(currentDisplayed);
  currentDisplayed = null;
  releaseElement(nextPreloaded);
  nextPreloaded = null;
  nextPreloadedIndex = -1;
  slideshowData = null;
  slideshowBaseUrl = null;
  currentPlaylistUrl = null;
  currentSlideIndex = -1;
  slideshowPaused = false;
  slideContainerEl.innerHTML = '';
  slideshowEl.classList.add('hidden');
  slideshowEl.style.backgroundColor = '';
}

function showIdleDefault() {
  clearSlideshow();
  idleDefaultEl.classList.remove('hidden');
}

function resumeSlideshow() {
  if (!slideshowData || !slideshowData.slides || slideshowData.slides.length === 0) return;
  idleDefaultEl.classList.add('hidden');
  slideshowEl.classList.remove('hidden');
  slideshowPaused = false;
  // Resume current video or advance to next slide
  if (currentDisplayed && currentDisplayed.tagName === 'VIDEO' && currentDisplayed.parentNode) {
    var playPromise = currentDisplayed.play();
    if (playPromise) playPromise.catch(function() {});
  } else {
    showNextSlide();
  }
}

function startSlideshow(data, baseUrl) {
  idleDefaultEl.classList.add('hidden');
  slideshowEl.classList.remove('hidden');
  slideshowPaused = false;

  if (data.backgroundColor) {
    slideshowEl.style.backgroundColor = data.backgroundColor;
  }

  slideshowData = data;
  slideshowBaseUrl = baseUrl;
  currentSlideIndex = -1;

  // Pre-load first slide, then show it
  preloadSlide(0, function(el) {
    nextPreloaded = el;
    nextPreloadedIndex = 0;
    showNextSlide();
  });
}

function preloadSlide(index, callback) {
  if (!slideshowData || !slideshowData.slides) return;
  var slide = slideshowData.slides[index];
  var src = slideshowBaseUrl + slide.src;

  if (isVideoSrc(slide.src)) {
    var video = document.createElement('video');
    video.preload = 'auto';
    video.playsInline = true;
    video.muted = false;
    video.src = src;
    video.addEventListener('canplaythrough', function onReady() {
      video.removeEventListener('canplaythrough', onReady);
      if (callback) callback(video);
    });
    video.addEventListener('error', function() {
      if (callback) callback(video); // show anyway, will handle error on play
    });
    video.load();
  } else {
    var img = document.createElement('img');
    img.src = src;
    img.addEventListener('load', function() {
      if (callback) callback(img);
    });
    img.addEventListener('error', function() {
      if (callback) callback(img);
    });
  }
}

function showNextSlide() {
  if (!slideshowData || !slideshowData.slides || slideshowData.slides.length === 0) return;
  if (slideshowPaused) return;

  var targetIndex = (currentSlideIndex + 1) % slideshowData.slides.length;
  var slide = slideshowData.slides[targetIndex];
  currentSlideIndex = targetIndex;

  // Keep old element visible until new one is ready
  var old = currentDisplayed;

  // Use pre-loaded element if available for this index
  var el;
  if (nextPreloaded && nextPreloadedIndex === targetIndex) {
    el = nextPreloaded;
    nextPreloaded = null;
    nextPreloadedIndex = -1;
  } else {
    el = createElement(targetIndex);
  }

  displayElement(el, slide, old);

  // Pre-load next slide (look-ahead of 1)
  var nextIndex = (targetIndex + 1) % slideshowData.slides.length;
  preloadSlide(nextIndex, function(preloaded) {
    if (!slideshowPaused && slideshowData) {
      nextPreloaded = preloaded;
      nextPreloadedIndex = nextIndex;
    } else {
      releaseElement(preloaded);
    }
  });
}

function createElement(index) {
  var slide = slideshowData.slides[index];
  var src = slideshowBaseUrl + slide.src;
  if (isVideoSrc(slide.src)) {
    var video = document.createElement('video');
    video.src = src;
    video.playsInline = true;
    video.muted = false;
    return video;
  } else {
    var img = document.createElement('img');
    img.src = src;
    return img;
  }
}

function fadeOutAndRelease(old) {
  if (!old) return;
  old.classList.remove('slide-fade-in');
  old.classList.add('slide-fade-out');
  setTimeout(function() { releaseElement(old); }, 800);
}

function displayElement(el, slide, old) {
  currentDisplayed = el;

  if (el.tagName === 'VIDEO') {
    // Video-to-video: destroy old instantly to free hardware decoder
    if (old && old.tagName === 'VIDEO') {
      releaseElement(old);
      old = null;
    }

    el.muted = true;
    el.style.opacity = '0';
    slideContainerEl.appendChild(el);

    var revealVideo = function() {
      // Image-to-video: instant hide old image when video pixels exist
      if (old) {
        old.style.display = 'none';
        releaseElement(old);
      }
      el.style.opacity = '1';
      el.className = 'slide-fade-in';
      // Soft audio entry after first frame is rendered
      setTimeout(function() {
        el.muted = false;
        el.volume = 1;
      }, 150);
    };

    el.addEventListener('playing', revealVideo, { once: true });

    el.play().catch(function() {
      showNextSlide();
    });

    el.addEventListener('ended', function() { showNextSlide(); }, { once: true });
  } else {
    el.className = 'slide-fade-in';
    slideContainerEl.appendChild(el);
    if (old) fadeOutAndRelease(old);
    var duration = (slide.duration || 10) * 1000;
    slideshowTimer = setTimeout(showNextSlide, duration);
  }
}

// --- Cast Receiver Setup ---

const castContext = cast.framework.CastReceiverContext.getInstance();

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

// Start receiver
const options = new cast.framework.CastReceiverOptions();
options.disableIdleTimeout = true;
castContext.start(options);

// Start in idle mode
showIdle(null);
