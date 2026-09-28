/*
 * Gmail Gold Important Marker — popup.js
 * Reads/writes preferences via chrome.storage.sync only. No network
 * calls, no analytics, no DOM access outside this popup document.
 */

(function () {
  'use strict';

  var DEFAULTS = {
    enabled: true,
    recolorMarkers: true,
    recolorStars: false,
    goldColor: '#f4b400'
  };

  var els = {
    enabled: document.getElementById('ggim-enabled'),
    markers: document.getElementById('ggim-markers'),
    stars: document.getElementById('ggim-stars'),
    colorPicker: document.getElementById('ggim-color-picker'),
    colorHex: document.getElementById('ggim-color-hex'),
    colorError: document.getElementById('ggim-color-error'),
    subgroup: document.getElementById('ggim-subgroup'),
    reset: document.getElementById('ggim-reset'),
    status: document.getElementById('ggim-status')
  };

  var HEX_RE = /^#[0-9a-fA-F]{6}$/;
  var statusTimer = null;

  function isValidHex(hex) {
    return typeof hex === 'string' && HEX_RE.test(hex);
  }

  function normalizeHexInput(value) {
    if (typeof value !== 'string') return null;
    var v = value.trim();
    if (!v.startsWith('#')) v = '#' + v;
    return isValidHex(v) ? v.toLowerCase() : null;
  }

  function setSubgroupEnabled(enabled) {
    els.subgroup.setAttribute('data-disabled', enabled ? 'false' : 'true');
    els.markers.disabled = !enabled;
    els.stars.disabled = !enabled;
    els.colorPicker.disabled = !enabled;
    els.colorHex.disabled = !enabled;
  }

  function renderState(state) {
    els.enabled.checked = !!state.enabled;
    els.markers.checked = !!state.recolorMarkers;
    els.stars.checked = !!state.recolorStars;
    var hex = isValidHex(state.goldColor) ? state.goldColor : DEFAULTS.goldColor;
    els.colorPicker.value = hex;
    els.colorHex.value = hex;
    els.colorError.textContent = '';
    setSubgroupEnabled(!!state.enabled);
  }

  function save(partial) {
    chrome.storage.sync.set(partial, function () {
      if (chrome.runtime.lastError) {
        showStatus('Could not save — ' + chrome.runtime.lastError.message);
        return;
      }
      showStatus('Saved.');
    });
  }

  function showStatus(text) {
    els.status.textContent = text;
    if (statusTimer) clearTimeout(statusTimer);
    statusTimer = setTimeout(function () {
      els.status.textContent = '';
    }, 1500);
  }

  function loadAndRender() {
    chrome.storage.sync.get(DEFAULTS, function (items) {
      renderState(items);
    });
  }

  els.enabled.addEventListener('change', function () {
    var enabled = els.enabled.checked;
    setSubgroupEnabled(enabled);
    save({ enabled: enabled });
  });

  els.markers.addEventListener('change', function () {
    save({ recolorMarkers: els.markers.checked });
  });

  els.stars.addEventListener('change', function () {
    save({ recolorStars: els.stars.checked });
  });

  els.colorPicker.addEventListener('input', function () {
    var hex = els.colorPicker.value.toLowerCase();
    els.colorHex.value = hex;
    els.colorError.textContent = '';
    save({ goldColor: hex });
  });

  els.colorHex.addEventListener('input', function () {
    var normalized = normalizeHexInput(els.colorHex.value);
    if (normalized) {
      els.colorError.textContent = '';
      els.colorPicker.value = normalized;
      save({ goldColor: normalized });
    } else {
      els.colorError.textContent = 'Enter a 6-digit hex color, e.g. #f4b400';
    }
  });

  els.colorHex.addEventListener('blur', function () {
    var normalized = normalizeHexInput(els.colorHex.value);
    els.colorHex.value = normalized || DEFAULTS.goldColor;
    els.colorError.textContent = '';
  });

  els.reset.addEventListener('click', function () {
    chrome.storage.sync.set(DEFAULTS, function () {
      renderState(DEFAULTS);
      showStatus('Defaults restored.');
    });
  });

  loadAndRender();
})();
