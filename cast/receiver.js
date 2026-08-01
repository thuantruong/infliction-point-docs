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

// VS preview elements
const vsScreenEl = document.getElementById('vs-screen');
const vsDefaultLayoutEl = document.getElementById('vs-default-layout');
const vsBroadcastLayoutEl = document.getElementById('vs-broadcast-layout');
const vsNames1DefaultEl = document.getElementById('vs-names1-default');
const vsNames2DefaultEl = document.getElementById('vs-names2-default');
const vsNames1BroadcastEl = document.getElementById('vs-names1-broadcast');
const vsNames2BroadcastEl = document.getElementById('vs-names2-broadcast');
const vsBcHeaderEl = document.getElementById('vs-bc-header');
const vsBcTitleEl = document.getElementById('vs-bc-title');
const vsBcSubtitleEl = document.getElementById('vs-bc-subtitle');
const vsCenterAdEl = document.querySelector('.vs-center-ad');
const vsAdAEl = document.getElementById('vs-ad-a');
const vsAdBEl = document.getElementById('vs-ad-b');
const vsBcAdEl = document.querySelector('.vs-bc-ad');
const vsBcAdAEl = document.getElementById('vs-ad-bc-a');
const vsBcAdBEl = document.getElementById('vs-ad-bc-b');
const vsCountdownEl = document.getElementById('vs-countdown');
const vsCountdownTimeEl = document.getElementById('vs-countdown-time');

// Broadcast theme elements
const scoreboardBroadcastEl = document.getElementById('scoreboard-broadcast');
const bcHeaderEl = document.getElementById('bc-header');
const bcTitleEl = document.getElementById('bc-title');
const bcColLabelEl = document.getElementById('bc-col-label');
const bcDurationEl = document.getElementById('bc-duration');
const bcDurationTextEl = document.getElementById('bc-duration-text');
const bcSetHeadersEl = document.getElementById('bc-set-headers');
const bcPointHeaderEl = document.getElementById('bc-point-header');
const bcSets1El = document.getElementById('bc-sets1');
const bcSets2El = document.getElementById('bc-sets2');
const bcNames1El = document.getElementById('bc-names1');
const bcNames2El = document.getElementById('bc-names2');
const bcPointCell1El = document.getElementById('bc-point-cell1');
const bcPointCell2El = document.getElementById('bc-point-cell2');
const bcPoints1El = document.getElementById('bc-points1');
const bcPoints2El = document.getElementById('bc-points2');
const bcTrophy1El = document.getElementById('bc-trophy1');
const bcTrophy2El = document.getElementById('bc-trophy2');
const bcStar1El = document.getElementById('bc-star1');
const bcStar2El = document.getElementById('bc-star2');
const bcStrip1El = document.getElementById('bc-strip1');
const bcStrip2El = document.getElementById('bc-strip2');
const bcServe1El = document.getElementById('bc-serve1');
const bcServe2El = document.getElementById('bc-serve2');
const bcBadgeEl = document.getElementById('bc-badge');

// Center overlay elements
const formatLabelEl = document.getElementById('format-label');
const scoreRow1El = document.getElementById('score-row-1');
const scoreRowLabelEl = document.getElementById('score-row-label');
const scoreRow2El = document.getElementById('score-row-2');
const dotsRowEl = document.getElementById('dots-row');
const badgeEl = document.getElementById('badge');
const durationEl = document.getElementById('duration');
const durationTextEl = document.getElementById('duration-text');
const currentTimeTextEl = document.getElementById('current-time-text');
const bcCurrentTimeTextEl = document.getElementById('bc-current-time-text');

var durationInterval = null;
var themeConfig = null;
var themeBaseUrl = null;

function setBroadcastBg(containerEl, bgImg) {
  var layer = containerEl.querySelector('.bc-bg-image');
  if (!layer) return;
  if (!bgImg || bgImg === 'none') {
    layer.classList.remove('loaded');
    layer.style.backgroundImage = 'none';
    return;
  }
  var src = bgImg.slice(4, -1).replace(/['"]/g, '');
  layer.classList.remove('loaded');
  var img = new Image();
  img.onload = function() {
    layer.style.backgroundImage = bgImg;
    requestAnimationFrame(function() { layer.classList.add('loaded'); });
  };
  img.onerror = function() {
    layer.style.backgroundImage = bgImg;
    requestAnimationFrame(function() { layer.classList.add('loaded'); });
  };
  img.src = src;
}

function applyBroadcastOverlay(containerEl) {
  var overlay = containerEl.querySelector('.bc-bg-overlay');
  if (!overlay) return;
  overlay.style.background = (themeConfig && themeConfig.backgroundImageColor) ? themeConfig.backgroundImageColor : '';
}

function applyBroadcastScoreboardBg(containerEl) {
  var target = containerEl.querySelector('.bc-table') || containerEl.querySelector('.vs-bc-layout');
  if (!target) return;
  target.style.background = (themeConfig && themeConfig.scoreboardBackground) ? themeConfig.scoreboardBackground : '';
}

function applyBroadcastTextColor(containerEl) {
  if (themeConfig && themeConfig.textColor) {
    containerEl.style.setProperty('--bc-text-color', themeConfig.textColor);
  } else {
    containerEl.style.removeProperty('--bc-text-color');
  }
}

function applyBroadcastAccentColor(containerEl) {
  if (themeConfig && themeConfig.textColorAccent) {
    containerEl.style.setProperty('--bc-accent-color', themeConfig.textColorAccent);
  } else {
    containerEl.style.removeProperty('--bc-accent-color');
  }
}

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
var matchOverTimer = null; // pending auto-slideshow after match over

// --- VS-screen ad slideshow + countdown state (independent of the fullscreen idle slideshow) ---
var vsAdTimer = null;
var vsAdSlides = null;       // image-only subset of playlist slides
var vsAdIndex = -1;
var vsAdActiveImg = null;    // which vs-ad img (A or B) is currently visible
var vsAdImgEls = null;       // active [imgA, imgB] pair for the current theme
var vsCountdownInterval = null;
var vsCountdownEndTs = null;  // target end time; persists across vs_preview re-sends (e.g. side swaps)

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
  var src = /^https?:\/\//i.test(slide.src) ? slide.src : slideshowBaseUrl + slide.src;

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
  stopVsAdSlideshow();
  stopVsCountdown();
  if (durationInterval) { clearInterval(durationInterval); durationInterval = null; }
  scoreboardEl.classList.add('hidden');
  scoreboardBroadcastEl.classList.add('hidden');
  vsScreenEl.classList.add('hidden');
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
      themeConfig = {
        theme: data.theme || 'default',
        backgroundImage: data.backgroundImage || null,
        backgroundImageColor: data.backgroundImageColor || null,
        scoreboardBackground: data.scoreboardBackground || null,
        textColor: data.textColor || null,
        textColorAccent: data.textColorAccent || null,
        title: data.title || null,
        subtitle: data.subtitle || null,
        slides: (data.slides && data.slides.length) ? data.slides : null,
        vsCountdownMinutes: Number(data.vsCountdownMinutes) || 0,
        backgroundColor: data.backgroundColor || 'black',
      };
      themeBaseUrl = baseUrl;
      if (data && data.slides && data.slides.length > 0) {
        startSlideshow(data, baseUrl);
      } else {
        showIdleDefault();
      }
    })
    .catch(function() {
      themeConfig = null;
      showIdleDefault();
    });
}

function clearMatchOverTimer() {
  if (matchOverTimer) {
    clearTimeout(matchOverTimer);
    matchOverTimer = null;
  }
}

// After a match is over (winner / trophy shown), optionally switch to the slideshow
// after a delay defined in playlist.json ("matchOverDelayMinutes"). Re-invoked on each
// over-state so user interaction (sides swap, etc.) restarts the countdown.
function scheduleMatchOverSlideshow(state) {
  clearMatchOverTimer();
  if (!state || !state.isMatchOver || !state.matchWinner) return;
  if (!currentPlaylistUrl) return;
  var url = currentPlaylistUrl;
  fetch(url + 'playlist.json')
    .then(function(res) { return res.json(); })
    .then(function(data) {
      var minutes = data && Number(data.matchOverDelayMinutes);
      if (!(minutes > 0)) return;
      clearMatchOverTimer();
      matchOverTimer = setTimeout(function() {
        matchOverTimer = null;
        showIdle(url);
      }, minutes * 60000);
    })
    .catch(function() {});
}

function showScoreboard() {
  clearMatchOverTimer();
  stopSlideshow();
  stopVsAdSlideshow();
  stopVsCountdown();
  idleEl.classList.add('hidden');
  vsScreenEl.classList.add('hidden');
  var isBroadcast = themeConfig && themeConfig.theme === 'broadcast';
  scoreboardEl.classList.toggle('hidden', isBroadcast);
  scoreboardBroadcastEl.classList.toggle('hidden', !isBroadcast);
  if (isBroadcast) {
    var bgImg = 'none';
    if (themeConfig.backgroundImage) {
      var isAbsolute = /^https?:\/\//i.test(themeConfig.backgroundImage);
      var bgSrc = isAbsolute ? themeConfig.backgroundImage : themeBaseUrl + themeConfig.backgroundImage;
      bgImg = "url('" + bgSrc + "')";
    }
    setBroadcastBg(scoreboardBroadcastEl, bgImg);
    applyBroadcastOverlay(scoreboardBroadcastEl);
    applyBroadcastScoreboardBg(scoreboardBroadcastEl);
    applyBroadcastTextColor(scoreboardBroadcastEl);
    applyBroadcastAccentColor(scoreboardBroadcastEl);
  }
}

// --- Rendering ---

function formatCurrentTime() {
  return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function formatDuration(ms) {
  var totalMin = Math.floor(ms / 60000);
  var h = Math.floor(totalMin / 60);
  var m = totalMin % 60;
  var mm = m < 10 ? '0' + m : '' + m;
  return h + ':' + mm;
}

function teamDisplayName(name, players, fallback) {
  // Custom team name (fixed-partner formats) wins; else joined player names; else fallback.
  if (name && name.trim()) return name;
  if (players && players.length > 0) {
    return players.map(function(p) { return p.name; }).join(' / ');
  }
  return fallback;
}

// --- VS ad slideshow: rotate playlist image slides in the VS center slot ---
// Images only — the cast-media-player used for video slides is a fullscreen singleton
// that can't be embedded mid-VS, so video slides are skipped.

function stopVsAdSlideshow() {
  if (vsAdTimer) { clearTimeout(vsAdTimer); vsAdTimer = null; }
  vsAdSlides = null;
  vsAdIndex = -1;
  vsAdActiveImg = null;
  vsAdImgEls = null;
  [vsAdAEl, vsAdBEl, vsBcAdAEl, vsBcAdBEl].forEach(function(img) {
    if (img) { img.classList.remove('visible'); img.removeAttribute('src'); }
  });
  if (vsCenterAdEl) vsCenterAdEl.classList.add('hidden');
  if (vsBcAdEl) vsBcAdEl.classList.add('hidden');
  if (vsDefaultLayoutEl) vsDefaultLayoutEl.classList.remove('with-ad', 'bc-rails');
  if (vsBroadcastLayoutEl) vsBroadcastLayoutEl.classList.remove('with-ad');
}

function startVsAdSlideshow(isBroadcast) {
  stopVsAdSlideshow();
  // Layout switches to ad mode (side rails / shrunk card) even if no images yet.
  (isBroadcast ? vsBroadcastLayoutEl : vsDefaultLayoutEl).classList.add('with-ad');
  if (!themeConfig || !themeConfig.slides || !themeConfig.slides.length) return;
  var images = themeConfig.slides.filter(function(s) { return s && s.src && !isVideoSrc(s.src); });
  var skipped = themeConfig.slides.length - images.length;
  if (skipped > 0) {
    console.log('[VS ad] skipping ' + skipped + ' video slide(s) — images only');
  }
  if (!images.length) return; // nothing to show; keep the "VS" badge fallback
  vsAdImgEls = isBroadcast ? [vsBcAdAEl, vsBcAdBEl] : [vsAdAEl, vsAdBEl];
  var container = isBroadcast ? vsBcAdEl : vsCenterAdEl;
  if (!container || !vsAdImgEls[0] || !vsAdImgEls[1]) return;
  vsAdSlides = images;
  vsAdIndex = -1;
  container.classList.remove('hidden');
  showNextVsAdSlide();
}

function showNextVsAdSlide() {
  if (!vsAdSlides || !vsAdSlides.length || !vsAdImgEls) return;
  vsAdIndex = (vsAdIndex + 1) % vsAdSlides.length;
  var slide = vsAdSlides[vsAdIndex];
  var src = /^https?:\/\//i.test(slide.src) ? slide.src : themeBaseUrl + slide.src;
  var duration = slide.duration || 10;

  var nextImg = (vsAdActiveImg === vsAdImgEls[0]) ? vsAdImgEls[1] : vsAdImgEls[0];
  var prevImg = vsAdActiveImg;

  var preload = new Image();
  preload.onload = function() {
    if (!vsAdSlides) return;
    nextImg.src = src;
    requestAnimationFrame(function() {
      nextImg.style.zIndex = '2';
      nextImg.classList.add('visible');
      if (prevImg) {
        prevImg.style.zIndex = '1';
        prevImg.classList.remove('visible');
      }
      vsAdActiveImg = nextImg;
    });
  };
  preload.onerror = function() {
    if (vsAdSlides) vsAdTimer = setTimeout(showNextVsAdSlide, 1000);
  };
  preload.src = src;

  if (vsAdSlides.length > 1) {
    if (vsAdTimer) clearTimeout(vsAdTimer);
    vsAdTimer = setTimeout(function() {
      if (vsAdSlides) showNextVsAdSlide();
    }, duration * 1000);
  }
}

// --- VS countdown: counts down mm:ss from when the VS screen appears, freezes at 00:00 ---

function stopVsCountdown() {
  if (vsCountdownInterval) { clearInterval(vsCountdownInterval); vsCountdownInterval = null; }
  vsCountdownEndTs = null;
  vsCountdownEl.classList.add('hidden');
  vsCountdownTimeEl.classList.remove('expired');
}

function startVsCountdown(minutes) {
  if (!(minutes > 0)) { stopVsCountdown(); return; }
  // Already counting (or already expired) this VS session — keep ticking, don't restart.
  // This survives vs_preview re-sends from the phone (side swaps, name edits).
  if (vsCountdownEndTs !== null) {
    vsCountdownEl.classList.remove('hidden');
    return;
  }
  var endTs = Date.now() + minutes * 60000;
  vsCountdownEndTs = endTs;
  vsCountdownEl.classList.remove('hidden');
  vsCountdownTimeEl.classList.remove('expired');
  function tick() {
    var remaining = endTs - Date.now();
    if (remaining <= 0) {
      vsCountdownTimeEl.textContent = '00:00';
      vsCountdownTimeEl.classList.add('expired');
      if (vsCountdownInterval) { clearInterval(vsCountdownInterval); vsCountdownInterval = null; }
      return;
    }
    var totalSec = Math.floor(remaining / 1000);
    var m = Math.floor(totalSec / 60);
    var s = totalSec % 60;
    var mm = m < 10 ? '0' + m : '' + m;
    var ss = s < 10 ? '0' + s : '' + s;
    vsCountdownTimeEl.textContent = mm + ':' + ss;
  }
  tick();
  vsCountdownInterval = setInterval(tick, 1000);
}

function showVsPreview(team1Names, team2Names) {
  stopSlideshow();
  stopVsAdSlideshow();
  // Note: countdown is NOT stopped here — it persists across vs_preview re-sends
  // (side swaps / name edits) and is only reset when leaving the VS screen.
  if (durationInterval) { clearInterval(durationInterval); durationInterval = null; }
  idleEl.classList.add('hidden');
  scoreboardEl.classList.add('hidden');
  scoreboardBroadcastEl.classList.add('hidden');
  vsScreenEl.classList.remove('hidden');

  // Ad mode always uses the split-theme design (side rails + center ad), even for broadcast.
  var countdownMinutes = themeConfig ? themeConfig.vsCountdownMinutes : 0;
  var adMode = countdownMinutes > 0;
  var isBroadcastTheme = themeConfig && themeConfig.theme === 'broadcast';
  var useBroadcast = isBroadcastTheme && !adMode;
  vsDefaultLayoutEl.classList.toggle('hidden', useBroadcast);
  vsBroadcastLayoutEl.classList.toggle('hidden', !useBroadcast);

  function renderVsNames(el, names, cls) {
    el.innerHTML = '';
    names.split(' / ').forEach(function(name) {
      var d = document.createElement('div');
      d.className = cls;
      d.textContent = name;
      el.appendChild(d);
    });
  }
  renderVsNames(vsNames1DefaultEl, team1Names, 'vs-name');
  renderVsNames(vsNames2DefaultEl, team2Names, 'vs-name');
  renderVsNames(vsNames1BroadcastEl, team1Names, 'bc-name');
  renderVsNames(vsNames2BroadcastEl, team2Names, 'bc-name');

  if (useBroadcast) {
    if (themeConfig.title) {
      vsBcTitleEl.textContent = themeConfig.title;
      vsBcSubtitleEl.textContent = themeConfig.subtitle || '';
      vsBcHeaderEl.classList.remove('hidden');
    } else {
      vsBcHeaderEl.classList.add('hidden');
    }
    var bgImg = 'none';
    if (themeConfig.backgroundImage) {
      var isAbsolute = /^https?:\/\//i.test(themeConfig.backgroundImage);
      var bgSrc = isAbsolute ? themeConfig.backgroundImage : themeBaseUrl + themeConfig.backgroundImage;
      bgImg = "url('" + bgSrc + "')";
    }
    setBroadcastBg(vsBroadcastLayoutEl, bgImg);
    applyBroadcastOverlay(vsBroadcastLayoutEl);
    applyBroadcastScoreboardBg(vsBroadcastLayoutEl);
    applyBroadcastTextColor(vsBroadcastLayoutEl);
    applyBroadcastAccentColor(vsBroadcastLayoutEl);
  }

  // Countdown + ad slot (gated on playlist.json vsCountdownMinutes). Both themes use the
  // split-theme design: team side rails + center ad slot + bottom countdown bar.
  if (adMode) {
    startVsAdSlideshow(false);
    startVsCountdown(countdownMinutes); // no-op if already running (survives side swaps)
  } else {
    stopVsCountdown();
  }
  // Broadcast theme: line-beside-name rails instead of solid team-color fill.
  vsDefaultLayoutEl.classList.toggle('bc-rails', adMode && isBroadcastTheme);

  // Player rails, countdown bar, and ad slot (incl. letterbox) use the slideshow bg color in ad mode.
  var slideBg = (adMode && themeConfig && themeConfig.backgroundColor) ? themeConfig.backgroundColor : '';
  vsScreenEl.style.background = slideBg;
  vsCountdownEl.style.background = slideBg;
  [vsCenterAdEl, vsBcAdEl, vsAdAEl, vsAdBEl, vsBcAdAEl, vsBcAdBEl].forEach(function(el) {
    if (el) el.style.background = slideBg;
  });

  // Countdown text + bar line use the configured accent color.
  var accent = (adMode && themeConfig && themeConfig.textColorAccent) ? themeConfig.textColorAccent : '';
  if (accent) vsCountdownEl.style.setProperty('--vs-accent', accent);
  else vsCountdownEl.style.removeProperty('--vs-accent');
}

function renderMatchState(state, sidesSwapped) {
  showScoreboard();
  if (themeConfig && themeConfig.theme === 'broadcast') {
    renderBroadcastTheme(state, sidesSwapped);
  } else {
    renderDefaultTheme(state, sidesSwapped);
  }
}

function renderDefaultTheme(state, sidesSwapped) {
  var config = state.config;
  var format = config.matchFormat;
  var isAtDeuce = state.isDeuce ||
    (!state.isTiebreak && !state.isStarPoint && !state.advantageTeam &&
     state.pointsTeam1 === 'FORTY' && state.pointsTeam2 === 'FORTY');

  // Swap panel backgrounds and labels
  var team1Panel = document.getElementById('team1');
  var team2Panel = document.getElementById('team2');
  var t1Name = teamDisplayName(config.team1Name, config.team1Players, 'TEAM 1');
  var t2Name = teamDisplayName(config.team2Name, config.team2Players, 'TEAM 2');
  if (sidesSwapped) {
    team1Panel.className = 'team-panel team2-bg';
    team2Panel.className = 'team-panel team1-bg';
    label1El.className = 'team-label-pill team2-pill';
    label2El.className = 'team-label-pill team1-pill';
    label1El.textContent = t2Name;
    label2El.textContent = t1Name;
  } else {
    team1Panel.className = 'team-panel team1-bg';
    team2Panel.className = 'team-panel team2-bg';
    label1El.className = 'team-label-pill team1-pill';
    label2El.className = 'team-label-pill team2-pill';
    label1El.textContent = t1Name;
    label2El.textContent = t2Name;
  }

  // Duration
  if (durationInterval) { clearInterval(durationInterval); durationInterval = null; }
  var startMs = state.matchStartTime || 0;
  var endMs = state.matchEndTime || 0;
  if (startMs > 0) {
    durationEl.classList.remove('hidden');
    currentTimeTextEl.textContent = formatCurrentTime();
    if (endMs > 0) {
      durationTextEl.textContent = formatDuration(endMs - startMs);
    } else {
      durationTextEl.textContent = formatDuration(Date.now() - startMs);
      durationInterval = setInterval(function() {
        currentTimeTextEl.textContent = formatCurrentTime();
        durationTextEl.textContent = formatDuration(Date.now() - startMs);
      }, 60000);
    }
  } else {
    durationEl.classList.add('hidden');
  }

  renderTeamPanels(state, format, sidesSwapped, isAtDeuce);
  renderCenterOverlay(state, config, format, sidesSwapped, isAtDeuce);
}

function renderTeamPanels(state, format, sidesSwapped, isAtDeuce) {
  var isOver = state.isMatchOver;
  var winner = state.matchWinner;
  var isDraw = isOver && !winner;

  // Map logical teams to left/right panels
  var leftTeam = sidesSwapped ? 'TEAM_2' : 'TEAM_1';
  var rightTeam = sidesSwapped ? 'TEAM_1' : 'TEAM_2';

  serve1El.classList.toggle('hidden', state.servingTeam !== leftTeam || isOver);
  serve2El.classList.toggle('hidden', state.servingTeam !== rightTeam || isOver);

  var text1, text2;

  if (isDraw) {
    text1 = '\u2014';
    text2 = '\u2014';
  } else if (isOver && winner) {
    var winnerOnLeft = winner === leftTeam;
    if (winnerOnLeft) {
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
    var fp1 = state.sets[state.currentSetIndex].gamesTeam1;
    var fp2 = state.sets[state.currentSetIndex].gamesTeam2;
    text1 = sidesSwapped ? fp2 : fp1;
    text2 = sidesSwapped ? fp1 : fp2;
  } else if (state.isTiebreak) {
    text1 = sidesSwapped ? state.tiebreakPointsTeam2 : state.tiebreakPointsTeam1;
    text2 = sidesSwapped ? state.tiebreakPointsTeam1 : state.tiebreakPointsTeam2;
  } else if (state.advantageTeam === leftTeam) {
    text1 = 'AD';
    text2 = '';
  } else if (state.advantageTeam === rightTeam) {
    text1 = '';
    text2 = 'AD';
  } else if (state.isStarPoint) {
    text1 = '★';
    text2 = '★';
  } else if (isAtDeuce) {
    text1 = '40';
    text2 = '40';
  } else {
    var pt1 = pointDisplayValue(state.pointsTeam1);
    var pt2 = pointDisplayValue(state.pointsTeam2);
    text1 = sidesSwapped ? pt2 : pt1;
    text2 = sidesSwapped ? pt1 : pt2;
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

function renderCenterOverlay(state, config, format, sidesSwapped, isAtDeuce) {
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

  // Helper: swap left/right scores when sides swapped
  function lr(t1val, t2val) {
    return sidesSwapped ? [t2val, t1val] : [t1val, t2val];
  }

  if (format === 'CLASSIC') {
    if (config.bestOfSets === 1) {
      renderGameDots(state, config.gamesPerSet * 2 - 1);
      formatLabelEl.textContent = 'GAMES (' + config.gamesPerSet + ')';
      var g = lr(state.sets[0].gamesTeam1, state.sets[0].gamesTeam2);
      renderScoreRow(scoreRow1El, 'large', g[0], g[1], sidesSwapped);
    } else {
      renderSetDots(state, config.bestOfSets);
      formatLabelEl.textContent = 'CLASSIC (' + config.bestOfSets + ' SETS)';
      var setsWon1 = state.sets.filter(function(s) { return s.winner === 'TEAM_1'; }).length;
      var setsWon2 = state.sets.filter(function(s) { return s.winner === 'TEAM_2'; }).length;
      var sw = lr(setsWon1, setsWon2);
      renderScoreRow(scoreRow1El, 'medium', sw[0], sw[1], sidesSwapped);

      if (!isOver) {
        scoreRowLabelEl.textContent = 'Games to ' + config.gamesPerSet;
        scoreRowLabelEl.classList.remove('hidden');
        var currentSet = state.sets[state.currentSetIndex];
        var cg = lr(currentSet.gamesTeam1, currentSet.gamesTeam2);
        renderScoreRow(scoreRow2El, 'large', cg[0], cg[1], sidesSwapped);
      }
    }
    if (state.isTiebreak) {
      badgeEl.textContent = 'TIEBREAK';
      badgeEl.classList.remove('hidden');
    }
  } else if (format === 'TOTAL_GAMES') {
    renderGameDots(state, config.totalGames);
    formatLabelEl.textContent = 'TOTAL GAMES';
    var gamesWon1 = state.sets.reduce(function(sum, s) { return sum + s.gamesTeam1; }, 0);
    var gamesWon2 = state.sets.reduce(function(sum, s) { return sum + s.gamesTeam2; }, 0);
    var gw = lr(gamesWon1, gamesWon2);
    renderScoreRow(scoreRow1El, 'large', gw[0], gw[1], sidesSwapped);
    if (isDraw) {
      badgeEl.textContent = 'DRAW';
      badgeEl.classList.remove('hidden');
    }
  } else if (format === 'FIXED_POINT') {
    formatLabelEl.textContent = config.totalPoints + ' POINTS';
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
      var fp = lr(state.sets[0].gamesTeam1, state.sets[0].gamesTeam2);
      renderScoreRow(scoreRow1El, 'large', fp[0], fp[1], sidesSwapped);
    }
  }

  if (state.isStarPoint && format !== 'FIXED_POINT') {
    badgeEl.textContent = 'STAR POINT';
    badgeEl.classList.remove('hidden');
  } else if (isAtDeuce && format !== 'FIXED_POINT') {
    badgeEl.textContent = 'DEUCE';
    badgeEl.classList.remove('hidden');
  }
}

function renderScoreRow(container, size, score1, score2, swapped) {
  container.className = 'score-row ' + size;
  container.innerHTML = '';

  var s1 = document.createElement('span');
  s1.className = swapped ? 'score-team2' : 'score-team1';
  s1.textContent = score1;

  var sep = document.createElement('span');
  sep.className = 'score-separator';
  sep.textContent = '\u00B7';

  var s2 = document.createElement('span');
  s2.className = swapped ? 'score-team1' : 'score-team2';
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

function renderBroadcastSetCols(state, config, format, sidesSwapped) {
  bcSetHeadersEl.innerHTML = '';
  bcSets1El.innerHTML = '';
  bcSets2El.innerHTML = '';

  function addHeader(label) {
    var el = document.createElement('div');
    el.className = 'bc-set-header-cell';
    el.textContent = label;
    bcSetHeadersEl.appendChild(el);
  }

  function addScore(container, val, won, lost) {
    var el = document.createElement('div');
    el.className = 'bc-set-score' + (won ? ' won' : lost ? ' lost' : '');
    el.textContent = val;
    container.appendChild(el);
  }

  if (format === 'FIXED_POINT') return;

  if (format === 'CLASSIC' && config.bestOfSets > 1) {
    var totalCols = Math.max(config.bestOfSets, state.sets.length);
    for (var i = 0; i < totalCols; i++) {
      var isMtb = i >= config.bestOfSets;
      addHeader('Set ' + (i + 1));
      if (i < state.sets.length && state.sets[i].isComplete) {
        var won1 = state.sets[i].winner === 'TEAM_1';
        var won2 = state.sets[i].winner === 'TEAM_2';
        var g1, g2;
        if (isMtb) {
          g1 = won1 ? 1 : 0;
          g2 = won2 ? 1 : 0;
        } else {
          g1 = state.sets[i].gamesTeam1;
          g2 = state.sets[i].gamesTeam2;
        }
        var lw1 = sidesSwapped ? won2 : won1;
        var lw2 = sidesSwapped ? won1 : won2;
        addScore(bcSets1El, sidesSwapped ? g2 : g1, lw1, !lw1);
        addScore(bcSets2El, sidesSwapped ? g1 : g2, lw2, !lw2);
      } else if (i === state.currentSetIndex) {
        var cg1 = isMtb ? 0 : (state.sets[i] ? state.sets[i].gamesTeam1 : 0);
        var cg2 = isMtb ? 0 : (state.sets[i] ? state.sets[i].gamesTeam2 : 0);
        addScore(bcSets1El, sidesSwapped ? cg2 : cg1, false, false);
        addScore(bcSets2El, sidesSwapped ? cg1 : cg2, false, false);
      } else {
        addScore(bcSets1El, '-', false, false);
        addScore(bcSets2El, '-', false, false);
      }
    }
  } else {
    addHeader('GAMES');
    var games1, games2;
    if (format === 'TOTAL_GAMES') {
      games1 = state.sets.reduce(function(s, x) { return s + x.gamesTeam1; }, 0);
      games2 = state.sets.reduce(function(s, x) { return s + x.gamesTeam2; }, 0);
    } else {
      games1 = state.sets[0].gamesTeam1;
      games2 = state.sets[0].gamesTeam2;
    }
    var isOver = state.isMatchOver;
    var gWon1 = isOver && state.matchWinner === (sidesSwapped ? 'TEAM_2' : 'TEAM_1');
    var gWon2 = isOver && state.matchWinner === (sidesSwapped ? 'TEAM_1' : 'TEAM_2');
    addScore(bcSets1El, sidesSwapped ? games2 : games1, gWon1, gWon2);
    addScore(bcSets2El, sidesSwapped ? games1 : games2, gWon2, gWon1);
  }
}

function renderBroadcastNames(el, displayName) {
  el.innerHTML = '';
  var parts = displayName.split(' / ');
  parts.forEach(function(name) {
    var div = document.createElement('div');
    div.className = 'bc-name';
    div.textContent = name;
    el.appendChild(div);
  });
}

function renderBroadcastTheme(state) {
  var sidesSwapped = false;
  var config = state.config;
  var format = config.matchFormat;
  var isOver = state.isMatchOver;
  var winner = state.matchWinner;
  var isAtDeuce = state.isDeuce ||
    (!state.isTiebreak && !state.isStarPoint && !state.advantageTeam &&
     state.pointsTeam1 === 'FORTY' && state.pointsTeam2 === 'FORTY');
  var isDraw = isOver && !winner;
  var leftTeam = sidesSwapped ? 'TEAM_2' : 'TEAM_1';
  var rightTeam = sidesSwapped ? 'TEAM_1' : 'TEAM_2';

  // Title bar
  if (themeConfig.title) {
    bcTitleEl.textContent = themeConfig.title;
    bcColLabelEl.textContent = themeConfig.subtitle || '';
    bcHeaderEl.classList.remove('hidden');
  } else {
    bcHeaderEl.classList.add('hidden');
    bcColLabelEl.textContent = '';
  }

  // Duration
  if (durationInterval) { clearInterval(durationInterval); durationInterval = null; }
  var startMs = state.matchStartTime || 0;
  var endMs = state.matchEndTime || 0;
  if (startMs > 0) {
    bcDurationEl.classList.remove('hidden');
    bcCurrentTimeTextEl.textContent = formatCurrentTime();
    if (endMs > 0) {
      bcDurationTextEl.textContent = formatDuration(endMs - startMs);
    } else {
      bcDurationTextEl.textContent = formatDuration(Date.now() - startMs);
      durationInterval = setInterval(function() {
        bcCurrentTimeTextEl.textContent = formatCurrentTime();
        bcDurationTextEl.textContent = formatDuration(Date.now() - startMs);
      }, 60000);
    }
  } else {
    bcDurationEl.classList.add('hidden');
  }

  // Names + team color strips
  var t1Name = teamDisplayName(config.team1Name, config.team1Players, 'TEAM 1');
  var t2Name = teamDisplayName(config.team2Name, config.team2Players, 'TEAM 2');
  renderBroadcastNames(bcNames1El, sidesSwapped ? t2Name : t1Name);
  renderBroadcastNames(bcNames2El, sidesSwapped ? t1Name : t2Name);
  bcStrip1El.className = 'bc-team-strip ' + (sidesSwapped ? 'team2' : 'team1');
  bcStrip2El.className = 'bc-team-strip ' + (sidesSwapped ? 'team1' : 'team2');

  // Set columns
  renderBroadcastSetCols(state, config, format, sidesSwapped);
  bcPointHeaderEl.style.visibility = isOver ? 'hidden' : '';

  // Badge
  bcBadgeEl.classList.add('hidden');
  bcBadgeEl.textContent = '';

  // Reset point cells + serve balls
  bcPointCell1El.classList.remove('serving');
  bcPointCell2El.classList.remove('serving');
  bcTrophy1El.classList.add('hidden');
  bcTrophy2El.classList.add('hidden');
  bcStar1El.classList.add('hidden');
  bcStar2El.classList.add('hidden');
  bcPoints1El.classList.remove('hidden', 'advantage');
  bcPoints2El.classList.remove('hidden', 'advantage');
  bcServe1El.classList.add('hidden');
  bcServe2El.classList.add('hidden');

  if (isDraw) {
    bcPoints1El.textContent = '\u2014';
    bcPoints2El.textContent = '\u2014';
    bcBadgeEl.textContent = 'DRAW';
    bcBadgeEl.classList.remove('hidden');
  } else if (isOver && winner) {
    if (winner === leftTeam) {
      bcPoints1El.classList.add('hidden');
      bcTrophy1El.classList.remove('hidden');
      bcPoints2El.textContent = '';
    } else {
      bcPoints2El.classList.add('hidden');
      bcTrophy2El.classList.remove('hidden');
      bcPoints1El.textContent = '';
    }
  } else {
    // Live point display
    var text1, text2;
    if (format === 'FIXED_POINT') {
      var fp1 = state.sets[state.currentSetIndex].gamesTeam1;
      var fp2 = state.sets[state.currentSetIndex].gamesTeam2;
      text1 = sidesSwapped ? fp2 : fp1;
      text2 = sidesSwapped ? fp1 : fp2;
    } else if (state.isTiebreak) {
      text1 = sidesSwapped ? state.tiebreakPointsTeam2 : state.tiebreakPointsTeam1;
      text2 = sidesSwapped ? state.tiebreakPointsTeam1 : state.tiebreakPointsTeam2;
    } else if (state.advantageTeam === leftTeam) {
      text1 = 'AD'; bcPoints1El.classList.add('advantage');
      text2 = '';
    } else if (state.advantageTeam === rightTeam) {
      text1 = '';
      text2 = 'AD'; bcPoints2El.classList.add('advantage');
    } else if (state.isStarPoint) {
      bcPoints1El.classList.add('hidden');
      bcPoints2El.classList.add('hidden');
      bcStar1El.classList.remove('hidden');
      bcStar2El.classList.remove('hidden');
      bcBadgeEl.textContent = 'STAR POINT';
      bcBadgeEl.classList.remove('hidden');
    } else if (isAtDeuce) {
      text1 = '40';
      text2 = '40';
      bcBadgeEl.textContent = 'DEUCE';
      bcBadgeEl.classList.remove('hidden');
    } else {
      var pt1 = pointDisplayValue(state.pointsTeam1);
      var pt2 = pointDisplayValue(state.pointsTeam2);
      text1 = sidesSwapped ? pt2 : pt1;
      text2 = sidesSwapped ? pt1 : pt2;
    }
    if (!state.isStarPoint) {
      bcPoints1El.textContent = text1;
      bcPoints2El.textContent = text2;
    }

    // Serving highlight + tennis ball
    if (state.servingTeam === leftTeam) {
      bcPointCell1El.classList.add('serving');
      bcServe1El.classList.remove('hidden');
    } else if (state.servingTeam === rightTeam) {
      bcPointCell2El.classList.add('serving');
      bcServe2El.classList.remove('hidden');
    }

    if (state.isTiebreak) {
      bcBadgeEl.textContent = 'TIEBREAK';
      bcBadgeEl.classList.remove('hidden');
    }
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
      if (message.state) {
        renderMatchState(message.state, !!message.sidesSwapped);
        if (message.state.isMatchOver && message.state.matchWinner) {
          scheduleMatchOverSlideshow(message.state);
        } else {
          clearMatchOverTimer();
        }
      }
      break;
    case 'vs_preview':
      clearMatchOverTimer();
      if (message.team1 && message.team2) showVsPreview(message.team1, message.team2);
      break;
    case 'idle':
      clearMatchOverTimer();
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
options.maxInactivity = 86400;
castContext.start(options);

// Start in idle mode
showIdle(null);
