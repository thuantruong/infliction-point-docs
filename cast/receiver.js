'use strict';

const NAMESPACE = 'urn:x-cast:dev.2an.inflictionpoint.score';

const scoreboardEl = document.getElementById('scoreboard');
const idleEl = document.getElementById('idle');
const idleDefaultEl = document.getElementById('idle-default');
const slideshowEl = document.getElementById('slideshow');
const slideContainerEl = document.getElementById('slide-container');

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

  // Fade out and release old element
  var old = currentDisplayed;
  if (old) {
    old.classList.remove('slide-fade-in');
    old.classList.add('slide-fade-out');
    setTimeout(function() { releaseElement(old); }, 800);
    currentDisplayed = null;
  }

  // Use pre-loaded element if available for this index
  var el;
  if (nextPreloaded && nextPreloadedIndex === targetIndex) {
    el = nextPreloaded;
    nextPreloaded = null;
    nextPreloadedIndex = -1;
  } else {
    // Fallback: create on-the-fly (first slide or cache miss)
    el = createElement(targetIndex);
  }

  displayElement(el, slide);

  // Pre-load next slide (look-ahead of 1)
  var nextIndex = (targetIndex + 1) % slideshowData.slides.length;
  preloadSlide(nextIndex, function(preloaded) {
    // Only store if slideshow is still active and index is still relevant
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

function displayElement(el, slide) {
  currentDisplayed = el;
  el.className = 'slide-fade-in';
  slideContainerEl.appendChild(el);

  if (el.tagName === 'VIDEO') {
    el.addEventListener('ended', function onEnded() {
      el.removeEventListener('ended', onEnded);
      showNextSlide();
    });
    el.addEventListener('error', function onError() {
      el.removeEventListener('error', onError);
      slideshowTimer = setTimeout(showNextSlide, 2000);
    });
    var playPromise = el.play();
    if (playPromise) {
      playPromise.catch(function() {
        // Autoplay blocked or error — skip to next
        slideshowTimer = setTimeout(showNextSlide, 2000);
      });
    }
  } else {
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
