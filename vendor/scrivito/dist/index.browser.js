(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("history"), require("promise-polyfill"), require("react"), require("react-dom"), require("speakingurl"), require("tcomb-react"), require("tcomb-validation"), require("underscore"), require("urijs"));
	else if(typeof define === 'function' && define.amd)
		define(["history", "promise-polyfill", "react", "react-dom", "speakingurl", "tcomb-react", "tcomb-validation", "underscore", "urijs"], factory);
	else if(typeof exports === 'object')
		exports["scrivito"] = factory(require("history"), require("promise-polyfill"), require("react"), require("react-dom"), require("speakingurl"), require("tcomb-react"), require("tcomb-validation"), require("underscore"), require("urijs"));
	else
		root["scrivito"] = factory(root["history"], root["promise-polyfill"], root["react"], root["react-dom"], root["speakingurl"], root["tcomb-react"], root["tcomb-validation"], root["underscore"], root["urijs"]);
})((typeof self !== 'undefined' ? self : global), (__WEBPACK_EXTERNAL_MODULE__7428__, __WEBPACK_EXTERNAL_MODULE__1932__, __WEBPACK_EXTERNAL_MODULE__8156__, __WEBPACK_EXTERNAL_MODULE__7111__, __WEBPACK_EXTERNAL_MODULE__2018__, __WEBPACK_EXTERNAL_MODULE__7726__, __WEBPACK_EXTERNAL_MODULE__5807__, __WEBPACK_EXTERNAL_MODULE__4952__, __WEBPACK_EXTERNAL_MODULE__8842__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 2584:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "G": () => (/* binding */ absoluteUrl)
/* harmony export */ });
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8842);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(urijs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3711);


function absoluteUrl(url) {
  const uri = urijs__WEBPACK_IMPORTED_MODULE_0__(url);
  if (uri.normalizeProtocol().protocol() === "data")
    return url;
  return uri.absoluteTo((0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .currentHref */ .RO)()).toString();
}


/***/ }),

/***/ 5000:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "m": () => (/* binding */ getAuthGroups),
/* harmony export */   "t": () => (/* binding */ provideAuthGroups)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3711);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9541);


const authGroupsState = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__/* .createStateContainer */ .JH)();
function provideAuthGroups(authGroups, ...excessArgs) {
  checkProvideAuthGroups(authGroups, ...excessArgs);
  authGroupsState.set(authGroups);
}
function getAuthGroups() {
  return authGroupsState.get();
}
const checkProvideAuthGroups = (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .checkArgumentsFor */ .PJ)(
  "provideAuthGroups",
  [["authGroups", scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .tcomb.dict */ .pC.dict(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .tcomb.String */ .pC.String, scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .tcomb.String */ .pC.String)]],
  { docPermalink: "js-sdk/provideAuthGroups" }
);


/***/ }),

/***/ 7700:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_i": () => (/* binding */ basicNavigateTo),
/* harmony export */   "jc": () => (/* binding */ isLatestNavigateToCallId),
/* harmony export */   "oA": () => (/* binding */ getNextNavigateToCallId)
/* harmony export */ });
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8842);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(urijs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_browser_location__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9979);
/* harmony import */ var scrivito_sdk_app_support_change_location__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2174);
/* harmony import */ var scrivito_sdk_app_support_destination_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6410);
/* harmony import */ var scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5079);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3711);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9246);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9838);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5932);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9541);










let latestCallId = 0;
function getNextNavigateToCallId() {
  latestCallId++;
  return latestCallId;
}
function isLatestNavigateToCallId(callId) {
  return latestCallId === callId;
}
function basicNavigateTo(target, callId = getNextNavigateToCallId()) {
  (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_9__/* .failIfFrozen */ .un)("basicNavigateTo");
  return (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_6__/* .load */ .zD)(() => destinationForTarget(target)).then((routingTarget) => {
    if (isLatestNavigateToCallId(callId)) {
      switch (routingTarget.type) {
        case "remote":
          (0,scrivito_sdk_app_support_change_location__WEBPACK_IMPORTED_MODULE_2__/* .changeLocation */ .z)(routingTarget.url);
          break;
        case "local":
          navigateToResource(routingTarget.resource);
          break;
        case "crossSite":
          navigateCrossSiteTo(routingTarget.url);
          break;
        case "unavailable":
          (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_5__/* .logError */ .H)(
            `Could not navigate to Obj ${routingTarget.objId}, no URL found`
          );
      }
    }
  });
}
function destinationForTarget(target) {
  if (isUrlRoutingTarget(target))
    return destinationForUrl(target.url);
  const { objId, query, hash } = target;
  const obj = scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_7__/* .BasicObj.get */ .Jj.get(objId);
  if (!obj)
    return (0,scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_4__/* .generateDestinationForId */ .N2)({ objId, query, hash });
  if ((0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_8__/* .isBinaryBasicObj */ .Gf)(obj)) {
    const blob = obj.get("blob", ["binary"]);
    if (!blob)
      return (0,scrivito_sdk_app_support_destination_types__WEBPACK_IMPORTED_MODULE_3__/* .generateDestinationUnavailable */ .Y)({ objId });
    return { type: "remote", url: blob.url() };
  }
  return (0,scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_4__/* .generateDestination */ .BC)({ obj, query, hash });
}
function navigateToResource(resource) {
  const currentResource = scrivito_sdk_app_support_browser_location__WEBPACK_IMPORTED_MODULE_1__/* .get */ .U2();
  if (resource === currentResource) {
    scrivito_sdk_app_support_browser_location__WEBPACK_IMPORTED_MODULE_1__/* .replace */ .gx(resource);
  } else {
    scrivito_sdk_app_support_browser_location__WEBPACK_IMPORTED_MODULE_1__/* .push */ .VF(resource);
  }
}
function isUrlRoutingTarget(routingTarget) {
  return !!routingTarget.url;
}
function destinationForUrl(url) {
  const uri = urijs__WEBPACK_IMPORTED_MODULE_0__(url);
  return (0,scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_4__/* .isLocalUri */ .m4)(uri) ? { type: "local", resource: uri.resource() } : { type: "remote", url };
}
function navigateCrossSiteTo(url) {
  const uri = new urijs__WEBPACK_IMPORTED_MODULE_0__(url);
  if ((0,scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_4__/* .isLocalUri */ .m4)(uri)) {
    navigateToResource(uri.resource());
  } else {
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_5__/* .redirectTo */ .gB)(url);
  }
}


/***/ }),

/***/ 2225:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "M": () => (/* binding */ basicUrlFor),
/* harmony export */   "P": () => (/* binding */ basicUrlForObj)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5079);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3711);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9838);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5932);
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};




function basicUrlFor(target, options) {
  if (target instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__/* .BasicLink */ .AM)
    return urlForLink(target, options);
  if (target instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__/* .Binary */ .Kb)
    return target.url();
  return basicUrlForObj(target, options);
}
function basicUrlForObj(obj, options) {
  if ((0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_3__/* .isBinaryBasicObj */ .Gf)(obj)) {
    const binaryUrl = urlForBinaryObj(obj, options.preserveObjId);
    if (binaryUrl)
      return binaryUrl;
  }
  return urlForNonBinaryObj(obj, options);
}
function urlForBinaryObj(obj, withoutPlaceholder) {
  const blob = obj.get("blob", ["binary"]);
  if (blob) {
    return withoutPlaceholder ? blob.urlWithoutPlaceholder() : blob.url();
  }
}
function urlForLink(link, options) {
  if (link.isExternal())
    return link.url();
  const obj = link.obj();
  if (obj instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__/* .BasicObj */ .Jj) {
    return basicUrlForObj(obj, populateMissingOptionsFromLink(options, link));
  }
  throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .ArgumentError */ .ir("Missing link target.");
}
function urlForNonBinaryObj(obj, { query: queryString, queryParameters, withoutOriginIfLocal, hash }) {
  const query = queryParameters != null ? queryParameters : queryString;
  if (!withoutOriginIfLocal) {
    return (0,scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_0__/* .generateUrlWithCanonicalOrigin */ .cr)({ obj, query, hash });
  }
  const destination = (0,scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_0__/* .generateDestination */ .BC)({ obj, query, hash });
  switch (destination.type) {
    case "local":
      return destination.resource;
    case "crossSite":
      return destination.url;
    default:
      return destination.fallbackUrl;
  }
}
function populateMissingOptionsFromLink(options, link) {
  const linkOptions = __spreadValues({}, options);
  if (!options.queryParameters && typeof options.query !== "string") {
    linkOptions.query = link.query() || void 0;
  }
  if (typeof options.hash !== "string") {
    linkOptions.hash = link.hash() || void 0;
  }
  return linkOptions;
}


/***/ }),

/***/ 9979:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JY": () => (/* binding */ getHistoryState),
/* harmony export */   "U2": () => (/* binding */ get),
/* harmony export */   "VF": () => (/* binding */ push),
/* harmony export */   "XB": () => (/* binding */ isCurrentHistoryState),
/* harmony export */   "gx": () => (/* binding */ replace),
/* harmony export */   "k6": () => (/* binding */ useHistory),
/* harmony export */   "pj": () => (/* binding */ getHistoryChangesCount)
/* harmony export */ });
/* unused harmony exports reset, createInitialHistory */
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7428);
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(history__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8842);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(urijs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3711);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9541);




let history;
let unlistenToHistory;
let lastAction;
function useHistory(historyToUse) {
  if (historyToUse.createHref({ pathname: "/" }) !== "/") {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .ArgumentError */ .ir(
      `Expected a history without a preconfigured basename. For further details, see: ${(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .docUrl */ .m0)("js-sdk/useHistory")}`
    );
  }
  if (historyToUse === history) {
    return;
  }
  const isFirstHistory = !history;
  listenToHistory(historyToUse);
  history = historyToUse;
  if (!isFirstHistory) {
    historyHasChanged();
  }
}
function getHistoryState() {
  return {
    historyChangesCount: getHistoryChangesCount(),
    location: get(),
    isRevisit: lastAction === "POP"
  };
}
function get() {
  const location = getHistory().location;
  return `${location.pathname}${location.search}${location.hash}`;
}
function getHistoryChangesCount() {
  return historyChangesCountState.get() || 0;
}
function push(resource) {
  const uri = new urijs__WEBPACK_IMPORTED_MODULE_1__(resource);
  getHistory().push({
    pathname: uri.pathname(),
    search: uri.search(),
    hash: uri.hash()
  });
}
function replace(resource) {
  const uri = new urijs__WEBPACK_IMPORTED_MODULE_1__(resource);
  getHistory().replace({
    pathname: uri.pathname(),
    search: uri.search(),
    hash: uri.hash()
  });
}
function isCurrentHistoryState(historyState) {
  return historyState.historyChangesCount === getHistoryChangesCount();
}
function reset() {
  history = void 0;
  lastAction = void 0;
  unlistenToHistory = void 0;
  historyChangesCountState.clear();
}
function createInitialHistory() {
  return (0,history__WEBPACK_IMPORTED_MODULE_0__.createBrowserHistory)();
}
function ensureHistory() {
  if (!history) {
    useHistory(createInitialHistory());
  }
}
function getHistory() {
  ensureHistory();
  return history;
}
function listenToHistory(historyToListen) {
  if (unlistenToHistory) {
    unlistenToHistory();
  }
  if (isHistoryV4(historyToListen)) {
    unlistenToHistory = historyToListen.listen((_location, action) => {
      historyHasChanged(action);
    });
  } else {
    unlistenToHistory = historyToListen.listen(({ action }) => {
      historyHasChanged(action);
    });
  }
}
function historyHasChanged(action) {
  lastAction = action;
  historyChangesCountState.set(getHistoryChangesCount() + 1);
}
const historyChangesCountState = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_3__/* .createStateContainer */ .JH)();
function isHistoryV4(historyToCheck) {
  return historyToCheck.hasOwnProperty("length");
}


/***/ }),

/***/ 7007:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ canEdit),
/* harmony export */   "r": () => (/* binding */ canEditObjWithId)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9470);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3711);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9246);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9838);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5932);





function canEdit(obj) {
  checkCanEditArguments(obj);
  return canEditObjWithId((0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_3__/* .unwrapAppClass */ .bM)(obj).id());
}
function canEditObjWithId(objId) {
  const ui = scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_4__/* .uiAdapter */ .k;
  if (!ui)
    return false;
  return (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_1__/* .loadWithDefault */ .n4)(false, () => ui.canEdit((0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__/* .currentWorkspaceId */ .tV)(), objId)) || false;
}
const checkCanEditArguments = (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .checkArgumentsFor */ .PJ)("canEdit", [["obj", scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__/* .ObjType */ .Bt]], {
  docPermalink: "js-sdk/canEdit"
});


/***/ }),

/***/ 2174:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ openInNewWindow),
/* harmony export */   "z": () => (/* binding */ changeLocation)
/* harmony export */ });
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8842);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(urijs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_current_origin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8397);
/* harmony import */ var scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9470);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3711);
/* harmony import */ var _routing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5079);





function changeLocation(url) {
  if (scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_4__/* .uiAdapter */ .k) {
    scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_4__/* .uiAdapter.navigateToExternalUrl */ .k.navigateToExternalUrl(url);
  } else {
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .redirectTo */ .gB)(url);
  }
}
function openInNewWindow(url) {
  if (scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_4__/* .uiAdapter */ .k && (0,_routing__WEBPACK_IMPORTED_MODULE_3__/* .isLocalUri */ .m4)(urijs__WEBPACK_IMPORTED_MODULE_0__(url))) {
    scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_4__/* .uiAdapter.openInNewUiWindow */ .k.openInNewUiWindow(convertToAbsoluteLocalUrl(url));
  } else {
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .openWindow */ .xw)(url, "_blank");
  }
}
function convertToAbsoluteLocalUrl(url) {
  const origin = (0,scrivito_sdk_app_support_current_origin__WEBPACK_IMPORTED_MODULE_1__/* .currentOrigin */ .Z)();
  if (origin === void 0)
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .InternalError */ .AQ();
  return new urijs__WEBPACK_IMPORTED_MODULE_0__(url).origin(origin).toString();
}


/***/ }),

/***/ 9411:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Zh": () => (/* binding */ configureContentBrowser),
/* harmony export */   "eZ": () => (/* binding */ getContentBrowserConfiguration)
/* harmony export */ });
/* unused harmony export resetContentBrowserConfiguration */
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4952);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_absolute_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2584);
/* harmony import */ var scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9470);
/* harmony import */ var scrivito_sdk_app_support_ui_adapter_compatible_value__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3409);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3711);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9838);
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};






let filters;
let filtersBuilder;
function getContentBrowserConfiguration(validObjClasses) {
  if (filtersBuilder) {
    const context = {};
    if (validObjClasses) {
      context._validObjClasses = validObjClasses;
    }
    const dynamicFilters = filtersBuilder(context);
    if (dynamicFilters) {
      return { filters: copyWithAbsoluteUrls(dynamicFilters) };
    }
  } else if (filters) {
    return { filters };
  }
}
function configureContentBrowser(configuration, ...excessArgs) {
  if (!scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_5__/* .uiAdapter */ .k) {
    return;
  }
  try {
    checkConfigure(configuration, ...excessArgs);
  } catch (e) {
    throw e instanceof Error ? new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .ArgumentError */ .ir(removeUnionSubTypeIndexesFromKey(e.message)) : e;
  }
  if (configuration.filters) {
    if (isFilterBuilder(configuration.filters)) {
      filtersBuilder = configuration.filters;
      filters = void 0;
    } else {
      filters = copyWithAbsoluteUrls(configuration.filters);
      filtersBuilder = void 0;
    }
  }
  const baseFilter = configuration.baseFilter;
  if (baseFilter) {
    const baseQuery = baseFilter.query;
    if (baseQuery) {
      scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_5__/* .uiAdapter.configureContentBrowser */ .k.configureContentBrowser(
        (0,scrivito_sdk_app_support_ui_adapter_compatible_value__WEBPACK_IMPORTED_MODULE_2__/* .uiAdapterCompatibleValue */ .f)({ baseQuery })
      );
    }
  }
}
function isFilterBuilder(maybeFilterBuilder) {
  return typeof maybeFilterBuilder === "function";
}
function resetContentBrowserConfiguration() {
  filters = void 0;
  filtersBuilder = void 0;
}
function removeUnionSubTypeIndexesFromKey(message) {
  return message.replace(/key 'filters.\d/, "key 'filters");
}
const checkConfigure = (() => {
  if (process.env.NODE_ENV !== "development")
    return () => {
    };
  const SearchFieldType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.union */ .pC.union([scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String, scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.list */ .pC.list(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String)]);
  const SearchOperatorType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.enums.of */ .pC.enums.of(
    (0,underscore__WEBPACK_IMPORTED_MODULE_0__.intersection)(scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .OPERATORS */ .fP, [
      "contains",
      "containsPrefix",
      "equals",
      "startsWith",
      "isGreaterThan",
      "isLessThan",
      "matches"
    ])
  );
  const SearchValueType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.union */ .pC.union(
    [
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String,
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Date */ .pC.Date,
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Nil */ .pC.Nil,
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Number */ .pC.Number,
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.list */ .pC.list(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.union */ .pC.union([scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String, scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Nil */ .pC.Nil])),
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.list */ .pC.list(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.union */ .pC.union([scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Date */ .pC.Date, scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Nil */ .pC.Nil])),
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.list */ .pC.list(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.union */ .pC.union([scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Number */ .pC.Number, scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Nil */ .pC.Nil]))
    ],
    "SearchValue"
  );
  const FilterNodeType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb["interface"] */ .pC["interface"]({
    title: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String)
  });
  const FilterCollectionNodeType = FilterNodeType.extend({
    field: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(SearchFieldType),
    operator: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(SearchOperatorType),
    expanded: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Boolean */ .pC.Boolean)
  });
  const RadioOptionType = FilterNodeType.extend({
    value: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(SearchValueType),
    query: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .ObjSearchType */ .d4),
    selected: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Boolean */ .pC.Boolean)
  });
  const RadioFilterType = FilterCollectionNodeType.extend(
    {
      type: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.enums.of */ .pC.enums.of(["radioButton"]),
      options: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.dict */ .pC.dict(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String, RadioOptionType)
    },
    "RadioFilterDefinition"
  );
  const CheckboxOptionType = FilterNodeType.extend({
    value: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(SearchValueType),
    selected: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Boolean */ .pC.Boolean)
  });
  const CheckboxFilterType = FilterCollectionNodeType.extend(
    {
      type: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.enums.of */ .pC.enums.of(["checkbox"]),
      options: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.dict */ .pC.dict(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String, CheckboxOptionType)
    },
    "CheckboxFilterDefinition"
  );
  const TreeFilterType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.declare */ .pC.declare("TreeFilterDefinition");
  TreeFilterType.define(
    FilterNodeType.extend({
      type: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.enums.of */ .pC.enums.of(["tree"])),
      icon: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String),
      query: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .ObjSearchType */ .d4),
      expanded: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Boolean */ .pC.Boolean),
      value: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(SearchValueType),
      field: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(SearchFieldType),
      operator: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(SearchOperatorType),
      selected: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Boolean */ .pC.Boolean),
      options: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.dict */ .pC.dict(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String, TreeFilterType))
    })
  );
  const FilterDefinitionTypeMapping = {
    tree: TreeFilterType,
    radioButton: RadioFilterType,
    checkbox: CheckboxFilterType
  };
  const FilterDefinitionType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.union */ .pC.union([
    FilterDefinitionTypeMapping.tree,
    FilterDefinitionTypeMapping.checkbox,
    FilterDefinitionTypeMapping.radioButton
  ]);
  FilterDefinitionType.dispatch = (definition) => FilterDefinitionTypeMapping[definition.type || "tree"];
  const StaticFiltersType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.dict */ .pC.dict(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String, FilterDefinitionType);
  const DynamicOrStaticFiltersType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.union */ .pC.union([scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Function */ .pC.Function, StaticFiltersType]);
  DynamicOrStaticFiltersType.dispatch = (v) => scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Function.is */ .pC.Function.is(v) ? DynamicOrStaticFiltersType.meta.types[0] : DynamicOrStaticFiltersType.meta.types[1];
  const BaseFilterType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb["interface"] */ .pC["interface"]({
    query: scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .ObjSearchType */ .d4
  });
  const ConfigurationType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb["interface"] */ .pC["interface"](
    {
      filters: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(DynamicOrStaticFiltersType),
      baseFilter: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(BaseFilterType)
    },
    "Configuration"
  );
  return (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .checkArgumentsFor */ .PJ)(
    "configureContentBrowser",
    [["configuration", ConfigurationType]],
    {
      docPermalink: "js-sdk/configureContentBrowser"
    }
  );
})();
function copyWithAbsoluteUrls(contentBrowserFilters) {
  return (0,underscore__WEBPACK_IMPORTED_MODULE_0__.mapObject)(contentBrowserFilters, (_a) => {
    var _b = _a, { icon, options } = _b, item = __objRest(_b, ["icon", "options"]);
    const hasCustomIcon = icon && !icon.match(/^\w+$/);
    if (icon)
      item.icon = hasCustomIcon ? (0,scrivito_sdk_app_support_absolute_url__WEBPACK_IMPORTED_MODULE_1__/* .absoluteUrl */ .G)(icon) : icon;
    if (options)
      item.options = copyWithAbsoluteUrls(options);
    return item;
  });
}


/***/ }),

/***/ 6461:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ configureObjClassForContentType),
/* harmony export */   "r": () => (/* binding */ getObjClassForContentTypeMapping)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3711);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9541);


const state = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__/* .createStateContainer */ .JH)();
function getObjClassForContentTypeMapping() {
  return state.get();
}
function configureObjClassForContentType(configuration, ...excessArgs) {
  checkConfigureObjClassForContentType(configuration, ...excessArgs);
  if (!configuration["*/*"]) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ArgumentError */ .ir(
      'No ObjClass has been configured for the contentType "*/*"'
    );
  }
  if (state.get() !== void 0) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ScrivitoError */ .Ix(
      "configureObjClassForContentType must be called only once"
    );
  }
  state.set(configuration);
}
const ContentTypePattern = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .tcomb.refinement */ .pC.refinement(
  scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .tcomb.String */ .pC.String,
  (s) => /^(\*\/\*|[^\/\*]+\/(\*|[^\*;]+))$/.test(s),
  "Content Type"
);
const ConfigurationType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .tcomb.dict */ .pC.dict(ContentTypePattern, scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .tcomb.String */ .pC.String);
const checkConfigureObjClassForContentType = (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .checkArgumentsFor */ .PJ)(
  "configureObjClassForContentType",
  [["configuration", ConfigurationType]],
  { docPermalink: "js-sdk/configureObjClassForContentType" }
);


/***/ }),

/***/ 8138:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a3": () => (/* binding */ setConstraintsValidationCallback),
/* harmony export */   "jv": () => (/* binding */ getConstraintsValidationCallback)
/* harmony export */ });
/* unused harmony export resetConstraintsValidationCallback */
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3711);

let constraintsValidationCallback;
function setConstraintsValidationCallback(callback) {
  constraintsValidationCallback = callback;
}
function getConstraintsValidationCallback() {
  if (constraintsValidationCallback) {
    return constraintsValidationCallback;
  }
  throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ScrivitoError */ .Ix(
    'Constraints validation callback is not configured. Forgot to call Scrivito.configure with the "constraintsCallback" option?'
  );
}
function resetConstraintsValidationCallback() {
  constraintsValidationCallback = void 0;
}


/***/ }),

/***/ 284:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ shouldContentTagsForEmptyAttributesBeSkipped),
/* harmony export */   "g": () => (/* binding */ skipContentTagsForEmptyAttributes)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9541);

const contentTagsForEmptyAttributes = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_0__/* .createStateContainer */ .JH)();
function skipContentTagsForEmptyAttributes() {
  contentTagsForEmptyAttributes.set(false);
}
function shouldContentTagsForEmptyAttributesBeSkipped() {
  return contentTagsForEmptyAttributes.get() === false;
}


/***/ }),

/***/ 4804:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "q": () => (/* binding */ currentAppSpace)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_editing_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8084);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9838);


function currentAppSpace() {
  const currentObjSpace = (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__/* .objSpaceScope */ .hA)((0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__/* .currentObjSpaceId */ .GD)());
  return (0,scrivito_sdk_app_support_editing_context__WEBPACK_IMPORTED_MODULE_0__/* .isComparisonActive */ .rl)() ? currentObjSpace : currentObjSpace.and(scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__/* .excludeDeletedObjs */ .E2);
}


/***/ }),

/***/ 8397:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ currentOrigin),
/* harmony export */   "k": () => (/* binding */ setOriginProvider)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3711);

let originProvider;
function currentOrigin() {
  if (!originProvider)
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .InternalError */ .AQ();
  return originProvider();
}
function setOriginProvider(provider) {
  originProvider = provider;
}


/***/ }),

/***/ 6500:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OO": () => (/* binding */ isCurrentPage),
/* harmony export */   "U": () => (/* binding */ withDefaultSiteContext),
/* harmony export */   "WX": () => (/* binding */ currentPageParams),
/* harmony export */   "lo": () => (/* binding */ currentPage),
/* harmony export */   "lx": () => (/* binding */ currentSiteId),
/* harmony export */   "pd": () => (/* binding */ withForbiddenSiteContext)
/* harmony export */ });
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8842);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(urijs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_current_page_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4077);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3711);
/* harmony import */ var scrivito_sdk_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9241);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9838);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5932);






function currentPage() {
  var _a;
  (0,scrivito_sdk_data__WEBPACK_IMPORTED_MODULE_3__/* .assertNotUsingInMemoryTenant */ .VJ)("Scrivito.currentPage");
  const page = (_a = (0,scrivito_sdk_app_support_current_page_data__WEBPACK_IMPORTED_MODULE_1__/* .getCurrentPageData */ ["if"])()) == null ? void 0 : _a.currentPage;
  return page ? (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__/* .wrapInAppClass */ .pz)(page) : null;
}
function isCurrentPage(page) {
  var _a;
  (0,scrivito_sdk_data__WEBPACK_IMPORTED_MODULE_3__/* .assertNotUsingInMemoryTenant */ .VJ)("Scrivito.isCurrentPage");
  (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .checkArgumentsFor */ .PJ)("isCurrentPage", [["page", scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .ObjType */ .Bt]], {
    docPermalink: "js-sdk/isCurrentPage"
  })(page);
  return ((_a = currentPage()) == null ? void 0 : _a.id()) === page.id();
}
function currentPageParams() {
  var _a;
  (0,scrivito_sdk_data__WEBPACK_IMPORTED_MODULE_3__/* .assertNotUsingInMemoryTenant */ .VJ)("Scrivito.currentPageParams");
  return urijs__WEBPACK_IMPORTED_MODULE_0__.parseQuery(((_a = (0,scrivito_sdk_app_support_current_page_data__WEBPACK_IMPORTED_MODULE_1__/* .getCurrentRoute */ .rk)()) == null ? void 0 : _a.query) || "");
}
const currentSiteContext = new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .ContextContainer */ .AY();
const forbiddenSiteContext = new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .ContextContainer */ .AY();
function currentSiteId() {
  var _a, _b, _c, _d;
  const errorMessage = forbiddenSiteContext.current();
  if (errorMessage)
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .ScrivitoError */ .Ix(errorMessage);
  return (_d = (_c = currentSiteContext.current()) != null ? _c : (_b = (_a = (0,scrivito_sdk_app_support_current_page_data__WEBPACK_IMPORTED_MODULE_1__/* .getCurrentRoute */ .rk)()) == null ? void 0 : _a.siteData) == null ? void 0 : _b.siteId) != null ? _d : null;
}
function withDefaultSiteContext(fn) {
  return currentSiteContext.runWith("default", fn);
}
function withForbiddenSiteContext(message, fn) {
  return forbiddenSiteContext.runWith(message, fn);
}


/***/ }),

/***/ 4077:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Kz": () => (/* binding */ setNavigationStateProvider),
/* harmony export */   "Mw": () => (/* binding */ withCurrentPageContext),
/* harmony export */   "fW": () => (/* binding */ getNotFoundErrorPageState),
/* harmony export */   "if": () => (/* binding */ getCurrentPageData),
/* harmony export */   "rk": () => (/* binding */ getCurrentRoute)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_current_app_space__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4804);
/* harmony import */ var scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5079);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3711);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9246);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9838);
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));





let getCurrentNavigationState = () => void 0;
function setNavigationStateProvider(provider) {
  getCurrentNavigationState = provider;
}
const navigationContext = new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .ContextContainer */ .AY();
function getCurrentPageData() {
  return (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_3__/* .loadableWithDefault */ .qu)(void 0, () => {
    var _a;
    const navigationState = (_a = navigationContext.current()) != null ? _a : getCurrentNavigationState();
    if (!navigationState)
      return void 0;
    const route = navigationState.locationRoute;
    if (route.objId) {
      const currentPage = (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .getObjFrom */ .R2)((0,scrivito_sdk_app_support_current_app_space__WEBPACK_IMPORTED_MODULE_0__/* .currentAppSpace */ .q)(), route.objId);
      if (!currentPage) {
        return {
          navigationState: __spreadProps(__spreadValues({}, navigationState), {
            locationRoute: __spreadProps(__spreadValues({}, route), { objId: void 0 })
          })
        };
      }
      return { navigationState, currentPage };
    }
    return { navigationState };
  });
}
function getCurrentRoute() {
  var _a;
  const navigationState = (_a = navigationContext.current()) != null ? _a : (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_3__/* .loadableWithDefault */ .qu)(void 0, getCurrentNavigationState);
  return navigationState == null ? void 0 : navigationState.locationRoute;
}
function withCurrentPageContext(context, fn) {
  return navigationContext.runWith(
    {
      locationRoute: {
        objId: context.page.id(),
        sitePath: context.sitePath,
        siteData: {
          siteId: context.siteId,
          baseUrl: context.baseUrl
        }
      },
      historyState: {
        historyChangesCount: 0,
        location: `${context.baseUrl}${context.sitePath}`,
        isRevisit: false
      }
    },
    fn
  );
}
function getNotFoundErrorPageState() {
  var _a;
  if (navigationContext.current())
    return;
  const navigationState = (_a = getCurrentPageData()) == null ? void 0 : _a.navigationState;
  if (!navigationState)
    return;
  if (!(0,scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_1__/* .isObjNotFoundRoute */ .Kh)(navigationState.locationRoute))
    return;
  return navigationState;
}


/***/ }),

/***/ 6410:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "W": () => (/* binding */ recognizeDestinationUnavailable),
/* harmony export */   "Y": () => (/* binding */ generateDestinationUnavailable)
/* harmony export */ });
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8842);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(urijs__WEBPACK_IMPORTED_MODULE_0__);

function generateDestinationUnavailable(params) {
  return {
    type: "unavailable",
    fallbackUrl: getDestinationUnavailableFallbackUrl(params),
    objId: params.objId
  };
}
function recognizeDestinationUnavailable(fallbackUri) {
  if (fallbackUri.path() !== "")
    return null;
  const fallbackHash = fallbackUri.hash();
  if (fallbackHash.indexOf("#SCRIVITO_UNAVAILABLE_") === 0) {
    const encodedParams = fallbackHash.substr("#SCRIVITO_UNAVAILABLE_".length);
    const paramsUri = new urijs__WEBPACK_IMPORTED_MODULE_0__(encodedParams);
    const objId = paramsUri.path();
    const params = { objId };
    if (paramsUri.query())
      params.query = paramsUri.query();
    if (paramsUri.hash())
      params.hash = paramsUri.hash();
    return params;
  }
  return null;
}
function getDestinationUnavailableFallbackUrl(params) {
  const paramsUri = new urijs__WEBPACK_IMPORTED_MODULE_0__("").path(params.objId);
  if (params.query)
    paramsUri.query(params.query);
  if (params.hash)
    paramsUri.hash(params.hash);
  const encodedParams = paramsUri.toString();
  const fallbackUri = new urijs__WEBPACK_IMPORTED_MODULE_0__("").hash(`SCRIVITO_UNAVAILABLE_${encodedParams}`);
  return fallbackUri.toString();
}


/***/ }),

/***/ 5915:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "P": () => (/* binding */ observeDocumentTitle),
/* harmony export */   "U": () => (/* binding */ getDocumentTitle)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9541);

const state = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_0__/* .createStateContainer */ .JH)();
function observeDocumentTitle() {
  const observer = new MutationObserver(documentTitleChanged);
  observer.observe(document.head, {
    attributes: true,
    attributeFilter: ["title"],
    characterData: true,
    childList: true,
    subtree: true
  });
  return () => observer.disconnect();
}
function getDocumentTitle() {
  return state.get() || "";
}
function documentTitleChanged() {
  state.set(document.title);
}


/***/ }),

/***/ 8611:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ox": () => (/* binding */ setEditingConfigFor),
/* harmony export */   "xk": () => (/* binding */ getEditingConfigFor)
/* harmony export */ });
/* unused harmony export resetEditingConfigStore */
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9541);

class EditingConfigStore {
  constructor() {
    this.store = {};
    this.updateCounter = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_0__/* .createStateContainer */ .JH)();
  }
  set(key, value) {
    this.store[key] = value;
    this.incrementUpdateCounter();
  }
  get(key) {
    this.updateCounter.get();
    return this.store[key];
  }
  clear() {
    this.store = {};
    this.incrementUpdateCounter();
  }
  incrementUpdateCounter() {
    this.updateCounter.set((this.updateCounter.get() || 0) + 1);
  }
}
const editingConfigStore = new EditingConfigStore();
function setEditingConfigFor(className, editingConfig) {
  editingConfigStore.set(className, editingConfig);
}
function getEditingConfigFor(className) {
  return editingConfigStore.get(className);
}
function resetEditingConfigStore() {
  editingConfigStore.clear();
}


/***/ }),

/***/ 8084:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DG": () => (/* binding */ isInPlaceEditingActive),
/* harmony export */   "MY": () => (/* binding */ initializeEditingContextFromBrowsingContext),
/* harmony export */   "rl": () => (/* binding */ isComparisonActive)
/* harmony export */ });
/* unused harmony exports setIsInPlaceEditingActive, setIsComparisonActive, resetEditingContext */
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9838);

let inPlaceEditingActive = false;
let comparisonActive = false;
function initializeEditingContextFromBrowsingContext(browsingContextName) {
  const editingContext = editingContextFromBrowsingContext(browsingContextName);
  if (!editingContext.workspaceId) {
    (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_0__/* .setCurrentWorkspaceId */ .P6)("published");
    return false;
  }
  (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_0__/* .setCurrentWorkspaceId */ .P6)(editingContext.workspaceId);
  inPlaceEditingActive = !!editingContext.inPlaceEditingActive;
  comparisonActive = !inPlaceEditingActive && !!editingContext.comparisonActive;
  return true;
}
function editingContextFromBrowsingContext(browsingContextName) {
  const markerIndex = browsingContextName.indexOf(" _scrivito {");
  if (markerIndex === -1)
    return {};
  const { editing, comparison, workspaceId } = JSON.parse(
    browsingContextName.substring(markerIndex + 11)
  );
  return {
    workspaceId,
    inPlaceEditingActive: !!editing,
    comparisonActive: !!comparison
  };
}
function isInPlaceEditingActive() {
  return inPlaceEditingActive;
}
function isComparisonActive() {
  return comparisonActive;
}
function setIsInPlaceEditingActive(isActive) {
  inPlaceEditingActive = isActive;
}
function setIsComparisonActive(isActive) {
  comparisonActive = isActive;
}
function resetEditingContext() {
  inPlaceEditingActive = false;
  comparisonActive = false;
}


/***/ }),

/***/ 5893:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "X": () => (/* binding */ getForcedEditorLanguage),
/* harmony export */   "n": () => (/* binding */ setForcedEditorLanguage)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9541);

const forcedEditorLanguage = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_0__/* .createStateContainer */ .JH)();
function setForcedEditorLanguage(language) {
  forcedEditorLanguage.set(language);
}
function getForcedEditorLanguage() {
  return forcedEditorLanguage.get();
}


/***/ }),

/***/ 149:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "g": () => (/* binding */ getClassName)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3711);
/* harmony import */ var scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2878);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5932);



function getClassName(subject) {
  var _a;
  if (typeof subject === "string")
    return subject;
  if (subject instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__/* .DataClass */ .Gd) {
    return subject.name();
  }
  if (subject instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__/* .DataItem */ .zw) {
    return subject.dataClass().name();
  }
  const className = (_a = scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_2__/* .Schema.forClass */ .V_.forClass(subject)) == null ? void 0 : _a.name();
  if (typeof className !== "string") {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ArgumentError */ .ir("Invalid class name, class or instance");
  }
  return className;
}


/***/ }),

/***/ 2511:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "N": () => (/* binding */ getComparisonRange)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9470);
/* harmony import */ var scrivito_sdk_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5098);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9838);



function getComparisonRange() {
  var _a;
  return ((_a = scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_2__/* .uiAdapter */ .k) == null ? void 0 : _a.comparisonRange()) || [scrivito_sdk_client__WEBPACK_IMPORTED_MODULE_0__.PUBLISHED_SPACE, (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__/* .currentObjSpaceId */ .GD)()];
}


/***/ }),

/***/ 6221:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WS": () => (/* binding */ initialContentFor),
/* harmony export */   "k9": () => (/* binding */ initializeContentForWidget),
/* harmony export */   "vI": () => (/* binding */ initializeContentForObj)
/* harmony export */ });
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4952);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_editing_config_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8611);
/* harmony import */ var scrivito_sdk_app_support_present_ui_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7515);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9246);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9838);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5932);







function initialContentFor(className, attributeName) {
  var _a;
  const initialContent = (_a = (0,scrivito_sdk_app_support_editing_config_store__WEBPACK_IMPORTED_MODULE_1__/* .getEditingConfigFor */ .xk)(className)) == null ? void 0 : _a.initialContent;
  if (initialContent) {
    const attributeContent = initialContent[attributeName];
    if ((0,underscore__WEBPACK_IMPORTED_MODULE_0__.isFunction)(attributeContent)) {
      return attributeContent();
    }
    if (isWidget(attributeContent)) {
      return (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__/* .wrapInAppClass */ .pz)(attributeContent._scrivitoPrivateContent.copy());
    }
    if (isWidgetlist(attributeContent)) {
      return attributeContent.map((widget) => {
        const basicWidget = widget._scrivitoPrivateContent;
        const copy = basicWidget.copy();
        return (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__/* .wrapInAppClass */ .pz)(copy);
      });
    }
    return attributeContent;
  }
}
function isWidgetlist(maybeWidgetlist) {
  return Array.isArray(maybeWidgetlist) && maybeWidgetlist.every(isWidget);
}
function isWidget(maybeWidget) {
  return !!maybeWidget && maybeWidget._scrivitoPrivateContent instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .BasicWidget */ .E8;
}
function initializeContentForObj(objId) {
  return (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_3__/* .load */ .zD)(() => scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .BasicObj.get */ .Jj.get(objId)).then((basicObj) => {
    if (basicObj) {
      initializeContentFor(basicObj);
      initializeContentFromHook(basicObj);
    }
  });
}
function initializeContentForWidget(objId, widgetId) {
  return (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_3__/* .load */ .zD)(() => scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .BasicObj.get */ .Jj.get(objId)).then((basicObj) => {
    if (!basicObj)
      return;
    return (0,scrivito_sdk_app_support_present_ui_adapter__WEBPACK_IMPORTED_MODULE_2__/* .presentUiAdapter */ .K)().finishReplicatingObj((0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .currentObjSpaceId */ .GD)(), objId).then(() => {
      const basicWidget = basicObj.widget(widgetId);
      if (basicWidget) {
        initializeContentFor(basicWidget);
        initializeContentFromHook(basicWidget);
      }
    });
  });
}
function initializeContentFor(basicContent) {
  const objClassName = basicContent.objClass();
  const schema = (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__/* .schemaFromBasicObjOrWidget */ .cv)(basicContent);
  if (!schema)
    return;
  const initialAttributes = {};
  Object.keys(schema.attributes()).forEach((attributeName) => {
    const typeInfo = schema.attributes()[attributeName];
    const currentValue = basicContent.get(attributeName, typeInfo);
    if ((0,underscore__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(currentValue)) {
      const initialValue = initialContentFor(objClassName, attributeName);
      if (initialValue) {
        initialAttributes[attributeName] = initialValue;
      }
    }
  });
  const attributesWithTypeInfo = (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__/* .unwrapAppAttributes */ .dz)(
    initialAttributes,
    schema,
    objClassName
  );
  basicContent.update(attributesWithTypeInfo);
}
function initializeContentFromHook(content) {
  var _a;
  const callback = (_a = (0,scrivito_sdk_app_support_editing_config_store__WEBPACK_IMPORTED_MODULE_1__/* .getEditingConfigFor */ .xk)(content.objClass())) == null ? void 0 : _a.initialize;
  if (callback)
    callback((0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__/* .wrapInAppClass */ .pz)(content));
}


/***/ }),

/***/ 1320:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eO": () => (/* binding */ unmountLegacyExtension),
/* harmony export */   "x7": () => (/* binding */ legacyRenderExtension)
/* harmony export */ });
/* unused harmony export resetExtension */
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7111);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3711);


let legacyExtensionElement;
function legacyRenderExtension(extension) {
  if (legacyExtensionElement) {
    react_dom__WEBPACK_IMPORTED_MODULE_0__.render(extension, legacyExtensionElement);
  } else {
    legacyExtensionElement = legacyReplaceDOMWithExtension(
      (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .getDocument */ .Me)(),
      extension
    );
  }
}
function legacyReplaceDOMWithExtension(doc, extension) {
  const div = doc.createElement("div");
  doc.body.innerHTML = "";
  doc.body.appendChild(div);
  react_dom__WEBPACK_IMPORTED_MODULE_0__.render(extension, div);
  return div;
}
function unmountLegacyExtension() {
  if (legacyExtensionElement) {
    react_dom__WEBPACK_IMPORTED_MODULE_0__.unmountComponentAtNode(legacyExtensionElement);
  }
}
function resetExtension() {
  legacyExtensionElement = void 0;
}


/***/ }),

/***/ 1582:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "YC": () => (/* binding */ registerLoadingActivity),
/* harmony export */   "kU": () => (/* binding */ finishLoading)
/* harmony export */ });
/* unused harmony export reset */
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3711);

let loadingCount = 0;
let deferred;
function finishLoading() {
  if (!deferred) {
    deferred = new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .Deferred */ .BH();
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .nextTick */ .Y3)(updateLoadingState);
  }
  return deferred.promise;
}
function registerLoadingActivity() {
  loadingCount += 1;
  return createUnregister();
}
function reset() {
  deferred = void 0;
  loadingCount = 0;
}
function createUnregister() {
  let unregisterHasBeenCalled = false;
  return function unregister() {
    if (unregisterHasBeenCalled) {
      throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .InternalError */ .AQ();
    }
    loadingCount -= 1;
    unregisterHasBeenCalled = true;
    if (loadingCount === 0) {
      (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .nextTick */ .Y3)(updateLoadingState);
    }
  };
}
function updateLoadingState() {
  if (deferred && loadingCount === 0) {
    deferred.resolve();
    deferred = void 0;
  }
}


/***/ }),

/***/ 3868:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "d7": () => (/* binding */ getMenuHandler),
  "Js": () => (/* binding */ getMenuPatch),
  "ff": () => (/* binding */ updateMenuExtensions)
});

// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(9541);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/menu/menu_handler_builder.ts
class MenuHandlerBuilder {
  constructor(id) {
    this.id = id;
  }
  insert(customMenuItem) {
    if (customMenuItem && customMenuItem.id === this.id) {
      this.onClick = customMenuItem.onClick;
    }
  }
  modify() {
  }
  remove() {
  }
  getHandler() {
    return this.onClick;
  }
}

// EXTERNAL MODULE: external "underscore"
var external_underscore_ = __webpack_require__(4952);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/absolute_url.ts
var absolute_url = __webpack_require__(2584);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 45 modules
var common = __webpack_require__(3711);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/menu/menu_patch_builder.ts
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};



class MenuPatchBuilder {
  constructor() {
    this.patch = {
      insertIds: [],
      removeIds: [],
      items: {},
      modifyItems: {}
    };
  }
  insert(customMenuItem, ...excessArgs) {
    checkMenuInsertArguments(customMenuItem, ...excessArgs);
    this.patch.insertIds = (0,external_underscore_.unique)([...this.patch.insertIds, customMenuItem.id]);
    this.patch.items[customMenuItem.id] = __spreadValues(__spreadValues(__spreadValues({}, (0,external_underscore_.pick)(customMenuItem, "description", "group", "position", "title")), (0,external_underscore_.mapObject)((0,external_underscore_.pick)(customMenuItem, "enabled"), (v) => !!v)), iconPatch(customMenuItem.icon));
  }
  modify(menuItem, ...excessArgs) {
    checkMenuModifyArguments(menuItem, ...excessArgs);
    this.patch.modifyItems[menuItem.id] = __spreadValues(__spreadValues(__spreadValues({}, this.patch.modifyItems[menuItem.id]), (0,external_underscore_.pick)(menuItem, "group", "position", "title")), iconPatch(menuItem.icon));
  }
  remove(id, ...excessArgs) {
    checkMenuRemoveArguments(id, ...excessArgs);
    this.patch.removeIds.push(id);
  }
  getPatch() {
    return this.patch;
  }
}
const PositionType = common/* tcomb.interface */.pC["interface"]({
  after: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String),
  before: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String)
});
const checkMenuInsertArguments = (0,common/* checkArgumentsFor */.PJ)(
  "menu.insert",
  [
    [
      "options",
      common/* tcomb.interface */.pC["interface"]({
        id: common/* tcomb.String */.pC.String,
        description: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String),
        enabled: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Boolean */.pC.Boolean),
        group: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String),
        icon: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String),
        onClick: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Function */.pC.Function),
        position: common/* tcomb.maybe */.pC.maybe(PositionType),
        title: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String)
      })
    ]
  ],
  {
    docPermalink: "js-sdk/extendMenu"
  }
);
const checkMenuModifyArguments = (0,common/* checkArgumentsFor */.PJ)(
  "menu.modify",
  [
    [
      "options",
      common/* tcomb.interface */.pC["interface"]({
        id: common/* tcomb.String */.pC.String,
        group: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String),
        icon: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String),
        position: common/* tcomb.maybe */.pC.maybe(PositionType),
        title: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String)
      })
    ]
  ],
  {
    docPermalink: "js-sdk/extendMenu"
  }
);
const checkMenuRemoveArguments = (0,common/* checkArgumentsFor */.PJ)(
  "menu.remove",
  [["id", common/* tcomb.String */.pC.String]],
  {
    docPermalink: "js-sdk/extendMenu"
  }
);
function iconPatch(icon) {
  return icon ? { icon: (0,absolute_url/* absoluteUrl */.G)(icon) } : {};
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/menu/menu_registry.ts
var menu_registry = __webpack_require__(12);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/menu.ts




const counterState = (0,state/* createStateContainer */.JH)();
function getMenuPatch() {
  getCounter();
  const builder = new MenuPatchBuilder();
  evaluateCallbacks(builder);
  return builder.getPatch();
}
function getMenuHandler(id) {
  const builder = new MenuHandlerBuilder(id);
  evaluateCallbacks(builder);
  return builder.getHandler();
}
function updateMenuExtensions() {
  counterState.set((getCounter() || 0) + 1);
}
function evaluateCallbacks(builder) {
  (0,menu_registry/* getMenuCallbacks */.Ak)().forEach(
    (menuCallback) => menuCallback.call(null, builder)
  );
}
function getCounter() {
  return counterState.get();
}


/***/ }),

/***/ 12:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ak": () => (/* binding */ getMenuCallbacks),
/* harmony export */   "Lg": () => (/* binding */ registerMenuCallback)
/* harmony export */ });
/* unused harmony export resetMenuRegistry */
let menuCallbacks = [];
function registerMenuCallback(menuCallback) {
  menuCallbacks.push(menuCallback);
}
function getMenuCallbacks() {
  return menuCallbacks;
}
function resetMenuRegistry() {
  menuCallbacks = [];
}


/***/ }),

/***/ 9344:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "T": () => (/* binding */ navigateTo)
/* harmony export */ });
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4952);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_basic_navigate_to__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7700);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3711);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9246);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9838);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5932);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9541);
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};







function navigateTo(target, options, ...excessArgs) {
  const callId = (0,scrivito_sdk_app_support_basic_navigate_to__WEBPACK_IMPORTED_MODULE_1__/* .getNextNavigateToCallId */ .oA)();
  (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_6__/* .failIfFrozen */ .un)("navigateTo");
  if (target === null) {
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .nextTick */ .Y3)(() => checkNavigateTo(target, options, ...excessArgs));
    return;
  }
  checkNavigateTo(target, options, ...excessArgs);
  let queryParameters;
  let hash = null;
  if (options) {
    const _a = options, {
      hash: optionsHash,
      params: optionsParams
    } = _a, convenienceParams = __objRest(_a, [
      "hash",
      "params"
    ]);
    checkNavigateToConvenience(target, convenienceParams);
    queryParameters = __spreadValues(__spreadValues({}, convenienceParams), optionsParams);
    hash = optionsHash || null;
  }
  const providesTarget = () => (0,underscore__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target) ? target() : target;
  (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_3__/* .load */ .zD)(providesTarget).then((evaluatedTarget) => {
    checkEvaluatedTarget(evaluatedTarget);
    const basicTarget = (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__/* .unwrapAppClass */ .bM)(evaluatedTarget);
    if (!(basicTarget instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .BasicObj */ .Jj) && !(basicTarget instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .BasicLink */ .AM)) {
      return;
    }
    return (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_3__/* .load */ .zD)(
      () => extractRoutingTarget(basicTarget, queryParameters, hash)
    ).then((routingTarget) => {
      if (!routingTarget) {
        throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .ArgumentError */ .ir(
          "The link provided to navigateTo has no destination."
        );
      }
      return (0,scrivito_sdk_app_support_basic_navigate_to__WEBPACK_IMPORTED_MODULE_1__/* .basicNavigateTo */ ._i)(routingTarget, callId);
    });
  }).catch((e) => {
    if ((0,scrivito_sdk_app_support_basic_navigate_to__WEBPACK_IMPORTED_MODULE_1__/* .isLatestNavigateToCallId */ .jc)(callId))
      (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .throwNextTick */ .a6)(e);
  });
}
function extractRoutingTarget(target, query, hash) {
  if (target instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .BasicLink */ .AM) {
    return extractRoutingTargetForLink(target, query, hash);
  }
  return { objId: target.id(), query, hash };
}
function extractRoutingTargetForLink(link, queryParameters, hashToApply) {
  if (link.isExternal())
    return { url: link.url() };
  const hash = hashToApply || link.hash();
  const query = queryParameters && !(0,underscore__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(queryParameters) ? queryParameters : link.queryParameters();
  const linkObj = link.obj();
  const objId = linkObj instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .BasicObj */ .Jj ? linkObj.id() : link.objId();
  return objId ? { objId, query, hash } : void 0;
}
const EvaluatedTargetType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .tcomb.union */ .pC.union([scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .ObjType */ .Bt, scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .LinkType */ .Un]);
const TargetType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .tcomb.union */ .pC.union([scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .tcomb.Function */ .pC.Function, EvaluatedTargetType]);
const ParamsValueType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .tcomb.dict */ .pC.dict(
  scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .tcomb.String */ .pC.String,
  scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .tcomb.union */ .pC.union([scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .tcomb.String */ .pC.String, scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .tcomb.list */ .pC.list(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .tcomb.String */ .pC.String), scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .tcomb.Nil */ .pC.Nil]))
);
const checkNavigateTo = (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .checkArgumentsFor */ .PJ)(
  "navigateTo",
  [
    ["target", TargetType],
    [
      "options",
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .tcomb.maybe */ .pC.maybe(
        scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .tcomb["interface"] */ .pC["interface"](
          {
            hash: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .tcomb.String */ .pC.String),
            params: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .tcomb.maybe */ .pC.maybe(ParamsValueType)
          },
          { strict: false }
        )
      )
    ]
  ],
  {
    docPermalink: "js-sdk/navigateTo"
  }
);
const checkNavigateToConvenience = (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .checkArgumentsFor */ .PJ)(
  "navigateTo",
  [
    ["target", TargetType],
    ["options", scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .tcomb.maybe */ .pC.maybe(ParamsValueType)]
  ],
  {
    docPermalink: "js-sdk/navigateTo"
  }
);
const checkEvaluatedTarget = (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .checkArgumentsFor */ .PJ)(
  "navigateTo",
  [["target", EvaluatedTargetType]],
  {
    docPermalink: "js-sdk/navigateTo"
  }
);


/***/ }),

/***/ 605:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lT": () => (/* binding */ getCurrentNavigationState),
/* harmony export */   "qN": () => (/* binding */ forceNavigationStateNotResponsible)
/* harmony export */ });
/* unused harmony exports resetNavigationState, setRecognizedSiteId, resetRecognizedSiteId */
/* harmony import */ var scrivito_sdk_app_support_basic_navigate_to__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7700);
/* harmony import */ var scrivito_sdk_app_support_browser_location__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9979);
/* harmony import */ var scrivito_sdk_app_support_change_location__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2174);
/* harmony import */ var scrivito_sdk_app_support_current_app_space__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4804);
/* harmony import */ var scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5079);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3711);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9246);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9838);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5932);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9541);
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));










function getCurrentNavigationState() {
  return loadableNavigationState.get();
}
let forceNotResponsible = false;
function forceNavigationStateNotResponsible() {
  forceNotResponsible = true;
  loadableNavigationState.reset();
}
function resetNavigationState() {
  forceNotResponsible = false;
}
function calculateNavigationState() {
  if (forceNotResponsible) {
    return {
      historyState: (0,scrivito_sdk_app_support_browser_location__WEBPACK_IMPORTED_MODULE_1__/* .getHistoryState */ .JY)(),
      locationRoute: { sitePath: null }
    };
  }
  const historyState = (0,scrivito_sdk_app_support_browser_location__WEBPACK_IMPORTED_MODULE_1__/* .getHistoryState */ .JY)();
  const locationRoute = recognizeLocation(historyState.location);
  if (typeof locationRoute === "string")
    return locationRoute;
  return {
    historyState,
    locationRoute
  };
}
function handleRedirectToBinary(maybeBinaryUrl) {
  if (typeof maybeBinaryUrl === "string") {
    (0,scrivito_sdk_app_support_change_location__WEBPACK_IMPORTED_MODULE_2__/* .changeLocation */ .z)(maybeBinaryUrl);
    return false;
  }
  return true;
}
function recognizeLocation(location) {
  var _a, _b;
  const route = (0,scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_4__/* .recognize */ .jh)(location);
  if ((0,scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_4__/* .isDestinationUnavailableRecognized */ .BH)(route)) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_5__/* .InternalError */ .AQ();
  }
  if (!route.objId)
    return route;
  const obj = (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_7__/* .getObjFrom */ .R2)(
    (0,scrivito_sdk_app_support_current_app_space__WEBPACK_IMPORTED_MODULE_3__/* .currentAppSpace */ .q)().and((0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_7__/* .restrictToSiteAndGlobal */ .L8)(route.siteData.siteId)),
    route.objId
  );
  if (!obj)
    return __spreadProps(__spreadValues({}, route), { objId: void 0 });
  if ((0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_8__/* .isBinaryBasicObj */ .Gf)(obj)) {
    return (_b = (_a = obj.get("blob", ["binary"])) == null ? void 0 : _a.url()) != null ? _b : __spreadProps(__spreadValues({}, route), { objId: void 0 });
  }
  return route;
}
const navigationState = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_9__/* .createStateContainer */ .JH)();
const loadableNavigationState = new scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_6__/* .LoadableData */ .of({
  state: navigationState,
  stream: (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_6__/* .loadAndObserve */ .DU)(calculateNavigationState).filter(handleRedirectToBinary).filter(handleMovedCurrentPage)
});
let lastNavigationState;
function handleMovedCurrentPage(newState) {
  const movedCurrentPage = (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_6__/* .loadableWithDefault */ .qu)(
    null,
    () => lastNavigationState && detectMovedCurrentPage(lastNavigationState, newState)
  );
  if (movedCurrentPage) {
    (0,scrivito_sdk_app_support_basic_navigate_to__WEBPACK_IMPORTED_MODULE_0__/* .basicNavigateTo */ ._i)({ objId: movedCurrentPage.id() });
    return false;
  }
  lastNavigationState = newState;
  return true;
}
function detectMovedCurrentPage(oldState, newState) {
  return newState.historyState.location === oldState.historyState.location && oldState.locationRoute.objId && !newState.locationRoute.objId && (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_7__/* .getObjFrom */ .R2)((0,scrivito_sdk_app_support_current_app_space__WEBPACK_IMPORTED_MODULE_3__/* .currentAppSpace */ .q)(), oldState.locationRoute.objId);
}
function setRecognizedSiteId({
  siteData,
  historyChangesCount
}) {
  const historyState = {
    historyChangesCount,
    isRevisit: false,
    location: ""
  };
  const meta = historyChangesCount === -1 ? {} : {
    version: historyChangesCount
  };
  navigationState.set({
    meta,
    value: {
      historyState,
      locationRoute: {
        siteData,
        sitePath: null
      }
    }
  });
}
function resetRecognizedSiteId() {
  navigationState.clear();
}


/***/ }),

/***/ 7515:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "K": () => (/* binding */ presentUiAdapter)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3711);
/* harmony import */ var _ui_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9470);


function presentUiAdapter() {
  if (!_ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .uiAdapter */ .k)
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .InternalError */ .AQ();
  return _ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .uiAdapter */ .k;
}


/***/ }),

/***/ 4591:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E": () => (/* binding */ configurePreviewSizes),
/* harmony export */   "F": () => (/* binding */ getPreviewSizes)
/* harmony export */ });
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4952);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3711);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9541);



const state = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_2__/* .createStateContainer */ .JH)();
function configurePreviewSizes(previewSizes) {
  checkConfigurePreviewSizes(previewSizes);
  if (!previewSizes.length) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .ArgumentError */ .ir(
      'No sizes has been provided for "configurePreviewSizes"'
    );
  }
  if ((0,underscore__WEBPACK_IMPORTED_MODULE_0__.uniq)(previewSizes, "width").length !== previewSizes.length) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .ArgumentError */ .ir('A "width" must be unique for sizes');
  }
  if (!previewSizes.every(validatePreviewSizeWidth)) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .ArgumentError */ .ir('A "width" must be a positive integer');
  }
  state.set(previewSizes);
}
function validatePreviewSizeWidth(previewSize) {
  const width = previewSize == null ? void 0 : previewSize.width;
  if (!width)
    return true;
  return width % 1 === 0 && width > 0;
}
function getPreviewSizes() {
  return state.get();
}
const PreviewSizeType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb["interface"] */ .pC["interface"](
  {
    title: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.String */ .pC.String,
    width: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.Number */ .pC.Number),
    description: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.String */ .pC.String),
    icon: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.String */ .pC.String)
  },
  "PreviewSize"
);
const checkConfigurePreviewSizes = (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .checkArgumentsFor */ .PJ)(
  "configurePreviewSizes",
  [["previewSizes", scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.list */ .pC.list(PreviewSizeType)]],
  { docPermalink: "js-sdk/configurePreviewSizes" }
);


/***/ }),

/***/ 4183:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "k": () => (/* binding */ getAttributeEditingOptionsFor),
/* harmony export */   "u": () => (/* binding */ provideEditingConfig)
/* harmony export */ });
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4952);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_editing_config_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8611);
/* harmony import */ var scrivito_sdk_app_support_get_class_name__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(149);
/* harmony import */ var scrivito_sdk_app_support_validations_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6666);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3711);
/* harmony import */ var scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2878);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9838);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5932);








function provideEditingConfig(subject, editingConfig, ...excessArgs) {
  checkProvideEditingConfig(subject, editingConfig, ...excessArgs);
  (0,scrivito_sdk_app_support_editing_config_store__WEBPACK_IMPORTED_MODULE_1__/* .setEditingConfigFor */ .ox)((0,scrivito_sdk_app_support_get_class_name__WEBPACK_IMPORTED_MODULE_2__/* .getClassName */ .g)(subject), editingConfig);
}
function getAttributeEditingOptionsFor(className, attributeName, attributeType) {
  var _a;
  const attributes = ((_a = (0,scrivito_sdk_app_support_editing_config_store__WEBPACK_IMPORTED_MODULE_1__/* .getEditingConfigFor */ .xk)(className)) == null ? void 0 : _a.attributes) || {};
  const attribute = attributes[attributeName];
  const options = attribute ? attribute.options : void 0;
  if (!options)
    return;
  if (attributeType === "html")
    return options;
  (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .nextTick */ .Y3)(() => throwInvalidOptions(options));
}
const { checkProvideEditingConfig, throwInvalidOptions } = (() => {
  if (process.env.NODE_ENV !== "development") {
    return {
      checkProvideEditingConfig: () => {
      },
      throwInvalidOptions: () => {
      }
    };
  }
  const EnumValueLocalizationType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb["interface"] */ .pC["interface"]({
    value: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String,
    title: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String
  });
  const HtmlToolbarButtonType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.enums.of */ .pC.enums.of([
    "blockquote",
    "bold",
    "bulletList",
    "clean",
    "code",
    "codeBlock",
    "header1",
    "header2",
    "header3",
    "header4",
    "header5",
    "header6",
    "indent",
    "italic",
    "link",
    "mark",
    "orderedList",
    "outdent",
    "strikethrough",
    "subscript",
    "superscript",
    "underline"
  ]);
  const PropertiesGroupDescriptionType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb["interface"] */ .pC["interface"]({
    title: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String,
    properties: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.list */ .pC.list(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String),
    enabled: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.Boolean */ .pC.Boolean),
    key: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String)
  });
  const RegisteredComponentGroupDescriptionType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb["interface"] */ .pC["interface"]({
    title: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String,
    component: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String,
    properties: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.list */ .pC.list(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String)),
    enabled: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.Boolean */ .pC.Boolean),
    key: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String)
  });
  const LivingComponentGroupDescriptionType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb["interface"] */ .pC["interface"]({
    title: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String,
    component: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.union */ .pC.union([scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.Function */ .pC.Function, scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.Object */ .pC.Object]),
    properties: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.list */ .pC.list(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String)),
    enabled: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.Boolean */ .pC.Boolean),
    key: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String
  });
  const ComponentGroupDescriptionType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.union */ .pC.union([
    RegisteredComponentGroupDescriptionType,
    LivingComponentGroupDescriptionType
  ]);
  const PropertiesGroupType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.union */ .pC.union([
    PropertiesGroupDescriptionType,
    ComponentGroupDescriptionType
  ]);
  const HtmlToolbarButtonsType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.refinement */ .pC.refinement(
    scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.list */ .pC.list(HtmlToolbarButtonType),
    (list) => list.length > 0,
    "NonemptyArray"
  );
  const AttributeDataContextConfigKeyType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.refinement */ .pC.refinement(
    scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String,
    scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_5__/* .isValidDataIdentifier */ .m3,
    "DataIdentifier"
  );
  const AttributeDataContextConfigType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.dict */ .pC.dict(
    scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String,
    scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.union */ .pC.union([scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.dict */ .pC.dict(AttributeDataContextConfigKeyType, scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String), scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String])
  );
  const AttributesEditingConfigType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.dict */ .pC.dict(
    scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String,
    scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb["interface"] */ .pC["interface"]({
      title: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String),
      description: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String),
      values: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.list */ .pC.list(EnumValueLocalizationType)),
      options: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(
        scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb["interface"] */ .pC["interface"]({
          allowedTags: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.list */ .pC.list(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String)),
          toolbar: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(HtmlToolbarButtonsType),
          showHtmlSource: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.Boolean */ .pC.Boolean)
        })
      )
    })
  );
  const PropertiesGroupsType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.refinement */ .pC.refinement(
    scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.list */ .pC.list(PropertiesGroupType),
    haveGroupsUniqueKey,
    "Unique key as a group identifier for faster rendering (like keys in React do)"
  );
  const InitialContentType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.dict */ .pC.dict(
    scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String,
    scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.union */ .pC.union([
      scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_6__/* .LinkType */ .Un,
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.Boolean */ .pC.Boolean,
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.Date */ .pC.Date,
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.Function */ .pC.Function,
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.Nil */ .pC.Nil,
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.Number */ .pC.Number,
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String,
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.list */ .pC.list(scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_6__/* .LinkType */ .Un),
      scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_6__/* .WidgetType */ .l9,
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.list */ .pC.list(scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_6__/* .WidgetType */ .l9),
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.list */ .pC.list(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String)
    ])
  );
  const DataClassType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.refinement */ .pC.refinement(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.Object */ .pC.Object, isDataClass, "DataClass");
  function isDataClass(maybeDataClass) {
    return maybeDataClass instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_5__/* .DataClass */ .Gd;
  }
  const DataItemType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.refinement */ .pC.refinement(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.Object */ .pC.Object, isDataItem, "DataItem");
  function isDataItem(maybeDataItem) {
    return maybeDataItem instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_5__/* .DataItem */ .zw;
  }
  const EditingConfigType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb["interface"] */ .pC["interface"]({
    attributeDataContext: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(AttributeDataContextConfigType),
    attributes: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(AttributesEditingConfigType),
    description: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String),
    descriptionForContent: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.Function */ .pC.Function),
    hideInSelectionDialogs: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.Boolean */ .pC.Boolean),
    initialContent: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(InitialContentType),
    initialize: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.Function */ .pC.Function),
    initializeCopy: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.Function */ .pC.Function),
    properties: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.union */ .pC.union([scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.list */ .pC.list(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String), scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.Function */ .pC.Function])),
    propertiesGroups: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.union */ .pC.union([PropertiesGroupsType, scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.Function */ .pC.Function])),
    thumbnail: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String),
    thumbnailForContent: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.Function */ .pC.Function),
    title: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String),
    titleForContent: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.Function */ .pC.Function),
    validations: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_app_support_validations_config__WEBPACK_IMPORTED_MODULE_3__/* .ValidationsConfigType */ .nN)
  });
  const docPermalink = "js-sdk/provideEditingConfig";
  return {
    checkProvideEditingConfig: (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .checkArgumentsFor */ .PJ)(
      "provideEditingConfig",
      [
        [
          "subject",
          scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.union */ .pC.union([
            scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.String */ .pC.String,
            scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_7__/* .ObjClassType */ .Qi,
            scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_7__/* .WidgetClassType */ .c6,
            DataClassType,
            DataItemType
          ])
        ],
        ["editingConfig", EditingConfigType]
      ],
      { docPermalink }
    ),
    throwInvalidOptions: (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .checkArgumentsFor */ .PJ)(
      "provideEditingConfig",
      [["options", scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .tcomb.struct */ .pC.struct({})]],
      { docPermalink }
    )
  };
})();
function haveGroupsUniqueKey(groups) {
  const groupsWithKey = groups.filter((group) => !!group.key);
  return (0,underscore__WEBPACK_IMPORTED_MODULE_0__.uniq)(groupsWithKey, "key").length === groupsWithKey.length;
}


/***/ }),

/***/ 5725:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "q": () => (/* binding */ replaceInternalLinks),
/* harmony export */   "y": () => (/* binding */ resolveHtmlUrls)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_basic_url_for__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2225);
/* harmony import */ var scrivito_sdk_app_support_current_app_space__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4804);
/* harmony import */ var scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5079);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3711);
/* harmony import */ var scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2878);
/* harmony import */ var scrivito_sdk_link_resolution__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8063);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9838);
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));







function resolveHtmlUrls(htmlString) {
  checkResolveHtmlUrls(htmlString);
  return replaceInternalLinks(htmlString);
}
function replaceInternalLinks(htmlString, options) {
  return (0,scrivito_sdk_link_resolution__WEBPACK_IMPORTED_MODULE_5__/* .formatInternalLinks */ .fq)(
    htmlString,
    (url) => calculateInternalLinkUrl(url, options)
  );
}
function calculateInternalLinkUrl({ obj_id: objId, query, hash }, options) {
  const obj = (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_6__/* .getObjFrom */ .R2)((0,scrivito_sdk_app_support_current_app_space__WEBPACK_IMPORTED_MODULE_1__/* .currentAppSpace */ .q)(), objId);
  if (!obj)
    return (0,scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_2__/* .generateUrl */ .nu)({ objId, query, hash });
  const dataStack = options == null ? void 0 : options.dataStack;
  return (0,scrivito_sdk_app_support_basic_url_for__WEBPACK_IMPORTED_MODULE_0__/* .basicUrlForObj */ .P)(obj, __spreadProps(__spreadValues({
    query: dataStack ? (0,scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_4__/* .getDataContextQuery */ .MW)(obj, dataStack, query) : query,
    hash
  }, options), {
    withoutOriginIfLocal: true
  }));
}
const checkResolveHtmlUrls = (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .checkArgumentsFor */ .PJ)(
  "resolveHtmlUrls",
  [["htmlString", scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String]],
  { docPermalink: "js-sdk/resolveHtmlUrls" }
);


/***/ }),

/***/ 5079:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "kx": () => (/* binding */ ensureRoutingDataAvailable),
  "BC": () => (/* binding */ generateDestination),
  "N2": () => (/* binding */ generateDestinationForId),
  "c4": () => (/* binding */ generateLocalPath),
  "nu": () => (/* binding */ generateUrl),
  "cr": () => (/* binding */ generateUrlWithCanonicalOrigin),
  "ZK": () => (/* binding */ initRouting),
  "BH": () => (/* binding */ isDestinationUnavailableRecognized),
  "m4": () => (/* binding */ isLocalUri),
  "QF": () => (/* binding */ isNotResponsibleRoute),
  "Kh": () => (/* binding */ isObjNotFoundRoute),
  "jh": () => (/* binding */ recognize)
});

// EXTERNAL MODULE: external "urijs"
var external_urijs_ = __webpack_require__(8842);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_origin.ts
var current_origin = __webpack_require__(8397);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_page_data.ts
var current_page_data = __webpack_require__(4077);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/destination_types.ts
var destination_types = __webpack_require__(6410);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 45 modules
var common = __webpack_require__(3711);
// EXTERNAL MODULE: ./scrivito_sdk/data/index.ts + 28 modules
var data = __webpack_require__(9241);
// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 23 modules
var loadable = __webpack_require__(9246);
// EXTERNAL MODULE: ./scrivito_sdk/models/index.ts + 34 modules
var models = __webpack_require__(9838);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/permalink_cache.ts




let cache = {};
let cacheContentStateId;
const cacheDisabled = new common/* ContextContainer */.AY();
function cacheObjForPermalink(obj, permalink, siteId) {
  if (cacheDisabled.current())
    return;
  if (!(0,common/* equals */.fS)(obj.objSpaceId(), (0,models/* currentObjSpaceId */.GD)())) {
    throw new common/* InternalError */.AQ();
  }
  if (!obj.siteId())
    return;
  clearIfOutdated();
  if (!cache[siteId])
    cache[siteId] = {};
  cache[siteId][permalink] = obj.id();
}
function objIdForPermalink(permalink, siteId) {
  var _a;
  if (cacheDisabled.current())
    return;
  clearIfOutdated();
  return (_a = cache[siteId]) == null ? void 0 : _a[permalink];
}
function withDisabledPermalinkCache(fn) {
  return cacheDisabled.runWith(true, fn);
}
function clearPermalinkCache() {
  cache = {};
  cacheContentStateId = void 0;
}
function clearIfOutdated() {
  const worldContentStateId = (0,loadable/* loadableWithDefault */.qu)(
    void 0,
    () => (0,data/* getContentStateId */.Dk)((0,models/* currentObjSpaceId */.GD)())
  ) || "";
  if (worldContentStateId !== cacheContentStateId) {
    cache = {};
    cacheContentStateId = worldContentStateId;
  }
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/routing/homepage_callback.ts
var homepage_callback = __webpack_require__(3079);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_app_space.ts
var current_app_space = __webpack_require__(4804);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/unstable_multi_site_mode.ts
var unstable_multi_site_mode = __webpack_require__(4132);
// EXTERNAL MODULE: ./scrivito_sdk/realm/index.ts + 22 modules
var realm = __webpack_require__(5932);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/routing_path.ts







function generateRoutingPath(obj, siteId) {
  if (isHomepage(obj, siteId))
    return "/";
  const permalink = generatePermalinkPath(obj, siteId);
  if (permalink)
    return permalink;
  const slug = generateSlug(obj);
  if (slug) {
    return `/${slug}-${obj.id()}`;
  }
  return `/${obj.id()}`;
}
function recognizeRoutingPath({
  sitePath: pathToRecognize,
  siteData: { siteId }
}) {
  var _a, _b, _c, _d;
  const path = pathToRecognize.replace(/^\/+([^/]|$)|([^/]|^)\/+$/g, "$1$2");
  if (path === "") {
    return usesOldStyleRouting(siteId) ? (_a = (0,homepage_callback/* homepageFromCallback */.R)()) == null ? void 0 : _a.id() : (_b = (0,models/* getRootObjFrom */.cS)((0,current_app_space/* currentAppSpace */.q)().and((0,models/* restrictToSite */.mz)(siteId)))) == null ? void 0 : _b.id();
  }
  return (_d = extractObjIdFromPath(path)) != null ? _d : (_c = recognizePermalink(path, siteId)) == null ? void 0 : _c.id();
}
function generatePermalinkPath(obj, siteId) {
  if (obj.isDeleted())
    return;
  const permalink = obj.permalink();
  if (!permalink)
    return;
  if (usesUnstableMultiSiteModeForSite(siteId) && !(0,unstable_multi_site_mode/* isGlobalOrFromUnstableSelectedSite */.IC)(obj)) {
    return;
  }
  cacheObjForPermalink(obj, permalink, siteId);
  return `/${permalink}`;
}
function recognizePermalink(path, siteId) {
  var _a, _b;
  const scope = (0,current_app_space/* currentAppSpace */.q)().and((0,models/* restrictToSiteAndGlobal */.L8)(siteId));
  const objId = objIdForPermalink(path, siteId);
  if (objId)
    return (_a = (0,models/* getObjFrom */.R2)(scope, objId)) != null ? _a : void 0;
  if (usesUnstableMultiSiteModeForSite(siteId)) {
    return (0,unstable_multi_site_mode/* recognizeUnstableMultiSitePermalink */.tB)(path, scope);
  }
  return (_b = (0,models/* getObjBy */.HG)(scope, "_permalink", path)) != null ? _b : void 0;
}
function isHomepage(obj, siteId) {
  if (!usesOldStyleRouting(siteId))
    return obj.path() === "/";
  const homepage = (0,loadable/* loadableWithDefault */.qu)(null, homepage_callback/* homepageFromCallback */.R);
  return homepage && homepage.id() === obj.id();
}
function generateSlug(basicObj) {
  const obj = (0,realm/* wrapInAppClass */.pz)(basicObj);
  if (!obj.slug)
    return;
  if (typeof obj.slug !== "function")
    return;
  const slug = obj.slug();
  if (typeof slug === "string")
    return slug;
}
function extractObjIdFromPath(input) {
  if (input.length < 16) {
    return null;
  }
  if (input.length > 16 && input.slice(-17, -16) !== "-") {
    return null;
  }
  const id = input.slice(-16);
  if (id.match(/[^0-9a-f]/)) {
    return null;
  }
  return id;
}
function usesOldStyleRouting(siteId) {
  return siteId === "default";
}
function usesUnstableMultiSiteModeForSite(siteId) {
  return usesOldStyleRouting(siteId) && (0,unstable_multi_site_mode/* useUnstableMultiSiteMode */.Ly)();
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/site_mapping.ts
var site_mapping = __webpack_require__(9823);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/routing.ts
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};









function isDestinationUnavailableRecognized(route) {
  return !!route.objId && !route.siteData;
}
function isNotResponsibleRoute(route) {
  return !route.sitePath;
}
function isObjNotFoundRoute(route) {
  return !!route.sitePath && !route.objId;
}
function generateUrl(options) {
  return destinationToUrl(
    options.obj ? generateDestination(options) : generateDestinationForId(options)
  );
}
function generateLocalPath(obj) {
  const destination = generateDestination({ obj });
  return destination.type === "local" ? destination.resource : void 0;
}
function destinationToUrl(destination) {
  switch (destination.type) {
    case "local":
      return destination.resource;
    case "crossSite":
      return destination.url;
    default:
      return destination.fallbackUrl;
  }
}
function generateDestination(options) {
  var _a;
  const obj = options.obj;
  const currentRoute = (0,current_page_data/* getCurrentRoute */.rk)();
  const currentSiteData = currentRoute == null ? void 0 : currentRoute.siteData;
  const currentSiteId = currentSiteData == null ? void 0 : currentSiteData.siteId;
  const siteId = (_a = obj.siteId()) != null ? _a : currentSiteId;
  if (!siteId)
    return unavailableFor(options);
  if (siteId !== currentSiteId) {
    const url = canonicalUrlForSite(siteId, options);
    return url ? { type: "crossSite", url } : unavailableFor(options);
  }
  const baseUrl = currentSiteData == null ? void 0 : currentSiteData.baseUrl;
  if (!baseUrl)
    return unavailableFor(options);
  const uri = joinUri(baseUrl, generateRoutingPath(obj, siteId), options);
  return (currentRoute == null ? void 0 : currentRoute.sitePath) || uri.origin() === (0,current_origin/* currentOrigin */.Z)() ? { type: "local", resource: uri.resource() } : { type: "crossSite", url: uri.toString() };
}
function generateUrlWithCanonicalOrigin(options) {
  var _a, _b, _c, _d;
  const siteId = (_c = options.obj.siteId()) != null ? _c : (_b = (_a = (0,current_page_data/* getCurrentRoute */.rk)()) == null ? void 0 : _a.siteData) == null ? void 0 : _b.siteId;
  if (!siteId)
    return unavailableFor(options).fallbackUrl;
  return (_d = canonicalUrlForSite(siteId, options)) != null ? _d : unavailableFor(options).fallbackUrl;
}
function canonicalUrlForSite(siteId, options) {
  const baseUrl = (0,site_mapping/* baseUrlForSite */.XY)(siteId);
  return baseUrl && joinUri(
    baseUrl,
    generateRoutingPath(options.obj, siteId),
    options
  ).toString();
}
function unavailableFor(options) {
  return (0,destination_types/* generateDestinationUnavailable */.Y)({
    objId: options.obj.id(),
    query: options.query,
    hash: options.hash
  });
}
function generateDestinationForId(options) {
  const { objId, query, hash } = options;
  const currentRoute = (0,current_page_data/* getCurrentRoute */.rk)();
  if (!(currentRoute == null ? void 0 : currentRoute.siteData)) {
    return (0,destination_types/* generateDestinationUnavailable */.Y)({ objId, query, hash });
  }
  const uri = joinUri(currentRoute.siteData.baseUrl, `/${objId}`, options);
  return currentRoute.sitePath || uri.origin() === (0,current_origin/* currentOrigin */.Z)() ? { type: "local", resource: uri.resource() } : { type: "crossSite", url: uri.toString() };
}
function joinUri(baseUrl, path, { query, hash }) {
  const url = path === "/" ? baseUrl : `${baseUrl}${path}`;
  const uri = new external_urijs_(url);
  if (query)
    uri.query(query);
  if (hash)
    uri.hash(hash);
  return uri;
}
function recognize(url) {
  const uri = typeof url === "string" ? new external_urijs_(url) : url;
  const destinationUnavailable = (0,destination_types/* recognizeDestinationUnavailable */.W)(uri);
  if (destinationUnavailable) {
    const { objId, query: query2 } = destinationUnavailable;
    return {
      objId,
      sitePath: null,
      query: query2
    };
  }
  const recognized = (0,site_mapping/* recognizeSiteAndPath */.Rc)(uri);
  const query = uri.query();
  if (recognized.sitePath === null) {
    return __spreadProps(__spreadValues({}, recognized), {
      query
    });
  }
  return __spreadProps(__spreadValues({}, recognized), {
    objId: recognizeRoutingPath(recognized),
    query
  });
}
function initRouting(_a) {
  var _b = _a, {
    homepageCallback
  } = _b, siteMappingConfiguration = __objRest(_b, [
    "homepageCallback"
  ]);
  (0,homepage_callback/* setHomepageCallback */.i)(homepageCallback);
  (0,site_mapping/* initSiteMapping */.Vz)(siteMappingConfiguration);
}
function ensureRoutingDataAvailable(basicPage) {
  withDisabledPermalinkCache(() => {
    const url = generateUrlWithCanonicalOrigin({ obj: basicPage });
    const route = recognize(url);
    if (route.objId !== basicPage.id()) {
      throw new common/* ScrivitoError */.Ix(
        `baseUrlForSite produced ${url} for ${basicPage.id()}, but siteForUrl did not recognize that URL correctly.`
      );
    }
  });
}
function isLocalUri(uri) {
  return uri.is("relative") || uri.origin() === (0,current_origin/* currentOrigin */.Z)();
}


/***/ }),

/***/ 3079:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "R": () => (/* binding */ homepageFromCallback),
/* harmony export */   "i": () => (/* binding */ setHomepageCallback)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_current_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6500);

let homepageCallback;
function setHomepageCallback(callback) {
  homepageCallback = callback;
}
function homepageFromCallback() {
  if (!homepageCallback)
    return null;
  return (0,scrivito_sdk_app_support_current_page__WEBPACK_IMPORTED_MODULE_0__/* .withDefaultSiteContext */ .U)(homepageCallback);
}


/***/ }),

/***/ 9479:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BN": () => (/* binding */ scaleDownBinary),
/* harmony export */   "R4": () => (/* binding */ usePrerenderScaling),
/* harmony export */   "kY": () => (/* binding */ isInitialUrlAvailable)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3711);

const prerenderContext = new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ContextContainer */ .AY();
const prerenderWidth = 128;
function usePrerenderScaling(fn) {
  return prerenderContext.runWith(true, fn);
}
function isInitialUrlAvailable(binary) {
  if (binary.isRaw() || binary.isExplicitlyTransformed()) {
    return !!binary.urlWithoutPlaceholder();
  }
  return !!optimizeForPrerender(binary).urlWithoutPlaceholder();
}
function scaleDownBinary(binary) {
  if (binary.isRaw() || binary.isExplicitlyTransformed()) {
    return { initialUrl: binary.url() };
  }
  const initialUrl = optimizeForPrerender(binary).url();
  if (prerenderContext.current()) {
    return { initialUrl };
  }
  const highResUrlToDecode = optimizeForScreen(binary).urlWithoutPlaceholder();
  if (!highResUrlToDecode || initialUrl === highResUrlToDecode) {
    return { initialUrl };
  }
  return { initialUrl, highResUrlToDecode };
}
function optimizeForPrerender(binary) {
  return binary.optimizeFor({ width: prerenderWidth });
}
function optimizeForScreen(binary) {
  const width = Math.max((0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .screen */ .M0)().width * (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .devicePixelRatio */ .KL)(), prerenderWidth);
  return binary.optimizeFor({ width });
}


/***/ }),

/***/ 180:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "aL": () => (/* binding */ registerScrollTarget),
  "zT": () => (/* binding */ scrollIntoView)
});

// UNUSED EXPORTS: resetScrollIntoView

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 45 modules
var common = __webpack_require__(3711);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/navigation_state.ts
var navigation_state = __webpack_require__(605);
// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 23 modules
var loadable = __webpack_require__(9246);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/get_current_page_id.ts


function getCurrentPageId() {
  return (0,loadable/* loadableWithDefault */.qu)(
    void 0,
    () => {
      var _a, _b;
      return (_b = (_a = (0,navigation_state/* getCurrentNavigationState */.lT)()) == null ? void 0 : _a.locationRoute) == null ? void 0 : _b.objId;
    }
  );
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/scroll_element_into_view.ts
function scrollElementIntoView(element) {
  element.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center"
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/scroll_into_view.ts



function registerScrollTarget(targetId, element, onReveal) {
  const targetKey = keyFor(targetId);
  const id = (0,common/* randomHex */.Q4)();
  const reveal = () => {
    scrollElementIntoView(element);
    if (onReveal)
      onReveal();
  };
  const scrollTargets = scrollTargetRegistry[targetKey] || [];
  scrollTargets.push({ id, reveal });
  scrollTargetRegistry[targetKey] = scrollTargets;
  if (requestedTargetId === targetKey) {
    reveal();
    requestedTargetId = "";
  }
  return () => {
    const entries = scrollTargetRegistry[targetKey];
    const remainingEntries = entries == null ? void 0 : entries.filter((entry) => entry.id !== id);
    if (remainingEntries == null ? void 0 : remainingEntries.length) {
      scrollTargetRegistry[targetKey] = remainingEntries;
    } else {
      delete scrollTargetRegistry[targetKey];
    }
  };
}
function scrollIntoView(targetId) {
  if (targetId.objId !== getCurrentPageId())
    return;
  const targetKey = keyFor(targetId);
  const entries = scrollTargetRegistry[targetKey];
  if (entries) {
    entries.forEach((entry) => entry.reveal());
  } else {
    requestedTargetId = targetKey;
  }
}
function keyFor(targetId) {
  return [targetId.objId, targetId.attributeName, targetId.widgetId].toString();
}
let scrollTargetRegistry = {};
let requestedTargetId;
function resetScrollIntoView() {
  scrollTargetRegistry = {};
  requestedTargetId = "";
}


/***/ }),

/***/ 9823:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Rc": () => (/* binding */ recognizeSiteAndPath),
/* harmony export */   "Vz": () => (/* binding */ initSiteMapping),
/* harmony export */   "XY": () => (/* binding */ baseUrlForSite)
/* harmony export */ });
/* unused harmony export reset */
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8842);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(urijs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_current_origin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8397);
/* harmony import */ var scrivito_sdk_app_support_current_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6500);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3711);




let baseUrlForSiteCallback;
let siteForUrlCallback;
function initSiteMapping(config = {}) {
  var _a;
  if (config.baseUrlForSite) {
    baseUrlForSiteCallback = config.baseUrlForSite;
    siteForUrlCallback = config.siteForUrl;
    return;
  }
  const basePath = (_a = config.routingBasePath) != null ? _a : "";
  let baseUrl;
  baseUrlForSiteCallback = (siteId) => {
    var _a2, _b;
    if (siteId === null || siteId === "default") {
      if (!baseUrl) {
        const origin = (_b = (_a2 = config.origin) != null ? _a2 : (0,scrivito_sdk_app_support_current_origin__WEBPACK_IMPORTED_MODULE_1__/* .currentOrigin */ .Z)()) != null ? _b : throwNoOrigin();
        baseUrl = `${origin}/${basePath.replace(/^\/+/, "")}`;
      }
      return baseUrl;
    }
  };
  siteForUrlCallback = (url) => {
    const uri = new urijs__WEBPACK_IMPORTED_MODULE_0__(url);
    const origin = uri.origin();
    if (origin !== config.origin && origin !== (0,scrivito_sdk_app_support_current_origin__WEBPACK_IMPORTED_MODULE_1__/* .currentOrigin */ .Z)())
      return;
    if (!basePath) {
      return { siteId: "default", baseUrl: uri.origin() };
    }
    return {
      siteId: "default",
      baseUrl: new urijs__WEBPACK_IMPORTED_MODULE_0__(uri.origin()).resource(basePath).toString()
    };
  };
}
function baseUrlForSite(siteId) {
  const result = executeBaseUrlForSiteCallback(siteId);
  if (result === void 0)
    return null;
  if (result === "")
    return null;
  if (typeof result === "string")
    return removeTrailingSlashes(result);
  reportUnexpectedReturnValue("baseUrlForSite", result, "String | Void");
  return null;
}
function recognizeSiteAndPath(uriToRecognize) {
  if (!siteForUrlCallback)
    throwNotInitialized();
  const uri = normalizeUri(uriToRecognize);
  const url = uri.toString();
  const result = siteForUrl(url);
  if (!result)
    return { sitePath: null };
  const baseUrl = removeTrailingSlashes(result.baseUrl);
  return {
    siteData: { siteId: result.siteId, baseUrl },
    sitePath: determineSitePath(baseUrl, url)
  };
}
function determineSitePath(baseUrl, url) {
  if (!startsWith(baseUrl, url))
    return null;
  const restOfUrl = url.substring(baseUrl.length);
  const path = removeNonPathComponents(restOfUrl);
  if (path === "")
    return "/";
  if (path.charAt(0) !== "/")
    return null;
  return path;
}
function startsWith(prefix, input) {
  return input.substring(0, prefix.length) === prefix;
}
function removeNonPathComponents(resource) {
  return new urijs__WEBPACK_IMPORTED_MODULE_0__("").resource(resource).path();
}
function normalizeUri(uri) {
  var _a;
  const normalizedUrl = uri.clone();
  if (normalizedUrl.is("relative")) {
    normalizedUrl.origin((_a = (0,scrivito_sdk_app_support_current_origin__WEBPACK_IMPORTED_MODULE_1__/* .currentOrigin */ .Z)()) != null ? _a : throwNoOrigin());
  }
  normalizedUrl.normalizePath();
  return normalizedUrl;
}
function siteForUrl(url) {
  const result = (0,scrivito_sdk_app_support_current_page__WEBPACK_IMPORTED_MODULE_2__/* .withForbiddenSiteContext */ .pd)(
    "Access to current site inside siteForUrl. Forgot to use onAllSites?",
    () => siteForUrlCallback == null ? void 0 : siteForUrlCallback.call(null, url)
  );
  if (!isSiteForUrlResult(result)) {
    reportUnexpectedReturnValue(
      "siteForUrl",
      result,
      "{siteId: String, baseUrl: String} | Void"
    );
    return void 0;
  }
  return result && {
    siteId: result.siteId,
    baseUrl: removeTrailingSlashes(result.baseUrl)
  };
}
function removeTrailingSlashes(input) {
  return input.replace(/([^/]|^)\/+$/, "$1");
}
function reportUnexpectedReturnValue(callbackName, actual, expectedType) {
  const errorMessage = `Unexpected return value from ${callbackName}: got ${(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .prettyPrint */ .xr)(
    actual
  )}, expected type ${expectedType}. ${SEE_CONFIGURE}`;
  (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .throwNextTick */ .a6)(new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .ArgumentError */ .ir(errorMessage));
}
function executeBaseUrlForSiteCallback(siteId) {
  if (!baseUrlForSiteCallback)
    throwNotInitialized();
  return baseUrlForSiteCallback.call(null, siteId);
}
function reset() {
  baseUrlForSiteCallback = void 0;
  siteForUrlCallback = void 0;
}
function throwNotInitialized() {
  throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .ScrivitoError */ .Ix(
    "Cannot use routing before Scrivito.configure was called."
  );
}
function throwNoOrigin() {
  throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .ScrivitoError */ .Ix(
    `Cannot compute an absolute URL without a configured origin or base URL. ${SEE_CONFIGURE}`
  );
}
function isSiteForUrlResult(maybeSiteForUrlResult) {
  const siteForUrlResult = maybeSiteForUrlResult;
  if (siteForUrlResult === void 0)
    return true;
  return typeof (siteForUrlResult == null ? void 0 : siteForUrlResult.siteId) === "string" && typeof (siteForUrlResult == null ? void 0 : siteForUrlResult.baseUrl) === "string";
}
const SEE_CONFIGURE = `Visit ${(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .docUrl */ .m0)(
  "js-sdk/configure"
)} for more information.`;


/***/ }),

/***/ 3467:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J1": () => (/* binding */ setTreatLocalhostLike),
/* harmony export */   "XF": () => (/* binding */ getTreatLocalhostLike)
/* harmony export */ });
/* unused harmony export resetTreatLocalhostLike */
let treatLocalhostLike;
function setTreatLocalhostLike(url) {
  treatLocalhostLike = url;
}
function getTreatLocalhostLike() {
  return treatLocalhostLike;
}
function resetTreatLocalhostLike() {
  treatLocalhostLike = void 0;
}


/***/ }),

/***/ 9470:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "k": () => (/* binding */ uiAdapter),
/* harmony export */   "p": () => (/* binding */ setUiAdapter)
/* harmony export */ });
let uiAdapter;
function setUiAdapter(newUiAdapter) {
  uiAdapter = newUiAdapter;
}


/***/ }),

/***/ 3409:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "f": () => (/* binding */ uiAdapterCompatibleValue)
/* harmony export */ });
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4952);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9838);
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};


function uiAdapterCompatibleValue(value) {
  if (!value)
    return value;
  switch (typeof value) {
    case "string":
    case "number":
    case "boolean":
      return value;
    case "object":
      if (isObjSearch(value))
        return uiCompatibleSearchParams(value);
      if ((0,underscore__WEBPACK_IMPORTED_MODULE_0__.isDate)(value))
        return value;
      if (Array.isArray(value))
        return uiCompatibleArrayValue(value);
      return uiCompatibleObjectValue(value);
  }
}
function uiCompatibleArrayValue(array) {
  const copy = [];
  array.forEach((item) => {
    const compatibleItem = uiAdapterCompatibleValue(item);
    if (compatibleItem !== void 0) {
      copy.push(compatibleItem);
    }
  });
  return copy;
}
function uiCompatibleObjectValue(object) {
  const copy = {};
  Object.keys(object).forEach((key) => {
    const value = object[key];
    const compatibleValueForKey = uiAdapterCompatibleValue(value);
    if (compatibleValueForKey !== void 0) {
      copy[key] = compatibleValueForKey;
    }
  });
  return copy;
}
function isObjSearch(v) {
  return v._scrivitoPrivateContent instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__/* .BasicObjSearch */ .be;
}
function uiCompatibleSearchParams(objSearch) {
  const _a = objSearch._scrivitoPrivateContent.params(), { query } = _a, params = __objRest(_a, ["query"]);
  const sanitizedQuery = query.filter((q) => !isSiteRelated(q.field));
  return uiAdapterCompatibleValue(__spreadProps(__spreadValues({}, params), { query: sanitizedQuery }));
}
function isSiteRelated(field) {
  return typeof field === "string" ? field === "_site_id" : field.indexOf("_site_id") !== -1;
}


/***/ }),

/***/ 4132:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IC": () => (/* binding */ isGlobalOrFromUnstableSelectedSite),
/* harmony export */   "IN": () => (/* binding */ getUnstableSelectedSiteId),
/* harmony export */   "Ly": () => (/* binding */ useUnstableMultiSiteMode),
/* harmony export */   "NV": () => (/* binding */ setUnstableMultiSiteMode),
/* harmony export */   "gq": () => (/* binding */ unstable_selectSiteId),
/* harmony export */   "iY": () => (/* binding */ getUnstableSiteIdForObjId),
/* harmony export */   "tB": () => (/* binding */ recognizeUnstableMultiSitePermalink)
/* harmony export */ });
/* unused harmony exports UnstableMultiSiteModeOperationError, resetUnstableMultiSiteMode */
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3711);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9246);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9838);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5932);




class UnstableMultiSiteModeOperationError extends scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ScrivitoError */ .Ix {
  constructor(message) {
    super(message);
  }
}
let getUnstableSiteIdForObjCallback;
function setUnstableMultiSiteMode(callback) {
  getUnstableSiteIdForObjCallback = callback;
}
function useUnstableMultiSiteMode() {
  return !!getUnstableSiteIdForObjCallback;
}
function getUnstableSiteIdForObjId(objId) {
  if (useUnstableMultiSiteMode()) {
    const obj = scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__/* .BasicObj.get */ .Jj.get(objId);
    if (obj)
      return getSiteIdForObj(obj);
  }
  return null;
}
function getSiteIdForObj(obj) {
  const siteId = getUnstableSiteIdForObjCallback((0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_3__/* .wrapInAppClass */ .pz)(obj));
  if (typeof siteId === "string" && siteId.length > 0) {
    return siteId;
  }
  return null;
}
function unstable_selectSiteId(siteId) {
  if (!getUnstableSiteIdForObjCallback) {
    throw new UnstableMultiSiteModeOperationError(
      "Scrivito.unstable_selectSiteId is only available in the multi-site mode"
    );
  }
  const preselected = (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_1__/* .loadableWithDefault */ .qu)(null, getUnstableSelectedSiteId);
  if (preselected && preselected !== siteId) {
    throw new UnstableMultiSiteModeOperationError(
      `Scrivito.unstable_selectSiteId called with ${siteId}, but ${preselected} was already selected`
    );
  }
  if (typeof siteId !== "string" || !siteId) {
    throw new UnstableMultiSiteModeOperationError(
      "Scrivito.unstable_selectSiteId can only be called with a non-empty string"
    );
  }
  selectedSiteId().set(siteId);
}
function getUnstableSelectedSiteId() {
  if (!getUnstableSiteIdForObjCallback) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .InternalError */ .AQ();
  }
  return selectedSiteId().get() || null;
}
function resetUnstableMultiSiteMode() {
  getUnstableSiteIdForObjCallback = void 0;
}
const loadableCollection = new scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_1__/* .LoadableCollection */ .X2({
  recordedAs: "multiSiteMode",
  loadElement: () => ({
    loader: () => (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .never */ .Fi)()
  })
});
function selectedSiteId() {
  return loadableCollection.get("selectedSiteId");
}
function recognizeUnstableMultiSitePermalink(path, scope) {
  var _a;
  const siteId = getSiteIdAssumingSelected();
  const objs = (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__/* .getAllObjsByValueFrom */ .TW)(scope, "_permalink", path);
  const matchingObjs = objs.filter((obj) => {
    const objSiteId = getSiteIdForObj(obj);
    return objSiteId ? objSiteId === siteId : true;
  });
  const matchingNotDeletedObjs = matchingObjs.filter((obj) => !obj.isDeleted());
  return (_a = matchingNotDeletedObjs[0]) != null ? _a : matchingObjs[0];
}
function isGlobalOrFromUnstableSelectedSite(obj) {
  const objSiteId = getSiteIdForObj(obj);
  const currentSiteId = getSiteIdAssumingSelected();
  return !objSiteId || objSiteId === currentSiteId;
}
function getSiteIdAssumingSelected() {
  const siteId = (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_1__/* .loadableWithDefault */ .qu)(void 0, getUnstableSelectedSiteId);
  if (siteId === void 0) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ScrivitoError */ .Ix(
      "Access to routing in the multi-site mode, but the site ID is not yet selected. Forgot to use Scrivito.unstable_selectSiteId?"
    );
  }
  return siteId;
}


/***/ }),

/***/ 1425:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "n": () => (/* binding */ User)
/* harmony export */ });
class User {
  constructor(userData) {
    this.userData = userData;
  }
  id() {
    return this.userData.id;
  }
  name() {
    return this.userData.name;
  }
  email() {
    return this.userData.email;
  }
}


/***/ }),

/***/ 6666:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bI": () => (/* binding */ VALIDATION_SEVERITY_LEVELS),
/* harmony export */   "eK": () => (/* binding */ isContentValidationCallback),
/* harmony export */   "nN": () => (/* binding */ ValidationsConfigType),
/* harmony export */   "np": () => (/* binding */ getValidationCallback),
/* harmony export */   "tj": () => (/* binding */ isAttributeValidationConstraintsWithOptions)
/* harmony export */ });
/* unused harmony export isAttributeValidationCallback */
/* harmony import */ var scrivito_sdk_app_support_constraints_validation_callback__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8138);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3711);


const VALIDATION_SEVERITY_LEVELS = [
  "error",
  "warning",
  "info"
];
const ConstraintsConfig = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb["interface"] */ .pC["interface"]({
  severity: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.enums.of */ .pC.enums.of(VALIDATION_SEVERITY_LEVELS))
});
const ConstraintsWithConfig = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.tuple */ .pC.tuple([ConstraintsConfig, scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.Object */ .pC.Object]);
const ValidationsConfigType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.list */ .pC.list(
  scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.union */ .pC.union([
    scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.Function */ .pC.Function,
    scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.list */ .pC.list(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.union */ .pC.union([scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.String */ .pC.String, scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.Function */ .pC.Function, scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.Object */ .pC.Object, ConstraintsWithConfig]))
  ])
);
function getValidationCallback(callbackOrConstraints) {
  if (isAttributeValidationCallback(callbackOrConstraints)) {
    return callbackOrConstraints;
  }
  const constraints = isAttributeValidationConstraintsWithOptions(
    callbackOrConstraints
  ) ? callbackOrConstraints[1] : callbackOrConstraints;
  return (0,scrivito_sdk_app_support_constraints_validation_callback__WEBPACK_IMPORTED_MODULE_0__/* .getConstraintsValidationCallback */ .jv)()(constraints);
}
function isContentValidationCallback(maybeContentValidationCallback) {
  return typeof maybeContentValidationCallback === "function";
}
function isAttributeValidationCallback(maybeAttributeValidationCallback) {
  return typeof maybeAttributeValidationCallback === "function";
}
function isAttributeValidationConstraintsWithOptions(candidate) {
  if (!Array.isArray(candidate))
    return false;
  const [maybeOptions, maybeConstraints] = candidate;
  if (!isAttributeValidationOptions(maybeOptions))
    return false;
  return !!maybeConstraints && typeof maybeConstraints === "object";
}
function isAttributeValidationOptions(maybeAttributeValidationOptions) {
  if (!maybeAttributeValidationOptions)
    return false;
  if (typeof maybeAttributeValidationOptions !== "object")
    return false;
  const maybeSeverity = maybeAttributeValidationOptions.severity;
  if (!maybeSeverity)
    return true;
  return VALIDATION_SEVERITY_LEVELS.indexOf(maybeSeverity) !== -1;
}


/***/ }),

/***/ 8128:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H8": () => (/* binding */ SEND),
/* harmony export */   "HT": () => (/* binding */ GET),
/* harmony export */   "M": () => (/* binding */ STREAM)
/* harmony export */ });
const GET = "GET";
const SEND = "SEND";
const STREAM = "STREAM";


/***/ }),

/***/ 4899:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "HT": () => (/* reexport */ adapter_description/* GET */.HT),
  "H8": () => (/* reexport */ adapter_description/* SEND */.H8),
  "M": () => (/* reexport */ adapter_description/* STREAM */.M),
  "fv": () => (/* reexport */ anticipatedMessageLink),
  "bZ": () => (/* reexport */ connectTo),
  "hb": () => (/* reexport */ createAdapterClient),
  "Sp": () => (/* reexport */ createAdapterConnection),
  "B8": () => (/* reexport */ createAdapterMessageClient),
  "oc": () => (/* reexport */ linkViaPort),
  "kg": () => (/* reexport */ postMessageLinkFor),
  "XP": () => (/* reexport */ startAdapterMessageServer)
});

// UNUSED EXPORTS: RemoteAdapterError, createAdapterProxy, wrapWithLogging

// EXTERNAL MODULE: ./scrivito_sdk/bridge/adapter_description.ts
var adapter_description = __webpack_require__(8128);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 45 modules
var common = __webpack_require__(3711);
// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 23 modules
var loadable = __webpack_require__(9246);
// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(9541);
;// CONCATENATED MODULE: ./scrivito_sdk/bridge/adapter_client.ts




function createAdapterClient(description, connection) {
  const adapterState = (0,state/* createStateContainer */.JH)();
  const adapterClient = {};
  Object.keys(description).forEach((methodName) => {
    const methodType = description[methodName];
    if (methodType === adapter_description/* GET */.HT) {
      adapterClient[methodName] = (...params) => {
        const methodNameAsGet = methodName;
        const state = adapterState.subState(methodNameAsGet).subState((0,common/* computeCacheKey */.mz)(params));
        const data = new loadable/* LoadableData */.of({
          state,
          stream: connection.stream(methodNameAsGet, ...params)
        });
        return data.get();
      };
    }
    if (methodType === adapter_description/* SEND */.H8) {
      adapterClient[methodName] = (...params) => connection.send(
        methodName,
        ...params
      );
    }
    if (methodType === adapter_description/* STREAM */.M) {
      adapterClient[methodName] = (...params) => {
        return connection.stream(
          methodName,
          ...params
        );
      };
    }
  });
  return adapterClient;
}

;// CONCATENATED MODULE: ./scrivito_sdk/bridge/adapter_proxy.ts



function createAdapterProxy(currentClient) {
  return {
    stream(methodName, ...params) {
      return loadAndObserve(() => {
        const client = currentClient();
        if (!client) {
          return;
        }
        const method = client[methodName];
        return { valueFromClient: method.call(client, ...params) };
      }).filter(isPresent).map((result) => result.valueFromClient);
    },
    send(methodName, ...params) {
      const promise = observe(currentClient).filter(isPresent).waitForFirst().then((client) => {
        const method = client[methodName];
        return method.call(client, ...params);
      });
      return promise;
    }
  };
}

;// CONCATENATED MODULE: ./scrivito_sdk/bridge/adapter_connection.ts



function createAdapterConnection(description, adapter) {
  return {
    stream(methodName, ...params) {
      const method = adapter[methodName];
      const methodType = description[methodName];
      if (methodType === adapter_description/* GET */.HT) {
        return (0,loadable/* loadAndObserve */.DU)(() => method.call(adapter, ...params));
      }
      if (methodType === adapter_description/* STREAM */.M) {
        const result = method.call(adapter, ...params);
        return result;
      }
      throw new common/* InternalError */.AQ();
    },
    send(methodName, ...params) {
      const method = adapter[methodName];
      const promise = new common/* ScrivitoPromise */.s8((resolve) => {
        (0,common/* nextTick */.Y3)(() => resolve(method.call(adapter, ...params)));
      });
      return promise;
    }
  };
}

;// CONCATENATED MODULE: ./scrivito_sdk/bridge/link_via_port.ts

function linkViaPort(messagePort) {
  return {
    incomingMessages: new common/* Streamable */.fU((subscriber) => {
      function listener(event) {
        subscriber.next({ data: event.data });
      }
      messagePort.addEventListener("message", listener);
      messagePort.start();
      return () => {
        messagePort.removeEventListener("message", listener);
      };
    }),
    sendMessage(message) {
      if (message.transfer === void 0) {
        messagePort.postMessage(message.data);
      } else {
        messagePort.postMessage(message.data, message.transfer);
      }
    }
  };
}

;// CONCATENATED MODULE: ./scrivito_sdk/bridge/post_message_link.ts

function postMessageLinkFor(theWindow) {
  return {
    incomingMessages: new common/* Streamable */.fU((subscriber) => {
      function listener(event) {
        if (event.source === null)
          return;
        subscriber.next({
          remoteOrigin: event.origin,
          remoteWindow: event.source,
          data: event.data,
          ports: event.ports
        });
      }
      theWindow.addEventListener("message", listener);
      return () => {
        theWindow.removeEventListener("message", listener);
      };
    }),
    sendMessage(message) {
      message.remoteWindow.postMessage(message.data, message.remoteOrigin, [
        ...message.ports || []
      ]);
    }
  };
}

// EXTERNAL MODULE: ./scrivito_sdk/bridge/messages.ts
var messages = __webpack_require__(9744);
;// CONCATENATED MODULE: ./scrivito_sdk/bridge/stream_demux.ts

class StreamDemux {
  constructor(muxedStream) {
    this.muxedStream = muxedStream;
    this.openStreams = {};
  }
  streamWithId(streamId) {
    return new common/* Streamable */.fU((subscriber) => {
      this.ensureSubscribed();
      const streamSubject = this.subjectForStreamId(streamId);
      const subscription = streamSubject.subscribe(subscriber);
      return () => {
        subscription.unsubscribe();
        this.removeSubjectIfAbandoned(streamId);
      };
    });
  }
  removeSubjectIfAbandoned(streamId) {
    const streamSubject = this.subjectForStreamId(streamId);
    if (streamSubject.subscriberCount() === 0) {
      delete this.openStreams[streamId];
      this.unsubscribeIfAbandoned();
    }
  }
  subjectForStreamId(streamId) {
    const existingStream = this.openStreams[streamId];
    if (existingStream) {
      return existingStream;
    }
    const newStream = new common/* Subject */.xQ();
    this.openStreams[streamId] = newStream;
    return newStream;
  }
  ensureSubscribed() {
    if (this.subscription)
      return;
    this.subscription = this.muxedStream.subscribe({
      next: (message) => {
        const streamId = message.streamId;
        const streamSubject = this.openStreams[streamId];
        if (streamSubject)
          streamSubject.next(message.data);
      },
      complete: () => Object.keys(this.openStreams).forEach((id) => {
        const streamSubject = this.openStreams[id];
        if (streamSubject) {
          streamSubject.complete();
          delete this.openStreams[id];
        }
      })
    });
  }
  unsubscribeIfAbandoned() {
    if (Object.keys(this.openStreams).length === 0 && this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = void 0;
    }
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/bridge/adapter_message_client.ts



function createAdapterMessageClient(portLink) {
  return new AdapterMessageClient(portLink);
}
class AdapterMessageClient {
  constructor(portLink) {
    this.portLink = portLink;
    this.channelCounter = 1;
    this.incomingChannels = new StreamDemux(
      this.portLink.incomingMessages.map((message) => message.data).filter(messages/* isAdapterMessage */.vI).map((message) => ({
        streamId: message.channel,
        data: message
      }))
    );
  }
  stream(methodName, ...params) {
    return new common/* Streamable */.fU((subscriber) => {
      const channel = this.getNextChannelId();
      this.postMessage({
        channel,
        verb: "OPEN",
        method: methodName,
        params
      });
      let processedSequence;
      const subscription = this.incomingChannels.streamWithId(channel).subscribe((message) => {
        if ((0,messages/* isResponseMessage */.Rd)(message)) {
          if (processedSequence !== void 0 && message.sequence <= processedSequence) {
            return;
          }
          subscriber.next(message.data);
          processedSequence = message.sequence;
        }
      });
      return () => {
        this.postMessage({
          channel,
          verb: "CLOSE"
        });
        subscription.unsubscribe();
      };
    });
  }
  send(methodName, ...params) {
    const channel = this.getNextChannelId();
    this.postMessage({
      channel,
      verb: "SEND",
      method: methodName,
      params
    });
    const resultPromise = this.incomingChannels.streamWithId(channel).filter(isSendReply).waitForFirst().then((message) => {
      if ((0,messages/* isErrorMessage */.Go)(message)) {
        throw new RemoteAdapterError(message.errorMessage);
      }
      return message.data;
    });
    return resultPromise;
  }
  postMessage(message) {
    this.portLink.sendMessage({
      data: message,
      transfer: portsToTransfer(message)
    });
  }
  getNextChannelId() {
    return this.channelCounter++;
  }
}
class RemoteAdapterError extends common/* ScrivitoError */.Ix {
}
function portsToTransfer(message) {
  if (message.verb === "SEND") {
    return message.params.filter(isMessagePort);
  }
}
function isMessagePort(maybePort) {
  return maybePort instanceof MessagePort;
}
function isSendReply(message) {
  return (0,messages/* isResponseMessage */.Rd)(message) || (0,messages/* isErrorMessage */.Go)(message);
}

;// CONCATENATED MODULE: ./scrivito_sdk/bridge/adapter_invocation.ts
function isMatchingAdapterInvocation(description, expectedMethodDescription, invocation) {
  const actualMethodDescription = description[invocation.methodName];
  return actualMethodDescription === expectedMethodDescription;
}

;// CONCATENATED MODULE: ./scrivito_sdk/bridge/adapter_message_server.ts





function startAdapterMessageServer(portLink, adapterConnection, description, errorHandler) {
  const server = new AdapterMessageServer(
    portLink,
    adapterConnection,
    description,
    errorHandler
  );
  server.start();
}
class AdapterMessageServer {
  constructor(portLink, adapterConnection, description, errorHandler) {
    this.portLink = portLink;
    this.adapterConnection = adapterConnection;
    this.description = description;
    this.errorHandler = errorHandler;
    this.incomingMessages = portLink.incomingMessages.map((message) => message.data).filter(messages/* isAdapterMessage */.vI);
    this.incomingChannels = new StreamDemux(
      this.incomingMessages.map((message) => ({
        streamId: message.channel,
        data: message
      }))
    );
  }
  start() {
    this.incomingMessages.subscribe((message) => {
      if ((0,messages/* isOpenStreamMessage */.PK)(message)) {
        this.handleOpenStreamMessage(message);
      } else if ((0,messages/* isSendMessage */.Yn)(message)) {
        this.handleSendMessage(message);
      }
    });
  }
  handleOpenStreamMessage(message) {
    const invocation = invocationFrom(message);
    const adapterStream = this.adapterStreamForInvocation(invocation);
    if (!adapterStream)
      return;
    const channel = message.channel;
    let sequence = 1;
    const subscription = adapterStream.subscribe((data) => {
      this.postMessage({
        verb: "RESPOND",
        data,
        channel,
        sequence
      });
      sequence++;
    });
    this.incomingChannels.streamWithId(channel).filter(messages/* isCloseStreamMessage */.sW).waitForFirst().then(() => subscription.unsubscribe()).catch((error) => {
      subscription.unsubscribe();
      if (error instanceof common/* EndOfStreamError */.dL) {
        return;
      }
      throw error;
    });
  }
  adapterStreamForInvocation(invocation) {
    if (isMatchingAdapterInvocation(this.description, adapter_description/* GET */.HT, invocation)) {
      return this.adapterConnection.stream(
        invocation.methodName,
        ...invocation.params
      );
    }
    if (isMatchingAdapterInvocation(this.description, adapter_description/* STREAM */.M, invocation)) {
      return this.adapterConnection.stream(
        invocation.methodName,
        ...invocation.params
      );
    }
  }
  handleSendMessage(message) {
    const invocation = invocationFrom(message);
    if (!isMatchingAdapterInvocation(this.description, adapter_description/* SEND */.H8, invocation)) {
      return;
    }
    this.adapterConnection.send(invocation.methodName, ...invocation.params).then(
      (data) => this.postMessage({
        verb: "RESPOND",
        data,
        channel: message.channel,
        sequence: 1
      }),
      (error) => {
        const errorMessage = this.errorHandler(error);
        this.postMessage({
          verb: "ERROR",
          errorMessage,
          channel: message.channel
        });
      }
    );
  }
  postMessage(message) {
    this.portLink.sendMessage({ data: message });
  }
}
function invocationFrom(message) {
  return {
    methodName: message.method,
    params: message.params
  };
}

;// CONCATENATED MODULE: ./scrivito_sdk/bridge/anticipated_message_link.ts

function anticipatedMessageLink(linkPromise) {
  return {
    incomingMessages: (0,common/* anticipatedStream */.h0)(
      linkPromise.then((link) => link.incomingMessages)
    ),
    sendMessage: (message) => linkPromise.then((link) => link.sendMessage(message))
  };
}

;// CONCATENATED MODULE: ./scrivito_sdk/bridge/connect_client.ts
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};

function connectTo(uiWindow, eventLink, clientDescription) {
  const requestId = (0,common/* randomId */.kb)();
  eventLink.sendMessage({
    remoteWindow: uiWindow,
    remoteOrigin: "*",
    data: generateConnectRequestMessage(requestId, clientDescription)
  });
  return eventLink.incomingMessages.filter((event) => event.remoteWindow === uiWindow).map((event) => {
    const data = event.data;
    if (isConnectResponseMessage(data) && data.requestId === requestId && event.ports && event.ports.length > 0) {
      return {
        port: event.ports[0],
        origin: event.remoteOrigin
      };
    }
  }).filter(common/* isPresent */.EN).waitForFirst();
}
function generateConnectRequestMessage(requestId, clientDescription) {
  return __spreadValues({
    type: "ScrivitoConnectRequest",
    requestId
  }, clientDescription);
}
function isConnectResponseMessage(data) {
  return !!data && data.type === "ScrivitoConnectResponse";
}

;// CONCATENATED MODULE: ./scrivito_sdk/bridge/wrap_with_logging.ts

function wrapWithLogging(connection) {
  let logger;
  return {
    setLogger(newLogger) {
      logger = newLogger;
    },
    connection: {
      stream(methodName, ...params) {
        return new Streamable((subscriber) => {
          if (logger)
            logger("GET", methodName, ...params);
          return connection.stream(methodName, ...params).map((value) => {
            if (logger) {
              logger("GET", methodName, ...params, "RECEIVE", value);
            }
            return value;
          }).subscribe(subscriber);
        });
      },
      send(methodName, ...params) {
        if (logger)
          logger("SEND", methodName, ...params);
        return connection.send(methodName, ...params).then((response) => {
          if (logger) {
            logger("SEND", methodName, ...params, "RECEIVE", response);
          }
          return response;
        });
      }
    }
  };
}

;// CONCATENATED MODULE: ./scrivito_sdk/bridge/index.ts













/***/ }),

/***/ 9744:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Go": () => (/* binding */ isErrorMessage),
/* harmony export */   "PK": () => (/* binding */ isOpenStreamMessage),
/* harmony export */   "Rd": () => (/* binding */ isResponseMessage),
/* harmony export */   "Yn": () => (/* binding */ isSendMessage),
/* harmony export */   "sW": () => (/* binding */ isCloseStreamMessage),
/* harmony export */   "vI": () => (/* binding */ isAdapterMessage)
/* harmony export */ });
function isAdapterMessage(data) {
  return !!data && typeof data.channel === "number" && typeof data.verb === "string";
}
function isInvocationMessage(message) {
  return typeof message.method === "string" && Array.isArray(message.params);
}
function isSendMessage(message) {
  return message.verb === "SEND" && isInvocationMessage(message);
}
function isOpenStreamMessage(message) {
  return message.verb === "OPEN" && isInvocationMessage(message);
}
function isCloseStreamMessage(message) {
  return message.verb === "CLOSE";
}
function isResponseMessage(message) {
  return message.verb === "RESPOND" && typeof message.sequence === "number";
}
function isErrorMessage(message) {
  return message.verb === "ERROR";
}


/***/ }),

/***/ 5098:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ClientError": () => (/* reexport */ ClientError),
  "JrRestApi": () => (/* reexport */ JrRestApi),
  "PUBLISHED_SPACE": () => (/* reexport */ PUBLISHED_SPACE),
  "PublicAuthentication": () => (/* reexport */ PublicAuthentication),
  "RequestFailedError": () => (/* reexport */ RequestFailedError),
  "USER_IS_LOGGED_IN_PARAM_NAME": () => (/* reexport */ USER_IS_LOGGED_IN_PARAM_NAME),
  "VisitorAuthenticationProvider": () => (/* reexport */ VisitorAuthenticationProvider),
  "cmsRestApi": () => (/* reexport */ cmsRestApi),
  "cmsRetrieval": () => (/* reexport */ cmsRetrieval),
  "getJrRestApiUrl": () => (/* reexport */ getJrRestApiUrl),
  "getWithoutLoginRedirect": () => (/* reexport */ getWithoutLoginRedirect),
  "getWorkspaceChanges": () => (/* reexport */ getWorkspaceChanges),
  "getWorkspaceId": () => (/* reexport */ getWorkspaceId),
  "isEmptySpaceId": () => (/* reexport */ isEmptySpaceId),
  "isExistentObjJson": () => (/* reexport */ isExistentObjJson),
  "isFetchingActive": () => (/* reexport */ isFetchingActive),
  "isUnavailableObjJson": () => (/* reexport */ isUnavailableObjJson),
  "isWidgetAttributeJson": () => (/* reexport */ isWidgetAttributeJson),
  "isWidgetlistAttributeJson": () => (/* reexport */ isWidgetlistAttributeJson),
  "isWorkspaceObjSpaceId": () => (/* reexport */ isWorkspaceObjSpaceId),
  "replaceCmsRetrieval": () => (/* reexport */ replaceCmsRetrieval),
  "requestApiIdempotent": () => (/* reexport */ requestApiIdempotent),
  "requestApiNonIdempotent": () => (/* reexport */ requestApiNonIdempotent),
  "retrieveObj": () => (/* reexport */ retrieveObj),
  "setJrRestApiEndpoint": () => (/* reexport */ setJrRestApiEndpoint),
  "setJrRestApiTokenProvider": () => (/* reexport */ setJrRestApiTokenProvider),
  "setupRegisterVerificator": () => (/* reexport */ setupRegisterVerificator),
  "useXmlHttpRequest": () => (/* reexport */ useXmlHttpRequest),
  "withEachAttributeJson": () => (/* reexport */ withEachAttributeJson)
});

// UNUSED EXPORTS: MissingWorkspaceError, isComparisonRange, isObjSpaceId, requestBuiltInUserSession, retrieveObjFieldDiffs, useDefaultPriority

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 45 modules
var common = __webpack_require__(3711);
;// CONCATENATED MODULE: ./scrivito_sdk/client/client_error.ts

class ClientError extends common/* ScrivitoError */.Ix {
  constructor(message, code, details) {
    super(message);
    this.message = message;
    this.code = code;
    this.details = details;
  }
}

// EXTERNAL MODULE: external "underscore"
var external_underscore_ = __webpack_require__(4952);
;// CONCATENATED MODULE: ./scrivito_sdk/client/get_client_version.ts

function getClientVersion() {
  const clientVersion = "jssdk/1.29.0.dev-1-g6a1f9b52ff37";
  if (!clientVersion)
    throw new common/* InternalError */.AQ();
  return clientVersion;
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/fetch.ts




let connectionCounter = 0;
function isFetchingActive() {
  return connectionCounter > 0;
}
let xmlHttpRequest;
function useXmlHttpRequest(xhr) {
  xmlHttpRequest = xhr;
}
let fallbackPriority;
function useDefaultPriority(priority) {
  fallbackPriority = priority;
}
function fetch_fetch(method, url, { params, authorization, priority, forceVerification }) {
  if (xmlHttpRequest === void 0) {
    return common/* ScrivitoPromise.resolve */.s8.resolve({
      status: 432,
      responseText: JSON.stringify({
        error: "Forbidden",
        code: "auth_missing",
        details: { visit: "example.com" }
      })
    });
  }
  connectionCounter += 1;
  return new common/* ScrivitoPromise */.s8(
    (resolve, reject) => {
      const request = createRequestObj(method, url, resolve, reject);
      if (authorization) {
        request.setRequestHeader("Authorization", authorization);
      }
      request.setRequestHeader("Scrivito-Client", getClientVersion());
      if (forceVerification) {
        request.setRequestHeader("Scrivito-Force-Verification", "true");
      }
      const priorityWithFallback = priority || fallbackPriority;
      if (priorityWithFallback === "background") {
        request.setRequestHeader("Scrivito-Priority", priorityWithFallback);
      }
      request.setRequestHeader(
        "Content-type",
        "application/json; charset=utf-8"
      );
      request.send(JSON.stringify(params));
    }
  );
}
function createRequestObj(method, url, resolve, reject) {
  const request = new xmlHttpRequest();
  request.open(method === "POST" ? "POST" : "PUT", url);
  request.timeout = 15e3;
  request.withCredentials = true;
  request.onload = () => onAjaxLoad(request, resolve, reject);
  function handleError(message) {
    onAjaxError(new RequestFailedError(message), reject);
  }
  request.onerror = () => handleError("XMLHttpRequest Error");
  request.ontimeout = () => handleError("XMLHttpRequest Timeout");
  request.onabort = () => handleError("XMLHttpRequest Aborted");
  return request;
}
function onAjaxLoad(request, resolve, reject) {
  connectionCounter -= 1;
  const status = request.status;
  if (!status || !(0,external_underscore_.isNumber)(status)) {
    const message = `Unexpected response status: ${status}; body: ${status === 0 ? request.statusText : request.responseText}`;
    reject(new RequestFailedError(message));
  }
  resolve(request);
}
function onAjaxError(error, reject) {
  connectionCounter -= 1;
  reject(error);
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/fetch_to_raw_response.ts
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

function fetchToRawResponse(resource, options) {
  return __async(this, null, function* () {
    let response;
    const abortController = new AbortController();
    const timer = setTimeout(() => abortController.abort(), 15e3);
    const fetchOptions = options || {};
    fetchOptions.signal = abortController.signal;
    try {
      response = yield fetch(resource, fetchOptions);
      clearTimeout(timer);
    } catch (error) {
      throw new RequestFailedError(error instanceof Error ? error.message : "");
    }
    const httpStatus = response.status;
    const responseText = yield response.text();
    const retryAfterHeader = httpStatus === 429 && response.headers.get("Retry-After") || void 0;
    return { httpStatus, responseText, retryAfterHeader };
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/jr_rest_api.ts
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var jr_rest_api_async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};



let tokenProvider;
function setJrRestApiTokenProvider(provider) {
  tokenProvider = provider;
}
function getJrRestApiTokenProvider() {
  return tokenProvider;
}
function isJrRestApiConfiguredForUi() {
  return !!tokenProvider;
}
let endpointDeferred = new common/* Deferred */.BH();
function getJrRestApiEndpoint() {
  return endpointDeferred.promise;
}
function setJrRestApiEndpoint(endpoint) {
  endpointDeferred.resolve(endpoint);
}
function getJrRestApiUrl(path) {
  return jr_rest_api_async(this, null, function* () {
    return `${yield getJrRestApiEndpoint()}/${path}`;
  });
}
function resetJrRestApi() {
  tokenProvider = void 0;
  endpointDeferred = new Deferred();
}
const JrRestApi = {
  delete: _delete,
  fetch: jr_rest_api_fetch,
  get,
  patch,
  post,
  put
};
function jr_rest_api_fetch(path, _a = {}) {
  var _b = _a, { method } = _b, otherOptions = __objRest(_b, ["method"]);
  const apiMethod = method || "get";
  return JrRestApi[apiMethod.toLowerCase()](
    path,
    otherOptions
  );
}
function get(path, options) {
  return jr_rest_api_async(this, null, function* () {
    const url = yield calculateRequestUrl(path, options == null ? void 0 : options.params);
    const fetchOptions = yield calculateOptions();
    return requestApiIdempotent(
      () => fetchToRawResponse(url, __spreadValues({ method: "GET" }, fetchOptions))
    );
  });
}
function getWithoutLoginRedirect(path, options) {
  return jr_rest_api_async(this, null, function* () {
    const url = yield calculateRequestUrl(path, options == null ? void 0 : options.params);
    const fetchOptions = yield calculateOptions();
    return requestApiIdempotent(
      () => fetchToRawResponse(url, __spreadValues({ method: "GET" }, fetchOptions)),
      false
    );
  });
}
function post(path, options) {
  return jr_rest_api_async(this, null, function* () {
    const url = yield calculateRequestUrl(path, options == null ? void 0 : options.params);
    const fetchOptions = yield calculateOptionsWithData(options == null ? void 0 : options.data);
    return requestApiNonIdempotent(
      () => fetchToRawResponse(url, __spreadValues({ method: "POST" }, fetchOptions))
    );
  });
}
function put(path, options) {
  return jr_rest_api_async(this, null, function* () {
    return requestIdempotentWithData("PUT", path, options);
  });
}
function patch(path, options) {
  return jr_rest_api_async(this, null, function* () {
    return requestIdempotentWithData("PATCH", path, options);
  });
}
function _delete(path, options) {
  return jr_rest_api_async(this, null, function* () {
    return requestIdempotentWithData("DELETE", path, options);
  });
}
function requestIdempotentWithData(method, path, options) {
  return jr_rest_api_async(this, null, function* () {
    const url = yield calculateRequestUrl(path, options == null ? void 0 : options.params);
    const fetchOptions = yield calculateOptionsWithData(options == null ? void 0 : options.data);
    return requestApiIdempotent(
      () => fetchToRawResponse(url, __spreadValues({ method }, fetchOptions))
    );
  });
}
function calculateRequestUrl(path, params) {
  return jr_rest_api_async(this, null, function* () {
    const apiUrl = new URL(yield getJrRestApiUrl(path));
    if (params) {
      for (const [name, value] of Object.entries(params)) {
        apiUrl.searchParams.append(name, value);
      }
    }
    return apiUrl.toString();
  });
}
function calculateOptions() {
  return jr_rest_api_async(this, arguments, function* (headers = {}) {
    if (tokenProvider) {
      const token = yield tokenProvider();
      if (token !== void 0) {
        headers.Authorization = `Bearer ${token}`;
      }
    }
    const options = { credentials: "include", headers };
    return options;
  });
}
function calculateOptionsWithData(data) {
  return jr_rest_api_async(this, null, function* () {
    const options = yield calculateOptions({
      "Content-Type": "application/json; charset=utf-8"
    });
    return data ? __spreadValues({ body: JSON.stringify(data) }, options) : options;
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/cms_rest_api/parse_or_throw_request_failed_error.ts

function parseOrThrowRequestFailedError(jsonText) {
  try {
    return JSON.parse(jsonText);
  } catch (_error) {
    throw new RequestFailedError(jsonText);
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/is_error_response.ts

function isErrorResponse(parsedResponse) {
  if (!(0,external_underscore_.isObject)(parsedResponse))
    return false;
  const errorType = typeof parsedResponse.error;
  const codeType = typeof parsedResponse.code;
  const details = parsedResponse.details;
  return errorType === "string" && (codeType === "string" || codeType === "undefined") && ((0,external_underscore_.isObject)(details) || typeof details === "undefined");
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/parse_error_response.ts



function parseErrorResponse(responseText) {
  const parsedResponse = parseOrThrowRequestFailedError(responseText);
  if (isErrorResponse(parsedResponse)) {
    const { error, code, details } = parsedResponse;
    return {
      message: error,
      code: code || "",
      details: details || {}
    };
  }
  throw new RequestFailedError();
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/parse_response.ts
var parse_response_async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};






class AccessDeniedError extends ClientError {
}
function parseResponse(_0) {
  return parse_response_async(this, arguments, function* ({ httpStatus, responseText }) {
    if (httpStatus >= 200 && httpStatus < 300) {
      return parseOrThrowRequestFailedError(responseText);
    }
    if (httpStatus >= 400 && httpStatus < 500) {
      const {
        message: originalMessage,
        code,
        details
      } = parseErrorResponse(responseText);
      const message2 = (0,common/* uniqueErrorMessage */.th)(originalMessage);
      if (httpStatus === 403)
        throw new AccessDeniedError(message2, code, details);
      throw new ClientError(message2, code, details);
    }
    const parsedResponse = parseOrThrowRequestFailedError(responseText);
    const message = httpStatus === 500 && isErrorResponse(parsedResponse) ? parsedResponse.error : responseText;
    throw new RequestFailedError((0,common/* uniqueErrorMessage */.th)(message));
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/retry.ts
var retry_async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};


function requestWithRateLimitRetry(request, retryCount = 0) {
  return retry_async(this, null, function* () {
    if (retriesAreDisabled)
      return request();
    const response = yield request();
    if (response.httpStatus === 429) {
      if (limitedRetries && retryCount > 19)
        throw new Error();
      const retryAfterHeader = Number(response.retryAfterHeader) || 0;
      yield (0,common/* waitMs */.OH)(Math.max(retryAfterHeader * 1e3, calculateDelay(retryCount)));
      return requestWithRateLimitRetry(request, retryCount + 1);
    }
    return response;
  });
}
function retryOnRequestFailed(request, retryCount = 0) {
  return retry_async(this, null, function* () {
    if (retriesAreDisabled)
      return request();
    try {
      return yield request();
    } catch (error) {
      if (!(error instanceof RequestFailedError))
        throw error;
      if (limitedRetries && retryCount > 5)
        throw error;
      yield (0,common/* waitMs */.OH)(calculateDelay(retryCount));
      return retryOnRequestFailed(request, retryCount + 1);
    }
  });
}
let limitedRetries;
let retriesAreDisabled;
function disableRetries() {
  retriesAreDisabled = true;
}
function limitRetries() {
  retriesAreDisabled = void 0;
  limitedRetries = true;
}
function calculateDelay(retryCount) {
  return Math.pow(2, Math.min(retryCount, 16)) * 500;
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/request_api.ts
var request_api_async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};







const USER_IS_LOGGED_IN_PARAM_NAME = "__scrivitoUserIsLoggedIn";
const JR_API_LOCATION_PLACEHOLDER = "$JR_API_LOCATION";
function requestApiIdempotent(request, withLoginRedirect = true) {
  return retryOnRequestFailed(
    () => requestApiNonIdempotent(request, withLoginRedirect)
  );
}
function requestApiNonIdempotent(request, withLoginRedirect = true) {
  return request_api_async(this, null, function* () {
    return parseResponse(
      yield requestAndHandleMissingAuth(
        () => requestWithRateLimitRetry(request),
        withLoginRedirect
      )
    );
  });
}
function requestAndHandleMissingAuth(request, withLoginRedirect) {
  return request_api_async(this, null, function* () {
    const response = yield request();
    const { httpStatus } = response;
    if (httpStatus >= 400 && httpStatus < 500) {
      const { code, details } = parseErrorResponse(response.responseText);
      if (code === "auth_missing") {
        if (!isAuthMissingDetails(details))
          throw new RequestFailedError();
        if (isJrRestApiConfiguredForUi() || !withLoginRedirect) {
          throw new ClientError("Unauthorized", code, details);
        } else {
          (0,common/* redirectTo */.gB)(yield authenticationUrlFor(details.visit));
          return (0,common/* never */.Fi)();
        }
      }
    }
    return response;
  });
}
function authenticationUrlFor(visit) {
  return request_api_async(this, null, function* () {
    const authUrl = visit.replace(
      "$RETURN_TO",
      encodeURIComponent(returnToUrl())
    );
    if (authUrl.includes(JR_API_LOCATION_PLACEHOLDER)) {
      return authUrl.replace(
        JR_API_LOCATION_PLACEHOLDER,
        yield getJrRestApiEndpoint()
      );
    }
    return authUrl;
  });
}
function returnToUrl() {
  const url = new URL((0,common/* currentHref */.RO)());
  url.searchParams.set(USER_IS_LOGGED_IN_PARAM_NAME, "");
  return url.toString();
}
function isAuthMissingDetails(details) {
  return typeof details.visit === "string";
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/cms_rest_api.ts
var cms_rest_api_async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};





class MissingWorkspaceError extends common/* ScrivitoError */.Ix {
}
let requestsAreDisabled;
class CmsRestApi {
  constructor() {
    this.initDeferred = new common/* Deferred */.BH();
  }
  init({
    apiBaseUrl,
    authProvider
  }) {
    this.url = `${apiBaseUrl}/perform`;
    this.authHeaderValueProvider = authProvider;
    this.initDeferred.resolve();
  }
  rejectRequests() {
    requestsAreDisabled = true;
  }
  setPriority(priority) {
    this.priority = priority;
  }
  get(path, requestParams) {
    return cms_rest_api_async(this, null, function* () {
      return this.requestWithTaskHandling({ method: "GET", path, requestParams });
    });
  }
  put(path, requestParams) {
    return cms_rest_api_async(this, null, function* () {
      return this.requestWithTaskHandling({ method: "PUT", path, requestParams });
    });
  }
  post(path, requestParams) {
    return cms_rest_api_async(this, null, function* () {
      return this.requestWithTaskHandling({
        method: "POST",
        path,
        requestParams
      });
    });
  }
  delete(path, requestParams) {
    return cms_rest_api_async(this, null, function* () {
      return this.requestWithTaskHandling({
        method: "DELETE",
        path,
        requestParams
      });
    });
  }
  requestBuiltInUserSession(sessionId, requestParams) {
    return cms_rest_api_async(this, null, function* () {
      const response = yield this.request({
        method: "PUT",
        path: `sessions/${sessionId}`,
        requestParams,
        providedAuthorization: null
      });
      return response;
    });
  }
  requestVisitorSession(sessionId, token) {
    return cms_rest_api_async(this, null, function* () {
      return this.request({
        method: "PUT",
        path: `sessions/${sessionId}`,
        requestParams: void 0,
        providedAuthorization: `id_token ${token}`
      });
    });
  }
  enableForceVerification() {
    this.forceVerification = true;
  }
  currentPublicAuthorizationState() {
    if (this.authHeaderValueProvider) {
      if (this.authHeaderValueProvider.currentState) {
        return `[API] ${this.authHeaderValueProvider.currentState()}`;
      }
      return "[API]: authorization provider without currentState()";
    }
    return "[API]: no authorization provider";
  }
  ensureEnabledAndInitialized() {
    return cms_rest_api_async(this, null, function* () {
      if (requestsAreDisabled) {
        throw new common/* InternalError */.AQ("Unexpected CMS backend access.");
      }
      return this.initDeferred.promise;
    });
  }
  requestWithTaskHandling(_0) {
    return cms_rest_api_async(this, arguments, function* ({
      method,
      path,
      requestParams
    }) {
      const result = yield this.request({ method, path, requestParams });
      return isTaskResponse(result) ? this.handleTask(result.task) : result;
    });
  }
  request(_0) {
    return cms_rest_api_async(this, arguments, function* ({
      method,
      path,
      requestParams,
      providedAuthorization
    }) {
      yield this.ensureEnabledAndInitialized();
      const doRequest = () => this.requestWithAuthorization(
        providedAuthorization,
        (authorization) => this.requestAndConvertToRawResponse({
          method,
          path,
          requestParams,
          authorization
        })
      );
      try {
        return yield method === "POST" ? requestApiNonIdempotent(doRequest) : requestApiIdempotent(doRequest);
      } catch (error) {
        throw error instanceof ClientError && error.code === "precondition_not_met.workspace_not_found" ? new MissingWorkspaceError() : error;
      }
    });
  }
  handleTask(task) {
    return cms_rest_api_async(this, null, function* () {
      switch (task.status) {
        case "success":
          return task.result;
        case "error":
          throw new ClientError(task.message, task.code, {});
        case "exception":
          throw new RequestFailedError(task.message);
        case "open": {
          yield (0,common/* wait */.Dc)(2);
          const result = yield this.get(`tasks/${task.id}`);
          return this.handleTask(result);
        }
        default:
          throw new RequestFailedError("Invalid task response (unknown status)");
      }
    });
  }
  requestWithAuthorization(providedAuthorization, request) {
    return cms_rest_api_async(this, null, function* () {
      if (providedAuthorization)
        return request(providedAuthorization);
      if (providedAuthorization === null)
        return request();
      return this.getAuthHeaderValueProvider().authorize(request);
    });
  }
  requestAndConvertToRawResponse(_0) {
    return cms_rest_api_async(this, arguments, function* ({
      method,
      path,
      requestParams,
      authorization
    }) {
      const options = {
        authorization,
        forceVerification: this.forceVerification,
        params: {
          path,
          verb: method,
          params: requestParams || {}
        }
      };
      if (this.priority)
        options.priority = this.priority;
      const fetchResponse = yield fetch_fetch(method, this.url, options);
      const { responseText, status: httpStatus } = fetchResponse;
      const retryAfterHeader = httpStatus === 429 && fetchResponse.getResponseHeader("Retry-After") || void 0;
      return { httpStatus, responseText, retryAfterHeader };
    });
  }
  getAuthHeaderValueProvider() {
    if (!this.authHeaderValueProvider)
      throw new common/* InternalError */.AQ();
    return this.authHeaderValueProvider;
  }
}
function isTaskResponse(result) {
  return !!result && !!result.task && Object.keys(result).length === 1;
}
let cmsRestApi = new CmsRestApi();
function resetCmsRestApi() {
  cmsRestApi = new CmsRestApi();
  requestsAreDisabled = void 0;
}
function requestBuiltInUserSession(sessionId, requestParams) {
  return cms_rest_api_async(this, null, function* () {
    return cmsRestApi.requestBuiltInUserSession(sessionId, requestParams);
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/request_failed_error.ts

class RequestFailedError extends common/* ScrivitoError */.Ix {
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/obj_json.ts
function buildNonexistentObjJson(id) {
  return { _deleted: id, _version: "" };
}
function isExistentObjJson(data) {
  return !data._deleted;
}
function isUnavailableObjJson(data) {
  return !!data._deleted;
}
function isWidgetAttributeJson(attributeJson) {
  return attributeJson[0] === "widget";
}
function isWidgetlistAttributeJson(attributeJson) {
  return attributeJson[0] === "widgetlist";
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/obj_space_id.ts

const PUBLISHED_SPACE = ["workspace", "published"];
function getWorkspaceId(spaceId) {
  if (!isWorkspaceObjSpaceId(spaceId))
    throw new common/* InternalError */.AQ();
  return spaceId[1];
}
function isEmptySpaceId(spaceId) {
  return spaceId[0] === "empty";
}
function isWorkspaceObjSpaceId(spaceId) {
  return spaceId[0] === "workspace";
}
function obj_space_id_isObjSpaceId(maybeObjSpaceId) {
  if (!Array.isArray(maybeObjSpaceId))
    return false;
  if (maybeObjSpaceId.length === 2) {
    const [t, id] = maybeObjSpaceId;
    return (t === "revision" || t === "workspace") && typeof id === "string";
  }
  return maybeObjSpaceId.length === 1 && maybeObjSpaceId[0] === "empty";
}
function asBackendObjSpaceId(objSpaceId) {
  return objSpaceId.join(":");
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/obj_retrieval.ts
var obj_retrieval_async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};




let batchRetrievals = {};
function retrieveObj(objSpaceId, id, format) {
  return obj_retrieval_async(this, null, function* () {
    if (isEmptySpaceId(objSpaceId))
      return buildNonexistentObjJson(id);
    try {
      return yield getBatchRetrieval(objSpaceId).retrieve([id, format]);
    } catch (error) {
      if (error instanceof MissingWorkspaceError) {
        return buildNonexistentObjJson(id);
      }
      throw error;
    }
  });
}
function getBatchRetrieval(objSpaceId) {
  const cacheKey = (0,common/* computeCacheKey */.mz)(objSpaceId);
  let batchRetrieval = batchRetrievals[cacheKey];
  if (!batchRetrieval) {
    batchRetrieval = buildBatchRetrieval(objSpaceId);
    batchRetrievals[cacheKey] = batchRetrieval;
  }
  return batchRetrieval;
}
function buildBatchRetrieval(objSpaceId) {
  const [spaceType, spaceId] = objSpaceId;
  const endpoint = `${spaceType}s/${spaceId}/objs/mget`;
  const includeDeleted = spaceType === "workspace" || void 0;
  return new common/* BatchRetrieval */.gh(
    (keys) => obj_retrieval_async(this, null, function* () {
      const response = yield cmsRestApi.get(endpoint, {
        ids: keys.map(([id, format]) => format === "full" ? id : [id]),
        include_deleted: includeDeleted
      });
      return response.results.map(
        (result, index) => result || buildNonexistentObjJson(keys[index][0])
      );
    }),
    { batchSize: 17 }
  );
}
function obj_retrieval_reset() {
  batchRetrievals = {};
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/binary_metadata_retrieval.ts


function retrieveBinaryMetadata(binaryId, options) {
  const requestParams = {};
  if (options == null ? void 0 : options.accessVia) {
    requestParams.access_via = asBackendObjSpaceId(options.accessVia);
  }
  return cmsRestApi.get(
    `blobs/${encodeURIComponent(binaryId || "")}/meta_data`,
    requestParams
  );
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/binary_urls_retrieval.ts



const batchRetrieval = new common/* BatchRetrieval */.gh(
  (blobs) => cmsRestApi.get("blobs/mget", { blobs }).then(
    ({ results }) => results.map((result) => result)
  )
);
function retrieveBinaryUrls(binaryId, transformation, options) {
  const blob = { id: binaryId };
  if (transformation) {
    blob.transformation = transformation;
  }
  if (options == null ? void 0 : options.accessVia) {
    blob.access_via = asBackendObjSpaceId(options.accessVia);
  }
  return batchRetrieval.retrieve(blob);
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/facet_query_retrieval.ts

function retrieveFacetQuery(workspaceId, params) {
  return cmsRestApi.get(`workspaces/${workspaceId}/objs/search`, params).then((response) => response).catch((error) => {
    if (error instanceof MissingWorkspaceError)
      return { facets: [[]] };
    throw error;
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/obj_field_diffs_retrieval.ts


function retrieveObjFieldDiffs(from, to, objId) {
  return cmsRestApi.get(`objs/${objId}/diff`, {
    from: asBackendObjSpaceId(from),
    to: asBackendObjSpaceId(to)
  }).then((response) => response).catch((error) => {
    if (error instanceof MissingWorkspaceError)
      return {};
    throw error;
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/obj_query_retrieval.ts

function retrieveObjQuery(workspaceId, params) {
  return cmsRestApi.get(`workspaces/${workspaceId}/objs/search`, params).then(({ results, total, continuation, objs }) => {
    return {
      results: results.map((result) => result.id),
      continuation,
      total,
      objs
    };
  }).catch((error) => {
    if (error instanceof MissingWorkspaceError) {
      return { results: [], total: 0 };
    }
    throw error;
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/suggest_retrieval.ts

function retrieveSuggest(workspaceId, params) {
  return cmsRestApi.put(`workspaces/${workspaceId}/objs/search/suggest`, params).then((response) => response).catch((error) => {
    if (error instanceof MissingWorkspaceError)
      return { results: [] };
    throw error;
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/cms_retrieval.ts






let cmsRetrieval = {
  retrieveObjQuery(workspaceId, params) {
    return retrieveObjQuery(workspaceId, params);
  },
  retrieveFacetQuery(workspaceId, params) {
    return retrieveFacetQuery(workspaceId, params);
  },
  retrieveSuggest(workspaceId, params) {
    return retrieveSuggest(workspaceId, params);
  },
  retrieveBinaryMetadata(binaryId, options) {
    return retrieveBinaryMetadata(binaryId, options);
  },
  retrieveBinaryUrls(binaryId, transformation, options) {
    return retrieveBinaryUrls(binaryId, transformation, options);
  },
  retrieveObjFieldDiffs(from, to, objId) {
    return retrieveObjFieldDiffs(from, to, objId);
  }
};
function replaceCmsRetrieval(newCmsRetrieval) {
  cmsRetrieval = newCmsRetrieval;
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/comparison_range.ts

function isComparisonRange(input) {
  if (!Array.isArray(input))
    return false;
  if (input.length !== 2)
    return false;
  return input.every(isObjSpaceId);
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/get_workspace_changes.ts

function getWorkspaceChanges(workspaceId, from) {
  return cmsRestApi.get(`workspaces/${workspaceId}/changes`, {
    from
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/verificator_functions.ts

let registry;
function verificator_functions_reset() {
  registry = {};
}
function verificator_functions_fetch(verificatorId, verificatorUrl) {
  let deferred = registry[verificatorId];
  if (!deferred) {
    deferred = new common/* Deferred */.BH();
    registry[verificatorId] = deferred;
    (0,common/* loadJs */.Vp)(verificatorUrl);
  }
  return deferred.promise;
}
verificator_functions_reset();
function setupRegisterVerificator() {
  window._scrivitoRegisterVerificator = (verificatorId, verificatorFunction) => registry[verificatorId].resolve(verificatorFunction);
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/public_authentication.ts
var public_authentication_async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};




const ERROR_CODE_CLIENT_VERIFICATION_REQUIRED = "client_verification_required";
let computation;
let verification;
const PublicAuthentication = {
  authorize(request) {
    return public_authentication_async(this, null, function* () {
      const response = yield request(currentAuthorization());
      if (response.httpStatus === 401) {
        const { details, code } = parseErrorResponse(response.responseText);
        if (code === ERROR_CODE_CLIENT_VERIFICATION_REQUIRED) {
          if (!isChallenge(details))
            throw new RequestFailedError();
          verification = yield computeVerification(details);
          return this.authorize(request);
        }
      }
      return response;
    });
  },
  currentState() {
    const authorization = currentAuthorization();
    if (authorization) {
      return `Authorization: ${authorization}`;
    }
    if (computation) {
      const challenge = computation.challenge;
      return `Pending computation: ${challenge.verificator.id} with ${challenge.data}`;
    }
    return null;
  }
};
function computeVerification(challenge) {
  return public_authentication_async(this, null, function* () {
    if (!computation) {
      const { verificator, data } = challenge;
      const promise = verificator_functions_fetch(
        verificator.id,
        verificator.url
      ).then(
        (compute) => new common/* ScrivitoPromise */.s8((resolve) => {
          compute(data, (result) => resolve(result));
        })
      );
      computation = {
        challenge: { verificator, data },
        promise: (0,common/* promiseAndFinally */.sH)(promise, () => {
          computation = void 0;
        })
      };
    }
    return computation.promise;
  });
}
function resetPublicAuthentication() {
  computation = void 0;
  verification = void 0;
}
function isChallenge(maybeChallenge) {
  return !!maybeChallenge.verificator;
}
function currentAuthorization() {
  if (!verification)
    return;
  if (verification.expiresAfter < new Date()) {
    verification = void 0;
    return;
  }
  return verification.authorization;
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/visitor_authentication_provider.ts
var visitor_authentication_provider_async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};



class VisitorAuthenticationProvider {
  constructor() {
    this.sessionId = (0,common/* randomId */.kb)();
    this.idToken = new common/* Deferred */.BH();
    this.state = "waiting for token";
    this.sessionRequest = this.fetchSession();
  }
  setToken(token) {
    if (!this.idToken.isPending()) {
      this.idToken = new common/* Deferred */.BH();
      this.renewSession();
    }
    this.idToken.resolve(token);
    this.state = `active - token: ${token.substr(0, 3)}...`;
  }
  currentState() {
    return this.state;
  }
  authorize(request) {
    return visitor_authentication_provider_async(this, null, function* () {
      const sessionRequest = this.sessionRequest;
      let session;
      try {
        session = yield sessionRequest;
      } catch (_error) {
        return PublicAuthentication.authorize(request);
      }
      const response = yield request(`Session ${session.token}`);
      if (response.httpStatus === 401) {
        if (this.sessionRequest === sessionRequest)
          this.renewSession();
        return this.authorize(request);
      }
      return response;
    });
  }
  renewSession() {
    this.sessionRequest = this.fetchSession();
  }
  fetchSession() {
    return visitor_authentication_provider_async(this, null, function* () {
      try {
        const token = yield this.idToken.promise;
        return yield cmsRestApi.requestVisitorSession(this.sessionId, token);
      } catch (error) {
        (0,common/* throwNextTick */.a6)(
          new common/* ScrivitoError */.Ix(
            `Failed to establish visitor session: ${error.message}`
          )
        );
        throw error;
      }
    });
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/with_each_attribute_json.ts


function withEachAttributeJson(objJson, fn) {
  if (!isExistentObjJson(objJson))
    return;
  Object.keys(objJson).forEach((attrName) => {
    if (!(0,common/* isSystemAttribute */.mb)(attrName)) {
      const value = objJson[attrName];
      if (!value)
        return;
      fn(value, attrName);
      return;
    }
    if (attrName !== "_widget_pool")
      return;
    const widgetPoolJson = objJson._widget_pool;
    if (!widgetPoolJson)
      return;
    Object.keys(widgetPoolJson).forEach((widgetId) => {
      const widgetJson = widgetPoolJson[widgetId];
      if (!widgetJson)
        return;
      Object.keys(widgetJson).forEach((widgetAttrName) => {
        if ((0,common/* isSystemAttribute */.mb)(widgetAttrName))
          return;
        const value = widgetJson[widgetAttrName];
        if (!value)
          return;
        fn(value, widgetAttrName, widgetId);
      });
    });
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/index.ts




















/***/ }),

/***/ 3711:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ir": () => (/* reexport */ ArgumentError),
  "gh": () => (/* reexport */ BatchRetrieval),
  "Xe": () => (/* reexport */ BehaviorSubject),
  "R0": () => (/* reexport */ BlobType),
  "AY": () => (/* reexport */ ContextContainer),
  "Am": () => (/* reexport */ DEFAULT_ENDPOINT),
  "BH": () => (/* reexport */ Deferred),
  "nj": () => (/* reexport */ EmptyContinueIterable),
  "dL": () => (/* reexport */ EndOfStreamError),
  "Tv": () => (/* reexport */ FileType),
  "AQ": () => (/* reexport */ InternalError),
  "tT": () => (/* reexport */ NonNegativeInteger),
  "nH": () => (/* reexport */ PositiveInteger),
  "Ix": () => (/* reexport */ ScrivitoError),
  "s8": () => (/* reexport */ ScrivitoPromise),
  "fU": () => (/* reexport */ Streamable),
  "xQ": () => (/* reexport */ Subject),
  "W9": () => (/* reexport */ TransIterator),
  "h0": () => (/* reexport */ anticipatedStream),
  "$f": () => (/* reexport */ appUrlFromPackagedUiUrl),
  "eV": () => (/* reexport */ camelCase),
  "PJ": () => (/* reexport */ checkArgumentsFor),
  "xk": () => (/* reexport */ classify),
  "jB": () => (/* reexport */ clickPositionWithinElement),
  "Xq": () => (/* reexport */ collectAndSchedule),
  "W0": () => (/* reexport */ collectInListAndSchedule),
  "dJ": () => (/* reexport */ computeAncestorPaths),
  "mz": () => (/* reexport */ computeCacheKey),
  "RO": () => (/* reexport */ currentHref),
  "r2": () => (/* reexport */ deserializeAsDate),
  "ld": () => (/* reexport */ deserializeAsInteger),
  "KL": () => (/* reexport */ devicePixelRatio),
  "m0": () => (/* reexport */ docUrl),
  "fS": () => (/* reexport */ equals),
  "Fe": () => (/* reexport */ equalsBestEffort),
  "W": () => (/* reexport */ extractFromIterator),
  "Kw": () => (/* reexport */ extractTitleAndDescription),
  "xH": () => (/* reexport */ formatDateToString),
  "Me": () => (/* reexport */ getDocument),
  "ux": () => (/* reexport */ getScrivitoVersion),
  "aZ": () => (/* reexport */ getScrollHeight),
  "WS": () => (/* reexport */ window_proxy_innerHeight),
  "q2": () => (/* reexport */ isCamelCase),
  "O2": () => (/* reexport */ isEmptyValue),
  "JF": () => (/* reexport */ isLocalhostUrl),
  "EN": () => (/* reexport */ isPresent),
  "GI": () => (/* reexport */ isStringArray),
  "mb": () => (/* reexport */ isSystemAttribute),
  "ix": () => (/* reexport */ isValidDateString),
  "RY": () => (/* reexport */ isValidFloat),
  "eZ": () => (/* reexport */ isValidInteger),
  "Yc": () => (/* reexport */ loadCss),
  "Vp": () => (/* reexport */ loadJs),
  "H": () => (/* reexport */ logError),
  "Fi": () => (/* reexport */ never),
  "Y3": () => (/* reexport */ nextTick),
  "xw": () => (/* reexport */ openWindow),
  "bY": () => (/* reexport */ window_proxy_pageXOffset),
  "XO": () => (/* reexport */ window_proxy_pageYOffset),
  "sp": () => (/* reexport */ parseStringToDate),
  "xr": () => (/* reexport */ prettyPrint),
  "sH": () => (/* reexport */ promiseAndFinally),
  "o8": () => (/* reexport */ pruneString),
  "Q4": () => (/* reexport */ randomHex),
  "kb": () => (/* reexport */ randomId),
  "gB": () => (/* reexport */ redirectTo),
  "H5": () => (/* reexport */ reload),
  "sy": () => (/* reexport */ renameTo),
  "g_": () => (/* reexport */ replaceHistoryState),
  "fX": () => (/* reexport */ runAndCatchException),
  "M0": () => (/* reexport */ screen),
  "X5": () => (/* reexport */ scrollTo),
  "G8": () => (/* reexport */ sentenceCase),
  "pC": () => (/* reexport */ external_tcomb_validation_),
  "P2": () => (/* reexport */ throttle),
  "dg": () => (/* reexport */ throwInvalidArgumentsError),
  "a6": () => (/* reexport */ throwNextTick),
  "Sy": () => (/* reexport */ transformContinueIterable),
  "It": () => (/* reexport */ underscore),
  "th": () => (/* reexport */ uniqueErrorMessage),
  "Dc": () => (/* reexport */ wait),
  "OH": () => (/* reexport */ waitMs),
  "k9": () => (/* reexport */ windowLocationOrigin)
});

// UNUSED EXPORTS: bypassThrottle, cleanUniqueErrorMessage, currentHash, detectUniqueErrorMessage, disableConsoleError, enableUniqueErrors, getChildPath, isUnderscore, setNextTickScheduler, setScrivitoPromise, sliceFromIterable

;// CONCATENATED MODULE: ./scrivito_sdk/common/collect_and_schedule.ts
function collectAndSchedule(scheduler, fn) {
  let isScheduled = false;
  let lastArgs;
  return (...args) => {
    lastArgs = args;
    if (isScheduled)
      return;
    scheduler(() => {
      isScheduled = false;
      const argsToProcess = lastArgs;
      lastArgs = void 0;
      fn(...argsToProcess);
    });
    isScheduled = true;
  };
}
function collectInListAndSchedule(scheduler, fn) {
  let list = [];
  let isScheduled = false;
  return (value) => {
    list.push(value);
    schedule();
  };
  function schedule() {
    if (isScheduled)
      return;
    isScheduled = true;
    scheduler(() => {
      try {
        runFunction();
      } finally {
        isScheduled = false;
        if (list.length > 0)
          schedule();
      }
    });
  }
  function runFunction() {
    const remainder = [];
    try {
      while (list.length > 0) {
        const listToProcess = list;
        list = [];
        fn(listToProcess).forEach((value) => remainder.push(value));
      }
    } finally {
      list.forEach((value) => remainder.push(value));
      list = remainder;
    }
  }
}

// EXTERNAL MODULE: external "underscore"
var external_underscore_ = __webpack_require__(4952);
;// CONCATENATED MODULE: ./scrivito_sdk/common/error_logging.ts
let consoleErrorIsDisabled = false;
function logError(...args) {
  if (window && window.console && !consoleErrorIsDisabled) {
    window.console.error(...args);
  }
}
function disableConsoleError() {
  consoleErrorIsDisabled = true;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/errors.ts
class ScrivitoError extends Error {
  constructor(message) {
    super(message);
    const correctPrototype = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, correctPrototype);
    } else {
      this.__proto__ = correctPrototype;
    }
  }
  get name() {
    return this.constructor.name;
  }
}
class ArgumentError extends ScrivitoError {
  constructor(message) {
    super(message);
  }
}
class InternalError extends ScrivitoError {
  constructor(message) {
    super(message != null ? message : "Scrivito internal error");
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/next_tick.ts
let nextTickScheduler = setTimeoutScheduler;
function nextTick(delayedFunction) {
  nextTickScheduler(delayedFunction);
}
function setTimeoutScheduler(fn) {
  setTimeout(fn, 0);
}
function throwNextTick(error) {
  nextTick(() => {
    throw error;
  });
}
function setNextTickScheduler(scheduler) {
  nextTickScheduler = scheduler;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/pretty_print.ts

function prettyPrint(input) {
  try {
    if ((0,external_underscore_.isFunction)(input)) {
      return printFunction(input);
    }
    if ((0,external_underscore_.isObject)(input)) {
      return printObject(input);
    }
    return printTruncated(input);
  } catch (_e) {
    return "";
  }
}
function printObject(object) {
  const basicContent = object._scrivitoPrivateContent;
  if (basicContent && (0,external_underscore_.isFunction)(basicContent.toPrettyPrint)) {
    return basicContent.toPrettyPrint();
  }
  if ((0,external_underscore_.isElement)(object)) {
    return `[object HTMLElement ${printTruncated(object.outerHTML)}]`;
  }
  return printTruncated(object);
}
function printFunction(fn) {
  if (isFnWithSchema(fn)) {
    const schema = fn._scrivitoPrivateSchema;
    return `[class ${schema.name()}]`;
  }
  if (isReactComponent(fn)) {
    const name = fn.displayName || fn.name;
    return `[class React.Component "${name}"]`;
  }
  return truncate(fn.toString());
}
function isFnWithSchema(fn) {
  return !!fn._scrivitoPrivateSchema;
}
function isReactComponent(fn) {
  const prototype = fn.prototype;
  return prototype && prototype.isReactComponent;
}
function printTruncated(input) {
  const stringified = JSON.stringify(input);
  if (stringified) {
    return truncate(stringified);
  }
  return stringified;
}
function truncate(value) {
  if (value.length > 100) {
    return `${value.slice(0, 100)}...`;
  }
  return value;
}

// EXTERNAL MODULE: external "tcomb-validation"
var external_tcomb_validation_ = __webpack_require__(5807);
;// CONCATENATED MODULE: ./scrivito_sdk/common/tcomb.ts

external_tcomb_validation_.struct.strict = true;
external_tcomb_validation_["interface"].strict = true;
external_tcomb_validation_.fail = (message) => {
  throw new TypeError(message);
};


;// CONCATENATED MODULE: ./scrivito_sdk/common/check_arguments_for.ts







function noop() {
}
function checkArgumentsFor(functionName, argumentsDefinitions, options) {
  if (process.env.NODE_ENV !== "development")
    return noop;
  return (...givenArguments) => {
    let errorMessage;
    try {
      errorMessage = errorMessageForArguments(
        givenArguments,
        argumentsDefinitions
      );
    } catch (e) {
      throwNextTick(e);
    }
    if (errorMessage) {
      throwInvalidArgumentsError(functionName, errorMessage, options);
    }
  };
}
function throwInvalidArgumentsError(functionName, errorMessage, { docPermalink, severity }) {
  const fullErrorMessage = `Invalid arguments for '${functionName}': ${errorMessage} Visit ${docUrl(
    docPermalink
  )} for more information.`;
  if (severity === "warning") {
    logError(fullErrorMessage);
  } else {
    throw new ArgumentError(fullErrorMessage);
  }
}
function errorMessageForArguments(givenArguments, argumentsDefinitions) {
  const numExpected = argumentsDefinitions.length;
  const numGiven = givenArguments.length;
  if (numGiven > numExpected) {
    return `Expected ${numExpected} arguments, got ${numGiven}.`;
  }
  const errors = (0,external_underscore_.flatten)(
    argumentsDefinitions.map(([argumentName, argumentType], index) => {
      const givenArgument = givenArguments[index];
      const validation = external_tcomb_validation_.validate(givenArgument, argumentType);
      return validation.errors.map(
        (error) => messageForError(argumentName, error)
      );
    })
  );
  if (errors.length > 0) {
    return errors.join(" ");
  }
}
function messageForError(argumentName, error) {
  const subjectDescription = subjectDescriptionForError(argumentName, error);
  if (error.actual === void 0) {
    return `Missing required ${subjectDescription}.`;
  }
  if (error.expected === external_tcomb_validation_.Nil) {
    return `Unexpected ${subjectDescription}.`;
  }
  return `Unexpected value for ${subjectDescription}: got ${prettyPrint(
    error.actual
  )}, expected type ${external_tcomb_validation_.getTypeName(error.expected)}.`;
}
function subjectDescriptionForError(argumentName, error) {
  const argumentDescription = `argument '${argumentName}'`;
  if (error.path.length === 0) {
    return argumentDescription;
  }
  return `key '${error.path.join("/")}' in ${argumentDescription}`;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/doc_url.ts
function docUrl(docPermalink) {
  return `https://docs.scrivito.com/${docPermalink}`;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/context_container.ts
class ContextContainer {
  current() {
    return this.currentContext;
  }
  runWith(valueForFunction, fn) {
    const before = this.currentContext;
    try {
      this.currentContext = valueForFunction;
      return fn();
    } finally {
      this.currentContext = before;
    }
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/deferred.ts

class Deferred {
  constructor() {
    this.promise = new ScrivitoPromise(
      (resolveFn, rejectFn) => {
        this.resolve = (value) => {
          this.settled = true;
          resolveFn(value);
        };
        this.reject = (error) => {
          this.settled = true;
          rejectFn(error);
        };
      }
    );
  }
  isPending() {
    return !this.settled;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/tcomb_refinements.ts

const PositiveInteger = external_tcomb_validation_.refinement(
  external_tcomb_validation_.Integer,
  (i) => i > 0,
  "PositiveInteger"
);
const NonNegativeInteger = external_tcomb_validation_.refinement(
  external_tcomb_validation_.Integer,
  (i) => i >= 0,
  "NonNegativeInteger"
);

;// CONCATENATED MODULE: ./scrivito_sdk/common/run_and_catch_exception.ts
function runAndCatchException(fn) {
  try {
    return {
      errorThrown: false,
      result: fn()
    };
  } catch (error) {
    return { errorThrown: true, error };
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/get_scrivito_version.ts

function getScrivitoVersion() {
  const version = "1.29.0.dev-1-g6a1f9b52ff37";
  if (!version) {
    throw new InternalError();
  }
  return version;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/asset_loading.ts
function loadCss(url, targetDocument = window.document) {
  const link = targetDocument.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  appendChild(targetDocument.head, link);
}
function loadJs(url, targetDocument = window.document) {
  const script = targetDocument.createElement("script");
  script.src = url;
  appendChild(targetDocument.head, script);
}
function appendChild(head, element) {
  head.appendChild(element);
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/is_present.ts
function isPresent(maybeValue) {
  return maybeValue !== null && maybeValue !== void 0;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/attribute_inflection.ts
const CONVERT_TO_CAMELCASE = /(_+)(\w)/g;
const CONVERT_TO_UNDERSCORE = /([A-Z])/g;
const TEST_ABBR_OR_NUMBER = /[A-Z]+|\d+/g;
const TEST_CAMEL_CASE = /^_?(_+[A-Z0-9]|[^_])+$/;
const TEST_SEPARATOR = /[_\s]+/g;
const TEST_TITLE_CASE_WORD = /[A-Z][a-z]+/g;
const TEST_UNDERSCORE = /^[a-z0-9_:]+$/;
function isUnderscore(name) {
  return TEST_UNDERSCORE.test(name);
}
function isCamelCase(name) {
  return TEST_CAMEL_CASE.test(name);
}
function underscore(name) {
  const underscored = name.replace(
    CONVERT_TO_UNDERSCORE,
    (_match, group) => `_${group.toLowerCase()}`
  );
  return underscored[0] === "_" && name[0] !== "_" ? underscored.substring(1) : underscored;
}
function camelCase(name) {
  return name.replace(
    CONVERT_TO_CAMELCASE,
    (match, underscores, nextChar, index) => {
      if (!index) {
        return match;
      }
      if (nextChar.toUpperCase() === nextChar) {
        return match;
      }
      return `${underscores.substr(1)}${nextChar.toUpperCase()}`;
    }
  );
}
function classify(name) {
  const camelCased = camelCase(name);
  return camelCased.charAt(0).toUpperCase() + camelCased.slice(1);
}
function sentenceCase(name) {
  return name.replace(TEST_SEPARATOR, " ").replace(TEST_TITLE_CASE_WORD, (word) => ` ${word.toLowerCase()}`).replace(TEST_ABBR_OR_NUMBER, (word) => ` ${word}`).trim().replace(/./, (c) => c.toUpperCase());
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/trans_iterator.ts
class TransIterator {
  constructor(nextOrIterator) {
    this.next = typeof nextOrIterator === "object" ? nextOrIterator.next.bind(nextOrIterator) : nextOrIterator;
  }
  map(fn) {
    return new TransIterator(() => {
      const nextResult = this.next();
      if (nextResult.done)
        return { done: true };
      return { value: fn(nextResult.value) };
    });
  }
  filter(test) {
    const next = () => {
      const nextResult = this.next();
      if (nextResult.done)
        return { done: true };
      const value = nextResult.value;
      return test(value) ? { value } : next();
    };
    return new TransIterator(next);
  }
  takeWhile(test) {
    let stopped = false;
    return new TransIterator(() => {
      if (stopped)
        return { done: true };
      const nextResult = this.next();
      if (nextResult.done)
        return { done: true };
      const value = nextResult.value;
      if (test(value))
        return { value };
      stopped = true;
      return { done: true };
    });
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/input_types.ts

const BlobType = external_tcomb_validation_["interface"](
  {
    size: external_tcomb_validation_.Number,
    type: external_tcomb_validation_.String
  },
  { name: "Blob", strict: false }
);
const FileType = BlobType.extend(
  {
    name: external_tcomb_validation_.String
  },
  { name: "File", strict: false }
);

;// CONCATENATED MODULE: ./scrivito_sdk/common/is_system_attribute.ts
function isSystemAttribute(attributeName) {
  return attributeName[0] === "_";
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/iterable.ts
function extractFromIterator(iterator, size) {
  const result = [];
  while (result.length !== size) {
    const next = iterator.next();
    if (next.done)
      return result;
    result.push(next.value);
  }
  return result;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/continue_iterable.ts

function transformContinueIterable(iterable, transform) {
  return new TransformedContinueIterable(iterable, transform);
}
class EmptyContinueIterable {
  iterator() {
    return new EmptyContinueIterator();
  }
  iteratorFromContinuation(_continuation) {
    return new EmptyContinueIterator();
  }
}
class EmptyContinueIterator {
  next() {
    return { done: true };
  }
  continuation() {
    return void 0;
  }
}
class TransformedContinueIterable {
  constructor(iterable, transform) {
    this.iterable = iterable;
    this.transform = transform;
  }
  iterator() {
    return new TransformedContinueIterator(
      this.iterable.iterator(),
      this.transform
    );
  }
  iteratorFromContinuation(continuation) {
    return new TransformedContinueIterator(
      this.iterable.iteratorFromContinuation(continuation),
      this.transform
    );
  }
}
class TransformedContinueIterator {
  constructor(iterator, transform) {
    this.iterator = iterator;
    this.transformedIterator = transform(new TransIterator(iterator));
  }
  next() {
    return this.transformedIterator.next();
  }
  continuation() {
    return this.iterator.continuation();
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/random.ts
function randomHex() {
  let hex = Math.floor(Math.random() * Math.pow(16, 8)).toString(16);
  while (hex.length < 8) {
    hex = `0${hex}`;
  }
  return hex;
}
function randomId() {
  return randomHex() + randomHex();
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/unique_error_message.ts
let enabled = false;
function enableUniqueErrors() {
  enabled = true;
}
function uniqueErrorMessage(originalMessage) {
  return enabled ? `${originalMessage} #HoneybadgerUnique` : originalMessage;
}
function detectUniqueErrorMessage(message) {
  const match = message.match(/^(.*) #HoneybadgerUnique$/);
  return match ? match[1] : void 0;
}
function cleanUniqueErrorMessage(message) {
  var _a;
  return (_a = detectUniqueErrorMessage(message)) != null ? _a : message;
}
function resetUniqueErrors() {
  enabled = false;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/throttle.ts

let shouldBypassThrottle = false;
function throttle(fn, ms, options) {
  return shouldBypassThrottle ? fn : (0,external_underscore_.throttle)(fn, ms, options);
}
function bypassThrottle() {
  shouldBypassThrottle = true;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/types.ts


const INTEGER_RANGE_START = -9007199254740991;
const INTEGER_RANGE_END = 9007199254740991;
const BACKEND_FORMAT_REGEXP = /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/;
function deserializeAsInteger(value) {
  if (typeof value === "string" && value.match(/^-?\d+$/)) {
    return convertToInteger(value);
  }
  return typeof value === "number" ? convertToInteger(value) : null;
}
function isValidInteger(value) {
  return isInteger(value) && INTEGER_RANGE_START <= value && value <= INTEGER_RANGE_END;
}
function isValidFloat(value) {
  return typeof value === "number" && (0,external_underscore_.isFinite)(value);
}
function deserializeAsDate(value) {
  if (typeof value !== "string")
    return null;
  if (!isValidDateString(value)) {
    throw new InternalError();
  }
  return parseStringToDate(value);
}
function parseStringToDate(dateString) {
  if (!dateString)
    return null;
  const dateMatch = dateString.match(BACKEND_FORMAT_REGEXP);
  if (!dateMatch)
    return null;
  const [
    ,
    yearString,
    monthString,
    dayString,
    hoursString,
    minutesString,
    secondsString
  ] = dateMatch;
  const year = parseInt(yearString, 10);
  const month = parseInt(monthString, 10);
  const day = parseInt(dayString, 10);
  const hours = parseInt(hoursString, 10);
  const minutes = parseInt(minutesString, 10);
  const seconds = parseInt(secondsString, 10);
  return new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
}
function formatDateToString(date) {
  const yearMonth = `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}`;
  const dateHours = `${pad(date.getUTCDate())}${pad(date.getUTCHours())}`;
  const minutesSeconds = `${pad(date.getUTCMinutes())}${pad(
    date.getUTCSeconds()
  )}`;
  return `${yearMonth}${dateHours}${minutesSeconds}`;
}
function isValidDateString(dateString) {
  return typeof dateString === "string" && !!dateString.match(/^\d{14}$/);
}
function pad(num) {
  return num < 10 ? `0${num}` : num;
}
function isInteger(value) {
  return isValidFloat(value) && Math.floor(value) === value;
}
function convertToInteger(valueFromBackend) {
  const intValue = parseInt(valueFromBackend.toString(), 10);
  if (intValue === 0) {
    return 0;
  } else if (isValidInteger(intValue)) {
    return intValue;
  }
  return null;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/wait.ts

function wait(seconds) {
  return waitMs(seconds * 1e3);
}
function waitMs(milliseconds) {
  return new ScrivitoPromise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/equals.ts
function equals(a, b) {
  if (a === b)
    return true;
  if (isObjectSupportingEquals(a) && isObjectSupportingEquals(b)) {
    return a.equals(b);
  }
  if (isObjectWithScrivitoPrivateContent(a) && isObjectWithScrivitoPrivateContent(b)) {
    return equals(a._scrivitoPrivateContent, b._scrivitoPrivateContent);
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((v, i) => equals(v, b[i]));
  }
  if (isObjectSupportingValueOf(a) && isObjectSupportingValueOf(b)) {
    return a.valueOf() === b.valueOf();
  }
  return false;
}
function equalsBestEffort(a, b) {
  return equalsBestEffortWithDepthLimit(a, b);
}
function equalsBestEffortWithDepthLimit(a, b, currentDepth = 1) {
  if (a === b)
    return true;
  if (isObjectSupportingEquals(a) && isObjectSupportingEquals(b)) {
    return a.equals(b);
  }
  if (isObjectWithScrivitoPrivateContent(a) && isObjectWithScrivitoPrivateContent(b)) {
    return equalsBestEffortWithDepthLimit(
      a._scrivitoPrivateContent,
      b._scrivitoPrivateContent,
      currentDepth
    );
  }
  if (Array.isArray(a) && Array.isArray(b) && currentDepth <= 3 && a.length <= 3 && b.length <= 3 && a.length === b.length) {
    return a.every(
      (v, i) => equalsBestEffortWithDepthLimit(v, b[i], currentDepth + 1)
    );
  }
  if (isObjectSupportingValueOf(a) && isObjectSupportingValueOf(b)) {
    return a.valueOf() === b.valueOf();
  }
  return false;
}
function isObjectSupportingEquals(object) {
  if (!object)
    return false;
  return typeof object.equals === "function";
}
function isObjectSupportingValueOf(object) {
  if (!object)
    return false;
  return typeof object.valueOf === "function";
}
function isObjectWithScrivitoPrivateContent(object) {
  if (!object)
    return false;
  return object.hasOwnProperty(
    "_scrivitoPrivateContent"
  );
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/promise_and_finally.ts
function promiseAndFinally(promise, handler) {
  return promise.then(
    (value) => {
      handler();
      return value;
    },
    (error) => {
      handler();
      throw error;
    }
  );
}

// EXTERNAL MODULE: external "promise-polyfill"
var external_promise_polyfill_ = __webpack_require__(1932);
var external_promise_polyfill_default = /*#__PURE__*/__webpack_require__.n(external_promise_polyfill_);
;// CONCATENATED MODULE: ./scrivito_sdk/common/scrivito_promise.ts

let ScrivitoPromise;
if (typeof Promise !== "undefined") {
  ScrivitoPromise = Promise;
} else {
  ScrivitoPromise = (external_promise_polyfill_default());
}
function setScrivitoPromise(PromiseClass) {
  ScrivitoPromise = PromiseClass;
}

// EXTERNAL MODULE: external "urijs"
var external_urijs_ = __webpack_require__(8842);
;// CONCATENATED MODULE: ./scrivito_sdk/common/app_url_from_packaged_ui_url.ts

function appUrlFromPackagedUiUrl(uiUrl) {
  const uri = new external_urijs_(uiUrl);
  let segment = uri.segment(0);
  if (!isScrivitoSegment(segment))
    return null;
  while (isScrivitoSegment(segment)) {
    uri.segment(0, "");
    segment = uri.segment(0);
  }
  return uri.toString();
}
function isScrivitoSegment(segment) {
  return (segment == null ? void 0 : segment.toLowerCase()) === "scrivito";
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/batch_retrieval.ts

class BatchRetrieval {
  constructor(mget, { batchSize } = {}) {
    this.scheduleItem = collectInListAndSchedule(
      nextTick,
      (items) => {
        const nextBatch = items.splice(0, this.batchSize);
        const keys = nextBatch.map((item) => item.key);
        this.mget(keys).then(
          (results) => {
            nextBatch.forEach(({ key, deferred }, index) => {
              if (index < results.length) {
                const result = results[index];
                deferred.resolve(result);
              } else {
                this.retrieve(key).then(deferred.resolve, deferred.reject);
              }
            });
          },
          (error) => {
            nextBatch.forEach((item) => item.deferred.reject(error));
          }
        );
        return items;
      }
    );
    this.mget = mget;
    this.batchSize = batchSize || 100;
  }
  retrieve(key) {
    const deferred = new Deferred();
    this.scheduleItem({ key, deferred });
    return deferred.promise;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/compute_cache_key.ts
function computeCacheKey(data) {
  const normalizedData = normalizeData(data);
  return JSON.stringify(normalizedData);
}
function normalizeData(data) {
  if (Array.isArray(data)) {
    return data.map(normalizeData);
  }
  if (isUnknownObject(data)) {
    return Object.keys(data).sort().map((key) => [key, normalizeData(data[key])]);
  }
  return data;
}
function isUnknownObject(data) {
  return typeof data === "object" && data !== null;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/position.ts
function clickPositionWithinElement(clickEvent, element) {
  const { clientX: mouseX, clientY: mouseY } = clickEvent;
  const { left: elementX, top: elementY } = element.getBoundingClientRect();
  return {
    x: mouseX - elementX,
    y: mouseY - elementY
  };
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/streamable.ts

class Streamable {
  constructor(subscribeFunction) {
    this.subscribeFunction = subscribeFunction;
  }
  subscribe(nextOrSubscriber) {
    const intermediary = new Intermediary(
      typeof nextOrSubscriber === "object" ? nextOrSubscriber : { next: nextOrSubscriber }
    );
    const subscriptionOrUnsubscribe = this.subscribeFunction(intermediary);
    intermediary.setUnsubscribeCallback(
      typeof subscriptionOrUnsubscribe === "object" ? () => subscriptionOrUnsubscribe.unsubscribe() : subscriptionOrUnsubscribe
    );
    return intermediary;
  }
  map(fn) {
    return new Streamable(
      (subscriber) => this.subscribe({
        next: (value) => subscriber.next(fn(value)),
        complete: () => subscriber.complete()
      })
    );
  }
  filter(test) {
    return new Streamable(
      (subscriber) => this.subscribe({
        next: (value) => {
          if (test(value)) {
            subscriber.next(value);
          }
        },
        complete: () => subscriber.complete()
      })
    );
  }
  toPromise() {
    return new ScrivitoPromise((resolve) => {
      let lastValue;
      this.subscribe({
        next(value) {
          lastValue = value;
        },
        complete() {
          resolve(lastValue);
        }
      });
    });
  }
  takeOne() {
    return new Streamable((subscriber) => {
      let subscription = null;
      subscription = this.subscribe({
        next: (value) => {
          if (subscription)
            subscription.unsubscribe();
          subscriber.next(value);
          subscriber.complete();
        },
        complete: () => {
          subscriber.complete();
        }
      });
      if (subscriber.isClosed())
        subscription.unsubscribe();
      return subscription;
    });
  }
  waitForFirst() {
    return new ScrivitoPromise((resolve, reject) => {
      let resolved = false;
      this.takeOne().subscribe({
        next(value) {
          resolved = true;
          resolve(value);
        },
        complete() {
          if (!resolved)
            reject(new EndOfStreamError());
        }
      });
    });
  }
  takeUntil(until) {
    return new Streamable((subscriber) => {
      let untilSubscription;
      let subscription;
      subscription = this.subscribe({
        next(value) {
          subscriber.next(value);
        },
        complete() {
          completeStream();
        }
      });
      if (subscription.isClosed())
        return () => void 0;
      untilSubscription = until.subscribe({
        next() {
          completeStream();
        },
        complete() {
          completeStream();
        }
      });
      function completeStream() {
        subscriber.complete();
        cleanup();
      }
      function cleanup() {
        if (subscription)
          subscription.unsubscribe();
        if (untilSubscription)
          untilSubscription.unsubscribe();
      }
      return cleanup;
    });
  }
}
class EndOfStreamError extends ScrivitoError {
}
class Intermediary {
  constructor(subscriber) {
    this.subscriber = subscriber;
  }
  next(value) {
    if (this.subscriber && this.subscriber.next) {
      this.subscriber.next(value);
    }
  }
  complete() {
    if (this.subscriber && this.subscriber.complete) {
      this.subscriber.complete();
    }
    this.subscriber = void 0;
  }
  unsubscribe() {
    if (!this.subscriber)
      return;
    this.subscriber = void 0;
    if (this.unsubscribeCallback) {
      this.unsubscribeCallback.apply(void 0);
    }
  }
  isClosed() {
    return !this.subscriber;
  }
  setUnsubscribeCallback(callback) {
    this.unsubscribeCallback = callback;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/anticipated_stream.ts

function anticipatedStream(streamPromise) {
  return new Streamable((subscriber) => {
    let subscription;
    streamPromise.then((stream) => {
      if (subscriber.isClosed())
        return;
      subscription = stream.subscribe(subscriber);
    }).catch((error) => {
      subscriber.complete();
      throw error;
    });
    return () => {
      if (subscription)
        subscription.unsubscribe();
    };
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/subject.ts

class Subject extends Streamable {
  constructor() {
    super((subscriber) => {
      if (this.isCompleted) {
        subscriber.complete();
        return () => void 0;
      }
      const id = (this.subscriberIdCounter++).toString();
      this.subscribers[id] = subscriber;
      this.onNewSubscriber(subscriber);
      return () => {
        delete this.subscribers[id];
      };
    });
    this.subscribers = {};
    this.subscriberIdCounter = 1;
    this.isCompleted = false;
  }
  next(value) {
    Object.keys(this.subscribers).forEach((id) => {
      this.subscribers[id].next(value);
    });
  }
  complete() {
    Object.keys(this.subscribers).forEach(
      (id) => this.subscribers[id].complete()
    );
    this.subscribers = {};
    this.isCompleted = true;
  }
  subscriberCount() {
    return Object.keys(this.subscribers).length;
  }
  isClosed() {
    return this.isCompleted;
  }
  onNewSubscriber(_subscriber) {
  }
}
class BehaviorSubject extends Subject {
  constructor(value) {
    super();
    this.value = value;
  }
  next(value) {
    if (this.value === value)
      return;
    this.value = value;
    super.next(value);
  }
  onNewSubscriber(subscriber) {
    subscriber.next(this.value);
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/extract_title_and_description.ts
function extractTitleAndDescription(text) {
  const match = /^([\s\S]+?[.!?])\s+([\s\S]+)/.exec(text);
  return match ? [match[1], match[2] || void 0] : [text, void 0];
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/never.ts

function never() {
  return new ScrivitoPromise(() => void 0);
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/default_endpoint.ts
const DEFAULT_ENDPOINT = "api.scrivito.com";

;// CONCATENATED MODULE: ./scrivito_sdk/common/prune_string.ts
const SPACES_REGEX = /\s+/g;
const ONE_SPACE = " ";
function pruneString(input) {
  return input.trim().replace(SPACES_REGEX, ONE_SPACE);
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/window_proxy.ts
function devicePixelRatio(windowObject = window) {
  return windowObject.devicePixelRatio || 1;
}
function currentHref() {
  return windowLocation().href;
}
function windowLocationOrigin() {
  return windowLocation().origin;
}
function currentHash() {
  return windowLocation().hash;
}
function windowName() {
  return window.name;
}
function window_proxy_navigator() {
  return window.navigator;
}
function openWindow(url, target) {
  return window.open(url, target);
}
function reload() {
  windowLocation().reload();
}
function renameTo(newName) {
  window.name = newName;
}
function redirectTo(newLocation) {
  windowLocation().assign(newLocation);
}
function replaceHistoryState(state, title, url) {
  window.history.replaceState(state, title, url);
}
function screen() {
  return window.screen;
}
function getDocument() {
  return document;
}
function window_proxy_innerHeight() {
  return window.innerHeight;
}
function window_proxy_pageXOffset() {
  return window.pageXOffset;
}
function window_proxy_pageYOffset() {
  return window.pageYOffset;
}
function scrollTo(x, y) {
  window.scrollTo(x, y);
}
function getScrollHeight() {
  return getDocument().body.scrollHeight;
}
function windowLocation() {
  return window.location;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/is_string_array.ts

function isStringArray(value) {
  return Array.isArray(value) && value.every(external_underscore_.isString);
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/is_empty_value.ts

function isEmptyValue(value) {
  return value === null || ((0,external_underscore_.isString)(value) || Array.isArray(value)) && (0,external_underscore_.isEmpty)(value);
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/compute_ancestor_paths.ts
function computeAncestorPaths(path) {
  const ancestorPaths = ["/"];
  if (path === "/")
    return ancestorPaths;
  const components = path.split("/").slice(1);
  let ancestorPath = "";
  components.forEach((component) => {
    ancestorPath = `${ancestorPath}/${component}`;
    ancestorPaths.push(ancestorPath);
  });
  return ancestorPaths;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/is_localhost_url.ts
function isLocalhostUrl(url) {
  try {
    return new URL(url).hostname === "localhost";
  } catch (e) {
    return false;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/index.ts

















































/***/ }),

/***/ 9241:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "hO": () => (/* reexport */ FacetQuery),
  "kI": () => (/* reexport */ IN_MEMORY_TENANT),
  "Tk": () => (/* reexport */ IdBatchCollection),
  "hH": () => (/* reexport */ IdBatchQuery),
  "kt": () => (/* reexport */ ObjBackendReplication),
  "kX": () => (/* reexport */ ObjStreamReplication),
  "VJ": () => (/* reexport */ assertNotUsingInMemoryTenant),
  "gU": () => (/* reexport */ configureForLazyWidgets),
  "ZN": () => (/* reexport */ createObjData),
  "Qc": () => (/* reexport */ disableObjReplication),
  "Id": () => (/* reexport */ failIfPerformanceConstraint),
  "uw": () => (/* reexport */ findWidgetPlacement),
  "Dk": () => (/* reexport */ getContentStateId),
  "Mu": () => (/* reexport */ getFieldDiff),
  "L7": () => (/* reexport */ obj_data_store_getObjData),
  "N1": () => (/* reexport */ getObjQuery),
  "kb": () => (/* reexport */ getObjQueryCount),
  "lY": () => (/* reexport */ getObjVersion),
  "mG": () => (/* reexport */ getWidgetModification),
  "zQ": () => (/* reexport */ isUsingInMemoryTenant),
  "P3": () => (/* reexport */ isWidgetlistDiff),
  "vr": () => (/* reexport */ objReplicationPool),
  "qe": () => (/* reexport */ runWithPerformanceConstraint),
  "Bg": () => (/* reexport */ setContentStateId),
  "$z": () => (/* reexport */ setContentUpdateHandler),
  "wi": () => (/* reexport */ setObjStreamReplicationEndpoint),
  "D7": () => (/* reexport */ suggest),
  "PD": () => (/* reexport */ trackContentStateId),
  "x0": () => (/* reexport */ updateContent),
  "c9": () => (/* reexport */ useInMemoryTenant),
  "Lo": () => (/* reexport */ useReplicationStrategy)
});

// UNUSED EXPORTS: ObjData, REMOVE_THIS_KEY, ReplicationCache, clearObjDataCache, createObjReplicationProcess, diffObjJson, diffWidgetJson, hasObjContentDiff, isAttributeModified, resetInMemoryTenant

// EXTERNAL MODULE: ./scrivito_sdk/client/index.ts + 29 modules
var client = __webpack_require__(5098);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 45 modules
var common = __webpack_require__(3711);
// EXTERNAL MODULE: external "underscore"
var external_underscore_ = __webpack_require__(4952);
;// CONCATENATED MODULE: ./scrivito_sdk/data/remove_this_key.ts
class RemoveThisKey {
  toJSON() {
    return null;
  }
}
const REMOVE_THIS_KEY = new RemoveThisKey();
function isRemoveThisKey(v) {
  return v === REMOVE_THIS_KEY;
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/obj_patch.ts



function patchObjJson(primitiveObj, patch) {
  if (!primitiveObj)
    return patch;
  return patchJson(primitiveObj, patch);
}
function diffObjJson(fromObjJson, toObjJson) {
  if (!fromObjJson)
    return toObjJson;
  return diffJson(fromObjJson, toObjJson);
}
function diffWidgetJson(fromWidgetJson, toWidgetJson) {
  return diffJson(fromWidgetJson, toWidgetJson);
}
function diffMaybeWidgetJson(fromWidgetJson, toWidgetJson) {
  if (!fromWidgetJson)
    return toWidgetJson || null;
  if (!toWidgetJson)
    return null;
  return diffJson(fromWidgetJson, toWidgetJson);
}
function hasObjContentDiff(objJsonA, objJsonB) {
  const patch = diffObjJson(objJsonA, objJsonB);
  return Object.keys(patch).some(isObjContentAttributeName);
}
function hasWidgetContentDiff(widgetJsonBefore, widgetJsonAfter) {
  const patch = diffWidgetJson(widgetJsonBefore, widgetJsonAfter);
  return Object.keys(patch).some(isContentAttributeName);
}
function isObjContentAttributeName(attributeName) {
  return isContentAttributeName(attributeName) || attributeName === "_path" || attributeName === "_permalink";
}
function isContentAttributeName(attributeName) {
  return !(0,common/* isSystemAttribute */.mb)(attributeName) || attributeName === "_obj_class";
}
function eachKeyFrom(objectA, objectB, handler) {
  const keysOfA = Object.keys(objectA);
  const keysOfB = Object.keys(objectB);
  const keysOfAOnly = (0,external_underscore_.difference)(keysOfA, keysOfB);
  keysOfAOnly.forEach((key) => {
    handler(key, objectA[key], objectB[key], false);
  });
  keysOfB.forEach((key) => {
    handler(key, objectA[key], objectB[key], true);
  });
}
function buildUpdatedWidgetPool(widgetPool, widgetPoolPatch) {
  if (!widgetPoolPatch || (0,external_underscore_.isEmpty)(widgetPoolPatch))
    return widgetPool;
  const updatedWidgetPool = {};
  eachKeyFrom(
    widgetPool,
    widgetPoolPatch,
    (id, widget, widgetPatch, isKeyOfWidgetPoolPatch) => {
      if (isKeyOfWidgetPoolPatch) {
        if (isRemoveThisKey(widgetPatch))
          return;
        if (widgetPatch) {
          if (widget) {
            updatedWidgetPool[id] = patchWidgetJson(widget, widgetPatch);
          } else {
            if (isWidgetJson(widgetPatch)) {
              updatedWidgetPool[id] = widgetPatch;
            }
          }
        }
      } else {
        updatedWidgetPool[id] = widget;
      }
    }
  );
  return updatedWidgetPool;
}
function buildPatchEntry(valueA, valueB, fnHandleBoth) {
  if (valueA === void 0)
    return valueB;
  if (valueB === void 0)
    return REMOVE_THIS_KEY;
  return fnHandleBoth();
}
function buildWidgetPoolPatch(widgetPoolA, widgetPoolB) {
  if (widgetPoolA === widgetPoolB)
    return void 0;
  if (!widgetPoolA)
    return widgetPoolB;
  const patch = {};
  eachKeyFrom(widgetPoolA, widgetPoolB || {}, (widgetId, widgetA, widgetB) => {
    const widgetValue = buildPatchEntry(widgetA, widgetB, () => {
      const widgetPatch = diffMaybeWidgetJson(widgetA, widgetB);
      if (!(0,external_underscore_.isEmpty)(widgetPatch))
        return widgetPatch;
    });
    if (widgetValue !== void 0) {
      patch[widgetId] = widgetValue;
    }
  });
  return patch;
}
function diffJson(fromJson, toJson) {
  const patch = {};
  eachKeyFrom(fromJson, toJson, (attribute, valueInA, valueInB) => {
    if (attribute === "_widget_pool") {
      const widgetPoolPatch = buildWidgetPoolPatch(
        valueInA,
        valueInB
      );
      if (!(0,external_underscore_.isEmpty)(widgetPoolPatch)) {
        patch._widget_pool = widgetPoolPatch;
      }
    } else {
      const patchValue = buildPatchEntry(valueInA, valueInB, () => {
        if (!(0,external_underscore_.isEqual)(valueInA, valueInB))
          return valueInB;
      });
      if (patchValue !== void 0) {
        patch[attribute] = patchValue;
      }
    }
  });
  return patch;
}
function patchWidgetJson(primitiveWidget, patch) {
  return patchJson(primitiveWidget, patch);
}
function patchJson(primitiveObj, patch) {
  const updatedPrimitiveObj = {};
  eachKeyFrom(
    primitiveObj,
    patch,
    (attribute, objValue, patchValue, isAttributeOfPatch) => {
      if (attribute === "_widget_pool") {
        updatedPrimitiveObj._widget_pool = buildUpdatedWidgetPool(
          objValue || {},
          patchValue
        );
      } else if (isAttributeOfPatch) {
        const simplePatchValue = patchValue;
        if (isPatchValueToKeep(simplePatchValue)) {
          updatedPrimitiveObj[attribute] = simplePatchValue;
        }
      } else {
        updatedPrimitiveObj[attribute] = objValue;
      }
    }
  );
  return updatedPrimitiveObj;
}
function isPatchValueToKeep(v) {
  return v !== void 0 && !isRemoveThisKey(v);
}
function isWidgetJson(widgetPatch) {
  return typeof widgetPatch._obj_class === "string";
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/replication_cache.ts
class ReplicationCache {
  constructor(factory) {
    this.factory = factory;
    this.cache = {};
  }
  get(objSpaceId, objId) {
    const workspaceCache = this.getObjSpaceCache(objSpaceId);
    const objEntry = workspaceCache[objId];
    if (objEntry)
      return objEntry;
    const newEntry = this.factory(objSpaceId, objId);
    workspaceCache[objId] = newEntry;
    return newEntry;
  }
  clear() {
    this.cache = {};
  }
  getObjSpaceCache(objSpaceId) {
    const cacheKey = objSpaceId.join(":");
    const existingCache = this.cache[cacheKey];
    if (existingCache)
      return existingCache;
    const newCache = {};
    this.cache[cacheKey] = newCache;
    return newCache;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/obj_replication_pool.ts


class ObjReplicationPool {
  constructor() {
    this.replicationCache = new ReplicationCache(() => {
      throw new common/* InternalError */.AQ();
    });
    this.writeCallbacks = {};
    this.subscriptionToken = 0;
  }
  setReplicationStrategy(Strategy) {
    this.replicationCache = new ReplicationCache(
      (objSpaceId, objId) => new Strategy(objSpaceId, objId)
    );
  }
  get(objSpaceId, objId) {
    return this.replicationCache.get(objSpaceId, objId);
  }
  subscribeWrites(callback) {
    this.subscriptionToken += 1;
    this.writeCallbacks[this.subscriptionToken] = callback;
    return this.subscriptionToken;
  }
  unsubscribeWrites(token) {
    delete this.writeCallbacks[token];
  }
  writeStarted(promise) {
    Object.keys(this.writeCallbacks).forEach((key) => {
      const callback = this.writeCallbacks[key];
      callback(promise);
    });
  }
  clearWriteCallbacks() {
    this.writeCallbacks = {};
  }
  clearCache() {
    this.replicationCache.clear();
  }
}
const objReplicationPool = new ObjReplicationPool();
function useReplicationStrategy(Strategy) {
  objReplicationPool.setReplicationStrategy(Strategy);
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/performance_constraint.ts

const constraint = new common/* ContextContainer */.AY();
function failIfPerformanceConstraint(message) {
  if (constraint.current())
    throw new common/* InternalError */.AQ(message);
}
function runWithPerformanceConstraint(fn) {
  return constraint.runWith(true, fn);
}

// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 23 modules
var loadable = __webpack_require__(9246);
// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(9541);
;// CONCATENATED MODULE: ./scrivito_sdk/data/obj_data.ts
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};









function clearObjDataCache() {
  baseCollection.clear();
  widgetCollection.clear();
}
function dangerouslyGetRawObjJsons() {
  return baseCollection.dangerouslyGetRawValues();
}
let configuredForLazyWidgets = false;
function configureForLazyWidgets(lazy) {
  configuredForLazyWidgets = lazy;
}
let objChangeNotification;
function setupObjChangeNotification(fn) {
  objChangeNotification = fn;
}
const widgetCollection = new loadable/* LoadableCollection */.X2({
  recordedAs: "widgetdata",
  loadElement: ([objSpaceId, objId]) => ({
    loader: () => {
      objReplicationPool.get(objSpaceId, objId).start();
      return (0,common/* never */.Fi)();
    }
  })
});
const baseCollection = new loadable/* LoadableCollection */.X2({
  recordedAs: "baseobj",
  loadElement: ([objSpaceId, objId]) => ({
    loader: () => __async(void 0, null, function* () {
      if (!configuredForLazyWidgets) {
        yield (0,loadable/* load */.zD)(() => widgetCollection.get([objSpaceId, objId]).get());
        return (0,common/* never */.Fi)();
      }
      return (0,client.retrieveObj)(objSpaceId, objId, "widgetless");
    })
  })
});
class ObjData {
  constructor(_objSpaceId, _id) {
    this._objSpaceId = _objSpaceId;
    this._id = _id;
    this.baseData = baseCollection.get([_objSpaceId, _id]);
    this.widgetData = widgetCollection.get([_objSpaceId, _id]);
  }
  id() {
    return this._id;
  }
  get() {
    failIfPerformanceConstraint(
      "for performance reasons, avoid this method when rendering"
    );
    const widgetObjJson = this.widgetData.get();
    if (!widgetObjJson)
      return;
    const baseObjJson = this.baseData.get();
    if (!baseObjJson)
      return;
    if (!(0,client.isExistentObjJson)(baseObjJson))
      return baseObjJson;
    return this.joinDataWithCaching(baseObjJson, widgetObjJson);
  }
  getWidgetPoolWithBadPerformance() {
    return getSubReader(
      "_widget_pool",
      this.widgetData
    ).get();
  }
  getWidget(id) {
    failIfPerformanceConstraint(
      "for performance reasons, avoid this method when rendering"
    );
    return getWidgetState(id, this.widgetData).get();
  }
  getWidgetWithBadPerformance(widgetId) {
    return getWidgetState(widgetId, this.widgetData).get();
  }
  getAttribute(key) {
    if ((0,common/* isSystemAttribute */.mb)(key))
      return this.getAttributeWithoutWidgetData(key);
    if (!this.ensureAvailable())
      return;
    const valueFromBase = getSubReader(key, this.baseData).get();
    return valueFromBase !== void 0 ? valueFromBase : getSubReader(key, this.widgetData).get();
  }
  getAttributeWithoutWidgetData(key) {
    if (key === "_widget_pool") {
      throw new common/* InternalError */.AQ();
    }
    return getSubReader(key, this.baseData).get();
  }
  getAttributeWithWidgetData(key) {
    return getSubReader(key, this.widgetData).get();
  }
  getWidgetAttribute(id, key) {
    return getWidgetState(id, this.widgetData).subState(key).get();
  }
  getIfExistent() {
    if (this.isUnavailable())
      return;
    return this.get();
  }
  isForbidden() {
    return !!this.getAttributeWithoutWidgetData("_forbidden");
  }
  isUnavailable() {
    return !!this.getAttributeWithoutWidgetData("_deleted");
  }
  setBaseData(newState) {
    this.baseData.set(newState);
  }
  set(newState) {
    (0,state/* failIfFrozen */.un)("Changing CMS content");
    const [baseObjJson, widgetJson] = divideData(newState);
    this.baseData.set(baseObjJson);
    this.widgetData.set(widgetJson);
    this._replication().notifyLocalState(newState);
    if (objChangeNotification)
      objChangeNotification();
  }
  ensureAvailable() {
    return this.baseData.ensureAvailable() && (configuredForLazyWidgets || this.widgetData.ensureAvailable());
  }
  isAvailable() {
    return this.baseData.isAvailable();
  }
  update(objPatch) {
    const newState = patchObjJson(this.get(), objPatch);
    this.set(newState);
  }
  finishSaving() {
    return this._replication().finishSaving();
  }
  objSpaceId() {
    return this._objSpaceId;
  }
  equals(other) {
    if (!(other instanceof ObjData))
      return false;
    return this._id === other._id && (0,common/* equals */.fS)(this._objSpaceId, other._objSpaceId);
  }
  widgetExists(widgetId) {
    return !!this.getWidgetAttribute(widgetId, "_obj_class");
  }
  isBeingLoaded() {
    return this.baseData.numSubscribers() + this.widgetData.numSubscribers() > 0;
  }
  unload() {
    this.baseData.reset();
    this.widgetData.reset();
  }
  joinDataWithCaching(baseObjJson, widgetObjJson) {
    const lastJoin = this.lastJoin;
    if (lastJoin && lastJoin.baseObjJson === baseObjJson && lastJoin.widgetObjJson === widgetObjJson) {
      return lastJoin.joined;
    }
    const joined = __spreadValues(__spreadValues({}, baseObjJson), widgetObjJson);
    this.lastJoin = { baseObjJson, widgetObjJson, joined };
    return joined;
  }
  _replication() {
    return objReplicationPool.get(this._objSpaceId, this._id);
  }
}
function getWidgetState(id, loadableData) {
  const widgetPoolState = getSubReader(
    "_widget_pool",
    loadableData
  );
  return widgetPoolState.subState(id);
}
function getSubReader(key, loadableData) {
  return loadableData.reader().subState(key);
}
function invalidateAllLoadedObjsIn(objSpaceId) {
  const reRetrieved = {};
  const fullIds = idsFromCollection(widgetCollection);
  const widgetlessIds = idsFromCollection(baseCollection);
  fullIds.forEach((objId) => {
    if (reRetrieved[objId])
      return;
    reRetrieved[objId] = true;
    objReplicationPool.get(objSpaceId, objId).start();
  });
  widgetlessIds.forEach((objId) => __async(this, null, function* () {
    if (reRetrieved[objId])
      return;
    reRetrieved[objId] = true;
    baseCollection.get([objSpaceId, objId]).set(yield (0,client.retrieveObj)(objSpaceId, objId, "widgetless"));
  }));
}
function idsFromCollection(collection) {
  return collection.dangerouslyGetRawValues().map((objJson) => objJson._id).filter(common/* isPresent */.EN);
}
function divideData(data) {
  const baseObjJson = {};
  const widgetObjJson = {
    _id: data._id
  };
  Object.keys(data).forEach((key) => {
    const value = data[key];
    const targetData = isWidgetKey(key, value) ? widgetObjJson : baseObjJson;
    targetData[key] = value;
  });
  return [baseObjJson, widgetObjJson];
}
function isWidgetKey(key, value) {
  return key === "_widget_pool" || !(0,common/* isSystemAttribute */.mb)(key) && Array.isArray(value) && (value[0] === "widget" || value[0] === "widgetlist");
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/workspace_content_updater.ts




class WorkspaceContentUpdater {
  constructor(workspaceId, contentState) {
    this.workspaceId = workspaceId;
    this.contentState = contentState;
  }
  setContentStateIdOrThrowIfTracking(contentStateId) {
    if (this.initialization) {
      throw new common/* InternalError */.AQ();
    }
    this.setContentStateId(contentStateId);
  }
  trackContentStateId() {
    if (!this.initialization) {
      this.initialization = this.initializeContentStateId();
    }
    return this.initialization;
  }
  updateContent() {
    if (this.updating)
      return this.updating;
    const from = this.getContentStateId();
    if (!from)
      return common/* ScrivitoPromise.resolve */.s8.resolve();
    this.updating = (0,common/* promiseAndFinally */.sH)(
      (0,client.getWorkspaceChanges)(this.workspaceId, from).then(
        ({ to, current, objs }) => {
          if (objs === "*" || to && to !== current) {
            invalidateAllLoadedObjsIn(["workspace", this.workspaceId]);
          } else if (Array.isArray(objs)) {
            this.applyChanges(objs);
          }
          this.setContentStateId(current);
        }
      ),
      () => {
        this.updating = void 0;
      }
    );
    return this.updating;
  }
  applyChanges(objs) {
    objs.forEach((json) => {
      const objId = (0,client.isUnavailableObjJson)(json) ? json._deleted : json._id;
      const objReplication = objReplicationPool.get(
        ["workspace", this.workspaceId],
        objId
      );
      objReplication.notifyBackendState(json);
    });
  }
  initializeContentStateId() {
    if (this.getContentStateId())
      return common/* ScrivitoPromise.resolve */.s8.resolve();
    return (0,client.getWorkspaceChanges)(this.workspaceId).then((response) => {
      this.setContentStateId(response.current);
    });
  }
  getContentStateId() {
    return this.contentState.get();
  }
  setContentStateId(value) {
    this.contentState.set(value);
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/content_updater.ts




const contentStateIds = (0,state/* createStateContainer */.JH)();
let contentUpdateHandler;
let workspaceContentUpdaters = {};
function setContentUpdateHandler(handler) {
  contentUpdateHandler = handler;
}
function getContentStateId(objSpaceId) {
  if ((0,client.isEmptySpaceId)(objSpaceId))
    return "";
  const workspaceId = (0,client.getWorkspaceId)(objSpaceId);
  const contentStateId = contentUpdateHandler ? contentUpdateHandler.getContentStateId(workspaceId) : getState(workspaceId).get();
  return contentStateId || "";
}
function setContentStateId(workspaceId, contentStateId) {
  if (contentUpdateHandler)
    return;
  workspaceContentUpdaterFor(workspaceId).setContentStateIdOrThrowIfTracking(
    contentStateId
  );
}
function trackContentStateId(workspaceId) {
  if (contentUpdateHandler)
    return common/* ScrivitoPromise.resolve */.s8.resolve();
  return workspaceContentUpdaterFor(workspaceId).trackContentStateId();
}
function updateContent(workspaceId) {
  if (contentUpdateHandler)
    return common/* ScrivitoPromise.resolve */.s8.resolve();
  return workspaceContentUpdaterFor(workspaceId).updateContent();
}
function resetContentUpdater() {
  workspaceContentUpdaters = {};
  contentUpdateHandler = void 0;
}
function workspaceContentUpdaterFor(workspaceId) {
  if (!workspaceContentUpdaters[workspaceId]) {
    workspaceContentUpdaters[workspaceId] = new WorkspaceContentUpdater(
      workspaceId,
      getState(workspaceId)
    );
  }
  return workspaceContentUpdaters[workspaceId];
}
function getState(workspaceId) {
  return contentStateIds.subState(workspaceId);
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/in_memory_tenant.ts

const IN_MEMORY_TENANT = "inMemory";
let inMemoryTenant = false;
function isUsingInMemoryTenant() {
  return inMemoryTenant;
}
function useInMemoryTenant() {
  inMemoryTenant = true;
}
function assertNotUsingInMemoryTenant(operationDescription) {
  if (inMemoryTenant) {
    throw new InMemoryTenantUnsupportedOperationError(operationDescription);
  }
}
function resetInMemoryTenant() {
  inMemoryTenant = false;
}
class InMemoryTenantUnsupportedOperationError extends common/* ScrivitoError */.Ix {
  constructor(description) {
    super(`${description} is not supported when using the in-memory tenant`);
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/facet_query.ts





const loadableCollection = new loadable/* LoadableCollection */.X2({
  recordedAs: "facetquery",
  loadElement: ([objSpaceId, facet, query]) => ({
    loader: () => client.cmsRetrieval.retrieveFacetQuery(
      (0,client.getWorkspaceId)(objSpaceId),
      buildRequestParams(facet, query)
    ),
    invalidation: () => (0,loadable/* loadableWithDefault */.qu)(void 0, () => getContentStateId(objSpaceId)) || ""
  })
});
const EMPTY_RESULT = { facets: [[]] };
class FacetQuery {
  constructor(objSpaceId, attribute, options, query) {
    if (!(0,client.isEmptySpaceId)(objSpaceId)) {
      this.loadableData = getData(objSpaceId, attribute, options, query);
    }
  }
  result() {
    assertNotUsingInMemoryTenant("Search API");
    const response = this.loadableData ? this.loadableData.get() : EMPTY_RESULT;
    if (!response)
      return [];
    return response.facets[0].map((facet) => {
      const name = facet.value;
      const count = facet.total;
      const includedObjIds = facet.results.map((result) => result.id);
      return { name, count, includedObjIds };
    });
  }
}
function storeFacetQuery(objSpaceId, attribute, options, query, response) {
  if (!isWorkspaceObjSpaceId(objSpaceId)) {
    throw new Error(
      `Cannot store facet data for space id ${JSON.stringify(objSpaceId)}`
    );
  }
  getData(objSpaceId, attribute, options, query).set(response);
}
function getData(objSpaceId, attribute, options, query) {
  const facet = {
    attribute,
    include_objs: options.includeObjs || 0,
    limit: options.limit || 10
  };
  return loadableCollection.get([objSpaceId, facet, query || []]);
}
function buildRequestParams(facet, query) {
  const params = {
    facets: [facet],
    options: { site_aware: true },
    size: 0
  };
  if (!(0,external_underscore_.isEmpty)(query)) {
    params.query = query;
  }
  return params;
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/suggest.ts



const suggest_loadableCollection = new loadable/* LoadableCollection */.X2({
  recordedAs: "suggest",
  loadElement: ([objSpaceId, params]) => ({
    loader: () => client.cmsRetrieval.retrieveSuggest((0,client.getWorkspaceId)(objSpaceId), params),
    invalidation: () => (0,loadable/* loadableWithDefault */.qu)("", () => getContentStateId(objSpaceId))
  })
});
function suggest(objSpaceId, prefix, options, fromSearch) {
  assertNotUsingInMemoryTenant("Search API");
  const results = [];
  if (!(0,client.isWorkspaceObjSpaceId)(objSpaceId))
    return results;
  const loadableData = getLoadable(objSpaceId, prefix, options, fromSearch);
  return loadableData.getWithDefault({ results }).results;
}
function storeSuggest(objSpaceId, prefix, options, fromSearch, response) {
  getLoadable(objSpaceId, prefix, options, fromSearch).set(response);
}
function getLoadable(objSpaceId, prefix, { attributes, limit }, fromSearch) {
  const backendParams = {
    prefix,
    options: { site_aware: true }
  };
  if (fromSearch)
    backendParams.from_search = fromSearch;
  if (attributes)
    backendParams.fields = attributes;
  if (typeof limit === "number")
    backendParams.limit = limit;
  return suggest_loadableCollection.get([objSpaceId, backendParams]);
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/find_widget_placement.ts



function findWidgetPlacement(objData, widgetId) {
  let placement = findWidgetPlacementIn(objData, widgetId);
  if (placement)
    return placement;
  (0,external_underscore_.find)(objData._widget_pool, (parentWidgetData, parentWidgetId) => {
    if (parentWidgetData) {
      placement = findWidgetPlacementIn(parentWidgetData, widgetId);
      if (placement) {
        placement.parentWidgetId = parentWidgetId;
        return true;
      }
    }
  });
  return placement;
}
function findWidgetPlacementIn(objOrWidgetData, widgetId) {
  let placement;
  (0,external_underscore_.find)(objOrWidgetData, (jsonValue, attributeName) => {
    if (!jsonValue)
      return;
    if ((0,common/* isSystemAttribute */.mb)(attributeName))
      return;
    const attributeJson = jsonValue;
    if (!(0,client.isWidgetAttributeJson)(attributeJson) && !(0,client.isWidgetlistAttributeJson)(attributeJson)) {
      return;
    }
    const attributeValue = attributeJson[1];
    if ((0,external_underscore_.isArray)(attributeValue)) {
      const widgetIds = attributeJson[1];
      if (!widgetIds)
        return;
      const index = widgetIds.indexOf(widgetId);
      if (index !== -1) {
        placement = { attributeName, attributeType: "widgetlist", index };
        return true;
      }
    } else {
      if (widgetId === attributeValue) {
        placement = { attributeName, attributeType: "widget", index: 0 };
        return true;
      }
    }
  });
  return placement;
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/obj_data_store.ts



function preloadObjData(objSpaceId, objId) {
  (0,loadable/* load */.zD)(() => obj_data_store_getObjData(objSpaceId, objId));
}
function createObjData(objSpaceId, objId, attributes) {
  const objData = objDataFor(objSpaceId, objId);
  objData.set(attributes);
  return objData;
}
function setObjData(objSpaceId, objId, primitiveObj) {
  objDataFor(objSpaceId, objId).set(primitiveObj);
}
function obj_data_store_getObjData(objSpaceId, objId) {
  const objData = objDataFor(objSpaceId, objId);
  if (!objData.ensureAvailable())
    return;
  return objData;
}
function objDataFor(objSpaceId, objId) {
  return new ObjData(objSpaceId, objId);
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/get_obj_version.ts


function getObjVersion(objSpaceId, objId) {
  return (0,loadable/* withoutLoading */.vk)(
    () => objDataFor(objSpaceId, objId).getAttribute("_version") || ""
  );
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/disable_obj_replication.ts
let disabled = false;
function isObjReplicationDisabled() {
  return disabled;
}
function disableObjReplication() {
  disabled = true;
}
function enableObjReplication() {
  disabled = false;
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/obj_backend_replication.ts









class ObjBackendReplication {
  constructor(objSpaceId, objId) {
    this.objSpaceId = objSpaceId;
    this.objId = objId;
    this.replicationActive = false;
    this.scheduledReplication = false;
    this.performThrottledReplication = (0,common/* throttle */.P2)(
      () => this.performReplication(),
      1e3
    );
  }
  start() {
    (0,client.retrieveObj)(this.objSpaceId, this.objId, "full").then((data) => {
      (0,state/* addBatchUpdate */.NB)(() => {
        this.notifyBackendState(data);
      });
    });
  }
  notifyLocalState(localState) {
    if (isObjReplicationDisabled())
      return;
    if (isEqualState(this.localState, localState))
      return;
    this.localState = localState;
    this.startReplication();
  }
  notifyBackendState(newBackendState) {
    if (!this.localState) {
      this.backendState = newBackendState;
      this.updateLocalState(newBackendState);
      return;
    }
    const newestKnownBackendState = this.bufferedBackendState || this.backendState;
    if (!newestKnownBackendState || compareStates(newBackendState, newestKnownBackendState) > 0) {
      if (this.replicationActive) {
        this.bufferedBackendState = newBackendState;
      } else {
        if ((0,client.isUnavailableObjJson)(newBackendState)) {
          this.updateLocalState(newBackendState);
        } else {
          this.updateLocalState(
            patchObjJson(
              this.localState,
              diffObjJson(this.backendState, newBackendState)
            )
          );
        }
        this.backendState = newBackendState;
      }
    }
  }
  finishSaving() {
    let finishSavingPromise;
    if (this.nextRequestDeferred) {
      finishSavingPromise = this.nextRequestDeferred.promise;
    } else if (this.currentRequestDeferred) {
      finishSavingPromise = this.currentRequestDeferred.promise;
    } else {
      return common/* ScrivitoPromise.resolve */.s8.resolve();
    }
    return finishSavingPromise.catch(() => common/* ScrivitoPromise.reject */.s8.reject());
  }
  finishReplicating() {
    throw new common/* InternalError */.AQ();
  }
  replicationMessageStream() {
    throw new common/* InternalError */.AQ();
  }
  getLocalState() {
    return this.localState;
  }
  getBackendState() {
    return this.backendState;
  }
  startReplication() {
    if (!isEqualState(this.backendState, this.getLocalObjJson())) {
      if (!this.replicationActive) {
        if (!this.scheduledReplication) {
          this.scheduledReplication = true;
          this.initDeferredForRequest();
          objReplicationPool.writeStarted(this.currentRequestDeferred.promise);
          (0,common/* nextTick */.Y3)(() => this.performThrottledReplication());
        }
      } else if (!this.nextRequestDeferred) {
        this.nextRequestDeferred = new common/* Deferred */.BH();
      }
    } else if (this.nextRequestDeferred) {
      this.nextRequestDeferred.resolve();
      this.nextRequestDeferred = void 0;
    }
  }
  performReplication() {
    const localState = this.getLocalObjJson();
    this.scheduledReplication = false;
    this.replicationActive = true;
    this.replicateLocalStateToBackend(localState).then(
      (backendState) => {
        this.handleBackendUpdate(localState, backendState);
        this.currentRequestDeferred.resolve();
        this.currentRequestDeferred = void 0;
        this.replicationActive = false;
        this.startReplication();
      },
      (error) => {
        this.currentRequestDeferred.reject(error);
        this.currentRequestDeferred = void 0;
        this.replicationActive = false;
      }
    );
  }
  replicateLocalStateToBackend(localState) {
    const patch = diffObjJson(this.backendState, localState);
    return (0,external_underscore_.isEmpty)(patch) ? common/* ScrivitoPromise.resolve */.s8.resolve(this.backendState) : this.replicatePatchToBackend(patch);
  }
  replicatePatchToBackend(patch) {
    const id = (0,client.getWorkspaceId)(this.objSpaceId);
    if (id === "published")
      throw new common/* InternalError */.AQ();
    return client.cmsRestApi.put(`workspaces/${id}/objs/${this.objId}`, {
      obj: patch
    });
  }
  initDeferredForRequest() {
    if (this.nextRequestDeferred) {
      const currentDeferred = this.nextRequestDeferred;
      this.nextRequestDeferred = void 0;
      this.currentRequestDeferred = currentDeferred;
    } else {
      this.currentRequestDeferred = new common/* Deferred */.BH();
    }
  }
  handleBackendUpdate(replicatedState, backendState) {
    this.backendState = newerState(backendState, this.bufferedBackendState);
    this.bufferedBackendState = void 0;
    this.updateLocalState(
      patchObjJson(
        this.backendState,
        diffObjJson(replicatedState, this.getLocalObjJson())
      )
    );
  }
  updateLocalState(localState) {
    this.localState = localState;
    setObjData(this.objSpaceId, this.objId, localState);
  }
  getLocalObjJson() {
    if (this.localState === void 0) {
      throw new common/* InternalError */.AQ();
    }
    return this.localState;
  }
  isRequestInFlight() {
    return this.replicationActive;
  }
}
function isEqualState(stateA, stateB) {
  return (0,external_underscore_.isEmpty)(diffObjJson(stateA, stateB));
}
function newerState(stateA, stateB) {
  if (!stateB)
    return stateA;
  if (compareStates(stateA, stateB) > 0)
    return stateA;
  return stateB;
}
function compareStates(stateA, stateB) {
  return strCompare(stateA._version, stateB._version);
}
function strCompare(str1, str2) {
  if (str1 !== void 0 && str2 !== void 0) {
    if (str1 > str2)
      return 1;
    if (str2 > str1)
      return -1;
  }
  return 0;
}

;// CONCATENATED MODULE: ./scrivito_sdk/replication/version_archive.ts

const START_VERSION = 1;
class VersionArchive {
  constructor() {
    this.archive = {};
  }
  versionForData(data) {
    if (this.currentVersion === void 0) {
      this.currentVersion = START_VERSION;
      this.oldestVersion = START_VERSION;
    } else {
      const lastArchivedData = this.archive[this.currentVersion];
      if (data === lastArchivedData)
        return this.currentVersion;
      this.currentVersion++;
    }
    const newVersionNumber = this.currentVersion;
    this.archive[newVersionNumber] = data;
    return newVersionNumber;
  }
  retrieveVersion(version) {
    if (!this.archive.hasOwnProperty(version))
      throw new VersionNotFoundError();
    return this.archive[version];
  }
  validVersion(version) {
    return this.currentVersion !== void 0 && version >= START_VERSION && version <= this.currentVersion;
  }
  versionCount() {
    return Object.keys(this.archive).length;
  }
  purgeVersionsOlderThan(version) {
    if (this.currentVersion === void 0 || version > this.currentVersion || this.oldestVersion === void 0 || version <= this.oldestVersion) {
      return;
    }
    for (let i = this.oldestVersion; i < version; i++) {
      delete this.archive[i];
    }
    this.oldestVersion = version;
  }
}
class VersionNotFoundError extends common/* ScrivitoError */.Ix {
}

;// CONCATENATED MODULE: ./scrivito_sdk/replication/replication_agent.ts


class ReplicationAgent {
  constructor(localState, mergeFunction, currentlyMyTurn) {
    this.localState = localState;
    this.mergeFunction = mergeFunction;
    this.currentlyMyTurn = currentlyMyTurn;
    this.outgoingMessages = new common/* Subject */.xQ();
    this.acknowledgedVersions = new common/* Subject */.xQ();
    this.localVersionArchive = new VersionArchive();
  }
  currentVersion() {
    return this.localDataAndVersion().currentVersion;
  }
  replicatedVersions() {
    return this.acknowledgedVersions;
  }
  myTurn() {
    return this.currentlyMyTurn;
  }
  versionArchiveSize() {
    return this.localVersionArchive.versionCount();
  }
  handleLocalChange() {
    this.sendCurrentState();
  }
  replicationMessages() {
    return this.outgoingMessages;
  }
  handleIncomingMessage(message) {
    const containedLocalVersion = message.containedReceiverVersion;
    if (containedLocalVersion !== void 0) {
      if (!this.localVersionArchive.validVersion(containedLocalVersion))
        return;
      this.localVersionArchive.purgeVersionsOlderThan(containedLocalVersion);
      this.acknowledgedVersions.next(containedLocalVersion);
    }
    if (this.lastRemoteMove === void 0 && this.currentlyMyTurn)
      return;
    if (!validSuccessorMessage(this.lastRemoteMove, message))
      return;
    if (this.incomingMessageAlreadyContained(message))
      return;
    if (!isSubsequentMove(this.myLastMove, message))
      return;
    this.performMerge(message);
    this.currentlyMyTurn = true;
    this.lastRemoteMove = message;
    this.sendCurrentState();
  }
  performMerge(incomingMessage) {
    const { localData, currentVersion } = this.localDataAndVersion();
    if (incomingMessage.containedReceiverVersion === currentVersion) {
      this.localState.set(incomingMessage.data);
    } else {
      this.localState.set(this.threeWayMerge(localData, incomingMessage));
    }
    this.containedRemoteVersion = incomingMessage.senderVersion;
  }
  threeWayMerge(localData, incomingMessage) {
    const localBaseVersion = incomingMessage.containedReceiverVersion;
    if (!localBaseVersion) {
      return this.mergeFunction(localData, incomingMessage.data);
    }
    return this.mergeFunction(
      localData,
      incomingMessage.data,
      this.localVersionArchive.retrieveVersion(localBaseVersion)
    );
  }
  sendCurrentState() {
    const message = this.messageForCurrentState();
    if (this.currentlyMyTurn && isSubsequentMove(this.lastRemoteMove, message)) {
      this.myLastMove = message;
      this.currentlyMyTurn = false;
    }
    this.outgoingMessages.next(message);
  }
  messageForCurrentState() {
    const { localData, currentVersion } = this.localDataAndVersion();
    if (!this.containedRemoteVersion) {
      return {
        data: localData,
        senderVersion: currentVersion
      };
    }
    return {
      data: localData,
      senderVersion: currentVersion,
      containedReceiverVersion: this.containedRemoteVersion
    };
  }
  incomingMessageAlreadyContained(message) {
    return this.containedRemoteVersion !== void 0 && message.senderVersion <= this.containedRemoteVersion;
  }
  localDataAndVersion() {
    const localData = this.localState.get();
    return {
      localData,
      currentVersion: this.localVersionArchive.versionForData(localData)
    };
  }
}
function isSubsequentMove(previousMove, potentialNextMove) {
  if (previousMove === void 0)
    return true;
  const containsPreviousMove = potentialNextMove.containedReceiverVersion !== void 0 && potentialNextMove.containedReceiverVersion >= previousMove.senderVersion;
  const hasNewVersion = previousMove.containedReceiverVersion === void 0 || previousMove.containedReceiverVersion < potentialNextMove.senderVersion;
  return containsPreviousMove && hasNewVersion;
}
function validSuccessorMessage(previousMessage, nextMessage) {
  if (previousMessage === void 0)
    return true;
  if (nextMessage.senderVersion < previousMessage.senderVersion)
    return false;
  if (previousMessage.containedReceiverVersion === void 0)
    return true;
  return nextMessage.containedReceiverVersion !== void 0 && nextMessage.containedReceiverVersion >= previousMessage.containedReceiverVersion;
}

;// CONCATENATED MODULE: ./scrivito_sdk/replication/replication_process.ts


class ReplicationProcess {
  constructor(localState, remoteMessages, merge, active) {
    this.localState = localState;
    this.remoteMessages = remoteMessages;
    this.outgoingMessages = new common/* BehaviorSubject */.Xe(void 0);
    this.stateChangeCausedByAgent = new common/* ContextContainer */.AY();
    this.replicatedVersions = new common/* BehaviorSubject */.Xe(
      void 0
    );
    this.agent = new ReplicationAgent(
      {
        get: localState.get,
        set: (newData) => {
          this.stateChangeCausedByAgent.runWith(
            true,
            () => this.localState.set(newData)
          );
        }
      },
      merge,
      active
    );
    this.agent.replicationMessages().subscribe(this.outgoingMessages);
    this.agent.replicatedVersions().subscribe(this.replicatedVersions);
  }
  myTurn() {
    return this.agent.myTurn();
  }
  versionArchiveSize() {
    return this.agent.versionArchiveSize();
  }
  subscriberCount() {
    return this.outgoingMessages.subscriberCount();
  }
  finishReplicating() {
    const currentVersion = this.agent.currentVersion();
    return this.replicatedVersions.filter(common/* isPresent */.EN).filter((version) => version >= currentVersion).waitForFirst().then(() => void 0);
  }
  replicationMessages() {
    return new common/* Streamable */.fU((observer) => {
      this.ensureStarted();
      const subscription = this.outgoingMessages.filter(common/* isPresent */.EN).subscribe(observer);
      return () => {
        subscription.unsubscribe();
        if (this.outgoingMessages.subscriberCount() === 0)
          this.ensureStopped();
      };
    });
  }
  ensureStarted() {
    if (this.activeSubscriptions)
      return;
    this.activeSubscriptions = [
      this.localState.changes.subscribe(() => {
        if (this.stateChangeCausedByAgent.current())
          return;
        this.agent.handleLocalChange();
      }),
      this.remoteMessages.subscribe(
        (message) => this.agent.handleIncomingMessage(message)
      )
    ];
    this.agent.handleLocalChange();
  }
  ensureStopped() {
    if (!this.activeSubscriptions)
      return;
    this.activeSubscriptions.forEach(
      (subscription) => subscription.unsubscribe()
    );
    this.activeSubscriptions = void 0;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/replication/index.ts


;// CONCATENATED MODULE: ./scrivito_sdk/data/obj_replication_process.ts






function createObjReplicationProcess(objSpaceId, objId, incomingMessages, role) {
  const batchedMessages = new common/* Streamable */.fU(
    (subscriber) => incomingMessages.subscribe(
      (message) => (0,state/* addBatchUpdate */.NB)(() => subscriber.next(message))
    )
  );
  return new ReplicationProcess(
    localStateForObj(objSpaceId, objId),
    batchedMessages,
    mergeStrategyForRole(role),
    role === "source"
  );
}
function mergeStrategyForRole(role) {
  return role === "consumer" ? assertiveThreeWayMergeObjs : humbleThreeWayMergeObjs;
}
function localStateForObj(objSpaceId, objId) {
  const objData = objDataFor(objSpaceId, objId);
  return {
    get: () => (0,loadable/* loadableWithDefault */.qu)(void 0, () => objData.get()),
    set: (value) => {
      if (value !== void 0)
        objData.set(value);
    },
    changes: (0,loadable/* loadAndObserve */.DU)(() => objData.get()).map(() => {
    })
  };
}
function assertiveThreeWayMergeObjs(myVersion, otherVersion, baseVersion) {
  if (otherVersion === void 0)
    return myVersion;
  if (myVersion === void 0)
    return otherVersion;
  const primaryChanges = diffObjJson(baseVersion, myVersion);
  return patchObjJson(otherVersion, primaryChanges);
}
function humbleThreeWayMergeObjs(myVersion, otherVersion, baseVersion) {
  return assertiveThreeWayMergeObjs(otherVersion, myVersion, baseVersion);
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/id_batch.ts

const FALLBACK_RESPONSE = {
  results: [],
  total: 0
};
class IdBatchCollection {
  constructor({
    recordedAs,
    loadBatch,
    invalidation
  }) {
    this.loadBatch = loadBatch;
    this.loadableCollection = new loadable/* LoadableCollection */.X2({
      recordedAs,
      loadElement: ([params, index], batchSize) => ({
        loader: () => this.loader(params, index, batchSize),
        invalidation: () => invalidation(params)
      })
    });
  }
  getQueryCount(params) {
    return this.getBatch(params, 0, 0).count();
  }
  getBatch(params, batchSize, index) {
    return new IdBatch(
      this.loadableCollection.get([params, index], batchSize),
      this.fakeQuery && this.fakeQuery(params)
    );
  }
  storeBatch(params, index, result) {
    this.loadableCollection.get([params, index]).set(result);
  }
  setupFakeQuery(searchFn) {
    this.fakeQuery = searchFn;
  }
  clearFakeQuery() {
    this.fakeQuery = void 0;
  }
  usesFakeQuery() {
    return !!this.fakeQuery;
  }
  loader(params, index, batchSize) {
    if (index === 0)
      return this.loadBatch(params, void 0, batchSize);
    const previousBatch = this.getBatch(params, batchSize, index - 1);
    return (0,loadable/* load */.zD)(() => previousBatch.continuationForNextBatch()).then(
      (continuation) => {
        if (!continuation) {
          return { results: [], total: -1 };
        }
        return this.loadBatch(params, continuation, batchSize);
      }
    );
  }
}
class IdBatch {
  constructor(data, fakeData) {
    this.data = data;
    this.fakeData = fakeData;
  }
  ids() {
    return this.response().results;
  }
  count() {
    return this.response().total || 0;
  }
  hasNextBatch() {
    return !!this.continuationForNextBatch();
  }
  continuationForNextBatch() {
    return this.response().continuation;
  }
  response() {
    if (this.fakeData && !this.data.isAvailable())
      return this.fakeData;
    return this.data.getWithDefault(FALLBACK_RESPONSE);
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/id_batch_query.ts
class IdBatchQuery {
  constructor(getBatch) {
    this.getBatch = getBatch;
  }
  iterator() {
    return new IdBatchQueryIterator(this.getBatch);
  }
  iteratorFromContinuation(continuation) {
    return new IdBatchQueryIterator(this.getBatch, continuation);
  }
}
class IdBatchQueryIterator {
  constructor(getBatch, continuation) {
    this.getBatch = getBatch;
    this.batchNumber = 0;
    this.currentIndex = 0;
    if (continuation) {
      [this.batchNumber, this.currentIndex] = continuation;
    }
    this.currentBatch = this.getBatch(this.batchNumber);
  }
  next() {
    if (!this.currentBatch)
      return { done: true };
    if (!this.currentIds)
      this.currentIds = this.currentBatch.ids();
    if (this.currentIndex >= this.currentIds.length) {
      this.currentIds = void 0;
      this.currentIndex = 0;
      if (this.currentBatch.hasNextBatch()) {
        this.batchNumber = this.batchNumber + 1;
        this.currentBatch = this.getBatch(this.batchNumber);
      } else {
        this.currentBatch = void 0;
      }
      return this.next();
    }
    if (!this.priorIdIndex) {
      const idIndex = {};
      if (this.batchNumber > 0) {
        const previousBatch = this.getBatch(this.batchNumber - 1);
        previousBatch.ids().forEach((id2) => {
          idIndex[id2] = true;
        });
      }
      const thisBatchPreviousIds = this.currentBatch.ids().slice(0, this.currentIndex);
      thisBatchPreviousIds.forEach((id2) => {
        idIndex[id2] = true;
      });
      this.priorIdIndex = idIndex;
    }
    const id = this.currentIds[this.currentIndex];
    this.currentIndex++;
    if (this.priorIdIndex[id])
      return this.next();
    this.priorIdIndex[id] = true;
    return {
      value: id,
      done: false
    };
  }
  continuation() {
    return this.currentBatch ? [this.batchNumber, this.currentIndex] : void 0;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/obj_query_store.ts











let includeObjs = true;
const batchCollection = new IdBatchCollection({
  recordedAs: "objquery",
  loadBatch,
  invalidation: ([objSpaceId]) => (0,loadable/* loadableWithDefault */.qu)(void 0, () => getContentStateId(objSpaceId)) || ""
});
function resetIncludeObjs() {
  includeObjs = true;
}
const clearFakeObjIdQuery = batchCollection.clearFakeQuery.bind(batchCollection);
const setupFakeObjIdQuery = batchCollection.setupFakeQuery.bind(batchCollection);
const usesFakeObjIdQuery = batchCollection.usesFakeQuery.bind(batchCollection);
const storeObjIdQueryBatch = batchCollection.storeBatch.bind(batchCollection);
function getObjQueryCount(objSpaceId, params) {
  if ((0,client.isEmptySpaceId)(objSpaceId))
    return 0;
  return batchCollection.getQueryCount([objSpaceId, params]);
}
function getObjQuery(objSpaceId, params, batchSize) {
  assertNotUsingInMemoryTenant("Search API");
  if ((0,client.isEmptySpaceId)(objSpaceId))
    return new common/* EmptyContinueIterable */.nj();
  const idQuery = new IdBatchQuery(
    (batchNumber) => batchCollection.getBatch([objSpaceId, params], batchSize, batchNumber)
  );
  return (0,common/* transformContinueIterable */.Sy)(
    idQuery,
    (iterator) => iterator.map((id) => obj_data_store_getObjData(objSpaceId, id)).takeWhile(common/* isPresent */.EN).filter((objData) => !objData.isUnavailable())
  );
}
function loadBatch([objSpaceId, params], continuation, size) {
  const {
    query,
    boost,
    offset,
    orderBy,
    includeDeleted,
    includeEditingAssets
  } = params;
  const requestParams = {
    query,
    options: { site_aware: true },
    size,
    continuation,
    include_objs: includeObjs,
    boost,
    offset,
    order_by: orderBy
  };
  if (includeDeleted)
    requestParams.options.include_deleted = true;
  if (includeEditingAssets) {
    requestParams.options.include_editing_assets = true;
  }
  const workspaceId = (0,client.getWorkspaceId)(objSpaceId);
  return client.cmsRetrieval.retrieveObjQuery(workspaceId, requestParams).then((response) => {
    includeObjs = false;
    const includedObjs = response.objs;
    (0,state/* addBatchUpdate */.NB)(() => {
      if (includedObjs) {
        includedObjs.forEach((objJson) => {
          objReplicationPool.get(objSpaceId, objJson._id).notifyBackendState(objJson);
        });
      }
      response.results.forEach((id) => preloadObjData(objSpaceId, id));
    });
    return {
      results: response.results,
      total: response.total,
      continuation: response.continuation
    };
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/obj_stream_replication.ts


let objReplicationEndpoint;
function setObjStreamReplicationEndpoint(endpoint) {
  objReplicationEndpoint = endpoint;
}
class ObjStreamReplication {
  constructor(objSpaceId, objId) {
    this.objSpaceId = objSpaceId;
    this.objId = objId;
    this.runningEnsured = false;
    this.replicationProcess = createObjReplicationProcess(
      objSpaceId,
      objId,
      getEndpoint().objReplicationMessageStream(objSpaceId, objId),
      "consumer"
    );
  }
  processSubscriberCount() {
    return this.replicationProcess.subscriberCount();
  }
  notifyLocalState() {
    this.ensureRunning();
  }
  notifyBackendState(_data) {
  }
  finishReplicating() {
    return this.replicationProcess.finishReplicating();
  }
  finishSaving() {
    return this.finishReplicating().then(
      () => getEndpoint().finishSavingObj(this.objSpaceId, this.objId)
    );
  }
  replicationMessageStream() {
    return this.replicationProcess.replicationMessages();
  }
  start() {
    this.ensureRunning();
  }
  ensureRunning() {
    if (this.runningEnsured)
      return;
    this.replicationProcess.replicationMessages().subscribe(() => 0);
    this.runningEnsured = true;
  }
}
function getEndpoint() {
  if (!objReplicationEndpoint) {
    throw new common/* InternalError */.AQ();
  }
  return objReplicationEndpoint;
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/obj_field_diffs_data.ts




const obj_field_diffs_data_loadableCollection = new loadable/* LoadableCollection */.X2({
  loadElement: ([from, to, objId]) => ({
    loader: () => client.cmsRetrieval.retrieveObjFieldDiffs(from, to, objId),
    invalidation: () => `${getVersion(from, objId)}:${getVersion(to, objId)}`
  })
});
function getFieldDiff(from, to, attributeName, objId, widgetId) {
  const fieldDiffs = getFieldDiffs(from, to, objId, widgetId);
  const typeAndDiff = fieldDiffs[(0,common/* underscore */.It)(attributeName)];
  if (!typeAndDiff)
    return null;
  return typeAndDiff[1];
}
function getFieldDiffs(from, to, objId, widgetId) {
  if ((0,common/* equals */.fS)(from, to))
    return {};
  const objFieldDiffs = obj_field_diffs_data_loadableCollection.get([from, to, objId]).getWithDefault({});
  if (widgetId) {
    const widgetPool = objFieldDiffs._widget_pool;
    return widgetPool && widgetPool[widgetId] || {};
  }
  return objFieldDiffs;
}
function isWidgetlistDiff(diff) {
  return !!diff && diff.format === "widgetlist_diff";
}
function storeObjFieldDiffs(diffs, objId, [from, to]) {
  obj_field_diffs_data_loadableCollection.get([from, to, objId]).set(diffs);
}
function getVersion(objSpaceId, objId) {
  return (0,client.isWorkspaceObjSpaceId)(objSpaceId) ? getObjVersion(objSpaceId, objId) : "";
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/get_widget_modification.ts


function getWidgetModification(fromObjSpaceId, toObjSpaceId, objId, widgetId) {
  const objDataBefore = obj_data_store_getObjData(fromObjSpaceId, objId);
  const objDataAfter = obj_data_store_getObjData(toObjSpaceId, objId);
  if (!objDataBefore || !objDataAfter) {
    return null;
  }
  if (objDataBefore.isUnavailable() && objDataAfter.isUnavailable()) {
    return null;
  }
  if (objDataBefore.isUnavailable() && !objDataAfter.isUnavailable()) {
    return "new";
  }
  if (!objDataBefore.isUnavailable() && objDataAfter.isUnavailable()) {
    return "deleted";
  }
  return getModificationForWidget(objDataBefore, objDataAfter, widgetId);
}
function getModificationForWidget(objDataBefore, objDataAfter, widgetId) {
  const widgetJsonBefore = objDataBefore.getWidgetWithBadPerformance(widgetId);
  const widgetJsonAfter = objDataAfter.getWidgetWithBadPerformance(widgetId);
  if (widgetJsonBefore) {
    if (widgetJsonAfter) {
      return hasWidgetContentDiff(widgetJsonBefore, widgetJsonAfter) ? "edited" : null;
    }
    return "deleted";
  } else {
    return widgetJsonAfter ? "new" : null;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/is_attribute_modified.ts


function isAttributeModified(attribute, comparison, objId, widgetId) {
  return widgetId ? isWidgetAttributeModified(attribute, comparison, objId, widgetId) : isObjAttributeModified(attribute, comparison, objId);
}
function isObjAttributeModified(attribute, [fromObjSpaceId, toObjSpaceId], objId) {
  const objDataBefore = getObjDataIfExistent(fromObjSpaceId, objId);
  const objDataAfter = getObjDataIfExistent(toObjSpaceId, objId);
  if (!objDataBefore || !objDataAfter)
    return false;
  return !isEqual(
    objDataBefore.getAttribute(attribute),
    objDataAfter.getAttribute(attribute)
  );
}
function isWidgetAttributeModified(attribute, [fromObjSpaceId, toObjSpaceId], objId, widgetId) {
  const objDataBefore = getObjDataIfExistent(fromObjSpaceId, objId);
  const objDataAfter = getObjDataIfExistent(toObjSpaceId, objId);
  if (!objDataBefore || !objDataAfter)
    return false;
  if (!objDataBefore.widgetExists(widgetId) || !objDataAfter.widgetExists(widgetId)) {
    return false;
  }
  return !isEqual(
    objDataBefore.getWidgetAttribute(widgetId, attribute),
    objDataAfter.getWidgetAttribute(widgetId, attribute)
  );
}
function getObjDataIfExistent(objSpaceId, objId) {
  const objData = getObjData(objSpaceId, objId);
  if (objData && !objData.isUnavailable() && !objData.isForbidden()) {
    return objData;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/index.ts

























/***/ }),

/***/ 2878:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Gd": () => (/* reexport */ DataClass),
  "zw": () => (/* reexport */ DataItem),
  "s4": () => (/* reexport */ DataLocator),
  "BL": () => (/* reexport */ DataLocatorError),
  "Cc": () => (/* reexport */ DataScope),
  "Vb": () => (/* reexport */ EmptyDataScope),
  "Zv": () => (/* reexport */ ExternalDataClass),
  "Gc": () => (/* reexport */ allCustomAttributesOfTypeString),
  "KP": () => (/* reexport */ allExternalDataClasses),
  "ED": () => (/* reexport */ applyDataLocator),
  "kn": () => (/* reexport */ assertValidDataIdentifier),
  "ae": () => (/* reexport */ dataContextFromQueryParams),
  "vG": () => (/* reexport */ dataItemFromPojo),
  "DT": () => (/* reexport */ dataScopeFromPojo),
  "m0": () => (/* reexport */ disableExternalDataLoading),
  "KT": () => (/* reexport */ getDataClassOrThrow),
  "dE": () => (/* reexport */ getDataContextParameters),
  "MW": () => (/* reexport */ getDataContextQuery),
  "d$": () => (/* reexport */ getGlobalDataItems),
  "Fv": () => (/* reexport */ isDataItemPojo),
  "__": () => (/* reexport */ isDataScopePojo),
  "aG": () => (/* reexport */ isSinglePlaceholder),
  "m3": () => (/* reexport */ isValidDataIdentifier),
  "GO": () => (/* reexport */ objsFromDataLocator),
  "C8": () => (/* reexport */ provideExternalDataItem),
  "O0": () => (/* reexport */ replacePlaceholdersWithData),
  "ZV": () => (/* reexport */ setExternalDataConnection),
  "Yc": () => (/* reexport */ toDataContext)
});

// UNUSED EXPORTS: ExternalDataItem, ExternalDataScope, ObjDataScope, getDataContextValue, isDataLocatorValueFilter, isDataLocatorValueVia, isDataLocatorValueViaFilter, isValidDataId

// EXTERNAL MODULE: ./scrivito_sdk/realm/index.ts + 22 modules
var realm = __webpack_require__(5932);
;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/basic_obj_to_data_context.ts
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};

function basicObjToDataContext(obj) {
  return __spreadValues({
    _class: obj.objClass(),
    _id: obj.id()
  }, allCustomAttributesOfTypeString(obj));
}
function allCustomAttributesOfTypeString(obj) {
  const schema = (0,realm/* schemaFromBasicObjOrWidget */.cv)(obj);
  if (!schema)
    return;
  const attributes = schema.attributes();
  const stringAttributes = {};
  Object.keys(attributes).forEach((attributeName) => {
    const [attributeType] = attributes[attributeName];
    if (attributeType === "string") {
      const attributeValue = obj.get(attributeName, "string");
      stringAttributes[attributeName] = attributeValue;
    }
  });
  return stringAttributes;
}

// EXTERNAL MODULE: external "underscore"
var external_underscore_ = __webpack_require__(4952);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 45 modules
var common = __webpack_require__(3711);
;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/data_identifier.ts

function assertValidDataIdentifier(key) {
  if (!isValidDataIdentifier(key)) {
    throw new common/* ArgumentError */.ir(`Invalid data identifier "${key}"`);
  }
}
function isValidDataIdentifier(key) {
  return !!key.match(/^[a-z]([a-z0-9]|_(?!_)){0,49}$/i) && key.slice(-1) !== "_";
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/data_class.ts
var data_class_defProp = Object.defineProperty;
var data_class_getOwnPropSymbols = Object.getOwnPropertySymbols;
var data_class_hasOwnProp = Object.prototype.hasOwnProperty;
var data_class_propIsEnum = Object.prototype.propertyIsEnumerable;
var data_class_defNormalProp = (obj, key, value) => key in obj ? data_class_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var data_class_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (data_class_hasOwnProp.call(b, prop))
      data_class_defNormalProp(a, prop, b[prop]);
  if (data_class_getOwnPropSymbols)
    for (var prop of data_class_getOwnPropSymbols(b)) {
      if (data_class_propIsEnum.call(b, prop))
        data_class_defNormalProp(a, prop, b[prop]);
    }
  return a;
};



class DataClass {
}
class DataScope {
  isEmpty() {
    return this.transform({ limit: 1 }).take().length === 0;
  }
  containsData() {
    return !this.isEmpty();
  }
}
const DEFAULT_LIMIT = 20;
class DataItem {
}
function assertValidDataItemAttributes(attributes) {
  if (!(0,external_underscore_.isObject)(attributes)) {
    throw new common/* ArgumentError */.ir("Data item attributes must be an object");
  }
  if (!Object.keys(attributes).every(isValidDataIdentifier)) {
    throw new common/* ArgumentError */.ir(
      "Keys of data item attributes must be valid data identifiers"
    );
  }
}
function assertNoAttributeFilterConflicts(attributes, filters) {
  Object.keys(attributes).forEach((attributeName) => {
    if (filters.hasOwnProperty(attributeName)) {
      const attributeValue = attributes[attributeName];
      const filterValue = filters[attributeName];
      if (attributeValue !== filterValue) {
        throw new common/* ArgumentError */.ir(
          `Tried to create ${attributeName}: ${attributeValue} in a context of ${attributeName}: ${filterValue}`
        );
      }
    }
  });
}
function combineFilters(currFilters, nextFilters) {
  if (!currFilters)
    return nextFilters;
  if (nextFilters) {
    assertNoAttributeFilterConflicts(nextFilters, currFilters);
  }
  return data_class_spreadValues(data_class_spreadValues({}, currFilters), nextFilters);
}
function combineSearches(currSearch, nextSearch) {
  return currSearch && nextSearch ? `${currSearch} ${nextSearch}` : currSearch || nextSearch;
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/data_locator_error.ts

class DataLocatorError extends common/* ArgumentError */.ir {
  constructor(message) {
    super(message);
  }
}

// EXTERNAL MODULE: ./scrivito_sdk/client/index.ts + 29 modules
var client = __webpack_require__(5098);
;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/data_id.ts
function isValidDataId(id) {
  return typeof id === "string" && (!!id.match(/^\d+(-\d+)*$/) || !!id.match(/^[a-f0-9]{8,}(-[a-f0-9]{8,})*$/i));
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/disable_external_data_loading.ts

const isLoadingDisabled = new common/* ContextContainer */.AY();
function disableExternalDataLoading(fn) {
  return isLoadingDisabled.runWith(true, fn);
}
function isExternalDataLoadingDisabled() {
  return isLoadingDisabled.current() || false;
}

// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(9541);
;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/external_data_connection.ts
var external_data_connection_defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var external_data_connection_getOwnPropSymbols = Object.getOwnPropertySymbols;
var external_data_connection_hasOwnProp = Object.prototype.hasOwnProperty;
var external_data_connection_propIsEnum = Object.prototype.propertyIsEnumerable;
var external_data_connection_defNormalProp = (obj, key, value) => key in obj ? external_data_connection_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var external_data_connection_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (external_data_connection_hasOwnProp.call(b, prop))
      external_data_connection_defNormalProp(a, prop, b[prop]);
  if (external_data_connection_getOwnPropSymbols)
    for (var prop of external_data_connection_getOwnPropSymbols(b)) {
      if (external_data_connection_propIsEnum.call(b, prop))
        external_data_connection_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (external_data_connection_hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && external_data_connection_getOwnPropSymbols)
    for (var prop of external_data_connection_getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && external_data_connection_propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};





function assertValidResultItem(resultItem) {
  if (!(0,external_underscore_.isObject)(resultItem)) {
    throw new common/* ArgumentError */.ir("A result item must be an object");
  }
  const _a = resultItem, { _id: id } = _a, data = __objRest(_a, ["_id"]);
  if (!isValidDataId(id)) {
    throw new common/* ArgumentError */.ir(
      '"id" key of a result object must contain a valid data ID'
    );
  }
  if (!(0,external_underscore_.isEmpty)(data))
    assertValidDataItemAttributes(data);
}
const connectionsState = (0,state/* createStateContainer */.JH)();
function setExternalDataConnection(name, connection) {
  connectionsState.set(__spreadProps(external_data_connection_spreadValues({}, connectionsState.get()), {
    [name]: connection
  }));
}
function getExternalDataConnection(name) {
  const connections = connectionsState.get();
  if (connections)
    return connections[name];
}
function getExternalDataConnectionNames() {
  const connections = connectionsState.get();
  return connections ? Object.keys(connections) : [];
}
function getExternalDataConnectionOrThrow(name) {
  const connection = getExternalDataConnection(name);
  if (!connection) {
    throw new common/* ScrivitoError */.Ix(`Missing data class with name ${name}`);
  }
  return connection;
}

// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 23 modules
var loadable = __webpack_require__(9246);
;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/external_data.ts
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};








function setExternalData(dataClass, dataId, data) {
  assertExternalData(data, dataClass);
  loadableCollection.get([dataClass, dataId]).set(data);
}
function getExternalData(dataClass, dataId) {
  if (isExternalDataLoadingDisabled())
    return void 0;
  return loadableCollection.get([dataClass, dataId]).get();
}
const loadableCollection = new loadable/* LoadableCollection */.X2({
  loadElement: ([dataClass, dataId]) => ({
    loader: () => __async(void 0, null, function* () {
      if (!isValidDataId(dataId)) {
        throw new common/* ArgumentError */.ir(`Invalid data ID "${dataId}"`);
      }
      const connection = getExternalDataConnectionOrThrow(dataClass);
      let unknownValue;
      try {
        unknownValue = yield connection.get(dataId);
      } catch (error) {
        if (error instanceof client.ClientError && error.code === "404")
          return null;
        throw error;
      }
      assertExternalData(unknownValue, dataClass);
      return unknownValue;
    })
  })
});
function assertExternalData(data, dataClass) {
  if (data === null)
    return;
  if (!(0,external_underscore_.isObject)(data)) {
    throw new common/* ArgumentError */.ir(
      `"GetCallback" of the connection of the data class ${dataClass} returned neither an object nor null`
    );
  }
  Object.keys(data).forEach((key) => {
    if (!isValidDataIdentifier(key)) {
      throw new common/* ArgumentError */.ir(`Invalid data identifier ${key}`);
    }
  });
}

// EXTERNAL MODULE: ./scrivito_sdk/data/index.ts + 28 modules
var data = __webpack_require__(9241);
;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/index_params.ts
var index_params_defProp = Object.defineProperty;
var index_params_defProps = Object.defineProperties;
var index_params_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var index_params_getOwnPropSymbols = Object.getOwnPropertySymbols;
var index_params_hasOwnProp = Object.prototype.hasOwnProperty;
var index_params_propIsEnum = Object.prototype.propertyIsEnumerable;
var index_params_defNormalProp = (obj, key, value) => key in obj ? index_params_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var index_params_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (index_params_hasOwnProp.call(b, prop))
      index_params_defNormalProp(a, prop, b[prop]);
  if (index_params_getOwnPropSymbols)
    for (var prop of index_params_getOwnPropSymbols(b)) {
      if (index_params_propIsEnum.call(b, prop))
        index_params_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var index_params_spreadProps = (a, b) => index_params_defProps(a, index_params_getOwnPropDescs(b));
class IndexParams {
  constructor(_continuation, _params) {
    this._continuation = _continuation;
    this._params = _params;
  }
  continuation() {
    return this._continuation;
  }
  filters() {
    return Object.entries(this._params.filters || {}).reduce(
      (nextFilters, [attributeName, attributeValue]) => attributeName ? index_params_spreadProps(index_params_spreadValues({}, nextFilters), { [attributeName]: attributeValue }) : nextFilters,
      {}
    );
  }
  search() {
    return this._params.search || "";
  }
  order() {
    return (this._params.order || []).filter(
      ([attributeName]) => !!attributeName
    );
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/external_data_query.ts
var external_data_query_getOwnPropSymbols = Object.getOwnPropertySymbols;
var external_data_query_hasOwnProp = Object.prototype.hasOwnProperty;
var external_data_query_propIsEnum = Object.prototype.propertyIsEnumerable;
var external_data_query_objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (external_data_query_hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && external_data_query_getOwnPropSymbols)
    for (var prop of external_data_query_getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && external_data_query_propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var external_data_query_async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};










const writeCounterStates = {};
const batchCollection = new data/* IdBatchCollection */.Tk({
  recordedAs: "externaldataquery",
  loadBatch,
  invalidation: ([dataClass]) => (0,loadable/* loadableWithDefault */.qu)(
    void 0,
    () => getWriteCounter(dataClass).toString()
  ) || ""
});
function getExternalDataQuery({
  dataClass,
  filters,
  search,
  order
}) {
  if (isExternalDataLoadingDisabled())
    return new common/* EmptyContinueIterable */.nj();
  const idQuery = new data/* IdBatchQuery */.hH(
    (batchNumber) => batchCollection.getBatch(
      [dataClass, filters, search, order],
      -1,
      batchNumber
    )
  );
  return (0,common/* transformContinueIterable */.Sy)(
    idQuery,
    (iterator) => iterator.map((idOrItem) => toDataResult(idOrItem, dataClass)).takeWhile(({ data }) => data !== void 0).filter(({ data }) => data !== null).map(({ id }) => id)
  );
}
function notifyExternalDataWrite(dataClass) {
  const counterState = getOrCreateWriteCounterState(dataClass);
  const counter = getWriteCounter(dataClass);
  counterState.set(counter + 1);
}
function loadBatch(_0, _1) {
  return external_data_query_async(this, arguments, function* ([dataClass, filters, search, order], continuation) {
    const indexCallback = getIndexCallback(dataClass);
    const result = yield indexCallback(
      new IndexParams(continuation, { filters, search, order })
    );
    assertValidIndexResult(result);
    const dataIds = handleResults(result.results, dataClass);
    return {
      continuation: result.continuation,
      results: dataIds
    };
  });
}
function assertValidIndexResult(result) {
  if (!(0,external_underscore_.isObject)(result)) {
    throw new common/* ArgumentError */.ir("An index result must be an object");
  }
  const { results, continuation } = result;
  if (!Array.isArray(results)) {
    throw new common/* ArgumentError */.ir("Results of an index result must be an array");
  }
  if (continuation !== void 0) {
    if (typeof continuation !== "string") {
      throw new common/* ArgumentError */.ir(
        "Continuation of an index result must be a string or undefined"
      );
    }
    if (continuation.length === 0) {
      throw new common/* ArgumentError */.ir(
        "Continuation of an index result must be a non-empty string or undefined"
      );
    }
  }
}
function handleResults(results, dataClass) {
  return results.map((idOrItem) => {
    if (typeof idOrItem === "string") {
      assertValidDataId(idOrItem);
      return handleDataId(dataClass, idOrItem);
    }
    if ((0,external_underscore_.isObject)(idOrItem)) {
      assertValidResultItem(idOrItem);
      return handleResultItem(dataClass, idOrItem);
    }
    throw new common/* ArgumentError */.ir(
      "Results of an index result must contain either strings or objects"
    );
  });
}
function assertValidDataId(dataId) {
  if (!isValidDataId(dataId)) {
    throw new common/* ArgumentError */.ir(
      "Strings in results of an index result must be valid data IDs"
    );
  }
}
function handleDataId(dataClass, dataId) {
  preloadExternalData(dataClass, dataId);
  return dataId;
}
function handleResultItem(dataClass, resultItem) {
  const _a = resultItem, { _id: id } = _a, data = external_data_query_objRest(_a, ["_id"]);
  setExternalData(dataClass, id, data);
  return id;
}
function preloadExternalData(dataClass, id) {
  (0,loadable/* load */.zD)(() => getExternalData(dataClass, id));
}
function getIndexCallback(dataClass) {
  const indexCallback = getExternalDataConnectionOrThrow(dataClass).index;
  if (!indexCallback) {
    throw new common/* ArgumentError */.ir(
      `No index callback defined for data class "${dataClass}"`
    );
  }
  return indexCallback;
}
function getWriteCounter(dataClass) {
  const counterState = getOrCreateWriteCounterState(dataClass);
  const counter = counterState.get() || 0;
  return counter;
}
function getOrCreateWriteCounterState(dataClass) {
  let counterState = writeCounterStates[dataClass];
  if (!counterState) {
    counterState = (0,state/* createStateContainer */.JH)();
    writeCounterStates[dataClass] = counterState;
  }
  return counterState;
}
function toDataResult(idOrItem, dataClass) {
  if (typeof idOrItem === "string") {
    return { id: idOrItem, data: getExternalData(dataClass, idOrItem) };
  }
  const _a = idOrItem, { _id: id } = _a, data = external_data_query_objRest(_a, ["_id"]);
  return { id, data };
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/external_data_class.ts
var external_data_class_defProp = Object.defineProperty;
var external_data_class_getOwnPropSymbols = Object.getOwnPropertySymbols;
var external_data_class_hasOwnProp = Object.prototype.hasOwnProperty;
var external_data_class_propIsEnum = Object.prototype.propertyIsEnumerable;
var external_data_class_defNormalProp = (obj, key, value) => key in obj ? external_data_class_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var external_data_class_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (external_data_class_hasOwnProp.call(b, prop))
      external_data_class_defNormalProp(a, prop, b[prop]);
  if (external_data_class_getOwnPropSymbols)
    for (var prop of external_data_class_getOwnPropSymbols(b)) {
      if (external_data_class_propIsEnum.call(b, prop))
        external_data_class_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var external_data_class_objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (external_data_class_hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && external_data_class_getOwnPropSymbols)
    for (var prop of external_data_class_getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && external_data_class_propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var external_data_class_async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};







class ExternalDataClass extends DataClass {
  constructor(_name) {
    super();
    this._name = _name;
  }
  name() {
    return this._name;
  }
  create(attributes) {
    return external_data_class_async(this, null, function* () {
      return this.all().create(attributes);
    });
  }
  all() {
    return new ExternalDataScope(this);
  }
  get(id) {
    return getExternalData(this._name, id) ? new ExternalDataItem(this, id) : null;
  }
  getUnchecked(id) {
    return new ExternalDataItem(this, id);
  }
}
function isExternalDataClassProvided(name) {
  return !!getExternalDataConnection(name);
}
function allExternalDataClasses() {
  return getExternalDataConnectionNames().map(
    (name) => new ExternalDataClass(name)
  );
}
class ExternalDataScope extends DataScope {
  constructor(_dataClass, _params = {}) {
    super();
    this._dataClass = _dataClass;
    this._params = _params;
  }
  dataClass() {
    return this._dataClass;
  }
  create(attributes) {
    return external_data_class_async(this, null, function* () {
      this.assertNoIdFilter();
      assertValidDataItemAttributes(attributes);
      const { filters } = this._params;
      if (filters) {
        assertNoAttributeFilterConflicts(attributes, filters);
      }
      const createCallback = this.getCreateCallback();
      const dataForCallback = external_data_class_spreadValues(external_data_class_spreadValues({}, attributes), filters);
      const result = yield createCallback(dataForCallback);
      assertValidResultItem(result);
      const dataClassName = this.dataClassName();
      const _a = result, { _id: id } = _a, dataFromCallback = external_data_class_objRest(_a, ["_id"]);
      setExternalData(
        dataClassName,
        id,
        !(0,external_underscore_.isEmpty)(dataFromCallback) && dataFromCallback || dataForCallback
      );
      notifyExternalDataWrite(dataClassName);
      return new ExternalDataItem(this._dataClass, id);
    });
  }
  get(id) {
    const dataItem = this._dataClass.get(id);
    if (!dataItem)
      return null;
    const { filters } = this._params;
    if (!filters)
      return dataItem;
    const hasConflict = Object.keys(filters).some((attributeName) => {
      const dataItemValue = dataItem.get(attributeName);
      const filterValue = filters[attributeName];
      return dataItemValue !== filterValue;
    });
    return hasConflict ? null : dataItem;
  }
  take() {
    var _a;
    return (0,common/* extractFromIterator */.W)(
      this.getIterator(),
      (_a = this._params.limit) != null ? _a : DEFAULT_LIMIT
    );
  }
  transform({ filters, search, order, limit }) {
    return new ExternalDataScope(this._dataClass, {
      filters: combineFilters(this._params.filters, filters),
      search: combineSearches(this._params.search, search),
      order: order || this._params.order,
      limit: limit != null ? limit : this._params.limit
    });
  }
  objSearch() {
    return;
  }
  toPojo() {
    return external_data_class_spreadValues({
      dataClass: this.dataClassName()
    }, this._params);
  }
  dataClassName() {
    return this._dataClass.name();
  }
  getCreateCallback() {
    const dataClassName = this.dataClassName();
    const createCallback = getConnection(dataClassName).create;
    if (!createCallback) {
      throw new common/* ArgumentError */.ir(
        `No create callback defined for data class "${dataClassName}"`
      );
    }
    return createCallback;
  }
  getIterator() {
    return (0,common/* transformContinueIterable */.Sy)(
      getExternalDataQuery(this.toPojo()),
      (iterator) => iterator.map((dataId) => new ExternalDataItem(this._dataClass, dataId))
    ).iterator();
  }
  assertNoIdFilter() {
    const { filters } = this._params;
    if (filters && Object.keys(filters).includes("_id")) {
      throw new common/* ArgumentError */.ir(
        `Cannot create a ${this.dataClassName()} from a scope that includes "_id" in its filters`
      );
    }
  }
}
class ExternalDataItem extends DataItem {
  constructor(_dataClass, _dataId) {
    super();
    this._dataClass = _dataClass;
    this._dataId = _dataId;
  }
  id() {
    return this._dataId;
  }
  dataClass() {
    return this._dataClass;
  }
  obj() {
    return;
  }
  get(attributeName) {
    const externalData = this.getExternalData();
    return (externalData == null ? void 0 : externalData.hasOwnProperty(attributeName)) ? externalData[attributeName] : null;
  }
  update(attributes) {
    return external_data_class_async(this, null, function* () {
      assertValidDataItemAttributes(attributes);
      const externalData = yield (0,loadable/* load */.zD)(() => this.getExternalData());
      if (!externalData) {
        throw new common/* ArgumentError */.ir(`Missing data with ID ${this._dataId}`);
      }
      const updateCallback = this.getUpdateCallback();
      yield updateCallback(this._dataId, attributes);
      setExternalData(this._dataClass.name(), this._dataId, external_data_class_spreadValues(external_data_class_spreadValues({}, externalData), attributes));
      this.notifyWrite();
    });
  }
  destroy() {
    return external_data_class_async(this, null, function* () {
      const deleteCallback = this.getDeleteCallback();
      yield deleteCallback(this._dataId);
      setExternalData(this.dataClassName(), this._dataId, null);
      this.notifyWrite();
    });
  }
  getExternalData() {
    return getExternalData(this.dataClassName(), this._dataId);
  }
  getUpdateCallback() {
    const updateCallback = this.getConnection().update;
    if (!updateCallback) {
      throw new common/* ArgumentError */.ir(
        `No update callback defined for data class "${this.dataClassName()}"`
      );
    }
    return updateCallback;
  }
  getDeleteCallback() {
    const deleteCallback = this.getConnection().delete;
    if (!deleteCallback) {
      throw new common/* ArgumentError */.ir(
        `No delete callback defined for data class "${this.dataClassName()}"`
      );
    }
    return deleteCallback;
  }
  getConnection() {
    return getConnection(this.dataClassName());
  }
  dataClassName() {
    return this._dataClass.name();
  }
  notifyWrite() {
    notifyExternalDataWrite(this.dataClassName());
  }
}
function getConnection(dataClassName) {
  const connection = getExternalDataConnection(dataClassName);
  if (!connection) {
    throw new common/* ArgumentError */.ir(
      `No connection provided for data class "${dataClassName}"`
    );
  }
  return connection;
}

// EXTERNAL MODULE: ./scrivito_sdk/models/index.ts + 34 modules
var models = __webpack_require__(9838);
;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/obj_data_class.ts
var obj_data_class_defProp = Object.defineProperty;
var obj_data_class_getOwnPropSymbols = Object.getOwnPropertySymbols;
var obj_data_class_hasOwnProp = Object.prototype.hasOwnProperty;
var obj_data_class_propIsEnum = Object.prototype.propertyIsEnumerable;
var obj_data_class_defNormalProp = (obj, key, value) => key in obj ? obj_data_class_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var obj_data_class_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (obj_data_class_hasOwnProp.call(b, prop))
      obj_data_class_defNormalProp(a, prop, b[prop]);
  if (obj_data_class_getOwnPropSymbols)
    for (var prop of obj_data_class_getOwnPropSymbols(b)) {
      if (obj_data_class_propIsEnum.call(b, prop))
        obj_data_class_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var obj_data_class_async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};




const SUPPORTED_ATTRIBUTE_TYPES = [
  "boolean",
  "enum",
  "float",
  "integer",
  "multienum",
  "string",
  "stringlist"
];
class ObjDataClass extends DataClass {
  constructor(_name) {
    super();
    this._name = _name;
  }
  name() {
    return this._name;
  }
  create(attributes) {
    return obj_data_class_async(this, null, function* () {
      return this.all().create(attributes);
    });
  }
  all() {
    return new ObjDataScope(this);
  }
  get(id) {
    const obj = getDataObj(this, id);
    return obj ? new ObjDataItem(this, id) : null;
  }
  getUnchecked(id) {
    return new ObjDataItem(this, id);
  }
}
function getDataObj(dataClass, dataId) {
  return (0,models/* getObjFrom */.R2)(objClassScope(dataClass).and(models/* excludeDeletedObjs */.E2), dataId);
}
class ObjDataScope extends DataScope {
  constructor(_dataClass, _params = {}) {
    super();
    this._dataClass = _dataClass;
    this._params = _params;
  }
  dataClass() {
    return this._dataClass;
  }
  create(attributes) {
    return obj_data_class_async(this, null, function* () {
      this.assertNoConflictsWithFilters(attributes);
      const obj = (0,models/* createObjIn */.f_)(
        this.objClassScope(),
        prepareAttributes(
          obj_data_class_spreadValues(obj_data_class_spreadValues({}, attributes), this._params.filters),
          this._dataClass.name()
        )
      );
      yield obj.finishSaving();
      return this.wrapInDataItem(obj);
    });
  }
  get(id) {
    const [obj] = this.getSearch().and("_id", "equals", id).take(1);
    if (!obj)
      return null;
    return this.wrapInDataItem(obj);
  }
  take() {
    var _a;
    return this.getSearch().take((_a = this._params.limit) != null ? _a : DEFAULT_LIMIT).map((obj) => this.wrapInDataItem(obj));
  }
  transform({ filters, search, order, limit }) {
    return new ObjDataScope(this._dataClass, {
      filters: combineFilters(this._params.filters, filters),
      search: combineSearches(this._params.search, search),
      order: order || this._params.order,
      limit: limit != null ? limit : this._params.limit
    });
  }
  objSearch() {
    return new realm/* ObjSearch */.d_(this.getSearch());
  }
  toPojo() {
    return obj_data_class_spreadValues({
      dataClass: this._dataClass.name()
    }, this._params);
  }
  getSearch() {
    let initialSearch = this.objClassScope().and(models/* excludeDeletedObjs */.E2).search();
    const { filters, search, order: givenOrder } = this._params;
    if (search) {
      initialSearch = initialSearch.and("*", "matches", search);
    }
    if (givenOrder) {
      const order = givenOrder.filter(([attributeName]) => !!attributeName);
      if (order.length)
        initialSearch = initialSearch.order(order);
    }
    if (!filters)
      return initialSearch;
    return Object.keys(filters).reduce(
      (finalSearch, attributeName) => attributeName ? finalSearch.and(attributeName, "equals", filters[attributeName]) : finalSearch,
      initialSearch
    );
  }
  objClassScope() {
    return objClassScope(this._dataClass);
  }
  wrapInDataItem(obj) {
    return new ObjDataItem(this._dataClass, obj.id());
  }
  assertNoConflictsWithFilters(attributes) {
    const { filters } = this._params;
    if (filters) {
      assertNoAttributeFilterConflicts(attributes, filters);
    }
  }
}
class ObjDataItem extends DataItem {
  constructor(_dataClass, _dataId) {
    super();
    this._dataClass = _dataClass;
    this._dataId = _dataId;
  }
  id() {
    return this._dataId;
  }
  dataClass() {
    return this._dataClass;
  }
  obj() {
    return (0,realm/* wrapInAppClass */.pz)(this.getExistingObj());
  }
  get(attributeName) {
    const obj = this.getObj();
    if (!obj)
      return null;
    const typeInfo = getAttributeTypeInfo(this.dataClassName(), attributeName);
    if (!typeInfo)
      return null;
    const [attributeType] = typeInfo;
    if (SUPPORTED_ATTRIBUTE_TYPES.includes(attributeType)) {
      return obj.get(attributeName, typeInfo);
    }
    if (attributeType === "reference") {
      const reference = obj.get(attributeName, "reference");
      if (reference)
        return reference.id();
    }
    return null;
  }
  update(attributes) {
    const obj = this.getExistingObj();
    obj.update(prepareAttributes(attributes, this.dataClassName()));
    return obj.finishSaving();
  }
  destroy() {
    return obj_data_class_async(this, null, function* () {
      const obj = this.getObj();
      if (obj) {
        obj.destroy();
        return obj.finishSaving();
      }
    });
  }
  getExistingObj() {
    const obj = this.getObj();
    if (!obj) {
      throw new common/* ArgumentError */.ir(`Missing obj with ID ${this._dataId}`);
    }
    return obj;
  }
  getObj() {
    if (this._obj === void 0) {
      this._obj = getDataObj(this._dataClass, this._dataId);
    }
    return this._obj;
  }
  dataClassName() {
    return this._dataClass.name();
  }
}
function getAttributeTypeInfo(dataClassName, attributeName) {
  return getSchema(dataClassName).attribute(attributeName);
}
function isObjDataClassProvided(dataClassName) {
  return !!(0,realm/* getClass */.ll)(dataClassName);
}
function getSchema(dataClassName) {
  const objClass = (0,realm/* getClass */.ll)(dataClassName);
  if (!objClass) {
    throw new common/* ArgumentError */.ir(`Class ${dataClassName} does not exist`);
  }
  const schema = realm/* Schema.forClass */.V_.forClass(objClass);
  if (!schema) {
    throw new common/* ArgumentError */.ir(`Class ${dataClassName} has no schema`);
  }
  return schema;
}
function objClassScope(dataClass) {
  return (0,models/* objSpaceScope */.hA)((0,models/* currentObjSpaceId */.GD)()).and(
    (0,models/* restrictToObjClass */.lD)(dataClass.name())
  );
}
function prepareAttributes(attributes, dataClassName) {
  const preparedAttributes = {};
  Object.keys(attributes).forEach((attributeName) => {
    const typeInfo = getAttributeTypeInfo(dataClassName, attributeName);
    if (!typeInfo) {
      throw new common/* ArgumentError */.ir(
        `Attribute ${attributeName} of class ${dataClassName} does not exist`
      );
    }
    const [attributeType] = typeInfo;
    if (!SUPPORTED_ATTRIBUTE_TYPES.includes(attributeType)) {
      throw new common/* ArgumentError */.ir(
        `Attribute ${attributeName} of class ${dataClassName} has unsupported type ${attributeType}`
      );
    }
    preparedAttributes[attributeName] = [attributes[attributeName], typeInfo];
  });
  return preparedAttributes;
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/get_data_class.ts



function getDataClass(dataClassName) {
  return getExternalDataClass(dataClassName) || getObjDataClass(dataClassName);
}
function getDataClassOrThrow(dataClassName) {
  const dataClass = getDataClass(dataClassName);
  if (dataClass)
    return dataClass;
  throw new DataLocatorError(`No "${dataClassName}" found`);
}
function getExternalDataClass(dataClassName) {
  if (isExternalDataClassProvided(dataClassName)) {
    return new ExternalDataClass(dataClassName);
  }
}
function getObjDataClass(dataClassName) {
  if (isObjDataClassProvided(dataClassName)) {
    return new ObjDataClass(dataClassName);
  }
}

// EXTERNAL MODULE: external "urijs"
var external_urijs_ = __webpack_require__(8842);
;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/data_stack.ts
function isDataItemPojo(element) {
  return !!element._id;
}
function isDataScopePojo(element) {
  return !isDataItemPojo(element);
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/external_data_to_data_context.ts
var external_data_to_data_context_defProp = Object.defineProperty;
var external_data_to_data_context_getOwnPropSymbols = Object.getOwnPropertySymbols;
var external_data_to_data_context_hasOwnProp = Object.prototype.hasOwnProperty;
var external_data_to_data_context_propIsEnum = Object.prototype.propertyIsEnumerable;
var external_data_to_data_context_defNormalProp = (obj, key, value) => key in obj ? external_data_to_data_context_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var external_data_to_data_context_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (external_data_to_data_context_hasOwnProp.call(b, prop))
      external_data_to_data_context_defNormalProp(a, prop, b[prop]);
  if (external_data_to_data_context_getOwnPropSymbols)
    for (var prop of external_data_to_data_context_getOwnPropSymbols(b)) {
      if (external_data_to_data_context_propIsEnum.call(b, prop))
        external_data_to_data_context_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
function externalDataToDataContext(data, dataClassName, dataId) {
  return external_data_to_data_context_spreadValues({
    _class: dataClassName,
    _id: dataId
  }, data);
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/global_data.ts
var global_data_defProp = Object.defineProperty;
var global_data_defProps = Object.defineProperties;
var global_data_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var global_data_getOwnPropSymbols = Object.getOwnPropertySymbols;
var global_data_hasOwnProp = Object.prototype.hasOwnProperty;
var global_data_propIsEnum = Object.prototype.propertyIsEnumerable;
var global_data_defNormalProp = (obj, key, value) => key in obj ? global_data_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var global_data_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (global_data_hasOwnProp.call(b, prop))
      global_data_defNormalProp(a, prop, b[prop]);
  if (global_data_getOwnPropSymbols)
    for (var prop of global_data_getOwnPropSymbols(b)) {
      if (global_data_propIsEnum.call(b, prop))
        global_data_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var global_data_spreadProps = (a, b) => global_data_defProps(a, global_data_getOwnPropDescs(b));


const globalContextState = (0,state/* createStateContainer */.JH)();
function provideGlobalData(dataItem) {
  const dataClassName = dataItem.dataClass().name();
  const dataItemId = dataItem.id();
  globalContextState.set(global_data_spreadProps(global_data_spreadValues({}, globalContextState.get()), {
    [dataClassName]: dataItemId
  }));
}
function getGlobalDataItems() {
  const globalContext = globalContextState.get();
  return globalContext ? Object.entries(globalContext).map(
    ([dataClassName, dataId]) => getDataClassOrThrow(dataClassName).get(dataId)
  ).filter((maybeDataItem) => !!maybeDataItem) : [];
}
function getDefaultItemIdForDataClass(dataClassName) {
  var _a;
  return ((_a = globalContextState.get()) == null ? void 0 : _a[dataClassName]) || null;
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/data_context.ts
var data_context_defProp = Object.defineProperty;
var data_context_getOwnPropSymbols = Object.getOwnPropertySymbols;
var data_context_hasOwnProp = Object.prototype.hasOwnProperty;
var data_context_propIsEnum = Object.prototype.propertyIsEnumerable;
var data_context_defNormalProp = (obj, key, value) => key in obj ? data_context_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var data_context_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (data_context_hasOwnProp.call(b, prop))
      data_context_defNormalProp(a, prop, b[prop]);
  if (data_context_getOwnPropSymbols)
    for (var prop of data_context_getOwnPropSymbols(b)) {
      if (data_context_propIsEnum.call(b, prop))
        data_context_defNormalProp(a, prop, b[prop]);
    }
  return a;
};














function isValidDataContextValue(maybeValue) {
  return typeof maybeValue === "string" || maybeValue === void 0;
}
function isValidDataClassName(maybeDataClassName) {
  return typeof maybeDataClassName === "string" && !!maybeDataClassName.match(/^[A-Z][a-zA-Z0-9]{0,49}$/);
}
function getDataContextQuery(objOrLink, dataStack, query) {
  const parameters = getDataContextParameters(objOrLink, dataStack);
  if (parameters) {
    return external_urijs_.buildQuery(
      query ? Object.assign(parameters, external_urijs_.parseQuery(query)) : parameters
    );
  }
  return query;
}
function getDataContextParameters(objOrLink, dataStack) {
  const obj = getObj(objOrLink);
  if (!obj)
    return;
  const objDataClass = obj.dataClass();
  if (!objDataClass)
    return;
  const stackElement = findMatchingItemElement(objDataClass, dataStack);
  let params = dataContextParamsForElement(stackElement, objDataClass);
  if (dataStack.length > 0) {
    obj.ancestors().forEach((ancestor) => {
      const ancestorDataClass = ancestor == null ? void 0 : ancestor.dataClass();
      if (!ancestorDataClass)
        return;
      const ancestorItemElement = findMatchingItemElementInDataStack(
        ancestorDataClass,
        dataStack
      );
      params = data_context_spreadValues(data_context_spreadValues({}, params), dataContextParamsForElement(ancestorItemElement, ancestorDataClass));
    });
  }
  return params;
}
function dataContextParamsForElement(stackElement, dataClass) {
  if (stackElement && stackElement._class === dataClass) {
    return {
      [parameterizeDataClass(dataClass)]: stackElement._id
    };
  }
}
function findMatchingItemElement(dataClassName, dataStack) {
  return findMatchingItemElementInDataStack(dataClassName, dataStack) || findMatchingItemElementInGlobalData(dataClassName);
}
function findMatchingItemElementInDataStack(dataClassName, dataStack) {
  const itemElements = dataStack.filter(isDataItemPojo);
  return itemElements.find((element) => element._class === dataClassName);
}
function findMatchingItemElementInGlobalData(dataClassName) {
  const defaultItemId = getDefaultItemIdForDataClass(dataClassName);
  if (defaultItemId) {
    return {
      _class: dataClassName,
      _id: defaultItemId
    };
  }
}
function dataContextFromQueryParams(obj, params) {
  const dataClassName = obj.dataClass();
  if (!dataClassName)
    return;
  const dataId = getDataId(dataClassName, params);
  if (!isValidDataId(dataId))
    return "unavailable";
  if (isExternalDataClassProvided(dataClassName)) {
    return getDataContextFromExternalData(dataClassName, dataId);
  }
  if (isObjDataClassProvided(dataClassName)) {
    return getDataContextFromObjData(dataClassName, dataId);
  }
}
function getDataId(dataClassName, params) {
  return getDataIdFromParams(dataClassName, params) || getDataIdOfFirstDataItem(dataClassName);
}
function getDataIdFromParams(dataClassName, params) {
  const dataId = params[parameterizeDataClass(dataClassName)];
  if (typeof dataId === "string" && dataId.length > 0)
    return dataId;
}
function getDataIdOfFirstDataItem(dataClassName) {
  const [firstDataItem] = getDataClassOrThrow(dataClassName).all().transform({ limit: 1 }).take();
  if (firstDataItem)
    return firstDataItem.id();
}
function getDataContextFromExternalData(dataClassName, dataId) {
  return getDataContextFrom(
    () => getExternalData(dataClassName, dataId),
    (externalData) => externalDataToDataContext(externalData, dataClassName, dataId)
  );
}
function getDataContextFromObjData(objClassName, objId) {
  return getDataContextFrom(
    () => getBasicObjFrom(objClassName, objId),
    basicObjToDataContext
  );
}
function getDataContextFrom(load, map) {
  const data = (0,loadable/* loadWithDefault */.n4)("loading", load);
  if (data === "loading")
    return "loading";
  if (!data)
    return "unavailable";
  return map(data);
}
function getBasicObjFrom(objClassName, objId) {
  return (0,models/* getObjFrom */.R2)(
    (0,models/* objSpaceScope */.hA)((0,models/* currentObjSpaceId */.GD)()).and((0,models/* restrictToObjClass */.lD)(objClassName)),
    objId
  );
}
function parameterizeDataClass(dataClass) {
  return `${(0,common/* underscore */.It)(dataClass)}_id`;
}
function getObj(objOrLink) {
  if (objOrLink instanceof models/* BasicObj */.Jj)
    return objOrLink;
  if (objOrLink.isInternal()) {
    const obj = objOrLink.obj();
    if (obj instanceof models/* BasicObj */.Jj)
      return obj;
  }
}
function getDataContextValue(identifier, context) {
  if (!isValidDataIdentifier(identifier))
    return void 0;
  const value = context[identifier];
  if (isValidDataContextValue(value))
    return value;
  (0,common/* throwNextTick */.a6)(
    new common/* ArgumentError */.ir(
      `Expected a data context value to be a string or undefined, but got ${value}`
    )
  );
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/to_data_context.ts







function toDataContext(maybeDataContext) {
  if (maybeDataContext instanceof DataItem) {
    return dataItemToDataContext(maybeDataContext);
  }
  if (maybeDataContext instanceof models/* BasicObj */.Jj) {
    return basicObjToDataContext(maybeDataContext);
  }
  return maybeDataContext;
}
function dataItemToDataContext(dataItem) {
  if (dataItem instanceof ObjDataItem) {
    return objDataItemToDataContext(dataItem);
  }
  return externalDataItemToDataContext(dataItem);
}
function objDataItemToDataContext(dataItem) {
  return basicObjToDataContext((0,realm/* unwrapAppClass */.bM)(dataItem.obj()));
}
function externalDataItemToDataContext(dataItem) {
  const _class = dataItem.dataClass().name();
  const _id = dataItem.id();
  const externalData = getExternalData(_class, _id);
  return externalData ? externalDataToDataContext(externalData, _class, _id) : { _class, _id };
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/data_locator.ts

class DataLocator {
  constructor(params) {
    this._class = params.class;
    this._query = params.query;
    this._order_by = params.order_by;
    this._size = params.size;
  }
  class() {
    return this._class;
  }
  query() {
    if (this._query)
      return [...this._query];
  }
  orderBy() {
    if (this._order_by)
      return [...this._order_by];
  }
  size() {
    return this._size;
  }
  transform(params) {
    var _a, _b;
    return new DataLocator({
      class: (_a = params.class) != null ? _a : this._class,
      query: params.query || this.query(),
      order_by: params.order_by || this.orderBy(),
      size: params.size === null ? void 0 : (_b = params.size) != null ? _b : this._size
    });
  }
  toPojo() {
    if (this._class === null)
      return null;
    return {
      class: this._class,
      query: this.query(),
      order_by: this.orderBy(),
      size: this._size
    };
  }
}
function isDataLocatorValueFilter(filter) {
  return (0,external_underscore_.isObject)(filter) && typeof filter.field === "string" && typeof filter.value === "string";
}
function isDataLocatorValueViaFilter(filter) {
  return isObject(filter) && typeof filter.field === "string" && isDataLocatorValueVia(filter.value_via);
}
function isDataLocatorValueVia(valueVia) {
  return isObject(valueVia) && typeof valueVia.class === "string" && typeof valueVia.field === "string";
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/empty_data_scope.ts
var empty_data_scope_async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};


class EmptyDataScope extends DataScope {
  dataClass() {
    return null;
  }
  create(_attributes) {
    return empty_data_scope_async(this, null, function* () {
      throw new common/* ArgumentError */.ir("Cannot create items from an empty data scope");
    });
  }
  get(_id) {
    return null;
  }
  take() {
    return [];
  }
  transform(_params) {
    return new EmptyDataScope();
  }
  filter(_attributeName, _value) {
    return new EmptyDataScope();
  }
  search(_text) {
    return new EmptyDataScope();
  }
  objSearch() {
    return;
  }
  toPojo() {
    return {
      dataClass: null
    };
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/deserialization.ts
var deserialization_getOwnPropSymbols = Object.getOwnPropertySymbols;
var deserialization_hasOwnProp = Object.prototype.hasOwnProperty;
var deserialization_propIsEnum = Object.prototype.propertyIsEnumerable;
var deserialization_objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (deserialization_hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && deserialization_getOwnPropSymbols)
    for (var prop of deserialization_getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && deserialization_propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};


function dataScopeFromPojo(_a) {
  var _b = _a, {
    dataClass
  } = _b, dataScopeParams = deserialization_objRest(_b, [
    "dataClass"
  ]);
  return dataClass ? getDataClassOrThrow(dataClass).all().transform(dataScopeParams) : new EmptyDataScope();
}
function dataItemFromPojo({
  _class: dataClass,
  _id: dataId
}) {
  return getDataClassOrThrow(dataClass).get(dataId) || void 0;
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/apply_data_locator.ts







function applyDataLocator(dataStack, dataLocator) {
  if (!dataLocator)
    return new EmptyDataScope();
  const className = dataLocator.class();
  if (className === null)
    return new EmptyDataScope();
  let dataScope = getDataClassOrThrow(className).all();
  const query = dataLocator.query();
  if (query) {
    dataScope = query.reduce(
      (scope, filter) => applyFilter(scope, filter, dataStack),
      dataScope
    );
  }
  const orderBy = dataLocator.orderBy();
  if (orderBy) {
    dataScope = dataScope.transform({ order: orderBy });
  }
  const size = dataLocator.size();
  if (size !== void 0) {
    dataScope = dataScope.transform({ limit: size });
  }
  return dataScope;
}
function applyFilter(scope, filter, dataStack) {
  return isDataLocatorValueFilter(filter) ? applyValueFilter(scope, filter) : applyValueViaFilter(scope, filter, dataStack);
}
function applyValueFilter(scope, { field, value }) {
  return scope.transform({ filters: { [field]: value } });
}
function applyValueViaFilter(scope, { field, value_via: valueVia }, dataStack) {
  const value = resolveValueVia(valueVia, dataStack);
  if (field === "_id" && !isValidDataId(value)) {
    throw new DataLocatorError(`${value} is not a valid data ID`);
  }
  return applyValueFilter(scope, { field, value });
}
function resolveValueVia({ class: viaClass, field: viaField }, dataStack) {
  const dataItem = findMatchingDataItemOrThrow(viaClass, dataStack);
  if (viaField === "_id")
    return dataItem.id();
  const value = dataItem.get(viaField);
  if (typeof value !== "string") {
    throw new DataLocatorError(
      `Attribute ${viaField} of ${viaClass} must be a string`
    );
  }
  return value;
}
function findMatchingDataItemOrThrow(viaClass, dataStack) {
  const itemElement = findMatchingItemElementOrThrow(viaClass, dataStack);
  const dataItem = dataItemFromPojo(itemElement);
  if (!dataItem) {
    throw new DataLocatorError(
      `No ${viaClass} item with ID ${itemElement._id} found`
    );
  }
  return dataItem;
}
function findMatchingItemElementOrThrow(dataClass, dataStack) {
  if (!dataStack) {
    throw new DataLocatorError(`No ${dataClass} found`);
  }
  const itemElement = findMatchingItemElement(dataClass, dataStack);
  if (!itemElement) {
    throw new DataLocatorError(`No ${dataClass} item found`);
  }
  return itemElement;
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/provide_external_data_item.ts
var provide_external_data_item_async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};





const SINGLE_ID = "0";
function provideExternalDataItem(name, read) {
  const dataClass = new ExternalDataClass(name);
  setExternalDataConnection(name, {
    get: (id) => provide_external_data_item_async(this, null, function* () {
      return readItem(id, read);
    }),
    index: (params) => provide_external_data_item_async(this, null, function* () {
      return readAndFilterItem(params, dataClass);
    })
  });
  const dataItem = dataClass.getUnchecked(SINGLE_ID);
  provideGlobalData(dataItem);
  return dataItem;
}
function readItem(id, read) {
  return provide_external_data_item_async(this, null, function* () {
    return id === SINGLE_ID ? read() : null;
  });
}
function readAndFilterItem(params, dataClass) {
  return provide_external_data_item_async(this, null, function* () {
    const dataItem = yield (0,loadable/* load */.zD)(() => dataClass.get(SINGLE_ID));
    if (!dataItem)
      return { results: [] };
    const filters = params.filters();
    const doesMatch = Object.keys(filters).every(
      (attributeName) => consideredEqual(dataItem.get(attributeName), filters[attributeName])
    );
    return { results: doesMatch ? [SINGLE_ID] : [] };
  });
}
function consideredEqual(itemValue, filterValue) {
  if (itemValue === void 0 || itemValue === null)
    return false;
  if (typeof itemValue === "string")
    return itemValue === filterValue;
  if (Array.isArray(itemValue)) {
    return itemValue.some((element) => element === filterValue);
  }
  throw new common/* ArgumentError */.ir(`Cannot filter on ${typeof itemValue}`);
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/placeholder_replacement.ts


const PLACEHOLDERS = /__([a-z](?:[a-z0-9]|\.[a-z]|_(?!_)){0,100})__/gi;
const SINGLE_PLACEHOLDER = /^__([a-z](?:[a-z0-9]|\.[a-z]|_(?!_)){0,100})__$/i;
function isSinglePlaceholder(text) {
  return !!text.match(SINGLE_PLACEHOLDER);
}
function replacePlaceholdersWithData(text, {
  dataContext,
  dataStack,
  transform
} = {}) {
  return text.replace(PLACEHOLDERS, (placeholder, identifier) => {
    if (identifier.includes(".")) {
      const [className, attributeName] = identifier.split(".");
      return replaceQualifiedPlaceholder(
        className,
        attributeName,
        placeholder,
        dataStack
      );
    }
    const rawValue = getDataContextValue(identifier, dataContext || {});
    if (rawValue === void 0)
      return placeholder;
    return transform ? transform(rawValue) : rawValue;
  });
}
function replaceQualifiedPlaceholder(dataClassName, attributeName, placeholder, dataStack = []) {
  const itemElement = findMatchingItemElement(dataClassName, dataStack);
  if (!itemElement)
    return "";
  const dataClass = getDataClass(dataClassName);
  if (!dataClass)
    return placeholder;
  const dataItem = dataClass.get(itemElement._id);
  if (!dataItem)
    return "";
  const attributeValue = dataItem.get(attributeName);
  if (typeof attributeValue !== "string")
    return placeholder;
  return attributeValue;
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/objs_from_data_locator.ts



function objsFromDataLocator(dataLocator) {
  if (dataLocator.class()) {
    const objSearch = applyDataLocator([], dataLocator).objSearch();
    if (objSearch)
      return objSearch;
  }
  return new realm/* ObjSearch */.d_((0,models/* emptyScope */.Ti)().search());
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/index.ts























/***/ }),

/***/ 3912:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "u$": () => (/* binding */ importFrom)
/* harmony export */ });
/* unused harmony exports provideLoadedEditingModule, isEditingModuleBeingLoaded */
/* harmony import */ var scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9470);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9246);


const moduleLoaders = {
  reactEditing: () => __webpack_require__.e(/* import() */ 226).then(__webpack_require__.bind(__webpack_require__, 2028)),
  editingSupport: () => __webpack_require__.e(/* import() */ 226).then(__webpack_require__.bind(__webpack_require__, 1328))
};
const loadableModules = new scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_0__/* .LoadableCollection */ .X2({
  loadElement: (moduleName) => ({ loader: moduleLoaders[moduleName] })
});
function importFrom(moduleName, symbol) {
  if (!scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .uiAdapter */ .k)
    return;
  const loadable = loadableModules.get(moduleName);
  const loadedModule = loadable.get();
  if (!loadedModule)
    return;
  return loadedModule[symbol];
}
function provideLoadedEditingModule(moduleName, editingModule) {
  loadableModules.get(moduleName).set(editingModule);
}
function isEditingModuleBeingLoaded(moduleName) {
  return loadableModules.get(moduleName).numSubscribers() > 0;
}


/***/ }),

/***/ 8063:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "RY": () => (/* reexport */ OBJ_ID_PATTERN),
  "gu": () => (/* reexport */ finishLinkResolutionFor),
  "fq": () => (/* reexport */ formatInternalLinks),
  "Md": () => (/* reexport */ setUrlResolutionHandler),
  "Gf": () => (/* reexport */ setupWriteMonitorNotification),
  "J2": () => (/* reexport */ startLinkResolutionFor)
});

;// CONCATENATED MODULE: ./scrivito_sdk/link_resolution/format_internal_links.ts
const OBJ_ID_PATTERN = /\bobjid:[a-f0-9]{16}\b/g;
const INTERNAL_LINK_URL_PATTERN = new RegExp(
  `${OBJ_ID_PATTERN.source}[^"']*`,
  "g"
);
function formatInternalLinks(htmlString, format) {
  return htmlString.replace(
    INTERNAL_LINK_URL_PATTERN,
    (internalLinkUrl) => {
      var _a;
      return (_a = format(parseInternalUrl(internalLinkUrl))) != null ? _a : internalLinkUrl;
    }
  );
}
function parseInternalUrl(internalLinkUrl) {
  const url = new URL(internalLinkUrl);
  return {
    obj_id: internalLinkUrl.slice(6, 22),
    query: url.search.slice(1),
    hash: url.hash.slice(1)
  };
}

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 45 modules
var common = __webpack_require__(3711);
;// CONCATENATED MODULE: ./scrivito_sdk/link_resolution/resolve_url.ts

function resolveUrl(url) {
  if (!urlResolutionHandler)
    throw new common/* InternalError */.AQ();
  return urlResolutionHandler(url);
}
let urlResolutionHandler;
function setUrlResolutionHandler(handler) {
  urlResolutionHandler = handler;
}

// EXTERNAL MODULE: ./scrivito_sdk/client/index.ts + 29 modules
var client = __webpack_require__(5098);
// EXTERNAL MODULE: ./scrivito_sdk/data/index.ts + 28 modules
var data = __webpack_require__(9241);
// EXTERNAL MODULE: external "underscore"
var external_underscore_ = __webpack_require__(4952);
// EXTERNAL MODULE: external "urijs"
var external_urijs_ = __webpack_require__(8842);
;// CONCATENATED MODULE: ./scrivito_sdk/link_resolution/content_conversion/resolve_html_url.ts



function resolveHtmlUrl(encodedUrl) {
  const url = (0,external_underscore_.unescape)(encodedUrl);
  const internalUrl = resolveUrl(url);
  if (!internalUrl)
    return null;
  const newUrl = new external_urijs_(`objid:${internalUrl.obj_id}`);
  if (internalUrl.fragment) {
    newUrl.fragment(internalUrl.fragment);
  }
  if (internalUrl.query) {
    newUrl.query(internalUrl.query);
  }
  return (0,external_underscore_.escape)(newUrl.href());
}

;// CONCATENATED MODULE: ./scrivito_sdk/link_resolution/content_conversion.ts
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));


function convertHtml(input) {
  return convertUrls(convertUrls(input, "a", "href"), "img", "src");
}
function convertLinklist(primitiveLinks) {
  return primitiveLinks.map(convertLink);
}
function convertLink(primitiveLink) {
  if (!primitiveLink.url)
    return primitiveLink;
  const internalUrl = resolveUrl(primitiveLink.url);
  if (internalUrl === null)
    return primitiveLink;
  return __spreadProps(__spreadValues({}, primitiveLink), {
    url: null,
    obj_id: internalUrl.obj_id,
    fragment: internalUrl.fragment || null,
    query: internalUrl.query || null
  });
}
function convertUrls(html, tagName, attribute) {
  const regex = new RegExp(
    `<${tagName}\\s+(?:[^>]*?\\s+)?${attribute}=(["'])(.*?)\\1`,
    "gi"
  );
  const convertedHtml = html.replace(
    regex,
    (fullMatch, _subMatch, urlMatch) => {
      if (!urlMatch) {
        return fullMatch;
      }
      const firstChar = urlMatch.charAt(0);
      if (firstChar === "#" || firstChar === "?") {
        return fullMatch;
      }
      if (urlMatch.substr(0, 6) === "objid:") {
        return fullMatch;
      }
      const newUrl = resolveHtmlUrl(urlMatch);
      if (!newUrl)
        return fullMatch;
      return fullMatch.replace(urlMatch, newUrl);
    }
  );
  return convertedHtml;
}

// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 23 modules
var loadable = __webpack_require__(9246);
;// CONCATENATED MODULE: ./scrivito_sdk/link_resolution/link_resolution_worker.ts




function isAnyLinkResolutionAttributeJson(attributeData) {
  return (0,external_underscore_.contains)(["html", "link", "linklist"], attributeData[0]);
}
function runWorker(attributeDataToConvert, objData, attributeName, widgetId) {
  const convertValue = getConversion(attributeDataToConvert);
  const convertedDataWithoutLoading = (0,loadable/* loadableWithDefault */.qu)(
    void 0,
    convertValue
  );
  if (convertedDataWithoutLoading !== void 0) {
    if (!(0,external_underscore_.isEqual)(convertedDataWithoutLoading, attributeDataToConvert)) {
      update(objData, attributeName, widgetId, convertedDataWithoutLoading);
    }
    return common/* ScrivitoPromise.resolve */.s8.resolve();
  }
  return (0,loadable/* load */.zD)(convertValue).then((convertedData) => {
    if ((0,external_underscore_.isEqual)(convertedData, attributeDataToConvert))
      return;
    if (hasDataToConvertBeenChangedConcurrently(
      attributeDataToConvert,
      objData,
      attributeName,
      widgetId
    )) {
      return;
    }
    update(objData, attributeName, widgetId, convertedData);
  });
}
function hasDataToConvertBeenChangedConcurrently(attributeData, objData, attributeName, widgetId) {
  const currentAttributeData = widgetId ? objData.getWidgetAttribute(widgetId, attributeName) : objData.getAttribute(attributeName);
  return !(0,external_underscore_.isEqual)(attributeData, currentAttributeData);
}
function update(objData, attributeName, widgetId, newData) {
  const patch = { [attributeName]: newData };
  if (widgetId) {
    objData.update({
      _widget_pool: {
        [widgetId]: patch
      }
    });
  } else {
    objData.update(patch);
  }
}
function getConversion(attributeData) {
  switch (attributeData[0]) {
    case "html": {
      const attributeValue = attributeData[1];
      return () => ["html", convertHtml(attributeValue)];
    }
    case "link": {
      const attributeValue = attributeData[1];
      return () => ["link", convertLink(attributeValue)];
    }
    case "linklist": {
      const attributeValue = attributeData[1];
      return () => ["linklist", convertLinklist(attributeValue)];
    }
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/link_resolution/link_resolution.ts





let notifyWriteMonitor;
function setupWriteMonitorNotification(notification) {
  if (notifyWriteMonitor) {
    throw new common/* InternalError */.AQ();
  }
  notifyWriteMonitor = notification;
}
let linkResolutions = {};
function startLinkResolutionFor(workspaceId, objId) {
  linkResolutionFor(workspaceId).start(objId);
}
function finishLinkResolutionFor(workspaceId, objId) {
  return linkResolutionFor(workspaceId).finish(objId);
}
function link_resolution_reset() {
  notifyWriteMonitor = void 0;
  linkResolutions = {};
}
function linkResolutionFor(workspaceId) {
  if (!linkResolutions[workspaceId]) {
    linkResolutions[workspaceId] = new LinkResolution([
      "workspace",
      workspaceId
    ]);
  }
  return linkResolutions[workspaceId];
}
class LinkResolution {
  constructor(objSpaceId) {
    this.objSpaceId = objSpaceId;
    this.cache = {};
  }
  start(objId) {
    const promise = (0,loadable/* load */.zD)(() => (0,data/* getObjData */.L7)(this.objSpaceId, objId)).then(
      performResolution
    );
    const priorPromise = this.cache[objId];
    const combinedPromise = priorPromise ? common/* ScrivitoPromise.all */.s8.all([priorPromise, promise]).then(() => void 0) : promise;
    this.cache[objId] = combinedPromise;
    notifyLinkResolutionIsActive(combinedPromise);
  }
  finish(objId) {
    return this.cache[objId] || common/* ScrivitoPromise.resolve */.s8.resolve();
  }
}
function notifyLinkResolutionIsActive(promise) {
  if (!notifyWriteMonitor) {
    throw new common/* InternalError */.AQ();
  }
  notifyWriteMonitor(promise);
}
function performResolution(objData) {
  if (!objData)
    return;
  const objJson = objData.get();
  if (!objJson)
    return;
  const workers = [];
  (0,client.withEachAttributeJson)(objJson, (attributeJson, attributeName, widgetId) => {
    if (!isAnyLinkResolutionAttributeJson(attributeJson))
      return;
    workers.push(runWorker(attributeJson, objData, attributeName, widgetId));
  });
  if (!workers.length)
    return;
  const resolution = common/* ScrivitoPromise.all */.s8.all(workers);
  return resolution.then(() => void 0);
}

;// CONCATENATED MODULE: ./scrivito_sdk/link_resolution/index.ts





/***/ }),

/***/ 9246:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "X2": () => (/* reexport */ LoadableCollection),
  "of": () => (/* reexport */ LoadableData),
  "aj": () => (/* reexport */ LoadingSubscriber),
  "IE": () => (/* reexport */ load_handler_capture),
  "oR": () => (/* reexport */ generateRecording),
  "_$": () => (/* reexport */ isCurrentlyCapturing),
  "zD": () => (/* reexport */ load_load),
  "DU": () => (/* reexport */ loadAndObserve),
  "Mh": () => (/* reexport */ loadRecording),
  "n4": () => (/* reexport */ loadWithDefault),
  "wV": () => (/* reexport */ loadable_function_loadableFunction),
  "qu": () => (/* reexport */ loadableWithDefault),
  "kV": () => (/* reexport */ reportUsedData),
  "zL": () => (/* reexport */ run_and_catch_errors_while_loading_runAndCatchErrorsWhileLoading),
  "vk": () => (/* reexport */ withoutLoading)
});

// UNUSED EXPORTS: CaptureReport, NotLoadedError, flushLoadableStreams, loadAllUntil, loadEntireIterable, loadableMapReduce

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/load_all_until.ts

function loadAllUntil(iterator, size, objs = []) {
  const run = runAndCatchErrorsWhileLoading(() => iterator.next());
  if (!run.allDataLoaded) {
    return { done: false, objs };
  }
  const next = run.result;
  if (next.done || size === 0) {
    return { done: !!next.done, objs };
  }
  return loadAllUntil(iterator, size - 1, objs.concat([next.value]));
}

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 45 modules
var common = __webpack_require__(3711);
;// CONCATENATED MODULE: ./scrivito_sdk/loadable/load_handler.ts

const captureContextContainer = new common/* ContextContainer */.AY();
const currentCaptureList = () => captureContextContainer.current();
function load_handler_capture(fn) {
  const captureList = {
    datas: [],
    incomplete: false,
    outdated: false
  };
  const result = captureContextContainer.runWith(captureList, fn);
  return new CaptureReport(captureList, result);
}
function throwNoLoadingContext() {
  throw new common/* ScrivitoError */.Ix(
    `Content not yet loaded. Forgot to use Scrivito.load or Scrivito.connect? See ${(0,common/* docUrl */.m0)("content-not-yet-loaded-error")}`
  );
}
function isCurrentlyCapturing() {
  return currentCaptureList() !== void 0;
}
function notifyDataRequired(loadingState, data) {
  const captureList = currentCaptureList();
  if (captureList) {
    captureList.datas.push(data);
    if (loadingState === "outdated")
      captureList.outdated = true;
    else if (loadingState === "incomplete")
      captureList.incomplete = true;
  }
}
class CaptureReport {
  constructor(captureList, result) {
    this.captureList = captureList;
    this.outdated = captureList.outdated;
    this.incomplete = captureList.incomplete;
    this.result = result;
  }
  forwardToCurrent() {
    const currentList = currentCaptureList();
    if (!currentList) {
      if (this.incomplete) {
        throwNoLoadingContext();
      }
      return;
    }
    extendList(currentList, this.captureList);
  }
  getRequiredDatas() {
    return this.captureList.datas;
  }
  isAllDataLoaded() {
    return !this.incomplete;
  }
  isAllDataUpToDate() {
    return !this.incomplete && !this.outdated;
  }
  subscribeLoading(subscriber) {
    const unsubscribes = this.captureList.datas.map(
      (data) => data.subscribeLoading()
    );
    subscriber.unsubscribe();
    subscriber.storeUnsubscribe(() => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    });
  }
}
class LoadingSubscriber {
  storeUnsubscribe(unsubscribe) {
    this.unsubscribeCallback = unsubscribe;
  }
  unsubscribe() {
    if (this.unsubscribeCallback) {
      this.unsubscribeCallback();
    }
  }
}
function extendList(target, source) {
  source.datas.forEach((data) => target.datas.push(data));
  target.incomplete = target.incomplete || source.incomplete;
  target.outdated = target.outdated || source.outdated;
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/loadable_state.ts
function getValueOrThrowError(state) {
  throwIfErrorState(state);
  return state.value;
}
function isAvailableState(state) {
  return state.meta.error === void 0;
}
function throwIfErrorState(state) {
  throwIfErrorMeta(state.meta);
}
function throwIfErrorMeta(meta) {
  if (meta.error !== void 0)
    throw meta.error;
}

// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(9541);
;// CONCATENATED MODULE: ./scrivito_sdk/loadable/observe_and_load.ts



function observeAndLoad(loadableExpression) {
  return new common/* Streamable */.fU((observer) => {
    const loadingSubscriber = new LoadingSubscriber();
    const subscription = (0,state/* observe */.N7)(
      () => load_handler_capture(() => (0,common/* runAndCatchException */.fX)(loadableExpression))
    ).subscribe((captured) => {
      captured.subscribeLoading(loadingSubscriber);
      const outcome = captured.result;
      observer.next(
        outcome.errorThrown ? {
          meta: {
            error: outcome.error,
            incomplete: captured.incomplete,
            outdated: captured.outdated
          }
        } : {
          value: outcome.result,
          meta: {
            incomplete: captured.incomplete,
            outdated: captured.outdated
          }
        }
      );
    });
    return () => {
      subscription.unsubscribe();
      loadingSubscriber.unsubscribe();
    };
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/load.ts




function load_load(loadableFunction, ...excessArgs) {
  checkLoad(loadableFunction, ...excessArgs);
  return observeAndLoad(
    () => (0,state/* withFrozenState */.sc)(
      {
        contextName: "Scrivito.load",
        message: "Use an async callback: Scrivito.load(/* ... */).then(/* ... */)."
      },
      loadableFunction
    )
  ).filter((observed) => !observed.meta.incomplete && !observed.meta.outdated).waitForFirst().then(getValueOrThrowError);
}
const checkLoad = (0,common/* checkArgumentsFor */.PJ)(
  "load",
  [["loadableFunction", common/* tcomb.Function */.pC.Function]],
  {
    docPermalink: "js-sdk/load"
  }
);

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/loader_callback_process.ts


let loadIdCounter = 0;
class LoaderCallbackProcess {
  constructor(stateContainer, loader, invalidation) {
    this.stateContainer = stateContainer;
    this.loader = loader;
    this.invalidation = invalidation;
  }
  notifyDataRequired() {
    this.triggerLoadingIfNeeded();
  }
  notifyDataNoLongerRequired() {
  }
  notifyDataWasSet() {
    this.currentLoad = void 0;
  }
  setTidyCallback() {
  }
  triggerLoadingIfNeeded() {
    if (this.isLoading())
      return;
    const versionWhenLoadingStarted = versionFromCallback(this.invalidation);
    if (!this.loadingNeeded(versionWhenLoadingStarted))
      return;
    const loadId = loadIdCounter++;
    const finishLoader = (effect) => {
      if (this.currentLoad === loadId) {
        (0,state/* addBatchUpdate */.NB)(() => {
          effect();
          this.currentLoad = void 0;
        });
      }
    };
    this.loader().then(
      (result) => finishLoader(
        () => this.stateContainer.set({
          value: result,
          meta: { version: versionWhenLoadingStarted }
        })
      ),
      (error) => finishLoader(
        () => this.stateContainer.set({
          meta: { error, version: versionWhenLoadingStarted }
        })
      )
    );
    this.currentLoad = loadId;
  }
  loadingNeeded(currentVersion) {
    const metaStateContainer = this.stateContainer.subState("meta");
    const meta = metaStateContainer.get();
    if (meta === void 0)
      return true;
    if (currentVersion === void 0)
      return false;
    return currentVersion !== meta.version;
  }
  isLoading() {
    return this.currentLoad !== void 0;
  }
}
function metaHasBeenInvalidated(meta, callback) {
  if (!callback || meta === void 0)
    return false;
  return versionFromCallback(callback) !== meta.version;
}
function versionFromCallback(callback) {
  if (!callback) {
    return;
  }
  const version = callback();
  if (typeof version === "number" && isNaN(version)) {
    throw new common/* InternalError */.AQ();
  }
  return version;
}

// EXTERNAL MODULE: external "underscore"
var external_underscore_ = __webpack_require__(4952);
;// CONCATENATED MODULE: ./scrivito_sdk/loadable/stream_process.ts



class StreamProcess {
  constructor(stateContainer, stream) {
    this.stateContainer = stateContainer;
    this.stream = stream;
    this.notifyRequiredCounter = 0;
    this.scheduleNextState = (0,common/* collectAndSchedule */.Xq)(
      state/* addBatchUpdate */.NB,
      (state) => {
        if (!this.isStreamOpen())
          return;
        this.stateContainer.set(state);
      }
    );
    this.enqueueStreamRequired = (0,common/* collectAndSchedule */.Xq)(
      common/* nextTick */.Y3,
      (streamRequired) => streamRequired ? this.ensureStreamIsOpen() : this.ensureStreamIsClosed()
    );
  }
  notifyDataRequired() {
    this.notifyRequiredCounter++;
    this.enqueueStreamRequired(true);
  }
  notifyDataNoLongerRequired() {
    const counterBefore = this.notifyRequiredCounter;
    enqueueFlush(() => {
      if (counterBefore !== this.notifyRequiredCounter)
        return;
      this.enqueueStreamRequired(false);
    });
  }
  notifyDataWasSet() {
  }
  setTidyCallback(tidyCallback) {
    this.tidyCallback = tidyCallback;
  }
  isStreamOpen() {
    return !!this.subscription;
  }
  ensureStreamIsOpen() {
    if (!this.subscription) {
      this.subscription = this.stream.subscribe(
        (state) => this.scheduleNextState(state)
      );
    }
  }
  ensureStreamIsClosed() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = void 0;
      if (this.tidyCallback)
        this.tidyCallback();
    }
    this.stateContainer.set(void 0);
  }
}
const UNSUBSCRIBE_DELAY = 1e4;
const flushSubject = new common/* Subject */.xQ();
function flushLoadableStreams() {
  flushSubject.next();
}
function enqueueFlush(callback) {
  const runCallbackOnce = (0,external_underscore_.once)(callback);
  (0,common/* waitMs */.OH)(UNSUBSCRIBE_DELAY).then(runCallbackOnce);
  flushSubject.waitForFirst().then(runCallbackOnce);
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/create_loader_process.ts


function createLoaderProcess(options, stateContainer) {
  if (options.stream) {
    return new StreamProcess(
      stateContainer,
      options.stream.map((value) => ({ meta: {}, value }))
    );
  }
  if (options.loadableStream) {
    return new StreamProcess(stateContainer, options.loadableStream);
  }
  return new LoaderCallbackProcess(
    stateContainer,
    options.loader,
    options.invalidation
  );
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/loading_registry.ts
let processIndex = {};
let loadingSubscriptions = {};
function loading_registry_reset() {
  processIndex = {};
  loadingSubscriptions = {};
}
function subscriberCountForLoading(dataId) {
  return loadingSubscriptions[dataId] || 0;
}
function processIndexSize() {
  return Object.keys(processIndex).length;
}
function subscribeLoading(dataId, processFactory) {
  let subscriptionActive = true;
  changeSubscriptionsFor(dataId, 1);
  const processToUse = getOrCreateProcessFor(dataId, processFactory);
  processToUse.notifyDataRequired();
  return () => {
    if (!subscriptionActive) {
      return;
    }
    subscriptionActive = false;
    const numSubscriptions = changeSubscriptionsFor(dataId, -1);
    if (numSubscriptions < 1) {
      processToUse.notifyDataNoLongerRequired();
    }
  };
}
function getOrCreateProcessFor(dataId, processFactory) {
  const existingProcess = processIndex[dataId];
  if (existingProcess)
    return existingProcess;
  const newProcess = processFactory();
  processIndex[dataId] = newProcess;
  newProcess.setTidyCallback(() => {
    if (processIndex[dataId] !== newProcess)
      return;
    delete processIndex[dataId];
  });
  return newProcess;
}
function changeSubscriptionsFor(dataId, amount) {
  const oldNumber = loadingSubscriptions[dataId] || 0;
  const newNumber = oldNumber + amount;
  loadingSubscriptions[dataId] = newNumber;
  return newNumber;
}
function notifyDataWasSet(dataId) {
  const process = processIndex[dataId];
  if (process) {
    process.notifyDataWasSet();
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/not_loaded_error.ts

class NotLoadedError extends common/* ScrivitoError */.Ix {
  constructor() {
    super("Data is not yet loaded.");
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/loadable_data.ts







class LoadableData {
  constructor(options) {
    this.stateContainer = options.state;
    this.id = options.state.id();
    this.affiliation = options.affiliation;
    this.invalidation = options.invalidation;
    this.processFactory = () => createLoaderProcess(options, this.stateContainer);
  }
  ensureAvailable() {
    notifyUsage(this.id, this);
    return this.checkIfAvailableMeta(this.getMeta());
  }
  get() {
    return this.getWithDefault(void 0);
  }
  getAffiliation() {
    return this.affiliation;
  }
  getWithDefault(theDefault) {
    const state = this.stateContainer.get();
    if (!this.checkIfAvailableState(state))
      return theDefault;
    notifyUsage(this.id, this);
    return state.value;
  }
  getOrThrow() {
    const state = this.stateContainer.get();
    if (!this.checkIfAvailableState(state))
      throw new NotLoadedError();
    notifyUsage(this.id, this);
    return state.value;
  }
  reader() {
    this.ensureAvailable();
    return this.stateContainer.reader().subState("value");
  }
  set(value) {
    this.stateContainer.set({
      value,
      meta: { version: this.currentVersion() }
    });
    notifyDataWasSet(this.id);
  }
  setError(error) {
    this.stateContainer.set({
      meta: { error, version: this.currentVersion() }
    });
    notifyDataWasSet(this.id);
  }
  reset() {
    this.stateContainer.set(void 0);
  }
  isMissing() {
    return this.getMeta() === void 0;
  }
  isAvailable() {
    const meta = this.getMeta();
    return meta !== void 0 && meta.error === void 0;
  }
  isError() {
    var _a;
    return ((_a = this.getMeta()) == null ? void 0 : _a.error) !== void 0;
  }
  numSubscribers() {
    return subscriberCountForLoading(this.id);
  }
  subscribeLoading() {
    return subscribeLoading(this.id, this.processFactory);
  }
  getMeta() {
    return this.stateContainer.subState("meta").get();
  }
  checkIfAvailableState(state) {
    return this.checkIfAvailableMeta(state == null ? void 0 : state.meta);
  }
  checkIfAvailableMeta(meta) {
    if (meta === void 0) {
      if (!isCurrentlyCapturing()) {
        this.subscribeLoading();
        throwNoLoadingContext();
      }
      notifyDataRequired("incomplete", this);
      return false;
    }
    notifyDataRequired(
      loadingStateFromMeta(meta, this.invalidation),
      this
    );
    throwIfErrorMeta(meta);
    return true;
  }
  currentVersion() {
    return versionFromCallback(this.invalidation);
  }
}
function loadingStateFromMeta(meta, invalidation) {
  if (metaHasBeenInvalidated(meta, invalidation))
    return "outdated";
  return meta.incomplete ? "incomplete" : "available";
}
const usageContext = new common/* ContextContainer */.AY();
function notifyUsage(id, data) {
  const store = usageContext.current();
  if (store) {
    store[id] = data;
  }
}
function reportUsedData(fn) {
  const store = {};
  const result = usageContext.runWith(store, fn);
  return {
    result,
    usedData: Object.values(store)
  };
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/load_with_default.ts

function loadWithDefault(theDefault, loadableFunction) {
  const run = run_and_catch_errors_while_loading_runAndCatchErrorsWhileLoading(loadableFunction);
  return run.allDataLoaded ? run.result : theDefault;
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/load_serial.ts

function load_serial_loadSerial(firstFn, secondFn) {
  const firstCaptured = capture(firstFn);
  firstCaptured.forwardToCurrent();
  const secondCaptured = capture(() => secondFn(firstCaptured.result));
  if (firstCaptured.isAllDataLoaded())
    secondCaptured.forwardToCurrent();
  return secondCaptured.result;
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/dejitter_state_stream.ts

function dejitterStateStream(stream) {
  return new common/* Streamable */.fU((observer) => {
    let isComplete = false;
    return stream.subscribe((state) => {
      if (state.meta.incomplete === true) {
        if (isComplete)
          return;
      } else {
        isComplete = true;
      }
      observer.next(state);
    });
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/loadable_function.ts




function loadable_function_loadableFunction(defaultValue, argsToStringOrZeroArgsFn, fn) {
  if (!fn) {
    const zeroArgsFn = argsToStringOrZeroArgsFn;
    return createLoadableFunction(defaultValue, () => "", zeroArgsFn);
  }
  const argsToString = argsToStringOrZeroArgsFn;
  return createLoadableFunction(defaultValue, argsToString, fn);
}
function createLoadableFunction(defaultValue, argsToString, fn) {
  const functionState = (0,state/* createStateContainer */.JH)();
  return (...args) => {
    if (!isCurrentlyCapturing())
      return fn(...args);
    const data = new LoadableData({
      state: functionState.subState(argsToString(...args)),
      loadableStream: dejitterStateStream(observeAndLoad(() => fn(...args)))
    });
    return data.getWithDefault(defaultValue);
  };
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/map_reduce.ts



function loadableMapReduce(input, mapper, reducer, empty, batchSize = 20) {
  function computeReductionFrom(batchNumber) {
    return loadSerial(
      () => getReducedBatch(batchNumber),
      ({ value, continuation }) => !continuation ? value : reducer(value, computeReductionFrom(batchNumber + 1))
    );
  }
  const getReducedBatch = loadableFunction(
    { value: empty },
    (batchNumber) => batchNumber.toString(),
    (batchNumber) => {
      const continueFrom = batchNumber === 0 ? void 0 : getReducedBatch(batchNumber - 1).continuation;
      const slice = sliceFromIterable(input, continueFrom, batchSize);
      return {
        value: slice.values.map(mapper).reduce(reducer, empty),
        continuation: slice.continuation
      };
    }
  );
  return () => computeReductionFrom(0);
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/loadable_with_default.ts

function loadableWithDefault(theDefault, loadableFunction) {
  const captured = load_handler_capture(() => loadWithDefault(theDefault, loadableFunction));
  if (isCurrentlyCapturing()) {
    captured.forwardToCurrent();
  }
  return captured.result;
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/run_and_catch_errors_while_loading.ts


function run_and_catch_errors_while_loading_runAndCatchErrorsWhileLoading(loadableFunction) {
  const captured = load_handler_capture(() => (0,common/* runAndCatchException */.fX)(loadableFunction));
  captured.forwardToCurrent();
  const outcome = captured.result;
  const allDataLoaded = captured.isAllDataLoaded();
  const allDataUpToDate = captured.isAllDataUpToDate();
  if (!outcome.errorThrown) {
    return {
      success: true,
      result: outcome.result,
      allDataLoaded,
      allDataUpToDate
    };
  }
  if (!allDataLoaded) {
    return {
      success: false,
      allDataLoaded: false,
      allDataUpToDate
    };
  }
  throw outcome.error;
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/loadable_collection.ts
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));




class LoadableCollection {
  constructor({
    recordedAs,
    loadElement
  }) {
    this.recordedAs = recordedAs;
    this.state = (0,state/* createStateContainer */.JH)();
    this.loadElement = loadElement;
    if (recordedAs)
      register(recordedAs, this);
  }
  get(key, loaderHint) {
    const stringifiedKey = stringifyKey(key);
    const loaderOptions = this.loadElement(key, loaderHint);
    const data = new LoadableData(__spreadProps(__spreadValues({}, loaderOptions), {
      state: this.state.subState(stringifiedKey),
      affiliation: this.recordedAs ? { collectionName: this.recordedAs, key } : void 0
    }));
    return data;
  }
  clear() {
    this.state.clear();
  }
  dangerouslyGetRawValues() {
    const currentState = this.state.get();
    if (!currentState)
      return [];
    return Object.keys(currentState).map((key) => currentState[key]).filter(common/* isPresent */.EN).filter(isAvailableState).map((state) => state.value);
  }
}
function stringifyKey(key) {
  if (typeof key === "string") {
    return key;
  }
  return (0,common/* computeCacheKey */.mz)(key);
}
const namedCollections = {};
function register(name, collection) {
  if (namedCollections[name]) {
    throw new common/* InternalError */.AQ();
  }
  namedCollections[name] = collection;
}
function getCollection(name) {
  const found = namedCollections[name];
  if (!found)
    throw new common/* InternalError */.AQ();
  return found;
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/data_recorder.ts



function loadRecording(recording) {
  (0,state/* withBatchedUpdates */.tH)(() => recording.forEach(loadDataFromRecord));
}
function loadDataFromRecord([name, key, value]) {
  const loadableData = getCollection(name).get(key);
  loadableData.set(value);
}
function generateRecording(datas) {
  return datas.map(generateRecord);
}
function generateRecord(data) {
  const affiliation = data.getAffiliation();
  if (!affiliation) {
    throw new common/* InternalError */.AQ();
  }
  return [affiliation.collectionName, affiliation.key, data.get()];
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/load_and_observe.ts


function loadAndObserve(fn) {
  return observeAndLoad(fn).filter((state) => !state.meta.incomplete).map(getValueOrThrowError);
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/load_entire_iterable.ts
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};


function loadEntireIterable(iterable) {
  return __async(this, null, function* () {
    const result = [];
    let continuation;
    do {
      const batch = yield load(
        () => sliceFromIterable(iterable, continuation, 1)
      );
      continuation = batch.continuation;
      batch.values.forEach((value) => result.push(value));
    } while (continuation);
    return result;
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/without_loading.ts

function withoutLoading(fn) {
  return load_handler_capture(fn).result;
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/index.ts


















/***/ }),

/***/ 3252:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GD": () => (/* binding */ currentObjSpaceId),
/* harmony export */   "P6": () => (/* binding */ setCurrentWorkspaceId),
/* harmony export */   "f$": () => (/* binding */ isCurrentWorkspacePublished),
/* harmony export */   "tV": () => (/* binding */ currentWorkspaceId)
/* harmony export */ });
/* unused harmony export resetCurrentWorkspaceId */
/* harmony import */ var scrivito_sdk_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5098);

let objSpaceId = scrivito_sdk_client__WEBPACK_IMPORTED_MODULE_0__.PUBLISHED_SPACE;
function currentObjSpaceId() {
  return objSpaceId;
}
function isCurrentWorkspacePublished() {
  return objSpaceId === scrivito_sdk_client__WEBPACK_IMPORTED_MODULE_0__.PUBLISHED_SPACE;
}
function currentWorkspaceId() {
  return objSpaceId[1];
}
function setCurrentWorkspaceId(id) {
  objSpaceId = id === "published" ? scrivito_sdk_client__WEBPACK_IMPORTED_MODULE_0__.PUBLISHED_SPACE : ["workspace", id];
}
function resetCurrentWorkspaceId() {
  objSpaceId = PUBLISHED_SPACE;
}


/***/ }),

/***/ 9838:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "cO": () => (/* reexport */ BasicField),
  "AM": () => (/* reexport */ BasicLink),
  "Jj": () => (/* reexport */ BasicObj),
  "be": () => (/* reexport */ BasicObjSearch),
  "E8": () => (/* reexport */ BasicWidget),
  "Kb": () => (/* reexport */ Binary),
  "pf": () => (/* reexport */ BinaryType),
  "jS": () => (/* reexport */ FULL_TEXT_OPERATORS),
  "eJ": () => (/* reexport */ FutureBinary),
  "Un": () => (/* reexport */ LinkType),
  "LG": () => (/* reexport */ MetadataCollection),
  "fP": () => (/* reexport */ OPERATORS),
  "d4": () => (/* reexport */ ObjSearchType),
  "Bt": () => (/* reexport */ ObjType),
  "AZ": () => (/* reexport */ ObjUnavailable),
  "l9": () => (/* reexport */ WidgetType),
  "j$": () => (/* reexport */ Workspace),
  "T8": () => (/* reexport */ allSitesAndGlobal),
  "e3": () => (/* reexport */ copyObjViaHandler),
  "Yz": () => (/* reexport */ createObjFromFileIn),
  "f_": () => (/* reexport */ createObjIn),
  "GD": () => (/* reexport */ current_workspace_id/* currentObjSpaceId */.GD),
  "tV": () => (/* reexport */ current_workspace_id/* currentWorkspaceId */.tV),
  "Ti": () => (/* reexport */ emptyScope),
  "E2": () => (/* reexport */ excludeDeletedObjs),
  "U2": () => (/* reexport */ excludeGlobal),
  "TW": () => (/* reexport */ getAllObjsByValueFrom),
  "HG": () => (/* reexport */ getObjBy),
  "R2": () => (/* reexport */ getObjFrom),
  "nl": () => (/* reexport */ getObjIncludingUnavailableFrom),
  "Wd": () => (/* reexport */ getPlacementModificationInfos),
  "cS": () => (/* reexport */ getRootObjFrom),
  "hA": () => (/* reexport */ objSpaceScope),
  "$u": () => (/* reexport */ objSpaceScopeExcludingDeleted),
  "EZ": () => (/* reexport */ restrictToContent),
  "lD": () => (/* reexport */ restrictToObjClass),
  "mz": () => (/* reexport */ restrictToSite),
  "L8": () => (/* reexport */ restrictToSiteAndGlobal),
  "EX": () => (/* reexport */ setBinaryHandler),
  "$v": () => (/* reexport */ setCopyObjHandler),
  "P6": () => (/* reexport */ current_workspace_id/* setCurrentWorkspaceId */.P6),
  "Nv": () => (/* reexport */ updateReferences),
  "OW": () => (/* reexport */ versionOnSite),
  "s1": () => (/* reexport */ versionsOnAllSites)
});

// UNUSED EXPORTS: BasicObjFacetValue, isCurrentWorkspacePublished, normalizedRestriction, resetCurrentWorkspaceId, restrictToGlobal, serializeAttributes

// EXTERNAL MODULE: external "underscore"
var external_underscore_ = __webpack_require__(4952);
// EXTERNAL MODULE: ./scrivito_sdk/client/index.ts + 29 modules
var client = __webpack_require__(5098);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 45 modules
var common = __webpack_require__(3711);
// EXTERNAL MODULE: ./scrivito_sdk/data_integration/index.ts + 25 modules
var data_integration = __webpack_require__(2878);
;// CONCATENATED MODULE: ./scrivito_sdk/models/exclude_deleted_objs.ts
const excludeDeletedObjs = {
  isInScope(obj) {
    return !obj.isDeleted();
  },
  applyToSearch(search) {
    return search.excludeDeleted();
  },
  applyToCreate(attributes) {
    return attributes;
  }
};

// EXTERNAL MODULE: ./scrivito_sdk/data/index.ts + 28 modules
var scrivito_sdk_data = __webpack_require__(9241);
;// CONCATENATED MODULE: ./scrivito_sdk/models/obj_unavailable.ts
class ObjUnavailable {
  constructor(_id, _reason) {
    this._id = _id;
    this._reason = _reason;
  }
  id() {
    return this._id;
  }
  isForbidden() {
    return this._reason === "forbidden";
  }
  isNonexistent() {
    return this._reason === "nonexistent";
  }
  isNotLoaded() {
    return this._reason === "notLoaded";
  }
  reason() {
    return this._reason;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/obj_scope.ts
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};





function objSpaceScope(objSpaceId) {
  return new ObjSpaceScope(objSpaceId);
}
class ObjSpaceScope {
  constructor(objSpaceId) {
    this.objSpaceId = objSpaceId;
  }
  get(id) {
    const objData = (0,scrivito_sdk_data/* getObjData */.L7)(this.objSpaceId, id);
    if (!objData)
      return new ObjUnavailable(id, "notLoaded");
    if (!objData.isUnavailable())
      return new BasicObj(objData);
    if (objData.isForbidden())
      return new ObjUnavailable(id, "forbidden");
    return new ObjUnavailable(id, "nonexistent");
  }
  search() {
    if ((0,client.isWorkspaceObjSpaceId)(this.objSpaceId) || (0,client.isEmptySpaceId)(this.objSpaceId)) {
      return new BasicObjSearch(this.objSpaceId).includeDeleted();
    }
    throw new common/* InternalError */.AQ();
  }
  create(id, attributes) {
    const objClass = attributes._obj_class;
    if (!objClass)
      throw new common/* InternalError */.AQ();
    if ((0,client.isEmptySpaceId)(this.objSpaceId)) {
      throw new common/* ScrivitoError */.Ix(
        "Cannot create an obj, because the current site is not yet determined."
      );
    }
    const objJson = __spreadValues({
      _obj_class: objClass,
      _id: id,
      _site_id: null
    }, attributes);
    return new BasicObj((0,scrivito_sdk_data/* createObjData */.ZN)(this.objSpaceId, id, objJson));
  }
  and(transformation) {
    return new TransformedScope(this, transformation);
  }
}
class TransformedScope {
  constructor(originalScope, transformation) {
    this.originalScope = originalScope;
    this.transformation = transformation;
  }
  get(id) {
    const maybeObj = this.originalScope.get(id);
    if (maybeObj instanceof BasicObj && !this.transformation.isInScope(maybeObj)) {
      return new ObjUnavailable(id, "nonexistent");
    }
    return maybeObj;
  }
  search() {
    const search = this.originalScope.search();
    this.transformation.applyToSearch(search);
    return search;
  }
  create(id, attributes) {
    const obj = this.originalScope.create(
      id,
      this.transformation.applyToCreate(attributes)
    );
    return obj;
  }
  and(anotherTransformation) {
    return new TransformedScope(this, anotherTransformation);
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/obj_space_scope_excluding_deleted.ts


function objSpaceScopeExcludingDeleted(objSpaceId) {
  return objSpaceScope(objSpaceId).and(excludeDeletedObjs);
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/attribute_deserializer.ts





function deserialize(model, value, typeInfo) {
  switch (typeInfo[0]) {
    case "binary":
      return deserializeBinaryValue(value, model);
    case "boolean":
      return deserializeBooleanValue(value);
    case "datalocator":
      return deserializeDataLocatorValue(value);
    case "date":
      return deserializeDateValue(value);
    case "datetime":
      return deserializeDateValue(value);
    case "float":
      return deserializeFloatValue(value);
    case "enum":
      return deserializeEnumValue(value, typeInfo);
    case "html":
      return deserializeHtmlOrStringValue(value);
    case "integer":
      return deserializeIntegerValue(value);
    case "link":
      return deserializeLinkValue(value);
    case "linklist":
      return deserializeLinklistValue(value);
    case "multienum":
      return deserializeMultienumValue(value, typeInfo);
    case "reference":
      return deserializeReferenceValue(value, model);
    case "referencelist":
      return deserializeReferencelistValue(value, model);
    case "string":
      return deserializeHtmlOrStringValue(value);
    case "stringlist":
      return deserializeStringlistValue(value);
    case "widget":
      return deserializeWidgetValue(value, model);
    case "widgetlist":
      return deserializeWidgetlistValue(value, model);
    default:
      throw new common/* InternalError */.AQ();
  }
}
function deserializeBinaryValue(value, model) {
  if (isBackendValueOfType("binary", value)) {
    return new Binary(value[1].id, model.objSpaceId());
  }
  return null;
}
function deserializeBooleanValue(value) {
  if (isBackendValueOfType("boolean", value)) {
    return value[1];
  }
  return false;
}
function deserializeDataLocatorValue(value) {
  if (isBackendValueOfType("datalocator", value)) {
    return new data_integration/* DataLocator */.s4(value[1] || { class: null });
  }
  return new data_integration/* DataLocator */.s4({ class: null });
}
function deserializeDateValue(value) {
  if (isBackendValueOfType("date", value)) {
    return (0,common/* deserializeAsDate */.r2)(value[1]);
  }
  return null;
}
function deserializeHtmlOrStringValue(value) {
  if (isBackendValueOfType("html", value) || isBackendValueOfType("string", value)) {
    return value[1];
  }
  return "";
}
function deserializeEnumValue(value, typeInfo) {
  if (isBackendValueOfType("string", value)) {
    const [, valueFromBackend] = value;
    const [, { values }] = typeInfo;
    if ((0,external_underscore_.contains)(values, valueFromBackend))
      return valueFromBackend;
  }
  return null;
}
function deserializeMultienumValue(value, typeInfo) {
  if (isBackendValueOfType("stringlist", value)) {
    const [, { values }] = typeInfo;
    return (0,external_underscore_.intersection)(value[1], values);
  }
  return [];
}
function deserializeFloatValue(value) {
  if (isBackendValueOfType("number", value)) {
    return convertToFloat(value[1].toString());
  }
  if (isBackendValueOfType("string", value)) {
    const [, valueFromBackend] = value;
    if (valueFromBackend.match(/^-?\d+(\.\d+)?$/)) {
      return convertToFloat(valueFromBackend);
    }
  }
  return null;
}
function convertToFloat(floatAsString) {
  const floatValue = parseFloat(floatAsString);
  return (0,common/* isValidFloat */.RY)(floatValue) ? floatValue : null;
}
function deserializeIntegerValue(value) {
  if (isBackendValueOfType("number", value) || isBackendValueOfType("string", value)) {
    return (0,common/* deserializeAsInteger */.ld)(value[1]);
  }
  return null;
}
function deserializeLinkValue(value) {
  if (isBackendValueOfType("link", value)) {
    return convertToLink(value[1]);
  }
  return null;
}
function deserializeLinklistValue(value) {
  if (isBackendValueOfType("linklist", value)) {
    return value[1].map(convertToLink);
  }
  return [];
}
function convertToLink(valueFromBackend) {
  const linkParams = (0,external_underscore_.pick)(
    valueFromBackend,
    "query",
    "rel",
    "target",
    "title",
    "url"
  );
  if ("fragment" in valueFromBackend) {
    linkParams.hash = valueFromBackend.fragment;
  }
  if ("obj_id" in valueFromBackend) {
    linkParams.objId = valueFromBackend.obj_id;
  }
  return new BasicLink(linkParams);
}
function convertReference(valueFromBackend, model) {
  return getObjIncludingUnavailableFrom(
    objSpaceScopeExcludingDeleted(model.objSpaceId()),
    valueFromBackend
  );
}
function deserializeReferenceValue(value, model) {
  if (isBackendValueOfType("reference", value)) {
    return convertReference(value[1], model);
  }
  return null;
}
function deserializeReferencelistValue(value, model) {
  if (isBackendValueOfType("referencelist", value)) {
    return value[1].map((obj) => convertReference(obj, model));
  }
  return [];
}
function deserializeStringlistValue(value) {
  if (isBackendValueOfType("stringlist", value)) {
    return value[1];
  }
  return [];
}
function deserializeWidgetValue(value, model) {
  let widgetId;
  if (isBackendValueOfType("widget", value))
    [, widgetId] = value;
  if (isBackendValueOfType("widgetlist", value))
    [, [widgetId]] = value;
  return widgetId ? model.widget(widgetId) : null;
}
function deserializeWidgetlistValue(value, model) {
  if (isBackendValueOfType("widgetlist", value)) {
    return value[1].map((widgetId) => model.widget(widgetId));
  }
  if (isBackendValueOfType("widget", value)) {
    const [, widgetId] = value;
    if (widgetId) {
      const widget = model.widget(widgetId);
      if (widget)
        return [widget];
    }
  }
  return [];
}
function isBackendValueOfType(type, value) {
  return Array.isArray(value) && value[0] === type;
}

// EXTERNAL MODULE: external "urijs"
var external_urijs_ = __webpack_require__(8842);
// EXTERNAL MODULE: ./scrivito_sdk/link_resolution/index.ts + 6 modules
var link_resolution = __webpack_require__(8063);
;// CONCATENATED MODULE: ./scrivito_sdk/models/basic_scope_get_methods.ts

function getObjFrom(scope, id) {
  const maybeObj = scope.get(id);
  return maybeObj instanceof BasicObj ? maybeObj : null;
}
function getObjIncludingUnavailableFrom(scope, id) {
  return scope.get(id);
}
function getObjBy(scope, attribute, value) {
  var _a;
  const query = scope.search().and(attribute, "equals", value);
  const foundObj = query.first();
  if (foundObj && foundObj.isDeleted()) {
    return (_a = query.excludeDeleted().first()) != null ? _a : foundObj;
  }
  return foundObj;
}
function getAllObjsByValueFrom(scope, attribute, value) {
  return scope.search().and(attribute, "equals", value).dangerouslyUnboundedTake();
}
function getRootObjFrom(scope) {
  return getObjBy(scope.and(excludeGlobal), "_path", "/");
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/basic_field.ts






class BasicField {
  constructor(container, attributeName, typeInfo) {
    this.container = container;
    this.attributeName = attributeName;
    this.typeInfo = typeInfo;
    if (container instanceof BasicWidget)
      this.widgetId = container.id();
  }
  get() {
    return getContentValue(this.container, this.attributeName, this.typeInfo);
  }
  update(newValue) {
    this.container.update({ [this.attributeName]: [newValue, this.typeInfo] });
  }
  getContainer() {
    return this.container;
  }
  obj() {
    return this.container.obj();
  }
  objSpaceId() {
    return this.container.objSpaceId();
  }
  name() {
    return this.attributeName;
  }
  maximum() {
    const options = this.typeInfo[1];
    return options == null ? void 0 : options.maximum;
  }
  type() {
    return this.typeInfo[0];
  }
  equals(other) {
    if (!(other instanceof BasicField)) {
      return false;
    }
    return this.container.equals(other.getContainer()) && this.attributeName === other.name();
  }
  validClasses() {
    const options = this.typeInfo[1];
    return options == null ? void 0 : options.validClasses;
  }
  getDiff([from, to]) {
    const obj = this.obj();
    return (0,scrivito_sdk_data/* getFieldDiff */.Mu)(from, to, this.attributeName, obj.id(), this.widgetId);
  }
  getHtmlDiffContent(range) {
    const diff = this.getDiff(range);
    return (diff == null ? void 0 : diff.format) === "html" ? diff.content : null;
  }
  toString() {
    const objId = this.obj().id();
    const name = this.name();
    return this.widgetId ? `<BasicField name=${name} objId=${objId} widgetId=${this.widgetId}>` : `<BasicField name=${name} objId=${objId}>`;
  }
  id() {
    return this.widgetId ? `${this.attributeName}|${this.obj().id()}|${this.widgetId}` : `${this.attributeName}|${this.obj().id()}`;
  }
  inObjSpace(objSpaceId) {
    return this.inObjScope(objSpaceScopeExcludingDeleted(objSpaceId));
  }
  inObjScope(scope) {
    const obj = getObjFrom(scope, this.obj().id());
    if (!obj)
      return null;
    const container = this.getContainer() instanceof BasicObj ? obj : obj.widget(this.getContainer().id());
    if (!container)
      return null;
    return new BasicField(container, this.name(), this.typeInfo);
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/basic_obj_facet_value.ts



class BasicObjFacetValue {
  constructor(objSpaceId, facet) {
    this.objSpaceId = objSpaceId;
    this.facet = facet;
  }
  name() {
    return this.facet.name;
  }
  count() {
    return this.facet.count;
  }
  includedObjs() {
    const scope = objSpaceScopeExcludingDeleted(this.objSpaceId);
    return (0,external_underscore_.compact)(
      this.facet.includedObjIds.map((id) => getObjFrom(scope, id))
    );
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/basic_obj_search.ts
var basic_obj_search_defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var basic_obj_search_getOwnPropSymbols = Object.getOwnPropertySymbols;
var basic_obj_search_hasOwnProp = Object.prototype.hasOwnProperty;
var basic_obj_search_propIsEnum = Object.prototype.propertyIsEnumerable;
var basic_obj_search_defNormalProp = (obj, key, value) => key in obj ? basic_obj_search_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var basic_obj_search_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (basic_obj_search_hasOwnProp.call(b, prop))
      basic_obj_search_defNormalProp(a, prop, b[prop]);
  if (basic_obj_search_getOwnPropSymbols)
    for (var prop of basic_obj_search_getOwnPropSymbols(b)) {
      if (basic_obj_search_propIsEnum.call(b, prop))
        basic_obj_search_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));





const FULL_TEXT_OPERATORS = [
  "contains",
  "containsPrefix",
  "matches"
];
const OPERATORS = [
  "contains",
  "containsPrefix",
  "matches",
  "equals",
  "startsWith",
  "isGreaterThan",
  "isLessThan",
  "linksTo",
  "refersTo"
];
const NEGATABLE_OPERATORS = [
  "equals",
  "startsWith",
  "isGreaterThan",
  "isLessThan"
];
const BOOSTABLE_OPERATORS = [
  "contains",
  "containsPrefix",
  "matches"
];
class BasicObjSearch {
  constructor(_objSpaceId, params) {
    this._objSpaceId = _objSpaceId;
    this._query = params ? [...params.query] : [];
    this._boost = (params == null ? void 0 : params.boost) || [];
    this._batchSize = params == null ? void 0 : params.batchSize;
    this._offset = params == null ? void 0 : params.offset;
    this._orderBy = params == null ? void 0 : params.orderBy;
    this._includeDeleted = params == null ? void 0 : params.includeDeleted;
    this._includeEditingAssets = params == null ? void 0 : params.includeEditingAssets;
  }
  static fromParams(workspaceId, params) {
    return new BasicObjSearch(["workspace", workspaceId], params);
  }
  and(attributeOrSearch, operator, value, boost) {
    if (attributeOrSearch instanceof BasicObjSearch) {
      this._query = [...this._query, ...attributeOrSearch._query];
    } else {
      if (operator === void 0) {
        throw new common/* ArgumentError */.ir("Missing operator to search with");
      }
      if (value === void 0) {
        throw new common/* ArgumentError */.ir(
          'Missing value to search (specify "null" for missing)'
        );
      }
      const field = attributeOrSearch;
      const subQuery = buildSubQuery(field, operator, value);
      if (boost) {
        assertBoostableOperator(operator);
        subQuery.boost = underscoreBoostAttributes(boost);
      }
      this._query.push(subQuery);
    }
    return this;
  }
  andNot(attribute, operator, value) {
    const subQuery = buildSubQuery(attribute, operator, value);
    assertNegatableOperator(operator);
    subQuery.negate = true;
    this._query.push(subQuery);
    return this;
  }
  boost(field, operator, value, factor) {
    const subQuery = buildSubQuery(field, operator, value);
    this._boost.push({ condition: [subQuery], factor });
    return this;
  }
  offset(offset) {
    this._offset = offset || void 0;
    return this;
  }
  order(attributeOrAttributes, direction) {
    const attributes = Array.isArray(attributeOrAttributes) ? attributeOrAttributes : [[attributeOrAttributes, direction]];
    this._orderBy = attributes.map((attr) => {
      if (Array.isArray(attr)) {
        const [innerAttr, innerDirection] = attr;
        return normalizeOrderByItem(innerAttr, innerDirection);
      }
      return normalizeOrderByItem(attr);
    });
    return this;
  }
  batchSize(batchSize) {
    this._batchSize = batchSize;
    return this;
  }
  includeDeleted() {
    this._includeDeleted = true;
    return this;
  }
  excludeDeleted() {
    this._includeDeleted = void 0;
    return this;
  }
  includeEditingAssets() {
    this._includeEditingAssets = true;
    return this;
  }
  count() {
    return (0,scrivito_sdk_data/* getObjQueryCount */.kb)(this.objSpaceId(), this.queryParams());
  }
  first() {
    return this.take(1)[0] || null;
  }
  take(count) {
    return this.internalTake(count);
  }
  dangerouslyUnboundedTake() {
    return this.internalTake(void 0);
  }
  iterator() {
    return this.getObjDataQuery().iterator();
  }
  iteratorFromContinuation(continuation) {
    return this.getObjDataQuery().iteratorFromContinuation(continuation);
  }
  getObjDataQuery() {
    const objDataQuery = (0,scrivito_sdk_data/* getObjQuery */.N1)(
      this.objSpaceId(),
      this.queryParams(),
      this.getBatchSize()
    );
    return (0,common/* transformContinueIterable */.Sy)(
      objDataQuery,
      (iterator) => iterator.map((data) => new BasicObj(data))
    );
  }
  getBatchSize() {
    return this._batchSize || 100;
  }
  suggest(prefix, options) {
    const { attributes, limit } = basic_obj_search_spreadValues({ attributes: ["*"], limit: 5 }, options);
    return (0,scrivito_sdk_data/* suggest */.D7)(
      this.objSpaceId(),
      prefix,
      { attributes, limit },
      this.queryParams()
    );
  }
  facet(attribute, options) {
    let facetOptions;
    if (options === void 0) {
      facetOptions = {};
    } else {
      facetOptions = assertValidFacetOptions(options);
    }
    const facetQuery = new scrivito_sdk_data/* FacetQuery */.hO(
      this.objSpaceId(),
      underscoreAttribute(attribute),
      facetOptions,
      this._query
    );
    return facetQuery.result().map((facetData) => new BasicObjFacetValue(this.objSpaceId(), facetData));
  }
  objSpaceId() {
    return this._objSpaceId;
  }
  params() {
    return __spreadProps(basic_obj_search_spreadValues({}, this.queryParams()), {
      batchSize: this._batchSize
    });
  }
  queryParams() {
    const params = { query: this._query };
    if (this._boost !== void 0 && this._boost.length) {
      params.boost = this._boost;
    }
    if (this._offset !== void 0)
      params.offset = this._offset;
    if (this._orderBy !== void 0)
      params.orderBy = this._orderBy;
    if (this._includeDeleted !== void 0) {
      params.includeDeleted = this._includeDeleted;
    }
    if (this._includeEditingAssets !== void 0) {
      params.includeEditingAssets = this._includeEditingAssets;
    }
    return params;
  }
  internalTake(count) {
    const oldBatchSize = this._batchSize;
    try {
      this._batchSize = count === void 0 ? 1e3 : count;
      return (0,common/* extractFromIterator */.W)(this.iterator(), count);
    } finally {
      this._batchSize = oldBatchSize;
    }
  }
}
function buildSubQuery(fieldInput, operatorInput, valueInput) {
  const field = convertAttribute(fieldInput);
  const operator = convertOperator(operatorInput);
  const value = convertValue(valueInput, operator);
  return { field, operator, value };
}
function assertBoostableOperator(operator) {
  if (!(0,external_underscore_.contains)(BOOSTABLE_OPERATORS, operator)) {
    throw new common/* ArgumentError */.ir(
      `Boosting operator "${operator}" is invalid. ${explainValidOperators([
        "contains",
        "containsPrefix"
      ])}`
    );
  }
}
function assertNegatableOperator(operator) {
  if (!(0,external_underscore_.contains)(NEGATABLE_OPERATORS, operator)) {
    throw new common/* ArgumentError */.ir(
      `Negating operator "${operator}" is invalid. ${explainValidOperators(
        NEGATABLE_OPERATORS
      )}`
    );
  }
}
function convertValue(value, operator) {
  if (Array.isArray(value)) {
    return value.map((v) => convertSingleValue(v, operator));
  }
  return convertSingleValue(value, operator);
}
function convertSingleValue(value, operator) {
  if ((0,external_underscore_.isDate)(value))
    return convertDate(value, operator);
  if (value instanceof BasicObj) {
    return value.id();
  }
  return value;
}
function convertDate(value, operator) {
  if (operator !== "is_greater_than" && operator !== "is_less_than") {
    return (0,common/* formatDateToString */.xH)(value);
  }
  const roundedDate = roundToNearestMinute(value);
  const isInCurrentDateRange = Math.abs(Date.now() - value.getTime()) < 3e4;
  return (0,common/* formatDateToString */.xH)(isInCurrentDateRange ? roundedDate : value);
}
function roundToNearestMinute(value) {
  const oneMinuteInMs = 6e4;
  return new Date(Math.round(value.getTime() / oneMinuteInMs) * oneMinuteInMs);
}
function convertOperator(operator) {
  if (!(0,external_underscore_.contains)(OPERATORS, operator)) {
    throw new common/* ArgumentError */.ir(
      `Operator "${operator}" is invalid. ${explainValidOperators(OPERATORS)}`
    );
  }
  return (0,common/* underscore */.It)(operator);
}
function explainValidOperators(operators) {
  return `Valid operators are ${operators.join(", ")}.`;
}
function convertAttribute(attribute) {
  if (Array.isArray(attribute)) {
    return attribute.map((a) => underscoreAttribute(a));
  }
  return underscoreAttribute(attribute);
}
function underscoreBoostAttributes(boost) {
  const boostWithUnderscoreAttributes = {};
  Object.keys(boost).forEach((attributeName) => {
    const value = boost[attributeName];
    const underscoredAttributeName = underscoreAttribute(attributeName);
    boostWithUnderscoreAttributes[underscoredAttributeName] = value;
  });
  return boostWithUnderscoreAttributes;
}
function underscoreAttribute(attributeName) {
  if (!(0,common/* isCamelCase */.q2)(attributeName)) {
    throw new common/* ArgumentError */.ir(
      `Attribute name "${attributeName}" is not camel case.`
    );
  }
  return (0,common/* underscore */.It)(attributeName);
}
function normalizeOrderByItem(attribute, direction = "asc") {
  const sortBy = underscoreAttribute(attribute);
  return [sortBy, direction];
}
const VALID_FACET_OPTIONS = ["limit", "includeObjs"];
function assertValidFacetOptions(options) {
  const invalidOptions = (0,external_underscore_.without)(Object.keys(options), ...VALID_FACET_OPTIONS);
  if (invalidOptions.length) {
    throw new common/* ArgumentError */.ir(
      `Invalid facet options: ${(0,common/* prettyPrint */.xr)(invalidOptions)}. Valid options: ${VALID_FACET_OPTIONS}`
    );
  }
  return options;
}

// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 23 modules
var loadable = __webpack_require__(9246);
;// CONCATENATED MODULE: ./scrivito_sdk/models/model_types.ts






const ObjType = common/* tcomb.irreducible */.pC.irreducible(
  "Obj",
  (maybeObj) => isWrapping(maybeObj, BasicObj)
);
const WidgetType = common/* tcomb.irreducible */.pC.irreducible(
  "Widget",
  (maybeWidget) => isWrapping(maybeWidget, BasicWidget)
);
const LinkType = common/* tcomb.irreducible */.pC.irreducible(
  "Link",
  (maybeLink) => isWrapping(maybeLink, BasicLink)
);
const ObjSearchType = common/* tcomb.irreducible */.pC.irreducible(
  "ObjSearch",
  (maybeSearch) => isWrapping(maybeSearch, BasicObjSearch)
);
const BinaryType = common/* tcomb.irreducible */.pC.irreducible(
  "Binary",
  (maybeBinary) => maybeBinary instanceof Binary
);
function isWrapping(maybeWrapped, basicClass) {
  if (!maybeWrapped) {
    return false;
  }
  return maybeWrapped._scrivitoPrivateContent instanceof basicClass;
}

// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(9541);
;// CONCATENATED MODULE: ./scrivito_sdk/models/future_binary.ts





let binaryHandler;
function setBinaryHandler(handler) {
  binaryHandler = handler;
}
class FutureBinary {
  constructor(sourceSpec, options = {}) {
    let filename = options.filename;
    this.contentType = options.contentType;
    if (isIdToCopySource(sourceSpec)) {
      this.idToCopy = sourceSpec.idToCopy;
    } else {
      const { source } = sourceSpec;
      this.source = source;
      if (!this.contentType) {
        this.contentType = source.type;
      }
      if (!filename) {
        filename = source.name;
      }
    }
    if (filename) {
      this.filename = filename.replace(/[^\w\-_\.$]/g, "-");
    }
  }
  into(target, ...excessArgs) {
    checkInto(target, ...excessArgs);
    (0,state/* failIfFrozen */.un)("Changing CMS content");
    return this.intoId(target._scrivitoPrivateContent.id());
  }
  intoId(targetId) {
    if (!binaryHandler)
      throw new common/* InternalError */.AQ();
    let binaryPromise;
    if (this.idToCopy) {
      binaryPromise = binaryHandler.copyBinary(
        this.idToCopy,
        targetId,
        this.filename,
        this.contentType
      );
    } else {
      if (!this.source)
        throw new common/* InternalError */.AQ();
      binaryPromise = binaryHandler.uploadBinary(
        targetId,
        this.source,
        this.filename,
        this.contentType
      );
    }
    return binaryPromise.then(({ id }) => new Binary(id, (0,current_workspace_id/* currentObjSpaceId */.GD)()));
  }
}
const checkInto = (0,common/* checkArgumentsFor */.PJ)(
  "FutureBinary#into",
  [["target", ObjType]],
  {
    docPermalink: "js-sdk/FutureBinary-into"
  }
);
function isIdToCopySource(toCheck) {
  return !!toCheck.idToCopy;
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/metadata_collection.ts





var BackendBinaryMetadataType = /* @__PURE__ */ ((BackendBinaryMetadataType2) => {
  BackendBinaryMetadataType2["Date"] = "date";
  BackendBinaryMetadataType2["Number"] = "number";
  BackendBinaryMetadataType2["String"] = "string";
  BackendBinaryMetadataType2["Stringlist"] = "stringlist";
  return BackendBinaryMetadataType2;
})(BackendBinaryMetadataType || {});
class MetadataCollection {
  constructor(_binaryId, objSpaceId = client.PUBLISHED_SPACE) {
    this._binaryId = _binaryId;
    this.objSpaceId = objSpaceId;
    if (this._binaryId) {
      this.loadableData = loadableCollection.get(
        this._binaryId,
        this.objSpaceId
      );
    }
  }
  get(key) {
    (0,scrivito_sdk_data/* assertNotUsingInMemoryTenant */.VJ)("MetadataCollection#get");
    assertCamelCase(key);
    const data = this.getData();
    if (data) {
      const underscoredKey = (0,common/* underscore */.It)(key);
      if (data.hasOwnProperty(underscoredKey))
        return data[underscoredKey];
      return null;
    }
    return null;
  }
  keys() {
    const data = this.getData();
    if (data)
      return Object.keys(data).map(common/* camelCase */.eV);
    return [];
  }
  contentLength() {
    const length = this.get("contentLength");
    if (typeof length !== "number")
      return 0;
    return length;
  }
  contentType() {
    const type = this.get("contentType");
    if (typeof type !== "string")
      return "";
    return type;
  }
  binaryId() {
    return this._binaryId;
  }
  getData() {
    if (this.loadableData) {
      const metadata = this.loadableData.get();
      if (metadata)
        return deserializeMetadata(metadata);
    }
  }
}
function storeMetadataCollection(binaryId, response) {
  deserializeMetadata(response);
  loadableCollection.get(binaryId).set(response);
}
const loadableCollection = new loadable/* LoadableCollection */.X2({
  recordedAs: "metadata",
  loadElement: (id, objSpaceId) => ({
    loader: () => client.cmsRetrieval.retrieveBinaryMetadata(id, { accessVia: objSpaceId })
  })
});
function deserializeMetadata(response) {
  const backendMetadata = response.meta_data;
  if (!(0,external_underscore_.isObject)(backendMetadata)) {
    throw new common/* InternalError */.AQ();
  }
  const metadata = {};
  for (const key of Object.keys(backendMetadata)) {
    const [backendType, backendValue] = backendMetadata[key];
    if (backendValue === null || backendValue === void 0) {
      throw new common/* InternalError */.AQ();
    }
    let value;
    if (backendType === "date" /* Date */) {
      if (typeof backendValue === "string") {
        value = (0,common/* deserializeAsDate */.r2)(backendValue);
      } else {
        throw new common/* InternalError */.AQ();
      }
    } else {
      value = backendValue;
    }
    metadata[key] = value;
  }
  return metadata;
}
function assertCamelCase(key) {
  if (!(0,common/* isCamelCase */.q2)(key)) {
    throw new common/* ArgumentError */.ir(`Metadata key "${key}" is not in camel case.`);
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/binary.ts
var binary_defProp = Object.defineProperty;
var binary_getOwnPropSymbols = Object.getOwnPropertySymbols;
var binary_hasOwnProp = Object.prototype.hasOwnProperty;
var binary_propIsEnum = Object.prototype.propertyIsEnumerable;
var binary_defNormalProp = (obj, key, value) => key in obj ? binary_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var binary_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (binary_hasOwnProp.call(b, prop))
      binary_defNormalProp(a, prop, b[prop]);
  if (binary_getOwnPropSymbols)
    for (var prop of binary_getOwnPropSymbols(b)) {
      if (binary_propIsEnum.call(b, prop))
        binary_defNormalProp(a, prop, b[prop]);
    }
  return a;
};








const binary_loadableCollection = new loadable/* LoadableCollection */.X2({
  recordedAs: "binary",
  loadElement: ([binaryId, transformation], objSpaceId) => ({
    loader: () => client.cmsRetrieval.retrieveBinaryUrls(binaryId, transformation, {
      accessVia: objSpaceId
    })
  })
});
const PLACEHOLDER_URL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
function storeBinary(binaryId, options, response) {
  const transformation = options.transformation;
  binary_loadableCollection.get([binaryId, transformation]).set(response);
  const raw = new Binary(binaryId, PUBLISHED_SPACE).raw();
  if (transformation) {
    return raw.optimizeFor(transformation);
  }
  return raw;
}
class Binary {
  constructor(_id, _objSpaceId = client.PUBLISHED_SPACE, transformation = {}) {
    this._id = _id;
    this._objSpaceId = _objSpaceId;
    this._transformation = transformation || void 0;
    this._loadableData = binary_loadableCollection.get(
      [this._id, this._transformation],
      this._objSpaceId
    );
  }
  static upload(source, options, ...excessArgs) {
    checkUpload(source, options, ...excessArgs);
    if (!common/* FileType.is */.Tv.is(source)) {
      if (!(options && options.filename)) {
        throw new common/* ArgumentError */.ir(
          "Expected a filename to be passed with Blob as the source."
        );
      }
    }
    return new FutureBinary({ source }, options);
  }
  id() {
    return this._id;
  }
  copy(options) {
    return new FutureBinary({ idToCopy: this._id }, options);
  }
  isPrivate() {
    return !(0,common/* equals */.fS)(this._objSpaceId, client.PUBLISHED_SPACE);
  }
  optimizeFor(transformation) {
    return new Binary(this._id, this._objSpaceId, binary_spreadValues(binary_spreadValues({}, this._transformation), transformation));
  }
  original() {
    return new Binary(this._id, this._objSpaceId, {});
  }
  raw() {
    return new Binary(this._id, this._objSpaceId, null);
  }
  isExplicitlyTransformed() {
    return this.isTransformed() && !(0,external_underscore_.isEmpty)(this._transformation);
  }
  isRaw() {
    return !this.isTransformed();
  }
  url() {
    (0,scrivito_sdk_data/* assertNotUsingInMemoryTenant */.VJ)("Binary#url");
    return this.urlWithoutPlaceholder() || PLACEHOLDER_URL;
  }
  urlWithoutPlaceholder() {
    const data = this._loadableData.get();
    if (!data) {
      return;
    }
    const accessData = data[this.accessType()];
    if (!accessData) {
      throw new common/* InternalError */.AQ();
    }
    return accessData.get.url;
  }
  filename() {
    const url = this.url();
    if (!url || url.match(/^data:/)) {
      return "";
    }
    return external_urijs_(url).path().split("/").pop() || "";
  }
  metadata() {
    this.assertNotTransformed("Metadata");
    return new MetadataCollection(this._id, this._objSpaceId);
  }
  contentType() {
    this.assertNotTransformed("Content type");
    return this.metadata().contentType();
  }
  contentLength() {
    this.assertNotTransformed("Content length");
    return this.metadata().contentLength();
  }
  extname() {
    if (this.raw().filename().indexOf(".") > -1) {
      const parts = this.raw().filename().split(/[.\\]+/);
      if (parts.length > 1)
        return parts[parts.length - 1].toLowerCase();
    }
    return "";
  }
  equals(binary) {
    return this.id() === binary.id() && (0,common/* equals */.fS)(this._objSpaceId, binary.objSpaceId()) && (0,external_underscore_.isEqual)(this.definition(), binary.definition());
  }
  isImage() {
    const rawContentType = this.raw().contentType();
    if (rawContentType) {
      return rawContentType.split("/")[0] === "image";
    }
    return false;
  }
  definition() {
    return this._transformation || null;
  }
  objSpaceId() {
    return this._objSpaceId;
  }
  accessType() {
    if (this.isPrivate()) {
      return "private_access";
    }
    return "public_access";
  }
  assertNotTransformed(fieldName) {
    if (this.isTransformed()) {
      throw new common/* ScrivitoError */.Ix(
        `"${fieldName}" is not available for transformed images. Use "Scrivito.Binary#raw" to access the untransformed version of the image.`
      );
    }
  }
  isTransformed() {
    return !!this._transformation;
  }
}
const BinaryOptionsType = common/* tcomb.interface */.pC["interface"]({
  contentType: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String),
  filename: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String)
});
const SourceType = common/* tcomb.refinement */.pC.refinement(
  common/* tcomb.Object */.pC.Object,
  (value) => common/* BlobType.is */.R0.is(value) || common/* FileType.is */.Tv.is(value),
  "Blob or File"
);
const checkUpload = (0,common/* checkArgumentsFor */.PJ)(
  "Binary.upload",
  [
    ["source", SourceType],
    ["options", common/* tcomb.maybe */.pC.maybe(BinaryOptionsType)]
  ],
  {
    docPermalink: "js-sdk/Binary-static-upload"
  }
);

;// CONCATENATED MODULE: ./scrivito_sdk/models/basic_scope_create_methods.ts
var basic_scope_create_methods_defProp = Object.defineProperty;
var basic_scope_create_methods_defProps = Object.defineProperties;
var basic_scope_create_methods_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var basic_scope_create_methods_getOwnPropSymbols = Object.getOwnPropertySymbols;
var basic_scope_create_methods_hasOwnProp = Object.prototype.hasOwnProperty;
var basic_scope_create_methods_propIsEnum = Object.prototype.propertyIsEnumerable;
var basic_scope_create_methods_defNormalProp = (obj, key, value) => key in obj ? basic_scope_create_methods_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var basic_scope_create_methods_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (basic_scope_create_methods_hasOwnProp.call(b, prop))
      basic_scope_create_methods_defNormalProp(a, prop, b[prop]);
  if (basic_scope_create_methods_getOwnPropSymbols)
    for (var prop of basic_scope_create_methods_getOwnPropSymbols(b)) {
      if (basic_scope_create_methods_propIsEnum.call(b, prop))
        basic_scope_create_methods_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var basic_scope_create_methods_spreadProps = (a, b) => basic_scope_create_methods_defProps(a, basic_scope_create_methods_getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (basic_scope_create_methods_hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && basic_scope_create_methods_getOwnPropSymbols)
    for (var prop of basic_scope_create_methods_getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && basic_scope_create_methods_propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};


function createObjIn(scope, _a) {
  var _b = _a, { _id: objId, _objClass: objClass } = _b, otherAttributes = __objRest(_b, ["_id", "_objClass"]);
  const obj = scope.create(
    denormalizeSystemAttributeValue(objId) || BasicObj.generateId(),
    { _obj_class: denormalizeSystemAttributeValue(objClass) }
  );
  obj.update(otherAttributes);
  return obj;
}
function createObjFromFileIn(scope, file, attributes) {
  const maybeId = denormalizeSystemAttributeValue(attributes._id);
  const objId = maybeId || BasicObj.generateId();
  return Binary.upload(file).intoId(objId).then((binary) => {
    const basicObj = createObjIn(scope, basic_scope_create_methods_spreadProps(basic_scope_create_methods_spreadValues({}, attributes), {
      _id: [objId],
      blob: [binary, ["binary"]]
    }));
    return basicObj.finishSaving().then(() => basicObj);
  });
}
function denormalizeSystemAttributeValue(value) {
  const maybeStringValue = Array.isArray(value) ? value[0] : value;
  return typeof maybeStringValue === "string" ? maybeStringValue : void 0;
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/compute_parent_path.ts
function computeParentPath(path) {
  if (!path || path === "/")
    return null;
  return path.split("/").slice(0, -1).join("/") || "/";
}

// EXTERNAL MODULE: external "speakingurl"
var external_speakingurl_ = __webpack_require__(2018);
;// CONCATENATED MODULE: ./scrivito_sdk/models/convert_to_slug.ts

function convertToSlug(input) {
  if (typeof input !== "string") {
    return "";
  }
  return external_speakingurl_(input);
}

// EXTERNAL MODULE: ./scrivito_sdk/models/current_workspace_id.ts
var current_workspace_id = __webpack_require__(3252);
;// CONCATENATED MODULE: ./scrivito_sdk/models/restrict_to_site.ts
var restrict_to_site_defProp = Object.defineProperty;
var restrict_to_site_defProps = Object.defineProperties;
var restrict_to_site_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var restrict_to_site_getOwnPropSymbols = Object.getOwnPropertySymbols;
var restrict_to_site_hasOwnProp = Object.prototype.hasOwnProperty;
var restrict_to_site_propIsEnum = Object.prototype.propertyIsEnumerable;
var restrict_to_site_defNormalProp = (obj, key, value) => key in obj ? restrict_to_site_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var restrict_to_site_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (restrict_to_site_hasOwnProp.call(b, prop))
      restrict_to_site_defNormalProp(a, prop, b[prop]);
  if (restrict_to_site_getOwnPropSymbols)
    for (var prop of restrict_to_site_getOwnPropSymbols(b)) {
      if (restrict_to_site_propIsEnum.call(b, prop))
        restrict_to_site_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var restrict_to_site_spreadProps = (a, b) => restrict_to_site_defProps(a, restrict_to_site_getOwnPropDescs(b));
function restrictToSite(siteId) {
  return {
    isInScope(obj) {
      return obj.siteId() === siteId;
    },
    applyToSearch(search) {
      return search.and("_siteId", "equals", siteId);
    },
    applyToCreate(attributes) {
      return restrict_to_site_spreadProps(restrict_to_site_spreadValues({}, attributes), { _site_id: siteId });
    }
  };
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/basic_obj.ts
var basic_obj_getOwnPropSymbols = Object.getOwnPropertySymbols;
var basic_obj_hasOwnProp = Object.prototype.hasOwnProperty;
var basic_obj_propIsEnum = Object.prototype.propertyIsEnumerable;
var basic_obj_objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (basic_obj_hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && basic_obj_getOwnPropSymbols)
    for (var prop of basic_obj_getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && basic_obj_propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};




















class BasicObj {
  static get(id) {
    return getObjFrom(currentObjSpaceWithoutDeleted(), id);
  }
  static getIncludingDeleted(id) {
    return getObjFrom(objSpaceScope((0,current_workspace_id/* currentObjSpaceId */.GD)()), id);
  }
  static createInObjSpace(objSpaceId, attributes) {
    return createObjIn(objSpaceScope(objSpaceId), attributes);
  }
  static generateId() {
    return (0,common/* randomId */.kb)();
  }
  static all() {
    return new BasicObjSearch((0,current_workspace_id/* currentObjSpaceId */.GD)()).batchSize(1e3);
  }
  static where(fields, operator, value, boost) {
    return new BasicObjSearch((0,current_workspace_id/* currentObjSpaceId */.GD)()).and(
      fields,
      operator,
      value,
      boost
    );
  }
  static getByPermalink(permalink) {
    return getObjBy(currentObjSpaceWithoutDeleted(), "_permalink", permalink);
  }
  static getAllByPermalink(permalink) {
    return getAllObjsByValueFrom(
      currentObjSpaceWithoutDeleted(),
      "_permalink",
      permalink
    );
  }
  static generateWidgetId() {
    return (0,common/* randomHex */.Q4)();
  }
  constructor(objData) {
    this.objData = objData;
  }
  id() {
    return this.objData.id();
  }
  objClass() {
    return this.getAttributeData("_obj_class");
  }
  obj() {
    return this;
  }
  createdAt() {
    return (0,common/* parseStringToDate */.sp)(this.getAttributeData("_created_at"));
  }
  createdBy() {
    return this.getAttributeData("_created_by") || null;
  }
  lastChanged() {
    const data = this.getAttributeData("_last_changed");
    if (!data)
      return null;
    return (0,common/* parseStringToDate */.sp)(data);
  }
  lastChangedBy() {
    return this.getAttributeData("_last_changed_by") || null;
  }
  firstPublishedAt() {
    return (0,common/* parseStringToDate */.sp)(this.getAttributeData("_first_published_at"));
  }
  publishedAt() {
    return (0,common/* parseStringToDate */.sp)(this.getAttributeData("_published_at"));
  }
  firstPublishedBy() {
    return this.getAttributeData("_first_published_by") || null;
  }
  publishedBy() {
    return this.getAttributeData("_published_by") || null;
  }
  objSpaceId() {
    return this.objData.objSpaceId();
  }
  version() {
    return this.getAttributeData("_version");
  }
  path() {
    return this.getAttributeData("_path") || null;
  }
  permalink() {
    return this.getAttributeData("_permalink") || null;
  }
  siteId() {
    var _a;
    return (_a = this.getAttributeData("_site_id")) != null ? _a : null;
  }
  language() {
    var _a;
    return (_a = this.getAttributeData("_language")) != null ? _a : null;
  }
  parentPath() {
    return computeParentPath(this.path());
  }
  parent() {
    const parentPath = this.parentPath();
    const siteId = this.siteId();
    if (parentPath === null || siteId === null)
      return null;
    return getObjByPath(this.objSpaceId(), siteId, parentPath);
  }
  hasConflicts() {
    return !!this.getAttributeData("_conflicts");
  }
  modification() {
    if (this.objData.isUnavailable() || this.getAttributeData("_marked_deleted")) {
      return "deleted";
    }
    return this.getAttributeData("_modification") || null;
  }
  dataClass() {
    return this.get("dataClass", "string") || null;
  }
  get(attributeName, typeInfo) {
    return getContentValue(this, attributeName, typeInfo);
  }
  isModified() {
    return !!this.modification();
  }
  isNew() {
    return this.modification() === "new";
  }
  isEdited() {
    return this.modification() === "edited";
  }
  isEditingAsset() {
    return this.getAttributeData("_editing_asset") === true;
  }
  isDeleted() {
    return this.modification() === "deleted";
  }
  contentLength() {
    return this.metadata().contentLength();
  }
  contentType() {
    return this.metadata().contentType();
  }
  contentUrl() {
    var _a;
    return ((_a = this.blob()) == null ? void 0 : _a.url()) || "";
  }
  contentId() {
    return this.getAttributeData("_content_id") || this.id();
  }
  metadata() {
    const blob = this.blob();
    return blob ? new MetadataCollection(blob.id(), this.objSpaceId()) : new MetadataCollection();
  }
  children() {
    const search = this.getChildrenSearch();
    return search ? search.dangerouslyUnboundedTake() : [];
  }
  hasChildren() {
    const search = this.getChildrenSearch();
    return search ? search.batchSize(0).count() > 0 : false;
  }
  orderedChildren() {
    const children = this.children();
    const childOrder = this.get("childOrder", "referencelist");
    if (!Array.isArray(childOrder))
      return children;
    const childOrderIds = childOrder.map(
      (child) => child instanceof BasicObj && child.id()
    );
    return (0,external_underscore_.sortBy)(children, (child) => {
      const childIndex = childOrderIds.indexOf(child.id());
      return childIndex === -1 ? childOrder.length : childIndex;
    });
  }
  backlinks() {
    return objSpaceScopeExcludingDeleted(this.objSpaceId()).search().and("*", "linksTo", this).dangerouslyUnboundedTake();
  }
  ancestors() {
    const parentPath = this.parentPath();
    const siteId = this.siteId();
    if (parentPath === null || siteId === null)
      return [];
    return (0,common/* computeAncestorPaths */.dJ)(parentPath).map(
      (ancestorPath) => getObjByPath(this.objSpaceId(), siteId, ancestorPath)
    );
  }
  restriction() {
    const restrictionAttribute = this.getAttributeData("_restriction");
    return normalizedRestriction(restrictionAttribute);
  }
  restrict(restriction = "_auth") {
    this.update({
      _restriction: restriction === "_public" ? null : [[restriction]]
    });
  }
  unrestrict() {
    this.restrict("_public");
  }
  isRestricted() {
    return this.restriction() !== "_public";
  }
  update(attributes) {
    const normalizedAttributes = normalizeAttributes(attributes);
    this.updateWithUnknownValues(normalizedAttributes);
  }
  updateWithUnknownValues(attributes) {
    if ((0,current_workspace_id/* isCurrentWorkspacePublished */.f$)() && !(0,scrivito_sdk_data/* isUsingInMemoryTenant */.zQ)()) {
      throw new common/* ScrivitoError */.Ix("The published content cannot be modified.");
    }
    (0,state/* withBatchedUpdates */.tH)(() => {
      persistWidgets(this, attributes);
      const patch = serialize(attributes);
      this.objData.update(patch);
    });
    this.startLinkResolution();
  }
  destroy() {
    this.update({ _markedDeleted: [true] });
  }
  insertWidget(widget, anchor) {
    const id = widgetIdFromWidgetInsertionAnchor(anchor);
    const placement = this.widgetPlacementFor(id);
    if (placement) {
      const { attributeValue, attributeName, container, index } = placement;
      if (!Array.isArray(attributeValue))
        throw new common/* InternalError */.AQ();
      const newIndex = anchor.before ? index : index + 1;
      const newAttributeValue = [
        ...attributeValue.slice(0, newIndex),
        widget,
        ...attributeValue.slice(newIndex)
      ];
      container.update({
        [attributeName]: [newAttributeValue, ["widgetlist"]]
      });
    }
  }
  removeWidget(widget) {
    const widgetOrWidgetlistField = this.fieldContainingWidget(widget);
    if (!widgetOrWidgetlistField)
      return;
    if (widgetOrWidgetlistField.type() === "widgetlist") {
      const widgetlistField = widgetOrWidgetlistField;
      const value = widgetlistField.get();
      const newValue = (0,external_underscore_.reject)(value, (curWidget) => curWidget.equals(widget));
      widgetlistField.update(newValue);
    } else {
      const widgetField = widgetOrWidgetlistField;
      widgetField.update(null);
    }
  }
  siblingWidget(widget, indexOffset) {
    const placement = this.widgetPlacementFor(widget.id());
    if (placement) {
      const { attributeValue, index } = placement;
      if (Array.isArray(attributeValue)) {
        return attributeValue[index + indexOffset];
      }
    }
  }
  markResolvedAsync() {
    this.update({ _conflicts: [null] });
    return this.finishSaving();
  }
  finishSaving() {
    return this.finishLinkResolution().then(() => this.objData.finishSaving());
  }
  equals(other) {
    return other instanceof BasicObj && this.id() === other.id() && (0,common/* equals */.fS)(this.objSpaceId(), other.objSpaceId());
  }
  widget(id) {
    if (!this.getWidgetAttribute(id, "_obj_class"))
      return null;
    return BasicWidget.build(id, this);
  }
  getWidgetAttribute(id, attributeName) {
    return this.objData.getWidgetAttribute(id, attributeName);
  }
  widgets() {
    const data = this.objData.getIfExistent();
    if (!data)
      return [];
    const widgetPool = data._widget_pool;
    if (!widgetPool)
      return [];
    const widgets = [];
    const visitedWidgetIds = {};
    this.collectWidgets(widgets, data, widgetPool, visitedWidgetIds);
    return widgets;
  }
  widgetClassNamesWithBadPerformance() {
    const widgetPool = this.objData.getWidgetPoolWithBadPerformance();
    if (!widgetPool)
      return [];
    return (0,external_underscore_.uniq)(
      (0,external_underscore_.compact)(Object.values(widgetPool)).map(
        (widgetJson) => widgetJson._obj_class
      )
    );
  }
  fieldContainingWidget(widget) {
    const widgetId = widget.id();
    const placement = this.widgetPlacementFor(widgetId);
    if (placement) {
      const { container, attributeName, attributeValue } = placement;
      return Array.isArray(attributeValue) ? new BasicField(container, attributeName, ["widgetlist"]) : new BasicField(container, attributeName, ["widget"]);
    }
  }
  generateWidgetId() {
    for (let i = 0; i < 10; i++) {
      const id = BasicObj.generateWidgetId();
      if (!this.widget(id))
        return id;
    }
    throw new common/* InternalError */.AQ();
  }
  serializeAttributes() {
    const _a = serializeAttributes(this), {
      _conflicts,
      _modification,
      _created_at,
      _created_by,
      _last_changed,
      _last_changed_by
    } = _a, serializedAttributes = basic_obj_objRest(_a, [
      "_conflicts",
      "_modification",
      "_created_at",
      "_created_by",
      "_last_changed",
      "_last_changed_by"
    ]);
    return serializedAttributes;
  }
  slug() {
    const title = this.get("title", "string");
    return convertToSlug(title);
  }
  getWidgetData(id) {
    return this.objData.getWidget(id);
  }
  startLinkResolution() {
    if (!(0,scrivito_sdk_data/* isUsingInMemoryTenant */.zQ)()) {
      (0,link_resolution/* startLinkResolutionFor */.J2)((0,current_workspace_id/* currentWorkspaceId */.tV)(), this.id());
    }
  }
  finishLinkResolution() {
    return (0,link_resolution/* finishLinkResolutionFor */.gu)((0,current_workspace_id/* currentWorkspaceId */.tV)(), this.id());
  }
  toPrettyPrint() {
    return `[object ${this.objClass()} id="${this.id()}"]`;
  }
  getAttributeData(attributeName, type) {
    return type === "widget" || type === "widgetlist" ? this.objData.getAttributeWithWidgetData(attributeName) : this.objData.getAttributeWithoutWidgetData(attributeName);
  }
  getData() {
    return this.objData.get();
  }
  blob() {
    return this.get("blob", ["binary"]);
  }
  collectWidgets(memo, objOrWidgetData, widgetPool, visitedWidgetIds) {
    Object.keys(objOrWidgetData).map((attributeName) => {
      const attrDictValue = objOrWidgetData[attributeName];
      if (!attrDictValue)
        return;
      if ((0,common/* isSystemAttribute */.mb)(attributeName))
        return;
      const attributeJson = attrDictValue;
      if ((0,client.isWidgetlistAttributeJson)(attributeJson))
        return attributeJson[1];
    }).forEach((widgetIds) => {
      if (widgetIds) {
        widgetIds.forEach((widgetId) => {
          if (visitedWidgetIds[widgetId])
            return;
          visitedWidgetIds[widgetId] = true;
          const widget = this.widget(widgetId);
          if (!widget)
            return;
          memo.push(widget);
          const widgetData = widgetPool[widgetId];
          this.collectWidgets(memo, widgetData, widgetPool, visitedWidgetIds);
        });
      }
    });
  }
  widgetPlacementFor(widgetId) {
    const data = this.objData.getIfExistent();
    if (!data)
      return;
    const placement = (0,scrivito_sdk_data/* findWidgetPlacement */.uw)(data, widgetId);
    if (!placement)
      return;
    const attributeName = (0,common/* camelCase */.eV)(placement.attributeName);
    const { attributeType, index, parentWidgetId } = placement;
    let container;
    if (parentWidgetId) {
      container = this.widget(parentWidgetId);
      if (!container)
        return;
    } else {
      container = this;
    }
    return {
      container,
      attributeName,
      attributeType,
      attributeValue: container.get(attributeName, [attributeType]),
      index,
      parentWidgetId
    };
  }
  getChildrenSearch() {
    const path = this.path();
    const siteId = this.siteId();
    if (!path || siteId === null)
      return;
    return hierarchyObjSpace(this.objSpaceId(), siteId).search().and("_parentPath", "equals", path);
  }
}
function widgetIdFromWidgetInsertionAnchor(anchor) {
  if (isWidgetInsertionBefore(anchor))
    return anchor.before.id();
  return anchor.after.id();
}
function isWidgetInsertionBefore(anchor) {
  return !!anchor.before;
}
function currentObjSpaceWithoutDeleted() {
  return objSpaceScopeExcludingDeleted((0,current_workspace_id/* currentObjSpaceId */.GD)());
}
function getObjByPath(objSpaceId, siteId, path) {
  return getObjBy(hierarchyObjSpace(objSpaceId, siteId), "_path", path);
}
function hierarchyObjSpace(objSpaceId, siteId) {
  return objSpaceScopeExcludingDeleted(objSpaceId).and(restrictToSite(siteId));
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/basic_link.ts
var basic_link_defProp = Object.defineProperty;
var basic_link_getOwnPropSymbols = Object.getOwnPropertySymbols;
var basic_link_hasOwnProp = Object.prototype.hasOwnProperty;
var basic_link_propIsEnum = Object.prototype.propertyIsEnumerable;
var basic_link_defNormalProp = (obj, key, value) => key in obj ? basic_link_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var basic_link_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (basic_link_hasOwnProp.call(b, prop))
      basic_link_defNormalProp(a, prop, b[prop]);
  if (basic_link_getOwnPropSymbols)
    for (var prop of basic_link_getOwnPropSymbols(b)) {
      if (basic_link_propIsEnum.call(b, prop))
        basic_link_defNormalProp(a, prop, b[prop]);
    }
  return a;
};






class BasicLink {
  constructor(attributes) {
    this.attributes = basic_link_spreadValues({}, attributes);
  }
  title() {
    return this.attributes.title || null;
  }
  query() {
    return this.attributes.query || null;
  }
  hash() {
    return this.attributes.hash || null;
  }
  rel() {
    return this.attributes.rel || null;
  }
  target() {
    return this.attributes.target || null;
  }
  url() {
    return this.attributes.url || null;
  }
  objId() {
    return this.attributes.objId || null;
  }
  obj() {
    const objId = this.objId();
    if (!objId)
      return null;
    const scope = objSpaceScopeExcludingDeleted((0,current_workspace_id/* currentObjSpaceId */.GD)());
    return getObjIncludingUnavailableFrom(scope, objId);
  }
  queryParameters() {
    return external_urijs_.parseQuery(this.query() || "");
  }
  isExternal() {
    return !!this.url();
  }
  isInternal() {
    return !this.isExternal();
  }
  equals(otherLink) {
    if (!(otherLink instanceof BasicLink)) {
      return false;
    }
    if (this.isExternal()) {
      return this.hash() === otherLink.hash() && this.query() === otherLink.query() && this.rel() === otherLink.rel() && this.target() === otherLink.target() && this.title() === otherLink.title() && this.url() === otherLink.url();
    }
    return this.objId() === otherLink.objId() && this.title() === otherLink.title();
  }
  copy(attributes = {}) {
    const newAttributes = basic_link_spreadValues(basic_link_spreadValues({}, this.attributes), attributes);
    if (attributes.objId && attributes.url) {
      throw new common/* ArgumentError */.ir(
        'Link#copy refused: both "objId" and "url" have been specified with truthy values'
      );
    }
    if (attributes.objId) {
      newAttributes.url = null;
    } else if (attributes.url) {
      newAttributes.objId = null;
    }
    return new BasicLink(newAttributes);
  }
  isEmpty() {
    return !this.isExternal() && !this.objId();
  }
  hasDestination() {
    return this.isExternal() || this.obj() instanceof BasicObj;
  }
  toPrettyPrint() {
    if (this.isInternal()) {
      return `[object Link objId="${this.objId()}"]`;
    }
    return `[object Link url="${this.url()}"]`;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/attribute_serializer.ts








function serialize(attributes) {
  const serializedAttributes = {};
  Object.keys(attributes).forEach((name) => {
    const serializedName = convertCamelCasedAttributeName(name);
    if ((0,common/* isSystemAttribute */.mb)(serializedName)) {
      const [value] = attributes[name];
      serializedAttributes[serializedName] = value;
    } else {
      const [value, typeInfo] = attributes[name];
      serializedAttributes[serializedName] = serializeAttributeEntry(
        value,
        name,
        typeInfo
      );
    }
  });
  return serializedAttributes;
}
function serializeAttributeEntry(value, name, typeInfo) {
  if (value === null)
    return null;
  const serializedEntry = serializeEntry(value, name, typeInfo);
  if ((0,common/* isEmptyValue */.O2)(serializedEntry[1]))
    return null;
  return serializedEntry;
}
function serializeEntry(value, name, typeInfo) {
  switch (typeInfo[0]) {
    case "binary":
      return ["binary", serializeBinaryAttributeValue(value, name)];
    case "boolean":
      return ["boolean", serializeBooleanAttributeValue(value, name)];
    case "datalocator":
      return ["datalocator", serializeDataLocatorAttributeValue(value, name)];
    case "date":
      return ["date", serializeDateAttributeValue(value, name)];
    case "datetime":
      return ["date", serializeDateAttributeValue(value, name)];
    case "enum":
      return ["string", serializeEnumAttributeValue(value, name, typeInfo[1])];
    case "float":
      return ["number", serializeFloatAttributeValue(value, name)];
    case "html":
      return ["html", serializeHtmlAttributeValue(value, name)];
    case "integer":
      return ["number", serializeIntegerAttributeValue(value, name)];
    case "link":
      return ["link", serializeLinkAttributeValue(value, name)];
    case "linklist":
      return ["linklist", serializeLinklistAttributeValue(value, name)];
    case "multienum":
      return [
        "stringlist",
        serializeMultienumAttributeValue(value, name, typeInfo[1])
      ];
    case "reference":
      return ["reference", serializeReferenceAttributeValue(value, name)];
    case "referencelist":
      return [
        "referencelist",
        serializeReferencelistAttributeValue(value, name)
      ];
    case "string":
      return ["string", serializeStringAttributeValue(value, name)];
    case "stringlist":
      return ["stringlist", serializeStringlistAttributeValue(value, name)];
    case "widget":
      return ["widget", serializeWidgetAttributeValue(value, name)];
    case "widgetlist":
      return ["widgetlist", serializeWidgetlistAttributeValue(value, name)];
    default:
      throw new common/* ArgumentError */.ir(
        `Attribute "${name}" is of unsupported type "${typeInfo[0]}".`
      );
  }
}
function throwInvalidAttributeValue(value, name, expected) {
  throw new common/* ArgumentError */.ir(
    `Unexpected value ${(0,common/* prettyPrint */.xr)(value)} for attribute "${name}". Expected: ${expected}`
  );
}
function serializeBinaryAttributeValue(value, name) {
  if (value instanceof Binary)
    return { id: value.id() };
  throwInvalidAttributeValue(value, name, "A Binary.");
}
function serializeBooleanAttributeValue(value, name) {
  if (value === false || value === true)
    return value;
  throwInvalidAttributeValue(value, name, "A Boolean.");
}
function serializeDataLocatorAttributeValue(value, name) {
  if (value instanceof data_integration/* DataLocator */.s4)
    return value.toPojo();
  throwInvalidAttributeValue(value, name, "A DataLocator.");
}
function serializeDateAttributeValue(value, name) {
  if ((0,external_underscore_.isDate)(value))
    return (0,common/* formatDateToString */.xH)(value);
  if ((0,common/* isValidDateString */.ix)(value))
    return value;
  throwInvalidAttributeValue(value, name, "A Date.");
}
function serializeEnumAttributeValue(value, name, { values }) {
  if ((0,external_underscore_.contains)(values, value))
    return value;
  const e = `Valid attribute values are contained in its "values" array [${values}].`;
  throwInvalidAttributeValue(value, name, e);
}
function serializeFloatAttributeValue(value, name) {
  if ((0,common/* isValidFloat */.RY)(value))
    return value;
  let invalidValue = value;
  if ((0,external_underscore_.isNumber)(value)) {
    invalidValue = String(value);
  }
  throwInvalidAttributeValue(
    invalidValue,
    name,
    "A Number, that is #isFinite()."
  );
}
function serializeHtmlAttributeValue(value, name) {
  if ((0,external_underscore_.isString)(value))
    return value;
  throwInvalidAttributeValue(value, name, "A String.");
}
function serializeIntegerAttributeValue(value, name) {
  if ((0,common/* isValidInteger */.eZ)(value))
    return value;
  throwInvalidAttributeValue(
    value,
    name,
    "A Number, that is #isSafeInteger()."
  );
}
function serializeLinkAttributeValue(value, name) {
  if (isValidLinkInputValue(value))
    return convertLinkToCmsApi(value);
  throwInvalidAttributeValue(
    value,
    name,
    "A Link instance with a destination."
  );
}
function serializeLinklistAttributeValue(value, name) {
  if (Array.isArray(value) && value.every(isValidLinkInputValue)) {
    return value.map(convertLinkToCmsApi);
  }
  throwInvalidAttributeValue(
    value,
    name,
    "An array of Link instances with destinations set."
  );
}
function serializeMultienumAttributeValue(value, name, { values }) {
  if (!(0,common/* isStringArray */.GI)(value)) {
    throwInvalidAttributeValue(
      value,
      name,
      `An array with values from ${(0,common/* prettyPrint */.xr)(values)}.`
    );
  }
  const forbiddenValues = (0,external_underscore_.difference)(value, values);
  if (forbiddenValues.length) {
    throwInvalidAttributeValue(
      value,
      name,
      `An array with values from ${(0,common/* prettyPrint */.xr)(
        values
      )}. Forbidden values: ${(0,common/* prettyPrint */.xr)(forbiddenValues)}.`
    );
  }
  return value;
}
function serializeReferenceAttributeValue(value, name) {
  if (isValidReference(value))
    return serializeSingleReferenceValue(value);
  throwInvalidAttributeValue(value, name, "An Obj.");
}
function serializeReferencelistAttributeValue(value, name) {
  if (isValidReferencelistValue(value)) {
    return value.map(serializeSingleReferenceValue);
  }
  throwInvalidAttributeValue(value, name, "An array with Objs.");
}
function serializeSingleReferenceValue(value) {
  return typeof value === "string" ? value : value.id();
}
function isValidReference(value) {
  return (0,external_underscore_.isString)(value) || value instanceof BasicObj || value instanceof ObjUnavailable;
}
function isValidReferencelistValue(value) {
  return Array.isArray(value) && value.every((v) => isValidReference(v));
}
function serializeStringAttributeValue(value, name) {
  if (isValidString(value))
    return value.toString();
  throwInvalidAttributeValue(value, name, "A String.");
}
function serializeStringlistAttributeValue(value, name) {
  if (isStringOrNumberArray(value)) {
    return value.map((v) => v.toString());
  }
  throwInvalidAttributeValue(value, name, "An array of strings.");
}
function isValidString(value) {
  return (0,external_underscore_.isString)(value) || (0,external_underscore_.isNumber)(value);
}
function serializeWidgetAttributeValue(value, name) {
  if (value instanceof BasicWidget)
    return value.id();
  throwInvalidAttributeValue(value, name, "An instance of Widget.");
}
function serializeWidgetlistAttributeValue(value, name) {
  if (value instanceof BasicWidget) {
    return serializeWidgetlistAttributeValue([value], name);
  }
  if (isBasicWidgetArray(value))
    return value.map((v) => v.id());
  throwInvalidAttributeValue(value, name, "An array of Widget instances.");
}
function isBasicWidgetArray(value) {
  return Array.isArray(value) && value.every((v) => v instanceof BasicWidget);
}
function isStringOrNumberArray(value) {
  return Array.isArray(value) && value.every((v) => isValidString(v));
}
function isValidLinkInputValue(value) {
  if (value instanceof BasicLink)
    return !value.isEmpty();
  if (!(0,external_underscore_.isObject)(value))
    return false;
  if ((0,external_underscore_.isEmpty)((0,external_underscore_.compact)((0,external_underscore_.values)(value))))
    return false;
  const invalidKeys = (0,external_underscore_.without)(
    Object.keys(value),
    "hash",
    "obj_id",
    "query",
    "rel",
    "target",
    "title",
    "url"
  );
  return (0,external_underscore_.isEmpty)(invalidKeys);
}
function convertCamelCasedAttributeName(name) {
  if (!(0,common/* isCamelCase */.q2)(name)) {
    throw new common/* ArgumentError */.ir("Attribute names have to be in camel case.");
  }
  return (0,common/* underscore */.It)(name);
}
function convertLinkToCmsApi(value) {
  const cmsApiValue = value instanceof BasicLink ? convertBasicLinkToCmsApi(value) : convertLinkObjectToCmsApi(value);
  if (!cmsApiValue.rel) {
    delete cmsApiValue.rel;
  }
  return cmsApiValue;
}
function convertBasicLinkToCmsApi(basicLink) {
  return {
    rel: basicLink.rel() || void 0,
    query: basicLink.query(),
    target: basicLink.target(),
    title: basicLink.title(),
    url: basicLink.url(),
    obj_id: basicLink.objId(),
    fragment: basicLink.hash()
  };
}
function convertLinkObjectToCmsApi(value) {
  return {
    obj_id: value.obj_id || null,
    query: value.query || null,
    rel: value.rel || void 0,
    target: value.target || null,
    title: value.title || null,
    url: value.url || null,
    fragment: value.hash || null
  };
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/basic_widget.ts
var basic_widget_defProp = Object.defineProperty;
var basic_widget_getOwnPropSymbols = Object.getOwnPropertySymbols;
var basic_widget_hasOwnProp = Object.prototype.hasOwnProperty;
var basic_widget_propIsEnum = Object.prototype.propertyIsEnumerable;
var basic_widget_defNormalProp = (obj, key, value) => key in obj ? basic_widget_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var basic_widget_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (basic_widget_hasOwnProp.call(b, prop))
      basic_widget_defNormalProp(a, prop, b[prop]);
  if (basic_widget_getOwnPropSymbols)
    for (var prop of basic_widget_getOwnPropSymbols(b)) {
      if (basic_widget_propIsEnum.call(b, prop))
        basic_widget_defNormalProp(a, prop, b[prop]);
    }
  return a;
};






class BasicWidget {
  constructor(_id, _obj, attributesToBeSaved, preserializedAttributes) {
    this._id = _id;
    this._obj = _obj;
    this.preserializedAttributes = preserializedAttributes;
    if (!_obj) {
      if (attributesToBeSaved && isAttributesToBeSaved(attributesToBeSaved)) {
        this.attributesToBeSaved = attributesToBeSaved;
      } else {
        throw new common/* ArgumentError */.ir(
          'Please provide a widget class as the "_objClass" property.'
        );
      }
    }
  }
  static build(id, obj) {
    return new BasicWidget(id, obj);
  }
  static newWithSerializedAttributes(attributes) {
    const unserializedAttributes = {};
    const serializedAttributes = {};
    Object.keys(attributes).forEach((name) => {
      const value = attributes[name];
      if (name === "_obj_class") {
        unserializedAttributes._objClass = [value];
        return;
      }
      if (Array.isArray(value)) {
        const [type, maybeWidgetData] = value;
        if (type === "widget") {
          const widgetData = maybeWidgetData;
          const newWidget = BasicWidget.newWithSerializedAttributes(widgetData);
          const attrName = (0,common/* camelCase */.eV)(name);
          unserializedAttributes[attrName] = [newWidget, ["widget"]];
          return;
        }
        if (type === "widgetlist") {
          const widgetData = maybeWidgetData;
          const newWidgets = widgetData.map((serializedWidget) => {
            return BasicWidget.newWithSerializedAttributes(serializedWidget);
          });
          const attrName = (0,common/* camelCase */.eV)(name);
          unserializedAttributes[attrName] = [newWidgets, ["widgetlist"]];
          return;
        }
      }
      serializedAttributes[name] = value;
    });
    return new BasicWidget(
      void 0,
      void 0,
      unserializedAttributes,
      serializedAttributes
    );
  }
  static create(attributes) {
    return new BasicWidget(
      void 0,
      void 0,
      normalizeAttributes(attributes)
    );
  }
  static createWithUnknownValues(attributes) {
    return new BasicWidget(void 0, void 0, attributes);
  }
  id() {
    this.failIfNotPersisted();
    return this._id;
  }
  objClass() {
    if (this.isPersisted()) {
      return this.getAttributeData("_obj_class");
    }
    const [objClass] = this.attributesToBeSaved._objClass;
    return objClass;
  }
  obj() {
    this.failIfNotPersisted();
    return this._obj;
  }
  objSpaceId() {
    return this.obj().objSpaceId();
  }
  widget(id) {
    return this.obj().widget(id);
  }
  modification([from, to]) {
    return (0,scrivito_sdk_data/* getWidgetModification */.mG)(from, to, this.obj().id(), this.id());
  }
  get(attributeName, typeInfo) {
    return getContentValue(this, attributeName, typeInfo);
  }
  container() {
    (0,scrivito_sdk_data/* failIfPerformanceConstraint */.Id)(
      "for performance reasons, avoid this method when rendering"
    );
    return this.containingField().getContainer();
  }
  update(attributes) {
    const normalizedAttributes = normalizeAttributes(attributes);
    this.updateWithUnknownValues(normalizedAttributes);
  }
  updateWithUnknownValues(attributes) {
    (0,state/* withBatchedUpdates */.tH)(() => {
      persistWidgets(this.obj(), attributes);
      const patch = serialize(attributes);
      this.updateSelf(patch);
    });
  }
  insertBefore(widget) {
    widget.obj().insertWidget(this, { before: widget });
  }
  insertAfter(widget) {
    widget.obj().insertWidget(this, { after: widget });
  }
  remove() {
    this.obj().removeWidget(this);
  }
  copy() {
    if (this.isPersisted()) {
      return this.copyPersisted();
    }
    return this.copyUnpersisted();
  }
  persistInObjIfNecessary(obj) {
    if (this.isPersisted())
      return;
    const normalizedAttributes = this.attributesToBeSaved;
    persistWidgets(obj, normalizedAttributes);
    const patch = basic_widget_spreadValues(basic_widget_spreadValues({}, serialize(normalizedAttributes)), this.preserializedAttributes);
    this._obj = obj;
    this._id = obj.generateWidgetId();
    this.updateSelf(patch);
    this.executeDidPersistCallback();
  }
  isPersisted() {
    return !!this._obj;
  }
  onDidPersist(callback) {
    if (this.isPersisted()) {
      throw new common/* ScrivitoError */.Ix(
        'Cannot call "onDidPersist" of an already persisted widget'
      );
    }
    this.onDidPersistCallback = callback;
  }
  hasOnDidPersistCallback() {
    return !!this.onDidPersistCallback;
  }
  finishSaving() {
    return this.obj().finishSaving();
  }
  equals(other) {
    return other instanceof BasicWidget && this.id() === other.id() && this.obj().equals(other.obj());
  }
  containingField() {
    return this.obj().fieldContainingWidget(this);
  }
  toPrettyPrint() {
    return `[object ${this.objClass()} id="${this.id()}" objId="${this.obj().id()}"]`;
  }
  getAttributeData(attributeName) {
    return this.obj().getWidgetAttribute(this.id(), attributeName);
  }
  getData() {
    return this.obj().getWidgetData(this.id());
  }
  getAttributesToBeSaved() {
    return this.attributesToBeSaved;
  }
  failIfNotPersisted() {
    if (!this.isPersisted()) {
      throw new common/* ScrivitoError */.Ix(
        "Can not access a new widget before it has been saved."
      );
    }
  }
  updateSelf(patch) {
    const widgetPoolPatch = { _widgetPool: [{ [this.id()]: patch }] };
    this.obj().update(widgetPoolPatch);
  }
  executeDidPersistCallback() {
    if (this.onDidPersistCallback) {
      this.onDidPersistCallback(this);
      delete this.onDidPersistCallback;
    }
  }
  copyPersisted() {
    const serializedAttributes = serializeAttributes(this);
    return BasicWidget.newWithSerializedAttributes(serializedAttributes);
  }
  copyUnpersisted() {
    const copy = new BasicWidget(
      void 0,
      void 0,
      (0,external_underscore_.mapObject)(this.attributesToBeSaved, copyNormalizedValue)
    );
    if (this.onDidPersistCallback) {
      copy.onDidPersist(this.onDidPersistCallback);
    }
    return copy;
  }
}
function copyNormalizedValue(valueAndType) {
  if (isWidgetAttributeValueAndType(valueAndType)) {
    const [widget, typeInfo] = valueAndType;
    return [widget.copy(), typeInfo];
  }
  if (isWidgetlistAttributeValueAndType(valueAndType)) {
    const [value, typeInfo] = valueAndType;
    const widgets = Array.isArray(value) ? value : [value];
    return [widgets.map((widget) => widget.copy()), typeInfo];
  }
  return valueAndType.slice(0);
}
function isAttributesToBeSaved(attributes) {
  const value = attributes._objClass;
  if (!value)
    return false;
  const [objClass] = value;
  return typeof objClass === "string";
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/basic_attribute_content.ts





function getContentValue(content, attributeName, typeInfo) {
  if (typeof typeInfo === "string") {
    const normalizedTypeInfo = [typeInfo];
    return getContentValue(content, attributeName, normalizedTypeInfo);
  }
  return getContentValueUsingInternalName(
    content,
    (0,common/* underscore */.It)(attributeName),
    typeInfo
  );
}
function getContentValueUsingInternalName(content, internalAttributeName, typeInfo) {
  const rawValue = content.getAttributeData(internalAttributeName, typeInfo[0]);
  return deserialize(content, rawValue, typeInfo);
}
function serializeAttributes(content) {
  return (0,external_underscore_.mapObject)(content.getData(), (value, name) => {
    if (value && !(0,common/* isSystemAttribute */.mb)(name)) {
      if ((0,client.isWidgetAttributeJson)(value)) {
        const widget = getContentValueUsingInternalName(content, name, [
          "widget"
        ]);
        return ["widget", widget ? serializeAttributes(widget) : null];
      }
      if ((0,client.isWidgetlistAttributeJson)(value)) {
        const widgets = getContentValueUsingInternalName(content, name, [
          "widgetlist"
        ]);
        return ["widgetlist", widgets.map(serializeAttributes)];
      }
    }
    return value;
  });
}
function persistWidgets(obj, attributes) {
  Object.keys(attributes).forEach((key) => {
    const valueAndType = attributes[key];
    if (isWidgetAttributeValueAndType(valueAndType)) {
      valueAndType[0].persistInObjIfNecessary(obj);
    }
    if (isWidgetlistAttributeValueAndType(valueAndType)) {
      const [value] = valueAndType;
      const widgets = Array.isArray(value) ? value : [value];
      widgets.forEach((widget) => {
        widget.persistInObjIfNecessary(obj);
      });
    }
  });
}
function isWidgetAttributeValueAndType(valueAndType) {
  if (valueAndType.length < 2)
    return false;
  const [value, typeInfo] = valueAndType;
  const [type] = typeInfo;
  if (type !== "widget")
    return false;
  return value instanceof BasicWidget;
}
function isWidgetlistAttributeValueAndType(valueAndType) {
  if (valueAndType.length < 2)
    return false;
  const [value, typeInfo] = valueAndType;
  const [type] = typeInfo;
  if (type !== "widgetlist")
    return false;
  if (value instanceof BasicWidget)
    return true;
  if (!Array.isArray(value))
    return false;
  return value.every((entry) => entry instanceof BasicWidget);
}
function normalizeAttributes(attributes) {
  return (0,external_underscore_.mapObject)(attributes, (attributeValue, name) => {
    if ((0,common/* isSystemAttribute */.mb)(name)) {
      if (Array.isArray(attributeValue))
        return attributeValue;
      return [attributeValue];
    }
    if (!Array.isArray(attributeValue)) {
      throw new common/* InternalError */.AQ();
    }
    const [value, typeInfo] = attributeValue;
    if (typeof typeInfo === "string") {
      return [value, [typeInfo]];
    }
    return [value, typeInfo];
  });
}
function normalizedRestriction(restrictionAttribute) {
  return restrictionAttribute ? restrictionAttribute[0] : "_public";
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/all_sites_and_global.ts
var all_sites_and_global_defProp = Object.defineProperty;
var all_sites_and_global_getOwnPropSymbols = Object.getOwnPropertySymbols;
var all_sites_and_global_hasOwnProp = Object.prototype.hasOwnProperty;
var all_sites_and_global_propIsEnum = Object.prototype.propertyIsEnumerable;
var all_sites_and_global_defNormalProp = (obj, key, value) => key in obj ? all_sites_and_global_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var all_sites_and_global_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (all_sites_and_global_hasOwnProp.call(b, prop))
      all_sites_and_global_defNormalProp(a, prop, b[prop]);
  if (all_sites_and_global_getOwnPropSymbols)
    for (var prop of all_sites_and_global_getOwnPropSymbols(b)) {
      if (all_sites_and_global_propIsEnum.call(b, prop))
        all_sites_and_global_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const allSitesAndGlobal = {
  isInScope: () => true,
  applyToSearch: (search) => search,
  applyToCreate: (attributes) => all_sites_and_global_spreadValues({ _site_id: null }, attributes)
};

;// CONCATENATED MODULE: ./scrivito_sdk/models/empty_scope.ts

function emptyScope() {
  return objSpaceScope(["empty"]);
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/exclude_global.ts

const excludeGlobal = {
  isInScope(obj) {
    return obj.siteId() !== null;
  },
  applyToSearch(search) {
    return search.andNot("_siteId", "equals", null);
  },
  applyToCreate() {
    throw new common/* InternalError */.AQ();
  }
};

;// CONCATENATED MODULE: ./scrivito_sdk/models/restrict_to_global.ts
var restrict_to_global_defProp = Object.defineProperty;
var restrict_to_global_defProps = Object.defineProperties;
var restrict_to_global_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var restrict_to_global_getOwnPropSymbols = Object.getOwnPropertySymbols;
var restrict_to_global_hasOwnProp = Object.prototype.hasOwnProperty;
var restrict_to_global_propIsEnum = Object.prototype.propertyIsEnumerable;
var restrict_to_global_defNormalProp = (obj, key, value) => key in obj ? restrict_to_global_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var restrict_to_global_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (restrict_to_global_hasOwnProp.call(b, prop))
      restrict_to_global_defNormalProp(a, prop, b[prop]);
  if (restrict_to_global_getOwnPropSymbols)
    for (var prop of restrict_to_global_getOwnPropSymbols(b)) {
      if (restrict_to_global_propIsEnum.call(b, prop))
        restrict_to_global_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var restrict_to_global_spreadProps = (a, b) => restrict_to_global_defProps(a, restrict_to_global_getOwnPropDescs(b));
const restrictToGlobal = {
  isInScope(obj) {
    return obj.siteId() === null;
  },
  applyToSearch(search) {
    return search.and("_siteId", "equals", null);
  },
  applyToCreate(attributes) {
    return restrict_to_global_spreadProps(restrict_to_global_spreadValues({}, attributes), { _site_id: null });
  }
};

;// CONCATENATED MODULE: ./scrivito_sdk/models/restrict_to_site_and_global.ts
var restrict_to_site_and_global_defProp = Object.defineProperty;
var restrict_to_site_and_global_defProps = Object.defineProperties;
var restrict_to_site_and_global_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var restrict_to_site_and_global_getOwnPropSymbols = Object.getOwnPropertySymbols;
var restrict_to_site_and_global_hasOwnProp = Object.prototype.hasOwnProperty;
var restrict_to_site_and_global_propIsEnum = Object.prototype.propertyIsEnumerable;
var restrict_to_site_and_global_defNormalProp = (obj, key, value) => key in obj ? restrict_to_site_and_global_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var restrict_to_site_and_global_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (restrict_to_site_and_global_hasOwnProp.call(b, prop))
      restrict_to_site_and_global_defNormalProp(a, prop, b[prop]);
  if (restrict_to_site_and_global_getOwnPropSymbols)
    for (var prop of restrict_to_site_and_global_getOwnPropSymbols(b)) {
      if (restrict_to_site_and_global_propIsEnum.call(b, prop))
        restrict_to_site_and_global_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var restrict_to_site_and_global_spreadProps = (a, b) => restrict_to_site_and_global_defProps(a, restrict_to_site_and_global_getOwnPropDescs(b));
function restrictToSiteAndGlobal(siteId) {
  return {
    isInScope(obj) {
      const objSiteId = obj.siteId();
      return objSiteId === siteId || objSiteId === null;
    },
    applyToSearch(search) {
      return search.and("_siteId", "equals", [siteId, null]);
    },
    applyToCreate(attributes) {
      return restrict_to_site_and_global_spreadProps(restrict_to_site_and_global_spreadValues({}, attributes), { _site_id: siteId });
    }
  };
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/update_references.ts
var update_references_defProp = Object.defineProperty;
var update_references_defProps = Object.defineProperties;
var update_references_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var update_references_getOwnPropSymbols = Object.getOwnPropertySymbols;
var update_references_hasOwnProp = Object.prototype.hasOwnProperty;
var update_references_propIsEnum = Object.prototype.propertyIsEnumerable;
var update_references_defNormalProp = (obj, key, value) => key in obj ? update_references_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var update_references_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (update_references_hasOwnProp.call(b, prop))
      update_references_defNormalProp(a, prop, b[prop]);
  if (update_references_getOwnPropSymbols)
    for (var prop of update_references_getOwnPropSymbols(b)) {
      if (update_references_propIsEnum.call(b, prop))
        update_references_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var update_references_spreadProps = (a, b) => update_references_defProps(a, update_references_getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};




function updateReferences(obj, unsafeMapping) {
  return updateReferencesWithSafeMapping(obj, (currentId) => {
    let newId;
    try {
      newId = (0,loadable/* loadableWithDefault */.qu)(void 0, () => unsafeMapping(currentId));
    } catch (error) {
      (0,common/* throwNextTick */.a6)(error);
    }
    if (newId !== void 0) {
      if (typeof newId !== "string") {
        (0,common/* throwNextTick */.a6)(
          new common/* ScrivitoError */.Ix(
            `Unexpected result from mapping function passed to updateReferences (must be string or undefined): ${newId}`
          )
        );
      } else if (!newId.match(/^[a-f0-9]{16}$/)) {
        (0,common/* throwNextTick */.a6)(
          new common/* ScrivitoError */.Ix(
            `Unexpected result from mapping function passed to updateReferences (not a valid obj id): ${newId}`
          )
        );
      } else {
        return newId;
      }
    }
    return currentId;
  });
}
function updateReferencesWithSafeMapping(obj, mapping) {
  return __async(this, null, function* () {
    const objJson = yield (0,loadable/* load */.zD)(() => obj.getData());
    if (!objJson)
      return;
    const workers = getWorkers(objJson, obj, mapping);
    if (!workers.length)
      return;
    yield common/* ScrivitoPromise.all */.s8.all(workers);
  });
}
function getWorkers(objJson, obj, fn) {
  const workers = [];
  (0,client.withEachAttributeJson)(objJson, (jsonToUpdate, attributeName, widgetId) => {
    const convert = getConversion(jsonToUpdate);
    if (!convert)
      return;
    const worker = (0,loadable/* load */.zD)(() => convert(jsonToUpdate, fn)).then((newJson) => {
      const currentJson = widgetId ? obj.getWidgetAttribute(widgetId, attributeName) : obj.getAttributeData(attributeName);
      if (!(0,common/* equals */.fS)(currentJson, jsonToUpdate))
        return;
      const patch = { [attributeName]: newJson };
      if (widgetId) {
        obj.objData.update({
          _widget_pool: {
            [widgetId]: patch
          }
        });
      } else {
        obj.objData.update(patch);
      }
    });
    workers.push(worker);
  });
  return workers;
}
function getConversion(json) {
  return CONVERSIONS[json[0]];
}
const CONVERSIONS = {
  html: convertHtml,
  link: convertLink,
  linklist: convertLinklist,
  reference: update_references_convertReference,
  referencelist: convertReferencelist
};
function convertHtml(attributeJson, mapping) {
  return [
    "html",
    attributeJson[1].replace(
      link_resolution/* OBJ_ID_PATTERN */.RY,
      (internalLinkUrl) => `objid:${mapping(internalLinkUrl.slice(6, 22))}`
    )
  ];
}
function convertLink(attributeJson, mapping) {
  const linkJson = attributeJson[1];
  const { obj_id } = linkJson;
  if (!obj_id)
    return attributeJson;
  return ["link", update_references_spreadProps(update_references_spreadValues({}, linkJson), { obj_id: mapping(obj_id) })];
}
function convertLinklist(attributeJson, mapping) {
  return [
    "linklist",
    attributeJson[1].map((linkJson) => {
      const { obj_id } = linkJson;
      if (!obj_id)
        return linkJson;
      return update_references_spreadProps(update_references_spreadValues({}, linkJson), { obj_id: mapping(obj_id) });
    })
  ];
}
function update_references_convertReference(attributeJson, mapping) {
  return ["reference", mapping(attributeJson[1])];
}
function convertReferencelist(attributeJson, mapping) {
  return ["referencelist", attributeJson[1].map(mapping)];
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/copy_obj_handler.ts
var copy_obj_handler_async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};






let copyObjHandler;
function setCopyObjHandler(handler) {
  copyObjHandler = handler;
}
function copyObjViaHandler(fromObj) {
  return copy_obj_handler_async(this, null, function* () {
    if ((0,current_workspace_id/* isCurrentWorkspacePublished */.f$)()) {
      throw new common/* ScrivitoError */.Ix("The published content cannot be modified.");
    }
    (0,state/* failIfFrozen */.un)("Changing CMS content");
    if (!copyObjHandler)
      throw new common/* InternalError */.AQ();
    const toObjSpaceId = (0,current_workspace_id/* currentObjSpaceId */.GD)();
    const newObjId = yield copyObjHandler.copyObj({
      fromObjId: fromObj.id(),
      fromObjSpaceId: fromObj.objSpaceId(),
      toObjSpaceId
    });
    const newObj = yield (0,loadable/* load */.zD)(
      () => getObjFrom(objSpaceScope(toObjSpaceId), newObjId)
    );
    if (!newObj)
      throw new common/* InternalError */.AQ();
    return newObj;
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/restrict_to_obj_class.ts
var restrict_to_obj_class_defProp = Object.defineProperty;
var restrict_to_obj_class_defProps = Object.defineProperties;
var restrict_to_obj_class_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var restrict_to_obj_class_getOwnPropSymbols = Object.getOwnPropertySymbols;
var restrict_to_obj_class_hasOwnProp = Object.prototype.hasOwnProperty;
var restrict_to_obj_class_propIsEnum = Object.prototype.propertyIsEnumerable;
var restrict_to_obj_class_defNormalProp = (obj, key, value) => key in obj ? restrict_to_obj_class_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var restrict_to_obj_class_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (restrict_to_obj_class_hasOwnProp.call(b, prop))
      restrict_to_obj_class_defNormalProp(a, prop, b[prop]);
  if (restrict_to_obj_class_getOwnPropSymbols)
    for (var prop of restrict_to_obj_class_getOwnPropSymbols(b)) {
      if (restrict_to_obj_class_propIsEnum.call(b, prop))
        restrict_to_obj_class_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var restrict_to_obj_class_spreadProps = (a, b) => restrict_to_obj_class_defProps(a, restrict_to_obj_class_getOwnPropDescs(b));
function restrictToObjClass(objClassName) {
  return {
    isInScope(obj) {
      return obj.objClass() === objClassName;
    },
    applyToSearch(search) {
      return search.and("_objClass", "equals", objClassName);
    },
    applyToCreate(attributes) {
      return restrict_to_obj_class_spreadProps(restrict_to_obj_class_spreadValues({}, attributes), { _obj_class: objClassName });
    }
  };
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/get_placement_modification_infos.ts


function getPlacementModificationInfos(field, comparisonRange) {
  const widgets = field.get();
  const diff = field.getDiff(comparisonRange);
  if (!(0,scrivito_sdk_data/* isWidgetlistDiff */.P3)(diff) || !diff.content) {
    return widgets.map((widget) => ({ widget, modification: null }));
  }
  const infos = [];
  diff.content.forEach(([widgetlistModification, widgetId]) => {
    const info = getPlacementModificationInfo(
      field,
      comparisonRange,
      widgetlistModification,
      widgetId
    );
    if (info)
      infos.push(info);
  });
  return infos;
}
function getPlacementModificationInfo(field, comparisonRange, widgetlistModification, widgetId) {
  if (widgetlistModification === "-") {
    const vanishedWidget = getVanishedWidget(
      comparisonRange,
      field.obj().id(),
      widgetId
    );
    if (!vanishedWidget)
      return null;
    const vanishedModification = field.getContainer() instanceof BasicWidget && field.getContainer().modification(comparisonRange) === "deleted" ? null : "deleted";
    return { modification: vanishedModification, widget: vanishedWidget };
  }
  const widget = field.get().find((w) => w.id() === widgetId);
  if (!widget)
    return null;
  const modification = widgetlistModification === "=" ? null : "new";
  return { modification, widget };
}
function getVanishedWidget([from, to], objId, widgetId) {
  const toObj = getObjFrom(objSpaceScopeExcludingDeleted(to), objId);
  if (toObj) {
    const toWidget = toObj.widget(widgetId);
    if (toWidget)
      return toWidget;
  }
  const fromObj = getObjFrom(objSpaceScopeExcludingDeleted(from), objId);
  return fromObj == null ? void 0 : fromObj.widget(widgetId);
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/content_versions.ts


function versionsOnAllSites(obj) {
  const contentId = obj.contentId();
  if (!contentId)
    return [];
  return versionScope(obj).search().dangerouslyUnboundedTake();
}
function versionOnSite(obj, siteId) {
  const contentId = obj.contentId();
  if (!contentId)
    return null;
  return versionScope(obj).and(restrictToSite(siteId)).search().take(1)[0] || null;
}
function versionScope(obj) {
  return objSpaceScopeExcludingDeleted(obj.objSpaceId()).and(restrictToContent(obj.contentId())).and(excludeGlobal);
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/restrict_to_content.ts
var restrict_to_content_defProp = Object.defineProperty;
var restrict_to_content_defProps = Object.defineProperties;
var restrict_to_content_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var restrict_to_content_getOwnPropSymbols = Object.getOwnPropertySymbols;
var restrict_to_content_hasOwnProp = Object.prototype.hasOwnProperty;
var restrict_to_content_propIsEnum = Object.prototype.propertyIsEnumerable;
var restrict_to_content_defNormalProp = (obj, key, value) => key in obj ? restrict_to_content_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var restrict_to_content_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (restrict_to_content_hasOwnProp.call(b, prop))
      restrict_to_content_defNormalProp(a, prop, b[prop]);
  if (restrict_to_content_getOwnPropSymbols)
    for (var prop of restrict_to_content_getOwnPropSymbols(b)) {
      if (restrict_to_content_propIsEnum.call(b, prop))
        restrict_to_content_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var restrict_to_content_spreadProps = (a, b) => restrict_to_content_defProps(a, restrict_to_content_getOwnPropDescs(b));
function restrictToContent(contentId) {
  return {
    isInScope(obj) {
      return obj.contentId() === contentId;
    },
    applyToSearch(search) {
      return search.and("_contentId", "equals", contentId);
    },
    applyToCreate(attributes) {
      return restrict_to_content_spreadProps(restrict_to_content_spreadValues({}, attributes), { _content_id: contentId });
    }
  };
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/workspace.ts
class Workspace {
  constructor(workspaceData) {
    this.workspaceData = workspaceData;
  }
  id() {
    return this.workspaceData.id;
  }
  title() {
    return this.workspaceData.title;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/index.ts

































/***/ }),

/***/ 1637:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "D": () => (/* binding */ shouldAlwaysShowOptionMarkers),
/* harmony export */   "a": () => (/* binding */ alwaysShowOptionMarkers)
/* harmony export */ });
let shouldAlwaysShowOptionMarkers = false;
function alwaysShowOptionMarkers() {
  shouldAlwaysShowOptionMarkers = true;
}


/***/ }),

/***/ 8499:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$g": () => (/* binding */ getComponentForId),
/* harmony export */   "A7": () => (/* binding */ getLayoutComponentForAppClass),
/* harmony export */   "Ji": () => (/* binding */ areLayoutComponentsStored),
/* harmony export */   "LL": () => (/* binding */ getDataErrorComponent),
/* harmony export */   "YK": () => (/* binding */ getComponentForAppClass),
/* harmony export */   "e3": () => (/* binding */ registerComponentForAppClass),
/* harmony export */   "mO": () => (/* binding */ registerComponentForId),
/* harmony export */   "rI": () => (/* binding */ registerDataErrorComponent),
/* harmony export */   "tJ": () => (/* binding */ registerLayoutComponentForAppClass)
/* harmony export */ });
/* unused harmony export clearComponentRegistry */
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9541);

const registry = /* @__PURE__ */ new Map();
const componentsChangesCounterState = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_0__/* .createStateContainer */ .JH)();
function registerComponentForId(componentId, componentClass) {
  var _a;
  registry.set(componentId, componentClass);
  const componentChangesCounter = getComponentChangesCounterState(componentId);
  const changesCounter = (_a = componentChangesCounter.get()) != null ? _a : 0;
  componentChangesCounter.set(changesCounter + 1);
}
function getComponentForId(componentId) {
  getComponentChangesCounterState(componentId).get();
  return registry.get(componentId) || null;
}
function registerComponentForAppClass(className, componentClass) {
  registerComponentForId(componentAppClassId(className), componentClass);
}
function registerDataErrorComponent(componentClass) {
  registerComponentForId("dataErrorComponent", componentClass);
}
function getComponentForAppClass(className) {
  return getComponentForId(componentAppClassId(className));
}
function getDataErrorComponent() {
  return getComponentForId("dataErrorComponent");
}
function getComponentChangesCounterState(componentId) {
  return componentsChangesCounterState.subState(componentId);
}
function componentAppClassId(className) {
  return `componentForAppClass-${className}`;
}
const layoutRegistry = /* @__PURE__ */ new Map();
const layoutsChangesCounterState = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_0__/* .createStateContainer */ .JH)();
function getLayoutComponentForAppClass(className) {
  getLayoutChangesCounterState(className).get();
  return layoutRegistry.get(className) || null;
}
function registerLayoutComponentForAppClass(className, componentClass) {
  var _a;
  layoutRegistry.set(className, componentClass);
  const layoutChangesCounter = getLayoutChangesCounterState(className);
  const changesCounter = (_a = layoutChangesCounter.get()) != null ? _a : 0;
  layoutChangesCounter.set(changesCounter + 1);
  if (!layoutComponentsStoredState.get()) {
    layoutComponentsStoredState.set(true);
  }
}
const layoutComponentsStoredState = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_0__/* .createStateContainer */ .JH)();
function areLayoutComponentsStored() {
  var _a;
  return (_a = layoutComponentsStoredState.get()) != null ? _a : false;
}
function getLayoutChangesCounterState(className) {
  return layoutsChangesCounterState.subState(className);
}
function clearComponentRegistry() {
  registry.clear();
  layoutRegistry.clear();
}


/***/ }),

/***/ 7777:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "j": () => (/* binding */ AutomaticDataContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8156);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2878);
/* harmony import */ var scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4557);
/* harmony import */ var scrivito_sdk_react_data_context_container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4889);
/* harmony import */ var scrivito_sdk_react_use_data_locator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4102);





const AutomaticDataContext = (0,scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_2__/* .connect */ .$j)(function AutomaticDataContext2({
  content,
  children
}) {
  const dataScope = (0,scrivito_sdk_react_use_data_locator__WEBPACK_IMPORTED_MODULE_4__/* .useDataLocator */ .$)(content.get("data", "datalocator"));
  if (dataScope instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__/* .EmptyDataScope */ .Vb)
    return children;
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(scrivito_sdk_react_data_context_container__WEBPACK_IMPORTED_MODULE_3__/* .PushOntoDataStack */ .ec, {
    item: dataScope
  }, children);
});


/***/ }),

/***/ 630:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "R": () => (/* binding */ WidgetTagContext),
/* harmony export */   "x": () => (/* binding */ WidgetContent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8156);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_editing_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8084);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3711);
/* harmony import */ var scrivito_sdk_react_component_registry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8499);
/* harmony import */ var scrivito_sdk_react_components_automatic_data_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7777);
/* harmony import */ var scrivito_sdk_react_components_widget_tag__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3064);
/* harmony import */ var scrivito_sdk_react_connect_and_memoize__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9458);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5932);
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));








const WidgetContent = (0,scrivito_sdk_react_connect_and_memoize__WEBPACK_IMPORTED_MODULE_6__/* .connectAndMemoize */ .l)(function WidgetContent2({
  fieldType,
  placementModification,
  widget,
  widgetProps
}) {
  const widgetClass = widget.objClass();
  const widgetComponent = (0,scrivito_sdk_react_component_registry__WEBPACK_IMPORTED_MODULE_3__/* .getComponentForAppClass */ .YK)(
    widgetClass
  );
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(WidgetTagContext.Provider, {
    value: { widget, placementModification, fieldType }
  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(WidgetContentErrorBoundary, {
    widget,
    widgetClass,
    widgetComponent,
    widgetProps
  }));
});
WidgetContent.displayName = "Scrivito.ContentTag.WidgetContent";
class WidgetContentErrorBoundary extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(e) {
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .throwNextTick */ .a6)(e);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.widgetComponent !== this.props.widgetComponent) {
      this.setState({ hasError: false });
    }
  }
  render() {
    if (this.state.hasError) {
      if ((0,scrivito_sdk_app_support_editing_context__WEBPACK_IMPORTED_MODULE_1__/* .isInPlaceEditingActive */ .DG)()) {
        return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(scrivito_sdk_react_components_widget_tag__WEBPACK_IMPORTED_MODULE_5__/* .WidgetTag */ .D, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
          className: "content_error"
        }, "Widget could not be rendered due to application error."));
      }
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(scrivito_sdk_react_components_widget_tag__WEBPACK_IMPORTED_MODULE_5__/* .WidgetTag */ .D, null);
    }
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(AppWidgetWrapper, __spreadValues({}, this.props));
  }
}
function AppWidgetWrapper({
  widget,
  widgetClass,
  widgetComponent,
  widgetProps
}) {
  if (!widgetComponent) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .ArgumentError */ .ir(
      `No component registered for widget class "${widgetClass}"`
    );
  }
  if (widgetProps == null ? void 0 : widgetProps.hasOwnProperty("widget")) {
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .throwNextTick */ .a6)(
      new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .ArgumentError */ .ir('The prop "widget" is not allowed inside "widgetProps"')
    );
  }
  const widgetComponentProps = __spreadProps(__spreadValues({}, widgetProps), {
    widget: (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_7__/* .wrapInAppClass */ .pz)(widget)
  });
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(scrivito_sdk_react_components_automatic_data_context__WEBPACK_IMPORTED_MODULE_4__/* .AutomaticDataContext */ .j, {
    content: widget
  }, react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    widgetComponent,
    widgetComponentProps
  ));
}
const WidgetTagContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext({});


/***/ }),

/***/ 3064:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "D": () => (/* binding */ WidgetTag)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8156);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_import_from__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3912);
/* harmony import */ var scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4557);
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};



const WidgetTag = (0,scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_2__/* .connect */ .$j)(
  function WidgetTag2(props) {
    const _a = props, { tag: Tag = "div" } = _a, otherProps = __objRest(_a, ["tag"]);
    const WidgetTagWithEditing = (0,scrivito_sdk_import_from__WEBPACK_IMPORTED_MODULE_1__/* .importFrom */ .u$)(
      "reactEditing",
      "WidgetTagWithEditing"
    );
    if (!WidgetTagWithEditing)
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Tag, __spreadValues({}, otherProps));
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(WidgetTagWithEditing, __spreadValues({
      tag: Tag
    }, otherProps));
  }
);


/***/ }),

/***/ 4557:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$j": () => (/* binding */ connect),
/* harmony export */   "q1": () => (/* binding */ isClassComponent)
/* harmony export */ });
/* unused harmony export ReactConnectContext */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8156);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_loading_monitor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1582);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3711);
/* harmony import */ var scrivito_sdk_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9241);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9246);
/* harmony import */ var scrivito_sdk_react_display_name_from_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4415);
/* harmony import */ var scrivito_sdk_react_get_element_type__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1120);
/* harmony import */ var scrivito_sdk_react_hooks_use_force_update__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4130);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9541);
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));









function connect(component) {
  if (typeof component !== "function") {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .ArgumentError */ .ir(
      "Scrivito.connect expects either a plain function or a subclass of React.Component"
    );
  }
  if (isConnectedComponent(component)) {
    return component;
  }
  return isClassComponent(component) ? connectClassComponent(component) : connectFunctionComponent(component);
}
function connectClassComponent(classComponent) {
  var _a;
  const connectedComponent = (_a = class extends classComponent {
    constructor(props) {
      super(props);
      this._scrivitoPrivateConnector = new ComponentConnector(this);
    }
    componentDidMount() {
      this._scrivitoPrivateConnector.componentDidMount();
      if (super.componentDidMount) {
        super.componentDidMount();
      }
    }
    componentWillUnmount() {
      this._scrivitoPrivateConnector.componentWillUnmount();
      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }
    }
    render() {
      return this._scrivitoPrivateConnector.render(() => super.render());
    }
  }, _a._isScrivitoConnectedComponent = true, _a);
  connectedComponent.displayName = (0,scrivito_sdk_react_display_name_from_component__WEBPACK_IMPORTED_MODULE_8__/* .displayNameFromComponent */ .r)(classComponent);
  return connectedComponent;
}
function connectFunctionComponent(functionalComponent) {
  const connectedComponent = (props) => useConnectedRender(() => functionalComponent(props));
  connectedComponent._isScrivitoConnectedComponent = true;
  connectedComponent.displayName = (0,scrivito_sdk_react_display_name_from_component__WEBPACK_IMPORTED_MODULE_8__/* .displayNameFromComponent */ .r)(functionalComponent);
  return connectedComponent;
}
function useConnectedRender(originalRender) {
  const forceUpdate = (0,scrivito_sdk_react_hooks_use_force_update__WEBPACK_IMPORTED_MODULE_6__/* .useForceUpdate */ .N)();
  const connectorRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  if (!connectorRef.current) {
    connectorRef.current = new ComponentConnector({ forceUpdate });
  }
  const connector = connectorRef.current;
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    connector.componentDidMount();
    return () => connector.componentWillUnmount();
  }, []);
  return connector.render(originalRender);
}
function isClassComponent(component) {
  return typeof component === "function" && component.prototype && component.prototype.isReactComponent;
}
function isConnectedComponent(component) {
  return component._isScrivitoConnectedComponent === true;
}
const ReactConnectContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  hierarchyLevel: 0
});
class ComponentConnector {
  constructor(component) {
    this.component = component;
    this.loadingSubscriber = new scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_4__/* .LoadingSubscriber */ .aj();
  }
  componentDidMount() {
    var _a;
    if (this.context === void 0) {
      throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .InternalError */ .AQ();
    }
    this.stateSubscriber = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_7__/* .createSyncSubscriber */ .GS)(
      () => (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_7__/* .withUnfrozenState */ .dY)(() => this.component.forceUpdate()),
      this.context.hierarchyLevel
    );
    this.awakeSubscription = (_a = this.context.awakeness) == null ? void 0 : _a.subscribe(
      (awake) => {
        var _a2;
        return (_a2 = this.stateSubscriber) == null ? void 0 : _a2.setAwake(awake);
      }
    );
    if (this.lastRenderedState)
      this.subscribeState(this.lastRenderedState);
  }
  componentWillUnmount() {
    var _a;
    (_a = this.awakeSubscription) == null ? void 0 : _a.unsubscribe();
    this.unsubscribeState();
    this.stateSubscriber = void 0;
  }
  render(originalRender) {
    const reactElement = this.renderLoadingAware(originalRender);
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(ReactConnectContext.Consumer, __spreadValues({}, (0,scrivito_sdk_react_get_element_type__WEBPACK_IMPORTED_MODULE_5__/* .forwardElementTypeProps */ .B)(reactElement)), (context) => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(ReactConnectContext.Provider, {
      value: this.grabAndProvideChildContext(context)
    }, reactElement));
  }
  grabAndProvideChildContext(context) {
    this.context = context;
    this.childContext || (this.childContext = __spreadProps(__spreadValues({}, context), {
      hierarchyLevel: context.hierarchyLevel + 1
    }));
    return this.childContext;
  }
  renderLoadingAware(originalRender) {
    if ((0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_4__/* .isCurrentlyCapturing */ ._$)()) {
      return runWithFrozenState(originalRender);
    }
    const captured = (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_4__/* .capture */ .IE)(
      () => (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_7__/* .trackStateAccess */ .cC)(
        () => (0,scrivito_sdk_data__WEBPACK_IMPORTED_MODULE_3__/* .runWithPerformanceConstraint */ .qe)(() => runWithFrozenState(originalRender))
      )
    );
    this.lastRenderedState = captured;
    this.subscribeState(captured);
    const { result } = captured.result;
    return captured.isAllDataLoaded() ? result : this.handleLoading(result);
  }
  subscribeState(captured) {
    if (!this.stateSubscriber)
      return;
    this.stateSubscriber.subscribeChanges(captured.result.accessedState);
    captured.subscribeLoading(this.loadingSubscriber);
    if (captured.isAllDataLoaded())
      this.unregisterLoadingActivity();
    else
      this.registerLoadingActivity();
  }
  unsubscribeState() {
    if (this.stateSubscriber)
      this.stateSubscriber.unsubscribe();
    this.unregisterLoadingActivity();
    this.loadingSubscriber.unsubscribe();
  }
  handleLoading(preliminaryResult) {
    if (this.component._scrivitoRenderWhileLoading) {
      return this.component._scrivitoRenderWhileLoading();
    }
    return preliminaryResult;
  }
  registerLoadingActivity() {
    if (!this.unregisterLoadingActivityCallback) {
      this.unregisterLoadingActivityCallback = (0,scrivito_sdk_app_support_loading_monitor__WEBPACK_IMPORTED_MODULE_1__/* .registerLoadingActivity */ .YC)();
    }
  }
  unregisterLoadingActivity() {
    const unregister = this.unregisterLoadingActivityCallback;
    if (unregister) {
      delete this.unregisterLoadingActivityCallback;
      unregister();
    }
  }
}
function runWithFrozenState(originalRender) {
  const run = (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_4__/* .runAndCatchErrorsWhileLoading */ .zL)(
    () => (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_7__/* .withFrozenState */ .sc)(
      {
        contextName: "React.Component#render",
        message: "Use one of the React lifecycle hooks."
      },
      originalRender
    )
  );
  return run.success ? run.result : null;
}


/***/ }),

/***/ 9458:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "l": () => (/* binding */ connectAndMemoize)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4557);
/* harmony import */ var scrivito_sdk_react_display_name_from_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4415);
/* harmony import */ var scrivito_sdk_react_memo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4033);



function connectAndMemoize(component) {
  const connectedComponent = (0,scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_0__/* .connect */ .$j)(component);
  if ((0,scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_0__/* .isClassComponent */ .q1)(connectedComponent))
    return connectedComponent;
  const memoizedComponent = (0,scrivito_sdk_react_memo__WEBPACK_IMPORTED_MODULE_1__/* .memo */ .X)(connectedComponent);
  memoizedComponent.displayName = (0,scrivito_sdk_react_display_name_from_component__WEBPACK_IMPORTED_MODULE_2__/* .displayNameFromComponent */ .r)(connectedComponent);
  return memoizedComponent;
}


/***/ }),

/***/ 4889:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "K7": () => (/* binding */ useDataStack),
/* harmony export */   "SO": () => (/* binding */ useLastDataStackElement),
/* harmony export */   "ec": () => (/* binding */ PushOntoDataStack),
/* harmony export */   "fq": () => (/* binding */ useDataContext),
/* harmony export */   "uv": () => (/* binding */ useDataContextContainer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8156);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2878);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5932);



const DataStackReactContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(void 0);
function useDataContextContainer() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataStackReactContext);
}
function useDataContext() {
  var _a;
  return (_a = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataStackReactContext)) == null ? void 0 : _a.dataContext;
}
function useDataStack() {
  var _a;
  return (_a = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataStackReactContext)) == null ? void 0 : _a.dataStack;
}
function useLastDataStackElement() {
  var _a;
  const dataStack = (_a = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataStackReactContext)) == null ? void 0 : _a.dataStack;
  return dataStack && dataStack[0];
}
function PushOntoDataStack({
  item,
  children
}) {
  var _a;
  const prevDataStack = ((_a = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataStackReactContext)) == null ? void 0 : _a.dataStack) || [];
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataStackReactContext.Provider, {
    value: computeContextValue(item, prevDataStack),
    children
  });
}
function computeContextValue(givenDataContext, prevDataStack) {
  if (givenDataContext instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__/* .DataScope */ .Cc) {
    return {
      dataContext: {},
      dataStack: [givenDataContext.toPojo(), ...prevDataStack]
    };
  }
  const dataContext = (0,scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__/* .toDataContext */ .Yc)((0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_2__/* .unwrapAppClass */ .bM)(givenDataContext));
  const { _class, _id } = dataContext;
  const dataStack = _class && _id ? [{ _class, _id }, ...prevDataStack] : prevDataStack;
  return { dataStack, dataContext };
}


/***/ }),

/***/ 4415:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "r": () => (/* binding */ displayNameFromComponent)
/* harmony export */ });
function displayNameFromComponent(component) {
  return component.displayName || component.name;
}


/***/ }),

/***/ 1120:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "B": () => (/* binding */ forwardElementTypeProps),
/* harmony export */   "F": () => (/* binding */ getElementType)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8156);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function getElementType(node) {
  if (react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(node)) {
    const forwardedType = node.props.__scrivitoForwardElementType;
    return forwardedType || node.type;
  }
}
function forwardElementTypeProps(node) {
  return { __scrivitoForwardElementType: getElementType(node) };
}


/***/ }),

/***/ 4130:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "N": () => (/* binding */ useForceUpdate)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8156);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function useForceUpdate() {
  const [, setCounter] = react__WEBPACK_IMPORTED_MODULE_0__.useState(0);
  return () => setCounter((counter) => counter + 1);
}


/***/ }),

/***/ 4376:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "d": () => (/* binding */ InPlaceEditingEnabledContextConsumer),
  "P": () => (/* binding */ InPlaceEditingEnabledContextProvider)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(8156);
// EXTERNAL MODULE: ./scrivito_sdk/react/connect.tsx
var connect = __webpack_require__(4557);
;// CONCATENATED MODULE: ./scrivito_sdk/react/create_connected_context.tsx


function createConnectedContext(value) {
  const { Provider, Consumer } = external_react_.createContext(value);
  return {
    Provider,
    Consumer: connectContextConsumer(Consumer)
  };
}
function connectContextConsumer(Consumer) {
  const ConnectedCallback = (0,connect/* connect */.$j)(
    ({ callback, value }) => callback(value)
  );
  return ({ children }) => /* @__PURE__ */ external_react_.createElement(Consumer, null, (value) => /* @__PURE__ */ external_react_.createElement(ConnectedCallback, {
    callback: children,
    value
  }));
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/in_place_editing_enabled_context.ts

const {
  Consumer: InPlaceEditingEnabledContextConsumer,
  Provider: InPlaceEditingEnabledContextProvider
} = createConnectedContext(true);


/***/ }),

/***/ 1563:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "gH": () => (/* reexport */ AttributeValue),
  "iX": () => (/* reexport */ BackgroundImageTag),
  "H1": () => (/* reexport */ ChildListTag),
  "jq": () => (/* reexport */ ContentTag),
  "Ck": () => (/* reexport */ CurrentPage),
  "IP": () => (/* reexport */ Extensions),
  "Du": () => (/* reexport */ ImageTag),
  "ZM": () => (/* reexport */ InPlaceEditingOff),
  "IR": () => (/* reexport */ LinkTag),
  "zp": () => (/* reexport */ NotFoundErrorPage),
  "TE": () => (/* reexport */ RestoreInPlaceEditing),
  "xp": () => (/* reexport */ widget_content/* WidgetContent */.x),
  "Dc": () => (/* reexport */ widget_tag/* WidgetTag */.D),
  "aR": () => (/* reexport */ always_show_option_markers/* alwaysShowOptionMarkers */.a),
  "$j": () => (/* reexport */ connect/* connect */.$j),
  "$g": () => (/* reexport */ component_registry/* getComponentForId */.$g),
  "wh": () => (/* reexport */ provideComponent),
  "$3": () => (/* reexport */ provideDataErrorComponent),
  "YP": () => (/* reexport */ provideLayoutComponent),
  "RM": () => (/* reexport */ registerComponent),
  "kB": () => (/* reexport */ showExtension),
  "pU": () => (/* reexport */ useDataItem),
  "$W": () => (/* reexport */ use_data_locator/* useDataLocator */.$),
  "g7": () => (/* reexport */ useDataScope)
});

// UNUSED EXPORTS: Hibernation, displayNameFromComponent, memo, propsAreEqual, useForceUpdate

// EXTERNAL MODULE: ./scrivito_sdk/react/connect.tsx
var connect = __webpack_require__(4557);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(8156);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 45 modules
var common = __webpack_require__(3711);
;// CONCATENATED MODULE: ./scrivito_sdk/react/hibernation.tsx
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));



const Hibernation = ({
  awake,
  children
}) => {
  const [isParentAwake, setParentAwake] = React.useState(true);
  const context = React.useContext(ReactConnectContext);
  const parentAwakeness = context.awakeness;
  React.useEffect(() => {
    const subscription = parentAwakeness == null ? void 0 : parentAwakeness.subscribe(setParentAwake);
    return () => subscription == null ? void 0 : subscription.unsubscribe();
  }, [parentAwakeness]);
  const awakenessRef = React.useRef();
  if (awakenessRef.current === void 0 && !awake)
    return null;
  awakenessRef.current || (awakenessRef.current = new BehaviorSubject(true));
  awakenessRef.current.next(awake && isParentAwake);
  return /* @__PURE__ */ React.createElement(ReactConnectContext.Provider, {
    value: __spreadProps(__spreadValues({}, context), { awakeness: awakenessRef.current })
  }, children);
};

// EXTERNAL MODULE: ./scrivito_sdk/app_support/get_class_name.ts
var get_class_name = __webpack_require__(149);
// EXTERNAL MODULE: ./scrivito_sdk/react/component_registry.ts
var component_registry = __webpack_require__(8499);
// EXTERNAL MODULE: ./scrivito_sdk/react/components/widget_tag.tsx
var widget_tag = __webpack_require__(3064);
// EXTERNAL MODULE: ./scrivito_sdk/react/display_name_from_component.ts
var display_name_from_component = __webpack_require__(4415);
// EXTERNAL MODULE: ./scrivito_sdk/react/get_element_type.ts
var get_element_type = __webpack_require__(1120);
// EXTERNAL MODULE: ./scrivito_sdk/react/memo.ts
var memo = __webpack_require__(4033);
// EXTERNAL MODULE: ./scrivito_sdk/realm/index.ts + 22 modules
var realm = __webpack_require__(5932);
;// CONCATENATED MODULE: ./scrivito_sdk/react/provide_component.ts









function provideComponent(classNameOrClass, component, ...excessArgs) {
  (0,realm/* checkProvideComponent */.aQ)(classNameOrClass, component, ...excessArgs);
  const className = (0,get_class_name/* getClassName */.g)(classNameOrClass);
  if (isComponentMissingName(component)) {
    component.displayName = className;
  }
  const connectedComponent = (0,connect/* connect */.$j)(component);
  const wrappedComponent = wrapComponent(connectedComponent);
  (0,component_registry/* registerComponentForAppClass */.e3)(className, wrappedComponent);
}
function wrapComponent(component) {
  const wrappedComponent = (0,connect/* isClassComponent */.q1)(component) ? wrapClassComponent(component) : wrapFunctionComponent(component);
  wrappedComponent.displayName = (0,display_name_from_component/* displayNameFromComponent */.r)(component);
  return wrappedComponent;
}
function wrapFunctionComponent(functionComponent) {
  return (0,memo/* memo */.X)((props) => {
    return hasWidgetProp(props) ? wrapInWidgetTag(functionComponent(props)) : functionComponent(props);
  });
}
function wrapClassComponent(component) {
  return class extends component {
    render() {
      return hasWidgetProp(this.props) ? wrapInWidgetTag(super.render()) : super.render();
    }
  };
}
function hasWidgetProp(props) {
  return !!props.widget;
}
function wrapInWidgetTag(rendered) {
  return (0,get_element_type/* getElementType */.F)(rendered) === widget_tag/* WidgetTag */.D ? rendered : external_react_.createElement(widget_tag/* WidgetTag */.D, { children: rendered });
}
function isComponentMissingName(component) {
  return !component.displayName && (!component.name || component.name === "_class" || component.name.substring(0, 6) === "class_");
}

// EXTERNAL MODULE: ./scrivito_sdk/react/connect_and_memoize.ts
var connect_and_memoize = __webpack_require__(9458);
;// CONCATENATED MODULE: ./scrivito_sdk/react/provide_layout_component.ts






function provideLayoutComponent(objClass, component, ...excessArgs) {
  (0,realm/* checkProvideLayoutComponent */.gj)(objClass, component, ...excessArgs);
  if (!(0,realm/* isObjClass */.Hn)(objClass)) {
    (0,common/* throwInvalidArgumentsError */.dg)(
      "provideLayoutComponent",
      "A layout component must be provided only for Objs",
      { docPermalink: "js-sdk/provideLayoutComponent" }
    );
  }
  const className = (0,get_class_name/* getClassName */.g)(objClass);
  if (isComponentMissingName(component))
    component.displayName = className;
  (0,component_registry/* registerLayoutComponentForAppClass */.tJ)(className, (0,connect_and_memoize/* connectAndMemoize */.l)(component));
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/provide_data_error_component.ts



function provideDataErrorComponent(component, ...excessArgs) {
  (0,realm/* checkProvideDataErrorComponent */.iq)(component, ...excessArgs);
  (0,component_registry/* registerDataErrorComponent */.rI)((0,connect_and_memoize/* connectAndMemoize */.l)(component));
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/register_component.ts


function registerComponent(componentId, component) {
  (0,component_registry/* registerComponentForId */.mO)(componentId, (0,connect/* connect */.$j)(component));
}

// EXTERNAL MODULE: external "underscore"
var external_underscore_ = __webpack_require__(4952);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/decode/draw_img_on_canvas.ts
function drawImgOnCanvas(img) {
  const canvas = document.createElement("canvas");
  canvas.height = img.height;
  canvas.width = img.width;
  const ctx = canvas.getContext("2d");
  drawOnCanvasContext(img, ctx);
  return canvas;
}
function drawOnCanvasContext(img, ctx) {
  ctx.drawImage(img, 0, 0);
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/decode/get_css_canvas_context.ts
function getCSSCanvasContext(contextType, identifier, width, height) {
  if (!documentGetCSSCanvasContext()) {
    throw new Error("Browser does not support getCSSCanvasContext!");
  }
  return documentGetCSSCanvasContext()(contextType, identifier, width, height);
}
function clearGetCSSCanvasContext(identifier) {
  getCSSCanvasContext("2d", identifier, 0, 0);
}
function hasGetCSSCanvasContext() {
  return !!documentGetCSSCanvasContext();
}
function documentGetCSSCanvasContext() {
  return document.getCSSCanvasContext && document.getCSSCanvasContext.bind(
    document
  );
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/decode/decode_or_load_img.ts

function decodeOrLoadImg(imageUrl) {
  const img = new Image();
  return hasDecodeImg(img) ? decodeImg(img, imageUrl) : loadImg(img, imageUrl);
}
function hasDecodeImg(img) {
  return !!img.decode;
}
function decodeImg(img, imageUrl) {
  if (!hasDecodeImg(img)) {
    throw new Error("Browser does not support decode!");
  }
  img.src = imageUrl;
  return imgDecode(img)().then(() => img);
}
function imgDecode(img) {
  return img.decode && img.decode.bind(img);
}
function loadImg(img, imageUrl) {
  return new common/* ScrivitoPromise */.s8((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = (event) => reject(event);
    img.src = imageUrl;
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/decode_background_image.ts



function decodeBackgroundImage(imageUrl) {
  return decodeOrLoadImg(imageUrl).then((img) => {
    if (hasGetCSSCanvasContext())
      return webkitCanvas(img);
    if (!hasDecodeImg(img))
      return drawCanvas(img);
    return { decodedBackgroundUrl: `url(${imageUrl})` };
  }).catch(() => ({ decodedBackgroundUrl: `url(${imageUrl})` }));
}
function webkitCanvas(img) {
  const webkitCanvasIdentifier = `ScrivitoBackgroundImage${nextCounter()}`;
  const ctx = getCSSCanvasContext(
    "2d",
    webkitCanvasIdentifier,
    img.width,
    img.height
  );
  drawOnCanvasContext(img, ctx);
  return {
    decodedBackgroundUrl: `-webkit-canvas(${webkitCanvasIdentifier})`,
    clear: () => clearGetCSSCanvasContext(webkitCanvasIdentifier)
  };
}
function drawCanvas(img) {
  drawImgOnCanvas(img);
  return { decodedBackgroundUrl: `url(${img.src})` };
}
let counter = 0;
function nextCounter() {
  counter += 1;
  return counter;
}
function resetCounter() {
  counter = 0;
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/background_image_decoder.ts


class BackgroundImageDecoder {
  constructor(onUpdateCallback) {
    this.decodedUrls = {};
    this.loadingRegistry = {};
    this.clears = [];
    this.isOnUpdateCallbackActive = true;
    this.onUpdateCallback = onUpdateCallback;
  }
  getBackgroundImage(imageUrl) {
    const resultUrl = this.decodedUrls[imageUrl];
    if (!resultUrl) {
      this.ensureLoading(imageUrl);
    }
    return resultUrl;
  }
  clear() {
    this.clears.forEach((clear) => clear());
    this.clears = [];
    this.decodedUrls = {};
    this.isOnUpdateCallbackActive = false;
  }
  resumeUpdateCallback() {
    this.isOnUpdateCallbackActive = true;
  }
  ensureLoading(imageUrl) {
    if (this.decodedUrls[imageUrl] || this.loadingRegistry[imageUrl])
      return;
    const promise = decodeBackgroundImage(imageUrl).then(
      ({ decodedBackgroundUrl, clear }) => {
        if (this.isOnUpdateCallbackActive) {
          if (clear)
            this.clears.push(clear);
          this.decodedUrls[imageUrl] = decodedBackgroundUrl;
          this.onUpdateCallback();
        } else {
          if (clear)
            clear();
          this.decodedUrls[imageUrl] = void 0;
        }
      }
    );
    this.loadingRegistry[imageUrl] = (0,common/* promiseAndFinally */.sH)(
      promise,
      () => delete this.loadingRegistry[imageUrl]
    );
  }
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/scale_down_binary.ts
var scale_down_binary = __webpack_require__(9479);
// EXTERNAL MODULE: ./scrivito_sdk/models/index.ts + 34 modules
var models = __webpack_require__(9838);
// EXTERNAL MODULE: external "tcomb-react"
var external_tcomb_react_ = __webpack_require__(7726);
;// CONCATENATED MODULE: ./scrivito_sdk/react/tcomb.ts


;// CONCATENATED MODULE: ./scrivito_sdk/react/components/background_image_tag.tsx
var background_image_tag_defProp = Object.defineProperty;
var background_image_tag_defProps = Object.defineProperties;
var background_image_tag_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var background_image_tag_getOwnPropSymbols = Object.getOwnPropertySymbols;
var background_image_tag_hasOwnProp = Object.prototype.hasOwnProperty;
var background_image_tag_propIsEnum = Object.prototype.propertyIsEnumerable;
var background_image_tag_defNormalProp = (obj, key, value) => key in obj ? background_image_tag_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var background_image_tag_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (background_image_tag_hasOwnProp.call(b, prop))
      background_image_tag_defNormalProp(a, prop, b[prop]);
  if (background_image_tag_getOwnPropSymbols)
    for (var prop of background_image_tag_getOwnPropSymbols(b)) {
      if (background_image_tag_propIsEnum.call(b, prop))
        background_image_tag_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var background_image_tag_spreadProps = (a, b) => background_image_tag_defProps(a, background_image_tag_getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (background_image_tag_hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && background_image_tag_getOwnPropSymbols)
    for (var prop of background_image_tag_getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && background_image_tag_propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var _a;











const ValidPlainBackground = common/* tcomb.interface */.pC["interface"]({
  image: common/* tcomb.String */.pC.String,
  attachment: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String),
  clip: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String),
  color: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String),
  origin: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String),
  position: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String),
  repeat: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String),
  size: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String)
});
const ValidScrivitoBackground = common/* tcomb.interface */.pC["interface"]({
  image: common/* tcomb.union */.pC.union([models/* BinaryType */.pf, models/* ObjType */.Bt, common/* tcomb.String */.pC.String, common/* tcomb.Nil */.pC.Nil]),
  attachment: common/* tcomb.maybe */.pC.maybe(common/* tcomb.enums.of */.pC.enums.of(["fixed", "scroll"])),
  clip: common/* tcomb.maybe */.pC.maybe(common/* tcomb.enums.of */.pC.enums.of(["border-box"])),
  color: common/* tcomb.maybe */.pC.maybe(common/* tcomb.enums.of */.pC.enums.of(["transparent"])),
  origin: common/* tcomb.maybe */.pC.maybe(common/* tcomb.enums.of */.pC.enums.of(["padding-box"])),
  position: common/* tcomb.maybe */.pC.maybe(common/* tcomb.enums.of */.pC.enums.of(["center", "left", "right", "top", "bottom"])),
  repeat: common/* tcomb.maybe */.pC.maybe(common/* tcomb.enums.of */.pC.enums.of(["no-repeat"])),
  size: common/* tcomb.maybe */.pC.maybe(common/* tcomb.enums.of */.pC.enums.of(["contain", "cover"]))
});
const ValidBackground = common/* tcomb.union */.pC.union([
  ValidPlainBackground,
  ValidScrivitoBackground
]);
ValidBackground.dispatch = (background) => {
  return isPlainBackground(background) ? ValidPlainBackground : ValidScrivitoBackground;
};
const ValidBackgroundList = common/* tcomb.list */.pC.list(ValidBackground);
const ValidBackgroundOrBackgroundList = common/* tcomb.union */.pC.union([
  ValidBackground,
  ValidBackgroundList
]);
ValidBackgroundOrBackgroundList.dispatch = (background) => {
  return Array.isArray(background) ? ValidBackgroundList : ValidBackground;
};
const BackgroundImageTag = (0,connect/* connect */.$j)(
  (_a = class extends external_react_.Component {
    constructor(props) {
      super(props);
      this.decoder = createBackgroundImageDecoder(() => this.forceUpdate());
      this.binaryToUrl = this.binaryToUrl.bind(this);
    }
    componentDidMount() {
      this.decoder.resumeUpdateCallback();
    }
    componentWillUnmount() {
      this.decoder.clear();
    }
    render() {
      const _a2 = this.props, { style, tag } = _a2, passThroughProps = __objRest(_a2, ["style", "tag"]);
      const Tag = tag;
      assertNoBackgroundRelatedProperties(style);
      return /* @__PURE__ */ external_react_.createElement(Tag, background_image_tag_spreadProps(background_image_tag_spreadValues({}, passThroughProps), {
        style: calculateCSSProperties(style, this.binaryToUrl)
      }));
    }
    binaryToUrl(binary) {
      const { initialUrl, highResUrlToDecode } = (0,scale_down_binary/* scaleDownBinary */.BN)(binary);
      const decodedBackgroundUrl = highResUrlToDecode && this.decoder.getBackgroundImage(highResUrlToDecode);
      return decodedBackgroundUrl || `url(${initialUrl})`;
    }
  }, _a.displayName = "Scrivito.BackgroundImageTag", _a.propTypes = (0,external_tcomb_react_.propTypes)(
    {
      tag: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String),
      style: common/* tcomb.maybe */.pC.maybe(
        common/* tcomb.interface */.pC["interface"](
          {
            background: common/* tcomb.maybe */.pC.maybe(ValidBackgroundOrBackgroundList)
          },
          { strict: false }
        )
      )
    },
    { strict: false }
  ), _a.defaultProps = {
    tag: "div",
    style: {}
  }, _a)
);
function createBackgroundImageDecoder(onUpdateCallback) {
  return new BackgroundImageDecoder(onUpdateCallback);
}
function calculateCSSProperties(style, binaryToUrl) {
  if ((0,external_underscore_.isObject)(style)) {
    const _a2 = style, { background } = _a2, otherStyles = __objRest(_a2, ["background"]);
    return background_image_tag_spreadValues(background_image_tag_spreadValues({}, otherStyles), calculateBackgroundCSSProperties(background, binaryToUrl));
  }
  return {};
}
function calculateBackgroundCSSProperties(background, binaryToUrl) {
  if (background === void 0) {
    return {};
  }
  if (Array.isArray(background)) {
    return mergeBackgroundCSSProperties(
      background.map((b) => cssPropertiesFor(b, binaryToUrl))
    );
  }
  return cssPropertiesFor(background, binaryToUrl);
}
function mergeBackgroundCSSProperties(properties) {
  return {
    backgroundImage: mergeCSSProperty(properties, "backgroundImage"),
    backgroundAttachment: mergeCSSProperty(properties, "backgroundAttachment"),
    backgroundClip: mergeCSSProperty(properties, "backgroundClip"),
    backgroundOrigin: mergeCSSProperty(properties, "backgroundOrigin"),
    backgroundPosition: mergeCSSProperty(properties, "backgroundPosition"),
    backgroundRepeat: mergeCSSProperty(properties, "backgroundRepeat"),
    backgroundSize: mergeCSSProperty(properties, "backgroundSize"),
    backgroundColor: lastBackgroundColor(properties)
  };
}
function mergeCSSProperty(properties, name) {
  return properties.map((property) => property[name]).join(", ");
}
function lastBackgroundColor(properties) {
  const lastBackground = (0,external_underscore_.last)(properties);
  if (lastBackground) {
    return lastBackground.backgroundColor;
  }
}
function cssPropertiesFor(background, binaryToUrl) {
  if (isPlainBackground(background)) {
    return cssPropertiesForPlainBackground(background);
  }
  return cssPropertiesForScrivitoBackground(background, binaryToUrl);
}
function cssPropertiesForPlainBackground(background) {
  return {
    backgroundImage: background.image,
    backgroundAttachment: background.attachment || "scroll",
    backgroundClip: background.clip || "border-box",
    backgroundColor: background.color || "transparent",
    backgroundOrigin: background.origin || "padding-box",
    backgroundPosition: background.position || "0% 0%",
    backgroundRepeat: background.repeat || "repeat",
    backgroundSize: background.size || "auto"
  };
}
function cssPropertiesForScrivitoBackground(background, binaryToUrl) {
  const image = background.image;
  if (image instanceof models/* Binary */.Kb) {
    return cssPropertiesForBinary(image, background, binaryToUrl);
  }
  if (image instanceof realm/* Obj */.eG) {
    const basicObj = (0,realm/* unwrapAppClass */.bM)(image);
    if ((0,realm/* isBinaryBasicObj */.Gf)(basicObj)) {
      const blob = basicObj.get("blob", ["binary"]);
      if (blob) {
        return cssPropertiesForBinary(blob, background, binaryToUrl);
      }
    }
  }
  return cssPropertiesForPlainBackground({ image: "none" });
}
function cssPropertiesForBinary(binary, background, binaryToUrl) {
  return {
    backgroundImage: binaryToUrl(binary),
    backgroundAttachment: background.attachment || "scroll",
    backgroundClip: background.clip || "border-box",
    backgroundColor: background.color || "transparent",
    backgroundOrigin: background.origin || "padding-box",
    backgroundPosition: background.position || "center center",
    backgroundRepeat: background.repeat || "no-repeat",
    backgroundSize: background.size || "cover"
  };
}
function isPlainBackground(background) {
  return (0,external_underscore_.isString)(background.image);
}
function assertNoBackgroundRelatedProperties(style) {
  if ((0,external_underscore_.isObject)(style)) {
    for (const key of Object.keys(style)) {
      if (key.match(/^background.+/)) {
        (0,common/* throwNextTick */.a6)(
          new common/* ArgumentError */.ir(
            `Invalid background related CSS property "${key}". Expected property "background" alongside with any non-background propertiesFor further details, see ${(0,common/* docUrl */.m0)("js-sdk/BackgroundImageTag")}`
          )
        );
      }
    }
  }
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_page.ts
var current_page = __webpack_require__(6500);
// EXTERNAL MODULE: ./scrivito_sdk/import_from.ts
var import_from = __webpack_require__(3912);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/basic_url_for.ts
var basic_url_for = __webpack_require__(2225);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/change_location.ts
var change_location = __webpack_require__(2174);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/is_modifier_click.ts
function isModifierClick(event) {
  return event.ctrlKey || event.metaKey || event.shiftKey;
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/navigate_to.ts
var navigate_to = __webpack_require__(9344);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/ui_adapter.ts
var ui_adapter = __webpack_require__(9470);
// EXTERNAL MODULE: ./scrivito_sdk/data_integration/index.ts + 25 modules
var data_integration = __webpack_require__(2878);
// EXTERNAL MODULE: ./scrivito_sdk/react/data_context_container.tsx
var data_context_container = __webpack_require__(4889);
;// CONCATENATED MODULE: ./scrivito_sdk/react/components/link_tag.tsx
var link_tag_defProp = Object.defineProperty;
var link_tag_defProps = Object.defineProperties;
var link_tag_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var link_tag_getOwnPropSymbols = Object.getOwnPropertySymbols;
var link_tag_hasOwnProp = Object.prototype.hasOwnProperty;
var link_tag_propIsEnum = Object.prototype.propertyIsEnumerable;
var link_tag_defNormalProp = (obj, key, value) => key in obj ? link_tag_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var link_tag_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (link_tag_hasOwnProp.call(b, prop))
      link_tag_defNormalProp(a, prop, b[prop]);
  if (link_tag_getOwnPropSymbols)
    for (var prop of link_tag_getOwnPropSymbols(b)) {
      if (link_tag_propIsEnum.call(b, prop))
        link_tag_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var link_tag_spreadProps = (a, b) => link_tag_defProps(a, link_tag_getOwnPropDescs(b));













const LinkTag = (0,connect/* connect */.$j)(function LinkTag2(props) {
  const dataStack = (0,data_context_container/* useDataStack */.K7)();
  const dataContext = (0,data_context_container/* useDataContext */.fq)();
  checkLinkTagProps(props);
  const customProps = link_tag_spreadValues({}, props);
  delete customProps.children;
  delete customProps.to;
  delete customProps.params;
  return /* @__PURE__ */ external_react_.createElement("a", link_tag_spreadProps(link_tag_spreadValues({}, customProps), {
    href: getHref(),
    target: getTarget(),
    rel: getRel(),
    onClick
  }), props.children);
  function getHref() {
    var _a;
    return ((_a = getDestination()) == null ? void 0 : _a.href) || "#";
  }
  function getTarget() {
    if (props.target)
      return props.target;
    if (props.to instanceof realm/* Link */.rU) {
      return (0,realm/* unwrapAppClass */.bM)(props.to).target() || void 0;
    }
  }
  function getRel() {
    if ("rel" in props)
      return props.rel;
    if (props.to instanceof realm/* Link */.rU) {
      return (0,realm/* unwrapAppClass */.bM)(props.to).rel() || void 0;
    }
  }
  function onClick(e) {
    if (props.onClick) {
      props.onClick(e);
      if (e.defaultPrevented)
        return;
    }
    e.preventDefault();
    const destination = getDestination();
    if (!destination)
      return;
    const target = getTarget();
    const { to, href, queryParameters } = destination;
    if (target === "_blank" || isModifierClick(e)) {
      return (0,change_location/* openInNewWindow */.o)(href);
    }
    if (target === "_top" && ui_adapter/* uiAdapter */.k) {
      return navigateAppTo(to, queryParameters);
    }
    if (target) {
      return (0,common/* openWindow */.xw)(href, target);
    }
    navigateAppTo(to, queryParameters);
  }
  function navigateAppTo(to, params) {
    (0,navigate_to/* navigateTo */.T)(to, params && { params });
  }
  function getDestination() {
    if (!props.to)
      return null;
    const basicObjOrLink = (0,realm/* unwrapAppClass */.bM)(props.to);
    const singlePlaceholder = getSinglePlaceholder(basicObjOrLink);
    if (singlePlaceholder) {
      const url = (0,data_integration/* replacePlaceholdersWithData */.O0)(singlePlaceholder, {
        dataContext,
        dataStack
      });
      return {
        to: new realm/* Link */.rU({ url }),
        href: url,
        queryParameters: void 0
      };
    }
    if (basicObjOrLink instanceof models/* BasicLink */.AM || basicObjOrLink instanceof models/* BasicObj */.Jj) {
      return {
        to: props.to,
        href: getDestinationHref(basicObjOrLink),
        queryParameters: getDestinationQueryParameters(basicObjOrLink)
      };
    }
    return null;
  }
  function getDestinationQueryParameters(basicObjOrLink) {
    let queryParameters = props.params || void 0;
    if (dataStack) {
      queryParameters = link_tag_spreadValues(link_tag_spreadValues({}, (0,data_integration/* getDataContextParameters */.dE)(basicObjOrLink, dataStack)), queryParameters);
    }
    return queryParameters;
  }
  function getDestinationHref(basicObjOrLink) {
    return (0,basic_url_for/* basicUrlFor */.M)(basicObjOrLink, {
      queryParameters: getDestinationQueryParameters(basicObjOrLink),
      withoutOriginIfLocal: true
    });
  }
  function getSinglePlaceholder(basicObjOrLink) {
    if (basicObjOrLink instanceof models/* BasicLink */.AM && basicObjOrLink.isExternal()) {
      const maybeSinglePlaceholder = basicObjOrLink.url();
      if ((0,data_integration/* isSinglePlaceholder */.aG)(maybeSinglePlaceholder)) {
        return maybeSinglePlaceholder;
      }
    }
  }
});
const checkLinkTagProps = (0,common/* checkArgumentsFor */.PJ)(
  "Scrivito.LinkTag",
  [
    [
      "props",
      common/* tcomb.interface */.pC["interface"](
        {
          to: common/* tcomb.maybe */.pC.maybe(common/* tcomb.union */.pC.union([models/* ObjType */.Bt, models/* LinkType */.Un])),
          params: common/* tcomb.union */.pC.union([
            common/* tcomb.dict */.pC.dict(common/* tcomb.String */.pC.String, common/* tcomb.union */.pC.union([common/* tcomb.Nil */.pC.Nil, common/* tcomb.String */.pC.String, common/* tcomb.list */.pC.list(common/* tcomb.String */.pC.String)])),
            common/* tcomb.maybe */.pC.maybe(common/* tcomb.irreducible */.pC.irreducible("false", (v) => v === false))
          ]),
          onClick: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Function */.pC.Function)
        },
        { strict: false }
      )
    ]
  ],
  { docPermalink: "js-sdk/LinkTag", severity: "warning" }
);

;// CONCATENATED MODULE: ./scrivito_sdk/react/components/child_list_tag/child_item.tsx




const ChildItem = (0,connect/* connect */.$j)(function ChildItem2(props) {
  const appObj = (0,realm/* wrapInAppClass */.pz)(props.child);
  if (props.renderChild) {
    return props.renderChild(appObj);
  }
  return /* @__PURE__ */ external_react_.createElement("li", null, /* @__PURE__ */ external_react_.createElement(LinkTag, {
    to: appObj
  }, props.child.get("title", "string")));
});
ChildItem.displayName = "Scrivito.ChildListTag.ChildItem";

;// CONCATENATED MODULE: ./scrivito_sdk/react/with_display_name.ts
function withDisplayName(name, component) {
  component.displayName = name;
  return component;
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/components/child_list_tag.tsx
var child_list_tag_defProp = Object.defineProperty;
var child_list_tag_getOwnPropSymbols = Object.getOwnPropertySymbols;
var child_list_tag_hasOwnProp = Object.prototype.hasOwnProperty;
var child_list_tag_propIsEnum = Object.prototype.propertyIsEnumerable;
var child_list_tag_defNormalProp = (obj, key, value) => key in obj ? child_list_tag_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var child_list_tag_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (child_list_tag_hasOwnProp.call(b, prop))
      child_list_tag_defNormalProp(a, prop, b[prop]);
  if (child_list_tag_getOwnPropSymbols)
    for (var prop of child_list_tag_getOwnPropSymbols(b)) {
      if (child_list_tag_propIsEnum.call(b, prop))
        child_list_tag_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var child_list_tag_objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (child_list_tag_hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && child_list_tag_getOwnPropSymbols)
    for (var prop of child_list_tag_getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && child_list_tag_propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};






const ChildListTag = (0,connect/* connect */.$j)(
  withDisplayName("Scrivito.ChildListTag", (props) => {
    const _a = props, {
      parent = (0,current_page/* currentPage */.lo)(),
      tag: Tag = "ul",
      renderChild
    } = _a, otherProps = child_list_tag_objRest(_a, [
      "parent",
      "tag",
      "renderChild"
    ]);
    if (!parent)
      return null;
    const basicParent = parent._scrivitoPrivateContent;
    const orderedChildren = basicParent.orderedChildren();
    const childComponents = orderedChildren.map((child) => /* @__PURE__ */ external_react_.createElement(ChildItem, {
      key: child.id(),
      child,
      renderChild
    }));
    const ChildListTagWithEditing = (0,import_from/* importFrom */.u$)(
      "reactEditing",
      "ChildListTagWithEditing"
    );
    if (!ChildListTagWithEditing) {
      return /* @__PURE__ */ external_react_.createElement(Tag, child_list_tag_spreadValues({}, otherProps), childComponents);
    }
    return /* @__PURE__ */ external_react_.createElement(ChildListTagWithEditing, child_list_tag_spreadValues({
      tag: Tag,
      basicParent
    }, otherProps), childComponents);
  })
);

// EXTERNAL MODULE: ./scrivito_sdk/app_support/content_tags_for_empty_attributes.ts
var content_tags_for_empty_attributes = __webpack_require__(284);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/editing_context.ts
var editing_context = __webpack_require__(8084);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/get_comparison_range.ts
var get_comparison_range = __webpack_require__(2511);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/browser_location.ts
var browser_location = __webpack_require__(9979);
// EXTERNAL MODULE: external "urijs"
var external_urijs_ = __webpack_require__(8842);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/routing.ts + 2 modules
var routing = __webpack_require__(5079);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/find_click_target.ts



function isOpenInNewWindow(target) {
  if (target) {
    return !!target.openInNewWindow;
  }
  return false;
}
function findClickTarget(e) {
  const innermostNode = e.target;
  const outermostNode = e.currentTarget;
  const isModifier = isModifierClick(e);
  return findLinkTarget(innermostNode, outermostNode, isModifier);
}
function findLinkTarget(currentNode, outermostNode, isModifier) {
  if (currentNode === outermostNode) {
    return null;
  }
  if (isHTMLAnchorElement(currentNode)) {
    const url = currentNode.href;
    const uri = external_urijs_(url);
    if (!(0,routing/* isLocalUri */.m4)(uri)) {
      return null;
    }
    if (isModifier || currentNode.getAttribute("target") === "_blank") {
      return { openInNewWindow: url };
    }
    return { openInCurrentWindow: uri.resource() };
  }
  if (!currentNode.parentNode) {
    return null;
  }
  return findLinkTarget(currentNode.parentNode, outermostNode, isModifier);
}
function isHTMLAnchorElement(node) {
  return node.nodeName === "A";
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/replace_internal_links.ts
var replace_internal_links = __webpack_require__(5725);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/scroll_into_view.ts + 2 modules
var scroll_into_view = __webpack_require__(180);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/can_edit.ts
var can_edit = __webpack_require__(7007);
// EXTERNAL MODULE: ./scrivito_sdk/react/components/content_tag/widget_content.tsx
var widget_content = __webpack_require__(630);
// EXTERNAL MODULE: ./scrivito_sdk/react/in_place_editing_enabled_context.ts + 1 modules
var in_place_editing_enabled_context = __webpack_require__(4376);
;// CONCATENATED MODULE: ./scrivito_sdk/react/components/content_tag/widget_value.tsx








const WidgetValue = (0,connect/* connect */.$j)(function WidgetValue2({
  field,
  widgetProps
}) {
  if ((0,editing_context/* isComparisonActive */.rl)())
    throw new common/* InternalError */.AQ("Not yet implemented");
  if (!(0,editing_context/* isInPlaceEditingActive */.DG)() || !(0,can_edit/* canEditObjWithId */.r)(field.obj().id())) {
    return renderWidget(false);
  }
  return /* @__PURE__ */ external_react_.createElement(in_place_editing_enabled_context/* InPlaceEditingEnabledContextConsumer */.d, null, (isInPlaceEditingEnabled) => renderWidget(isInPlaceEditingEnabled));
  function renderWidget(isInPlaceEditingEnabled) {
    const widget = field.get();
    if (widget) {
      return /* @__PURE__ */ external_react_.createElement(widget_content/* WidgetContent */.x, {
        key: widget.id(),
        widget,
        widgetProps,
        fieldType: "widget"
      });
    }
    if (!isInPlaceEditingEnabled)
      return null;
    const WidgetPlaceholder = (0,import_from/* importFrom */.u$)("reactEditing", "WidgetPlaceholder");
    return WidgetPlaceholder ? /* @__PURE__ */ external_react_.createElement(WidgetPlaceholder, {
      field
    }) : null;
  }
});

;// CONCATENATED MODULE: ./scrivito_sdk/react/components/content_tag/widgetlist_value.tsx









const WidgetlistValue = (0,connect/* connect */.$j)(function WidgetlistValue2({
  field,
  widgetProps
}) {
  if ((0,editing_context/* isComparisonActive */.rl)()) {
    return widgetlistChildrenForComparison();
  }
  if (!(0,editing_context/* isInPlaceEditingActive */.DG)() || !(0,can_edit/* canEditObjWithId */.r)(field.obj().id())) {
    return renderWidgets(false);
  }
  return /* @__PURE__ */ external_react_.createElement(in_place_editing_enabled_context/* InPlaceEditingEnabledContextConsumer */.d, null, (isInPlaceEditingEnabled) => renderWidgets(isInPlaceEditingEnabled));
  function renderWidgets(isInPlaceEditingEnabled) {
    const widgets = field.get();
    if (widgets.length) {
      return /* @__PURE__ */ external_react_.createElement(external_react_.Fragment, null, widgets.map((widget) => /* @__PURE__ */ external_react_.createElement(widget_content/* WidgetContent */.x, {
        key: widget.id(),
        widget,
        widgetProps,
        fieldType: "widgetlist"
      })));
    }
    if (!isInPlaceEditingEnabled)
      return null;
    const WidgetlistPlaceholder = (0,import_from/* importFrom */.u$)(
      "reactEditing",
      "WidgetlistPlaceholder"
    );
    return WidgetlistPlaceholder ? /* @__PURE__ */ external_react_.createElement(WidgetlistPlaceholder, {
      field
    }) : null;
  }
  function widgetlistChildrenForComparison() {
    return /* @__PURE__ */ external_react_.createElement(external_react_.Fragment, null, (0,models/* getPlacementModificationInfos */.Wd)(field, (0,get_comparison_range/* getComparisonRange */.N)()).map(
      (info) => /* @__PURE__ */ external_react_.createElement(widget_content/* WidgetContent */.x, {
        key: `${info.widget.id()}-${info.modification}`,
        widget: info.widget,
        widgetProps,
        placementModification: info.modification,
        fieldType: "widgetlist"
      })
    ));
  }
});

;// CONCATENATED MODULE: ./scrivito_sdk/react/components/content_tag/attribute_value.tsx
var attribute_value_defProp = Object.defineProperty;
var attribute_value_defProps = Object.defineProperties;
var attribute_value_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var attribute_value_getOwnPropSymbols = Object.getOwnPropertySymbols;
var attribute_value_hasOwnProp = Object.prototype.hasOwnProperty;
var attribute_value_propIsEnum = Object.prototype.propertyIsEnumerable;
var attribute_value_defNormalProp = (obj, key, value) => key in obj ? attribute_value_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var attribute_value_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (attribute_value_hasOwnProp.call(b, prop))
      attribute_value_defNormalProp(a, prop, b[prop]);
  if (attribute_value_getOwnPropSymbols)
    for (var prop of attribute_value_getOwnPropSymbols(b)) {
      if (attribute_value_propIsEnum.call(b, prop))
        attribute_value_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var attribute_value_spreadProps = (a, b) => attribute_value_defProps(a, attribute_value_getOwnPropDescs(b));
var attribute_value_objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (attribute_value_hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && attribute_value_getOwnPropSymbols)
    for (var prop of attribute_value_getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && attribute_value_propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
















const AttributeValue = (0,connect/* connect */.$j)(
  withDisplayName(
    "Scrivito.ContentTag.AttributeValue",
    (props) => {
      const dataContextContainer = (0,data_context_container/* useDataContextContainer */.uv)();
      const element = external_react_.useRef();
      external_react_.useEffect(() => {
        if (!element.current)
          return;
        const objId = props.field.obj().id();
        const attributeName = props.field.name();
        return (0,scroll_into_view/* registerScrollTarget */.aL)({ objId, attributeName }, element.current);
      }, [props.field.obj().id(), props.field.name(), element.current]);
      const _a = props.customProps, {
        children: customChildrenFromProps,
        dangerouslySetInnerHTML: maybeCustomInnerHtml
      } = _a, customProps = attribute_value_objRest(_a, [
        "children",
        "dangerouslySetInnerHTML"
      ]);
      const renderProps = renderPropsForField(
        props.field,
        customChildrenFromProps,
        isCustomInnerHtml(maybeCustomInnerHtml) ? maybeCustomInnerHtml : void 0,
        props.customProps.onClick,
        props.widgetProps,
        dataContextContainer
      );
      const editingProps = props.onClick ? {
        onClick: props.onClick,
        "data-scrivito-is-clickable": true
      } : {};
      return external_react_.createElement(props.tag, attribute_value_spreadProps(attribute_value_spreadValues(attribute_value_spreadValues(attribute_value_spreadValues({}, customProps), renderProps), editingProps), {
        ref: (e) => {
          element.current = e;
          if (props.elementCallback)
            props.elementCallback(e);
        }
      }));
    }
  )
);
function isCustomInnerHtml(maybeCustomInnerHtml) {
  return (0,external_underscore_.isObject)(maybeCustomInnerHtml) && typeof maybeCustomInnerHtml.__html === "string";
}
function renderPropsForField(field, customChildrenFromProps, customInnerHtml, customOnClick, widgetProps, dataContextContainer) {
  const dataStack = dataContextContainer == null ? void 0 : dataContextContainer.dataStack;
  const customChildren = customChildrenFromProps || customInnerHtml ? {
    children: customChildrenFromProps,
    dangerouslySetInnerHTML: customInnerHtml ? {
      __html: (0,replace_internal_links/* replaceInternalLinks */.q)(customInnerHtml.__html, {
        dataStack
      })
    } : void 0
  } : void 0;
  switch (field.type()) {
    case "html":
      return renderPropsForHtml(
        field,
        customChildren,
        customOnClick,
        dataContextContainer
      );
    case "string":
      return renderPropsForString(
        field,
        customChildren,
        dataContextContainer
      );
    case "float":
    case "integer":
      return customChildren != null ? customChildren : renderPropsForNumber(field);
    case "widget": {
      return {
        children: /* @__PURE__ */ external_react_.createElement(WidgetValue, {
          field,
          widgetProps
        })
      };
    }
    case "widgetlist": {
      return {
        children: /* @__PURE__ */ external_react_.createElement(WidgetlistValue, {
          field,
          widgetProps
        })
      };
    }
    default:
      return customChildren != null ? customChildren : {};
  }
}
function renderPropsForHtml(field, customChildren, customOnClick, dataContextContainer) {
  const diffContent = (0,editing_context/* isComparisonActive */.rl)() ? field.getHtmlDiffContent((0,get_comparison_range/* getComparisonRange */.N)()) : void 0;
  if (customChildren && !diffContent) {
    return attribute_value_spreadProps(attribute_value_spreadValues({}, customChildren), {
      onClick: customOnClick || handleClickOnHtml
    });
  }
  const dataContext = dataContextContainer == null ? void 0 : dataContextContainer.dataContext;
  const dataStack = dataContextContainer == null ? void 0 : dataContextContainer.dataStack;
  return {
    dangerouslySetInnerHTML: {
      __html: (0,replace_internal_links/* replaceInternalLinks */.q)(
        diffContent || (0,data_integration/* replacePlaceholdersWithData */.O0)(field.get(), {
          dataContext,
          dataStack,
          transform: external_underscore_.escape
        }),
        { dataStack }
      )
    },
    onClick: handleClickOnHtml
  };
}
function renderPropsForString(field, customChildren, dataContextContainer) {
  if ((0,editing_context/* isComparisonActive */.rl)()) {
    const diffContent = field.getHtmlDiffContent((0,get_comparison_range/* getComparisonRange */.N)());
    if (diffContent) {
      return { dangerouslySetInnerHTML: { __html: diffContent } };
    }
  }
  const dataContext = dataContextContainer == null ? void 0 : dataContextContainer.dataContext;
  const dataStack = dataContextContainer == null ? void 0 : dataContextContainer.dataStack;
  return customChildren != null ? customChildren : {
    children: (0,data_integration/* replacePlaceholdersWithData */.O0)(field.get(), {
      dataContext,
      dataStack
    })
  };
}
function renderPropsForNumber(field) {
  const value = field.get();
  const parsedValue = value === 0 ? "0" : value;
  return { children: parsedValue };
}
function handleClickOnHtml(e) {
  const linkTarget = findClickTarget(e);
  if (!linkTarget)
    return;
  if (isOpenInNewWindow(linkTarget)) {
    handleOpenInNewWindow(e, linkTarget);
  } else {
    handleOpenInCurrentWindow(e, linkTarget);
  }
}
function handleOpenInNewWindow(e, { openInNewWindow: url }) {
  if (ui_adapter/* uiAdapter */.k) {
    e.preventDefault();
    (0,change_location/* openInNewWindow */.o)(url);
  }
}
function handleOpenInCurrentWindow(e, { openInCurrentWindow: resource }) {
  e.preventDefault();
  browser_location/* push */.VF(resource);
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/components/content_tag.tsx
var content_tag_defProp = Object.defineProperty;
var content_tag_getOwnPropSymbols = Object.getOwnPropertySymbols;
var content_tag_hasOwnProp = Object.prototype.hasOwnProperty;
var content_tag_propIsEnum = Object.prototype.propertyIsEnumerable;
var content_tag_defNormalProp = (obj, key, value) => key in obj ? content_tag_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var content_tag_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (content_tag_hasOwnProp.call(b, prop))
      content_tag_defNormalProp(a, prop, b[prop]);
  if (content_tag_getOwnPropSymbols)
    for (var prop of content_tag_getOwnPropSymbols(b)) {
      if (content_tag_propIsEnum.call(b, prop))
        content_tag_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var content_tag_objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (content_tag_hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && content_tag_getOwnPropSymbols)
    for (var prop of content_tag_getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && content_tag_propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};











const ContentTagWithElementCallback = (0,connect/* connect */.$j)(function ContentTagWithElementCallback2(_a) {
  var _b = _a, {
    content,
    attribute,
    tag,
    dataContext,
    widgetProps,
    elementCallback
  } = _b, customProps = content_tag_objRest(_b, [
    "content",
    "attribute",
    "tag",
    "dataContext",
    "widgetProps",
    "elementCallback"
  ]);
  if (!content)
    return null;
  let field = getField(content, attribute);
  if (!field)
    return null;
  if ((0,editing_context/* isComparisonActive */.rl)()) {
    const [fromField, toField] = getFieldsForComparison(field);
    if (shouldComparisonBeSkipped(fromField, toField))
      return null;
    field = toField || fromField;
    if (!field)
      return null;
  }
  if (!(0,editing_context/* isInPlaceEditingActive */.DG)() && !(0,editing_context/* isComparisonActive */.rl)() && (0,common/* isEmptyValue */.O2)(field.get()) && (0,content_tags_for_empty_attributes/* shouldContentTagsForEmptyAttributesBeSkipped */.a)()) {
    return null;
  }
  assertWidgetPropsAreAllowed(widgetProps, field);
  const contentTagProps = {
    elementCallback,
    field,
    tag: tag || "div",
    customProps,
    widgetProps
  };
  const AttributeValueWithEditing = (0,import_from/* importFrom */.u$)(
    "reactEditing",
    "AttributeValueWithEditing"
  );
  const AttributeValueComponent = AttributeValueWithEditing || AttributeValue;
  const attributeValue = /* @__PURE__ */ external_react_.createElement(AttributeValueComponent, content_tag_spreadValues({}, contentTagProps));
  if (isDataContextObject(dataContext) && (dataContext._class || dataContext._id)) {
    (0,common/* throwNextTick */.a6)(
      new common/* ArgumentError */.ir(
        'The object provided via "dataContext" prop must not contain keys "_class" and "_id"'
      )
    );
    return attributeValue;
  }
  if (!dataContext)
    return attributeValue;
  return /* @__PURE__ */ external_react_.createElement(data_context_container/* PushOntoDataStack */.ec, {
    item: dataContext
  }, attributeValue);
});
function getField(content, attribute) {
  const field = realm/* Schema.basicFieldFor */.V_.basicFieldFor(content, attribute);
  if (field)
    return field;
  (0,common/* throwNextTick */.a6)(
    new common/* ArgumentError */.ir(
      `Component "Scrivito.ContentTag" received prop "attribute" with invalid value: Attribute "${attribute}" is not defined for content specified in prop "content".`
    )
  );
  return null;
}
function getFieldsForComparison(field) {
  return (0,get_comparison_range/* getComparisonRange */.N)().map((objSpace) => field.inObjSpace(objSpace));
}
function assertWidgetPropsAreAllowed(widgetProps, field) {
  if (!widgetProps)
    return;
  const fieldType = field.type();
  if (!(fieldType === "widget" || fieldType === "widgetlist")) {
    (0,common/* throwNextTick */.a6)(
      new common/* ArgumentError */.ir(
        'The prop "widgetProps" is only allowed for widget and widgetlist attributes'
      )
    );
  }
}
function shouldComparisonBeSkipped(fromField, toField) {
  return (0,common/* isEmptyValue */.O2)(fromField == null ? void 0 : fromField.get()) && (0,common/* isEmptyValue */.O2)(toField == null ? void 0 : toField.get()) && (0,content_tags_for_empty_attributes/* shouldContentTagsForEmptyAttributesBeSkipped */.a)();
}
const ContentTag = (0,connect/* connect */.$j)(
  ContentTagWithElementCallback
);
ContentTag.displayName = "Scrivito.ContentTag";
function isDataContextObject(dataContext) {
  return !!dataContext && !(dataContext instanceof data_integration/* DataItem */.zw) && !(dataContext instanceof data_integration/* DataScope */.Cc) && !(dataContext instanceof realm/* Obj */.eG);
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_page_data.ts
var current_page_data = __webpack_require__(4077);
// EXTERNAL MODULE: ./scrivito_sdk/react/components/automatic_data_context.tsx
var automatic_data_context = __webpack_require__(7777);
;// CONCATENATED MODULE: ./scrivito_sdk/react/scroll_window.ts



let previousNavigationState;
function notifyScrollWindow(navigationState) {
  if (!(0,browser_location/* isCurrentHistoryState */.XB)(navigationState.historyState))
    return;
  if (shouldScroll(navigationState))
    (0,common/* scrollTo */.X5)(0, 0);
  previousNavigationState = navigationState;
}
function shouldScroll(currentNavigationState) {
  if (currentNavigationState.historyState.isRevisit)
    return false;
  const hasFragment = currentNavigationState.historyState.location.indexOf("#") !== -1;
  if (hasFragment)
    return false;
  const route = currentNavigationState.locationRoute;
  if ((0,routing/* isObjNotFoundRoute */.Kh)(route))
    return true;
  if ((0,routing/* isNotResponsibleRoute */.QF)(route))
    return false;
  return currentNavigationState.historyState.historyChangesCount !== (previousNavigationState == null ? void 0 : previousNavigationState.historyState.historyChangesCount);
}
function scroll_window_reset() {
  previousNavigationState = void 0;
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/components/page_scroll.tsx


class PageScroll extends external_react_.Component {
  componentDidMount() {
    this.notifyScrollWindow();
  }
  componentDidUpdate() {
    this.notifyScrollWindow();
  }
  render() {
    return null;
  }
  notifyScrollWindow() {
    notifyScrollWindow(this.props.navigationState);
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/get_component_for_page_class.ts


function getComponentForPageClass(pageClassName) {
  const pageComponent = (0,component_registry/* getComponentForAppClass */.YK)(pageClassName);
  if (pageComponent) {
    return pageComponent;
  }
  (0,common/* throwNextTick */.a6)(
    new common/* ArgumentError */.ir(
      `No component registered for obj class "${pageClassName}"`
    )
  );
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/components/current_page/details_page_data_context.tsx





const DetailsPageDataContext = (0,connect/* connect */.$j)(function DetailsPageDataContext2({
  page,
  params,
  children
}) {
  if (!page)
    return children;
  const dataContext = (0,data_integration/* dataContextFromQueryParams */.ae)(page, params);
  if (dataContext === "loading")
    return null;
  if (dataContext === "unavailable")
    return renderDataError();
  if (!dataContext)
    return children;
  return /* @__PURE__ */ external_react_.createElement(data_context_container/* PushOntoDataStack */.ec, {
    item: dataContext
  }, children);
});
function renderDataError() {
  const DataErrorComponent = (0,component_registry/* getDataErrorComponent */.LL)();
  return DataErrorComponent ? /* @__PURE__ */ external_react_.createElement(DataErrorComponent, null) : /* @__PURE__ */ external_react_.createElement(external_react_.Fragment, null, "Data Not Found");
}

// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 23 modules
var loadable = __webpack_require__(9246);
;// CONCATENATED MODULE: ./scrivito_sdk/react/components/current_page/use_layout.tsx









const LayoutIndexContext = external_react_.createContext(0);
function useLayout(page, params) {
  const layoutIndex = external_react_.useContext(LayoutIndexContext);
  if (!(0,component_registry/* areLayoutComponentsStored */.Ji)())
    return;
  if (layoutIndex === 0)
    page.ancestors();
  const nextPage = getNextPage(page, layoutIndex);
  if (nextPage === void 0)
    return;
  if (nextPage === "loading")
    return "loading";
  return /* @__PURE__ */ external_react_.createElement(PageLayout, {
    page: nextPage,
    params,
    layoutIndex
  });
}
function getNextPage(page, layoutIndex) {
  const path = page.path();
  if (path) {
    const ancestorPaths = (0,common/* computeAncestorPaths */.dJ)(path);
    if (layoutIndex >= ancestorPaths.length)
      return;
    const ancestorPath = ancestorPaths[layoutIndex];
    return ancestorPath === path ? page : objByPath(ancestorPath);
  }
  if (layoutIndex === 0)
    return page;
}
function objByPath(path) {
  return (0,loadable/* loadWithDefault */.n4)(
    "loading",
    () => (0,models/* getObjBy */.HG)((0,models/* objSpaceScope */.hA)((0,models/* currentObjSpaceId */.GD)()), "_path", path)
  );
}
const PageLayout = (0,connect/* connect */.$j)(function PageLayout2({
  page,
  params,
  layoutIndex
}) {
  const Component = page && (0,component_registry/* getLayoutComponentForAppClass */.A7)(page.objClass());
  return /* @__PURE__ */ external_react_.createElement(DetailsPageDataContext, {
    page,
    params
  }, /* @__PURE__ */ external_react_.createElement(LayoutIndexContext.Provider, {
    value: layoutIndex + 1
  }, Component ? /* @__PURE__ */ external_react_.createElement(Component, {
    page: (0,realm/* wrapInAppClass */.pz)(page)
  }) : /* @__PURE__ */ external_react_.createElement(CurrentPage, null)));
});

;// CONCATENATED MODULE: ./scrivito_sdk/react/components/current_page.tsx










const CurrentPage = (0,connect/* connect */.$j)(
  function CurrentPage2() {
    const pageData = (0,current_page_data/* getCurrentPageData */["if"])();
    if (!pageData)
      return null;
    const { currentPage, navigationState } = pageData;
    if (!currentPage)
      return null;
    return /* @__PURE__ */ external_react_.createElement(CurrentPageWithLayout, {
      currentPage,
      navigationState
    });
  }
);
const CurrentPageWithLayout = (0,connect/* connect */.$j)(function CurrentPageWithLayout2({
  currentPage,
  navigationState
}) {
  var _a, _b;
  const params = external_urijs_.parseQuery((_b = (_a = navigationState == null ? void 0 : navigationState.locationRoute) == null ? void 0 : _a.query) != null ? _b : "");
  const layout = useLayout(currentPage, params);
  if (layout)
    return layout === "loading" ? null : layout;
  const PageComponent = getComponentForPageClass(currentPage.objClass());
  return /* @__PURE__ */ external_react_.createElement(DetailsPageDataContext, {
    page: currentPage,
    params
  }, /* @__PURE__ */ external_react_.createElement(automatic_data_context/* AutomaticDataContext */.j, {
    content: currentPage
  }, /* @__PURE__ */ external_react_.createElement(external_react_.Fragment, null, /* @__PURE__ */ external_react_.createElement(PageScroll, {
    navigationState
  }), PageComponent && /* @__PURE__ */ external_react_.createElement(PageComponent, {
    page: (0,realm/* wrapInAppClass */.pz)(currentPage),
    params
  }))));
});
CurrentPage.displayName = "Scrivito.CurrentPage";

// EXTERNAL MODULE: external "react-dom"
var external_react_dom_ = __webpack_require__(7111);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/legacy_render_extension.ts
var legacy_render_extension = __webpack_require__(1320);
;// CONCATENATED MODULE: ./scrivito_sdk/react/components/extensions.tsx




let onShowExtension;
function showExtension(reactElement) {
  if (!onShowExtension)
    return (0,legacy_render_extension/* legacyRenderExtension */.x7)(reactElement);
  onShowExtension(reactElement);
}
function resetOnShowExtension() {
  onShowExtension = void 0;
}
function Extensions() {
  const [htmlElement, setHtmlElement] = external_react_.useState(
    null
  );
  const [reactElement, setReactElement] = external_react_.useState(null);
  external_react_.useEffect(() => {
    const doc = (0,common/* getDocument */.Me)();
    const mount = doc.createElement("div");
    doc.body.append(mount);
    onShowExtension = setReactElement;
    setHtmlElement(mount);
    return () => {
      onShowExtension = void 0;
      mount.remove();
    };
  }, []);
  return htmlElement ? external_react_dom_.createPortal(reactElement, htmlElement) : null;
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/decode_image.ts


function decodeImage(imageUrl) {
  return decodeOrLoadImg(imageUrl).then((img) => {
    if (!hasDecodeImg(img))
      drawImgOnCanvas(img);
    return imageUrl;
  }).catch(() => imageUrl);
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/image_decoder.ts


class ImageDecoder {
  constructor(onUpdateCallback) {
    this.decodedUrls = {};
    this.loadingRegistry = {};
    this.isOnUpdateCallbackActive = true;
    this.onUpdateCallback = onUpdateCallback;
  }
  getImage(imageUrl) {
    const resultUrl = this.decodedUrls[imageUrl];
    if (!resultUrl) {
      this.ensureLoading(imageUrl);
    }
    return resultUrl;
  }
  cancelUpdateCallback() {
    this.isOnUpdateCallbackActive = false;
  }
  resumeUpdateCallback() {
    this.isOnUpdateCallbackActive = true;
  }
  ensureLoading(imageUrl) {
    if (this.decodedUrls[imageUrl] || this.loadingRegistry[imageUrl])
      return;
    const promise = decodeImage(imageUrl).then((url) => {
      this.decodedUrls[imageUrl] = url;
      this.isOnUpdateCallbackActive && this.onUpdateCallback();
    });
    this.loadingRegistry[imageUrl] = (0,common/* promiseAndFinally */.sH)(
      promise,
      () => delete this.loadingRegistry[imageUrl]
    );
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/image_placeholder.ts
const imagePlaceholder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAQMAAACXljzdAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAABxJREFUWMPtwYEAAAAAw6D5U1/hAFUBAAAAAHwGFFAAAQCfIxUAAAAASUVORK5CYII";

;// CONCATENATED MODULE: ./scrivito_sdk/react/components/image_tag.tsx
var image_tag_defProp = Object.defineProperty;
var image_tag_defProps = Object.defineProperties;
var image_tag_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var image_tag_getOwnPropSymbols = Object.getOwnPropertySymbols;
var image_tag_hasOwnProp = Object.prototype.hasOwnProperty;
var image_tag_propIsEnum = Object.prototype.propertyIsEnumerable;
var image_tag_defNormalProp = (obj, key, value) => key in obj ? image_tag_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var image_tag_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (image_tag_hasOwnProp.call(b, prop))
      image_tag_defNormalProp(a, prop, b[prop]);
  if (image_tag_getOwnPropSymbols)
    for (var prop of image_tag_getOwnPropSymbols(b)) {
      if (image_tag_propIsEnum.call(b, prop))
        image_tag_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var image_tag_spreadProps = (a, b) => image_tag_defProps(a, image_tag_getOwnPropDescs(b));
var image_tag_objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (image_tag_hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && image_tag_getOwnPropSymbols)
    for (var prop of image_tag_getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && image_tag_propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};










const ImageTag = (0,connect/* connect */.$j)(function ImageTag2(_a) {
  var _b = _a, {
    content,
    attribute = "blob",
    width,
    onLoad
  } = _b, htmlOptions = image_tag_objRest(_b, [
    "content",
    "attribute",
    "width",
    "onLoad"
  ]);
  const [isLazy, setIsLazy] = external_react_.useState(htmlOptions.loading === "lazy");
  const load = external_react_.useCallback(
    (event) => {
      setIsLazy(false);
      return onLoad == null ? void 0 : onLoad.call(null, event);
    },
    [onLoad]
  );
  const setEagerIfComplete = external_react_.useCallback((node) => {
    if (isComplete(node))
      setIsLazy(false);
  }, []);
  const [, setImageDecoderUpdateCounter] = external_react_.useState(0);
  const decoder = external_react_.useMemo(
    () => isLazy ? void 0 : new ImageDecoder(
      () => setImageDecoderUpdateCounter((counter) => counter + 1)
    ),
    [isLazy]
  );
  external_react_.useEffect(() => {
    decoder == null ? void 0 : decoder.resumeUpdateCallback();
    return () => decoder == null ? void 0 : decoder.cancelUpdateCallback();
  }, [decoder]);
  if (!content)
    return null;
  if (content instanceof models/* Binary */.Kb) {
    const fullWidth2 = getFullWidth(content, width, isLazy);
    return fullWidth2 === null ? null : /* @__PURE__ */ external_react_.createElement("img", image_tag_spreadProps(image_tag_spreadValues({
      src: scaledSrc(decoder, content),
      width: fullWidth2
    }, htmlOptions), {
      onLoad: load,
      ref: setEagerIfComplete
    }));
  }
  const binary = getBinary(content, attribute);
  if (binary === void 0)
    return null;
  if (binary === null) {
    return /* @__PURE__ */ external_react_.createElement(ContentTag, image_tag_spreadValues({
      attribute,
      content,
      tag: "img",
      src: imagePlaceholder,
      "data-scrivito-image-placeholder": true,
      width
    }, htmlOptions));
  }
  const fullWidth = getFullWidth(binary, width, isLazy);
  return fullWidth === null ? null : /* @__PURE__ */ external_react_.createElement(ContentTagWithElementCallback, image_tag_spreadProps(image_tag_spreadValues({
    attribute,
    content,
    width: fullWidth,
    tag: "img",
    src: scaledSrc(decoder, binary)
  }, htmlOptions), {
    onLoad: load,
    elementCallback: setEagerIfComplete
  }));
});
function scaledSrc(decoder, binary) {
  const { initialUrl, highResUrlToDecode } = (0,scale_down_binary/* scaleDownBinary */.BN)(binary);
  const decodedImg = highResUrlToDecode && (decoder == null ? void 0 : decoder.getImage(highResUrlToDecode));
  return decodedImg || initialUrl;
}
function getFullWidth(binary, width, isLazy) {
  if (isLazy && !(0,scale_down_binary/* isInitialUrlAvailable */.kY)(binary))
    return null;
  if (width !== void 0)
    return width;
  if (binary.isRaw() || binary.isExplicitlyTransformed())
    return;
  const metadata = binary.raw().metadata();
  if (metadata.contentType() === "image/svg+xml")
    return;
  const metadataWidth = metadata.get("width");
  return (0,external_underscore_.isNumber)(metadataWidth) ? metadataWidth : null;
}
function getBinary(content, attribute) {
  const field = realm/* Schema.basicFieldFor */.V_.basicFieldFor(content, attribute);
  if (!field) {
    if (realm/* Schema.forInstance */.V_.forInstance(content)) {
      (0,common/* throwNextTick */.a6)(
        new common/* ArgumentError */.ir(
          `Component "Scrivito.ImageTag" received prop "content" with an object missing attribute "${attribute}".`
        )
      );
    }
    return;
  }
  const attributeType = field.type();
  if (attributeType === "binary")
    return field.get();
  if (attributeType === "reference") {
    const referenced = field.get();
    if (!(referenced instanceof models/* BasicObj */.Jj))
      return null;
    return referenced.get("blob", "binary") || null;
  }
  (0,common/* throwNextTick */.a6)(
    new common/* ArgumentError */.ir(
      `Component "Scrivito.ImageTag" received prop "content" with an object, whose attribute "${attribute}" is of unexpected type "${attributeType}". Valid attribute types are "binary" and "reference".`
    )
  );
}
function isComplete(node) {
  return node && node.complete;
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/components/in_place_editing.tsx



function InPlaceEditingOff({ children }) {
  return (0,editing_context/* isInPlaceEditingActive */.DG)() ? /* @__PURE__ */ external_react_.createElement(in_place_editing_enabled_context/* InPlaceEditingEnabledContextProvider */.P, {
    children,
    value: false
  }) : children;
}
function RestoreInPlaceEditing({
  children
}) {
  return (0,editing_context/* isInPlaceEditingActive */.DG)() ? /* @__PURE__ */ external_react_.createElement(in_place_editing_enabled_context/* InPlaceEditingEnabledContextProvider */.P, {
    children,
    value: true
  }) : children;
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/components/not_found_error_page.tsx





const NotFoundErrorPage = (0,connect/* connect */.$j)(function NotFoundErrorPage2({ children }) {
  const navigationState = (0,current_page_data/* getNotFoundErrorPageState */.fW)();
  if (!navigationState)
    return null;
  if (!(0,browser_location/* isCurrentHistoryState */.XB)(navigationState.historyState))
    return null;
  return /* @__PURE__ */ external_react_.createElement(external_react_.Fragment, null, /* @__PURE__ */ external_react_.createElement(PageScroll, {
    navigationState
  }), children || /* @__PURE__ */ external_react_.createElement("div", null, /* @__PURE__ */ external_react_.createElement("h1", null, "The page you were looking for doesn't exist."), /* @__PURE__ */ external_react_.createElement("p", null, "You may have mistyped the address or the page may have moved.")));
});
NotFoundErrorPage.displayName = "Scrivito.NotFoundErrorPage";

// EXTERNAL MODULE: ./scrivito_sdk/react/always_show_option_markers.ts
var always_show_option_markers = __webpack_require__(1637);
// EXTERNAL MODULE: ./scrivito_sdk/react/hooks/use_force_update.ts
var use_force_update = __webpack_require__(4130);
;// CONCATENATED MODULE: ./scrivito_sdk/react/use_data_item.ts


function useDataItem() {
  const element = (0,data_context_container/* useLastDataStackElement */.SO)();
  if (element && (0,data_integration/* isDataItemPojo */.Fv)(element)) {
    return (0,data_integration/* dataItemFromPojo */.vG)(element);
  }
}

// EXTERNAL MODULE: ./scrivito_sdk/react/use_data_locator.ts
var use_data_locator = __webpack_require__(4102);
;// CONCATENATED MODULE: ./scrivito_sdk/react/use_data_scope.ts


function useDataScope() {
  const element = (0,data_context_container/* useLastDataStackElement */.SO)();
  if (element && (0,data_integration/* isDataScopePojo */.__)(element)) {
    return (0,data_integration/* dataScopeFromPojo */.DT)(element);
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/index.ts





























/***/ }),

/***/ 4033:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "X": () => (/* binding */ memo)
/* harmony export */ });
/* unused harmony export propsAreEqual */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8156);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3711);


function memo(Component) {
  return react__WEBPACK_IMPORTED_MODULE_0__.memo(Component, propsAreEqual);
}
function propsAreEqual(prevProps, nextProps) {
  return Object.keys(prevProps).every(
    (key) => (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .equalsBestEffort */ .Fe)(prevProps[key], nextProps[key])
  );
}


/***/ }),

/***/ 4102:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ useDataLocator)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2878);
/* harmony import */ var scrivito_sdk_react_data_context_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4889);


function useDataLocator(dataLocator) {
  const dataStack = (0,scrivito_sdk_react_data_context_container__WEBPACK_IMPORTED_MODULE_1__/* .useDataStack */ .K7)();
  return (0,scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_0__/* .applyDataLocator */ .ED)(dataStack, dataLocator);
}


/***/ }),

/***/ 5932:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "rU": () => (/* reexport */ Link),
  "eG": () => (/* reexport */ Obj),
  "Qi": () => (/* reexport */ ObjClassType),
  "JB": () => (/* reexport */ ObjFacetValue),
  "d_": () => (/* reexport */ ObjSearch),
  "V_": () => (/* reexport */ Schema),
  "$L": () => (/* reexport */ Widget),
  "c6": () => (/* reexport */ WidgetClassType),
  "Cn": () => (/* reexport */ allObjClasses),
  "OY": () => (/* reexport */ allWidgetClasses),
  "aQ": () => (/* reexport */ checkProvideComponent),
  "xu": () => (/* reexport */ checkProvideDataClass),
  "iq": () => (/* reexport */ checkProvideDataErrorComponent),
  "yj": () => (/* reexport */ checkProvideDataItem),
  "gj": () => (/* reexport */ checkProvideLayoutComponent),
  "r$": () => (/* reexport */ createObjClass),
  "Zv": () => (/* reexport */ createWidgetClass),
  "pw": () => (/* reexport */ enableStrictSearchOperators),
  "ll": () => (/* reexport */ getClass),
  "Gf": () => (/* reexport */ isBinaryBasicObj),
  "Hn": () => (/* reexport */ isObjClass),
  "Je": () => (/* reexport */ provideObjClass),
  "We": () => (/* reexport */ provideWidgetClass),
  "cv": () => (/* reexport */ schemaFromBasicObjOrWidget),
  "RO": () => (/* reexport */ setCurrentSiteIdHandler),
  "dz": () => (/* reexport */ unwrapAppAttributes),
  "bM": () => (/* reexport */ unwrapAppClass),
  "pz": () => (/* reexport */ wrapInAppClass)
});

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 45 modules
var common = __webpack_require__(3711);
// EXTERNAL MODULE: ./scrivito_sdk/models/index.ts + 34 modules
var models = __webpack_require__(9838);
// EXTERNAL MODULE: external "underscore"
var external_underscore_ = __webpack_require__(4952);
;// CONCATENATED MODULE: ./scrivito_sdk/realm/assert_valid_attribute_name.ts

function assertValidAttributeName(attributeName) {
  if (!(0,common/* isCamelCase */.q2)(attributeName)) {
    throw new common/* ArgumentError */.ir("Attribute names have to be in camel case.");
  }
  if ((0,common/* isSystemAttribute */.mb)(attributeName)) {
    throw new common/* ArgumentError */.ir(
      `Attribute name "${attributeName}" is not a valid custom attribute name.`
    );
  }
}

// EXTERNAL MODULE: ./scrivito_sdk/realm/initial_content_registry.ts
var initial_content_registry = __webpack_require__(5656);
;// CONCATENATED MODULE: ./scrivito_sdk/realm/initial_attributes_for.ts

function initialAttributesFor(providedAttributes, schema, appClassName) {
  const initialAttributes = {};
  Object.keys(schema.attributes()).forEach((attributeName) => {
    if (!Object.prototype.hasOwnProperty.call(providedAttributes, attributeName)) {
      const initialValue = (0,initial_content_registry/* initialContentFor */.W)(appClassName, attributeName);
      if (initialValue !== void 0) {
        initialAttributes[attributeName] = initialValue;
      }
    }
  });
  return initialAttributes;
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/schema.ts
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

class Schema {
  constructor(classDefinition, parentClass) {
    this.parentClass = parentClass;
    const parentSchema = this.parentClass._scrivitoPrivateSchema;
    const basicAttributeDefinitions = parentSchema ? __spreadValues({}, parentSchema.attributes()) : {};
    const _a = classDefinition, {
      attributes: rawAttributeDefinitions,
      onlyInside: rawOnlyInside,
      onlyChildren: rawOnlyChildren
    } = _a, restOfRawDefinition = __objRest(_a, [
      "attributes",
      "onlyInside",
      "onlyChildren"
    ]);
    if (rawAttributeDefinitions) {
      Object.keys(rawAttributeDefinitions).forEach((name) => {
        basicAttributeDefinitions[name] = toBasicAttributeDefinition(
          rawAttributeDefinitions[name]
        );
      });
    }
    const onlyChildren = toArrayOfStrings(rawOnlyChildren);
    const onlyInside = toArrayOfStrings(rawOnlyInside);
    if (onlyChildren) {
      this.basicClassDefinition = __spreadProps(__spreadValues({}, restOfRawDefinition), {
        attributes: basicAttributeDefinitions,
        onlyChildren,
        onlyInside
      });
    } else {
      this.basicClassDefinition = __spreadProps(__spreadValues({}, restOfRawDefinition), {
        attributes: basicAttributeDefinitions,
        onlyInside
      });
    }
  }
  static forInstance(model) {
    return Schema.forClass(model.constructor);
  }
  static forClass(klass) {
    return klass._scrivitoPrivateSchema;
  }
  static basicFieldFor(model, attributeName) {
    const schema = Schema.forInstance(model);
    if (!schema)
      return null;
    const typeInfo = schema.attribute(attributeName);
    if (!typeInfo)
      return null;
    return new models/* BasicField */.cO(
      model._scrivitoPrivateContent,
      attributeName,
      typeInfo
    );
  }
  attributes() {
    return this.basicClassDefinition.attributes;
  }
  normalizedAttributes() {
    const attributes = this.attributes();
    const normalizedAttributes = {};
    Object.keys(attributes).forEach((name) => {
      normalizedAttributes[name] = toNormalizedAttributeDefinition(
        attributes[name]
      );
    });
    return normalizedAttributes;
  }
  extractTextAttributes() {
    return this.basicClassDefinition.extractTextAttributes || [];
  }
  name() {
    return this.basicClassDefinition.name;
  }
  onlyInside() {
    return this.basicClassDefinition.onlyInside;
  }
  onlyChildren() {
    return this.basicClassDefinition.onlyChildren;
  }
  validAsRoot() {
    return this.basicClassDefinition.validAsRoot;
  }
  onlyAsRoot() {
    return this.basicClassDefinition.onlyAsRoot;
  }
  attribute(name) {
    return this.attributes()[name];
  }
  isBinary() {
    const blobDefinition = this.attribute("blob");
    if (!blobDefinition)
      return false;
    return blobDefinition[0] === "binary";
  }
  parent() {
    return this.parentClass;
  }
}
function isAppClass(object) {
  return !!(object && object._scrivitoPrivateSchema);
}
function toBasicAttributeDefinition(attrDefinition) {
  if (typeof attrDefinition === "string")
    return [attrDefinition];
  const type = attrDefinition[0];
  if (type === "enum" || type === "multienum")
    return [type, attrDefinition[1]];
  const _a = attrDefinition[1], { only } = _a, otherOptions = __objRest(_a, ["only"]);
  const validClasses = typeof only === "string" ? [only] : only;
  if (type === "widgetlist" && !validClasses && attrDefinition[1].maximum) {
    return ["widgetlist", { maximum: attrDefinition[1].maximum }];
  }
  return validClasses ? [type, __spreadProps(__spreadValues({}, otherOptions), { validClasses })] : [type];
}
function toNormalizedAttributeDefinition(definition) {
  if (definition.length === 1)
    return [definition[0], {}];
  switch (definition[0]) {
    case "reference":
    case "referencelist":
    case "widget":
    case "widgetlist": {
      const _a = definition[1], { validClasses: only } = _a, otherConfig = __objRest(_a, ["validClasses"]);
      return [definition[0], only ? __spreadValues({ only }, otherConfig) : otherConfig];
    }
  }
  return definition;
}
function toArrayOfStrings(value) {
  if (typeof value === "string")
    return [value];
  if (value == null ? void 0 : value.length)
    return value;
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/sub_widgets.ts

function subWidgets(content) {
  const contentSchema = schemaFromBasicObjOrWidget(content);
  if (!contentSchema)
    return [];
  const attributes = contentSchema.attributes();
  return Object.keys(attributes).reduce((memo, attrName) => {
    const [attrType] = attributes[attrName];
    if (attrType === "widget") {
      const widget = content.get(attrName, "widget");
      if (widget)
        return [...memo, widget, ...subWidgets(widget)];
    }
    if (attrType === "widgetlist") {
      const widgets = content.get(attrName, "widgetlist");
      return Array.prototype.concat(
        memo,
        ...widgets.map((widget) => [widget, ...subWidgets(widget)])
      );
    }
    return memo;
  }, []);
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/widget.ts
var widget_defProp = Object.defineProperty;
var widget_defProps = Object.defineProperties;
var widget_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var widget_getOwnPropSymbols = Object.getOwnPropertySymbols;
var widget_hasOwnProp = Object.prototype.hasOwnProperty;
var widget_propIsEnum = Object.prototype.propertyIsEnumerable;
var widget_defNormalProp = (obj, key, value) => key in obj ? widget_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var widget_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (widget_hasOwnProp.call(b, prop))
      widget_defNormalProp(a, prop, b[prop]);
  if (widget_getOwnPropSymbols)
    for (var prop of widget_getOwnPropSymbols(b)) {
      if (widget_propIsEnum.call(b, prop))
        widget_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var widget_spreadProps = (a, b) => widget_defProps(a, widget_getOwnPropDescs(b));









class Widget {
  constructor(attributes = {}) {
    const appClassName = objClassNameFor(this.constructor);
    if (!appClassName) {
      throw new common/* ArgumentError */.ir(
        "Use a specific class (like TextWidget or ImageWidget) to create a Widget."
      );
    }
    assertValidAttributes(attributes);
    const schema = Schema.forInstance(this);
    if (!schema)
      throw new common/* InternalError */.AQ();
    const basicAttributes = unwrapAppAttributes(
      widget_spreadProps(widget_spreadValues({}, attributes), { _objClass: appClassName }),
      schema,
      appClassName
    );
    const basicWidget = models/* BasicWidget.createWithUnknownValues */.E8.createWithUnknownValues(basicAttributes);
    basicWidget.onDidPersist((copiedWidget) => {
      const appWidget = wrapInAppClass(copiedWidget);
      const initialAttributes = initialAttributesFor(
        basicAttributes,
        schema,
        appClassName
      );
      updateAppAttributes(appWidget, initialAttributes);
    });
    this._scrivitoPrivateContent = basicWidget;
  }
  id() {
    return this._scrivitoPrivateContent.id();
  }
  objClass() {
    return this._scrivitoPrivateContent.objClass();
  }
  get(attributeName) {
    assertValidAttributeName(attributeName);
    return readAppAttribute(this, attributeName);
  }
  update(attributes) {
    updateAppAttributes(this, attributes);
  }
  obj() {
    const basicObj = this._scrivitoPrivateContent.obj();
    return wrapInAppClass(basicObj);
  }
  widgets() {
    return wrapInAppClass(subWidgets(this._scrivitoPrivateContent));
  }
  copy() {
    const basicWidget = this._scrivitoPrivateContent.copy();
    return wrapInAppClass(basicWidget);
  }
  destroy() {
    this._scrivitoPrivateContent.remove();
  }
  container() {
    const container = this._scrivitoPrivateContent.container();
    return wrapInAppClass(container);
  }
  attributeDefinitions() {
    const schema = Schema.forInstance(this);
    if (!schema)
      return {};
    return schema.normalizedAttributes();
  }
}
function assertValidAttributes(attributes) {
  if (attributes.constructor !== Object) {
    throw new common/* ArgumentError */.ir(
      "The provided attributes are invalid. They have to be an Object with valid Scrivito attribute values."
    );
  }
  if (attributes._objClass) {
    throw new common/* ArgumentError */.ir(
      `Invalid attribute "_objClass". "new ${attributes._objClass}" will automatically set the CMS object class correctly.`
    );
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/registry.ts



let mapping = {};
function registerClass(name, klass) {
  mapping[name] = klass;
}
function getClass(name) {
  return mapping[name] || null;
}
function objClassNameFor(modelClass) {
  return (0,external_underscore_.findKey)(mapping, (klass) => klass === modelClass) || null;
}
function appClassFor(name, baseClass) {
  const appClass = getClass(name);
  return appClass && baseClass.isPrototypeOf(appClass) ? appClass : baseClass;
}
function resetRegistry() {
  mapping = {};
}
function allObjClasses() {
  return (0,external_underscore_.pick)(mapping, (modelClass) => Obj.isPrototypeOf(modelClass));
}
function allWidgetClasses() {
  return (0,external_underscore_.pick)(
    mapping,
    (modelClass) => Widget.isPrototypeOf(modelClass)
  );
}
function objClassFor(name) {
  return appClassFor(name, Obj);
}
function widgetClassFor(name) {
  return appClassFor(name, Widget);
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/wrap_in_app_class.ts





function wrapInAppClass(internalValue) {
  if (Array.isArray(internalValue)) {
    return internalValue.map((value) => wrapInAppClass(value)).filter((value) => value !== null);
  }
  if (internalValue instanceof models/* BasicObj */.Jj) {
    return buildAppClassInstance(
      internalValue,
      objClassFor(internalValue.objClass())
    );
  }
  if (internalValue instanceof models/* BasicWidget */.E8) {
    return buildAppClassInstance(
      internalValue,
      widgetClassFor(internalValue.objClass())
    );
  }
  if (internalValue instanceof models/* BasicLink */.AM) {
    if (!internalValue.hasDestination())
      return null;
    return buildAppClassInstance(internalValue, Link);
  }
  if (internalValue instanceof models/* ObjUnavailable */.AZ)
    return null;
  return internalValue;
}
function unwrapAppClass(value) {
  if (Array.isArray(value))
    return value.map((v) => unwrapAppClass(v));
  if (hasPrivateContent(value))
    return value._scrivitoPrivateContent;
  return value;
}
function unwrapAppAttributes(appAttributes, schema, appClassName) {
  return (0,external_underscore_.mapObject)(appAttributes, (value, name) => {
    if ((0,common/* isSystemAttribute */.mb)(name))
      return [value];
    const normalizedTypeInfo = schema.attribute(name);
    if (!normalizedTypeInfo) {
      throw new common/* ArgumentError */.ir(
        `Attribute "${name}" is not defined for CMS object class "${appClassName}".`
      );
    }
    const unwrappedValue = unwrapAppClass(value);
    return [unwrappedValue, normalizedTypeInfo];
  });
}
function buildAppClassInstance(internalValue, appClass) {
  const externalValue = Object.create(appClass.prototype);
  externalValue._scrivitoPrivateContent = internalValue;
  return externalValue;
}
function hasPrivateContent(value) {
  return !!value && !!value._scrivitoPrivateContent;
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/app_model_accessor.ts




function readAppAttribute(model, attributeName) {
  const basicField = Schema.basicFieldFor(
    model,
    attributeName
  );
  return basicField && wrapInAppClass(basicField.get());
}
function updateAppAttributes(model, attributes) {
  const appClassName = objClassNameFor(model.constructor);
  if (!appClassName) {
    let baseClass;
    if (model.constructor === Obj) {
      baseClass = "Obj";
    } else {
      baseClass = "Widget";
    }
    throw new common/* ArgumentError */.ir(
      `Updating is not supported on the base class "${baseClass}".`
    );
  }
  if (attributes.constructor !== Object) {
    throw new common/* ArgumentError */.ir(
      "The provided attributes are invalid. They have to be an Object with valid Scrivito attribute values."
    );
  }
  const schema = Schema.forInstance(model);
  const attributesWithTypeInfo = unwrapAppAttributes(
    attributes,
    schema,
    appClassName
  );
  model._scrivitoPrivateContent.updateWithUnknownValues(attributesWithTypeInfo);
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/obj_facet_value.ts

class ObjFacetValue {
  constructor(basicObjFacetValue) {
    this._basicObjFacetValue = basicObjFacetValue;
  }
  name() {
    return this._basicObjFacetValue.name();
  }
  count() {
    return this._basicObjFacetValue.count();
  }
  includedObjs() {
    const response = this._basicObjFacetValue.includedObjs();
    return wrapInAppClass(response);
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/strict_search_operators.ts
let strictSearchOperators = false;
function enableStrictSearchOperators() {
  strictSearchOperators = true;
}
function areStrictSearchOperatorsEnabled() {
  return strictSearchOperators;
}
function resetStrictSearchOperators() {
  strictSearchOperators = false;
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/obj_search.ts





class ObjSearch {
  constructor(basicSearch) {
    this._scrivitoPrivateContent = basicSearch;
  }
  and(fieldOrSearchToExtendBy, operator, value, boost) {
    if (fieldOrSearchToExtendBy instanceof ObjSearch) {
      const search = fieldOrSearchToExtendBy;
      this._scrivitoPrivateContent.and(search._scrivitoPrivateContent);
    } else {
      if (operator === void 0) {
        throw new common/* ArgumentError */.ir("Missing operator to search with");
      }
      if (value === void 0) {
        throw new common/* ArgumentError */.ir(
          'Missing value to search (specify "null" for missing)'
        );
      }
      if (areStrictSearchOperatorsEnabled()) {
        checkNonFullTextSearchOperator(
          "objSearch.and",
          operator,
          "js-sdk/ObjSearch-and"
        );
      }
      const field = fieldOrSearchToExtendBy;
      const unwrappedValue = unwrapAppClassValue(value);
      this._scrivitoPrivateContent.and(field, operator, unwrappedValue, boost);
    }
    return this;
  }
  andFullTextOf(field, operator, value, boost) {
    checkFullTextSearchOperator(
      "objSearch.andFullTextOf",
      operator,
      "js-sdk/ObjSearch-andFullTextOf"
    );
    const unwrappedValue = unwrapAppClassValue(value);
    this._scrivitoPrivateContent.and(field, operator, unwrappedValue, boost);
    return this;
  }
  andNot(field, operator, value) {
    const unwrappedValue = unwrapAppClassValue(value);
    this._scrivitoPrivateContent.andNot(field, operator, unwrappedValue);
    return this;
  }
  boost(field, operator, value, factor) {
    this._scrivitoPrivateContent.boost(
      field,
      operator,
      unwrapAppClassValue(value),
      factor
    );
    return this;
  }
  facet(attribute, options) {
    const basicFacets = this._scrivitoPrivateContent.facet(attribute, options);
    return basicFacets.map((facetValue) => new ObjFacetValue(facetValue));
  }
  suggest(prefix, options) {
    return this._scrivitoPrivateContent.suggest(prefix, options);
  }
  first() {
    const basicObj = this._scrivitoPrivateContent.first();
    if (!basicObj)
      return null;
    return wrapInAppClass(basicObj);
  }
  take(count, ...excessArgs) {
    checkTakeArguments(count, ...excessArgs);
    const basicObjs = count === void 0 ? this._scrivitoPrivateContent.dangerouslyUnboundedTake() : this._scrivitoPrivateContent.take(count);
    return basicObjs.map((obj) => wrapInAppClass(obj));
  }
  toArray() {
    const basicObjs = this._scrivitoPrivateContent.dangerouslyUnboundedTake();
    return basicObjs.map((obj) => wrapInAppClass(obj));
  }
  offset(offset) {
    this._scrivitoPrivateContent.offset(offset);
    return this;
  }
  order(attributeOrAttributes, direction) {
    if (Array.isArray(attributeOrAttributes)) {
      if (direction !== void 0) {
        throw new common/* ArgumentError */.ir(
          "Direction can not be set independent of attributes."
        );
      }
      this._scrivitoPrivateContent.order(attributeOrAttributes);
      return this;
    }
    this._scrivitoPrivateContent.order(attributeOrAttributes, direction);
    return this;
  }
  count() {
    return this._scrivitoPrivateContent.count();
  }
}
if (typeof Symbol === "function") {
  const iteratorSymbol = Symbol.iterator;
  if (iteratorSymbol) {
    const proto = ObjSearch.prototype;
    proto[iteratorSymbol] = function iterator() {
      const basicObjsIterator = this._scrivitoPrivateContent.iterator();
      return {
        next() {
          const iteratorResult = basicObjsIterator.next();
          if (iteratorResult.done) {
            return { done: iteratorResult.done };
          }
          return {
            done: iteratorResult.done,
            value: wrapInAppClass(iteratorResult.value)
          };
        }
      };
    };
  }
}
function unwrapAppClassValue(value) {
  if (Array.isArray(value))
    return value.map((v) => unwrapAppClass(v));
  return unwrapAppClass(value);
}
const OperatorAllowedInNonFullTextSearch = common/* tcomb.refinement */.pC.refinement(
  common/* tcomb.String */.pC.String,
  (searchOperator) => models/* FULL_TEXT_OPERATORS.indexOf */.jS.indexOf(searchOperator) === -1,
  'Search operators except "contains" and "containsPrefix"'
);
function checkNonFullTextSearchOperator(functionName, operator, docPermalink) {
  return (0,common/* checkArgumentsFor */.PJ)(
    functionName,
    [["operator", common/* tcomb.maybe */.pC.maybe(OperatorAllowedInNonFullTextSearch)]],
    {
      docPermalink
    }
  )(operator);
}
function checkFullTextSearchOperator(functionName, operator, docPermalink) {
  return (0,common/* checkArgumentsFor */.PJ)(
    functionName,
    [["operator", common/* tcomb.maybe */.pC.maybe(common/* tcomb.enums.of */.pC.enums.of(models/* FULL_TEXT_OPERATORS */.jS))]],
    {
      docPermalink
    }
  )(operator);
}
const checkTakeArguments = (0,common/* checkArgumentsFor */.PJ)(
  "objSearch.take",
  [["count", common/* tcomb.maybe */.pC.maybe(common/* NonNegativeInteger */.tT)]],
  {
    docPermalink: "js-sdk/ObjSearch-take"
  }
);

;// CONCATENATED MODULE: ./scrivito_sdk/realm/basic_site_context.ts
var basic_site_context_defProp = Object.defineProperty;
var basic_site_context_getOwnPropSymbols = Object.getOwnPropertySymbols;
var basic_site_context_hasOwnProp = Object.prototype.hasOwnProperty;
var basic_site_context_propIsEnum = Object.prototype.propertyIsEnumerable;
var basic_site_context_defNormalProp = (obj, key, value) => key in obj ? basic_site_context_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var basic_site_context_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (basic_site_context_hasOwnProp.call(b, prop))
      basic_site_context_defNormalProp(a, prop, b[prop]);
  if (basic_site_context_getOwnPropSymbols)
    for (var prop of basic_site_context_getOwnPropSymbols(b)) {
      if (basic_site_context_propIsEnum.call(b, prop))
        basic_site_context_defNormalProp(a, prop, b[prop]);
    }
  return a;
};







class BasicSiteContext {
  constructor(objClass, scopeIncludingDeletedObjs) {
    this.objClass = objClass;
    this.scopeIncludingDeletedObjs = scopeIncludingDeletedObjs;
  }
  get(id) {
    return this.getObj(id, this.scope());
  }
  getIncludingDeleted(id) {
    return this.getObj(id, this.scopeIncludingDeletedObjs);
  }
  getByPath(path) {
    const obj = (0,models/* getObjBy */.HG)(this.scope().and(models/* excludeGlobal */.U2), "_path", path);
    return wrapInAppClass(obj);
  }
  getByPermalink(permalink) {
    const obj = (0,models/* getObjBy */.HG)(this.scope(), "_permalink", permalink);
    return wrapInAppClass(obj);
  }
  root() {
    return wrapInAppClass((0,models/* getRootObjFrom */.cS)(this.scope()));
  }
  all() {
    return this.getSearch(1e3);
  }
  where(attribute, operator, value, boost) {
    return this.getSearch().and(attribute, operator, value, boost);
  }
  whereFullTextOf(attribute, operator, value, boost) {
    return this.getSearch().andFullTextOf(attribute, operator, value, boost);
  }
  create(attributes = {}) {
    const objClassName = this.objClassNameForCreate();
    assertValidCreateAttributes(attributes);
    const attributesForCreate = prepareAttributesForCreate(
      attributes,
      objClassName,
      Schema.forClass(this.objClass)
    );
    const basicObj = (0,models/* createObjIn */.f_)(
      this.scope().and((0,models/* restrictToObjClass */.lD)(objClassName)),
      attributesForCreate
    );
    return wrapInAppClass(basicObj);
  }
  createFromFile(file, attributes = {}) {
    const objClassName = this.objClassNameForCreate();
    assertValidFile(file);
    assertValidCreateAttributes(attributes);
    if (Object.prototype.hasOwnProperty.call(attributes, "blob")) {
      throw new common/* ArgumentError */.ir(
        'Setting attribute "blob" is not allowed when creating CMS objects from file, because the file will be assigned to that attribute'
      );
    }
    const schema = Schema.forClass(this.objClass);
    if (!schema.isBinary()) {
      throw new common/* ArgumentError */.ir(
        'Creating CMS objects from file is only available for classes with a binary attribute "blob"'
      );
    }
    const attributesForCreate = prepareAttributesForCreate(
      attributes,
      objClassName,
      schema
    );
    return (0,models/* createObjFromFileIn */.Yz)(
      this.scope().and((0,models/* restrictToObjClass */.lD)(objClassName)),
      file,
      attributesForCreate
    ).then((basicObj) => wrapInAppClass(basicObj));
  }
  toSiteContext() {
    return {
      get: this.get.bind(this),
      getIncludingDeleted: this.getIncludingDeleted.bind(this),
      getByPath: this.getByPath.bind(this),
      getByPermalink: this.getByPermalink.bind(this),
      root: this.root.bind(this),
      all: this.all.bind(this),
      where: this.where.bind(this),
      whereFullTextOf: this.where.bind(this),
      create: this.create.bind(this),
      createFromFile: this.createFromFile.bind(this)
    };
  }
  getObj(id, scope) {
    return wrapInAppClass(
      (0,models/* getObjFrom */.R2)(this.getScopeRestrictedToSameClass(scope), id)
    );
  }
  getSearch(batchSize) {
    const search = this.getScopeRestrictedToSameClass(this.scope()).search();
    if (batchSize !== void 0)
      search.batchSize(batchSize);
    return new ObjSearch(search);
  }
  getScopeRestrictedToSameClass(scope) {
    const objClassName = this.objClassName();
    return objClassName ? scope.and((0,models/* restrictToObjClass */.lD)(objClassName)) : scope;
  }
  objClassName() {
    return objClassNameFor(this.objClass);
  }
  objClassNameForCreate() {
    const objClassName = this.objClassName();
    if (!objClassName) {
      throw new common/* ArgumentError */.ir(
        "Use a specific class (like Page or Image) in order to create an Obj."
      );
    }
    return objClassName;
  }
  scope() {
    return this.scopeIncludingDeletedObjs.and(models/* excludeDeletedObjs */.E2);
  }
}
function prepareAttributesForCreate(appAttributes, appClassName, schema) {
  const initialAttributes = initialAttributesFor(
    appAttributes,
    schema,
    appClassName
  );
  const createAttributes = basic_site_context_spreadValues(basic_site_context_spreadValues({}, appAttributes), initialAttributes);
  return unwrapAppAttributes(createAttributes, schema, appClassName);
}
function assertValidCreateAttributes(attributes) {
  if (attributes.constructor !== Object) {
    throw new common/* ArgumentError */.ir(
      "The provided attributes are invalid. They have to be an Object with valid Scrivito attribute values."
    );
  }
  if (attributes._objClass) {
    throw new common/* ArgumentError */.ir(
      `Invalid attribute "_objClass". "${attributes._objClass}.create" will automatically set the CMS object class correctly.`
    );
  }
}
function assertValidFile(file) {
  if (!common/* FileType.is */.Tv.is(file)) {
    if (common/* BlobType.is */.R0.is(file)) {
      throw new common/* ArgumentError */.ir(
        'Creating CMS objects from file is only available with instances of "File", but an instance of "Blob" is given'
      );
    }
    throw new common/* ArgumentError */.ir(
      'Creating CMS objects from file is only available with instances of "File"'
    );
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/current_site_id.ts
let siteIdHandler;
function currentSiteId() {
  return siteIdHandler();
}
function setCurrentSiteIdHandler(handler) {
  siteIdHandler = handler;
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/obj.ts











function currentSiteContext(objClass) {
  const siteId = currentSiteId();
  if (!siteId)
    return new BasicSiteContext(objClass, (0,models/* emptyScope */.Ti)());
  return getBasicSiteContext(objClass, (0,models/* restrictToSiteAndGlobal */.L8)(siteId));
}
function getSiteContext(objClass, transformation) {
  return getBasicSiteContext(objClass, transformation).toSiteContext();
}
function getBasicSiteContext(objClass, transformation) {
  const scope = (0,models/* objSpaceScope */.hA)((0,models/* currentObjSpaceId */.GD)()).and(transformation);
  return new BasicSiteContext(objClass, scope);
}
class Obj {
  static get(id) {
    return currentSiteContext(this).get(id);
  }
  static getIncludingDeleted(id) {
    return currentSiteContext(this).getIncludingDeleted(id);
  }
  static getByPath(path) {
    return currentSiteContext(this).getByPath(path);
  }
  static getByPermalink(permalink) {
    return currentSiteContext(this).getByPermalink(permalink);
  }
  static all() {
    return currentSiteContext(this).all();
  }
  static root() {
    return currentSiteContext(this).root();
  }
  static where(attribute, operator, value, boost) {
    if (areStrictSearchOperatorsEnabled()) {
      checkNonFullTextSearchOperator("Obj.where", operator, "js-sdk/Obj-where");
    }
    return currentSiteContext(this).where(attribute, operator, value, boost);
  }
  static whereFullTextOf(attribute, operator, value, boost) {
    checkFullTextSearchOperator(
      "Obj.whereFullTextOf",
      operator,
      "js-sdk/Obj-whereFullTextOf"
    );
    return currentSiteContext(this).whereFullTextOf(
      attribute,
      operator,
      value,
      boost
    );
  }
  static create(attributes) {
    return currentSiteContext(this).create(attributes);
  }
  static createFromFile(file, attributes) {
    return currentSiteContext(this).createFromFile(file, attributes);
  }
  static onAllSites() {
    return getSiteContext(this, models/* allSitesAndGlobal */.T8);
  }
  static onSite(siteId) {
    checkObjOnSite(siteId);
    return getSiteContext(this, (0,models/* restrictToSiteAndGlobal */.L8)(siteId));
  }
  id() {
    return this._scrivitoPrivateContent.id();
  }
  objClass() {
    return this._scrivitoPrivateContent.objClass();
  }
  get(attributeName) {
    assertValidAttributeName(attributeName);
    return readAppAttribute(this, attributeName);
  }
  update(attributes) {
    updateAppAttributes(this, attributes);
  }
  versionsOnAllSites() {
    return wrapInAppClass((0,models/* versionsOnAllSites */.s1)(this._scrivitoPrivateContent));
  }
  versionOnSite(siteId) {
    checkVersionOnSite(siteId);
    return wrapInAppClass((0,models/* versionOnSite */.OW)(this._scrivitoPrivateContent, siteId));
  }
  createdAt() {
    return this._scrivitoPrivateContent.createdAt();
  }
  firstPublishedAt() {
    return this._scrivitoPrivateContent.firstPublishedAt();
  }
  publishedAt() {
    return this._scrivitoPrivateContent.publishedAt();
  }
  lastChanged() {
    return this._scrivitoPrivateContent.lastChanged();
  }
  path() {
    return this._scrivitoPrivateContent.path();
  }
  parent() {
    return wrapInAppClass(this._scrivitoPrivateContent.parent());
  }
  ancestors() {
    return this._scrivitoPrivateContent.ancestors().map((maybeObj) => wrapInAppClass(maybeObj));
  }
  finishSaving() {
    return this._scrivitoPrivateContent.finishSaving();
  }
  modification() {
    return this._scrivitoPrivateContent.modification();
  }
  backlinks() {
    return wrapInAppClass(this._scrivitoPrivateContent.backlinks());
  }
  children() {
    return wrapInAppClass(this._scrivitoPrivateContent.children());
  }
  orderedChildren() {
    return wrapInAppClass(this._scrivitoPrivateContent.orderedChildren());
  }
  permalink() {
    return this._scrivitoPrivateContent.permalink();
  }
  siteId() {
    return this._scrivitoPrivateContent.siteId();
  }
  language() {
    return this._scrivitoPrivateContent.language();
  }
  slug() {
    return this._scrivitoPrivateContent.slug();
  }
  isBinary() {
    const schema = Schema.forInstance(this);
    if (!schema)
      return false;
    return schema.isBinary();
  }
  isRestricted() {
    return this._scrivitoPrivateContent.isRestricted();
  }
  contentLength() {
    if (this.isBinary())
      return this._scrivitoPrivateContent.contentLength();
    return 0;
  }
  contentType() {
    if (this.isBinary())
      return this._scrivitoPrivateContent.contentType();
    return "";
  }
  contentUrl() {
    if (this.isBinary())
      return this._scrivitoPrivateContent.contentUrl();
    return "";
  }
  contentId() {
    return this._scrivitoPrivateContent.contentId();
  }
  metadata() {
    if (this.isBinary())
      return this._scrivitoPrivateContent.metadata();
    return new models/* MetadataCollection */.LG();
  }
  restrict() {
    this._scrivitoPrivateContent.restrict();
  }
  unrestrict() {
    this._scrivitoPrivateContent.unrestrict();
  }
  updateReferences(mapping, ...excessArgs) {
    checkUpdateReferences(mapping, ...excessArgs);
    return (0,models/* updateReferences */.Nv)(this._scrivitoPrivateContent, mapping);
  }
  widget(id) {
    const maybeWidget = this._scrivitoPrivateContent.widget(id);
    return maybeWidget && wrapInAppClass(maybeWidget);
  }
  widgets() {
    return wrapInAppClass(subWidgets(this._scrivitoPrivateContent));
  }
  copy() {
    return (0,models/* copyObjViaHandler */.e3)(this._scrivitoPrivateContent).then(
      (newObj) => wrapInAppClass(newObj)
    );
  }
  destroy() {
    this._scrivitoPrivateContent.destroy();
  }
  attributeDefinitions() {
    const schema = Schema.forInstance(this);
    if (!schema)
      return {};
    return schema.normalizedAttributes();
  }
}
const checkObjOnSite = (0,common/* checkArgumentsFor */.PJ)("Obj.onSite", [["siteId", common/* tcomb.String */.pC.String]], {
  docPermalink: "js-sdk/Obj-static-onSite"
});
const checkUpdateReferences = (0,common/* checkArgumentsFor */.PJ)(
  "obj.updateReferences",
  [["mapping", common/* tcomb.Function */.pC.Function]],
  {
    docPermalink: "js-sdk/Obj-updateReferences"
  }
);
const checkVersionOnSite = (0,common/* checkArgumentsFor */.PJ)(
  "obj.versionOnSite",
  [["siteId", common/* tcomb.String */.pC.String]],
  {
    docPermalink: "js-sdk/Obj-versionOnSite"
  }
);

;// CONCATENATED MODULE: ./scrivito_sdk/realm/link.ts
var link_defProp = Object.defineProperty;
var link_defProps = Object.defineProperties;
var link_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var link_getOwnPropSymbols = Object.getOwnPropertySymbols;
var link_hasOwnProp = Object.prototype.hasOwnProperty;
var link_propIsEnum = Object.prototype.propertyIsEnumerable;
var link_defNormalProp = (obj, key, value) => key in obj ? link_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var link_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (link_hasOwnProp.call(b, prop))
      link_defNormalProp(a, prop, b[prop]);
  if (link_getOwnPropSymbols)
    for (var prop of link_getOwnPropSymbols(b)) {
      if (link_propIsEnum.call(b, prop))
        link_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var link_spreadProps = (a, b) => link_defProps(a, link_getOwnPropDescs(b));




class Link {
  constructor(attributes) {
    const basicAttributes = toBasicAttributes(attributes);
    this._scrivitoPrivateContent = new models/* BasicLink */.AM(basicAttributes);
  }
  title() {
    return this._scrivitoPrivateContent.title();
  }
  query() {
    return this._scrivitoPrivateContent.query();
  }
  hash() {
    return this._scrivitoPrivateContent.hash();
  }
  rel() {
    return this._scrivitoPrivateContent.rel();
  }
  target() {
    return this._scrivitoPrivateContent.target();
  }
  url() {
    return this._scrivitoPrivateContent.url();
  }
  obj() {
    const obj = this._scrivitoPrivateContent.obj();
    return obj instanceof models/* BasicObj */.Jj ? wrapInAppClass(obj) : null;
  }
  queryParameters() {
    return this._scrivitoPrivateContent.queryParameters();
  }
  copy(attributes) {
    const basicLink = this._scrivitoPrivateContent.copy(
      toBasicAttributes(attributes)
    );
    const link = Object.create(Link.prototype);
    link._scrivitoPrivateContent = basicLink;
    return link;
  }
  isExternal() {
    return this._scrivitoPrivateContent.isExternal();
  }
  isInternal() {
    return this._scrivitoPrivateContent.isInternal();
  }
}
const ALLOWED_ATTRIBUTES = [
  "hash",
  "obj",
  "query",
  "rel",
  "target",
  "title",
  "url"
];
function assertValidPublicAttributes(attributes) {
  const unknownAttrs = (0,external_underscore_.without)(Object.keys(attributes), ...ALLOWED_ATTRIBUTES);
  if (!(0,external_underscore_.isEmpty)(unknownAttrs)) {
    throw new common/* ArgumentError */.ir(
      `Unexpected attributes ${(0,common/* prettyPrint */.xr)(unknownAttrs)}. Available attributes: ${(0,common/* prettyPrint */.xr)(ALLOWED_ATTRIBUTES)}`
    );
  }
}
function toBasicAttributes(attributes) {
  assertValidPublicAttributes(attributes);
  if ((0,external_underscore_.has)(attributes, "obj")) {
    return link_spreadProps(link_spreadValues({}, attributes), {
      objId: objIdFromObjValue(attributes.obj)
    });
  }
  return attributes;
}
function objIdFromObjValue(obj) {
  if (!obj)
    return null;
  return unwrapAppClass(obj).id();
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/tcomb_api_types.ts


const ObjClassType = common/* tcomb.refinement */.pC.refinement(
  common/* tcomb.Function */.pC.Function,
  isAppClass,
  "ObjClass"
);
const WidgetClassType = common/* tcomb.refinement */.pC.refinement(
  common/* tcomb.Function */.pC.Function,
  isAppClass,
  "WidgetClass"
);

;// CONCATENATED MODULE: ./scrivito_sdk/realm/app_class_api_check.ts




const noop = () => {
};
const {
  checkCreateWidgetClass,
  checkCreateObjClass,
  checkProvideComponent,
  checkProvideLayoutComponent,
  checkProvideDataErrorComponent,
  checkProvideObjClass,
  checkProvideWidgetClass,
  checkProvideDataClass,
  checkProvideDataItem
} = (() => {
  if (process.env.NODE_ENV !== "development") {
    return {
      checkCreateWidgetClass: noop,
      checkCreateObjClass: noop,
      checkProvideComponent: noop,
      checkProvideLayoutComponent: noop,
      checkProvideDataErrorComponent: noop,
      checkProvideObjClass: noop,
      checkProvideWidgetClass: noop,
      checkProvideDataClass: noop,
      checkProvideDataItem: noop
    };
  }
  const ObjClassDefinitionType = common/* tcomb.interface */.pC["interface"]({
    attributes: common/* tcomb.maybe */.pC.maybe(
      common/* tcomb.dict */.pC.dict(
        common/* tcomb.refinement */.pC.refinement(
          common/* tcomb.String */.pC.String,
          isCustomAttributeName,
          "String (alphanumeric, starting with a lower-case character)"
        ),
        common/* tcomb.union */.pC.union([
          common/* tcomb.enums.of */.pC.enums.of([
            "binary",
            "boolean",
            "datalocator",
            "date",
            "datetime",
            "float",
            "html",
            "integer",
            "link",
            "linklist",
            "reference",
            "referencelist",
            "string",
            "stringlist",
            "widget",
            "widgetlist"
          ]),
          common/* tcomb.tuple */.pC.tuple([
            common/* tcomb.enums.of */.pC.enums.of(["enum", "multienum"]),
            common/* tcomb.interface */.pC["interface"]({
              values: common/* tcomb.list */.pC.list(common/* tcomb.String */.pC.String)
            })
          ]),
          common/* tcomb.tuple */.pC.tuple([
            common/* tcomb.enums.of */.pC.enums.of(["reference", "referencelist"]),
            common/* tcomb.interface */.pC["interface"]({
              only: common/* tcomb.union */.pC.union([common/* tcomb.String */.pC.String, common/* tcomb.list */.pC.list(common/* tcomb.String */.pC.String)])
            })
          ]),
          common/* tcomb.tuple */.pC.tuple([
            common/* tcomb.enums.of */.pC.enums.of(["widget"]),
            common/* tcomb.interface */.pC["interface"]({
              only: common/* tcomb.union */.pC.union([common/* tcomb.String */.pC.String, common/* tcomb.list */.pC.list(common/* tcomb.String */.pC.String)])
            })
          ]),
          common/* tcomb.tuple */.pC.tuple([
            common/* tcomb.enums.of */.pC.enums.of(["widgetlist"]),
            common/* tcomb.union */.pC.union([
              common/* tcomb.interface */.pC["interface"]({
                only: common/* tcomb.union */.pC.union([common/* tcomb.String */.pC.String, common/* tcomb.list */.pC.list(common/* tcomb.String */.pC.String)]),
                maximum: common/* tcomb.maybe */.pC.maybe(common/* PositiveInteger */.nH)
              }),
              common/* tcomb.interface */.pC["interface"]({
                maximum: common/* PositiveInteger */.nH
              })
            ])
          ])
        ]),
        "Attributes Specification"
      )
    ),
    extractTextAttributes: common/* tcomb.maybe */.pC.maybe(common/* tcomb.list */.pC.list(common/* tcomb.String */.pC.String)),
    extend: common/* tcomb.maybe */.pC.maybe(ObjClassType),
    onlyAsRoot: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Boolean */.pC.Boolean),
    onlyChildren: common/* tcomb.maybe */.pC.maybe(common/* tcomb.union */.pC.union([common/* tcomb.String */.pC.String, common/* tcomb.list */.pC.list(common/* tcomb.String */.pC.String)])),
    onlyInside: common/* tcomb.maybe */.pC.maybe(common/* tcomb.union */.pC.union([common/* tcomb.String */.pC.String, common/* tcomb.list */.pC.list(common/* tcomb.String */.pC.String)])),
    validAsRoot: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Boolean */.pC.Boolean)
  });
  const WidgetClassDefinitionType = common/* tcomb.interface */.pC["interface"]({
    attributes: ObjClassDefinitionType.meta.props.attributes,
    extractTextAttributes: common/* tcomb.maybe */.pC.maybe(common/* tcomb.list */.pC.list(common/* tcomb.String */.pC.String)),
    extend: common/* tcomb.maybe */.pC.maybe(WidgetClassType),
    onlyInside: common/* tcomb.maybe */.pC.maybe(common/* tcomb.union */.pC.union([common/* tcomb.String */.pC.String, common/* tcomb.Array */.pC.Array]))
  });
  return {
    checkCreateObjClass: (0,common/* checkArgumentsFor */.PJ)(
      "createObjClass",
      [["definition", ObjClassDefinitionType]],
      {
        docPermalink: "js-sdk/createObjClass"
      }
    ),
    checkCreateWidgetClass: (0,common/* checkArgumentsFor */.PJ)(
      "createWidgetClass",
      [["definition", WidgetClassDefinitionType]],
      {
        docPermalink: "js-sdk/createWidgetClass"
      }
    ),
    checkProvideComponent: (0,common/* checkArgumentsFor */.PJ)(
      "provideComponent",
      [
        [
          "classNameOrClass",
          common/* tcomb.union */.pC.union([common/* tcomb.String */.pC.String, ObjClassType, WidgetClassType])
        ],
        ["component", common/* tcomb.irreducible */.pC.irreducible("React component", external_underscore_.isFunction)]
      ],
      {
        docPermalink: "js-sdk/provideComponent"
      }
    ),
    checkProvideLayoutComponent: (0,common/* checkArgumentsFor */.PJ)(
      "provideLayoutComponent",
      [
        ["objClass", ObjClassType],
        ["component", common/* tcomb.irreducible */.pC.irreducible("React component", external_underscore_.isFunction)]
      ],
      {
        docPermalink: "js-sdk/provideLayoutComponent"
      }
    ),
    checkProvideDataErrorComponent: (0,common/* checkArgumentsFor */.PJ)(
      "provideDataErrorComponent",
      [["component", common/* tcomb.irreducible */.pC.irreducible("React component", external_underscore_.isFunction)]],
      {
        docPermalink: "js-sdk/provideDataErrorComponent"
      }
    ),
    checkProvideObjClass: (...args) => {
      checkProvideClass("objClass", ObjClassType, ObjClassDefinitionType, args);
    },
    checkProvideWidgetClass: (...args) => {
      checkProvideClass(
        "widgetClass",
        WidgetClassType,
        WidgetClassDefinitionType,
        args
      );
    },
    checkProvideDataClass: (0,common/* checkArgumentsFor */.PJ)(
      "provideDataClass",
      [
        ["name", common/* tcomb.String */.pC.String],
        [
          "dataClass",
          common/* tcomb.interface */.pC["interface"]({
            connection: common/* tcomb.interface */.pC["interface"]({
              get: common/* tcomb.Function */.pC.Function,
              create: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Function */.pC.Function),
              index: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Function */.pC.Function),
              update: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Function */.pC.Function),
              delete: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Function */.pC.Function)
            })
          })
        ]
      ],
      {
        docPermalink: "js-sdk/provideDataClass"
      }
    ),
    checkProvideDataItem: (0,common/* checkArgumentsFor */.PJ)(
      "provideDataItem",
      [
        ["name", common/* tcomb.String */.pC.String],
        ["read", common/* tcomb.Function */.pC.Function]
      ],
      {
        docPermalink: "js-sdk/provideDataItem"
      }
    )
  };
})();
function checkProvideClass(name, classType, definitionType, args) {
  const className = (0,common/* classify */.xk)(name);
  const classOrDefinition = args[1];
  const check = (0,common/* checkArgumentsFor */.PJ)(
    `provide${className}`,
    [
      ["name", common/* tcomb.String */.pC.String],
      typeof classOrDefinition === "function" && isAppClass(classOrDefinition) ? ["class", classType] : typeof classOrDefinition === "object" && classOrDefinition !== null ? ["definition", definitionType] : [
        `${name}OrDefinition`,
        common/* tcomb.union */.pC.union([classType, definitionType], className)
      ]
    ],
    {
      docPermalink: `js-sdk/provide${className}`
    }
  );
  check(...args);
}
function isCustomAttributeName(name) {
  return /^[a-z](_+[A-Z0-9]|[A-Za-z0-9])*$/.test(name) && (0,common/* underscore */.It)(name).length <= 50;
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/assert_valid_extract_text_attributes.ts


const ATTRIBUTE_TYPES_WHITELIST = ["string", "html", "widget", "widgetlist"];
function assertValidObjExtractTextAttributes(schema) {
  schema.extractTextAttributes().forEach((attribute) => {
    if (attribute.substring(0, 5) === "blob:") {
      return assertValidBinaryAttribute(schema, attribute);
    }
    assertValidExtractTextAttribute(attribute, schema.attribute(attribute));
  });
}
function assertValidWidgetExtractTextAttributes(schema) {
  schema.extractTextAttributes().forEach((attribute) => {
    if (attribute.substring(0, 5) === "blob:") {
      throw new common/* ArgumentError */.ir(
        `Invalid value for "extractTextAttributes": ${attribute} is not supported.`
      );
    }
    assertValidExtractTextAttribute(attribute, schema.attribute(attribute));
  });
}
function assertValidBinaryAttribute(schema, extractTextAttribute) {
  if (extractTextAttribute === "blob:text") {
    if (schema.isBinary())
      return;
    throw new common/* ArgumentError */.ir(
      'Invalid value for "extractTextAttributes": blob:text is only supported for binary objs.'
    );
  }
  throw new common/* ArgumentError */.ir(
    `Invalid value for "extractTextAttributes": ${extractTextAttribute} is not supported.`
  );
}
function assertValidExtractTextAttribute(attribute, definition) {
  if (!definition) {
    throw new common/* ArgumentError */.ir(
      `Invalid value for "extractTextAttributes": Attribute ${attribute} is not defined.`
    );
  }
  const [attributeType] = definition;
  if ((0,external_underscore_.contains)(ATTRIBUTE_TYPES_WHITELIST, attributeType))
    return;
  throw new common/* ArgumentError */.ir(
    `Invalid value for "extractTextAttributes": Attribute ${attribute} of type ${attributeType} is not supported.`
  );
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/realm.ts
var realm_defProp = Object.defineProperty;
var realm_defProps = Object.defineProperties;
var realm_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var realm_getOwnPropSymbols = Object.getOwnPropertySymbols;
var realm_hasOwnProp = Object.prototype.hasOwnProperty;
var realm_propIsEnum = Object.prototype.propertyIsEnumerable;
var realm_defNormalProp = (obj, key, value) => key in obj ? realm_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var realm_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (realm_hasOwnProp.call(b, prop))
      realm_defNormalProp(a, prop, b[prop]);
  if (realm_getOwnPropSymbols)
    for (var prop of realm_getOwnPropSymbols(b)) {
      if (realm_propIsEnum.call(b, prop))
        realm_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var realm_spreadProps = (a, b) => realm_defProps(a, realm_getOwnPropDescs(b));







function provideObjClass(name, definition, ...excessArgs) {
  checkProvideObjClass(name, definition, ...excessArgs);
  const appClass = isAppClass(definition) ? definition : createAppObjClass(realm_spreadProps(realm_spreadValues({}, definition), { name }));
  registerClass(name, appClass);
  return appClass;
}
function provideWidgetClass(name, definition, ...excessArgs) {
  checkProvideWidgetClass(name, definition, ...excessArgs);
  const appClass = isAppClass(definition) ? definition : createAppWidgetClass(realm_spreadProps(realm_spreadValues({}, definition), { name }));
  registerClass(name, appClass);
  return appClass;
}
function createObjClass(definition, ...excessArgs) {
  checkCreateObjClass(definition, ...excessArgs);
  return createAppObjClass(definition);
}
function createWidgetClass(definition, ...excessArgs) {
  checkCreateWidgetClass(definition, ...excessArgs);
  return createAppWidgetClass(definition);
}
function createAppObjClass(definition) {
  if (definition.extend && !isOrExtends(definition.extend, Obj)) {
    throw new common/* ArgumentError */.ir(
      'Invalid value for "extend": not a Scrivito Obj class'
    );
  }
  if (definition.onlyInside && isBinary(definition)) {
    throw new common/* ArgumentError */.ir(
      "onlyInside must not be specified for binary object classes."
    );
  }
  if (definition.onlyChildren && isBinary(definition)) {
    throw new common/* ArgumentError */.ir(
      "onlyChildren must not be specified for binary object classes."
    );
  }
  if (definition.onlyAsRoot === true && definition.validAsRoot === false) {
    throw new common/* ArgumentError */.ir(
      "validAsRoot must not be set to false for an object class permitted onlyAsRoot."
    );
  }
  if (definition.onlyAsRoot && isBinary(definition)) {
    throw new common/* ArgumentError */.ir(
      "onlyAsRoot must not be specified for binary object classes."
    );
  }
  if (definition.validAsRoot && isBinary(definition)) {
    throw new common/* ArgumentError */.ir(
      "validAsRoot must not be specified for binary object classes."
    );
  }
  const baseClass = definition.extend || Obj;
  const schema = new Schema(definition, baseClass);
  assertValidObjExtractTextAttributes(schema);
  return class Obj extends baseClass {
    static get _scrivitoPrivateSchema() {
      return schema;
    }
  };
}
function createAppWidgetClass(definition) {
  if (definition.extend && !isOrExtends(definition.extend, Widget)) {
    throw new common/* ArgumentError */.ir(
      'Invalid value for "extend": not a Scrivito Widget class'
    );
  }
  const baseClass = definition.extend || Widget;
  const schema = new Schema(definition, baseClass);
  assertValidWidgetExtractTextAttributes(schema);
  return class Widget extends baseClass {
    static get _scrivitoPrivateSchema() {
      return schema;
    }
  };
}
function isOrExtends(maybeClass, klass) {
  if (!maybeClass)
    return false;
  if (maybeClass === klass)
    return true;
  return maybeClass.prototype instanceof klass;
}
function isBinary(definition) {
  var _a;
  return ((_a = definition.attributes) == null ? void 0 : _a.blob) === "binary";
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/schema_from_basic_obj_or_widget.ts

function schemaFromBasicObjOrWidget(objOrWidget) {
  const className = objOrWidget.objClass();
  if (!className)
    return;
  const objClass = getClass(className);
  if (!objClass)
    return;
  return Schema.forClass(objClass);
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/is_binary_basic_obj.ts

function isBinaryBasicObj(basicObj) {
  const schema = schemaFromBasicObjOrWidget(basicObj);
  return !!schema && schema.isBinary();
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/is_obj_class.ts


function isObjClass(klass) {
  if (klass === Obj)
    return true;
  if (klass === Widget)
    return false;
  const schema = Schema.forClass(klass);
  if (!schema)
    throw new common/* InternalError */.AQ();
  return isObjClass(schema.parent());
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/index.ts


















/***/ }),

/***/ 5656:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "T": () => (/* binding */ setInitialContentFor),
/* harmony export */   "W": () => (/* binding */ initialContentFor)
/* harmony export */ });
let initialContentForFn = () => void 0;
function setInitialContentFor(value) {
  initialContentForFn = value;
}
function initialContentFor(className, attributeName) {
  return initialContentForFn(className, attributeName);
}


/***/ }),

/***/ 9541:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "NB": () => (/* reexport */ addBatchUpdate),
  "dF": () => (/* reexport */ createAsyncSubscriber),
  "JH": () => (/* reexport */ createStateContainer),
  "GS": () => (/* reexport */ createSyncSubscriber),
  "un": () => (/* reexport */ failIfFrozen),
  "N7": () => (/* reexport */ observe),
  "M5": () => (/* reexport */ observeSync),
  "cC": () => (/* reexport */ trackStateAccess),
  "tH": () => (/* reexport */ withBatchedUpdates),
  "sc": () => (/* reexport */ withFrozenState),
  "dY": () => (/* reexport */ withUnfrozenState)
});

// UNUSED EXPORTS: StateChangePreventedError, StateReference, createNotificationCounter, listenerCount, resetGlobalState

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 45 modules
var common = __webpack_require__(3711);
;// CONCATENATED MODULE: ./scrivito_sdk/state/primitive_value.ts
function isPrimitiveObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value) && !instanceOfClass(value);
}
function instanceOfClass(object) {
  const proto = Object.getPrototypeOf(object);
  if (proto === null) {
    return false;
  }
  return Object.getPrototypeOf(proto) !== null;
}

;// CONCATENATED MODULE: ./scrivito_sdk/state/conservative_update.ts

function conservativeUpdate(current, next) {
  return updateValue(current, next);
}
function updateValue(current, next) {
  if (current === next) {
    return next;
  }
  if (isPrimitiveObject(next)) {
    return updateObject(isPrimitiveObject(current) ? current : void 0, next);
  }
  if (isPrimitiveValueArray(next)) {
    return updateArray(
      isPrimitiveValueArray(current) ? current : void 0,
      next
    );
  }
  return next;
}
function isPrimitiveValueArray(value) {
  return Array.isArray(value);
}
function updateObject(current, next) {
  const updated = {};
  let foundDiff = false;
  if (current === void 0) {
    foundDiff = true;
  }
  const nextKeys = Object.keys(next);
  const currentKeys = /* @__PURE__ */ new Set();
  if (current) {
    Object.keys(current).forEach((key) => currentKeys.add(key));
  }
  if (currentKeys.size !== nextKeys.length) {
    foundDiff = true;
  }
  nextKeys.forEach((key) => {
    if (!currentKeys.has(key)) {
      foundDiff = true;
    }
    const currentValue = current ? current[key] : void 0;
    const updatedValue = updateValue(currentValue, next[key]);
    if (updatedValue !== currentValue) {
      foundDiff = true;
    }
    updated[key] = updatedValue;
  });
  const result = foundDiff ? Object.freeze(updated) : current;
  return result;
}
function updateArray(current, next) {
  let foundDiff = false;
  if (current === void 0 || current.length !== next.length) {
    foundDiff = true;
  }
  const updated = next.map((nextValue, index) => {
    const currentValue = current ? current[index] : void 0;
    const updatedValue = updateValue(currentValue, nextValue);
    if (updatedValue !== currentValue) {
      foundDiff = true;
    }
    return updatedValue;
  });
  const result = foundDiff ? Object.freeze(updated) : current;
  return result;
}

;// CONCATENATED MODULE: ./scrivito_sdk/state/frozen.ts

const frozenContextContainer = new common/* ContextContainer */.AY();
function withFrozenState(frozenContext, fn) {
  return frozenContextContainer.runWith(frozenContext, fn);
}
function withUnfrozenState(fn) {
  return frozenContextContainer.runWith(void 0, fn);
}
function failIfFrozen(operationName) {
  const frozenContext = frozenContextContainer.current();
  if (frozenContext) {
    throw new StateChangePreventedError(frozenContext, operationName);
  }
}
class StateChangePreventedError extends common/* ScrivitoError */.Ix {
  constructor(frozenContext, operationName) {
    super(
      `${operationName} is not permitted inside '${frozenContext.contextName}'. ` + (frozenContext.message || "")
    );
    this.frozenContext = frozenContext;
    this.operationName = operationName;
  }
}

// EXTERNAL MODULE: external "underscore"
var external_underscore_ = __webpack_require__(4952);
;// CONCATENATED MODULE: ./scrivito_sdk/state/copy_on_write_store.ts

class CopyOnWriteStore {
  constructor(value, copy) {
    this.value = value;
    this.copy = copy;
    this.valueForReading = new common/* ContextContainer */.AY();
  }
  read(fn) {
    const currentValue = this.value;
    return this.valueForReading.runWith(currentValue, () => fn(currentValue));
  }
  write(fn) {
    if (this.valueForReading.current() === this.value) {
      this.value = this.copy(this.value);
    }
    fn(this.value);
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/state/subscriber_set.ts



class SubscriberSet {
  constructor() {
    this.subscribersStore = new CopyOnWriteStore(
      [],
      (subscribers) => subscribers.slice()
    );
  }
  create(listener, rank = 0) {
    return new Subscriber(this, listener, rank);
  }
  count() {
    return this.subscribersStore.read((subscribers) => subscribers.length);
  }
  reset() {
    this.subscribersStore.write((subscribers) => {
      subscribers.length = 0;
    });
  }
  forEach(fn) {
    this.subscribersStore.read((subscribers) => subscribers.forEach(fn));
  }
  add(subscriber) {
    this.subscribersStore.write((subscribers) => {
      const index = (0,external_underscore_.sortedIndex)(subscribers, subscriber, "rank");
      subscribers.splice(index, 0, subscriber);
    });
  }
  remove(subscriber) {
    this.subscribersStore.write((subscribers) => {
      const index = subscribers.indexOf(subscriber);
      if (index >= 0) {
        subscribers.splice(index, 1);
      }
    });
  }
}
class Subscriber {
  constructor(subscriberSet, listener, rank = 0) {
    this.subscriberSet = subscriberSet;
    this.listener = listener;
    this.rank = rank;
    this.awake = true;
    this.notificationDuringSleep = false;
    this.scheduleNotify = (0,common/* collectAndSchedule */.Xq)(common/* nextTick */.Y3, () => this.notify());
  }
  subscribeChanges(stateReference) {
    if (!this.activeReference)
      this.subscriberSet.add(this);
    this.activeReference = stateReference;
    if (this.hasChanges())
      this.listener();
  }
  unsubscribe() {
    if (!this.activeReference)
      return;
    this.subscriberSet.remove(this);
    this.activeReference = void 0;
  }
  setAwake(awake) {
    this.awake = awake;
    if (awake && this.notificationDuringSleep) {
      this.notify();
      this.notificationDuringSleep = false;
    }
  }
  notify() {
    if (!this.activeReference)
      return;
    if (!this.awake) {
      this.notificationDuringSleep = true;
      return;
    }
    this.listener();
  }
  hasChanges() {
    var _a;
    return !!((_a = this.activeReference) == null ? void 0 : _a.hasChanges());
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/state/subscribers.ts



const syncSubscribers = new SubscriberSet();
const asyncSubscribers = new SubscriberSet();
function createAsyncSubscriber(listener) {
  return asyncSubscribers.create(listener);
}
function createSyncSubscriber(listener, rank = 0) {
  return syncSubscribers.create(listener, rank);
}
const batchUpdates = new common/* ContextContainer */.AY();
let notifiedDuringBatchUpdates = false;
function withBatchedUpdates(fn) {
  try {
    batchUpdates.runWith(true, fn);
  } finally {
    if (!batchUpdates.current() && notifiedDuringBatchUpdates) {
      notifiedDuringBatchUpdates = false;
      notifySubscribers();
    }
  }
}
let notificationCounter = 0;
function createNotificationCounter() {
  const startedAt = notificationCounter;
  return () => notificationCounter - startedAt;
}
function listenerCount() {
  return syncSubscribers.count() + asyncSubscribers.count();
}
function notifySubscribers() {
  if (batchUpdates.current()) {
    notifiedDuringBatchUpdates = true;
    return;
  }
  notificationCounter++;
  withFrozenState({ contextName: "state listeners" }, () => {
    notifySyncSubscribers();
    notifyAsyncSubscribers();
  });
}
function subscribers_resetSubscribers() {
  syncSubscribers.reset();
  asyncSubscribers.reset();
}
function notifySyncSubscribers() {
  syncSubscribers.forEach((subscriber) => {
    if (subscriber.hasChanges())
      subscriber.notify();
  });
}
const notifyAsyncSubscribers = (0,common/* collectAndSchedule */.Xq)(
  common/* nextTick */.Y3,
  () => asyncSubscribers.forEach((subscriber) => {
    if (subscriber.hasChanges())
      subscriber.scheduleNotify();
  })
);

;// CONCATENATED MODULE: ./scrivito_sdk/state/track_state_access.ts

class StateReference {
  constructor(detector) {
    this.detector = detector;
  }
  hasChanges() {
    return this.detector();
  }
}
function trackStateAccess(fn) {
  const { detector, result, accessCount } = trackChanges(fn);
  return {
    result,
    accessedState: new StateReference(detector),
    accessCount
  };
}
const detectorRecording = new common/* ContextContainer */.AY();
function recordDetector(detector) {
  const recording = detectorRecording.current();
  if (recording !== void 0) {
    recording.push(detector);
  }
}
function trackChanges(fn) {
  const { result, detectors } = recordDetectors(fn);
  return {
    result,
    detector: () => detectors.some((detector) => detector()),
    accessCount: detectors.length
  };
}
function recordDetectors(fn) {
  const detectors = [];
  const result = detectorRecording.runWith(detectors, fn);
  const outerRecording = detectorRecording.current();
  if (outerRecording !== void 0) {
    detectors.forEach((detector) => outerRecording.push(detector));
  }
  return { result, detectors };
}

;// CONCATENATED MODULE: ./scrivito_sdk/state/state_tree.ts





class AbstractStateStore {
  get() {
    const valueWhenAccessed = this.untrackedGet();
    recordDetector(() => valueWhenAccessed !== this.untrackedGet());
    return valueWhenAccessed;
  }
  set(newState) {
    const currentState = this.untrackedGet();
    const updatedState = conservativeUpdate(currentState, newState);
    if (updatedState === currentState) {
      return;
    }
    this.uncheckedSet(updatedState);
  }
  clear() {
    this.set(void 0);
  }
  subState(key) {
    return new StateTreeNode(this, key);
  }
  reader() {
    return this;
  }
  setSubState(key, newSubState) {
    const priorState = this.untrackedGet();
    if (priorState === void 0) {
      const newState = { [key]: newSubState };
      this.uncheckedSet(newState);
      return;
    }
    if (newSubState === void 0) {
      const priorKeys = Object.keys(priorState);
      if (priorKeys.length === 1 && priorKeys[0] === key) {
        this.uncheckedSet(void 0);
        return;
      }
    }
    if (priorState === null) {
      throw new common/* InternalError */.AQ();
    }
    const priorStateAsNonNull = priorState;
    performAsStateChange(() => {
      if (newSubState === void 0) {
        delete priorStateAsNonNull[key];
      } else {
        priorStateAsNonNull[key] = newSubState;
      }
    });
  }
  getSubState(key) {
    const state = this.untrackedGet();
    if (state !== void 0 && state !== null) {
      const nonNullState = state;
      const subState = nonNullState[key];
      return subState;
    }
  }
}
class StateTree extends AbstractStateStore {
  constructor() {
    super();
  }
  untrackedGet() {
    return this.state;
  }
  uncheckedSet(newState) {
    performAsStateChange(() => {
      this.state = newState;
    });
  }
  id() {
    return "";
  }
}
function performAsStateChange(actualChange) {
  failIfFrozen("Changing state");
  actualChange();
  notifySubscribers();
}
class StateTreeNode extends AbstractStateStore {
  constructor(parentState, key) {
    super();
    this.parentState = parentState;
    this.key = key;
  }
  untrackedGet() {
    return this.parentState.getSubState(this.key);
  }
  uncheckedSet(newState) {
    this.parentState.setSubState(this.key, newState);
  }
  id() {
    if (this.cachedId === void 0) {
      const escapedKey = this.key.replace(/\\/g, "\\\\").replace(/\//g, "\\/");
      this.cachedId = `${this.parentState.id()}/${escapedKey}`;
    }
    return this.cachedId;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/state/global_state.ts


const stateTree = new StateTree();
const globalState = stateTree;
function resetGlobalState() {
  resetSubscribers();
  stateTree.clear();
}

;// CONCATENATED MODULE: ./scrivito_sdk/state/batched_state_updater.ts


const addBatchUpdate = (0,common/* collectInListAndSchedule */.W0)(
  common/* nextTick */.Y3,
  (callbacks) => {
    withBatchedUpdates(() => callbacks.forEach((callback) => callback()));
    return [];
  }
);

;// CONCATENATED MODULE: ./scrivito_sdk/state/observe.ts


function observe(observedExpression) {
  return new common/* Streamable */.fU((observer) => {
    let active = true;
    let lastResult;
    let lastResultInitialized = false;
    const stateSubscriber = createAsyncSubscriber(run);
    function run() {
      if (!active) {
        return;
      }
      const report = trackStateAccess(
        () => withFrozenState(
          {
            contextName: "observe",
            message: "Extract all side-effects into the listener function"
          },
          observedExpression
        )
      );
      stateSubscriber.subscribeChanges(report.accessedState);
      const nextResult = report.result;
      if (lastResultInitialized && (0,common/* equalsBestEffort */.Fe)(nextResult, lastResult)) {
        return;
      }
      observer.next(nextResult);
      lastResult = nextResult;
      lastResultInitialized = true;
    }
    (0,common/* nextTick */.Y3)(run);
    return () => {
      active = false;
      stateSubscriber.unsubscribe();
    };
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/state/observe_sync.ts


function observeSync(observedExpression, listener) {
  const firstReport = trackStateAccess(
    () => withFrozenState(
      {
        contextName: "observeSync",
        message: "Use non-sync observe or nextTick"
      },
      observedExpression
    )
  );
  let lastResult = firstReport.result;
  const stateSubscriber = createSyncSubscriber(() => {
    const report = trackStateAccess(observedExpression);
    stateSubscriber.subscribeChanges(report.accessedState);
    const nextResult = report.result;
    if (!(0,common/* equalsBestEffort */.Fe)(nextResult, lastResult)) {
      listener(nextResult);
      lastResult = nextResult;
    }
  });
  stateSubscriber.subscribeChanges(firstReport.accessedState);
  return {
    initialValue: lastResult,
    unsubscribe: () => {
      stateSubscriber.unsubscribe();
    }
  };
}

;// CONCATENATED MODULE: ./scrivito_sdk/state/create_state_container.ts

let counter = 0;
function createStateContainer() {
  counter++;
  const newState = globalState.subState("dynamic").subState(counter.toString());
  return newState;
}

;// CONCATENATED MODULE: ./scrivito_sdk/state/index.ts










/***/ }),

/***/ 7428:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__7428__;

/***/ }),

/***/ 1932:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__1932__;

/***/ }),

/***/ 8156:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__8156__;

/***/ }),

/***/ 7111:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__7111__;

/***/ }),

/***/ 2018:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__2018__;

/***/ }),

/***/ 7726:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__7726__;

/***/ }),

/***/ 5807:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__5807__;

/***/ }),

/***/ 4952:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__4952__;

/***/ }),

/***/ 8842:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__8842__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + "scrivito_editing" + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "scrivito:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			};
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			198: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = (typeof self !== 'undefined' ? self : global)["webpackChunkscrivito"] = (typeof self !== 'undefined' ? self : global)["webpackChunkscrivito"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ArgumentError": () => (/* reexport */ common/* ArgumentError */.ir),
  "BackgroundImageTag": () => (/* reexport */ react/* BackgroundImageTag */.iX),
  "Binary": () => (/* reexport */ models/* Binary */.Kb),
  "ChildListTag": () => (/* reexport */ react/* ChildListTag */.H1),
  "ClientError": () => (/* reexport */ client.ClientError),
  "ContentTag": () => (/* reexport */ react/* ContentTag */.jq),
  "CurrentPage": () => (/* reexport */ react/* CurrentPage */.Ck),
  "DataLocator": () => (/* reexport */ data_integration/* DataLocator */.s4),
  "DataLocatorError": () => (/* reexport */ data_integration/* DataLocatorError */.BL),
  "Extensions": () => (/* reexport */ react/* Extensions */.IP),
  "FutureBinary": () => (/* reexport */ models/* FutureBinary */.eJ),
  "ImageTag": () => (/* reexport */ react/* ImageTag */.Du),
  "InPlaceEditingOff": () => (/* reexport */ react/* InPlaceEditingOff */.ZM),
  "Link": () => (/* reexport */ realm/* Link */.rU),
  "LinkTag": () => (/* reexport */ react/* LinkTag */.IR),
  "NotFoundErrorPage": () => (/* reexport */ react/* NotFoundErrorPage */.zp),
  "Obj": () => (/* reexport */ realm/* Obj */.eG),
  "ObjFacetValue": () => (/* reexport */ realm/* ObjFacetValue */.JB),
  "ObjSearch": () => (/* reexport */ realm/* ObjSearch */.d_),
  "RestoreInPlaceEditing": () => (/* reexport */ react/* RestoreInPlaceEditing */.TE),
  "ScrivitoError": () => (/* reexport */ common/* ScrivitoError */.Ix),
  "Widget": () => (/* reexport */ realm/* Widget */.$L),
  "WidgetTag": () => (/* reexport */ react/* WidgetTag */.Dc),
  "_internal": () => (/* reexport */ infopark_integration_test_support_namespaceObject),
  "canEdit": () => (/* reexport */ can_edit/* canEdit */.J),
  "canWrite": () => (/* reexport */ canWrite),
  "configure": () => (/* reexport */ configure),
  "configureContentBrowser": () => (/* reexport */ configure_content_browser/* configureContentBrowser */.Zh),
  "configureObjClassForContentType": () => (/* reexport */ configure_obj_class_for_content_type/* configureObjClassForContentType */.h),
  "configurePreviewSizes": () => (/* reexport */ preview_sizes/* configurePreviewSizes */.E),
  "connect": () => (/* reexport */ react/* connect */.$j),
  "createObjClass": () => (/* reexport */ realm/* createObjClass */.r$),
  "createWidgetClass": () => (/* reexport */ realm/* createWidgetClass */.Zv),
  "currentEditor": () => (/* reexport */ currentEditor),
  "currentPage": () => (/* reexport */ current_page/* currentPage */.lo),
  "currentPageParams": () => (/* reexport */ current_page/* currentPageParams */.WX),
  "currentSiteId": () => (/* reexport */ current_page/* currentSiteId */.lx),
  "currentUser": () => (/* reexport */ currentUser),
  "currentWorkspace": () => (/* reexport */ currentWorkspace),
  "currentWorkspaceId": () => (/* reexport */ current_workspace_id/* currentWorkspaceId */.tV),
  "editorLanguage": () => (/* reexport */ editorLanguage),
  "ensureUserIsLoggedIn": () => (/* reexport */ ensureUserIsLoggedIn),
  "extendMenu": () => (/* reexport */ extendMenu),
  "extractText": () => (/* reexport */ extractText),
  "finishLoading": () => (/* reexport */ loading_monitor/* finishLoading */.kU),
  "getClass": () => (/* reexport */ realm/* getClass */.ll),
  "isComparisonActive": () => (/* reexport */ editing_context/* isComparisonActive */.rl),
  "isCurrentPage": () => (/* reexport */ current_page/* isCurrentPage */.OO),
  "isEditorLoggedIn": () => (/* reexport */ isEditorLoggedIn),
  "isInPlaceEditingActive": () => (/* reexport */ editing_context/* isInPlaceEditingActive */.DG),
  "isOnCurrentPath": () => (/* reexport */ isOnCurrentPath),
  "isUserLoggedIn": () => (/* reexport */ isUserLoggedIn),
  "load": () => (/* reexport */ loadable/* load */.zD),
  "logout": () => (/* reexport */ logout),
  "navigateTo": () => (/* reexport */ navigate_to/* navigateTo */.T),
  "objsFromDataLocator": () => (/* reexport */ data_integration/* objsFromDataLocator */.GO),
  "openDialog": () => (/* reexport */ openDialog),
  "preload": () => (/* reexport */ preload),
  "provideAuthGroups": () => (/* reexport */ auth_groups/* provideAuthGroups */.t),
  "provideComponent": () => (/* reexport */ react/* provideComponent */.wh),
  "provideDataClass": () => (/* reexport */ provideDataClass),
  "provideDataErrorComponent": () => (/* reexport */ react/* provideDataErrorComponent */.$3),
  "provideDataItem": () => (/* reexport */ provideDataItem),
  "provideEditingConfig": () => (/* reexport */ provide_editing_config/* provideEditingConfig */.u),
  "provideLayoutComponent": () => (/* reexport */ react/* provideLayoutComponent */.YP),
  "provideObjClass": () => (/* reexport */ realm/* provideObjClass */.Je),
  "provideWidgetClass": () => (/* reexport */ realm/* provideWidgetClass */.We),
  "registerComponent": () => (/* reexport */ react/* registerComponent */.RM),
  "renderPage": () => (/* reexport */ renderPage),
  "resolveHtmlUrls": () => (/* reexport */ replace_internal_links/* resolveHtmlUrls */.y),
  "setVisitorIdToken": () => (/* reexport */ setVisitorIdToken),
  "uiContext": () => (/* reexport */ uiContext),
  "unstable_JrRestApi": () => (/* reexport */ client.JrRestApi),
  "unstable_selectSiteId": () => (/* reexport */ unstable_multi_site_mode/* unstable_selectSiteId */.gq),
  "updateContent": () => (/* reexport */ updateContent),
  "updateMenuExtensions": () => (/* reexport */ menu/* updateMenuExtensions */.ff),
  "urlFor": () => (/* reexport */ urlFor),
  "useDataItem": () => (/* reexport */ react/* useDataItem */.pU),
  "useDataLocator": () => (/* reexport */ react/* useDataLocator */.$W),
  "useDataScope": () => (/* reexport */ react/* useDataScope */.g7),
  "useHistory": () => (/* reexport */ browser_location/* useHistory */.k6),
  "validationResultsFor": () => (/* reexport */ validationResultsFor)
});

// NAMESPACE OBJECT: ./scrivito_sdk/infopark_integration_test_support.ts
var infopark_integration_test_support_namespaceObject = {};
__webpack_require__.r(infopark_integration_test_support_namespaceObject);
__webpack_require__.d(infopark_integration_test_support_namespaceObject, {
  "alwaysShowOptionMarkers": () => (react/* alwaysShowOptionMarkers */.aR),
  "currentPublicAuthorizationState": () => (currentPublicAuthorizationState),
  "enableForceVerification": () => (enableForceVerification),
  "isFetchingActive": () => (client.isFetchingActive)
});

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 45 modules
var common = __webpack_require__(3711);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/asset_url_base.ts

let current;
const deferred = new common/* Deferred */.BH();
function getAssetUrlBase() {
  if (!current)
    throw new common/* InternalError */.AQ();
  return current;
}
function assetLoadingReady() {
  return deferred.promise;
}
function configureAssetUrlBase(assetUrlBase) {
  if (current)
    throw new common/* InternalError */.AQ();
  current = assetUrlBase;
  __webpack_require__.p = `${current}/`;
  deferred.resolve();
}
function initializeAssetUrlBase() {
  current = void 0;
  __webpack_require__.p = "https://example.org/scrivito-internal-error/";
}
function resetAssetUrlBase() {
  initializeAssetUrlBase();
}

// EXTERNAL MODULE: external "urijs"
var external_urijs_ = __webpack_require__(8842);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/browser_location.ts
var browser_location = __webpack_require__(9979);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_page_data.ts
var current_page_data = __webpack_require__(4077);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/routing.ts + 2 modules
var routing = __webpack_require__(5079);
// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 23 modules
var loadable = __webpack_require__(9246);
// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(9541);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/canonical_url.ts







function init() {
  let lastState;
  (0,state/* observe */.N7)(() => (0,loadable/* capture */.IE)(current_page_data/* getCurrentPageData */["if"]).result).filter(common/* isPresent */.EN).filter((pageData) => {
    if (!pageData.currentPage)
      return false;
    const currentState = pageData.navigationState;
    const isDifferent = lastState === void 0 || lastState.locationRoute.objId !== currentState.locationRoute.objId || lastState.historyState.location !== currentState.historyState.location;
    lastState = currentState;
    return isDifferent;
  }).subscribe(switchToCanonicalUrl);
}
function switchToCanonicalUrl(pageData) {
  const location = pageData.navigationState.historyState.location;
  (0,loadable/* load */.zD)(() => {
    if (browser_location/* get */.U2() !== location)
      return;
    return (0,routing/* generateLocalPath */.c4)(pageData.currentPage);
  }).then((canonicalPath) => {
    if (!canonicalPath)
      return;
    if (browser_location/* get */.U2() !== location)
      return;
    const locationUri = new external_urijs_(location);
    if (canonicalPath === locationUri.path())
      return;
    browser_location/* replace */.gx(locationUri.path(canonicalPath).toString());
  });
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_origin.ts
var current_origin = __webpack_require__(8397);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_page.ts
var current_page = __webpack_require__(6500);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/document_title.ts
var document_title = __webpack_require__(5915);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/editing_context.ts
var editing_context = __webpack_require__(8084);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/cdn_asset_url_base.ts

function cdnAssetUrlBase() {
  return `https://assets.scrivito.com/sjs/${(0,common/* getScrivitoVersion */.ux)()}`;
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/content_tags_for_empty_attributes.ts
var content_tags_for_empty_attributes = __webpack_require__(284);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_app_space.ts
var current_app_space = __webpack_require__(4804);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/ui_adapter.ts
var ui_adapter = __webpack_require__(9470);
// EXTERNAL MODULE: ./scrivito_sdk/import_from.ts
var import_from = __webpack_require__(3912);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/current_editor.ts


function currentEditor() {
  if (!ui_adapter/* uiAdapter */.k)
    return null;
  const userData = ui_adapter/* uiAdapter.currentEditor */.k.currentEditor();
  const teamsData = ui_adapter/* uiAdapter.currentEditorTeams */.k.currentEditorTeams();
  const Editor = (0,import_from/* importFrom */.u$)("editingSupport", "Editor");
  if (!Editor)
    return null;
  return userData && teamsData ? new Editor(userData, teamsData) : null;
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/forced_editor_language.ts
var forced_editor_language = __webpack_require__(5893);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/load_editing_assets.ts



function loadEditingAssets() {
  loadEditingCss();
  importEditors().then(({ initializeEditors }) => {
    initializeEditors();
  });
}
function loadEditingCss() {
  (0,common/* loadCss */.Yc)(`${getAssetUrlBase()}/scrivito_editing.css`, (0,common/* getDocument */.Me)());
}
function importEditors() {
  return __webpack_require__.e(/* import() */ 226).then(__webpack_require__.bind(__webpack_require__, 9473));
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/treat_localhost_like.ts
var treat_localhost_like = __webpack_require__(3467);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/unstable_multi_site_mode.ts
var unstable_multi_site_mode = __webpack_require__(4132);
// EXTERNAL MODULE: ./scrivito_sdk/client/index.ts + 29 modules
var client = __webpack_require__(5098);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/visitor_authentication.ts



const DOC_LINK = "js-sdk/setVisitorIdToken";
let provider;
let cancelMissingTokenNotification;
function getVisitorAuthenticationProvider(visitorAuthentication) {
  if (!ui_adapter/* uiAdapter */.k && visitorAuthentication) {
    return enableVisitorAuthentication();
  }
}
function enableVisitorAuthentication() {
  provider = new client.VisitorAuthenticationProvider();
  const timeoutId = setTimeout(() => {
    throw new common/* ScrivitoError */.Ix(
      `Scrivito.setVisitorIdToken was not called within 30 seconds. Visit ${(0,common/* docUrl */.m0)(DOC_LINK)} for more information.`
    );
  }, 3e4);
  cancelMissingTokenNotification = () => clearTimeout(timeoutId);
  return provider;
}
function setVisitorIdToken(token, ...args) {
  if (ui_adapter/* uiAdapter */.k)
    return;
  checkSetVisitorIdToken(token, ...args);
  if (!provider) {
    throw new common/* ScrivitoError */.Ix(
      `Scrivito needs to be configured to use visitor authentication before Scrivito.setVisitorIdToken can be called. Visit ${(0,common/* docUrl */.m0)("js-sdk/configure")} and ${(0,common/* docUrl */.m0)(DOC_LINK)} for more information.`
    );
  }
  cancelAndForgetMissingTokenNotification();
  provider.setToken(token);
}
function isVisitorAuthenticationEnabled() {
  return !!provider;
}
const checkSetVisitorIdToken = (0,common/* checkArgumentsFor */.PJ)(
  "setVisitorIdToken",
  [["idToken", common/* tcomb.String */.pC.String]],
  {
    docPermalink: DOC_LINK
  }
);
function cancelAndForgetMissingTokenNotification() {
  if (cancelMissingTokenNotification) {
    cancelMissingTokenNotification();
    cancelMissingTokenNotification = void 0;
  }
}
function resetVisitorAuthentication() {
  cancelAndForgetMissingTokenNotification();
  provider = void 0;
}

// EXTERNAL MODULE: ./scrivito_sdk/bridge/index.ts + 12 modules
var bridge = __webpack_require__(4899);
// EXTERNAL MODULE: ./scrivito_sdk/data/index.ts + 28 modules
var data = __webpack_require__(9241);
// EXTERNAL MODULE: ./scrivito_sdk/models/index.ts + 34 modules
var models = __webpack_require__(9838);
// EXTERNAL MODULE: ./scrivito_sdk/realm/index.ts + 22 modules
var realm = __webpack_require__(5932);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/constraints_validation_callback.ts
var constraints_validation_callback = __webpack_require__(8138);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/configure.ts























const OriginValue = common/* tcomb.refinement */.pC.refinement(
  common/* tcomb.String */.pC.String,
  (v) => external_urijs_(v).origin() === v,
  "Origin String"
);
const AllowedConfiguration = common/* tcomb.interface */.pC["interface"]({
  tenant: common/* tcomb.String */.pC.String,
  adoptUi: common/* tcomb.maybe */.pC.maybe(common/* tcomb.union */.pC.union([common/* tcomb.Boolean */.pC.Boolean, OriginValue])),
  baseUrlForSite: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Function */.pC.Function),
  constraintsValidation: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Function */.pC.Function),
  endpoint: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String),
  homepage: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Function */.pC.Function),
  origin: common/* tcomb.maybe */.pC.maybe(OriginValue),
  routingBasePath: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String),
  siteForUrl: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Function */.pC.Function),
  visitorAuthentication: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Boolean */.pC.Boolean),
  apiKey: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String),
  unstable: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Object */.pC.Object),
  priority: common/* tcomb.maybe */.pC.maybe(common/* tcomb.enums.of */.pC.enums.of(["foreground", "background"])),
  editorLanguage: common/* tcomb.maybe */.pC.maybe(common/* tcomb.enums.of */.pC.enums.of(["en", "de"])),
  strictSearchOperators: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Boolean */.pC.Boolean),
  optimizedWidgetLoading: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Boolean */.pC.Boolean),
  contentTagsForEmptyAttributes: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Boolean */.pC.Boolean),
  jrRestApiEndpoint: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String),
  treatLocalhostLike: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String)
});
const PUBLIC_FUNCTION_NAME = "configure";
const CHECK_ARGUMENTS_OPTIONS = { docPermalink: "js-sdk/configure" };
const checkConfigure = (0,common/* checkArgumentsFor */.PJ)(
  PUBLIC_FUNCTION_NAME,
  [["configuration", AllowedConfiguration]],
  CHECK_ARGUMENTS_OPTIONS
);
let configDeferred = new common/* Deferred */.BH();
function configure(configuration, ...excessArgs) {
  var _a;
  checkConfigure(configuration, ...excessArgs);
  if (configuration.apiKey && !ApiKeyAuthorizationProviderClass) {
    (0,common/* throwInvalidArgumentsError */.dg)(
      PUBLIC_FUNCTION_NAME,
      'The option "apiKey" is only available under Node.js.',
      CHECK_ARGUMENTS_OPTIONS
    );
  }
  const routingConfiguration = getCheckedRoutingConfiguration(configuration);
  setConfiguration(configuration);
  const inofficialConfiguration = configuration.unstable;
  const getUnstableSiteIdForObj = inofficialConfiguration == null ? void 0 : inofficialConfiguration.getSiteIdForObj;
  if (getUnstableSiteIdForObj) {
    (0,unstable_multi_site_mode/* setUnstableMultiSiteMode */.NV)(getUnstableSiteIdForObj);
  }
  if (configuration.tenant === data/* IN_MEMORY_TENANT */.kI) {
    (0,data/* useInMemoryTenant */.c9)();
    (0,realm/* setCurrentSiteIdHandler */.RO)(() => data/* IN_MEMORY_TENANT */.kI);
    (0,data/* disableObjReplication */.Qc)();
  } else {
    const tenant = configuration.tenant;
    const endpoint = configuration.endpoint || common/* DEFAULT_ENDPOINT */.Am;
    configureAssetUrlBase(
      (_a = inofficialConfiguration == null ? void 0 : inofficialConfiguration.assetUrlBase) != null ? _a : cdnAssetUrlBase()
    );
    (0,client.setJrRestApiEndpoint)(
      configuration.jrRestApiEndpoint || calculateJrRestApiEndpoint()
    );
    const treatLocalhostLike = configuration.treatLocalhostLike;
    if (treatLocalhostLike && typeof window !== "undefined" && (0,common/* isLocalhostUrl */.JF)((0,common/* windowLocationOrigin */.k9)())) {
      (0,treat_localhost_like/* setTreatLocalhostLike */.J1)(treatLocalhostLike);
    }
    if (ui_adapter/* uiAdapter */.k) {
      configureWithUi(endpoint, tenant, ui_adapter/* uiAdapter */.k);
    } else {
      configureWithoutUi(endpoint, tenant, configuration);
    }
  }
  (0,routing/* initRouting */.ZK)(routingConfiguration);
  configureConstraintsValidationCallback(configuration);
  if (configuration.contentTagsForEmptyAttributes === false) {
    (0,content_tags_for_empty_attributes/* skipContentTagsForEmptyAttributes */.g)();
  }
  if (configuration.strictSearchOperators)
    (0,realm/* enableStrictSearchOperators */.pw)();
  (0,forced_editor_language/* setForcedEditorLanguage */.n)(configuration.editorLanguage || null);
}
function getConfiguration() {
  return configDeferred.promise;
}
function setConfiguration(configuration) {
  if (!configDeferred.isPending()) {
    throw new common/* ScrivitoError */.Ix("Scrivito.configure has already been called.");
  }
  configDeferred.resolve(configuration);
}
function resetConfiguration() {
  configDeferred = new Deferred();
}
function configureWithUi(endpoint, tenant, uiAdapterClient) {
  (0,client.setJrRestApiTokenProvider)(() => (0,loadable/* load */.zD)(() => {
    var _a;
    return (_a = currentEditor()) == null ? void 0 : _a.authToken();
  }));
  uiAdapterClient.configureTenant({
    tenant,
    endpoint
  });
  if ((0,unstable_multi_site_mode/* useUnstableMultiSiteMode */.Ly)())
    warnIfNoSiteIdSelection();
  setAppAdapter(uiAdapterClient);
  loadEditingAssets();
}
function configureWithoutUi(endpoint, tenant, {
  optimizedWidgetLoading,
  visitorAuthentication,
  priority,
  apiKey
}) {
  if (optimizedWidgetLoading)
    (0,data/* configureForLazyWidgets */.gU)(true);
  configureCmsRestApi({
    endpoint,
    tenant,
    visitorAuthentication,
    priority,
    apiKey
  });
}
function configureCmsRestApi({
  endpoint,
  tenant,
  visitorAuthentication,
  priority,
  apiKey
}) {
  const authProvider = apiKey && new ApiKeyAuthorizationProviderClass(apiKey) || getVisitorAuthenticationProvider(visitorAuthentication) || client.PublicAuthentication;
  if (priority)
    client.cmsRestApi.setPriority(priority);
  client.cmsRestApi.init({
    apiBaseUrl: `https://${endpoint}/tenants/${tenant}`,
    authProvider
  });
}
function calculateJrRestApiEndpoint() {
  const origin = (0,current_origin/* currentOrigin */.Z)();
  if (!origin)
    return "https://api.justrelate.com";
  const originUri = external_urijs_(origin);
  if (originUri.domain() === "localhost")
    return origin;
  return originUri.subdomain("api").origin();
}
function getCheckedRoutingConfiguration({
  homepage,
  origin,
  routingBasePath,
  baseUrlForSite,
  siteForUrl
}) {
  const homepageCallback = homepage ? () => (0,realm/* unwrapAppClass */.bM)(homepage()) : () => (0,models/* getRootObjFrom */.cS)((0,current_app_space/* currentAppSpace */.q)().and((0,models/* restrictToSite */.mz)("default")));
  if (baseUrlForSite && siteForUrl) {
    if (routingBasePath || origin) {
      const presentKey = routingBasePath ? "routingBasePath" : "origin";
      (0,common/* throwInvalidArgumentsError */.dg)(
        PUBLIC_FUNCTION_NAME,
        `The '${presentKey}' cannot be combined with the "baseUrlForSite" option`,
        CHECK_ARGUMENTS_OPTIONS
      );
    }
    return {
      homepageCallback,
      baseUrlForSite,
      siteForUrl
    };
  }
  if (baseUrlForSite || siteForUrl) {
    const presentKey = siteForUrl ? "siteForUrl" : "baseUrlForSite";
    const missingKey = siteForUrl ? "baseUrlForSite" : "siteForUrl";
    (0,common/* throwInvalidArgumentsError */.dg)(
      PUBLIC_FUNCTION_NAME,
      `Unexpected value for argument 'configuration': a value for '${missingKey}' is required if '${presentKey}' is present.`,
      CHECK_ARGUMENTS_OPTIONS
    );
  }
  return { homepageCallback, origin, routingBasePath };
}
function configureConstraintsValidationCallback(configuration) {
  const constraintsValidationCallback = configuration.constraintsValidation;
  if (constraintsValidationCallback) {
    (0,constraints_validation_callback/* setConstraintsValidationCallback */.a3)(constraintsValidationCallback);
  }
}
function setAppAdapter(uiAdapterClient) {
  importUiInterface().then(({ startAppAdapter }) => {
    const channel = new MessageChannel();
    startAppAdapter((0,bridge/* linkViaPort */.oc)(channel.port1));
    uiAdapterClient.setAppAdapter(channel.port2);
  });
}
let ApiKeyAuthorizationProviderClass;
function setApiKeyAuthorizationProviderClass(input) {
  ApiKeyAuthorizationProviderClass = input;
}
function importUiInterface() {
  return __webpack_require__.e(/* import() */ 226).then(__webpack_require__.bind(__webpack_require__, 1339));
}
function warnIfNoSiteIdSelection() {
  const timeout = setTimeout(
    () => (0,loadable/* load */.zD)(current_page/* currentSiteId */.lx).then((siteId) => {
      if (siteId === "default") {
        (0,common/* logError */.H)(
          "Warning: No site ID was selected within 30 seconds. In the multi-site mode a site ID must be selected before Scrivito can render content. Forgot to use Scrivito.unstable_selectSiteId?"
        );
      }
    }),
    3e4
  );
  (0,loadable/* load */.zD)(unstable_multi_site_mode/* getUnstableSelectedSiteId */.IN).then(() => clearTimeout(timeout));
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/trusted_ui_origins.ts



function checkIfTrustedOrigin(origin) {
  if (origin === window.location.origin)
    return common/* ScrivitoPromise.resolve */.s8.resolve(true);
  if (originMatches(origin, "https://*.scrivito.com")) {
    return common/* ScrivitoPromise.resolve */.s8.resolve(true);
  }
  return getConfiguration().then((configuration) => {
    var _a, _b;
    const adoptUi = configuration.adoptUi;
    if (typeof adoptUi === "string" && originMatches(origin, adoptUi)) {
      return true;
    }
    const unstableOrigins = (_b = (_a = configuration.unstable) == null ? void 0 : _a.trustedUiOrigins) != null ? _b : [];
    const origins = [...unstableOrigins, ...getLocalOrigins()];
    return origins.some(
      (trustedOrigin) => originMatches(origin, trustedOrigin)
    );
  });
}
function originMatches(origin, pattern) {
  const originUrl = new external_urijs_(origin);
  const patternUrl = new external_urijs_(pattern);
  return originUrl.protocol() === patternUrl.protocol() && hostMatches(originUrl.host(), patternUrl.host());
}
function hostMatches(host, hostPattern) {
  if (hostPattern.substr(0, 2) === "*.") {
    const postfix = hostPattern.substr(1);
    return host.substr(-postfix.length) === postfix;
  }
  return host === hostPattern;
}
function getLocalOrigins() {
  var _a, _b;
  try {
    return (_b = (_a = localStorage.getItem("SCRIVITO_TRUSTED_UI_ORIGINS")) == null ? void 0 : _a.split(" ")) != null ? _b : [];
  } catch (anyError) {
    return [];
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/ui_adapter_interface.ts

const uiAdapterDescription = {
  canEdit: bridge/* GET */.HT,
  canWrite: bridge/* GET */.HT,
  comparisonBase: bridge/* GET */.HT,
  comparisonRange: bridge/* GET */.HT,
  getEditorAuthToken: bridge/* GET */.HT,
  getContentStateId: bridge/* GET */.HT,
  translate: bridge/* GET */.HT,
  currentEditor: bridge/* GET */.HT,
  currentEditorTeams: bridge/* GET */.HT,
  currentWorkspace: bridge/* GET */.HT,
  currentEditingContext: bridge/* GET */.HT,
  getUiContext: bridge/* GET */.HT,
  getUiLanguage: bridge/* GET */.HT,
  getResolvedUrl: bridge/* GET */.HT,
  retrieveObjQuery: bridge/* SEND */.H8,
  retrieveFacetQuery: bridge/* SEND */.H8,
  retrieveSuggest: bridge/* SEND */.H8,
  retrieveBinaryMetadata: bridge/* SEND */.H8,
  retrieveBinaryUrls: bridge/* SEND */.H8,
  retrieveObjFieldDiffs: bridge/* SEND */.H8,
  copyBinary: bridge/* SEND */.H8,
  uploadBinary: bridge/* SEND */.H8,
  objReplicationMessageStream: bridge/* STREAM */.M,
  finishSavingObj: bridge/* SEND */.H8,
  copyObj: bridge/* SEND */.H8,
  finishReplicatingObj: bridge/* SEND */.H8,
  insertWidget: bridge/* SEND */.H8,
  navigateToExternalUrl: bridge/* SEND */.H8,
  openInNewUiWindow: bridge/* SEND */.H8,
  configureContentBrowser: bridge/* SEND */.H8,
  openContentBrowser: bridge/* SEND */.H8,
  openCustomDialog: bridge/* SEND */.H8,
  setAppAdapter: bridge/* SEND */.H8,
  configureTenant: bridge/* SEND */.H8,
  showWidgetMenu: bridge/* SEND */.H8,
  showWidgetlistMenu: bridge/* SEND */.H8,
  showChildListMenu: bridge/* SEND */.H8,
  startDrag: bridge/* SEND */.H8,
  endDrag: bridge/* SEND */.H8,
  dragTo: bridge/* SEND */.H8,
  drop: bridge/* SEND */.H8
};

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/establish_ui_connection.ts




function establishUiConnection(uiWindow) {
  const promiseForMessagePort = (0,bridge/* connectTo */.bZ)(
    uiWindow,
    (0,bridge/* postMessageLinkFor */.kg)(window),
    {
      clientVersion: (0,common/* getScrivitoVersion */.ux)(),
      clientCapabilities: ["adapterSpec"]
    }
  ).then(({ port, origin }) => {
    return checkIfTrustedOrigin(origin).then((trusted) => {
      if (!trusted) {
        throw new common/* ScrivitoError */.Ix(
          `Refusing to connect to Scrivito UI at unknown origin ${origin}.`
        );
      }
      return port;
    });
  });
  return (0,bridge/* createAdapterClient */.hb)(
    uiAdapterDescription,
    (0,bridge/* createAdapterMessageClient */.B8)((0,bridge/* anticipatedMessageLink */.fv)(promiseForMessagePort.then(bridge/* linkViaPort */.oc)))
  );
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/extract_text/child_node_list_to_array.ts
function childNodeListToArray(childNodes) {
  return Array.prototype.slice.call(childNodes);
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/extract_text/node_to_text.ts

const IGNORE_NODE = ["HEAD", "SCRIPT"];
function nodeToText(node) {
  const nodeName = node.nodeName;
  if (IGNORE_NODE.indexOf(nodeName) > -1)
    return "";
  if (nodeName === "#text")
    return node.textContent || "";
  return childNodeListToArray(node.childNodes).map((child) => nodeToText(child)).join(" ");
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/extract_text/string_to_html_element.ts
let parser;
function stringToHtmlElement(htmlString) {
  parser || (parser = new DOMParser());
  return parser.parseFromString(htmlString, "text/html").documentElement;
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/extract_text/html_to_text_for_browser.ts


function htmlToTextForBrowser(html) {
  const element = stringToHtmlElement(html);
  return nodeToText(element);
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/extract_text/remove_html_tags.ts


let htmlToText;
function setHtmlToTextConverter(converter) {
  htmlToText = converter;
}
function removeHtmlTags(html) {
  if (!htmlToText)
    throw new common/* InternalError */.AQ();
  if (html === "")
    return "";
  const text = htmlToText(html);
  return (0,common/* pruneString */.o8)(text);
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/initialize_content.ts
var initialize_content = __webpack_require__(6221);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/user.ts
var user = __webpack_require__(1425);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/current_user.ts
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};





function currentUser() {
  const userData = loadableUserData.get();
  return userData ? new user/* User */.n(userData) : null;
}
function getUserInfoPath() {
  return __async(this, null, function* () {
    const { tenant: instanceId } = yield getConfiguration();
    return `iam/instances/${instanceId}/userinfo`;
  });
}
function setCurrentUserData(userData) {
  loadableUserData.set(userData);
}
const loadableUserData = new loadable/* LoadableData */.of({
  state: (0,state/* createStateContainer */.JH)(),
  loader: getUserData
});
function getUserData() {
  return __async(this, null, function* () {
    try {
      const {
        sub: id,
        name,
        email
      } = yield (0,client.getWithoutLoginRedirect)(yield getUserInfoPath());
      return { id, name, email };
    } catch (error) {
      if (error instanceof client.ClientError && error.code === "auth_missing") {
        return null;
      }
      throw error;
    }
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/is_user_logged_in.ts
var is_user_logged_in_async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};





const IS_USER_LOGGED_IN_STORAGE_KEY = "SCRIVITO_IS_USER_LOGGED_IN";
let isUserLoggedInCache;
function isUserLoggedIn() {
  if (ui_adapter/* uiAdapter */.k)
    return true;
  if (!isUserLoggedInCached())
    return false;
  verifyUserIsLoggedIn();
  return true;
}
function ensureUserIsLoggedIn() {
  if (!ui_adapter/* uiAdapter */.k)
    ensureUserIsLoggedInAsync();
}
function detectIsUserLoggedIn() {
  const url = new URL((0,common/* currentHref */.RO)());
  const searchParams = url.searchParams;
  if (searchParams.has(client.USER_IS_LOGGED_IN_PARAM_NAME)) {
    isUserLoggedInCache = true;
    setFlagInLocalStorage();
    searchParams.delete(client.USER_IS_LOGGED_IN_PARAM_NAME);
    (0,common/* replaceHistoryState */.g_)({}, "", url.toString());
  }
}
function logout() {
  logoutAsync();
}
function logoutAsync() {
  return is_user_logged_in_async(this, null, function* () {
    (0,common/* redirectTo */.gB)(yield (0,client.getJrRestApiUrl)("iam/logout"));
  });
}
function clearIsUserLoggedInCache() {
  isUserLoggedInCache = void 0;
}
function ensureUserIsLoggedInAsync() {
  return is_user_logged_in_async(this, null, function* () {
    if (isUserLoggedIn())
      return;
    yield client.JrRestApi.get(yield getUserInfoPath());
    setFlagInLocalStorage();
    (0,common/* reload */.H5)();
  });
}
function isUserLoggedInCached() {
  if (isUserLoggedInCache === void 0) {
    isUserLoggedInCache = isFlagPresentInLocalStorage();
  }
  return isUserLoggedInCache;
}
function verifyUserIsLoggedIn() {
  return is_user_logged_in_async(this, null, function* () {
    if ((yield (0,loadable/* load */.zD)(currentUser)) === null) {
      removeFlagFromLocalStorage();
      (0,common/* reload */.H5)();
    }
  });
}
function setFlagInLocalStorage() {
  try {
    localStorage.setItem(IS_USER_LOGGED_IN_STORAGE_KEY, "");
  } catch (_e) {
  }
}
function removeFlagFromLocalStorage() {
  try {
    localStorage.removeItem(IS_USER_LOGGED_IN_STORAGE_KEY);
  } catch (_e) {
  }
}
function isFlagPresentInLocalStorage() {
  try {
    return localStorage.getItem(IS_USER_LOGGED_IN_STORAGE_KEY) !== null;
  } catch (_e) {
    return false;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/load_editing_support.ts
var load_editing_support_async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

function loadEditingSupport() {
  return load_editing_support_async(this, null, function* () {
    yield assetLoadingReady();
    return __webpack_require__.e(/* import() */ 226).then(__webpack_require__.bind(__webpack_require__, 1328));
  });
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/navigation_state.ts
var navigation_state = __webpack_require__(605);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/app_url_for_redirect_to_cloud_ui.ts


function appUrlForRedirectToCloudUi() {
  if (isProbablyCloudUi())
    return null;
  const currentLocation = (0,common/* currentHref */.RO)();
  if (ui_adapter/* uiAdapter */.k)
    return currentLocation;
  return (0,common/* appUrlFromPackagedUiUrl */.$f)(currentLocation) || null;
}
function isProbablyCloudUi() {
  const parentFrame = window.parent;
  if (parentFrame === window)
    return false;
  return getFrameHost(parentFrame) !== window.location.host;
}
function getFrameHost(frame) {
  try {
    return frame.location.host;
  } catch (_ignore) {
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/redirect_to_cloud_ui.ts
function redirectToCloudUi(cloudUiOrigin, tenant, url) {
  window.parent.location.replace(`${cloudUiOrigin}/${tenant}~${url}`);
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/ui_redirect.ts
var ui_redirect_async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};




function initializeUiRedirect() {
  return ui_redirect_async(this, null, function* () {
    const configuration = yield getConfiguration();
    handleAdoptUi(configuration);
  });
}
function handleAdoptUi(configuration) {
  const { tenant, adoptUi } = configuration;
  if (adoptUi) {
    const appUrlForUi = appUrlForRedirectToCloudUi();
    if (appUrlForUi) {
      const cloudUiUrl = adoptUi === true ? "https://edit.scrivito.com" : adoptUi;
      redirectToCloudUi(cloudUiUrl, tenant, appUrlForUi);
      (0,navigation_state/* forceNavigationStateNotResponsible */.qN)();
    }
  }
}

// EXTERNAL MODULE: ./scrivito_sdk/link_resolution/index.ts + 6 modules
var link_resolution = __webpack_require__(8063);
// EXTERNAL MODULE: ./scrivito_sdk/realm/initial_content_registry.ts
var initial_content_registry = __webpack_require__(5656);
;// CONCATENATED MODULE: ./scrivito_sdk/initialize_sdk_for_browser.ts























function initializeSdk() {
  (0,client.setupRegisterVerificator)();
  initializeAssetUrlBase();
  (0,current_origin/* setOriginProvider */.k)(common/* windowLocationOrigin */.k9);
  (0,realm/* setCurrentSiteIdHandler */.RO)(current_page/* currentSiteId */.lx);
  (0,current_page_data/* setNavigationStateProvider */.Kz)(navigation_state/* getCurrentNavigationState */.lT);
  setHtmlToTextConverter(htmlToTextForBrowser);
  (0,client.useXmlHttpRequest)(XMLHttpRequest);
  initializeUiRedirect();
  detectIsUserLoggedIn();
  const parentWindow = window.parent;
  const insideIFrame = parentWindow !== window;
  const windowName = window.name;
  const insideUi = insideIFrame && (0,editing_context/* initializeEditingContextFromBrowsingContext */.MY)(windowName);
  if (!insideUi) {
    (0,data/* useReplicationStrategy */.Lo)(data/* ObjBackendReplication */.kt);
  } else {
    const uiAdapterClient = establishUiConnection(parentWindow);
    (0,ui_adapter/* setUiAdapter */.p)(uiAdapterClient);
    (0,client.replaceCmsRetrieval)(uiAdapterClient);
    client.cmsRestApi.rejectRequests();
    (0,models/* setBinaryHandler */.EX)(uiAdapterClient);
    (0,models/* setCopyObjHandler */.$v)(uiAdapterClient);
    (0,link_resolution/* setUrlResolutionHandler */.Md)(
      (url) => uiAdapterClient.getResolvedUrl(url) || null
    );
    (0,link_resolution/* setupWriteMonitorNotification */.Gf)(() => void 0);
    (0,data/* setContentUpdateHandler */.$z)(uiAdapterClient);
    (0,data/* setObjStreamReplicationEndpoint */.wi)(uiAdapterClient);
    (0,data/* useReplicationStrategy */.Lo)(data/* ObjStreamReplication */.kX);
    loadEditingSupport().then((editingSupport) => {
      editingSupport.installDndHandler();
      editingSupport.installScrollHandler();
      editingSupport.setModeIndicators();
      editingSupport.reloadIfContextChangesFrom(windowName);
    });
    (0,document_title/* observeDocumentTitle */.P)();
    (0,initial_content_registry/* setInitialContentFor */.T)(initialize_content/* initialContentFor */.WS);
  }
  init();
}

// EXTERNAL MODULE: ./scrivito_sdk/data_integration/index.ts + 25 modules
var data_integration = __webpack_require__(2878);
// EXTERNAL MODULE: ./scrivito_sdk/react/index.ts + 37 modules
var react = __webpack_require__(1563);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/can_edit.ts
var can_edit = __webpack_require__(7007);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/can_write.ts


function canWrite() {
  if (!ui_adapter/* uiAdapter */.k)
    return false;
  return ui_adapter/* uiAdapter.canWrite */.k.canWrite((0,models/* currentWorkspaceId */.tV)()) || false;
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/configure_content_browser.ts
var configure_content_browser = __webpack_require__(9411);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/configure_obj_class_for_content_type.ts
var configure_obj_class_for_content_type = __webpack_require__(6461);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/preview_sizes.ts
var preview_sizes = __webpack_require__(4591);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/current_workspace.ts


function currentWorkspace() {
  var _a, _b;
  return new models/* Workspace */.j$(
    (_b = (_a = ui_adapter/* uiAdapter */.k) == null ? void 0 : _a.currentWorkspace()) != null ? _b : { id: (0,models/* currentWorkspaceId */.tV)(), title: "" }
  );
}

// EXTERNAL MODULE: ./scrivito_sdk/models/current_workspace_id.ts
var current_workspace_id = __webpack_require__(3252);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/menu.ts + 2 modules
var menu = __webpack_require__(3868);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/menu/menu_registry.ts
var menu_registry = __webpack_require__(12);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/extend_menu.ts




function extendMenu(menuCallback, ...excessArgs) {
  checkExtendMenuArguments(menuCallback, ...excessArgs);
  if (!ui_adapter/* uiAdapter */.k)
    return;
  (0,menu_registry/* registerMenuCallback */.Lg)(menuCallback);
  (0,menu/* updateMenuExtensions */.ff)();
}
const checkExtendMenuArguments = (0,common/* checkArgumentsFor */.PJ)(
  "extendMenu",
  [["menuCallback", common/* tcomb.Function */.pC.Function]],
  {
    docPermalink: "js-sdk/extendMenu"
  }
);

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/extract_text/extract_collector.ts
class ExtractCollector {
  constructor(maxLength) {
    this.maxLength = maxLength;
    this.currentLength = 0;
    this.extracts = [];
  }
  isMaxLengthReached() {
    return this.currentLength >= this.maxLength;
  }
  push(extract) {
    if (!extract)
      return;
    this.currentLength += extract.length + (this.extracts.length ? 1 : 0);
    this.extracts.push(extract);
  }
  toString() {
    const extractedText = this.extracts.join(" ");
    const shortenedText = extractedText.substring(0, this.maxLength);
    return shortenedText.replace(/ $/, "");
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/extract_text/extract_blob_text.ts


function extractBlobText(objOrWidget) {
  if (objOrWidget instanceof models/* BasicWidget */.E8)
    return "";
  const text = objOrWidget.metadata().get("text");
  if (typeof text !== "string")
    return "";
  return (0,common/* pruneString */.o8)(text);
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/extract_text/extract_widgetlist.ts

function extractWidgetlist(widgetlist, collector) {
  for (const widget of widgetlist) {
    extractTextFromBasicObjOrWidget(widget, collector);
    if (collector.isMaxLengthReached())
      break;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/extract_text/extract_attribute.ts





function extractAttribute(objOrWidget, schema, attribute, collector) {
  if (attribute === "blob:text") {
    return collector.push(extractBlobText(objOrWidget));
  }
  const definition = schema.attribute(attribute);
  if (!definition)
    return;
  const [attributeType] = definition;
  switch (attributeType) {
    case "html":
      collector.push(removeHtmlTags(objOrWidget.get(attribute, "html")));
      break;
    case "string":
      collector.push((0,common/* pruneString */.o8)(objOrWidget.get(attribute, "string")));
      break;
    case "widget": {
      const widget = objOrWidget.get(attribute, "widget");
      if (widget)
        extractTextFromBasicObjOrWidget(widget, collector);
      break;
    }
    case "widgetlist":
      extractWidgetlist(objOrWidget.get(attribute, "widgetlist"), collector);
      break;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/extract_text/extract_text_from_basic_obj_or_widget.ts


function extractTextFromBasicObjOrWidget(objOrWidget, collector) {
  const schema = (0,realm/* schemaFromBasicObjOrWidget */.cv)(objOrWidget);
  if (!schema)
    return;
  for (const attribute of schema.extractTextAttributes()) {
    extractAttribute(objOrWidget, schema, attribute, collector);
    if (collector.isMaxLengthReached())
      break;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/extract_text_from_basic_obj.ts


function extractTextFromBasicObj(obj, maxLength) {
  const collector = new ExtractCollector(maxLength);
  extractTextFromBasicObjOrWidget(obj, collector);
  return collector.toString();
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/extract_text.ts




function extractText(obj, options) {
  checkExtractText(obj, options);
  const basicObj = (0,realm/* unwrapAppClass */.bM)(obj);
  const maxLength = options && options.length ? options.length : 1e9;
  return extractTextFromBasicObj(basicObj, maxLength);
}
const checkExtractText = (0,common/* checkArgumentsFor */.PJ)(
  "extractText",
  [
    ["obj", models/* ObjType */.Bt],
    ["options", common/* tcomb.maybe */.pC.maybe(common/* tcomb.interface */.pC["interface"]({ length: common/* tcomb.maybe */.pC.maybe(common/* PositiveInteger */.nH) }))]
  ],
  { docPermalink: "js-sdk/extractText" }
);

// EXTERNAL MODULE: ./scrivito_sdk/app_support/loading_monitor.ts
var loading_monitor = __webpack_require__(1582);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/is_editor_logged_in.ts

function isEditorLoggedIn() {
  return !!ui_adapter/* uiAdapter */.k;
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/navigate_to.ts
var navigate_to = __webpack_require__(9344);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/open_dialog.ts


function openDialog(name, ...excessArgs) {
  checkOpenDialogArguments(name, ...excessArgs);
  if (ui_adapter/* uiAdapter */.k) {
    ui_adapter/* uiAdapter.openCustomDialog */.k.openCustomDialog(name);
  }
}
const checkOpenDialogArguments = (0,common/* checkArgumentsFor */.PJ)(
  "openDialog",
  [["name", common/* tcomb.String */.pC.String]],
  {
    docPermalink: "js-sdk/openDialog"
  }
);

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/content_dump.ts





function generateContentDump(data, contentStateId) {
  return stringify({
    version: (0,common/* getScrivitoVersion */.ux)(),
    csid: contentStateId,
    recording: (0,loadable/* generateRecording */.oR)(data)
  });
}
function loadContentDump(contentDump) {
  const parsed = parse(contentDump);
  if (!parsed) {
    (0,common/* logError */.H)("could not preload: parsing dump failed");
    return;
  }
  if (!isContentDumpFromThisVersion(parsed)) {
    (0,common/* logError */.H)(
      `could not preload: dump is from version ${parsed.version}, this is version ${(0,common/* getScrivitoVersion */.ux)()}`
    );
    return;
  }
  (0,state/* withBatchedUpdates */.tH)(() => {
    (0,data/* setContentStateId */.Bg)((0,models/* currentWorkspaceId */.tV)(), parsed.csid);
    (0,loadable/* loadRecording */.Mh)(parsed.recording);
  });
}
function stringify(contentDump) {
  return JSON.stringify(contentDump);
}
function parse(stringifiedContentDump) {
  const parsed = parseJsonObject(stringifiedContentDump);
  if (parsed && isMaybeContentDump(parsed))
    return parsed;
}
function parseJsonObject(text) {
  if (text.charAt(0) !== "{")
    return;
  try {
    return JSON.parse(text);
  } catch (error) {
    return;
  }
}
function isMaybeContentDump(parsed) {
  return !!parsed.version;
}
function isContentDumpFromThisVersion(dump) {
  return dump.version === (0,common/* getScrivitoVersion */.ux)();
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/preload.ts
var preload_async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};






function preload(preloadDump, ...excessArgs) {
  return preload_async(this, null, function* () {
    checkPreload(preloadDump, ...excessArgs);
    let dumpLoaded = false;
    if (isVisitorAuthenticationEnabled())
      return { dumpLoaded };
    if (!ui_adapter/* uiAdapter */.k) {
      loadContentDump(preloadDump);
      dumpLoaded = true;
    }
    yield preloadCurrentPage();
    return { dumpLoaded };
  });
}
function preloadCurrentPage() {
  return (0,loadable/* load */.zD)(() => {
    (0,current_page/* currentPage */.lo)();
  });
}
const checkPreload = (0,common/* checkArgumentsFor */.PJ)("preload", [["preloadDump", common/* tcomb.String */.pC.String]], {
  docPermalink: "js-sdk/preload"
});

// EXTERNAL MODULE: ./scrivito_sdk/app_support/auth_groups.ts
var auth_groups = __webpack_require__(5000);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/scale_down_binary.ts
var scale_down_binary = __webpack_require__(9479);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/site_mapping.ts
var site_mapping = __webpack_require__(9823);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/render_page.ts












function renderPage(obj, render, ...excessArgs) {
  (0,data/* assertNotUsingInMemoryTenant */.VJ)("Scrivito.renderPage");
  checkRenderPage(obj, render, ...excessArgs);
  const objSpaceId = (0,models/* currentObjSpaceId */.GD)();
  const page = (0,realm/* unwrapAppClass */.bM)(obj);
  const workspaceId = (0,client.getWorkspaceId)(objSpaceId);
  ensureSiteIsPresent(page, common/* ArgumentError */.ir);
  return (0,data/* trackContentStateId */.PD)(workspaceId).then(() => {
    const contentStateId = (0,data/* getContentStateId */.Dk)(objSpaceId);
    const siteId = ensureSiteIsPresent(page);
    return (0,loadable/* load */.zD)(
      () => (0,loadable/* reportUsedData */.kV)(
        () => (0,data_integration/* disableExternalDataLoading */.m0)(() => {
          const baseUrl = (0,site_mapping/* baseUrlForSite */.XY)(siteId);
          if (!baseUrl) {
            throw new common/* ScrivitoError */.Ix(
              `The obj "${page.id()}" cannot be rendered because the baseUrlForSite callback did not return a URL for its site "${siteId}".`
            );
          }
          const sitePath = `/${page.id()}`;
          return (0,current_page_data/* withCurrentPageContext */.Mw)(
            { page, siteId, baseUrl, sitePath },
            () => {
              (0,routing/* ensureRoutingDataAvailable */.kx)(page);
              return (0,scale_down_binary/* usePrerenderScaling */.R4)(render);
            }
          );
        })
      )
    ).then(({ result, usedData }) => {
      return {
        result,
        preloadDump: generateContentDump(usedData, contentStateId)
      };
    });
  });
}
function ensureSiteIsPresent(page, errorClass = common/* ScrivitoError */.Ix) {
  const siteId = page.siteId();
  if (siteId)
    return siteId;
  throw new errorClass(
    `The obj "${page.id()}" cannot be rendered because it does not have a site ID.`
  );
}
const checkRenderPage = (0,common/* checkArgumentsFor */.PJ)(
  "renderPage",
  [
    ["page", models/* ObjType */.Bt],
    ["render", common/* tcomb.Function */.pC.Function]
  ],
  {
    docPermalink: "js-sdk/renderPage"
  }
);

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/update_content.ts


function updateContent() {
  return (0,data/* updateContent */.x0)((0,models/* currentWorkspaceId */.tV)());
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/basic_url_for.ts
var basic_url_for = __webpack_require__(2225);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/url_for.ts





function urlFor(target, options, ...excessArgs) {
  (0,data/* assertNotUsingInMemoryTenant */.VJ)("Scrivito.urlFor");
  checkUrlFor(target, options, ...excessArgs);
  let query;
  let hash;
  if (options) {
    query = options.query;
    hash = options.hasOwnProperty("hash") ? options.hash : options.fragment;
  }
  return (0,basic_url_for/* basicUrlFor */.M)((0,realm/* unwrapAppClass */.bM)(target), { query, hash });
}
const TargetType = common/* tcomb.union */.pC.union([models/* ObjType */.Bt, models/* LinkType */.Un, models/* BinaryType */.pf]);
const OptionsType = common/* tcomb.interface */.pC["interface"]({
  query: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String),
  hash: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String),
  fragment: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String)
});
const checkUrlFor = (0,common/* checkArgumentsFor */.PJ)(
  "urlFor",
  [
    ["target", TargetType],
    ["options", common/* tcomb.maybe */.pC.maybe(OptionsType)]
  ],
  {
    docPermalink: "js-sdk/urlFor"
  }
);

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/validation_results_stub.ts

function validationResultsFor(model, attributeName) {
  const loadedFn = (0,import_from/* importFrom */.u$)("editingSupport", "validationResultsFor");
  if (!loadedFn)
    return [];
  return loadedFn(model, attributeName);
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/ui_context.ts

function uiContext() {
  var _a;
  return ((_a = ui_adapter/* uiAdapter */.k) == null ? void 0 : _a.getUiContext()) || null;
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/editor_language.ts

function editorLanguage() {
  var _a;
  return ((_a = ui_adapter/* uiAdapter */.k) == null ? void 0 : _a.getUiLanguage()) || null;
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/replace_internal_links.ts
var replace_internal_links = __webpack_require__(5725);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/provide_data_class.ts


function provideDataClass(name, dataClass, ...excessArgs) {
  (0,realm/* checkProvideDataClass */.xu)(name, dataClass, ...excessArgs);
  (0,data_integration/* assertValidDataIdentifier */.kn)(name);
  (0,data_integration/* setExternalDataConnection */.ZV)(name, dataClass.connection);
  return new data_integration/* ExternalDataClass */.Zv(name);
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/provide_data_item.ts


function provideDataItem(name, read, ...excessArgs) {
  (0,realm/* checkProvideDataItem */.yj)(name, read, ...excessArgs);
  (0,data_integration/* assertValidDataIdentifier */.kn)(name);
  return (0,data_integration/* provideExternalDataItem */.C8)(name, read);
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/provide_editing_config.ts
var provide_editing_config = __webpack_require__(4183);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/is_on_current_path.ts




function isOnCurrentPath(page) {
  var _a;
  (0,data/* assertNotUsingInMemoryTenant */.VJ)("Scrivito.isOnCurrentPath");
  (0,common/* checkArgumentsFor */.PJ)("isOnCurrentPath", [["page", models/* ObjType */.Bt]], {
    docPermalink: "js-sdk/isOnCurrentPath"
  })(page);
  const currentPath = (_a = (0,current_page/* currentPage */.lo)()) == null ? void 0 : _a.path();
  const path = page.path();
  if (!currentPath || !path || !currentPath.startsWith(path))
    return false;
  if (currentPath === path || path === "/")
    return true;
  return currentPath.charAt(path.length) === "/";
}

;// CONCATENATED MODULE: ./scrivito_sdk/infopark_integration_test_support.ts



function enableForceVerification() {
  client.cmsRestApi.enableForceVerification();
}
function currentPublicAuthorizationState() {
  return client.cmsRestApi.currentPublicAuthorizationState();
}

;// CONCATENATED MODULE: ./scrivito_sdk/public_api.ts















































;// CONCATENATED MODULE: ./sdk_for_browser.ts


initializeSdk();

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});