(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~main"],{

/***/ "./node_modules/history/es/DOMUtils.js":
/*!*********************************************!*\
  !*** ./node_modules/history/es/DOMUtils.js ***!
  \*********************************************/
/*! exports provided: canUseDOM, addEventListener, removeEventListener, getConfirmation, supportsHistory, supportsPopStateOnHashChange, supportsGoWithoutReloadUsingHash, isExtraneousPopstateEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canUseDOM", function() { return canUseDOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addEventListener", function() { return addEventListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeEventListener", function() { return removeEventListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConfirmation", function() { return getConfirmation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "supportsHistory", function() { return supportsHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "supportsPopStateOnHashChange", function() { return supportsPopStateOnHashChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "supportsGoWithoutReloadUsingHash", function() { return supportsGoWithoutReloadUsingHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isExtraneousPopstateEvent", function() { return isExtraneousPopstateEvent; });
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var addEventListener = function addEventListener(node, event, listener) {
  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
};

var removeEventListener = function removeEventListener(node, event, listener) {
  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
};

var getConfirmation = function getConfirmation(message, callback) {
  return callback(window.confirm(message));
}; // eslint-disable-line no-alert

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */
var supportsHistory = function supportsHistory() {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;

  return window.history && 'pushState' in window.history;
};

/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */
var supportsPopStateOnHashChange = function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
};

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */
var supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
};

/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */
var isExtraneousPopstateEvent = function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
};

/***/ }),

/***/ "./node_modules/history/es/LocationUtils.js":
/*!**************************************************!*\
  !*** ./node_modules/history/es/LocationUtils.js ***!
  \**************************************************/
/*! exports provided: createLocation, locationsAreEqual */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLocation", function() { return createLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "locationsAreEqual", function() { return locationsAreEqual; });
/* harmony import */ var resolve_pathname__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! resolve-pathname */ "./node_modules/resolve-pathname/index.js");
/* harmony import */ var value_equal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! value-equal */ "./node_modules/value-equal/index.js");
/* harmony import */ var _PathUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PathUtils */ "./node_modules/history/es/PathUtils.js");
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};





var createLocation = function createLocation(path, state, key, currentLocation) {
  var location = void 0;
  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = Object(_PathUtils__WEBPACK_IMPORTED_MODULE_2__["parsePath"])(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = _extends({}, path);

    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = Object(resolve_pathname__WEBPACK_IMPORTED_MODULE_0__["default"])(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
};

var locationsAreEqual = function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && Object(value_equal__WEBPACK_IMPORTED_MODULE_1__["default"])(a.state, b.state);
};

/***/ }),

/***/ "./node_modules/history/es/PathUtils.js":
/*!**********************************************!*\
  !*** ./node_modules/history/es/PathUtils.js ***!
  \**********************************************/
/*! exports provided: addLeadingSlash, stripLeadingSlash, hasBasename, stripBasename, stripTrailingSlash, parsePath, createPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLeadingSlash", function() { return addLeadingSlash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stripLeadingSlash", function() { return stripLeadingSlash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasBasename", function() { return hasBasename; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stripBasename", function() { return stripBasename; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stripTrailingSlash", function() { return stripTrailingSlash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parsePath", function() { return parsePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPath", function() { return createPath; });
var addLeadingSlash = function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
};

var stripLeadingSlash = function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
};

var hasBasename = function hasBasename(path, prefix) {
  return new RegExp('^' + prefix + '(\\/|\\?|#|$)', 'i').test(path);
};

var stripBasename = function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
};

var stripTrailingSlash = function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
};

var parsePath = function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
};

var createPath = function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;

  var path = pathname || '/';

  if (search && search !== '?') path += search.charAt(0) === '?' ? search : '?' + search;

  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : '#' + hash;

  return path;
};

/***/ }),

/***/ "./node_modules/history/es/createBrowserHistory.js":
/*!*********************************************************!*\
  !*** ./node_modules/history/es/createBrowserHistory.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! warning */ "./node_modules/warning/browser.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LocationUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LocationUtils */ "./node_modules/history/es/LocationUtils.js");
/* harmony import */ var _PathUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PathUtils */ "./node_modules/history/es/PathUtils.js");
/* harmony import */ var _createTransitionManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createTransitionManager */ "./node_modules/history/es/createTransitionManager.js");
/* harmony import */ var _DOMUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DOMUtils */ "./node_modules/history/es/DOMUtils.js");
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};








var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

var getHistoryState = function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
};

/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */
var createBrowserHistory = function createBrowserHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  invariant__WEBPACK_IMPORTED_MODULE_1___default()(_DOMUtils__WEBPACK_IMPORTED_MODULE_5__["canUseDOM"], 'Browser history needs a DOM');

  var globalHistory = window.history;
  var canUseHistory = Object(_DOMUtils__WEBPACK_IMPORTED_MODULE_5__["supportsHistory"])();
  var needsHashChangeListener = !Object(_DOMUtils__WEBPACK_IMPORTED_MODULE_5__["supportsPopStateOnHashChange"])();

  var _props$forceRefresh = props.forceRefresh,
      forceRefresh = _props$forceRefresh === undefined ? false : _props$forceRefresh,
      _props$getUserConfirm = props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === undefined ? _DOMUtils__WEBPACK_IMPORTED_MODULE_5__["getConfirmation"] : _props$getUserConfirm,
      _props$keyLength = props.keyLength,
      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;

  var basename = props.basename ? Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["stripTrailingSlash"])(Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["addLeadingSlash"])(props.basename)) : '';

  var getDOMLocation = function getDOMLocation(historyState) {
    var _ref = historyState || {},
        key = _ref.key,
        state = _ref.state;

    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;

    var path = pathname + search + hash;

    warning__WEBPACK_IMPORTED_MODULE_0___default()(!basename || Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["hasBasename"])(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');

    if (basename) path = Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["stripBasename"])(path, basename);

    return Object(_LocationUtils__WEBPACK_IMPORTED_MODULE_2__["createLocation"])(path, state, key);
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  };

  var transitionManager = Object(_createTransitionManager__WEBPACK_IMPORTED_MODULE_4__["default"])();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var handlePopState = function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if (Object(_DOMUtils__WEBPACK_IMPORTED_MODULE_5__["isExtraneousPopstateEvent"])(event)) return;

    handlePop(getDOMLocation(event.state));
  };

  var handleHashChange = function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  };

  var forceNextPop = false;

  var handlePop = function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';

      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({ action: action, location: location });
        } else {
          revertPop(location);
        }
      });
    }
  };

  var revertPop = function revertPop(fromLocation) {
    var toLocation = history.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);

    if (toIndex === -1) toIndex = 0;

    var fromIndex = allKeys.indexOf(fromLocation.key);

    if (fromIndex === -1) fromIndex = 0;

    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  };

  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key];

  // Public interface

  var createHref = function createHref(location) {
    return basename + Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["createPath"])(location);
  };

  var push = function push(path, state) {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'PUSH';
    var location = Object(_LocationUtils__WEBPACK_IMPORTED_MODULE_2__["createLocation"])(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.pushState({ key: key, state: state }, null, href);

        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

          nextKeys.push(location.key);
          allKeys = nextKeys;

          setState({ action: action, location: location });
        }
      } else {
        warning__WEBPACK_IMPORTED_MODULE_0___default()(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history');

        window.location.href = href;
      }
    });
  };

  var replace = function replace(path, state) {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'REPLACE';
    var location = Object(_LocationUtils__WEBPACK_IMPORTED_MODULE_2__["createLocation"])(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.replaceState({ key: key, state: state }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);

          if (prevIndex !== -1) allKeys[prevIndex] = location.key;

          setState({ action: action, location: location });
        }
      } else {
        warning__WEBPACK_IMPORTED_MODULE_0___default()(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history');

        window.location.replace(href);
      }
    });
  };

  var go = function go(n) {
    globalHistory.go(n);
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var listenerCount = 0;

  var checkDOMListeners = function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1) {
      Object(_DOMUtils__WEBPACK_IMPORTED_MODULE_5__["addEventListener"])(window, PopStateEvent, handlePopState);

      if (needsHashChangeListener) Object(_DOMUtils__WEBPACK_IMPORTED_MODULE_5__["addEventListener"])(window, HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      Object(_DOMUtils__WEBPACK_IMPORTED_MODULE_5__["removeEventListener"])(window, PopStateEvent, handlePopState);

      if (needsHashChangeListener) Object(_DOMUtils__WEBPACK_IMPORTED_MODULE_5__["removeEventListener"])(window, HashChangeEvent, handleHashChange);
    }
  };

  var isBlocked = false;

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  };

  var listen = function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  };

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };

  return history;
};

/* harmony default export */ __webpack_exports__["default"] = (createBrowserHistory);

/***/ }),

/***/ "./node_modules/history/es/createHashHistory.js":
/*!******************************************************!*\
  !*** ./node_modules/history/es/createHashHistory.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! warning */ "./node_modules/warning/browser.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LocationUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LocationUtils */ "./node_modules/history/es/LocationUtils.js");
/* harmony import */ var _PathUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PathUtils */ "./node_modules/history/es/PathUtils.js");
/* harmony import */ var _createTransitionManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createTransitionManager */ "./node_modules/history/es/createTransitionManager.js");
/* harmony import */ var _DOMUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DOMUtils */ "./node_modules/history/es/DOMUtils.js");
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};








var HashChangeEvent = 'hashchange';

var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!/' + Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["stripLeadingSlash"])(path);
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substr(1) : path;
    }
  },
  noslash: {
    encodePath: _PathUtils__WEBPACK_IMPORTED_MODULE_3__["stripLeadingSlash"],
    decodePath: _PathUtils__WEBPACK_IMPORTED_MODULE_3__["addLeadingSlash"]
  },
  slash: {
    encodePath: _PathUtils__WEBPACK_IMPORTED_MODULE_3__["addLeadingSlash"],
    decodePath: _PathUtils__WEBPACK_IMPORTED_MODULE_3__["addLeadingSlash"]
  }
};

var getHashPath = function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
};

var pushHashPath = function pushHashPath(path) {
  return window.location.hash = path;
};

var replaceHashPath = function replaceHashPath(path) {
  var hashIndex = window.location.href.indexOf('#');

  window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
};

var createHashHistory = function createHashHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  invariant__WEBPACK_IMPORTED_MODULE_1___default()(_DOMUtils__WEBPACK_IMPORTED_MODULE_5__["canUseDOM"], 'Hash history needs a DOM');

  var globalHistory = window.history;
  var canGoWithoutReload = Object(_DOMUtils__WEBPACK_IMPORTED_MODULE_5__["supportsGoWithoutReloadUsingHash"])();

  var _props$getUserConfirm = props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === undefined ? _DOMUtils__WEBPACK_IMPORTED_MODULE_5__["getConfirmation"] : _props$getUserConfirm,
      _props$hashType = props.hashType,
      hashType = _props$hashType === undefined ? 'slash' : _props$hashType;

  var basename = props.basename ? Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["stripTrailingSlash"])(Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["addLeadingSlash"])(props.basename)) : '';

  var _HashPathCoders$hashT = HashPathCoders[hashType],
      encodePath = _HashPathCoders$hashT.encodePath,
      decodePath = _HashPathCoders$hashT.decodePath;

  var getDOMLocation = function getDOMLocation() {
    var path = decodePath(getHashPath());

    warning__WEBPACK_IMPORTED_MODULE_0___default()(!basename || Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["hasBasename"])(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');

    if (basename) path = Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["stripBasename"])(path, basename);

    return Object(_LocationUtils__WEBPACK_IMPORTED_MODULE_2__["createLocation"])(path);
  };

  var transitionManager = Object(_createTransitionManager__WEBPACK_IMPORTED_MODULE_4__["default"])();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var forceNextPop = false;
  var ignorePath = null;

  var handleHashChange = function handleHashChange() {
    var path = getHashPath();
    var encodedPath = encodePath(path);

    if (path !== encodedPath) {
      // Ensure we always have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;

      if (!forceNextPop && Object(_LocationUtils__WEBPACK_IMPORTED_MODULE_2__["locationsAreEqual"])(prevLocation, location)) return; // A hashchange doesn't always == location change.

      if (ignorePath === Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["createPath"])(location)) return; // Ignore this change; we already setState in push/replace.

      ignorePath = null;

      handlePop(location);
    }
  };

  var handlePop = function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';

      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({ action: action, location: location });
        } else {
          revertPop(location);
        }
      });
    }
  };

  var revertPop = function revertPop(fromLocation) {
    var toLocation = history.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of paths we've seen in sessionStorage.
    // Instead, we just default to 0 for paths we don't know.

    var toIndex = allPaths.lastIndexOf(Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["createPath"])(toLocation));

    if (toIndex === -1) toIndex = 0;

    var fromIndex = allPaths.lastIndexOf(Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["createPath"])(fromLocation));

    if (fromIndex === -1) fromIndex = 0;

    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  };

  // Ensure the hash is encoded properly before doing anything else.
  var path = getHashPath();
  var encodedPath = encodePath(path);

  if (path !== encodedPath) replaceHashPath(encodedPath);

  var initialLocation = getDOMLocation();
  var allPaths = [Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["createPath"])(initialLocation)];

  // Public interface

  var createHref = function createHref(location) {
    return '#' + encodePath(basename + Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["createPath"])(location));
  };

  var push = function push(path, state) {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(state === undefined, 'Hash history cannot push state; it is ignored');

    var action = 'PUSH';
    var location = Object(_LocationUtils__WEBPACK_IMPORTED_MODULE_2__["createLocation"])(path, undefined, undefined, history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var path = Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["createPath"])(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a PUSH, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        pushHashPath(encodedPath);

        var prevIndex = allPaths.lastIndexOf(Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["createPath"])(history.location));
        var nextPaths = allPaths.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

        nextPaths.push(path);
        allPaths = nextPaths;

        setState({ action: action, location: location });
      } else {
        warning__WEBPACK_IMPORTED_MODULE_0___default()(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack');

        setState();
      }
    });
  };

  var replace = function replace(path, state) {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(state === undefined, 'Hash history cannot replace state; it is ignored');

    var action = 'REPLACE';
    var location = Object(_LocationUtils__WEBPACK_IMPORTED_MODULE_2__["createLocation"])(path, undefined, undefined, history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var path = Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["createPath"])(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        replaceHashPath(encodedPath);
      }

      var prevIndex = allPaths.indexOf(Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["createPath"])(history.location));

      if (prevIndex !== -1) allPaths[prevIndex] = path;

      setState({ action: action, location: location });
    });
  };

  var go = function go(n) {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser');

    globalHistory.go(n);
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var listenerCount = 0;

  var checkDOMListeners = function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1) {
      Object(_DOMUtils__WEBPACK_IMPORTED_MODULE_5__["addEventListener"])(window, HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      Object(_DOMUtils__WEBPACK_IMPORTED_MODULE_5__["removeEventListener"])(window, HashChangeEvent, handleHashChange);
    }
  };

  var isBlocked = false;

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  };

  var listen = function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  };

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };

  return history;
};

/* harmony default export */ __webpack_exports__["default"] = (createHashHistory);

/***/ }),

/***/ "./node_modules/history/es/createMemoryHistory.js":
/*!********************************************************!*\
  !*** ./node_modules/history/es/createMemoryHistory.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! warning */ "./node_modules/warning/browser.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PathUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PathUtils */ "./node_modules/history/es/PathUtils.js");
/* harmony import */ var _LocationUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LocationUtils */ "./node_modules/history/es/LocationUtils.js");
/* harmony import */ var _createTransitionManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createTransitionManager */ "./node_modules/history/es/createTransitionManager.js");
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};






var clamp = function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
};

/**
 * Creates a history object that stores locations in memory.
 */
var createMemoryHistory = function createMemoryHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var getUserConfirmation = props.getUserConfirmation,
      _props$initialEntries = props.initialEntries,
      initialEntries = _props$initialEntries === undefined ? ['/'] : _props$initialEntries,
      _props$initialIndex = props.initialIndex,
      initialIndex = _props$initialIndex === undefined ? 0 : _props$initialIndex,
      _props$keyLength = props.keyLength,
      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;

  var transitionManager = Object(_createTransitionManager__WEBPACK_IMPORTED_MODULE_3__["default"])();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = history.entries.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  };

  var index = clamp(initialIndex, 0, initialEntries.length - 1);
  var entries = initialEntries.map(function (entry) {
    return typeof entry === 'string' ? Object(_LocationUtils__WEBPACK_IMPORTED_MODULE_2__["createLocation"])(entry, undefined, createKey()) : Object(_LocationUtils__WEBPACK_IMPORTED_MODULE_2__["createLocation"])(entry, undefined, entry.key || createKey());
  });

  // Public interface

  var createHref = _PathUtils__WEBPACK_IMPORTED_MODULE_1__["createPath"];

  var push = function push(path, state) {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'PUSH';
    var location = Object(_LocationUtils__WEBPACK_IMPORTED_MODULE_2__["createLocation"])(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var prevIndex = history.index;
      var nextIndex = prevIndex + 1;

      var nextEntries = history.entries.slice(0);
      if (nextEntries.length > nextIndex) {
        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
      } else {
        nextEntries.push(location);
      }

      setState({
        action: action,
        location: location,
        index: nextIndex,
        entries: nextEntries
      });
    });
  };

  var replace = function replace(path, state) {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'REPLACE';
    var location = Object(_LocationUtils__WEBPACK_IMPORTED_MODULE_2__["createLocation"])(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      history.entries[history.index] = location;

      setState({ action: action, location: location });
    });
  };

  var go = function go(n) {
    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);

    var action = 'POP';
    var location = history.entries[nextIndex];

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (ok) {
        setState({
          action: action,
          location: location,
          index: nextIndex
        });
      } else {
        // Mimic the behavior of DOM histories by
        // causing a render after a cancelled POP.
        setState();
      }
    });
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var canGo = function canGo(n) {
    var nextIndex = history.index + n;
    return nextIndex >= 0 && nextIndex < history.entries.length;
  };

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return transitionManager.setPrompt(prompt);
  };

  var listen = function listen(listener) {
    return transitionManager.appendListener(listener);
  };

  var history = {
    length: entries.length,
    action: 'POP',
    location: entries[index],
    index: index,
    entries: entries,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    canGo: canGo,
    block: block,
    listen: listen
  };

  return history;
};

/* harmony default export */ __webpack_exports__["default"] = (createMemoryHistory);

/***/ }),

/***/ "./node_modules/history/es/createTransitionManager.js":
/*!************************************************************!*\
  !*** ./node_modules/history/es/createTransitionManager.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! warning */ "./node_modules/warning/browser.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_0__);


var createTransitionManager = function createTransitionManager() {
  var prompt = null;

  var setPrompt = function setPrompt(nextPrompt) {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(prompt == null, 'A history supports only one prompt at a time');

    prompt = nextPrompt;

    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  };

  var confirmTransitionTo = function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
          warning__WEBPACK_IMPORTED_MODULE_0___default()(false, 'A history needs a getUserConfirmation function in order to use a prompt message');

          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  };

  var listeners = [];

  var appendListener = function appendListener(fn) {
    var isActive = true;

    var listener = function listener() {
      if (isActive) fn.apply(undefined, arguments);
    };

    listeners.push(listener);

    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  };

  var notifyListeners = function notifyListeners() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(undefined, args);
    });
  };

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
};

/* harmony default export */ __webpack_exports__["default"] = (createTransitionManager);

/***/ }),

/***/ "./node_modules/history/es/index.js":
/*!******************************************!*\
  !*** ./node_modules/history/es/index.js ***!
  \******************************************/
/*! exports provided: createBrowserHistory, createHashHistory, createMemoryHistory, createLocation, locationsAreEqual, parsePath, createPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createBrowserHistory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createBrowserHistory */ "./node_modules/history/es/createBrowserHistory.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createBrowserHistory", function() { return _createBrowserHistory__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _createHashHistory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createHashHistory */ "./node_modules/history/es/createHashHistory.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createHashHistory", function() { return _createHashHistory__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _createMemoryHistory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createMemoryHistory */ "./node_modules/history/es/createMemoryHistory.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createMemoryHistory", function() { return _createMemoryHistory__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _LocationUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LocationUtils */ "./node_modules/history/es/LocationUtils.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createLocation", function() { return _LocationUtils__WEBPACK_IMPORTED_MODULE_3__["createLocation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "locationsAreEqual", function() { return _LocationUtils__WEBPACK_IMPORTED_MODULE_3__["locationsAreEqual"]; });

/* harmony import */ var _PathUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PathUtils */ "./node_modules/history/es/PathUtils.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parsePath", function() { return _PathUtils__WEBPACK_IMPORTED_MODULE_4__["parsePath"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createPath", function() { return _PathUtils__WEBPACK_IMPORTED_MODULE_4__["createPath"]; });











/***/ }),

/***/ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try {
                    // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
}

module.exports = hoistNonReactStatics;

/***/ }),

/***/ "./node_modules/invariant/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/invariant/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function (condition, format, a, b, c, d, e, f) {
  if (true) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/***/ }),

/***/ "./node_modules/path-to-regexp/index.js":
/*!**********************************************!*\
  !*** ./node_modules/path-to-regexp/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isarray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js");

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp;
module.exports.parse = parse;
module.exports.compile = compile;
module.exports.tokensToFunction = tokensToFunction;
module.exports.tokensToRegExp = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)',
// Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue;
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?'
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens;
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile(str, options) {
  return tokensToFunction(parse(str, options));
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty(str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk(str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue;
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`');
        }

        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`');
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue;
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }

      path += token.prefix + segment;
    }

    return path;
  };
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup(group) {
  return group.replace(/([=!:$\/()])/g, '\\$1');
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys(re, keys) {
  re.keys = keys;
  return re;
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags(options) {
  return options.sensitive ? '' : 'i';
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp(path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys);
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp(path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys);
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options);
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp(tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */keys || options;
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys);
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp(path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */keys || options;
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */keys);
  }

  if (isarray(path)) {
    return arrayToRegexp( /** @type {!Array} */path, /** @type {!Array} */keys, options);
  }

  return stringToRegexp( /** @type {string} */path, /** @type {!Array} */keys, options);
}

/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var printWarning = function () {};

if (true) {
  printWarning = function (text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function (isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (!manualPropTypeCallCache[cacheKey] &&
          // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            printWarning('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
       true ? printWarning('Invalid argument supplied to oneOf, expected an instance of array.') : undefined;
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : undefined;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

  var isValidElement = function (object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(isValidElement, throwOnDirectAccess);
} else {}

/***/ }),

/***/ "./node_modules/react-router-dom/es/BrowserRouter.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-router-dom/es/BrowserRouter.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! warning */ "./node_modules/react-router-dom/node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! history */ "./node_modules/history/es/index.js");
/* harmony import */ var _Router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Router */ "./node_modules/react-router-dom/es/Router.js");
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}







/**
 * The public API for a <Router> that uses HTML5 history.
 */

var BrowserRouter = function (_React$Component) {
  _inherits(BrowserRouter, _React$Component);

  function BrowserRouter() {
    var _temp, _this, _ret;

    _classCallCheck(this, BrowserRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.history = Object(history__WEBPACK_IMPORTED_MODULE_3__["createBrowserHistory"])(_this.props), _temp), _possibleConstructorReturn(_this, _ret);
  }

  BrowserRouter.prototype.componentWillMount = function componentWillMount() {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(!this.props.history, "<BrowserRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { BrowserRouter as Router }`.");
  };

  BrowserRouter.prototype.render = function render() {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Router__WEBPACK_IMPORTED_MODULE_4__["default"], { history: this.history, children: this.props.children });
  };

  return BrowserRouter;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

BrowserRouter.propTypes = {
  basename: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  forceRefresh: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  getUserConfirmation: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  keyLength: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
  children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node
};

/* harmony default export */ __webpack_exports__["default"] = (BrowserRouter);

/***/ }),

/***/ "./node_modules/react-router-dom/es/HashRouter.js":
/*!********************************************************!*\
  !*** ./node_modules/react-router-dom/es/HashRouter.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! warning */ "./node_modules/react-router-dom/node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! history */ "./node_modules/history/es/index.js");
/* harmony import */ var _Router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Router */ "./node_modules/react-router-dom/es/Router.js");
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}







/**
 * The public API for a <Router> that uses window.location.hash.
 */

var HashRouter = function (_React$Component) {
  _inherits(HashRouter, _React$Component);

  function HashRouter() {
    var _temp, _this, _ret;

    _classCallCheck(this, HashRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.history = Object(history__WEBPACK_IMPORTED_MODULE_3__["createHashHistory"])(_this.props), _temp), _possibleConstructorReturn(_this, _ret);
  }

  HashRouter.prototype.componentWillMount = function componentWillMount() {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(!this.props.history, "<HashRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { HashRouter as Router }`.");
  };

  HashRouter.prototype.render = function render() {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Router__WEBPACK_IMPORTED_MODULE_4__["default"], { history: this.history, children: this.props.children });
  };

  return HashRouter;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

HashRouter.propTypes = {
  basename: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  getUserConfirmation: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  hashType: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(["hashbang", "noslash", "slash"]),
  children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node
};

/* harmony default export */ __webpack_exports__["default"] = (HashRouter);

/***/ }),

/***/ "./node_modules/react-router-dom/es/Link.js":
/*!**************************************************!*\
  !*** ./node_modules/react-router-dom/es/Link.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! history */ "./node_modules/history/es/index.js");
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}






var isModifiedEvent = function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
};

/**
 * The public API for rendering a history-aware <a>.
 */

var Link = function (_React$Component) {
  _inherits(Link, _React$Component);

  function Link() {
    var _temp, _this, _ret;

    _classCallCheck(this, Link);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleClick = function (event) {
      if (_this.props.onClick) _this.props.onClick(event);

      if (!event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore everything but left clicks
      !_this.props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
          event.preventDefault();

          var history = _this.context.router.history;
          var _this$props = _this.props,
              replace = _this$props.replace,
              to = _this$props.to;

          if (replace) {
            history.replace(to);
          } else {
            history.push(to);
          }
        }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Link.prototype.render = function render() {
    var _props = this.props,
        replace = _props.replace,
        to = _props.to,
        innerRef = _props.innerRef,
        props = _objectWithoutProperties(_props, ["replace", "to", "innerRef"]); // eslint-disable-line no-unused-vars

    invariant__WEBPACK_IMPORTED_MODULE_2___default()(this.context.router, "You should not use <Link> outside a <Router>");

    invariant__WEBPACK_IMPORTED_MODULE_2___default()(to !== undefined, 'You must specify the "to" property');

    var history = this.context.router.history;

    var location = typeof to === "string" ? Object(history__WEBPACK_IMPORTED_MODULE_3__["createLocation"])(to, null, null, history.location) : to;

    var href = history.createHref(location);
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", _extends({}, props, { onClick: this.handleClick, href: href, ref: innerRef }));
  };

  return Link;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Link.propTypes = {
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  target: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  replace: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  to: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object]).isRequired,
  innerRef: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func])
};
Link.defaultProps = {
  replace: false
};
Link.contextTypes = {
  router: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    history: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
      push: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
      replace: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
      createHref: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
    }).isRequired
  }).isRequired
};

/* harmony default export */ __webpack_exports__["default"] = (Link);

/***/ }),

/***/ "./node_modules/react-router-dom/es/MemoryRouter.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-router-dom/es/MemoryRouter.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_router_es_MemoryRouter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router/es/MemoryRouter */ "./node_modules/react-router/es/MemoryRouter.js");
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["default"] = (react_router_es_MemoryRouter__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./node_modules/react-router-dom/es/NavLink.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-router-dom/es/NavLink.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Route */ "./node_modules/react-router-dom/es/Route.js");
/* harmony import */ var _Link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Link */ "./node_modules/react-router-dom/es/Link.js");
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}






/**
 * A <Link> wrapper that knows if it's "active" or not.
 */
var NavLink = function NavLink(_ref) {
  var to = _ref.to,
      exact = _ref.exact,
      strict = _ref.strict,
      location = _ref.location,
      activeClassName = _ref.activeClassName,
      className = _ref.className,
      activeStyle = _ref.activeStyle,
      style = _ref.style,
      getIsActive = _ref.isActive,
      ariaCurrent = _ref["aria-current"],
      rest = _objectWithoutProperties(_ref, ["to", "exact", "strict", "location", "activeClassName", "className", "activeStyle", "style", "isActive", "aria-current"]);

  var path = (typeof to === "undefined" ? "undefined" : _typeof(to)) === "object" ? to.pathname : to;

  // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
  var escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Route__WEBPACK_IMPORTED_MODULE_2__["default"], {
    path: escapedPath,
    exact: exact,
    strict: strict,
    location: location,
    children: function children(_ref2) {
      var location = _ref2.location,
          match = _ref2.match;

      var isActive = !!(getIsActive ? getIsActive(match, location) : match);

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Link__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({
        to: to,
        className: isActive ? [className, activeClassName].filter(function (i) {
          return i;
        }).join(" ") : className,
        style: isActive ? _extends({}, style, activeStyle) : style,
        "aria-current": isActive && ariaCurrent || null
      }, rest));
    }
  });
};

NavLink.propTypes = {
  to: _Link__WEBPACK_IMPORTED_MODULE_3__["default"].propTypes.to,
  exact: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  strict: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  location: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  activeClassName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  activeStyle: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  style: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  isActive: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  "aria-current": prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(["page", "step", "location", "date", "time", "true"])
};

NavLink.defaultProps = {
  activeClassName: "active",
  "aria-current": "page"
};

/* harmony default export */ __webpack_exports__["default"] = (NavLink);

/***/ }),

/***/ "./node_modules/react-router-dom/es/Prompt.js":
/*!****************************************************!*\
  !*** ./node_modules/react-router-dom/es/Prompt.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_router_es_Prompt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router/es/Prompt */ "./node_modules/react-router/es/Prompt.js");
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["default"] = (react_router_es_Prompt__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./node_modules/react-router-dom/es/Redirect.js":
/*!******************************************************!*\
  !*** ./node_modules/react-router-dom/es/Redirect.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_router_es_Redirect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router/es/Redirect */ "./node_modules/react-router/es/Redirect.js");
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["default"] = (react_router_es_Redirect__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./node_modules/react-router-dom/es/Route.js":
/*!***************************************************!*\
  !*** ./node_modules/react-router-dom/es/Route.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_router_es_Route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router/es/Route */ "./node_modules/react-router/es/Route.js");
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["default"] = (react_router_es_Route__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./node_modules/react-router-dom/es/Router.js":
/*!****************************************************!*\
  !*** ./node_modules/react-router-dom/es/Router.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_router_es_Router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router/es/Router */ "./node_modules/react-router/es/Router.js");
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["default"] = (react_router_es_Router__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./node_modules/react-router-dom/es/StaticRouter.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-router-dom/es/StaticRouter.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_router_es_StaticRouter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router/es/StaticRouter */ "./node_modules/react-router/es/StaticRouter.js");
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["default"] = (react_router_es_StaticRouter__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./node_modules/react-router-dom/es/Switch.js":
/*!****************************************************!*\
  !*** ./node_modules/react-router-dom/es/Switch.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_router_es_Switch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router/es/Switch */ "./node_modules/react-router/es/Switch.js");
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["default"] = (react_router_es_Switch__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./node_modules/react-router-dom/es/generatePath.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-router-dom/es/generatePath.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_router_es_generatePath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router/es/generatePath */ "./node_modules/react-router/es/generatePath.js");
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["default"] = (react_router_es_generatePath__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./node_modules/react-router-dom/es/index.js":
/*!***************************************************!*\
  !*** ./node_modules/react-router-dom/es/index.js ***!
  \***************************************************/
/*! exports provided: BrowserRouter, HashRouter, Link, MemoryRouter, NavLink, Prompt, Redirect, Route, Router, StaticRouter, Switch, generatePath, matchPath, withRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BrowserRouter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BrowserRouter */ "./node_modules/react-router-dom/es/BrowserRouter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BrowserRouter", function() { return _BrowserRouter__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _HashRouter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HashRouter */ "./node_modules/react-router-dom/es/HashRouter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HashRouter", function() { return _HashRouter__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Link */ "./node_modules/react-router-dom/es/Link.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return _Link__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _MemoryRouter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MemoryRouter */ "./node_modules/react-router-dom/es/MemoryRouter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MemoryRouter", function() { return _MemoryRouter__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _NavLink__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NavLink */ "./node_modules/react-router-dom/es/NavLink.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavLink", function() { return _NavLink__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _Prompt__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Prompt */ "./node_modules/react-router-dom/es/Prompt.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Prompt", function() { return _Prompt__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _Redirect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Redirect */ "./node_modules/react-router-dom/es/Redirect.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Redirect", function() { return _Redirect__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _Route__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Route */ "./node_modules/react-router-dom/es/Route.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return _Route__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _Router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Router */ "./node_modules/react-router-dom/es/Router.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return _Router__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _StaticRouter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./StaticRouter */ "./node_modules/react-router-dom/es/StaticRouter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StaticRouter", function() { return _StaticRouter__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _Switch__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Switch */ "./node_modules/react-router-dom/es/Switch.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Switch", function() { return _Switch__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _generatePath__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./generatePath */ "./node_modules/react-router-dom/es/generatePath.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generatePath", function() { return _generatePath__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _matchPath__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./matchPath */ "./node_modules/react-router-dom/es/matchPath.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "matchPath", function() { return _matchPath__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _withRouter__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./withRouter */ "./node_modules/react-router-dom/es/withRouter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withRouter", function() { return _withRouter__WEBPACK_IMPORTED_MODULE_13__["default"]; });






























/***/ }),

/***/ "./node_modules/react-router-dom/es/matchPath.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-router-dom/es/matchPath.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_router_es_matchPath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router/es/matchPath */ "./node_modules/react-router/es/matchPath.js");
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["default"] = (react_router_es_matchPath__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./node_modules/react-router-dom/es/withRouter.js":
/*!********************************************************!*\
  !*** ./node_modules/react-router-dom/es/withRouter.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_router_es_withRouter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router/es/withRouter */ "./node_modules/react-router/es/withRouter.js");
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["default"] = (react_router_es_withRouter__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./node_modules/react-router-dom/node_modules/warning/warning.js":
/*!***********************************************************************!*\
  !*** ./node_modules/react-router-dom/node_modules/warning/warning.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = "development" !== 'production';

var warning = function () {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function (condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

module.exports = warning;

/***/ }),

/***/ "./node_modules/react-router/es/MemoryRouter.js":
/*!******************************************************!*\
  !*** ./node_modules/react-router/es/MemoryRouter.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! warning */ "./node_modules/react-router/node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! history */ "./node_modules/history/es/index.js");
/* harmony import */ var _Router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Router */ "./node_modules/react-router/es/Router.js");
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}







/**
 * The public API for a <Router> that stores location in memory.
 */

var MemoryRouter = function (_React$Component) {
  _inherits(MemoryRouter, _React$Component);

  function MemoryRouter() {
    var _temp, _this, _ret;

    _classCallCheck(this, MemoryRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.history = Object(history__WEBPACK_IMPORTED_MODULE_3__["createMemoryHistory"])(_this.props), _temp), _possibleConstructorReturn(_this, _ret);
  }

  MemoryRouter.prototype.componentWillMount = function componentWillMount() {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(!this.props.history, "<MemoryRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { MemoryRouter as Router }`.");
  };

  MemoryRouter.prototype.render = function render() {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Router__WEBPACK_IMPORTED_MODULE_4__["default"], { history: this.history, children: this.props.children });
  };

  return MemoryRouter;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

MemoryRouter.propTypes = {
  initialEntries: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,
  initialIndex: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
  getUserConfirmation: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  keyLength: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
  children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node
};

/* harmony default export */ __webpack_exports__["default"] = (MemoryRouter);

/***/ }),

/***/ "./node_modules/react-router/es/Prompt.js":
/*!************************************************!*\
  !*** ./node_modules/react-router/es/Prompt.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_2__);
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}





/**
 * The public API for prompting the user before navigating away
 * from a screen with a component.
 */

var Prompt = function (_React$Component) {
  _inherits(Prompt, _React$Component);

  function Prompt() {
    _classCallCheck(this, Prompt);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Prompt.prototype.enable = function enable(message) {
    if (this.unblock) this.unblock();

    this.unblock = this.context.router.history.block(message);
  };

  Prompt.prototype.disable = function disable() {
    if (this.unblock) {
      this.unblock();
      this.unblock = null;
    }
  };

  Prompt.prototype.componentWillMount = function componentWillMount() {
    invariant__WEBPACK_IMPORTED_MODULE_2___default()(this.context.router, "You should not use <Prompt> outside a <Router>");

    if (this.props.when) this.enable(this.props.message);
  };

  Prompt.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.when) {
      if (!this.props.when || this.props.message !== nextProps.message) this.enable(nextProps.message);
    } else {
      this.disable();
    }
  };

  Prompt.prototype.componentWillUnmount = function componentWillUnmount() {
    this.disable();
  };

  Prompt.prototype.render = function render() {
    return null;
  };

  return Prompt;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Prompt.propTypes = {
  when: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  message: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string]).isRequired
};
Prompt.defaultProps = {
  when: true
};
Prompt.contextTypes = {
  router: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    history: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
      block: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
    }).isRequired
  }).isRequired
};

/* harmony default export */ __webpack_exports__["default"] = (Prompt);

/***/ }),

/***/ "./node_modules/react-router/es/Redirect.js":
/*!**************************************************!*\
  !*** ./node_modules/react-router/es/Redirect.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! warning */ "./node_modules/react-router/node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! history */ "./node_modules/history/es/index.js");
/* harmony import */ var _generatePath__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./generatePath */ "./node_modules/react-router/es/generatePath.js");
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}








/**
 * The public API for updating the location programmatically
 * with a component.
 */

var Redirect = function (_React$Component) {
  _inherits(Redirect, _React$Component);

  function Redirect() {
    _classCallCheck(this, Redirect);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Redirect.prototype.isStatic = function isStatic() {
    return this.context.router && this.context.router.staticContext;
  };

  Redirect.prototype.componentWillMount = function componentWillMount() {
    invariant__WEBPACK_IMPORTED_MODULE_3___default()(this.context.router, "You should not use <Redirect> outside a <Router>");

    if (this.isStatic()) this.perform();
  };

  Redirect.prototype.componentDidMount = function componentDidMount() {
    if (!this.isStatic()) this.perform();
  };

  Redirect.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var prevTo = Object(history__WEBPACK_IMPORTED_MODULE_4__["createLocation"])(prevProps.to);
    var nextTo = Object(history__WEBPACK_IMPORTED_MODULE_4__["createLocation"])(this.props.to);

    if (Object(history__WEBPACK_IMPORTED_MODULE_4__["locationsAreEqual"])(prevTo, nextTo)) {
      warning__WEBPACK_IMPORTED_MODULE_2___default()(false, "You tried to redirect to the same route you're currently on: " + ("\"" + nextTo.pathname + nextTo.search + "\""));
      return;
    }

    this.perform();
  };

  Redirect.prototype.computeTo = function computeTo(_ref) {
    var computedMatch = _ref.computedMatch,
        to = _ref.to;

    if (computedMatch) {
      if (typeof to === "string") {
        return Object(_generatePath__WEBPACK_IMPORTED_MODULE_5__["default"])(to, computedMatch.params);
      } else {
        return _extends({}, to, {
          pathname: Object(_generatePath__WEBPACK_IMPORTED_MODULE_5__["default"])(to.pathname, computedMatch.params)
        });
      }
    }

    return to;
  };

  Redirect.prototype.perform = function perform() {
    var history = this.context.router.history;
    var push = this.props.push;

    var to = this.computeTo(this.props);

    if (push) {
      history.push(to);
    } else {
      history.replace(to);
    }
  };

  Redirect.prototype.render = function render() {
    return null;
  };

  return Redirect;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Redirect.propTypes = {
  computedMatch: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object, // private, from <Switch>
  push: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  from: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  to: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object]).isRequired
};
Redirect.defaultProps = {
  push: false
};
Redirect.contextTypes = {
  router: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    history: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
      push: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
      replace: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
    }).isRequired,
    staticContext: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
  }).isRequired
};

/* harmony default export */ __webpack_exports__["default"] = (Redirect);

/***/ }),

/***/ "./node_modules/react-router/es/Route.js":
/*!***********************************************!*\
  !*** ./node_modules/react-router/es/Route.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! warning */ "./node_modules/react-router/node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _matchPath__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./matchPath */ "./node_modules/react-router/es/matchPath.js");
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}







var isEmptyChildren = function isEmptyChildren(children) {
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.Children.count(children) === 0;
};

/**
 * The public API for matching a single path and rendering.
 */

var Route = function (_React$Component) {
  _inherits(Route, _React$Component);

  function Route() {
    var _temp, _this, _ret;

    _classCallCheck(this, Route);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      match: _this.computeMatch(_this.props, _this.context.router)
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Route.prototype.getChildContext = function getChildContext() {
    return {
      router: _extends({}, this.context.router, {
        route: {
          location: this.props.location || this.context.router.route.location,
          match: this.state.match
        }
      })
    };
  };

  Route.prototype.computeMatch = function computeMatch(_ref, router) {
    var computedMatch = _ref.computedMatch,
        location = _ref.location,
        path = _ref.path,
        strict = _ref.strict,
        exact = _ref.exact,
        sensitive = _ref.sensitive;

    if (computedMatch) return computedMatch; // <Switch> already computed the match for us

    invariant__WEBPACK_IMPORTED_MODULE_1___default()(router, "You should not use <Route> or withRouter() outside a <Router>");

    var route = router.route;

    var pathname = (location || route.location).pathname;

    return Object(_matchPath__WEBPACK_IMPORTED_MODULE_4__["default"])(pathname, { path: path, strict: strict, exact: exact, sensitive: sensitive }, route.match);
  };

  Route.prototype.componentWillMount = function componentWillMount() {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(!(this.props.component && this.props.render), "You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored");

    warning__WEBPACK_IMPORTED_MODULE_0___default()(!(this.props.component && this.props.children && !isEmptyChildren(this.props.children)), "You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored");

    warning__WEBPACK_IMPORTED_MODULE_0___default()(!(this.props.render && this.props.children && !isEmptyChildren(this.props.children)), "You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored");
  };

  Route.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(!(nextProps.location && !this.props.location), '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');

    warning__WEBPACK_IMPORTED_MODULE_0___default()(!(!nextProps.location && this.props.location), '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');

    this.setState({
      match: this.computeMatch(nextProps, nextContext.router)
    });
  };

  Route.prototype.render = function render() {
    var match = this.state.match;
    var _props = this.props,
        children = _props.children,
        component = _props.component,
        render = _props.render;
    var _context$router = this.context.router,
        history = _context$router.history,
        route = _context$router.route,
        staticContext = _context$router.staticContext;

    var location = this.props.location || route.location;
    var props = { match: match, location: location, history: history, staticContext: staticContext };

    if (component) return match ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(component, props) : null;

    if (render) return match ? render(props) : null;

    if (typeof children === "function") return children(props);

    if (children && !isEmptyChildren(children)) return react__WEBPACK_IMPORTED_MODULE_2___default.a.Children.only(children);

    return null;
  };

  return Route;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

Route.propTypes = {
  computedMatch: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object, // private, from <Switch>
  path: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
  exact: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,
  strict: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,
  sensitive: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,
  component: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,
  render: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,
  children: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node]),
  location: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object
};
Route.contextTypes = {
  router: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape({
    history: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,
    route: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,
    staticContext: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object
  })
};
Route.childContextTypes = {
  router: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired
};

/* harmony default export */ __webpack_exports__["default"] = (Route);

/***/ }),

/***/ "./node_modules/react-router/es/Router.js":
/*!************************************************!*\
  !*** ./node_modules/react-router/es/Router.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! warning */ "./node_modules/react-router/node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}






/**
 * The public API for putting history on context.
 */

var Router = function (_React$Component) {
  _inherits(Router, _React$Component);

  function Router() {
    var _temp, _this, _ret;

    _classCallCheck(this, Router);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      match: _this.computeMatch(_this.props.history.location.pathname)
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Router.prototype.getChildContext = function getChildContext() {
    return {
      router: _extends({}, this.context.router, {
        history: this.props.history,
        route: {
          location: this.props.history.location,
          match: this.state.match
        }
      })
    };
  };

  Router.prototype.computeMatch = function computeMatch(pathname) {
    return {
      path: "/",
      url: "/",
      params: {},
      isExact: pathname === "/"
    };
  };

  Router.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    var _props = this.props,
        children = _props.children,
        history = _props.history;

    invariant__WEBPACK_IMPORTED_MODULE_1___default()(children == null || react__WEBPACK_IMPORTED_MODULE_2___default.a.Children.count(children) === 1, "A <Router> may have only one child element");

    // Do this here so we can setState when a <Redirect> changes the
    // location in componentWillMount. This happens e.g. when doing
    // server rendering using a <StaticRouter>.
    this.unlisten = history.listen(function () {
      _this2.setState({
        match: _this2.computeMatch(history.location.pathname)
      });
    });
  };

  Router.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(this.props.history === nextProps.history, "You cannot change <Router history>");
  };

  Router.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unlisten();
  };

  Router.prototype.render = function render() {
    var children = this.props.children;

    return children ? react__WEBPACK_IMPORTED_MODULE_2___default.a.Children.only(children) : null;
  };

  return Router;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

Router.propTypes = {
  history: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,
  children: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node
};
Router.contextTypes = {
  router: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object
};
Router.childContextTypes = {
  router: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired
};

/* harmony default export */ __webpack_exports__["default"] = (Router);

/***/ }),

/***/ "./node_modules/react-router/es/StaticRouter.js":
/*!******************************************************!*\
  !*** ./node_modules/react-router/es/StaticRouter.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! warning */ "./node_modules/react-router/node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! history */ "./node_modules/history/es/index.js");
/* harmony import */ var _Router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Router */ "./node_modules/react-router/es/Router.js");
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}








var addLeadingSlash = function addLeadingSlash(path) {
  return path.charAt(0) === "/" ? path : "/" + path;
};

var addBasename = function addBasename(basename, location) {
  if (!basename) return location;

  return _extends({}, location, {
    pathname: addLeadingSlash(basename) + location.pathname
  });
};

var stripBasename = function stripBasename(basename, location) {
  if (!basename) return location;

  var base = addLeadingSlash(basename);

  if (location.pathname.indexOf(base) !== 0) return location;

  return _extends({}, location, {
    pathname: location.pathname.substr(base.length)
  });
};

var createURL = function createURL(location) {
  return typeof location === "string" ? location : Object(history__WEBPACK_IMPORTED_MODULE_4__["createPath"])(location);
};

var staticHandler = function staticHandler(methodName) {
  return function () {
    invariant__WEBPACK_IMPORTED_MODULE_1___default()(false, "You cannot %s with <StaticRouter>", methodName);
  };
};

var noop = function noop() {};

/**
 * The public top-level API for a "static" <Router>, so-called because it
 * can't actually change the current location. Instead, it just records
 * location changes in a context object. Useful mainly in testing and
 * server-rendering scenarios.
 */

var StaticRouter = function (_React$Component) {
  _inherits(StaticRouter, _React$Component);

  function StaticRouter() {
    var _temp, _this, _ret;

    _classCallCheck(this, StaticRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.createHref = function (path) {
      return addLeadingSlash(_this.props.basename + createURL(path));
    }, _this.handlePush = function (location) {
      var _this$props = _this.props,
          basename = _this$props.basename,
          context = _this$props.context;

      context.action = "PUSH";
      context.location = addBasename(basename, Object(history__WEBPACK_IMPORTED_MODULE_4__["createLocation"])(location));
      context.url = createURL(context.location);
    }, _this.handleReplace = function (location) {
      var _this$props2 = _this.props,
          basename = _this$props2.basename,
          context = _this$props2.context;

      context.action = "REPLACE";
      context.location = addBasename(basename, Object(history__WEBPACK_IMPORTED_MODULE_4__["createLocation"])(location));
      context.url = createURL(context.location);
    }, _this.handleListen = function () {
      return noop;
    }, _this.handleBlock = function () {
      return noop;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  StaticRouter.prototype.getChildContext = function getChildContext() {
    return {
      router: {
        staticContext: this.props.context
      }
    };
  };

  StaticRouter.prototype.componentWillMount = function componentWillMount() {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(!this.props.history, "<StaticRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { StaticRouter as Router }`.");
  };

  StaticRouter.prototype.render = function render() {
    var _props = this.props,
        basename = _props.basename,
        context = _props.context,
        location = _props.location,
        props = _objectWithoutProperties(_props, ["basename", "context", "location"]);

    var history = {
      createHref: this.createHref,
      action: "POP",
      location: stripBasename(basename, Object(history__WEBPACK_IMPORTED_MODULE_4__["createLocation"])(location)),
      push: this.handlePush,
      replace: this.handleReplace,
      go: staticHandler("go"),
      goBack: staticHandler("goBack"),
      goForward: staticHandler("goForward"),
      listen: this.handleListen,
      block: this.handleBlock
    };

    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Router__WEBPACK_IMPORTED_MODULE_5__["default"], _extends({}, props, { history: history }));
  };

  return StaticRouter;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

StaticRouter.propTypes = {
  basename: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
  context: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,
  location: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object])
};
StaticRouter.defaultProps = {
  basename: "",
  location: "/"
};
StaticRouter.childContextTypes = {
  router: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired
};

/* harmony default export */ __webpack_exports__["default"] = (StaticRouter);

/***/ }),

/***/ "./node_modules/react-router/es/Switch.js":
/*!************************************************!*\
  !*** ./node_modules/react-router/es/Switch.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! warning */ "./node_modules/react-router/node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _matchPath__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./matchPath */ "./node_modules/react-router/es/matchPath.js");
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}







/**
 * The public API for rendering the first <Route> that matches.
 */

var Switch = function (_React$Component) {
  _inherits(Switch, _React$Component);

  function Switch() {
    _classCallCheck(this, Switch);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Switch.prototype.componentWillMount = function componentWillMount() {
    invariant__WEBPACK_IMPORTED_MODULE_3___default()(this.context.router, "You should not use <Switch> outside a <Router>");
  };

  Switch.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    warning__WEBPACK_IMPORTED_MODULE_2___default()(!(nextProps.location && !this.props.location), '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');

    warning__WEBPACK_IMPORTED_MODULE_2___default()(!(!nextProps.location && this.props.location), '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');
  };

  Switch.prototype.render = function render() {
    var route = this.context.router.route;
    var children = this.props.children;

    var location = this.props.location || route.location;

    var match = void 0,
        child = void 0;
    react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.forEach(children, function (element) {
      if (match == null && react__WEBPACK_IMPORTED_MODULE_0___default.a.isValidElement(element)) {
        var _element$props = element.props,
            pathProp = _element$props.path,
            exact = _element$props.exact,
            strict = _element$props.strict,
            sensitive = _element$props.sensitive,
            from = _element$props.from;

        var path = pathProp || from;

        child = element;
        match = Object(_matchPath__WEBPACK_IMPORTED_MODULE_4__["default"])(location.pathname, { path: path, exact: exact, strict: strict, sensitive: sensitive }, route.match);
      }
    });

    return match ? react__WEBPACK_IMPORTED_MODULE_0___default.a.cloneElement(child, { location: location, computedMatch: match }) : null;
  };

  return Switch;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Switch.contextTypes = {
  router: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    route: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
  }).isRequired
};
Switch.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node,
  location: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
};

/* harmony default export */ __webpack_exports__["default"] = (Switch);

/***/ }),

/***/ "./node_modules/react-router/es/generatePath.js":
/*!******************************************************!*\
  !*** ./node_modules/react-router/es/generatePath.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var path_to_regexp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path-to-regexp */ "./node_modules/path-to-regexp/index.js");
/* harmony import */ var path_to_regexp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path_to_regexp__WEBPACK_IMPORTED_MODULE_0__);


var patternCache = {};
var cacheLimit = 10000;
var cacheCount = 0;

var compileGenerator = function compileGenerator(pattern) {
  var cacheKey = pattern;
  var cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});

  if (cache[pattern]) return cache[pattern];

  var compiledGenerator = path_to_regexp__WEBPACK_IMPORTED_MODULE_0___default.a.compile(pattern);

  if (cacheCount < cacheLimit) {
    cache[pattern] = compiledGenerator;
    cacheCount++;
  }

  return compiledGenerator;
};

/**
 * Public API for generating a URL pathname from a pattern and parameters.
 */
var generatePath = function generatePath() {
  var pattern = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/";
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (pattern === "/") {
    return pattern;
  }
  var generator = compileGenerator(pattern);
  return generator(params, { pretty: true });
};

/* harmony default export */ __webpack_exports__["default"] = (generatePath);

/***/ }),

/***/ "./node_modules/react-router/es/index.js":
/*!***********************************************!*\
  !*** ./node_modules/react-router/es/index.js ***!
  \***********************************************/
/*! exports provided: MemoryRouter, Prompt, Redirect, Route, Router, StaticRouter, Switch, generatePath, matchPath, withRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MemoryRouter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MemoryRouter */ "./node_modules/react-router/es/MemoryRouter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MemoryRouter", function() { return _MemoryRouter__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Prompt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Prompt */ "./node_modules/react-router/es/Prompt.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Prompt", function() { return _Prompt__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Redirect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Redirect */ "./node_modules/react-router/es/Redirect.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Redirect", function() { return _Redirect__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Route__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Route */ "./node_modules/react-router/es/Route.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return _Route__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _Router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Router */ "./node_modules/react-router/es/Router.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return _Router__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _StaticRouter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./StaticRouter */ "./node_modules/react-router/es/StaticRouter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StaticRouter", function() { return _StaticRouter__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _Switch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Switch */ "./node_modules/react-router/es/Switch.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Switch", function() { return _Switch__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _generatePath__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./generatePath */ "./node_modules/react-router/es/generatePath.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generatePath", function() { return _generatePath__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _matchPath__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./matchPath */ "./node_modules/react-router/es/matchPath.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "matchPath", function() { return _matchPath__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _withRouter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./withRouter */ "./node_modules/react-router/es/withRouter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withRouter", function() { return _withRouter__WEBPACK_IMPORTED_MODULE_9__["default"]; });






















/***/ }),

/***/ "./node_modules/react-router/es/matchPath.js":
/*!***************************************************!*\
  !*** ./node_modules/react-router/es/matchPath.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var path_to_regexp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path-to-regexp */ "./node_modules/path-to-regexp/index.js");
/* harmony import */ var path_to_regexp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path_to_regexp__WEBPACK_IMPORTED_MODULE_0__);


var patternCache = {};
var cacheLimit = 10000;
var cacheCount = 0;

var compilePath = function compilePath(pattern, options) {
  var cacheKey = "" + options.end + options.strict + options.sensitive;
  var cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});

  if (cache[pattern]) return cache[pattern];

  var keys = [];
  var re = path_to_regexp__WEBPACK_IMPORTED_MODULE_0___default()(pattern, keys, options);
  var compiledPattern = { re: re, keys: keys };

  if (cacheCount < cacheLimit) {
    cache[pattern] = compiledPattern;
    cacheCount++;
  }

  return compiledPattern;
};

/**
 * Public API for matching a URL pathname to a path pattern.
 */
var matchPath = function matchPath(pathname) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var parent = arguments[2];

  if (typeof options === "string") options = { path: options };

  var _options = options,
      path = _options.path,
      _options$exact = _options.exact,
      exact = _options$exact === undefined ? false : _options$exact,
      _options$strict = _options.strict,
      strict = _options$strict === undefined ? false : _options$strict,
      _options$sensitive = _options.sensitive,
      sensitive = _options$sensitive === undefined ? false : _options$sensitive;

  if (path == null) return parent;

  var _compilePath = compilePath(path, { end: exact, strict: strict, sensitive: sensitive }),
      re = _compilePath.re,
      keys = _compilePath.keys;

  var match = re.exec(pathname);

  if (!match) return null;

  var url = match[0],
      values = match.slice(1);

  var isExact = pathname === url;

  if (exact && !isExact) return null;

  return {
    path: path, // the path pattern used to match
    url: path === "/" && url === "" ? "/" : url, // the matched portion of the URL
    isExact: isExact, // whether or not we matched exactly
    params: keys.reduce(function (memo, key, index) {
      memo[key.name] = values[index];
      return memo;
    }, {})
  };
};

/* harmony default export */ __webpack_exports__["default"] = (matchPath);

/***/ }),

/***/ "./node_modules/react-router/es/withRouter.js":
/*!****************************************************!*\
  !*** ./node_modules/react-router/es/withRouter.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Route__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Route */ "./node_modules/react-router/es/Route.js");
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}






/**
 * A public higher-order component to access the imperative API
 */
var withRouter = function withRouter(Component) {
  var C = function C(props) {
    var wrappedComponentRef = props.wrappedComponentRef,
        remainingProps = _objectWithoutProperties(props, ["wrappedComponentRef"]);

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Route__WEBPACK_IMPORTED_MODULE_3__["default"], {
      children: function children(routeComponentProps) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, _extends({}, remainingProps, routeComponentProps, {
          ref: wrappedComponentRef
        }));
      }
    });
  };

  C.displayName = "withRouter(" + (Component.displayName || Component.name) + ")";
  C.WrappedComponent = Component;
  C.propTypes = {
    wrappedComponentRef: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
  };

  return hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_2___default()(C, Component);
};

/* harmony default export */ __webpack_exports__["default"] = (withRouter);

/***/ }),

/***/ "./node_modules/react-router/node_modules/warning/warning.js":
/*!*******************************************************************!*\
  !*** ./node_modules/react-router/node_modules/warning/warning.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = "development" !== 'production';

var warning = function () {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function (condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

module.exports = warning;

/***/ }),

/***/ "./node_modules/resolve-pathname/index.js":
/*!************************************************!*\
  !*** ./node_modules/resolve-pathname/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
}

// About 1.5x faster than the two-arg version of Array#splice()
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
}

// This implementation is based heavily on node's url.parse
function resolvePathname(to) {
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var toParts = to && to.split('/') || [];
  var fromParts = from && from.split('/') || [];

  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';

  var hasTrailingSlash = void 0;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) {
    fromParts.unshift('..');
  }if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) fromParts.unshift('');

  var result = fromParts.join('/');

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

  return result;
}

/* harmony default export */ __webpack_exports__["default"] = (resolvePathname);

/***/ }),

/***/ "./node_modules/value-equal/index.js":
/*!*******************************************!*\
  !*** ./node_modules/value-equal/index.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

function valueEqual(a, b) {
  if (a === b) return true;

  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
      return valueEqual(item, b[index]);
    });
  }

  var aType = typeof a === 'undefined' ? 'undefined' : _typeof(a);
  var bType = typeof b === 'undefined' ? 'undefined' : _typeof(b);

  if (aType !== bType) return false;

  if (aType === 'object') {
    var aValue = a.valueOf();
    var bValue = b.valueOf();

    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);

    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every(function (key) {
      return valueEqual(a[key], b[key]);
    });
  }

  return false;
}

/* harmony default export */ __webpack_exports__["default"] = (valueEqual);

/***/ }),

/***/ "./node_modules/warning/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/warning/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function () {};

if (true) {
  warning = function (condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.length < 10 || /^[s\W]*$/.test(format)) {
      throw new Error('The warning format should be able to uniquely identify this ' + 'warning. Please, use a more descriptive format than: ' + format);
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    }
  };
}

module.exports = warning;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaGlzdG9yeS9lcy9ET01VdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaGlzdG9yeS9lcy9Mb2NhdGlvblV0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9oaXN0b3J5L2VzL1BhdGhVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaGlzdG9yeS9lcy9jcmVhdGVCcm93c2VySGlzdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaGlzdG9yeS9lcy9jcmVhdGVIYXNoSGlzdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaGlzdG9yeS9lcy9jcmVhdGVNZW1vcnlIaXN0b3J5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9oaXN0b3J5L2VzL2NyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9oaXN0b3J5L2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ob2lzdC1ub24tcmVhY3Qtc3RhdGljcy9kaXN0L2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzLmNqcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW52YXJpYW50L2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhdGgtdG8tcmVnZXhwL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXItZG9tL2VzL0Jyb3dzZXJSb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1kb20vZXMvSGFzaFJvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyLWRvbS9lcy9MaW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXItZG9tL2VzL01lbW9yeVJvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyLWRvbS9lcy9OYXZMaW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXItZG9tL2VzL1Byb21wdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyLWRvbS9lcy9SZWRpcmVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyLWRvbS9lcy9Sb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyLWRvbS9lcy9Sb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1kb20vZXMvU3RhdGljUm91dGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXItZG9tL2VzL1N3aXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyLWRvbS9lcy9nZW5lcmF0ZVBhdGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1kb20vZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1kb20vZXMvbWF0Y2hQYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXItZG9tL2VzL3dpdGhSb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1kb20vbm9kZV9tb2R1bGVzL3dhcm5pbmcvd2FybmluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2VzL01lbW9yeVJvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2VzL1Byb21wdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2VzL1JlZGlyZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvZXMvUm91dGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9lcy9Sb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9lcy9TdGF0aWNSb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9lcy9Td2l0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9lcy9nZW5lcmF0ZVBhdGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2VzL21hdGNoUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL2VzL3dpdGhSb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9ub2RlX21vZHVsZXMvd2FybmluZy93YXJuaW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXBhdGhuYW1lL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YWx1ZS1lcXVhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2FybmluZy9icm93c2VyLmpzIl0sIm5hbWVzIjpbImNhblVzZURPTSIsIndpbmRvdyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJub2RlIiwiZXZlbnQiLCJsaXN0ZW5lciIsImF0dGFjaEV2ZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRldGFjaEV2ZW50IiwiZ2V0Q29uZmlybWF0aW9uIiwibWVzc2FnZSIsImNhbGxiYWNrIiwiY29uZmlybSIsInN1cHBvcnRzSGlzdG9yeSIsInVhIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiaW5kZXhPZiIsImhpc3RvcnkiLCJzdXBwb3J0c1BvcFN0YXRlT25IYXNoQ2hhbmdlIiwic3VwcG9ydHNHb1dpdGhvdXRSZWxvYWRVc2luZ0hhc2giLCJpc0V4dHJhbmVvdXNQb3BzdGF0ZUV2ZW50Iiwic3RhdGUiLCJ1bmRlZmluZWQiLCJfZXh0ZW5kcyIsIk9iamVjdCIsImFzc2lnbiIsInRhcmdldCIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzb3VyY2UiLCJrZXkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJjcmVhdGVMb2NhdGlvbiIsInBhdGgiLCJjdXJyZW50TG9jYXRpb24iLCJsb2NhdGlvbiIsInBhcnNlUGF0aCIsInBhdGhuYW1lIiwic2VhcmNoIiwiY2hhckF0IiwiaGFzaCIsImRlY29kZVVSSSIsImUiLCJVUklFcnJvciIsInJlc29sdmVQYXRobmFtZSIsImxvY2F0aW9uc0FyZUVxdWFsIiwiYSIsImIiLCJ2YWx1ZUVxdWFsIiwiYWRkTGVhZGluZ1NsYXNoIiwic3RyaXBMZWFkaW5nU2xhc2giLCJzdWJzdHIiLCJoYXNCYXNlbmFtZSIsInByZWZpeCIsIlJlZ0V4cCIsInRlc3QiLCJzdHJpcEJhc2VuYW1lIiwic3RyaXBUcmFpbGluZ1NsYXNoIiwic2xpY2UiLCJoYXNoSW5kZXgiLCJzZWFyY2hJbmRleCIsImNyZWF0ZVBhdGgiLCJfdHlwZW9mIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJvYmoiLCJjb25zdHJ1Y3RvciIsIlBvcFN0YXRlRXZlbnQiLCJIYXNoQ2hhbmdlRXZlbnQiLCJnZXRIaXN0b3J5U3RhdGUiLCJjcmVhdGVCcm93c2VySGlzdG9yeSIsInByb3BzIiwiaW52YXJpYW50IiwiZ2xvYmFsSGlzdG9yeSIsImNhblVzZUhpc3RvcnkiLCJuZWVkc0hhc2hDaGFuZ2VMaXN0ZW5lciIsIl9wcm9wcyRmb3JjZVJlZnJlc2giLCJmb3JjZVJlZnJlc2giLCJfcHJvcHMkZ2V0VXNlckNvbmZpcm0iLCJnZXRVc2VyQ29uZmlybWF0aW9uIiwiX3Byb3BzJGtleUxlbmd0aCIsImtleUxlbmd0aCIsImJhc2VuYW1lIiwiZ2V0RE9NTG9jYXRpb24iLCJoaXN0b3J5U3RhdGUiLCJfcmVmIiwiX3dpbmRvdyRsb2NhdGlvbiIsIndhcm5pbmciLCJjcmVhdGVLZXkiLCJNYXRoIiwicmFuZG9tIiwidG9TdHJpbmciLCJ0cmFuc2l0aW9uTWFuYWdlciIsImNyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyIiwic2V0U3RhdGUiLCJuZXh0U3RhdGUiLCJub3RpZnlMaXN0ZW5lcnMiLCJhY3Rpb24iLCJoYW5kbGVQb3BTdGF0ZSIsImhhbmRsZVBvcCIsImhhbmRsZUhhc2hDaGFuZ2UiLCJmb3JjZU5leHRQb3AiLCJjb25maXJtVHJhbnNpdGlvblRvIiwib2siLCJyZXZlcnRQb3AiLCJmcm9tTG9jYXRpb24iLCJ0b0xvY2F0aW9uIiwidG9JbmRleCIsImFsbEtleXMiLCJmcm9tSW5kZXgiLCJkZWx0YSIsImdvIiwiaW5pdGlhbExvY2F0aW9uIiwiY3JlYXRlSHJlZiIsInB1c2giLCJocmVmIiwicHVzaFN0YXRlIiwicHJldkluZGV4IiwibmV4dEtleXMiLCJyZXBsYWNlIiwicmVwbGFjZVN0YXRlIiwibiIsImdvQmFjayIsImdvRm9yd2FyZCIsImxpc3RlbmVyQ291bnQiLCJjaGVja0RPTUxpc3RlbmVycyIsImlzQmxvY2tlZCIsImJsb2NrIiwicHJvbXB0IiwidW5ibG9jayIsInNldFByb21wdCIsImxpc3RlbiIsInVubGlzdGVuIiwiYXBwZW5kTGlzdGVuZXIiLCJIYXNoUGF0aENvZGVycyIsImhhc2hiYW5nIiwiZW5jb2RlUGF0aCIsImRlY29kZVBhdGgiLCJub3NsYXNoIiwic2xhc2giLCJnZXRIYXNoUGF0aCIsInN1YnN0cmluZyIsInB1c2hIYXNoUGF0aCIsInJlcGxhY2VIYXNoUGF0aCIsImNyZWF0ZUhhc2hIaXN0b3J5IiwiY2FuR29XaXRob3V0UmVsb2FkIiwiX3Byb3BzJGhhc2hUeXBlIiwiaGFzaFR5cGUiLCJfSGFzaFBhdGhDb2RlcnMkaGFzaFQiLCJpZ25vcmVQYXRoIiwiZW5jb2RlZFBhdGgiLCJwcmV2TG9jYXRpb24iLCJhbGxQYXRocyIsImxhc3RJbmRleE9mIiwiaGFzaENoYW5nZWQiLCJuZXh0UGF0aHMiLCJjbGFtcCIsImxvd2VyQm91bmQiLCJ1cHBlckJvdW5kIiwibWluIiwibWF4IiwiY3JlYXRlTWVtb3J5SGlzdG9yeSIsIl9wcm9wcyRpbml0aWFsRW50cmllcyIsImluaXRpYWxFbnRyaWVzIiwiX3Byb3BzJGluaXRpYWxJbmRleCIsImluaXRpYWxJbmRleCIsImVudHJpZXMiLCJpbmRleCIsIm1hcCIsImVudHJ5IiwibmV4dEluZGV4IiwibmV4dEVudHJpZXMiLCJzcGxpY2UiLCJjYW5HbyIsIm5leHRQcm9tcHQiLCJyZXN1bHQiLCJsaXN0ZW5lcnMiLCJmbiIsImlzQWN0aXZlIiwiYXBwbHkiLCJmaWx0ZXIiLCJpdGVtIiwiX2xlbiIsImFyZ3MiLCJBcnJheSIsIl9rZXkiLCJmb3JFYWNoIiwiUkVBQ1RfU1RBVElDUyIsImNoaWxkQ29udGV4dFR5cGVzIiwiY29udGV4dFR5cGVzIiwiZGVmYXVsdFByb3BzIiwiZGlzcGxheU5hbWUiLCJnZXREZWZhdWx0UHJvcHMiLCJnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMiLCJtaXhpbnMiLCJwcm9wVHlwZXMiLCJ0eXBlIiwiS05PV05fU1RBVElDUyIsIm5hbWUiLCJjYWxsZXIiLCJjYWxsZWUiLCJhcml0eSIsImRlZmluZVByb3BlcnR5IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImdldE93blByb3BlcnR5U3ltYm9scyIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImdldFByb3RvdHlwZU9mIiwib2JqZWN0UHJvdG90eXBlIiwiaG9pc3ROb25SZWFjdFN0YXRpY3MiLCJ0YXJnZXRDb21wb25lbnQiLCJzb3VyY2VDb21wb25lbnQiLCJibGFja2xpc3QiLCJpbmhlcml0ZWRDb21wb25lbnQiLCJrZXlzIiwiY29uY2F0IiwiZGVzY3JpcHRvciIsIm1vZHVsZSIsImV4cG9ydHMiLCJjb25kaXRpb24iLCJmb3JtYXQiLCJjIiwiZCIsImYiLCJwcm9jZXNzIiwiRXJyb3IiLCJlcnJvciIsImFyZ0luZGV4IiwiZnJhbWVzVG9Qb3AiLCJpc0FycmF5IiwiYXJyIiwiaXNhcnJheSIsInJlcXVpcmUiLCJwYXRoVG9SZWdleHAiLCJwYXJzZSIsImNvbXBpbGUiLCJ0b2tlbnNUb0Z1bmN0aW9uIiwidG9rZW5zVG9SZWdFeHAiLCJQQVRIX1JFR0VYUCIsImpvaW4iLCJzdHIiLCJvcHRpb25zIiwidG9rZW5zIiwiZGVmYXVsdERlbGltaXRlciIsImRlbGltaXRlciIsInJlcyIsImV4ZWMiLCJtIiwiZXNjYXBlZCIsIm9mZnNldCIsIm5leHQiLCJjYXB0dXJlIiwiZ3JvdXAiLCJtb2RpZmllciIsImFzdGVyaXNrIiwicGFydGlhbCIsInJlcGVhdCIsIm9wdGlvbmFsIiwicGF0dGVybiIsImVzY2FwZUdyb3VwIiwiZXNjYXBlU3RyaW5nIiwiZW5jb2RlVVJJQ29tcG9uZW50UHJldHR5IiwiZW5jb2RlVVJJIiwiY2hhckNvZGVBdCIsInRvVXBwZXJDYXNlIiwiZW5jb2RlQXN0ZXJpc2siLCJtYXRjaGVzIiwib3B0cyIsImRhdGEiLCJlbmNvZGUiLCJwcmV0dHkiLCJlbmNvZGVVUklDb21wb25lbnQiLCJ0b2tlbiIsInZhbHVlIiwic2VnbWVudCIsIlR5cGVFcnJvciIsIkpTT04iLCJzdHJpbmdpZnkiLCJqIiwiYXR0YWNoS2V5cyIsInJlIiwiZmxhZ3MiLCJzZW5zaXRpdmUiLCJyZWdleHBUb1JlZ2V4cCIsImdyb3VwcyIsIm1hdGNoIiwiYXJyYXlUb1JlZ2V4cCIsInBhcnRzIiwicmVnZXhwIiwic3RyaW5nVG9SZWdleHAiLCJzdHJpY3QiLCJlbmQiLCJyb3V0ZSIsImVuZHNXaXRoRGVsaW1pdGVyIiwiUmVhY3RQcm9wVHlwZXNTZWNyZXQiLCJjaGVja1Byb3BUeXBlcyIsInByaW50V2FybmluZyIsInRleHQiLCJjb25zb2xlIiwieCIsImVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGwiLCJpc1ZhbGlkRWxlbWVudCIsInRocm93T25EaXJlY3RBY2Nlc3MiLCJJVEVSQVRPUl9TWU1CT0wiLCJGQVVYX0lURVJBVE9SX1NZTUJPTCIsImdldEl0ZXJhdG9yRm4iLCJtYXliZUl0ZXJhYmxlIiwiaXRlcmF0b3JGbiIsIkFOT05ZTU9VUyIsIlJlYWN0UHJvcFR5cGVzIiwiYXJyYXkiLCJjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlciIsImJvb2wiLCJmdW5jIiwibnVtYmVyIiwib2JqZWN0Iiwic3RyaW5nIiwic3ltYm9sIiwiYW55IiwiY3JlYXRlQW55VHlwZUNoZWNrZXIiLCJhcnJheU9mIiwiY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyIiwiZWxlbWVudCIsImNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlciIsImluc3RhbmNlT2YiLCJjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyIiwiY3JlYXRlTm9kZUNoZWNrZXIiLCJvYmplY3RPZiIsImNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIiLCJvbmVPZiIsImNyZWF0ZUVudW1UeXBlQ2hlY2tlciIsIm9uZU9mVHlwZSIsImNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIiLCJzaGFwZSIsImNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIiLCJleGFjdCIsImNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIiLCJpcyIsInkiLCJQcm9wVHlwZUVycm9yIiwic3RhY2siLCJjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlciIsInZhbGlkYXRlIiwibWFudWFsUHJvcFR5cGVDYWxsQ2FjaGUiLCJtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCIsImNoZWNrVHlwZSIsImlzUmVxdWlyZWQiLCJwcm9wTmFtZSIsImNvbXBvbmVudE5hbWUiLCJwcm9wRnVsbE5hbWUiLCJzZWNyZXQiLCJlcnIiLCJjYWNoZUtleSIsImNoYWluZWRDaGVja1R5cGUiLCJiaW5kIiwiZXhwZWN0ZWRUeXBlIiwicHJvcFZhbHVlIiwicHJvcFR5cGUiLCJnZXRQcm9wVHlwZSIsInByZWNpc2VUeXBlIiwiZ2V0UHJlY2lzZVR5cGUiLCJ0eXBlQ2hlY2tlciIsImV4cGVjdGVkQ2xhc3MiLCJleHBlY3RlZENsYXNzTmFtZSIsImFjdHVhbENsYXNzTmFtZSIsImdldENsYXNzTmFtZSIsImV4cGVjdGVkVmFsdWVzIiwidmFsdWVzU3RyaW5nIiwiYXJyYXlPZlR5cGVDaGVja2VycyIsImNoZWNrZXIiLCJnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmciLCJpc05vZGUiLCJzaGFwZVR5cGVzIiwiZXZlcnkiLCJzdGVwIiwiZG9uZSIsImlzU3ltYm9sIiwiRGF0ZSIsIlByb3BUeXBlcyIsIlJFQUNUX0VMRU1FTlRfVFlQRSIsImZvciIsIiQkdHlwZW9mIiwiX2NsYXNzQ2FsbENoZWNrIiwiaW5zdGFuY2UiLCJDb25zdHJ1Y3RvciIsIl9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuIiwic2VsZiIsIlJlZmVyZW5jZUVycm9yIiwiX2luaGVyaXRzIiwic3ViQ2xhc3MiLCJzdXBlckNsYXNzIiwiY3JlYXRlIiwiZW51bWVyYWJsZSIsIndyaXRhYmxlIiwiY29uZmlndXJhYmxlIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJCcm93c2VyUm91dGVyIiwiX1JlYWN0JENvbXBvbmVudCIsIl90ZW1wIiwiX3RoaXMiLCJfcmV0IiwiY3JlYXRlSGlzdG9yeSIsImNvbXBvbmVudFdpbGxNb3VudCIsInJlbmRlciIsIlJlYWN0IiwiUm91dGVyIiwiY2hpbGRyZW4iLCJDb21wb25lbnQiLCJIYXNoUm91dGVyIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwiaXNNb2RpZmllZEV2ZW50IiwibWV0YUtleSIsImFsdEtleSIsImN0cmxLZXkiLCJzaGlmdEtleSIsIkxpbmsiLCJoYW5kbGVDbGljayIsIm9uQ2xpY2siLCJkZWZhdWx0UHJldmVudGVkIiwiYnV0dG9uIiwicHJldmVudERlZmF1bHQiLCJjb250ZXh0Iiwicm91dGVyIiwiX3RoaXMkcHJvcHMiLCJ0byIsIl9wcm9wcyIsImlubmVyUmVmIiwicmVmIiwiTWVtb3J5Um91dGVyIiwiTmF2TGluayIsImFjdGl2ZUNsYXNzTmFtZSIsImNsYXNzTmFtZSIsImFjdGl2ZVN0eWxlIiwic3R5bGUiLCJnZXRJc0FjdGl2ZSIsImFyaWFDdXJyZW50IiwicmVzdCIsImVzY2FwZWRQYXRoIiwiUm91dGUiLCJfcmVmMiIsIlByb21wdCIsIlJlZGlyZWN0IiwiU3RhdGljUm91dGVyIiwiU3dpdGNoIiwiZ2VuZXJhdGVQYXRoIiwibWF0Y2hQYXRoIiwid2l0aFJvdXRlciIsIl9fREVWX18iLCJsZW4iLCJlbmFibGUiLCJkaXNhYmxlIiwid2hlbiIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImlzU3RhdGljIiwic3RhdGljQ29udGV4dCIsInBlcmZvcm0iLCJjb21wb25lbnREaWRNb3VudCIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByZXZQcm9wcyIsInByZXZUbyIsIm5leHRUbyIsImNvbXB1dGVUbyIsImNvbXB1dGVkTWF0Y2giLCJwYXJhbXMiLCJmcm9tIiwiaXNFbXB0eUNoaWxkcmVuIiwiQ2hpbGRyZW4iLCJjb3VudCIsImNvbXB1dGVNYXRjaCIsImdldENoaWxkQ29udGV4dCIsImNvbXBvbmVudCIsIm5leHRDb250ZXh0IiwiX2NvbnRleHQkcm91dGVyIiwib25seSIsInVybCIsImlzRXhhY3QiLCJfdGhpczIiLCJhZGRCYXNlbmFtZSIsImJhc2UiLCJjcmVhdGVVUkwiLCJzdGF0aWNIYW5kbGVyIiwibWV0aG9kTmFtZSIsIm5vb3AiLCJoYW5kbGVQdXNoIiwiaGFuZGxlUmVwbGFjZSIsIl90aGlzJHByb3BzMiIsImhhbmRsZUxpc3RlbiIsImhhbmRsZUJsb2NrIiwiY2hpbGQiLCJfZWxlbWVudCRwcm9wcyIsInBhdGhQcm9wIiwiY2xvbmVFbGVtZW50IiwicGF0dGVybkNhY2hlIiwiY2FjaGVMaW1pdCIsImNhY2hlQ291bnQiLCJjb21waWxlR2VuZXJhdG9yIiwiY2FjaGUiLCJjb21waWxlZEdlbmVyYXRvciIsImdlbmVyYXRvciIsImNvbXBpbGVQYXRoIiwiY29tcGlsZWRQYXR0ZXJuIiwicGFyZW50IiwiX29wdGlvbnMiLCJfb3B0aW9ucyRleGFjdCIsIl9vcHRpb25zJHN0cmljdCIsIl9vcHRpb25zJHNlbnNpdGl2ZSIsIl9jb21waWxlUGF0aCIsInZhbHVlcyIsInJlZHVjZSIsIm1lbW8iLCJDIiwid3JhcHBlZENvbXBvbmVudFJlZiIsInJlbWFpbmluZ1Byb3BzIiwicm91dGVDb21wb25lbnRQcm9wcyIsIldyYXBwZWRDb21wb25lbnQiLCJob2lzdFN0YXRpY3MiLCJpc0Fic29sdXRlIiwic3BsaWNlT25lIiwibGlzdCIsImsiLCJwb3AiLCJ0b1BhcnRzIiwic3BsaXQiLCJmcm9tUGFydHMiLCJpc1RvQWJzIiwiaXNGcm9tQWJzIiwibXVzdEVuZEFicyIsImhhc1RyYWlsaW5nU2xhc2giLCJsYXN0IiwidXAiLCJwYXJ0IiwidW5zaGlmdCIsImFUeXBlIiwiYlR5cGUiLCJhVmFsdWUiLCJ2YWx1ZU9mIiwiYlZhbHVlIiwiYUtleXMiLCJiS2V5cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFPLElBQUlBLFlBQVksQ0FBQyxFQUFFLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsSUFBaUNBLE9BQU9DLFFBQXhDLElBQW9ERCxPQUFPQyxRQUFQLENBQWdCQyxhQUF0RSxDQUFqQjs7QUFFQSxJQUFJQyxtQkFBbUIsU0FBU0EsZ0JBQVQsQ0FBMEJDLElBQTFCLEVBQWdDQyxLQUFoQyxFQUF1Q0MsUUFB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QW9CLENBQTlCLENBQVA7QUFDQSxTQUFLLElBQUlwYSxNQUFNLENBQWYsRUFBa0JBLE1BQU1vYSxHQUF4QixFQUE2QnBhLEtBQTdCLEVBQW9DO0FBQ2xDMkosV0FBSzNKLE1BQU0sQ0FBWCxJQUFnQkgsVUFBVUcsR0FBVixDQUFoQjtBQUNEO0FBQ0QsUUFBSStMLFdBQVd4TSxTQUFmLEVBQTBCO0FBQ3hCLFlBQU0sSUFBSTZNLEtBQUosQ0FDSiw4REFDQSxrQkFGSSxDQUFOO0FBSUQ7O0FBRUQsUUFBSUwsT0FBT2pNLE1BQVAsR0FBZ0IsRUFBaEIsSUFBdUIsVUFBRCxDQUFhNkIsSUFBYixDQUFrQm9LLE1BQWxCLENBQTFCLEVBQXFEO0FBQ25ELFlBQU0sSUFBSUssS0FBSixDQUNKLGlFQUNBLHVEQURBLEdBQzBETCxNQUZ0RCxDQUFOO0FBSUQ7O0FBRUQsUUFBSSxDQUFDRCxTQUFMLEVBQWdCO0FBQ2QsVUFBSVEsV0FBVyxDQUFmO0FBQ0EsVUFBSTVOLFVBQVUsY0FDWnFOLE9BQU9wRyxPQUFQLENBQWUsS0FBZixFQUFzQixZQUFXO0FBQy9CLGVBQU9nRSxLQUFLMkMsVUFBTCxDQUFQO0FBQ0QsT0FGRCxDQURGO0FBSUEsVUFBSSxPQUFPdUUsT0FBUCxLQUFtQixXQUF2QixFQUFvQztBQUNsQ0EsZ0JBQVF4RSxLQUFSLENBQWMzTixPQUFkO0FBQ0Q7QUFDRCxVQUFJO0FBQ0Y7QUFDQTtBQUNBLGNBQU0sSUFBSTBOLEtBQUosQ0FBVTFOLE9BQVYsQ0FBTjtBQUNELE9BSkQsQ0FJRSxPQUFNb1MsQ0FBTixFQUFTLENBQUU7QUFDZDtBQUNGLEdBbkNEO0FBb0NEOztBQUVEbEYsT0FBT0MsT0FBUCxHQUFpQmxJLE9BQWpCLEMiLCJmaWxlIjoidmVuZG9yc35tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHZhciBjYW5Vc2VET00gPSAhISh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuXG5leHBvcnQgdmFyIGFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyKG5vZGUsIGV2ZW50LCBsaXN0ZW5lcikge1xuICByZXR1cm4gbm9kZS5hZGRFdmVudExpc3RlbmVyID8gbm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lciwgZmFsc2UpIDogbm9kZS5hdHRhY2hFdmVudCgnb24nICsgZXZlbnQsIGxpc3RlbmVyKTtcbn07XG5cbmV4cG9ydCB2YXIgcmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXIobm9kZSwgZXZlbnQsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPyBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyLCBmYWxzZSkgOiBub2RlLmRldGFjaEV2ZW50KCdvbicgKyBldmVudCwgbGlzdGVuZXIpO1xufTtcblxuZXhwb3J0IHZhciBnZXRDb25maXJtYXRpb24gPSBmdW5jdGlvbiBnZXRDb25maXJtYXRpb24obWVzc2FnZSwgY2FsbGJhY2spIHtcbiAgcmV0dXJuIGNhbGxiYWNrKHdpbmRvdy5jb25maXJtKG1lc3NhZ2UpKTtcbn07IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIEhUTUw1IGhpc3RvcnkgQVBJIGlzIHN1cHBvcnRlZC4gVGFrZW4gZnJvbSBNb2Rlcm5penIuXG4gKlxuICogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL2hpc3RvcnkuanNcbiAqIGNoYW5nZWQgdG8gYXZvaWQgZmFsc2UgbmVnYXRpdmVzIGZvciBXaW5kb3dzIFBob25lczogaHR0cHM6Ly9naXRodWIuY29tL3JlYWN0anMvcmVhY3Qtcm91dGVyL2lzc3Vlcy81ODZcbiAqL1xuZXhwb3J0IHZhciBzdXBwb3J0c0hpc3RvcnkgPSBmdW5jdGlvbiBzdXBwb3J0c0hpc3RvcnkoKSB7XG4gIHZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuXG4gIGlmICgodWEuaW5kZXhPZignQW5kcm9pZCAyLicpICE9PSAtMSB8fCB1YS5pbmRleE9mKCdBbmRyb2lkIDQuMCcpICE9PSAtMSkgJiYgdWEuaW5kZXhPZignTW9iaWxlIFNhZmFyaScpICE9PSAtMSAmJiB1YS5pbmRleE9mKCdDaHJvbWUnKSA9PT0gLTEgJiYgdWEuaW5kZXhPZignV2luZG93cyBQaG9uZScpID09PSAtMSkgcmV0dXJuIGZhbHNlO1xuXG4gIHJldHVybiB3aW5kb3cuaGlzdG9yeSAmJiAncHVzaFN0YXRlJyBpbiB3aW5kb3cuaGlzdG9yeTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGJyb3dzZXIgZmlyZXMgcG9wc3RhdGUgb24gaGFzaCBjaGFuZ2UuXG4gKiBJRTEwIGFuZCBJRTExIGRvIG5vdC5cbiAqL1xuZXhwb3J0IHZhciBzdXBwb3J0c1BvcFN0YXRlT25IYXNoQ2hhbmdlID0gZnVuY3Rpb24gc3VwcG9ydHNQb3BTdGF0ZU9uSGFzaENoYW5nZSgpIHtcbiAgcmV0dXJuIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ1RyaWRlbnQnKSA9PT0gLTE7XG59O1xuXG4vKipcbiAqIFJldHVybnMgZmFsc2UgaWYgdXNpbmcgZ28obikgd2l0aCBoYXNoIGhpc3RvcnkgY2F1c2VzIGEgZnVsbCBwYWdlIHJlbG9hZC5cbiAqL1xuZXhwb3J0IHZhciBzdXBwb3J0c0dvV2l0aG91dFJlbG9hZFVzaW5nSGFzaCA9IGZ1bmN0aW9uIHN1cHBvcnRzR29XaXRob3V0UmVsb2FkVXNpbmdIYXNoKCkge1xuICByZXR1cm4gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignRmlyZWZveCcpID09PSAtMTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGEgZ2l2ZW4gcG9wc3RhdGUgZXZlbnQgaXMgYW4gZXh0cmFuZW91cyBXZWJLaXQgZXZlbnQuXG4gKiBBY2NvdW50cyBmb3IgdGhlIGZhY3QgdGhhdCBDaHJvbWUgb24gaU9TIGZpcmVzIHJlYWwgcG9wc3RhdGUgZXZlbnRzXG4gKiBjb250YWluaW5nIHVuZGVmaW5lZCBzdGF0ZSB3aGVuIHByZXNzaW5nIHRoZSBiYWNrIGJ1dHRvbi5cbiAqL1xuZXhwb3J0IHZhciBpc0V4dHJhbmVvdXNQb3BzdGF0ZUV2ZW50ID0gZnVuY3Rpb24gaXNFeHRyYW5lb3VzUG9wc3RhdGVFdmVudChldmVudCkge1xuICByZXR1cm4gZXZlbnQuc3RhdGUgPT09IHVuZGVmaW5lZCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0NyaU9TJykgPT09IC0xO1xufTsiLCJ2YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5pbXBvcnQgcmVzb2x2ZVBhdGhuYW1lIGZyb20gJ3Jlc29sdmUtcGF0aG5hbWUnO1xuaW1wb3J0IHZhbHVlRXF1YWwgZnJvbSAndmFsdWUtZXF1YWwnO1xuaW1wb3J0IHsgcGFyc2VQYXRoIH0gZnJvbSAnLi9QYXRoVXRpbHMnO1xuXG5leHBvcnQgdmFyIGNyZWF0ZUxvY2F0aW9uID0gZnVuY3Rpb24gY3JlYXRlTG9jYXRpb24ocGF0aCwgc3RhdGUsIGtleSwgY3VycmVudExvY2F0aW9uKSB7XG4gIHZhciBsb2NhdGlvbiA9IHZvaWQgMDtcbiAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuICAgIC8vIFR3by1hcmcgZm9ybTogcHVzaChwYXRoLCBzdGF0ZSlcbiAgICBsb2NhdGlvbiA9IHBhcnNlUGF0aChwYXRoKTtcbiAgICBsb2NhdGlvbi5zdGF0ZSA9IHN0YXRlO1xuICB9IGVsc2Uge1xuICAgIC8vIE9uZS1hcmcgZm9ybTogcHVzaChsb2NhdGlvbilcbiAgICBsb2NhdGlvbiA9IF9leHRlbmRzKHt9LCBwYXRoKTtcblxuICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZSA9PT0gdW5kZWZpbmVkKSBsb2NhdGlvbi5wYXRobmFtZSA9ICcnO1xuXG4gICAgaWYgKGxvY2F0aW9uLnNlYXJjaCkge1xuICAgICAgaWYgKGxvY2F0aW9uLnNlYXJjaC5jaGFyQXQoMCkgIT09ICc/JykgbG9jYXRpb24uc2VhcmNoID0gJz8nICsgbG9jYXRpb24uc2VhcmNoO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhdGlvbi5zZWFyY2ggPSAnJztcbiAgICB9XG5cbiAgICBpZiAobG9jYXRpb24uaGFzaCkge1xuICAgICAgaWYgKGxvY2F0aW9uLmhhc2guY2hhckF0KDApICE9PSAnIycpIGxvY2F0aW9uLmhhc2ggPSAnIycgKyBsb2NhdGlvbi5oYXNoO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhdGlvbi5oYXNoID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKHN0YXRlICE9PSB1bmRlZmluZWQgJiYgbG9jYXRpb24uc3RhdGUgPT09IHVuZGVmaW5lZCkgbG9jYXRpb24uc3RhdGUgPSBzdGF0ZTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgbG9jYXRpb24ucGF0aG5hbWUgPSBkZWNvZGVVUkkobG9jYXRpb24ucGF0aG5hbWUpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGUgaW5zdGFuY2VvZiBVUklFcnJvcikge1xuICAgICAgdGhyb3cgbmV3IFVSSUVycm9yKCdQYXRobmFtZSBcIicgKyBsb2NhdGlvbi5wYXRobmFtZSArICdcIiBjb3VsZCBub3QgYmUgZGVjb2RlZC4gJyArICdUaGlzIGlzIGxpa2VseSBjYXVzZWQgYnkgYW4gaW52YWxpZCBwZXJjZW50LWVuY29kaW5nLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuXG4gIGlmIChrZXkpIGxvY2F0aW9uLmtleSA9IGtleTtcblxuICBpZiAoY3VycmVudExvY2F0aW9uKSB7XG4gICAgLy8gUmVzb2x2ZSBpbmNvbXBsZXRlL3JlbGF0aXZlIHBhdGhuYW1lIHJlbGF0aXZlIHRvIGN1cnJlbnQgbG9jYXRpb24uXG4gICAgaWYgKCFsb2NhdGlvbi5wYXRobmFtZSkge1xuICAgICAgbG9jYXRpb24ucGF0aG5hbWUgPSBjdXJyZW50TG9jYXRpb24ucGF0aG5hbWU7XG4gICAgfSBlbHNlIGlmIChsb2NhdGlvbi5wYXRobmFtZS5jaGFyQXQoMCkgIT09ICcvJykge1xuICAgICAgbG9jYXRpb24ucGF0aG5hbWUgPSByZXNvbHZlUGF0aG5hbWUobG9jYXRpb24ucGF0aG5hbWUsIGN1cnJlbnRMb2NhdGlvbi5wYXRobmFtZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIFdoZW4gdGhlcmUgaXMgbm8gcHJpb3IgbG9jYXRpb24gYW5kIHBhdGhuYW1lIGlzIGVtcHR5LCBzZXQgaXQgdG8gL1xuICAgIGlmICghbG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gJy8nO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBsb2NhdGlvbjtcbn07XG5cbmV4cG9ydCB2YXIgbG9jYXRpb25zQXJlRXF1YWwgPSBmdW5jdGlvbiBsb2NhdGlvbnNBcmVFcXVhbChhLCBiKSB7XG4gIHJldHVybiBhLnBhdGhuYW1lID09PSBiLnBhdGhuYW1lICYmIGEuc2VhcmNoID09PSBiLnNlYXJjaCAmJiBhLmhhc2ggPT09IGIuaGFzaCAmJiBhLmtleSA9PT0gYi5rZXkgJiYgdmFsdWVFcXVhbChhLnN0YXRlLCBiLnN0YXRlKTtcbn07IiwiZXhwb3J0IHZhciBhZGRMZWFkaW5nU2xhc2ggPSBmdW5jdGlvbiBhZGRMZWFkaW5nU2xhc2gocGF0aCkge1xuICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICcvJyA/IHBhdGggOiAnLycgKyBwYXRoO1xufTtcblxuZXhwb3J0IHZhciBzdHJpcExlYWRpbmdTbGFzaCA9IGZ1bmN0aW9uIHN0cmlwTGVhZGluZ1NsYXNoKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnLycgPyBwYXRoLnN1YnN0cigxKSA6IHBhdGg7XG59O1xuXG5leHBvcnQgdmFyIGhhc0Jhc2VuYW1lID0gZnVuY3Rpb24gaGFzQmFzZW5hbWUocGF0aCwgcHJlZml4KSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKCdeJyArIHByZWZpeCArICcoXFxcXC98XFxcXD98I3wkKScsICdpJykudGVzdChwYXRoKTtcbn07XG5cbmV4cG9ydCB2YXIgc3RyaXBCYXNlbmFtZSA9IGZ1bmN0aW9uIHN0cmlwQmFzZW5hbWUocGF0aCwgcHJlZml4KSB7XG4gIHJldHVybiBoYXNCYXNlbmFtZShwYXRoLCBwcmVmaXgpID8gcGF0aC5zdWJzdHIocHJlZml4Lmxlbmd0aCkgOiBwYXRoO1xufTtcblxuZXhwb3J0IHZhciBzdHJpcFRyYWlsaW5nU2xhc2ggPSBmdW5jdGlvbiBzdHJpcFRyYWlsaW5nU2xhc2gocGF0aCkge1xuICByZXR1cm4gcGF0aC5jaGFyQXQocGF0aC5sZW5ndGggLSAxKSA9PT0gJy8nID8gcGF0aC5zbGljZSgwLCAtMSkgOiBwYXRoO1xufTtcblxuZXhwb3J0IHZhciBwYXJzZVBhdGggPSBmdW5jdGlvbiBwYXJzZVBhdGgocGF0aCkge1xuICB2YXIgcGF0aG5hbWUgPSBwYXRoIHx8ICcvJztcbiAgdmFyIHNlYXJjaCA9ICcnO1xuICB2YXIgaGFzaCA9ICcnO1xuXG4gIHZhciBoYXNoSW5kZXggPSBwYXRobmFtZS5pbmRleE9mKCcjJyk7XG4gIGlmIChoYXNoSW5kZXggIT09IC0xKSB7XG4gICAgaGFzaCA9IHBhdGhuYW1lLnN1YnN0cihoYXNoSW5kZXgpO1xuICAgIHBhdGhuYW1lID0gcGF0aG5hbWUuc3Vic3RyKDAsIGhhc2hJbmRleCk7XG4gIH1cblxuICB2YXIgc2VhcmNoSW5kZXggPSBwYXRobmFtZS5pbmRleE9mKCc/Jyk7XG4gIGlmIChzZWFyY2hJbmRleCAhPT0gLTEpIHtcbiAgICBzZWFyY2ggPSBwYXRobmFtZS5zdWJzdHIoc2VhcmNoSW5kZXgpO1xuICAgIHBhdGhuYW1lID0gcGF0aG5hbWUuc3Vic3RyKDAsIHNlYXJjaEluZGV4KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcGF0aG5hbWU6IHBhdGhuYW1lLFxuICAgIHNlYXJjaDogc2VhcmNoID09PSAnPycgPyAnJyA6IHNlYXJjaCxcbiAgICBoYXNoOiBoYXNoID09PSAnIycgPyAnJyA6IGhhc2hcbiAgfTtcbn07XG5cbmV4cG9ydCB2YXIgY3JlYXRlUGF0aCA9IGZ1bmN0aW9uIGNyZWF0ZVBhdGgobG9jYXRpb24pIHtcbiAgdmFyIHBhdGhuYW1lID0gbG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICBzZWFyY2ggPSBsb2NhdGlvbi5zZWFyY2gsXG4gICAgICBoYXNoID0gbG9jYXRpb24uaGFzaDtcblxuXG4gIHZhciBwYXRoID0gcGF0aG5hbWUgfHwgJy8nO1xuXG4gIGlmIChzZWFyY2ggJiYgc2VhcmNoICE9PSAnPycpIHBhdGggKz0gc2VhcmNoLmNoYXJBdCgwKSA9PT0gJz8nID8gc2VhcmNoIDogJz8nICsgc2VhcmNoO1xuXG4gIGlmIChoYXNoICYmIGhhc2ggIT09ICcjJykgcGF0aCArPSBoYXNoLmNoYXJBdCgwKSA9PT0gJyMnID8gaGFzaCA6ICcjJyArIGhhc2g7XG5cbiAgcmV0dXJuIHBhdGg7XG59OyIsInZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuaW1wb3J0IHdhcm5pbmcgZnJvbSAnd2FybmluZyc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCc7XG5pbXBvcnQgeyBjcmVhdGVMb2NhdGlvbiB9IGZyb20gJy4vTG9jYXRpb25VdGlscyc7XG5pbXBvcnQgeyBhZGRMZWFkaW5nU2xhc2gsIHN0cmlwVHJhaWxpbmdTbGFzaCwgaGFzQmFzZW5hbWUsIHN0cmlwQmFzZW5hbWUsIGNyZWF0ZVBhdGggfSBmcm9tICcuL1BhdGhVdGlscyc7XG5pbXBvcnQgY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIgZnJvbSAnLi9jcmVhdGVUcmFuc2l0aW9uTWFuYWdlcic7XG5pbXBvcnQgeyBjYW5Vc2VET00sIGFkZEV2ZW50TGlzdGVuZXIsIHJlbW92ZUV2ZW50TGlzdGVuZXIsIGdldENvbmZpcm1hdGlvbiwgc3VwcG9ydHNIaXN0b3J5LCBzdXBwb3J0c1BvcFN0YXRlT25IYXNoQ2hhbmdlLCBpc0V4dHJhbmVvdXNQb3BzdGF0ZUV2ZW50IH0gZnJvbSAnLi9ET01VdGlscyc7XG5cbnZhciBQb3BTdGF0ZUV2ZW50ID0gJ3BvcHN0YXRlJztcbnZhciBIYXNoQ2hhbmdlRXZlbnQgPSAnaGFzaGNoYW5nZSc7XG5cbnZhciBnZXRIaXN0b3J5U3RhdGUgPSBmdW5jdGlvbiBnZXRIaXN0b3J5U3RhdGUoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHdpbmRvdy5oaXN0b3J5LnN0YXRlIHx8IHt9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gSUUgMTEgc29tZXRpbWVzIHRocm93cyB3aGVuIGFjY2Vzc2luZyB3aW5kb3cuaGlzdG9yeS5zdGF0ZVxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vUmVhY3RUcmFpbmluZy9oaXN0b3J5L3B1bGwvMjg5XG4gICAgcmV0dXJuIHt9O1xuICB9XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBoaXN0b3J5IG9iamVjdCB0aGF0IHVzZXMgdGhlIEhUTUw1IGhpc3RvcnkgQVBJIGluY2x1ZGluZ1xuICogcHVzaFN0YXRlLCByZXBsYWNlU3RhdGUsIGFuZCB0aGUgcG9wc3RhdGUgZXZlbnQuXG4gKi9cbnZhciBjcmVhdGVCcm93c2VySGlzdG9yeSA9IGZ1bmN0aW9uIGNyZWF0ZUJyb3dzZXJIaXN0b3J5KCkge1xuICB2YXIgcHJvcHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuXG4gIGludmFyaWFudChjYW5Vc2VET00sICdCcm93c2VyIGhpc3RvcnkgbmVlZHMgYSBET00nKTtcblxuICB2YXIgZ2xvYmFsSGlzdG9yeSA9IHdpbmRvdy5oaXN0b3J5O1xuICB2YXIgY2FuVXNlSGlzdG9yeSA9IHN1cHBvcnRzSGlzdG9yeSgpO1xuICB2YXIgbmVlZHNIYXNoQ2hhbmdlTGlzdGVuZXIgPSAhc3VwcG9ydHNQb3BTdGF0ZU9uSGFzaENoYW5nZSgpO1xuXG4gIHZhciBfcHJvcHMkZm9yY2VSZWZyZXNoID0gcHJvcHMuZm9yY2VSZWZyZXNoLFxuICAgICAgZm9yY2VSZWZyZXNoID0gX3Byb3BzJGZvcmNlUmVmcmVzaCA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBfcHJvcHMkZm9yY2VSZWZyZXNoLFxuICAgICAgX3Byb3BzJGdldFVzZXJDb25maXJtID0gcHJvcHMuZ2V0VXNlckNvbmZpcm1hdGlvbixcbiAgICAgIGdldFVzZXJDb25maXJtYXRpb24gPSBfcHJvcHMkZ2V0VXNlckNvbmZpcm0gPT09IHVuZGVmaW5lZCA/IGdldENvbmZpcm1hdGlvbiA6IF9wcm9wcyRnZXRVc2VyQ29uZmlybSxcbiAgICAgIF9wcm9wcyRrZXlMZW5ndGggPSBwcm9wcy5rZXlMZW5ndGgsXG4gICAgICBrZXlMZW5ndGggPSBfcHJvcHMka2V5TGVuZ3RoID09PSB1bmRlZmluZWQgPyA2IDogX3Byb3BzJGtleUxlbmd0aDtcblxuICB2YXIgYmFzZW5hbWUgPSBwcm9wcy5iYXNlbmFtZSA/IHN0cmlwVHJhaWxpbmdTbGFzaChhZGRMZWFkaW5nU2xhc2gocHJvcHMuYmFzZW5hbWUpKSA6ICcnO1xuXG4gIHZhciBnZXRET01Mb2NhdGlvbiA9IGZ1bmN0aW9uIGdldERPTUxvY2F0aW9uKGhpc3RvcnlTdGF0ZSkge1xuICAgIHZhciBfcmVmID0gaGlzdG9yeVN0YXRlIHx8IHt9LFxuICAgICAgICBrZXkgPSBfcmVmLmtleSxcbiAgICAgICAgc3RhdGUgPSBfcmVmLnN0YXRlO1xuXG4gICAgdmFyIF93aW5kb3ckbG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb24sXG4gICAgICAgIHBhdGhuYW1lID0gX3dpbmRvdyRsb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgICAgc2VhcmNoID0gX3dpbmRvdyRsb2NhdGlvbi5zZWFyY2gsXG4gICAgICAgIGhhc2ggPSBfd2luZG93JGxvY2F0aW9uLmhhc2g7XG5cblxuICAgIHZhciBwYXRoID0gcGF0aG5hbWUgKyBzZWFyY2ggKyBoYXNoO1xuXG4gICAgd2FybmluZyghYmFzZW5hbWUgfHwgaGFzQmFzZW5hbWUocGF0aCwgYmFzZW5hbWUpLCAnWW91IGFyZSBhdHRlbXB0aW5nIHRvIHVzZSBhIGJhc2VuYW1lIG9uIGEgcGFnZSB3aG9zZSBVUkwgcGF0aCBkb2VzIG5vdCBiZWdpbiAnICsgJ3dpdGggdGhlIGJhc2VuYW1lLiBFeHBlY3RlZCBwYXRoIFwiJyArIHBhdGggKyAnXCIgdG8gYmVnaW4gd2l0aCBcIicgKyBiYXNlbmFtZSArICdcIi4nKTtcblxuICAgIGlmIChiYXNlbmFtZSkgcGF0aCA9IHN0cmlwQmFzZW5hbWUocGF0aCwgYmFzZW5hbWUpO1xuXG4gICAgcmV0dXJuIGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBrZXkpO1xuICB9O1xuXG4gIHZhciBjcmVhdGVLZXkgPSBmdW5jdGlvbiBjcmVhdGVLZXkoKSB7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCBrZXlMZW5ndGgpO1xuICB9O1xuXG4gIHZhciB0cmFuc2l0aW9uTWFuYWdlciA9IGNyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyKCk7XG5cbiAgdmFyIHNldFN0YXRlID0gZnVuY3Rpb24gc2V0U3RhdGUobmV4dFN0YXRlKSB7XG4gICAgX2V4dGVuZHMoaGlzdG9yeSwgbmV4dFN0YXRlKTtcblxuICAgIGhpc3RvcnkubGVuZ3RoID0gZ2xvYmFsSGlzdG9yeS5sZW5ndGg7XG5cbiAgICB0cmFuc2l0aW9uTWFuYWdlci5ub3RpZnlMaXN0ZW5lcnMoaGlzdG9yeS5sb2NhdGlvbiwgaGlzdG9yeS5hY3Rpb24pO1xuICB9O1xuXG4gIHZhciBoYW5kbGVQb3BTdGF0ZSA9IGZ1bmN0aW9uIGhhbmRsZVBvcFN0YXRlKGV2ZW50KSB7XG4gICAgLy8gSWdub3JlIGV4dHJhbmVvdXMgcG9wc3RhdGUgZXZlbnRzIGluIFdlYktpdC5cbiAgICBpZiAoaXNFeHRyYW5lb3VzUG9wc3RhdGVFdmVudChldmVudCkpIHJldHVybjtcblxuICAgIGhhbmRsZVBvcChnZXRET01Mb2NhdGlvbihldmVudC5zdGF0ZSkpO1xuICB9O1xuXG4gIHZhciBoYW5kbGVIYXNoQ2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlSGFzaENoYW5nZSgpIHtcbiAgICBoYW5kbGVQb3AoZ2V0RE9NTG9jYXRpb24oZ2V0SGlzdG9yeVN0YXRlKCkpKTtcbiAgfTtcblxuICB2YXIgZm9yY2VOZXh0UG9wID0gZmFsc2U7XG5cbiAgdmFyIGhhbmRsZVBvcCA9IGZ1bmN0aW9uIGhhbmRsZVBvcChsb2NhdGlvbikge1xuICAgIGlmIChmb3JjZU5leHRQb3ApIHtcbiAgICAgIGZvcmNlTmV4dFBvcCA9IGZhbHNlO1xuICAgICAgc2V0U3RhdGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFjdGlvbiA9ICdQT1AnO1xuXG4gICAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICBzZXRTdGF0ZSh7IGFjdGlvbjogYWN0aW9uLCBsb2NhdGlvbjogbG9jYXRpb24gfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV2ZXJ0UG9wKGxvY2F0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHZhciByZXZlcnRQb3AgPSBmdW5jdGlvbiByZXZlcnRQb3AoZnJvbUxvY2F0aW9uKSB7XG4gICAgdmFyIHRvTG9jYXRpb24gPSBoaXN0b3J5LmxvY2F0aW9uO1xuXG4gICAgLy8gVE9ETzogV2UgY291bGQgcHJvYmFibHkgbWFrZSB0aGlzIG1vcmUgcmVsaWFibGUgYnlcbiAgICAvLyBrZWVwaW5nIGEgbGlzdCBvZiBrZXlzIHdlJ3ZlIHNlZW4gaW4gc2Vzc2lvblN0b3JhZ2UuXG4gICAgLy8gSW5zdGVhZCwgd2UganVzdCBkZWZhdWx0IHRvIDAgZm9yIGtleXMgd2UgZG9uJ3Qga25vdy5cblxuICAgIHZhciB0b0luZGV4ID0gYWxsS2V5cy5pbmRleE9mKHRvTG9jYXRpb24ua2V5KTtcblxuICAgIGlmICh0b0luZGV4ID09PSAtMSkgdG9JbmRleCA9IDA7XG5cbiAgICB2YXIgZnJvbUluZGV4ID0gYWxsS2V5cy5pbmRleE9mKGZyb21Mb2NhdGlvbi5rZXkpO1xuXG4gICAgaWYgKGZyb21JbmRleCA9PT0gLTEpIGZyb21JbmRleCA9IDA7XG5cbiAgICB2YXIgZGVsdGEgPSB0b0luZGV4IC0gZnJvbUluZGV4O1xuXG4gICAgaWYgKGRlbHRhKSB7XG4gICAgICBmb3JjZU5leHRQb3AgPSB0cnVlO1xuICAgICAgZ28oZGVsdGEpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgaW5pdGlhbExvY2F0aW9uID0gZ2V0RE9NTG9jYXRpb24oZ2V0SGlzdG9yeVN0YXRlKCkpO1xuICB2YXIgYWxsS2V5cyA9IFtpbml0aWFsTG9jYXRpb24ua2V5XTtcblxuICAvLyBQdWJsaWMgaW50ZXJmYWNlXG5cbiAgdmFyIGNyZWF0ZUhyZWYgPSBmdW5jdGlvbiBjcmVhdGVIcmVmKGxvY2F0aW9uKSB7XG4gICAgcmV0dXJuIGJhc2VuYW1lICsgY3JlYXRlUGF0aChsb2NhdGlvbik7XG4gIH07XG5cbiAgdmFyIHB1c2ggPSBmdW5jdGlvbiBwdXNoKHBhdGgsIHN0YXRlKSB7XG4gICAgd2FybmluZyghKCh0eXBlb2YgcGF0aCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YocGF0aCkpID09PSAnb2JqZWN0JyAmJiBwYXRoLnN0YXRlICE9PSB1bmRlZmluZWQgJiYgc3RhdGUgIT09IHVuZGVmaW5lZCksICdZb3Ugc2hvdWxkIGF2b2lkIHByb3ZpZGluZyBhIDJuZCBzdGF0ZSBhcmd1bWVudCB0byBwdXNoIHdoZW4gdGhlIDFzdCAnICsgJ2FyZ3VtZW50IGlzIGEgbG9jYXRpb24tbGlrZSBvYmplY3QgdGhhdCBhbHJlYWR5IGhhcyBzdGF0ZTsgaXQgaXMgaWdub3JlZCcpO1xuXG4gICAgdmFyIGFjdGlvbiA9ICdQVVNIJztcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwYXRoLCBzdGF0ZSwgY3JlYXRlS2V5KCksIGhpc3RvcnkubG9jYXRpb24pO1xuXG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmICghb2spIHJldHVybjtcblxuICAgICAgdmFyIGhyZWYgPSBjcmVhdGVIcmVmKGxvY2F0aW9uKTtcbiAgICAgIHZhciBrZXkgPSBsb2NhdGlvbi5rZXksXG4gICAgICAgICAgc3RhdGUgPSBsb2NhdGlvbi5zdGF0ZTtcblxuXG4gICAgICBpZiAoY2FuVXNlSGlzdG9yeSkge1xuICAgICAgICBnbG9iYWxIaXN0b3J5LnB1c2hTdGF0ZSh7IGtleToga2V5LCBzdGF0ZTogc3RhdGUgfSwgbnVsbCwgaHJlZik7XG5cbiAgICAgICAgaWYgKGZvcmNlUmVmcmVzaCkge1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaHJlZjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcHJldkluZGV4ID0gYWxsS2V5cy5pbmRleE9mKGhpc3RvcnkubG9jYXRpb24ua2V5KTtcbiAgICAgICAgICB2YXIgbmV4dEtleXMgPSBhbGxLZXlzLnNsaWNlKDAsIHByZXZJbmRleCA9PT0gLTEgPyAwIDogcHJldkluZGV4ICsgMSk7XG5cbiAgICAgICAgICBuZXh0S2V5cy5wdXNoKGxvY2F0aW9uLmtleSk7XG4gICAgICAgICAgYWxsS2V5cyA9IG5leHRLZXlzO1xuXG4gICAgICAgICAgc2V0U3RhdGUoeyBhY3Rpb246IGFjdGlvbiwgbG9jYXRpb246IGxvY2F0aW9uIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3YXJuaW5nKHN0YXRlID09PSB1bmRlZmluZWQsICdCcm93c2VyIGhpc3RvcnkgY2Fubm90IHB1c2ggc3RhdGUgaW4gYnJvd3NlcnMgdGhhdCBkbyBub3Qgc3VwcG9ydCBIVE1MNSBoaXN0b3J5Jyk7XG5cbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBocmVmO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHZhciByZXBsYWNlID0gZnVuY3Rpb24gcmVwbGFjZShwYXRoLCBzdGF0ZSkge1xuICAgIHdhcm5pbmcoISgodHlwZW9mIHBhdGggPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHBhdGgpKSA9PT0gJ29iamVjdCcgJiYgcGF0aC5zdGF0ZSAhPT0gdW5kZWZpbmVkICYmIHN0YXRlICE9PSB1bmRlZmluZWQpLCAnWW91IHNob3VsZCBhdm9pZCBwcm92aWRpbmcgYSAybmQgc3RhdGUgYXJndW1lbnQgdG8gcmVwbGFjZSB3aGVuIHRoZSAxc3QgJyArICdhcmd1bWVudCBpcyBhIGxvY2F0aW9uLWxpa2Ugb2JqZWN0IHRoYXQgYWxyZWFkeSBoYXMgc3RhdGU7IGl0IGlzIGlnbm9yZWQnKTtcblxuICAgIHZhciBhY3Rpb24gPSAnUkVQTEFDRSc7XG4gICAgdmFyIGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocGF0aCwgc3RhdGUsIGNyZWF0ZUtleSgpLCBoaXN0b3J5LmxvY2F0aW9uKTtcblxuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAoIW9rKSByZXR1cm47XG5cbiAgICAgIHZhciBocmVmID0gY3JlYXRlSHJlZihsb2NhdGlvbik7XG4gICAgICB2YXIga2V5ID0gbG9jYXRpb24ua2V5LFxuICAgICAgICAgIHN0YXRlID0gbG9jYXRpb24uc3RhdGU7XG5cblxuICAgICAgaWYgKGNhblVzZUhpc3RvcnkpIHtcbiAgICAgICAgZ2xvYmFsSGlzdG9yeS5yZXBsYWNlU3RhdGUoeyBrZXk6IGtleSwgc3RhdGU6IHN0YXRlIH0sIG51bGwsIGhyZWYpO1xuXG4gICAgICAgIGlmIChmb3JjZVJlZnJlc2gpIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShocmVmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcHJldkluZGV4ID0gYWxsS2V5cy5pbmRleE9mKGhpc3RvcnkubG9jYXRpb24ua2V5KTtcblxuICAgICAgICAgIGlmIChwcmV2SW5kZXggIT09IC0xKSBhbGxLZXlzW3ByZXZJbmRleF0gPSBsb2NhdGlvbi5rZXk7XG5cbiAgICAgICAgICBzZXRTdGF0ZSh7IGFjdGlvbjogYWN0aW9uLCBsb2NhdGlvbjogbG9jYXRpb24gfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdhcm5pbmcoc3RhdGUgPT09IHVuZGVmaW5lZCwgJ0Jyb3dzZXIgaGlzdG9yeSBjYW5ub3QgcmVwbGFjZSBzdGF0ZSBpbiBicm93c2VycyB0aGF0IGRvIG5vdCBzdXBwb3J0IEhUTUw1IGhpc3RvcnknKTtcblxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShocmVmKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICB2YXIgZ28gPSBmdW5jdGlvbiBnbyhuKSB7XG4gICAgZ2xvYmFsSGlzdG9yeS5nbyhuKTtcbiAgfTtcblxuICB2YXIgZ29CYWNrID0gZnVuY3Rpb24gZ29CYWNrKCkge1xuICAgIHJldHVybiBnbygtMSk7XG4gIH07XG5cbiAgdmFyIGdvRm9yd2FyZCA9IGZ1bmN0aW9uIGdvRm9yd2FyZCgpIHtcbiAgICByZXR1cm4gZ28oMSk7XG4gIH07XG5cbiAgdmFyIGxpc3RlbmVyQ291bnQgPSAwO1xuXG4gIHZhciBjaGVja0RPTUxpc3RlbmVycyA9IGZ1bmN0aW9uIGNoZWNrRE9NTGlzdGVuZXJzKGRlbHRhKSB7XG4gICAgbGlzdGVuZXJDb3VudCArPSBkZWx0YTtcblxuICAgIGlmIChsaXN0ZW5lckNvdW50ID09PSAxKSB7XG4gICAgICBhZGRFdmVudExpc3RlbmVyKHdpbmRvdywgUG9wU3RhdGVFdmVudCwgaGFuZGxlUG9wU3RhdGUpO1xuXG4gICAgICBpZiAobmVlZHNIYXNoQ2hhbmdlTGlzdGVuZXIpIGFkZEV2ZW50TGlzdGVuZXIod2luZG93LCBIYXNoQ2hhbmdlRXZlbnQsIGhhbmRsZUhhc2hDaGFuZ2UpO1xuICAgIH0gZWxzZSBpZiAobGlzdGVuZXJDb3VudCA9PT0gMCkge1xuICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcih3aW5kb3csIFBvcFN0YXRlRXZlbnQsIGhhbmRsZVBvcFN0YXRlKTtcblxuICAgICAgaWYgKG5lZWRzSGFzaENoYW5nZUxpc3RlbmVyKSByZW1vdmVFdmVudExpc3RlbmVyKHdpbmRvdywgSGFzaENoYW5nZUV2ZW50LCBoYW5kbGVIYXNoQ2hhbmdlKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGlzQmxvY2tlZCA9IGZhbHNlO1xuXG4gIHZhciBibG9jayA9IGZ1bmN0aW9uIGJsb2NrKCkge1xuICAgIHZhciBwcm9tcHQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGZhbHNlO1xuXG4gICAgdmFyIHVuYmxvY2sgPSB0cmFuc2l0aW9uTWFuYWdlci5zZXRQcm9tcHQocHJvbXB0KTtcblxuICAgIGlmICghaXNCbG9ja2VkKSB7XG4gICAgICBjaGVja0RPTUxpc3RlbmVycygxKTtcbiAgICAgIGlzQmxvY2tlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChpc0Jsb2NrZWQpIHtcbiAgICAgICAgaXNCbG9ja2VkID0gZmFsc2U7XG4gICAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKC0xKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVuYmxvY2soKTtcbiAgICB9O1xuICB9O1xuXG4gIHZhciBsaXN0ZW4gPSBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICB2YXIgdW5saXN0ZW4gPSB0cmFuc2l0aW9uTWFuYWdlci5hcHBlbmRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgY2hlY2tET01MaXN0ZW5lcnMoMSk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgY2hlY2tET01MaXN0ZW5lcnMoLTEpO1xuICAgICAgdW5saXN0ZW4oKTtcbiAgICB9O1xuICB9O1xuXG4gIHZhciBoaXN0b3J5ID0ge1xuICAgIGxlbmd0aDogZ2xvYmFsSGlzdG9yeS5sZW5ndGgsXG4gICAgYWN0aW9uOiAnUE9QJyxcbiAgICBsb2NhdGlvbjogaW5pdGlhbExvY2F0aW9uLFxuICAgIGNyZWF0ZUhyZWY6IGNyZWF0ZUhyZWYsXG4gICAgcHVzaDogcHVzaCxcbiAgICByZXBsYWNlOiByZXBsYWNlLFxuICAgIGdvOiBnbyxcbiAgICBnb0JhY2s6IGdvQmFjayxcbiAgICBnb0ZvcndhcmQ6IGdvRm9yd2FyZCxcbiAgICBibG9jazogYmxvY2ssXG4gICAgbGlzdGVuOiBsaXN0ZW5cbiAgfTtcblxuICByZXR1cm4gaGlzdG9yeTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUJyb3dzZXJIaXN0b3J5OyIsInZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICdpbnZhcmlhbnQnO1xuaW1wb3J0IHsgY3JlYXRlTG9jYXRpb24sIGxvY2F0aW9uc0FyZUVxdWFsIH0gZnJvbSAnLi9Mb2NhdGlvblV0aWxzJztcbmltcG9ydCB7IGFkZExlYWRpbmdTbGFzaCwgc3RyaXBMZWFkaW5nU2xhc2gsIHN0cmlwVHJhaWxpbmdTbGFzaCwgaGFzQmFzZW5hbWUsIHN0cmlwQmFzZW5hbWUsIGNyZWF0ZVBhdGggfSBmcm9tICcuL1BhdGhVdGlscyc7XG5pbXBvcnQgY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIgZnJvbSAnLi9jcmVhdGVUcmFuc2l0aW9uTWFuYWdlcic7XG5pbXBvcnQgeyBjYW5Vc2VET00sIGFkZEV2ZW50TGlzdGVuZXIsIHJlbW92ZUV2ZW50TGlzdGVuZXIsIGdldENvbmZpcm1hdGlvbiwgc3VwcG9ydHNHb1dpdGhvdXRSZWxvYWRVc2luZ0hhc2ggfSBmcm9tICcuL0RPTVV0aWxzJztcblxudmFyIEhhc2hDaGFuZ2VFdmVudCA9ICdoYXNoY2hhbmdlJztcblxudmFyIEhhc2hQYXRoQ29kZXJzID0ge1xuICBoYXNoYmFuZzoge1xuICAgIGVuY29kZVBhdGg6IGZ1bmN0aW9uIGVuY29kZVBhdGgocGF0aCkge1xuICAgICAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnIScgPyBwYXRoIDogJyEvJyArIHN0cmlwTGVhZGluZ1NsYXNoKHBhdGgpO1xuICAgIH0sXG4gICAgZGVjb2RlUGF0aDogZnVuY3Rpb24gZGVjb2RlUGF0aChwYXRoKSB7XG4gICAgICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICchJyA/IHBhdGguc3Vic3RyKDEpIDogcGF0aDtcbiAgICB9XG4gIH0sXG4gIG5vc2xhc2g6IHtcbiAgICBlbmNvZGVQYXRoOiBzdHJpcExlYWRpbmdTbGFzaCxcbiAgICBkZWNvZGVQYXRoOiBhZGRMZWFkaW5nU2xhc2hcbiAgfSxcbiAgc2xhc2g6IHtcbiAgICBlbmNvZGVQYXRoOiBhZGRMZWFkaW5nU2xhc2gsXG4gICAgZGVjb2RlUGF0aDogYWRkTGVhZGluZ1NsYXNoXG4gIH1cbn07XG5cbnZhciBnZXRIYXNoUGF0aCA9IGZ1bmN0aW9uIGdldEhhc2hQYXRoKCkge1xuICAvLyBXZSBjYW4ndCB1c2Ugd2luZG93LmxvY2F0aW9uLmhhc2ggaGVyZSBiZWNhdXNlIGl0J3Mgbm90XG4gIC8vIGNvbnNpc3RlbnQgYWNyb3NzIGJyb3dzZXJzIC0gRmlyZWZveCB3aWxsIHByZS1kZWNvZGUgaXQhXG4gIHZhciBocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gIHZhciBoYXNoSW5kZXggPSBocmVmLmluZGV4T2YoJyMnKTtcbiAgcmV0dXJuIGhhc2hJbmRleCA9PT0gLTEgPyAnJyA6IGhyZWYuc3Vic3RyaW5nKGhhc2hJbmRleCArIDEpO1xufTtcblxudmFyIHB1c2hIYXNoUGF0aCA9IGZ1bmN0aW9uIHB1c2hIYXNoUGF0aChwYXRoKSB7XG4gIHJldHVybiB3aW5kb3cubG9jYXRpb24uaGFzaCA9IHBhdGg7XG59O1xuXG52YXIgcmVwbGFjZUhhc2hQYXRoID0gZnVuY3Rpb24gcmVwbGFjZUhhc2hQYXRoKHBhdGgpIHtcbiAgdmFyIGhhc2hJbmRleCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJyMnKTtcblxuICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cubG9jYXRpb24uaHJlZi5zbGljZSgwLCBoYXNoSW5kZXggPj0gMCA/IGhhc2hJbmRleCA6IDApICsgJyMnICsgcGF0aCk7XG59O1xuXG52YXIgY3JlYXRlSGFzaEhpc3RvcnkgPSBmdW5jdGlvbiBjcmVhdGVIYXNoSGlzdG9yeSgpIHtcbiAgdmFyIHByb3BzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcblxuICBpbnZhcmlhbnQoY2FuVXNlRE9NLCAnSGFzaCBoaXN0b3J5IG5lZWRzIGEgRE9NJyk7XG5cbiAgdmFyIGdsb2JhbEhpc3RvcnkgPSB3aW5kb3cuaGlzdG9yeTtcbiAgdmFyIGNhbkdvV2l0aG91dFJlbG9hZCA9IHN1cHBvcnRzR29XaXRob3V0UmVsb2FkVXNpbmdIYXNoKCk7XG5cbiAgdmFyIF9wcm9wcyRnZXRVc2VyQ29uZmlybSA9IHByb3BzLmdldFVzZXJDb25maXJtYXRpb24sXG4gICAgICBnZXRVc2VyQ29uZmlybWF0aW9uID0gX3Byb3BzJGdldFVzZXJDb25maXJtID09PSB1bmRlZmluZWQgPyBnZXRDb25maXJtYXRpb24gOiBfcHJvcHMkZ2V0VXNlckNvbmZpcm0sXG4gICAgICBfcHJvcHMkaGFzaFR5cGUgPSBwcm9wcy5oYXNoVHlwZSxcbiAgICAgIGhhc2hUeXBlID0gX3Byb3BzJGhhc2hUeXBlID09PSB1bmRlZmluZWQgPyAnc2xhc2gnIDogX3Byb3BzJGhhc2hUeXBlO1xuXG4gIHZhciBiYXNlbmFtZSA9IHByb3BzLmJhc2VuYW1lID8gc3RyaXBUcmFpbGluZ1NsYXNoKGFkZExlYWRpbmdTbGFzaChwcm9wcy5iYXNlbmFtZSkpIDogJyc7XG5cbiAgdmFyIF9IYXNoUGF0aENvZGVycyRoYXNoVCA9IEhhc2hQYXRoQ29kZXJzW2hhc2hUeXBlXSxcbiAgICAgIGVuY29kZVBhdGggPSBfSGFzaFBhdGhDb2RlcnMkaGFzaFQuZW5jb2RlUGF0aCxcbiAgICAgIGRlY29kZVBhdGggPSBfSGFzaFBhdGhDb2RlcnMkaGFzaFQuZGVjb2RlUGF0aDtcblxuXG4gIHZhciBnZXRET01Mb2NhdGlvbiA9IGZ1bmN0aW9uIGdldERPTUxvY2F0aW9uKCkge1xuICAgIHZhciBwYXRoID0gZGVjb2RlUGF0aChnZXRIYXNoUGF0aCgpKTtcblxuICAgIHdhcm5pbmcoIWJhc2VuYW1lIHx8IGhhc0Jhc2VuYW1lKHBhdGgsIGJhc2VuYW1lKSwgJ1lvdSBhcmUgYXR0ZW1wdGluZyB0byB1c2UgYSBiYXNlbmFtZSBvbiBhIHBhZ2Ugd2hvc2UgVVJMIHBhdGggZG9lcyBub3QgYmVnaW4gJyArICd3aXRoIHRoZSBiYXNlbmFtZS4gRXhwZWN0ZWQgcGF0aCBcIicgKyBwYXRoICsgJ1wiIHRvIGJlZ2luIHdpdGggXCInICsgYmFzZW5hbWUgKyAnXCIuJyk7XG5cbiAgICBpZiAoYmFzZW5hbWUpIHBhdGggPSBzdHJpcEJhc2VuYW1lKHBhdGgsIGJhc2VuYW1lKTtcblxuICAgIHJldHVybiBjcmVhdGVMb2NhdGlvbihwYXRoKTtcbiAgfTtcblxuICB2YXIgdHJhbnNpdGlvbk1hbmFnZXIgPSBjcmVhdGVUcmFuc2l0aW9uTWFuYWdlcigpO1xuXG4gIHZhciBzZXRTdGF0ZSA9IGZ1bmN0aW9uIHNldFN0YXRlKG5leHRTdGF0ZSkge1xuICAgIF9leHRlbmRzKGhpc3RvcnksIG5leHRTdGF0ZSk7XG5cbiAgICBoaXN0b3J5Lmxlbmd0aCA9IGdsb2JhbEhpc3RvcnkubGVuZ3RoO1xuXG4gICAgdHJhbnNpdGlvbk1hbmFnZXIubm90aWZ5TGlzdGVuZXJzKGhpc3RvcnkubG9jYXRpb24sIGhpc3RvcnkuYWN0aW9uKTtcbiAgfTtcblxuICB2YXIgZm9yY2VOZXh0UG9wID0gZmFsc2U7XG4gIHZhciBpZ25vcmVQYXRoID0gbnVsbDtcblxuICB2YXIgaGFuZGxlSGFzaENoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUhhc2hDaGFuZ2UoKSB7XG4gICAgdmFyIHBhdGggPSBnZXRIYXNoUGF0aCgpO1xuICAgIHZhciBlbmNvZGVkUGF0aCA9IGVuY29kZVBhdGgocGF0aCk7XG5cbiAgICBpZiAocGF0aCAhPT0gZW5jb2RlZFBhdGgpIHtcbiAgICAgIC8vIEVuc3VyZSB3ZSBhbHdheXMgaGF2ZSBhIHByb3Blcmx5LWVuY29kZWQgaGFzaC5cbiAgICAgIHJlcGxhY2VIYXNoUGF0aChlbmNvZGVkUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBsb2NhdGlvbiA9IGdldERPTUxvY2F0aW9uKCk7XG4gICAgICB2YXIgcHJldkxvY2F0aW9uID0gaGlzdG9yeS5sb2NhdGlvbjtcblxuICAgICAgaWYgKCFmb3JjZU5leHRQb3AgJiYgbG9jYXRpb25zQXJlRXF1YWwocHJldkxvY2F0aW9uLCBsb2NhdGlvbikpIHJldHVybjsgLy8gQSBoYXNoY2hhbmdlIGRvZXNuJ3QgYWx3YXlzID09IGxvY2F0aW9uIGNoYW5nZS5cblxuICAgICAgaWYgKGlnbm9yZVBhdGggPT09IGNyZWF0ZVBhdGgobG9jYXRpb24pKSByZXR1cm47IC8vIElnbm9yZSB0aGlzIGNoYW5nZTsgd2UgYWxyZWFkeSBzZXRTdGF0ZSBpbiBwdXNoL3JlcGxhY2UuXG5cbiAgICAgIGlnbm9yZVBhdGggPSBudWxsO1xuXG4gICAgICBoYW5kbGVQb3AobG9jYXRpb24pO1xuICAgIH1cbiAgfTtcblxuICB2YXIgaGFuZGxlUG9wID0gZnVuY3Rpb24gaGFuZGxlUG9wKGxvY2F0aW9uKSB7XG4gICAgaWYgKGZvcmNlTmV4dFBvcCkge1xuICAgICAgZm9yY2VOZXh0UG9wID0gZmFsc2U7XG4gICAgICBzZXRTdGF0ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYWN0aW9uID0gJ1BPUCc7XG5cbiAgICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICAgIGlmIChvaykge1xuICAgICAgICAgIHNldFN0YXRlKHsgYWN0aW9uOiBhY3Rpb24sIGxvY2F0aW9uOiBsb2NhdGlvbiB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXZlcnRQb3AobG9jYXRpb24pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIHJldmVydFBvcCA9IGZ1bmN0aW9uIHJldmVydFBvcChmcm9tTG9jYXRpb24pIHtcbiAgICB2YXIgdG9Mb2NhdGlvbiA9IGhpc3RvcnkubG9jYXRpb247XG5cbiAgICAvLyBUT0RPOiBXZSBjb3VsZCBwcm9iYWJseSBtYWtlIHRoaXMgbW9yZSByZWxpYWJsZSBieVxuICAgIC8vIGtlZXBpbmcgYSBsaXN0IG9mIHBhdGhzIHdlJ3ZlIHNlZW4gaW4gc2Vzc2lvblN0b3JhZ2UuXG4gICAgLy8gSW5zdGVhZCwgd2UganVzdCBkZWZhdWx0IHRvIDAgZm9yIHBhdGhzIHdlIGRvbid0IGtub3cuXG5cbiAgICB2YXIgdG9JbmRleCA9IGFsbFBhdGhzLmxhc3RJbmRleE9mKGNyZWF0ZVBhdGgodG9Mb2NhdGlvbikpO1xuXG4gICAgaWYgKHRvSW5kZXggPT09IC0xKSB0b0luZGV4ID0gMDtcblxuICAgIHZhciBmcm9tSW5kZXggPSBhbGxQYXRocy5sYXN0SW5kZXhPZihjcmVhdGVQYXRoKGZyb21Mb2NhdGlvbikpO1xuXG4gICAgaWYgKGZyb21JbmRleCA9PT0gLTEpIGZyb21JbmRleCA9IDA7XG5cbiAgICB2YXIgZGVsdGEgPSB0b0luZGV4IC0gZnJvbUluZGV4O1xuXG4gICAgaWYgKGRlbHRhKSB7XG4gICAgICBmb3JjZU5leHRQb3AgPSB0cnVlO1xuICAgICAgZ28oZGVsdGEpO1xuICAgIH1cbiAgfTtcblxuICAvLyBFbnN1cmUgdGhlIGhhc2ggaXMgZW5jb2RlZCBwcm9wZXJseSBiZWZvcmUgZG9pbmcgYW55dGhpbmcgZWxzZS5cbiAgdmFyIHBhdGggPSBnZXRIYXNoUGF0aCgpO1xuICB2YXIgZW5jb2RlZFBhdGggPSBlbmNvZGVQYXRoKHBhdGgpO1xuXG4gIGlmIChwYXRoICE9PSBlbmNvZGVkUGF0aCkgcmVwbGFjZUhhc2hQYXRoKGVuY29kZWRQYXRoKTtcblxuICB2YXIgaW5pdGlhbExvY2F0aW9uID0gZ2V0RE9NTG9jYXRpb24oKTtcbiAgdmFyIGFsbFBhdGhzID0gW2NyZWF0ZVBhdGgoaW5pdGlhbExvY2F0aW9uKV07XG5cbiAgLy8gUHVibGljIGludGVyZmFjZVxuXG4gIHZhciBjcmVhdGVIcmVmID0gZnVuY3Rpb24gY3JlYXRlSHJlZihsb2NhdGlvbikge1xuICAgIHJldHVybiAnIycgKyBlbmNvZGVQYXRoKGJhc2VuYW1lICsgY3JlYXRlUGF0aChsb2NhdGlvbikpO1xuICB9O1xuXG4gIHZhciBwdXNoID0gZnVuY3Rpb24gcHVzaChwYXRoLCBzdGF0ZSkge1xuICAgIHdhcm5pbmcoc3RhdGUgPT09IHVuZGVmaW5lZCwgJ0hhc2ggaGlzdG9yeSBjYW5ub3QgcHVzaCBzdGF0ZTsgaXQgaXMgaWdub3JlZCcpO1xuXG4gICAgdmFyIGFjdGlvbiA9ICdQVVNIJztcbiAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihwYXRoLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgaGlzdG9yeS5sb2NhdGlvbik7XG5cbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuXG4gICAgICB2YXIgcGF0aCA9IGNyZWF0ZVBhdGgobG9jYXRpb24pO1xuICAgICAgdmFyIGVuY29kZWRQYXRoID0gZW5jb2RlUGF0aChiYXNlbmFtZSArIHBhdGgpO1xuICAgICAgdmFyIGhhc2hDaGFuZ2VkID0gZ2V0SGFzaFBhdGgoKSAhPT0gZW5jb2RlZFBhdGg7XG5cbiAgICAgIGlmIChoYXNoQ2hhbmdlZCkge1xuICAgICAgICAvLyBXZSBjYW5ub3QgdGVsbCBpZiBhIGhhc2hjaGFuZ2Ugd2FzIGNhdXNlZCBieSBhIFBVU0gsIHNvIHdlJ2RcbiAgICAgICAgLy8gcmF0aGVyIHNldFN0YXRlIGhlcmUgYW5kIGlnbm9yZSB0aGUgaGFzaGNoYW5nZS4gVGhlIGNhdmVhdCBoZXJlXG4gICAgICAgIC8vIGlzIHRoYXQgb3RoZXIgaGFzaCBoaXN0b3JpZXMgaW4gdGhlIHBhZ2Ugd2lsbCBjb25zaWRlciBpdCBhIFBPUC5cbiAgICAgICAgaWdub3JlUGF0aCA9IHBhdGg7XG4gICAgICAgIHB1c2hIYXNoUGF0aChlbmNvZGVkUGF0aCk7XG5cbiAgICAgICAgdmFyIHByZXZJbmRleCA9IGFsbFBhdGhzLmxhc3RJbmRleE9mKGNyZWF0ZVBhdGgoaGlzdG9yeS5sb2NhdGlvbikpO1xuICAgICAgICB2YXIgbmV4dFBhdGhzID0gYWxsUGF0aHMuc2xpY2UoMCwgcHJldkluZGV4ID09PSAtMSA/IDAgOiBwcmV2SW5kZXggKyAxKTtcblxuICAgICAgICBuZXh0UGF0aHMucHVzaChwYXRoKTtcbiAgICAgICAgYWxsUGF0aHMgPSBuZXh0UGF0aHM7XG5cbiAgICAgICAgc2V0U3RhdGUoeyBhY3Rpb246IGFjdGlvbiwgbG9jYXRpb246IGxvY2F0aW9uIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2FybmluZyhmYWxzZSwgJ0hhc2ggaGlzdG9yeSBjYW5ub3QgUFVTSCB0aGUgc2FtZSBwYXRoOyBhIG5ldyBlbnRyeSB3aWxsIG5vdCBiZSBhZGRlZCB0byB0aGUgaGlzdG9yeSBzdGFjaycpO1xuXG4gICAgICAgIHNldFN0YXRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgdmFyIHJlcGxhY2UgPSBmdW5jdGlvbiByZXBsYWNlKHBhdGgsIHN0YXRlKSB7XG4gICAgd2FybmluZyhzdGF0ZSA9PT0gdW5kZWZpbmVkLCAnSGFzaCBoaXN0b3J5IGNhbm5vdCByZXBsYWNlIHN0YXRlOyBpdCBpcyBpZ25vcmVkJyk7XG5cbiAgICB2YXIgYWN0aW9uID0gJ1JFUExBQ0UnO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBoaXN0b3J5LmxvY2F0aW9uKTtcblxuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAoIW9rKSByZXR1cm47XG5cbiAgICAgIHZhciBwYXRoID0gY3JlYXRlUGF0aChsb2NhdGlvbik7XG4gICAgICB2YXIgZW5jb2RlZFBhdGggPSBlbmNvZGVQYXRoKGJhc2VuYW1lICsgcGF0aCk7XG4gICAgICB2YXIgaGFzaENoYW5nZWQgPSBnZXRIYXNoUGF0aCgpICE9PSBlbmNvZGVkUGF0aDtcblxuICAgICAgaWYgKGhhc2hDaGFuZ2VkKSB7XG4gICAgICAgIC8vIFdlIGNhbm5vdCB0ZWxsIGlmIGEgaGFzaGNoYW5nZSB3YXMgY2F1c2VkIGJ5IGEgUkVQTEFDRSwgc28gd2UnZFxuICAgICAgICAvLyByYXRoZXIgc2V0U3RhdGUgaGVyZSBhbmQgaWdub3JlIHRoZSBoYXNoY2hhbmdlLiBUaGUgY2F2ZWF0IGhlcmVcbiAgICAgICAgLy8gaXMgdGhhdCBvdGhlciBoYXNoIGhpc3RvcmllcyBpbiB0aGUgcGFnZSB3aWxsIGNvbnNpZGVyIGl0IGEgUE9QLlxuICAgICAgICBpZ25vcmVQYXRoID0gcGF0aDtcbiAgICAgICAgcmVwbGFjZUhhc2hQYXRoKGVuY29kZWRQYXRoKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHByZXZJbmRleCA9IGFsbFBhdGhzLmluZGV4T2YoY3JlYXRlUGF0aChoaXN0b3J5LmxvY2F0aW9uKSk7XG5cbiAgICAgIGlmIChwcmV2SW5kZXggIT09IC0xKSBhbGxQYXRoc1twcmV2SW5kZXhdID0gcGF0aDtcblxuICAgICAgc2V0U3RhdGUoeyBhY3Rpb246IGFjdGlvbiwgbG9jYXRpb246IGxvY2F0aW9uIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHZhciBnbyA9IGZ1bmN0aW9uIGdvKG4pIHtcbiAgICB3YXJuaW5nKGNhbkdvV2l0aG91dFJlbG9hZCwgJ0hhc2ggaGlzdG9yeSBnbyhuKSBjYXVzZXMgYSBmdWxsIHBhZ2UgcmVsb2FkIGluIHRoaXMgYnJvd3NlcicpO1xuXG4gICAgZ2xvYmFsSGlzdG9yeS5nbyhuKTtcbiAgfTtcblxuICB2YXIgZ29CYWNrID0gZnVuY3Rpb24gZ29CYWNrKCkge1xuICAgIHJldHVybiBnbygtMSk7XG4gIH07XG5cbiAgdmFyIGdvRm9yd2FyZCA9IGZ1bmN0aW9uIGdvRm9yd2FyZCgpIHtcbiAgICByZXR1cm4gZ28oMSk7XG4gIH07XG5cbiAgdmFyIGxpc3RlbmVyQ291bnQgPSAwO1xuXG4gIHZhciBjaGVja0RPTUxpc3RlbmVycyA9IGZ1bmN0aW9uIGNoZWNrRE9NTGlzdGVuZXJzKGRlbHRhKSB7XG4gICAgbGlzdGVuZXJDb3VudCArPSBkZWx0YTtcblxuICAgIGlmIChsaXN0ZW5lckNvdW50ID09PSAxKSB7XG4gICAgICBhZGRFdmVudExpc3RlbmVyKHdpbmRvdywgSGFzaENoYW5nZUV2ZW50LCBoYW5kbGVIYXNoQ2hhbmdlKTtcbiAgICB9IGVsc2UgaWYgKGxpc3RlbmVyQ291bnQgPT09IDApIHtcbiAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIod2luZG93LCBIYXNoQ2hhbmdlRXZlbnQsIGhhbmRsZUhhc2hDaGFuZ2UpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgaXNCbG9ja2VkID0gZmFsc2U7XG5cbiAgdmFyIGJsb2NrID0gZnVuY3Rpb24gYmxvY2soKSB7XG4gICAgdmFyIHByb21wdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogZmFsc2U7XG5cbiAgICB2YXIgdW5ibG9jayA9IHRyYW5zaXRpb25NYW5hZ2VyLnNldFByb21wdChwcm9tcHQpO1xuXG4gICAgaWYgKCFpc0Jsb2NrZWQpIHtcbiAgICAgIGNoZWNrRE9NTGlzdGVuZXJzKDEpO1xuICAgICAgaXNCbG9ja2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGlzQmxvY2tlZCkge1xuICAgICAgICBpc0Jsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgY2hlY2tET01MaXN0ZW5lcnMoLTEpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdW5ibG9jaygpO1xuICAgIH07XG4gIH07XG5cbiAgdmFyIGxpc3RlbiA9IGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgIHZhciB1bmxpc3RlbiA9IHRyYW5zaXRpb25NYW5hZ2VyLmFwcGVuZExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICBjaGVja0RPTUxpc3RlbmVycygxKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBjaGVja0RPTUxpc3RlbmVycygtMSk7XG4gICAgICB1bmxpc3RlbigpO1xuICAgIH07XG4gIH07XG5cbiAgdmFyIGhpc3RvcnkgPSB7XG4gICAgbGVuZ3RoOiBnbG9iYWxIaXN0b3J5Lmxlbmd0aCxcbiAgICBhY3Rpb246ICdQT1AnLFxuICAgIGxvY2F0aW9uOiBpbml0aWFsTG9jYXRpb24sXG4gICAgY3JlYXRlSHJlZjogY3JlYXRlSHJlZixcbiAgICBwdXNoOiBwdXNoLFxuICAgIHJlcGxhY2U6IHJlcGxhY2UsXG4gICAgZ286IGdvLFxuICAgIGdvQmFjazogZ29CYWNrLFxuICAgIGdvRm9yd2FyZDogZ29Gb3J3YXJkLFxuICAgIGJsb2NrOiBibG9jayxcbiAgICBsaXN0ZW46IGxpc3RlblxuICB9O1xuXG4gIHJldHVybiBoaXN0b3J5O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlSGFzaEhpc3Rvcnk7IiwidmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5pbXBvcnQgd2FybmluZyBmcm9tICd3YXJuaW5nJztcbmltcG9ydCB7IGNyZWF0ZVBhdGggfSBmcm9tICcuL1BhdGhVdGlscyc7XG5pbXBvcnQgeyBjcmVhdGVMb2NhdGlvbiB9IGZyb20gJy4vTG9jYXRpb25VdGlscyc7XG5pbXBvcnQgY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIgZnJvbSAnLi9jcmVhdGVUcmFuc2l0aW9uTWFuYWdlcic7XG5cbnZhciBjbGFtcCA9IGZ1bmN0aW9uIGNsYW1wKG4sIGxvd2VyQm91bmQsIHVwcGVyQm91bmQpIHtcbiAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KG4sIGxvd2VyQm91bmQpLCB1cHBlckJvdW5kKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhpc3Rvcnkgb2JqZWN0IHRoYXQgc3RvcmVzIGxvY2F0aW9ucyBpbiBtZW1vcnkuXG4gKi9cbnZhciBjcmVhdGVNZW1vcnlIaXN0b3J5ID0gZnVuY3Rpb24gY3JlYXRlTWVtb3J5SGlzdG9yeSgpIHtcbiAgdmFyIHByb3BzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgdmFyIGdldFVzZXJDb25maXJtYXRpb24gPSBwcm9wcy5nZXRVc2VyQ29uZmlybWF0aW9uLFxuICAgICAgX3Byb3BzJGluaXRpYWxFbnRyaWVzID0gcHJvcHMuaW5pdGlhbEVudHJpZXMsXG4gICAgICBpbml0aWFsRW50cmllcyA9IF9wcm9wcyRpbml0aWFsRW50cmllcyA9PT0gdW5kZWZpbmVkID8gWycvJ10gOiBfcHJvcHMkaW5pdGlhbEVudHJpZXMsXG4gICAgICBfcHJvcHMkaW5pdGlhbEluZGV4ID0gcHJvcHMuaW5pdGlhbEluZGV4LFxuICAgICAgaW5pdGlhbEluZGV4ID0gX3Byb3BzJGluaXRpYWxJbmRleCA9PT0gdW5kZWZpbmVkID8gMCA6IF9wcm9wcyRpbml0aWFsSW5kZXgsXG4gICAgICBfcHJvcHMka2V5TGVuZ3RoID0gcHJvcHMua2V5TGVuZ3RoLFxuICAgICAga2V5TGVuZ3RoID0gX3Byb3BzJGtleUxlbmd0aCA9PT0gdW5kZWZpbmVkID8gNiA6IF9wcm9wcyRrZXlMZW5ndGg7XG5cblxuICB2YXIgdHJhbnNpdGlvbk1hbmFnZXIgPSBjcmVhdGVUcmFuc2l0aW9uTWFuYWdlcigpO1xuXG4gIHZhciBzZXRTdGF0ZSA9IGZ1bmN0aW9uIHNldFN0YXRlKG5leHRTdGF0ZSkge1xuICAgIF9leHRlbmRzKGhpc3RvcnksIG5leHRTdGF0ZSk7XG5cbiAgICBoaXN0b3J5Lmxlbmd0aCA9IGhpc3RvcnkuZW50cmllcy5sZW5ndGg7XG5cbiAgICB0cmFuc2l0aW9uTWFuYWdlci5ub3RpZnlMaXN0ZW5lcnMoaGlzdG9yeS5sb2NhdGlvbiwgaGlzdG9yeS5hY3Rpb24pO1xuICB9O1xuXG4gIHZhciBjcmVhdGVLZXkgPSBmdW5jdGlvbiBjcmVhdGVLZXkoKSB7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCBrZXlMZW5ndGgpO1xuICB9O1xuXG4gIHZhciBpbmRleCA9IGNsYW1wKGluaXRpYWxJbmRleCwgMCwgaW5pdGlhbEVudHJpZXMubGVuZ3RoIC0gMSk7XG4gIHZhciBlbnRyaWVzID0gaW5pdGlhbEVudHJpZXMubWFwKGZ1bmN0aW9uIChlbnRyeSkge1xuICAgIHJldHVybiB0eXBlb2YgZW50cnkgPT09ICdzdHJpbmcnID8gY3JlYXRlTG9jYXRpb24oZW50cnksIHVuZGVmaW5lZCwgY3JlYXRlS2V5KCkpIDogY3JlYXRlTG9jYXRpb24oZW50cnksIHVuZGVmaW5lZCwgZW50cnkua2V5IHx8IGNyZWF0ZUtleSgpKTtcbiAgfSk7XG5cbiAgLy8gUHVibGljIGludGVyZmFjZVxuXG4gIHZhciBjcmVhdGVIcmVmID0gY3JlYXRlUGF0aDtcblxuICB2YXIgcHVzaCA9IGZ1bmN0aW9uIHB1c2gocGF0aCwgc3RhdGUpIHtcbiAgICB3YXJuaW5nKCEoKHR5cGVvZiBwYXRoID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihwYXRoKSkgPT09ICdvYmplY3QnICYmIHBhdGguc3RhdGUgIT09IHVuZGVmaW5lZCAmJiBzdGF0ZSAhPT0gdW5kZWZpbmVkKSwgJ1lvdSBzaG91bGQgYXZvaWQgcHJvdmlkaW5nIGEgMm5kIHN0YXRlIGFyZ3VtZW50IHRvIHB1c2ggd2hlbiB0aGUgMXN0ICcgKyAnYXJndW1lbnQgaXMgYSBsb2NhdGlvbi1saWtlIG9iamVjdCB0aGF0IGFscmVhZHkgaGFzIHN0YXRlOyBpdCBpcyBpZ25vcmVkJyk7XG5cbiAgICB2YXIgYWN0aW9uID0gJ1BVU0gnO1xuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHBhdGgsIHN0YXRlLCBjcmVhdGVLZXkoKSwgaGlzdG9yeS5sb2NhdGlvbik7XG5cbiAgICB0cmFuc2l0aW9uTWFuYWdlci5jb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKCFvaykgcmV0dXJuO1xuXG4gICAgICB2YXIgcHJldkluZGV4ID0gaGlzdG9yeS5pbmRleDtcbiAgICAgIHZhciBuZXh0SW5kZXggPSBwcmV2SW5kZXggKyAxO1xuXG4gICAgICB2YXIgbmV4dEVudHJpZXMgPSBoaXN0b3J5LmVudHJpZXMuc2xpY2UoMCk7XG4gICAgICBpZiAobmV4dEVudHJpZXMubGVuZ3RoID4gbmV4dEluZGV4KSB7XG4gICAgICAgIG5leHRFbnRyaWVzLnNwbGljZShuZXh0SW5kZXgsIG5leHRFbnRyaWVzLmxlbmd0aCAtIG5leHRJbmRleCwgbG9jYXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dEVudHJpZXMucHVzaChsb2NhdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcbiAgICAgICAgaW5kZXg6IG5leHRJbmRleCxcbiAgICAgICAgZW50cmllczogbmV4dEVudHJpZXNcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHZhciByZXBsYWNlID0gZnVuY3Rpb24gcmVwbGFjZShwYXRoLCBzdGF0ZSkge1xuICAgIHdhcm5pbmcoISgodHlwZW9mIHBhdGggPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHBhdGgpKSA9PT0gJ29iamVjdCcgJiYgcGF0aC5zdGF0ZSAhPT0gdW5kZWZpbmVkICYmIHN0YXRlICE9PSB1bmRlZmluZWQpLCAnWW91IHNob3VsZCBhdm9pZCBwcm92aWRpbmcgYSAybmQgc3RhdGUgYXJndW1lbnQgdG8gcmVwbGFjZSB3aGVuIHRoZSAxc3QgJyArICdhcmd1bWVudCBpcyBhIGxvY2F0aW9uLWxpa2Ugb2JqZWN0IHRoYXQgYWxyZWFkeSBoYXMgc3RhdGU7IGl0IGlzIGlnbm9yZWQnKTtcblxuICAgIHZhciBhY3Rpb24gPSAnUkVQTEFDRSc7XG4gICAgdmFyIGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24ocGF0aCwgc3RhdGUsIGNyZWF0ZUtleSgpLCBoaXN0b3J5LmxvY2F0aW9uKTtcblxuICAgIHRyYW5zaXRpb25NYW5hZ2VyLmNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGFjdGlvbiwgZ2V0VXNlckNvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAoIW9rKSByZXR1cm47XG5cbiAgICAgIGhpc3RvcnkuZW50cmllc1toaXN0b3J5LmluZGV4XSA9IGxvY2F0aW9uO1xuXG4gICAgICBzZXRTdGF0ZSh7IGFjdGlvbjogYWN0aW9uLCBsb2NhdGlvbjogbG9jYXRpb24gfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgdmFyIGdvID0gZnVuY3Rpb24gZ28obikge1xuICAgIHZhciBuZXh0SW5kZXggPSBjbGFtcChoaXN0b3J5LmluZGV4ICsgbiwgMCwgaGlzdG9yeS5lbnRyaWVzLmxlbmd0aCAtIDEpO1xuXG4gICAgdmFyIGFjdGlvbiA9ICdQT1AnO1xuICAgIHZhciBsb2NhdGlvbiA9IGhpc3RvcnkuZW50cmllc1tuZXh0SW5kZXhdO1xuXG4gICAgdHJhbnNpdGlvbk1hbmFnZXIuY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgYWN0aW9uLCBnZXRVc2VyQ29uZmlybWF0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmIChvaykge1xuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgICAgICAgIGluZGV4OiBuZXh0SW5kZXhcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBNaW1pYyB0aGUgYmVoYXZpb3Igb2YgRE9NIGhpc3RvcmllcyBieVxuICAgICAgICAvLyBjYXVzaW5nIGEgcmVuZGVyIGFmdGVyIGEgY2FuY2VsbGVkIFBPUC5cbiAgICAgICAgc2V0U3RhdGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICB2YXIgZ29CYWNrID0gZnVuY3Rpb24gZ29CYWNrKCkge1xuICAgIHJldHVybiBnbygtMSk7XG4gIH07XG5cbiAgdmFyIGdvRm9yd2FyZCA9IGZ1bmN0aW9uIGdvRm9yd2FyZCgpIHtcbiAgICByZXR1cm4gZ28oMSk7XG4gIH07XG5cbiAgdmFyIGNhbkdvID0gZnVuY3Rpb24gY2FuR28obikge1xuICAgIHZhciBuZXh0SW5kZXggPSBoaXN0b3J5LmluZGV4ICsgbjtcbiAgICByZXR1cm4gbmV4dEluZGV4ID49IDAgJiYgbmV4dEluZGV4IDwgaGlzdG9yeS5lbnRyaWVzLmxlbmd0aDtcbiAgfTtcblxuICB2YXIgYmxvY2sgPSBmdW5jdGlvbiBibG9jaygpIHtcbiAgICB2YXIgcHJvbXB0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBmYWxzZTtcbiAgICByZXR1cm4gdHJhbnNpdGlvbk1hbmFnZXIuc2V0UHJvbXB0KHByb21wdCk7XG4gIH07XG5cbiAgdmFyIGxpc3RlbiA9IGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgIHJldHVybiB0cmFuc2l0aW9uTWFuYWdlci5hcHBlbmRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gIH07XG5cbiAgdmFyIGhpc3RvcnkgPSB7XG4gICAgbGVuZ3RoOiBlbnRyaWVzLmxlbmd0aCxcbiAgICBhY3Rpb246ICdQT1AnLFxuICAgIGxvY2F0aW9uOiBlbnRyaWVzW2luZGV4XSxcbiAgICBpbmRleDogaW5kZXgsXG4gICAgZW50cmllczogZW50cmllcyxcbiAgICBjcmVhdGVIcmVmOiBjcmVhdGVIcmVmLFxuICAgIHB1c2g6IHB1c2gsXG4gICAgcmVwbGFjZTogcmVwbGFjZSxcbiAgICBnbzogZ28sXG4gICAgZ29CYWNrOiBnb0JhY2ssXG4gICAgZ29Gb3J3YXJkOiBnb0ZvcndhcmQsXG4gICAgY2FuR286IGNhbkdvLFxuICAgIGJsb2NrOiBibG9jayxcbiAgICBsaXN0ZW46IGxpc3RlblxuICB9O1xuXG4gIHJldHVybiBoaXN0b3J5O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlTWVtb3J5SGlzdG9yeTsiLCJpbXBvcnQgd2FybmluZyBmcm9tICd3YXJuaW5nJztcblxudmFyIGNyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyID0gZnVuY3Rpb24gY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIoKSB7XG4gIHZhciBwcm9tcHQgPSBudWxsO1xuXG4gIHZhciBzZXRQcm9tcHQgPSBmdW5jdGlvbiBzZXRQcm9tcHQobmV4dFByb21wdCkge1xuICAgIHdhcm5pbmcocHJvbXB0ID09IG51bGwsICdBIGhpc3Rvcnkgc3VwcG9ydHMgb25seSBvbmUgcHJvbXB0IGF0IGEgdGltZScpO1xuXG4gICAgcHJvbXB0ID0gbmV4dFByb21wdDtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAocHJvbXB0ID09PSBuZXh0UHJvbXB0KSBwcm9tcHQgPSBudWxsO1xuICAgIH07XG4gIH07XG5cbiAgdmFyIGNvbmZpcm1UcmFuc2l0aW9uVG8gPSBmdW5jdGlvbiBjb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBhY3Rpb24sIGdldFVzZXJDb25maXJtYXRpb24sIGNhbGxiYWNrKSB7XG4gICAgLy8gVE9ETzogSWYgYW5vdGhlciB0cmFuc2l0aW9uIHN0YXJ0cyB3aGlsZSB3ZSdyZSBzdGlsbCBjb25maXJtaW5nXG4gICAgLy8gdGhlIHByZXZpb3VzIG9uZSwgd2UgbWF5IGVuZCB1cCBpbiBhIHdlaXJkIHN0YXRlLiBGaWd1cmUgb3V0IHRoZVxuICAgIC8vIGJlc3Qgd2F5IHRvIGhhbmRsZSB0aGlzLlxuICAgIGlmIChwcm9tcHQgIT0gbnVsbCkge1xuICAgICAgdmFyIHJlc3VsdCA9IHR5cGVvZiBwcm9tcHQgPT09ICdmdW5jdGlvbicgPyBwcm9tcHQobG9jYXRpb24sIGFjdGlvbikgOiBwcm9tcHQ7XG5cbiAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAodHlwZW9mIGdldFVzZXJDb25maXJtYXRpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBnZXRVc2VyQ29uZmlybWF0aW9uKHJlc3VsdCwgY2FsbGJhY2spO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdhcm5pbmcoZmFsc2UsICdBIGhpc3RvcnkgbmVlZHMgYSBnZXRVc2VyQ29uZmlybWF0aW9uIGZ1bmN0aW9uIGluIG9yZGVyIHRvIHVzZSBhIHByb21wdCBtZXNzYWdlJyk7XG5cbiAgICAgICAgICBjYWxsYmFjayh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmV0dXJuIGZhbHNlIGZyb20gYSB0cmFuc2l0aW9uIGhvb2sgdG8gY2FuY2VsIHRoZSB0cmFuc2l0aW9uLlxuICAgICAgICBjYWxsYmFjayhyZXN1bHQgIT09IGZhbHNlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2sodHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBsaXN0ZW5lcnMgPSBbXTtcblxuICB2YXIgYXBwZW5kTGlzdGVuZXIgPSBmdW5jdGlvbiBhcHBlbmRMaXN0ZW5lcihmbikge1xuICAgIHZhciBpc0FjdGl2ZSA9IHRydWU7XG5cbiAgICB2YXIgbGlzdGVuZXIgPSBmdW5jdGlvbiBsaXN0ZW5lcigpIHtcbiAgICAgIGlmIChpc0FjdGl2ZSkgZm4uYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0gIT09IGxpc3RlbmVyO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfTtcblxuICB2YXIgbm90aWZ5TGlzdGVuZXJzID0gZnVuY3Rpb24gbm90aWZ5TGlzdGVuZXJzKCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIGxpc3RlbmVyLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzZXRQcm9tcHQ6IHNldFByb21wdCxcbiAgICBjb25maXJtVHJhbnNpdGlvblRvOiBjb25maXJtVHJhbnNpdGlvblRvLFxuICAgIGFwcGVuZExpc3RlbmVyOiBhcHBlbmRMaXN0ZW5lcixcbiAgICBub3RpZnlMaXN0ZW5lcnM6IG5vdGlmeUxpc3RlbmVyc1xuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXI7IiwiaW1wb3J0IF9jcmVhdGVCcm93c2VySGlzdG9yeSBmcm9tICcuL2NyZWF0ZUJyb3dzZXJIaXN0b3J5JztcbmV4cG9ydCB7IF9jcmVhdGVCcm93c2VySGlzdG9yeSBhcyBjcmVhdGVCcm93c2VySGlzdG9yeSB9O1xuaW1wb3J0IF9jcmVhdGVIYXNoSGlzdG9yeSBmcm9tICcuL2NyZWF0ZUhhc2hIaXN0b3J5JztcbmV4cG9ydCB7IF9jcmVhdGVIYXNoSGlzdG9yeSBhcyBjcmVhdGVIYXNoSGlzdG9yeSB9O1xuaW1wb3J0IF9jcmVhdGVNZW1vcnlIaXN0b3J5IGZyb20gJy4vY3JlYXRlTWVtb3J5SGlzdG9yeSc7XG5leHBvcnQgeyBfY3JlYXRlTWVtb3J5SGlzdG9yeSBhcyBjcmVhdGVNZW1vcnlIaXN0b3J5IH07XG5cbmV4cG9ydCB7IGNyZWF0ZUxvY2F0aW9uLCBsb2NhdGlvbnNBcmVFcXVhbCB9IGZyb20gJy4vTG9jYXRpb25VdGlscyc7XG5leHBvcnQgeyBwYXJzZVBhdGgsIGNyZWF0ZVBhdGggfSBmcm9tICcuL1BhdGhVdGlscyc7IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENvcHlyaWdodCAyMDE1LCBZYWhvbyEgSW5jLlxuICogQ29weXJpZ2h0cyBsaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBMaWNlbnNlLiBTZWUgdGhlIGFjY29tcGFueWluZyBMSUNFTlNFIGZpbGUgZm9yIHRlcm1zLlxuICovXG52YXIgUkVBQ1RfU1RBVElDUyA9IHtcbiAgICBjaGlsZENvbnRleHRUeXBlczogdHJ1ZSxcbiAgICBjb250ZXh0VHlwZXM6IHRydWUsXG4gICAgZGVmYXVsdFByb3BzOiB0cnVlLFxuICAgIGRpc3BsYXlOYW1lOiB0cnVlLFxuICAgIGdldERlZmF1bHRQcm9wczogdHJ1ZSxcbiAgICBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHM6IHRydWUsXG4gICAgbWl4aW5zOiB0cnVlLFxuICAgIHByb3BUeXBlczogdHJ1ZSxcbiAgICB0eXBlOiB0cnVlXG59O1xuXG52YXIgS05PV05fU1RBVElDUyA9IHtcbiAgICBuYW1lOiB0cnVlLFxuICAgIGxlbmd0aDogdHJ1ZSxcbiAgICBwcm90b3R5cGU6IHRydWUsXG4gICAgY2FsbGVyOiB0cnVlLFxuICAgIGNhbGxlZTogdHJ1ZSxcbiAgICBhcmd1bWVudHM6IHRydWUsXG4gICAgYXJpdHk6IHRydWVcbn07XG5cbnZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xudmFyIG9iamVjdFByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mICYmIGdldFByb3RvdHlwZU9mKE9iamVjdCk7XG5cbmZ1bmN0aW9uIGhvaXN0Tm9uUmVhY3RTdGF0aWNzKHRhcmdldENvbXBvbmVudCwgc291cmNlQ29tcG9uZW50LCBibGFja2xpc3QpIHtcbiAgICBpZiAodHlwZW9mIHNvdXJjZUNvbXBvbmVudCAhPT0gJ3N0cmluZycpIHsgLy8gZG9uJ3QgaG9pc3Qgb3ZlciBzdHJpbmcgKGh0bWwpIGNvbXBvbmVudHNcblxuICAgICAgICBpZiAob2JqZWN0UHJvdG90eXBlKSB7XG4gICAgICAgICAgICB2YXIgaW5oZXJpdGVkQ29tcG9uZW50ID0gZ2V0UHJvdG90eXBlT2Yoc291cmNlQ29tcG9uZW50KTtcbiAgICAgICAgICAgIGlmIChpbmhlcml0ZWRDb21wb25lbnQgJiYgaW5oZXJpdGVkQ29tcG9uZW50ICE9PSBvYmplY3RQcm90b3R5cGUpIHtcbiAgICAgICAgICAgICAgICBob2lzdE5vblJlYWN0U3RhdGljcyh0YXJnZXRDb21wb25lbnQsIGluaGVyaXRlZENvbXBvbmVudCwgYmxhY2tsaXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2VDb21wb25lbnQpO1xuXG4gICAgICAgIGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICAgICAgICAgIGtleXMgPSBrZXlzLmNvbmNhdChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlQ29tcG9uZW50KSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgICAgaWYgKCFSRUFDVF9TVEFUSUNTW2tleV0gJiYgIUtOT1dOX1NUQVRJQ1Nba2V5XSAmJiAoIWJsYWNrbGlzdCB8fCAhYmxhY2tsaXN0W2tleV0pKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlQ29tcG9uZW50LCBrZXkpO1xuICAgICAgICAgICAgICAgIHRyeSB7IC8vIEF2b2lkIGZhaWx1cmVzIGZyb20gcmVhZC1vbmx5IHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0Q29tcG9uZW50LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0Q29tcG9uZW50O1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXRDb21wb25lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaG9pc3ROb25SZWFjdFN0YXRpY3M7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgK1xuICAgICAgICAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCJ2YXIgaXNhcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKVxuXG4vKipcbiAqIEV4cG9zZSBgcGF0aFRvUmVnZXhwYC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBwYXRoVG9SZWdleHBcbm1vZHVsZS5leHBvcnRzLnBhcnNlID0gcGFyc2Vcbm1vZHVsZS5leHBvcnRzLmNvbXBpbGUgPSBjb21waWxlXG5tb2R1bGUuZXhwb3J0cy50b2tlbnNUb0Z1bmN0aW9uID0gdG9rZW5zVG9GdW5jdGlvblxubW9kdWxlLmV4cG9ydHMudG9rZW5zVG9SZWdFeHAgPSB0b2tlbnNUb1JlZ0V4cFxuXG4vKipcbiAqIFRoZSBtYWluIHBhdGggbWF0Y2hpbmcgcmVnZXhwIHV0aWxpdHkuXG4gKlxuICogQHR5cGUge1JlZ0V4cH1cbiAqL1xudmFyIFBBVEhfUkVHRVhQID0gbmV3IFJlZ0V4cChbXG4gIC8vIE1hdGNoIGVzY2FwZWQgY2hhcmFjdGVycyB0aGF0IHdvdWxkIG90aGVyd2lzZSBhcHBlYXIgaW4gZnV0dXJlIG1hdGNoZXMuXG4gIC8vIFRoaXMgYWxsb3dzIHRoZSB1c2VyIHRvIGVzY2FwZSBzcGVjaWFsIGNoYXJhY3RlcnMgdGhhdCB3b24ndCB0cmFuc2Zvcm0uXG4gICcoXFxcXFxcXFwuKScsXG4gIC8vIE1hdGNoIEV4cHJlc3Mtc3R5bGUgcGFyYW1ldGVycyBhbmQgdW4tbmFtZWQgcGFyYW1ldGVycyB3aXRoIGEgcHJlZml4XG4gIC8vIGFuZCBvcHRpb25hbCBzdWZmaXhlcy4gTWF0Y2hlcyBhcHBlYXIgYXM6XG4gIC8vXG4gIC8vIFwiLzp0ZXN0KFxcXFxkKyk/XCIgPT4gW1wiL1wiLCBcInRlc3RcIiwgXCJcXGQrXCIsIHVuZGVmaW5lZCwgXCI/XCIsIHVuZGVmaW5lZF1cbiAgLy8gXCIvcm91dGUoXFxcXGQrKVwiICA9PiBbdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgXCJcXGQrXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkXVxuICAvLyBcIi8qXCIgICAgICAgICAgICA9PiBbXCIvXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgXCIqXCJdXG4gICcoW1xcXFwvLl0pPyg/Oig/OlxcXFw6KFxcXFx3KykoPzpcXFxcKCgoPzpcXFxcXFxcXC58W15cXFxcXFxcXCgpXSkrKVxcXFwpKT98XFxcXCgoKD86XFxcXFxcXFwufFteXFxcXFxcXFwoKV0pKylcXFxcKSkoWysqP10pP3woXFxcXCopKSdcbl0uam9pbignfCcpLCAnZycpXG5cbi8qKlxuICogUGFyc2UgYSBzdHJpbmcgZm9yIHRoZSByYXcgdG9rZW5zLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gIHN0clxuICogQHBhcmFtICB7T2JqZWN0PX0gb3B0aW9uc1xuICogQHJldHVybiB7IUFycmF5fVxuICovXG5mdW5jdGlvbiBwYXJzZSAoc3RyLCBvcHRpb25zKSB7XG4gIHZhciB0b2tlbnMgPSBbXVxuICB2YXIga2V5ID0gMFxuICB2YXIgaW5kZXggPSAwXG4gIHZhciBwYXRoID0gJydcbiAgdmFyIGRlZmF1bHREZWxpbWl0ZXIgPSBvcHRpb25zICYmIG9wdGlvbnMuZGVsaW1pdGVyIHx8ICcvJ1xuICB2YXIgcmVzXG5cbiAgd2hpbGUgKChyZXMgPSBQQVRIX1JFR0VYUC5leGVjKHN0cikpICE9IG51bGwpIHtcbiAgICB2YXIgbSA9IHJlc1swXVxuICAgIHZhciBlc2NhcGVkID0gcmVzWzFdXG4gICAgdmFyIG9mZnNldCA9IHJlcy5pbmRleFxuICAgIHBhdGggKz0gc3RyLnNsaWNlKGluZGV4LCBvZmZzZXQpXG4gICAgaW5kZXggPSBvZmZzZXQgKyBtLmxlbmd0aFxuXG4gICAgLy8gSWdub3JlIGFscmVhZHkgZXNjYXBlZCBzZXF1ZW5jZXMuXG4gICAgaWYgKGVzY2FwZWQpIHtcbiAgICAgIHBhdGggKz0gZXNjYXBlZFsxXVxuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICB2YXIgbmV4dCA9IHN0cltpbmRleF1cbiAgICB2YXIgcHJlZml4ID0gcmVzWzJdXG4gICAgdmFyIG5hbWUgPSByZXNbM11cbiAgICB2YXIgY2FwdHVyZSA9IHJlc1s0XVxuICAgIHZhciBncm91cCA9IHJlc1s1XVxuICAgIHZhciBtb2RpZmllciA9IHJlc1s2XVxuICAgIHZhciBhc3RlcmlzayA9IHJlc1s3XVxuXG4gICAgLy8gUHVzaCB0aGUgY3VycmVudCBwYXRoIG9udG8gdGhlIHRva2Vucy5cbiAgICBpZiAocGF0aCkge1xuICAgICAgdG9rZW5zLnB1c2gocGF0aClcbiAgICAgIHBhdGggPSAnJ1xuICAgIH1cblxuICAgIHZhciBwYXJ0aWFsID0gcHJlZml4ICE9IG51bGwgJiYgbmV4dCAhPSBudWxsICYmIG5leHQgIT09IHByZWZpeFxuICAgIHZhciByZXBlYXQgPSBtb2RpZmllciA9PT0gJysnIHx8IG1vZGlmaWVyID09PSAnKidcbiAgICB2YXIgb3B0aW9uYWwgPSBtb2RpZmllciA9PT0gJz8nIHx8IG1vZGlmaWVyID09PSAnKidcbiAgICB2YXIgZGVsaW1pdGVyID0gcmVzWzJdIHx8IGRlZmF1bHREZWxpbWl0ZXJcbiAgICB2YXIgcGF0dGVybiA9IGNhcHR1cmUgfHwgZ3JvdXBcblxuICAgIHRva2Vucy5wdXNoKHtcbiAgICAgIG5hbWU6IG5hbWUgfHwga2V5KyssXG4gICAgICBwcmVmaXg6IHByZWZpeCB8fCAnJyxcbiAgICAgIGRlbGltaXRlcjogZGVsaW1pdGVyLFxuICAgICAgb3B0aW9uYWw6IG9wdGlvbmFsLFxuICAgICAgcmVwZWF0OiByZXBlYXQsXG4gICAgICBwYXJ0aWFsOiBwYXJ0aWFsLFxuICAgICAgYXN0ZXJpc2s6ICEhYXN0ZXJpc2ssXG4gICAgICBwYXR0ZXJuOiBwYXR0ZXJuID8gZXNjYXBlR3JvdXAocGF0dGVybikgOiAoYXN0ZXJpc2sgPyAnLionIDogJ1teJyArIGVzY2FwZVN0cmluZyhkZWxpbWl0ZXIpICsgJ10rPycpXG4gICAgfSlcbiAgfVxuXG4gIC8vIE1hdGNoIGFueSBjaGFyYWN0ZXJzIHN0aWxsIHJlbWFpbmluZy5cbiAgaWYgKGluZGV4IDwgc3RyLmxlbmd0aCkge1xuICAgIHBhdGggKz0gc3RyLnN1YnN0cihpbmRleClcbiAgfVxuXG4gIC8vIElmIHRoZSBwYXRoIGV4aXN0cywgcHVzaCBpdCBvbnRvIHRoZSBlbmQuXG4gIGlmIChwYXRoKSB7XG4gICAgdG9rZW5zLnB1c2gocGF0aClcbiAgfVxuXG4gIHJldHVybiB0b2tlbnNcbn1cblxuLyoqXG4gKiBDb21waWxlIGEgc3RyaW5nIHRvIGEgdGVtcGxhdGUgZnVuY3Rpb24gZm9yIHRoZSBwYXRoLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgICAgICAgc3RyXG4gKiBAcGFyYW0gIHtPYmplY3Q9fSAgICAgICAgICAgIG9wdGlvbnNcbiAqIEByZXR1cm4geyFmdW5jdGlvbihPYmplY3Q9LCBPYmplY3Q9KX1cbiAqL1xuZnVuY3Rpb24gY29tcGlsZSAoc3RyLCBvcHRpb25zKSB7XG4gIHJldHVybiB0b2tlbnNUb0Z1bmN0aW9uKHBhcnNlKHN0ciwgb3B0aW9ucykpXG59XG5cbi8qKlxuICogUHJldHRpZXIgZW5jb2Rpbmcgb2YgVVJJIHBhdGggc2VnbWVudHMuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBlbmNvZGVVUklDb21wb25lbnRQcmV0dHkgKHN0cikge1xuICByZXR1cm4gZW5jb2RlVVJJKHN0cikucmVwbGFjZSgvW1xcLz8jXS9nLCBmdW5jdGlvbiAoYykge1xuICAgIHJldHVybiAnJScgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKClcbiAgfSlcbn1cblxuLyoqXG4gKiBFbmNvZGUgdGhlIGFzdGVyaXNrIHBhcmFtZXRlci4gU2ltaWxhciB0byBgcHJldHR5YCwgYnV0IGFsbG93cyBzbGFzaGVzLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ31cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZW5jb2RlQXN0ZXJpc2sgKHN0cikge1xuICByZXR1cm4gZW5jb2RlVVJJKHN0cikucmVwbGFjZSgvWz8jXS9nLCBmdW5jdGlvbiAoYykge1xuICAgIHJldHVybiAnJScgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKClcbiAgfSlcbn1cblxuLyoqXG4gKiBFeHBvc2UgYSBtZXRob2QgZm9yIHRyYW5zZm9ybWluZyB0b2tlbnMgaW50byB0aGUgcGF0aCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gdG9rZW5zVG9GdW5jdGlvbiAodG9rZW5zKSB7XG4gIC8vIENvbXBpbGUgYWxsIHRoZSB0b2tlbnMgaW50byByZWdleHBzLlxuICB2YXIgbWF0Y2hlcyA9IG5ldyBBcnJheSh0b2tlbnMubGVuZ3RoKVxuXG4gIC8vIENvbXBpbGUgYWxsIHRoZSBwYXR0ZXJucyBiZWZvcmUgY29tcGlsYXRpb24uXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHR5cGVvZiB0b2tlbnNbaV0gPT09ICdvYmplY3QnKSB7XG4gICAgICBtYXRjaGVzW2ldID0gbmV3IFJlZ0V4cCgnXig/OicgKyB0b2tlbnNbaV0ucGF0dGVybiArICcpJCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChvYmosIG9wdHMpIHtcbiAgICB2YXIgcGF0aCA9ICcnXG4gICAgdmFyIGRhdGEgPSBvYmogfHwge31cbiAgICB2YXIgb3B0aW9ucyA9IG9wdHMgfHwge31cbiAgICB2YXIgZW5jb2RlID0gb3B0aW9ucy5wcmV0dHkgPyBlbmNvZGVVUklDb21wb25lbnRQcmV0dHkgOiBlbmNvZGVVUklDb21wb25lbnRcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdG9rZW4gPSB0b2tlbnNbaV1cblxuICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcGF0aCArPSB0b2tlblxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIHZhciB2YWx1ZSA9IGRhdGFbdG9rZW4ubmFtZV1cbiAgICAgIHZhciBzZWdtZW50XG5cbiAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIGlmICh0b2tlbi5vcHRpb25hbCkge1xuICAgICAgICAgIC8vIFByZXBlbmQgcGFydGlhbCBzZWdtZW50IHByZWZpeGVzLlxuICAgICAgICAgIGlmICh0b2tlbi5wYXJ0aWFsKSB7XG4gICAgICAgICAgICBwYXRoICs9IHRva2VuLnByZWZpeFxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgXCInICsgdG9rZW4ubmFtZSArICdcIiB0byBiZSBkZWZpbmVkJylcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaXNhcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgaWYgKCF0b2tlbi5yZXBlYXQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBcIicgKyB0b2tlbi5uYW1lICsgJ1wiIHRvIG5vdCByZXBlYXQsIGJ1dCByZWNlaXZlZCBgJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlKSArICdgJylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBpZiAodG9rZW4ub3B0aW9uYWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gbm90IGJlIGVtcHR5JylcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHZhbHVlLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgc2VnbWVudCA9IGVuY29kZSh2YWx1ZVtqXSlcblxuICAgICAgICAgIGlmICghbWF0Y2hlc1tpXS50ZXN0KHNlZ21lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhbGwgXCInICsgdG9rZW4ubmFtZSArICdcIiB0byBtYXRjaCBcIicgKyB0b2tlbi5wYXR0ZXJuICsgJ1wiLCBidXQgcmVjZWl2ZWQgYCcgKyBKU09OLnN0cmluZ2lmeShzZWdtZW50KSArICdgJylcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwYXRoICs9IChqID09PSAwID8gdG9rZW4ucHJlZml4IDogdG9rZW4uZGVsaW1pdGVyKSArIHNlZ21lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIHNlZ21lbnQgPSB0b2tlbi5hc3RlcmlzayA/IGVuY29kZUFzdGVyaXNrKHZhbHVlKSA6IGVuY29kZSh2YWx1ZSlcblxuICAgICAgaWYgKCFtYXRjaGVzW2ldLnRlc3Qoc2VnbWVudCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgXCInICsgdG9rZW4ubmFtZSArICdcIiB0byBtYXRjaCBcIicgKyB0b2tlbi5wYXR0ZXJuICsgJ1wiLCBidXQgcmVjZWl2ZWQgXCInICsgc2VnbWVudCArICdcIicpXG4gICAgICB9XG5cbiAgICAgIHBhdGggKz0gdG9rZW4ucHJlZml4ICsgc2VnbWVudFxuICAgIH1cblxuICAgIHJldHVybiBwYXRoXG4gIH1cbn1cblxuLyoqXG4gKiBFc2NhcGUgYSByZWd1bGFyIGV4cHJlc3Npb24gc3RyaW5nLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVN0cmluZyAoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvKFsuKyo/PV4hOiR7fSgpW1xcXXxcXC9cXFxcXSkvZywgJ1xcXFwkMScpXG59XG5cbi8qKlxuICogRXNjYXBlIHRoZSBjYXB0dXJpbmcgZ3JvdXAgYnkgZXNjYXBpbmcgc3BlY2lhbCBjaGFyYWN0ZXJzIGFuZCBtZWFuaW5nLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gZ3JvdXBcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZXNjYXBlR3JvdXAgKGdyb3VwKSB7XG4gIHJldHVybiBncm91cC5yZXBsYWNlKC8oWz0hOiRcXC8oKV0pL2csICdcXFxcJDEnKVxufVxuXG4vKipcbiAqIEF0dGFjaCB0aGUga2V5cyBhcyBhIHByb3BlcnR5IG9mIHRoZSByZWdleHAuXG4gKlxuICogQHBhcmFtICB7IVJlZ0V4cH0gcmVcbiAqIEBwYXJhbSAge0FycmF5fSAgIGtleXNcbiAqIEByZXR1cm4geyFSZWdFeHB9XG4gKi9cbmZ1bmN0aW9uIGF0dGFjaEtleXMgKHJlLCBrZXlzKSB7XG4gIHJlLmtleXMgPSBrZXlzXG4gIHJldHVybiByZVxufVxuXG4vKipcbiAqIEdldCB0aGUgZmxhZ3MgZm9yIGEgcmVnZXhwIGZyb20gdGhlIG9wdGlvbnMuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGZsYWdzIChvcHRpb25zKSB7XG4gIHJldHVybiBvcHRpb25zLnNlbnNpdGl2ZSA/ICcnIDogJ2knXG59XG5cbi8qKlxuICogUHVsbCBvdXQga2V5cyBmcm9tIGEgcmVnZXhwLlxuICpcbiAqIEBwYXJhbSAgeyFSZWdFeHB9IHBhdGhcbiAqIEBwYXJhbSAgeyFBcnJheX0gIGtleXNcbiAqIEByZXR1cm4geyFSZWdFeHB9XG4gKi9cbmZ1bmN0aW9uIHJlZ2V4cFRvUmVnZXhwIChwYXRoLCBrZXlzKSB7XG4gIC8vIFVzZSBhIG5lZ2F0aXZlIGxvb2thaGVhZCB0byBtYXRjaCBvbmx5IGNhcHR1cmluZyBncm91cHMuXG4gIHZhciBncm91cHMgPSBwYXRoLnNvdXJjZS5tYXRjaCgvXFwoKD8hXFw/KS9nKVxuXG4gIGlmIChncm91cHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdyb3Vwcy5sZW5ndGg7IGkrKykge1xuICAgICAga2V5cy5wdXNoKHtcbiAgICAgICAgbmFtZTogaSxcbiAgICAgICAgcHJlZml4OiBudWxsLFxuICAgICAgICBkZWxpbWl0ZXI6IG51bGwsXG4gICAgICAgIG9wdGlvbmFsOiBmYWxzZSxcbiAgICAgICAgcmVwZWF0OiBmYWxzZSxcbiAgICAgICAgcGFydGlhbDogZmFsc2UsXG4gICAgICAgIGFzdGVyaXNrOiBmYWxzZSxcbiAgICAgICAgcGF0dGVybjogbnVsbFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYXR0YWNoS2V5cyhwYXRoLCBrZXlzKVxufVxuXG4vKipcbiAqIFRyYW5zZm9ybSBhbiBhcnJheSBpbnRvIGEgcmVnZXhwLlxuICpcbiAqIEBwYXJhbSAgeyFBcnJheX0gIHBhdGhcbiAqIEBwYXJhbSAge0FycmF5fSAgIGtleXNcbiAqIEBwYXJhbSAgeyFPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4geyFSZWdFeHB9XG4gKi9cbmZ1bmN0aW9uIGFycmF5VG9SZWdleHAgKHBhdGgsIGtleXMsIG9wdGlvbnMpIHtcbiAgdmFyIHBhcnRzID0gW11cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICBwYXJ0cy5wdXNoKHBhdGhUb1JlZ2V4cChwYXRoW2ldLCBrZXlzLCBvcHRpb25zKS5zb3VyY2UpXG4gIH1cblxuICB2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cCgnKD86JyArIHBhcnRzLmpvaW4oJ3wnKSArICcpJywgZmxhZ3Mob3B0aW9ucykpXG5cbiAgcmV0dXJuIGF0dGFjaEtleXMocmVnZXhwLCBrZXlzKVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIHBhdGggcmVnZXhwIGZyb20gc3RyaW5nIGlucHV0LlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gIHBhdGhcbiAqIEBwYXJhbSAgeyFBcnJheX0gIGtleXNcbiAqIEBwYXJhbSAgeyFPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4geyFSZWdFeHB9XG4gKi9cbmZ1bmN0aW9uIHN0cmluZ1RvUmVnZXhwIChwYXRoLCBrZXlzLCBvcHRpb25zKSB7XG4gIHJldHVybiB0b2tlbnNUb1JlZ0V4cChwYXJzZShwYXRoLCBvcHRpb25zKSwga2V5cywgb3B0aW9ucylcbn1cblxuLyoqXG4gKiBFeHBvc2UgYSBmdW5jdGlvbiBmb3IgdGFraW5nIHRva2VucyBhbmQgcmV0dXJuaW5nIGEgUmVnRXhwLlxuICpcbiAqIEBwYXJhbSAgeyFBcnJheX0gICAgICAgICAgdG9rZW5zXG4gKiBAcGFyYW0gIHsoQXJyYXl8T2JqZWN0KT19IGtleXNcbiAqIEBwYXJhbSAge09iamVjdD19ICAgICAgICAgb3B0aW9uc1xuICogQHJldHVybiB7IVJlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gdG9rZW5zVG9SZWdFeHAgKHRva2Vucywga2V5cywgb3B0aW9ucykge1xuICBpZiAoIWlzYXJyYXkoa2V5cykpIHtcbiAgICBvcHRpb25zID0gLyoqIEB0eXBlIHshT2JqZWN0fSAqLyAoa2V5cyB8fCBvcHRpb25zKVxuICAgIGtleXMgPSBbXVxuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblxuICB2YXIgc3RyaWN0ID0gb3B0aW9ucy5zdHJpY3RcbiAgdmFyIGVuZCA9IG9wdGlvbnMuZW5kICE9PSBmYWxzZVxuICB2YXIgcm91dGUgPSAnJ1xuXG4gIC8vIEl0ZXJhdGUgb3ZlciB0aGUgdG9rZW5zIGFuZCBjcmVhdGUgb3VyIHJlZ2V4cCBzdHJpbmcuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHRva2VuID0gdG9rZW5zW2ldXG5cbiAgICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJykge1xuICAgICAgcm91dGUgKz0gZXNjYXBlU3RyaW5nKHRva2VuKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcHJlZml4ID0gZXNjYXBlU3RyaW5nKHRva2VuLnByZWZpeClcbiAgICAgIHZhciBjYXB0dXJlID0gJyg/OicgKyB0b2tlbi5wYXR0ZXJuICsgJyknXG5cbiAgICAgIGtleXMucHVzaCh0b2tlbilcblxuICAgICAgaWYgKHRva2VuLnJlcGVhdCkge1xuICAgICAgICBjYXB0dXJlICs9ICcoPzonICsgcHJlZml4ICsgY2FwdHVyZSArICcpKidcbiAgICAgIH1cblxuICAgICAgaWYgKHRva2VuLm9wdGlvbmFsKSB7XG4gICAgICAgIGlmICghdG9rZW4ucGFydGlhbCkge1xuICAgICAgICAgIGNhcHR1cmUgPSAnKD86JyArIHByZWZpeCArICcoJyArIGNhcHR1cmUgKyAnKSk/J1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhcHR1cmUgPSBwcmVmaXggKyAnKCcgKyBjYXB0dXJlICsgJyk/J1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYXB0dXJlID0gcHJlZml4ICsgJygnICsgY2FwdHVyZSArICcpJ1xuICAgICAgfVxuXG4gICAgICByb3V0ZSArPSBjYXB0dXJlXG4gICAgfVxuICB9XG5cbiAgdmFyIGRlbGltaXRlciA9IGVzY2FwZVN0cmluZyhvcHRpb25zLmRlbGltaXRlciB8fCAnLycpXG4gIHZhciBlbmRzV2l0aERlbGltaXRlciA9IHJvdXRlLnNsaWNlKC1kZWxpbWl0ZXIubGVuZ3RoKSA9PT0gZGVsaW1pdGVyXG5cbiAgLy8gSW4gbm9uLXN0cmljdCBtb2RlIHdlIGFsbG93IGEgc2xhc2ggYXQgdGhlIGVuZCBvZiBtYXRjaC4gSWYgdGhlIHBhdGggdG9cbiAgLy8gbWF0Y2ggYWxyZWFkeSBlbmRzIHdpdGggYSBzbGFzaCwgd2UgcmVtb3ZlIGl0IGZvciBjb25zaXN0ZW5jeS4gVGhlIHNsYXNoXG4gIC8vIGlzIHZhbGlkIGF0IHRoZSBlbmQgb2YgYSBwYXRoIG1hdGNoLCBub3QgaW4gdGhlIG1pZGRsZS4gVGhpcyBpcyBpbXBvcnRhbnRcbiAgLy8gaW4gbm9uLWVuZGluZyBtb2RlLCB3aGVyZSBcIi90ZXN0L1wiIHNob3VsZG4ndCBtYXRjaCBcIi90ZXN0Ly9yb3V0ZVwiLlxuICBpZiAoIXN0cmljdCkge1xuICAgIHJvdXRlID0gKGVuZHNXaXRoRGVsaW1pdGVyID8gcm91dGUuc2xpY2UoMCwgLWRlbGltaXRlci5sZW5ndGgpIDogcm91dGUpICsgJyg/OicgKyBkZWxpbWl0ZXIgKyAnKD89JCkpPydcbiAgfVxuXG4gIGlmIChlbmQpIHtcbiAgICByb3V0ZSArPSAnJCdcbiAgfSBlbHNlIHtcbiAgICAvLyBJbiBub24tZW5kaW5nIG1vZGUsIHdlIG5lZWQgdGhlIGNhcHR1cmluZyBncm91cHMgdG8gbWF0Y2ggYXMgbXVjaCBhc1xuICAgIC8vIHBvc3NpYmxlIGJ5IHVzaW5nIGEgcG9zaXRpdmUgbG9va2FoZWFkIHRvIHRoZSBlbmQgb3IgbmV4dCBwYXRoIHNlZ21lbnQuXG4gICAgcm91dGUgKz0gc3RyaWN0ICYmIGVuZHNXaXRoRGVsaW1pdGVyID8gJycgOiAnKD89JyArIGRlbGltaXRlciArICd8JCknXG4gIH1cblxuICByZXR1cm4gYXR0YWNoS2V5cyhuZXcgUmVnRXhwKCdeJyArIHJvdXRlLCBmbGFncyhvcHRpb25zKSksIGtleXMpXG59XG5cbi8qKlxuICogTm9ybWFsaXplIHRoZSBnaXZlbiBwYXRoIHN0cmluZywgcmV0dXJuaW5nIGEgcmVndWxhciBleHByZXNzaW9uLlxuICpcbiAqIEFuIGVtcHR5IGFycmF5IGNhbiBiZSBwYXNzZWQgaW4gZm9yIHRoZSBrZXlzLCB3aGljaCB3aWxsIGhvbGQgdGhlXG4gKiBwbGFjZWhvbGRlciBrZXkgZGVzY3JpcHRpb25zLiBGb3IgZXhhbXBsZSwgdXNpbmcgYC91c2VyLzppZGAsIGBrZXlzYCB3aWxsXG4gKiBjb250YWluIGBbeyBuYW1lOiAnaWQnLCBkZWxpbWl0ZXI6ICcvJywgb3B0aW9uYWw6IGZhbHNlLCByZXBlYXQ6IGZhbHNlIH1dYC5cbiAqXG4gKiBAcGFyYW0gIHsoc3RyaW5nfFJlZ0V4cHxBcnJheSl9IHBhdGhcbiAqIEBwYXJhbSAgeyhBcnJheXxPYmplY3QpPX0gICAgICAga2V5c1xuICogQHBhcmFtICB7T2JqZWN0PX0gICAgICAgICAgICAgICBvcHRpb25zXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiBwYXRoVG9SZWdleHAgKHBhdGgsIGtleXMsIG9wdGlvbnMpIHtcbiAgaWYgKCFpc2FycmF5KGtleXMpKSB7XG4gICAgb3B0aW9ucyA9IC8qKiBAdHlwZSB7IU9iamVjdH0gKi8gKGtleXMgfHwgb3B0aW9ucylcbiAgICBrZXlzID0gW11cbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cbiAgaWYgKHBhdGggaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICByZXR1cm4gcmVnZXhwVG9SZWdleHAocGF0aCwgLyoqIEB0eXBlIHshQXJyYXl9ICovIChrZXlzKSlcbiAgfVxuXG4gIGlmIChpc2FycmF5KHBhdGgpKSB7XG4gICAgcmV0dXJuIGFycmF5VG9SZWdleHAoLyoqIEB0eXBlIHshQXJyYXl9ICovIChwYXRoKSwgLyoqIEB0eXBlIHshQXJyYXl9ICovIChrZXlzKSwgb3B0aW9ucylcbiAgfVxuXG4gIHJldHVybiBzdHJpbmdUb1JlZ2V4cCgvKiogQHR5cGUge3N0cmluZ30gKi8gKHBhdGgpLCAvKiogQHR5cGUgeyFBcnJheX0gKi8gKGtleXMpLCBvcHRpb25zKVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG52YXIgY2hlY2tQcm9wVHlwZXMgPSByZXF1aXJlKCcuL2NoZWNrUHJvcFR5cGVzJyk7XG5cbnZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBwcmludFdhcm5pbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIHRleHQ7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcbn1cblxuZnVuY3Rpb24gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbCgpIHtcbiAgcmV0dXJuIG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgLyogZ2xvYmFsIFN5bWJvbCAqL1xuICB2YXIgSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gIHZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJzsgLy8gQmVmb3JlIFN5bWJvbCBzcGVjLlxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBtZXRob2QgZnVuY3Rpb24gY29udGFpbmVkIG9uIHRoZSBpdGVyYWJsZSBvYmplY3QuXG4gICAqXG4gICAqIEJlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBpdGVyYWJsZSBhcyBjb250ZXh0OlxuICAgKlxuICAgKiAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG15SXRlcmFibGUpO1xuICAgKiAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICogICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG15SXRlcmFibGUpO1xuICAgKiAgICAgICAuLi5cbiAgICogICAgIH1cbiAgICpcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBtYXliZUl0ZXJhYmxlXG4gICAqIEByZXR1cm4gez9mdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gbWF5YmVJdGVyYWJsZSAmJiAoSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXSk7XG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBtZXRob2RzIHRoYXQgYWxsb3cgZGVjbGFyYXRpb24gYW5kIHZhbGlkYXRpb24gb2YgcHJvcHMgdGhhdCBhcmVcbiAgICogc3VwcGxpZWQgdG8gUmVhY3QgY29tcG9uZW50cy4gRXhhbXBsZSB1c2FnZTpcbiAgICpcbiAgICogICB2YXIgUHJvcHMgPSByZXF1aXJlKCdSZWFjdFByb3BUeXBlcycpO1xuICAgKiAgIHZhciBNeUFydGljbGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIHByb3AgbmFtZWQgXCJkZXNjcmlwdGlvblwiLlxuICAgKiAgICAgICBkZXNjcmlwdGlvbjogUHJvcHMuc3RyaW5nLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHJlcXVpcmVkIGVudW0gcHJvcCBuYW1lZCBcImNhdGVnb3J5XCIuXG4gICAqICAgICAgIGNhdGVnb3J5OiBQcm9wcy5vbmVPZihbJ05ld3MnLCdQaG90b3MnXSkuaXNSZXF1aXJlZCxcbiAgICpcbiAgICogICAgICAgLy8gQSBwcm9wIG5hbWVkIFwiZGlhbG9nXCIgdGhhdCByZXF1aXJlcyBhbiBpbnN0YW5jZSBvZiBEaWFsb2cuXG4gICAqICAgICAgIGRpYWxvZzogUHJvcHMuaW5zdGFuY2VPZihEaWFsb2cpLmlzUmVxdWlyZWRcbiAgICogICAgIH0sXG4gICAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkgeyAuLi4gfVxuICAgKiAgIH0pO1xuICAgKlxuICAgKiBBIG1vcmUgZm9ybWFsIHNwZWNpZmljYXRpb24gb2YgaG93IHRoZXNlIG1ldGhvZHMgYXJlIHVzZWQ6XG4gICAqXG4gICAqICAgdHlwZSA6PSBhcnJheXxib29sfGZ1bmN8b2JqZWN0fG51bWJlcnxzdHJpbmd8b25lT2YoWy4uLl0pfGluc3RhbmNlT2YoLi4uKVxuICAgKiAgIGRlY2wgOj0gUmVhY3RQcm9wVHlwZXMue3R5cGV9KC5pc1JlcXVpcmVkKT9cbiAgICpcbiAgICogRWFjaCBhbmQgZXZlcnkgZGVjbGFyYXRpb24gcHJvZHVjZXMgYSBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIHNpZ25hdHVyZS4gVGhpc1xuICAgKiBhbGxvd3MgdGhlIGNyZWF0aW9uIG9mIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9ucy4gRm9yIGV4YW1wbGU6XG4gICAqXG4gICAqICB2YXIgTXlMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgb3IgVVJJIHByb3AgbmFtZWQgXCJocmVmXCIuXG4gICAqICAgICAgaHJlZjogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAqICAgICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgKiAgICAgICAgaWYgKHByb3BWYWx1ZSAhPSBudWxsICYmIHR5cGVvZiBwcm9wVmFsdWUgIT09ICdzdHJpbmcnICYmXG4gICAqICAgICAgICAgICAgIShwcm9wVmFsdWUgaW5zdGFuY2VvZiBVUkkpKSB7XG4gICAqICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAqICAgICAgICAgICAgJ0V4cGVjdGVkIGEgc3RyaW5nIG9yIGFuIFVSSSBmb3IgJyArIHByb3BOYW1lICsgJyBpbiAnICtcbiAgICogICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAqICAgICAgICAgICk7XG4gICAqICAgICAgICB9XG4gICAqICAgICAgfVxuICAgKiAgICB9LFxuICAgKiAgICByZW5kZXI6IGZ1bmN0aW9uKCkgey4uLn1cbiAgICogIH0pO1xuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG5cbiAgdmFyIEFOT05ZTU9VUyA9ICc8PGFub255bW91cz4+JztcblxuICAvLyBJbXBvcnRhbnQhXG4gIC8vIEtlZXAgdGhpcyBsaXN0IGluIHN5bmMgd2l0aCBwcm9kdWN0aW9uIHZlcnNpb24gaW4gYC4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYXJyYXknKSxcbiAgICBib29sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYm9vbGVhbicpLFxuICAgIGZ1bmM6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdmdW5jdGlvbicpLFxuICAgIG51bWJlcjogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ251bWJlcicpLFxuICAgIG9iamVjdDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ29iamVjdCcpLFxuICAgIHN0cmluZzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N0cmluZycpLFxuICAgIHN5bWJvbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N5bWJvbCcpLFxuXG4gICAgYW55OiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpLFxuICAgIGFycmF5T2Y6IGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcixcbiAgICBlbGVtZW50OiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSxcbiAgICBpbnN0YW5jZU9mOiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyLFxuICAgIG5vZGU6IGNyZWF0ZU5vZGVDaGVja2VyKCksXG4gICAgb2JqZWN0T2Y6IGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIsXG4gICAgb25lT2Y6IGNyZWF0ZUVudW1UeXBlQ2hlY2tlcixcbiAgICBvbmVPZlR5cGU6IGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIsXG4gICAgc2hhcGU6IGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIsXG4gICAgZXhhY3Q6IGNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIsXG4gIH07XG5cbiAgLyoqXG4gICAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gICAqL1xuICAvKmVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSovXG4gIGZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gICAgaWYgKHggPT09IHkpIHtcbiAgICAgIC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICAgIHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gICAgfVxuICB9XG4gIC8qZXNsaW50LWVuYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuXG4gIC8qKlxuICAgKiBXZSB1c2UgYW4gRXJyb3ItbGlrZSBvYmplY3QgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYXMgcGVvcGxlIG1heSBjYWxsXG4gICAqIFByb3BUeXBlcyBkaXJlY3RseSBhbmQgaW5zcGVjdCB0aGVpciBvdXRwdXQuIEhvd2V2ZXIsIHdlIGRvbid0IHVzZSByZWFsXG4gICAqIEVycm9ycyBhbnltb3JlLiBXZSBkb24ndCBpbnNwZWN0IHRoZWlyIHN0YWNrIGFueXdheSwgYW5kIGNyZWF0aW5nIHRoZW1cbiAgICogaXMgcHJvaGliaXRpdmVseSBleHBlbnNpdmUgaWYgdGhleSBhcmUgY3JlYXRlZCB0b28gb2Z0ZW4sIHN1Y2ggYXMgd2hhdFxuICAgKiBoYXBwZW5zIGluIG9uZU9mVHlwZSgpIGZvciBhbnkgdHlwZSBiZWZvcmUgdGhlIG9uZSB0aGF0IG1hdGNoZWQuXG4gICAqL1xuICBmdW5jdGlvbiBQcm9wVHlwZUVycm9yKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgfVxuICAvLyBNYWtlIGBpbnN0YW5jZW9mIEVycm9yYCBzdGlsbCB3b3JrIGZvciByZXR1cm5lZCBlcnJvcnMuXG4gIFByb3BUeXBlRXJyb3IucHJvdG90eXBlID0gRXJyb3IucHJvdG90eXBlO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZSA9IHt9O1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50ID0gMDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hlY2tUeXBlKGlzUmVxdWlyZWQsIHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICBwcm9wRnVsbE5hbWUgPSBwcm9wRnVsbE5hbWUgfHwgcHJvcE5hbWU7XG5cbiAgICAgIGlmIChzZWNyZXQgIT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAgIGlmICh0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gICAgICAgICAgLy8gTmV3IGJlaGF2aW9yIG9ubHkgZm9yIHVzZXJzIG9mIGBwcm9wLXR5cGVzYCBwYWNrYWdlXG4gICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICdVc2UgYFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpYCB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgICAgICAgKTtcbiAgICAgICAgICBlcnIubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBPbGQgYmVoYXZpb3IgZm9yIHBlb3BsZSB1c2luZyBSZWFjdC5Qcm9wVHlwZXNcbiAgICAgICAgICB2YXIgY2FjaGVLZXkgPSBjb21wb25lbnROYW1lICsgJzonICsgcHJvcE5hbWU7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIW1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSAmJlxuICAgICAgICAgICAgLy8gQXZvaWQgc3BhbW1pbmcgdGhlIGNvbnNvbGUgYmVjYXVzZSB0aGV5IGFyZSBvZnRlbiBub3QgYWN0aW9uYWJsZSBleGNlcHQgZm9yIGxpYiBhdXRob3JzXG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA8IDNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgICAgJ1lvdSBhcmUgbWFudWFsbHkgY2FsbGluZyBhIFJlYWN0LlByb3BUeXBlcyB2YWxpZGF0aW9uICcgK1xuICAgICAgICAgICAgICAnZnVuY3Rpb24gZm9yIHRoZSBgJyArIHByb3BGdWxsTmFtZSArICdgIHByb3Agb24gYCcgKyBjb21wb25lbnROYW1lICArICdgLiBUaGlzIGlzIGRlcHJlY2F0ZWQgJyArXG4gICAgICAgICAgICAgICdhbmQgd2lsbCB0aHJvdyBpbiB0aGUgc3RhbmRhbG9uZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAgICdZb3UgbWF5IGJlIHNlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIGEgdGhpcmQtcGFydHkgUHJvcFR5cGVzICcgK1xuICAgICAgICAgICAgICAnbGlicmFyeS4gU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1kb250LWNhbGwtcHJvcHR5cGVzICcgKyAnZm9yIGRldGFpbHMuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSA9IHRydWU7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PSBudWxsKSB7XG4gICAgICAgIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCAnICsgKCdpbiBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgbnVsbGAuJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkIGluICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGB1bmRlZmluZWRgLicpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjaGFpbmVkQ2hlY2tUeXBlID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgZmFsc2UpO1xuICAgIGNoYWluZWRDaGVja1R5cGUuaXNSZXF1aXJlZCA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIHRydWUpO1xuXG4gICAgcmV0dXJuIGNoYWluZWRDaGVja1R5cGU7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcihleHBlY3RlZFR5cGUpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09IGV4cGVjdGVkVHlwZSkge1xuICAgICAgICAvLyBgcHJvcFZhbHVlYCBiZWluZyBpbnN0YW5jZSBvZiwgc2F5LCBkYXRlL3JlZ2V4cCwgcGFzcyB0aGUgJ29iamVjdCdcbiAgICAgICAgLy8gY2hlY2ssIGJ1dCB3ZSBjYW4gb2ZmZXIgYSBtb3JlIHByZWNpc2UgZXJyb3IgbWVzc2FnZSBoZXJlIHJhdGhlciB0aGFuXG4gICAgICAgIC8vICdvZiB0eXBlIGBvYmplY3RgJy5cbiAgICAgICAgdmFyIHByZWNpc2VUeXBlID0gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcmVjaXNlVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnYCcgKyBleHBlY3RlZFR5cGUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFueVR5cGVDaGVja2VyKCkge1xuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcihlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBhcnJheU9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIGFycmF5LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwgaSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICdbJyArIGkgKyAnXScsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyKGV4cGVjdGVkQ2xhc3MpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghKHByb3BzW3Byb3BOYW1lXSBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3MpKSB7XG4gICAgICAgIHZhciBleHBlY3RlZENsYXNzTmFtZSA9IGV4cGVjdGVkQ2xhc3MubmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICAgIHZhciBhY3R1YWxDbGFzc05hbWUgPSBnZXRDbGFzc05hbWUocHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgYWN0dWFsQ2xhc3NOYW1lICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdpbnN0YW5jZSBvZiBgJyArIGV4cGVjdGVkQ2xhc3NOYW1lICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIoZXhwZWN0ZWRWYWx1ZXMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWRWYWx1ZXMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gcHJpbnRXYXJuaW5nKCdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwZWN0ZWRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGlzKHByb3BWYWx1ZSwgZXhwZWN0ZWRWYWx1ZXNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkVmFsdWVzKTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdmFsdWUgYCcgKyBwcm9wVmFsdWUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgb25lIG9mICcgKyB2YWx1ZXNTdHJpbmcgKyAnLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgb2JqZWN0T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gb2JqZWN0LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgaWYgKHByb3BWYWx1ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVVbmlvblR5cGVDaGVja2VyKGFycmF5T2ZUeXBlQ2hlY2tlcnMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXlPZlR5cGVDaGVja2VycykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBwcmludFdhcm5pbmcoJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBjaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUuIEV4cGVjdGVkIGFuIGFycmF5IG9mIGNoZWNrIGZ1bmN0aW9ucywgYnV0ICcgK1xuICAgICAgICAgICdyZWNlaXZlZCAnICsgZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKGNoZWNrZXIpICsgJyBhdCBpbmRleCAnICsgaSArICcuJ1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICAgIGlmIChjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCFpc05vZGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBzaGFwZVR5cGVzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGFsbCBrZXlzIGluIGNhc2Ugc29tZSBhcmUgcmVxdWlyZWQgYnV0IG1pc3NpbmcgZnJvbVxuICAgICAgLy8gcHJvcHMuXG4gICAgICB2YXIgYWxsS2V5cyA9IGFzc2lnbih7fSwgcHJvcHNbcHJvcE5hbWVdLCBzaGFwZVR5cGVzKTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBhbGxLZXlzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoXG4gICAgICAgICAgICAnSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Aga2V5IGAnICsga2V5ICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJyArXG4gICAgICAgICAgICAnXFxuQmFkIG9iamVjdDogJyArIEpTT04uc3RyaW5naWZ5KHByb3BzW3Byb3BOYW1lXSwgbnVsbCwgJyAgJykgK1xuICAgICAgICAgICAgJ1xcblZhbGlkIGtleXM6ICcgKyAgSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXMoc2hhcGVUeXBlcyksIG51bGwsICcgICcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IHByb3BWYWx1ZS5lbnRyaWVzKSB7XG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkge1xuICAgIC8vIE5hdGl2ZSBTeW1ib2wuXG4gICAgaWYgKHByb3BUeXBlID09PSAnc3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXSA9PT0gJ1N5bWJvbCdcbiAgICBpZiAocHJvcFZhbHVlWydAQHRvU3RyaW5nVGFnJ10gPT09ICdTeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBGYWxsYmFjayBmb3Igbm9uLXNwZWMgY29tcGxpYW50IFN5bWJvbHMgd2hpY2ggYXJlIHBvbHlmaWxsZWQuXG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgcHJvcFZhbHVlIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBFcXVpdmFsZW50IG9mIGB0eXBlb2ZgIGJ1dCB3aXRoIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFycmF5IGFuZCByZWdleHAuXG4gIGZ1bmN0aW9uIGdldFByb3BUeXBlKHByb3BWYWx1ZSkge1xuICAgIHZhciBwcm9wVHlwZSA9IHR5cGVvZiBwcm9wVmFsdWU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgfVxuICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIC8vIE9sZCB3ZWJraXRzIChhdCBsZWFzdCB1bnRpbCBBbmRyb2lkIDQuMCkgcmV0dXJuICdmdW5jdGlvbicgcmF0aGVyIHRoYW5cbiAgICAgIC8vICdvYmplY3QnIGZvciB0eXBlb2YgYSBSZWdFeHAuIFdlJ2xsIG5vcm1hbGl6ZSB0aGlzIGhlcmUgc28gdGhhdCAvYmxhL1xuICAgICAgLy8gcGFzc2VzIFByb3BUeXBlcy5vYmplY3QuXG4gICAgICByZXR1cm4gJ29iamVjdCc7XG4gICAgfVxuICAgIGlmIChpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdzeW1ib2wnO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBUaGlzIGhhbmRsZXMgbW9yZSB0eXBlcyB0aGFuIGBnZXRQcm9wVHlwZWAuIE9ubHkgdXNlZCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gIC8vIFNlZSBgY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXJgLlxuICBmdW5jdGlvbiBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHByb3BWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvcFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJycgKyBwcm9wVmFsdWU7XG4gICAgfVxuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuICdkYXRlJztcbiAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gUmV0dXJucyBhIHN0cmluZyB0aGF0IGlzIHBvc3RmaXhlZCB0byBhIHdhcm5pbmcgYWJvdXQgYW4gaW52YWxpZCB0eXBlLlxuICAvLyBGb3IgZXhhbXBsZSwgXCJ1bmRlZmluZWRcIiBvciBcIm9mIHR5cGUgYXJyYXlcIlxuICBmdW5jdGlvbiBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcodmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IGdldFByZWNpc2VUeXBlKHZhbHVlKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHJldHVybiAnYW4gJyArIHR5cGU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgY2FzZSAncmVnZXhwJzpcbiAgICAgICAgcmV0dXJuICdhICcgKyB0eXBlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJucyBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIGFueS5cbiAgZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKHByb3BWYWx1ZSkge1xuICAgIGlmICghcHJvcFZhbHVlLmNvbnN0cnVjdG9yIHx8ICFwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgICAgcmV0dXJuIEFOT05ZTU9VUztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG5cbiAgUmVhY3RQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBjaGVja1Byb3BUeXBlcztcbiAgUmVhY3RQcm9wVHlwZXMuUHJvcFR5cGVzID0gUmVhY3RQcm9wVHlwZXM7XG5cbiAgcmV0dXJuIFJlYWN0UHJvcFR5cGVzO1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9ICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmXG4gICAgU3ltYm9sLmZvciAmJlxuICAgIFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSkgfHxcbiAgICAweGVhYzc7XG5cbiAgdmFyIGlzVmFsaWRFbGVtZW50ID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmXG4gICAgICBvYmplY3QgIT09IG51bGwgJiZcbiAgICAgIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xuICB9O1xuXG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IGRldmVsb3BtZW50IGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIHZhciB0aHJvd09uRGlyZWN0QWNjZXNzID0gdHJ1ZTtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzJykoaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpO1xufSBlbHNlIHtcbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgcHJvZHVjdGlvbiBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zJykoKTtcbn1cbiIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuaW1wb3J0IHdhcm5pbmcgZnJvbSBcIndhcm5pbmdcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IGNyZWF0ZUJyb3dzZXJIaXN0b3J5IGFzIGNyZWF0ZUhpc3RvcnkgfSBmcm9tIFwiaGlzdG9yeVwiO1xuaW1wb3J0IFJvdXRlciBmcm9tIFwiLi9Sb3V0ZXJcIjtcblxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgYSA8Um91dGVyPiB0aGF0IHVzZXMgSFRNTDUgaGlzdG9yeS5cbiAqL1xuXG52YXIgQnJvd3NlclJvdXRlciA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhCcm93c2VyUm91dGVyLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBCcm93c2VyUm91dGVyKCkge1xuICAgIHZhciBfdGVtcCwgX3RoaXMsIF9yZXQ7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQnJvd3NlclJvdXRlcik7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gX3JldCA9IChfdGVtcCA9IChfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9SZWFjdCRDb21wb25lbnQuY2FsbC5hcHBseShfUmVhY3QkQ29tcG9uZW50LCBbdGhpc10uY29uY2F0KGFyZ3MpKSksIF90aGlzKSwgX3RoaXMuaGlzdG9yeSA9IGNyZWF0ZUhpc3RvcnkoX3RoaXMucHJvcHMpLCBfdGVtcCksIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKF90aGlzLCBfcmV0KTtcbiAgfVxuXG4gIEJyb3dzZXJSb3V0ZXIucHJvdG90eXBlLmNvbXBvbmVudFdpbGxNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB3YXJuaW5nKCF0aGlzLnByb3BzLmhpc3RvcnksIFwiPEJyb3dzZXJSb3V0ZXI+IGlnbm9yZXMgdGhlIGhpc3RvcnkgcHJvcC4gVG8gdXNlIGEgY3VzdG9tIGhpc3RvcnksIFwiICsgXCJ1c2UgYGltcG9ydCB7IFJvdXRlciB9YCBpbnN0ZWFkIG9mIGBpbXBvcnQgeyBCcm93c2VyUm91dGVyIGFzIFJvdXRlciB9YC5cIik7XG4gIH07XG5cbiAgQnJvd3NlclJvdXRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlciwgeyBoaXN0b3J5OiB0aGlzLmhpc3RvcnksIGNoaWxkcmVuOiB0aGlzLnByb3BzLmNoaWxkcmVuIH0pO1xuICB9O1xuXG4gIHJldHVybiBCcm93c2VyUm91dGVyO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5Ccm93c2VyUm91dGVyLnByb3BUeXBlcyA9IHtcbiAgYmFzZW5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGZvcmNlUmVmcmVzaDogUHJvcFR5cGVzLmJvb2wsXG4gIGdldFVzZXJDb25maXJtYXRpb246IFByb3BUeXBlcy5mdW5jLFxuICBrZXlMZW5ndGg6IFByb3BUeXBlcy5udW1iZXIsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZVxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBCcm93c2VyUm91dGVyOyIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuaW1wb3J0IHdhcm5pbmcgZnJvbSBcIndhcm5pbmdcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IGNyZWF0ZUhhc2hIaXN0b3J5IGFzIGNyZWF0ZUhpc3RvcnkgfSBmcm9tIFwiaGlzdG9yeVwiO1xuaW1wb3J0IFJvdXRlciBmcm9tIFwiLi9Sb3V0ZXJcIjtcblxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgYSA8Um91dGVyPiB0aGF0IHVzZXMgd2luZG93LmxvY2F0aW9uLmhhc2guXG4gKi9cblxudmFyIEhhc2hSb3V0ZXIgPSBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoSGFzaFJvdXRlciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gSGFzaFJvdXRlcigpIHtcbiAgICB2YXIgX3RlbXAsIF90aGlzLCBfcmV0O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEhhc2hSb3V0ZXIpO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuIF9yZXQgPSAoX3RlbXAgPSAoX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfUmVhY3QkQ29tcG9uZW50LmNhbGwuYXBwbHkoX1JlYWN0JENvbXBvbmVudCwgW3RoaXNdLmNvbmNhdChhcmdzKSkpLCBfdGhpcyksIF90aGlzLmhpc3RvcnkgPSBjcmVhdGVIaXN0b3J5KF90aGlzLnByb3BzKSwgX3RlbXApLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihfdGhpcywgX3JldCk7XG4gIH1cblxuICBIYXNoUm91dGVyLnByb3RvdHlwZS5jb21wb25lbnRXaWxsTW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgd2FybmluZyghdGhpcy5wcm9wcy5oaXN0b3J5LCBcIjxIYXNoUm91dGVyPiBpZ25vcmVzIHRoZSBoaXN0b3J5IHByb3AuIFRvIHVzZSBhIGN1c3RvbSBoaXN0b3J5LCBcIiArIFwidXNlIGBpbXBvcnQgeyBSb3V0ZXIgfWAgaW5zdGVhZCBvZiBgaW1wb3J0IHsgSGFzaFJvdXRlciBhcyBSb3V0ZXIgfWAuXCIpO1xuICB9O1xuXG4gIEhhc2hSb3V0ZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZXIsIHsgaGlzdG9yeTogdGhpcy5oaXN0b3J5LCBjaGlsZHJlbjogdGhpcy5wcm9wcy5jaGlsZHJlbiB9KTtcbiAgfTtcblxuICByZXR1cm4gSGFzaFJvdXRlcjtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuSGFzaFJvdXRlci5wcm9wVHlwZXMgPSB7XG4gIGJhc2VuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBnZXRVc2VyQ29uZmlybWF0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgaGFzaFR5cGU6IFByb3BUeXBlcy5vbmVPZihbXCJoYXNoYmFuZ1wiLCBcIm5vc2xhc2hcIiwgXCJzbGFzaFwiXSksXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZVxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBIYXNoUm91dGVyOyIsInZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gXCJpbnZhcmlhbnRcIjtcbmltcG9ydCB7IGNyZWF0ZUxvY2F0aW9uIH0gZnJvbSBcImhpc3RvcnlcIjtcblxudmFyIGlzTW9kaWZpZWRFdmVudCA9IGZ1bmN0aW9uIGlzTW9kaWZpZWRFdmVudChldmVudCkge1xuICByZXR1cm4gISEoZXZlbnQubWV0YUtleSB8fCBldmVudC5hbHRLZXkgfHwgZXZlbnQuY3RybEtleSB8fCBldmVudC5zaGlmdEtleSk7XG59O1xuXG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciByZW5kZXJpbmcgYSBoaXN0b3J5LWF3YXJlIDxhPi5cbiAqL1xuXG52YXIgTGluayA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhMaW5rLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBMaW5rKCkge1xuICAgIHZhciBfdGVtcCwgX3RoaXMsIF9yZXQ7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTGluayk7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gX3JldCA9IChfdGVtcCA9IChfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9SZWFjdCRDb21wb25lbnQuY2FsbC5hcHBseShfUmVhY3QkQ29tcG9uZW50LCBbdGhpc10uY29uY2F0KGFyZ3MpKSksIF90aGlzKSwgX3RoaXMuaGFuZGxlQ2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmIChfdGhpcy5wcm9wcy5vbkNsaWNrKSBfdGhpcy5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcblxuICAgICAgaWYgKCFldmVudC5kZWZhdWx0UHJldmVudGVkICYmIC8vIG9uQ2xpY2sgcHJldmVudGVkIGRlZmF1bHRcbiAgICAgIGV2ZW50LmJ1dHRvbiA9PT0gMCAmJiAvLyBpZ25vcmUgZXZlcnl0aGluZyBidXQgbGVmdCBjbGlja3NcbiAgICAgICFfdGhpcy5wcm9wcy50YXJnZXQgJiYgLy8gbGV0IGJyb3dzZXIgaGFuZGxlIFwidGFyZ2V0PV9ibGFua1wiIGV0Yy5cbiAgICAgICFpc01vZGlmaWVkRXZlbnQoZXZlbnQpIC8vIGlnbm9yZSBjbGlja3Mgd2l0aCBtb2RpZmllciBrZXlzXG4gICAgICApIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgdmFyIGhpc3RvcnkgPSBfdGhpcy5jb250ZXh0LnJvdXRlci5oaXN0b3J5O1xuICAgICAgICAgIHZhciBfdGhpcyRwcm9wcyA9IF90aGlzLnByb3BzLFxuICAgICAgICAgICAgICByZXBsYWNlID0gX3RoaXMkcHJvcHMucmVwbGFjZSxcbiAgICAgICAgICAgICAgdG8gPSBfdGhpcyRwcm9wcy50bztcblxuXG4gICAgICAgICAgaWYgKHJlcGxhY2UpIHtcbiAgICAgICAgICAgIGhpc3RvcnkucmVwbGFjZSh0byk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhpc3RvcnkucHVzaCh0byk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwgX3RlbXApLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihfdGhpcywgX3JldCk7XG4gIH1cblxuICBMaW5rLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgIHJlcGxhY2UgPSBfcHJvcHMucmVwbGFjZSxcbiAgICAgICAgdG8gPSBfcHJvcHMudG8sXG4gICAgICAgIGlubmVyUmVmID0gX3Byb3BzLmlubmVyUmVmLFxuICAgICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcHJvcHMsIFtcInJlcGxhY2VcIiwgXCJ0b1wiLCBcImlubmVyUmVmXCJdKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gICAgaW52YXJpYW50KHRoaXMuY29udGV4dC5yb3V0ZXIsIFwiWW91IHNob3VsZCBub3QgdXNlIDxMaW5rPiBvdXRzaWRlIGEgPFJvdXRlcj5cIik7XG5cbiAgICBpbnZhcmlhbnQodG8gIT09IHVuZGVmaW5lZCwgJ1lvdSBtdXN0IHNwZWNpZnkgdGhlIFwidG9cIiBwcm9wZXJ0eScpO1xuXG4gICAgdmFyIGhpc3RvcnkgPSB0aGlzLmNvbnRleHQucm91dGVyLmhpc3Rvcnk7XG5cbiAgICB2YXIgbG9jYXRpb24gPSB0eXBlb2YgdG8gPT09IFwic3RyaW5nXCIgPyBjcmVhdGVMb2NhdGlvbih0bywgbnVsbCwgbnVsbCwgaGlzdG9yeS5sb2NhdGlvbikgOiB0bztcblxuICAgIHZhciBocmVmID0gaGlzdG9yeS5jcmVhdGVIcmVmKGxvY2F0aW9uKTtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwgX2V4dGVuZHMoe30sIHByb3BzLCB7IG9uQ2xpY2s6IHRoaXMuaGFuZGxlQ2xpY2ssIGhyZWY6IGhyZWYsIHJlZjogaW5uZXJSZWYgfSkpO1xuICB9O1xuXG4gIHJldHVybiBMaW5rO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5MaW5rLnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gIHRhcmdldDogUHJvcFR5cGVzLnN0cmluZyxcbiAgcmVwbGFjZTogUHJvcFR5cGVzLmJvb2wsXG4gIHRvOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMub2JqZWN0XSkuaXNSZXF1aXJlZCxcbiAgaW5uZXJSZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5mdW5jXSlcbn07XG5MaW5rLmRlZmF1bHRQcm9wcyA9IHtcbiAgcmVwbGFjZTogZmFsc2Vcbn07XG5MaW5rLmNvbnRleHRUeXBlcyA9IHtcbiAgcm91dGVyOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGhpc3Rvcnk6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBwdXNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgcmVwbGFjZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIGNyZWF0ZUhyZWY6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgICB9KS5pc1JlcXVpcmVkXG4gIH0pLmlzUmVxdWlyZWRcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgTGluazsiLCIvLyBXcml0dGVuIGluIHRoaXMgcm91bmQgYWJvdXQgd2F5IGZvciBiYWJlbC10cmFuc2Zvcm0taW1wb3J0c1xuaW1wb3J0IE1lbW9yeVJvdXRlciBmcm9tIFwicmVhY3Qtcm91dGVyL2VzL01lbW9yeVJvdXRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBNZW1vcnlSb3V0ZXI7IiwidmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBSb3V0ZSBmcm9tIFwiLi9Sb3V0ZVwiO1xuaW1wb3J0IExpbmsgZnJvbSBcIi4vTGlua1wiO1xuXG4vKipcbiAqIEEgPExpbms+IHdyYXBwZXIgdGhhdCBrbm93cyBpZiBpdCdzIFwiYWN0aXZlXCIgb3Igbm90LlxuICovXG52YXIgTmF2TGluayA9IGZ1bmN0aW9uIE5hdkxpbmsoX3JlZikge1xuICB2YXIgdG8gPSBfcmVmLnRvLFxuICAgICAgZXhhY3QgPSBfcmVmLmV4YWN0LFxuICAgICAgc3RyaWN0ID0gX3JlZi5zdHJpY3QsXG4gICAgICBsb2NhdGlvbiA9IF9yZWYubG9jYXRpb24sXG4gICAgICBhY3RpdmVDbGFzc05hbWUgPSBfcmVmLmFjdGl2ZUNsYXNzTmFtZSxcbiAgICAgIGNsYXNzTmFtZSA9IF9yZWYuY2xhc3NOYW1lLFxuICAgICAgYWN0aXZlU3R5bGUgPSBfcmVmLmFjdGl2ZVN0eWxlLFxuICAgICAgc3R5bGUgPSBfcmVmLnN0eWxlLFxuICAgICAgZ2V0SXNBY3RpdmUgPSBfcmVmLmlzQWN0aXZlLFxuICAgICAgYXJpYUN1cnJlbnQgPSBfcmVmW1wiYXJpYS1jdXJyZW50XCJdLFxuICAgICAgcmVzdCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmLCBbXCJ0b1wiLCBcImV4YWN0XCIsIFwic3RyaWN0XCIsIFwibG9jYXRpb25cIiwgXCJhY3RpdmVDbGFzc05hbWVcIiwgXCJjbGFzc05hbWVcIiwgXCJhY3RpdmVTdHlsZVwiLCBcInN0eWxlXCIsIFwiaXNBY3RpdmVcIiwgXCJhcmlhLWN1cnJlbnRcIl0pO1xuXG4gIHZhciBwYXRoID0gKHR5cGVvZiB0byA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKHRvKSkgPT09IFwib2JqZWN0XCIgPyB0by5wYXRobmFtZSA6IHRvO1xuXG4gIC8vIFJlZ2V4IHRha2VuIGZyb206IGh0dHBzOi8vZ2l0aHViLmNvbS9waWxsYXJqcy9wYXRoLXRvLXJlZ2V4cC9ibG9iL21hc3Rlci9pbmRleC5qcyNMMjAyXG4gIHZhciBlc2NhcGVkUGF0aCA9IHBhdGggJiYgcGF0aC5yZXBsYWNlKC8oWy4rKj89XiE6JHt9KClbXFxdfC9cXFxcXSkvZywgXCJcXFxcJDFcIik7XG5cbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGUsIHtcbiAgICBwYXRoOiBlc2NhcGVkUGF0aCxcbiAgICBleGFjdDogZXhhY3QsXG4gICAgc3RyaWN0OiBzdHJpY3QsXG4gICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgIGNoaWxkcmVuOiBmdW5jdGlvbiBjaGlsZHJlbihfcmVmMikge1xuICAgICAgdmFyIGxvY2F0aW9uID0gX3JlZjIubG9jYXRpb24sXG4gICAgICAgICAgbWF0Y2ggPSBfcmVmMi5tYXRjaDtcblxuICAgICAgdmFyIGlzQWN0aXZlID0gISEoZ2V0SXNBY3RpdmUgPyBnZXRJc0FjdGl2ZShtYXRjaCwgbG9jYXRpb24pIDogbWF0Y2gpO1xuXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChMaW5rLCBfZXh0ZW5kcyh7XG4gICAgICAgIHRvOiB0byxcbiAgICAgICAgY2xhc3NOYW1lOiBpc0FjdGl2ZSA/IFtjbGFzc05hbWUsIGFjdGl2ZUNsYXNzTmFtZV0uZmlsdGVyKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH0pLmpvaW4oXCIgXCIpIDogY2xhc3NOYW1lLFxuICAgICAgICBzdHlsZTogaXNBY3RpdmUgPyBfZXh0ZW5kcyh7fSwgc3R5bGUsIGFjdGl2ZVN0eWxlKSA6IHN0eWxlLFxuICAgICAgICBcImFyaWEtY3VycmVudFwiOiBpc0FjdGl2ZSAmJiBhcmlhQ3VycmVudCB8fCBudWxsXG4gICAgICB9LCByZXN0KSk7XG4gICAgfVxuICB9KTtcbn07XG5cbk5hdkxpbmsucHJvcFR5cGVzID0ge1xuICB0bzogTGluay5wcm9wVHlwZXMudG8sXG4gIGV4YWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgc3RyaWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgbG9jYXRpb246IFByb3BUeXBlcy5vYmplY3QsXG4gIGFjdGl2ZUNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBhY3RpdmVTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gIGlzQWN0aXZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgXCJhcmlhLWN1cnJlbnRcIjogUHJvcFR5cGVzLm9uZU9mKFtcInBhZ2VcIiwgXCJzdGVwXCIsIFwibG9jYXRpb25cIiwgXCJkYXRlXCIsIFwidGltZVwiLCBcInRydWVcIl0pXG59O1xuXG5OYXZMaW5rLmRlZmF1bHRQcm9wcyA9IHtcbiAgYWN0aXZlQ2xhc3NOYW1lOiBcImFjdGl2ZVwiLFxuICBcImFyaWEtY3VycmVudFwiOiBcInBhZ2VcIlxufTtcblxuZXhwb3J0IGRlZmF1bHQgTmF2TGluazsiLCIvLyBXcml0dGVuIGluIHRoaXMgcm91bmQgYWJvdXQgd2F5IGZvciBiYWJlbC10cmFuc2Zvcm0taW1wb3J0c1xuaW1wb3J0IFByb21wdCBmcm9tIFwicmVhY3Qtcm91dGVyL2VzL1Byb21wdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBQcm9tcHQ7IiwiLy8gV3JpdHRlbiBpbiB0aGlzIHJvdW5kIGFib3V0IHdheSBmb3IgYmFiZWwtdHJhbnNmb3JtLWltcG9ydHNcbmltcG9ydCBSZWRpcmVjdCBmcm9tIFwicmVhY3Qtcm91dGVyL2VzL1JlZGlyZWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IFJlZGlyZWN0OyIsIi8vIFdyaXR0ZW4gaW4gdGhpcyByb3VuZCBhYm91dCB3YXkgZm9yIGJhYmVsLXRyYW5zZm9ybS1pbXBvcnRzXG5pbXBvcnQgUm91dGUgZnJvbSBcInJlYWN0LXJvdXRlci9lcy9Sb3V0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBSb3V0ZTsiLCIvLyBXcml0dGVuIGluIHRoaXMgcm91bmQgYWJvdXQgd2F5IGZvciBiYWJlbC10cmFuc2Zvcm0taW1wb3J0c1xuaW1wb3J0IFJvdXRlciBmcm9tIFwicmVhY3Qtcm91dGVyL2VzL1JvdXRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBSb3V0ZXI7IiwiLy8gV3JpdHRlbiBpbiB0aGlzIHJvdW5kIGFib3V0IHdheSBmb3IgYmFiZWwtdHJhbnNmb3JtLWltcG9ydHNcbmltcG9ydCBTdGF0aWNSb3V0ZXIgZnJvbSBcInJlYWN0LXJvdXRlci9lcy9TdGF0aWNSb3V0ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgU3RhdGljUm91dGVyOyIsIi8vIFdyaXR0ZW4gaW4gdGhpcyByb3VuZCBhYm91dCB3YXkgZm9yIGJhYmVsLXRyYW5zZm9ybS1pbXBvcnRzXG5pbXBvcnQgU3dpdGNoIGZyb20gXCJyZWFjdC1yb3V0ZXIvZXMvU3dpdGNoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IFN3aXRjaDsiLCIvLyBXcml0dGVuIGluIHRoaXMgcm91bmQgYWJvdXQgd2F5IGZvciBiYWJlbC10cmFuc2Zvcm0taW1wb3J0c1xuaW1wb3J0IGdlbmVyYXRlUGF0aCBmcm9tIFwicmVhY3Qtcm91dGVyL2VzL2dlbmVyYXRlUGF0aFwiO1xuXG5leHBvcnQgZGVmYXVsdCBnZW5lcmF0ZVBhdGg7IiwiaW1wb3J0IF9Ccm93c2VyUm91dGVyIGZyb20gXCIuL0Jyb3dzZXJSb3V0ZXJcIjtcbmV4cG9ydCB7IF9Ccm93c2VyUm91dGVyIGFzIEJyb3dzZXJSb3V0ZXIgfTtcbmltcG9ydCBfSGFzaFJvdXRlciBmcm9tIFwiLi9IYXNoUm91dGVyXCI7XG5leHBvcnQgeyBfSGFzaFJvdXRlciBhcyBIYXNoUm91dGVyIH07XG5pbXBvcnQgX0xpbmsgZnJvbSBcIi4vTGlua1wiO1xuZXhwb3J0IHsgX0xpbmsgYXMgTGluayB9O1xuaW1wb3J0IF9NZW1vcnlSb3V0ZXIgZnJvbSBcIi4vTWVtb3J5Um91dGVyXCI7XG5leHBvcnQgeyBfTWVtb3J5Um91dGVyIGFzIE1lbW9yeVJvdXRlciB9O1xuaW1wb3J0IF9OYXZMaW5rIGZyb20gXCIuL05hdkxpbmtcIjtcbmV4cG9ydCB7IF9OYXZMaW5rIGFzIE5hdkxpbmsgfTtcbmltcG9ydCBfUHJvbXB0IGZyb20gXCIuL1Byb21wdFwiO1xuZXhwb3J0IHsgX1Byb21wdCBhcyBQcm9tcHQgfTtcbmltcG9ydCBfUmVkaXJlY3QgZnJvbSBcIi4vUmVkaXJlY3RcIjtcbmV4cG9ydCB7IF9SZWRpcmVjdCBhcyBSZWRpcmVjdCB9O1xuaW1wb3J0IF9Sb3V0ZSBmcm9tIFwiLi9Sb3V0ZVwiO1xuZXhwb3J0IHsgX1JvdXRlIGFzIFJvdXRlIH07XG5pbXBvcnQgX1JvdXRlciBmcm9tIFwiLi9Sb3V0ZXJcIjtcbmV4cG9ydCB7IF9Sb3V0ZXIgYXMgUm91dGVyIH07XG5pbXBvcnQgX1N0YXRpY1JvdXRlciBmcm9tIFwiLi9TdGF0aWNSb3V0ZXJcIjtcbmV4cG9ydCB7IF9TdGF0aWNSb3V0ZXIgYXMgU3RhdGljUm91dGVyIH07XG5pbXBvcnQgX1N3aXRjaCBmcm9tIFwiLi9Td2l0Y2hcIjtcbmV4cG9ydCB7IF9Td2l0Y2ggYXMgU3dpdGNoIH07XG5pbXBvcnQgX2dlbmVyYXRlUGF0aCBmcm9tIFwiLi9nZW5lcmF0ZVBhdGhcIjtcbmV4cG9ydCB7IF9nZW5lcmF0ZVBhdGggYXMgZ2VuZXJhdGVQYXRoIH07XG5pbXBvcnQgX21hdGNoUGF0aCBmcm9tIFwiLi9tYXRjaFBhdGhcIjtcbmV4cG9ydCB7IF9tYXRjaFBhdGggYXMgbWF0Y2hQYXRoIH07XG5pbXBvcnQgX3dpdGhSb3V0ZXIgZnJvbSBcIi4vd2l0aFJvdXRlclwiO1xuZXhwb3J0IHsgX3dpdGhSb3V0ZXIgYXMgd2l0aFJvdXRlciB9OyIsIi8vIFdyaXR0ZW4gaW4gdGhpcyByb3VuZCBhYm91dCB3YXkgZm9yIGJhYmVsLXRyYW5zZm9ybS1pbXBvcnRzXG5pbXBvcnQgbWF0Y2hQYXRoIGZyb20gXCJyZWFjdC1yb3V0ZXIvZXMvbWF0Y2hQYXRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IG1hdGNoUGF0aDsiLCIvLyBXcml0dGVuIGluIHRoaXMgcm91bmQgYWJvdXQgd2F5IGZvciBiYWJlbC10cmFuc2Zvcm0taW1wb3J0c1xuaW1wb3J0IHdpdGhSb3V0ZXIgZnJvbSBcInJlYWN0LXJvdXRlci9lcy93aXRoUm91dGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXI7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciBfX0RFVl9fID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJztcblxudmFyIHdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAoX19ERVZfXykge1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMiA/IGxlbiAtIDIgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAyOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDJdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArXG4gICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfVxuXG4gIHdhcm5pbmcgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMiA/IGxlbiAtIDIgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAyOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDJdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICtcbiAgICAgICAgICAnbWVzc2FnZSBhcmd1bWVudCdcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBwcmludFdhcm5pbmcuYXBwbHkobnVsbCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcbiIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuaW1wb3J0IHdhcm5pbmcgZnJvbSBcIndhcm5pbmdcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IGNyZWF0ZU1lbW9yeUhpc3RvcnkgYXMgY3JlYXRlSGlzdG9yeSB9IGZyb20gXCJoaXN0b3J5XCI7XG5pbXBvcnQgUm91dGVyIGZyb20gXCIuL1JvdXRlclwiO1xuXG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciBhIDxSb3V0ZXI+IHRoYXQgc3RvcmVzIGxvY2F0aW9uIGluIG1lbW9yeS5cbiAqL1xuXG52YXIgTWVtb3J5Um91dGVyID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzKE1lbW9yeVJvdXRlciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gTWVtb3J5Um91dGVyKCkge1xuICAgIHZhciBfdGVtcCwgX3RoaXMsIF9yZXQ7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTWVtb3J5Um91dGVyKTtcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHJldHVybiBfcmV0ID0gKF90ZW1wID0gKF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoYXJncykpKSwgX3RoaXMpLCBfdGhpcy5oaXN0b3J5ID0gY3JlYXRlSGlzdG9yeShfdGhpcy5wcm9wcyksIF90ZW1wKSwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oX3RoaXMsIF9yZXQpO1xuICB9XG5cbiAgTWVtb3J5Um91dGVyLnByb3RvdHlwZS5jb21wb25lbnRXaWxsTW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgd2FybmluZyghdGhpcy5wcm9wcy5oaXN0b3J5LCBcIjxNZW1vcnlSb3V0ZXI+IGlnbm9yZXMgdGhlIGhpc3RvcnkgcHJvcC4gVG8gdXNlIGEgY3VzdG9tIGhpc3RvcnksIFwiICsgXCJ1c2UgYGltcG9ydCB7IFJvdXRlciB9YCBpbnN0ZWFkIG9mIGBpbXBvcnQgeyBNZW1vcnlSb3V0ZXIgYXMgUm91dGVyIH1gLlwiKTtcbiAgfTtcblxuICBNZW1vcnlSb3V0ZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZXIsIHsgaGlzdG9yeTogdGhpcy5oaXN0b3J5LCBjaGlsZHJlbjogdGhpcy5wcm9wcy5jaGlsZHJlbiB9KTtcbiAgfTtcblxuICByZXR1cm4gTWVtb3J5Um91dGVyO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5NZW1vcnlSb3V0ZXIucHJvcFR5cGVzID0ge1xuICBpbml0aWFsRW50cmllczogUHJvcFR5cGVzLmFycmF5LFxuICBpbml0aWFsSW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG4gIGdldFVzZXJDb25maXJtYXRpb246IFByb3BUeXBlcy5mdW5jLFxuICBrZXlMZW5ndGg6IFByb3BUeXBlcy5udW1iZXIsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZVxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBNZW1vcnlSb3V0ZXI7IiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gXCJpbnZhcmlhbnRcIjtcblxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgcHJvbXB0aW5nIHRoZSB1c2VyIGJlZm9yZSBuYXZpZ2F0aW5nIGF3YXlcbiAqIGZyb20gYSBzY3JlZW4gd2l0aCBhIGNvbXBvbmVudC5cbiAqL1xuXG52YXIgUHJvbXB0ID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzKFByb21wdCwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gUHJvbXB0KCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQcm9tcHQpO1xuXG4gICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9SZWFjdCRDb21wb25lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICBQcm9tcHQucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uIGVuYWJsZShtZXNzYWdlKSB7XG4gICAgaWYgKHRoaXMudW5ibG9jaykgdGhpcy51bmJsb2NrKCk7XG5cbiAgICB0aGlzLnVuYmxvY2sgPSB0aGlzLmNvbnRleHQucm91dGVyLmhpc3RvcnkuYmxvY2sobWVzc2FnZSk7XG4gIH07XG5cbiAgUHJvbXB0LnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICBpZiAodGhpcy51bmJsb2NrKSB7XG4gICAgICB0aGlzLnVuYmxvY2soKTtcbiAgICAgIHRoaXMudW5ibG9jayA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIFByb21wdC5wcm90b3R5cGUuY29tcG9uZW50V2lsbE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGludmFyaWFudCh0aGlzLmNvbnRleHQucm91dGVyLCBcIllvdSBzaG91bGQgbm90IHVzZSA8UHJvbXB0PiBvdXRzaWRlIGEgPFJvdXRlcj5cIik7XG5cbiAgICBpZiAodGhpcy5wcm9wcy53aGVuKSB0aGlzLmVuYWJsZSh0aGlzLnByb3BzLm1lc3NhZ2UpO1xuICB9O1xuXG4gIFByb21wdC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKG5leHRQcm9wcy53aGVuKSB7XG4gICAgICBpZiAoIXRoaXMucHJvcHMud2hlbiB8fCB0aGlzLnByb3BzLm1lc3NhZ2UgIT09IG5leHRQcm9wcy5tZXNzYWdlKSB0aGlzLmVuYWJsZShuZXh0UHJvcHMubWVzc2FnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlzYWJsZSgpO1xuICAgIH1cbiAgfTtcblxuICBQcm9tcHQucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5kaXNhYmxlKCk7XG4gIH07XG5cbiAgUHJvbXB0LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgcmV0dXJuIFByb21wdDtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuUHJvbXB0LnByb3BUeXBlcyA9IHtcbiAgd2hlbjogUHJvcFR5cGVzLmJvb2wsXG4gIG1lc3NhZ2U6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMuc3RyaW5nXSkuaXNSZXF1aXJlZFxufTtcblByb21wdC5kZWZhdWx0UHJvcHMgPSB7XG4gIHdoZW46IHRydWVcbn07XG5Qcm9tcHQuY29udGV4dFR5cGVzID0ge1xuICByb3V0ZXI6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaGlzdG9yeTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGJsb2NrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG4gICAgfSkuaXNSZXF1aXJlZFxuICB9KS5pc1JlcXVpcmVkXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFByb21wdDsiLCJ2YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB3YXJuaW5nIGZyb20gXCJ3YXJuaW5nXCI7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gXCJpbnZhcmlhbnRcIjtcbmltcG9ydCB7IGNyZWF0ZUxvY2F0aW9uLCBsb2NhdGlvbnNBcmVFcXVhbCB9IGZyb20gXCJoaXN0b3J5XCI7XG5pbXBvcnQgZ2VuZXJhdGVQYXRoIGZyb20gXCIuL2dlbmVyYXRlUGF0aFwiO1xuXG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciB1cGRhdGluZyB0aGUgbG9jYXRpb24gcHJvZ3JhbW1hdGljYWxseVxuICogd2l0aCBhIGNvbXBvbmVudC5cbiAqL1xuXG52YXIgUmVkaXJlY3QgPSBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoUmVkaXJlY3QsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFJlZGlyZWN0KCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBSZWRpcmVjdCk7XG5cbiAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX1JlYWN0JENvbXBvbmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIFJlZGlyZWN0LnByb3RvdHlwZS5pc1N0YXRpYyA9IGZ1bmN0aW9uIGlzU3RhdGljKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQucm91dGVyICYmIHRoaXMuY29udGV4dC5yb3V0ZXIuc3RhdGljQ29udGV4dDtcbiAgfTtcblxuICBSZWRpcmVjdC5wcm90b3R5cGUuY29tcG9uZW50V2lsbE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGludmFyaWFudCh0aGlzLmNvbnRleHQucm91dGVyLCBcIllvdSBzaG91bGQgbm90IHVzZSA8UmVkaXJlY3Q+IG91dHNpZGUgYSA8Um91dGVyPlwiKTtcblxuICAgIGlmICh0aGlzLmlzU3RhdGljKCkpIHRoaXMucGVyZm9ybSgpO1xuICB9O1xuXG4gIFJlZGlyZWN0LnByb3RvdHlwZS5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGlmICghdGhpcy5pc1N0YXRpYygpKSB0aGlzLnBlcmZvcm0oKTtcbiAgfTtcblxuICBSZWRpcmVjdC5wcm90b3R5cGUuY29tcG9uZW50RGlkVXBkYXRlID0gZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIHZhciBwcmV2VG8gPSBjcmVhdGVMb2NhdGlvbihwcmV2UHJvcHMudG8pO1xuICAgIHZhciBuZXh0VG8gPSBjcmVhdGVMb2NhdGlvbih0aGlzLnByb3BzLnRvKTtcblxuICAgIGlmIChsb2NhdGlvbnNBcmVFcXVhbChwcmV2VG8sIG5leHRUbykpIHtcbiAgICAgIHdhcm5pbmcoZmFsc2UsIFwiWW91IHRyaWVkIHRvIHJlZGlyZWN0IHRvIHRoZSBzYW1lIHJvdXRlIHlvdSdyZSBjdXJyZW50bHkgb246IFwiICsgKFwiXFxcIlwiICsgbmV4dFRvLnBhdGhuYW1lICsgbmV4dFRvLnNlYXJjaCArIFwiXFxcIlwiKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5wZXJmb3JtKCk7XG4gIH07XG5cbiAgUmVkaXJlY3QucHJvdG90eXBlLmNvbXB1dGVUbyA9IGZ1bmN0aW9uIGNvbXB1dGVUbyhfcmVmKSB7XG4gICAgdmFyIGNvbXB1dGVkTWF0Y2ggPSBfcmVmLmNvbXB1dGVkTWF0Y2gsXG4gICAgICAgIHRvID0gX3JlZi50bztcblxuICAgIGlmIChjb21wdXRlZE1hdGNoKSB7XG4gICAgICBpZiAodHlwZW9mIHRvID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZVBhdGgodG8sIGNvbXB1dGVkTWF0Y2gucGFyYW1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgdG8sIHtcbiAgICAgICAgICBwYXRobmFtZTogZ2VuZXJhdGVQYXRoKHRvLnBhdGhuYW1lLCBjb21wdXRlZE1hdGNoLnBhcmFtcylcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvO1xuICB9O1xuXG4gIFJlZGlyZWN0LnByb3RvdHlwZS5wZXJmb3JtID0gZnVuY3Rpb24gcGVyZm9ybSgpIHtcbiAgICB2YXIgaGlzdG9yeSA9IHRoaXMuY29udGV4dC5yb3V0ZXIuaGlzdG9yeTtcbiAgICB2YXIgcHVzaCA9IHRoaXMucHJvcHMucHVzaDtcblxuICAgIHZhciB0byA9IHRoaXMuY29tcHV0ZVRvKHRoaXMucHJvcHMpO1xuXG4gICAgaWYgKHB1c2gpIHtcbiAgICAgIGhpc3RvcnkucHVzaCh0byk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhpc3RvcnkucmVwbGFjZSh0byk7XG4gICAgfVxuICB9O1xuXG4gIFJlZGlyZWN0LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgcmV0dXJuIFJlZGlyZWN0O1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5SZWRpcmVjdC5wcm9wVHlwZXMgPSB7XG4gIGNvbXB1dGVkTWF0Y2g6IFByb3BUeXBlcy5vYmplY3QsIC8vIHByaXZhdGUsIGZyb20gPFN3aXRjaD5cbiAgcHVzaDogUHJvcFR5cGVzLmJvb2wsXG4gIGZyb206IFByb3BUeXBlcy5zdHJpbmcsXG4gIHRvOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMub2JqZWN0XSkuaXNSZXF1aXJlZFxufTtcblJlZGlyZWN0LmRlZmF1bHRQcm9wcyA9IHtcbiAgcHVzaDogZmFsc2Vcbn07XG5SZWRpcmVjdC5jb250ZXh0VHlwZXMgPSB7XG4gIHJvdXRlcjogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBoaXN0b3J5OiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgcHVzaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHJlcGxhY2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgICB9KS5pc1JlcXVpcmVkLFxuICAgIHN0YXRpY0NvbnRleHQ6IFByb3BUeXBlcy5vYmplY3RcbiAgfSkuaXNSZXF1aXJlZFxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBSZWRpcmVjdDsiLCJ2YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbmltcG9ydCB3YXJuaW5nIGZyb20gXCJ3YXJuaW5nXCI7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gXCJpbnZhcmlhbnRcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBtYXRjaFBhdGggZnJvbSBcIi4vbWF0Y2hQYXRoXCI7XG5cbnZhciBpc0VtcHR5Q2hpbGRyZW4gPSBmdW5jdGlvbiBpc0VtcHR5Q2hpbGRyZW4oY2hpbGRyZW4pIHtcbiAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLmNvdW50KGNoaWxkcmVuKSA9PT0gMDtcbn07XG5cbi8qKlxuICogVGhlIHB1YmxpYyBBUEkgZm9yIG1hdGNoaW5nIGEgc2luZ2xlIHBhdGggYW5kIHJlbmRlcmluZy5cbiAqL1xuXG52YXIgUm91dGUgPSBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoUm91dGUsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFJvdXRlKCkge1xuICAgIHZhciBfdGVtcCwgX3RoaXMsIF9yZXQ7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUm91dGUpO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuIF9yZXQgPSAoX3RlbXAgPSAoX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfUmVhY3QkQ29tcG9uZW50LmNhbGwuYXBwbHkoX1JlYWN0JENvbXBvbmVudCwgW3RoaXNdLmNvbmNhdChhcmdzKSkpLCBfdGhpcyksIF90aGlzLnN0YXRlID0ge1xuICAgICAgbWF0Y2g6IF90aGlzLmNvbXB1dGVNYXRjaChfdGhpcy5wcm9wcywgX3RoaXMuY29udGV4dC5yb3V0ZXIpXG4gICAgfSwgX3RlbXApLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihfdGhpcywgX3JldCk7XG4gIH1cblxuICBSb3V0ZS5wcm90b3R5cGUuZ2V0Q2hpbGRDb250ZXh0ID0gZnVuY3Rpb24gZ2V0Q2hpbGRDb250ZXh0KCkge1xuICAgIHJldHVybiB7XG4gICAgICByb3V0ZXI6IF9leHRlbmRzKHt9LCB0aGlzLmNvbnRleHQucm91dGVyLCB7XG4gICAgICAgIHJvdXRlOiB7XG4gICAgICAgICAgbG9jYXRpb246IHRoaXMucHJvcHMubG9jYXRpb24gfHwgdGhpcy5jb250ZXh0LnJvdXRlci5yb3V0ZS5sb2NhdGlvbixcbiAgICAgICAgICBtYXRjaDogdGhpcy5zdGF0ZS5tYXRjaFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH07XG4gIH07XG5cbiAgUm91dGUucHJvdG90eXBlLmNvbXB1dGVNYXRjaCA9IGZ1bmN0aW9uIGNvbXB1dGVNYXRjaChfcmVmLCByb3V0ZXIpIHtcbiAgICB2YXIgY29tcHV0ZWRNYXRjaCA9IF9yZWYuY29tcHV0ZWRNYXRjaCxcbiAgICAgICAgbG9jYXRpb24gPSBfcmVmLmxvY2F0aW9uLFxuICAgICAgICBwYXRoID0gX3JlZi5wYXRoLFxuICAgICAgICBzdHJpY3QgPSBfcmVmLnN0cmljdCxcbiAgICAgICAgZXhhY3QgPSBfcmVmLmV4YWN0LFxuICAgICAgICBzZW5zaXRpdmUgPSBfcmVmLnNlbnNpdGl2ZTtcblxuICAgIGlmIChjb21wdXRlZE1hdGNoKSByZXR1cm4gY29tcHV0ZWRNYXRjaDsgLy8gPFN3aXRjaD4gYWxyZWFkeSBjb21wdXRlZCB0aGUgbWF0Y2ggZm9yIHVzXG5cbiAgICBpbnZhcmlhbnQocm91dGVyLCBcIllvdSBzaG91bGQgbm90IHVzZSA8Um91dGU+IG9yIHdpdGhSb3V0ZXIoKSBvdXRzaWRlIGEgPFJvdXRlcj5cIik7XG5cbiAgICB2YXIgcm91dGUgPSByb3V0ZXIucm91dGU7XG5cbiAgICB2YXIgcGF0aG5hbWUgPSAobG9jYXRpb24gfHwgcm91dGUubG9jYXRpb24pLnBhdGhuYW1lO1xuXG4gICAgcmV0dXJuIG1hdGNoUGF0aChwYXRobmFtZSwgeyBwYXRoOiBwYXRoLCBzdHJpY3Q6IHN0cmljdCwgZXhhY3Q6IGV4YWN0LCBzZW5zaXRpdmU6IHNlbnNpdGl2ZSB9LCByb3V0ZS5tYXRjaCk7XG4gIH07XG5cbiAgUm91dGUucHJvdG90eXBlLmNvbXBvbmVudFdpbGxNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB3YXJuaW5nKCEodGhpcy5wcm9wcy5jb21wb25lbnQgJiYgdGhpcy5wcm9wcy5yZW5kZXIpLCBcIllvdSBzaG91bGQgbm90IHVzZSA8Um91dGUgY29tcG9uZW50PiBhbmQgPFJvdXRlIHJlbmRlcj4gaW4gdGhlIHNhbWUgcm91dGU7IDxSb3V0ZSByZW5kZXI+IHdpbGwgYmUgaWdub3JlZFwiKTtcblxuICAgIHdhcm5pbmcoISh0aGlzLnByb3BzLmNvbXBvbmVudCAmJiB0aGlzLnByb3BzLmNoaWxkcmVuICYmICFpc0VtcHR5Q2hpbGRyZW4odGhpcy5wcm9wcy5jaGlsZHJlbikpLCBcIllvdSBzaG91bGQgbm90IHVzZSA8Um91dGUgY29tcG9uZW50PiBhbmQgPFJvdXRlIGNoaWxkcmVuPiBpbiB0aGUgc2FtZSByb3V0ZTsgPFJvdXRlIGNoaWxkcmVuPiB3aWxsIGJlIGlnbm9yZWRcIik7XG5cbiAgICB3YXJuaW5nKCEodGhpcy5wcm9wcy5yZW5kZXIgJiYgdGhpcy5wcm9wcy5jaGlsZHJlbiAmJiAhaXNFbXB0eUNoaWxkcmVuKHRoaXMucHJvcHMuY2hpbGRyZW4pKSwgXCJZb3Ugc2hvdWxkIG5vdCB1c2UgPFJvdXRlIHJlbmRlcj4gYW5kIDxSb3V0ZSBjaGlsZHJlbj4gaW4gdGhlIHNhbWUgcm91dGU7IDxSb3V0ZSBjaGlsZHJlbj4gd2lsbCBiZSBpZ25vcmVkXCIpO1xuICB9O1xuXG4gIFJvdXRlLnByb3RvdHlwZS5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMsIG5leHRDb250ZXh0KSB7XG4gICAgd2FybmluZyghKG5leHRQcm9wcy5sb2NhdGlvbiAmJiAhdGhpcy5wcm9wcy5sb2NhdGlvbiksICc8Um91dGU+IGVsZW1lbnRzIHNob3VsZCBub3QgY2hhbmdlIGZyb20gdW5jb250cm9sbGVkIHRvIGNvbnRyb2xsZWQgKG9yIHZpY2UgdmVyc2EpLiBZb3UgaW5pdGlhbGx5IHVzZWQgbm8gXCJsb2NhdGlvblwiIHByb3AgYW5kIHRoZW4gcHJvdmlkZWQgb25lIG9uIGEgc3Vic2VxdWVudCByZW5kZXIuJyk7XG5cbiAgICB3YXJuaW5nKCEoIW5leHRQcm9wcy5sb2NhdGlvbiAmJiB0aGlzLnByb3BzLmxvY2F0aW9uKSwgJzxSb3V0ZT4gZWxlbWVudHMgc2hvdWxkIG5vdCBjaGFuZ2UgZnJvbSBjb250cm9sbGVkIHRvIHVuY29udHJvbGxlZCAob3IgdmljZSB2ZXJzYSkuIFlvdSBwcm92aWRlZCBhIFwibG9jYXRpb25cIiBwcm9wIGluaXRpYWxseSBidXQgb21pdHRlZCBpdCBvbiBhIHN1YnNlcXVlbnQgcmVuZGVyLicpO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtYXRjaDogdGhpcy5jb21wdXRlTWF0Y2gobmV4dFByb3BzLCBuZXh0Q29udGV4dC5yb3V0ZXIpXG4gICAgfSk7XG4gIH07XG5cbiAgUm91dGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICB2YXIgbWF0Y2ggPSB0aGlzLnN0YXRlLm1hdGNoO1xuICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzLFxuICAgICAgICBjaGlsZHJlbiA9IF9wcm9wcy5jaGlsZHJlbixcbiAgICAgICAgY29tcG9uZW50ID0gX3Byb3BzLmNvbXBvbmVudCxcbiAgICAgICAgcmVuZGVyID0gX3Byb3BzLnJlbmRlcjtcbiAgICB2YXIgX2NvbnRleHQkcm91dGVyID0gdGhpcy5jb250ZXh0LnJvdXRlcixcbiAgICAgICAgaGlzdG9yeSA9IF9jb250ZXh0JHJvdXRlci5oaXN0b3J5LFxuICAgICAgICByb3V0ZSA9IF9jb250ZXh0JHJvdXRlci5yb3V0ZSxcbiAgICAgICAgc3RhdGljQ29udGV4dCA9IF9jb250ZXh0JHJvdXRlci5zdGF0aWNDb250ZXh0O1xuXG4gICAgdmFyIGxvY2F0aW9uID0gdGhpcy5wcm9wcy5sb2NhdGlvbiB8fCByb3V0ZS5sb2NhdGlvbjtcbiAgICB2YXIgcHJvcHMgPSB7IG1hdGNoOiBtYXRjaCwgbG9jYXRpb246IGxvY2F0aW9uLCBoaXN0b3J5OiBoaXN0b3J5LCBzdGF0aWNDb250ZXh0OiBzdGF0aWNDb250ZXh0IH07XG5cbiAgICBpZiAoY29tcG9uZW50KSByZXR1cm4gbWF0Y2ggPyBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCwgcHJvcHMpIDogbnVsbDtcblxuICAgIGlmIChyZW5kZXIpIHJldHVybiBtYXRjaCA/IHJlbmRlcihwcm9wcykgOiBudWxsO1xuXG4gICAgaWYgKHR5cGVvZiBjaGlsZHJlbiA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gY2hpbGRyZW4ocHJvcHMpO1xuXG4gICAgaWYgKGNoaWxkcmVuICYmICFpc0VtcHR5Q2hpbGRyZW4oY2hpbGRyZW4pKSByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ub25seShjaGlsZHJlbik7XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICByZXR1cm4gUm91dGU7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cblJvdXRlLnByb3BUeXBlcyA9IHtcbiAgY29tcHV0ZWRNYXRjaDogUHJvcFR5cGVzLm9iamVjdCwgLy8gcHJpdmF0ZSwgZnJvbSA8U3dpdGNoPlxuICBwYXRoOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBleGFjdDogUHJvcFR5cGVzLmJvb2wsXG4gIHN0cmljdDogUHJvcFR5cGVzLmJvb2wsXG4gIHNlbnNpdGl2ZTogUHJvcFR5cGVzLmJvb2wsXG4gIGNvbXBvbmVudDogUHJvcFR5cGVzLmZ1bmMsXG4gIHJlbmRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLm5vZGVdKSxcbiAgbG9jYXRpb246IFByb3BUeXBlcy5vYmplY3Rcbn07XG5Sb3V0ZS5jb250ZXh0VHlwZXMgPSB7XG4gIHJvdXRlcjogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBoaXN0b3J5OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgcm91dGU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBzdGF0aWNDb250ZXh0OiBQcm9wVHlwZXMub2JqZWN0XG4gIH0pXG59O1xuUm91dGUuY2hpbGRDb250ZXh0VHlwZXMgPSB7XG4gIHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFJvdXRlOyIsInZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuaW1wb3J0IHdhcm5pbmcgZnJvbSBcIndhcm5pbmdcIjtcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSBcImludmFyaWFudFwiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuXG4vKipcbiAqIFRoZSBwdWJsaWMgQVBJIGZvciBwdXR0aW5nIGhpc3Rvcnkgb24gY29udGV4dC5cbiAqL1xuXG52YXIgUm91dGVyID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzKFJvdXRlciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gUm91dGVyKCkge1xuICAgIHZhciBfdGVtcCwgX3RoaXMsIF9yZXQ7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUm91dGVyKTtcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHJldHVybiBfcmV0ID0gKF90ZW1wID0gKF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoYXJncykpKSwgX3RoaXMpLCBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG1hdGNoOiBfdGhpcy5jb21wdXRlTWF0Y2goX3RoaXMucHJvcHMuaGlzdG9yeS5sb2NhdGlvbi5wYXRobmFtZSlcbiAgICB9LCBfdGVtcCksIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKF90aGlzLCBfcmV0KTtcbiAgfVxuXG4gIFJvdXRlci5wcm90b3R5cGUuZ2V0Q2hpbGRDb250ZXh0ID0gZnVuY3Rpb24gZ2V0Q2hpbGRDb250ZXh0KCkge1xuICAgIHJldHVybiB7XG4gICAgICByb3V0ZXI6IF9leHRlbmRzKHt9LCB0aGlzLmNvbnRleHQucm91dGVyLCB7XG4gICAgICAgIGhpc3Rvcnk6IHRoaXMucHJvcHMuaGlzdG9yeSxcbiAgICAgICAgcm91dGU6IHtcbiAgICAgICAgICBsb2NhdGlvbjogdGhpcy5wcm9wcy5oaXN0b3J5LmxvY2F0aW9uLFxuICAgICAgICAgIG1hdGNoOiB0aGlzLnN0YXRlLm1hdGNoXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfTtcbiAgfTtcblxuICBSb3V0ZXIucHJvdG90eXBlLmNvbXB1dGVNYXRjaCA9IGZ1bmN0aW9uIGNvbXB1dGVNYXRjaChwYXRobmFtZSkge1xuICAgIHJldHVybiB7XG4gICAgICBwYXRoOiBcIi9cIixcbiAgICAgIHVybDogXCIvXCIsXG4gICAgICBwYXJhbXM6IHt9LFxuICAgICAgaXNFeGFjdDogcGF0aG5hbWUgPT09IFwiL1wiXG4gICAgfTtcbiAgfTtcblxuICBSb3V0ZXIucHJvdG90eXBlLmNvbXBvbmVudFdpbGxNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzLFxuICAgICAgICBjaGlsZHJlbiA9IF9wcm9wcy5jaGlsZHJlbixcbiAgICAgICAgaGlzdG9yeSA9IF9wcm9wcy5oaXN0b3J5O1xuXG5cbiAgICBpbnZhcmlhbnQoY2hpbGRyZW4gPT0gbnVsbCB8fCBSZWFjdC5DaGlsZHJlbi5jb3VudChjaGlsZHJlbikgPT09IDEsIFwiQSA8Um91dGVyPiBtYXkgaGF2ZSBvbmx5IG9uZSBjaGlsZCBlbGVtZW50XCIpO1xuXG4gICAgLy8gRG8gdGhpcyBoZXJlIHNvIHdlIGNhbiBzZXRTdGF0ZSB3aGVuIGEgPFJlZGlyZWN0PiBjaGFuZ2VzIHRoZVxuICAgIC8vIGxvY2F0aW9uIGluIGNvbXBvbmVudFdpbGxNb3VudC4gVGhpcyBoYXBwZW5zIGUuZy4gd2hlbiBkb2luZ1xuICAgIC8vIHNlcnZlciByZW5kZXJpbmcgdXNpbmcgYSA8U3RhdGljUm91dGVyPi5cbiAgICB0aGlzLnVubGlzdGVuID0gaGlzdG9yeS5saXN0ZW4oZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMyLnNldFN0YXRlKHtcbiAgICAgICAgbWF0Y2g6IF90aGlzMi5jb21wdXRlTWF0Y2goaGlzdG9yeS5sb2NhdGlvbi5wYXRobmFtZSlcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIFJvdXRlci5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgd2FybmluZyh0aGlzLnByb3BzLmhpc3RvcnkgPT09IG5leHRQcm9wcy5oaXN0b3J5LCBcIllvdSBjYW5ub3QgY2hhbmdlIDxSb3V0ZXIgaGlzdG9yeT5cIik7XG4gIH07XG5cbiAgUm91dGVyLnByb3RvdHlwZS5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMudW5saXN0ZW4oKTtcbiAgfTtcblxuICBSb3V0ZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLnByb3BzLmNoaWxkcmVuO1xuXG4gICAgcmV0dXJuIGNoaWxkcmVuID8gUmVhY3QuQ2hpbGRyZW4ub25seShjaGlsZHJlbikgOiBudWxsO1xuICB9O1xuXG4gIHJldHVybiBSb3V0ZXI7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cblJvdXRlci5wcm9wVHlwZXMgPSB7XG4gIGhpc3Rvcnk6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlXG59O1xuUm91dGVyLmNvbnRleHRUeXBlcyA9IHtcbiAgcm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XG59O1xuUm91dGVyLmNoaWxkQ29udGV4dFR5cGVzID0ge1xuICByb3V0ZXI6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBSb3V0ZXI7IiwidmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbmltcG9ydCB3YXJuaW5nIGZyb20gXCJ3YXJuaW5nXCI7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gXCJpbnZhcmlhbnRcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCB7IGNyZWF0ZUxvY2F0aW9uLCBjcmVhdGVQYXRoIH0gZnJvbSBcImhpc3RvcnlcIjtcbmltcG9ydCBSb3V0ZXIgZnJvbSBcIi4vUm91dGVyXCI7XG5cbnZhciBhZGRMZWFkaW5nU2xhc2ggPSBmdW5jdGlvbiBhZGRMZWFkaW5nU2xhc2gocGF0aCkge1xuICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09IFwiL1wiID8gcGF0aCA6IFwiL1wiICsgcGF0aDtcbn07XG5cbnZhciBhZGRCYXNlbmFtZSA9IGZ1bmN0aW9uIGFkZEJhc2VuYW1lKGJhc2VuYW1lLCBsb2NhdGlvbikge1xuICBpZiAoIWJhc2VuYW1lKSByZXR1cm4gbG9jYXRpb247XG5cbiAgcmV0dXJuIF9leHRlbmRzKHt9LCBsb2NhdGlvbiwge1xuICAgIHBhdGhuYW1lOiBhZGRMZWFkaW5nU2xhc2goYmFzZW5hbWUpICsgbG9jYXRpb24ucGF0aG5hbWVcbiAgfSk7XG59O1xuXG52YXIgc3RyaXBCYXNlbmFtZSA9IGZ1bmN0aW9uIHN0cmlwQmFzZW5hbWUoYmFzZW5hbWUsIGxvY2F0aW9uKSB7XG4gIGlmICghYmFzZW5hbWUpIHJldHVybiBsb2NhdGlvbjtcblxuICB2YXIgYmFzZSA9IGFkZExlYWRpbmdTbGFzaChiYXNlbmFtZSk7XG5cbiAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoYmFzZSkgIT09IDApIHJldHVybiBsb2NhdGlvbjtcblxuICByZXR1cm4gX2V4dGVuZHMoe30sIGxvY2F0aW9uLCB7XG4gICAgcGF0aG5hbWU6IGxvY2F0aW9uLnBhdGhuYW1lLnN1YnN0cihiYXNlLmxlbmd0aClcbiAgfSk7XG59O1xuXG52YXIgY3JlYXRlVVJMID0gZnVuY3Rpb24gY3JlYXRlVVJMKGxvY2F0aW9uKSB7XG4gIHJldHVybiB0eXBlb2YgbG9jYXRpb24gPT09IFwic3RyaW5nXCIgPyBsb2NhdGlvbiA6IGNyZWF0ZVBhdGgobG9jYXRpb24pO1xufTtcblxudmFyIHN0YXRpY0hhbmRsZXIgPSBmdW5jdGlvbiBzdGF0aWNIYW5kbGVyKG1ldGhvZE5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBpbnZhcmlhbnQoZmFsc2UsIFwiWW91IGNhbm5vdCAlcyB3aXRoIDxTdGF0aWNSb3V0ZXI+XCIsIG1ldGhvZE5hbWUpO1xuICB9O1xufTtcblxudmFyIG5vb3AgPSBmdW5jdGlvbiBub29wKCkge307XG5cbi8qKlxuICogVGhlIHB1YmxpYyB0b3AtbGV2ZWwgQVBJIGZvciBhIFwic3RhdGljXCIgPFJvdXRlcj4sIHNvLWNhbGxlZCBiZWNhdXNlIGl0XG4gKiBjYW4ndCBhY3R1YWxseSBjaGFuZ2UgdGhlIGN1cnJlbnQgbG9jYXRpb24uIEluc3RlYWQsIGl0IGp1c3QgcmVjb3Jkc1xuICogbG9jYXRpb24gY2hhbmdlcyBpbiBhIGNvbnRleHQgb2JqZWN0LiBVc2VmdWwgbWFpbmx5IGluIHRlc3RpbmcgYW5kXG4gKiBzZXJ2ZXItcmVuZGVyaW5nIHNjZW5hcmlvcy5cbiAqL1xuXG52YXIgU3RhdGljUm91dGVyID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzKFN0YXRpY1JvdXRlciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gU3RhdGljUm91dGVyKCkge1xuICAgIHZhciBfdGVtcCwgX3RoaXMsIF9yZXQ7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU3RhdGljUm91dGVyKTtcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHJldHVybiBfcmV0ID0gKF90ZW1wID0gKF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoYXJncykpKSwgX3RoaXMpLCBfdGhpcy5jcmVhdGVIcmVmID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgIHJldHVybiBhZGRMZWFkaW5nU2xhc2goX3RoaXMucHJvcHMuYmFzZW5hbWUgKyBjcmVhdGVVUkwocGF0aCkpO1xuICAgIH0sIF90aGlzLmhhbmRsZVB1c2ggPSBmdW5jdGlvbiAobG9jYXRpb24pIHtcbiAgICAgIHZhciBfdGhpcyRwcm9wcyA9IF90aGlzLnByb3BzLFxuICAgICAgICAgIGJhc2VuYW1lID0gX3RoaXMkcHJvcHMuYmFzZW5hbWUsXG4gICAgICAgICAgY29udGV4dCA9IF90aGlzJHByb3BzLmNvbnRleHQ7XG5cbiAgICAgIGNvbnRleHQuYWN0aW9uID0gXCJQVVNIXCI7XG4gICAgICBjb250ZXh0LmxvY2F0aW9uID0gYWRkQmFzZW5hbWUoYmFzZW5hbWUsIGNyZWF0ZUxvY2F0aW9uKGxvY2F0aW9uKSk7XG4gICAgICBjb250ZXh0LnVybCA9IGNyZWF0ZVVSTChjb250ZXh0LmxvY2F0aW9uKTtcbiAgICB9LCBfdGhpcy5oYW5kbGVSZXBsYWNlID0gZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG4gICAgICB2YXIgX3RoaXMkcHJvcHMyID0gX3RoaXMucHJvcHMsXG4gICAgICAgICAgYmFzZW5hbWUgPSBfdGhpcyRwcm9wczIuYmFzZW5hbWUsXG4gICAgICAgICAgY29udGV4dCA9IF90aGlzJHByb3BzMi5jb250ZXh0O1xuXG4gICAgICBjb250ZXh0LmFjdGlvbiA9IFwiUkVQTEFDRVwiO1xuICAgICAgY29udGV4dC5sb2NhdGlvbiA9IGFkZEJhc2VuYW1lKGJhc2VuYW1lLCBjcmVhdGVMb2NhdGlvbihsb2NhdGlvbikpO1xuICAgICAgY29udGV4dC51cmwgPSBjcmVhdGVVUkwoY29udGV4dC5sb2NhdGlvbik7XG4gICAgfSwgX3RoaXMuaGFuZGxlTGlzdGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5vb3A7XG4gICAgfSwgX3RoaXMuaGFuZGxlQmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbm9vcDtcbiAgICB9LCBfdGVtcCksIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKF90aGlzLCBfcmV0KTtcbiAgfVxuXG4gIFN0YXRpY1JvdXRlci5wcm90b3R5cGUuZ2V0Q2hpbGRDb250ZXh0ID0gZnVuY3Rpb24gZ2V0Q2hpbGRDb250ZXh0KCkge1xuICAgIHJldHVybiB7XG4gICAgICByb3V0ZXI6IHtcbiAgICAgICAgc3RhdGljQ29udGV4dDogdGhpcy5wcm9wcy5jb250ZXh0XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICBTdGF0aWNSb3V0ZXIucHJvdG90eXBlLmNvbXBvbmVudFdpbGxNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB3YXJuaW5nKCF0aGlzLnByb3BzLmhpc3RvcnksIFwiPFN0YXRpY1JvdXRlcj4gaWdub3JlcyB0aGUgaGlzdG9yeSBwcm9wLiBUbyB1c2UgYSBjdXN0b20gaGlzdG9yeSwgXCIgKyBcInVzZSBgaW1wb3J0IHsgUm91dGVyIH1gIGluc3RlYWQgb2YgYGltcG9ydCB7IFN0YXRpY1JvdXRlciBhcyBSb3V0ZXIgfWAuXCIpO1xuICB9O1xuXG4gIFN0YXRpY1JvdXRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzLFxuICAgICAgICBiYXNlbmFtZSA9IF9wcm9wcy5iYXNlbmFtZSxcbiAgICAgICAgY29udGV4dCA9IF9wcm9wcy5jb250ZXh0LFxuICAgICAgICBsb2NhdGlvbiA9IF9wcm9wcy5sb2NhdGlvbixcbiAgICAgICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3Byb3BzLCBbXCJiYXNlbmFtZVwiLCBcImNvbnRleHRcIiwgXCJsb2NhdGlvblwiXSk7XG5cbiAgICB2YXIgaGlzdG9yeSA9IHtcbiAgICAgIGNyZWF0ZUhyZWY6IHRoaXMuY3JlYXRlSHJlZixcbiAgICAgIGFjdGlvbjogXCJQT1BcIixcbiAgICAgIGxvY2F0aW9uOiBzdHJpcEJhc2VuYW1lKGJhc2VuYW1lLCBjcmVhdGVMb2NhdGlvbihsb2NhdGlvbikpLFxuICAgICAgcHVzaDogdGhpcy5oYW5kbGVQdXNoLFxuICAgICAgcmVwbGFjZTogdGhpcy5oYW5kbGVSZXBsYWNlLFxuICAgICAgZ286IHN0YXRpY0hhbmRsZXIoXCJnb1wiKSxcbiAgICAgIGdvQmFjazogc3RhdGljSGFuZGxlcihcImdvQmFja1wiKSxcbiAgICAgIGdvRm9yd2FyZDogc3RhdGljSGFuZGxlcihcImdvRm9yd2FyZFwiKSxcbiAgICAgIGxpc3RlbjogdGhpcy5oYW5kbGVMaXN0ZW4sXG4gICAgICBibG9jazogdGhpcy5oYW5kbGVCbG9ja1xuICAgIH07XG5cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZXIsIF9leHRlbmRzKHt9LCBwcm9wcywgeyBoaXN0b3J5OiBoaXN0b3J5IH0pKTtcbiAgfTtcblxuICByZXR1cm4gU3RhdGljUm91dGVyO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5TdGF0aWNSb3V0ZXIucHJvcFR5cGVzID0ge1xuICBiYXNlbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgY29udGV4dDogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBsb2NhdGlvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm9iamVjdF0pXG59O1xuU3RhdGljUm91dGVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgYmFzZW5hbWU6IFwiXCIsXG4gIGxvY2F0aW9uOiBcIi9cIlxufTtcblN0YXRpY1JvdXRlci5jaGlsZENvbnRleHRUeXBlcyA9IHtcbiAgcm91dGVyOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgU3RhdGljUm91dGVyOyIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSBcIndhcm5pbmdcIjtcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSBcImludmFyaWFudFwiO1xuaW1wb3J0IG1hdGNoUGF0aCBmcm9tIFwiLi9tYXRjaFBhdGhcIjtcblxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgcmVuZGVyaW5nIHRoZSBmaXJzdCA8Um91dGU+IHRoYXQgbWF0Y2hlcy5cbiAqL1xuXG52YXIgU3dpdGNoID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzKFN3aXRjaCwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gU3dpdGNoKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTd2l0Y2gpO1xuXG4gICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9SZWFjdCRDb21wb25lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICBTd2l0Y2gucHJvdG90eXBlLmNvbXBvbmVudFdpbGxNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICBpbnZhcmlhbnQodGhpcy5jb250ZXh0LnJvdXRlciwgXCJZb3Ugc2hvdWxkIG5vdCB1c2UgPFN3aXRjaD4gb3V0c2lkZSBhIDxSb3V0ZXI+XCIpO1xuICB9O1xuXG4gIFN3aXRjaC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgd2FybmluZyghKG5leHRQcm9wcy5sb2NhdGlvbiAmJiAhdGhpcy5wcm9wcy5sb2NhdGlvbiksICc8U3dpdGNoPiBlbGVtZW50cyBzaG91bGQgbm90IGNoYW5nZSBmcm9tIHVuY29udHJvbGxlZCB0byBjb250cm9sbGVkIChvciB2aWNlIHZlcnNhKS4gWW91IGluaXRpYWxseSB1c2VkIG5vIFwibG9jYXRpb25cIiBwcm9wIGFuZCB0aGVuIHByb3ZpZGVkIG9uZSBvbiBhIHN1YnNlcXVlbnQgcmVuZGVyLicpO1xuXG4gICAgd2FybmluZyghKCFuZXh0UHJvcHMubG9jYXRpb24gJiYgdGhpcy5wcm9wcy5sb2NhdGlvbiksICc8U3dpdGNoPiBlbGVtZW50cyBzaG91bGQgbm90IGNoYW5nZSBmcm9tIGNvbnRyb2xsZWQgdG8gdW5jb250cm9sbGVkIChvciB2aWNlIHZlcnNhKS4gWW91IHByb3ZpZGVkIGEgXCJsb2NhdGlvblwiIHByb3AgaW5pdGlhbGx5IGJ1dCBvbWl0dGVkIGl0IG9uIGEgc3Vic2VxdWVudCByZW5kZXIuJyk7XG4gIH07XG5cbiAgU3dpdGNoLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIHJvdXRlID0gdGhpcy5jb250ZXh0LnJvdXRlci5yb3V0ZTtcbiAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLnByb3BzLmNoaWxkcmVuO1xuXG4gICAgdmFyIGxvY2F0aW9uID0gdGhpcy5wcm9wcy5sb2NhdGlvbiB8fCByb3V0ZS5sb2NhdGlvbjtcblxuICAgIHZhciBtYXRjaCA9IHZvaWQgMCxcbiAgICAgICAgY2hpbGQgPSB2b2lkIDA7XG4gICAgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaChjaGlsZHJlbiwgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIGlmIChtYXRjaCA9PSBudWxsICYmIFJlYWN0LmlzVmFsaWRFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgICAgIHZhciBfZWxlbWVudCRwcm9wcyA9IGVsZW1lbnQucHJvcHMsXG4gICAgICAgICAgICBwYXRoUHJvcCA9IF9lbGVtZW50JHByb3BzLnBhdGgsXG4gICAgICAgICAgICBleGFjdCA9IF9lbGVtZW50JHByb3BzLmV4YWN0LFxuICAgICAgICAgICAgc3RyaWN0ID0gX2VsZW1lbnQkcHJvcHMuc3RyaWN0LFxuICAgICAgICAgICAgc2Vuc2l0aXZlID0gX2VsZW1lbnQkcHJvcHMuc2Vuc2l0aXZlLFxuICAgICAgICAgICAgZnJvbSA9IF9lbGVtZW50JHByb3BzLmZyb207XG5cbiAgICAgICAgdmFyIHBhdGggPSBwYXRoUHJvcCB8fCBmcm9tO1xuXG4gICAgICAgIGNoaWxkID0gZWxlbWVudDtcbiAgICAgICAgbWF0Y2ggPSBtYXRjaFBhdGgobG9jYXRpb24ucGF0aG5hbWUsIHsgcGF0aDogcGF0aCwgZXhhY3Q6IGV4YWN0LCBzdHJpY3Q6IHN0cmljdCwgc2Vuc2l0aXZlOiBzZW5zaXRpdmUgfSwgcm91dGUubWF0Y2gpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1hdGNoID8gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7IGxvY2F0aW9uOiBsb2NhdGlvbiwgY29tcHV0ZWRNYXRjaDogbWF0Y2ggfSkgOiBudWxsO1xuICB9O1xuXG4gIHJldHVybiBTd2l0Y2g7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cblN3aXRjaC5jb250ZXh0VHlwZXMgPSB7XG4gIHJvdXRlcjogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICByb3V0ZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG4gIH0pLmlzUmVxdWlyZWRcbn07XG5Td2l0Y2gucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG4gIGxvY2F0aW9uOiBQcm9wVHlwZXMub2JqZWN0XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFN3aXRjaDsiLCJpbXBvcnQgcGF0aFRvUmVnZXhwIGZyb20gXCJwYXRoLXRvLXJlZ2V4cFwiO1xuXG52YXIgcGF0dGVybkNhY2hlID0ge307XG52YXIgY2FjaGVMaW1pdCA9IDEwMDAwO1xudmFyIGNhY2hlQ291bnQgPSAwO1xuXG52YXIgY29tcGlsZUdlbmVyYXRvciA9IGZ1bmN0aW9uIGNvbXBpbGVHZW5lcmF0b3IocGF0dGVybikge1xuICB2YXIgY2FjaGVLZXkgPSBwYXR0ZXJuO1xuICB2YXIgY2FjaGUgPSBwYXR0ZXJuQ2FjaGVbY2FjaGVLZXldIHx8IChwYXR0ZXJuQ2FjaGVbY2FjaGVLZXldID0ge30pO1xuXG4gIGlmIChjYWNoZVtwYXR0ZXJuXSkgcmV0dXJuIGNhY2hlW3BhdHRlcm5dO1xuXG4gIHZhciBjb21waWxlZEdlbmVyYXRvciA9IHBhdGhUb1JlZ2V4cC5jb21waWxlKHBhdHRlcm4pO1xuXG4gIGlmIChjYWNoZUNvdW50IDwgY2FjaGVMaW1pdCkge1xuICAgIGNhY2hlW3BhdHRlcm5dID0gY29tcGlsZWRHZW5lcmF0b3I7XG4gICAgY2FjaGVDb3VudCsrO1xuICB9XG5cbiAgcmV0dXJuIGNvbXBpbGVkR2VuZXJhdG9yO1xufTtcblxuLyoqXG4gKiBQdWJsaWMgQVBJIGZvciBnZW5lcmF0aW5nIGEgVVJMIHBhdGhuYW1lIGZyb20gYSBwYXR0ZXJuIGFuZCBwYXJhbWV0ZXJzLlxuICovXG52YXIgZ2VuZXJhdGVQYXRoID0gZnVuY3Rpb24gZ2VuZXJhdGVQYXRoKCkge1xuICB2YXIgcGF0dGVybiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogXCIvXCI7XG4gIHZhciBwYXJhbXMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gIGlmIChwYXR0ZXJuID09PSBcIi9cIikge1xuICAgIHJldHVybiBwYXR0ZXJuO1xuICB9XG4gIHZhciBnZW5lcmF0b3IgPSBjb21waWxlR2VuZXJhdG9yKHBhdHRlcm4pO1xuICByZXR1cm4gZ2VuZXJhdG9yKHBhcmFtcywgeyBwcmV0dHk6IHRydWUgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnZW5lcmF0ZVBhdGg7IiwiaW1wb3J0IF9NZW1vcnlSb3V0ZXIgZnJvbSBcIi4vTWVtb3J5Um91dGVyXCI7XG5leHBvcnQgeyBfTWVtb3J5Um91dGVyIGFzIE1lbW9yeVJvdXRlciB9O1xuaW1wb3J0IF9Qcm9tcHQgZnJvbSBcIi4vUHJvbXB0XCI7XG5leHBvcnQgeyBfUHJvbXB0IGFzIFByb21wdCB9O1xuaW1wb3J0IF9SZWRpcmVjdCBmcm9tIFwiLi9SZWRpcmVjdFwiO1xuZXhwb3J0IHsgX1JlZGlyZWN0IGFzIFJlZGlyZWN0IH07XG5pbXBvcnQgX1JvdXRlIGZyb20gXCIuL1JvdXRlXCI7XG5leHBvcnQgeyBfUm91dGUgYXMgUm91dGUgfTtcbmltcG9ydCBfUm91dGVyIGZyb20gXCIuL1JvdXRlclwiO1xuZXhwb3J0IHsgX1JvdXRlciBhcyBSb3V0ZXIgfTtcbmltcG9ydCBfU3RhdGljUm91dGVyIGZyb20gXCIuL1N0YXRpY1JvdXRlclwiO1xuZXhwb3J0IHsgX1N0YXRpY1JvdXRlciBhcyBTdGF0aWNSb3V0ZXIgfTtcbmltcG9ydCBfU3dpdGNoIGZyb20gXCIuL1N3aXRjaFwiO1xuZXhwb3J0IHsgX1N3aXRjaCBhcyBTd2l0Y2ggfTtcbmltcG9ydCBfZ2VuZXJhdGVQYXRoIGZyb20gXCIuL2dlbmVyYXRlUGF0aFwiO1xuZXhwb3J0IHsgX2dlbmVyYXRlUGF0aCBhcyBnZW5lcmF0ZVBhdGggfTtcbmltcG9ydCBfbWF0Y2hQYXRoIGZyb20gXCIuL21hdGNoUGF0aFwiO1xuZXhwb3J0IHsgX21hdGNoUGF0aCBhcyBtYXRjaFBhdGggfTtcbmltcG9ydCBfd2l0aFJvdXRlciBmcm9tIFwiLi93aXRoUm91dGVyXCI7XG5leHBvcnQgeyBfd2l0aFJvdXRlciBhcyB3aXRoUm91dGVyIH07IiwiaW1wb3J0IHBhdGhUb1JlZ2V4cCBmcm9tIFwicGF0aC10by1yZWdleHBcIjtcblxudmFyIHBhdHRlcm5DYWNoZSA9IHt9O1xudmFyIGNhY2hlTGltaXQgPSAxMDAwMDtcbnZhciBjYWNoZUNvdW50ID0gMDtcblxudmFyIGNvbXBpbGVQYXRoID0gZnVuY3Rpb24gY29tcGlsZVBhdGgocGF0dGVybiwgb3B0aW9ucykge1xuICB2YXIgY2FjaGVLZXkgPSBcIlwiICsgb3B0aW9ucy5lbmQgKyBvcHRpb25zLnN0cmljdCArIG9wdGlvbnMuc2Vuc2l0aXZlO1xuICB2YXIgY2FjaGUgPSBwYXR0ZXJuQ2FjaGVbY2FjaGVLZXldIHx8IChwYXR0ZXJuQ2FjaGVbY2FjaGVLZXldID0ge30pO1xuXG4gIGlmIChjYWNoZVtwYXR0ZXJuXSkgcmV0dXJuIGNhY2hlW3BhdHRlcm5dO1xuXG4gIHZhciBrZXlzID0gW107XG4gIHZhciByZSA9IHBhdGhUb1JlZ2V4cChwYXR0ZXJuLCBrZXlzLCBvcHRpb25zKTtcbiAgdmFyIGNvbXBpbGVkUGF0dGVybiA9IHsgcmU6IHJlLCBrZXlzOiBrZXlzIH07XG5cbiAgaWYgKGNhY2hlQ291bnQgPCBjYWNoZUxpbWl0KSB7XG4gICAgY2FjaGVbcGF0dGVybl0gPSBjb21waWxlZFBhdHRlcm47XG4gICAgY2FjaGVDb3VudCsrO1xuICB9XG5cbiAgcmV0dXJuIGNvbXBpbGVkUGF0dGVybjtcbn07XG5cbi8qKlxuICogUHVibGljIEFQSSBmb3IgbWF0Y2hpbmcgYSBVUkwgcGF0aG5hbWUgdG8gYSBwYXRoIHBhdHRlcm4uXG4gKi9cbnZhciBtYXRjaFBhdGggPSBmdW5jdGlvbiBtYXRjaFBhdGgocGF0aG5hbWUpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICB2YXIgcGFyZW50ID0gYXJndW1lbnRzWzJdO1xuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJzdHJpbmdcIikgb3B0aW9ucyA9IHsgcGF0aDogb3B0aW9ucyB9O1xuXG4gIHZhciBfb3B0aW9ucyA9IG9wdGlvbnMsXG4gICAgICBwYXRoID0gX29wdGlvbnMucGF0aCxcbiAgICAgIF9vcHRpb25zJGV4YWN0ID0gX29wdGlvbnMuZXhhY3QsXG4gICAgICBleGFjdCA9IF9vcHRpb25zJGV4YWN0ID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9vcHRpb25zJGV4YWN0LFxuICAgICAgX29wdGlvbnMkc3RyaWN0ID0gX29wdGlvbnMuc3RyaWN0LFxuICAgICAgc3RyaWN0ID0gX29wdGlvbnMkc3RyaWN0ID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9vcHRpb25zJHN0cmljdCxcbiAgICAgIF9vcHRpb25zJHNlbnNpdGl2ZSA9IF9vcHRpb25zLnNlbnNpdGl2ZSxcbiAgICAgIHNlbnNpdGl2ZSA9IF9vcHRpb25zJHNlbnNpdGl2ZSA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBfb3B0aW9ucyRzZW5zaXRpdmU7XG5cblxuICBpZiAocGF0aCA9PSBudWxsKSByZXR1cm4gcGFyZW50O1xuXG4gIHZhciBfY29tcGlsZVBhdGggPSBjb21waWxlUGF0aChwYXRoLCB7IGVuZDogZXhhY3QsIHN0cmljdDogc3RyaWN0LCBzZW5zaXRpdmU6IHNlbnNpdGl2ZSB9KSxcbiAgICAgIHJlID0gX2NvbXBpbGVQYXRoLnJlLFxuICAgICAga2V5cyA9IF9jb21waWxlUGF0aC5rZXlzO1xuXG4gIHZhciBtYXRjaCA9IHJlLmV4ZWMocGF0aG5hbWUpO1xuXG4gIGlmICghbWF0Y2gpIHJldHVybiBudWxsO1xuXG4gIHZhciB1cmwgPSBtYXRjaFswXSxcbiAgICAgIHZhbHVlcyA9IG1hdGNoLnNsaWNlKDEpO1xuXG4gIHZhciBpc0V4YWN0ID0gcGF0aG5hbWUgPT09IHVybDtcblxuICBpZiAoZXhhY3QgJiYgIWlzRXhhY3QpIHJldHVybiBudWxsO1xuXG4gIHJldHVybiB7XG4gICAgcGF0aDogcGF0aCwgLy8gdGhlIHBhdGggcGF0dGVybiB1c2VkIHRvIG1hdGNoXG4gICAgdXJsOiBwYXRoID09PSBcIi9cIiAmJiB1cmwgPT09IFwiXCIgPyBcIi9cIiA6IHVybCwgLy8gdGhlIG1hdGNoZWQgcG9ydGlvbiBvZiB0aGUgVVJMXG4gICAgaXNFeGFjdDogaXNFeGFjdCwgLy8gd2hldGhlciBvciBub3Qgd2UgbWF0Y2hlZCBleGFjdGx5XG4gICAgcGFyYW1zOiBrZXlzLnJlZHVjZShmdW5jdGlvbiAobWVtbywga2V5LCBpbmRleCkge1xuICAgICAgbWVtb1trZXkubmFtZV0gPSB2YWx1ZXNbaW5kZXhdO1xuICAgICAgcmV0dXJuIG1lbW87XG4gICAgfSwge30pXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtYXRjaFBhdGg7IiwidmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgaG9pc3RTdGF0aWNzIGZyb20gXCJob2lzdC1ub24tcmVhY3Qtc3RhdGljc1wiO1xuaW1wb3J0IFJvdXRlIGZyb20gXCIuL1JvdXRlXCI7XG5cbi8qKlxuICogQSBwdWJsaWMgaGlnaGVyLW9yZGVyIGNvbXBvbmVudCB0byBhY2Nlc3MgdGhlIGltcGVyYXRpdmUgQVBJXG4gKi9cbnZhciB3aXRoUm91dGVyID0gZnVuY3Rpb24gd2l0aFJvdXRlcihDb21wb25lbnQpIHtcbiAgdmFyIEMgPSBmdW5jdGlvbiBDKHByb3BzKSB7XG4gICAgdmFyIHdyYXBwZWRDb21wb25lbnRSZWYgPSBwcm9wcy53cmFwcGVkQ29tcG9uZW50UmVmLFxuICAgICAgICByZW1haW5pbmdQcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhwcm9wcywgW1wid3JhcHBlZENvbXBvbmVudFJlZlwiXSk7XG5cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZSwge1xuICAgICAgY2hpbGRyZW46IGZ1bmN0aW9uIGNoaWxkcmVuKHJvdXRlQ29tcG9uZW50UHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50LCBfZXh0ZW5kcyh7fSwgcmVtYWluaW5nUHJvcHMsIHJvdXRlQ29tcG9uZW50UHJvcHMsIHtcbiAgICAgICAgICByZWY6IHdyYXBwZWRDb21wb25lbnRSZWZcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIEMuZGlzcGxheU5hbWUgPSBcIndpdGhSb3V0ZXIoXCIgKyAoQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IENvbXBvbmVudC5uYW1lKSArIFwiKVwiO1xuICBDLldyYXBwZWRDb21wb25lbnQgPSBDb21wb25lbnQ7XG4gIEMucHJvcFR5cGVzID0ge1xuICAgIHdyYXBwZWRDb21wb25lbnRSZWY6IFByb3BUeXBlcy5mdW5jXG4gIH07XG5cbiAgcmV0dXJuIGhvaXN0U3RhdGljcyhDLCBDb21wb25lbnQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcjsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIF9fREVWX18gPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nO1xuXG52YXIgd2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChfX0RFVl9fKSB7XG4gIHZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiBwcmludFdhcm5pbmcoZm9ybWF0LCBhcmdzKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gPiAyID8gbGVuIC0gMiA6IDApO1xuICAgIGZvciAodmFyIGtleSA9IDI7IGtleSA8IGxlbjsga2V5KyspIHtcbiAgICAgIGFyZ3Nba2V5IC0gMl0gPSBhcmd1bWVudHNba2V5XTtcbiAgICB9XG4gICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICtcbiAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KTtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9XG5cbiAgd2FybmluZyA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhcmdzKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gPiAyID8gbGVuIC0gMiA6IDApO1xuICAgIGZvciAodmFyIGtleSA9IDI7IGtleSA8IGxlbjsga2V5KyspIHtcbiAgICAgIGFyZ3Nba2V5IC0gMl0gPSBhcmd1bWVudHNba2V5XTtcbiAgICB9XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ2B3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgK1xuICAgICAgICAgICdtZXNzYWdlIGFyZ3VtZW50J1xuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIHByaW50V2FybmluZy5hcHBseShudWxsLCBbZm9ybWF0XS5jb25jYXQoYXJncykpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YXJuaW5nO1xuIiwiZnVuY3Rpb24gaXNBYnNvbHV0ZShwYXRobmFtZSkge1xuICByZXR1cm4gcGF0aG5hbWUuY2hhckF0KDApID09PSAnLyc7XG59XG5cbi8vIEFib3V0IDEuNXggZmFzdGVyIHRoYW4gdGhlIHR3by1hcmcgdmVyc2lvbiBvZiBBcnJheSNzcGxpY2UoKVxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAodmFyIGkgPSBpbmRleCwgayA9IGkgKyAxLCBuID0gbGlzdC5sZW5ndGg7IGsgPCBuOyBpICs9IDEsIGsgKz0gMSkge1xuICAgIGxpc3RbaV0gPSBsaXN0W2tdO1xuICB9XG5cbiAgbGlzdC5wb3AoKTtcbn1cblxuLy8gVGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBiYXNlZCBoZWF2aWx5IG9uIG5vZGUncyB1cmwucGFyc2VcbmZ1bmN0aW9uIHJlc29sdmVQYXRobmFtZSh0bykge1xuICB2YXIgZnJvbSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJyc7XG5cbiAgdmFyIHRvUGFydHMgPSB0byAmJiB0by5zcGxpdCgnLycpIHx8IFtdO1xuICB2YXIgZnJvbVBhcnRzID0gZnJvbSAmJiBmcm9tLnNwbGl0KCcvJykgfHwgW107XG5cbiAgdmFyIGlzVG9BYnMgPSB0byAmJiBpc0Fic29sdXRlKHRvKTtcbiAgdmFyIGlzRnJvbUFicyA9IGZyb20gJiYgaXNBYnNvbHV0ZShmcm9tKTtcbiAgdmFyIG11c3RFbmRBYnMgPSBpc1RvQWJzIHx8IGlzRnJvbUFicztcblxuICBpZiAodG8gJiYgaXNBYnNvbHV0ZSh0bykpIHtcbiAgICAvLyB0byBpcyBhYnNvbHV0ZVxuICAgIGZyb21QYXJ0cyA9IHRvUGFydHM7XG4gIH0gZWxzZSBpZiAodG9QYXJ0cy5sZW5ndGgpIHtcbiAgICAvLyB0byBpcyByZWxhdGl2ZSwgZHJvcCB0aGUgZmlsZW5hbWVcbiAgICBmcm9tUGFydHMucG9wKCk7XG4gICAgZnJvbVBhcnRzID0gZnJvbVBhcnRzLmNvbmNhdCh0b1BhcnRzKTtcbiAgfVxuXG4gIGlmICghZnJvbVBhcnRzLmxlbmd0aCkgcmV0dXJuICcvJztcblxuICB2YXIgaGFzVHJhaWxpbmdTbGFzaCA9IHZvaWQgMDtcbiAgaWYgKGZyb21QYXJ0cy5sZW5ndGgpIHtcbiAgICB2YXIgbGFzdCA9IGZyb21QYXJ0c1tmcm9tUGFydHMubGVuZ3RoIC0gMV07XG4gICAgaGFzVHJhaWxpbmdTbGFzaCA9IGxhc3QgPT09ICcuJyB8fCBsYXN0ID09PSAnLi4nIHx8IGxhc3QgPT09ICcnO1xuICB9IGVsc2Uge1xuICAgIGhhc1RyYWlsaW5nU2xhc2ggPSBmYWxzZTtcbiAgfVxuXG4gIHZhciB1cCA9IDA7XG4gIGZvciAodmFyIGkgPSBmcm9tUGFydHMubGVuZ3RoOyBpID49IDA7IGktLSkge1xuICAgIHZhciBwYXJ0ID0gZnJvbVBhcnRzW2ldO1xuXG4gICAgaWYgKHBhcnQgPT09ICcuJykge1xuICAgICAgc3BsaWNlT25lKGZyb21QYXJ0cywgaSk7XG4gICAgfSBlbHNlIGlmIChwYXJ0ID09PSAnLi4nKSB7XG4gICAgICBzcGxpY2VPbmUoZnJvbVBhcnRzLCBpKTtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCkge1xuICAgICAgc3BsaWNlT25lKGZyb21QYXJ0cywgaSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIGlmICghbXVzdEVuZEFicykgZm9yICg7IHVwLS07IHVwKSB7XG4gICAgZnJvbVBhcnRzLnVuc2hpZnQoJy4uJyk7XG4gIH1pZiAobXVzdEVuZEFicyAmJiBmcm9tUGFydHNbMF0gIT09ICcnICYmICghZnJvbVBhcnRzWzBdIHx8ICFpc0Fic29sdXRlKGZyb21QYXJ0c1swXSkpKSBmcm9tUGFydHMudW5zaGlmdCgnJyk7XG5cbiAgdmFyIHJlc3VsdCA9IGZyb21QYXJ0cy5qb2luKCcvJyk7XG5cbiAgaWYgKGhhc1RyYWlsaW5nU2xhc2ggJiYgcmVzdWx0LnN1YnN0cigtMSkgIT09ICcvJykgcmVzdWx0ICs9ICcvJztcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCByZXNvbHZlUGF0aG5hbWU7IiwidmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiB2YWx1ZUVxdWFsKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHJldHVybiB0cnVlO1xuXG4gIGlmIChhID09IG51bGwgfHwgYiA9PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoYSkpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShiKSAmJiBhLmxlbmd0aCA9PT0gYi5sZW5ndGggJiYgYS5ldmVyeShmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgIHJldHVybiB2YWx1ZUVxdWFsKGl0ZW0sIGJbaW5kZXhdKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBhVHlwZSA9IHR5cGVvZiBhID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihhKTtcbiAgdmFyIGJUeXBlID0gdHlwZW9mIGIgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGIpO1xuXG4gIGlmIChhVHlwZSAhPT0gYlR5cGUpIHJldHVybiBmYWxzZTtcblxuICBpZiAoYVR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgdmFyIGFWYWx1ZSA9IGEudmFsdWVPZigpO1xuICAgIHZhciBiVmFsdWUgPSBiLnZhbHVlT2YoKTtcblxuICAgIGlmIChhVmFsdWUgIT09IGEgfHwgYlZhbHVlICE9PSBiKSByZXR1cm4gdmFsdWVFcXVhbChhVmFsdWUsIGJWYWx1ZSk7XG5cbiAgICB2YXIgYUtleXMgPSBPYmplY3Qua2V5cyhhKTtcbiAgICB2YXIgYktleXMgPSBPYmplY3Qua2V5cyhiKTtcblxuICAgIGlmIChhS2V5cy5sZW5ndGggIT09IGJLZXlzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIGFLZXlzLmV2ZXJ5KGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiB2YWx1ZUVxdWFsKGFba2V5XSwgYltrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsdWVFcXVhbDsiLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgd2FybmluZyA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhcmdzKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gPiAyID8gbGVuIC0gMiA6IDApO1xuICAgIGZvciAodmFyIGtleSA9IDI7IGtleSA8IGxlbjsga2V5KyspIHtcbiAgICAgIGFyZ3Nba2V5IC0gMl0gPSBhcmd1bWVudHNba2V5XTtcbiAgICB9XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICtcbiAgICAgICAgJ21lc3NhZ2UgYXJndW1lbnQnXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChmb3JtYXQubGVuZ3RoIDwgMTAgfHwgKC9eW3NcXFddKiQvKS50ZXN0KGZvcm1hdCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1RoZSB3YXJuaW5nIGZvcm1hdCBzaG91bGQgYmUgYWJsZSB0byB1bmlxdWVseSBpZGVudGlmeSB0aGlzICcgK1xuICAgICAgICAnd2FybmluZy4gUGxlYXNlLCB1c2UgYSBtb3JlIGRlc2NyaXB0aXZlIGZvcm1hdCB0aGFuOiAnICsgZm9ybWF0XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgICAgfSk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2goeCkge31cbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcbiJdLCJzb3VyY2VSb290IjoiIn0=