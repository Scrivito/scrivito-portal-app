(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@justrelate/slugify"), require("history"), require("lodash-es/debounce"), require("lodash-es/escape"), require("lodash-es/isDate"), require("lodash-es/isEmpty"), require("lodash-es/isEqual"), require("lodash-es/mapValues"), require("lodash-es/memoize"), require("lodash-es/merge"), require("lodash-es/sortBy"), require("lodash-es/unescape"), require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["@justrelate/slugify", "history", "lodash-es/debounce", "lodash-es/escape", "lodash-es/isDate", "lodash-es/isEmpty", "lodash-es/isEqual", "lodash-es/mapValues", "lodash-es/memoize", "lodash-es/merge", "lodash-es/sortBy", "lodash-es/unescape", "react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["scrivito"] = factory(require("@justrelate/slugify"), require("history"), require("lodash-es/debounce"), require("lodash-es/escape"), require("lodash-es/isDate"), require("lodash-es/isEmpty"), require("lodash-es/isEqual"), require("lodash-es/mapValues"), require("lodash-es/memoize"), require("lodash-es/merge"), require("lodash-es/sortBy"), require("lodash-es/unescape"), require("react"), require("react-dom"));
	else
		root["scrivito"] = factory(root["@justrelate/slugify"], root["history"], root["lodash-es/debounce"], root["lodash-es/escape"], root["lodash-es/isDate"], root["lodash-es/isEmpty"], root["lodash-es/isEqual"], root["lodash-es/mapValues"], root["lodash-es/memoize"], root["lodash-es/merge"], root["lodash-es/sortBy"], root["lodash-es/unescape"], root["react"], root["react-dom"]);
})((typeof self !== 'undefined' ? self : global), (__WEBPACK_EXTERNAL_MODULE__5929__, __WEBPACK_EXTERNAL_MODULE__9226__, __WEBPACK_EXTERNAL_MODULE__16__, __WEBPACK_EXTERNAL_MODULE__3444__, __WEBPACK_EXTERNAL_MODULE__8307__, __WEBPACK_EXTERNAL_MODULE__5020__, __WEBPACK_EXTERNAL_MODULE__9477__, __WEBPACK_EXTERNAL_MODULE__7885__, __WEBPACK_EXTERNAL_MODULE__721__, __WEBPACK_EXTERNAL_MODULE__2925__, __WEBPACK_EXTERNAL_MODULE__5682__, __WEBPACK_EXTERNAL_MODULE__3655__, __WEBPACK_EXTERNAL_MODULE__629__, __WEBPACK_EXTERNAL_MODULE__400__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 3617:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   r: () => (/* binding */ absoluteUrl)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4665);


function absoluteUrl(url) {
  return new URL(url, (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .currentHref */ .pb)()).href;
}


/***/ }),

/***/ 1579:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ provideAuthGroups),
/* harmony export */   N: () => (/* binding */ getAuthGroups)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1946);


const authGroupsState = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_0__/* .createStateContainer */ .Ld)();
function provideAuthGroups(authGroups) {
  authGroupsState.set(authGroups);
}
function getAuthGroups() {
  return authGroupsState.get();
}


/***/ }),

/***/ 4572:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dn: () => (/* binding */ isLatestNavigateToCallId),
/* harmony export */   fH: () => (/* binding */ getNextNavigateToCallId),
/* harmony export */   vU: () => (/* binding */ basicNavigateTo)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_browser_location__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9004);
/* harmony import */ var scrivito_sdk_app_support_change_location__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2354);
/* harmony import */ var scrivito_sdk_app_support_destination_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7550);
/* harmony import */ var scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7183);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4665);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4772);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8927);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7461);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1946);

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









let latestCallId = 0;
function getNextNavigateToCallId() {
  latestCallId++;
  return latestCallId;
}
function isLatestNavigateToCallId(callId) {
  return latestCallId === callId;
}
function basicNavigateTo(_0) {
  return __async(this, arguments, function* (target, callId = getNextNavigateToCallId()) {
    (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_8__/* .failIfFrozen */ .q2)("basicNavigateTo");
    const routingTarget = yield (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_5__/* .load */ .Hh)(() => destinationForTarget(target));
    if (isLatestNavigateToCallId(callId)) {
      switch (routingTarget.type) {
        case "remote":
          (0,scrivito_sdk_app_support_change_location__WEBPACK_IMPORTED_MODULE_1__/* .changeLocation */ .Uc)(routingTarget.url);
          break;
        case "local":
          navigateToResource(routingTarget.resource);
          break;
        case "crossSite":
          (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .assignLocation */ .dT)(routingTarget.url);
          break;
        case "unavailable":
          (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .logError */ .vV)(
            `Could not navigate to Obj ${routingTarget.objId}, no URL found`
          );
      }
    }
  });
}
function destinationForTarget(target) {
  if (isUrlRoutingTarget(target)) return destinationForUrl(target.url);
  const { objId, query, hash } = target;
  const obj = scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_6__/* .BasicObj */ .kI.get(objId);
  if (!obj) return (0,scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_3__/* .generateDestinationForId */ .yW)({ objId, query, hash });
  if ((0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_7__/* .isBinaryBasicObj */ .Xg)(obj)) {
    const blob = obj.get("blob", ["binary"]);
    if (!blob) return (0,scrivito_sdk_app_support_destination_types__WEBPACK_IMPORTED_MODULE_2__/* .generateDestinationUnavailable */ .c)({ objId });
    return { type: "remote", url: blob.url() };
  }
  return (0,scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_3__/* .generateDestination */ .uT)({ obj, query, hash });
}
function navigateToResource(resource) {
  const currentResource = scrivito_sdk_app_support_browser_location__WEBPACK_IMPORTED_MODULE_0__/* .get */ .Jt();
  if (resource === currentResource) {
    scrivito_sdk_app_support_browser_location__WEBPACK_IMPORTED_MODULE_0__/* .replace */ .HC(resource);
  } else {
    scrivito_sdk_app_support_browser_location__WEBPACK_IMPORTED_MODULE_0__/* .push */ .VC(resource);
  }
}
function isUrlRoutingTarget(routingTarget) {
  return !!routingTarget.url;
}
function destinationForUrl(url) {
  if (!URL.canParse(url)) return { type: "local", resource: url };
  if ((0,scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_3__/* .isOriginLocal */ .Im)(url)) {
    if (!(0,scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_3__/* .isSiteLocal */ .zX)(url)) return { type: "crossSite", url };
    return {
      type: "local",
      resource: (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .urlResource */ .ix)(new URL(url))
    };
  }
  return { type: "remote", url };
}


/***/ }),

/***/ 5112:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ basicUrlFor),
/* harmony export */   a: () => (/* binding */ basicUrlForObj)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7183);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4665);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8927);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7461);

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
  if (target instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__/* .BasicLink */ .Re) return urlForLink(target, options);
  if (target instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__/* .Binary */ .yI) return target.url();
  return basicUrlForObj(target, options);
}
function basicUrlForObj(obj, options) {
  if ((0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_3__/* .isBinaryBasicObj */ .Xg)(obj)) {
    const binaryUrl = urlForBinaryObj(obj, options.preserveObjId);
    if (binaryUrl) return binaryUrl;
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
  if (link.isExternal()) return link.url();
  const obj = link.obj();
  if (obj instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__/* .BasicObj */ .kI) {
    return basicUrlForObj(obj, populateMissingOptionsFromLink(options, link));
  }
  throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .ArgumentError */ .c1("Missing link target.");
}
function urlForNonBinaryObj(obj, { query: queryString, queryParameters, withoutOriginIfLocal, hash }) {
  const query = queryParameters != null ? queryParameters : queryString;
  if (!withoutOriginIfLocal) {
    return (0,scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_0__/* .generateUrlWithCanonicalOrigin */ .xu)({ obj, query, hash });
  }
  const destination = (0,scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_0__/* .generateDestination */ .uT)({ obj, query, hash });
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

/***/ 9004:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GL: () => (/* binding */ getHistoryState),
/* harmony export */   HC: () => (/* binding */ replace),
/* harmony export */   Jt: () => (/* binding */ get),
/* harmony export */   VC: () => (/* binding */ push),
/* harmony export */   W6: () => (/* binding */ useHistory),
/* harmony export */   lQ: () => (/* binding */ getHistoryChangesCount),
/* harmony export */   zE: () => (/* binding */ isCurrentHistoryState)
/* harmony export */ });
/* unused harmony exports reset, createInitialHistory */
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9226);
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(history__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4665);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1946);




let currentHistory;
let unlistenToHistory;
let lastAction;
function useHistory(historyToUse) {
  if (historyToUse.createHref({ pathname: "/" }) !== "/") {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .ArgumentError */ .c1(
      `Expected a history without a preconfigured basename. For further details, see: ${(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .docUrl */ .yJ)("js-sdk/useHistory")}`
    );
  }
  if (historyToUse === currentHistory) {
    return;
  }
  const isFirstHistory = !currentHistory;
  listenToHistory(historyToUse);
  currentHistory = historyToUse;
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
  return (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .urlResource */ .ix)(getHistory().location);
}
function getHistoryChangesCount() {
  return historyChangesCountState.get() || 0;
}
function push(resource) {
  getHistory().push(toLocation(resource));
}
function replace(resource) {
  getHistory().replace(toLocation(resource));
}
function toLocation(resource) {
  const url = new URL(get(), "http://example.com");
  const { pathname, search, hash } = new URL(resource, url);
  return { pathname, search, hash };
}
function isCurrentHistoryState(historyState) {
  return historyState.historyChangesCount === getHistoryChangesCount();
}
function reset() {
  currentHistory = void 0;
  lastAction = void 0;
  unlistenToHistory = void 0;
  historyChangesCountState.clear();
}
function createInitialHistory() {
  return (0,history__WEBPACK_IMPORTED_MODULE_0__.createBrowserHistory)();
}
function ensureHistory() {
  if (!currentHistory) {
    useHistory(createInitialHistory());
  }
}
function getHistory() {
  ensureHistory();
  return currentHistory;
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
const historyChangesCountState = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_2__/* .createStateContainer */ .Ld)();
function isHistoryV4(historyToCheck) {
  return historyToCheck.hasOwnProperty("length");
}
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .onReset */ .Nj)(reset);


/***/ }),

/***/ 5057:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ canEditObjWithId),
/* harmony export */   p: () => (/* binding */ canEdit)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5460);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4665);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4772);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8927);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7461);






function canEdit(obj) {
  checkCanEditArguments(obj);
  return canEditObjWithId((0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__/* .unwrapAppClass */ .zo)(obj).id());
}
function canEditObjWithId(objId) {
  const ui = scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__/* .uiAdapter */ .B;
  if (!ui) return false;
  return (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_2__/* .loadWithDefault */ .qt)(false, () => ui.canEdit((0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__/* .currentWorkspaceId */ .o_)(), objId)) || false;
}
function checkCanEditArguments(obj) {
  if (!(0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__/* .isWrappingBasicObj */ .mD)(obj)) {
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .throwInvalidArgumentsError */ .Ht)(
      "canEdit",
      "'obj' must be an instance of 'Obj'.",
      { docPermalink: "js-sdk/canEdit" }
    );
  }
}


/***/ }),

/***/ 2354:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EV: () => (/* binding */ openInNewWindow),
/* harmony export */   NA: () => (/* binding */ redirectToUrl),
/* harmony export */   Uc: () => (/* binding */ changeLocation)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5460);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4665);
/* harmony import */ var _routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7183);




function redirectToUrl(url) {
  if (scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__/* .uiAdapter */ .B) changeLocation(url);
  else (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .replaceLocation */ ._0)(url);
}
function changeLocation(url) {
  if (scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__/* .uiAdapter */ .B) {
    scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__/* .uiAdapter */ .B.navigateToExternalUrl(url);
  } else {
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .assignLocation */ .dT)(url);
  }
}
function openInNewWindow(url) {
  if (scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__/* .uiAdapter */ .B && (0,_routing__WEBPACK_IMPORTED_MODULE_2__/* .isOriginLocal */ .Im)(url)) {
    scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__/* .uiAdapter */ .B.openInNewUiWindow(convertToAbsoluteLocalUrl(url));
  } else {
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .openWindow */ .D1)(url, "_blank");
  }
}
function convertToAbsoluteLocalUrl(url) {
  const origin = (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .currentOrigin */ .u4)();
  if (origin === void 0) throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .InternalError */ .Gd();
  return new URL(url, origin).href;
}


/***/ }),

/***/ 349:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ getContentBrowserConfiguration),
/* harmony export */   w: () => (/* binding */ configureContentBrowser)
/* harmony export */ });
/* harmony import */ var lodash_es_mapValues__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7885);
/* harmony import */ var lodash_es_mapValues__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_es_mapValues__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_absolute_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3617);
/* harmony import */ var scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5460);
/* harmony import */ var scrivito_sdk_app_support_ui_adapter_compatible_value__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7283);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4665);

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
function configureContentBrowser(configuration) {
  if (!scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_2__/* .uiAdapter */ .B) {
    return;
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
      scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_2__/* .uiAdapter */ .B.configureContentBrowser(
        (0,scrivito_sdk_app_support_ui_adapter_compatible_value__WEBPACK_IMPORTED_MODULE_3__/* .uiAdapterCompatibleValue */ .n)({ baseQuery })
      );
    }
  }
}
function isFilterBuilder(maybeFilterBuilder) {
  return typeof maybeFilterBuilder === "function";
}
function copyWithAbsoluteUrls(contentBrowserFilters) {
  return lodash_es_mapValues__WEBPACK_IMPORTED_MODULE_0___default()(contentBrowserFilters, (_a) => {
    var item = __objRest(_a, []);
    const { icon, options } = item;
    const hasCustomIcon = icon && !icon.match(/^\w+$/);
    if (icon) item.icon = hasCustomIcon ? (0,scrivito_sdk_app_support_absolute_url__WEBPACK_IMPORTED_MODULE_1__/* .absoluteUrl */ .r)(icon) : icon;
    if (options) item.options = copyWithAbsoluteUrls(options);
    return item;
  });
}
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .onReset */ .Nj)(() => {
  filters = void 0;
  filtersBuilder = void 0;
});


/***/ }),

/***/ 2726:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ configureObjClassForContentType),
/* harmony export */   p: () => (/* binding */ getObjClassForContentTypeMapping)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4665);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1946);



const state = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__/* .createStateContainer */ .Ld)();
function getObjClassForContentTypeMapping() {
  return state.get();
}
function configureObjClassForContentType(configuration) {
  checkConfigureObjClassForContentType(configuration);
  if (!configuration["*/*"]) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ArgumentError */ .c1(
      'No ObjClass has been configured for the contentType "*/*"'
    );
  }
  if (state.get() !== void 0) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ScrivitoError */ .aS(
      "configureObjClassForContentType must be called only once"
    );
  }
  state.set(configuration);
}
function checkConfigureObjClassForContentType(configuration) {
  Object.keys(configuration).forEach((contentType) => {
    if (!/^(\*\/\*|[^\/\*]+\/(\*|[^\*;]+))$/.test(contentType)) {
      (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .throwInvalidArgumentsError */ .Ht)(
        "configureObjClassForContentType",
        `Content type '${contentType}' is not valid.`,
        { docPermalink: "js-sdk/configureObjClassForContentType" }
      );
    }
  });
}


/***/ }),

/***/ 1728:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ setConstraintsValidationCallback),
/* harmony export */   v: () => (/* binding */ getConstraintsValidationCallback)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4665);


let constraintsValidationCallback;
function setConstraintsValidationCallback(callback) {
  constraintsValidationCallback = callback;
}
function getConstraintsValidationCallback() {
  if (constraintsValidationCallback) {
    return constraintsValidationCallback;
  }
  throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ScrivitoError */ .aS(
    'Constraints validation callback is not configured. Forgot to call Scrivito.configure with the "constraintsCallback" option?'
  );
}
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .onReset */ .Nj)(() => constraintsValidationCallback = void 0);


/***/ }),

/***/ 5015:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ shouldContentTagsForEmptyAttributesBeSkipped),
/* harmony export */   l: () => (/* binding */ skipContentTagsForEmptyAttributes)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1946);


const contentTagsForEmptyAttributes = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_0__/* .createStateContainer */ .Ld)();
function skipContentTagsForEmptyAttributes() {
  contentTagsForEmptyAttributes.set(false);
}
function shouldContentTagsForEmptyAttributesBeSkipped() {
  return contentTagsForEmptyAttributes.get() === false;
}


/***/ }),

/***/ 6942:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ getCropAspectRatios),
/* harmony export */   x: () => (/* binding */ configureCropAspectRatios)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4665);


let cropAspectRatioConfig;
function configureCropAspectRatios(cropAspectRatios) {
  cropAspectRatioConfig = [...cropAspectRatios];
}
function getCropAspectRatios() {
  return cropAspectRatioConfig;
}
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .onReset */ .Nj)(() => {
  cropAspectRatioConfig = void 0;
});


/***/ }),

/***/ 1048:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ currentAppSpace)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_editing_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1616);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8927);



function currentAppSpace() {
  const currentObjSpace = (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__/* .objSpaceScope */ .aG)((0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__/* .currentObjSpaceId */ .eb)());
  return (0,scrivito_sdk_app_support_editing_context__WEBPACK_IMPORTED_MODULE_0__/* .isComparisonActive */ .gY)() ? currentObjSpace : currentObjSpace.and(scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__/* .excludeDeletedObjs */ .cb);
}


/***/ }),

/***/ 7639:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F2: () => (/* binding */ currentPage),
/* harmony export */   Jm: () => (/* binding */ setCustomComponentSiteId),
/* harmony export */   OI: () => (/* binding */ currentSiteId),
/* harmony export */   P$: () => (/* binding */ isCurrentPage),
/* harmony export */   R3: () => (/* binding */ currentPageParams),
/* harmony export */   wF: () => (/* binding */ withDefaultSiteContext),
/* harmony export */   wj: () => (/* binding */ withForbiddenSiteContext)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_current_page_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5634);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4665);
/* harmony import */ var scrivito_sdk_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7164);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8927);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7461);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1946);







function currentPage() {
  var _a;
  (0,scrivito_sdk_data__WEBPACK_IMPORTED_MODULE_2__/* .assertNotUsingInMemoryTenant */ .C_)("Scrivito.currentPage");
  const page = (_a = (0,scrivito_sdk_app_support_current_page_data__WEBPACK_IMPORTED_MODULE_0__/* .getCurrentPageData */ .Vd)()) == null ? void 0 : _a.currentPage;
  return page ? (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__/* .wrapInAppClass */ .Dy)(page) : null;
}
function isCurrentPage(page) {
  var _a;
  (0,scrivito_sdk_data__WEBPACK_IMPORTED_MODULE_2__/* .assertNotUsingInMemoryTenant */ .C_)("Scrivito.isCurrentPage");
  checkIsCurrentPage(page);
  return ((_a = currentPage()) == null ? void 0 : _a.id()) === page.id();
}
function currentPageParams() {
  var _a;
  (0,scrivito_sdk_data__WEBPACK_IMPORTED_MODULE_2__/* .assertNotUsingInMemoryTenant */ .C_)("Scrivito.currentPageParams");
  return (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .parseQueryToQueryParameters */ .zw)(((_a = (0,scrivito_sdk_app_support_current_page_data__WEBPACK_IMPORTED_MODULE_0__/* .getCurrentRoute */ .$V)()) == null ? void 0 : _a.query) || "");
}
const currentSiteContext = new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .ContextContainer */ .hl();
const forbiddenSiteContext = new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .ContextContainer */ .hl();
function currentSiteId() {
  var _a, _b, _c, _d;
  const errorMessage = forbiddenSiteContext.current();
  if (errorMessage) throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .ScrivitoError */ .aS(errorMessage);
  const customComponentSiteId = customComponentSiteIdState.get();
  if (customComponentSiteId !== void 0) return customComponentSiteId;
  return (_d = (_c = currentSiteContext.current()) != null ? _c : (_b = (_a = (0,scrivito_sdk_app_support_current_page_data__WEBPACK_IMPORTED_MODULE_0__/* .getCurrentRoute */ .$V)()) == null ? void 0 : _a.siteData) == null ? void 0 : _b.siteId) != null ? _d : null;
}
function withDefaultSiteContext(fn) {
  return currentSiteContext.runWith("default", fn);
}
function withForbiddenSiteContext(message, fn) {
  return forbiddenSiteContext.runWith(message, fn);
}
const customComponentSiteIdState = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_5__/* .createStateContainer */ .Ld)();
function setCustomComponentSiteId(siteId) {
  customComponentSiteIdState.set(siteId);
}
function checkIsCurrentPage(obj) {
  if (!(0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__/* .isWrappingBasicObj */ .mD)(obj)) {
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .throwInvalidArgumentsError */ .Ht)(
      "isCurrentPage",
      "'obj' must be an instance of 'Obj'.",
      {
        docPermalink: "js-sdk/isCurrentPage"
      }
    );
  }
}


/***/ }),

/***/ 5634:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $V: () => (/* binding */ getCurrentRoute),
/* harmony export */   OU: () => (/* binding */ withCurrentPageContext),
/* harmony export */   Vd: () => (/* binding */ getCurrentPageData),
/* harmony export */   tj: () => (/* binding */ setNavigationStateProvider),
/* harmony export */   uR: () => (/* binding */ getNotFoundErrorPageState)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_current_app_space__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1048);
/* harmony import */ var scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7183);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4665);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4772);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8927);

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
const navigationContext = new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .ContextContainer */ .hl();
function getCurrentPageData() {
  return (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_3__/* .loadableWithDefault */ .s4)(void 0, () => {
    var _a;
    const navigationState = (_a = navigationContext.current()) != null ? _a : getCurrentNavigationState();
    if (!navigationState) return void 0;
    const route = navigationState.locationRoute;
    if (route.objId) {
      const currentPage = (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .getObjFrom */ .ED)((0,scrivito_sdk_app_support_current_app_space__WEBPACK_IMPORTED_MODULE_0__/* .currentAppSpace */ .p)(), route.objId);
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
  const navigationState = (_a = navigationContext.current()) != null ? _a : (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_3__/* .loadableWithDefault */ .s4)(void 0, getCurrentNavigationState);
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
  if (navigationContext.current()) return;
  const navigationState = (_a = getCurrentPageData()) == null ? void 0 : _a.navigationState;
  if (!navigationState) return;
  if (!(0,scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_1__/* .isObjNotFoundRoute */ .UO)(navigationState.locationRoute)) return;
  return navigationState;
}


/***/ }),

/***/ 7550:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ recognizeDestinationUnavailable),
/* harmony export */   c: () => (/* binding */ generateDestinationUnavailable)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4665);


function generateDestinationUnavailable(params) {
  return {
    type: "unavailable",
    fallbackUrl: getDestinationUnavailableFallbackUrl(params),
    objId: params.objId
  };
}
function recognizeDestinationUnavailable(fallbackUri) {
  const fallbackUrl = new URL(fallbackUri, "http://example.com");
  if (fallbackUrl.pathname !== "/") return null;
  const fallbackHash = fallbackUrl.hash;
  if (fallbackHash.indexOf("#SCRIVITO_UNAVAILABLE_") === 0) {
    const encodedParams = fallbackHash.substr("#SCRIVITO_UNAVAILABLE_".length);
    const paramsUrl = new URL(encodedParams, "http://example.com");
    const objId = paramsUrl.pathname.substring(1);
    const params = { objId };
    if (paramsUrl.search) params.query = paramsUrl.search.substring(1);
    if (paramsUrl.hash) params.hash = paramsUrl.hash;
    return params;
  }
  return null;
}
function getDestinationUnavailableFallbackUrl({
  hash,
  objId,
  query
}) {
  const search = query ? `?${typeof query === "string" ? query : (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .buildQueryString */ .Go)(query)}` : "";
  return `#SCRIVITO_UNAVAILABLE_${objId}${search}${hash || ""}`;
}


/***/ }),

/***/ 5662:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ getDocumentTitle),
/* harmony export */   g: () => (/* binding */ observeDocumentTitle)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1946);


const state = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_0__/* .createStateContainer */ .Ld)();
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

/***/ 2295:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ setEditingConfigFor),
/* harmony export */   u: () => (/* binding */ getEditingConfigFor)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4665);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1946);



class EditingConfigStore {
  constructor() {
    this.store = {};
    this.updateCounter = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__/* .createStateContainer */ .Ld)();
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
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .onReset */ .Nj)(() => editingConfigStore.clear());


/***/ }),

/***/ 1616:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HD: () => (/* binding */ isInPlaceEditingActive),
/* harmony export */   a_: () => (/* binding */ initializeEditingContextFromBrowsingContext),
/* harmony export */   gY: () => (/* binding */ isComparisonActive)
/* harmony export */ });
/* unused harmony exports setIsInPlaceEditingActive, setIsComparisonActive */
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4665);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8927);



let inPlaceEditingActive = false;
let comparisonActive = false;
function initializeEditingContextFromBrowsingContext(browsingContextName) {
  const editingContext = editingContextFromBrowsingContext(browsingContextName);
  if (!editingContext.workspaceId) {
    (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__/* .setCurrentWorkspaceId */ .st)("published");
    return false;
  }
  (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__/* .setCurrentWorkspaceId */ .st)(editingContext.workspaceId);
  inPlaceEditingActive = !!editingContext.inPlaceEditingActive;
  comparisonActive = !inPlaceEditingActive && !!editingContext.comparisonActive;
  return true;
}
function editingContextFromBrowsingContext(browsingContextName) {
  const markerIndex = browsingContextName.indexOf(" _scrivito {");
  if (markerIndex === -1) return {};
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
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .onReset */ .Nj)(() => {
  inPlaceEditingActive = false;
  comparisonActive = false;
});


/***/ }),

/***/ 2026:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ getExtensionsUrl),
/* harmony export */   s: () => (/* binding */ setExtensionsUrl)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4665);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1946);



const extensionsUrl = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__/* .createStateContainer */ .Ld)();
function setExtensionsUrl(url) {
  extensionsUrl.set(url);
}
function getExtensionsUrl() {
  const url = extensionsUrl.get();
  if (url) return new URL(url, (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .currentOrigin */ .u4)()).toString();
}


/***/ }),

/***/ 5584:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ setForcedEditorLanguage),
/* harmony export */   V: () => (/* binding */ getForcedEditorLanguage)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1946);


const forcedEditorLanguage = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_0__/* .createStateContainer */ .Ld)();
function setForcedEditorLanguage(language) {
  forcedEditorLanguage.set(language);
}
function getForcedEditorLanguage() {
  return forcedEditorLanguage.get();
}


/***/ }),

/***/ 7717:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ getClassName)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4665);
/* harmony import */ var scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2836);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7461);




function getClassName(subject) {
  var _a;
  if (typeof subject === "string") return subject;
  if (subject instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__/* .DataClass */ .bA) {
    return subject.name();
  }
  if (subject instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__/* .DataItem */ .sO) {
    return subject.dataClassName();
  }
  const className = (_a = scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_2__/* .Schema */ .Sj.forClass(subject)) == null ? void 0 : _a.name();
  if (typeof className !== "string") {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ArgumentError */ .c1("Invalid class name, class or instance");
  }
  return className;
}


/***/ }),

/***/ 8848:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ getComparisonRange)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5460);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8927);



function getComparisonRange() {
  var _a;
  return ((_a = scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__/* .uiAdapter */ .B) == null ? void 0 : _a.comparisonRange()) || (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__/* .comparisonFromPublished */ .w2)();
}


/***/ }),

/***/ 4404:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ getCurrentPageId)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_navigation_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9286);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4772);



function getCurrentPageId() {
  return (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_1__/* .loadableWithDefault */ .s4)(
    void 0,
    () => {
      var _a, _b;
      return (_b = (_a = (0,scrivito_sdk_app_support_navigation_state__WEBPACK_IMPORTED_MODULE_0__/* .getCurrentNavigationState */ .$0)()) == null ? void 0 : _a.locationRoute) == null ? void 0 : _b.objId;
    }
  );
}


/***/ }),

/***/ 2117:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ getDetailsPageAndQuery),
/* harmony export */   p: () => (/* binding */ getDetailsPageUrl)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_basic_url_for__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5112);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4665);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8927);




function getDetailsPageUrl(dataItem, siteId) {
  const detailsPageAndQuery = getDetailsPageAndQuery(dataItem, siteId);
  if (!detailsPageAndQuery) return null;
  const { detailsPage, queryString } = detailsPageAndQuery;
  return (0,scrivito_sdk_app_support_basic_url_for__WEBPACK_IMPORTED_MODULE_0__/* .basicUrlForObj */ .a)(detailsPage, { query: queryString });
}
function getDetailsPageAndQuery(dataItem, siteId) {
  const dataClassName = dataItem.dataClassName();
  const detailsPage = (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__/* .getDetailsPageForDataParam */ .mM)(dataClassName, siteId);
  if (!detailsPage) return null;
  const paramName = (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .parameterizeDataClass */ .gi)(dataClassName);
  const paramValue = dataItem.id();
  const queryParameters = { [paramName]: paramValue };
  const queryString = [paramName, paramValue].join("=");
  return { detailsPage, queryParameters, queryString };
}


/***/ }),

/***/ 2109:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ getEditorAuthToken)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_treat_localhost_like__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5302);
/* harmony import */ var scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5460);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4665);




function getEditorAuthToken({
  audience,
  authViaAccount,
  authViaInstance
}) {
  var _a;
  const data = (_a = scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .uiAdapter */ .B) == null ? void 0 : _a.getEditorAuthToken({
    audience,
    authViaAccount,
    authViaInstance,
    treatLocalhostLike: (0,scrivito_sdk_app_support_treat_localhost_like__WEBPACK_IMPORTED_MODULE_0__/* .getTreatLocalhostLike */ .d)()
  });
  if (!data) return;
  if ("error" in data) throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .ScrivitoError */ .aS(data.error);
  return data.token;
}


/***/ }),

/***/ 9708:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ setHasComponentHandler),
/* harmony export */   I: () => (/* binding */ hasComponent)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4665);


let hasComponentHandler;
function hasComponent(name) {
  if (!hasComponentHandler) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .InternalError */ .Gd();
  }
  return hasComponentHandler(name);
}
function setHasComponentHandler(func) {
  hasComponentHandler = func;
}


/***/ }),

/***/ 8261:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ getInitialContentDumpUrl),
/* harmony export */   d: () => (/* binding */ setInitialContentDumpUrl)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4665);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1946);



const initialContentDumpUrl = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__/* .createStateContainer */ .Ld)();
function setInitialContentDumpUrl(url) {
  try {
    new URL(url);
  } catch (e) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ArgumentError */ .c1(
      "'initialContentDumpUrl' must be an absolute URL with protocol"
    );
  }
  initialContentDumpUrl.set(url);
}
function getInitialContentDumpUrl() {
  return initialContentDumpUrl.get();
}


/***/ }),

/***/ 838:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OG: () => (/* binding */ initializeContentForObj),
/* harmony export */   T6: () => (/* binding */ initializeContentForWidget),
/* harmony export */   hF: () => (/* binding */ initialContentFor)
/* harmony export */ });
/* harmony import */ var lodash_es_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5020);
/* harmony import */ var lodash_es_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_es_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_editing_config_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2295);
/* harmony import */ var scrivito_sdk_app_support_present_ui_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7272);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4772);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8927);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7461);

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






function initialContentFor(className, attributeName) {
  var _a;
  const initialContent = (_a = (0,scrivito_sdk_app_support_editing_config_store__WEBPACK_IMPORTED_MODULE_1__/* .getEditingConfigFor */ .u)(className)) == null ? void 0 : _a.initialContent;
  if (initialContent) {
    const attributeContent = initialContent[attributeName];
    if (typeof attributeContent === "function") {
      return attributeContent();
    }
    if (isWidget(attributeContent)) {
      return (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__/* .wrapInAppClass */ .Dy)(attributeContent._scrivitoPrivateContent.copy());
    }
    if (isWidgetlist(attributeContent)) {
      return attributeContent.map((widget) => {
        const basicWidget = widget._scrivitoPrivateContent;
        const copy = basicWidget.copy();
        return (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__/* .wrapInAppClass */ .Dy)(copy);
      });
    }
    return attributeContent;
  }
}
function isWidgetlist(maybeWidgetlist) {
  return Array.isArray(maybeWidgetlist) && maybeWidgetlist.every(isWidget);
}
function isWidget(maybeWidget) {
  return !!maybeWidget && maybeWidget._scrivitoPrivateContent instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .BasicWidget */ .$R;
}
function initializeContentForObj(objId) {
  return __async(this, null, function* () {
    const basicObj = yield (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_3__/* .load */ .Hh)(() => scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .BasicObj */ .kI.get(objId));
    if (basicObj) {
      initializeContentFor(basicObj);
      initializeContentFromHook(basicObj);
    }
  });
}
function initializeContentForWidget(objId, widgetId) {
  return __async(this, null, function* () {
    const basicObj = yield (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_3__/* .load */ .Hh)(() => scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .BasicObj */ .kI.get(objId));
    if (!basicObj) return;
    yield (0,scrivito_sdk_app_support_present_ui_adapter__WEBPACK_IMPORTED_MODULE_2__/* .presentUiAdapter */ .H)().finishReplicatingObj((0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .currentObjSpaceId */ .eb)(), objId);
    const basicWidget = basicObj.widget(widgetId);
    if (basicWidget) {
      initializeContentFor(basicWidget);
      initializeContentFromHook(basicWidget);
    }
  });
}
function initializeContentFor(basicContent) {
  const objClassName = basicContent.objClass();
  const schema = (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__/* .schemaFromBasicObjOrWidget */ .e6)(basicContent);
  if (!schema) return;
  const initialAttributes = {};
  Object.keys(schema.attributes()).forEach((attributeName) => {
    const typeInfo = schema.attributes()[attributeName];
    const currentValue = basicContent.get(attributeName, typeInfo);
    if (lodash_es_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(currentValue)) {
      const initialValue = initialContentFor(objClassName, attributeName);
      if (initialValue !== void 0) {
        initialAttributes[attributeName] = initialValue;
      }
    }
  });
  const attributesWithTypeInfo = (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__/* .unwrapAppAttributes */ .OE)(
    initialAttributes,
    schema,
    objClassName
  );
  basicContent.update(attributesWithTypeInfo);
}
function initializeContentFromHook(content) {
  var _a;
  const callback = (_a = (0,scrivito_sdk_app_support_editing_config_store__WEBPACK_IMPORTED_MODULE_1__/* .getEditingConfigFor */ .u)(content.objClass())) == null ? void 0 : _a.initialize;
  if (callback) callback((0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__/* .wrapInAppClass */ .Dy)(content));
}


/***/ }),

/***/ 5788:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ak: () => (/* binding */ getMenuHandler),
  sO: () => (/* binding */ getMenuPatch),
  xi: () => (/* binding */ updateMenuExtensions)
});

// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(1946);
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

// EXTERNAL MODULE: ./scrivito_sdk/app_support/absolute_url.ts
var absolute_url = __webpack_require__(3617);
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
  insert(customMenuItem) {
    this.patch.insertIds = Array.from(
      new Set(this.patch.insertIds).add(customMenuItem.id)
    );
    const { description, group, position, title } = customMenuItem;
    const item = {};
    if (description !== void 0) item.description = description;
    if (group !== void 0) item.group = group;
    if (position) item.position = position;
    if (title !== void 0) item.title = title;
    if ("enabled" in customMenuItem) item.enabled = !!customMenuItem.enabled;
    this.patch.items[customMenuItem.id] = __spreadValues(__spreadValues({}, item), iconPatch(customMenuItem.icon));
  }
  modify(menuItem) {
    const { group, position, title } = menuItem;
    const item = {};
    if (group !== void 0) item.group = group;
    if (position) item.position = position;
    if (title !== void 0) item.title = title;
    this.patch.modifyItems[menuItem.id] = __spreadValues(__spreadValues(__spreadValues({}, this.patch.modifyItems[menuItem.id]), item), iconPatch(menuItem.icon));
  }
  remove(id) {
    this.patch.removeIds.push(id);
  }
  getPatch() {
    return this.patch;
  }
}
function iconPatch(icon) {
  return icon ? { icon: (0,absolute_url/* absoluteUrl */.r)(icon) } : {};
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/menu/menu_registry.ts
var menu_registry = __webpack_require__(1121);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/menu.ts





const counterState = (0,state/* createStateContainer */.Ld)();
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
  (0,menu_registry/* getMenuCallbacks */.A)().forEach(
    (menuCallback) => menuCallback.call(null, builder)
  );
}
function getCounter() {
  return counterState.get();
}


/***/ }),

/***/ 1121:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getMenuCallbacks),
/* harmony export */   m: () => (/* binding */ registerMenuCallback)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4665);


let menuCallbacks = [];
function registerMenuCallback(menuCallback) {
  menuCallbacks.push(menuCallback);
}
function getMenuCallbacks() {
  return menuCallbacks;
}
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .onReset */ .Nj)(() => menuCallbacks = []);


/***/ }),

/***/ 3721:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ navigateTo)
/* harmony export */ });
/* unused harmony export navigateToAsync */
/* harmony import */ var lodash_es_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5020);
/* harmony import */ var lodash_es_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_es_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_basic_navigate_to__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4572);
/* harmony import */ var scrivito_sdk_app_support_current_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7639);
/* harmony import */ var scrivito_sdk_app_support_get_details_page_url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2117);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4665);
/* harmony import */ var scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2836);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4772);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8927);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7461);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1946);

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










function navigateTo(target, options) {
  navigateToAsync(target, options);
}
function navigateToAsync(target, options) {
  return __async(this, null, function* () {
    const callId = (0,scrivito_sdk_app_support_basic_navigate_to__WEBPACK_IMPORTED_MODULE_1__/* .getNextNavigateToCallId */ .fH)();
    (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_9__/* .failIfFrozen */ .q2)("navigateTo");
    if (target === null) return;
    const navigateToOptions = getNavigateToOptions(options);
    if (target instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_5__/* .DataItem */ .sO) {
      yield navigateToDataItem(target, navigateToOptions, callId);
    } else {
      navigateToTarget(target, callId, navigateToOptions);
    }
  });
}
function navigateToTarget(target, callId, options) {
  return __async(this, null, function* () {
    try {
      const evaluatedTarget = yield (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_6__/* .load */ .Hh)(
        () => typeof target === "function" ? target() : target
      );
      const basicTarget = (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_8__/* .unwrapAppClass */ .zo)(evaluatedTarget);
      if (typeof basicTarget === "string") {
        assertAbsoluteUrl(basicTarget);
        return (0,scrivito_sdk_app_support_basic_navigate_to__WEBPACK_IMPORTED_MODULE_1__/* .basicNavigateTo */ .vU)({ url: basicTarget }, callId);
      }
      if (!isBasicTarget(basicTarget)) return;
      return (0,scrivito_sdk_app_support_basic_navigate_to__WEBPACK_IMPORTED_MODULE_1__/* .basicNavigateTo */ .vU)(
        yield loadRoutingTarget(basicTarget, options),
        callId
      );
    } catch (e) {
      if ((0,scrivito_sdk_app_support_basic_navigate_to__WEBPACK_IMPORTED_MODULE_1__/* .isLatestNavigateToCallId */ .Dn)(callId)) (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .throwNextTick */ .JL)(e);
    }
  });
}
function navigateToDataItem(_0, _1, _2) {
  return __async(this, arguments, function* (dataItem, {
    queryParameters: optionalParameters,
    hash
  }, callId) {
    const pageAndQuery = yield (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_6__/* .load */ .Hh)(
      () => (0,scrivito_sdk_app_support_get_details_page_url__WEBPACK_IMPORTED_MODULE_3__/* .getDetailsPageAndQuery */ .Z)(dataItem, (0,scrivito_sdk_app_support_current_page__WEBPACK_IMPORTED_MODULE_2__/* .currentSiteId */ .OI)())
    );
    if (pageAndQuery) {
      const { detailsPage, queryParameters: requiredParameters } = pageAndQuery;
      if (optionalParameters) {
        assertNoParametersConflict(requiredParameters, optionalParameters);
      }
      return (0,scrivito_sdk_app_support_basic_navigate_to__WEBPACK_IMPORTED_MODULE_1__/* .basicNavigateTo */ .vU)(
        {
          objId: detailsPage.id(),
          query: __spreadValues(__spreadValues({}, requiredParameters), optionalParameters),
          hash
        },
        callId
      );
    }
  });
}
function assertNoParametersConflict(requiredParameters, optionalParameters) {
  Object.entries(optionalParameters).forEach(([key, value]) => {
    if (requiredParameters[key] === value) {
      throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .ArgumentError */ .c1(
        `Query parameter "${key}" is reserved for internal usage`
      );
    }
  });
}
function loadRoutingTarget(basicTarget, options) {
  return __async(this, null, function* () {
    const routingTarget = yield (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_6__/* .load */ .Hh)(
      () => getRoutingTarget(basicTarget, options.queryParameters, options.hash)
    );
    if (!routingTarget) {
      throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .ArgumentError */ .c1(
        "The link provided to navigateTo has no destination."
      );
    }
    return routingTarget;
  });
}
function isBasicTarget(target) {
  return target instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_7__/* .BasicObj */ .kI || target instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_7__/* .BasicLink */ .Re;
}
function getNavigateToOptions(options) {
  if (!options) return { hash: null, queryParameters: void 0 };
  const _a = options, { hash, params } = _a, convenienceParams = __objRest(_a, ["hash", "params"]);
  return {
    hash: hash || null,
    queryParameters: __spreadValues(__spreadValues({}, convenienceParams), params)
  };
}
function getRoutingTarget(target, query, hash) {
  if (target instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_7__/* .BasicLink */ .Re) {
    return getRoutingTargetFromLink(target, query, hash);
  }
  return { objId: target.id(), query, hash };
}
function getRoutingTargetFromLink(link, query, hash) {
  if (link.isExternal()) return { url: link.url() };
  const obj = link.obj();
  const objId = obj instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_7__/* .BasicObj */ .kI ? obj.id() : link.objId();
  if (!objId) return;
  return {
    objId,
    query: !lodash_es_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(query) ? query : link.queryParameters(),
    hash: hash || link.hash()
  };
}
function assertAbsoluteUrl(url) {
  if (!URL.canParse(url)) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_4__/* .ArgumentError */ .c1(
      `Scrivito.navigateTo was called with a relative URL "${url}". When called with a string, Scrivito.navigateTo only accepts absolute URLs.`
    );
  }
}


/***/ }),

/***/ 9286:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $0: () => (/* binding */ getCurrentNavigationState),
/* harmony export */   aM: () => (/* binding */ forceNavigationStateNotResponsible)
/* harmony export */ });
/* unused harmony exports setRecognizedSiteId, resetRecognizedSiteId */
/* harmony import */ var scrivito_sdk_app_support_basic_navigate_to__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4572);
/* harmony import */ var scrivito_sdk_app_support_browser_location__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9004);
/* harmony import */ var scrivito_sdk_app_support_change_location__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2354);
/* harmony import */ var scrivito_sdk_app_support_current_app_space__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1048);
/* harmony import */ var scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7183);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4665);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4772);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8927);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7461);

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
function calculateNavigationState() {
  if (forceNotResponsible) {
    return {
      historyState: (0,scrivito_sdk_app_support_browser_location__WEBPACK_IMPORTED_MODULE_1__/* .getHistoryState */ .GL)(),
      locationRoute: { sitePath: null }
    };
  }
  const historyState = (0,scrivito_sdk_app_support_browser_location__WEBPACK_IMPORTED_MODULE_1__/* .getHistoryState */ .GL)();
  const locationRoute = recognizeLocation(historyState.location);
  if (typeof locationRoute === "string") return locationRoute;
  return {
    historyState,
    locationRoute
  };
}
function handleRedirectToBinary(maybeBinaryUrl) {
  if (typeof maybeBinaryUrl === "string") {
    (0,scrivito_sdk_app_support_change_location__WEBPACK_IMPORTED_MODULE_2__/* .redirectToUrl */ .NA)(maybeBinaryUrl);
    return false;
  }
  return true;
}
function recognizeLocation(location) {
  var _a, _b;
  const route = (0,scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_4__/* .recognize */ .vA)(location);
  if ((0,scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_4__/* .isDestinationUnavailableRecognized */ .hZ)(route)) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_5__/* .InternalError */ .Gd();
  }
  if (!route.objId) return route;
  const obj = (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_7__/* .getObjFrom */ .ED)(
    (0,scrivito_sdk_app_support_current_app_space__WEBPACK_IMPORTED_MODULE_3__/* .currentAppSpace */ .p)().and((0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_7__/* .restrictToSiteAndGlobal */ .y7)(route.siteData.siteId)),
    route.objId
  );
  if (!obj) return __spreadProps(__spreadValues({}, route), { objId: void 0 });
  if ((0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_8__/* .isBinaryBasicObj */ .Xg)(obj)) {
    return (_b = (_a = obj.get("blob", ["binary"])) == null ? void 0 : _a.url()) != null ? _b : __spreadProps(__spreadValues({}, route), { objId: void 0 });
  }
  return route;
}
const loadableNavigationState = (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_6__/* .createLoadableData */ .vD)({
  stream: (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_6__/* .loadAndObserve */ .eX)(calculateNavigationState).filter(handleRedirectToBinary).filter(handleMovedCurrentPage)
});
let lastNavigationState;
function handleMovedCurrentPage(newState) {
  const movedCurrentPage = (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_6__/* .loadableWithDefault */ .s4)(
    null,
    () => lastNavigationState && detectMovedCurrentPage(lastNavigationState, newState)
  );
  if (movedCurrentPage) {
    (0,scrivito_sdk_app_support_basic_navigate_to__WEBPACK_IMPORTED_MODULE_0__/* .basicNavigateTo */ .vU)({ objId: movedCurrentPage.id() });
    return false;
  }
  lastNavigationState = newState;
  return true;
}
function detectMovedCurrentPage(oldState, newState) {
  return (
    // if the browser URL is unchanged
    newState.historyState.location === oldState.historyState.location && // and was previously recognized as a page
    oldState.locationRoute.objId && // but now suddenly turns into "404"
    !newState.locationRoute.objId && // then consider the page to have "moved" (assuming it still exists)
    (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_7__/* .getObjFrom */ .ED)((0,scrivito_sdk_app_support_current_app_space__WEBPACK_IMPORTED_MODULE_3__/* .currentAppSpace */ .p)(), oldState.locationRoute.objId)
  );
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
  loadableNavigationState.rawStateContainer().set({
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
  loadableNavigationState.reset();
}
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_5__/* .onReset */ .Nj)(() => {
  forceNotResponsible = false;
  resetRecognizedSiteId();
});


/***/ }),

/***/ 7272:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ presentUiAdapter)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4665);
/* harmony import */ var _ui_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5460);



function presentUiAdapter() {
  if (!_ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .uiAdapter */ .B) throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .InternalError */ .Gd();
  return _ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .uiAdapter */ .B;
}


/***/ }),

/***/ 9641:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ getPreviewSizes),
/* harmony export */   t: () => (/* binding */ configurePreviewSizes)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4665);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1946);



const state = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__/* .createStateContainer */ .Ld)();
function configurePreviewSizes(previewSizes) {
  if (!previewSizes.length) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ArgumentError */ .c1(
      'No sizes has been provided for "configurePreviewSizes"'
    );
  }
  if (new Set(previewSizes.map((p) => p.width)).size !== previewSizes.length) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ArgumentError */ .c1('A "width" must be unique for sizes');
  }
  if (!previewSizes.every(validatePreviewSizeWidth)) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ArgumentError */ .c1('A "width" must be a positive integer');
  }
  state.set(previewSizes);
}
function validatePreviewSizeWidth(previewSize) {
  const width = previewSize == null ? void 0 : previewSize.width;
  if (!width) return true;
  return (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .isValidInteger */ .zh)(width) && width > 0;
}
function getPreviewSizes() {
  return state.get();
}


/***/ }),

/***/ 1303:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ provideEditingConfig),
/* harmony export */   w: () => (/* binding */ getAttributeEditingOptionsFor)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_editing_config_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2295);
/* harmony import */ var scrivito_sdk_app_support_get_class_name__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7717);

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


function provideEditingConfig(subject, editingConfig) {
  (0,scrivito_sdk_app_support_editing_config_store__WEBPACK_IMPORTED_MODULE_0__/* .setEditingConfigFor */ .O)((0,scrivito_sdk_app_support_get_class_name__WEBPACK_IMPORTED_MODULE_1__/* .getClassName */ .u)(subject), editingConfig);
}
function getAttributeEditingOptionsFor(className, attributeName, attributeType) {
  var _a;
  const attributes = ((_a = (0,scrivito_sdk_app_support_editing_config_store__WEBPACK_IMPORTED_MODULE_0__/* .getEditingConfigFor */ .u)(className)) == null ? void 0 : _a.attributes) || {};
  const attribute = attributes[attributeName];
  const options = attribute ? attribute.options : void 0;
  if (!options) return;
  let invalidOptions = options;
  if (attributeType === "html") {
    const _b = options, { allowedTags, showHtmlSource, toolbar } = _b, rest = __objRest(_b, ["allowedTags", "showHtmlSource", "toolbar"]);
    invalidOptions = rest;
  } else if (attributeType === "string") {
    const _c = options, { multiLine } = _c, rest = __objRest(_c, ["multiLine"]);
    invalidOptions = rest;
  }
  if (Object.keys(invalidOptions).length === 0) return options;
}


/***/ }),

/***/ 7440:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ resolveHtmlUrls),
/* harmony export */   n: () => (/* binding */ replaceInternalLinks)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_basic_url_for__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5112);
/* harmony import */ var scrivito_sdk_app_support_current_app_space__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1048);
/* harmony import */ var scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7183);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4665);
/* harmony import */ var scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2836);
/* harmony import */ var scrivito_sdk_link_resolution__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3558);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8927);

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
  return (0,scrivito_sdk_link_resolution__WEBPACK_IMPORTED_MODULE_5__/* .formatInternalLinks */ .wx)(
    htmlString,
    (url) => calculateInternalLinkUrl(url, options)
  );
}
function calculateInternalLinkUrl({ obj_id: objId, query, hash }, options) {
  const obj = (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_6__/* .getObjFrom */ .ED)((0,scrivito_sdk_app_support_current_app_space__WEBPACK_IMPORTED_MODULE_1__/* .currentAppSpace */ .p)(), objId);
  if (!obj) return (0,scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_2__/* .generateUrl */ .Jv)({ objId, query, hash });
  const dataStack = options == null ? void 0 : options.dataStack;
  return (0,scrivito_sdk_app_support_basic_url_for__WEBPACK_IMPORTED_MODULE_0__/* .basicUrlForObj */ .a)(obj, __spreadProps(__spreadValues({
    query: dataStack ? (0,scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_4__/* .getDataContextQuery */ .qD)(obj, dataStack, query) : query,
    hash
  }, options), {
    withoutOriginIfLocal: true
  }));
}
function checkResolveHtmlUrls(htmlString) {
  if (typeof htmlString !== "string") {
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .throwInvalidArgumentsError */ .Ht)(
      "resolveHtmlUrls",
      "'htmlString' must be a 'String'.",
      { docPermalink: "js-sdk/resolveHtmlUrls" }
    );
  }
}


/***/ }),

/***/ 7183:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  I: () => (/* binding */ ensureRoutingDataAvailable),
  uT: () => (/* binding */ generateDestination),
  yW: () => (/* binding */ generateDestinationForId),
  WH: () => (/* binding */ generateLocalPath),
  Jv: () => (/* binding */ generateUrl),
  xu: () => (/* binding */ generateUrlWithCanonicalOrigin),
  VJ: () => (/* binding */ initRouting),
  hZ: () => (/* binding */ isDestinationUnavailableRecognized),
  tV: () => (/* binding */ isNotResponsibleRoute),
  UO: () => (/* binding */ isObjNotFoundRoute),
  Im: () => (/* binding */ isOriginLocal),
  zX: () => (/* binding */ isSiteLocal),
  vA: () => (/* binding */ recognize)
});

// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_page_data.ts
var current_page_data = __webpack_require__(5634);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/destination_types.ts
var destination_types = __webpack_require__(7550);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 63 modules
var common = __webpack_require__(4665);
// EXTERNAL MODULE: ./scrivito_sdk/data/index.ts + 30 modules
var data = __webpack_require__(7164);
// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 26 modules
var loadable = __webpack_require__(4772);
// EXTERNAL MODULE: ./scrivito_sdk/models/index.ts + 39 modules
var models = __webpack_require__(8927);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/permalink_cache.ts





let cache = {};
let cacheContentStateId;
const cacheDisabled = new common/* ContextContainer */.hl();
function cacheObjForPermalink(obj, permalink, siteId) {
  if (cacheDisabled.current()) return;
  if (!(0,common/* equals */.aI)(obj.objSpaceId(), (0,models/* currentObjSpaceId */.eb)())) {
    throw new common/* InternalError */.Gd();
  }
  if (!obj.siteId()) return;
  clearIfOutdated();
  if (!cache[siteId]) cache[siteId] = {};
  cache[siteId][permalink] = obj.id();
}
function objIdForPermalink(permalink, siteId) {
  var _a;
  if (cacheDisabled.current()) return;
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
  const worldContentStateId = (0,loadable/* loadableWithDefault */.s4)(
    void 0,
    () => (0,data/* getContentStateId */.Qb)((0,models/* currentObjSpaceId */.eb)())
  ) || "";
  if (worldContentStateId !== cacheContentStateId) {
    cache = {};
    cacheContentStateId = worldContentStateId;
  }
}
(0,common/* onReset */.Nj)(clearPermalinkCache);

// EXTERNAL MODULE: ./scrivito_sdk/app_support/routing/homepage_callback.ts
var homepage_callback = __webpack_require__(827);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_app_space.ts
var current_app_space = __webpack_require__(1048);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/unstable_multi_site_mode.ts
var unstable_multi_site_mode = __webpack_require__(4416);
// EXTERNAL MODULE: ./scrivito_sdk/realm/index.ts + 21 modules
var realm = __webpack_require__(7461);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/routing_path.ts








function generateRoutingPath(obj, siteId) {
  if (isHomepage(obj, siteId)) return "/";
  const permalink = generatePermalinkPath(obj, siteId);
  if (permalink) return permalink;
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
    return usesOldStyleRouting(siteId) ? (_a = (0,homepage_callback/* homepageFromCallback */.Q)()) == null ? void 0 : _a.id() : (_b = (0,models/* getRootObjFrom */.Mp)((0,current_app_space/* currentAppSpace */.p)().and((0,models/* restrictToSite */.rs)(siteId)))) == null ? void 0 : _b.id();
  }
  return (_d = extractObjIdFromPath(path)) != null ? _d : (_c = recognizePermalink(path, siteId)) == null ? void 0 : _c.id();
}
function generatePermalinkPath(obj, siteId) {
  if (obj.isDeleted()) return;
  const permalink = obj.permalink();
  if (!permalink) return;
  if (usesUnstableMultiSiteModeForSite(siteId) && !(0,unstable_multi_site_mode/* isGlobalOrFromUnstableSelectedSite */.Ln)(obj)) {
    return;
  }
  cacheObjForPermalink(obj, permalink, siteId);
  return `/${permalink}`;
}
function recognizePermalink(path, siteId) {
  var _a, _b;
  const scope = (0,current_app_space/* currentAppSpace */.p)().and((0,models/* restrictToSiteAndGlobal */.y7)(siteId));
  const objId = objIdForPermalink(path, siteId);
  if (objId) return (_a = (0,models/* getObjFrom */.ED)(scope, objId)) != null ? _a : void 0;
  if (usesUnstableMultiSiteModeForSite(siteId)) {
    return (0,unstable_multi_site_mode/* recognizeUnstableMultiSitePermalink */.mu)(path, scope);
  }
  return (_b = (0,models/* getObjBy */.Z0)(scope, "_permalink", path)) != null ? _b : void 0;
}
function isHomepage(obj, siteId) {
  if (!usesOldStyleRouting(siteId)) return obj.path() === "/";
  const homepage = (0,loadable/* loadableWithDefault */.s4)(null, homepage_callback/* homepageFromCallback */.Q);
  return homepage && homepage.id() === obj.id();
}
function generateSlug(basicObj) {
  const obj = (0,realm/* wrapInAppClass */.Dy)(basicObj);
  if (!obj.slug) return;
  if (typeof obj.slug !== "function") return;
  const slug = obj.slug();
  if (typeof slug === "string") return slug;
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
  return usesOldStyleRouting(siteId) && (0,unstable_multi_site_mode/* useUnstableMultiSiteMode */.DZ)();
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/site_mapping.ts
var site_mapping = __webpack_require__(648);
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
  const currentRoute = (0,current_page_data/* getCurrentRoute */.$V)();
  const currentSiteData = currentRoute == null ? void 0 : currentRoute.siteData;
  const currentSiteId = currentSiteData == null ? void 0 : currentSiteData.siteId;
  const siteId = (_a = obj.siteId()) != null ? _a : currentSiteId;
  if (!siteId) return unavailableFor(options);
  if (siteId !== currentSiteId) {
    const url2 = canonicalUrlForSite(siteId, options);
    return url2 ? { type: "crossSite", url: url2 } : unavailableFor(options);
  }
  const baseUrl = currentSiteData == null ? void 0 : currentSiteData.baseUrl;
  if (!baseUrl) return unavailableFor(options);
  const url = new URL(
    joinUri(baseUrl, generateRoutingPath(obj, siteId), options)
  );
  return (currentRoute == null ? void 0 : currentRoute.sitePath) || url.origin === (0,common/* currentOrigin */.u4)() ? { type: "local", resource: (0,common/* urlResource */.ix)(url) } : { type: "crossSite", url: url.href };
}
function generateUrlWithCanonicalOrigin(options) {
  var _a, _b, _c, _d;
  const siteId = (_c = options.obj.siteId()) != null ? _c : (_b = (_a = (0,current_page_data/* getCurrentRoute */.$V)()) == null ? void 0 : _a.siteData) == null ? void 0 : _b.siteId;
  if (!siteId) return unavailableFor(options).fallbackUrl;
  return (_d = canonicalUrlForSite(siteId, options)) != null ? _d : unavailableFor(options).fallbackUrl;
}
function canonicalUrlForSite(siteId, options) {
  const baseUrl = (0,site_mapping/* baseUrlForSite */.ne)(siteId);
  return baseUrl && joinUri(baseUrl, generateRoutingPath(options.obj, siteId), options);
}
function unavailableFor(options) {
  return (0,destination_types/* generateDestinationUnavailable */.c)({
    objId: options.obj.id(),
    query: options.query,
    hash: options.hash
  });
}
function generateDestinationForId(options) {
  const { objId, query, hash } = options;
  const currentRoute = (0,current_page_data/* getCurrentRoute */.$V)();
  if (!(currentRoute == null ? void 0 : currentRoute.siteData)) {
    return (0,destination_types/* generateDestinationUnavailable */.c)({ objId, query, hash });
  }
  const url = new URL(
    joinUri(currentRoute.siteData.baseUrl, `/${objId}`, { query, hash })
  );
  return currentRoute.sitePath || url.origin === (0,common/* currentOrigin */.u4)() ? { type: "local", resource: (0,common/* urlResource */.ix)(url) } : { type: "crossSite", url: url.href };
}
function joinUri(baseUrl, path, { query, hash }) {
  const urlString = path === "/" ? baseUrl : `${baseUrl}${path}`;
  if (!URL.canParse(urlString)) return urlString;
  const url = new URL(urlString);
  if (typeof query === "string" && query !== "?") url.search = query;
  if (typeof query === "object") url.search = (0,common/* buildQueryString */.Go)(query);
  if (hash && hash !== "#") url.hash = hash;
  return url.href;
}
function recognize(url) {
  const destinationUnavailable = (0,destination_types/* recognizeDestinationUnavailable */.R)(url);
  if (destinationUnavailable) {
    const { objId, query: query2 } = destinationUnavailable;
    return {
      objId,
      sitePath: null,
      query: query2
    };
  }
  const recognized = (0,site_mapping/* recognizeSiteAndPath */.y1)(url);
  const query = new URL(url, "http://example.com").search.replace(/^\?/, "");
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
  (0,homepage_callback/* setHomepageCallback */.m)(homepageCallback);
  (0,site_mapping/* initSiteMapping */.uL)(siteMappingConfiguration);
}
function ensureRoutingDataAvailable(basicPage) {
  withDisabledPermalinkCache(() => {
    const url = generateUrlWithCanonicalOrigin({ obj: basicPage });
    const route = recognize(url);
    if (route.objId !== basicPage.id()) {
      throw new common/* ScrivitoError */.aS(
        `baseUrlForSite produced ${url} for ${basicPage.id()}, but siteForUrl did not recognize that URL correctly.`
      );
    }
  });
}
function isOriginLocal(url) {
  return !URL.canParse(url) || new URL(url).origin === (0,common/* currentOrigin */.u4)();
}
function isSiteLocal(url) {
  var _a, _b;
  const currentBaseUrl = (_b = (_a = (0,current_page_data/* getCurrentRoute */.$V)()) == null ? void 0 : _a.siteData) == null ? void 0 : _b.baseUrl;
  return !!currentBaseUrl && url.indexOf(currentBaseUrl) === 0;
}


/***/ }),

/***/ 827:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ homepageFromCallback),
/* harmony export */   m: () => (/* binding */ setHomepageCallback)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_current_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7639);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4665);



let homepageCallback;
function setHomepageCallback(callback) {
  homepageCallback = callback;
}
function homepageFromCallback() {
  if (!homepageCallback) return null;
  return (0,scrivito_sdk_app_support_current_page__WEBPACK_IMPORTED_MODULE_0__/* .withDefaultSiteContext */ .wF)(homepageCallback);
}
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .onReset */ .Nj)(() => homepageCallback = void 0);


/***/ }),

/***/ 6409:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   iv: () => (/* binding */ usePrerenderScaling),
/* harmony export */   js: () => (/* binding */ isInitialUrlAvailable),
/* harmony export */   s1: () => (/* binding */ scaleDownBinary)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4665);


const prerenderContext = new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ContextContainer */ .hl();
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
  const width = Math.max((0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .screen */ .nj)().width * (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .devicePixelRatio */ .Y5)(), prerenderWidth);
  return binary.optimizeFor({ width });
}


/***/ }),

/***/ 5394:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ scrollIntoView),
/* harmony export */   a: () => (/* binding */ registerScrollTarget)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_get_current_page_id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4404);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4665);



function registerScrollTarget(targetId, element, onReveal) {
  const targetKey = keyFor(targetId);
  const id = (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .randomHex */ .nw)();
  const reveal = () => {
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .scrollElementIntoView */ .hT)(element, {
      // See https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView for details
      // * Chrome and Firefox support all options
      // * Safari supports the most important options: "block" and "inline" (tested with Safari 12.1.1)
      // * Edge: Unknown
      behavior: "smooth",
      block: "center",
      inline: "center"
    });
    if (onReveal) onReveal();
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
  if (targetId.objId !== (0,scrivito_sdk_app_support_get_current_page_id__WEBPACK_IMPORTED_MODULE_0__/* .getCurrentPageId */ .s)()) return;
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
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .onReset */ .Nj)(() => {
  scrollTargetRegistry = {};
  requestedTargetId = "";
});


/***/ }),

/***/ 648:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ne: () => (/* binding */ baseUrlForSite),
/* harmony export */   uL: () => (/* binding */ initSiteMapping),
/* harmony export */   y1: () => (/* binding */ recognizeSiteAndPath)
/* harmony export */ });
/* unused harmony export reset */
/* harmony import */ var scrivito_sdk_app_support_current_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7639);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4665);



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
        const origin = (_b = (_a2 = config.origin) != null ? _a2 : (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .currentOrigin */ .u4)()) != null ? _b : throwNoOrigin();
        baseUrl = `${origin}/${basePath.replace(/^\/+/, "")}`;
      }
      return baseUrl;
    }
  };
  siteForUrlCallback = (url) => {
    const { origin } = new URL(url);
    if (origin !== config.origin && origin !== (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .currentOrigin */ .u4)()) return;
    if (!basePath) {
      return { siteId: "default", baseUrl: origin };
    }
    return {
      siteId: "default",
      baseUrl: new URL(basePath, origin).href
    };
  };
}
function baseUrlForSite(siteId) {
  const result = executeBaseUrlForSiteCallback(siteId);
  if (result === void 0) return null;
  if (result === "") return null;
  if (typeof result === "string") return removeTrailingSlashes(result);
  reportUnexpectedReturnValue("baseUrlForSite", result, "String | Void");
  return null;
}
function recognizeSiteAndPath(uriToRecognize) {
  if (!siteForUrlCallback) throwNotInitialized();
  const url = normalizeUri(uriToRecognize);
  const result = siteForUrl(url);
  if (!result) return { sitePath: null };
  return {
    siteData: { siteId: result.siteId, baseUrl: result.baseUrl },
    sitePath: determineSitePath(result.baseUrl, url)
  };
}
function determineSitePath(baseUrl, url) {
  if (!startsWith(baseUrl, url)) return null;
  const restOfUrl = url.substring(baseUrl.length);
  const path = removeNonPathComponents(restOfUrl);
  if (path === "") return "/";
  if (path.charAt(0) !== "/") return null;
  return path;
}
function startsWith(prefix, input) {
  return input.substring(0, prefix.length) === prefix;
}
function removeNonPathComponents(resource) {
  const { pathname } = new URL(resource, "http://example.com");
  return resource.startsWith("/") ? pathname : pathname.substring(1);
}
function normalizeUri(url) {
  var _a;
  const baseUrl = URL.canParse(url) ? void 0 : (_a = (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .currentOrigin */ .u4)()) != null ? _a : throwNoOrigin();
  const location = new URL(url, baseUrl);
  location.pathname = location.pathname.replace(/\/+/g, "/");
  return location.href;
}
function siteForUrl(url) {
  const result = (0,scrivito_sdk_app_support_current_page__WEBPACK_IMPORTED_MODULE_0__/* .withForbiddenSiteContext */ .wj)(
    "Access to current site inside siteForUrl. Forgot to use onAllSites?",
    () => siteForUrlCallback == null ? void 0 : siteForUrlCallback.call(null, removeQueryAndHash(url))
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
function removeQueryAndHash(url) {
  const urlObj = new URL(url);
  urlObj.search = "";
  urlObj.hash = "";
  return urlObj.href;
}
function removeTrailingSlashes(input) {
  return input.replace(/([^/]|^)\/+$/, "$1");
}
function reportUnexpectedReturnValue(callbackName, actual, expectedType) {
  const errorMessage = `Unexpected return value from ${callbackName}: got ${(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .prettyPrint */ .aO)(
    actual
  )}, expected type ${expectedType}. ${SEE_CONFIGURE}`;
  (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .throwNextTick */ .JL)(new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .ArgumentError */ .c1(errorMessage));
}
function executeBaseUrlForSiteCallback(siteId) {
  if (!baseUrlForSiteCallback) throwNotInitialized();
  return baseUrlForSiteCallback.call(null, siteId);
}
function reset() {
  baseUrlForSiteCallback = void 0;
  siteForUrlCallback = void 0;
}
function throwNotInitialized() {
  throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .ScrivitoError */ .aS(
    "Cannot use routing before Scrivito.configure was called."
  );
}
function throwNoOrigin() {
  throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .ScrivitoError */ .aS(
    `Cannot compute an absolute URL without a configured origin or base URL. ${SEE_CONFIGURE}`
  );
}
function isSiteForUrlResult(maybeSiteForUrlResult) {
  const siteForUrlResult = maybeSiteForUrlResult;
  if (siteForUrlResult === void 0) return true;
  return typeof (siteForUrlResult == null ? void 0 : siteForUrlResult.siteId) === "string" && typeof (siteForUrlResult == null ? void 0 : siteForUrlResult.baseUrl) === "string";
}
const SEE_CONFIGURE = `Visit ${(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .docUrl */ .yJ)(
  "js-sdk/configure"
)} for more information.`;
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .onReset */ .Nj)(reset);


/***/ }),

/***/ 5302:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ setTreatLocalhostLike),
/* harmony export */   d: () => (/* binding */ getTreatLocalhostLike)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4665);


let treatLocalhostLike;
function setTreatLocalhostLike(url) {
  treatLocalhostLike = url;
}
function getTreatLocalhostLike() {
  return treatLocalhostLike;
}
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .onReset */ .Nj)(() => treatLocalhostLike = void 0);


/***/ }),

/***/ 5460:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ uiAdapter),
/* harmony export */   U: () => (/* binding */ setUiAdapter)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4665);


let uiAdapter;
function setUiAdapter(newUiAdapter) {
  uiAdapter = newUiAdapter;
}
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .onReset */ .Nj)(() => setUiAdapter(void 0));


/***/ }),

/***/ 7283:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* binding */ uiAdapterCompatibleValue)
/* harmony export */ });
/* harmony import */ var lodash_es_isDate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8307);
/* harmony import */ var lodash_es_isDate__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_es_isDate__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8927);

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
  if (!value) return value;
  switch (typeof value) {
    case "string":
    case "number":
    case "boolean":
      return value;
    case "object":
      if (isObjSearch(value)) return uiCompatibleSearchParams(value);
      if (lodash_es_isDate__WEBPACK_IMPORTED_MODULE_0___default()(value)) return value;
      if (Array.isArray(value)) return uiCompatibleArrayValue(value);
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
  return v._scrivitoPrivateContent instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__/* .BasicObjSearch */ .Ei;
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

/***/ 4416:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DZ: () => (/* binding */ useUnstableMultiSiteMode),
/* harmony export */   Ln: () => (/* binding */ isGlobalOrFromUnstableSelectedSite),
/* harmony export */   MT: () => (/* binding */ getUnstableSelectedSiteId),
/* harmony export */   Y7: () => (/* binding */ setUnstableMultiSiteMode),
/* harmony export */   mu: () => (/* binding */ recognizeUnstableMultiSitePermalink),
/* harmony export */   uo: () => (/* binding */ getUnstableSiteIdForObjId),
/* harmony export */   yG: () => (/* binding */ unstable_selectSiteId)
/* harmony export */ });
/* unused harmony exports UnstableMultiSiteModeOperationError, resetUnstableMultiSiteMode */
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4665);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4772);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8927);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7461);





class UnstableMultiSiteModeOperationError extends scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ScrivitoError */ .aS {
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
    const obj = scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__/* .BasicObj */ .kI.get(objId);
    if (obj) return getSiteIdForObj(obj);
  }
  return null;
}
function getSiteIdForObj(obj) {
  const siteId = getUnstableSiteIdForObjCallback((0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_3__/* .wrapInAppClass */ .Dy)(obj));
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
  const preselected = (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_1__/* .loadableWithDefault */ .s4)(null, getUnstableSelectedSiteId);
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
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .InternalError */ .Gd();
  }
  return selectedSiteId().get() || null;
}
function resetUnstableMultiSiteMode() {
  getUnstableSiteIdForObjCallback = void 0;
}
const loadableCollection = (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_1__/* .createLoadableCollection */ .rL)({
  name: "multiSiteMode",
  // the site id is not actually "loaded",
  // we are just waiting for the application to set it
  loadElement: () => ({
    loader: () => (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .never */ .Zm)()
  })
});
function selectedSiteId() {
  return loadableCollection.get("selectedSiteId");
}
function recognizeUnstableMultiSitePermalink(path, scope) {
  var _a;
  const siteId = getSiteIdAssumingSelected();
  const objs = (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__/* .getAllObjsByValueFrom */ .eF)(scope, "_permalink", path);
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
  const siteId = (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_1__/* .loadableWithDefault */ .s4)(void 0, getUnstableSelectedSiteId);
  if (siteId === void 0) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ScrivitoError */ .aS(
      "Access to routing in the multi-site mode, but the site ID is not yet selected. Forgot to use Scrivito.unstable_selectSiteId?"
    );
  }
  return siteId;
}
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .onReset */ .Nj)(resetUnstableMultiSiteMode);


/***/ }),

/***/ 9857:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ urlFor)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_basic_url_for__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5112);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4665);
/* harmony import */ var scrivito_sdk_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7164);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8927);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7461);






function urlFor(target, options) {
  (0,scrivito_sdk_data__WEBPACK_IMPORTED_MODULE_2__/* .assertNotUsingInMemoryTenant */ .C_)("Scrivito.urlFor");
  checkUrlFor(target);
  let query;
  let hash;
  if (options) {
    query = options.query;
    hash = options.hasOwnProperty("hash") ? options.hash : options.fragment;
  }
  return (0,scrivito_sdk_app_support_basic_url_for__WEBPACK_IMPORTED_MODULE_0__/* .basicUrlFor */ .P)((0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__/* .unwrapAppClass */ .zo)(target), { query, hash });
}
function checkUrlFor(target) {
  if (!((0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__/* .isWrappingBasicObj */ .mD)(target) || (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__/* .isWrappingBasicLink */ .fZ)(target) || target instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__/* .Binary */ .yI)) {
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .throwInvalidArgumentsError */ .Ht)(
      "urlFor",
      "'target' must be an instance of 'Obj', 'Link' or 'Binary'.",
      {
        docPermalink: "js-sdk/urlFor"
      }
    );
  }
}


/***/ }),

/***/ 8589:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ User)
/* harmony export */ });

class User {
  /** @internal */
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
  picture() {
    return this.userData.picture;
  }
}


/***/ }),

/***/ 7521:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QS: () => (/* binding */ isWidgetHighlighted),
/* harmony export */   xQ: () => (/* binding */ toggleWidgetHighlighting)
/* harmony export */ });
/* unused harmony export isWidgetHighlightingEnabled */
/* harmony import */ var scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5460);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4665);



let widgetHighlightingEnabled = false;
function toggleWidgetHighlighting(value) {
  widgetHighlightingEnabled = value;
}
function isWidgetHighlightingEnabled() {
  return !!widgetHighlightingEnabled;
}
function isWidgetHighlighted(widget) {
  var _a;
  if (!isWidgetHighlightingEnabled()) return false;
  const highlightedWidget = (_a = scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__/* .uiAdapter */ .B) == null ? void 0 : _a.getHighlightedWidget();
  if (!highlightedWidget) return false;
  return highlightedWidget.objId === widget.obj().id() && highlightedWidget.widgetId === widget.id() && (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .equals */ .aI)(highlightedWidget.objSpaceId, widget.objSpaceId());
}
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .onReset */ .Nj)(() => {
  widgetHighlightingEnabled = false;
});


/***/ }),

/***/ 9305:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  b_: () => (/* reexport */ appAdapterDescription),
  aG: () => (/* reexport */ isSelectedObjMessage),
  qk: () => (/* reexport */ uiAdapterDescription)
});

// EXTERNAL MODULE: ./scrivito_sdk/bridge/index.ts + 17 modules
var bridge = __webpack_require__(9564);
;// CONCATENATED MODULE: ./scrivito_sdk/app_ui_protocol/ui_adapter_interface.ts


const uiAdapterDescription = {
  canEdit: bridge/* GET */.fG,
  canWrite: bridge/* GET */.fG,
  comparisonBase: bridge/* GET */.fG,
  comparisonRange: bridge/* GET */.fG,
  getEditorAuthToken: bridge/* GET */.fG,
  getContentStateId: bridge/* GET */.fG,
  translate: bridge/* GET */.fG,
  currentEditor: bridge/* GET */.fG,
  currentEditorTeams: bridge/* GET */.fG,
  currentWorkspace: bridge/* GET */.fG,
  currentEditingContext: bridge/* GET */.fG,
  getUiContext: bridge/* GET */.fG,
  getUiLanguage: bridge/* GET */.fG,
  getEditableArea: bridge/* GET */.fG,
  getHighlightedWidget: bridge/* GET */.fG,
  // LinkResolution methods
  getResolvedUrl: bridge/* GET */.fG,
  // CmsRetrieval methods
  retrieveObjQuery: bridge/* SEND */.JV,
  retrieveFacetQuery: bridge/* SEND */.JV,
  retrieveSuggest: bridge/* SEND */.JV,
  retrieveBinaryMetadata: bridge/* SEND */.JV,
  retrieveBinaryUrls: bridge/* SEND */.JV,
  retrieveObjFieldDiffs: bridge/* SEND */.JV,
  // BinaryHandler methods
  copyBinary: bridge/* SEND */.JV,
  uploadBinary: bridge/* SEND */.JV,
  // ObjStreamReplicationEndpoint methods
  objReplicationMessageStream: bridge/* STREAM */.dY,
  finishSavingObj: bridge/* SEND */.JV,
  copyObj: bridge/* SEND */.JV,
  finishReplicatingObj: bridge/* SEND */.JV,
  insertWidget: bridge/* SEND */.JV,
  navigateToExternalUrl: bridge/* SEND */.JV,
  openInNewUiWindow: bridge/* SEND */.JV,
  configureContentBrowser: bridge/* SEND */.JV,
  openContentBrowser: bridge/* SEND */.JV,
  openCustomDialog: bridge/* SEND */.JV,
  setAppAdapter: bridge/* SEND */.JV,
  configureTenant: bridge/* SEND */.JV,
  showWidgetMenu: bridge/* SEND */.JV,
  showWidgetlistMenu: bridge/* SEND */.JV,
  showChildListMenu: bridge/* SEND */.JV,
  startDrag: bridge/* SEND */.JV,
  endDrag: bridge/* SEND */.JV,
  dragTo: bridge/* SEND */.JV,
  drop: bridge/* SEND */.JV,
  windowFocusStream: bridge/* STREAM */.dY
};

;// CONCATENATED MODULE: ./scrivito_sdk/app_ui_protocol/app_adapter_description.ts


const appAdapterDescription = {
  getAdapterSpec: bridge/* GET */.fG,
  getCapabilities: bridge/* GET */.fG,
  getCropAspectRatios: bridge/* GET */.fG,
  getPreviewSizes: bridge/* GET */.fG,
  descriptionForObj: bridge/* GET */.fG,
  getClasses: bridge/* GET */.fG,
  getContentBrowserConfiguration: bridge/* GET */.fG,
  getHomepageId: bridge/* GET */.fG,
  getSiteIdForObj: bridge/* GET */.fG,
  titleForObj: bridge/* GET */.fG,
  titleForWidget: bridge/* GET */.fG,
  thumbnailForObj: bridge/* GET */.fG,
  getAuthGroups: bridge/* GET */.fG,
  getContentZoneData: bridge/* GET */.fG,
  getCurrentAppLocation: bridge/* GET */.fG,
  getCustomComponentDimensions: bridge/* GET */.fG,
  getDocumentTitle: bridge/* GET */.fG,
  getElementBoundaries: bridge/* GET */.fG,
  getExtensionsUrl: bridge/* GET */.fG,
  getMenuPatch: bridge/* GET */.fG,
  getObjClassForContentTypeMapping: bridge/* GET */.fG,
  getResolvedUrl: bridge/* GET */.fG,
  getScrollPosition: bridge/* GET */.fG,
  getValidationReport: bridge/* GET */.fG,
  getUrlFor: bridge/* GET */.fG,
  getForcedEditorLanguage: bridge/* GET */.fG,
  generalPropertiesForObj: bridge/* GET */.fG,
  generalPropertiesForWidget: bridge/* GET */.fG,
  propertiesGroupsForObj: bridge/* GET */.fG,
  propertiesGroupsForWidget: bridge/* GET */.fG,
  getInitialContentDumpUrl: bridge/* GET */.fG,
  hasLayoutComponents: bridge/* GET */.fG,
  objReplicationMessageStream: bridge/* STREAM */.dY,
  executeCustomCommand: bridge/* SEND */.JV,
  initializeContentForObj: bridge/* SEND */.JV,
  initializeContentForWidget: bridge/* SEND */.JV,
  initializeCopy: bridge/* SEND */.JV,
  initializeObjCopy: bridge/* SEND */.JV,
  initializeWidgetCopy: bridge/* SEND */.JV,
  navigateTo: bridge/* SEND */.JV,
  scrollIntoView: bridge/* SEND */.JV,
  scrollToTop: bridge/* SEND */.JV,
  showCustomComponent: bridge/* SEND */.JV,
  showWidgetContent: bridge/* SEND */.JV,
  wantsAutoAttributeConversion: bridge/* GET */.fG
};

;// CONCATENATED MODULE: ./scrivito_sdk/app_ui_protocol/selected_obj_message.ts

function isSelectedObjMessage(data) {
  return !!data && typeof data === "object" && "type" in data && data.type === "ScrivitoSelectedObj" && "objId" in data && (data.objId === null || typeof data.objId === "string");
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_ui_protocol/index.ts






/***/ }),

/***/ 9564:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  fG: () => (/* reexport */ GET),
  JV: () => (/* reexport */ SEND),
  dY: () => (/* reexport */ STREAM),
  mj: () => (/* reexport */ anticipatedMessageLink),
  m6: () => (/* reexport */ connectTo),
  xN: () => (/* reexport */ createAdapterClient),
  Mf: () => (/* reexport */ createAdapterConnection),
  qo: () => (/* reexport */ createAdapterMessageClient),
  V_: () => (/* reexport */ initializeAdapterClient),
  KA: () => (/* reexport */ linkViaPort),
  TB: () => (/* reexport */ postMessageLinkFor),
  UK: () => (/* reexport */ startAdapterMessageServer),
  zV: () => (/* reexport */ startAdapterServer)
});

// UNUSED EXPORTS: RemoteAdapterError, createAdapterProxy, wrapWithLogging

;// CONCATENATED MODULE: ./scrivito_sdk/bridge/adapter_description.ts

const GET = "GET";
const SEND = "SEND";
const STREAM = "STREAM";

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 63 modules
var common = __webpack_require__(4665);
// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 26 modules
var loadable = __webpack_require__(4772);
// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(1946);
;// CONCATENATED MODULE: ./scrivito_sdk/bridge/adapter_client.ts





function createAdapterClient(description, connection) {
  const adapterState = (0,state/* createStateContainer */.Ld)();
  const adapterClient = {};
  Object.keys(description).forEach((methodName) => {
    const methodType = description[methodName];
    if (methodType === GET) {
      adapterClient[methodName] = (...params) => {
        const methodNameAsGet = methodName;
        const state = adapterState.subState(methodNameAsGet).subState((0,common/* computeCacheKey */.xn)(params));
        const data = (0,loadable/* createLoadableData */.vD)({
          state,
          stream: connection.stream(methodNameAsGet, ...params)
        });
        return data.get();
      };
    }
    if (methodType === SEND) {
      adapterClient[methodName] = (...params) => connection.send(
        methodName,
        ...params
      );
    }
    if (methodType === STREAM) {
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
      if (methodType === GET) {
        return (0,loadable/* loadAndObserve */.eX)(() => method.call(adapter, ...params));
      }
      if (methodType === STREAM) {
        const result = method.call(adapter, ...params);
        return result;
      }
      throw new common/* InternalError */.Gd();
    },
    send(methodName, ...params) {
      const method = adapter[methodName];
      const promise = new Promise((resolve) => {
        (0,common/* nextTick */.dY)(() => resolve(method.call(adapter, ...params)));
      });
      return promise;
    }
  };
}

;// CONCATENATED MODULE: ./scrivito_sdk/bridge/link_via_port.ts


function linkViaPort(messagePort) {
  return {
    incomingMessages: new common/* Streamable */.RE((subscriber) => {
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
    incomingMessages: new common/* Streamable */.RE((subscriber) => {
      function listener(event) {
        if (event.source === null) return;
        subscriber.next({
          remoteOrigin: event.origin,
          // when receiving MessageEvent on a window, the source is also a window.
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

;// CONCATENATED MODULE: ./scrivito_sdk/bridge/start_adapter_server.ts


function startAdapterServer(description, adapter, errorHandler, closeSignal) {
  const channel = new MessageChannel();
  startAdapterMessageServer(
    linkViaPort(channel.port1),
    createAdapterConnection(description, adapter),
    description,
    errorHandler,
    closeSignal
  );
  return channel.port2;
}

;// CONCATENATED MODULE: ./scrivito_sdk/bridge/initialize_adapter_client.ts


function initializeAdapterClient(description, portPromise, closeSignal) {
  const adapterLink = anticipatedMessageLink(portPromise.then(linkViaPort));
  return createAdapterClient(
    description,
    createAdapterMessageClient(adapterLink, closeSignal)
  );
}

;// CONCATENATED MODULE: ./scrivito_sdk/bridge/close_link_on_signal.ts

function closeLinkOnSignal(link, closeSignal) {
  return {
    incomingMessages: link.incomingMessages.takeUntil(closeSignal),
    sendMessage: (message) => link.sendMessage(message)
  };
}

;// CONCATENATED MODULE: ./scrivito_sdk/bridge/messages.ts

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

;// CONCATENATED MODULE: ./scrivito_sdk/bridge/stream_demux.ts


class StreamDemux {
  constructor(muxedStream) {
    this.muxedStream = muxedStream;
    this.openStreams = {};
  }
  streamWithId(streamId) {
    return new common/* Streamable */.RE((subscriber) => {
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
    const newStream = new common/* Subject */.B7();
    this.openStreams[streamId] = newStream;
    return newStream;
  }
  ensureSubscribed() {
    if (this.subscription) return;
    this.subscription = this.muxedStream.subscribe({
      next: (message) => {
        const streamId = message.streamId;
        const streamSubject = this.openStreams[streamId];
        if (streamSubject) streamSubject.next(message.data);
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





function createAdapterMessageClient(portLink, closeSignal) {
  const linkToUse = closeSignal ? closeLinkOnSignal(portLink, closeSignal) : portLink;
  return new AdapterMessageClient(linkToUse);
}
class AdapterMessageClient {
  constructor(portLink) {
    this.portLink = portLink;
    /** a counter used to generate channel ids */
    this.channelCounter = 1;
    this.incomingChannels = new StreamDemux(
      this.portLink.incomingMessages.map((message) => message.data).filter(isAdapterMessage).map((message) => ({
        streamId: message.channel,
        data: message
      }))
    );
  }
  stream(methodName, ...params) {
    return new common/* Streamable */.RE((subscriber) => {
      const channel = this.getNextChannelId();
      this.postMessage({
        channel,
        verb: "OPEN",
        method: methodName,
        params
      });
      let processedSequence;
      const subscription = this.incomingChannels.streamWithId(channel).subscribe((message) => {
        if (isResponseMessage(message)) {
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
      if (isErrorMessage(message)) {
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
class RemoteAdapterError extends common/* ScrivitoError */.aS {
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
  return isResponseMessage(message) || isErrorMessage(message);
}

;// CONCATENATED MODULE: ./scrivito_sdk/bridge/adapter_invocation.ts

function isMatchingAdapterInvocation(description, expectedMethodDescription, invocation) {
  const actualMethodDescription = description[invocation.methodName];
  return actualMethodDescription === expectedMethodDescription;
}

;// CONCATENATED MODULE: ./scrivito_sdk/bridge/adapter_message_server.ts







function startAdapterMessageServer(portLink, adapterConnection, description, errorHandler, closeSignal) {
  const linkToUse = closeSignal ? closeLinkOnSignal(portLink, closeSignal) : portLink;
  const server = new AdapterMessageServer(
    linkToUse,
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
    this.incomingMessages = portLink.incomingMessages.map((message) => message.data).filter(isAdapterMessage);
    this.incomingChannels = new StreamDemux(
      this.incomingMessages.map((message) => ({
        streamId: message.channel,
        data: message
      }))
    );
  }
  start() {
    this.incomingMessages.subscribe((message) => {
      if (isOpenStreamMessage(message)) {
        this.handleOpenStreamMessage(message);
      } else if (isSendMessage(message)) {
        this.handleSendMessage(message);
      }
    });
  }
  handleOpenStreamMessage(message) {
    const invocation = invocationFrom(message);
    const adapterStream = this.adapterStreamForInvocation(invocation);
    if (!adapterStream) return;
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
    this.incomingChannels.streamWithId(channel).filter(isCloseStreamMessage).waitForFirst().then(() => subscription.unsubscribe()).catch((error) => {
      subscription.unsubscribe();
      if (error instanceof common/* EndOfStreamError */.d1) {
        return;
      }
      throw error;
    });
  }
  adapterStreamForInvocation(invocation) {
    if (isMatchingAdapterInvocation(this.description, GET, invocation)) {
      return this.adapterConnection.stream(
        invocation.methodName,
        ...invocation.params
      );
    }
    if (isMatchingAdapterInvocation(this.description, STREAM, invocation)) {
      return this.adapterConnection.stream(
        invocation.methodName,
        ...invocation.params
      );
    }
  }
  handleSendMessage(message) {
    const invocation = invocationFrom(message);
    if (!isMatchingAdapterInvocation(this.description, SEND, invocation)) {
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

function anticipatedMessageLink(linkPromise) {
  return {
    incomingMessages: (0,common/* anticipatedStream */.bQ)(
      (() => __async(null, null, function* () {
        const link = yield linkPromise;
        return link.incomingMessages;
      }))()
    ),
    sendMessage: (message) => __async(null, null, function* () {
      const link = yield linkPromise;
      return link.sendMessage(message);
    })
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
  const requestId = (0,common/* randomId */.zE)();
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
  }).filter(common/* isPresent */.Wo).waitForFirst();
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
          if (logger) logger("GET", methodName, ...params);
          return connection.stream(methodName, ...params).map((value) => {
            if (logger) {
              logger("GET", methodName, ...params, "RECEIVE", value);
            }
            return value;
          }).subscribe(subscriber);
        });
      },
      send(methodName, ...params) {
        if (logger) logger("SEND", methodName, ...params);
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

/***/ 853:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  MZ: () => (/* reexport */ ClientError),
  HY: () => (/* reexport */ EMPTY_SPACE),
  hm: () => (/* reexport */ JrRestApi),
  JD: () => (/* reexport */ RequestFailedError),
  Or: () => (/* reexport */ TokenAuthorizationProvider),
  gz: () => (/* reexport */ VisitorAuthenticationProvider),
  yO: () => (/* reexport */ clientConfig),
  gd: () => (/* reexport */ cmsRestApi),
  g2: () => (/* reexport */ cmsRetrieval),
  gM: () => (/* reexport */ createRestApiClient),
  x6: () => (/* reexport */ fetchJson),
  tf: () => (/* reexport */ getIamAuthUrl),
  R: () => (/* reexport */ getTokenProvider),
  X5: () => (/* reexport */ getWorkspaceChanges),
  LD: () => (/* reexport */ getWorkspaceId),
  HM: () => (/* reexport */ isDataLocatorOperatorFilter),
  dQ: () => (/* reexport */ isEmptySpaceId),
  MV: () => (/* reexport */ isExistentObjJson),
  _p: () => (/* reexport */ isRelationalOpCode),
  g7: () => (/* reexport */ isRevisionObjSpaceId),
  a8: () => (/* reexport */ isUnavailableObjJson),
  Xj: () => (/* reexport */ isWidgetAttributeJson),
  zt: () => (/* reexport */ isWidgetlistAttributeJson),
  Qk: () => (/* reexport */ isWorkspaceObjSpaceId),
  E2: () => (/* reexport */ loginRedirectHandler),
  Ep: () => (/* reexport */ replaceCmsRetrieval),
  yd: () => (/* reexport */ retrieveObj),
  If: () => (/* reexport */ setLoggedInIndicatorParam),
  HG: () => (/* reexport */ setupRegisterVerificator),
  Yy: () => (/* reexport */ withEachAttributeJson),
  yB: () => (/* reexport */ withLoginHandler)
});

// UNUSED EXPORTS: ApiClient, DEFAULT_OP_CODES, ExponentialBackoff, MissingWorkspaceError, OP_CODES, RELATIONAL_OPERATOR_FILTER_OP_CODES, fetchBrowserToken, injectBrowserToken, isComparisonRange, isDataLocatorOperatorCode, isDataLocatorValueFilter, isObjSpaceId, objSpaceIdsEqual, retrieveObjFieldDiffs, setIdentityProvider, useDefaultPriority

// EXTERNAL MODULE: external "lodash-es/merge"
var merge_ = __webpack_require__(2925);
var merge_default = /*#__PURE__*/__webpack_require__.n(merge_);
;// CONCATENATED MODULE: ./scrivito_sdk/client/api_client.ts

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

function assertAuthViaOptions(options) {
  if (!options) return;
  const { authViaAccount, authViaInstance } = options;
  if (authViaAccount && authViaInstance) {
    throw new Error(
      "authViaAccount and authViaInstance are mutually exclusive"
    );
  }
}
class ApiClient {
  constructor(fetchCallback, options) {
    this.fetchCallback = fetchCallback;
    this.options = options;
  }
  fetch(path, options) {
    const mergedOptions = merge_default()(
      {},
      this.options,
      options
    );
    assertAuthViaOptions(mergedOptions);
    return this.fetchCallback(path, mergedOptions);
  }
  get(path, options) {
    return this.fetch(path, __spreadProps(__spreadValues({}, options), { method: "GET" }));
  }
  // note: only for internal use. will be remove in the future.
  getWithoutLogin(path, options) {
    return this.fetch(path, __spreadProps(__spreadValues({}, options), {
      // return null if a request fails due to missing login
      loginHandler: () => __async(this, null, function* () {
        return null;
      })
    }));
  }
  post(path, options) {
    return this.fetch(path, __spreadProps(__spreadValues({}, options), { method: "POST" }));
  }
  put(path, options) {
    return this.fetch(path, __spreadProps(__spreadValues({}, options), { method: "PUT" }));
  }
  patch(path, options) {
    return this.fetch(path, __spreadProps(__spreadValues({}, options), { method: "PATCH" }));
  }
  delete(path, options) {
    return this.fetch(path, __spreadProps(__spreadValues({}, options), { method: "DELETE" }));
  }
}

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 63 modules
var common = __webpack_require__(4665);
;// CONCATENATED MODULE: ./scrivito_sdk/client/fetch_with_timeout.ts

var fetch_with_timeout_defProp = Object.defineProperty;
var fetch_with_timeout_defProps = Object.defineProperties;
var fetch_with_timeout_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var fetch_with_timeout_getOwnPropSymbols = Object.getOwnPropertySymbols;
var fetch_with_timeout_hasOwnProp = Object.prototype.hasOwnProperty;
var fetch_with_timeout_propIsEnum = Object.prototype.propertyIsEnumerable;
var fetch_with_timeout_defNormalProp = (obj, key, value) => key in obj ? fetch_with_timeout_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var fetch_with_timeout_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (fetch_with_timeout_hasOwnProp.call(b, prop))
      fetch_with_timeout_defNormalProp(a, prop, b[prop]);
  if (fetch_with_timeout_getOwnPropSymbols)
    for (var prop of fetch_with_timeout_getOwnPropSymbols(b)) {
      if (fetch_with_timeout_propIsEnum.call(b, prop))
        fetch_with_timeout_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var fetch_with_timeout_spreadProps = (a, b) => fetch_with_timeout_defProps(a, fetch_with_timeout_getOwnPropDescs(b));
var fetch_with_timeout_async = (__this, __arguments, generator) => {
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


function fetchWithTimeout(resource, options) {
  return fetch_with_timeout_async(this, null, function* () {
    const abortController = new AbortController();
    const timer = (0,common/* setTimeout */.wg)(() => abortController.abort(), 15e3);
    const fetchOptions = fetch_with_timeout_spreadProps(fetch_with_timeout_spreadValues({}, options), { signal: abortController.signal });
    try {
      return yield fetch(resource, fetchOptions);
    } catch (error) {
      throw new RequestFailedError(getErrorMessage(error), {
        url: resource,
        method: (options == null ? void 0 : options.method) || "GET"
      });
    } finally {
      clearTimeout(timer);
    }
  });
}
function getErrorMessage(error) {
  if (error instanceof Error) {
    if (isErrorWithCause(error)) {
      return `${error.message}. ${String(error.cause)}`;
    }
    return error.message;
  }
  return "";
}
function isErrorWithCause(error) {
  return "cause" in error && error.cause instanceof Error;
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/client_error.ts


class ClientError extends common/* ScrivitoError */.aS {
  constructor(message, code, details, httpStatus, requestDetails = {}) {
    super(message);
    this.message = message;
    this.code = code;
    this.details = details;
    this.httpStatus = httpStatus;
    this.requestDetails = requestDetails;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/cms_rest_api/parse_or_throw_request_failed_error.ts


function parseOrThrowRequestFailedError(jsonText) {
  try {
    return JSON.parse(jsonText);
  } catch (e) {
    throw new RequestFailedError(jsonText);
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/is_error_response.ts


function isErrorResponse(parsedResponse) {
  if (!(0,common/* isObject */.Gv)(parsedResponse)) return false;
  const errorType = typeof parsedResponse.error;
  const codeType = typeof parsedResponse.code;
  const details = parsedResponse.details;
  return errorType === "string" && (codeType === "string" || codeType === "undefined") && ((0,common/* isObject */.Gv)(details) || details === void 0);
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/parse_error_response.ts




function parseErrorResponse(responseText) {
  const parsedResponse = parseOrThrowRequestFailedError(responseText);
  if (isErrorResponse(parsedResponse)) {
    const { error, code, details } = parsedResponse;
    return {
      message: error,
      code,
      details: details || {}
    };
  }
  throw new RequestFailedError("Could not parse error response");
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
function parseResponse(response) {
  return parse_response_async(this, null, function* () {
    const responseText = yield (0,common/* registerAsyncTask */.lK)(() => response.text());
    const httpStatus = response.status;
    if (httpStatus >= 200 && httpStatus < 300) {
      if (!responseText.length) return null;
      return parseOrThrowRequestFailedError(responseText);
    }
  });
}
function throwOnError(response, requestDetails) {
  return parse_response_async(this, null, function* () {
    const httpStatus = response.status;
    if (httpStatus >= 200 && httpStatus < 300) return response;
    const responseText = yield (0,common/* registerAsyncTask */.lK)(() => response.text());
    if (httpStatus >= 400 && httpStatus < 500) {
      const {
        message: originalMessage,
        code,
        details
      } = parseErrorResponse(responseText);
      const message2 = (0,common/* uniqueErrorMessage */.hf)(originalMessage);
      if (httpStatus === 403) throw new AccessDeniedError(message2, code, details);
      throw new ClientError(message2, code, details, httpStatus, requestDetails);
    }
    const parsedResponse = parseOrThrowRequestFailedError(responseText);
    const message = httpStatus === 500 && isErrorResponse(parsedResponse) ? parsedResponse.error : responseText;
    throw new RequestFailedError((0,common/* uniqueErrorMessage */.hf)(message));
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/exponential_backoff.ts


class ExponentialBackoff {
  constructor() {
    this.retryCount = 0;
  }
  // for test purposes only
  numberOfRetries() {
    return this.retryCount;
  }
  /** waits for an exponentially increasing amount of time */
  nextDelay() {
    const timeToWait = Math.pow(2, Math.min(this.retryCount, 16)) * 500;
    this.retryCount++;
    return (0,common/* waitMs */.Cu)(timeToWait);
  }
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


function requestWithRateLimitRetry(request) {
  return retry_async(this, null, function* () {
    if (retriesAreDisabled) return request();
    const backoff = new ExponentialBackoff();
    while (true) {
      const response = yield request();
      if (response.status !== 429) return response;
      if (limitedRetries && backoff.numberOfRetries() > 19) throw new Error();
      yield backoff.nextDelay();
    }
  });
}
function retryOnRequestFailed(request) {
  return retry_async(this, null, function* () {
    if (retriesAreDisabled) return request();
    const backoff = new ExponentialBackoff();
    while (true) {
      try {
        return yield request();
      } catch (error) {
        if (!(error instanceof RequestFailedError)) throw error;
        if (limitedRetries && backoff.numberOfRetries() > 5) throw error;
        console.info(`"${String(error)}". Retrying the request...`);
        yield backoff.nextDelay();
      }
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

;// CONCATENATED MODULE: ./scrivito_sdk/client/fetch_json.ts

var fetch_json_defProp = Object.defineProperty;
var fetch_json_defProps = Object.defineProperties;
var fetch_json_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var fetch_json_getOwnPropSymbols = Object.getOwnPropertySymbols;
var fetch_json_hasOwnProp = Object.prototype.hasOwnProperty;
var fetch_json_propIsEnum = Object.prototype.propertyIsEnumerable;
var fetch_json_defNormalProp = (obj, key, value) => key in obj ? fetch_json_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var fetch_json_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (fetch_json_hasOwnProp.call(b, prop))
      fetch_json_defNormalProp(a, prop, b[prop]);
  if (fetch_json_getOwnPropSymbols)
    for (var prop of fetch_json_getOwnPropSymbols(b)) {
      if (fetch_json_propIsEnum.call(b, prop))
        fetch_json_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var fetch_json_spreadProps = (a, b) => fetch_json_defProps(a, fetch_json_getOwnPropDescs(b));
var fetch_json_async = (__this, __arguments, generator) => {
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



function fetchJson(url, options) {
  return fetch_json_async(this, null, function* () {
    var _a;
    const data = options == null ? void 0 : options.data;
    if (data) {
      return fetchJson(url, calculateDataFetchOptions(data, options));
    }
    const params = options == null ? void 0 : options.params;
    if (params) {
      return fetchJson(encodeParameters(url, params), fetch_json_spreadProps(fetch_json_spreadValues({}, options), {
        params: void 0
      }));
    }
    const authorizedRequest = calculateAuthorizedRequest(url, options);
    const isIdempotent = (_a = options == null ? void 0 : options.isIdempotent) != null ? _a : (options == null ? void 0 : options.method) !== "POST";
    const nonIdempotentRequest = () => fetch_json_async(null, null, function* () {
      return parseResponse(
        yield throwOnError(yield requestWithRateLimitRetry(authorizedRequest), {
          url,
          method: options == null ? void 0 : options.method
        })
      );
    });
    return isIdempotent ? retryOnRequestFailed(nonIdempotentRequest) : nonIdempotentRequest();
  });
}
function calculateDataFetchOptions(data, options) {
  const isFormData = data instanceof FormData;
  return fetch_json_spreadProps(fetch_json_spreadValues({}, options), {
    headers: fetch_json_spreadValues(fetch_json_spreadValues({}, options.headers), !isFormData && { "Content-Type": "application/json; charset=utf-8" }),
    body: isFormData ? data : JSON.stringify(data),
    data: void 0
  });
}
function calculateAuthorizedRequest(url, options) {
  var _a;
  const plainRequest = calculatePlainRequest(url, options);
  if (options == null ? void 0 : options.skipAuthorization) return plainRequest;
  const authHeaderToken = (_a = options == null ? void 0 : options.headers) == null ? void 0 : _a.Authorization;
  if (authHeaderToken) return () => plainRequest(authHeaderToken);
  const authProvider = options == null ? void 0 : options.authProvider;
  return authProvider ? () => authProvider.authorize(plainRequest) : plainRequest;
}
function calculatePlainRequest(url, options) {
  return (authorization) => fetchWithTimeout(url, calculatePlainRequestOptions(authorization, options));
}
function calculatePlainRequestOptions(authorization, options) {
  const credentials = calculateRequestCredentials(authorization, options);
  if (authorization) {
    return fetch_json_spreadProps(fetch_json_spreadValues({}, options), {
      headers: fetch_json_spreadProps(fetch_json_spreadValues({}, options == null ? void 0 : options.headers), { Authorization: authorization }),
      credentials
    });
  }
  return fetch_json_spreadProps(fetch_json_spreadValues({}, options), { credentials });
}
function calculateRequestCredentials(authorization, options) {
  const credentials = options == null ? void 0 : options.credentials;
  if (credentials) return credentials;
  return authorization || (options == null ? void 0 : options.skipAuthorization) ? "omit" : "include";
}
function encodeParameters(url, params) {
  const apiUrl = new URL(url);
  for (const [name, value] of Object.entries(params)) {
    if (typeof value === "string") apiUrl.searchParams.append(name, value);
  }
  return apiUrl.toString();
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/join_paths.ts

function joinPaths(startPath, endPath) {
  if (endPath === "") return startPath;
  return `${startPath}/${endPath.replace(/^\//, "")}`;
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/login_handler.ts

var login_handler_async = (__this, __arguments, generator) => {
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

function withLoginHandler(loginHandler, fn) {
  return login_handler_async(this, null, function* () {
    if (!loginHandler) return fn();
    try {
      return yield fn();
    } catch (error) {
      if (loginHandler && isAuthError(error)) {
        return loginHandler(error.details.visit);
      }
      throw error;
    }
  });
}
const ERROR_CODE_AUTH_CHECK_REQUIRED = "auth_check_required";
const ERROR_CODE_AUTH_MISSING = "auth_missing";
function isAuthError(error) {
  return error instanceof ClientError && (error.code === ERROR_CODE_AUTH_MISSING || error.code === ERROR_CODE_AUTH_CHECK_REQUIRED) && "visit" in error.details && typeof error.details.visit === "string";
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/login_redirect_handler.ts

var login_redirect_handler_async = (__this, __arguments, generator) => {
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


function loginRedirectHandler(visit, idp) {
  return login_redirect_handler_async(this, null, function* () {
    (0,common/* assignLocation */.dT)(yield authenticationUrl(visit, idp));
    return (0,common/* never */.Zm)();
  });
}
let globalIdp;
function setIdentityProvider(idp) {
  globalIdp = idp;
}
function getIdentityProvider() {
  return globalIdp;
}
let loggedInParamName;
function setLoggedInIndicatorParam(paramName) {
  loggedInParamName = paramName;
}
function authenticationUrl(visit, idp) {
  return login_redirect_handler_async(this, null, function* () {
    let authUrl = visit.replace("$RETURN_TO", encodeURIComponent(returnToUrl()));
    const iamAuthLocation = (yield clientConfig.fetch()).iamAuthLocation;
    if (!iamAuthLocation) throw new common/* InternalError */.Gd();
    authUrl = authUrl.replace("$JR_API_LOCATION/iam/auth", iamAuthLocation);
    const identityProvider = globalIdp || idp;
    if (!identityProvider) return authUrl;
    const authUrlWithIdp = new URL(authUrl);
    authUrlWithIdp.searchParams.set("idp", identityProvider);
    return authUrlWithIdp.toString();
  });
}
function returnToUrl() {
  const url = new URL((0,common/* currentHref */.pb)());
  if (loggedInParamName) url.searchParams.set(loggedInParamName, "");
  return url.toString();
}
(0,common/* onReset */.Nj)(() => {
  globalIdp = void 0;
  loggedInParamName = void 0;
});

;// CONCATENATED MODULE: ./scrivito_sdk/client/create_rest_api_client.ts

var create_rest_api_client_defProp = Object.defineProperty;
var create_rest_api_client_getOwnPropSymbols = Object.getOwnPropertySymbols;
var create_rest_api_client_hasOwnProp = Object.prototype.hasOwnProperty;
var create_rest_api_client_propIsEnum = Object.prototype.propertyIsEnumerable;
var create_rest_api_client_defNormalProp = (obj, key, value) => key in obj ? create_rest_api_client_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var create_rest_api_client_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (create_rest_api_client_hasOwnProp.call(b, prop))
      create_rest_api_client_defNormalProp(a, prop, b[prop]);
  if (create_rest_api_client_getOwnPropSymbols)
    for (var prop of create_rest_api_client_getOwnPropSymbols(b)) {
      if (create_rest_api_client_propIsEnum.call(b, prop))
        create_rest_api_client_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var create_rest_api_client_async = (__this, __arguments, generator) => {
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






function createRestApiClient(baseUrl, options) {
  return new ApiClient(
    (url, fetchOptions) => create_rest_api_client_async(null, null, function* () {
      return create_rest_api_client_fetch(joinPaths(baseUrl, url), fetchOptions);
    }),
    options
  );
}
function create_rest_api_client_fetch(_0) {
  return create_rest_api_client_async(this, arguments, function* (url, {
    audience,
    data,
    headers,
    loginHandler,
    idp,
    method: verb,
    params,
    authViaAccount,
    authViaInstance,
    credentials
  } = {}) {
    var _a;
    const method = (_a = verb == null ? void 0 : verb.toUpperCase()) != null ? _a : "GET";
    const authorization = headers && "Authorization" in headers ? headers.Authorization : void 0;
    const authProvider = calculateAuthProvider({
      url,
      authorization,
      audience,
      authViaAccount,
      authViaInstance
    });
    const fetchFn = () => fetchJson(url, {
      data,
      authProvider,
      headers: removeNullValues(headers),
      skipAuthorization: authorization === null,
      params,
      method,
      credentials
    });
    if (authorization !== void 0) return fetchFn();
    if (method === "GET") {
      return withLoginHandler(
        yield calculateLoginHandler({ loginHandler, idp }),
        fetchFn
      );
    }
    return fetchFn();
  });
}
function calculateLoginHandler(_0) {
  return create_rest_api_client_async(this, arguments, function* ({
    loginHandler,
    idp
  }) {
    if (loginHandler) return loginHandler;
    if ((yield clientConfig.fetch()).loginHandler !== "redirect") return;
    return (visit) => loginRedirectHandler(visit, idp);
  });
}
function calculateAuthProvider({
  url,
  authorization,
  audience,
  authViaAccount,
  authViaInstance
}) {
  if (authorization !== void 0) return;
  return getTokenProvider(create_rest_api_client_spreadValues(create_rest_api_client_spreadValues({
    audience: audience || new URL(url).origin
  }, authViaAccount && { authViaAccount }), authViaInstance && { authViaInstance }));
}
function removeNullValues(headers = {}) {
  return Object.fromEntries(
    Object.entries(headers).filter(([, v]) => v !== null)
  );
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/get_client_version.ts


function getClientVersion() {
  const clientVersion = "jssdk/1.29.0-dev-1-g241941be604f";
  if (!clientVersion) throw new common/* InternalError */.Gd();
  return clientVersion;
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/verificator_functions.ts


let registry = {};
function verificator_functions_fetch(verificatorId, verificatorUrl) {
  let deferred = registry[verificatorId];
  if (!deferred) {
    deferred = new common/* Deferred */.cY();
    registry[verificatorId] = deferred;
    (0,common/* loadJs */.kW)(verificatorUrl);
  }
  return deferred.promise;
}
function setupRegisterVerificator() {
  window._scrivitoRegisterVerificator = (verificatorId, verificatorFunction) => registry[verificatorId].resolve(verificatorFunction);
}
(0,common/* onReset */.Nj)(() => registry = {});

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
      if (response.status === 401) {
        const responseText = yield (0,common/* registerAsyncTask */.lK)(
          () => response.clone().text()
        );
        const { details, code } = parseErrorResponse(responseText);
        if (code === ERROR_CODE_CLIENT_VERIFICATION_REQUIRED) {
          if (!isChallenge(details)) {
            throw new RequestFailedError("verification without challenge");
          }
          verification = yield computeVerification(details);
          return this.authorize(request);
        }
      }
      return response;
    });
  },
  // integration test support
  currentState() {
    const authorization = currentAuthorization();
    if (authorization) {
      return `Authorization: ${authorization}`;
    }
    if (computation) {
      const challenge = computation.challenge;
      return `Pending computation: ${challenge.verificator.id} with ${String(
        challenge.data
      )}`;
    }
    return null;
  }
};
function computeVerification(challenge) {
  return public_authentication_async(this, null, function* () {
    if (!computation) {
      const { verificator, data } = challenge;
      const promise = (() => public_authentication_async(null, null, function* () {
        const compute = yield verificator_functions_fetch(
          verificator.id,
          verificator.url
        );
        return new Promise((resolve) => {
          compute(data, (result) => resolve(result));
        });
      }))();
      computation = {
        challenge: { verificator, data },
        promise: (0,common/* promiseAndFinally */.Qk)(promise, () => {
          computation = void 0;
        })
      };
    }
    return computation.promise;
  });
}
function isChallenge(maybeChallenge) {
  return !!maybeChallenge.verificator;
}
function currentAuthorization() {
  if (!verification) return;
  if (verification.expiresAfter < /* @__PURE__ */ new Date()) {
    verification = void 0;
    return;
  }
  return verification.authorization;
}
(0,common/* onReset */.Nj)(() => {
  computation = void 0;
  verification = void 0;
});

;// CONCATENATED MODULE: ./scrivito_sdk/client/cms_rest_api.ts

var cms_rest_api_defProp = Object.defineProperty;
var cms_rest_api_defProps = Object.defineProperties;
var cms_rest_api_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var cms_rest_api_getOwnPropSymbols = Object.getOwnPropertySymbols;
var cms_rest_api_hasOwnProp = Object.prototype.hasOwnProperty;
var cms_rest_api_propIsEnum = Object.prototype.propertyIsEnumerable;
var cms_rest_api_defNormalProp = (obj, key, value) => key in obj ? cms_rest_api_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var cms_rest_api_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (cms_rest_api_hasOwnProp.call(b, prop))
      cms_rest_api_defNormalProp(a, prop, b[prop]);
  if (cms_rest_api_getOwnPropSymbols)
    for (var prop of cms_rest_api_getOwnPropSymbols(b)) {
      if (cms_rest_api_propIsEnum.call(b, prop))
        cms_rest_api_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var cms_rest_api_spreadProps = (a, b) => cms_rest_api_defProps(a, cms_rest_api_getOwnPropDescs(b));
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







class MissingWorkspaceError extends common/* ScrivitoError */.aS {
}
let requestsAreDisabled;
let fallbackPriority;
function useDefaultPriority(priority) {
  fallbackPriority = priority;
}
class CmsRestApi {
  constructor() {
    this.configDeferred = new common/* Deferred */.cY();
  }
  init({
    apiBaseUrl,
    authorizationProvider,
    priority,
    accessAsEditor,
    analyticsProvider
  }) {
    this.config = {
      apiBaseUrl,
      analyticsProvider,
      accessAsEditor,
      priority,
      authorizationProvider: authorizationProvider != null ? authorizationProvider : PublicAuthentication
    };
    this.configDeferred.resolve(this.config);
  }
  rejectRequests() {
    requestsAreDisabled = true;
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
  requestVisitorSession(sessionId, token) {
    return cms_rest_api_async(this, null, function* () {
      return this.request({
        method: "PUT",
        path: `sessions/${sessionId}`,
        authorizationProvider: {
          authorize(request) {
            return request(`id_token ${token}`);
          }
        }
      });
    });
  }
  // For test purpose only.
  currentPublicAuthorizationState() {
    var _a, _b, _c, _d;
    if ((_a = this.config) == null ? void 0 : _a.authorizationProvider) {
      if ((_b = this.config) == null ? void 0 : _b.authorizationProvider.currentState) {
        return `[API] ${(_d = (_c = this.config) == null ? void 0 : _c.authorizationProvider.currentState()) != null ? _d : "null"}`;
      }
      return "[API]: authorization provider without currentState()";
    }
    return "[API]: no authorization provider";
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
      authorizationProvider
    }) {
      if (requestsAreDisabled) {
        throw new common/* InternalError */.Gd("Unexpected CMS backend access.");
      }
      const config = yield this.configDeferred.promise;
      const tenant = yield (0,common/* fetchConfiguredTenant */.lT)();
      const url = `${config.apiBaseUrl}/tenants/${tenant}/perform`;
      try {
        return yield withLoginHandler(
          loginRedirectHandler,
          () => fetchJson(url, {
            method: method === "POST" ? "POST" : "PUT",
            headers: getHeaders(config),
            data: cms_rest_api_spreadValues({
              path,
              verb: method,
              params: requestParams
            }, config.analyticsProvider && config.analyticsProvider()),
            authProvider: getAuthorizationProviderForRequest(
              authorizationProvider,
              config
            ),
            credentials: "omit"
          })
        );
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
          yield (0,common/* wait */.uk)(2);
          const result = yield this.get(`tasks/${task.id}`);
          return this.handleTask(result);
        }
        default:
          throw new RequestFailedError("Invalid task response (unknown status)");
      }
    });
  }
}
function getHeaders(config) {
  let headers = {
    "Scrivito-Client": getClientVersion()
  };
  const priorityWithFallback = config.priority || fallbackPriority;
  if (priorityWithFallback === "background") {
    headers = cms_rest_api_spreadProps(cms_rest_api_spreadValues({}, headers), {
      "Scrivito-Priority": priorityWithFallback
    });
  }
  if (config.accessAsEditor) {
    headers = cms_rest_api_spreadProps(cms_rest_api_spreadValues({}, headers), {
      "Scrivito-Access-As": "editor"
    });
  }
  return headers;
}
function getAuthorizationProviderForRequest(authorizationProvider, config) {
  if (authorizationProvider === void 0) {
    return config.authorizationProvider;
  }
  if (authorizationProvider === null) return void 0;
  return authorizationProvider;
}
function isTaskResponse(result) {
  return !!result && !!result.task && Object.keys(result).length === 1;
}
let cmsRestApi = new CmsRestApi();
function resetCmsRestApi() {
  cmsRestApi = new CmsRestApi();
  requestsAreDisabled = void 0;
}
(0,common/* onReset */.Nj)(resetCmsRestApi);

;// CONCATENATED MODULE: ./scrivito_sdk/client/request_failed_error.ts


class RequestFailedError extends common/* ScrivitoError */.aS {
  constructor(message, requestDetails) {
    super(message);
    this.requestDetails = requestDetails;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/obj_json.ts


const DEFAULT_OP_CODES = ["eq", "neq"];
const RELATIONAL_OPERATOR_FILTER_OP_CODES = [
  "gt",
  "lt",
  "gte",
  "lte"
];
const OP_CODES = [
  ...DEFAULT_OP_CODES,
  ...RELATIONAL_OPERATOR_FILTER_OP_CODES
];
const OPERATOR_FILTER_OP_CODES = [
  "neq",
  ...RELATIONAL_OPERATOR_FILTER_OP_CODES
];
function isDataLocatorOperatorFilter(filter) {
  return (0,common/* isObject */.Gv)(filter) && "field" in filter && typeof filter.field === "string" && "operator" in filter && isDataLocatorOperatorCode(filter.operator) && "value" in filter && isFilterValue(filter.value);
}
function isDataLocatorOperatorCode(opCode) {
  return typeof opCode === "string" && OPERATOR_FILTER_OP_CODES.includes(opCode);
}
function isRelationalOpCode(opCode) {
  return RELATIONAL_OPERATOR_FILTER_OP_CODES.includes(
    opCode
  );
}
function isFilterValue(value) {
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value === null;
}
function isDataLocatorValueFilter(filter) {
  const { value, field } = filter;
  return isObject(filter) && typeof field === "string" && !filter.operator && isFilterValue(value);
}
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


const EMPTY_SPACE = ["empty"];
function getWorkspaceId(spaceId) {
  if (!isWorkspaceObjSpaceId(spaceId)) throw new common/* InternalError */.Gd();
  return spaceId[1];
}
function isEmptySpaceId(spaceId) {
  return spaceId[0] === "empty";
}
function isWorkspaceObjSpaceId(spaceId) {
  return spaceId[0] === "workspace";
}
function isRevisionObjSpaceId(spaceId) {
  return spaceId[0] === "revision";
}
function obj_space_id_isObjSpaceId(maybeObjSpaceId) {
  if (!Array.isArray(maybeObjSpaceId)) return false;
  if (maybeObjSpaceId.length === 2) {
    const [t, id] = maybeObjSpaceId;
    return (t === "revision" || t === "workspace") && typeof id === "string";
  }
  return maybeObjSpaceId.length === 1 && maybeObjSpaceId[0] === "empty";
}
function asBackendObjSpaceId(objSpaceId) {
  return objSpaceId.join(":");
}
function objSpaceIdsEqual(objSpaceId1, objSpaceId2) {
  return objSpaceId1[0] === objSpaceId2[0] && objSpaceId1[1] === objSpaceId2[1];
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
    if (isEmptySpaceId(objSpaceId)) return buildNonexistentObjJson(id);
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
  const cacheKey = (0,common/* computeCacheKey */.xn)(objSpaceId);
  let batchRetrieval = batchRetrievals[cacheKey];
  if (!batchRetrieval) {
    batchRetrieval = buildBatchRetrieval(objSpaceId);
    batchRetrievals[cacheKey] = batchRetrieval;
  }
  return batchRetrieval;
}
function buildBatchRetrieval(objSpaceId) {
  const [spaceType, spaceId] = objSpaceId;
  const endpoint = `${spaceType}s/${(0,common/* assumePresence */.W3)(spaceId)}/objs/mget`;
  const includeDeleted = spaceType === "workspace" || void 0;
  return new common/* BatchRetrieval */.vL(
    (keys) => obj_retrieval_async(null, null, function* () {
      const response = yield cmsRestApi.get(endpoint, {
        ids: keys.map(([id, format]) => format === "full" ? id : [id]),
        include_deleted: includeDeleted
      });
      return response.results.map(
        (result, index) => result || buildNonexistentObjJson(keys[index][0])
      );
    }),
    // Question: Why the magic batchSize: 17?
    // Answer: Retrieval of up to 100 Objs is a common use-case (see ObjSearch)
    // With a batchSize of 17, this leads to 6 concurrent requests, which is
    // the concurrent request limit in many browsers for HTTP/1.
    // This ensures maximum parallel loading.
    { batchSize: 17 }
  );
}
(0,common/* onReset */.Nj)(() => batchRetrievals = {});

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

var binary_urls_retrieval_async = (__this, __arguments, generator) => {
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



const batchRetrieval = new common/* BatchRetrieval */.vL(
  (blobs) => binary_urls_retrieval_async(null, null, function* () {
    const { results } = yield cmsRestApi.get("blobs/mget", { blobs });
    return results.map((result) => result);
  })
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

var facet_query_retrieval_async = (__this, __arguments, generator) => {
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

function retrieveFacetQuery(workspaceId, params) {
  return facet_query_retrieval_async(this, null, function* () {
    try {
      return yield cmsRestApi.get(
        `workspaces/${workspaceId}/objs/search`,
        params
      );
    } catch (error) {
      if (error instanceof MissingWorkspaceError) return { facets: [[]] };
      throw error;
    }
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/obj_field_diffs_retrieval.ts

var obj_field_diffs_retrieval_async = (__this, __arguments, generator) => {
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


function retrieveObjFieldDiffs(from, to, objId) {
  return obj_field_diffs_retrieval_async(this, null, function* () {
    try {
      const response = yield cmsRestApi.get(`objs/${objId}/diff`, {
        from: asBackendObjSpaceId(from),
        to: asBackendObjSpaceId(to)
      });
      return response;
    } catch (error) {
      if (error instanceof MissingWorkspaceError) return {};
      throw error;
    }
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/obj_query_retrieval.ts

var obj_query_retrieval_async = (__this, __arguments, generator) => {
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

function retrieveObjQuery(workspaceId, params) {
  return obj_query_retrieval_async(this, null, function* () {
    try {
      const { results, total, continuation, objs } = yield cmsRestApi.get(
        `workspaces/${workspaceId}/objs/search`,
        params
      );
      return {
        results: results.map((result) => result.id),
        continuation,
        total,
        objs
      };
    } catch (error) {
      if (error instanceof MissingWorkspaceError) {
        return { results: [], total: 0 };
      }
      throw error;
    }
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/suggest_retrieval.ts

var suggest_retrieval_async = (__this, __arguments, generator) => {
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

function retrieveSuggest(workspaceId, params) {
  return suggest_retrieval_async(this, null, function* () {
    try {
      const response = yield cmsRestApi.put(
        `workspaces/${workspaceId}/objs/search/suggest`,
        params
      );
      return response;
    } catch (error) {
      if (error instanceof MissingWorkspaceError) return { results: [] };
      throw error;
    }
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

;// CONCATENATED MODULE: ./scrivito_sdk/client/jr_rest_api.ts

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




function getIamAuthUrl(path = "") {
  return jr_rest_api_async(this, null, function* () {
    const iamAuthLocation = (yield clientConfig.fetch()).iamAuthLocation;
    if (!iamAuthLocation) throw new common/* InternalError */.Gd();
    return joinPaths(iamAuthLocation, path);
  });
}
const JrRestApi = createRestApiClient("https://api.justrelate.com");

;// CONCATENATED MODULE: ./scrivito_sdk/client/config.ts


const clientConfig = new common/* ConfigStore */.s9();

;// CONCATENATED MODULE: ./scrivito_sdk/client/comparison_range.ts


function isComparisonRange(input) {
  if (!Array.isArray(input)) return false;
  if (input.length !== 2) return false;
  return input.every(isObjSpaceId);
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/get_workspace_changes.ts


function getWorkspaceChanges(workspace, from) {
  const workspaceId = getWorkspaceId(workspace);
  return cmsRestApi.get(`workspaces/${workspaceId}/changes`, {
    from
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/browser_token.ts

var browser_token_async = (__this, __arguments, generator) => {
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




function fetchBrowserToken(_0) {
  return browser_token_async(this, arguments, function* ({
    audience,
    origin,
    authViaAccount,
    authViaInstance
  }) {
    const authLocation = yield getIamAuthUrl();
    const authPath = authViaAccount ? `account/${authViaAccount}` : `instance/${authViaInstance || (yield (0,common/* fetchConfiguredTenant */.lT)())}`;
    try {
      const response = yield fetchJson(`${authLocation}/${authPath}/token`, {
        params: { audience, origin }
      });
      assertTokenResponse(response);
      return response.access_token;
    } catch (error) {
      throw resolveLocationInAuthError(error, authLocation);
    }
  });
}
function resolveLocationInAuthError(error, authLocation) {
  if (!isAuthError(error)) return error;
  return new ClientError(error.message, error.code, {
    visit: error.details.visit.replace("$JR_AUTH_LOCATION", authLocation)
  });
}
function assertTokenResponse(response) {
  if (response && typeof response === "object" && "access_token" in response && typeof response.access_token === "string") {
    return;
  }
  throw new common/* InternalError */.Gd();
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/token_manager.ts

var token_manager_async = (__this, __arguments, generator) => {
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



let providerCache = {};
function getTokenProvider(params) {
  const cacheKey = (0,common/* computeCacheKey */.xn)(params);
  const cachedProvider = providerCache[cacheKey];
  if (cachedProvider) return cachedProvider;
  const newProvider = new TokenAuthorizationProvider(() => token_manager_async(null, null, function* () {
    const { iamTokenFetcher } = yield clientConfig.fetch();
    return iamTokenFetcher ? iamTokenFetcher(params) : fetchBrowserToken(params);
  }));
  providerCache[cacheKey] = newProvider;
  return newProvider;
}
function injectBrowserToken(params, token) {
  getTokenProvider(params).injectToken(token);
}
(0,common/* onReset */.Nj)(() => providerCache = {});

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
    this.sessionId = (0,common/* randomId */.zE)();
    this.idToken = new common/* Deferred */.cY();
    this.state = "waiting for token";
    this.sessionRequest = this.fetchSession();
  }
  setToken(token) {
    if (!this.idToken.isPending()) {
      this.idToken = new common/* Deferred */.cY();
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
      } catch (e) {
        return PublicAuthentication.authorize(request);
      }
      const response = yield request(`Session ${session.token}`);
      if (response.status === 401) {
        if (this.sessionRequest === sessionRequest) this.renewSession();
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
        const token = yield this.idToken;
        return yield cmsRestApi.requestVisitorSession(this.sessionId, token);
      } catch (error) {
        (0,common/* throwNextTick */.JL)(
          new common/* ScrivitoError */.aS(
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
  if (!isExistentObjJson(objJson)) return;
  Object.keys(objJson).forEach((attrName) => {
    if (!(0,common/* isSystemAttribute */.iI)(attrName)) {
      const value = objJson[attrName];
      if (!value) return;
      fn(value, attrName);
      return;
    }
    if (attrName !== "_widget_pool") return;
    const widgetPoolJson = objJson._widget_pool;
    if (!widgetPoolJson) return;
    Object.keys(widgetPoolJson).forEach((widgetId) => {
      const widgetJson = widgetPoolJson[widgetId];
      if (!widgetJson) return;
      Object.keys(widgetJson).forEach((widgetAttrName) => {
        if ((0,common/* isSystemAttribute */.iI)(widgetAttrName)) return;
        const value = widgetJson[widgetAttrName];
        if (!value) return;
        fn(value, widgetAttrName, widgetId);
      });
    });
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/token_authorization_provider.ts

var token_authorization_provider_async = (__this, __arguments, generator) => {
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





class TokenAuthorizationError extends common/* ScrivitoError */.aS {
  constructor(message, code, httpStatus, requestDetails = {}) {
    super(message);
    this.message = message;
    this.code = code;
    this.httpStatus = httpStatus;
    this.requestDetails = requestDetails;
  }
}
class TokenAuthorizationProvider {
  constructor(fetchToken) {
    this.fetchToken = fetchToken;
  }
  authorize(request) {
    return token_authorization_provider_async(this, null, function* () {
      return this.authorizeAbstract(
        (auth) => token_authorization_provider_async(this, null, function* () {
          const result = yield request(auth ? `Bearer ${auth}` : void 0);
          if (result.status !== 401) return { result };
          const contentType = result.headers.get("content-type");
          if (!(contentType == null ? void 0 : contentType.includes("application/json"))) {
            return { authenticationFailed: fallbackErrorResponse() };
          }
          const clonedResponse = result.clone();
          const authenticationFailed = yield (0,common/* registerAsyncTask */.lK)(() => token_authorization_provider_async(this, null, function* () {
            try {
              return clonedResponse.json();
            } catch (e) {
              return Promise.resolve();
            }
          }));
          if (!isErrorResponse(authenticationFailed) || !authenticationFailed.code) {
            return { authenticationFailed: fallbackErrorResponse() };
          }
          return {
            authenticationFailed: {
              error: authenticationFailed.error,
              code: authenticationFailed.code,
              details: authenticationFailed.details
            }
          };
        })
      );
    });
  }
  authorizeAbstract(callback) {
    return token_authorization_provider_async(this, null, function* () {
      const backoff = new ExponentialBackoff();
      let fetchedTokenBefore = false;
      while (true) {
        if (!this.fetchTokenPromise) {
          this.fetchTokenPromise = (() => token_authorization_provider_async(this, null, function* () {
            if (fetchedTokenBefore) yield backoff.nextDelay();
            fetchedTokenBefore = true;
            try {
              return yield this.fetchToken();
            } catch (error2) {
              if (error2 instanceof ClientError && error2.httpStatus === 404) {
                throw new TokenAuthorizationError(
                  error2.message,
                  error2.code,
                  error2.httpStatus,
                  error2.requestDetails
                );
              }
              throw error2;
            }
          }))();
        }
        const tokenPromise = this.fetchTokenPromise;
        const token = yield tokenPromise;
        const outcome = token === null ? yield callback() : yield callback(token);
        if ("result" in outcome) return outcome.result;
        const {
          authenticationFailed: { error, code, details = {} }
        } = outcome;
        if (outcome.authenticationFailed.code === ERROR_CODE_AUTH_CHECK_REQUIRED) {
          throw new ClientError(error, code, details);
        }
        if (tokenPromise === this.fetchTokenPromise) {
          this.fetchTokenPromise = void 0;
        }
      }
    });
  }
  /** for test purposes */
  injectToken(token) {
    this.fetchTokenPromise = Promise.resolve(token);
  }
}
function fallbackErrorResponse() {
  return {
    error: "authentication invalid",
    code: "auth_missing"
  };
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/index.ts




























/***/ }),

/***/ 4665:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  c1: () => (/* reexport */ ArgumentError),
  Oh: () => (/* reexport */ AsyncTaskTracker),
  vL: () => (/* reexport */ BatchRetrieval),
  tQ: () => (/* reexport */ BehaviorSubject),
  s9: () => (/* reexport */ ConfigStore),
  hl: () => (/* reexport */ ContextContainer),
  _U: () => (/* reexport */ DATA_PLACEHOLDERS),
  cY: () => (/* reexport */ deferred_Deferred),
  l6: () => (/* reexport */ EmptyContinueIterable),
  d1: () => (/* reexport */ EndOfStreamError),
  Gd: () => (/* reexport */ InternalError),
  EH: () => (/* reexport */ SINGLE_DATA_PLACEHOLDER),
  aS: () => (/* reexport */ ScrivitoError),
  RE: () => (/* reexport */ Streamable),
  B7: () => (/* reexport */ Subject),
  fk: () => (/* reexport */ TransIterator),
  bQ: () => (/* reexport */ anticipatedStream),
  Y3: () => (/* reexport */ appUrlFromPackagedUiUrl),
  dT: () => (/* reexport */ assignLocation),
  W3: () => (/* reexport */ assumePresence),
  uV: () => (/* reexport */ assumeString),
  Go: () => (/* reexport */ buildQueryString),
  xQ: () => (/* reexport */ camelCase),
  IH: () => (/* reexport */ cdnAssetUrlBase),
  H5: () => (/* reexport */ clickPositionWithinElement),
  Lu: () => (/* reexport */ collectAndSchedule),
  OV: () => (/* reexport */ collectInListAndSchedule),
  FQ: () => (/* reexport */ computeAncestorPaths),
  xn: () => (/* reexport */ computeCacheKey),
  h_: () => (/* reexport */ convertToFloat),
  P3: () => (/* reexport */ convertToInteger),
  pb: () => (/* reexport */ currentHref),
  u4: () => (/* reexport */ currentOrigin),
  uS: () => (/* reexport */ deserializeAsDate),
  A_: () => (/* reexport */ deserializeAsFloat),
  w0: () => (/* reexport */ deserializeAsInteger),
  Y5: () => (/* reexport */ devicePixelRatio),
  yJ: () => (/* reexport */ docUrl),
  aI: () => (/* reexport */ equals),
  uw: () => (/* reexport */ equalsBestEffort),
  _Q: () => (/* reexport */ extractFromIterator),
  PX: () => (/* reexport */ extractTitleAndDescription),
  lT: () => (/* reexport */ fetchConfiguredTenant),
  A: () => (/* reexport */ formatDateToString),
  Ly: () => (/* reexport */ getConfiguredTenant),
  YE: () => (/* reexport */ getDocument),
  YX: () => (/* reexport */ getScrivitoVersion),
  Hj: () => (/* reexport */ getScrollHeight),
  eU: () => (/* reexport */ window_proxy_innerHeight),
  On: () => (/* reexport */ isAttributeValidationReportEntry),
  qf: () => (/* reexport */ isBlob),
  Dz: () => (/* reexport */ isCamelCase),
  Po: () => (/* reexport */ isEmptyValue),
  fo: () => (/* reexport */ isFile),
  p1: () => (/* reexport */ isISO8601),
  M7: () => (/* reexport */ isModifierClick),
  Gv: () => (/* reexport */ isObject),
  Wo: () => (/* reexport */ isPresent),
  Bo: () => (/* reexport */ isStringArray),
  iI: () => (/* reexport */ isSystemAttribute),
  Qr: () => (/* reexport */ isValidDateString),
  Rq: () => (/* reexport */ isValidFloat),
  zh: () => (/* reexport */ isValidInteger),
  zB: () => (/* reexport */ isWrapping),
  qg: () => (/* reexport */ loadCss),
  kW: () => (/* reexport */ loadJs),
  vV: () => (/* reexport */ logError),
  Zm: () => (/* reexport */ never),
  dY: () => (/* reexport */ nextTick),
  LD: () => (/* reexport */ observeWindowFocus),
  Nj: () => (/* reexport */ onReset),
  D1: () => (/* reexport */ openWindow),
  BA: () => (/* reexport */ window_proxy_pageXOffset),
  kA: () => (/* reexport */ window_proxy_pageYOffset),
  gi: () => (/* reexport */ parameterizeDataClass),
  zw: () => (/* reexport */ parseQueryToQueryParameters),
  Qf: () => (/* reexport */ parseStringToDate),
  aO: () => (/* reexport */ prettyPrint),
  Qk: () => (/* reexport */ promiseAndFinally),
  Pi: () => (/* reexport */ propsAreEqual),
  M4: () => (/* reexport */ pruneString),
  nw: () => (/* reexport */ randomHex),
  zE: () => (/* reexport */ randomId),
  lK: () => (/* reexport */ registerAsyncTask),
  yQ: () => (/* reexport */ reload),
  K5: () => (/* reexport */ renameTo),
  G$: () => (/* reexport */ replaceHistoryState),
  _0: () => (/* reexport */ replaceLocation),
  Bd: () => (/* reexport */ runAndCatchException),
  Jf: () => (/* reexport */ sanitizeUrl),
  nj: () => (/* reexport */ screen),
  hT: () => (/* reexport */ scrollElementIntoView),
  VG: () => (/* reexport */ scrollTo),
  o3: () => (/* reexport */ sentenceCase),
  rK: () => (/* reexport */ setConfiguredTenant),
  yb: () => (/* reexport */ setIntervalAndTrackId),
  cN: () => (/* reexport */ setOriginProvider),
  wg: () => (/* reexport */ setTimeoutAndTrackId),
  VC: () => (/* reexport */ subscribeWindowFocus),
  nF: () => (/* reexport */ throttle),
  Ht: () => (/* reexport */ throwInvalidArgumentsError),
  JL: () => (/* reexport */ throwNextTick),
  YB: () => (/* reexport */ transformContinueIterable),
  YY: () => (/* reexport */ tryGetConfiguredTenant),
  z9: () => (/* reexport */ underscore),
  hf: () => (/* reexport */ uniqueErrorMessage),
  ix: () => (/* reexport */ urlResource),
  uk: () => (/* reexport */ wait),
  Cu: () => (/* reexport */ waitMs),
  e_: () => (/* reexport */ windowLocationOrigin)
});

// UNUSED EXPORTS: classify, cleanUniqueErrorMessage, currentHash, detectUniqueErrorMessage, enableUniqueErrors, fetchMaybeTenant, getChildPath, hasTenantConfigurationBeenSet, isConfiguredWithoutTenant, isLocalhostUrl, isUnderscore, resetConfiguredTenant, setNextTickScheduler, setRegisterAsyncTaskHandler, sliceFromIterable

;// CONCATENATED MODULE: ./scrivito_sdk/common/collect_and_schedule.ts

function collectAndSchedule(scheduler, fn) {
  let isScheduled = false;
  let lastArgs;
  return (...args) => {
    lastArgs = args;
    if (isScheduled) return;
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
    if (isScheduled) return;
    isScheduled = true;
    scheduler(() => {
      try {
        runFunction();
      } finally {
        isScheduled = false;
        if (list.length > 0) schedule();
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

;// CONCATENATED MODULE: ./scrivito_sdk/common/error_logging.ts

let consoleErrorIsDisabled = false;
function logError(...args) {
  if (!consoleErrorIsDisabled) {
    console.error(...args);
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

;// CONCATENATED MODULE: ./scrivito_sdk/common/throw_invalid_arguments_error.ts




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

class deferred_Deferred {
  constructor() {
    this.promise = new Promise(
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
  then(onfulfilled, onrejected) {
    return this.promise.then(onfulfilled, onrejected);
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/sanitize_url.ts

function sanitizeUrl(rawUrl) {
  const url = rawUrl.trim();
  if (URL.canParse(url)) return url;
  if (url.match(/^[^/@]+@[^/@]+$/)) {
    const mailto = `mailto:${url}`;
    if (URL.canParse(mailto)) return mailto;
  }
  if (url.startsWith("/") || url.match(/^\w+:/)) return url;
  if (url.includes(".")) {
    const httpsUrl = `https://${url}`;
    if (URL.canParse(httpsUrl)) {
      const { hostname } = new URL(httpsUrl);
      if (hostname && !hostname.includes("_")) return httpsUrl;
    }
  }
  return url;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/next_tick.ts


let nextTickScheduler = setTimeoutScheduler;
function nextTick(delayedFunction) {
  nextTickScheduler(delayedFunction);
}
function setTimeoutScheduler(fn) {
  setTimeoutAndTrackId(fn, 0);
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
    if (typeof input === "function") {
      return printFunction(input);
    }
    if (isObject(input)) {
      return printObject(input);
    }
    return printTruncated(input);
  } catch (e) {
    return "";
  }
}
function printObject(object) {
  const basicContent = object._scrivitoPrivateContent;
  if (basicContent && typeof basicContent.toPrettyPrint === "function") {
    return basicContent.toPrettyPrint();
  }
  if ("outerHTML" in object) {
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
  const version = "1.29.0-dev-1-g241941be604f";
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
      if (nextResult.done) return { done: true };
      return { value: fn(nextResult.value) };
    });
  }
  filter(test) {
    const next = () => {
      const nextResult = this.next();
      if (nextResult.done) return { done: true };
      const value = nextResult.value;
      return test(value) ? { value } : next();
    };
    return new TransIterator(next);
  }
  takeWhile(test) {
    let stopped = false;
    return new TransIterator(() => {
      if (stopped) return { done: true };
      const nextResult = this.next();
      if (nextResult.done) return { done: true };
      const value = nextResult.value;
      if (test(value)) return { value };
      stopped = true;
      return { done: true };
    });
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/is_system_attribute.ts

function isSystemAttribute(attributeName) {
  return attributeName[0] === "_";
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/iterable.ts

function extractFromIterator(iterator, size) {
  const result = [];
  while (result.length !== size) {
    const next = iterator.next();
    if (next.done) return result;
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

;// CONCATENATED MODULE: ./scrivito_sdk/common/reset_callbacks.ts

const resetCallbacks = [];
function onReset(callback) {
  if (process.env.NODE_ENV !== "development") return;
  resetCallbacks.push(callback);
}
function runResetCallbacks() {
  resetCallbacks.forEach((callback) => callback());
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
onReset(() => enabled = false);

;// CONCATENATED MODULE: ./scrivito_sdk/common/throttle.ts


let throttleDisabled = false;
function throttle(fn, ms) {
  if (throttleDisabled) return fn;
  let lastTime = 0;
  let timeoutId;
  let lastArgs;
  function execute() {
    clearTimeout(timeoutId);
    timeoutId = void 0;
    lastTime = Date.now();
    fn(...lastArgs);
  }
  return function(...args) {
    lastArgs = args;
    const remainingMs = lastTime + ms - Date.now();
    if (remainingMs <= 0) execute();
    else timeoutId || (timeoutId = setTimeoutAndTrackId(execute, remainingMs));
  };
}
function enableThrottle(enabled) {
  throttleDisabled = !enabled;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/types.ts


const BACKEND_FORMAT_REGEXP = /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/;
function deserializeAsInteger(value) {
  if (typeof value === "string" && value.match(/^-?\d+$/)) {
    return convertToInteger(value);
  }
  return typeof value === "number" ? convertToInteger(value) : null;
}
function isValidInteger(value) {
  return isValidFloat(value) && Number.isSafeInteger(value);
}
function deserializeAsFloat(value) {
  return convertToFloat(parseFloat(value));
}
function convertToFloat(value) {
  return isValidFloat(value) ? value : null;
}
function isValidFloat(value) {
  return typeof value === "number" && isFinite(value);
}
function deserializeAsDate(value) {
  if (typeof value !== "string") return null;
  if (!isValidDateString(value)) {
    throw new InternalError();
  }
  return parseStringToDate(value);
}
function parseStringToDate(dateString) {
  if (!dateString) return null;
  const dateMatch = dateString.match(BACKEND_FORMAT_REGEXP);
  if (!dateMatch) return null;
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
  return new Promise((resolve) => {
    setTimeoutAndTrackId(resolve, milliseconds);
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/equals.ts

function equals(a, b) {
  if (a === b) return true;
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
  if (a === b) return true;
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
  if (!object) return false;
  return typeof object.equals === "function";
}
function isObjectSupportingValueOf(object) {
  if (!object) return false;
  return typeof object.valueOf === "function";
}
function isObjectWithScrivitoPrivateContent(object) {
  if (!object) return false;
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

;// CONCATENATED MODULE: ./scrivito_sdk/common/assume_presence.ts


function assumePresence(value) {
  if (value === void 0 || value === null) throw new InternalError();
  return value;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/assume_string.ts


function assumeString(value) {
  if (typeof value !== "string") throw new InternalError();
  return value;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/app_url_from_packaged_ui_url.ts

function appUrlFromPackagedUiUrl(uiUrl) {
  const url = new URL(uiUrl);
  const pathname = url.pathname.replace(/^(\/scrivito(?=\/|$))+/i, "");
  if (pathname === url.pathname) return null;
  url.pathname = pathname;
  return url.href;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/batch_retrieval.ts

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

class BatchRetrieval {
  constructor(mget, { batchSize } = {}) {
    this.scheduleItem = collectInListAndSchedule(
      nextTick,
      (items) => {
        const nextBatch = items.splice(0, this.batchSize);
        const keys = nextBatch.map((item) => item.key);
        (() => __async(this, null, function* () {
          try {
            const results = yield this.mget(keys);
            nextBatch.forEach((_0, _1) => __async(this, [_0, _1], function* ({ key, deferred }, index) {
              if (index < results.length) {
                const result = results[index];
                deferred.resolve(result);
              } else {
                try {
                  const result = yield this.retrieve(key);
                  deferred.resolve(result);
                } catch (error) {
                  deferred.reject(error);
                }
              }
            }));
          } catch (error) {
            nextBatch.forEach((item) => item.deferred.reject(error));
          }
        }))();
        return items;
      }
    );
    this.mget = mget;
    this.batchSize = batchSize || 100;
  }
  retrieve(key) {
    const deferred = new deferred_Deferred();
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
  return isObject(data);
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

;// CONCATENATED MODULE: ./scrivito_sdk/common/query_parameters.ts

function buildQueryString(params) {
  return Object.entries(params).flatMap(
    ([key, v]) => (Array.isArray(v) ? v : [v]).map((value) => encodeParam(key, value))
  ).join("&");
}
function encodeParam(key, value) {
  return value === null ? encodeURIComponent(key) : [encodeURIComponent(key), encodeURIComponent(value)].join("=");
}
function parseQueryToQueryParameters(query) {
  const normalizedQuery = encodeBareKeys(query);
  const result = {};
  for (const [encodedKey, encodedValue] of new URLSearchParams(
    normalizedQuery
  )) {
    const key = decodeParam(encodedKey);
    const value = decodeParamValue(encodedValue);
    if (key in result) {
      const existing = result[key];
      result[key] = Array.isArray(existing) ? [...existing, value] : [existing, value];
    } else result[key] = value;
  }
  return result;
}
function encodeBareKeys(query) {
  return query.replace(/=/g, "==");
}
function decodeParam(param) {
  return param.replace(/==/g, "=");
}
function decodeParamValue(value) {
  return value ? decodeParam(value.slice(1)) : null;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/streamable.ts


class Streamable {
  /** create a Streamable from the given subscribeFunction */
  constructor(subscribeFunction) {
    this.subscribeFunction = subscribeFunction;
  }
  /** subscribe this Streamable, streaming values into the provided function. */
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
  /** Returns a Promise that resolves with the final (=last) value of the stream,
   * when the stream completes.
   * If the stream is empty (i.e. it completes before emitting a value),
   * the Promise resolves with undefined.
   */
  toPromise() {
    return new Promise((resolve) => {
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
  /** Returns a new Streamable, truncated to the first value. */
  takeOne() {
    return new Streamable((subscriber) => {
      let subscription = null;
      subscription = this.subscribe({
        next: (value) => {
          if (subscription) subscription.unsubscribe();
          subscriber.next(value);
          subscriber.complete();
        },
        complete: () => {
          subscriber.complete();
        }
      });
      if (subscriber.isClosed()) subscription.unsubscribe();
      return subscription;
    });
  }
  /** Returns a Promise to the first value that the stream emits.
   * The Promise rejects, if the stream completes before any value is emitted.
   */
  waitForFirst() {
    return new Promise((resolve, reject) => {
      let resolved = false;
      this.takeOne().subscribe({
        next(value) {
          resolved = true;
          resolve(value);
        },
        complete() {
          if (!resolved) reject(new EndOfStreamError());
        }
      });
    });
  }
  /** Transforms this stream, so that it completes, when the passed-in stream
   * emits its first value or completes.
   */
  takeUntil(until) {
    return new Streamable((subscriber) => {
      let untilSubscription = void 0;
      let subscription = void 0;
      subscription = this.subscribe({
        next(value) {
          subscriber.next(value);
        },
        complete() {
          completeStream();
        }
      });
      if (subscription.isClosed()) return () => void 0;
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
        if (subscription) subscription.unsubscribe();
        if (untilSubscription) untilSubscription.unsubscribe();
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
    if (!this.subscriber) return;
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

var anticipated_stream_async = (__this, __arguments, generator) => {
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

function anticipatedStream(streamPromise) {
  return new Streamable((subscriber) => {
    let subscription;
    (() => anticipated_stream_async(null, null, function* () {
      try {
        const stream = yield streamPromise;
        if (subscriber.isClosed()) return;
        subscription = stream.subscribe(subscriber);
      } catch (error) {
        subscriber.complete();
        throw error;
      }
    }))();
    return () => {
      if (subscription) subscription.unsubscribe();
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
  /** push a value to all subscribers */
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
    if (this.value === value) return;
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

;// CONCATENATED MODULE: ./scrivito_sdk/common/config_store.ts


class ConfigStore {
  constructor() {
    this.configDeferred = new deferred_Deferred();
  }
  set(config) {
    if (this.storedConfig !== void 0) throw new InternalError();
    this.configDeferred.resolve(config);
    this.storedConfig = { config };
  }
  get() {
    if (this.storedConfig === void 0) throw new InternalError();
    return this.storedConfig.config;
  }
  fetch() {
    return this.configDeferred;
  }
  hasBeenSet() {
    return this.storedConfig !== void 0;
  }
  // For test purpose only.
  reset() {
    this.configDeferred = new deferred_Deferred();
    this.storedConfig = void 0;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/never.ts

function never() {
  return new Promise(() => void 0);
}

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
function assignLocation(newLocation) {
  windowLocation().assign(newLocation);
}
function replaceLocation(newLocation) {
  windowLocation().replace(newLocation);
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
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

// EXTERNAL MODULE: external "lodash-es/isEmpty"
var isEmpty_ = __webpack_require__(5020);
var isEmpty_default = /*#__PURE__*/__webpack_require__.n(isEmpty_);
;// CONCATENATED MODULE: ./scrivito_sdk/common/is_empty_value.ts


function isEmptyValue(value) {
  return value === null || (typeof value === "string" || Array.isArray(value)) && isEmpty_default()(value);
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/compute_ancestor_paths.ts

function computeAncestorPaths(path) {
  const ancestorPaths = ["/"];
  if (path === "/") return ancestorPaths;
  const components = path.split("/").slice(1);
  let ancestorPath = "";
  components.forEach((component) => {
    ancestorPath = `${ancestorPath}/${component}`;
    ancestorPaths.push(ancestorPath);
  });
  return ancestorPaths;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/register_async_task.ts

var register_async_task_async = (__this, __arguments, generator) => {
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
let registerHandler;
function registerAsyncTask(task) {
  return register_async_task_async(this, null, function* () {
    return registerHandler ? registerHandler(task) : task();
  });
}
function setRegisterAsyncTaskHandler(handler) {
  registerHandler = handler;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/scroll_element_into_view.ts

function scrollElementIntoView(element, options) {
  element.scrollIntoView(options);
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/timeout.ts

function noop() {
}
let trackTimeoutId = noop;
function setTimeoutAndTrackId(handler, timeout) {
  const timeoutId = setTimeout(handler, timeout);
  trackTimeoutId(timeoutId);
  return timeoutId;
}
function setIntervalAndTrackId(handler, timeout) {
  const timeoutId = setInterval(handler, timeout);
  trackTimeoutId(timeoutId);
  return timeoutId;
}

function setTimeoutIdTracker(callback) {
  trackTimeoutId = callback;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/cdn_asset_url_base.ts


function cdnAssetUrlBase() {
  return `https://assets.scrivito.com/sjs/${getScrivitoVersion()}`;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/is_modifier_click.ts

function isModifierClick(event) {
  return event.ctrlKey || event.metaKey || event.shiftKey;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/configured_tenant.ts

var configured_tenant_async = (__this, __arguments, generator) => {
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

let configuredTenant;
let deferredConfiguredTenant = new deferred_Deferred();
function tryGetConfiguredTenant() {
  return configuredTenant;
}
function getConfiguredTenant() {
  if (!configuredTenant) throw new InternalError();
  return configuredTenant;
}
function fetchConfiguredTenant() {
  return configured_tenant_async(this, null, function* () {
    const resolvedTenant = yield deferredConfiguredTenant;
    if (!resolvedTenant) throw new InternalError();
    return resolvedTenant;
  });
}
function fetchMaybeTenant() {
  return configured_tenant_async(this, null, function* () {
    return deferredConfiguredTenant;
  });
}
function hasTenantConfigurationBeenSet() {
  return !deferredConfiguredTenant.isPending();
}
function setConfiguredTenant(tenant) {
  configuredTenant = tenant;
  deferredConfiguredTenant.resolve(tenant);
}
function isConfiguredWithoutTenant() {
  return hasTenantConfigurationBeenSet() && configuredTenant === void 0;
}
function resetConfiguredTenant() {
  deferredConfiguredTenant = new Deferred();
  configuredTenant = void 0;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/current_origin.ts


let originProvider;
function currentOrigin() {
  if (!originProvider) throw new InternalError();
  return originProvider();
}
function setOriginProvider(provider) {
  originProvider = provider;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/validation_result_types.ts

function isAttributeValidationReportEntry(validationReportEntry) {
  return !!validationReportEntry.attributeName;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/props_are_equal.ts


function propsAreEqual(prevProps, nextProps) {
  return Object.keys(prevProps).every(
    (key) => equalsBestEffort(prevProps[key], nextProps[key])
  );
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/parameterize_data_class.ts


function parameterizeDataClass(dataClass) {
  return `${underscore(dataClass)}_id`;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/is_object.ts

function isObject(arg) {
  return arg !== null && typeof arg === "object" && !Array.isArray(arg);
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/async_task_tracker.ts

var async_task_tracker_async = (__this, __arguments, generator) => {
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

class AsyncTaskTracker {
  constructor() {
    this.taskCounter = 0;
  }
  registerTask(task) {
    return async_task_tracker_async(this, null, function* () {
      var _a;
      if (!this.onDone) this.onDone = new deferred_Deferred();
      this.taskCounter++;
      try {
        return yield task();
      } finally {
        this.taskCounter--;
        if (this.taskCounter === 0) {
          (_a = this.onDone) == null ? void 0 : _a.resolve();
          this.onDone = void 0;
        }
      }
    });
  }
  waitForRegisteredTasks() {
    return async_task_tracker_async(this, null, function* () {
      if (this.onDone) yield this.onDone;
    });
  }
  hasRegisteredTasks() {
    return this.taskCounter > 0;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/is_ISO8601.ts

function isISO8601(value) {
  const isoDateTimeWithOptionalMilliseconds = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d{3})?Z$/;
  return isoDateTimeWithOptionalMilliseconds.test(value) && !Number.isNaN(Date.parse(value));
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/is_wrapping.ts


function isWrapping(subject, basicClass) {
  return isObject(subject) && "_scrivitoPrivateContent" in subject && subject._scrivitoPrivateContent instanceof basicClass;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/is_blob.ts


function isBlob(subject) {
  return isObject(subject) && "size" in subject && typeof subject.size === "number" && "type" in subject && typeof subject.type === "string";
}
function isFile(subject) {
  return isBlob(subject) && "name" in subject && typeof subject.name === "string";
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/data_placeholders.tsx

const DATA_PLACEHOLDERS = /__([a-z](?:[a-z0-9]|\.[a-z]|(\._id)|_(?!_)){0,100})__/gi;
const SINGLE_DATA_PLACEHOLDER = /^__([a-z](?:[a-z0-9]|\.[a-z]|(\._id)|_(?!_)){0,100})__$/i;

;// CONCATENATED MODULE: ./scrivito_sdk/common/url_resource.ts

function urlResource(url) {
  return `${url.pathname}${url.search}${url.hash}`;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/window_focus.ts


let handlers = [];
function observeWindowFocus() {
  window.addEventListener("focus", triggerWindowFocus);
}
function subscribeWindowFocus(handler) {
  handlers.push(handler);
}
function triggerWindowFocus() {
  Object.values(handlers).forEach((handler) => handler());
}
onReset(() => handlers = []);

;// CONCATENATED MODULE: ./scrivito_sdk/common/index.ts





































































/***/ }),

/***/ 7164:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  gD: () => (/* reexport */ FacetQuery),
  hQ: () => (/* reexport */ IN_MEMORY_TENANT),
  O2: () => (/* reexport */ IdBatchCollection),
  UX: () => (/* reexport */ IdBatchQuery),
  sX: () => (/* reexport */ ObjBackendReplication),
  aM: () => (/* reexport */ ObjStreamReplication),
  C_: () => (/* reexport */ assertNotUsingInMemoryTenant),
  D9: () => (/* reexport */ configureForLazyWidgets),
  c2: () => (/* reexport */ createObjData),
  k0: () => (/* reexport */ disableObjReplication),
  HI: () => (/* reexport */ failIfPerformanceConstraint),
  fT: () => (/* reexport */ findWidgetPlacement),
  Qb: () => (/* reexport */ getContentStateId),
  km: () => (/* reexport */ getFieldDiff),
  ov: () => (/* reexport */ obj_data_store_getObjData),
  s5: () => (/* reexport */ getObjQuery),
  x1: () => (/* reexport */ getObjQueryCount),
  sv: () => (/* reexport */ getObjVersion),
  Fh: () => (/* reexport */ getWidgetModification),
  xX: () => (/* reexport */ isUsingInMemoryTenant),
  M_: () => (/* reexport */ isWidgetlistDiff),
  Mm: () => (/* reexport */ objReplicationPool),
  X2: () => (/* reexport */ runWithPerformanceConstraint),
  YR: () => (/* reexport */ setContentStateId),
  L_: () => (/* reexport */ setContentUpdateHandler),
  JL: () => (/* reexport */ setObjStreamReplicationEndpoint),
  ZA: () => (/* reexport */ suggest),
  Zt: () => (/* reexport */ trackContentStateId),
  le: () => (/* reexport */ updateContent),
  mG: () => (/* reexport */ useInMemoryTenant),
  B5: () => (/* reexport */ useReplicationStrategy)
});

// UNUSED EXPORTS: ObjData, REMOVE_THIS_KEY, ReplicationCache, clearObjDataCache, createObjReplicationProcess, diffObjJson, diffWidgetJson, hasObjContentDiff, isAttributeModified

// EXTERNAL MODULE: ./scrivito_sdk/client/index.ts + 38 modules
var client = __webpack_require__(853);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 63 modules
var common = __webpack_require__(4665);
// EXTERNAL MODULE: external "lodash-es/isEmpty"
var isEmpty_ = __webpack_require__(5020);
var isEmpty_default = /*#__PURE__*/__webpack_require__.n(isEmpty_);
// EXTERNAL MODULE: external "lodash-es/isEqual"
var isEqual_ = __webpack_require__(9477);
var isEqual_default = /*#__PURE__*/__webpack_require__.n(isEqual_);
;// CONCATENATED MODULE: ./scrivito_sdk/data/obj_repair.ts

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

function repairDanglingWidgets(obj, oldState) {
  var _a;
  if (!oldState || (0,client/* isUnavailableObjJson */.a8)(oldState) || (0,client/* isUnavailableObjJson */.a8)(obj)) {
    return obj;
  }
  const danglingWidgetIds = danglingWidgetReferencesIn(obj);
  if (danglingWidgetIds.length === 0) return obj;
  const restoredWidgets = Object.fromEntries(
    danglingWidgetIds.map((id) => {
      var _a2;
      return [id, (_a2 = oldState._widget_pool) == null ? void 0 : _a2[id]];
    })
  );
  return __spreadProps(__spreadValues({}, obj), {
    _widget_pool: __spreadValues(__spreadValues({}, (_a = obj._widget_pool) != null ? _a : {}), restoredWidgets)
  });
}
function danglingWidgetReferencesIn(obj) {
  const danglingIds = [];
  (0,client/* withEachAttributeJson */.Yy)(obj, ([type, data]) => {
    if (type !== "widgetlist") return;
    data.forEach((widgetId) => {
      var _a;
      if (((_a = obj._widget_pool) == null ? void 0 : _a[widgetId]) === void 0) {
        danglingIds.push(widgetId);
      }
    });
  });
  return danglingIds;
}

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







function threeWayMergeObjs(mainVersion, otherVersion, baseVersion) {
  if (otherVersion === void 0) return mainVersion;
  if (mainVersion === void 0) return otherVersion;
  if (!baseVersion || (0,client/* isUnavailableObjJson */.a8)(baseVersion)) {
    if ((0,client/* isUnavailableObjJson */.a8)(mainVersion)) return otherVersion;
    if ((0,client/* isUnavailableObjJson */.a8)(otherVersion)) return mainVersion;
  } else {
    if ((0,client/* isUnavailableObjJson */.a8)(mainVersion)) return mainVersion;
    if ((0,client/* isUnavailableObjJson */.a8)(otherVersion)) return otherVersion;
  }
  const primaryChanges = diffObjJson(baseVersion, mainVersion);
  const mergedVersion = patchObjJson(otherVersion, primaryChanges);
  return repairDanglingWidgets(mergedVersion, baseVersion);
}
function patchObjJson(primitiveObj, patch) {
  return patchJson(primitiveObj, patch);
}
function diffObjJson(fromObjJson, toObjJson) {
  if (!fromObjJson) return toObjJson;
  return diffJson(fromObjJson, toObjJson);
}
function diffWidgetJson(fromWidgetJson, toWidgetJson) {
  return diffJson(fromWidgetJson, toWidgetJson);
}
function diffMaybeWidgetJson(fromWidgetJson, toWidgetJson) {
  if (!fromWidgetJson) return toWidgetJson || null;
  if (!toWidgetJson) return null;
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
  return !(0,common/* isSystemAttribute */.iI)(attributeName) || attributeName === "_obj_class";
}
function eachKeyFrom(objectA, objectB, handler) {
  const keysOfA = Object.keys(objectA);
  const keysOfB = new Set(Object.keys(objectB));
  keysOfA.forEach((key) => {
    if (!keysOfB.has(key)) handler(key, objectA[key], objectB[key], false);
  });
  keysOfB.forEach((key) => {
    handler(key, objectA[key], objectB[key], true);
  });
}
function buildUpdatedWidgetPool(widgetPool, widgetPoolPatch) {
  if (!widgetPoolPatch || isEmpty_default()(widgetPoolPatch)) return widgetPool;
  const updatedWidgetPool = {};
  eachKeyFrom(
    widgetPool,
    widgetPoolPatch,
    (id, widget, widgetPatch, isKeyOfWidgetPoolPatch) => {
      if (isKeyOfWidgetPoolPatch) {
        if (isRemoveThisKey(widgetPatch)) return;
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
  if (valueA === void 0) return valueB;
  if (valueB === void 0) return REMOVE_THIS_KEY;
  return fnHandleBoth();
}
function buildWidgetPoolPatch(widgetPoolA, widgetPoolB) {
  if (widgetPoolA === widgetPoolB) return void 0;
  if (!widgetPoolA) return widgetPoolB;
  const patch = {};
  eachKeyFrom(widgetPoolA, widgetPoolB || {}, (widgetId, widgetA, widgetB) => {
    const widgetValue = buildPatchEntry(widgetA, widgetB, () => {
      const widgetPatch = diffMaybeWidgetJson(widgetA, widgetB);
      if (!isEmpty_default()(widgetPatch)) return widgetPatch;
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
      if (!isEmpty_default()(widgetPoolPatch)) {
        patch._widget_pool = widgetPoolPatch;
      }
    } else {
      const patchValue = buildPatchEntry(valueInA, valueInB, () => {
        if (!isEqual_default()(valueInA, valueInB)) return valueInB;
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
    if (objEntry) return objEntry;
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
    if (existingCache) return existingCache;
    const newCache = {};
    this.cache[cacheKey] = newCache;
    return newCache;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/obj_replication_pool.ts



class ObjReplicationPool {
  constructor() {
    this.replicationCache = new ReplicationCache(() => {
      throw new common/* InternalError */.Gd();
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
  // For test purpose only.
  clearWriteCallbacks() {
    this.writeCallbacks = {};
  }
  // For test purpose only.
  clearCache() {
    this.replicationCache.clear();
  }
}
const objReplicationPool = new ObjReplicationPool();
function useReplicationStrategy(Strategy) {
  objReplicationPool.setReplicationStrategy(Strategy);
}
(0,common/* onReset */.Nj)(() => {
  objReplicationPool.clearCache();
  objReplicationPool.clearWriteCallbacks();
});

;// CONCATENATED MODULE: ./scrivito_sdk/data/performance_constraint.ts


const constraint = new common/* ContextContainer */.hl();
function failIfPerformanceConstraint(message) {
  if (constraint.current()) throw new common/* InternalError */.Gd(message);
}
function runWithPerformanceConstraint(fn) {
  return constraint.runWith(true, fn);
}

// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 26 modules
var loadable = __webpack_require__(4772);
// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(1946);
;// CONCATENATED MODULE: ./scrivito_sdk/data/obj_data.ts

var obj_data_defProp = Object.defineProperty;
var obj_data_getOwnPropSymbols = Object.getOwnPropertySymbols;
var obj_data_hasOwnProp = Object.prototype.hasOwnProperty;
var obj_data_propIsEnum = Object.prototype.propertyIsEnumerable;
var obj_data_defNormalProp = (obj, key, value) => key in obj ? obj_data_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var obj_data_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (obj_data_hasOwnProp.call(b, prop))
      obj_data_defNormalProp(a, prop, b[prop]);
  if (obj_data_getOwnPropSymbols)
    for (var prop of obj_data_getOwnPropSymbols(b)) {
      if (obj_data_propIsEnum.call(b, prop))
        obj_data_defNormalProp(a, prop, b[prop]);
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
const widgetCollection = (0,loadable/* createLoadableCollection */.rL)({
  name: "widgetdata",
  loadElement: ([objSpaceId, objId]) => ({
    loader: () => {
      objReplicationPool.get(objSpaceId, objId).start();
      return (0,common/* never */.Zm)();
    }
  })
});
const baseCollection = (0,loadable/* createLoadableCollection */.rL)({
  name: "baseobj",
  loadElement: ([objSpaceId, objId]) => ({
    loader: () => __async(null, null, function* () {
      if (!configuredForLazyWidgets) {
        yield (0,loadable/* load */.Hh)(() => widgetCollection.get([objSpaceId, objId]).get());
        return (0,common/* never */.Zm)();
      }
      return (0,client/* retrieveObj */.yd)(objSpaceId, objId, "widgetless");
    })
  })
});
function findInObjOfflineStore(selector) {
  return baseCollection.findValuesInOfflineStore(selector);
}
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
  getOrThrow() {
    const result = this.get();
    if (!result) throw new common/* InternalError */.Gd();
    return result;
  }
  get() {
    failIfPerformanceConstraint(
      "for performance reasons, avoid this method when rendering"
    );
    const widgetObjJson = this.widgetData.get();
    if (!widgetObjJson) return;
    const baseObjJson = this.baseData.get();
    if (!baseObjJson) return;
    if (!(0,client/* isExistentObjJson */.MV)(baseObjJson)) return baseObjJson;
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
  /** Get a top-level attribute from the Obj.
   *
   * If you are sure that no widgets are involved (key is not a widget or a widgetlist attribute),
   * you could use getAttributeWithoutWidgetData instead, which is faster.
   */
  getAttribute(key) {
    if ((0,common/* isSystemAttribute */.iI)(key)) return this.getAttributeWithoutWidgetData(key);
    if (!this.ensureAvailable()) return;
    const valueFromBase = getSubReader(key, this.baseData).get();
    return valueFromBase !== void 0 ? valueFromBase : getSubReader(key, this.widgetData).get();
  }
  /** Get a top-level attribute from the Obj, which is not a widget or a widgetlist */
  getAttributeWithoutWidgetData(key) {
    if (key === "_widget_pool") {
      throw new common/* InternalError */.Gd();
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
    if (this.isUnavailable()) return;
    return this.get();
  }
  isForbidden() {
    return !!this.getAttributeWithoutWidgetData("_forbidden");
  }
  isUnavailable() {
    return !!this.getAttributeWithoutWidgetData("_deleted");
  }
  // for test purposes only
  setBaseData(newState) {
    this.baseData.set(newState);
  }
  set(newState) {
    (0,state/* failIfFrozen */.q2)("Changing CMS content");
    const [baseObjJson, widgetJson] = divideData(newState);
    this.baseData.set(baseObjJson);
    this.widgetData.set(widgetJson);
    this._replication().notifyLocalState(newState);
    if (objChangeNotification) objChangeNotification();
  }
  ensureAvailable() {
    return this.baseData.ensureAvailable() && (configuredForLazyWidgets || this.widgetData.ensureAvailable());
  }
  // for test purposes only
  isAvailable() {
    return this.baseData.isAvailable();
  }
  update(objPatch) {
    const newState = patchObjJson(this.getOrThrow(), objPatch);
    this.set(newState);
  }
  finishSaving() {
    return this._replication().finishSaving();
  }
  objSpaceId() {
    return this._objSpaceId;
  }
  equals(other) {
    if (!(other instanceof ObjData)) return false;
    return this._id === other._id && (0,common/* equals */.aI)(this._objSpaceId, other._objSpaceId);
  }
  widgetExists(widgetId) {
    return !!this.getWidgetAttribute(widgetId, "_obj_class");
  }
  /** for test purposes only */
  isBeingLoaded() {
    return this.baseData.numSubscribers() + this.widgetData.numSubscribers() > 0;
  }
  /** for test purposes only */
  unload() {
    this.baseData.reset();
    this.widgetData.reset();
  }
  /** join base Obj and widget data (the opposite of divideData).
   * uses a cache to ensure that each instance of ObjData reuses a returned object, if nothing changed.
   */
  joinDataWithCaching(baseObjJson, widgetObjJson) {
    const lastJoin = this.lastJoin;
    if (lastJoin && lastJoin.baseObjJson === baseObjJson && lastJoin.widgetObjJson === widgetObjJson) {
      return lastJoin.joined;
    }
    const joined = obj_data_spreadValues(obj_data_spreadValues({}, baseObjJson), widgetObjJson);
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
    if (reRetrieved[objId]) return;
    reRetrieved[objId] = true;
    objReplicationPool.get(objSpaceId, objId).start();
  });
  widgetlessIds.forEach((objId) => __async(null, null, function* () {
    if (reRetrieved[objId]) return;
    reRetrieved[objId] = true;
    baseCollection.get([objSpaceId, objId]).set(yield (0,client/* retrieveObj */.yd)(objSpaceId, objId, "widgetless"));
  }));
}
function idsFromCollection(collection) {
  return collection.dangerouslyGetRawValues().map((objJson) => objJson._id).filter(common/* isPresent */.Wo);
}
function divideData(data) {
  const baseObjJson = {};
  const widgetObjJson = {
    // this ensures that idsFromCollection works
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
  return key === "_widget_pool" || !(0,common/* isSystemAttribute */.iI)(key) && Array.isArray(value) && (value[0] === "widget" || value[0] === "widgetlist");
}
(0,common/* onReset */.Nj)(() => configuredForLazyWidgets = false);

;// CONCATENATED MODULE: ./scrivito_sdk/data/workspace_content_updater.ts

var workspace_content_updater_async = (__this, __arguments, generator) => {
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




class WorkspaceContentUpdater {
  constructor(objSpace, contentState) {
    this.objSpace = objSpace;
    this.contentState = contentState;
  }
  setContentStateIdOrThrowIfTracking(contentStateId) {
    if (this.initialization) {
      throw new common/* InternalError */.Gd();
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
    return workspace_content_updater_async(this, null, function* () {
      if (this.updating) return this.updating;
      const from = this.getContentStateId();
      if (!from) return;
      this.updating = (0,common/* promiseAndFinally */.Qk)(
        (() => workspace_content_updater_async(this, null, function* () {
          const { to, current, objs } = yield (0,client/* getWorkspaceChanges */.X5)(
            this.objSpace,
            from
          );
          if (objs === "*" || to && to !== current) {
            invalidateAllLoadedObjsIn(this.objSpace);
          } else if (Array.isArray(objs)) {
            this.applyChanges(objs);
          }
          this.setContentStateId(current);
        }))(),
        () => {
          this.updating = void 0;
        }
      );
      return this.updating;
    });
  }
  applyChanges(objs) {
    objs.forEach((json) => {
      const objId = (0,client/* isUnavailableObjJson */.a8)(json) ? json._deleted : json._id;
      const objReplication = objReplicationPool.get(this.objSpace, objId);
      objReplication.notifyBackendState(json);
    });
  }
  initializeContentStateId() {
    return workspace_content_updater_async(this, null, function* () {
      if (this.getContentStateId()) return;
      const response = yield (0,client/* getWorkspaceChanges */.X5)(this.objSpace);
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

var content_updater_async = (__this, __arguments, generator) => {
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




const contentStateIds = (0,state/* createStateContainer */.Ld)();
let contentUpdateHandler;
let workspaceContentUpdaters = {};
function setContentUpdateHandler(handler) {
  contentUpdateHandler = handler;
}
function getContentStateId(objSpaceId) {
  if (!(0,client/* isWorkspaceObjSpaceId */.Qk)(objSpaceId)) return "";
  const contentStateId = contentUpdateHandler ? contentUpdateHandler.getContentStateId(objSpaceId) : getState(objSpaceId).get();
  return contentStateId || "";
}
function setContentStateId(objSpace, contentStateId) {
  if (!contentUpdateHandler) {
    workspaceContentUpdaterFor(objSpace).setContentStateIdOrThrowIfTracking(
      contentStateId
    );
  }
}
function trackContentStateId(objSpace) {
  return content_updater_async(this, null, function* () {
    if (!contentUpdateHandler) {
      return workspaceContentUpdaterFor(objSpace).trackContentStateId();
    }
  });
}
function updateContent(objSpace) {
  return content_updater_async(this, null, function* () {
    if (!contentUpdateHandler) {
      return workspaceContentUpdaterFor(objSpace).updateContent();
    }
  });
}
function resetContentUpdater() {
  workspaceContentUpdaters = {};
  contentUpdateHandler = void 0;
}
function workspaceContentUpdaterFor(objSpace) {
  const workspaceKey = (0,common/* computeCacheKey */.xn)(objSpace);
  if (!workspaceContentUpdaters[workspaceKey]) {
    workspaceContentUpdaters[workspaceKey] = new WorkspaceContentUpdater(
      objSpace,
      getState(objSpace)
    );
  }
  return workspaceContentUpdaters[workspaceKey];
}
function getState(objSpace) {
  return contentStateIds.subState((0,common/* computeCacheKey */.xn)(objSpace));
}
(0,common/* onReset */.Nj)(resetContentUpdater);

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
class InMemoryTenantUnsupportedOperationError extends common/* ScrivitoError */.aS {
  constructor(description) {
    super(`${description} is not supported when using the in-memory tenant`);
  }
}
(0,common/* onReset */.Nj)(() => inMemoryTenant = false);

;// CONCATENATED MODULE: ./scrivito_sdk/data/facet_query.ts






const loadableCollection = (0,loadable/* createLoadableCollection */.rL)({
  name: "facetquery",
  loadElement: ([objSpaceId, facet, query]) => ({
    loader: () => client/* cmsRetrieval */.g2.retrieveFacetQuery(
      (0,client/* getWorkspaceId */.LD)(objSpaceId),
      buildRequestParams(facet, query)
    ),
    invalidation: () => (0,loadable/* loadableWithDefault */.s4)(void 0, () => getContentStateId(objSpaceId)) || ""
  })
});
const EMPTY_RESULT = { facets: [[]] };
class FacetQuery {
  constructor(objSpaceId, attribute, options, query) {
    if (!(0,client/* isEmptySpaceId */.dQ)(objSpaceId)) {
      this.loadableData = getData(objSpaceId, attribute, options, query);
    }
  }
  result() {
    assertNotUsingInMemoryTenant("Search API");
    const response = this.loadableData ? this.loadableData.get() : EMPTY_RESULT;
    if (!response) return [];
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
  if (!isEmpty_default()(query)) {
    params.query = query;
  }
  return params;
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/suggest.ts




const suggest_loadableCollection = (0,loadable/* createLoadableCollection */.rL)({
  name: "suggest",
  loadElement: ([objSpaceId, params]) => ({
    loader: () => client/* cmsRetrieval */.g2.retrieveSuggest((0,client/* getWorkspaceId */.LD)(objSpaceId), params),
    invalidation: () => (0,loadable/* loadableWithDefault */.s4)("", () => getContentStateId(objSpaceId))
  })
});
function suggest(objSpaceId, prefix, options, fromSearch) {
  assertNotUsingInMemoryTenant("Search API");
  const results = [];
  if (!(0,client/* isWorkspaceObjSpaceId */.Qk)(objSpaceId)) return results;
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
  if (fromSearch) backendParams.from_search = fromSearch;
  if (attributes) backendParams.fields = attributes;
  if (typeof limit === "number") backendParams.limit = limit;
  return suggest_loadableCollection.get([objSpaceId, backendParams]);
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/find_widget_placement.ts



function findWidgetPlacement(objData, widgetId) {
  let placement = findWidgetPlacementIn(objData, widgetId);
  if (placement) return placement;
  const widgetPool = objData._widget_pool;
  if (!widgetPool) return placement;
  Object.keys(widgetPool).find((parentWidgetId) => {
    const parentWidgetData = widgetPool[parentWidgetId];
    if (parentWidgetData) {
      placement = findWidgetPlacementIn(parentWidgetData, widgetId);
      if (placement) {
        placement.parentWidgetId = parentWidgetId;
        return true;
      }
    }
    return false;
  });
  return placement;
}
function findWidgetPlacementIn(objOrWidgetData, widgetId) {
  let placement;
  Object.keys(objOrWidgetData).find((attributeName) => {
    const jsonValue = objOrWidgetData[attributeName];
    if (!jsonValue) return false;
    if ((0,common/* isSystemAttribute */.iI)(attributeName)) return false;
    const attributeJson = jsonValue;
    if (!(0,client/* isWidgetAttributeJson */.Xj)(attributeJson) && !(0,client/* isWidgetlistAttributeJson */.zt)(attributeJson)) {
      return false;
    }
    const attributeValue = attributeJson[1];
    if (Array.isArray(attributeValue)) {
      const widgetIds = attributeJson[1];
      if (!widgetIds) return false;
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
    return false;
  });
  return placement;
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/obj_data_store.ts




function preloadObjData(objSpaceId, objId) {
  (0,loadable/* load */.Hh)(() => obj_data_store_getObjData(objSpaceId, objId));
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
  if (!objData.ensureAvailable()) return;
  return objData;
}
function objDataFor(objSpaceId, objId) {
  return new ObjData(objSpaceId, objId);
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/get_obj_version.ts



function getObjVersion(objSpaceId, objId) {
  return (0,loadable/* withoutLoading */.J6)(
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

var obj_backend_replication_async = (__this, __arguments, generator) => {
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








class ObjBackendReplication {
  constructor(objSpaceId, objId) {
    this.objSpaceId = objSpaceId;
    this.objId = objId;
    this.replicationActive = false;
    this.scheduledReplication = false;
    this.performThrottledReplication = (0,common/* throttle */.nF)(
      () => this.performReplication(),
      1e3
    );
  }
  start() {
    return obj_backend_replication_async(this, null, function* () {
      const data = yield (0,client/* retrieveObj */.yd)(this.objSpaceId, this.objId, "full");
      (0,state/* addBatchUpdate */.Rs)(() => {
        this.notifyBackendState(data);
      });
    });
  }
  notifyLocalState(localState) {
    if (isObjReplicationDisabled()) return;
    if (isEqualState(this.localState, localState)) return;
    this.localState = localState;
    this.startReplication();
  }
  notifyBackendState(notifiedBackendState) {
    if (!this.localState) {
      this.backendState = notifiedBackendState;
      this.updateLocalState(notifiedBackendState);
      return;
    }
    const newestKnownBackendState = this.bufferedBackendState || this.backendState;
    if (newestKnownBackendState && compareStates(newestKnownBackendState, notifiedBackendState) > 0) {
      return;
    }
    if (this.replicationActive) {
      this.bufferedBackendState = notifiedBackendState;
      return;
    }
    this.updateLocalState(
      threeWayMergeObjs(
        notifiedBackendState,
        this.localState,
        this.backendState
      )
    );
    this.backendState = notifiedBackendState;
  }
  finishSaving() {
    return obj_backend_replication_async(this, null, function* () {
      let finishSavingPromise;
      if (this.nextRequestDeferred) {
        finishSavingPromise = this.nextRequestDeferred.promise;
      } else if (this.currentRequestDeferred) {
        finishSavingPromise = this.currentRequestDeferred.promise;
      } else {
        return;
      }
      return finishSavingPromise;
    });
  }
  finishReplicating() {
    throw new common/* InternalError */.Gd();
  }
  replicationMessageStream() {
    throw new common/* InternalError */.Gd();
  }
  // For test purposes
  getLocalState() {
    return this.localState;
  }
  // For test purposes
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
          (0,common/* nextTick */.dY)(() => this.performThrottledReplication());
        }
      } else if (!this.nextRequestDeferred) {
        this.nextRequestDeferred = new common/* Deferred */.cY();
      }
    } else if (this.nextRequestDeferred) {
      this.nextRequestDeferred.resolve();
      this.nextRequestDeferred = void 0;
    }
  }
  performReplication() {
    return obj_backend_replication_async(this, null, function* () {
      const localState = this.getLocalObjJson();
      this.scheduledReplication = false;
      this.replicationActive = true;
      try {
        const backendState = yield this.replicateLocalStateToBackend(localState);
        this.handleBackendUpdate(localState, backendState);
        this.currentRequestDeferred.resolve();
        this.currentRequestDeferred = void 0;
        this.replicationActive = false;
        this.startReplication();
      } catch (error) {
        if (!(error instanceof Error)) throw error;
        this.currentRequestDeferred.reject(error);
        this.currentRequestDeferred = void 0;
        this.replicationActive = false;
      }
    });
  }
  replicateLocalStateToBackend(localState) {
    return obj_backend_replication_async(this, null, function* () {
      const patch = diffObjJson(this.backendState, localState);
      return isEmpty_default()(patch) ? (
        // bang:
        // given the localState is not blank, the diff may be empty only if the
        // backendState is similar (equal?) to the localState, i.e. not blank
        Promise.resolve(this.backendState)
      ) : this.replicatePatchToBackend(patch);
    });
  }
  replicatePatchToBackend(patch) {
    const id = (0,client/* getWorkspaceId */.LD)(this.objSpaceId);
    if (id === "published") throw new common/* InternalError */.Gd();
    return client/* cmsRestApi */.gd.put(`workspaces/${id}/objs/${this.objId}`, {
      obj: patch
    });
  }
  initDeferredForRequest() {
    if (this.nextRequestDeferred) {
      const currentDeferred = this.nextRequestDeferred;
      this.nextRequestDeferred = void 0;
      this.currentRequestDeferred = currentDeferred;
    } else {
      this.currentRequestDeferred = new common/* Deferred */.cY();
    }
  }
  handleBackendUpdate(replicatedState, backendState) {
    this.backendState = newerState(backendState, this.bufferedBackendState);
    this.bufferedBackendState = void 0;
    this.updateLocalState(
      threeWayMergeObjs(
        this.getLocalObjJson(),
        this.backendState,
        replicatedState
      )
    );
  }
  updateLocalState(newLocalState) {
    this.localState = newLocalState;
    setObjData(this.objSpaceId, this.objId, newLocalState);
  }
  getLocalObjJson() {
    if (this.localState === void 0) {
      throw new common/* InternalError */.Gd();
    }
    return this.localState;
  }
  // For test purpose only.
  isRequestInFlight() {
    return this.replicationActive;
  }
}
function isEqualState(stateA, stateB) {
  return isEmpty_default()(diffObjJson(stateA, stateB));
}
function newerState(stateA, stateB) {
  if (!stateB) return stateA;
  if (compareStates(stateA, stateB) > 0) return stateA;
  return stateB;
}
function compareStates(stateA, stateB) {
  return strCompare(stateA._version, stateB._version);
}
function strCompare(str1, str2) {
  if (str1 !== void 0 && str2 !== void 0) {
    if (str1 > str2) return 1;
    if (str2 > str1) return -1;
  }
  return 0;
}

;// CONCATENATED MODULE: ./scrivito_sdk/replication/version_archive.ts


const START_VERSION = 1;
class VersionArchive {
  constructor() {
    this.archive = {};
  }
  /** get a version number for the given data
   *
   * if data is unchanged from the last call, the same version is returned.
   * otherwise a new version is created.
   */
  versionForData(data) {
    if (this.currentVersion === void 0) {
      this.currentVersion = START_VERSION;
      this.oldestVersion = START_VERSION;
    } else {
      const lastArchivedData = this.archive[this.currentVersion];
      if (data === lastArchivedData) return this.currentVersion;
      this.currentVersion++;
    }
    const newVersionNumber = this.currentVersion;
    this.archive[newVersionNumber] = data;
    return newVersionNumber;
  }
  /** find the data for a version */
  retrieveVersion(version) {
    if (!this.archive.hasOwnProperty(version)) throw new VersionNotFoundError();
    return this.archive[version];
  }
  validVersion(version) {
    return this.currentVersion !== void 0 && version >= START_VERSION && version <= this.currentVersion;
  }
  /** for test purposes only */
  versionCount() {
    return Object.keys(this.archive).length;
  }
  /** remove older versions from the archive, to free memory */
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
class VersionNotFoundError extends common/* ScrivitoError */.aS {
}

;// CONCATENATED MODULE: ./scrivito_sdk/replication/replication_agent.ts



class ReplicationAgent {
  constructor(localState, mergeFunction, currentlyMyTurn) {
    this.localState = localState;
    this.mergeFunction = mergeFunction;
    this.currentlyMyTurn = currentlyMyTurn;
    this.outgoingMessages = new common/* Subject */.B7();
    this.acknowledgedVersions = new common/* Subject */.B7();
    this.localVersionArchive = new VersionArchive();
  }
  /** Version number for the current state */
  currentVersion() {
    return this.localDataAndVersion().currentVersion;
  }
  /** Stream of version numbers that have been successfully replicated */
  replicatedVersions() {
    return this.acknowledgedVersions;
  }
  /** for test purposes only */
  myTurn() {
    return this.currentlyMyTurn;
  }
  /** for test purposes only */
  versionArchiveSize() {
    return this.localVersionArchive.versionCount();
  }
  /** Tell the agent that the local state has changed */
  handleLocalChange() {
    this.sendCurrentState();
  }
  /** Stream of messages for the remote agent */
  replicationMessages() {
    return this.outgoingMessages;
  }
  /** Pass in a message from the remote agent */
  handleIncomingMessage(message) {
    const containedLocalVersion = message.containedReceiverVersion;
    if (containedLocalVersion !== void 0) {
      if (!this.localVersionArchive.validVersion(containedLocalVersion)) return;
      this.localVersionArchive.purgeVersionsOlderThan(containedLocalVersion);
      this.acknowledgedVersions.next(containedLocalVersion);
    }
    if (this.lastRemoteMove === void 0 && this.currentlyMyTurn) return;
    if (!validSuccessorMessage(this.lastRemoteMove, message)) return;
    if (this.incomingMessageAlreadyContained(message)) return;
    if (!isSubsequentMove(this.myLastMove, message)) return;
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
  if (previousMove === void 0) return true;
  const containsPreviousMove = potentialNextMove.containedReceiverVersion !== void 0 && potentialNextMove.containedReceiverVersion >= previousMove.senderVersion;
  const hasNewVersion = previousMove.containedReceiverVersion === void 0 || previousMove.containedReceiverVersion < potentialNextMove.senderVersion;
  return containsPreviousMove && hasNewVersion;
}
function validSuccessorMessage(previousMessage, nextMessage) {
  if (previousMessage === void 0) return true;
  if (nextMessage.senderVersion < previousMessage.senderVersion) return false;
  if (previousMessage.containedReceiverVersion === void 0) return true;
  return nextMessage.containedReceiverVersion !== void 0 && nextMessage.containedReceiverVersion >= previousMessage.containedReceiverVersion;
}

;// CONCATENATED MODULE: ./scrivito_sdk/replication/replication_process.ts

var replication_process_async = (__this, __arguments, generator) => {
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


class ReplicationProcess {
  constructor(localState, remoteMessages, merge, active) {
    this.localState = localState;
    this.remoteMessages = remoteMessages;
    this.outgoingMessages = new common/* BehaviorSubject */.tQ(void 0);
    this.stateChangeCausedByAgent = new common/* ContextContainer */.hl();
    this.replicatedVersions = new common/* BehaviorSubject */.tQ(
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
  /** for test purposes only */
  myTurn() {
    return this.agent.myTurn();
  }
  /** for test purposes only */
  versionArchiveSize() {
    return this.agent.versionArchiveSize();
  }
  /** for test purposes only */
  subscriberCount() {
    return this.outgoingMessages.subscriberCount();
  }
  /** resolves, once the current version of the local state has been replicated */
  finishReplicating() {
    return replication_process_async(this, null, function* () {
      const currentVersion = this.agent.currentVersion();
      yield this.replicatedVersions.filter(common/* isPresent */.Wo).filter((version) => version >= currentVersion).waitForFirst();
    });
  }
  replicationMessages() {
    return new common/* Streamable */.RE((observer) => {
      this.ensureStarted();
      const subscription = this.outgoingMessages.filter(common/* isPresent */.Wo).subscribe(observer);
      return () => {
        subscription.unsubscribe();
        if (this.outgoingMessages.subscriberCount() === 0) this.ensureStopped();
      };
    });
  }
  ensureStarted() {
    if (this.activeSubscriptions) return;
    this.activeSubscriptions = [
      this.localState.changes.subscribe(() => {
        if (this.stateChangeCausedByAgent.current()) return;
        this.agent.handleLocalChange();
      }),
      this.remoteMessages.subscribe(
        (message) => this.agent.handleIncomingMessage(message)
      )
    ];
    this.agent.handleLocalChange();
  }
  ensureStopped() {
    if (!this.activeSubscriptions) return;
    this.activeSubscriptions.forEach(
      (subscription) => subscription.unsubscribe()
    );
    this.activeSubscriptions = void 0;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/replication/index.ts



;// CONCATENATED MODULE: ./scrivito_sdk/data/obj_replication_process.ts







function createObjReplicationProcess(objSpaceId, objId, incomingMessages, role) {
  const batchedMessages = new common/* Streamable */.RE(
    (subscriber) => incomingMessages.subscribe(
      (message) => (0,state/* addBatchUpdate */.Rs)(() => subscriber.next(message))
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
    get: () => (0,loadable/* loadableWithDefault */.s4)(void 0, () => objData.get()),
    set: (value) => {
      if (value !== void 0) objData.set(value);
    },
    changes: (0,loadable/* loadAndObserve */.eX)(() => objData.get()).map(() => {
    })
  };
}
function assertiveThreeWayMergeObjs(myVersion, otherVersion, baseVersion) {
  return threeWayMergeObjs(myVersion, otherVersion, baseVersion);
}
function humbleThreeWayMergeObjs(myVersion, otherVersion, baseVersion) {
  return threeWayMergeObjs(otherVersion, myVersion, baseVersion);
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/id_batch.ts

var id_batch_async = (__this, __arguments, generator) => {
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

const FALLBACK_RESPONSE = {
  results: [],
  total: void 0
};
class IdBatchCollection {
  constructor({
    name,
    loadBatch,
    loadOffline,
    invalidation
  }) {
    this.loadBatch = loadBatch;
    this.loadableCollection = (0,loadable/* createLoadableCollection */.rL)({
      name,
      loadElement: ([params, index], batchSize) => ({
        loader: () => this.loader(params, index, batchSize),
        offlineLoader: loadOffline ? () => loadOffline(params) : void 0,
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
  // For test purposes only
  storeBatch(params, index, result) {
    this.loadableCollection.get([params, index]).set(result);
  }
  // For test purposes only
  setupFakeQuery(searchFn) {
    this.fakeQuery = searchFn;
  }
  // For test purposes only
  clearFakeQuery() {
    this.fakeQuery = void 0;
  }
  // For test purposes only
  usesFakeQuery() {
    return !!this.fakeQuery;
  }
  loader(params, index, batchSize) {
    return id_batch_async(this, null, function* () {
      if (index === 0) return this.loadBatch(params, void 0, batchSize);
      const previousBatch = this.getBatch(params, batchSize, index - 1);
      const continuation = yield (0,loadable/* load */.Hh)(
        () => previousBatch.continuationForNextBatch()
      );
      if (!continuation) {
        return { results: [], total: -1 };
      }
      return this.loadBatch(params, continuation, batchSize);
    });
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
    return this.response().total;
  }
  hasNextBatch() {
    return !!this.continuationForNextBatch();
  }
  continuationForNextBatch() {
    return this.response().continuation;
  }
  response() {
    if (this.fakeData && !this.data.isAvailable()) return this.fakeData;
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
    if (!this.currentBatch) return { done: true };
    if (!this.currentIds) this.currentIds = this.currentBatch.ids();
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
    if (this.priorIdIndex[id]) return this.next();
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

;// CONCATENATED MODULE: ./scrivito_sdk/data/obj_offline_query.ts

var obj_offline_query_async = (__this, __arguments, generator) => {
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



function queryObjOfflineStore(_0) {
  return obj_offline_query_async(this, arguments, function* ({
    query,
    offset,
    orderBy
  }) {
    if (offset && offset > 0) throwNotSupported("offset");
    if (orderBy && orderBy.length > 0) throwNotSupported("order");
    const hits = yield findInObjOfflineStore(
      (objJson) => (0,client/* isExistentObjJson */.MV)(objJson) && isMatchForQuery(objJson, query)
    );
    return {
      results: hits.map(([_objJson, [_, id]]) => id),
      total: hits.length
    };
  });
}
function isMatchForQuery(objJson, query) {
  return query.every(({ field, operator, value, negate }) => {
    if (operator !== "equals") throwNotSupported(`operator ${operator}`);
    if (typeof field !== "string") throwNotSupported("multiple fields");
    const values = Array.isArray(value) ? value : [value];
    const fieldValue = computeFieldValue(objJson, field);
    const wantMatch = !negate;
    const isMatch = values.some((queryValue) => fieldValue === queryValue);
    return wantMatch === isMatch;
  });
}
function computeFieldValue(objJson, field) {
  if (field === "_parent_path") {
    const path = objJson._path;
    return !path || path === "/" ? null : path.split("/").slice(0, -1).join("/") || "/";
  }
  if (isSupportedAttribute(field)) {
    let value = objJson[field];
    if (Array.isArray(value)) value = value[0];
    return value != null ? value : null;
  }
  throwNotSupported(`field ${field}`);
}
const SUPPORTED_ATTRIBUTES = {
  _id: true,
  _obj_class: true,
  _path: true,
  _site_id: true,
  _language: true,
  _content_id: true,
  _permalink: true,
  _data_param: true
};
function isSupportedAttribute(attribute) {
  return SUPPORTED_ATTRIBUTES[attribute] === true;
}
function throwNotSupported(description) {
  throw new NotSupportedOfflineError(description);
}
class NotSupportedOfflineError extends common/* ScrivitoError */.aS {
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/obj_query_store.ts

var obj_query_store_async = (__this, __arguments, generator) => {
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











let includeObjs = true;
const batchCollection = new IdBatchCollection({
  name: "objquery",
  loadBatch,
  loadOffline: ([_objSpaceId, params]) => queryObjOfflineStore(params),
  invalidation: ([objSpaceId]) => (0,loadable/* loadableWithDefault */.s4)(void 0, () => getContentStateId(objSpaceId)) || ""
});
function resetIncludeObjs() {
  includeObjs = true;
}
const clearFakeObjIdQuery = batchCollection.clearFakeQuery.bind(batchCollection);
const setupFakeObjIdQuery = batchCollection.setupFakeQuery.bind(batchCollection);
const usesFakeObjIdQuery = batchCollection.usesFakeQuery.bind(batchCollection);
const storeObjIdQueryBatch = batchCollection.storeBatch.bind(batchCollection);
function getObjQueryCount(objSpaceId, params) {
  var _a;
  if ((0,client/* isEmptySpaceId */.dQ)(objSpaceId)) return 0;
  return (_a = batchCollection.getQueryCount([objSpaceId, params])) != null ? _a : 0;
}
function getObjQuery(objSpaceId, params, batchSize) {
  assertNotUsingInMemoryTenant("Search API");
  if ((0,client/* isEmptySpaceId */.dQ)(objSpaceId)) return new common/* EmptyContinueIterable */.l6();
  const idQuery = new IdBatchQuery(
    (batchNumber) => batchCollection.getBatch([objSpaceId, params], batchSize, batchNumber)
  );
  return (0,common/* transformContinueIterable */.YB)(
    idQuery,
    (iterator) => iterator.map((id) => obj_data_store_getObjData(objSpaceId, id)).takeWhile(common/* isPresent */.Wo).filter((objData) => !objData.isUnavailable())
  );
}
function loadBatch(_0, _1, _2) {
  return obj_query_store_async(this, arguments, function* ([objSpaceId, params], continuation, size) {
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
    if (includeDeleted) requestParams.options.include_deleted = true;
    if (includeEditingAssets) {
      requestParams.options.include_editing_assets = true;
    }
    const workspaceId = (0,client/* getWorkspaceId */.LD)(objSpaceId);
    const response = yield client/* cmsRetrieval */.g2.retrieveObjQuery(
      workspaceId,
      requestParams
    );
    includeObjs = false;
    const includedObjs = response.objs;
    (0,state/* addBatchUpdate */.Rs)(() => {
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

var obj_stream_replication_async = (__this, __arguments, generator) => {
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
  /** for test purposes only */
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
    return obj_stream_replication_async(this, null, function* () {
      yield this.finishReplicating();
      return getEndpoint().finishSavingObj(this.objSpaceId, this.objId);
    });
  }
  replicationMessageStream() {
    return this.replicationProcess.replicationMessages();
  }
  start() {
    this.ensureRunning();
  }
  ensureRunning() {
    if (this.runningEnsured) return;
    this.replicationProcess.replicationMessages().subscribe(() => 0);
    this.runningEnsured = true;
  }
}
function getEndpoint() {
  if (!objReplicationEndpoint) {
    throw new common/* InternalError */.Gd();
  }
  return objReplicationEndpoint;
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/obj_field_diffs_data.ts





const obj_field_diffs_data_loadableCollection = (0,loadable/* createLoadableCollection */.rL)({
  loadElement: ([from, to, objId]) => ({
    loader: () => client/* cmsRetrieval */.g2.retrieveObjFieldDiffs(from, to, objId),
    invalidation: () => `${getVersion(from, objId)}:${getVersion(to, objId)}`
  })
});
function getFieldDiff(from, to, attributeName, objId, widgetId) {
  const fieldDiffs = getFieldDiffs(from, to, objId, widgetId);
  const typeAndDiff = fieldDiffs[(0,common/* underscore */.z9)(attributeName)];
  if (!typeAndDiff) return null;
  return typeAndDiff[1];
}
function getFieldDiffs(from, to, objId, widgetId) {
  if ((0,common/* equals */.aI)(from, to)) return {};
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
  return (0,client/* isWorkspaceObjSpaceId */.Qk)(objSpaceId) ? getObjVersion(objSpaceId, objId) : "";
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
  if (!objDataBefore || !objDataAfter) return false;
  return !isEqual(
    objDataBefore.getAttribute(attribute),
    objDataAfter.getAttribute(attribute)
  );
}
function isWidgetAttributeModified(attribute, [fromObjSpaceId, toObjSpaceId], objId, widgetId) {
  const objDataBefore = getObjDataIfExistent(fromObjSpaceId, objId);
  const objDataAfter = getObjDataIfExistent(toObjSpaceId, objId);
  if (!objDataBefore || !objDataAfter) return false;
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

/***/ 2836:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  bA: () => (/* reexport */ DataClass),
  BA: () => (/* reexport */ DataConnectionError),
  sO: () => (/* reexport */ DataItem),
  bq: () => (/* reexport */ DataScope),
  Ao: () => (/* reexport */ EmptyDataScope),
  Gf: () => (/* reexport */ ExternalDataClass),
  FU: () => (/* reexport */ ExternalDataItem),
  zv: () => (/* reexport */ SINGLETON_DATA_ID),
  Ey: () => (/* reexport */ activateDataIntegration),
  u5: () => (/* reexport */ allCustomAttributesOfTypeString),
  VU: () => (/* reexport */ allExternalDataClasses),
  ZJ: () => (/* reexport */ applyDataLocator),
  gk: () => (/* reexport */ basicObjToDataContext),
  En: () => (/* reexport */ createRestApiConnectionForClass),
  _f: () => (/* reexport */ dataContextFromQueryParams),
  A_: () => (/* reexport */ dataItemToDataContext),
  bU: () => (/* reexport */ deserializeDataItem),
  w1: () => (/* reexport */ deserializeDataScope),
  uw: () => (/* reexport */ deserializeDataStackElement),
  Qt: () => (/* reexport */ disableExternalDataLoading),
  ud: () => (/* reexport */ extractDataClassSchemaResponse),
  dw: () => (/* reexport */ findItemInGlobalData),
  D5: () => (/* reexport */ getDataClass),
  sf: () => (/* reexport */ getDataClassOrThrow),
  nx: () => (/* reexport */ getDataClassTitle),
  K1: () => (/* reexport */ getDataContextParameters),
  qD: () => (/* reexport */ getDataContextQuery),
  iW: () => (/* reexport */ getGlobalDataItems),
  m8: () => (/* reexport */ getNormalizedDataAttributeDefinitions),
  R7: () => (/* reexport */ invalidateExternalData),
  BF: () => (/* reexport */ isDataIntegrationActive),
  o3: () => (/* reexport */ isDataItemPojo),
  Wq: () => (/* reexport */ isExternalDataClassProvided),
  VI: () => (/* reexport */ isMultiItemDataScopePojo),
  y8: () => (/* reexport */ attribute_serialization_and_deserialization_isReferenceAttributeConfig),
  Uq: () => (/* reexport */ isSingleItemElement),
  G7: () => (/* reexport */ isSinglePlaceholder),
  Qk: () => (/* reexport */ isSingletonDataClass),
  Ew: () => (/* reexport */ provideDataClass),
  h8: () => (/* reexport */ provideDataItem),
  wc: () => (/* reexport */ provideExternalDataItem),
  $T: () => (/* reexport */ registerExternalDataClass),
  V8: () => (/* reexport */ replacePlaceholdersWithData),
  Zk: () => (/* reexport */ scopePojoToItemPojo),
  _L: () => (/* reexport */ setCurrentLanguageHandler)
});

// UNUSED EXPORTS: DataItemAttribute, ExternalDataScope, ObjDataScope, getDataAttributeDefinitions, getDataContextValue, isValidDataId, setExternalData

// EXTERNAL MODULE: ./scrivito_sdk/realm/index.ts + 21 modules
var realm = __webpack_require__(7461);
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
  const schema = (0,realm/* schemaFromBasicObjOrWidget */.e6)(obj);
  if (!schema) return;
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

// EXTERNAL MODULE: external "lodash-es/isEqual"
var isEqual_ = __webpack_require__(9477);
var isEqual_default = /*#__PURE__*/__webpack_require__.n(isEqual_);
// EXTERNAL MODULE: external "lodash-es/mapValues"
var mapValues_ = __webpack_require__(7885);
var mapValues_default = /*#__PURE__*/__webpack_require__.n(mapValues_);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 63 modules
var common = __webpack_require__(4665);
;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/lazy_async.ts

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
function mapLazyAsync(lazyValue, fn) {
  const normalized = normalizeLazyAsync(lazyValue);
  return () => __async(null, null, function* () {
    return normalizeLazyAsync(fn(yield normalized()))();
  });
}
function normalizeLazyAsync(value) {
  return () => __async(null, null, function* () {
    return isFunctionLazyAsync(value) ? value() : value;
  });
}
function isFunctionLazyAsync(value) {
  return typeof value === "function";
}

// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 26 modules
var loadable = __webpack_require__(4772);
// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(1946);
;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/data_class_schema.ts

var data_class_schema_defProp = Object.defineProperty;
var data_class_schema_getOwnPropSymbols = Object.getOwnPropertySymbols;
var data_class_schema_hasOwnProp = Object.prototype.hasOwnProperty;
var data_class_schema_propIsEnum = Object.prototype.propertyIsEnumerable;
var data_class_schema_defNormalProp = (obj, key, value) => key in obj ? data_class_schema_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var data_class_schema_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (data_class_schema_hasOwnProp.call(b, prop))
      data_class_schema_defNormalProp(a, prop, b[prop]);
  if (data_class_schema_getOwnPropSymbols)
    for (var prop of data_class_schema_getOwnPropSymbols(b)) {
      if (data_class_schema_propIsEnum.call(b, prop))
        data_class_schema_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var data_class_schema_async = (__this, __arguments, generator) => {
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





function isDataAttributeType(attributeType) {
  return typeof attributeType === "string" && [
    "boolean",
    "date",
    "enum",
    "number",
    "reference",
    "string",
    "unknown"
  ].includes(attributeType);
}
function registerDataClassSchema(dataClassName, schema) {
  const schemata = data_class_schema_spreadValues({}, schemataState.get());
  schemata[dataClassName] = normalizeLazyAsync(schema);
  schemataState.set(schemata);
  invalidateSchemataCollection();
}
function getDataAttributeDefinitions(dataClassName) {
  var _a;
  return (_a = schemataCollection.get(dataClassName).get()) == null ? void 0 : _a.attributes;
}
function getDataClassTitle(dataClassName) {
  var _a;
  return (_a = schemataCollection.get(dataClassName).get()) == null ? void 0 : _a.title;
}
function getNormalizedDataAttributeDefinitions(dataClassName) {
  return mapValues_default()(
    getDataAttributeDefinitions(dataClassName),
    normalizeDataAttributeDefinition
  );
}
function unregisterDataClassSchema(dataClassName) {
  const schemata = data_class_schema_spreadValues({}, schemataState.get());
  delete schemata[dataClassName];
  schemataState.set(schemata);
  invalidateSchemataCollection();
}
const schemataState = (0,state/* createStateContainer */.Ld)();
const counterState = (0,state/* createStateContainer */.Ld)();
const schemataCollection = (0,loadable/* createLoadableCollection */.rL)({
  name: "dataClassSchema",
  loadElement: (dataClassName) => ({
    loader() {
      return data_class_schema_async(this, null, function* () {
        var _a2;
        const callback = (_a2 = schemataState.get()) == null ? void 0 : _a2[dataClassName];
        if (callback) {
          const data = yield callback();
          return {
            attributes: data.attributes instanceof Function ? yield data.attributes() : yield data.attributes,
            title: data.title instanceof Function ? yield data.title() : yield data.title
          };
        }
        return { attributes: {} };
      });
    },
    invalidation: () => getCounter().toString()
  })
});
function invalidateSchemataCollection() {
  counterState.set(getCounter() + 1);
}
function getCounter() {
  return counterState.get() || 0;
}
function normalizeDataAttributeDefinition(definition) {
  if (typeof definition === "string") return [definition, {}];
  const [type, config] = definition;
  if (type === "enum") return [type, normalizeEnumValueConfig(config)];
  return [...definition];
}
function normalizeEnumValueConfig({ title, values }) {
  const config = {
    values: values.map(
      (value) => typeof value === "string" ? { value, title: value } : value
    )
  };
  if (title) config.title = title;
  return config;
}
function extractDataClassSchemaResponse(input) {
  const response = {
    attributes: {},
    title: void 0
  };
  if (!(0,common/* isObject */.Gv)(input)) {
    (0,common/* logError */.vV)(
      `Invalid schema response: expected an object: ${JSON.stringify(input)}`
    );
    return response;
  }
  if (!("attributes" in input)) {
    (0,common/* logError */.vV)(
      `Invalid schema response: no "attributes" key: ${JSON.stringify(input)}`
    );
    return response;
  }
  if ("title" in input && typeof input.title === "string") {
    response.title = input.title;
  }
  response.attributes = extractDataAttributeDefinitions(input.attributes);
  return response;
}
function extractDataAttributeDefinitions(input) {
  const attributes = {};
  if (!(0,common/* isObject */.Gv)(input)) {
    (0,common/* logError */.vV)(
      `Invalid schema response: expected "attributes" to be an object: ${JSON.stringify(
        input
      )}`
    );
    return attributes;
  }
  Object.entries(input).forEach(([attributeName, maybeDefinition]) => {
    if (attributeName === "_id") {
      logSchemaError(
        attributeName,
        maybeDefinition,
        'Key "_id" is not allowed in schema attributes'
      );
    } else {
      if (typeof maybeDefinition === "string") {
        if (isDataAttributeDefinitionWithOptionalConfig(maybeDefinition)) {
          attributes[attributeName] = maybeDefinition;
        } else {
          logSchemaError(
            attributeName,
            maybeDefinition,
            "Unknown attribute type."
          );
        }
      } else if (Array.isArray(maybeDefinition)) {
        const definition = extractDefinitionWithConfig(
          attributeName,
          maybeDefinition
        );
        if (definition) {
          attributes[attributeName] = definition;
        }
      } else {
        logSchemaError(
          attributeName,
          maybeDefinition,
          "Expected an array or a string"
        );
      }
    }
  });
  return attributes;
}
function isDataAttributeDefinitionWithOptionalConfig(definition) {
  return typeof definition === "string" && ["boolean", "date", "number", "string"].includes(definition);
}
function extractDefinitionWithConfig(attributeName, definition) {
  if (definition.length < 2) {
    logSchemaError(
      attributeName,
      definition,
      "Expected an array with two elements."
    );
    return;
  }
  const [attributeType, maybeConfig] = definition;
  if (!isDataAttributeType(attributeType)) {
    logSchemaError(attributeName, attributeType, "Unknown attribute type.");
    return;
  }
  switch (attributeType) {
    case "enum":
      return extractEnumDefinitionWithConfig(attributeName, maybeConfig);
    case "reference":
      return extractReferenceDefinitionWithConfig(attributeName, maybeConfig);
    default:
      return extractLocalizedAttributeConfig(
        attributeName,
        attributeType,
        maybeConfig
      );
  }
}
function extractLocalizedAttributeConfig(attributeName, attributeType, maybeConfig) {
  const config = isLocalizedAttributeConfig(maybeConfig) ? maybeConfig : void 0;
  if (config) return [attributeType, config];
  logSchemaError(attributeName, maybeConfig, "Invalid localization.");
}
function isEnumAttributeConfig(config) {
  return (0,common/* isObject */.Gv)(config) && titleIsValidOrNotPresent(config) && "values" in config && Array.isArray(config.values) && config.values.every(
    (valueOrConfig) => typeof valueOrConfig === "string" && valueOrConfig.length || isLocalizedEnumValueConfig(valueOrConfig)
  );
}
function extractEnumDefinitionWithConfig(attributeName, maybeConfig) {
  if (isEnumAttributeConfig(maybeConfig)) {
    return ["enum", maybeConfig];
  }
  logSchemaError(
    attributeName,
    maybeConfig,
    'Invalid "enum" attribute config.'
  );
}
function extractReferenceDefinitionWithConfig(attributeName, maybeConfig) {
  const config = isReferenceAttributeConfig(maybeConfig) ? maybeConfig : void 0;
  if (config) return ["reference", config];
  logSchemaError(
    attributeName,
    maybeConfig,
    'Invalid "reference" attribute config.'
  );
}
function isLocalizedEnumValueConfig(config) {
  return (0,common/* isObject */.Gv)(config) && "value" in config && typeof config.value === "string" && !!config.value.length && titleIsValidOrNotPresent(config);
}
function isReferenceAttributeConfig(config) {
  return (0,common/* isObject */.Gv)(config) && "to" in config && typeof config.to === "string" && titleIsValidOrNotPresent(config) && (!("reverseTitle" in config) || typeof config.reverseTitle === "string");
}
function isLocalizedAttributeConfig(config) {
  return (0,common/* isObject */.Gv)(config) && (!Object.keys(config).length || titleIsValidOrNotPresent(config));
}
function titleIsValidOrNotPresent(object) {
  return !("title" in object) || typeof object.title === "string";
}
function logSchemaError(attributeName, actual, details) {
  (0,common/* logError */.vV)(
    `Invalid schema definition for attribute "${attributeName}": ${JSON.stringify(
      actual
    )}${details ? `
Details: ${details}` : ""}`
  );
}

// EXTERNAL MODULE: ./scrivito_sdk/models/index.ts + 39 modules
var models = __webpack_require__(8927);
;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/data_class.ts

var data_class_defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var data_class_async = (__this, __arguments, generator) => {
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





class DataClass {
  /** @public */
  attributeDefinitions() {
    return getNormalizedDataAttributeDefinitions(this.name());
  }
  /** @internal */
  title() {
    return getDataClassTitle(this.name());
  }
  /** @internal */
  forAttribute(attributeName) {
    return this.all().transform({ attributeName });
  }
}
class DataScope {
  /** @public */
  dataItemAttribute() {
    const attributeName = this.attributeName();
    if (!attributeName) return null;
    const dataItem = this.dataItem();
    if (!dataItem) return null;
    return new DataItemAttribute(dataItem, attributeName);
  }
  /** @public */
  isEmpty() {
    return this.transform({ limit: 1 }).take().length === 0;
  }
  /** @public */
  containsData() {
    return !this.isEmpty();
  }
  /** @internal */
  normalizeFilters(filters) {
    if (!filters) return;
    return mapValues_default()(filters, (valueOrSpec, attributeName) => {
      if (isAndOperatorSpec(valueOrSpec)) return valueOrSpec;
      const isOpSpec = isOperatorSpec(valueOrSpec);
      const actualValue = isOpSpec ? valueOrSpec.value : valueOrSpec;
      let serializedValue = actualValue;
      if (actualValue instanceof Date) {
        serializedValue = actualValue.toISOString();
      }
      if (actualValue instanceof DataItem) {
        serializedValue = actualValue.id();
      }
      if (serializedValue === null || typeof serializedValue === "string" || typeof serializedValue === "number" || typeof serializedValue === "boolean") {
        const operator = isOpSpec ? valueOrSpec.operator : "equals";
        return { operator, value: serializedValue };
      }
      throw new common/* ArgumentError */.c1(
        `Invalid filter value for "${attributeName}": ${JSON.stringify(
          valueOrSpec
        )}`
      );
    });
  }
  attributesFromFilters(filters) {
    if (!filters) return;
    const initialAttributes = {};
    return Object.keys(filters).reduce((attributes, name) => {
      const filter = filters[name];
      const specs = isOperatorSpec(filter) ? [filter] : filter.value;
      specs.forEach((spec) => {
        if (spec.operator === "equals") attributes[name] = spec.value;
      });
      return attributes;
    }, initialAttributes);
  }
}
class DataItemAttribute {
  constructor(_dataItem, _attributeName) {
    this._dataItem = _dataItem;
    this._attributeName = _attributeName;
  }
  dataClass() {
    return this._dataItem.dataClass();
  }
  dataClassName() {
    return this._dataItem.dataClassName();
  }
  dataItem() {
    return this._dataItem;
  }
  attributeName() {
    return this._attributeName;
  }
  get() {
    return this._dataItem.get(this._attributeName);
  }
  update(value) {
    return data_class_async(this, null, function* () {
      return this._dataItem.update({ [this._attributeName]: value });
    });
  }
  /** @internal */
  attributeDefinition() {
    return this.dataClass().attributeDefinitions()[this._attributeName] || null;
  }
}
const DEFAULT_LIMIT = 20;
class DataItem {
  /** @public */
  attributeDefinitions() {
    return this.dataClass().attributeDefinitions();
  }
  /** @internal */
  title() {
    return this.dataClass().title();
  }
  /** @internal */
  getRaw(_attributeName) {
    return;
  }
  /** @internal */
  getLocalized(attributeName) {
    return this.get(attributeName);
  }
}
class DataScopeError extends common/* ScrivitoError */.aS {
  /** @internal */
  constructor(message) {
    super(message);
    this.message = message;
  }
}
function assertValidDataItemAttributes(attributes) {
  if (!(0,common/* isObject */.Gv)(attributes)) {
    throw new common/* ArgumentError */.c1("Data item attributes must be an object");
  }
  if (!Object.keys(attributes).every(models/* isValidDataIdentifier */.Wf)) {
    throw new common/* ArgumentError */.c1(
      "Keys of data item attributes must be valid data identifiers"
    );
  }
}
function combineFilters(currFilters, nextFilters) {
  if (!currFilters) return nextFilters;
  if (!nextFilters) return currFilters;
  let combinedFilters = data_class_spreadValues({}, currFilters);
  Object.keys(nextFilters).forEach((attributeName) => {
    if (attributeName in combinedFilters && !isEqual_default()(combinedFilters[attributeName], nextFilters[attributeName])) {
      const currentFilter = combinedFilters[attributeName];
      const nextFilter = nextFilters[attributeName];
      combinedFilters = __spreadProps(data_class_spreadValues({}, combinedFilters), {
        [attributeName]: {
          operator: "and",
          value: [
            ...isOperatorSpec(currentFilter) ? [currentFilter] : currentFilter.value,
            ...isOperatorSpec(nextFilter) ? [nextFilter] : nextFilter.value
          ]
        }
      });
      return;
    }
    combinedFilters[attributeName] = nextFilters[attributeName];
  });
  return combinedFilters;
}
function combineSearches(currSearch, nextSearch) {
  return currSearch && nextSearch ? `${currSearch} ${nextSearch}` : currSearch || nextSearch;
}
function itemPojoToScopePojo({
  _class,
  _id
}) {
  return { _class, filters: { _id: { operator: "equals", value: _id } } };
}
function scopePojoToItemPojo({
  _class,
  filters
}) {
  const id = itemIdFromFilters(filters);
  if (id) return { _class, _id: id };
}
function itemIdFromFilters(filters) {
  var _a;
  const id = (_a = filters == null ? void 0 : filters._id) == null ? void 0 : _a.value;
  if (typeof id === "string") return id;
}
function isFilterOperator(operator) {
  return typeof operator === "string" && [
    "equals",
    "notEquals",
    "isGreaterThan",
    "isLessThan",
    "isGreaterThanOrEquals",
    "isLessThanOrEquals"
  ].includes(operator);
}
function isOperatorSpec(spec) {
  return (0,common/* isObject */.Gv)(spec) && "operator" in spec && isFilterOperator(spec.operator) && "value" in spec && (spec.value === null || ["string", "number", "boolean"].includes(typeof spec.value));
}
function isAndOperatorSpec(spec) {
  return (0,common/* isObject */.Gv)(spec) && "operator" in spec && spec.operator === "and" && "value" in spec && Array.isArray(spec.value) && spec.value.every(isOperatorSpec);
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/create_rest_api_connection.ts

var create_rest_api_connection_defProp = Object.defineProperty;
var create_rest_api_connection_defProps = Object.defineProperties;
var create_rest_api_connection_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var create_rest_api_connection_getOwnPropSymbols = Object.getOwnPropertySymbols;
var create_rest_api_connection_hasOwnProp = Object.prototype.hasOwnProperty;
var create_rest_api_connection_propIsEnum = Object.prototype.propertyIsEnumerable;
var create_rest_api_connection_defNormalProp = (obj, key, value) => key in obj ? create_rest_api_connection_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var create_rest_api_connection_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (create_rest_api_connection_hasOwnProp.call(b, prop))
      create_rest_api_connection_defNormalProp(a, prop, b[prop]);
  if (create_rest_api_connection_getOwnPropSymbols)
    for (var prop of create_rest_api_connection_getOwnPropSymbols(b)) {
      if (create_rest_api_connection_propIsEnum.call(b, prop))
        create_rest_api_connection_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var create_rest_api_connection_spreadProps = (a, b) => create_rest_api_connection_defProps(a, create_rest_api_connection_getOwnPropDescs(b));
var create_rest_api_connection_async = (__this, __arguments, generator) => {
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

function createRestApiConnectionForClass(apiClient) {
  return {
    create: (data) => create_rest_api_connection_async(null, null, function* () {
      return apiClient.fetch("", { method: "post", data });
    }),
    index: (params) => create_rest_api_connection_async(null, null, function* () {
      return apiClient.fetch("", { params: toClientParams(params) });
    }),
    get: (id) => create_rest_api_connection_async(null, null, function* () {
      return apiClient.fetch(id);
    }),
    update: (id, data) => create_rest_api_connection_async(null, null, function* () {
      return apiClient.fetch(id, { method: "patch", data });
    }),
    delete: (id) => apiClient.fetch(id, { method: "delete" })
  };
}
function toClientParams(params) {
  return create_rest_api_connection_spreadProps(create_rest_api_connection_spreadValues({}, toClientFilterParam(params.filters())), {
    _continuation: params.continuation(),
    _order: toClientOrderParam(params.order()),
    _limit: params.limit().toString(),
    _search: params.search() || void 0,
    _count: params.includeCount() ? params.includeCount().toString() : void 0
  });
}
function toClientFilterParam(filters) {
  const params = {};
  Object.keys(filters).forEach((name) => {
    const filter = filters[name];
    let filterCollection;
    if (filter.operator === "and") {
      assertNoConflicts(filter.value);
      filterCollection = filter.value;
    } else {
      filterCollection = [filter];
    }
    filterCollection.forEach((currentFilter) => {
      const { opCode, value } = currentFilter;
      const key = opCode === "eq" ? name : [name, opCode].join(".");
      params[key] = serializeFilterValue(value);
    });
  });
  return params;
}
function toClientOrderParam(orderSpec) {
  if (orderSpec.length) {
    return orderSpec.map((order) => order.join(".")).join(",");
  }
}
function serializeFilterValue(value) {
  if (typeof value === "string") return value;
  if (value === null) return "";
  return JSON.stringify(value);
}
function assertNoConflicts(specs) {
  if (specs.length < 2) return;
  if (specs.some(
    (outerSpec, index) => specs.slice(index + 1).some(
      (innerSpec) => innerSpec.operator === outerSpec.operator && innerSpec.value !== outerSpec.value
    )
  )) {
    throw new common/* ArgumentError */.c1(
      `Multiple filters on the same attribute with the same operator but different values are currently not supported: ${JSON.stringify(
        specs
      )}`
    );
  }
}

// EXTERNAL MODULE: ./scrivito_sdk/client/index.ts + 38 modules
var client = __webpack_require__(853);
// EXTERNAL MODULE: external "lodash-es/isDate"
var isDate_ = __webpack_require__(8307);
var isDate_default = /*#__PURE__*/__webpack_require__.n(isDate_);
;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/data_id.ts

function isValidDataId(id) {
  return typeof id === "string" && !id.includes("^") && /^[\x21-\x7D]+$/.test(id);
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/attribute_serialization_and_deserialization.ts







const serializers = {
  boolean: serializeBooleanAttribute,
  date: serializeDateAttribute,
  enum: serializeEnumAttribute,
  number: serializeNumberAttribute,
  reference: serializeReferenceAttribute,
  string: serializeStringAttribute,
  unknown: (value) => value
};
function serializeDataAttribute({
  dataClassName,
  attributeName,
  value,
  attributes
}) {
  assertNoTypedObject(dataClassName, attributeName, value);
  const attributeDefinition = attributes[attributeName];
  if (attributeDefinition) {
    const attributeType = getAttributeType(attributeDefinition);
    const serializer = serializers[attributeType];
    if (serializer) {
      return serializer(
        value,
        dataClassName,
        attributeName,
        attributeDefinition
      );
    }
  }
  return value != null ? value : null;
}
function deserializeDataAttribute({
  value,
  dataClassName,
  attributeName,
  attributes
}) {
  assertNoTypedObject(dataClassName, attributeName, value);
  const attributeDefinition = attributes[attributeName];
  if (attributeDefinition) {
    const attributeType = getAttributeType(attributeDefinition);
    const deserializer = deserializers[attributeType];
    if (deserializer) {
      return deserializer(
        value,
        dataClassName,
        attributeName,
        attributeDefinition
      );
    }
  }
  return value != null ? value : null;
}
function serializeBooleanAttribute(value, dataClassName, attributeName) {
  if (typeof value === "boolean") return value;
  throwTypeMismatch(dataClassName, attributeName, "a boolean", value);
}
function serializeDateAttribute(value, dataClassName, attributeName) {
  if (value === null || typeof value === "string" && (0,common/* isISO8601 */.p1)(value)) {
    return value;
  }
  if (isDate_default()(value)) return value.toISOString();
  throwTypeMismatch(
    dataClassName,
    attributeName,
    "an instance of Date, an ISO8601 date string or null",
    value
  );
}
function serializeEnumAttribute(value, dataClassName, attributeName, attributeDefinition) {
  const enumValues = getEnumValues(getAttributeConfig(attributeDefinition));
  if (value === null || typeof value === "string" && enumValues.includes(value)) {
    return value;
  }
  throwTypeMismatch(
    dataClassName,
    attributeName,
    `one of ${JSON.stringify(enumValues)} or null`,
    value
  );
}
function serializeNumberAttribute(value, dataClassName, attributeName) {
  if (value === null || typeof value === "number") return value;
  throwTypeMismatch(dataClassName, attributeName, "a number or null", value);
}
function serializeReferenceAttribute(value, dataClassName, attributeName, attributeDefinition) {
  if (value === null || isValidDataId(value)) return value;
  if (value instanceof DataItem && value.dataClassName() === getReferencedClassName(getAttributeConfig(attributeDefinition))) {
    return value.id();
  }
  throwTypeMismatch(
    dataClassName,
    attributeName,
    `an instance of DataItem of data class "${dataClassName}", a valid data ID or null`,
    value
  );
  return null;
}
function serializeStringAttribute(value, dataClassName, attributeName) {
  if (typeof value === "string") return value;
  throwTypeMismatch(dataClassName, attributeName, "a string", value);
}
const deserializers = {
  boolean: deserializeBooleanAttribute,
  date: deserializeDateAttribute,
  enum: deserializeEnumAttribute,
  number: deserializeNumberAttribute,
  reference: deserializeReferenceAttribute,
  string: deserializeStringAttribute,
  unknown: (value) => value
};
function deserializeBooleanAttribute(value, dataClassName, attributeName) {
  if (typeof value === "boolean") {
    return value;
  }
  logTypeMismatch(dataClassName, attributeName, "a boolean", value);
  return false;
}
function deserializeDateAttribute(value, dataClassName, attributeName) {
  if (isEmptyStringOrNull(value)) return null;
  if (typeof value === "string" && (0,common/* isISO8601 */.p1)(value)) {
    return new Date(value);
  }
  logTypeMismatch(
    dataClassName,
    attributeName,
    "an ISO8601 date string",
    value
  );
  return null;
}
function deserializeEnumAttribute(value, dataClassName, attributeName, attributeDefinition) {
  if (isEmptyStringOrNull(value)) return null;
  const enumValues = getEnumValues(getAttributeConfig(attributeDefinition));
  if (typeof value === "string" && enumValues.includes(value)) {
    return value;
  }
  logTypeMismatch(
    dataClassName,
    attributeName,
    `one of ${JSON.stringify(enumValues)}`,
    value
  );
  return null;
}
function deserializeReferenceAttribute(value, dataClassName, attributeName, attributeDefinition) {
  if (isEmptyStringOrNull(value)) return null;
  if (isValidDataId(value)) {
    return getDataClassOrThrow(
      getReferencedClassName(getAttributeConfig(attributeDefinition))
    ).get(value) || null;
  }
  logTypeMismatch(dataClassName, attributeName, "a valid data ID", value);
  return null;
}
function deserializeNumberAttribute(value, dataClassName, attributeName) {
  if (typeof value === "number") {
    return value;
  }
  logTypeMismatch(dataClassName, attributeName, "a number", value);
  return null;
}
function deserializeStringAttribute(value, dataClassName, attributeName) {
  if (typeof value === "string") {
    return value;
  }
  logTypeMismatch(dataClassName, attributeName, "a string", value);
  return "";
}
function isEmptyStringOrNull(value) {
  return value === null || value === "";
}
function getAttributeType(attributeDefinition) {
  return typeof attributeDefinition === "string" ? attributeDefinition : attributeDefinition[0];
}
function getAttributeConfig(attributeDefinition) {
  if (typeof attributeDefinition !== "string") {
    return attributeDefinition[1];
  }
}
function getEnumValues(attributeConfig) {
  if (isEnumAttributeConfig(attributeConfig)) {
    return attributeConfig.values.map(
      (valueOrConfig) => typeof valueOrConfig === "string" ? valueOrConfig : valueOrConfig.value
    );
  }
  throw new common/* ArgumentError */.c1(
    'Enum attribute config is missing the "values" property'
  );
}
function getReferencedClassName(attributeConfig) {
  if (attributeConfig && attribute_serialization_and_deserialization_isReferenceAttributeConfig(attributeConfig)) {
    return attributeConfig.to;
  }
  throw new common/* ArgumentError */.c1(
    'Reference attribute config is missing the "to" property'
  );
}
function attribute_serialization_and_deserialization_isReferenceAttributeConfig(attributeConfig) {
  return !!(attributeConfig && "to" in attributeConfig && typeof attributeConfig.to === "string");
}
function assertNoTypedObject(dataClassName, attributeName, value) {
  if (Array.isArray(value)) {
    assertNoTypedObject(dataClassName, attributeName, value[0]);
  }
  if ((0,common/* isObject */.Gv)(value) && value.hasOwnProperty("_type")) {
    throw new common/* ArgumentError */.c1(
      `Value for attribute "${attributeName}" of data class "${dataClassName}" contains an object with property "_type"`
    );
  }
}
function logTypeMismatch(dataClassName, attributeName, expected, actual) {
  if (actual === null || actual === void 0) return;
  (0,common/* logError */.vV)(typeMismatchMessage(dataClassName, attributeName, expected, actual));
}
function throwTypeMismatch(dataClassName, attributeName, expected, actual) {
  throw new common/* ArgumentError */.c1(
    typeMismatchMessage(dataClassName, attributeName, expected, actual)
  );
}
function typeMismatchMessage(dataClassName, attributeName, expected, actual) {
  return `Expected attribute "${attributeName}" of data class "${dataClassName}" to be ${expected}, but got ${JSON.stringify(actual)}`;
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/data_connection_error.ts


class DataConnectionError extends common/* ScrivitoError */.aS {
  constructor(message) {
    super(message);
    this.message = message;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/disable_external_data_loading.ts


const isLoadingDisabled = new common/* ContextContainer */.hl();
function disableExternalDataLoading(fn) {
  return isLoadingDisabled.runWith(true, fn);
}
function isExternalDataLoadingDisabled() {
  return isLoadingDisabled.current() || false;
}

// EXTERNAL MODULE: external "lodash-es/memoize"
var memoize_ = __webpack_require__(721);
var memoize_default = /*#__PURE__*/__webpack_require__.n(memoize_);
;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/add_missing_data_connection_handlers.ts


function addMissingDataConnectionHandlers(connection, dataClass) {
  return {
    get: connection.get || throwMissingCallbackError("get", dataClass),
    update: connection.update || throwMissingCallbackError("update", dataClass),
    index: connection.index || throwMissingCallbackError("index", dataClass),
    create: connection.create || throwMissingCallbackError("create", dataClass),
    delete: connection.delete || throwMissingCallbackError("delete", dataClass)
  };
}
function throwMissingCallbackError(callbackName, dataClass) {
  return () => {
    throw new common/* ScrivitoError */.aS(
      `No "${callbackName}" callback function defined for data class "${dataClass}".`
    );
  };
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/anticipated_data_connection.ts

var anticipated_data_connection_async = (__this, __arguments, generator) => {
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



function anticipatedDataConnection(connectionPromise, dataClass) {
  const getCompleteConnection = memoize_default()(() => anticipated_data_connection_async(null, null, function* () {
    return addMissingDataConnectionHandlers(
      yield normalizeLazyAsync(connectionPromise)(),
      dataClass
    );
  }));
  return {
    get: (...args) => anticipated_data_connection_async(null, null, function* () {
      return (yield getCompleteConnection()).get(...args);
    }),
    index: (...args) => anticipated_data_connection_async(null, null, function* () {
      return (yield getCompleteConnection()).index(...args);
    }),
    create: (...args) => anticipated_data_connection_async(null, null, function* () {
      return (yield getCompleteConnection()).create(...args);
    }),
    update: (...args) => anticipated_data_connection_async(null, null, function* () {
      return (yield getCompleteConnection()).update(...args);
    }),
    delete: (...args) => anticipated_data_connection_async(null, null, function* () {
      return (yield getCompleteConnection()).delete(...args);
    })
  };
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/external_data_connection.ts

var external_data_connection_defProp = Object.defineProperty;
var external_data_connection_defProps = Object.defineProperties;
var external_data_connection_getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var external_data_connection_spreadProps = (a, b) => external_data_connection_defProps(a, external_data_connection_getOwnPropDescs(b));
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
var external_data_connection_async = (__this, __arguments, generator) => {
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







function assertValidNumericId(id) {
  if (id < 0 || !Number.isSafeInteger(id)) {
    throw new common/* ArgumentError */.c1(
      `Numeric IDs must be a non-negative "safe" integer: ${id.toString()}`
    );
  }
}
function parseResultItem(resultItem) {
  if (!(0,common/* isObject */.Gv)(resultItem)) {
    throw new common/* ArgumentError */.c1("A result item must be an object");
  }
  if ("_id" in resultItem) {
    const _a = resultItem, { _id } = _a, customData = __objRest(_a, ["_id"]);
    return parseToExternalData(_id, customData);
  }
  if ("id" in resultItem) {
    const _b = resultItem, { id } = _b, customData = __objRest(_b, ["id"]);
    return parseToExternalData(id, customData);
  }
  throw new common/* ArgumentError */.c1('"_id" key missing');
}
function parseToExternalData(id, customData) {
  return {
    systemData: { _id: parseId(id) },
    customData: filterValidDataIdentifiers(customData)
  };
}
function parseId(id) {
  if (typeof id === "number") {
    assertValidNumericId(id);
    return id.toString();
  }
  if (!isValidDataId(id)) {
    throw new common/* ArgumentError */.c1('"_id" key invalid (must be numeric or hex)');
  }
  return id;
}
function parseIndexResult(result) {
  if (!(0,common/* isObject */.Gv)(result)) {
    throw new common/* ArgumentError */.c1("An index result must be an object");
  }
  const { results: inputResults, continuation, count } = result;
  if (!Array.isArray(inputResults)) {
    throw new common/* ArgumentError */.c1("Results of an index result must be an array");
  }
  const parsedResults = inputResults.map((idOrItem) => {
    if (typeof idOrItem === "number") {
      assertValidNumericId(idOrItem);
      return idOrItem;
    } else if (typeof idOrItem === "string") {
      assertValidDataId(idOrItem);
      return idOrItem;
    }
    return parseResultItem(idOrItem);
  });
  if (typeof continuation === "string") {
    if (continuation.length === 0) {
      throw new common/* ArgumentError */.c1(
        "Continuation of an index result must be a non-empty string, null or undefined"
      );
    }
  } else if ((0,common/* isPresent */.Wo)(continuation)) {
    throw new common/* ArgumentError */.c1(
      "Continuation of an index result must be a string, null or undefined"
    );
  }
  return {
    results: parsedResults,
    continuation,
    count: parseCount(count)
  };
}
function parseCount(resultCount) {
  if (resultCount === void 0 || resultCount === null) return;
  if (typeof resultCount !== "number" && typeof resultCount !== "string") {
    throw new common/* ArgumentError */.c1(
      "Count of an index result must be a non-negative integer, null or undefined"
    );
  }
  const count = Number(resultCount);
  if (count >= 0 && (0,common/* isValidInteger */.zh)(count)) return count;
  throw new common/* ArgumentError */.c1(
    "Count of an index result must be a non-negative integer"
  );
}
function assertValidDataId(dataId) {
  if (!isValidDataId(dataId)) {
    throw new common/* ArgumentError */.c1(
      "Strings in results of an index result must be valid data IDs"
    );
  }
}
const connectionsState = (0,state/* createStateContainer */.Ld)();
function resetExternalDataConnections() {
  connectionsState.clear();
}
function setExternalDataConnection(name, partialConnection) {
  const connection = anticipatedDataConnection(partialConnection, name);
  connectionsState.set(external_data_connection_spreadProps(external_data_connection_spreadValues({}, connectionsState.get()), {
    [name]: connection
  }));
}
function hasExternalDataConnection(name) {
  return !!getExternalDataConnection(name);
}
function getExternalDataConnection(name) {
  const connections = connectionsState.get();
  if (connections) return connections[name];
}
function getExternalDataConnectionNames() {
  const connections = connectionsState.get();
  return connections ? Object.keys(connections) : [];
}
function getExternalDataConnectionOrThrow(name) {
  const connection = getExternalDataConnection(name);
  if (!connection) {
    throw new common/* ArgumentError */.c1(`Missing data class with name ${name}`);
  }
  return connection;
}
function getViaDataConnection(name, id) {
  return external_data_connection_async(this, null, function* () {
    if (!isValidDataId(id)) {
      throw new common/* ArgumentError */.c1(`Invalid data ID "${id}"`);
    }
    let response;
    try {
      response = yield getExternalDataConnectionOrThrow(name).get(id);
    } catch (error) {
      if (error instanceof client/* ClientError */.MZ && error.httpStatus === 404) {
        return null;
      }
      throw error;
    }
    if (response === null) return null;
    if (!(0,common/* isObject */.Gv)(response)) {
      throw new common/* ArgumentError */.c1("External data must be an object or null");
    }
    return {
      systemData: { _id: id },
      customData: filterValidDataIdentifiers(response)
    };
  });
}
function filterValidDataIdentifiers(data) {
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => (0,models/* isValidDataIdentifier */.Wf)(key))
  );
}
function indexViaDataConnection(name, params) {
  return external_data_connection_async(this, null, function* () {
    const result = yield getExternalDataConnectionOrThrow(name).index(params);
    if (result instanceof DataConnectionError) throw result;
    return parseIndexResult(result);
  });
}
function createViaDataConnection(name, data) {
  return external_data_connection_async(this, null, function* () {
    const response = yield getExternalDataConnectionOrThrow(name).create(data);
    const { systemData, customData } = parseResultItem(response);
    return {
      systemData,
      customData: Object.keys(customData).length === 0 ? data : customData
    };
  });
}
function updateViaDataConnection(name, id, data) {
  return external_data_connection_async(this, null, function* () {
    const response = yield getExternalDataConnectionOrThrow(name).update(
      id,
      data
    );
    const updatedData = response != null ? response : {};
    if (!(0,common/* isObject */.Gv)(updatedData)) {
      throw new common/* ArgumentError */.c1("External data must be an object or null");
    }
    const _a = filterValidDataIdentifiers(updatedData), { _id } = _a, filteredData = __objRest(_a, ["_id"]);
    return external_data_connection_spreadValues(external_data_connection_spreadValues({}, data), filteredData);
  });
}
function deleteViaDataConnection(name, id) {
  return getExternalDataConnectionOrThrow(name).delete(id);
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/external_data.ts




function setExternalData(dataClass, dataId, data) {
  loadableCollection.get([dataClass, dataId]).set(data);
}
function getExternalData(dataClass, dataId) {
  if (isExternalDataLoadingDisabled()) return void 0;
  return loadableCollection.get([dataClass, dataId]).get();
}
const loadableCollection = (0,loadable/* createLoadableCollection */.rL)({
  name: "externaldata",
  loadElement: ([dataClass, dataId]) => ({
    loader: () => getViaDataConnection(dataClass, dataId)
  })
});
function findInExternalDataOfflineStore(selector) {
  return loadableCollection.findValuesInOfflineStore(selector);
}

// EXTERNAL MODULE: ./scrivito_sdk/data/index.ts + 30 modules
var data = __webpack_require__(7164);
;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/external_data_offline_query.ts

var external_data_offline_query_async = (__this, __arguments, generator) => {
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


function queryExternalDataOfflineStore(_0) {
  return external_data_offline_query_async(this, arguments, function* ([
    wantedDataClass,
    filters,
    search,
    order,
    _count
  ]) {
    const collection = yield findInExternalDataOfflineStore(
      (data, [dataClass, id]) => {
        if (data === null) return false;
        if (dataClass !== wantedDataClass) return false;
        return isMatchForFilters(id, data, filters);
      }
    );
    const results = withOrder(withSearch(collection, search), order).map(
      ([_data, [_class, id]]) => id
    );
    return { results, count: results.length };
  });
}
function withOrder(collection, order) {
  if (order === void 0 || order.length === 0) return collection;
  return collection.sort(
    (resultA, resultB) => compareDataForSorting(order, resultA, resultB)
  );
}
function withSearch(collection, searchTerm) {
  if (!searchTerm) return collection;
  const searchTerms = searchTerm.trim().split(" ");
  return collection.filter(([data]) => {
    if (data) {
      return searchTerms.every(
        (term) => Object.values(data.customData).some(
          (value) => typeof value === "string" && value.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  });
}
function isMatchForFilters(id, data, filters) {
  if (!filters) return true;
  return Object.keys(filters).every((attribute) => {
    const filter = filters[attribute];
    if (filter.operator === "and") {
      return filter.value.every(
        (operatorSpec) => isMatchForFilters(id, data, { [attribute]: operatorSpec })
      );
    }
    return filterMatchesValue(filter, attributeValue(id, data, attribute));
  });
}
function filterMatchesValue(filter, dataValue) {
  switch (filter.operator) {
    case "equals":
      return dataValue === filter.value;
    case "notEquals":
      return dataValue !== filter.value;
    case "isGreaterThan":
      return isGreaterIfComparable(dataValue, filter.value) === true;
    case "isGreaterThanOrEquals":
      return dataValue === filter.value || isGreaterIfComparable(dataValue, filter.value) === true;
    case "isLessThan":
      return dataValue !== filter.value && isGreaterIfComparable(dataValue, filter.value) === false;
    case "isLessThanOrEquals":
      return isGreaterIfComparable(dataValue, filter.value) === false;
    default:
      throwUnhandledOperator(filter.operator);
  }
}
function throwUnhandledOperator(operator) {
  throwNotSupported(`operator ${operator}`);
}
function isGreaterIfComparable(dataValue, filterValue) {
  if (typeof filterValue === "number" && typeof dataValue === "number") {
    return dataValue > filterValue;
  }
  if (typeof filterValue === "string" && typeof dataValue === "string") {
    return dataValue > filterValue;
  }
  return void 0;
}
function compareDataForSorting([[attribute, direction], ...remainingOrder], [dataA, [classA, idA]], [dataB, [classB, idB]]) {
  const result = compareValuesForSorting(
    attributeValue(idA, dataA, attribute),
    attributeValue(idB, dataB, attribute)
  );
  if (result === 0 && remainingOrder.length > 0) {
    return compareDataForSorting(
      remainingOrder,
      [dataA, [classA, idA]],
      [dataB, [classB, idB]]
    );
  }
  const multiplier = direction === "asc" ? 1 : -1;
  return multiplier * result;
}
function compareValuesForSorting(valueA, valueB) {
  if (typeof valueA === "number" && typeof valueB === "number") {
    return valueA - valueB;
  }
  if (typeof valueA === "string" && typeof valueB === "string") {
    return valueB === valueA ? 0 : valueA > valueB ? 1 : -1;
  }
  if (typeof valueA === "number") return -1;
  if (typeof valueB === "number") return 1;
  if (typeof valueA === "string") return 1;
  if (typeof valueB === "string") return -1;
  return 0;
}
function attributeValue(id, data, attribute) {
  if (!data) return null;
  const rawValue = attribute === "_id" ? id : data.customData[attribute];
  return rawValue === void 0 ? null : rawValue;
}
function throwNotSupported(description) {
  throw new DataConnectionError(`Not supported: ${description}`);
}

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

class DataConnectionIndexParams {
  constructor(_continuation, _params) {
    this._continuation = _continuation;
    this._params = _params;
  }
  continuation() {
    return this._continuation;
  }
  filters() {
    return Object.entries(this._params.filters || {}).reduce(
      (filters, [name, operatorSpec]) => {
        if (!name) return filters;
        return index_params_spreadProps(index_params_spreadValues({}, filters), {
          [name]: isOperatorSpec(operatorSpec) ? index_params_spreadProps(index_params_spreadValues({}, operatorSpec), {
            opCode: operatorToOpCode[operatorSpec.operator]
          }) : {
            operator: "and",
            value: operatorSpec.value.map((spec) => index_params_spreadProps(index_params_spreadValues({}, spec), {
              opCode: operatorToOpCode[spec.operator]
            }))
          }
        });
      },
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
  limit() {
    return this._params.limit;
  }
  includeCount() {
    return this._params.count;
  }
}
const operatorToOpCode = {
  equals: "eq",
  notEquals: "neq",
  isGreaterThan: "gt",
  isLessThan: "lt",
  isGreaterThanOrEquals: "gte",
  isLessThanOrEquals: "lte"
};
function isAndFilterSpec(spec) {
  return spec.operator === "and";
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/external_data_query.ts

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
const batchCollection = new data/* IdBatchCollection */.O2({
  name: "externaldataquery",
  loadBatch,
  loadOffline: queryExternalDataOfflineStore,
  invalidation: ([dataClass]) => (0,loadable/* loadableWithDefault */.s4)(
    void 0,
    () => getWriteCounter(dataClass).toString()
  ) || ""
});
function countExternalData(dataClass, filters, search, attributes) {
  var _a;
  validateFilters(dataClass, filters, attributes);
  return (_a = batchCollection.getQueryCount([
    dataClass,
    filters,
    search,
    void 0,
    true
  ])) != null ? _a : null;
}
function getExternalDataQuery({ _class: dataClass, filters, search, order, limit }, attributes) {
  if (isExternalDataLoadingDisabled()) return new common/* EmptyContinueIterable */.l6();
  validateFilters(dataClass, filters, attributes);
  const batchSize = limit != null ? limit : DEFAULT_LIMIT;
  const idQuery = new data/* IdBatchQuery */.UX(
    (batchNumber) => batchCollection.getBatch(
      [
        dataClass,
        filters,
        search,
        order,
        false
        // Never ask the backend about total count when fetching actual result data
      ],
      batchSize,
      batchNumber
    )
  );
  return (0,common/* transformContinueIterable */.YB)(
    idQuery,
    (iterator) => iterator.map((idOrItem) => toDataResult(idOrItem, dataClass)).takeWhile(({ data }) => data !== void 0).filter(({ data }) => data !== null).map(({ id }) => id)
  );
}
function validateFilters(dataClassName, filters, attributes) {
  mapValues_default()(filters, (filterValue, filterName) => {
    const operatorSpecs = isOperatorSpec(filterValue) ? [filterValue] : filterValue.value;
    operatorSpecs.forEach((operatorSpec) => {
      const actualValue = isOperatorSpec(operatorSpec) ? operatorSpec.value : operatorSpec;
      serializeDataAttribute({
        dataClassName,
        attributeName: filterName,
        value: actualValue,
        attributes
      });
    });
  });
}
function notifyExternalDataWrite(dataClass) {
  const counterState = getOrCreateWriteCounterState(dataClass);
  const counter = getWriteCounter(dataClass);
  counterState.set(counter + 1);
}
function loadBatch(_0, _1, _2) {
  return external_data_query_async(this, arguments, function* ([dataClass, filters, search, order, count], continuation, batchSize) {
    var _a;
    const result = yield indexViaDataConnection(
      dataClass,
      new DataConnectionIndexParams(continuation, {
        filters,
        search,
        order,
        limit: batchSize,
        count: !!count
      })
    );
    const dataIds = handleResults(result.results, dataClass);
    return {
      continuation: (_a = result.continuation) != null ? _a : void 0,
      results: dataIds,
      total: result.count
    };
  });
}
function handleResults(results, dataClass) {
  return results.map((idOrItem) => {
    if (typeof idOrItem === "number") {
      return handleDataId(dataClass, idOrItem.toString());
    }
    if (typeof idOrItem === "string") {
      return handleDataId(dataClass, idOrItem);
    }
    return handleResultItem(dataClass, idOrItem);
  });
}
function handleDataId(dataClass, dataId) {
  preloadExternalData(dataClass, dataId);
  return dataId;
}
function handleResultItem(dataClass, resultItem) {
  const id = resultItem.systemData._id;
  setExternalData(dataClass, id, resultItem);
  return id;
}
function preloadExternalData(dataClass, id) {
  (0,loadable/* load */.Hh)(() => getExternalData(dataClass, id));
}
function getWriteCounter(dataClass) {
  const counterState = getOrCreateWriteCounterState(dataClass);
  const counter = counterState.get() || 0;
  return counter;
}
function getOrCreateWriteCounterState(dataClass) {
  let counterState = writeCounterStates[dataClass];
  if (!counterState) {
    counterState = (0,state/* createStateContainer */.Ld)();
    writeCounterStates[dataClass] = counterState;
  }
  return counterState;
}
function toDataResult(idOrItem, dataClass) {
  if (typeof idOrItem === "string") {
    return { id: idOrItem, data: getExternalData(dataClass, idOrItem) };
  }
  return { id: idOrItem.systemData._id, data: idOrItem };
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
    return getExternalData(this._name, id) ? ExternalDataItem.build(this, id) : null;
  }
  getUnchecked(id) {
    return ExternalDataItem.buildUnchecked(this, id);
  }
}
function isExternalDataClassProvided(name) {
  return hasExternalDataConnection(name);
}
function allExternalDataClasses() {
  return getExternalDataConnectionNames().map(
    (name) => new ExternalDataClass(name)
  );
}
class ExternalDataScope extends DataScope {
  constructor(_dataClass, _attributeName, _params = {}) {
    super();
    this._dataClass = _dataClass;
    this._attributeName = _attributeName;
    this._params = _params;
  }
  dataClass() {
    return this._dataClass;
  }
  dataClassName() {
    return this._dataClass.name();
  }
  create(attributes) {
    return external_data_class_async(this, null, function* () {
      this.assertNoIdFilter();
      assertValidDataItemAttributes(attributes);
      const { filters } = this._params;
      const dataClassName = this.dataClassName();
      const dataAttributeDefinitions = yield loadAttributesOrThrow(dataClassName);
      const serializedAttributes = serializeAttributes(
        dataClassName,
        attributes,
        dataAttributeDefinitions
      );
      const dataForCallback = external_data_class_spreadValues(external_data_class_spreadValues({}, serializedAttributes), this.attributesFromFilters(filters));
      const data = yield createViaDataConnection(dataClassName, dataForCallback);
      const id = data.systemData._id;
      setExternalData(dataClassName, id, data);
      notifyExternalDataWrite(dataClassName);
      return ExternalDataItem.buildWithLoadedAttributes(
        this._dataClass,
        id,
        dataAttributeDefinitions
      );
    });
  }
  get(id) {
    const { filters, search } = this._params;
    if (!search && !filters) return this._dataClass.get(id);
    const idFromFilters = this.itemIdFromFilters();
    if (idFromFilters && this.hasSingleFilter()) {
      return idFromFilters === id ? this._dataClass.get(id) : null;
    }
    return this.transform({ filters: { _id: id }, limit: 1 }).take()[0] || null;
  }
  dataItem() {
    const id = this.itemIdFromFilters();
    return id ? this.get(id) : null;
  }
  isDataItem() {
    return !!this.itemIdFromFilters();
  }
  attributeName() {
    return this._attributeName || null;
  }
  take() {
    const attributes = getDataAttributeDefinitions(this.dataClassName());
    if (!attributes) return [];
    const id = this.itemIdFromFilters();
    if (id && this.hasSingleFilter()) {
      if (this.limit() === 0) return [];
      const item = this.get(id);
      return item ? [item] : [];
    }
    return handleCommunicationError(() => this.takeUnsafe(attributes));
  }
  transform({
    filters,
    search,
    order,
    limit,
    attributeName
  }) {
    return new ExternalDataScope(
      this._dataClass,
      attributeName || this._attributeName,
      {
        filters: combineFilters(
          this._params.filters,
          this.normalizeFilters(filters)
        ),
        search: combineSearches(this._params.search, search),
        order: order || this._params.order,
        limit: limit != null ? limit : this._params.limit
      }
    );
  }
  objSearch() {
    return;
  }
  count() {
    const { filters, search } = this._params;
    const dataClassName = this.dataClassName();
    const attributes = getDataAttributeDefinitions(dataClassName);
    if (!attributes) return null;
    return handleCommunicationError(
      () => countExternalData(dataClassName, filters, search, attributes)
    );
  }
  limit() {
    return this._params.limit;
  }
  /** @internal */
  toPojo() {
    return external_data_class_spreadValues({
      _class: this.dataClassName(),
      _attribute: this._attributeName
    }, this._params);
  }
  takeUnsafe(attributes) {
    return (0,common/* extractFromIterator */._Q)(
      this.getIterator(attributes),
      this._params.limit
    );
  }
  getIterator(attributes) {
    return (0,common/* transformContinueIterable */.YB)(
      getExternalDataQuery(this.toPojo(), attributes),
      (iterator) => iterator.map(
        (dataId) => ExternalDataItem.buildWithLoadedAttributes(
          this._dataClass,
          dataId,
          attributes
        )
      )
    ).iterator();
  }
  assertNoIdFilter() {
    const { filters } = this._params;
    if (filters && Object.keys(filters).includes("_id")) {
      throw new common/* ArgumentError */.c1(
        `Cannot create a ${this.dataClassName()} from a scope that includes "_id" in its filters`
      );
    }
  }
  itemIdFromFilters() {
    return itemIdFromFilters(this._params.filters);
  }
  hasSingleFilter() {
    const { filters, search } = this._params;
    return filters && Object.keys(filters).length === 1 && !search;
  }
}
class ExternalDataItem extends DataItem {
  constructor(_dataClass, _dataId) {
    super();
    this._dataClass = _dataClass;
    this._dataId = _dataId;
  }
  /** Returns an item if its schema is loaded. Returns null otherwise. */
  /** Triggers schema loading, thus requires a loading context. */
  static build(dataClass, dataId) {
    const attributes = getDataAttributeDefinitions(dataClass.name());
    return attributes ? new ExternalDataItem(dataClass, dataId) : null;
  }
  /** Returns an item for an already loaded schema */
  static buildWithLoadedAttributes(dataClass, dataId, attributes) {
    if (!attributes) throw new common/* InternalError */.Gd();
    return new ExternalDataItem(dataClass, dataId);
  }
  /** Only for DataClass#getUnchecked */
  static buildUnchecked(dataClass, dataId) {
    return new ExternalDataItem(dataClass, dataId);
  }
  id() {
    return this._dataId;
  }
  dataClass() {
    return this._dataClass;
  }
  dataClassName() {
    return this._dataClass.name();
  }
  obj() {
    return;
  }
  get(attributeName) {
    const externalData = this.getExternalData();
    if (!externalData) return null;
    const dataClassName = this.dataClassName();
    const attributes = getDataAttributeDefinitions(dataClassName);
    const { customData } = externalData;
    return attributes ? deserializeDataAttribute({
      dataClassName,
      attributeName,
      value: customData[attributeName],
      attributes
    }) : null;
  }
  /** @internal */
  getRaw(attributeName) {
    var _a;
    return (_a = this.getExternalData()) == null ? void 0 : _a.customData[attributeName];
  }
  /** @internal */
  /** In contrast to `#get` supports both system and custom attributes */
  getLocalized(attributeName) {
    const attributeValue = this.getSystemOrCustom(attributeName);
    if (typeof attributeValue !== "string") return attributeValue;
    const attributeDefinition = this.attributeDefinitions()[attributeName];
    if (!attributeDefinition) return attributeValue;
    const [attributeType, attributeConfig] = attributeDefinition;
    if (attributeType === "enum") {
      const valueConfig = attributeConfig.values.find(
        (config) => config.value === attributeValue
      );
      if (!valueConfig) throw new common/* InternalError */.Gd();
      const { title } = valueConfig;
      return typeof title === "string" ? title : attributeValue;
    }
    return attributeValue;
  }
  update(attributes) {
    return external_data_class_async(this, null, function* () {
      assertValidDataItemAttributes(attributes);
      const externalData = yield (0,loadable/* load */.Hh)(() => this.getExternalData());
      if (!externalData) {
        throw new common/* ArgumentError */.c1(`Missing data with ID ${this._dataId}`);
      }
      const dataClassName = this.dataClassName();
      const dataAttributeDefinitions = yield loadAttributesOrThrow(dataClassName);
      const serializedAttributes = serializeAttributes(
        dataClassName,
        attributes,
        dataAttributeDefinitions
      );
      const updatedData = yield updateViaDataConnection(
        this.dataClassName(),
        this._dataId,
        serializedAttributes
      );
      setExternalData(dataClassName, this._dataId, {
        systemData: externalData.systemData,
        customData: external_data_class_spreadValues(external_data_class_spreadValues({}, externalData.customData), updatedData)
      });
      this.notifyWrite();
    });
  }
  delete() {
    return external_data_class_async(this, null, function* () {
      yield deleteViaDataConnection(this.dataClassName(), this._dataId);
      setExternalData(this.dataClassName(), this._dataId, null);
      this.notifyWrite();
    });
  }
  /** @internal */
  getCustomAttributes() {
    var _a, _b;
    return (_b = (_a = this.getExternalData()) == null ? void 0 : _a.customData) != null ? _b : {};
  }
  getExternalData() {
    return getExternalData(this.dataClassName(), this._dataId);
  }
  getSystemOrCustom(attributeName) {
    if (attributeName === "_id") return this.id();
    return this.get(attributeName);
  }
  notifyWrite() {
    notifyExternalDataWrite(this.dataClassName());
  }
}
function serializeAttributes(dataClassName, attributes, dataAttributeDefinitions) {
  return mapValues_default()(
    attributes,
    (value, attributeName) => serializeDataAttribute({
      dataClassName,
      attributeName,
      value,
      attributes: dataAttributeDefinitions
    })
  );
}
function isCommunicationError(error) {
  return error instanceof client/* ClientError */.MZ || error instanceof DataConnectionError;
}
function handleCommunicationError(request) {
  try {
    return request();
  } catch (error) {
    if (isCommunicationError(error)) throw new DataScopeError(error.message);
    throw error;
  }
}
function loadAttributesOrThrow(dataClassName) {
  return external_data_class_async(this, null, function* () {
    const attributes = yield (0,loadable/* load */.Hh)(
      () => getDataAttributeDefinitions(dataClassName)
    );
    if (!attributes) throw new common/* InternalError */.Gd();
    return attributes;
  });
}

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






const TYPES_WITH_SCHEMA_SUPPORT = [
  "boolean",
  "enum",
  "float",
  "integer",
  "string",
  "reference"
];
const TYPES_WITH_GARBAGE_IN_GARBAGE_OUT_SUPPORT = ["multienum", "stringlist"];
const SUPPORTED_ATTRIBUTE_TYPES = [
  ...TYPES_WITH_SCHEMA_SUPPORT,
  ...TYPES_WITH_GARBAGE_IN_GARBAGE_OUT_SUPPORT
];
const SUBPAGES_CHILD_ORDER_LIMIT = 200;
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
  attributeDefinitions() {
    return attributeDefinitions(this._name);
  }
}
function getDataObj(dataClass, dataId) {
  return (0,models/* getObjFrom */.ED)(objClassScope(dataClass).and(models/* excludeDeletedObjs */.cb), dataId);
}
class ObjDataScope extends DataScope {
  constructor(_dataClass, _attributeName, _params = {}) {
    super();
    this._dataClass = _dataClass;
    this._attributeName = _attributeName;
    this._params = _params;
  }
  dataClass() {
    return this._dataClass;
  }
  dataClassName() {
    return this._dataClass.name();
  }
  create(attributes) {
    return obj_data_class_async(this, null, function* () {
      if (this.isBuiltInClass()) {
        throw new common/* ArgumentError */.c1(
          "Cannot create data items using the built-in Obj class"
        );
      }
      const obj = (0,models/* createObjIn */.ZU)(
        this.objClassScope(),
        prepareAttributes(
          obj_data_class_spreadValues(obj_data_class_spreadValues({}, attributes), this.attributesFromFilters(this._params.filters)),
          this._dataClass.name()
        )
      );
      yield obj.finishSaving();
      return this.wrapInDataItem(obj);
    });
  }
  get(id) {
    const [obj] = this.getSearch().and("_id", "equals", id).take(1);
    if (!obj) return null;
    return this.wrapInDataItem(obj);
  }
  take() {
    var _a;
    const search = this.getSearch();
    const parentObj = this.parentObj();
    const limit = (_a = this._params.limit) != null ? _a : DEFAULT_LIMIT;
    let objs;
    if (!this._params.search && !this._params.order && (parentObj == null ? void 0 : parentObj.hasChildOrder())) {
      objs = parentObj.sortByChildOrder(
        search.take(Math.max(limit, SUBPAGES_CHILD_ORDER_LIMIT))
      ).slice(0, limit);
    } else {
      objs = search.take(limit);
    }
    return objs.map((obj) => this.wrapInDataItem(obj));
  }
  dataItem() {
    const id = this.itemIdFromFilters();
    if (id) return this._dataClass.get(id);
    return null;
  }
  isDataItem() {
    return !!this.itemIdFromFilters();
  }
  attributeName() {
    return this._attributeName || null;
  }
  count() {
    return this.getSearch().count();
  }
  transform({
    filters,
    search,
    order,
    limit,
    attributeName
  }) {
    return new ObjDataScope(
      this._dataClass,
      attributeName || this._attributeName,
      {
        filters: combineFilters(
          this._params.filters,
          this.normalizeFilters(filters)
        ),
        search: combineSearches(this._params.search, search),
        order: order || this._params.order,
        limit: limit != null ? limit : this._params.limit
      }
    );
  }
  limit() {
    return this._params.limit;
  }
  objSearch() {
    const search = this.getSearch();
    if (!(0,client/* isEmptySpaceId */.dQ)(search.objSpaceId())) {
      return new realm/* ObjSearch */.G5(search);
    }
  }
  /** @internal */
  toPojo() {
    return obj_data_class_spreadValues({
      _class: this.dataClassName(),
      _attribute: this._attributeName
    }, this._params);
  }
  getSearch() {
    let initialSearch = this.getInitialSearch();
    const { filters, search: searchTerm, order: givenOrder } = this._params;
    if (searchTerm) {
      initialSearch = initialSearch.and("*", "matches", searchTerm);
    }
    if (givenOrder) {
      const order = givenOrder.filter(([attributeName]) => !!attributeName);
      if (order.length) initialSearch = initialSearch.order(order);
    }
    if (!filters) return initialSearch;
    return Object.keys(filters).filter((name) => !!name).reduce(
      (search, name) => this.applyFilter(search, name, filters[name]),
      initialSearch
    );
  }
  getInitialSearch() {
    return (this.isBuiltInClass() ? currentObjScope() : this.objClassScope()).and(models/* excludeDeletedObjs */.cb).search();
  }
  isBuiltInClass() {
    return isBuiltInClass(this.dataClassName());
  }
  applyFilter(search, attributeName, operatorSpec) {
    const { operator, value } = operatorSpec;
    if (operator === "and") {
      return value.reduce(
        (currentSearch, spec) => this.applyFilter(currentSearch, attributeName, spec),
        search
      );
    }
    if (operator === "equals") {
      if (attributeName === "_obj_parent_id") {
        return this.applySubpagesFilter(search);
      }
      return search.and(attributeName, "equals", value);
    }
    if (operator === "notEquals") {
      return search.andNot(attributeName, "equals", value);
    }
    if (operator === "isGreaterThan") {
      return search.and(attributeName, "isGreaterThan", value);
    }
    if (operator === "isLessThan") {
      return search.and(attributeName, "isLessThan", value);
    }
    if (operator === "isGreaterThanOrEquals") {
      return search.andNot(attributeName, "isLessThan", value);
    }
    if (operator === "isLessThanOrEquals") {
      return search.andNot(attributeName, "isGreaterThan", value);
    }
    throw new common/* ArgumentError */.c1(`Unknown filter operator "${operator}"`);
  }
  applySubpagesFilter(search) {
    const parentObj = this.parentObj();
    const siteId = parentObj == null ? void 0 : parentObj.siteId();
    const parentPath = parentObj == null ? void 0 : parentObj.path();
    if (!siteId || !parentPath) {
      return (0,models/* objSpaceScope */.aG)(client/* EMPTY_SPACE */.HY).search();
    }
    return search.and("_siteId", "equals", siteId).and("_parentPath", "equals", parentPath);
  }
  objClassScope() {
    return objClassScope(this._dataClass);
  }
  wrapInDataItem(obj) {
    const item = new ObjDataItem(this._dataClass, obj.id());
    item.setBasicObj(obj);
    return item;
  }
  itemIdFromFilters() {
    return itemIdFromFilters(this._params.filters);
  }
  parentObj() {
    var _a, _b;
    const parentId = (_b = (_a = this._params.filters) == null ? void 0 : _a._obj_parent_id) == null ? void 0 : _b.value;
    if (typeof parentId === "string") {
      return (0,models/* getObjFrom */.ED)(currentObjScope().and(models/* excludeDeletedObjs */.cb), parentId);
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
  dataClassName() {
    return this._dataClass.name();
  }
  obj() {
    return (0,realm/* wrapInAppClass */.Dy)(this.getOrThrow());
  }
  /** @internal */
  getBasicObj() {
    if (this._obj === void 0) {
      this._obj = getDataObj(this._dataClass, this._dataId);
    }
    return this._obj;
  }
  /** @internal */
  setBasicObj(obj) {
    this._obj = obj;
  }
  get(attributeName) {
    const obj = this.getBasicObj();
    if (!obj) return null;
    const typeInfo = getAttributeTypeInfo(obj.objClass(), attributeName);
    if (!typeInfo) return null;
    const [attributeType, attributeConfig] = typeInfo;
    if (SUPPORTED_ATTRIBUTE_TYPES.includes(attributeType)) {
      return attributeType === "reference" ? getReference(obj, attributeName, attributeConfig) : obj.get(attributeName, typeInfo);
    }
    return null;
  }
  update(attributes) {
    const obj = this.getOrThrow();
    obj.update(prepareAttributes(attributes, this.dataClassName()));
    return obj.finishSaving();
  }
  delete() {
    return obj_data_class_async(this, null, function* () {
      const obj = this.getBasicObj();
      if (obj) {
        obj.delete();
        return obj.finishSaving();
      }
    });
  }
  getOrThrow() {
    const obj = this.getBasicObj();
    if (!obj) {
      throw new common/* ArgumentError */.c1(`Missing obj with ID ${this._dataId}`);
    }
    return obj;
  }
}
function getAttributeTypeInfo(className, attributeName) {
  return getSchema(className).attribute(attributeName);
}
function isObjDataClassProvided(className) {
  return !!(0,realm/* getRealmClass */.an)(className);
}
function getSchema(className) {
  const objClass = (0,realm/* getRealmClass */.an)(className);
  if (!objClass) {
    throw new common/* ArgumentError */.c1(`Class ${className} does not exist`);
  }
  const schema = realm/* Schema */.Sj.forClass(objClass);
  if (!schema) {
    throw new common/* ArgumentError */.c1(`Class ${className} has no schema`);
  }
  return schema;
}
function objClassScope(dataClass) {
  const dataScope = currentObjScope();
  const dataClassName = dataClass.name();
  return dataClassName === "Obj" ? dataScope : dataScope.and((0,models/* restrictToObjClass */.Lw)(dataClassName));
}
function prepareAttributes(attributes, className) {
  const preparedAttributes = {};
  Object.keys(attributes).forEach((attributeName) => {
    const attributeValue = attributes[attributeName];
    if ((0,common/* isSystemAttribute */.iI)(attributeName)) {
      preparedAttributes[attributeName] = attributeValue;
    } else {
      const typeInfo = getAttributeTypeInfo(className, attributeName);
      if (!typeInfo) {
        throw new common/* ArgumentError */.c1(
          `Attribute ${attributeName} of class ${className} does not exist`
        );
      }
      const [attributeType, attributeConfig] = typeInfo;
      if (!SUPPORTED_ATTRIBUTE_TYPES.includes(attributeType)) {
        throw new common/* ArgumentError */.c1(
          `Attribute ${attributeName} of class ${className} has unsupported type ${attributeType}`
        );
      }
      preparedAttributes[attributeName] = [
        attributeType === "reference" ? prepareReferenceValue(attributeValue, attributeConfig) : attributeValue,
        typeInfo
      ];
    }
  });
  return preparedAttributes;
}
function getReference(obj, attributeName, attributeConfig) {
  if (!attributeConfig) return null;
  const referenceObj = obj.get(attributeName, "reference");
  if (!(referenceObj instanceof models/* BasicObj */.kI)) return null;
  const referenceObjClass = referenceObj.objClass();
  if (referenceObjClass !== getValidReferenceClass(attributeConfig)) {
    return null;
  }
  const dataClass = getObjDataClass(referenceObjClass);
  if (!dataClass) return null;
  return dataClass.get(referenceObj.id());
}
function prepareReferenceValue(attributeValue, attributeConfig) {
  return attributeValue instanceof DataItem && attributeValue.dataClassName() === getValidReferenceClass(attributeConfig) ? (0,realm/* unwrapAppClass */.zo)(attributeValue.obj()) : null;
}
function getValidReferenceClass(attributeConfig) {
  if (attributeConfig) {
    const { validClasses } = attributeConfig;
    if (validClasses.length === 1) return validClasses[0];
  }
}
function attributeDefinitions(dataClassName) {
  if (isBuiltInClass(dataClassName)) return {};
  const attributes = {};
  const normalizedAttributes = getSchema(dataClassName).normalizedAttributes();
  Object.keys(normalizedAttributes).forEach((attributeName) => {
    const dataAttributeDefinition = toDataAttributeDefinition(
      normalizedAttributes[attributeName]
    );
    if (dataAttributeDefinition) {
      attributes[attributeName] = dataAttributeDefinition;
    }
  });
  return attributes;
}
function toDataAttributeDefinition([
  cmsType,
  cmsTypeInfo
]) {
  if (cmsType === "boolean" || cmsType === "string") {
    return [cmsType, {}];
  }
  if (cmsType === "float" || cmsType === "integer") {
    return ["number", {}];
  }
  if (cmsType === "enum") {
    return [
      "enum",
      {
        values: [
          ...cmsTypeInfo.values.map((value) => ({ value, title: value }))
        ]
      }
    ];
  }
  if (cmsType === "reference") {
    const { only } = cmsTypeInfo;
    if (typeof only === "string") {
      return ["reference", { to: only }];
    }
    if (Array.isArray(only) && only.length === 1) {
      return ["reference", { to: only[0] }];
    }
  }
  return null;
}
function currentObjScope() {
  return (0,models/* objSpaceScope */.aG)((0,models/* currentObjSpaceId */.eb)());
}
function isBuiltInClass(dataClassName) {
  return dataClassName === "Obj";
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/get_data_class.ts




function getDataClass(dataClassName) {
  return getExternalDataClass(dataClassName) || getObjDataClass(dataClassName) || null;
}
function getDataClassOrThrow(dataClassName) {
  const dataClass = getDataClass(dataClassName);
  if (dataClass) return dataClass;
  throw new common/* ArgumentError */.c1(`No "${dataClassName}" found`);
}
function getObjDataClass(dataClassName) {
  if (dataClassName === "Obj" || isObjDataClassProvided(dataClassName)) {
    return new ObjDataClass(dataClassName);
  }
}
function getExternalDataClass(dataClassName) {
  if (isExternalDataClassProvided(dataClassName)) {
    return new ExternalDataClass(dataClassName);
  }
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
  constructor(params = {}) {
    super();
    this.params = params;
  }
  dataClass() {
    return this.params.dataClass || null;
  }
  dataClassName() {
    var _a;
    return ((_a = this.dataClass()) == null ? void 0 : _a.name()) || null;
  }
  create(_attributes) {
    return empty_data_scope_async(this, null, function* () {
      throw new common/* ArgumentError */.c1("Cannot create items from an empty data scope");
    });
  }
  get(_id) {
    return null;
  }
  take() {
    this.throwErrorIfPresent();
    return [];
  }
  dataItem() {
    return null;
  }
  isDataItem() {
    return !!this.params.isDataItem;
  }
  attributeName() {
    return null;
  }
  transform(_params) {
    return this.clone();
  }
  filter(_attributeName, _value) {
    return this.clone();
  }
  search(_text) {
    return this.clone();
  }
  objSearch() {
    return;
  }
  count() {
    this.throwErrorIfPresent();
    return 0;
  }
  limit() {
    return;
  }
  /** @internal */
  toPojo() {
    var _a;
    return {
      _class: this.dataClassName(),
      _error: (_a = this.params.error) == null ? void 0 : _a.message,
      isEmpty: true,
      isDataItem: this.isDataItem()
    };
  }
  clone() {
    return new EmptyDataScope(this.params);
  }
  throwErrorIfPresent() {
    if (this.params.error) {
      throw new DataScopeError(this.params.error.message);
    }
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/data_stack.ts

var data_stack_defProp = Object.defineProperty;
var data_stack_defProps = Object.defineProperties;
var data_stack_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var data_stack_getOwnPropSymbols = Object.getOwnPropertySymbols;
var data_stack_hasOwnProp = Object.prototype.hasOwnProperty;
var data_stack_propIsEnum = Object.prototype.propertyIsEnumerable;
var data_stack_defNormalProp = (obj, key, value) => key in obj ? data_stack_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var data_stack_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (data_stack_hasOwnProp.call(b, prop))
      data_stack_defNormalProp(a, prop, b[prop]);
  if (data_stack_getOwnPropSymbols)
    for (var prop of data_stack_getOwnPropSymbols(b)) {
      if (data_stack_propIsEnum.call(b, prop))
        data_stack_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var data_stack_spreadProps = (a, b) => data_stack_defProps(a, data_stack_getOwnPropDescs(b));
var data_stack_objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (data_stack_hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && data_stack_getOwnPropSymbols)
    for (var prop of data_stack_getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && data_stack_propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};



function isDataItemPojo(element) {
  return !!element._id;
}
function isSingleItemElement(element) {
  return isDataItemPojo(element) || isSingleItemDataScopePojo(element);
}
function isMultiItemDataScopePojo(element) {
  var _a;
  return isPresentDataScopePojo(element) && !((_a = element == null ? void 0 : element.filters) == null ? void 0 : _a._id);
}
function isSingleItemDataScopePojo(element) {
  var _a;
  return isPresentDataScopePojo(element) && !!((_a = element == null ? void 0 : element.filters) == null ? void 0 : _a._id);
}
function isPresentDataScopePojo(element) {
  return isDataScopePojo(element) && !isEmptyDataScopePojo(element);
}
function isEmptyDataScopePojo(pojo) {
  return "isEmpty" in pojo && pojo.isEmpty === true;
}
function isDataScopePojo(element) {
  return !isDataItemPojo(element);
}
function deserializeDataStackElement(element) {
  return isDataItemPojo(element) ? deserializeDataItem(element) : deserializeDataScope(element);
}
function findItemInDataStack(dataClassName, dataStack) {
  const itemElements = dataStack.filter(isDataItemPojo);
  return itemElements.find((element) => element._class === dataClassName);
}
function findScopeInDataStack(dataClassName, dataStack) {
  const element = dataStack.find((el) => el._class === dataClassName);
  if (element && isDataScopePojo(element)) return element;
}
function deserializeDataScope(_a) {
  var _b = _a, {
    _class: dataClassName
  } = _b, dataScopeParams = data_stack_objRest(_b, [
    "_class"
  ]);
  if (dataClassName) {
    const dataClass = getDataClassOrThrow(dataClassName);
    if ("isEmpty" in dataScopeParams) {
      const error = dataScopeParams._error ? new DataScopeError(dataScopeParams._error) : void 0;
      return new EmptyDataScope({
        dataClass,
        error,
        isDataItem: dataScopeParams.isDataItem
      });
    }
    const attributeName = "_attribute" in dataScopeParams && dataScopeParams._attribute || void 0;
    return dataClass.all().transform(data_stack_spreadProps(data_stack_spreadValues({}, dataScopeParams), { attributeName }));
  }
}
function deserializeDataItem({
  _class: dataClass,
  _id: dataId
}) {
  return getDataClassOrThrow(dataClass).get(dataId) || void 0;
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



const globalContextState = (0,state/* createStateContainer */.Ld)();
function provideGlobalData(dataItem) {
  const dataClassName = dataItem.dataClassName();
  const dataItemId = dataItem.id();
  globalContextState.set(global_data_spreadProps(global_data_spreadValues({}, globalContextState.get()), {
    [dataClassName]: dataItemId
  }));
}
function getGlobalDataItems() {
  const globalContext = globalContextState.get();
  return globalContext ? Object.entries(globalContext).map(
    ([dataClassName, dataId]) => getDataClassOrThrow(dataClassName).get(dataId)
  ).filter(
    (maybeDataItem) => !!maybeDataItem
  ) : [];
}
function getDefaultItemIdForDataClass(dataClassName) {
  var _a;
  return ((_a = globalContextState.get()) == null ? void 0 : _a[dataClassName]) || null;
}
function findItemInGlobalData(dataClassName) {
  const defaultItemId = getDefaultItemIdForDataClass(dataClassName);
  if (defaultItemId) {
    return {
      _class: dataClassName,
      _id: defaultItemId
    };
  }
}
function findScopeInGlobalData(dataClassName) {
  const itemPojo = findItemInGlobalData(dataClassName);
  if (itemPojo) return itemPojoToScopePojo(itemPojo);
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
function getDataContextQuery(objOrLink, dataStack, query) {
  const parameters = getDataContextParameters(objOrLink, dataStack);
  if (parameters) {
    return (0,common/* buildQueryString */.Go)(
      query ? data_context_spreadValues(data_context_spreadValues({}, parameters), (0,common/* parseQueryToQueryParameters */.zw)(query)) : parameters
    );
  }
  return query;
}
function getDataContextParameters(objOrLink, dataStack) {
  if (dataStack.length === 0) return;
  const target = getObj(objOrLink);
  if (!target) return;
  let params = {};
  [target, ...target.ancestors()].forEach((obj) => {
    const dataParam = obj == null ? void 0 : obj.dataParam();
    if (!dataParam) return;
    const [dataClass] = dataParam;
    if (!dataClass) return;
    const itemElement = findItemInDataStack(dataClass, dataStack);
    params = data_context_spreadValues(data_context_spreadValues({}, params), dataContextParamsForElement(itemElement, dataClass));
  });
  if (Object.keys(params).length > 0) return params;
}
function dataContextParamsForElement(stackElement, dataClass) {
  if (stackElement && stackElement._class === dataClass) {
    return {
      [(0,common/* parameterizeDataClass */.gi)(dataClass)]: stackElement._id
    };
  }
}
function findItemElementInDataStackAndGlobalData(dataClassName, dataStack) {
  return findItemInDataStack(dataClassName, dataStack) || findItemInGlobalData(dataClassName);
}
function findScopeElementInDataStackAndGlobalData(dataClassName, dataStack, viaRef) {
  if (viaRef === "multi") {
    const scopePojo = findScopeInDataStack(dataClassName, dataStack);
    if (scopePojo) return scopePojo;
  }
  const itemPojo = findItemInDataStack(dataClassName, dataStack);
  if (itemPojo) return itemPojoToScopePojo(itemPojo);
  return findScopeInGlobalData(dataClassName);
}
function dataContextFromQueryParams(obj, params) {
  const dataParam = obj.dataParam();
  if (!dataParam) return;
  const [dataClassName] = dataParam;
  if (!dataClassName) return;
  const dataId = getDataId(dataClassName, params);
  if (!isValidDataId(dataId)) return "unavailable";
  const dataClass = getDataClass(dataClassName);
  if (!dataClass) return;
  const dataItem = (0,loadable/* loadWithDefault */.qt)("loading", () => dataClass.get(dataId));
  if (dataItem === "loading") return "loading";
  if (!dataItem) return "unavailable";
  return dataItemToDataContext(dataItem);
}
function dataItemToDataContext(dataItem) {
  if (dataItem instanceof ObjDataItem) {
    return objDataItemToDataContext(dataItem);
  }
  return externalDataItemToDataContext(dataItem);
}
function objDataItemToDataContext(dataItem) {
  const basiObj = dataItem.getBasicObj();
  return basiObj ? basicObjToDataContext(basiObj) : {};
}
function externalDataItemToDataContext(dataItem) {
  return data_context_spreadValues({
    _class: dataItem.dataClassName(),
    _id: dataItem.id()
  }, dataItem.getCustomAttributes());
}
function getDataId(dataClassName, params) {
  return getDataIdFromParams(dataClassName, params) || getDataIdOfFirstDataItem(dataClassName);
}
function getDataIdFromParams(dataClassName, params) {
  const dataId = params[(0,common/* parameterizeDataClass */.gi)(dataClassName)];
  if (typeof dataId === "string" && dataId.length > 0) return dataId;
}
function getDataIdOfFirstDataItem(dataClassName) {
  const [firstDataItem] = getDataClassOrThrow(dataClassName).all().transform({ limit: 1 }).take();
  if (firstDataItem) return firstDataItem.id();
}
function getObj(objOrLink) {
  if (objOrLink instanceof models/* BasicObj */.kI) return objOrLink;
  if (objOrLink.isInternal()) {
    const obj = objOrLink.obj();
    if (obj instanceof models/* BasicObj */.kI) return obj;
  }
}
function getDataContextValue(identifier, context) {
  if (!(0,models/* isValidDataIdentifier */.Wf)(identifier)) return void 0;
  const value = context[identifier];
  if (isValidDataContextValue(value)) return value;
  (0,common/* throwNextTick */.JL)(
    new common/* ArgumentError */.c1(
      `Expected a data context value to be a string or undefined, but got ${value}`
    )
  );
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/external_data_invalidation.ts

var external_data_invalidation_async = (__this, __arguments, generator) => {
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



let config = {};
function configureExternalDataInvalidation(dataClassName, refetchOnWindowFocus) {
  return external_data_invalidation_async(this, null, function* () {
    config[dataClassName] = normalizeLazyAsync(refetchOnWindowFocus);
  });
}
function invalidateExternalData() {
  return external_data_invalidation_async(this, null, function* () {
    var _a;
    for (const dataClassName of Object.keys(config)) {
      if ((_a = yield config[dataClassName]()) != null ? _a : true) {
        notifyExternalDataWrite(dataClassName);
      }
    }
  });
}
(0,common/* onReset */.Nj)(() => config = {});

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/register_external_data_class.ts





function registerExternalDataClass(name, params) {
  setExternalDataConnection(
    name,
    mapLazyAsync(params, (eagerParams) => eagerParams.connection)
  );
  configureExternalDataInvalidation(
    name,
    mapLazyAsync(params, (eagerParams) => eagerParams.refetchOnWindowFocus)
  );
  registerDataClassSchema(
    name,
    mapLazyAsync(params, (eagerParams) => eagerParams.schema)
  );
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/apply_data_locator.ts











function applyDataLocator(dataStack, dataLocator) {
  if (!dataLocator) return new EmptyDataScope();
  const className = dataLocator.class();
  if (className === null) return new EmptyDataScope();
  try {
    const viaRef = dataLocator.viaRef();
    const sourceDataScope = viaRef ? findMatchingDataScopeOrThrow(className, dataStack, viaRef) : getDataClassOrThrow(className).all();
    return applyDataLocatorDefinition(sourceDataScope, dataStack, dataLocator);
  } catch (error) {
    if (error instanceof common/* ArgumentError */.c1) {
      return new EmptyDataScope({ error: new DataScopeError(error.message) });
    }
    throw error;
  }
}
function applyDataLocatorDefinition(sourceDataScope, dataStack, dataLocator) {
  let dataScope = sourceDataScope;
  const attributeName = dataLocator.field();
  if (attributeName) {
    dataScope = dataScope.transform({ attributeName });
  }
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
  if ((0,client/* isDataLocatorOperatorFilter */.HM)(filter)) {
    return applyOperatorFilter(scope, filter);
  }
  if ((0,models/* isDataLocatorValueViaFilter */.gP)(filter)) {
    return applyValueViaFilter(scope, filter, dataStack);
  }
  return applyValueFilter(scope, filter);
}
function applyOperatorFilter(scope, { field, operator, value }) {
  const [fullOperator] = Object.entries(operatorToOpCode).find(([_, val]) => val === operator) || [];
  return scope.transform({
    filters: {
      [field]: {
        operator: isFilterOperator(fullOperator) ? fullOperator : "equals",
        value
      }
    }
  });
}
function applyValueFilter(scope, { field, value }) {
  return scope.transform({ filters: { [field]: value } });
}
function applyValueViaFilter(scope, {
  field,
  value_via: { class: viaClass, field: viaField }
}, dataStack) {
  var _a, _b;
  const viaDataItem = findMatchingDataItemOrThrow(viaClass, dataStack);
  if (viaField === "_obj_parent_id") {
    const parentObj = (_a = viaDataItem.obj()) == null ? void 0 : _a.parent();
    if (parentObj) {
      return applyValueFilter(scope, { field: "_id", value: parentObj.id() });
    }
    return new EmptyDataScope();
  }
  if (viaField === "_id") {
    return applyValueFilter(scope, { field, value: viaDataItem.id() });
  }
  if (field === "_id") {
    const value = viaDataItem.getRaw(viaField);
    const dataClass = (_b = scope.dataClass()) != null ? _b : void 0;
    if (value === void 0 || value === null) {
      return new EmptyDataScope({
        dataClass,
        isDataItem: true
      });
    }
    if (!isValidDataId(value)) {
      return new EmptyDataScope({
        dataClass,
        isDataItem: true,
        error: new common/* ArgumentError */.c1(
          `${JSON.stringify(value)} is not a valid data ID`
        )
      });
    }
    return applyValueFilter(scope, { field, value });
  }
  throw new common/* ArgumentError */.c1("Irregular relationship");
}
function findMatchingDataItemOrThrow(viaClass, dataStack) {
  const element = findItemElementInDataStackAndGlobalData(viaClass, dataStack);
  if (!element) throw new common/* ArgumentError */.c1(`No ${viaClass} item found`);
  const item = deserializeDataStackElement(element);
  if (item instanceof DataItem) return item;
  throw new common/* ArgumentError */.c1(`No ${viaClass} item with ID ${element._id} found`);
}
function findMatchingDataScopeOrThrow(className, dataStack, viaRef) {
  const element = findScopeElementInDataStackAndGlobalData(
    className,
    dataStack,
    viaRef
  );
  if (!element) throw new common/* ArgumentError */.c1(`No ${className} scope found`);
  const scope = deserializeDataStackElement(element);
  if (scope instanceof DataScope) return scope;
  throw new common/* ArgumentError */.c1(`No ${className} scope found`);
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/filter_external_data_item.ts

var filter_external_data_item_async = (__this, __arguments, generator) => {
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





function filterExternalDataItem(dataItem, filters) {
  return filter_external_data_item_async(this, null, function* () {
    const doesMatch = yield (0,loadable/* load */.Hh)(
      () => Object.entries(filters).every(([name, filter]) => {
        if (!filter) return false;
        return name === "_id" || valueMatchesFilter(dataItem.get(name), filter);
      })
    );
    return { results: doesMatch ? [SINGLETON_DATA_ID] : [] };
  });
}
function valueMatchesFilter(itemValue, filter) {
  if (isAndFilterSpec(filter)) {
    return filter.value.every((spec) => valueMatchesFilter(itemValue, spec));
  }
  const { value: filterValue, opCode } = filter;
  if (Array.isArray(itemValue)) {
    if (opCode === "neq") {
      return itemValue.every((element) => valueMatchesFilter(element, filter));
    }
    return itemValue.some((element) => valueMatchesFilter(element, filter));
  }
  if ((0,client/* isRelationalOpCode */._p)(opCode)) {
    assertStringOrNumber(itemValue);
    assertStringOrNumber(filterValue);
    return RELATIONAL_OPERATOR_COMPARATORS[opCode](itemValue, filterValue);
  }
  const areEqual = filterValue === itemValue;
  return opCode === "neq" ? !areEqual : areEqual;
}
const RELATIONAL_OPERATOR_COMPARATORS = {
  gt: (a, b) => a > b,
  lt: (a, b) => a < b,
  gte: (a, b) => a >= b,
  lte: (a, b) => a <= b
};
function assertStringOrNumber(arg) {
  if (typeof arg === "string" || typeof arg === "number") return;
  throw new common/* ArgumentError */.c1(`Must be a string or number, but got ${String(arg)}`);
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/singleton_data_classes.ts


const stateContainer = (0,state/* createStateContainer */.Ld)();
function registerSingletonDataClass(dataClassName) {
  stateContainer.set([...getDataClassNames(), dataClassName]);
}
function isSingletonDataClass(dataClassName) {
  return getDataClassNames().includes(dataClassName);
}
function getDataClassNames() {
  return stateContainer.get() || [];
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/provide_external_data_item.ts

var provide_external_data_item_defProp = Object.defineProperty;
var provide_external_data_item_getOwnPropSymbols = Object.getOwnPropertySymbols;
var provide_external_data_item_hasOwnProp = Object.prototype.hasOwnProperty;
var provide_external_data_item_propIsEnum = Object.prototype.propertyIsEnumerable;
var provide_external_data_item_defNormalProp = (obj, key, value) => key in obj ? provide_external_data_item_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var provide_external_data_item_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (provide_external_data_item_hasOwnProp.call(b, prop))
      provide_external_data_item_defNormalProp(a, prop, b[prop]);
  if (provide_external_data_item_getOwnPropSymbols)
    for (var prop of provide_external_data_item_getOwnPropSymbols(b)) {
      if (provide_external_data_item_propIsEnum.call(b, prop))
        provide_external_data_item_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var provide_external_data_item_objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (provide_external_data_item_hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && provide_external_data_item_getOwnPropSymbols)
    for (var prop of provide_external_data_item_getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && provide_external_data_item_propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
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








const SINGLETON_DATA_ID = "0";
function provideExternalDataItem(dataClass, params) {
  const name = dataClass.name();
  registerExternalDataClass(
    name,
    mapLazyAsync(params, ({ connection, schema }) => ({
      connection: desugarConnection(connection, dataClass),
      schema
    }))()
  );
  registerSingletonDataClass(name);
  provideGlobalData(dataClass.getUnchecked(SINGLETON_DATA_ID));
}
function isSingletonDataId(id) {
  return id === SINGLETON_DATA_ID;
}
function desugarConnection(connection, dataClass) {
  const getCallback = () => provide_external_data_item_async(null, null, function* () {
    return (yield normalizeLazyAsync(connection)()).get();
  });
  const updateCallback = (data) => provide_external_data_item_async(null, null, function* () {
    const { update } = yield normalizeLazyAsync(connection)();
    if (update) return update(data);
    throwMissingCallbackError("update", dataClass.name())();
  });
  const dataConnection = provide_external_data_item_spreadValues({
    get: (id) => provide_external_data_item_async(null, null, function* () {
      if (isSingletonDataId(id)) {
        return ignoreDataId(yield getCallback());
      }
      return null;
    }),
    index: (params) => provide_external_data_item_async(null, null, function* () {
      const dataItem = yield (0,loadable/* load */.Hh)(() => dataClass.get(SINGLETON_DATA_ID));
      if (!dataItem) return { results: [] };
      return filterExternalDataItem(dataItem, params.filters());
    })
  }, updateCallback && {
    update: (id, data) => provide_external_data_item_async(null, null, function* () {
      return isSingletonDataId(id) ? updateCallback(data) : null;
    })
  });
  return dataConnection;
}
function ignoreDataId(data) {
  if ((0,common/* isObject */.Gv)(data) && "_id" in data) {
    const _a = data, { _id } = _a, rest = provide_external_data_item_objRest(_a, ["_id"]);
    return rest;
  }
  return data;
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/activate_data_integration.ts


let dataIntegrationActive = false;
function activateDataIntegration() {
  dataIntegrationActive = true;
}
function isDataIntegrationActive() {
  return dataIntegrationActive;
}
(0,common/* onReset */.Nj)(() => dataIntegrationActive = false);

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/placeholder_replacement.ts






function isSinglePlaceholder(text) {
  return !!text.match(common/* SINGLE_DATA_PLACEHOLDER */.EH);
}
function replacePlaceholdersWithData(text, {
  placeholders,
  dataStack,
  transform
} = {}) {
  if (!isDataIntegrationActive()) return text;
  return text.replace(common/* DATA_PLACEHOLDERS */._U, (placeholder, identifier) => {
    const rawValue = replacePlaceholder({
      identifier,
      placeholder,
      placeholders,
      dataStack
    });
    return transform ? transform(rawValue) : rawValue;
  });
}
function replacePlaceholder({
  identifier,
  placeholder,
  placeholders,
  dataStack
}) {
  if (identifier.includes(".")) {
    const [dataClassName, attributeName] = identifier.split(".");
    return replaceQualifiedPlaceholder({
      dataClassName,
      attributeName,
      dataStack: dataStack || []
    });
  }
  return replaceLegacyPlaceholder({ identifier, placeholder, placeholders });
}
function replaceQualifiedPlaceholder({
  dataClassName,
  attributeName,
  dataStack
}) {
  const dataItem = getDataItem(dataClassName, dataStack);
  if (dataItem === "loading" || !dataItem) return "";
  const attributeValue = dataItem.getLocalized(attributeName);
  if (typeof attributeValue !== "string") return "";
  return attributeValue;
}
function getDataItem(dataClassName, dataStack) {
  return (0,loadable/* loadableWithDefault */.s4)("loading", () => {
    var _a;
    const element = findItemElementInDataStackAndGlobalData(
      dataClassName,
      dataStack
    );
    if (element) return (_a = getDataClass(dataClassName)) == null ? void 0 : _a.get(element._id);
  });
}
function replaceLegacyPlaceholder({
  identifier,
  placeholder,
  placeholders
}) {
  const rawValue = getDataContextValue(identifier, placeholders || {});
  return rawValue === void 0 ? placeholder : rawValue;
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/current_language.ts


let currentLanguageHandler;
function currentLanguage() {
  if (!currentLanguageHandler) {
    throw new common/* InternalError */.Gd();
  }
  return currentLanguageHandler();
}
function setCurrentLanguageHandler(func) {
  currentLanguageHandler = func;
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/fetch_schema.ts

var fetch_schema_async = (__this, __arguments, generator) => {
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






const fetchSchema = memoize_default()(function(apiClient) {
  return fetch_schema_async(this, null, function* () {
    const siteLanguage = yield (0,loadable/* load */.Hh)(currentLanguage);
    let response;
    try {
      response = yield apiClient.fetch("schema", {
        headers: siteLanguage ? { "Accept-Language": siteLanguage } : {}
      });
    } catch (error) {
      if (error instanceof client/* ClientError */.MZ) {
        (0,common/* logError */.vV)(
          "Error while fetching schema (using empty schema)",
          error.message,
          JSON.stringify(error.details)
        );
        return { attributes: {} };
      }
      throw error;
    }
    return extractDataClassSchemaResponse(response);
  });
});

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/create_rest_api_schema.ts

var create_rest_api_schema_async = (__this, __arguments, generator) => {
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

function createRestApiSchema({
  attributes,
  title
}, apiClient) {
  const fetchAttributes = () => create_rest_api_schema_async(null, null, function* () {
    return (yield fetchSchema(apiClient)).attributes;
  });
  const fetchTitle = () => create_rest_api_schema_async(null, null, function* () {
    return (yield fetchSchema(apiClient)).title;
  });
  return {
    attributes: attributes || fetchAttributes,
    title: attributes ? title : title || fetchTitle
  };
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/provide_data_class.ts

var provide_data_class_async = (__this, __arguments, generator) => {
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







function provideDataClass(name, params) {
  if (name === "Obj") {
    throw new common/* ArgumentError */.c1('"Obj" is not a valid data class name');
  }
  if ((0,realm/* getRealmClass */.an)(name)) {
    throw new common/* ArgumentError */.c1(`Class with name "${name}" already exists`);
  }
  (0,models/* assertValidDataIdentifier */.AR)(name);
  registerExternalDataClass(name, mapLazyAsync(params, desugar));
  return new ExternalDataClass(name);
}
function desugar(params) {
  return provide_data_class_async(this, null, function* () {
    var _a;
    if ("restApi" in params) {
      const apiClient = yield createApiClient(Promise.resolve(params.restApi));
      return {
        connection: Promise.resolve(createRestApiConnectionForClass(apiClient)),
        schema: createRestApiSchema(
          { attributes: params.attributes, title: params.title },
          apiClient
        ),
        refetchOnWindowFocus: params.refetchOnWindowFocus
      };
    }
    return {
      connection: Promise.resolve(params.connection),
      schema: { attributes: (_a = params.attributes) != null ? _a : {}, title: params.title },
      refetchOnWindowFocus: params.refetchOnWindowFocus
    };
  });
}
function createApiClient(restApiPromise) {
  return provide_data_class_async(this, null, function* () {
    const restApi = yield restApiPromise;
    return typeof restApi === "string" ? (0,client/* createRestApiClient */.gM)(restApi) : (0,client/* createRestApiClient */.gM)(restApi.url, restApi);
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/provide_data_item.ts

var provide_data_item_async = (__this, __arguments, generator) => {
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





function provideDataItem(name, params) {
  (0,models/* assertValidDataIdentifier */.AR)(name);
  const dataClass = new ExternalDataClass(name);
  provideExternalDataItem(
    dataClass,
    mapLazyAsync(Promise.resolve(params), provide_data_item_desugar)()
  );
  return dataClass.getUnchecked(SINGLETON_DATA_ID);
}
function provide_data_item_desugar(params) {
  return provide_data_item_async(this, null, function* () {
    var _a;
    if (typeof params === "function") {
      return { connection: { get: params }, schema: { attributes: {} } };
    }
    if ("restApi" in params) {
      const apiClient = yield provide_data_item_createApiClient(Promise.resolve(params.restApi));
      return {
        connection: createRestApiConnectionForItem(apiClient),
        schema: createRestApiSchema(
          { attributes: params.attributes, title: params.title },
          apiClient
        )
      };
    }
    if ("connection" in params) {
      return {
        connection: params.connection,
        schema: { attributes: (_a = params.attributes) != null ? _a : {}, title: params.title }
      };
    }
    return {
      connection: params,
      schema: { attributes: {} }
    };
  });
}
function provide_data_item_createApiClient(restApiPromise) {
  return provide_data_item_async(this, null, function* () {
    const restApi = yield restApiPromise;
    return typeof restApi === "string" ? (0,client/* createRestApiClient */.gM)(restApi) : (0,client/* createRestApiClient */.gM)(restApi.url, restApi);
  });
}
function createRestApiConnectionForItem(apiClient) {
  return {
    get: () => provide_data_item_async(null, null, function* () {
      return apiClient.fetch("");
    }),
    update: (data) => provide_data_item_async(null, null, function* () {
      return apiClient.fetch("", { method: "patch", data });
    })
  };
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/index.ts






























/***/ }),

/***/ 5606:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eW: () => (/* binding */ importFrom)
/* harmony export */ });
/* unused harmony exports provideLoadedEditingModule, isEditingModuleBeingLoaded */
/* harmony import */ var scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5460);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4772);



const moduleLoaders = {
  reactEditing: () => __webpack_require__.e(/* import() */ 723).then(__webpack_require__.bind(__webpack_require__, 1358)),
  editingSupport: () => __webpack_require__.e(/* import() */ 723).then(__webpack_require__.bind(__webpack_require__, 9745))
};
const loadableModules = (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_1__/* .createLoadableCollection */ .rL)({
  loadElement: (moduleName) => ({ loader: moduleLoaders[moduleName] })
});
function importFrom(moduleName, symbol) {
  if (!scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__/* .uiAdapter */ .B) return;
  const loadable = loadableModules.get(moduleName);
  const loadedModule = loadable.get();
  if (!loadedModule) return;
  return loadedModule[symbol];
}
function provideLoadedEditingModule(moduleName, editingModule) {
  loadableModules.get(moduleName).set(editingModule);
}
function isEditingModuleBeingLoaded(moduleName) {
  return loadableModules.get(moduleName).numSubscribers() > 0;
}


/***/ }),

/***/ 3558:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  lx: () => (/* reexport */ OBJ_ID_PATTERN),
  HQ: () => (/* reexport */ finishLinkResolutionFor),
  wx: () => (/* reexport */ formatInternalLinks),
  I8: () => (/* reexport */ setUrlResolutionHandler),
  IW: () => (/* reexport */ setupWriteMonitorNotification),
  AF: () => (/* reexport */ startLinkResolutionFor)
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

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 63 modules
var common = __webpack_require__(4665);
;// CONCATENATED MODULE: ./scrivito_sdk/link_resolution/resolve_url.ts


function resolveUrl(url) {
  if (!urlResolutionHandler) throw new common/* InternalError */.Gd();
  return urlResolutionHandler(url);
}
let urlResolutionHandler;
function setUrlResolutionHandler(handler) {
  urlResolutionHandler = handler;
}

// EXTERNAL MODULE: ./scrivito_sdk/client/index.ts + 38 modules
var client = __webpack_require__(853);
// EXTERNAL MODULE: ./scrivito_sdk/data/index.ts + 30 modules
var data = __webpack_require__(7164);
// EXTERNAL MODULE: external "lodash-es/isEqual"
var isEqual_ = __webpack_require__(9477);
var isEqual_default = /*#__PURE__*/__webpack_require__.n(isEqual_);
// EXTERNAL MODULE: external "lodash-es/escape"
var escape_ = __webpack_require__(3444);
var escape_default = /*#__PURE__*/__webpack_require__.n(escape_);
// EXTERNAL MODULE: external "lodash-es/unescape"
var unescape_ = __webpack_require__(3655);
var unescape_default = /*#__PURE__*/__webpack_require__.n(unescape_);
;// CONCATENATED MODULE: ./scrivito_sdk/link_resolution/content_conversion/resolve_html_url.ts




function resolveHtmlUrl(encodedUrl) {
  const url = unescape_default()(encodedUrl);
  const internalUrl = resolveUrl(url);
  if (!internalUrl) return null;
  const { fragment, obj_id, query } = internalUrl;
  const search = query ? `?${query}` : "";
  const hash = fragment ? `#${fragment}` : "";
  return escape_default()(`objid:${obj_id}${search}${hash}`);
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
  if (!primitiveLink.url) return primitiveLink;
  const internalUrl = resolveUrl(primitiveLink.url);
  if (internalUrl === null) return primitiveLink;
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
      if (!newUrl) return fullMatch;
      return fullMatch.replace(urlMatch, newUrl);
    }
  );
  return convertedHtml;
}

// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 26 modules
var loadable = __webpack_require__(4772);
;// CONCATENATED MODULE: ./scrivito_sdk/link_resolution/link_resolution_worker.ts

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



function isAnyLinkResolutionAttributeJson(attributeData) {
  return ["html", "link", "linklist"].includes(attributeData[0]);
}
function runWorker(attributeDataToConvert, objData, attributeName, widgetId) {
  return __async(this, null, function* () {
    const convertValue = getConversion(attributeDataToConvert);
    const convertedDataWithoutLoading = (0,loadable/* loadableWithDefault */.s4)(
      void 0,
      convertValue
    );
    if (convertedDataWithoutLoading !== void 0) {
      if (!isEqual_default()(convertedDataWithoutLoading, attributeDataToConvert)) {
        update(objData, attributeName, widgetId, convertedDataWithoutLoading);
      }
      return;
    }
    const convertedData = yield (0,loadable/* load */.Hh)(convertValue);
    if (isEqual_default()(convertedData, attributeDataToConvert)) return;
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
  return !isEqual_default()(attributeData, currentAttributeData);
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

var link_resolution_async = (__this, __arguments, generator) => {
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





let notifyWriteMonitor;
function setupWriteMonitorNotification(notification) {
  if (notifyWriteMonitor) {
    throw new common/* InternalError */.Gd();
  }
  notifyWriteMonitor = notification;
}
let linkResolutions = {};
function startLinkResolutionFor(objSpace, objId) {
  linkResolutionFor(objSpace).start(objId);
}
function finishLinkResolutionFor(objSpace, objId) {
  return linkResolutionFor(objSpace).finish(objId);
}
function link_resolution_reset() {
  notifyWriteMonitor = void 0;
  linkResolutions = {};
}
function linkResolutionFor(objSpace) {
  const objSpaceKey = (0,common/* computeCacheKey */.xn)(objSpace);
  if (!linkResolutions[objSpaceKey]) {
    linkResolutions[objSpaceKey] = new LinkResolution(objSpace);
  }
  return linkResolutions[objSpaceKey];
}
class LinkResolution {
  constructor(objSpaceId) {
    this.objSpaceId = objSpaceId;
    this.cache = {};
  }
  start(objId) {
    return link_resolution_async(this, null, function* () {
      const promise = this.getDataAndPerformResolution(objId);
      const priorPromise = this.cache[objId];
      const combinedPromise = priorPromise ? (() => link_resolution_async(this, null, function* () {
        yield Promise.all([priorPromise, promise]);
      }))() : promise;
      this.cache[objId] = combinedPromise;
      notifyLinkResolutionIsActive(combinedPromise);
    });
  }
  finish(objId) {
    return link_resolution_async(this, null, function* () {
      return this.cache[objId];
    });
  }
  getDataAndPerformResolution(objId) {
    return link_resolution_async(this, null, function* () {
      yield performResolution(
        yield (0,loadable/* load */.Hh)(() => (0,data/* getObjData */.ov)(this.objSpaceId, objId))
      );
    });
  }
}
function notifyLinkResolutionIsActive(promise) {
  if (!notifyWriteMonitor) {
    throw new common/* InternalError */.Gd();
  }
  notifyWriteMonitor(promise);
}
function performResolution(objData) {
  return link_resolution_async(this, null, function* () {
    if (!objData) return;
    const objJson = objData.get();
    if (!objJson) return;
    const workers = [];
    (0,client/* withEachAttributeJson */.Yy)(objJson, (attributeJson, attributeName, widgetId) => {
      if (!isAnyLinkResolutionAttributeJson(attributeJson)) return;
      workers.push(runWorker(attributeJson, objData, attributeName, widgetId));
    });
    if (workers.length) yield Promise.all(workers);
  });
}
(0,common/* onReset */.Nj)(link_resolution_reset);

;// CONCATENATED MODULE: ./scrivito_sdk/link_resolution/index.ts






/***/ }),

/***/ 4772:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  PF: () => (/* reexport */ LoadingSubscriber),
  Fg: () => (/* reexport */ load_handler_capture),
  rL: () => (/* reexport */ createLoadableCollection),
  vD: () => (/* reexport */ createLoadableData),
  $t: () => (/* reexport */ deleteOfflineStoreCaches),
  a9: () => (/* reexport */ enableOfflineStore),
  PN: () => (/* reexport */ generateRecording),
  ql: () => (/* reexport */ ignoreLoadingState),
  ih: () => (/* reexport */ isCurrentlyCapturing),
  Em: () => (/* reexport */ isOfflineStoreEnabled),
  Hh: () => (/* reexport */ load_load),
  eX: () => (/* reexport */ loadAndObserve),
  oB: () => (/* reexport */ loadRecording),
  qt: () => (/* reexport */ loadWithDefault),
  rP: () => (/* reexport */ loadable_function_loadableFunction),
  s4: () => (/* reexport */ loadableWithDefault),
  kE: () => (/* reexport */ reportUsedData),
  Kn: () => (/* reexport */ run_and_catch_errors_while_loading_runAndCatchErrorsWhileLoading),
  XR: () => (/* reexport */ setOfflineMode),
  mn: () => (/* reexport */ waitUntilWritingFinished),
  J6: () => (/* reexport */ withoutLoading)
});

// UNUSED EXPORTS: CaptureReport, NotAvailableOfflineError, NotLoadedError, countOfflineStoreEntries, flushLoadableStreams, loadAllUntil, loadEntireIterable, loadableMapReduce

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

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 63 modules
var common = __webpack_require__(4665);
;// CONCATENATED MODULE: ./scrivito_sdk/loadable/load_handler.ts


const captureContextContainer = new common/* ContextContainer */.hl();
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
  throw new common/* ScrivitoError */.aS(
    `Content not yet loaded. Forgot to use Scrivito.load or Scrivito.connect? See ${(0,common/* docUrl */.yJ)("content-not-yet-loaded-error")}`
  );
}
function isCurrentlyCapturing() {
  return currentCaptureList() !== void 0;
}
function notifyDataRequired(loadingState, data) {
  const captureList = currentCaptureList();
  if (captureList) {
    captureList.datas.push(data);
    if (loadingState === "outdated") captureList.outdated = true;
    else if (loadingState === "incomplete") captureList.incomplete = true;
  }
}
class CaptureReport {
  constructor(captureList, result) {
    this.captureList = captureList;
    this.outdated = captureList.outdated;
    this.incomplete = captureList.incomplete;
    this.result = result;
  }
  /** creates a new report, with any 'incomplete' data treated as 'outdated' instead. */
  treatIncompleteAsOutdated() {
    const newCaptureList = {
      datas: [...this.captureList.datas],
      incomplete: false,
      outdated: this.captureList.outdated || this.captureList.incomplete
    };
    return new CaptureReport(newCaptureList, this.result);
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
  /** get the list of data that was accessed during this capture run.
   *
   * intended for debugging
   */
  getRequiredDatas() {
    return this.captureList.datas;
  }
  /** returns true iff no data is missing, doesn't care about outdated  */
  isAllDataLoaded() {
    return !this.incomplete;
  }
  /** returns true iff no data is missing or outdated */
  isAllDataUpToDate() {
    return !this.incomplete && !this.outdated;
  }
  /** subscribes to the loading of all data that was captured, using the provided subscription.
   * all subscribed data is loaded automatically, and reloaded when outdated.
   * the subscription is automatically updated to reflect the data captured in this report,
   * i.e. any data that is no longer present in the capture is unsubscribed.
   */
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
  /** used internally, do not call from outside 'loadable' */
  storeUnsubscribe(unsubscribe) {
    this.unsubscribeCallback = unsubscribe;
  }
  /** unsubscribe any previously subscribed data */
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
  if (meta.error !== void 0) throw meta.error;
}

// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(1946);
;// CONCATENATED MODULE: ./scrivito_sdk/loadable/observe_and_load.ts




function observeAndLoad(loadableExpression) {
  return new common/* Streamable */.RE((observer) => {
    const loadingSubscriber = new LoadingSubscriber();
    const subscription = (0,state/* observe */.lB)(
      () => load_handler_capture(() => (0,common/* runAndCatchException */.Bd)(loadableExpression))
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




function load_load(loadableFunction) {
  return __async(this, null, function* () {
    checkLoad(loadableFunction);
    const observed = yield observeAndLoad(
      () => (0,state/* withFrozenState */.Ij)(
        {
          contextName: "Scrivito.load",
          message: "Use an async callback: await Scrivito.load(/* ... */)"
        },
        loadableFunction
      )
    ).filter((o) => !o.meta.incomplete && !o.meta.outdated).waitForFirst();
    return getValueOrThrowError(observed);
  });
}
function checkLoad(loadableFunction) {
  if (typeof loadableFunction !== "function") {
    (0,common/* throwInvalidArgumentsError */.Ht)(
      "Scrivito.load",
      "Use an async callback: await Scrivito.load(/* ... */)",
      { docPermalink: "js-sdk/load" }
    );
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/ignore_loading_state.ts


function ignoreLoadingState(fn) {
  const captured = load_handler_capture(fn);
  captured.treatIncompleteAsOutdated().forwardToCurrent();
  return captured.result;
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/loader_callback_process.ts

var loader_callback_process_async = (__this, __arguments, generator) => {
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


let loadIdCounter = 0;
class LoaderCallbackProcess {
  constructor(stateContainer, loader, invalidation, onChange) {
    this.stateContainer = stateContainer;
    this.loader = loader;
    this.invalidation = invalidation;
    this.onChange = onChange;
  }
  notifyDataRequired() {
    this.triggerLoadingIfNeeded();
  }
  notifyDataNoLongerRequired() {
  }
  notifyDataWasSet() {
    this.currentLoad = void 0;
    const onChange = this.onChange;
    if (onChange) {
      onChange();
    }
  }
  setTidyCallback() {
  }
  // trigger loading the data.
  // does nothing if the data is already loading, or no loading is needed.
  triggerLoadingIfNeeded() {
    return loader_callback_process_async(this, null, function* () {
      if (this.isLoading()) return;
      const versionWhenLoadingStarted = versionFromCallback(this.invalidation);
      if (!this.loadingNeeded(versionWhenLoadingStarted)) return;
      const loadId = loadIdCounter++;
      const finishLoader = (effect) => {
        if (this.currentLoad === loadId) {
          (0,state/* addBatchUpdate */.Rs)(() => {
            effect();
            this.currentLoad = void 0;
            if (this.onChange) {
              this.onChange();
            }
          });
        }
      };
      this.currentLoad = loadId;
      try {
        const result = yield this.loader();
        finishLoader(
          () => this.stateContainer.set({
            value: result,
            meta: { version: versionWhenLoadingStarted }
          })
        );
      } catch (error) {
        finishLoader(
          () => this.stateContainer.set({
            meta: { error, version: versionWhenLoadingStarted }
          })
        );
      }
    });
  }
  loadingNeeded(currentVersion) {
    const metaStateContainer = this.stateContainer.subState("meta");
    const meta = metaStateContainer.get();
    if (meta === void 0) return true;
    if (currentVersion === void 0) return false;
    return currentVersion !== meta.version;
  }
  isLoading() {
    return this.currentLoad !== void 0;
  }
}
function metaHasBeenInvalidated(meta, callback) {
  if (!callback || meta === void 0) return false;
  return versionFromCallback(callback) !== meta.version;
}
function versionFromCallback(callback) {
  if (!callback) {
    return;
  }
  const version = callback();
  if (typeof version === "number" && isNaN(version)) {
    throw new common/* InternalError */.Gd();
  }
  return version;
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/offline_handling.ts

var offline_handling_async = (__this, __arguments, generator) => {
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

let isEnabled = false;
function enableOfflineStore() {
  isEnabled = true;
}
let isInOfflineMode = false;
function setOfflineMode(mode) {
  isInOfflineMode = mode;
}
function isOfflineStoreEnabled() {
  return !!isEnabled;
}
(0,common/* onReset */.Nj)(() => {
  isInOfflineMode = false;
  isEnabled = false;
});
function applyOfflineHandling(loadable, params) {
  const loader = params.loader;
  const offlineLoader = params.offlineLoader;
  if (offlineLoader) {
    return {
      loader: () => offline_handling_async(null, null, function* () {
        return (yield isInOfflineMode) ? offlineLoader() : loader();
      })
    };
  }
  const offlineEntry = params.offlineEntry;
  if (!offlineEntry) return { loader };
  return {
    loader: () => offline_handling_async(null, null, function* () {
      return (yield isInOfflineMode) ? loadFromEntry(offlineEntry) : loader();
    }),
    onChange: (0,common/* collectAndSchedule */.Lu)(common/* nextTick */.dY, () => offline_handling_async(null, null, function* () {
      if (isEnabled && !(yield isInOfflineMode)) {
        storeIntoEntry(loadable, offlineEntry);
      }
    }))
  };
}
function storeIntoEntry(loadable, offlineEntry) {
  return offline_handling_async(this, null, function* () {
    try {
      offlineEntry.write(loadable.getOrThrow());
    } catch (e) {
      offlineEntry.delete();
    }
  });
}
class NotAvailableOfflineError extends common/* ScrivitoError */.aS {
}
function loadFromEntry(offlineEntry) {
  return offline_handling_async(this, null, function* () {
    const data = yield offlineEntry.read();
    if (data === void 0) {
      throw new NotAvailableOfflineError(
        `missing: ${offlineEntry.debugIdentifier()})}`
      );
    }
    return data;
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/stream_process.ts

var stream_process_async = (__this, __arguments, generator) => {
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


class StreamProcess {
  constructor(stateContainer, stream) {
    this.stateContainer = stateContainer;
    this.stream = stream;
    this.notifyRequiredCounter = 0;
    this.scheduleNextState = (0,common/* collectAndSchedule */.Lu)(
      state/* addBatchUpdate */.Rs,
      (state) => {
        if (!this.isStreamOpen()) return;
        this.stateContainer.set(state);
      }
    );
    this.enqueueStreamRequired = (0,common/* collectAndSchedule */.Lu)(
      common/* nextTick */.dY,
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
      if (counterBefore !== this.notifyRequiredCounter) return;
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
      if (this.tidyCallback) this.tidyCallback();
    }
    this.stateContainer.set(void 0);
  }
}
const UNSUBSCRIBE_DELAY = 1e4;
const flushSubject = new common/* Subject */.B7();
function flushLoadableStreams() {
  flushSubject.next();
}
function enqueueFlush(callback) {
  return stream_process_async(this, null, function* () {
    const waitPromise = (0,common/* waitMs */.Cu)(UNSUBSCRIBE_DELAY);
    const flushPromise = flushSubject.waitForFirst();
    yield Promise.race([waitPromise, flushPromise]);
    callback();
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/create_loader_process.ts




function createLoaderProcess(loadable, params, stateContainer) {
  if (params.stream) {
    return new StreamProcess(
      stateContainer,
      params.stream.map((value) => ({ meta: {}, value }))
    );
  }
  if (params.loadableStream) {
    return new StreamProcess(stateContainer, params.loadableStream);
  }
  const { loader, onChange } = applyOfflineHandling(loadable, params);
  return new LoaderCallbackProcess(
    stateContainer,
    loader,
    params.invalidation,
    onChange
  );
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/loading_registry.ts


let processIndex = {};
let loadingSubscriptions = {};
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
  if (existingProcess) return existingProcess;
  const newProcess = processFactory();
  processIndex[dataId] = newProcess;
  newProcess.setTidyCallback(() => {
    if (processIndex[dataId] !== newProcess) return;
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
function notifyDataWasSet(dataId, processFactory) {
  const processToUse = getOrCreateProcessFor(dataId, processFactory);
  processToUse.notifyDataWasSet();
}
(0,common/* onReset */.Nj)(() => {
  processIndex = {};
  loadingSubscriptions = {};
});

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/not_loaded_error.ts


class NotLoadedError extends common/* ScrivitoError */.aS {
  constructor() {
    super("Data is not yet loaded.");
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/offline_store.ts

var offline_store_async = (__this, __arguments, generator) => {
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

const writeTracker = new common/* AsyncTaskTracker */.Oh();
class OfflineStore {
  constructor(storeName) {
    this.storeName = storeName;
  }
  getEntry(key) {
    return new StoreEntry(this.storeName, key);
  }
  /** find values in the cache that satisfy the given selector */
  findValues(selector) {
    return offline_store_async(this, null, function* () {
      const cache = yield cacheFor(this.storeName);
      const cacheKeys = yield cache.keys();
      const results = yield Promise.all(
        cacheKeys.map((cacheKey) => offline_store_async(this, null, function* () {
          const response = yield cache.match(cacheKey);
          if (!response) return;
          const wrappedData = yield response.json();
          const [data, key] = wrappedData;
          if (selector(data, key)) return wrappedData;
        }))
      );
      return results.filter(isNotUndefined);
    });
  }
}
function isNotUndefined(data) {
  return data !== void 0;
}
class StoreEntry {
  constructor(storeName, key) {
    this.storeName = storeName;
    this.key = key;
  }
  read() {
    return offline_store_async(this, null, function* () {
      return (0,common/* registerAsyncTask */.lK)(() => offline_store_async(this, null, function* () {
        const cache = yield this.fetchCache();
        const response = yield cache.match(this.offlineCacheKey());
        if (response) {
          const wrappedData = yield response.json();
          return wrappedData[0];
        }
      }));
    });
  }
  write(data) {
    return offline_store_async(this, null, function* () {
      yield writeTracker.registerTask(() => offline_store_async(this, null, function* () {
        if (writingBeingPaused) yield writingBeingPaused.promise;
        yield (0,common/* registerAsyncTask */.lK)(() => offline_store_async(this, null, function* () {
          const cache = yield this.fetchCache();
          yield cache.put(
            this.offlineCacheKey(),
            new Response(JSON.stringify([data, this.key]), {
              headers: { "Content-Type": "application/json" }
            })
          );
        }));
      }));
    });
  }
  delete() {
    return offline_store_async(this, null, function* () {
      yield (0,common/* registerAsyncTask */.lK)(() => offline_store_async(this, null, function* () {
        const cache = yield this.fetchCache();
        yield cache.delete(this.offlineCacheKey());
      }));
    });
  }
  /** a string that can help a developer identify this entry */
  debugIdentifier() {
    return JSON.stringify({ [this.storeName]: this.key });
  }
  fetchCache() {
    return cacheFor(this.storeName);
  }
  offlineCacheKey() {
    return `/_scrivito-offline/${(0,common/* computeCacheKey */.xn)(this.key)}`;
  }
}
const CACHE_PREFIX = "scrivito-offline";
function cacheFor(collectionId) {
  return caches.open(`${CACHE_PREFIX}-${(0,common/* getScrivitoVersion */.YX)()}-${collectionId}`);
}
function deleteOfflineStoreCaches() {
  return offline_store_async(this, null, function* () {
    const scrivitoCacheNames = yield getAllScrivitoCacheNames();
    yield Promise.all(
      scrivitoCacheNames.map((cacheName) => caches.delete(cacheName))
    );
  });
}
function waitUntilWritingFinished() {
  return offline_store_async(this, null, function* () {
    return writeTracker.waitForRegisteredTasks();
  });
}
function countOfflineStoreEntries() {
  return offline_store_async(this, null, function* () {
    const scrivitoCaches = yield openAllScrivitoCaches();
    const cacheSizes = yield Promise.all(
      scrivitoCaches.map((cache) => offline_store_async(null, null, function* () {
        return (yield cache.keys()).length;
      }))
    );
    return cacheSizes.reduce((sum, size) => sum + size, 0);
  });
}
function openAllScrivitoCaches() {
  return offline_store_async(this, null, function* () {
    const scrivitoCacheNames = yield getAllScrivitoCacheNames();
    return Promise.all(
      scrivitoCacheNames.map((cacheName) => caches.open(cacheName))
    );
  });
}
function getAllScrivitoCacheNames() {
  return offline_store_async(this, null, function* () {
    const cacheNames = yield caches.keys();
    return cacheNames.filter((name) => name.startsWith(CACHE_PREFIX));
  });
}
let writingBeingPaused;
function pauseAllWriting() {
  if (!writingBeingPaused) writingBeingPaused = new Deferred();
}
function resumeAllWriting() {
  writingBeingPaused == null ? void 0 : writingBeingPaused.resolve();
  writingBeingPaused = void 0;
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/loadable_data.ts

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









const singletonStore = new OfflineStore("singleton");
function createLoadableData(params) {
  return new LoadableDataImpl(params);
}
class LoadableDataImpl {
  // state is the stateContainer where the LoadableData should store its state.
  constructor(params) {
    var _a;
    this.stateContainer = (_a = params.state) != null ? _a : (0,state/* createStateContainer */.Ld)();
    this.id = this.stateContainer.id();
    this.affiliation = params.affiliation;
    this.invalidation = params.invalidation;
    this.processFactory = () => {
      var _a2;
      const offlineEntry = (_a2 = params.offlineEntry) != null ? _a2 : params.name ? singletonStore.getEntry(params.name) : void 0;
      return createLoaderProcess(
        this,
        params.loader ? __spreadProps(__spreadValues({}, params), { offlineEntry }) : params,
        this.stateContainer
      );
    };
  }
  ensureAvailable() {
    notifyUsage(this.id, this);
    return this.checkIfAvailableMeta(this.getMeta());
  }
  /** Access the LoadableData synchronously, assuming it is available.
   * If the LoadableData is an error, the error is thrown.
   * If the LoadableData is missing or loading, undefined will be returned.
   */
  get() {
    return this.getWithDefault(void 0);
  }
  getAffiliation() {
    return this.affiliation;
  }
  getWithDefault(theDefault) {
    const state = this.stateContainer.get();
    if (!this.checkIfAvailableState(state)) return theDefault;
    notifyUsage(this.id, this);
    return state.value;
  }
  /** Similar to LoadableData#get, but if the data is not available,
   * throws a NotLoadedError (instead of returning undefined).
   */
  getOrThrow() {
    const state = this.stateContainer.get();
    if (!this.checkIfAvailableState(state)) throw new NotLoadedError();
    notifyUsage(this.id, this);
    return state.value;
  }
  reader() {
    this.ensureAvailable();
    return this.stateContainer.reader().subState("value");
  }
  // set the data to a value. this makes the value available.
  set(value) {
    this.stateContainer.set({
      value,
      meta: { version: this.currentVersion() }
    });
    notifyDataWasSet(this.id, this.processFactory);
  }
  // set the data to an error.
  setError(error) {
    this.stateContainer.set({
      meta: { error, version: this.currentVersion() }
    });
    notifyDataWasSet(this.id, this.processFactory);
  }
  // transition back to missing, removes any value or errors.
  reset() {
    this.stateContainer.set(void 0);
  }
  // returns true iff the value is missing
  isMissing() {
    return this.getMeta() === void 0;
  }
  // return true iff value is available.
  isAvailable() {
    const meta = this.getMeta();
    return meta !== void 0 && meta.error === void 0;
  }
  // return true iff an error was set.
  isError() {
    var _a;
    return ((_a = this.getMeta()) == null ? void 0 : _a.error) !== void 0;
  }
  // for test purposes only
  numSubscribers() {
    return subscriberCountForLoading(this.id);
  }
  // package-private: don't call from outside of 'scrivito_sdk/loadable'
  subscribeLoading() {
    return subscribeLoading(this.id, this.processFactory);
  }
  // for test purposes only
  rawStateContainer() {
    return this.stateContainer;
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
  if (metaHasBeenInvalidated(meta, invalidation)) return "outdated";
  return meta.incomplete ? "incomplete" : "available";
}
const usageContext = new common/* ContextContainer */.hl();
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
  if (firstCaptured.isAllDataLoaded()) secondCaptured.forwardToCurrent();
  return secondCaptured.result;
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/dejitter_state_stream.ts


function dejitterStateStream(stream) {
  return new common/* Streamable */.RE((observer) => {
    let isComplete = false;
    return stream.subscribe((state) => {
      if (state.meta.incomplete === true) {
        if (isComplete) return;
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
  const functionState = (0,state/* createStateContainer */.Ld)();
  return (...args) => {
    if (!isCurrentlyCapturing()) return fn(...args);
    const data = createLoadableData({
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
  const captured = load_handler_capture(() => (0,common/* runAndCatchException */.Bd)(loadableFunction));
  captured.forwardToCurrent();
  const outcome = captured.result;
  const allDataLoaded = captured.isAllDataLoaded();
  if (!outcome.errorThrown) {
    return {
      success: true,
      result: outcome.result,
      allDataLoaded
    };
  }
  if (!allDataLoaded) {
    return {
      success: false,
      allDataLoaded: false
    };
  }
  throw outcome.error;
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/loadable_collection.ts

var loadable_collection_defProp = Object.defineProperty;
var loadable_collection_defProps = Object.defineProperties;
var loadable_collection_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var loadable_collection_getOwnPropSymbols = Object.getOwnPropertySymbols;
var loadable_collection_hasOwnProp = Object.prototype.hasOwnProperty;
var loadable_collection_propIsEnum = Object.prototype.propertyIsEnumerable;
var loadable_collection_defNormalProp = (obj, key, value) => key in obj ? loadable_collection_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var loadable_collection_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (loadable_collection_hasOwnProp.call(b, prop))
      loadable_collection_defNormalProp(a, prop, b[prop]);
  if (loadable_collection_getOwnPropSymbols)
    for (var prop of loadable_collection_getOwnPropSymbols(b)) {
      if (loadable_collection_propIsEnum.call(b, prop))
        loadable_collection_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var loadable_collection_spreadProps = (a, b) => loadable_collection_defProps(a, loadable_collection_getOwnPropDescs(b));
var loadable_collection_async = (__this, __arguments, generator) => {
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





function createLoadableCollection(params) {
  return new LoadableCollectionImpl(params);
}
class LoadableCollectionImpl {
  constructor({
    name,
    loadElement
  }) {
    this.name = name;
    this.state = (0,state/* createStateContainer */.Ld)();
    this.loadElement = loadElement;
    if (name) {
      register(name, this);
      this.offlineStore = new OfflineStore(name);
    }
  }
  /** get a LoadableData instance from this collection */
  get(key, loaderHint) {
    var _a;
    const stringifiedKey = stringifyKey(key);
    const params = this.loadElement(key, loaderHint);
    const paramsWithOfflineEntry = params.loader ? loadable_collection_spreadProps(loadable_collection_spreadValues({}, params), { offlineEntry: (_a = this.offlineStore) == null ? void 0 : _a.getEntry(key) }) : params;
    const data = createLoadableData(loadable_collection_spreadProps(loadable_collection_spreadValues({}, paramsWithOfflineEntry), {
      state: this.state.subState(stringifiedKey),
      affiliation: this.name ? { collectionName: this.name, key } : void 0
    }));
    return data;
  }
  clear() {
    this.state.clear();
  }
  /** this method is "dangerous" - it can be very, very bad for performance
   * use with care, and only if you know precisely what you are doing.
   *
   * it returns all current loaded data inside the collection,
   * but does not trigger any loading.
   */
  dangerouslyGetRawValues() {
    const currentState = this.state.get();
    if (!currentState) return [];
    return Object.keys(currentState).map((key) => currentState[key]).filter(common/* isPresent */.Wo).filter(isAvailableState).map((state) => state.value);
  }
  findValuesInOfflineStore(selector) {
    return loadable_collection_async(this, null, function* () {
      if (!this.offlineStore) throw new common/* InternalError */.Gd();
      return this.offlineStore.findValues(selector);
    });
  }
}
function stringifyKey(key) {
  if (typeof key === "string") {
    return key;
  }
  return (0,common/* computeCacheKey */.xn)(key);
}
const namedCollections = {};
function register(name, collection) {
  if (namedCollections[name]) {
    throw new common/* InternalError */.Gd();
  }
  namedCollections[name] = collection;
}
function getCollection(name) {
  const found = namedCollections[name];
  if (!found) throw new common/* InternalError */.Gd();
  return found;
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/data_recorder.ts




function loadRecording(recording) {
  (0,state/* withBatchedUpdates */.I7)(() => recording.forEach(loadDataFromRecord));
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
    throw new common/* InternalError */.Gd();
  }
  return [affiliation.collectionName, affiliation.key, data.get()];
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/load_and_observe.ts



function loadAndObserve(fn) {
  return observeAndLoad(fn).filter((state) => !state.meta.incomplete).map(getValueOrThrowError);
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/load_entire_iterable.ts

var load_entire_iterable_async = (__this, __arguments, generator) => {
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
  return load_entire_iterable_async(this, null, function* () {
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

/***/ 5794:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bW: () => (/* binding */ isCurrentWorkspacePublished),
/* harmony export */   eb: () => (/* binding */ currentObjSpaceId),
/* harmony export */   o_: () => (/* binding */ currentWorkspaceId),
/* harmony export */   st: () => (/* binding */ setCurrentWorkspaceId)
/* harmony export */ });
/* unused harmony export resetCurrentWorkspaceId */
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4665);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8927);
/* harmony import */ var scrivito_sdk_models_obj_space_for__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7763);




let objSpaceId;
function currentObjSpaceId() {
  return objSpaceId != null ? objSpaceId : (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__/* .publishedSpace */ .z7)();
}
function isCurrentWorkspacePublished() {
  const [type, id] = currentObjSpaceId();
  return type === "workspace" && id === "published";
}
function currentWorkspaceId() {
  return currentObjSpaceId()[1];
}
function setCurrentWorkspaceId(id) {
  objSpaceId = (0,scrivito_sdk_models_obj_space_for__WEBPACK_IMPORTED_MODULE_2__/* .objSpaceFor */ .v)(id);
}
function resetCurrentWorkspaceId() {
  objSpaceId = (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__/* .publishedSpace */ .z7)();
}
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .onReset */ .Nj)(resetCurrentWorkspaceId);


/***/ }),

/***/ 8927:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  $e: () => (/* reexport */ BasicField),
  Re: () => (/* reexport */ BasicLink),
  kI: () => (/* reexport */ BasicObj),
  Ei: () => (/* reexport */ BasicObjSearch),
  $R: () => (/* reexport */ BasicWidget),
  yI: () => (/* reexport */ Binary),
  HX: () => (/* reexport */ DataLocator),
  Wc: () => (/* reexport */ FULL_TEXT_OPERATORS),
  HI: () => (/* reexport */ FutureBinary),
  gT: () => (/* reexport */ MetadataCollection),
  Wk: () => (/* reexport */ ObjUnavailable),
  aR: () => (/* reexport */ Workspace),
  uz: () => (/* reexport */ allSitesAndGlobal),
  AR: () => (/* reexport */ assertValidDataIdentifier),
  w2: () => (/* reexport */ comparisonFromPublished),
  rB: () => (/* reexport */ copyObjViaHandler),
  fK: () => (/* reexport */ createObjFromFileIn),
  ZU: () => (/* reexport */ createObjIn),
  eb: () => (/* reexport */ current_workspace_id/* currentObjSpaceId */.eb),
  o_: () => (/* reexport */ current_workspace_id/* currentWorkspaceId */.o_),
  Kp: () => (/* reexport */ emptyScope),
  cb: () => (/* reexport */ excludeDeletedObjs),
  S$: () => (/* reexport */ excludeGlobal),
  eF: () => (/* reexport */ getAllObjsByValueFrom),
  Ed: () => (/* reexport */ getContentValueOrConnection),
  mM: () => (/* reexport */ getDetailsPageForDataParam),
  Z0: () => (/* reexport */ getObjBy),
  ud: () => (/* reexport */ getObjByPath),
  ED: () => (/* reexport */ getObjFrom),
  B9: () => (/* reexport */ getObjIncludingUnavailableFrom),
  t3: () => (/* reexport */ getPlacementModificationInfos),
  Mp: () => (/* reexport */ getRootObjFrom),
  uD: () => (/* reexport */ isContentConnection),
  gP: () => (/* reexport */ isDataLocatorValueViaFilter),
  Wf: () => (/* reexport */ isValidDataIdentifier),
  kq: () => (/* reexport */ isWrappingBasicContent),
  fZ: () => (/* reexport */ isWrappingBasicLink),
  mD: () => (/* reexport */ isWrappingBasicObj),
  vs: () => (/* reexport */ obj_space_for/* objSpaceFor */.v),
  aG: () => (/* reexport */ objSpaceScope),
  Wr: () => (/* reexport */ objSpaceScopeExcludingDeleted),
  z7: () => (/* reexport */ published_space_publishedSpace),
  Vg: () => (/* reexport */ restrictToContent),
  Lw: () => (/* reexport */ restrictToObjClass),
  rs: () => (/* reexport */ restrictToSite),
  y7: () => (/* reexport */ restrictToSiteAndGlobal),
  mv: () => (/* reexport */ setBinaryHandler),
  d4: () => (/* reexport */ setCopyObjHandler),
  st: () => (/* reexport */ current_workspace_id/* setCurrentWorkspaceId */.st),
  F1: () => (/* reexport */ setWantsAutoAttributeConversion),
  s8: () => (/* reexport */ updateReferences),
  $9: () => (/* reexport */ versionOnSite),
  GY: () => (/* reexport */ versionsOnAllSites),
  rF: () => (/* reexport */ wantsAutoAttributeConversion)
});

// UNUSED EXPORTS: BasicObjFacetValue, CMS_ATTRIBUTE_TYPES, OPERATORS, isCurrentWorkspacePublished, isDataLocatorValueOrOperatorFilter, isDataLocatorValueVia, isWrappingBasicWidget, normalizedRestriction, resetCurrentWorkspaceId, restrictToGlobal, serializeAttributes

// EXTERNAL MODULE: external "lodash-es/mapValues"
var mapValues_ = __webpack_require__(7885);
var mapValues_default = /*#__PURE__*/__webpack_require__.n(mapValues_);
// EXTERNAL MODULE: ./scrivito_sdk/client/index.ts + 38 modules
var client = __webpack_require__(853);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 63 modules
var common = __webpack_require__(4665);
;// CONCATENATED MODULE: ./scrivito_sdk/models/auto_convert.ts


let autoConvertAttributes = false;
function setWantsAutoAttributeConversion(value) {
  autoConvertAttributes = value;
}
function wantsAutoAttributeConversion() {
  return !!autoConvertAttributes;
}
function autoConvertToReference(value) {
  if (!wantsAutoAttributeConversion()) return value;
  const singleValue = autoConvertToSingle(value);
  if (backendValueType(singleValue) !== "link") return singleValue;
  const objId = singleValue[1].obj_id;
  if (!objId) return singleValue;
  return ["reference", objId];
}
function autoConvertToReferencelist(value) {
  if (!wantsAutoAttributeConversion()) return value;
  const listValue = autoConvertToList(value);
  if (backendValueType(listValue) !== "linklist") return listValue;
  const objIds = listValue[1].map(({ obj_id }) => obj_id).filter((id) => !!id);
  return ["referencelist", objIds];
}
function autoConvertToLink(value) {
  if (!wantsAutoAttributeConversion()) return value;
  const singleValue = autoConvertToSingle(value);
  if (backendValueType(singleValue) !== "reference") return singleValue;
  return ["link", linkForReference(singleValue[1])];
}
function autoConvertToLinklist(value) {
  if (!wantsAutoAttributeConversion()) return value;
  const listValue = autoConvertToList(value);
  if (backendValueType(listValue) !== "referencelist") return listValue;
  return [
    "linklist",
    listValue[1].map(linkForReference)
  ];
}
function linkForReference(objId) {
  return {
    fragment: null,
    obj_id: objId,
    query: null,
    target: null,
    title: null,
    url: null
  };
}
const SINGLE_TYPE_FOR = {
  linklist: "link",
  referencelist: "reference",
  stringlist: "string"
};
function autoConvertToSingle(value) {
  const type = wantsAutoAttributeConversion() && backendValueType(value);
  if (type === "html") {
    return ["string", value[1]];
  }
  const targetType = type && SINGLE_TYPE_FOR[type];
  if (!targetType) return value;
  const listValue = value[1];
  return listValue.length ? [targetType, listValue[0]] : value;
}
const LIST_TYPE_FOR = {
  html: "stringlist",
  link: "linklist",
  reference: "referencelist",
  string: "stringlist"
};
function autoConvertToList(value) {
  const type = wantsAutoAttributeConversion() && backendValueType(value);
  const targetType = type && LIST_TYPE_FOR[type];
  if (!targetType) return value;
  const singleValue = value[1];
  return singleValue ? [targetType, [singleValue]] : value;
}
function backendValueType(value) {
  return Array.isArray(value) ? value[0] : void 0;
}
(0,common/* onReset */.Nj)(() => autoConvertAttributes = false);

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

// EXTERNAL MODULE: ./scrivito_sdk/data/index.ts + 30 modules
var scrivito_sdk_data = __webpack_require__(7164);
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
  // For test purpose only.
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
    const objData = (0,scrivito_sdk_data/* getObjData */.ov)(this.objSpaceId, id);
    if (!objData) return new ObjUnavailable(id, "notLoaded");
    if (!objData.isUnavailable()) return new BasicObj(objData);
    if (objData.isForbidden()) return new ObjUnavailable(id, "forbidden");
    return new ObjUnavailable(id, "nonexistent");
  }
  search() {
    return new BasicObjSearch(
      (0,client/* isRevisionObjSpaceId */.g7)(this.objSpaceId) ? client/* EMPTY_SPACE */.HY : this.objSpaceId
    ).includeDeleted();
  }
  create(id, attributes) {
    const objClass = attributes._obj_class;
    if (!objClass) throw new common/* InternalError */.Gd();
    if ((0,client/* isEmptySpaceId */.dQ)(this.objSpaceId)) {
      throw new common/* ScrivitoError */.aS(
        "Cannot create an obj, because the current site is not yet determined."
      );
    }
    const objJson = __spreadValues({
      _obj_class: objClass,
      _id: id,
      _site_id: null
    }, attributes);
    return new BasicObj((0,scrivito_sdk_data/* createObjData */.c2)(this.objSpaceId, id, objJson));
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
      return deserializeFloatValue(autoConvertToSingle(value));
    case "enum":
      return deserializeEnumValue(autoConvertToSingle(value), typeInfo);
    case "html":
      return deserializeHtmlOrStringValue(autoConvertToSingle(value));
    case "integer":
      return deserializeIntegerValue(autoConvertToSingle(value));
    case "link":
      return deserializeLinkValue(autoConvertToLink(value));
    case "linklist":
      return deserializeLinklistValue(autoConvertToLinklist(value));
    case "multienum":
      return deserializeMultienumValue(autoConvertToList(value), typeInfo);
    case "reference":
      return deserializeReferenceValue(autoConvertToReference(value), model);
    case "referencelist":
      return deserializeReferencelistValue(
        autoConvertToReferencelist(value),
        model
      );
    case "string":
      return deserializeHtmlOrStringValue(autoConvertToSingle(value));
    case "stringlist":
      return deserializeStringlistValue(autoConvertToList(value));
    case "widget":
      return deserializeWidgetValue(value, model);
    case "widgetlist":
      return deserializeWidgetlistValue(value, model);
    default:
      throw new common/* InternalError */.Gd();
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
    return new DataLocator(value[1] || { class: null });
  }
  return new DataLocator({ class: null });
}
function deserializeDateValue(value) {
  if (isBackendValueOfType("date", value)) {
    return (0,common/* deserializeAsDate */.uS)(value[1]);
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
    if (values.includes(valueFromBackend)) return valueFromBackend;
  }
  return null;
}
function deserializeMultienumValue(value, typeInfo) {
  if (isBackendValueOfType("stringlist", value)) {
    const [, { values }] = typeInfo;
    return value[1].filter((item) => values.includes(item));
  }
  return [];
}
function deserializeFloatValue(value) {
  if (isBackendValueOfType("number", value)) {
    return (0,common/* deserializeAsFloat */.A_)(value[1].toString());
  }
  if (isBackendValueOfType("string", value)) {
    const [, valueFromBackend] = value;
    if (valueFromBackend.match(/^-?\d+(\.\d+)?$/)) {
      return (0,common/* deserializeAsFloat */.A_)(valueFromBackend);
    }
  }
  return null;
}
function deserializeIntegerValue(value) {
  if (isBackendValueOfType("number", value) || isBackendValueOfType("string", value)) {
    return (0,common/* deserializeAsInteger */.w0)(value[1]);
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
  const { query, rel, target, title, url } = valueFromBackend;
  const linkParams = { query, rel, target, title, url };
  if ("fragment" in valueFromBackend) {
    linkParams.hash = valueFromBackend.fragment;
  }
  if ("obj_id" in valueFromBackend) linkParams.objId = valueFromBackend.obj_id;
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
  if (isBackendValueOfType("widget", value)) [, widgetId] = value;
  if (isBackendValueOfType("widgetlist", value)) [, [widgetId]] = value;
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
      if (widget) return [widget];
    }
  }
  return [];
}
function isBackendValueOfType(type, value) {
  return Array.isArray(value) && value[0] === type;
}

// EXTERNAL MODULE: external "lodash-es/isDate"
var isDate_ = __webpack_require__(8307);
var isDate_default = /*#__PURE__*/__webpack_require__.n(isDate_);
// EXTERNAL MODULE: external "lodash-es/isEmpty"
var isEmpty_ = __webpack_require__(5020);
var isEmpty_default = /*#__PURE__*/__webpack_require__.n(isEmpty_);
// EXTERNAL MODULE: external "lodash-es/isEqual"
var isEqual_ = __webpack_require__(9477);
var isEqual_default = /*#__PURE__*/__webpack_require__.n(isEqual_);
// EXTERNAL MODULE: external "@justrelate/slugify"
var slugify_ = __webpack_require__(5929);
// EXTERNAL MODULE: ./scrivito_sdk/link_resolution/index.ts + 6 modules
var link_resolution = __webpack_require__(3558);
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
function getObjByPath(scope, path) {
  return getObjBy(scope, "_path", path);
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/basic_field.ts







class BasicField {
  constructor(container, attributeName, typeInfo) {
    this.container = container;
    this.attributeName = attributeName;
    this.typeInfo = typeInfo;
    if (container instanceof BasicWidget) this.widgetId = container.id();
  }
  get() {
    return getContentValue(this.container, this.attributeName, this.typeInfo);
  }
  getValueOrConnection() {
    return this.container.getValueOrConnection(
      this.attributeName,
      this.typeInfo
    );
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
    return (0,scrivito_sdk_data/* getFieldDiff */.km)(from, to, this.attributeName, obj.id(), this.widgetId);
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
    if (!obj) return null;
    const container = this.getContainer() instanceof BasicObj ? obj : obj.widget(this.getContainer().id());
    if (!container) return null;
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
    return this.facet.includedObjIds.map((id) => getObjFrom(scope, id)).filter((obj) => !!obj);
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
    return new BasicObjSearch((0,obj_space_for/* objSpaceFor */.v)(workspaceId), params);
  }
  and(attributeOrSearch, operator, value, boost) {
    if (attributeOrSearch instanceof BasicObjSearch) {
      this._query = [...this._query, ...attributeOrSearch._query];
    } else {
      if (operator === void 0) {
        throw new common/* ArgumentError */.c1("Missing operator to search with");
      }
      if (value === void 0) {
        throw new common/* ArgumentError */.c1(
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
  andIsChildOf(obj) {
    const siteId = obj.siteId();
    const path = obj.path();
    return siteId && path ? this.onSite(siteId).and("_parentPath", "equals", path) : this.and("_id", "equals", null);
  }
  andIsInsideSubtreeOf(obj) {
    const siteId = obj.siteId();
    const path = obj.path();
    return siteId && path ? this.onSite(siteId).and("_path", "startsWith", path) : this.and("_id", "equals", obj.id());
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
    return (0,scrivito_sdk_data/* getObjQueryCount */.x1)(this.objSpaceId(), this.queryParams()) || 0;
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
    const objDataQuery = (0,scrivito_sdk_data/* getObjQuery */.s5)(
      this.objSpaceId(),
      this.queryParams(),
      this.getBatchSize()
    );
    return (0,common/* transformContinueIterable */.YB)(
      objDataQuery,
      (iterator) => iterator.map((data) => new BasicObj(data))
    );
  }
  getBatchSize() {
    return this._batchSize || 100;
  }
  suggest(prefix, options) {
    const { attributes, limit } = basic_obj_search_spreadValues({ attributes: ["*"], limit: 5 }, options);
    return (0,scrivito_sdk_data/* suggest */.ZA)(
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
    const facetQuery = new scrivito_sdk_data/* FacetQuery */.gD(
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
    if (this._offset !== void 0) params.offset = this._offset;
    if (this._orderBy !== void 0) params.orderBy = this._orderBy;
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
      return (0,common/* extractFromIterator */._Q)(this.iterator(), count);
    } finally {
      this._batchSize = oldBatchSize;
    }
  }
  onSite(siteId) {
    return this.and("_siteId", "equals", siteId);
  }
}
function buildSubQuery(fieldInput, operatorInput, valueInput) {
  const field = convertAttribute(fieldInput);
  const operator = convertOperator(operatorInput);
  const value = convertValue(valueInput, operator);
  return { field, operator, value };
}
function assertBoostableOperator(operator) {
  if (!BOOSTABLE_OPERATORS.includes(operator)) {
    throw new common/* ArgumentError */.c1(
      `Boosting operator "${operator}" is invalid. ${explainValidOperators(
        BOOSTABLE_OPERATORS
      )}`
    );
  }
}
function assertNegatableOperator(operator) {
  if (!NEGATABLE_OPERATORS.includes(operator)) {
    throw new common/* ArgumentError */.c1(
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
  if (isDate_default()(value)) return convertDate(value, operator);
  if (value instanceof BasicObj) {
    return value.id();
  }
  return value;
}
function convertDate(value, operator) {
  if (operator !== "is_greater_than" && operator !== "is_less_than") {
    return (0,common/* formatDateToString */.A)(value);
  }
  const roundedDate = roundToNearestMinute(value);
  const isInCurrentDateRange = Math.abs(Date.now() - value.getTime()) < 3e4;
  return (0,common/* formatDateToString */.A)(isInCurrentDateRange ? roundedDate : value);
}
function roundToNearestMinute(value) {
  const oneMinuteInMs = 6e4;
  return new Date(Math.round(value.getTime() / oneMinuteInMs) * oneMinuteInMs);
}
function convertOperator(operator) {
  if (!OPERATORS.includes(operator)) {
    throw new common/* ArgumentError */.c1(
      `Operator "${operator}" is invalid. ${explainValidOperators(OPERATORS)}`
    );
  }
  return (0,common/* underscore */.z9)(operator);
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
  if (!(0,common/* isCamelCase */.Dz)(attributeName)) {
    throw new common/* ArgumentError */.c1(
      `Attribute name "${attributeName}" is not camel case.`
    );
  }
  return (0,common/* underscore */.z9)(attributeName);
}
function normalizeOrderByItem(attribute, direction = "asc") {
  const sortBy = underscoreAttribute(attribute);
  return [sortBy, direction];
}
const VALID_FACET_OPTIONS = ["limit", "includeObjs"];
function assertValidFacetOptions(options) {
  const invalidOptions = Object.keys(options).filter(
    (key) => !VALID_FACET_OPTIONS.includes(key)
  );
  if (invalidOptions.length) {
    throw new common/* ArgumentError */.c1(
      `Invalid facet options: ${(0,common/* prettyPrint */.aO)(
        invalidOptions
      )}. Valid options: ${VALID_FACET_OPTIONS.join()}`
    );
  }
  return options;
}

// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 26 modules
var loadable = __webpack_require__(4772);
// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(1946);
;// CONCATENATED MODULE: ./scrivito_sdk/models/future_binary.ts

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




let binaryHandler;
function setBinaryHandler(handler) {
  binaryHandler = handler;
}
class FutureBinary {
  /** @internal */
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
  /** @internal */
  into(target) {
    checkInto(target);
    (0,state/* failIfFrozen */.q2)("Changing CMS content");
    return this.intoId(target._scrivitoPrivateContent.id());
  }
  /** @internal */
  intoId(targetId) {
    return __async(this, null, function* () {
      if (!binaryHandler) throw new common/* InternalError */.Gd();
      let result;
      if (this.idToCopy) {
        result = yield binaryHandler.copyBinary(
          this.idToCopy,
          targetId,
          this.filename,
          this.contentType
        );
      } else {
        if (!this.source) throw new common/* InternalError */.Gd();
        result = yield binaryHandler.uploadBinary(
          targetId,
          this.source,
          this.filename,
          this.contentType
        );
      }
      return new Binary(result.id, (0,current_workspace_id/* currentObjSpaceId */.eb)());
    });
  }
}
function checkInto(target) {
  if (!isWrappingBasicObj(target)) {
    (0,common/* throwInvalidArgumentsError */.Ht)(
      "FutureBinary#into",
      "'target' must be an instance of 'Obj'.",
      { docPermalink: "js-sdk/FutureBinary-into" }
    );
  }
}
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
  /** @internal */
  constructor(_binaryId, objSpaceId = published_space_publishedSpace()) {
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
    (0,scrivito_sdk_data/* assertNotUsingInMemoryTenant */.C_)("MetadataCollection#get");
    assertCamelCase(key);
    const data = this.getData();
    if (data) {
      const underscoredKey = (0,common/* underscore */.z9)(key);
      if (data.hasOwnProperty(underscoredKey)) return data[underscoredKey];
      return null;
    }
    return null;
  }
  /** @internal */
  keys() {
    const data = this.getData();
    if (data) return Object.keys(data).map(common/* camelCase */.xQ);
    return [];
  }
  /** @internal */
  contentLength() {
    const length = this.get("contentLength");
    if (typeof length !== "number") return 0;
    return length;
  }
  /** @internal */
  contentType() {
    const type = this.get("contentType");
    if (typeof type !== "string") return "";
    return type;
  }
  /**
   * For test purpose only.
   * @internal
   */
  binaryId() {
    return this._binaryId;
  }
  /** @internal */
  getData() {
    if (this.loadableData) {
      const metadata = this.loadableData.get();
      if (metadata) return deserializeMetadata(metadata);
    }
  }
}
function storeMetadataCollection(binaryId, response) {
  deserializeMetadata(response);
  loadableCollection.get(binaryId).set(response);
}
const loadableCollection = (0,loadable/* createLoadableCollection */.rL)({
  name: "metadata",
  loadElement: (id, objSpaceId) => ({
    loader: () => client/* cmsRetrieval */.g2.retrieveBinaryMetadata(id, { accessVia: objSpaceId })
  })
});
function deserializeMetadata(response) {
  const backendMetadata = response.meta_data;
  if (!(0,common/* isObject */.Gv)(backendMetadata)) {
    throw new common/* InternalError */.Gd();
  }
  const metadata = {};
  for (const key of Object.keys(backendMetadata)) {
    const [backendType, backendValue] = backendMetadata[key];
    if (backendValue === null || backendValue === void 0) {
      throw new common/* InternalError */.Gd();
    }
    let value;
    if (backendType === "date" /* Date */) {
      if (typeof backendValue === "string") {
        value = (0,common/* deserializeAsDate */.uS)(backendValue);
      } else {
        throw new common/* InternalError */.Gd();
      }
    } else {
      value = backendValue;
    }
    metadata[key] = value;
  }
  return metadata;
}
function assertCamelCase(key) {
  if (!(0,common/* isCamelCase */.Dz)(key)) {
    throw new common/* ArgumentError */.c1(`Metadata key "${key}" is not in camel case.`);
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









const binary_loadableCollection = (0,loadable/* createLoadableCollection */.rL)({
  name: "binary",
  loadElement: ([binaryId, transformation], objSpaceId) => ({
    loader: () => client/* cmsRetrieval */.g2.retrieveBinaryUrls(binaryId, transformation, {
      accessVia: objSpaceId
    })
  })
});
const PLACEHOLDER_URL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
function storeBinary(binaryId, options, response) {
  const transformation = options.transformation;
  binary_loadableCollection.get([binaryId, transformation]).set(response);
  const raw = new Binary(binaryId, publishedSpace()).raw();
  if (transformation) {
    return raw.optimizeFor(transformation);
  }
  return raw;
}
class Binary {
  /** @internal */
  constructor(_id, _objSpaceId = published_space_publishedSpace(), transformation = {}) {
    this._id = _id;
    this._objSpaceId = _objSpaceId;
    this._transformation = transformation || void 0;
    this._loadableData = binary_loadableCollection.get(
      [this._id, this._transformation],
      this._objSpaceId
    );
  }
  /** @internal */
  static upload(source, options) {
    checkUpload(source, options);
    if (!(0,common/* isFile */.fo)(source)) {
      if (!(options && options.filename)) {
        throw new common/* ArgumentError */.c1(
          "Expected a filename to be passed with Blob as the source."
        );
      }
    }
    return new FutureBinary({ source }, options);
  }
  /** @internal */
  id() {
    return this._id;
  }
  copy(options) {
    return new FutureBinary({ idToCopy: this._id }, options);
  }
  isPrivate() {
    return !(0,common/* equals */.aI)(this._objSpaceId, published_space_publishedSpace());
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
  /** @internal */
  isExplicitlyTransformed() {
    return this.isTransformed() && !isEmpty_default()(this._transformation);
  }
  /** @internal */
  isRaw() {
    return !this.isTransformed();
  }
  url() {
    (0,scrivito_sdk_data/* assertNotUsingInMemoryTenant */.C_)("Binary#url");
    return this.urlWithoutPlaceholder() || PLACEHOLDER_URL;
  }
  /** @internal */
  urlWithoutPlaceholder() {
    const data = this._loadableData.get();
    if (!data) {
      return;
    }
    const accessData = data[this.accessType()];
    if (!accessData) {
      throw new common/* InternalError */.Gd();
    }
    return accessData.get.url;
  }
  filename() {
    const url = this.url();
    if (!url || url.match(/^data:/)) {
      return "";
    }
    return new URL(url, "http://example.com").pathname.split("/").pop() || "";
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
  /** @internal */
  extname() {
    if (this.raw().filename().indexOf(".") > -1) {
      const parts = this.raw().filename().split(/[.\\]+/);
      if (parts.length > 1) return parts[parts.length - 1].toLowerCase();
    }
    return "";
  }
  /** @internal */
  equals(binary) {
    return this.id() === binary.id() && (0,common/* equals */.aI)(this._objSpaceId, binary.objSpaceId()) && isEqual_default()(this.definition(), binary.definition());
  }
  /** @internal */
  isImage() {
    const rawContentType = this.raw().contentType();
    if (rawContentType) {
      return rawContentType.split("/")[0] === "image";
    }
    return false;
  }
  /**
   * For test purpose only.
   * @internal
   */
  definition() {
    return this._transformation || null;
  }
  /** @internal */
  objSpaceId() {
    return this._objSpaceId;
  }
  /** @internal */
  accessType() {
    if (this.isPrivate()) {
      return "private_access";
    }
    return "public_access";
  }
  /** @internal */
  assertNotTransformed(fieldName) {
    if (this.isTransformed()) {
      throw new common/* ScrivitoError */.aS(
        `"${fieldName}" is not available for transformed images. Use "Scrivito.Binary#raw" to access the untransformed version of the image.`
      );
    }
  }
  /** @internal */
  isTransformed() {
    return !!this._transformation;
  }
}
function checkUpload(source, options) {
  if (!((0,common/* isBlob */.qf)(source) || (0,common/* isFile */.fo)(source))) {
    (0,common/* throwInvalidArgumentsError */.Ht)(
      "Binary.upload",
      "'source' must be a 'Blob' or a 'File'.",
      { docPermalink: "js-sdk/Binary-static-upload" }
    );
  }
  if (!["string", "undefined"].includes(typeof (options == null ? void 0 : options.contentType))) {
    (0,common/* throwInvalidArgumentsError */.Ht)(
      "Binary.upload",
      "'options.contentType' must be a 'String'.",
      { docPermalink: "js-sdk/Binary-static-upload" }
    );
  }
  if (!["string", "undefined"].includes(typeof (options == null ? void 0 : options.filename))) {
    (0,common/* throwInvalidArgumentsError */.Ht)(
      "Binary.upload",
      "'options.filename' must be a 'String'.",
      { docPermalink: "js-sdk/Binary-static-upload" }
    );
  }
}

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
var basic_scope_create_methods_async = (__this, __arguments, generator) => {
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
  return basic_scope_create_methods_async(this, null, function* () {
    const maybeId = denormalizeSystemAttributeValue(attributes._id);
    const objId = maybeId || BasicObj.generateId();
    const binary = yield Binary.upload(file).intoId(objId);
    const basicObj = createObjIn(scope, basic_scope_create_methods_spreadProps(basic_scope_create_methods_spreadValues({}, attributes), {
      _id: [objId],
      blob: [binary, ["binary"]]
    }));
    yield basicObj.finishSaving();
    return basicObj;
  });
}
function denormalizeSystemAttributeValue(value) {
  const maybeStringValue = Array.isArray(value) ? value[0] : value;
  return typeof maybeStringValue === "string" ? maybeStringValue : void 0;
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/compute_parent_path.ts

function computeParentPath(path) {
  if (!path || path === "/") return null;
  return path.split("/").slice(0, -1).join("/") || "/";
}

// EXTERNAL MODULE: ./scrivito_sdk/models/current_workspace_id.ts
var current_workspace_id = __webpack_require__(5794);
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
var basic_obj_async = (__this, __arguments, generator) => {
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



















class BasicObjSnapshot {
  constructor(_data) {
    this._data = _data;
  }
}
class BasicObj {
  static get(id) {
    return getObjFrom(currentObjSpaceWithoutDeleted(), id);
  }
  static getIncludingDeleted(id) {
    return getObjFrom(objSpaceScope((0,current_workspace_id/* currentObjSpaceId */.eb)()), id);
  }
  // Accessible for test purposes only (otherwise better inlined)
  static createInObjSpace(objSpaceId, attributes) {
    return createObjIn(objSpaceScope(objSpaceId), attributes);
  }
  static generateId() {
    return (0,common/* randomId */.zE)();
  }
  static all() {
    return new BasicObjSearch((0,current_workspace_id/* currentObjSpaceId */.eb)()).batchSize(1e3);
  }
  static where(fields, operator, value, boost) {
    return new BasicObjSearch((0,current_workspace_id/* currentObjSpaceId */.eb)()).and(
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
  // For test purpose only.
  static generateWidgetId() {
    return (0,common/* randomHex */.nw)();
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
    return (0,common/* parseStringToDate */.Qf)(this.getAttributeData("_created_at"));
  }
  createdBy() {
    return this.getAttributeData("_created_by") || null;
  }
  lastChanged() {
    const data = this.getAttributeData("_last_changed");
    if (!data) return null;
    return (0,common/* parseStringToDate */.Qf)(data);
  }
  lastChangedBy() {
    return this.getAttributeData("_last_changed_by") || null;
  }
  firstPublishedAt() {
    return (0,common/* parseStringToDate */.Qf)(this.getAttributeData("_first_published_at"));
  }
  publishedAt() {
    return (0,common/* parseStringToDate */.Qf)(this.getAttributeData("_published_at"));
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
    if (parentPath === null || siteId === null) return null;
    return basic_obj_getObjByPath(this.objSpaceId(), siteId, parentPath);
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
  dataParam() {
    var _a;
    return (_a = this.getAttributeData("_data_param")) != null ? _a : null;
  }
  get(attributeName, typeInfo) {
    return getContentValue(this, attributeName, typeInfo);
  }
  getValueOrConnection(attributeName, typeInfo) {
    return getContentValueOrConnection(this, attributeName, typeInfo);
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
    return this.sortByChildOrder(this.children());
  }
  sortByChildOrder(objs) {
    if (objs.length === 0) return [];
    const idsOrder = this.childOrder().map((reference) => reference.id());
    return objs.map((child) => {
      const index = idsOrder.indexOf(child.id());
      return [index === -1 ? objs.length : index, child];
    }).sort(([a], [b]) => a - b).map(([, child]) => child);
  }
  hasChildOrder() {
    return this.childOrder().length > 0;
  }
  backlinks() {
    return objSpaceScopeExcludingDeleted(this.objSpaceId()).search().and("*", "linksTo", this).dangerouslyUnboundedTake();
  }
  ancestors() {
    const parentPath = this.parentPath();
    const siteId = this.siteId();
    if (parentPath === null || siteId === null) return [];
    return (0,common/* computeAncestorPaths */.FQ)(parentPath).map(
      (ancestorPath) => basic_obj_getObjByPath(this.objSpaceId(), siteId, ancestorPath)
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
    if ((0,current_workspace_id/* isCurrentWorkspacePublished */.bW)() && !(0,scrivito_sdk_data/* isUsingInMemoryTenant */.xX)()) {
      throw new common/* ScrivitoError */.aS("The published content cannot be modified.");
    }
    (0,state/* withBatchedUpdates */.I7)(() => {
      persistWidgets(this, attributes);
      const patch = serialize(attributes);
      this.objData.update(patch);
    });
    this.startLinkResolution();
  }
  delete() {
    this.update({ _markedDeleted: [true] });
  }
  insertWidget(widget, anchor) {
    const id = widgetIdFromWidgetInsertionAnchor(anchor);
    const placement = this.widgetPlacementFor(id);
    if (placement) {
      const { attributeValue, attributeName, container, index } = placement;
      if (!Array.isArray(attributeValue)) throw new common/* InternalError */.Gd();
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
  deleteWidget(widget) {
    const widgetOrWidgetlistField = this.fieldContainingWidget(widget);
    if (!widgetOrWidgetlistField) return;
    if (widgetOrWidgetlistField.type() === "widgetlist") {
      const widgetlistField = widgetOrWidgetlistField;
      const value = widgetlistField.get();
      const newValue = value.filter((curWidget) => !curWidget.equals(widget));
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
    return basic_obj_async(this, null, function* () {
      yield this.finishLinkResolution();
      return this.objData.finishSaving();
    });
  }
  equals(other) {
    return other instanceof BasicObj && this.id() === other.id() && (0,common/* equals */.aI)(this.objSpaceId(), other.objSpaceId());
  }
  widget(id) {
    if (!this.getWidgetAttribute(id, "_obj_class")) return null;
    return BasicWidget.build(id, this);
  }
  getWidgetAttribute(id, attributeName) {
    return this.objData.getWidgetAttribute(id, attributeName);
  }
  widgets() {
    const data = this.objData.getIfExistent();
    if (!data) return [];
    const widgetPool = data._widget_pool;
    if (!widgetPool) return [];
    const widgets = [];
    const visitedWidgetIds = {};
    this.collectWidgets(widgets, data, widgetPool, visitedWidgetIds);
    return widgets;
  }
  widgetClassNamesWithBadPerformance() {
    const widgetPool = this.objData.getWidgetPoolWithBadPerformance();
    if (!widgetPool) return [];
    const classNames = new Set(
      Object.values(widgetPool).filter((value) => !!value).map((widgetJson) => widgetJson._obj_class)
    );
    return Array.from(classNames);
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
      if (!this.widget(id)) return id;
    }
    throw new common/* InternalError */.Gd();
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
    return (0,slugify_.slugify)(title);
  }
  getWidgetData(id) {
    return this.objData.getWidget(id);
  }
  startLinkResolution() {
    if (!(0,scrivito_sdk_data/* isUsingInMemoryTenant */.xX)()) {
      (0,link_resolution/* startLinkResolutionFor */.AF)((0,current_workspace_id/* currentObjSpaceId */.eb)(), this.id());
    }
  }
  finishLinkResolution() {
    return (0,link_resolution/* finishLinkResolutionFor */.HQ)((0,current_workspace_id/* currentObjSpaceId */.eb)(), this.id());
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
  createSnapshot() {
    return new BasicObjSnapshot(this.objData.getOrThrow());
  }
  revertTo(snapshot) {
    this.objData.set(snapshot._data);
  }
  blob() {
    return this.get("blob", ["binary"]);
  }
  collectWidgets(memo, objOrWidgetData, widgetPool, visitedWidgetIds) {
    Object.keys(objOrWidgetData).map((attributeName) => {
      const attrDictValue = objOrWidgetData[attributeName];
      if (!attrDictValue) return;
      if ((0,common/* isSystemAttribute */.iI)(attributeName)) return;
      const attributeJson = attrDictValue;
      if ((0,client/* isWidgetlistAttributeJson */.zt)(attributeJson)) return attributeJson[1];
    }).forEach((widgetIds) => {
      if (widgetIds) {
        widgetIds.forEach((widgetId) => {
          if (visitedWidgetIds[widgetId]) return;
          visitedWidgetIds[widgetId] = true;
          const widget = this.widget(widgetId);
          if (!widget) return;
          memo.push(widget);
          const widgetData = widgetPool[widgetId];
          this.collectWidgets(memo, widgetData, widgetPool, visitedWidgetIds);
        });
      }
    });
  }
  widgetPlacementFor(widgetId) {
    const data = this.objData.getIfExistent();
    if (!data) return;
    const placement = (0,scrivito_sdk_data/* findWidgetPlacement */.fT)(data, widgetId);
    if (!placement) return;
    const attributeName = (0,common/* camelCase */.xQ)(placement.attributeName);
    const { attributeType, index, parentWidgetId } = placement;
    let container;
    if (parentWidgetId) {
      container = this.widget(parentWidgetId);
      if (!container) return;
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
  childOrder() {
    return this.get("childOrder", "referencelist");
  }
  getChildrenSearch() {
    const path = this.path();
    const siteId = this.siteId();
    if (!path || siteId === null) return;
    return objSpaceScopeExcludingDeleted(this.objSpaceId()).search().andIsChildOf(this);
  }
}
function widgetIdFromWidgetInsertionAnchor(anchor) {
  if (isWidgetInsertionBefore(anchor)) return anchor.before.id();
  return anchor.after.id();
}
function isWidgetInsertionBefore(anchor) {
  return !!anchor.before;
}
function currentObjSpaceWithoutDeleted() {
  return objSpaceScopeExcludingDeleted((0,current_workspace_id/* currentObjSpaceId */.eb)());
}
function basic_obj_getObjByPath(objSpaceId, siteId, path) {
  return getObjBy(
    objSpaceScopeExcludingDeleted(objSpaceId).and(restrictToSite(siteId)),
    "_path",
    path
  );
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
    if (!objId) return null;
    const scope = objSpaceScopeExcludingDeleted((0,current_workspace_id/* currentObjSpaceId */.eb)());
    return getObjIncludingUnavailableFrom(scope, objId);
  }
  queryParameters() {
    const params = new URLSearchParams(this.query() || "");
    const result = {};
    for (const [key, value] of params.entries()) result[key] = value || null;
    return result;
  }
  isExternal() {
    return !!this.url();
  }
  isInternal() {
    return !this.isExternal();
  }
  equals(otherLink) {
    return otherLink instanceof BasicLink && isEqual_default()(
      otherLink.attributesForComparison(),
      this.attributesForComparison()
    );
  }
  copy(attributes = {}) {
    const newAttributes = basic_link_spreadValues(basic_link_spreadValues({}, this.attributes), attributes);
    if (attributes.objId && attributes.url) {
      throw new common/* ArgumentError */.c1(
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
  /** Destination is to be read with a public API perspective in mind:
   * returns false for an internal link pointing to a forbidden obj
   */
  hasDestination() {
    return this.isExternal() || this.obj() instanceof BasicObj;
  }
  toPrettyPrint() {
    var _a;
    const objId = this.objId();
    return objId ? `[object Link objId="${objId}"]` : `[object Link url="${(_a = this.url()) != null ? _a : "<empty>"}"]`;
  }
  attributesForComparison() {
    return Object.fromEntries(
      Object.entries(this.attributes).filter(
        ([, attribute]) => attribute !== null && attribute !== void 0
      )
    );
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/data_locator.ts

var data_locator_defProp = Object.defineProperty;
var data_locator_getOwnPropSymbols = Object.getOwnPropertySymbols;
var data_locator_hasOwnProp = Object.prototype.hasOwnProperty;
var data_locator_propIsEnum = Object.prototype.propertyIsEnumerable;
var data_locator_defNormalProp = (obj, key, value) => key in obj ? data_locator_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var data_locator_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (data_locator_hasOwnProp.call(b, prop))
      data_locator_defNormalProp(a, prop, b[prop]);
  if (data_locator_getOwnPropSymbols)
    for (var prop of data_locator_getOwnPropSymbols(b)) {
      if (data_locator_propIsEnum.call(b, prop))
        data_locator_defNormalProp(a, prop, b[prop]);
    }
  return a;
};


class DataLocator {
  /** @internal */
  constructor(params) {
    this._class = params.class;
    this._field = params.field;
    this._viaRef = params.via_ref;
    this._query = params.query;
    this._order_by = params.order_by;
    this._size = params.size;
  }
  /** @internal */
  class() {
    return this._class;
  }
  /** @internal */
  field() {
    return this._field;
  }
  /** @internal */
  viaRef() {
    const viaRef = this._viaRef;
    if (typeof viaRef === "boolean") return "multi";
    return viaRef;
  }
  /** @internal */
  query() {
    if (this._query) return [...this._query];
  }
  /** @internal */
  orderBy() {
    if (this._order_by) return [...this._order_by];
  }
  /** @internal */
  size() {
    return this._size;
  }
  /** @internal */
  toPojo() {
    if (this._class === null) return null;
    return data_locator_spreadValues(data_locator_spreadValues(data_locator_spreadValues(data_locator_spreadValues(data_locator_spreadValues({
      class: this._class
    }, this._field && { field: this._field }), this.query() && { query: this.query() }), this.orderBy() && { order_by: this.orderBy() }), this._size !== void 0 && { size: this._size }), this._viaRef && { via_ref: this._viaRef });
  }
}
function isDataLocatorValueViaFilter(filter) {
  return (0,common/* isObject */.Gv)(filter) && typeof filter.field === "string" && isDataLocatorValueVia(filter.value_via);
}
function isDataLocatorValueVia(valueVia) {
  return (0,common/* isObject */.Gv)(valueVia) && typeof valueVia.class === "string" && typeof valueVia.field === "string";
}
function isDataLocatorValueOrOperatorFilter(filter) {
  return isDataLocatorValueFilter(filter) || isDataLocatorOperatorFilter(filter);
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/attribute_serializer.ts










function serialize(attributes) {
  const serializedAttributes = {};
  Object.keys(attributes).forEach((name) => {
    const serializedName = convertCamelCasedAttributeName(name);
    if ((0,common/* isSystemAttribute */.iI)(serializedName)) {
      const [value] = attributes[name];
      serializedAttributes[serializedName] = value;
    } else {
      const [value, typeInfo] = attributes[name];
      if (value !== void 0) {
        serializedAttributes[serializedName] = serializeAttributeEntry(
          value,
          name,
          typeInfo
        );
      }
    }
  });
  return serializedAttributes;
}
function serializeAttributeEntry(value, name, typeInfo) {
  if (value === null) return null;
  const serializedEntry = serializeEntry(value, name, typeInfo);
  if ((0,common/* isEmptyValue */.Po)(serializedEntry[1])) return null;
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
      throw new common/* ArgumentError */.c1(
        `Attribute "${name}" is of unsupported type "${typeInfo[0]}".`
      );
  }
}
function throwInvalidAttributeValue(value, name, expected) {
  throw new common/* ArgumentError */.c1(
    `Unexpected value ${(0,common/* prettyPrint */.aO)(value)} for attribute "${name}". Expected: ${expected}`
  );
}
function serializeBinaryAttributeValue(value, name) {
  if (value instanceof Binary) return { id: value.id() };
  throwInvalidAttributeValue(value, name, "A Binary.");
}
function serializeBooleanAttributeValue(value, name) {
  if (value === false || value === true) return value;
  throwInvalidAttributeValue(value, name, "A Boolean.");
}
function serializeDataLocatorAttributeValue(value, name) {
  if (value instanceof DataLocator) return value.toPojo();
  throwInvalidAttributeValue(value, name, "A DataLocator.");
}
function serializeDateAttributeValue(value, name) {
  if (isDate_default()(value)) return (0,common/* formatDateToString */.A)(value);
  if ((0,common/* isValidDateString */.Qr)(value)) return value;
  throwInvalidAttributeValue(value, name, "A Date.");
}
function serializeEnumAttributeValue(value, name, { values }) {
  if (values.includes(value)) return value;
  const e = `Valid attribute values are contained in its "values" array [${values.join()}].`;
  throwInvalidAttributeValue(value, name, e);
}
function serializeFloatAttributeValue(value, name) {
  if ((0,common/* isValidFloat */.Rq)(value)) return value;
  let invalidValue = value;
  if (typeof value === "number") {
    invalidValue = String(value);
  }
  throwInvalidAttributeValue(
    invalidValue,
    name,
    "A Number, that is #isFinite()."
  );
}
function serializeHtmlAttributeValue(value, name) {
  if (typeof value === "string") return value;
  throwInvalidAttributeValue(value, name, "A String.");
}
function serializeIntegerAttributeValue(value, name) {
  if ((0,common/* isValidInteger */.zh)(value)) return value;
  throwInvalidAttributeValue(
    value,
    name,
    "A Number, that is #isSafeInteger()."
  );
}
function serializeLinkAttributeValue(value, name) {
  if (isValidLinkInputValue(value)) return convertLinkToCmsApi(value);
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
  if (!(0,common/* isStringArray */.Bo)(value)) {
    throwInvalidAttributeValue(
      value,
      name,
      `An array with values from ${(0,common/* prettyPrint */.aO)(values)}.`
    );
  }
  const allowedValues = new Set(values);
  const forbiddenValues = value.filter((v) => !allowedValues.has(v));
  if (forbiddenValues.length) {
    throwInvalidAttributeValue(
      value,
      name,
      `An array with values from ${(0,common/* prettyPrint */.aO)(
        values
      )}. Forbidden values: ${(0,common/* prettyPrint */.aO)(forbiddenValues)}.`
    );
  }
  return value;
}
function serializeReferenceAttributeValue(value, name) {
  if (isValidReference(value)) return serializeSingleReferenceValue(value);
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
  return typeof value === "string" || value instanceof BasicObj || value instanceof ObjUnavailable;
}
function isValidReferencelistValue(value) {
  return Array.isArray(value) && value.every((v) => isValidReference(v));
}
function serializeStringAttributeValue(value, name) {
  if (isValidString(value)) return value.toString();
  throwInvalidAttributeValue(value, name, "A String.");
}
function serializeStringlistAttributeValue(value, name) {
  if (isStringOrNumberArray(value)) {
    return value.map((v) => v.toString());
  }
  throwInvalidAttributeValue(value, name, "An array of strings.");
}
function isValidString(value) {
  return typeof value === "string" || typeof value === "number";
}
function serializeWidgetAttributeValue(value, name) {
  if (value instanceof BasicWidget) return value.id();
  throwInvalidAttributeValue(value, name, "An instance of Widget.");
}
function serializeWidgetlistAttributeValue(value, name) {
  if (value instanceof BasicWidget) {
    return serializeWidgetlistAttributeValue([value], name);
  }
  if (isBasicWidgetArray(value)) return value.map((v) => v.id());
  throwInvalidAttributeValue(value, name, "An array of Widget instances.");
}
function isBasicWidgetArray(value) {
  return Array.isArray(value) && value.every((v) => v instanceof BasicWidget);
}
function isStringOrNumberArray(value) {
  return Array.isArray(value) && value.every((v) => isValidString(v));
}
function isValidLinkInputValue(value) {
  if (value instanceof BasicLink) return !value.isEmpty();
  if (!(0,common/* isObject */.Gv)(value)) return false;
  if (isEmpty_default()(Object.values(value).filter(Boolean))) return false;
  return Object.keys(value).every((key) => LINK_ATTRIBUTES.includes(key));
}
const LINK_ATTRIBUTES = [
  "hash",
  "obj_id",
  "query",
  "rel",
  "target",
  "title",
  "url"
];
function convertCamelCasedAttributeName(name) {
  if (!(0,common/* isCamelCase */.Dz)(name)) {
    throw new common/* ArgumentError */.c1("Attribute names have to be in camel case.");
  }
  return (0,common/* underscore */.z9)(name);
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
    // lowercased property method
    obj_id: basicLink.objId(),
    // different property method
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
    // different property key
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
        throw new common/* ArgumentError */.c1(
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
          const attrName = (0,common/* camelCase */.xQ)(name);
          unserializedAttributes[attrName] = [newWidget, ["widget"]];
          return;
        }
        if (type === "widgetlist") {
          const widgetData = maybeWidgetData;
          const newWidgets = widgetData.map((serializedWidget) => {
            return BasicWidget.newWithSerializedAttributes(serializedWidget);
          });
          const attrName = (0,common/* camelCase */.xQ)(name);
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
    return (0,scrivito_sdk_data/* getWidgetModification */.Fh)(from, to, this.obj().id(), this.id());
  }
  get(attributeName, typeInfo) {
    return getContentValue(this, attributeName, typeInfo);
  }
  getValueOrConnection(attributeName, typeInfo) {
    return getContentValueOrConnection(this, attributeName, typeInfo);
  }
  container() {
    (0,scrivito_sdk_data/* failIfPerformanceConstraint */.HI)(
      "for performance reasons, avoid this method when rendering"
    );
    const containingField = this.containingField();
    return containingField ? containingField.getContainer() : this.obj();
  }
  update(attributes) {
    const normalizedAttributes = normalizeAttributes(attributes);
    this.updateWithUnknownValues(normalizedAttributes);
  }
  updateWithUnknownValues(attributes) {
    (0,state/* withBatchedUpdates */.I7)(() => {
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
  delete() {
    this.obj().deleteWidget(this);
  }
  copy() {
    if (this.isPersisted()) {
      return this.copyPersisted();
    }
    return this.copyUnpersisted();
  }
  persistInObjIfNecessary(obj) {
    if (this.isPersisted()) return;
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
      throw new common/* ScrivitoError */.aS(
        'Cannot call "onDidPersist" of an already persisted widget'
      );
    }
    this.onDidPersistCallback = callback;
  }
  // For test purpose only.
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
  // For test purpose only.
  getAttributesToBeSaved() {
    return this.attributesToBeSaved;
  }
  failIfNotPersisted() {
    if (!this.isPersisted()) {
      throw new common/* ScrivitoError */.aS(
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
      mapValues_default()(this.attributesToBeSaved, copyNormalizedValue)
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
  if (!value) return false;
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
    (0,common/* underscore */.z9)(attributeName),
    typeInfo
  );
}
function getContentValueUsingInternalName(content, internalAttributeName, typeInfo) {
  const rawValue = content.getAttributeData(internalAttributeName, typeInfo[0]);
  return deserialize(content, rawValue, typeInfo);
}
function getContentValueOrConnection(content, attributeName, typeInfo) {
  const internalAttributeName = (0,common/* underscore */.z9)(attributeName);
  const attributeData = content.getAttributeData(internalAttributeName);
  return Array.isArray(attributeData) && attributeData[0] === "datalocator" ? ["connection", getContentValue(content, attributeName, "datalocator")] : ["value", getContentValue(content, attributeName, typeInfo)];
}
function isContentConnection(valueOrConnection) {
  return valueOrConnection[0] === "connection";
}
function serializeAttributes(content) {
  return mapValues_default()(content.getData(), (value, name) => {
    if (value && !(0,common/* isSystemAttribute */.iI)(name) && typeof value === "object") {
      if ((0,client/* isWidgetAttributeJson */.Xj)(value)) {
        const widget = getContentValueUsingInternalName(content, name, [
          "widget"
        ]);
        return ["widget", widget ? serializeAttributes(widget) : null];
      }
      if ((0,client/* isWidgetlistAttributeJson */.zt)(value)) {
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
  if (valueAndType.length < 2) return false;
  const [value, typeInfo] = valueAndType;
  const [type] = typeInfo;
  if (type !== "widget") return false;
  return value instanceof BasicWidget;
}
function isWidgetlistAttributeValueAndType(valueAndType) {
  if (valueAndType.length < 2) return false;
  const [value, typeInfo] = valueAndType;
  const [type] = typeInfo;
  if (type !== "widgetlist") return false;
  if (value instanceof BasicWidget) return true;
  if (!Array.isArray(value)) return false;
  return value.every((entry) => entry instanceof BasicWidget);
}
function normalizeAttributes(attributes) {
  return mapValues_default()(attributes, (attributeValue, name) => {
    if ((0,common/* isSystemAttribute */.iI)(name)) {
      if (Array.isArray(attributeValue)) return attributeValue;
      return [attributeValue];
    }
    if (!Array.isArray(attributeValue)) {
      throw new common/* InternalError */.Gd();
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
    throw new common/* InternalError */.Gd();
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
var update_references_async = (__this, __arguments, generator) => {
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
      newId = (0,loadable/* loadableWithDefault */.s4)(void 0, () => unsafeMapping(currentId));
    } catch (error) {
      (0,common/* throwNextTick */.JL)(error);
    }
    if (newId !== void 0) {
      if (typeof newId !== "string") {
        (0,common/* throwNextTick */.JL)(
          new common/* ScrivitoError */.aS(
            `Unexpected result from mapping function passed to updateReferences (must be string or undefined): ${String(
              newId
            )}`
          )
        );
      } else if (!newId.match(/^[a-f0-9]{16}$/)) {
        (0,common/* throwNextTick */.JL)(
          new common/* ScrivitoError */.aS(
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
  return update_references_async(this, null, function* () {
    const objJson = yield (0,loadable/* load */.Hh)(() => obj.getData());
    if (!objJson) return;
    const workers = getWorkers(objJson, obj, mapping);
    if (!workers.length) return;
    yield Promise.all(workers);
  });
}
function getWorkers(objJson, obj, fn) {
  const workers = [];
  (0,client/* withEachAttributeJson */.Yy)(objJson, (jsonToUpdate, attributeName, widgetId) => {
    const convert = getConversion(jsonToUpdate);
    if (!convert) return;
    const worker = (() => update_references_async(null, null, function* () {
      const newJson = yield (0,loadable/* load */.Hh)(() => convert(jsonToUpdate, fn));
      const currentJson = widgetId ? obj.getWidgetAttribute(widgetId, attributeName) : obj.getAttributeData(attributeName);
      if (!(0,common/* equals */.aI)(currentJson, jsonToUpdate)) return;
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
    }))();
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
      link_resolution/* OBJ_ID_PATTERN */.lx,
      (internalLinkUrl) => `objid:${mapping(internalLinkUrl.slice(6, 22))}`
    )
  ];
}
function convertLink(attributeJson, mapping) {
  const linkJson = attributeJson[1];
  const { obj_id } = linkJson;
  if (!obj_id) return attributeJson;
  return ["link", update_references_spreadProps(update_references_spreadValues({}, linkJson), { obj_id: mapping(obj_id) })];
}
function convertLinklist(attributeJson, mapping) {
  return [
    "linklist",
    attributeJson[1].map((linkJson) => {
      const { obj_id } = linkJson;
      if (!obj_id) return linkJson;
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
    if ((0,current_workspace_id/* isCurrentWorkspacePublished */.bW)()) {
      throw new common/* ScrivitoError */.aS("The published content cannot be modified.");
    }
    (0,state/* failIfFrozen */.q2)("Changing CMS content");
    if (!copyObjHandler) throw new common/* InternalError */.Gd();
    const toObjSpaceId = (0,current_workspace_id/* currentObjSpaceId */.eb)();
    const newObjId = yield copyObjHandler.copyObj({
      fromObjId: fromObj.id(),
      fromObjSpaceId: fromObj.objSpaceId(),
      toObjSpaceId
    });
    const newObj = yield (0,loadable/* load */.Hh)(
      () => getObjFrom(objSpaceScope(toObjSpaceId), newObjId)
    );
    if (!newObj) throw new common/* InternalError */.Gd();
    return newObj;
  });
}

// EXTERNAL MODULE: ./scrivito_sdk/models/obj_space_for.ts
var obj_space_for = __webpack_require__(7763);
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



function getPlacementModificationInfos(field, comparisonRange, containerPlacementModification) {
  const widgets = field.get();
  if (containerPlacementModification === "deleted") {
    return toBlankPlacementModifications(widgets);
  }
  const diff = field.getDiff(comparisonRange);
  if (!(0,scrivito_sdk_data/* isWidgetlistDiff */.M_)(diff) || !diff.content) {
    return toBlankPlacementModifications(widgets);
  }
  const infos = [];
  diff.content.forEach(([widgetlistModification, widgetId]) => {
    const info = getPlacementModificationInfo(
      field,
      comparisonRange,
      widgetlistModification,
      widgetId
    );
    if (info) infos.push(info);
  });
  return infos;
}
function toBlankPlacementModifications(widgets) {
  return widgets.map((widget) => ({ widget, modification: null }));
}
function getPlacementModificationInfo(field, comparisonRange, widgetlistModification, widgetId) {
  if (widgetlistModification === "-") {
    const vanishedWidget = getVanishedWidget(
      comparisonRange,
      field.obj().id(),
      widgetId
    );
    if (!vanishedWidget) return null;
    const vanishedModification = field.getContainer() instanceof BasicWidget && field.getContainer().modification(comparisonRange) === "deleted" ? null : "deleted";
    return { modification: vanishedModification, widget: vanishedWidget };
  }
  const widget = field.get().find((w) => w.id() === widgetId);
  if (!widget) return null;
  const modification = widgetlistModification === "=" ? null : "new";
  return { modification, widget };
}
function getVanishedWidget([from], objId, widgetId) {
  const fromObj = getObjFrom(objSpaceScopeExcludingDeleted(from), objId);
  return fromObj == null ? void 0 : fromObj.widget(widgetId);
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/content_versions.ts



function versionsOnAllSites(obj) {
  const contentId = obj.contentId();
  if (!contentId) return [];
  return versionScope(obj).search().dangerouslyUnboundedTake();
}
function versionOnSite(obj, siteId) {
  const contentId = obj.contentId();
  if (!contentId) return null;
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
  /** @internal */
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

;// CONCATENATED MODULE: ./scrivito_sdk/models/get_details_page_for_data_param.ts


function getDetailsPageForDataParam(dataParam, siteId) {
  return objSpaceScopeExcludingDeleted((0,current_workspace_id/* currentObjSpaceId */.eb)()).search().and("_dataParam", "equals", dataParam).and("_siteId", "equals", siteId).first();
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/data_identifier.ts


function isValidDataIdentifier(key) {
  return (key === "_id" || !!key.match(/^[a-z]([a-z0-9]|_(?!_)){0,49}$/i)) && key.slice(-1) !== "_";
}
function assertValidDataIdentifier(key) {
  if (!isValidDataIdentifier(key)) {
    throw new common/* ArgumentError */.c1(`Invalid data identifier "${key}"`);
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/is_wrapping_basic_content.ts





function isWrappingBasicContent(subject) {
  return isWrappingBasicObj(subject) || isWrappingBasicWidget(subject);
}
function isWrappingBasicObj(subject) {
  return (0,common/* isWrapping */.zB)(subject, BasicObj);
}
function isWrappingBasicWidget(subject) {
  return (0,common/* isWrapping */.zB)(subject, BasicWidget);
}
function isWrappingBasicLink(subject) {
  return (0,common/* isWrapping */.zB)(subject, BasicLink);
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/comparison_from_published.ts



function comparisonFromPublished() {
  return [published_space_publishedSpace(), (0,current_workspace_id/* currentObjSpaceId */.eb)()];
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/published_space.ts


function published_space_publishedSpace() {
  return (0,obj_space_for/* objSpaceFor */.v)("published");
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/index.ts










































/***/ }),

/***/ 7763:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   v: () => (/* binding */ objSpaceFor)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4665);


function objSpaceFor(idOrType, id) {
  if (!id) return ["workspace", idOrType];
  if (idOrType === "workspace" || idOrType === "revision") {
    return [idOrType, id];
  }
  throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .InternalError */ .Gd();
}


/***/ }),

/***/ 5649:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B$: () => (/* binding */ registerComponentForId),
/* harmony export */   Ey: () => (/* binding */ getDataErrorComponent),
/* harmony export */   Jo: () => (/* binding */ registerDataErrorComponent),
/* harmony export */   Jr: () => (/* binding */ registerComponentForAppClass),
/* harmony export */   K8: () => (/* binding */ getComponentForId),
/* harmony export */   X5: () => (/* binding */ registerLayoutComponentForAppClass),
/* harmony export */   cb: () => (/* binding */ getComponentForAppClass),
/* harmony export */   oC: () => (/* binding */ getLayoutComponentForAppClass),
/* harmony export */   tc: () => (/* binding */ hasLayoutComponents)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4665);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1946);



const registry = /* @__PURE__ */ new Map();
const componentsChangesCounterState = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__/* .createStateContainer */ .Ld)();
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
const layoutsChangesCounterState = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__/* .createStateContainer */ .Ld)();
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
  if (!hasLayoutComponentsState.get()) {
    hasLayoutComponentsState.set(true);
  }
}
const hasLayoutComponentsState = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__/* .createStateContainer */ .Ld)();
function hasLayoutComponents() {
  var _a;
  return (_a = hasLayoutComponentsState.get()) != null ? _a : false;
}
function getLayoutChangesCounterState(className) {
  return layoutsChangesCounterState.subState(className);
}
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .onReset */ .Nj)(() => {
  registry.clear();
  layoutRegistry.clear();
});


/***/ }),

/***/ 843:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ AutomaticDataContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(629);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_react_data_context_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4686);
/* harmony import */ var scrivito_sdk_react_hooks_use_data_locator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3726);
/* harmony import */ var scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3602);





const AutomaticDataContext = (0,scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_3__/* .connect */ .Ng)(function AutomaticDataContext2({
  content,
  children
}) {
  const data = content.get("data", "datalocator");
  const dataScope = (0,scrivito_sdk_react_hooks_use_data_locator__WEBPACK_IMPORTED_MODULE_2__/* .useDataLocator */ .u)(data);
  if (data.class() === null) return children;
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(scrivito_sdk_react_data_context_container__WEBPACK_IMPORTED_MODULE_1__/* .PushOntoDataStack */ .NN, { data: dataScope }, children);
});


/***/ }),

/***/ 92:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ WidgetTagContext),
/* harmony export */   i: () => (/* binding */ WidgetContent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(629);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_editing_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1616);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4665);
/* harmony import */ var scrivito_sdk_react_component_registry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5649);
/* harmony import */ var scrivito_sdk_react_components_automatic_data_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(843);
/* harmony import */ var scrivito_sdk_react_components_widget_tag__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2934);
/* harmony import */ var scrivito_sdk_react_connect_and_memoize__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6031);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7461);

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








const WidgetContent = (0,scrivito_sdk_react_connect_and_memoize__WEBPACK_IMPORTED_MODULE_6__/* .connectAndMemoize */ .M)(function WidgetContent2({
  fieldType,
  placementModification,
  widget,
  widgetProps
}) {
  const widgetClass = widget.objClass();
  const widgetComponent = (0,scrivito_sdk_react_component_registry__WEBPACK_IMPORTED_MODULE_3__/* .getComponentForAppClass */ .cb)(
    widgetClass
  );
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    WidgetTagContext.Provider,
    {
      value: { widget, placementModification, fieldType }
    },
    /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      WidgetContentErrorBoundary,
      {
        widget,
        widgetClass,
        widgetComponent,
        widgetProps
      }
    )
  );
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
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .throwNextTick */ .JL)(e);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.widgetComponent !== this.props.widgetComponent) {
      this.setState({ hasError: false });
    }
  }
  render() {
    if (this.state.hasError) {
      if ((0,scrivito_sdk_app_support_editing_context__WEBPACK_IMPORTED_MODULE_1__/* .isInPlaceEditingActive */ .HD)()) {
        return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(scrivito_sdk_react_components_widget_tag__WEBPACK_IMPORTED_MODULE_5__/* .WidgetTag */ .z, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "content_error" }, "Widget could not be rendered due to application error."));
      }
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(scrivito_sdk_react_components_widget_tag__WEBPACK_IMPORTED_MODULE_5__/* .WidgetTag */ .z, null);
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
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .ArgumentError */ .c1(
      `No component registered for widget class "${widgetClass}"`
    );
  }
  if (widgetProps == null ? void 0 : widgetProps.hasOwnProperty("widget")) {
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .throwNextTick */ .JL)(
      new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .ArgumentError */ .c1('The prop "widget" is not allowed inside "widgetProps"')
    );
  }
  const widgetComponentProps = __spreadProps(__spreadValues({}, widgetProps), {
    widget: (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_7__/* .wrapInAppClass */ .Dy)(widget)
  });
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(scrivito_sdk_react_components_automatic_data_context__WEBPACK_IMPORTED_MODULE_4__/* .AutomaticDataContext */ .T, { content: widget }, react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    widgetComponent,
    widgetComponentProps
  ));
}
const WidgetTagContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext({});


/***/ }),

/***/ 7049:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ useCurrentEditableArea),
/* harmony export */   Z: () => (/* binding */ CurrentEditableArea)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(629);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_editing_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1616);
/* harmony import */ var scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3602);




const Context = react__WEBPACK_IMPORTED_MODULE_0__.createContext("outermostLayout");
const CurrentEditableArea = (0,scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_2__/* .connect */ .Ng)(function CurrentEditableArea2({
  value,
  children
}) {
  if ((0,scrivito_sdk_app_support_editing_context__WEBPACK_IMPORTED_MODULE_1__/* .isInPlaceEditingActive */ .HD)()) {
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Context.Provider, { value: typeof value === "function" ? value() : value }, children);
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, children);
});
function useCurrentEditableArea() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(Context);
}


/***/ }),

/***/ 2934:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ WidgetTag)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(629);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_import_from__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5606);
/* harmony import */ var scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3602);

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



const WidgetTag = (0,scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_2__/* .connect */ .Ng)(
  function WidgetTag2(props) {
    const _a = props, { tag: Tag = "div" } = _a, otherProps = __objRest(_a, ["tag"]);
    const WidgetTagWithEditing = (0,scrivito_sdk_import_from__WEBPACK_IMPORTED_MODULE_1__/* .importFrom */ .eW)(
      "reactEditing",
      "WidgetTagWithEditing"
    );
    if (!WidgetTagWithEditing) return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Tag, __spreadValues({}, otherProps));
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(WidgetTagWithEditing, __spreadValues({ tag: Tag }, otherProps));
  }
);


/***/ }),

/***/ 6031:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ connectAndMemoize)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_react_memo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9576);
/* harmony import */ var scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3602);



function connectAndMemoize(component, options) {
  const connectedComponent = (0,scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_1__/* .connect */ .Ng)(component, options);
  if ((0,scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_1__/* .isClassComponent */ .Gf)(connectedComponent)) return connectedComponent;
  const memoizedComponent = (0,scrivito_sdk_react_memo__WEBPACK_IMPORTED_MODULE_0__/* .memo */ .p)(connectedComponent);
  memoizedComponent.displayName = (0,scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_1__/* .displayNameFromComponent */ .NY)(connectedComponent);
  return memoizedComponent;
}


/***/ }),

/***/ 4686:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CW: () => (/* binding */ useDataStack),
/* harmony export */   NN: () => (/* binding */ PushOntoDataStack),
/* harmony export */   OF: () => (/* binding */ usePlaceholders),
/* harmony export */   OW: () => (/* binding */ useClosestSingleItemElement),
/* harmony export */   Xu: () => (/* binding */ useDataStackOrThrow),
/* harmony export */   _W: () => (/* binding */ useLastDataStackElement),
/* harmony export */   iH: () => (/* binding */ useDataContextContainer),
/* harmony export */   sT: () => (/* binding */ ProvidePlaceholders),
/* harmony export */   t0: () => (/* binding */ useClosestMultiItemElement)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(629);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4665);
/* harmony import */ var scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2836);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8927);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7461);

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





const DataStackReactContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(void 0);
function useDataContextContainer() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataStackReactContext);
}
function usePlaceholders() {
  var _a;
  return (_a = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataStackReactContext)) == null ? void 0 : _a.placeholders;
}
function useDataStack() {
  var _a;
  return (_a = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataStackReactContext)) == null ? void 0 : _a.dataStack;
}
function useDataStackOrThrow() {
  var _a;
  const dataStack = (_a = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataStackReactContext)) == null ? void 0 : _a.dataStack;
  if (!dataStack) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .ArgumentError */ .c1(
      "Missing data context: Please use this hook inside a Scrivito application."
    );
  }
  return dataStack;
}
function useLastDataStackElement() {
  var _a;
  const dataStack = (_a = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataStackReactContext)) == null ? void 0 : _a.dataStack;
  return dataStack && dataStack.find((element) => !("isBackground" in element));
}
function useClosestMultiItemElement(dataClassName) {
  var _a, _b;
  return (_b = (_a = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataStackReactContext)) == null ? void 0 : _a.dataStack) == null ? void 0 : _b.find(
    (element) => {
      return (0,scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_2__/* .isMultiItemDataScopePojo */ .VI)(element) && (dataClassName === void 0 || element._class === dataClassName);
    }
  );
}
function useClosestSingleItemElement(dataClassName) {
  var _a, _b;
  return (_b = (_a = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataStackReactContext)) == null ? void 0 : _a.dataStack) == null ? void 0 : _b.find(
    (element) => {
      return (0,scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_2__/* .isSingleItemElement */ .Uq)(element) && (dataClassName === void 0 && !("isBackground" in element) || element._class === dataClassName);
    }
  );
}
function PushOntoDataStack({
  data,
  children
}) {
  var _a;
  const dataStack = ((_a = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataStackReactContext)) == null ? void 0 : _a.dataStack) || [];
  const stackElement = computeStackElement();
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    DataStackReactContext.Provider,
    {
      value: { dataStack: [stackElement, ...dataStack], placeholders: {} },
      children
    }
  );
  function computeStackElement() {
    if (data instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_2__/* .DataItem */ .sO) {
      return {
        _class: data.dataClassName(),
        _id: data.id()
      };
    }
    return data instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_2__/* .DataScope */ .bq ? data.toPojo() : data;
  }
}
function ProvidePlaceholders({
  source,
  isBackground,
  children
}) {
  var _a;
  const dataStack = ((_a = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataStackReactContext)) == null ? void 0 : _a.dataStack) || [];
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    DataStackReactContext.Provider,
    {
      value: computeValue(),
      children
    }
  );
  function computeValue() {
    if (source instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_2__/* .DataScope */ .bq) {
      return {
        dataStack: [source.toPojo(), ...dataStack],
        placeholders: {}
      };
    }
    const placeholders = computePlaceholders((0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__/* .unwrapAppClass */ .zo)(source));
    const { _class, _id } = placeholders;
    const stackElement = _class && _id && __spreadValues({ _class, _id }, isBackground && { isBackground });
    return {
      dataStack: stackElement ? [stackElement, ...dataStack] : dataStack,
      placeholders
    };
  }
}
function computePlaceholders(from) {
  if (from instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_2__/* .DataItem */ .sO) {
    return (0,scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_2__/* .dataItemToDataContext */ .A_)(from);
  }
  if (from instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__/* .BasicObj */ .kI) {
    return (0,scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_2__/* .basicObjToDataContext */ .gk)(from);
  }
  return from;
}


/***/ }),

/***/ 6397:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ EditAsPageContentContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(629);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const EditAsPageContentContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(false);


/***/ }),

/***/ 9116:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ handleRefAssignment)
/* harmony export */ });

function handleRefAssignment(e, ref) {
  if (typeof ref === "function") {
    ref(e);
  } else if (ref) {
    ref.current = e;
  }
}


/***/ }),

/***/ 580:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ hasComponent)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_react_component_registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5649);


function hasComponent(name) {
  return !!(0,scrivito_sdk_react_component_registry__WEBPACK_IMPORTED_MODULE_0__/* .getComponentForAppClass */ .cb)(name);
}


/***/ }),

/***/ 3726:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ useDataLocator)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2836);
/* harmony import */ var scrivito_sdk_react_data_context_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4686);



function useDataLocator(dataLocator) {
  const dataStack = (0,scrivito_sdk_react_data_context_container__WEBPACK_IMPORTED_MODULE_1__/* .useDataStack */ .CW)() || [];
  return (0,scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_0__/* .applyDataLocator */ .ZJ)(dataStack, dataLocator);
}


/***/ }),

/***/ 3955:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  S: () => (/* binding */ useInPlaceEditing)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(629);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_page.ts
var current_page = __webpack_require__(7639);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/ui_adapter.ts
var ui_adapter = __webpack_require__(5460);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/editable_area.ts


function getEditableArea() {
  var _a;
  return (_a = ui_adapter/* uiAdapter */.B) == null ? void 0 : _a.getEditableArea();
}

// EXTERNAL MODULE: ./scrivito_sdk/react/components/current_editable_area.tsx
var current_editable_area = __webpack_require__(7049);
// EXTERNAL MODULE: ./scrivito_sdk/react/edit_as_page_content_context.ts
var edit_as_page_content_context = __webpack_require__(6397);
// EXTERNAL MODULE: ./scrivito_sdk/react/in_place_editing_enabled_context.ts
var in_place_editing_enabled_context = __webpack_require__(5180);
;// CONCATENATED MODULE: ./scrivito_sdk/react/hooks/use_in_place_editing.ts







function useInPlaceEditing(page) {
  const currentEditableArea = (0,current_editable_area/* useCurrentEditableArea */.U)();
  const inPlaceEditingEnabled = external_react_.useContext(in_place_editing_enabled_context/* InPlaceEditingEnabledContext */.F);
  const editAsPageContent = external_react_.useContext(edit_as_page_content_context/* EditAsPageContentContext */.m);
  if (!inPlaceEditingEnabled) return false;
  if (page === null) return false;
  switch (getEditableArea()) {
    case "layout":
      return currentEditableArea === "outermostLayout" || currentEditableArea === "currentPageLayout";
    case "page":
      return (editAsPageContent || currentEditableArea === "currentPage") && isCurrentPage(page);
    default:
      return true;
  }
}
function isCurrentPage(page) {
  var _a;
  return !!(page && page.id() === ((_a = (0,current_page/* currentPage */.F2)()) == null ? void 0 : _a.id()));
}


/***/ }),

/***/ 5180:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ InPlaceEditingEnabledContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(629);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const InPlaceEditingEnabledContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(true);


/***/ }),

/***/ 1479:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  eK: () => (/* reexport */ AttributeValue),
  CJ: () => (/* reexport */ BackgroundImageTag),
  fK: () => (/* reexport */ ChildListTag),
  Qo: () => (/* reexport */ ContentTag),
  Tb: () => (/* reexport */ CurrentPage),
  Fd: () => (/* reexport */ Extensions),
  E0: () => (/* reexport */ ImageTag),
  LS: () => (/* reexport */ InPlaceEditAsPageContent),
  CY: () => (/* reexport */ InPlaceEditingOff),
  bI: () => (/* reexport */ LinkTag),
  zK: () => (/* reexport */ NotFoundErrorPage),
  R$: () => (/* reexport */ RestoreInPlaceEditing),
  i1: () => (/* reexport */ widget_content/* WidgetContent */.i),
  zG: () => (/* reexport */ widget_tag/* WidgetTag */.z),
  K8: () => (/* reexport */ component_registry/* getComponentForId */.K8),
  IS: () => (/* reexport */ react_has_component/* hasComponent */.I),
  tc: () => (/* reexport */ component_registry/* hasLayoutComponents */.tc),
  lo: () => (/* reexport */ provideComponent),
  NX: () => (/* reexport */ provideDataErrorComponent),
  nq: () => (/* reexport */ provideLayoutComponent),
  Nj: () => (/* reexport */ registerComponent),
  FM: () => (/* reexport */ showExtension),
  rj: () => (/* reexport */ useAttributeDefinition),
  HZ: () => (/* reexport */ useContent),
  Ez: () => (/* reexport */ useData),
  p$: () => (/* reexport */ useDataItem),
  uv: () => (/* reexport */ use_data_locator/* useDataLocator */.u),
  WS: () => (/* reexport */ useDataScope),
  w6: () => (/* reexport */ useResolvedHtmlValue),
  yf: () => (/* reexport */ useResolvedStringValue),
  O4: () => (/* reexport */ useUrlFor)
});

// UNUSED EXPORTS: memo

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(629);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/get_class_name.ts
var get_class_name = __webpack_require__(7717);
// EXTERNAL MODULE: ./scrivito_sdk/react/component_registry.ts
var component_registry = __webpack_require__(5649);
// EXTERNAL MODULE: ./scrivito_sdk/react/components/widget_tag.tsx
var widget_tag = __webpack_require__(2934);
// EXTERNAL MODULE: ./scrivito_sdk/react/memo.ts
var memo = __webpack_require__(9576);
// EXTERNAL MODULE: ./scrivito_sdk/react_connect/index.ts + 7 modules
var react_connect = __webpack_require__(3602);
;// CONCATENATED MODULE: ./scrivito_sdk/react/provide_component.ts







function provideComponent(classNameOrClass, component, options) {
  const className = (0,get_class_name/* getClassName */.u)(classNameOrClass);
  if (isComponentMissingName(component)) {
    component.displayName = className;
  }
  const connectedComponent = (0,react_connect/* connect */.Ng)(component, options);
  const wrappedComponent = wrapComponent(connectedComponent);
  (0,component_registry/* registerComponentForAppClass */.Jr)(className, wrappedComponent);
}
function wrapComponent(component) {
  const wrappedComponent = (0,react_connect/* isClassComponent */.Gf)(component) ? wrapClassComponent(component) : wrapFunctionComponent(component);
  wrappedComponent.displayName = (0,react_connect/* displayNameFromComponent */.NY)(component);
  return wrappedComponent;
}
function wrapFunctionComponent(functionComponent) {
  return (0,memo/* memo */.p)((props) => {
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
  return (0,react_connect/* getElementType */.BK)(rendered) === widget_tag/* WidgetTag */.z ? rendered : external_react_.createElement(widget_tag/* WidgetTag */.z, { children: rendered });
}
function isComponentMissingName(component) {
  return !component.displayName && (!component.name || component.name === "_class" || component.name.substring(0, 6) === "class_");
}

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 63 modules
var common = __webpack_require__(4665);
// EXTERNAL MODULE: ./scrivito_sdk/react/connect_and_memoize.ts
var connect_and_memoize = __webpack_require__(6031);
// EXTERNAL MODULE: ./scrivito_sdk/realm/index.ts + 21 modules
var realm = __webpack_require__(7461);
;// CONCATENATED MODULE: ./scrivito_sdk/react/provide_layout_component.ts







function provideLayoutComponent(objClass, component, options) {
  if (!(0,realm/* isObjClass */.I6)(objClass)) {
    (0,common/* throwInvalidArgumentsError */.Ht)(
      "provideLayoutComponent",
      "A layout component must be provided only for Objs",
      { docPermalink: "js-sdk/provideLayoutComponent" }
    );
  }
  const className = (0,get_class_name/* getClassName */.u)(objClass);
  if (isComponentMissingName(component)) component.displayName = className;
  (0,component_registry/* registerLayoutComponentForAppClass */.X5)(
    className,
    (0,connect_and_memoize/* connectAndMemoize */.M)(component, options)
  );
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/provide_data_error_component.ts



function provideDataErrorComponent(component) {
  (0,component_registry/* registerDataErrorComponent */.Jo)((0,connect_and_memoize/* connectAndMemoize */.M)(component));
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/register_component.ts



function registerComponent(componentId, component) {
  (0,component_registry/* registerComponentForId */.B$)(componentId, (0,react_connect/* connect */.Ng)(component));
}

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
function decodeOrLoadImg(imageUrl) {
  const img = new Image();
  return hasDecodeImg(img) ? decodeImg(img, imageUrl) : loadImg(img, imageUrl);
}
function hasDecodeImg(img) {
  return !!img.decode;
}
function decodeImg(img, imageUrl) {
  return __async(this, null, function* () {
    if (!hasDecodeImg(img)) {
      throw new Error("Browser does not support decode!");
    }
    img.src = imageUrl;
    yield imgDecode(img)();
    return img;
  });
}
function imgDecode(img) {
  return img.decode && img.decode.bind(img);
}
function loadImg(img, imageUrl) {
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = (event) => reject(event);
    img.src = imageUrl;
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/decode_background_image.ts

var decode_background_image_async = (__this, __arguments, generator) => {
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



function decodeBackgroundImage(imageUrl) {
  return decode_background_image_async(this, null, function* () {
    try {
      const img = yield decodeOrLoadImg(imageUrl);
      if (hasGetCSSCanvasContext()) return webkitCanvas(img);
      if (!hasDecodeImg(img)) return drawCanvas(img);
      return { decodedBackgroundUrl: `url(${imageUrl})` };
    } catch (e) {
      return { decodedBackgroundUrl: `url(${imageUrl})` };
    }
  });
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

var background_image_decoder_async = (__this, __arguments, generator) => {
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
    if (this.decodedUrls[imageUrl] || this.loadingRegistry[imageUrl]) return;
    const promise = (() => background_image_decoder_async(this, null, function* () {
      const { decodedBackgroundUrl, clear } = yield decodeBackgroundImage(
        imageUrl
      );
      if (this.isOnUpdateCallbackActive) {
        if (clear) this.clears.push(clear);
        this.decodedUrls[imageUrl] = decodedBackgroundUrl;
        this.onUpdateCallback();
      } else {
        if (clear) clear();
        this.decodedUrls[imageUrl] = void 0;
      }
    }))();
    this.loadingRegistry[imageUrl] = (0,common/* promiseAndFinally */.Qk)(
      promise,
      () => delete this.loadingRegistry[imageUrl]
    );
  }
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/scale_down_binary.ts
var scale_down_binary = __webpack_require__(6409);
// EXTERNAL MODULE: ./scrivito_sdk/models/index.ts + 39 modules
var models = __webpack_require__(8927);
;// CONCATENATED MODULE: ./scrivito_sdk/react/components/background_image_tag.tsx

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







const BackgroundImageTag = (0,react_connect/* connect */.Ng)(function BackgroundImageTag2(_a) {
  var _b = _a, {
    style,
    tag
  } = _b, passThroughProps = __objRest(_b, [
    "style",
    "tag"
  ]);
  const [, forceUpdate] = external_react_.useReducer((x) => x + 1, 0);
  const decoder = external_react_.useMemo(
    () => createBackgroundImageDecoder(forceUpdate),
    []
  );
  external_react_.useEffect(() => {
    decoder.resumeUpdateCallback();
    return () => decoder.clear();
  }, [decoder]);
  const Tag = tag || "div";
  assertNoBackgroundRelatedProperties(style);
  return /* @__PURE__ */ external_react_.createElement(
    Tag,
    __spreadProps(__spreadValues({}, passThroughProps), {
      style: calculateCSSProperties(style || {}, binaryToUrl)
    })
  );
  function binaryToUrl(binary) {
    const { initialUrl, highResUrlToDecode } = (0,scale_down_binary/* scaleDownBinary */.s1)(binary);
    const decodedBackgroundUrl = highResUrlToDecode && decoder.getBackgroundImage(highResUrlToDecode);
    return decodedBackgroundUrl || `url(${initialUrl})`;
  }
});
function createBackgroundImageDecoder(onUpdateCallback) {
  return new BackgroundImageDecoder(onUpdateCallback);
}
function calculateCSSProperties(style, binaryToUrl) {
  if ((0,common/* isObject */.Gv)(style)) {
    const _a = style, { background } = _a, otherStyles = __objRest(_a, ["background"]);
    return __spreadValues(__spreadValues({}, otherStyles), calculateBackgroundCSSProperties(background, binaryToUrl));
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
  const lastBackground = properties[properties.length - 1];
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
  if (image instanceof models/* Binary */.yI) {
    return cssPropertiesForBinary(image, background, binaryToUrl);
  }
  if (image instanceof realm/* Obj */.OH) {
    const basicObj = (0,realm/* unwrapAppClass */.zo)(image);
    if ((0,realm/* isBinaryBasicObj */.Xg)(basicObj)) {
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
  return typeof background.image === "string";
}
function assertNoBackgroundRelatedProperties(style) {
  if ((0,common/* isObject */.Gv)(style)) {
    for (const key of Object.keys(style)) {
      if (key.match(/^background.+/)) {
        (0,common/* throwNextTick */.JL)(
          new common/* ArgumentError */.c1(
            `Invalid background related CSS property "${key}". Expected property "background" alongside with any non-background propertiesFor further details, see ${(0,common/* docUrl */.yJ)("js-sdk/BackgroundImageTag")}`
          )
        );
      }
    }
  }
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_page.ts
var current_page = __webpack_require__(7639);
// EXTERNAL MODULE: ./scrivito_sdk/import_from.ts
var import_from = __webpack_require__(5606);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/basic_url_for.ts
var basic_url_for = __webpack_require__(5112);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/change_location.ts
var change_location = __webpack_require__(2354);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/get_details_page_url.ts
var get_details_page_url = __webpack_require__(2117);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/navigate_to.ts
var navigate_to = __webpack_require__(3721);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/ui_adapter.ts
var ui_adapter = __webpack_require__(5460);
// EXTERNAL MODULE: ./scrivito_sdk/data_integration/index.ts + 36 modules
var data_integration = __webpack_require__(2836);
// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 26 modules
var loadable = __webpack_require__(4772);
// EXTERNAL MODULE: ./scrivito_sdk/react/data_context_container.tsx
var data_context_container = __webpack_require__(4686);
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
var link_tag_objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (link_tag_hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && link_tag_getOwnPropSymbols)
    for (var prop of link_tag_getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && link_tag_propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var link_tag_async = (__this, __arguments, generator) => {
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














const LinkTag = (0,react_connect/* connect */.Ng)(function LinkTag2(props) {
  const dataStack = (0,data_context_container/* useDataStack */.CW)();
  const placeholders = (0,data_context_container/* usePlaceholders */.OF)();
  const _a = props, {
    children,
    to: linkTagTo,
    params: linkTagParams
  } = _a, customProps = link_tag_objRest(_a, [
    "children",
    "to",
    "params"
  ]);
  return /* @__PURE__ */ external_react_.createElement(
    "a",
    link_tag_spreadProps(link_tag_spreadValues({}, customProps), {
      href: getHref(),
      target: getTarget(),
      rel: getRel(),
      onClick,
      ref: props.ref
    }),
    children
  );
  function getHref() {
    var _a2;
    return ((_a2 = getDestination()) == null ? void 0 : _a2.href) || "#";
  }
  function getTarget() {
    if (props.target) return props.target;
    if (props.to instanceof realm/* Link */.N_) {
      return (0,realm/* unwrapAppClass */.zo)(props.to).target() || void 0;
    }
  }
  function getRel() {
    if ("rel" in props) return props.rel;
    if (props.to instanceof realm/* Link */.N_) {
      return (0,realm/* unwrapAppClass */.zo)(props.to).rel() || void 0;
    }
  }
  function onClick(e) {
    return link_tag_async(this, null, function* () {
      if (props.onClick) {
        props.onClick(e);
        if (e.defaultPrevented) return;
      }
      e.preventDefault();
      const destination = yield (0,loadable/* load */.Hh)(getDestination);
      if (!destination) return;
      const target = getTarget();
      const { to, href, queryParameters } = destination;
      if (target === "_blank" || (0,common/* isModifierClick */.M7)(e)) {
        return (0,change_location/* openInNewWindow */.EV)(href);
      }
      if (target === "_top" && ui_adapter/* uiAdapter */.B) {
        return navigateAppTo(to, queryParameters);
      }
      if (target) {
        return (0,common/* openWindow */.D1)(href, target);
      }
      navigateAppTo(to, queryParameters);
    });
  }
  function navigateAppTo(to, params) {
    (0,navigate_to/* navigateTo */.V)(to, params && { params });
  }
  function getDestination() {
    if (!props.to) return null;
    if (typeof props.to === "string") {
      return {
        to: props.to,
        href: props.to
      };
    }
    if (props.to instanceof data_integration/* DataItem */.sO) {
      const obj = props.to.obj();
      if (obj) {
        return getBasicLinkOrBasicObjDestination((0,realm/* unwrapAppClass */.zo)(obj), obj);
      }
      return getDataItemDestination(props.to);
    }
    const objOrLink = (0,realm/* unwrapAppClass */.zo)(props.to);
    const singlePlaceholder = getSinglePlaceholder(objOrLink);
    if (singlePlaceholder) {
      return getSinglePlaceholderDestination(singlePlaceholder);
    }
    if (objOrLink instanceof models/* BasicLink */.Re || objOrLink instanceof models/* BasicObj */.kI) {
      return getBasicLinkOrBasicObjDestination(objOrLink, props.to);
    }
    return null;
  }
  function getDataItemDestination(dataItem) {
    var _a2;
    const url = (0,get_details_page_url/* getDetailsPageUrl */.p)(
      dataItem,
      ((_a2 = dataItem.obj()) == null ? void 0 : _a2.siteId()) || (0,current_page/* currentSiteId */.OI)()
    );
    if (!url) return null;
    return {
      to: dataItem,
      href: url,
      queryParameters: void 0
    };
  }
  function getBasicLinkOrBasicObjDestination(objOrLink, to) {
    return {
      to,
      href: getDestinationHref(objOrLink),
      queryParameters: getDestinationQueryParameters(objOrLink)
    };
  }
  function getSinglePlaceholderDestination(placeholder) {
    const url = (0,data_integration/* replacePlaceholdersWithData */.V8)(placeholder, {
      placeholders,
      dataStack
    });
    return {
      to: new realm/* Link */.N_({ url }),
      href: url,
      queryParameters: void 0
    };
  }
  function getDestinationQueryParameters(basicObjOrLink) {
    let queryParameters = props.params || void 0;
    if (dataStack) {
      const dataContextParameters = (0,data_integration/* getDataContextParameters */.K1)(
        basicObjOrLink,
        dataStack
      );
      if (dataContextParameters) {
        queryParameters = link_tag_spreadValues(link_tag_spreadValues({}, dataContextParameters), queryParameters);
      }
    }
    return queryParameters;
  }
  function getDestinationHref(basicObjOrLink) {
    return (0,basic_url_for/* basicUrlFor */.P)(basicObjOrLink, {
      queryParameters: getDestinationQueryParameters(basicObjOrLink),
      withoutOriginIfLocal: true
    });
  }
  function getSinglePlaceholder(basicObjOrLink) {
    if (basicObjOrLink instanceof models/* BasicLink */.Re && basicObjOrLink.isExternal()) {
      const maybeSinglePlaceholder = basicObjOrLink.url();
      if ((0,data_integration/* isSinglePlaceholder */.G7)(maybeSinglePlaceholder)) {
        return maybeSinglePlaceholder;
      }
    }
  }
});

;// CONCATENATED MODULE: ./scrivito_sdk/react/components/child_list_tag/child_item.tsx





const ChildItem = (0,react_connect/* connect */.Ng)(function ChildItem2(props) {
  const appObj = (0,realm/* wrapInAppClass */.Dy)(props.child);
  if (props.renderChild) {
    return props.renderChild(appObj);
  }
  return /* @__PURE__ */ external_react_.createElement("li", null, /* @__PURE__ */ external_react_.createElement(LinkTag, { to: appObj }, props.child.get("title", "string")));
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






const ChildListTag = (0,react_connect/* connect */.Ng)(
  withDisplayName("Scrivito.ChildListTag", (props) => {
    const _a = props, {
      parent = (0,current_page/* currentPage */.F2)(),
      tag: Tag = "ul",
      renderChild
    } = _a, otherProps = child_list_tag_objRest(_a, [
      "parent",
      "tag",
      "renderChild"
    ]);
    if (!parent) return null;
    const basicParent = parent._scrivitoPrivateContent;
    const orderedChildren = basicParent.orderedChildren();
    const childComponents = orderedChildren.map((child) => /* @__PURE__ */ external_react_.createElement(ChildItem, { key: child.id(), child, renderChild }));
    const ChildListTagWithEditing = (0,import_from/* importFrom */.eW)(
      "reactEditing",
      "ChildListTagWithEditing"
    );
    if (!ChildListTagWithEditing) {
      return /* @__PURE__ */ external_react_.createElement(Tag, child_list_tag_spreadValues({}, otherProps), childComponents);
    }
    return /* @__PURE__ */ external_react_.createElement(
      ChildListTagWithEditing,
      child_list_tag_spreadValues({
        tag: Tag,
        basicParent
      }, otherProps),
      childComponents
    );
  })
);

// EXTERNAL MODULE: ./scrivito_sdk/app_support/content_tags_for_empty_attributes.ts
var content_tags_for_empty_attributes = __webpack_require__(5015);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/editing_context.ts
var editing_context = __webpack_require__(1616);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/get_comparison_range.ts
var get_comparison_range = __webpack_require__(8848);
// EXTERNAL MODULE: external "lodash-es/escape"
var escape_ = __webpack_require__(3444);
var escape_default = /*#__PURE__*/__webpack_require__.n(escape_);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/browser_location.ts
var browser_location = __webpack_require__(9004);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_page_data.ts
var current_page_data = __webpack_require__(5634);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/routing.ts + 2 modules
var routing = __webpack_require__(7183);
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
  const isModifier = (0,common/* isModifierClick */.M7)(e);
  return findLinkTarget(innermostNode, outermostNode, isModifier);
}
function findLinkTarget(currentNode, outermostNode, isModifier) {
  if (currentNode === outermostNode) {
    return null;
  }
  if (isHTMLAnchorElement(currentNode)) {
    const url = currentNode.href;
    if (!(0,routing/* isOriginLocal */.Im)(url)) {
      return null;
    }
    if (isModifier || currentNode.getAttribute("target") === "_blank") {
      return { openInNewWindow: url };
    }
    return { openInCurrentWindow: (0,common/* urlResource */.ix)(new URL(url)) };
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
var replace_internal_links = __webpack_require__(7440);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/scroll_into_view.ts
var scroll_into_view = __webpack_require__(5394);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/can_edit.ts
var can_edit = __webpack_require__(5057);
// EXTERNAL MODULE: ./scrivito_sdk/react/components/content_tag/widget_content.tsx
var widget_content = __webpack_require__(92);
// EXTERNAL MODULE: ./scrivito_sdk/react/hooks/use_in_place_editing.ts + 1 modules
var use_in_place_editing = __webpack_require__(3955);
;// CONCATENATED MODULE: ./scrivito_sdk/react/components/content_tag/widget_value.tsx









const WidgetValue = (0,react_connect/* connect */.Ng)(function WidgetValue2({
  field,
  widgetProps
}) {
  const isInPlaceEditingEnabled = (0,use_in_place_editing/* useInPlaceEditing */.S)(field.obj());
  if ((0,editing_context/* isComparisonActive */.gY)()) throw new common/* InternalError */.Gd("Not yet implemented");
  if (!(0,editing_context/* isInPlaceEditingActive */.HD)() || !(0,can_edit/* canEditObjWithId */.V)(field.obj().id())) {
    return /* @__PURE__ */ external_react_.createElement(
      WidgetValueContent,
      {
        field,
        widgetProps,
        isInPlaceEditingEnabled: false
      }
    );
  }
  return /* @__PURE__ */ external_react_.createElement(
    WidgetValueContent,
    {
      field,
      widgetProps,
      isInPlaceEditingEnabled
    }
  );
});
const WidgetValueContent = (0,react_connect/* connect */.Ng)(function WidgetValueContent2({
  field,
  widgetProps,
  isInPlaceEditingEnabled
}) {
  const widget = field.get();
  if (widget) {
    return /* @__PURE__ */ external_react_.createElement(
      widget_content/* WidgetContent */.i,
      {
        key: widget.id(),
        widget,
        widgetProps,
        fieldType: "widget"
      }
    );
  }
  if (!isInPlaceEditingEnabled) return null;
  const WidgetPlaceholder = (0,import_from/* importFrom */.eW)("reactEditing", "WidgetPlaceholder");
  return WidgetPlaceholder ? /* @__PURE__ */ external_react_.createElement(WidgetPlaceholder, { field }) : null;
});

;// CONCATENATED MODULE: ./scrivito_sdk/react/components/content_tag/widgetlist_value.tsx











const WidgetlistValue = (0,react_connect/* connect */.Ng)(function WidgetlistValue2({
  field,
  widgetProps
}) {
  const isInPlaceEditingEnabled = (0,use_in_place_editing/* useInPlaceEditing */.S)(field.obj());
  if ((0,editing_context/* isComparisonActive */.gY)()) {
    return /* @__PURE__ */ external_react_.createElement(
      WidgetlistValueContentForComparison,
      {
        field,
        widgetProps
      }
    );
  }
  if (!(0,editing_context/* isInPlaceEditingActive */.HD)() || !(0,can_edit/* canEditObjWithId */.V)(field.obj().id())) {
    return /* @__PURE__ */ external_react_.createElement(
      WidgetlistValueContent,
      {
        field,
        widgetProps,
        isInPlaceEditingEnabled: false
      }
    );
  }
  return /* @__PURE__ */ external_react_.createElement(
    WidgetlistValueContent,
    {
      field,
      widgetProps,
      isInPlaceEditingEnabled
    }
  );
});
const WidgetlistValueContentForComparison = (0,react_connect/* connect */.Ng)(
  function WidgetlistValueContentForComparison2({
    field,
    widgetProps
  }) {
    const { placementModification: containerPlacementModification } = external_react_.useContext(widget_content/* WidgetTagContext */.K);
    const renderingDepth = external_react_.useContext(WidgetlistRenderingDepth) + 1;
    if (renderingDepth >= 100) throw new common/* InternalError */.Gd();
    const infos = (0,models/* getPlacementModificationInfos */.t3)(
      field,
      (0,get_comparison_range/* getComparisonRange */.d)(),
      containerPlacementModification != null ? containerPlacementModification : null
    );
    return /* @__PURE__ */ external_react_.createElement(WidgetlistRenderingDepth.Provider, { value: renderingDepth }, infos.map((info) => {
      return /* @__PURE__ */ external_react_.createElement(
        widget_content/* WidgetContent */.i,
        {
          key: calculateKey(info.widget.id(), info.modification),
          widget: info.widget,
          widgetProps,
          placementModification: info.modification,
          fieldType: "widgetlist"
        }
      );
    }));
    function calculateKey(widgetId, modification) {
      return `${widgetId}-${modification != null ? modification : "unmodified"}`;
    }
  }
);
const WidgetlistRenderingDepth = external_react_.createContext(0);
const WidgetlistValueContent = (0,react_connect/* connect */.Ng)(function WidgetlistValueContent2({
  field,
  widgetProps,
  isInPlaceEditingEnabled
}) {
  const widgets = field.get();
  if (widgets.length) {
    return /* @__PURE__ */ external_react_.createElement(external_react_.Fragment, null, widgets.map((widget) => /* @__PURE__ */ external_react_.createElement(
      widget_content/* WidgetContent */.i,
      {
        key: widget.id(),
        widget,
        widgetProps,
        fieldType: "widgetlist"
      }
    )));
  }
  if (!isInPlaceEditingEnabled) return null;
  const WidgetlistPlaceholder = (0,import_from/* importFrom */.eW)(
    "reactEditing",
    "WidgetlistPlaceholder"
  );
  return WidgetlistPlaceholder ? /* @__PURE__ */ external_react_.createElement(WidgetlistPlaceholder, { field }) : null;
});

// EXTERNAL MODULE: ./scrivito_sdk/react/handle_ref_assignment.ts
var handle_ref_assignment = __webpack_require__(9116);
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



















const AttributeValue = (0,react_connect/* connect */.Ng)(
  withDisplayName(
    "Scrivito.ContentTag.AttributeValue",
    (props) => {
      const dataContextContainer = (0,data_context_container/* useDataContextContainer */.iH)();
      const element = external_react_.useRef(void 0);
      external_react_.useEffect(() => {
        if (!element.current) return;
        const objId = props.field.obj().id();
        const attributeName = props.field.name();
        return (0,scroll_into_view/* registerScrollTarget */.a)({ objId, attributeName }, element.current);
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
        ref: combineRefs
      }));
      function combineRefs(e) {
        (0,handle_ref_assignment/* handleRefAssignment */.h)(e, props.ref);
        element.current = e;
        if (props.elementCallback) props.elementCallback(e);
      }
    }
  )
);
function isCustomInnerHtml(maybeCustomInnerHtml) {
  return (0,common/* isObject */.Gv)(maybeCustomInnerHtml) && typeof maybeCustomInnerHtml.__html === "string";
}
function renderPropsForField(field, customChildrenFromProps, customInnerHtml, customOnClick, widgetProps, dataContextContainer) {
  const dataStack = dataContextContainer == null ? void 0 : dataContextContainer.dataStack;
  const customChildren = customChildrenFromProps || customInnerHtml ? {
    children: customChildrenFromProps,
    dangerouslySetInnerHTML: customInnerHtml ? {
      __html: (0,replace_internal_links/* replaceInternalLinks */.n)(customInnerHtml.__html, {
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
        children: /* @__PURE__ */ external_react_.createElement(
          WidgetValue,
          {
            field,
            widgetProps
          }
        )
      };
    }
    case "widgetlist": {
      return {
        children: /* @__PURE__ */ external_react_.createElement(
          WidgetlistValue,
          {
            field,
            widgetProps
          }
        )
      };
    }
    default:
      return customChildren != null ? customChildren : {};
  }
}
function renderPropsForHtml(field, customChildren, customOnClick, dataContextContainer) {
  const diffContent = (0,editing_context/* isComparisonActive */.gY)() ? field.getHtmlDiffContent((0,get_comparison_range/* getComparisonRange */.d)()) : void 0;
  const handleClickOnHtml = (e) => {
    const linkTarget = findClickTarget(e);
    if (!linkTarget) return null;
    if (isOpenInNewWindow(linkTarget)) {
      handleOpenInNewWindow(e, linkTarget);
    } else {
      if (isSameSite(linkTarget.openInCurrentWindow)) {
        handleOpenInCurrentWindow(e, linkTarget);
      } else {
        (0,common/* assignLocation */.dT)(linkTarget.openInCurrentWindow);
      }
    }
  };
  if (customChildren && !diffContent) {
    return attribute_value_spreadProps(attribute_value_spreadValues({}, customChildren), {
      onClick: customOnClick || handleClickOnHtml
    });
  }
  const placeholders = dataContextContainer == null ? void 0 : dataContextContainer.placeholders;
  const dataStack = dataContextContainer == null ? void 0 : dataContextContainer.dataStack;
  return {
    dangerouslySetInnerHTML: {
      __html: (0,replace_internal_links/* replaceInternalLinks */.n)(
        (0,data_integration/* replacePlaceholdersWithData */.V8)(diffContent || field.get(), {
          placeholders,
          dataStack,
          transform: (escape_default())
        }),
        { dataStack }
      )
    },
    onClick: handleClickOnHtml
  };
}
function renderPropsForString(field, customChildren, dataContextContainer) {
  const diffContent = (0,editing_context/* isComparisonActive */.gY)() ? field.getHtmlDiffContent((0,get_comparison_range/* getComparisonRange */.d)()) : void 0;
  const placeholders = dataContextContainer == null ? void 0 : dataContextContainer.placeholders;
  const dataStack = dataContextContainer == null ? void 0 : dataContextContainer.dataStack;
  if (diffContent) {
    return {
      dangerouslySetInnerHTML: {
        __html: (0,data_integration/* replacePlaceholdersWithData */.V8)(diffContent, {
          placeholders,
          dataStack,
          transform: (escape_default())
        })
      }
    };
  }
  return customChildren != null ? customChildren : {
    children: (0,data_integration/* replacePlaceholdersWithData */.V8)(field.get(), {
      placeholders,
      dataStack
    })
  };
}
function renderPropsForNumber(field) {
  const value = field.get();
  const parsedValue = value === 0 ? "0" : value;
  return { children: parsedValue };
}
function isSameSite(url) {
  var _a, _b;
  const baseUrl = (_b = (_a = (0,current_page_data/* getCurrentRoute */.$V)()) == null ? void 0 : _a.siteData) == null ? void 0 : _b.baseUrl;
  if (!baseUrl) return false;
  const linkUrl = new URL(url, baseUrl);
  return `${linkUrl.origin}${linkUrl.pathname}/`.startsWith(`${baseUrl}/`);
}
function handleOpenInNewWindow(e, { openInNewWindow: url }) {
  if (ui_adapter/* uiAdapter */.B) {
    e.preventDefault();
    (0,change_location/* openInNewWindow */.EV)(url);
  }
}
function handleOpenInCurrentWindow(e, { openInCurrentWindow: resource }) {
  e.preventDefault();
  browser_location/* push */.VC(resource);
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












const ContentTagWithElementCallback = (0,react_connect/* connect */.Ng)(function ContentTagWithElementCallback2(_a) {
  var _b = _a, {
    content,
    attribute,
    tag,
    dataContext,
    widgetProps,
    elementCallback,
    renderEmptyAttribute,
    ref
  } = _b, customProps = content_tag_objRest(_b, [
    "content",
    "attribute",
    "tag",
    "dataContext",
    "widgetProps",
    "elementCallback",
    "renderEmptyAttribute",
    "ref"
  ]);
  var _a2, _b2;
  const isInPlaceEditingEnabled = (0,use_in_place_editing/* useInPlaceEditing */.S)(
    (_b2 = (_a2 = (0,realm/* unwrapAppClass */.zo)(content)) == null ? void 0 : _a2.obj()) != null ? _b2 : null
  );
  if (!content) return null;
  const field = getField(content, attribute);
  if (!field) return null;
  if ((0,editing_context/* isComparisonActive */.gY)()) {
    const [fromField, toField] = getFieldsForComparison(field);
    if (shouldComparisonBeSkipped(fromField, toField, renderEmptyAttribute)) {
      return null;
    }
  }
  if ((!(0,editing_context/* isInPlaceEditingActive */.HD)() || !isInPlaceEditingEnabled) && !(0,editing_context/* isComparisonActive */.gY)() && (0,common/* isEmptyValue */.Po)(field.get()) && renderNothingForEmptyAttribute(renderEmptyAttribute)) {
    return null;
  }
  assertWidgetPropsAreAllowed(widgetProps, field);
  const contentTagProps = {
    elementCallback,
    field,
    tag: tag || "div",
    customProps,
    widgetProps,
    ref
  };
  const AttributeValueWithEditing = (0,import_from/* importFrom */.eW)(
    "reactEditing",
    "AttributeValueWithEditing"
  );
  const AttributeValueComponent = AttributeValueWithEditing || AttributeValue;
  const attributeValue = /* @__PURE__ */ external_react_.createElement(AttributeValueComponent, content_tag_spreadValues({}, contentTagProps));
  if (isDataContextObject(dataContext) && (dataContext._class || dataContext._id)) {
    (0,common/* throwNextTick */.JL)(
      new common/* ArgumentError */.c1(
        'The object provided via "dataContext" prop must not contain keys "_class" and "_id"'
      )
    );
    return attributeValue;
  }
  if (!dataContext) return attributeValue;
  return /* @__PURE__ */ external_react_.createElement(data_context_container/* ProvidePlaceholders */.sT, { source: dataContext }, attributeValue);
});
function getField(content, attribute) {
  const field = realm/* Schema */.Sj.basicFieldFor(content, attribute);
  if (field) return field;
  (0,common/* throwNextTick */.JL)(
    new common/* ArgumentError */.c1(
      `Component "Scrivito.ContentTag" received prop "attribute" with invalid value: Attribute "${attribute}" is not defined for content specified in prop "content".`
    )
  );
  return null;
}
function getFieldsForComparison(field) {
  return (0,get_comparison_range/* getComparisonRange */.d)().map((objSpace) => field.inObjSpace(objSpace));
}
function assertWidgetPropsAreAllowed(widgetProps, field) {
  if (!widgetProps) return;
  const fieldType = field.type();
  if (!(fieldType === "widget" || fieldType === "widgetlist")) {
    (0,common/* throwNextTick */.JL)(
      new common/* ArgumentError */.c1(
        'The prop "widgetProps" is only allowed for widget and widgetlist attributes'
      )
    );
  }
}
function shouldComparisonBeSkipped(fromField, toField, renderEmptyAttribute) {
  return (0,common/* isEmptyValue */.Po)(fromField == null ? void 0 : fromField.get()) && (0,common/* isEmptyValue */.Po)(toField == null ? void 0 : toField.get()) && renderNothingForEmptyAttribute(renderEmptyAttribute);
}
const ContentTag = (0,react_connect/* connect */.Ng)(
  ContentTagWithElementCallback
);
ContentTag.displayName = "Scrivito.ContentTag";
function isDataContextObject(dataContext) {
  return !!dataContext && !(dataContext instanceof data_integration/* DataItem */.sO) && !(dataContext instanceof data_integration/* DataScope */.bq) && !(dataContext instanceof realm/* Obj */.OH);
}
function renderNothingForEmptyAttribute(renderEmptyAttribute) {
  return renderEmptyAttribute === void 0 ? (0,content_tags_for_empty_attributes/* shouldContentTagsForEmptyAttributesBeSkipped */.C)() : !renderEmptyAttribute;
}

// EXTERNAL MODULE: ./scrivito_sdk/react/components/automatic_data_context.tsx
var automatic_data_context = __webpack_require__(843);
// EXTERNAL MODULE: ./scrivito_sdk/react/components/current_editable_area.tsx
var current_editable_area = __webpack_require__(7049);
;// CONCATENATED MODULE: ./scrivito_sdk/react/scroll_window.ts




let previousNavigationState;
function notifyScrollWindow(navigationState) {
  if (!(0,browser_location/* isCurrentHistoryState */.zE)(navigationState.historyState)) return;
  if (shouldScroll(navigationState)) (0,common/* scrollTo */.VG)(0, 0);
  previousNavigationState = navigationState;
}
function shouldScroll(currentNavigationState) {
  if (currentNavigationState.historyState.historyChangesCount === 0) {
    return false;
  }
  if (currentNavigationState.historyState.isRevisit) return false;
  const hasFragment = currentNavigationState.historyState.location.indexOf("#") !== -1;
  if (hasFragment) return false;
  const route = currentNavigationState.locationRoute;
  if ((0,routing/* isObjNotFoundRoute */.UO)(route)) return true;
  if ((0,routing/* isNotResponsibleRoute */.tV)(route)) return false;
  return currentNavigationState.historyState.historyChangesCount !== (previousNavigationState == null ? void 0 : previousNavigationState.historyState.historyChangesCount);
}
(0,common/* onReset */.Nj)(() => previousNavigationState = void 0);

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
  const pageComponent = (0,component_registry/* getComponentForAppClass */.cb)(pageClassName);
  if (pageComponent) {
    return pageComponent;
  }
  (0,common/* throwNextTick */.JL)(
    new common/* ArgumentError */.c1(
      `No component registered for obj class "${pageClassName}"`
    )
  );
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/components/current_page/details_page_data_context.tsx






const DetailsPageDataContext = (0,react_connect/* connect */.Ng)(function DetailsPageDataContext2({
  page,
  params,
  children
}) {
  if (!page) return children;
  const dataContext = (0,data_integration/* dataContextFromQueryParams */._f)(page, params);
  if (dataContext === "loading") return null;
  if (dataContext === "unavailable") return renderDataError();
  if (!dataContext) return children;
  return /* @__PURE__ */ external_react_.createElement(data_context_container/* ProvidePlaceholders */.sT, { source: dataContext }, children);
});
function renderDataError() {
  const DataErrorComponent = (0,component_registry/* getDataErrorComponent */.Ey)();
  return DataErrorComponent ? /* @__PURE__ */ external_react_.createElement(DataErrorComponent, null) : /* @__PURE__ */ external_react_.createElement(external_react_.Fragment, null, "Data Not Found");
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/components/current_page/page_data_context.tsx





const PageDataContext = (0,react_connect/* connect */.Ng)(function PageDataContext2({
  page,
  children
}) {
  if (!page) return children;
  return /* @__PURE__ */ external_react_.createElement(
    data_context_container/* ProvidePlaceholders */.sT,
    {
      source: (0,data_integration/* basicObjToDataContext */.gk)(page),
      isBackground: true
    },
    children
  );
});

// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_app_space.ts
var current_app_space = __webpack_require__(1048);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/get_current_page_id.ts
var get_current_page_id = __webpack_require__(4404);
;// CONCATENATED MODULE: ./scrivito_sdk/react/components/current_page/use_layout.tsx














const LayoutIndexContext = external_react_.createContext(0);
function useLayout(page, params) {
  const layoutIndex = external_react_.useContext(LayoutIndexContext);
  if (!(0,component_registry/* hasLayoutComponents */.tc)()) return;
  if (layoutIndex === 0) page.ancestors();
  const nextPage = getNextPage(page, layoutIndex);
  if (nextPage === void 0) return;
  if (nextPage === "loading") return "loading";
  return /* @__PURE__ */ external_react_.createElement(PageLayout, { page: nextPage, params, layoutIndex });
}
function getNextPage(page, layoutIndex) {
  const path = page.path();
  if (path) {
    const ancestorPaths = (0,common/* computeAncestorPaths */.FQ)(path);
    if (layoutIndex >= ancestorPaths.length) return;
    const ancestorPath = ancestorPaths[layoutIndex];
    if (ancestorPath === path) return page;
    return getAncestorOf(page, ancestorPath);
  }
  if (layoutIndex === 0) return page;
}
function getAncestorOf(page, ancestorPath) {
  const siteId = page.siteId();
  if (!siteId) throw new common/* InternalError */.Gd();
  return (0,loadable/* loadWithDefault */.qt)(
    "loading",
    () => (0,models/* getObjByPath */.ud)((0,current_app_space/* currentAppSpace */.p)().and((0,models/* restrictToSite */.rs)(siteId)), ancestorPath)
  );
}
const PageLayout = (0,react_connect/* connect */.Ng)(function PageLayout2({
  page,
  params,
  layoutIndex
}) {
  const Component = page && (0,component_registry/* getLayoutComponentForAppClass */.oC)(page.objClass());
  return /* @__PURE__ */ external_react_.createElement(PageDataContext, { page }, /* @__PURE__ */ external_react_.createElement(DetailsPageDataContext, { page, params }, /* @__PURE__ */ external_react_.createElement(current_editable_area/* CurrentEditableArea */.Z, { value: calculateCurrentEditableArea }, /* @__PURE__ */ external_react_.createElement(LayoutIndexContext.Provider, { value: layoutIndex + 1 }, Component ? /* @__PURE__ */ external_react_.createElement(Component, { page: (0,realm/* wrapInAppClass */.Dy)(page) }) : /* @__PURE__ */ external_react_.createElement(CurrentPage, null)))));
  function calculateCurrentEditableArea() {
    return page && page.id() === (0,get_current_page_id/* getCurrentPageId */.s)() ? "currentPageLayout" : "parentPageLayout";
  }
});

;// CONCATENATED MODULE: ./scrivito_sdk/react/components/current_page.tsx













const CurrentPage = (0,react_connect/* connect */.Ng)(
  function CurrentPage2() {
    const pageData = (0,current_page_data/* getCurrentPageData */.Vd)();
    if (!pageData) return null;
    const { currentPage, navigationState } = pageData;
    if (!currentPage) return null;
    return /* @__PURE__ */ external_react_.createElement(
      CurrentPageWithLayout,
      {
        currentPage,
        navigationState
      }
    );
  }
);
const CurrentPageWithLayout = (0,react_connect/* connect */.Ng)(function CurrentPageWithLayout2({
  currentPage,
  navigationState
}) {
  var _a, _b;
  const params = (0,common/* parseQueryToQueryParameters */.zw)(
    (_b = (_a = navigationState == null ? void 0 : navigationState.locationRoute) == null ? void 0 : _a.query) != null ? _b : ""
  );
  const layout = useLayout(currentPage, params);
  if (layout) return layout === "loading" ? null : layout;
  const PageComponent = getComponentForPageClass(currentPage.objClass());
  return /* @__PURE__ */ external_react_.createElement(PageDataContext, { page: currentPage }, /* @__PURE__ */ external_react_.createElement(DetailsPageDataContext, { page: currentPage, params }, /* @__PURE__ */ external_react_.createElement(automatic_data_context/* AutomaticDataContext */.T, { content: currentPage }, /* @__PURE__ */ external_react_.createElement(current_editable_area/* CurrentEditableArea */.Z, { value: "currentPage" }, /* @__PURE__ */ external_react_.createElement(PageScroll, { navigationState }), PageComponent && /* @__PURE__ */ external_react_.createElement(
    PageComponent,
    {
      page: (0,realm/* wrapInAppClass */.Dy)(currentPage),
      params
    }
  )))));
});
CurrentPage.displayName = "Scrivito.CurrentPage";

// EXTERNAL MODULE: external "react-dom"
var external_react_dom_ = __webpack_require__(400);
;// CONCATENATED MODULE: ./scrivito_sdk/react/components/extensions.tsx




let onShowExtension;
function showExtension(reactElement) {
  if (onShowExtension) onShowExtension(reactElement);
}
function Extensions() {
  const [htmlElement, setHtmlElement] = external_react_.useState(
    null
  );
  const [reactElement, setReactElement] = external_react_.useState(null);
  external_react_.useEffect(() => {
    const doc = (0,common/* getDocument */.YE)();
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
(0,common/* onReset */.Nj)(() => onShowExtension = void 0);

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/decode_image.ts

var decode_image_async = (__this, __arguments, generator) => {
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


function decodeImage(imageUrl) {
  return decode_image_async(this, null, function* () {
    try {
      const img = yield decodeOrLoadImg(imageUrl);
      if (!hasDecodeImg(img)) drawImgOnCanvas(img);
      return imageUrl;
    } catch (e) {
      return imageUrl;
    }
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/image_decoder.ts

var image_decoder_async = (__this, __arguments, generator) => {
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
    if (this.decodedUrls[imageUrl] || this.loadingRegistry[imageUrl]) return;
    const promise = (() => image_decoder_async(this, null, function* () {
      const url = yield decodeImage(imageUrl);
      this.decodedUrls[imageUrl] = url;
      if (this.isOnUpdateCallbackActive) {
        this.onUpdateCallback();
      }
    }))();
    this.loadingRegistry[imageUrl] = (0,common/* promiseAndFinally */.Qk)(
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










const ImageTag = (0,react_connect/* connect */.Ng)(function ImageTag2(_a) {
  var _b = _a, {
    content,
    attribute = "blob",
    width,
    onLoad,
    ref
  } = _b, htmlOptions = image_tag_objRest(_b, [
    "content",
    "attribute",
    "width",
    "onLoad",
    "ref"
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
    if (isComplete(node)) setIsLazy(false);
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
  if (!content) return null;
  if (content instanceof models/* Binary */.yI) {
    const fullWidth = getFullWidth(content, width, isLazy);
    return fullWidth === null ? null : /* @__PURE__ */ external_react_.createElement(
      "img",
      image_tag_spreadProps(image_tag_spreadValues({
        src: scaledSrc(decoder, content),
        width: fullWidth
      }, htmlOptions), {
        onLoad: load,
        ref: (element) => {
          (0,handle_ref_assignment/* handleRefAssignment */.h)(element, ref);
          return setEagerIfComplete(element);
        }
      })
    );
  }
  const binary = getBinary(content, attribute);
  if (binary === void 0) return null;
  if (binary !== null) {
    const fullWidth = getFullWidth(binary, width, isLazy);
    if (fullWidth !== null) {
      return /* @__PURE__ */ external_react_.createElement(
        ContentTagWithElementCallback,
        image_tag_spreadProps(image_tag_spreadValues({
          attribute,
          content,
          width: fullWidth,
          tag: "img",
          src: scaledSrc(decoder, binary)
        }, htmlOptions), {
          onLoad: load,
          elementCallback: setEagerIfComplete,
          ref
        })
      );
    }
    if (isLazy) return null;
  }
  return /* @__PURE__ */ external_react_.createElement(
    ContentTag,
    image_tag_spreadValues({
      attribute,
      content,
      tag: "img",
      src: imagePlaceholder,
      "data-scrivito-image-placeholder": true,
      width,
      ref
    }, htmlOptions)
  );
});
function scaledSrc(decoder, binary) {
  const { initialUrl, highResUrlToDecode } = (0,scale_down_binary/* scaleDownBinary */.s1)(binary);
  const decodedImg = highResUrlToDecode && (decoder == null ? void 0 : decoder.getImage(highResUrlToDecode));
  return decodedImg || initialUrl;
}
function getFullWidth(binary, width, isLazy) {
  if (isLazy && !(0,scale_down_binary/* isInitialUrlAvailable */.js)(binary)) return null;
  if (width !== void 0) return width;
  if (binary.isRaw() || binary.isExplicitlyTransformed()) return;
  const metadata = binary.raw().metadata();
  if (metadata.contentType() === "image/svg+xml") return;
  const metadataWidth = metadata.get("width");
  return typeof metadataWidth === "number" ? metadataWidth : null;
}
function getBinary(content, attribute) {
  const field = realm/* Schema */.Sj.basicFieldFor(content, attribute);
  if (!field) {
    if (realm/* Schema */.Sj.forInstance(content)) {
      (0,common/* throwNextTick */.JL)(
        new common/* ArgumentError */.c1(
          `Component "Scrivito.ImageTag" received prop "content" with an object missing attribute "${attribute}".`
        )
      );
    }
    return;
  }
  const attributeType = field.type();
  if (attributeType === "binary") return field.get();
  if (attributeType === "reference") {
    const referenced = field.get();
    if (!(referenced instanceof models/* BasicObj */.kI)) return null;
    return referenced.get("blob", "binary") || null;
  }
  (0,common/* throwNextTick */.JL)(
    new common/* ArgumentError */.c1(
      `Component "Scrivito.ImageTag" received prop "content" with an object, whose attribute "${attribute}" is of unexpected type "${attributeType}". Valid attribute types are "binary" and "reference".`
    )
  );
}
function isComplete(node) {
  return node && node.complete;
}

// EXTERNAL MODULE: ./scrivito_sdk/react/in_place_editing_enabled_context.ts
var in_place_editing_enabled_context = __webpack_require__(5180);
;// CONCATENATED MODULE: ./scrivito_sdk/react/components/in_place_editing.tsx




const InPlaceEditingOff = createInPlaceEditingToggle({ value: false });
const RestoreInPlaceEditing = createInPlaceEditingToggle({ value: true });
function createInPlaceEditingToggle({ value }) {
  return ({ children }) => (0,editing_context/* isInPlaceEditingActive */.HD)() ? /* @__PURE__ */ external_react_.createElement(
    in_place_editing_enabled_context/* InPlaceEditingEnabledContext */.F.Provider,
    {
      value,
      children
    }
  ) : /* @__PURE__ */ external_react_.createElement(external_react_.Fragment, null, children);
}

// EXTERNAL MODULE: ./scrivito_sdk/react/edit_as_page_content_context.ts
var edit_as_page_content_context = __webpack_require__(6397);
;// CONCATENATED MODULE: ./scrivito_sdk/react/components/in_place_edit_as_page_content.tsx




const InPlaceEditAsPageContent = ({
  children
}) => (0,editing_context/* isInPlaceEditingActive */.HD)() ? /* @__PURE__ */ external_react_.createElement(edit_as_page_content_context/* EditAsPageContentContext */.m.Provider, { value: true }, children) : /* @__PURE__ */ external_react_.createElement(external_react_.Fragment, null, children);

;// CONCATENATED MODULE: ./scrivito_sdk/react/components/not_found_error_page.tsx






const NotFoundErrorPage = (0,react_connect/* connect */.Ng)(function NotFoundErrorPage2({ children }) {
  const navigationState = (0,current_page_data/* getNotFoundErrorPageState */.uR)();
  if (!navigationState) return null;
  if (!(0,browser_location/* isCurrentHistoryState */.zE)(navigationState.historyState)) return null;
  return /* @__PURE__ */ external_react_.createElement(external_react_.Fragment, null, /* @__PURE__ */ external_react_.createElement(PageScroll, { navigationState }), children || /* @__PURE__ */ external_react_.createElement("div", null, /* @__PURE__ */ external_react_.createElement("h1", null, "The page you were looking for doesn't exist."), /* @__PURE__ */ external_react_.createElement("p", null, "You may have mistyped the address or the page may have moved.")));
});
NotFoundErrorPage.displayName = "Scrivito.NotFoundErrorPage";

;// CONCATENATED MODULE: ./scrivito_sdk/react/hooks/use_data.ts



function useData() {
  const lastElement = (0,data_context_container/* useLastDataStackElement */._W)();
  if (!lastElement) return new data_integration/* EmptyDataScope */.Ao();
  const scopeOrItem = (0,data_integration/* deserializeDataStackElement */.uw)(lastElement);
  if (!scopeOrItem) return new data_integration/* EmptyDataScope */.Ao();
  if (scopeOrItem instanceof data_integration/* DataItem */.sO) {
    return scopeOrItem.dataClass().all().transform({ filters: { _id: scopeOrItem.id() } });
  }
  return scopeOrItem;
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/hooks/use_data_item.ts



function useDataItem(dataClassName) {
  const stackElement = (0,data_context_container/* useClosestSingleItemElement */.OW)(dataClassName) || dataClassName && (0,data_integration/* findItemInGlobalData */.dw)(dataClassName);
  if (!stackElement) return;
  if ((0,data_integration/* isDataItemPojo */.o3)(stackElement)) return (0,data_integration/* deserializeDataItem */.bU)(stackElement);
  const itemPojo = (0,data_integration/* scopePojoToItemPojo */.Zk)(stackElement);
  if (itemPojo) return (0,data_integration/* deserializeDataItem */.bU)(itemPojo);
}

// EXTERNAL MODULE: ./scrivito_sdk/react/hooks/use_data_locator.ts
var use_data_locator = __webpack_require__(3726);
;// CONCATENATED MODULE: ./scrivito_sdk/react/hooks/use_data_scope.ts



function useDataScope(dataClassName) {
  const stackElement = (0,data_context_container/* useClosestMultiItemElement */.t0)(dataClassName);
  if (stackElement) return (0,data_integration/* deserializeDataScope */.w1)(stackElement);
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/hooks/use_attribute_definition.ts


function useAttributeDefinition() {
  var _a;
  const scope = useData();
  const attributeName = scope.attributeName();
  return attributeName !== null && ((_a = scope.dataClass()) == null ? void 0 : _a.attributeDefinitions()[attributeName]) || [
    void 0,
    {}
  ];
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/url_for.ts
var url_for = __webpack_require__(9857);
;// CONCATENATED MODULE: ./scrivito_sdk/react/hooks/use_url_for.ts

var use_url_for_defProp = Object.defineProperty;
var use_url_for_defProps = Object.defineProperties;
var use_url_for_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var use_url_for_getOwnPropSymbols = Object.getOwnPropertySymbols;
var use_url_for_hasOwnProp = Object.prototype.hasOwnProperty;
var use_url_for_propIsEnum = Object.prototype.propertyIsEnumerable;
var use_url_for_defNormalProp = (obj, key, value) => key in obj ? use_url_for_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var use_url_for_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (use_url_for_hasOwnProp.call(b, prop))
      use_url_for_defNormalProp(a, prop, b[prop]);
  if (use_url_for_getOwnPropSymbols)
    for (var prop of use_url_for_getOwnPropSymbols(b)) {
      if (use_url_for_propIsEnum.call(b, prop))
        use_url_for_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var use_url_for_spreadProps = (a, b) => use_url_for_defProps(a, use_url_for_getOwnPropDescs(b));





function useUrlFor(target, options) {
  const dataStack = (0,data_context_container/* useDataStack */.CW)();
  const query = addDataContextQueryTo(
    options == null ? void 0 : options.query,
    dataStack,
    (0,realm/* unwrapAppClass */.zo)(target)
  );
  return (0,url_for/* urlFor */.d)(target, use_url_for_spreadProps(use_url_for_spreadValues({}, options), { query }));
}
function addDataContextQueryTo(givenQuery, dataStack, target) {
  if (target instanceof models/* Binary */.yI || !dataStack) return givenQuery;
  return (0,data_integration/* getDataContextQuery */.qD)((0,realm/* unwrapAppClass */.zo)(target), dataStack, givenQuery);
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/hooks/use_resolved_value.ts





function useResolvedHtmlValue(text) {
  return useResolvedValue(text, (escape_default()));
}
function useResolvedStringValue(text) {
  return useResolvedValue(text);
}
function useResolvedValue(text, transform) {
  const dataContextContainer = (0,data_context_container/* useDataContextContainer */.iH)();
  const dataStack = dataContextContainer == null ? void 0 : dataContextContainer.dataStack;
  const placeholders = dataContextContainer == null ? void 0 : dataContextContainer.placeholders;
  return (0,replace_internal_links/* replaceInternalLinks */.n)(
    (0,data_integration/* replacePlaceholdersWithData */.V8)(text, {
      dataStack,
      placeholders,
      transform
    }),
    { dataStack }
  );
}

// EXTERNAL MODULE: external "lodash-es/isDate"
var isDate_ = __webpack_require__(8307);
var isDate_default = /*#__PURE__*/__webpack_require__.n(isDate_);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/has_component.ts
var has_component = __webpack_require__(9708);
;// CONCATENATED MODULE: ./scrivito_sdk/react/hooks/use_content.ts











function useContent(content, attributeName) {
  return resolveContent(content, attributeName, (0,data_context_container/* useDataStackOrThrow */.Xu)());
}
function resolveContent(content, attributeName, dataStack) {
  const typeInfo = getTypeInfo(content, attributeName);
  if (!typeInfo) return null;
  return (0,realm/* wrapInAppClass */.Dy)(
    resolveBasicContent(
      (0,realm/* unwrapAppClass */.zo)(content),
      attributeName,
      typeInfo,
      dataStack
    )
  );
}
function resolveBasicContent(basicContent, attributeName, typeInfo, dataStack) {
  const valueOrConnection = (0,models/* getContentValueOrConnection */.Ed)(
    basicContent,
    attributeName,
    typeInfo
  );
  if ((0,models/* isContentConnection */.uD)(valueOrConnection)) {
    return toBasicValue(
      (0,data_integration/* applyDataLocator */.ZJ)(dataStack, valueOrConnection[1]),
      typeInfo
    );
  }
  return valueOrConnection[1];
}
function toBasicValue(dataScope, typeInfo) {
  const itemAttribute = dataScope.dataItemAttribute();
  if (itemAttribute) {
    return itemAttributeToBasicValue(
      itemAttribute.dataItem(),
      itemAttribute.attributeName(),
      typeInfo
    );
  }
  const dataItem = dataScope.dataItem();
  if (dataItem) return itemToBasicValue(dataItem, typeInfo[0]);
  return scopeToBasicValue(dataScope, typeInfo);
}
function scopeToBasicValue(dataScope, [attributeType]) {
  const items = dataScope.take();
  if (attributeType === "linklist") {
    return items.map(itemToLink).filter(common/* isPresent */.Wo);
  }
  if (attributeType === "referencelist") {
    return items.map(itemToReference).filter(common/* isPresent */.Wo);
  }
  return toDefaultValue(attributeType);
}
function itemAttributeToBasicValue(dataItem, attributeName, typeInfo) {
  const obj = dataItem.obj();
  if (obj) {
    return objAttributeToBasicValue(obj, attributeName, typeInfo);
  }
  return externalAttributeToBasicValue(dataItem, attributeName, typeInfo);
}
function itemToBasicValue(dataItem, attributeType) {
  switch (attributeType) {
    case "reference":
      return itemToReference(dataItem);
    case "referencelist":
      return toList(itemToReference(dataItem));
    case "link":
      return itemToLink(dataItem);
    case "linklist":
      return toList(itemToLink(dataItem));
    default:
      return null;
  }
}
function itemToReference(dataItem) {
  return (0,realm/* unwrapAppClass */.zo)(dataItem.obj()) || null;
}
function itemToLink(dataItem) {
  const obj = dataItem.obj();
  let link = null;
  if (obj && ((0,has_component/* hasComponent */.I)(obj.objClass()) || obj.isBinary())) {
    link = new models/* BasicLink */.Re({ objId: obj.id() });
  }
  const detailsPageAndQuery = (0,get_details_page_url/* getDetailsPageAndQuery */.Z)(dataItem, (0,current_page/* currentSiteId */.OI)());
  if (detailsPageAndQuery) {
    const { detailsPage, queryString } = detailsPageAndQuery;
    link = new models/* BasicLink */.Re({ objId: detailsPage.id(), query: queryString });
  }
  return link;
}
function toList(value) {
  return value === null ? [] : [value];
}
function objAttributeToBasicValue(obj, attributeName, typeInfo) {
  var _a;
  const basicObj = (0,realm/* unwrapAppClass */.zo)(obj);
  if (((_a = getTypeInfo(obj, attributeName)) == null ? void 0 : _a[0]) === "datalocator") {
    (0,common/* logError */.vV)('Connecting a "datalocator" attribute is not possible');
    return null;
  }
  return basicObj.get(attributeName, typeInfo);
}
function externalAttributeToBasicValue(dataItem, attributeName, typeInfo) {
  var _a;
  const externalAttributeType = (_a = dataItem.dataClass().attributeDefinitions()[attributeName]) == null ? void 0 : _a[0];
  const unknownValue = dataItem.get(attributeName);
  if (externalAttributeType === "string") {
    return externalStringAttributeToBasicValue(unknownValue, typeInfo);
  }
  if (externalAttributeType === "enum") {
    return externalEnumAttributeToBasicValue(unknownValue, typeInfo);
  }
  if (externalAttributeType === "number") {
    return externalNumberAttributeToBasicValue(unknownValue, typeInfo);
  }
  if (externalAttributeType === "boolean") {
    return externalBooleanAttributeToBasicValue(unknownValue, typeInfo);
  }
  if (externalAttributeType === "date") {
    return externalDateAttributeToBasicValue(unknownValue, typeInfo);
  }
  if (externalAttributeType === "reference") {
    return externalReferenceAttributeToBasicValue(unknownValue, typeInfo);
  }
  return null;
}
function externalStringAttributeToBasicValue(unknownValue, typeInfo) {
  const value = (0,common/* assumeString */.uV)(unknownValue);
  const [targetAttributeType, targetTypeInfoConfig] = typeInfo;
  switch (targetAttributeType) {
    case "string":
      return value;
    case "html":
      return escape_default()(value);
    case "enum":
      return externalStringAttributeToEnumValue(value, targetTypeInfoConfig);
    case "multienum":
      return toList(
        externalStringAttributeToEnumValue(value, targetTypeInfoConfig)
      );
    case "stringlist":
      return toList(value);
    default:
      return null;
  }
}
function externalEnumAttributeToBasicValue(unknownValue, typeInfo) {
  const value = assumeStringOrNull(unknownValue);
  const [targetAttributeType] = typeInfo;
  if (value === null) {
    switch (targetAttributeType) {
      case "string":
        return "";
      case "multienum":
        return [];
      default:
        return null;
    }
  }
  return externalStringAttributeToBasicValue(unknownValue, typeInfo);
}
function externalNumberAttributeToBasicValue(unknownValue, typeInfo) {
  const value = assumeNumber(unknownValue);
  const [targetAttributeType] = typeInfo;
  switch (targetAttributeType) {
    case "float":
      return (0,common/* convertToFloat */.h_)(value);
    case "integer":
      return (0,common/* convertToInteger */.P3)(value);
    default:
      return null;
  }
}
function externalBooleanAttributeToBasicValue(unknownValue, typeInfo) {
  const value = assumeBoolean(unknownValue);
  const [targetAttributeType] = typeInfo;
  return targetAttributeType === "boolean" ? value : toDefaultValue("boolean");
}
function externalDateAttributeToBasicValue(unknownValue, typeInfo) {
  const value = assumeDateOrNull(unknownValue);
  const [targetAttributeType] = typeInfo;
  return targetAttributeType === "date" || targetAttributeType === "datetime" ? value : null;
}
function externalReferenceAttributeToBasicValue(unknownValue, typeInfo) {
  if (unknownValue instanceof data_integration/* DataItem */.sO) {
    switch (typeInfo[0]) {
      case "link":
        return itemToLink(unknownValue);
      case "linklist":
        return toList(itemToLink(unknownValue));
      default:
        return null;
    }
  }
  return null;
}
function externalStringAttributeToEnumValue(value, typeInfoConfig) {
  return typeInfoConfig.values.includes(value) ? value : null;
}
function toDefaultValue(attributeType) {
  switch (attributeType) {
    case "linklist":
    case "referencelist":
      return [];
    case "boolean":
      return false;
    default:
      return null;
  }
}
function getTypeInfo(content, attributeName) {
  var _a;
  return (_a = realm/* Schema */.Sj.forInstance(content)) == null ? void 0 : _a.attributes()[attributeName];
}
function assumeStringOrNull(value) {
  if (value === null || typeof value === "string") return value;
  throw new common/* InternalError */.Gd();
}
function assumeBoolean(value) {
  if (typeof value === "boolean") return value;
  throw new common/* InternalError */.Gd();
}
function assumeNumber(value) {
  if (typeof value === "number") return value;
  throw new common/* InternalError */.Gd();
}
function assumeDateOrNull(value) {
  if (value === null || isDate_default()(value)) return value;
  throw new common/* InternalError */.Gd();
}

// EXTERNAL MODULE: ./scrivito_sdk/react/has_component.ts
var react_has_component = __webpack_require__(580);
;// CONCATENATED MODULE: ./scrivito_sdk/react/index.ts
































/***/ }),

/***/ 9576:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ memo)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(629);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4665);



function memo(Component) {
  return react__WEBPACK_IMPORTED_MODULE_0__.memo(Component, scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .propsAreEqual */ .Pi);
}


/***/ }),

/***/ 3602:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Ng: () => (/* reexport */ connect),
  NY: () => (/* reexport */ displayNameFromComponent),
  O$: () => (/* reexport */ finishLoading),
  BK: () => (/* reexport */ getElementType),
  Gf: () => (/* reexport */ isClassComponent)
});

// UNUSED EXPORTS: Hibernation, forwardElementTypeProps

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(629);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 63 modules
var common = __webpack_require__(4665);
// EXTERNAL MODULE: ./scrivito_sdk/data/index.ts + 30 modules
var data = __webpack_require__(7164);
// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 26 modules
var loadable = __webpack_require__(4772);
;// CONCATENATED MODULE: ./scrivito_sdk/react_connect/display_name_from_component.ts

function displayNameFromComponent(component) {
  return component.displayName || component.name;
}

;// CONCATENATED MODULE: ./scrivito_sdk/react_connect/get_element_type.ts


function getElementType(node) {
  if ((0,external_react_.isValidElement)(node)) {
    const forwardedType = node.props.__scrivitoForwardElementType;
    return forwardedType || node.type;
  }
}
function forwardElementTypeProps(node) {
  return { __scrivitoForwardElementType: getElementType(node) };
}

;// CONCATENATED MODULE: ./scrivito_sdk/react_connect/hooks/use_force_update.ts


function useForceUpdate() {
  const [, setCounter] = external_react_.useState(0);
  return () => setCounter((counter) => counter + 1);
}

;// CONCATENATED MODULE: ./scrivito_sdk/react_connect/is_class_component.ts

function isClassComponent(component) {
  return typeof component === "function" && component.prototype && component.prototype.isReactComponent;
}

;// CONCATENATED MODULE: ./scrivito_sdk/react_connect/loading_monitor.ts


let loadingCount = 0;
let deferred;
function finishLoading() {
  if (!deferred) {
    deferred = new common/* Deferred */.cY();
    (0,common/* nextTick */.dY)(updateLoadingState);
  }
  return deferred.promise;
}
function registerLoadingActivity() {
  loadingCount += 1;
  return createUnregister();
}
function createUnregister() {
  let unregisterHasBeenCalled = false;
  return function unregister() {
    if (unregisterHasBeenCalled) {
      throw new common/* InternalError */.Gd();
    }
    loadingCount -= 1;
    unregisterHasBeenCalled = true;
    if (loadingCount === 0) {
      (0,common/* nextTick */.dY)(updateLoadingState);
    }
  };
}
function updateLoadingState() {
  if (deferred && loadingCount === 0) {
    deferred.resolve();
    deferred = void 0;
  }
}
(0,common/* onReset */.Nj)(() => {
  deferred = void 0;
  loadingCount = 0;
});

// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(1946);
;// CONCATENATED MODULE: ./scrivito_sdk/react_connect/connect.tsx

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










function connect(component, options) {
  if (typeof component !== "function") {
    throw new common/* ArgumentError */.c1(
      "Scrivito.connect expects either a plain function or a subclass of React.Component"
    );
  }
  if (isConnectedComponent(component)) {
    return component;
  }
  return isClassComponent(component) ? connectClassComponent(component, options) : connectFunctionComponent(component, options);
}
function connectClassComponent(classComponent, options) {
  var _a;
  const connectedComponent = (_a = class extends classComponent {
    constructor(props) {
      super(props);
      const initialLoaderComponent = options == null ? void 0 : options.loading;
      const _scrivitoRenderWhileLoading = initialLoaderComponent ? () => external_react_.createElement(initialLoaderComponent, props) : this._scrivitoRenderWhileLoading;
      this._scrivitoPrivateConnector = new ComponentConnector(
        Object.assign(this, { _scrivitoRenderWhileLoading })
      );
      const { componentDidMount, componentWillUnmount } = this;
      const hasComponentDidMountBeenTampered = componentDidMount !== connectedComponent.prototype.componentDidMount;
      if (hasComponentDidMountBeenTampered) {
        this.componentDidMount = () => {
          connectedComponent.prototype.componentDidMount.call(this);
          componentDidMount.call(this);
        };
      }
      const hasComponentWillUnmountBeenTampered = componentWillUnmount !== connectedComponent.prototype.componentWillUnmount;
      if (hasComponentWillUnmountBeenTampered) {
        this.componentWillUnmount = () => {
          connectedComponent.prototype.componentWillUnmount.call(this);
          componentWillUnmount.call(this);
        };
      }
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
  connectedComponent.displayName = displayNameFromComponent(classComponent);
  return connectedComponent;
}
function connectFunctionComponent(functionalComponent, options) {
  const initialLoaderComponent = options == null ? void 0 : options.loading;
  const connectedComponent = (props) => (
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useConnectedRender(
      () => functionalComponent(props),
      initialLoaderComponent ? () => external_react_.createElement(initialLoaderComponent, props) : void 0
    )
  );
  connectedComponent._isScrivitoConnectedComponent = true;
  connectedComponent.displayName = displayNameFromComponent(functionalComponent);
  return connectedComponent;
}
function useConnectedRender(originalRender, initialLoaderComponent) {
  const forceUpdate = useForceUpdate();
  const connectorRef = external_react_.useRef(void 0);
  if (!connectorRef.current) {
    connectorRef.current = new ComponentConnector({
      forceUpdate,
      _scrivitoRenderWhileLoading: initialLoaderComponent
    });
  }
  const connector = connectorRef.current;
  external_react_.useEffect(() => {
    connector.componentDidMount();
    return () => connector.componentWillUnmount();
  }, []);
  return connector.render(originalRender);
}
function isConnectedComponent(component) {
  return component._isScrivitoConnectedComponent === true;
}
const connect_ReactConnectContext = external_react_.createContext({
  hierarchyLevel: 0
});
class ComponentConnector {
  constructor(component) {
    this.component = component;
    this.wasComponentShown = false;
    this.loadingSubscriber = new loadable/* LoadingSubscriber */.PF();
  }
  componentDidMount() {
    var _a;
    if (this.context === void 0) {
      throw new common/* InternalError */.Gd();
    }
    this.stateSubscriber = (0,state/* createSyncSubscriber */.wr)(
      () => (0,state/* withUnfrozenState */.L9)(() => this.component.forceUpdate()),
      this.context.hierarchyLevel
    );
    this.awakeSubscription = (_a = this.context.awakeness) == null ? void 0 : _a.subscribe(
      (awake) => {
        var _a2;
        return (_a2 = this.stateSubscriber) == null ? void 0 : _a2.setAwake(awake);
      }
    );
    if (this.lastRenderedState) this.subscribeState(this.lastRenderedState);
  }
  componentWillUnmount() {
    var _a;
    (_a = this.awakeSubscription) == null ? void 0 : _a.unsubscribe();
    this.unsubscribeState();
    this.stateSubscriber = void 0;
  }
  render(originalRender) {
    const reactElement = this.renderLoadingAware(originalRender);
    return /* @__PURE__ */ external_react_.createElement(connect_ReactConnectContext.Consumer, __spreadValues({}, forwardElementTypeProps(reactElement)), (context) => /* @__PURE__ */ external_react_.createElement(
      connect_ReactConnectContext.Provider,
      {
        value: this.grabAndProvideChildContext(context)
      },
      reactElement
    ));
  }
  /* grab connect context as a side-effect of rendering.
   * ugly, but doing this nicer is only possible in a hook-only way
   * and Scrivito.connect needs to support class components also.
   */
  grabAndProvideChildContext(context) {
    this.context = context;
    this.childContext || (this.childContext = __spreadProps(__spreadValues({}, context), {
      hierarchyLevel: context.hierarchyLevel + 1
    }));
    return this.childContext;
  }
  renderLoadingAware(originalRender) {
    if ((0,loadable/* isCurrentlyCapturing */.ih)()) {
      return runWithFrozenState(originalRender);
    }
    const captured = (0,loadable/* capture */.Fg)(
      () => (0,state/* trackStateAccess */.j2)(
        () => (0,data/* runWithPerformanceConstraint */.X2)(() => runWithFrozenState(originalRender))
      )
    );
    this.lastRenderedState = captured;
    this.subscribeState(captured);
    const { result } = captured.result;
    if (captured.isAllDataLoaded()) {
      this.wasComponentShown = true;
      return result;
    }
    return this.handleLoading(result);
  }
  subscribeState(captured) {
    if (!this.stateSubscriber) return;
    this.stateSubscriber.subscribeChanges(captured.result.accessedState);
    captured.subscribeLoading(this.loadingSubscriber);
    if (captured.isAllDataLoaded()) this.unregisterLoadingActivity();
    else this.registerLoadingActivity();
  }
  unsubscribeState() {
    if (this.stateSubscriber) this.stateSubscriber.unsubscribe();
    this.unregisterLoadingActivity();
    this.loadingSubscriber.unsubscribe();
  }
  handleLoading(preliminaryResult) {
    if (this.component._scrivitoRenderWhileLoading && !this.wasComponentShown) {
      return this.component._scrivitoRenderWhileLoading();
    }
    return preliminaryResult;
  }
  registerLoadingActivity() {
    if (!this.unregisterLoadingActivityCallback) {
      this.unregisterLoadingActivityCallback = registerLoadingActivity();
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
  const run = (0,loadable/* runAndCatchErrorsWhileLoading */.Kn)(
    () => (0,state/* withFrozenState */.Ij)(
      {
        contextName: "React.Component#render",
        message: "Use one of the React lifecycle hooks."
      },
      originalRender
    )
  );
  return run.success ? run.result : null;
}

;// CONCATENATED MODULE: ./scrivito_sdk/react_connect/components/hibernation.tsx

var hibernation_defProp = Object.defineProperty;
var hibernation_defProps = Object.defineProperties;
var hibernation_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var hibernation_getOwnPropSymbols = Object.getOwnPropertySymbols;
var hibernation_hasOwnProp = Object.prototype.hasOwnProperty;
var hibernation_propIsEnum = Object.prototype.propertyIsEnumerable;
var hibernation_defNormalProp = (obj, key, value) => key in obj ? hibernation_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var hibernation_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (hibernation_hasOwnProp.call(b, prop))
      hibernation_defNormalProp(a, prop, b[prop]);
  if (hibernation_getOwnPropSymbols)
    for (var prop of hibernation_getOwnPropSymbols(b)) {
      if (hibernation_propIsEnum.call(b, prop))
        hibernation_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var hibernation_spreadProps = (a, b) => hibernation_defProps(a, hibernation_getOwnPropDescs(b));



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
  const awakenessRef = React.useRef(
    void 0
  );
  if (awakenessRef.current === void 0 && !awake) return null;
  awakenessRef.current || (awakenessRef.current = new BehaviorSubject(true));
  awakenessRef.current.next(awake && isParentAwake);
  return /* @__PURE__ */ React.createElement(
    ReactConnectContext.Provider,
    {
      value: hibernation_spreadProps(hibernation_spreadValues({}, context), { awakeness: awakenessRef.current })
    },
    children
  );
};

;// CONCATENATED MODULE: ./scrivito_sdk/react_connect/index.ts









/***/ }),

/***/ 7461:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  N_: () => (/* reexport */ Link),
  OH: () => (/* reexport */ Obj),
  mZ: () => (/* reexport */ ObjFacetValue),
  G5: () => (/* reexport */ ObjSearch),
  Sj: () => (/* reexport */ Schema),
  x0: () => (/* reexport */ Widget),
  Pi: () => (/* reexport */ allObjClasses),
  Yh: () => (/* reexport */ allWidgetClasses),
  KZ: () => (/* reexport */ createObjClass),
  dl: () => (/* reexport */ createWidgetClass),
  w5: () => (/* reexport */ enableStrictSearchOperators),
  an: () => (/* reexport */ getRealmClass),
  Xg: () => (/* reexport */ isBinaryBasicObj),
  I6: () => (/* reexport */ isObjClass),
  Hk: () => (/* reexport */ registerObjClass),
  C4: () => (/* reexport */ registerWidgetClass),
  e6: () => (/* reexport */ schemaFromBasicObjOrWidget),
  kI: () => (/* reexport */ setCurrentSiteIdHandler),
  OE: () => (/* reexport */ unwrapAppAttributes),
  zo: () => (/* reexport */ unwrapAppClass),
  Dy: () => (/* reexport */ wrapInAppClass)
});

// EXTERNAL MODULE: ./scrivito_sdk/models/index.ts + 39 modules
var models = __webpack_require__(8927);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 63 modules
var common = __webpack_require__(4665);
// EXTERNAL MODULE: external "lodash-es/mapValues"
var mapValues_ = __webpack_require__(7885);
var mapValues_default = /*#__PURE__*/__webpack_require__.n(mapValues_);
;// CONCATENATED MODULE: ./scrivito_sdk/realm/assert_valid_attribute_name.ts


function assertValidAttributeName(attributeName) {
  if (!(0,common/* isCamelCase */.Dz)(attributeName)) {
    throw new common/* ArgumentError */.c1("Attribute names have to be in camel case.");
  }
  if ((0,common/* isSystemAttribute */.iI)(attributeName)) {
    throw new common/* ArgumentError */.c1(
      `Attribute name "${attributeName}" is not a valid custom attribute name.`
    );
  }
}

// EXTERNAL MODULE: ./scrivito_sdk/realm/initial_content_registry.ts
var initial_content_registry = __webpack_require__(6830);
;// CONCATENATED MODULE: ./scrivito_sdk/realm/initial_attributes_for.ts


function initialAttributesFor(providedAttributes, schema, appClassName) {
  const initialAttributes = {};
  Object.keys(schema.attributes()).forEach((attributeName) => {
    if (!Object.prototype.hasOwnProperty.call(providedAttributes, attributeName)) {
      const initialValue = (0,initial_content_registry/* initialContentFor */.h)(appClassName, attributeName);
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
    if (!schema) return null;
    const typeInfo = schema.attribute(attributeName);
    if (!typeInfo) return null;
    return new models/* BasicField */.$e(
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
    if (!blobDefinition) return false;
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
  if (typeof attrDefinition === "string") return [attrDefinition];
  const type = attrDefinition[0];
  if (type === "enum" || type === "multienum") return [type, attrDefinition[1]];
  const _a = attrDefinition[1], { only } = _a, otherOptions = __objRest(_a, ["only"]);
  const validClasses = typeof only === "string" ? [only] : only;
  if (type === "widgetlist" && !validClasses && attrDefinition[1].maximum) {
    return ["widgetlist", { maximum: attrDefinition[1].maximum }];
  }
  return validClasses ? [type, __spreadProps(__spreadValues({}, otherOptions), { validClasses })] : [type];
}
function toNormalizedAttributeDefinition(definition) {
  if (definition.length === 1) return [definition[0], {}];
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
  if (typeof value === "string") return [value];
  if (value == null ? void 0 : value.length) return value;
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/sub_widgets.ts


function subWidgets(content) {
  const contentSchema = schemaFromBasicObjOrWidget(content);
  if (!contentSchema) return [];
  const attributes = contentSchema.attributes();
  return Object.keys(attributes).reduce((memo, attrName) => {
    const [attrType] = attributes[attrName];
    if (attrType === "widget") {
      const widget = content.get(attrName, "widget");
      if (widget) return [...memo, widget, ...subWidgets(widget)];
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
      throw new common/* ArgumentError */.c1(
        "Use a specific class (like TextWidget or ImageWidget) to create a Widget."
      );
    }
    assertValidAttributes(attributes);
    const schema = Schema.forInstance(this);
    if (!schema) throw new common/* InternalError */.Gd();
    const basicAttributes = unwrapAppAttributes(
      widget_spreadProps(widget_spreadValues({}, attributes), { _objClass: appClassName }),
      schema,
      appClassName
    );
    const basicWidget = models/* BasicWidget */.$R.createWithUnknownValues(basicAttributes);
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
  static attributeDefinitions() {
    const schema = Schema.forClass(this);
    if (!schema) return {};
    return schema.normalizedAttributes();
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
  /** @deprecated Use `Widget#delete` instead */
  destroy() {
    this.delete();
  }
  delete() {
    this._scrivitoPrivateContent.delete();
  }
  container() {
    const container = this._scrivitoPrivateContent.container();
    return wrapInAppClass(container);
  }
  attributeDefinitions() {
    const schema = Schema.forInstance(this);
    if (!schema) return {};
    return schema.normalizedAttributes();
  }
}
function assertValidAttributes(attributes) {
  if (attributes.constructor !== Object) {
    throw new common/* ArgumentError */.c1(
      "The provided attributes are invalid. They have to be an Object with valid Scrivito attribute values."
    );
  }
  if (attributes._objClass) {
    throw new common/* ArgumentError */.c1(
      `Invalid attribute "_objClass". "new ${String(
        attributes._objClass
      )}" will automatically set the CMS object class correctly.`
    );
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/registry.ts




let mapping = {};
function registerRealmClass(name, klass) {
  mapping[name] = klass;
}
function getRealmClass(name) {
  return mapping[name] || null;
}
function objClassNameFor(modelClass) {
  return Object.keys(mapping).find((klass) => mapping[klass] === modelClass) || null;
}
function appClassFor(name, baseClass) {
  const appClass = getRealmClass(name);
  return appClass && baseClass.isPrototypeOf(appClass) ? appClass : baseClass;
}
function allObjClasses() {
  return Object.fromEntries(
    Object.entries(mapping).filter(
      ([, modelClass]) => Obj.isPrototypeOf(modelClass)
    )
  );
}
function allWidgetClasses() {
  return Object.fromEntries(
    Object.entries(mapping).filter(
      ([, modelClass]) => Widget.isPrototypeOf(modelClass)
    )
  );
}
function objClassFor(name) {
  return appClassFor(name, Obj);
}
function widgetClassFor(name) {
  return appClassFor(name, Widget);
}
(0,common/* onReset */.Nj)(() => mapping = {});

;// CONCATENATED MODULE: ./scrivito_sdk/realm/wrap_in_app_class.ts






function wrapInAppClass(internalValue) {
  if (Array.isArray(internalValue)) {
    return internalValue.map((value) => wrapInAppClass(value)).filter((value) => value !== null);
  }
  if (internalValue instanceof models/* BasicObj */.kI) {
    return buildAppClassInstance(
      internalValue,
      objClassFor(internalValue.objClass())
    );
  }
  if (internalValue instanceof models/* BasicWidget */.$R) {
    return buildAppClassInstance(
      internalValue,
      widgetClassFor(internalValue.objClass())
    );
  }
  if (internalValue instanceof models/* BasicLink */.Re) {
    if (!internalValue.hasDestination()) return null;
    return buildAppClassInstance(internalValue, Link);
  }
  if (internalValue instanceof models/* ObjUnavailable */.Wk) return null;
  return internalValue;
}
function unwrapAppClass(value) {
  if (Array.isArray(value)) return value.map((v) => unwrapAppClass(v));
  if (hasPrivateContent(value)) return value._scrivitoPrivateContent;
  return value;
}
function unwrapAppAttributes(appAttributes, schema, appClassName) {
  return mapValues_default()(appAttributes, (value, name) => {
    if ((0,common/* isSystemAttribute */.iI)(name)) return [value];
    const normalizedTypeInfo = schema.attribute(name);
    if (!normalizedTypeInfo) {
      throw new common/* ArgumentError */.c1(
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
  const objClass = model.objClass();
  const appClass = getRealmClass(objClass);
  if (!appClass) {
    let baseClass;
    if (model.constructor === Obj) {
      baseClass = "Obj";
    } else {
      baseClass = "Widget";
    }
    throw new common/* ArgumentError */.c1(
      `Updating is not supported on the base class "${baseClass}".`
    );
  }
  if (attributes.constructor !== Object) {
    throw new common/* ArgumentError */.c1(
      "The provided attributes are invalid. They have to be an Object with valid Scrivito attribute values."
    );
  }
  const schema = Schema.forInstance(model);
  const attributesWithTypeInfo = unwrapAppAttributes(
    attributes,
    schema,
    objClass
  );
  model._scrivitoPrivateContent.updateWithUnknownValues(attributesWithTypeInfo);
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/obj_facet_value.ts


class ObjFacetValue {
  /** @internal */
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
(0,common/* onReset */.Nj)(() => strictSearchOperators = false);

;// CONCATENATED MODULE: ./scrivito_sdk/realm/obj_search.ts






class ObjSearch {
  /** @internal */
  constructor(basicSearch) {
    this._scrivitoPrivateContent = basicSearch;
  }
  /** @internal */
  and(fieldOrSearchToExtendBy, operator, value, boost) {
    if (fieldOrSearchToExtendBy instanceof ObjSearch) {
      const search = fieldOrSearchToExtendBy;
      this._scrivitoPrivateContent.and(search._scrivitoPrivateContent);
    } else {
      if (operator === void 0) {
        throw new common/* ArgumentError */.c1("Missing operator to search with");
      }
      if (value === void 0) {
        throw new common/* ArgumentError */.c1(
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
  andIsChildOf(obj) {
    this._scrivitoPrivateContent.andIsChildOf(unwrapAppClass(obj));
    return this;
  }
  andIsInsideSubtreeOf(obj) {
    this._scrivitoPrivateContent.andIsInsideSubtreeOf(unwrapAppClass(obj));
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
    if (!basicObj) return null;
    return wrapInAppClass(basicObj);
  }
  /** @internal */
  take(count) {
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
  /** @internal */
  order(attributeOrAttributes, direction) {
    if (Array.isArray(attributeOrAttributes)) {
      if (direction !== void 0) {
        throw new common/* ArgumentError */.c1(
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
  if (Array.isArray(value)) return value.map((v) => unwrapAppClass(v));
  return unwrapAppClass(value);
}
function checkNonFullTextSearchOperator(functionName, operator, docPermalink) {
  if (models/* FULL_TEXT_OPERATORS */.Wc.indexOf(operator) !== -1) {
    (0,common/* throwInvalidArgumentsError */.Ht)(
      functionName,
      `operator '${operator}' must be a search operator except: ${models/* FULL_TEXT_OPERATORS */.Wc.join(
        ", "
      )}`,
      { docPermalink }
    );
  }
}
function checkFullTextSearchOperator(functionName, operator, docPermalink) {
  if (models/* FULL_TEXT_OPERATORS */.Wc.indexOf(operator) === -1) {
    (0,common/* throwInvalidArgumentsError */.Ht)(
      functionName,
      `operator '${operator}' must be a full text search operator: ${models/* FULL_TEXT_OPERATORS */.Wc.join(
        ", "
      )}`,
      { docPermalink }
    );
  }
}

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
    const obj = (0,models/* getObjBy */.Z0)(this.scope().and(models/* excludeGlobal */.S$), "_path", path);
    return wrapInAppClass(obj);
  }
  getByPermalink(permalink) {
    const obj = (0,models/* getObjBy */.Z0)(this.scope(), "_permalink", permalink);
    return wrapInAppClass(obj);
  }
  root() {
    return wrapInAppClass((0,models/* getRootObjFrom */.Mp)(this.scope()));
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
      // Bang: objClassNameForCreate above ensures that it's a subclass of Obj
      Schema.forClass(this.objClass)
    );
    const basicObj = (0,models/* createObjIn */.ZU)(
      this.scope().and((0,models/* restrictToObjClass */.Lw)(objClassName)),
      attributesForCreate
    );
    return wrapInAppClass(basicObj);
  }
  createFromFile(_0) {
    return __async(this, arguments, function* (file, attributes = {}) {
      const objClassName = this.objClassNameForCreate();
      assertValidFile(file);
      assertValidCreateAttributes(attributes);
      if (Object.prototype.hasOwnProperty.call(attributes, "blob")) {
        throw new common/* ArgumentError */.c1(
          'Setting attribute "blob" is not allowed when creating CMS objects from file, because the file will be assigned to that attribute'
        );
      }
      const schema = Schema.forClass(this.objClass);
      if (!schema.isBinary()) {
        throw new common/* ArgumentError */.c1(
          'Creating CMS objects from file is only available for classes with a binary attribute "blob"'
        );
      }
      const attributesForCreate = prepareAttributesForCreate(
        attributes,
        objClassName,
        schema
      );
      const basicObj = yield (0,models/* createObjFromFileIn */.fK)(
        this.scope().and((0,models/* restrictToObjClass */.Lw)(objClassName)),
        file,
        attributesForCreate
      );
      return wrapInAppClass(basicObj);
    });
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
      (0,models/* getObjFrom */.ED)(this.getScopeRestrictedToSameClass(scope), id)
    );
  }
  getSearch(batchSize) {
    const search = this.getScopeRestrictedToSameClass(this.scope()).search();
    if (batchSize !== void 0) search.batchSize(batchSize);
    return new ObjSearch(search);
  }
  getScopeRestrictedToSameClass(scope) {
    const objClassName = this.objClassName();
    return objClassName ? scope.and((0,models/* restrictToObjClass */.Lw)(objClassName)) : scope;
  }
  objClassName() {
    return objClassNameFor(this.objClass);
  }
  objClassNameForCreate() {
    const objClassName = this.objClassName();
    if (!objClassName) {
      throw new common/* ArgumentError */.c1(
        "Use a specific class (like Page or Image) in order to create an Obj."
      );
    }
    return objClassName;
  }
  scope() {
    return this.scopeIncludingDeletedObjs.and(models/* excludeDeletedObjs */.cb);
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
    throw new common/* ArgumentError */.c1(
      "The provided attributes are invalid. They have to be an Object with valid Scrivito attribute values."
    );
  }
  if (attributes._objClass) {
    throw new common/* ArgumentError */.c1(
      `Invalid attribute "_objClass". "${String(
        attributes._objClass
      )}.create" will automatically set the CMS object class correctly.`
    );
  }
}
function assertValidFile(file) {
  if (!(0,common/* isFile */.fo)(file)) {
    if ((0,common/* isBlob */.qf)(file)) {
      throw new common/* ArgumentError */.c1(
        'Creating CMS objects from file is only available with instances of "File", but an instance of "Blob" is given'
      );
    }
    throw new common/* ArgumentError */.c1(
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

var obj_async = (__this, __arguments, generator) => {
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










function currentSiteContext(objClass) {
  const siteId = currentSiteId();
  if (!siteId) return new BasicSiteContext(objClass, (0,models/* emptyScope */.Kp)());
  return getBasicSiteContext(objClass, (0,models/* restrictToSiteAndGlobal */.y7)(siteId));
}
function getSiteContext(objClass, transformation) {
  return getBasicSiteContext(objClass, transformation).toSiteContext();
}
function getBasicSiteContext(objClass, transformation) {
  const scope = (0,models/* objSpaceScope */.aG)((0,models/* currentObjSpaceId */.eb)()).and(transformation);
  return new BasicSiteContext(objClass, scope);
}
class Obj {
  static get(id) {
    return currentSiteContext(this).get(id);
  }
  /** @internal */
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
    return getSiteContext(this, models/* allSitesAndGlobal */.uz);
  }
  static onSite(siteId) {
    return getSiteContext(this, (0,models/* restrictToSiteAndGlobal */.y7)(siteId));
  }
  static attributeDefinitions() {
    const schema = Schema.forClass(this);
    if (!schema) return {};
    return schema.normalizedAttributes();
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
    return wrapInAppClass((0,models/* versionsOnAllSites */.GY)(this._scrivitoPrivateContent));
  }
  versionOnSite(siteId) {
    return wrapInAppClass((0,models/* versionOnSite */.$9)(this._scrivitoPrivateContent, siteId));
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
  /**
   * Resolves when all previous updates have been persisted.
   * If an update fails the promise is rejected.
   */
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
    if (!schema) return false;
    return schema.isBinary();
  }
  isRestricted() {
    return this._scrivitoPrivateContent.isRestricted();
  }
  contentLength() {
    if (this.isBinary()) return this._scrivitoPrivateContent.contentLength();
    return 0;
  }
  contentType() {
    if (this.isBinary()) return this._scrivitoPrivateContent.contentType();
    return "";
  }
  contentUrl() {
    if (this.isBinary()) return this._scrivitoPrivateContent.contentUrl();
    return "";
  }
  contentId() {
    return this._scrivitoPrivateContent.contentId();
  }
  metadata() {
    if (this.isBinary()) return this._scrivitoPrivateContent.metadata();
    return new models/* MetadataCollection */.gT();
  }
  restrict() {
    this._scrivitoPrivateContent.restrict();
  }
  unrestrict() {
    this._scrivitoPrivateContent.unrestrict();
  }
  /** @internal */
  updateReferences(mapping) {
    return (0,models/* updateReferences */.s8)(this._scrivitoPrivateContent, mapping);
  }
  widget(id) {
    const maybeWidget = this._scrivitoPrivateContent.widget(id);
    return maybeWidget && wrapInAppClass(maybeWidget);
  }
  widgets() {
    return wrapInAppClass(subWidgets(this._scrivitoPrivateContent));
  }
  copy() {
    return obj_async(this, null, function* () {
      const newObj = yield (0,models/* copyObjViaHandler */.rB)(this._scrivitoPrivateContent);
      return wrapInAppClass(newObj);
    });
  }
  /** @deprecated Use `Obj#delete` instead */
  destroy() {
    this.delete();
  }
  delete() {
    this._scrivitoPrivateContent.delete();
  }
  attributeDefinitions() {
    const schema = Schema.forInstance(this);
    if (!schema) return {};
    return schema.normalizedAttributes();
  }
}

// EXTERNAL MODULE: external "lodash-es/isEmpty"
var isEmpty_ = __webpack_require__(5020);
var isEmpty_default = /*#__PURE__*/__webpack_require__.n(isEmpty_);
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
    this._scrivitoPrivateContent = new models/* BasicLink */.Re(basicAttributes);
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
    return obj instanceof models/* BasicObj */.kI ? wrapInAppClass(obj) : null;
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
  const unknownAttrs = Object.keys(attributes).filter(
    (key) => !ALLOWED_ATTRIBUTES.includes(key)
  );
  if (!isEmpty_default()(unknownAttrs)) {
    throw new common/* ArgumentError */.c1(
      `Unexpected attributes ${(0,common/* prettyPrint */.aO)(unknownAttrs)}. Available attributes: ${(0,common/* prettyPrint */.aO)(ALLOWED_ATTRIBUTES)}`
    );
  }
}
function toBasicAttributes(attributes) {
  assertValidPublicAttributes(attributes);
  if (attributes.hasOwnProperty("obj")) {
    return link_spreadProps(link_spreadValues({}, attributes), {
      objId: objIdFromObjValue(attributes.obj)
    });
  }
  return attributes;
}
function objIdFromObjValue(obj) {
  if (!obj) return null;
  return unwrapAppClass(obj).id();
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/app_class_api_check.ts


function validateAttributeDefinitions(attributeDefinitions, apiFunctionName) {
  Object.entries(attributeDefinitions).forEach(
    ([attributeName, definition]) => {
      assertCustomAttributeName(attributeName, apiFunctionName);
      const [attributeType, attributeTypeOptions] = definition;
      if (attributeType === "widgetlist" && typeof attributeTypeOptions !== "string") {
        assertWidgetlistDefinition(
          attributeName,
          attributeTypeOptions,
          apiFunctionName
        );
      }
      if ((attributeType === "enum" || attributeType === "multienum") && typeof attributeTypeOptions !== "string") {
        assertEnumOrMultienumDefinition(
          attributeName,
          attributeTypeOptions,
          apiFunctionName
        );
      }
    }
  );
}
function assertWidgetlistDefinition(attributeName, options, apiFunctionName) {
  if (options.maximum !== void 0) {
    const { maximum } = options;
    if (Number.isInteger(maximum) && maximum > 0) return;
    (0,common/* throwInvalidArgumentsError */.Ht)(
      apiFunctionName,
      `invalid value "${maximum}" supplied to ${attributeName}: The "maximum" must be a positive integer.`,
      { docPermalink: `js-sdk/${apiFunctionName}` }
    );
  }
}
function assertEnumOrMultienumDefinition(attributeName, {
  values
}, apiFunctionName) {
  if (values.includes("")) {
    (0,common/* throwInvalidArgumentsError */.Ht)(
      apiFunctionName,
      `invalid "values" config supplied for ${attributeName}: An empty string is not a valid enum or multienum value.`,
      { docPermalink: `js-sdk/${apiFunctionName}` }
    );
  }
}
function assertCustomAttributeName(name, target) {
  if (isCustomAttributeName(name)) return;
  (0,common/* throwInvalidArgumentsError */.Ht)(
    target,
    `attribute name "${name}" is invalid. Must be a string (alphanumeric, starting with a lower-case character).`,
    { docPermalink: `js-sdk/${target}` }
  );
}
function isCustomAttributeName(name) {
  return /^[a-z](_+[A-Z0-9]|[A-Za-z0-9])*$/.test(name) && (0,common/* underscore */.z9)(name).length <= 50;
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
      throw new common/* ArgumentError */.c1(
        `Invalid value for "extractTextAttributes": ${attribute} is not supported.`
      );
    }
    assertValidExtractTextAttribute(attribute, schema.attribute(attribute));
  });
}
function assertValidBinaryAttribute(schema, extractTextAttribute) {
  if (extractTextAttribute === "blob:text") {
    if (schema.isBinary()) return;
    throw new common/* ArgumentError */.c1(
      'Invalid value for "extractTextAttributes": blob:text is only supported for binary objs.'
    );
  }
  throw new common/* ArgumentError */.c1(
    `Invalid value for "extractTextAttributes": ${extractTextAttribute} is not supported.`
  );
}
function assertValidExtractTextAttribute(attribute, definition) {
  if (!definition) {
    throw new common/* ArgumentError */.c1(
      `Invalid value for "extractTextAttributes": Attribute ${attribute} is not defined.`
    );
  }
  const [attributeType] = definition;
  if (ATTRIBUTE_TYPES_WHITELIST.includes(attributeType)) return;
  throw new common/* ArgumentError */.c1(
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







function createObjClass(definition) {
  if (definition.attributes) {
    validateAttributeDefinitions(definition.attributes, "createObjClass");
  }
  return createAppObjClass(definition);
}
function createWidgetClass(definition) {
  if (definition.attributes) {
    validateAttributeDefinitions(definition.attributes, "createWidgetClass");
  }
  return createAppWidgetClass(definition);
}
function createAppObjClass(definition) {
  if (definition.extend && !isOrExtends(definition.extend, Obj)) {
    throw new common/* ArgumentError */.c1(
      'Invalid value for "extend": not a Scrivito Obj class'
    );
  }
  if (definition.onlyInside && isBinary(definition)) {
    throw new common/* ArgumentError */.c1(
      "onlyInside must not be specified for binary object classes."
    );
  }
  if (definition.onlyChildren && isBinary(definition)) {
    throw new common/* ArgumentError */.c1(
      "onlyChildren must not be specified for binary object classes."
    );
  }
  if (definition.onlyAsRoot === true && definition.validAsRoot === false) {
    throw new common/* ArgumentError */.c1(
      "validAsRoot must not be set to false for an object class permitted onlyAsRoot."
    );
  }
  if (definition.onlyAsRoot && isBinary(definition)) {
    throw new common/* ArgumentError */.c1(
      "onlyAsRoot must not be specified for binary object classes."
    );
  }
  if (definition.validAsRoot && isBinary(definition)) {
    throw new common/* ArgumentError */.c1(
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
    throw new common/* ArgumentError */.c1(
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
  if (!maybeClass) return false;
  if (maybeClass === klass) return true;
  return maybeClass.prototype instanceof klass;
}
function isBinary(definition) {
  var _a;
  return ((_a = definition.attributes) == null ? void 0 : _a.blob) === "binary";
}
function registerObjClass(name, objClassOrDefinition) {
  validateAttrs(objClassOrDefinition);
  const objClass = isAppClass(objClassOrDefinition) ? objClassOrDefinition : createAppObjClass(realm_spreadProps(realm_spreadValues({}, objClassOrDefinition), { name }));
  registerRealmClass(name, objClass);
  return objClass;
}
function registerWidgetClass(name, widgetClassOrDefinition) {
  validateAttrs(widgetClassOrDefinition);
  const widgetClass = isAppClass(widgetClassOrDefinition) ? widgetClassOrDefinition : createAppWidgetClass(realm_spreadProps(realm_spreadValues({}, widgetClassOrDefinition), { name }));
  registerRealmClass(name, widgetClass);
  return widgetClass;
}
function validateAttrs(definition) {
  if ("extend" in definition && definition.extend) {
    if (!isAppClass(definition.extend)) {
      throw new common/* ArgumentError */.c1(
        "Unexpected value for key 'extend'. It must be a valid ObjClass."
      );
    }
  }
  if (!isAppClass(definition) && definition.attributes) {
    validateAttributeDefinitions(definition.attributes, "provideObjClass");
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/schema_from_basic_obj_or_widget.ts


function schemaFromBasicObjOrWidget(objOrWidget) {
  const className = objOrWidget.objClass();
  if (!className) return;
  const objClass = getRealmClass(className);
  if (!objClass) return;
  return Schema.forClass(objClass);
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/is_binary_basic_obj.ts


function isBinaryBasicObj(basicObj) {
  const schema = schemaFromBasicObjOrWidget(basicObj);
  return !!schema && schema.isBinary();
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/is_obj_class.ts



function isObjClass(klass) {
  if (klass === Obj) return true;
  if (klass === Widget) return false;
  const schema = Schema.forClass(klass);
  if (!schema) throw new common/* InternalError */.Gd();
  return isObjClass(schema.parent());
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/index.ts


















/***/ }),

/***/ 6830:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ initialContentFor),
/* harmony export */   l: () => (/* binding */ setInitialContentFor)
/* harmony export */ });

let initialContentForFn = () => void 0;
function setInitialContentFor(value) {
  initialContentForFn = value;
}
function initialContentFor(className, attributeName) {
  return initialContentForFn(className, attributeName);
}


/***/ }),

/***/ 1946:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Rs: () => (/* reexport */ addBatchUpdate),
  VM: () => (/* reexport */ createAsyncSubscriber),
  Ld: () => (/* reexport */ createStateContainer),
  wr: () => (/* reexport */ createSyncSubscriber),
  q2: () => (/* reexport */ failIfFrozen),
  lB: () => (/* reexport */ observe),
  Ml: () => (/* reexport */ observeSync),
  j2: () => (/* reexport */ trackStateAccess),
  I7: () => (/* reexport */ withBatchedUpdates),
  Ij: () => (/* reexport */ withFrozenState),
  L9: () => (/* reexport */ withUnfrozenState)
});

// UNUSED EXPORTS: StateChangePreventedError, StateReference, createNotificationCounter, listenerCount, resetGlobalState

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 63 modules
var common = __webpack_require__(4665);
;// CONCATENATED MODULE: ./scrivito_sdk/state/primitive_value.ts


function isPrimitiveObject(value) {
  return (0,common/* isObject */.Gv)(value) && !instanceOfClass(value);
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


const frozenContextContainer = new common/* ContextContainer */.hl();
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
class StateChangePreventedError extends common/* ScrivitoError */.aS {
  constructor(frozenContext, operationName) {
    super(
      `${operationName} is not permitted inside '${frozenContext.contextName}'. ` + (frozenContext.message || "")
    );
    this.frozenContext = frozenContext;
    this.operationName = operationName;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/state/copy_on_write_store.ts


class CopyOnWriteStore {
  constructor(value, copy) {
    this.value = value;
    this.copy = copy;
    this.valueForReading = new common/* ContextContainer */.hl();
  }
  /** run some code that needs to read the value.
   * the passed-in `value` is guaranteed not to change, i.e.
   * any concurrent writes won't become visible.
   */
  read(fn) {
    const currentValue = this.value;
    return this.valueForReading.runWith(currentValue, () => fn(currentValue));
  }
  /** run some code that modifies the value.
   * the modifications will not become visible to concurrent readers.
   */
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
  /** This method is exposed to other packages as
   * `createSyncSubscriber` and `createAsyncSubscriber`.
   */
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
      const index = subscribers.findIndex((s) => s.rank > subscriber.rank);
      const spliceIndex = index === -1 ? subscribers.length : index;
      subscribers.splice(spliceIndex, 0, subscriber);
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
    this.scheduleNotify = (0,common/* collectAndSchedule */.Lu)(common/* nextTick */.dY, () => this.notify());
  }
  /** This method is exposed to other packages as
   * part of the StateSubscriber interface.
   */
  subscribeChanges(stateReference) {
    if (!this.activeReference) this.subscriberSet.add(this);
    this.activeReference = stateReference;
    if (this.hasChanges()) this.listener();
  }
  /** This method is exposed to other packages as
   * part of the StateSubscriber interface.
   */
  unsubscribe() {
    if (!this.activeReference) return;
    this.subscriberSet.remove(this);
    this.activeReference = void 0;
  }
  /** This method is exposed to other packages as
   * part of the StateSubscriber interface.
   */
  setAwake(awake) {
    this.awake = awake;
    if (awake && this.notificationDuringSleep) {
      this.notify();
      this.notificationDuringSleep = false;
    }
  }
  notify() {
    if (!this.activeReference) return;
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
const batchUpdates = new common/* ContextContainer */.hl();
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
function resetSubscribers() {
  syncSubscribers.reset();
  asyncSubscribers.reset();
}
function notifySyncSubscribers() {
  syncSubscribers.forEach((subscriber) => {
    if (subscriber.hasChanges()) subscriber.notify();
  });
}
const notifyAsyncSubscribers = (0,common/* collectAndSchedule */.Lu)(
  common/* nextTick */.dY,
  () => asyncSubscribers.forEach((subscriber) => {
    if (subscriber.hasChanges()) subscriber.scheduleNotify();
  })
);

;// CONCATENATED MODULE: ./scrivito_sdk/state/track_state_access.ts


class StateReference {
  constructor(detector) {
    this.detector = detector;
  }
  /** package private: don't call this from outside the 'state' package. */
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
const detectorRecording = new common/* ContextContainer */.hl();
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
  // return current state
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
  // reset the state back to undefined
  clear() {
    this.set(void 0);
  }
  // this method may only be called when StateType is fully partial,
  // i.e. all properties defined by StateType are optional.
  subState(key) {
    return new StateTreeNode(this, key);
  }
  reader() {
    return this;
  }
  // this method may only be called when StateType is fully partial,
  // i.e. all properties defined by StateType are optional (= may be undefined).
  setSubState(key, newSubState) {
    const priorState = this.untrackedGet();
    if (priorState === void 0) {
      const newState = { [key]: newSubState };
      this.uncheckedSet(newState);
      return;
    }
    if (priorState === null) {
      throw new common/* InternalError */.Gd();
    }
    if (newSubState === void 0) {
      const priorKeys = Object.keys(priorState);
      if (priorKeys.length === 1 && priorKeys[0] === key) {
        this.uncheckedSet(void 0);
        return;
      }
    }
    performAsStateChange(() => {
      if (newSubState === void 0) {
        delete priorState[key];
      } else {
        priorState[key] = newSubState;
      }
    });
  }
  getSubState(key) {
    const state = this.untrackedGet();
    if ((0,common/* isPresent */.Wo)(state)) {
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
(0,common/* onReset */.Nj)(resetGlobalState);

;// CONCATENATED MODULE: ./scrivito_sdk/state/batched_state_updater.ts



const addBatchUpdate = (0,common/* collectInListAndSchedule */.OV)(
  common/* nextTick */.dY,
  (callbacks) => {
    withBatchedUpdates(() => callbacks.forEach((callback) => callback()));
    return [];
  }
);

;// CONCATENATED MODULE: ./scrivito_sdk/state/observe.ts



function observe(observedExpression) {
  return new common/* Streamable */.RE((observer) => {
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
      if (lastResultInitialized && (0,common/* equalsBestEffort */.uw)(nextResult, lastResult)) {
        return;
      }
      observer.next(nextResult);
      lastResult = nextResult;
      lastResultInitialized = true;
    }
    (0,common/* nextTick */.dY)(run);
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
    if (!(0,common/* equalsBestEffort */.uw)(nextResult, lastResult)) {
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

/***/ 5929:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__5929__;

/***/ }),

/***/ 9226:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__9226__;

/***/ }),

/***/ 16:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__16__;

/***/ }),

/***/ 3444:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__3444__;

/***/ }),

/***/ 8307:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__8307__;

/***/ }),

/***/ 5020:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__5020__;

/***/ }),

/***/ 9477:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__9477__;

/***/ }),

/***/ 7885:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__7885__;

/***/ }),

/***/ 721:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__721__;

/***/ }),

/***/ 2925:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__2925__;

/***/ }),

/***/ 5682:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__5682__;

/***/ }),

/***/ 3655:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__3655__;

/***/ }),

/***/ 629:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__629__;

/***/ }),

/***/ 400:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__400__;

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
/******/ 		// This function allow to reference async chunks
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
/******/ 		
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
/******/ 			}
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
/******/ 			611: 0
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
/******/ 						}
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
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ArgumentError: () => (/* reexport */ common/* ArgumentError */.c1),
  BackgroundImageTag: () => (/* reexport */ react/* BackgroundImageTag */.CJ),
  Binary: () => (/* reexport */ models/* Binary */.yI),
  ChildListTag: () => (/* reexport */ react/* ChildListTag */.fK),
  ClientError: () => (/* reexport */ client/* ClientError */.MZ),
  ContentTag: () => (/* reexport */ react/* ContentTag */.Qo),
  CurrentPage: () => (/* reexport */ react/* CurrentPage */.Tb),
  DataClass: () => (/* reexport */ data_integration/* DataClass */.bA),
  DataConnectionError: () => (/* reexport */ data_integration/* DataConnectionError */.BA),
  DataItem: () => (/* reexport */ data_integration/* DataItem */.sO),
  DataLocator: () => (/* reexport */ models/* DataLocator */.HX),
  DataScope: () => (/* reexport */ data_integration/* DataScope */.bq),
  Extensions: () => (/* reexport */ react/* Extensions */.Fd),
  FutureBinary: () => (/* reexport */ models/* FutureBinary */.HI),
  ImageTag: () => (/* reexport */ react/* ImageTag */.E0),
  InPlaceEditAsPageContent: () => (/* reexport */ react/* InPlaceEditAsPageContent */.LS),
  InPlaceEditingOff: () => (/* reexport */ react/* InPlaceEditingOff */.CY),
  Link: () => (/* reexport */ realm/* Link */.N_),
  LinkTag: () => (/* reexport */ react/* LinkTag */.bI),
  NotFoundErrorPage: () => (/* reexport */ react/* NotFoundErrorPage */.zK),
  Obj: () => (/* reexport */ realm/* Obj */.OH),
  ObjFacetValue: () => (/* reexport */ realm/* ObjFacetValue */.mZ),
  ObjSearch: () => (/* reexport */ realm/* ObjSearch */.G5),
  RestoreInPlaceEditing: () => (/* reexport */ react/* RestoreInPlaceEditing */.R$),
  ScrivitoError: () => (/* reexport */ common/* ScrivitoError */.aS),
  Widget: () => (/* reexport */ realm/* Widget */.x0),
  WidgetTag: () => (/* reexport */ react/* WidgetTag */.zG),
  canEdit: () => (/* reexport */ can_edit/* canEdit */.p),
  canWrite: () => (/* reexport */ canWrite),
  configure: () => (/* reexport */ configure),
  configureContentBrowser: () => (/* reexport */ configure_content_browser/* configureContentBrowser */.w),
  configureCropAspectRatios: () => (/* reexport */ crop_aspect_ratios/* configureCropAspectRatios */.x),
  configureObjClassForContentType: () => (/* reexport */ configure_obj_class_for_content_type/* configureObjClassForContentType */.I),
  configurePreviewSizes: () => (/* reexport */ preview_sizes/* configurePreviewSizes */.t),
  connect: () => (/* reexport */ react_connect/* connect */.Ng),
  createObjClass: () => (/* reexport */ realm/* createObjClass */.KZ),
  createRestApiClient: () => (/* reexport */ client/* createRestApiClient */.gM),
  createWidgetClass: () => (/* reexport */ realm/* createWidgetClass */.dl),
  currentEditor: () => (/* reexport */ currentEditor),
  currentLanguage: () => (/* reexport */ currentLanguage),
  currentPage: () => (/* reexport */ current_page/* currentPage */.F2),
  currentPageParams: () => (/* reexport */ current_page/* currentPageParams */.R3),
  currentSiteId: () => (/* reexport */ current_page/* currentSiteId */.OI),
  currentUser: () => (/* reexport */ currentUser),
  currentWorkspace: () => (/* reexport */ currentWorkspace),
  currentWorkspaceId: () => (/* reexport */ current_workspace_id/* currentWorkspaceId */.o_),
  editorLanguage: () => (/* reexport */ editorLanguage),
  ensureUserIsLoggedIn: () => (/* reexport */ ensureUserIsLoggedIn),
  extendMenu: () => (/* reexport */ extendMenu),
  extractText: () => (/* reexport */ extractText),
  finishLoading: () => (/* reexport */ react_connect/* finishLoading */.O$),
  getClass: () => (/* reexport */ realm/* getRealmClass */.an),
  getDataClass: () => (/* reexport */ data_integration/* getDataClass */.D5),
  getInstanceId: () => (/* reexport */ getInstanceId),
  isComparisonActive: () => (/* reexport */ editing_context/* isComparisonActive */.gY),
  isCurrentPage: () => (/* reexport */ current_page/* isCurrentPage */.P$),
  isEditorLoggedIn: () => (/* reexport */ isEditorLoggedIn),
  isInPlaceEditingActive: () => (/* reexport */ editing_context/* isInPlaceEditingActive */.HD),
  isOnCurrentPath: () => (/* reexport */ isOnCurrentPath),
  isUserLoggedIn: () => (/* reexport */ isUserLoggedIn),
  load: () => (/* reexport */ loadable/* load */.Hh),
  logout: () => (/* reexport */ logout),
  navigateTo: () => (/* reexport */ navigate_to/* navigateTo */.V),
  openDialog: () => (/* reexport */ openDialog),
  performWithIamToken: () => (/* reexport */ performWithIamToken),
  preload: () => (/* reexport */ preload),
  provideAuthGroups: () => (/* reexport */ auth_groups/* provideAuthGroups */.E),
  provideComponent: () => (/* reexport */ react/* provideComponent */.lo),
  provideDataClass: () => (/* reexport */ data_integration/* provideDataClass */.Ew),
  provideDataErrorComponent: () => (/* reexport */ react/* provideDataErrorComponent */.NX),
  provideDataItem: () => (/* reexport */ data_integration/* provideDataItem */.h8),
  provideEditingConfig: () => (/* reexport */ provide_editing_config/* provideEditingConfig */.K),
  provideLayoutComponent: () => (/* reexport */ react/* provideLayoutComponent */.nq),
  provideObjClass: () => (/* reexport */ provideObjClass),
  provideWidgetClass: () => (/* reexport */ provideWidgetClass),
  registerComponent: () => (/* reexport */ react/* registerComponent */.Nj),
  renderPage: () => (/* reexport */ renderPage),
  resolveHtmlUrls: () => (/* reexport */ replace_internal_links/* resolveHtmlUrls */.I),
  setVisitorIdToken: () => (/* reexport */ setVisitorIdToken),
  uiContext: () => (/* reexport */ uiContext),
  unstable_deleteOfflineStore: () => (/* reexport */ deleteOfflineStore),
  unstable_enableOfflineStore: () => (/* reexport */ loadable/* enableOfflineStore */.a9),
  unstable_enterOfflineMode: () => (/* reexport */ enterOfflineMode),
  unstable_isInOfflineMode: () => (/* reexport */ isInOfflineMode),
  unstable_isOfflineStoreEnabled: () => (/* reexport */ loadable/* isOfflineStoreEnabled */.Em),
  unstable_leaveOfflineMode: () => (/* reexport */ leaveOfflineMode),
  unstable_selectImageFromContentBrowser: () => (/* reexport */ selectImageFromContentBrowser),
  unstable_selectSiteId: () => (/* reexport */ unstable_multi_site_mode/* unstable_selectSiteId */.yG),
  updateContent: () => (/* reexport */ updateContent),
  updateMenuExtensions: () => (/* reexport */ menu/* updateMenuExtensions */.xi),
  urlFor: () => (/* reexport */ url_for/* urlFor */.d),
  urlForDataItem: () => (/* reexport */ urlForDataItem),
  useAttributeDefinition: () => (/* reexport */ react/* useAttributeDefinition */.rj),
  useContent: () => (/* reexport */ react/* useContent */.HZ),
  useData: () => (/* reexport */ react/* useData */.Ez),
  useDataItem: () => (/* reexport */ react/* useDataItem */.p$),
  useDataLocator: () => (/* reexport */ react/* useDataLocator */.uv),
  useDataScope: () => (/* reexport */ react/* useDataScope */.WS),
  useHistory: () => (/* reexport */ browser_location/* useHistory */.W6),
  useResolvedHtmlValue: () => (/* reexport */ react/* useResolvedHtmlValue */.w6),
  useResolvedStringValue: () => (/* reexport */ react/* useResolvedStringValue */.yf),
  useUrlFor: () => (/* reexport */ react/* useUrlFor */.O4),
  validationResultsFor: () => (/* reexport */ validationResultsFor)
});

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 63 modules
var common = __webpack_require__(4665);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/asset_url_base.ts

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

const config = new common/* ConfigStore */.s9();
function getAssetUrlBase() {
  return config.get();
}
function assetLoadingReady() {
  return __async(this, null, function* () {
    yield config.fetch();
  });
}
function configureAssetUrlBase(assetUrlBase) {
  config.set(assetUrlBase);
  __webpack_require__.p = `${assetUrlBase}/`;
}
function initializeAssetUrlBase() {
  __webpack_require__.p = "https://example.org/scrivito-internal-error/";
}
function resetAssetUrlBase() {
  config.reset();
  initializeAssetUrlBase();
}
(0,common/* onReset */.Nj)(resetAssetUrlBase);

// EXTERNAL MODULE: ./scrivito_sdk/app_support/browser_location.ts
var browser_location = __webpack_require__(9004);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_page_data.ts
var current_page_data = __webpack_require__(5634);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/routing.ts + 2 modules
var routing = __webpack_require__(7183);
// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 26 modules
var loadable = __webpack_require__(4772);
// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(1946);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/canonical_url.ts

var canonical_url_async = (__this, __arguments, generator) => {
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






function init() {
  let lastState;
  (0,state/* observe */.lB)(() => (0,loadable/* capture */.Fg)(current_page_data/* getCurrentPageData */.Vd).result).filter(common/* isPresent */.Wo).filter((pageData) => {
    if (!pageData.currentPage) return false;
    const currentState = pageData.navigationState;
    const isDifferent = lastState === void 0 || lastState.locationRoute.objId !== currentState.locationRoute.objId || lastState.historyState.location !== currentState.historyState.location;
    lastState = currentState;
    return isDifferent;
  }).subscribe(switchToCanonicalUrl);
}
function switchToCanonicalUrl(pageData) {
  return canonical_url_async(this, null, function* () {
    const location = pageData.navigationState.historyState.location;
    const canonicalPath = yield (0,loadable/* load */.Hh)(() => {
      if (browser_location/* get */.Jt() !== location) return;
      return (0,routing/* generateLocalPath */.WH)(pageData.currentPage);
    });
    if (!canonicalPath) return;
    if (browser_location/* get */.Jt() !== location) return;
    const locationUrl = new URL(location, "http://example.com");
    if (canonicalPath === locationUrl.pathname) return;
    locationUrl.pathname = canonicalPath;
    browser_location/* replace */.HC((0,common/* urlResource */.ix)(locationUrl));
  });
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_page.ts
var current_page = __webpack_require__(7639);
// EXTERNAL MODULE: ./scrivito_sdk/models/index.ts + 39 modules
var models = __webpack_require__(8927);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_app_space.ts
var current_app_space = __webpack_require__(1048);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/current_language.ts




function currentLanguage() {
  var _a, _b;
  const siteId = (0,current_page/* currentSiteId */.OI)();
  if (!siteId) return null;
  return (_b = (_a = (0,models/* getRootObjFrom */.Mp)((0,current_app_space/* currentAppSpace */.p)().and((0,models/* restrictToSite */.rs)(siteId)))) == null ? void 0 : _a.language()) != null ? _b : null;
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/document_title.ts
var document_title = __webpack_require__(5662);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/editing_context.ts
var editing_context = __webpack_require__(1616);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/analytics_provider.ts



let loadId = generateLoadId();
function browserAnalyticsProvider() {
  return {
    loadId,
    urlPath: new URL((0,common/* currentHref */.pb)()).pathname,
    nav: (0,browser_location/* getHistoryChangesCount */.lQ)()
  };
}
function nodeAnalyticsProvider() {
  return { loadId };
}
function generateLoadId() {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}
(0,common/* onReset */.Nj)(() => loadId = generateLoadId());

// EXTERNAL MODULE: ./scrivito_sdk/app_support/content_tags_for_empty_attributes.ts
var content_tags_for_empty_attributes = __webpack_require__(5015);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/ui_adapter.ts
var ui_adapter = __webpack_require__(5460);
// EXTERNAL MODULE: ./scrivito_sdk/client/index.ts + 38 modules
var client = __webpack_require__(853);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/logged_in_state.ts




let loggedInState;
const USER_IS_LOGGED_IN_PARAM_NAME = "__scrivitoUserIsLoggedIn";
function initializeLoggedInState() {
  (0,client/* setLoggedInIndicatorParam */.If)(USER_IS_LOGGED_IN_PARAM_NAME);
  const url = new URL((0,common/* currentHref */.pb)());
  const searchParams = url.searchParams;
  if (searchParams.has(USER_IS_LOGGED_IN_PARAM_NAME)) {
    loggedInState = true;
    setFlagInLocalStorage();
    searchParams.delete(USER_IS_LOGGED_IN_PARAM_NAME);
    (0,common/* replaceHistoryState */.G$)({}, "", url.toString());
    return;
  }
  loggedInState = window.localStorage.getItem(isUserLoggedInStorageKey()) !== null;
}
function isInLoggedInState() {
  if (loggedInState === void 0) {
    throw new common/* ScrivitoError */.aS("not configured");
  }
  return loggedInState;
}
function changeLoggedInState(state) {
  if (state) {
    setFlagInLocalStorage();
  } else {
    window.localStorage.removeItem(isUserLoggedInStorageKey());
  }
  (0,common/* reload */.yQ)();
}
function setFlagInLocalStorage() {
  if (!ui_adapter/* uiAdapter */.B) {
    window.localStorage.setItem(isUserLoggedInStorageKey(), "");
  }
}
function isUserLoggedInStorageKey() {
  return `SCRIVITO.${(0,common/* getConfiguredTenant */.Ly)()}.IS_USER_LOGGED_IN`;
}
(0,common/* onReset */.Nj)(() => loggedInState = void 0);

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/user_info.ts

var user_info_async = (__this, __arguments, generator) => {
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



function getUserInfo() {
  return loadableUserInfo.get();
}
function getUserInfoPath() {
  return user_info_async(this, null, function* () {
    const tenant = yield (0,common/* fetchConfiguredTenant */.lT)();
    return `iam/instances/${tenant}/userinfo`;
  });
}
function setUserInfo(userinfo) {
  loadableUserInfo.set(userinfo);
}
const loadableUserInfo = (0,loadable/* createLoadableData */.vD)({
  name: "userinfo",
  loader: () => user_info_async(null, null, function* () {
    return client/* JrRestApi */.hm.getWithoutLogin(yield getUserInfoPath());
  })
});

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/user_logged_in_status.ts

var user_logged_in_status_async = (__this, __arguments, generator) => {
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



let userLoggedInStatusInterval;
function startPollingLoggedInUser() {
  if (userLoggedInStatusInterval) return;
  userLoggedInStatusInterval = (0,common/* setInterval */.yb)(fetchLoggedInUser, 6e4);
}
function fetchLoggedInUser(params) {
  return user_logged_in_status_async(this, null, function* () {
    yield client/* JrRestApi */.hm.get(yield getUserInfoPath(), params);
  });
}
function disableUserIsLoggedInPoll() {
  if (userLoggedInStatusInterval) clearInterval(userLoggedInStatusInterval);
  userLoggedInStatusInterval = void 0;
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/anonymous_visitor_auth_handler.ts

var anonymous_visitor_auth_handler_async = (__this, __arguments, generator) => {
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


const anonymousVisitorAuthHandler = {
  getUserData() {
    return void 0;
  },
  isUserLoggedIn() {
    return false;
  },
  ensureUserIsLoggedIn(params) {
    ensureUserIsLoggedInAsync(params);
  },
  iamTokenFetcher() {
    return void 0;
  },
  loginHandler() {
    return "redirect";
  }
};
function ensureUserIsLoggedInAsync(params) {
  return anonymous_visitor_auth_handler_async(this, null, function* () {
    yield fetchLoggedInUser(params);
    changeLoggedInState(true);
  });
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/get_editor_auth_token.ts
var get_editor_auth_token = __webpack_require__(2109);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/inside_ui_auth_handler.ts

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
var inside_ui_auth_handler_async = (__this, __arguments, generator) => {
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




const insideUiAuthHandler = {
  getUserData() {
    const userData = (0,common/* assumePresence */.W3)(ui_adapter/* uiAdapter */.B).currentEditor();
    if (!userData) return;
    return __spreadProps(__spreadValues({}, userData), { id: userData.id.replace(/^scrivito:/, "") });
  },
  isUserLoggedIn() {
    return true;
  },
  ensureUserIsLoggedIn() {
  },
  iamTokenFetcher() {
    return (params) => inside_ui_auth_handler_async(null, null, function* () {
      return (0,common/* assumePresence */.W3)(yield (0,loadable/* load */.Hh)(() => (0,get_editor_auth_token/* getEditorAuthToken */.d)(params)));
    });
  },
  loginHandler() {
    return void 0;
  }
};

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/node_adapter.ts


let nodeAdapter;
function setNodeAdapter(adapter) {
  nodeAdapter = adapter;
}
function isRunningInBrowser() {
  return nodeAdapter === void 0;
}
(0,common/* onReset */.Nj)(() => nodeAdapter = void 0);

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/offline_mode.ts

var offline_mode_async = (__this, __arguments, generator) => {
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





let offlineMode;
function initOfflineMode() {
  (0,loadable/* setOfflineMode */.XR)(
    (() => offline_mode_async(null, null, function* () {
      return determineOfflineMode(yield getConfiguration());
    }))()
  );
}
function enterOfflineMode() {
  if (!isInOfflineMode()) {
    if (!(0,loadable/* isOfflineStoreEnabled */.Em)()) {
      throw new common/* ScrivitoError */.aS(
        "Offline store has not been enabled: Forgot to call Scrivito.enabledOfflineStore()?"
      );
    }
    window.localStorage.setItem(getOfflineModeStorageKey(), "true");
    waitUntilWritingFinishedAndReload();
  }
}
function waitUntilWritingFinishedAndReload() {
  return offline_mode_async(this, null, function* () {
    yield (0,loadable/* waitUntilWritingFinished */.mn)();
    (0,common/* reload */.yQ)();
  });
}
function leaveOfflineMode() {
  if (isInOfflineMode()) {
    window.localStorage.removeItem(getOfflineModeStorageKey());
    (0,common/* reload */.yQ)();
  }
}
function isInOfflineMode() {
  if (offlineMode === void 0) {
    throw new common/* ScrivitoError */.aS(
      "Offline mode has not been allowed in the editing config"
    );
  }
  return offlineMode;
}
function getOfflineMode() {
  return offlineMode;
}
function deleteOfflineStore() {
  return offline_mode_async(this, null, function* () {
    if (isInOfflineMode()) {
      throw new common/* ScrivitoError */.aS("Cannot delete the offline store in offline mode");
    }
    return (0,loadable/* deleteOfflineStoreCaches */.$t)();
  });
}
function determineOfflineMode(config) {
  if (offlineMode === void 0) offlineMode = calculateOfflineMode(config);
  return offlineMode;
}
function calculateOfflineMode(config) {
  var _a;
  if (!((_a = config.unstable) == null ? void 0 : _a.allowOfflineMode)) return false;
  if (!!ui_adapter/* uiAdapter */.B || !isRunningInBrowser()) return false;
  return !!getOfflineModeFromStorage();
}
function getOfflineModeFromStorage() {
  return window.localStorage.getItem(getOfflineModeStorageKey());
}
function getOfflineModeStorageKey() {
  return `SCRIVITO.${(0,common/* getConfiguredTenant */.Ly)()}.OFFLINE_MODE`;
}
(0,common/* onReset */.Nj)(resetOfflineMode);
function resetOfflineMode() {
  offlineMode = void 0;
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/logged_in_visitor_auth_handler.ts

var logged_in_visitor_auth_handler_async = (__this, __arguments, generator) => {
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






const loggedInVisitorAuthHandler = {
  getUserData() {
    const userInfo = getUserInfo();
    if (!userInfo) return;
    const { sub: id, name, email, picture } = userInfo;
    return { id, name, email, picture: picture || null };
  },
  isUserLoggedIn() {
    verifyUserIsLoggedIn();
    if (!getOfflineMode()) startPollingLoggedInUser();
    return true;
  },
  ensureUserIsLoggedIn() {
  },
  iamTokenFetcher() {
    return void 0;
  },
  loginHandler() {
    return "redirect";
  }
};
function verifyUserIsLoggedIn() {
  return logged_in_visitor_auth_handler_async(this, null, function* () {
    const user = yield Promise.race([
      (0,loadable/* load */.Hh)(loggedInVisitorAuthHandler.getUserData),
      (0,common/* wait */.uk)(30)
    ]);
    if (!user) changeLoggedInState(false);
  });
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/user.ts
var user = __webpack_require__(8589);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/current_user.ts

var current_user_async = (__this, __arguments, generator) => {
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
  const userData = authHandler().getUserData();
  return userData ? new user/* User */.K(userData) : null;
}
function isUserLoggedIn() {
  return authHandler().isUserLoggedIn();
}
function ensureUserIsLoggedIn(params = {}) {
  return authHandler().ensureUserIsLoggedIn(params);
}
function getIamTokenFetcher() {
  return authHandler().iamTokenFetcher();
}
function getLoginHandler() {
  return authHandler().loginHandler();
}
function logout(returnTo) {
  if (!ui_adapter/* uiAdapter */.B) logoutAsync(returnTo);
}
function logoutAsync(returnTo) {
  return current_user_async(this, null, function* () {
    const url = yield (0,client/* getIamAuthUrl */.tf)("logout");
    (0,common/* assignLocation */.dT)(
      returnTo ? `${url}?return_to=${encodeURIComponent(returnTo)}` : url
    );
  });
}
function authHandler() {
  if (nodeAdapter) return nodeAdapter.nodeAuthHandler;
  if (ui_adapter/* uiAdapter */.B) return insideUiAuthHandler;
  if (isInLoggedInState()) return loggedInVisitorAuthHandler;
  return anonymousVisitorAuthHandler;
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/extensions_url.ts
var extensions_url = __webpack_require__(2026);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/forced_editor_language.ts
var forced_editor_language = __webpack_require__(5584);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/initial_content_dump_url.ts
var initial_content_dump_url = __webpack_require__(8261);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/load_editing_assets.ts

var load_editing_assets_async = (__this, __arguments, generator) => {
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


function loadEditingAssets() {
  return load_editing_assets_async(this, null, function* () {
    loadEditingCss();
    const { initializeEditors } = yield importEditors();
    initializeEditors();
  });
}
function loadEditingCss() {
  (0,common/* loadCss */.qg)(`${getAssetUrlBase()}/scrivito_editing.css`, (0,common/* getDocument */.YE)());
}
function importEditors() {
  return __webpack_require__.e(/* import() */ 723).then(__webpack_require__.bind(__webpack_require__, 9442));
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/treat_localhost_like.ts
var treat_localhost_like = __webpack_require__(5302);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/unstable_multi_site_mode.ts
var unstable_multi_site_mode = __webpack_require__(4416);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/visitor_authentication.ts




const DOC_LINK = "js-sdk/setVisitorIdToken";
let provider;
let cancelMissingTokenNotification;
function getVisitorAuthenticationProvider(visitorAuthentication) {
  if (!ui_adapter/* uiAdapter */.B && visitorAuthentication) {
    return enableVisitorAuthentication();
  }
}
function enableVisitorAuthentication() {
  provider = new client/* VisitorAuthenticationProvider */.gz();
  const timeoutId = (0,common/* setTimeout */.wg)(() => {
    throw new common/* ScrivitoError */.aS(
      `Scrivito.setVisitorIdToken was not called within 30 seconds. Visit ${(0,common/* docUrl */.yJ)(DOC_LINK)} for more information.`
    );
  }, 3e4);
  cancelMissingTokenNotification = () => clearTimeout(timeoutId);
  return provider;
}
function setVisitorIdToken(token) {
  if (ui_adapter/* uiAdapter */.B) return;
  if (!provider) {
    throw new common/* ScrivitoError */.aS(
      `Scrivito needs to be configured to use visitor authentication before Scrivito.setVisitorIdToken can be called. Visit ${(0,common/* docUrl */.yJ)("js-sdk/configure")} and ${(0,common/* docUrl */.yJ)(DOC_LINK)} for more information.`
    );
  }
  cancelAndForgetMissingTokenNotification();
  provider.setToken(token);
}
function isVisitorAuthenticationEnabled() {
  return !!provider;
}
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
(0,common/* onReset */.Nj)(resetVisitorAuthentication);

// EXTERNAL MODULE: ./scrivito_sdk/app_support/widget_highlighting.ts
var widget_highlighting = __webpack_require__(7521);
// EXTERNAL MODULE: ./scrivito_sdk/data/index.ts + 30 modules
var data = __webpack_require__(7164);
// EXTERNAL MODULE: ./scrivito_sdk/data_integration/index.ts + 36 modules
var data_integration = __webpack_require__(2836);
// EXTERNAL MODULE: ./scrivito_sdk/realm/index.ts + 21 modules
var realm = __webpack_require__(7461);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/constraints_validation_callback.ts
var constraints_validation_callback = __webpack_require__(1728);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/configure.ts

var configure_async = (__this, __arguments, generator) => {
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


























let configDeferred = new common/* Deferred */.cY();
function configure(configuration) {
  var _a;
  checkConfigure(configuration);
  const routingConfiguration = getCheckedRoutingConfiguration(configuration);
  setConfiguration(configuration);
  const unofficialConfiguration = configuration.unstable;
  const getUnstableSiteIdForObj = unofficialConfiguration == null ? void 0 : unofficialConfiguration.getSiteIdForObj;
  if (getUnstableSiteIdForObj) {
    (0,unstable_multi_site_mode/* setUnstableMultiSiteMode */.Y7)(getUnstableSiteIdForObj);
  }
  if (configuration.tenant === data/* IN_MEMORY_TENANT */.hQ) {
    (0,data/* useInMemoryTenant */.mG)();
    (0,realm/* setCurrentSiteIdHandler */.kI)(() => data/* IN_MEMORY_TENANT */.hQ);
    (0,data/* disableObjReplication */.k0)();
  } else {
    const tenant = configuration.tenant;
    (0,common/* setConfiguredTenant */.rK)(tenant);
    if (isRunningInBrowser()) initializeLoggedInState();
    configureAssetUrlBase(
      (_a = unofficialConfiguration == null ? void 0 : unofficialConfiguration.assetUrlBase) != null ? _a : (0,common/* cdnAssetUrlBase */.IH)()
    );
    client/* clientConfig */.yO.set({
      iamAuthLocation: getIamAuthLocation(configuration.iamAuthLocation),
      iamTokenFetcher: getIamTokenFetcher(),
      loginHandler: getLoginHandler()
    });
    const treatLocalhostLike = configuration.treatLocalhostLike;
    if (treatLocalhostLike) (0,treat_localhost_like/* setTreatLocalhostLike */.X)(treatLocalhostLike);
    if (ui_adapter/* uiAdapter */.B) {
      configureWithUi(tenant, ui_adapter/* uiAdapter */.B);
    } else {
      configureWithoutUi(configuration);
    }
  }
  (0,routing/* initRouting */.VJ)(routingConfiguration);
  configureConstraintsValidationCallback(configuration);
  if (configuration.contentTagsForEmptyAttributes === false) {
    (0,content_tags_for_empty_attributes/* skipContentTagsForEmptyAttributes */.l)();
  }
  if (configuration.strictSearchOperators) (0,realm/* enableStrictSearchOperators */.w5)();
  if (configuration.activateDataIntegration) (0,data_integration/* activateDataIntegration */.Ey)();
  (0,models/* setWantsAutoAttributeConversion */.F1)(!!configuration.autoConvertAttributes);
  (0,forced_editor_language/* setForcedEditorLanguage */.T)(configuration.editorLanguage || null);
  (0,extensions_url/* setExtensionsUrl */.s)(configuration.extensionsUrl || void 0);
  if (unofficialConfiguration == null ? void 0 : unofficialConfiguration.initialContentDumpUrl) {
    (0,initial_content_dump_url/* setInitialContentDumpUrl */.d)(unofficialConfiguration.initialContentDumpUrl);
  }
  if (unofficialConfiguration == null ? void 0 : unofficialConfiguration.widgetHighlighting) {
    (0,widget_highlighting/* toggleWidgetHighlighting */.xQ)(true);
  }
}
function getConfiguration() {
  return configDeferred.promise;
}
function setConfiguration(configuration) {
  if (!configDeferred.isPending()) {
    throw new common/* ScrivitoError */.aS("Scrivito.configure has already been called.");
  }
  configDeferred.resolve(configuration);
}
function resetConfiguration() {
  configDeferred = new common/* Deferred */.cY();
  client/* clientConfig */.yO.reset();
}
function checkConfigure(configuration) {
  if (!configuration.tenant) {
    throwInvalidConfigurationError("The param 'tenant' is required.");
  }
  if (configuration.apiKey && isRunningInBrowser()) {
    throwInvalidConfigurationError(
      "The option 'apiKey' is only available under Node.js."
    );
  }
  if (configuration.origin && !isOrigin(configuration.origin)) {
    throwInvalidConfigurationError(
      "The option 'origin' is must be a valid origin string."
    );
  }
  if (configuration.adoptUi && !(typeof configuration.adoptUi === "boolean" || isOrigin(configuration.adoptUi))) {
    throwInvalidConfigurationError(
      "The option 'adoptUi' is must be an origin string."
    );
  }
}
function throwInvalidConfigurationError(message) {
  (0,common/* throwInvalidArgumentsError */.Ht)("configure", message, {
    docPermalink: "js-sdk/configure"
  });
}
function isOrigin(origin) {
  try {
    return new URL(origin).origin === origin;
  } catch (e) {
    return false;
  }
}
function configureWithUi(tenant, uiAdapterClient) {
  uiAdapterClient.configureTenant({
    tenant
  });
  if ((0,unstable_multi_site_mode/* useUnstableMultiSiteMode */.DZ)()) warnIfNoSiteIdSelection();
  setAppAdapter(uiAdapterClient);
  loadEditingAssets();
}
function configureWithoutUi({
  endpoint,
  optimizedWidgetLoading,
  visitorAuthentication,
  priority,
  apiKey
}) {
  if (optimizedWidgetLoading) (0,data/* configureForLazyWidgets */.D9)(true);
  configureCmsRestApi({
    endpoint,
    visitorAuthentication,
    priority,
    apiKey
  });
}
function configureCmsRestApi({
  endpoint: configuredEndpoint,
  visitorAuthentication,
  priority,
  apiKey
}) {
  const endpoint = configuredEndpoint || "api.scrivito.com";
  client/* cmsRestApi */.gd.init({
    apiBaseUrl: endpoint.startsWith("http") ? endpoint : `https://${endpoint}`,
    authorizationProvider: getCmsAuthProvider(apiKey, visitorAuthentication),
    analyticsProvider: isRunningInBrowser() ? browserAnalyticsProvider : nodeAnalyticsProvider,
    priority
  });
}
function getCmsAuthProvider(apiKey, visitorAuthentication) {
  if (nodeAdapter && apiKey) {
    return new nodeAdapter.ApiKeyAuthorizationProvider(apiKey);
  }
  if (isRunningInBrowser() && isUserLoggedIn()) {
    return (0,client/* getTokenProvider */.R)({ audience: "https://api.justrelate.com" });
  }
  return getVisitorAuthenticationProvider(visitorAuthentication);
}
function getCheckedRoutingConfiguration({
  homepage,
  origin,
  routingBasePath,
  baseUrlForSite,
  siteForUrl
}) {
  const homepageCallback = homepage ? () => (0,realm/* unwrapAppClass */.zo)(homepage()) : () => (0,models/* getRootObjFrom */.Mp)((0,current_app_space/* currentAppSpace */.p)().and((0,models/* restrictToSite */.rs)("default")));
  if (baseUrlForSite && siteForUrl) {
    if (routingBasePath || origin) {
      const presentKey = routingBasePath ? "routingBasePath" : "origin";
      throwInvalidConfigurationError(
        `The '${presentKey}' cannot be combined with the "baseUrlForSite" option`
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
    throwInvalidConfigurationError(
      `Unexpected value for argument 'configuration': a value for '${missingKey}' is required if '${presentKey}' is present.`
    );
  }
  if (origin !== void 0 && !isOrigin(origin)) {
    throwInvalidConfigurationError(
      `Unexpected value: '${origin}' is not a valid origin.`
    );
  }
  return { homepageCallback, origin, routingBasePath };
}
function configureConstraintsValidationCallback(configuration) {
  const constraintsValidationCallback = configuration.constraintsValidation;
  if (constraintsValidationCallback) {
    (0,constraints_validation_callback/* setConstraintsValidationCallback */.L)(constraintsValidationCallback);
  }
}
function setAppAdapter(uiAdapterClient) {
  return configure_async(this, null, function* () {
    const { startAppAdapter } = yield importUiInterface();
    const port = startAppAdapter();
    uiAdapterClient.setAppAdapter(port);
  });
}
function importUiInterface() {
  return __webpack_require__.e(/* import() */ 723).then(__webpack_require__.bind(__webpack_require__, 3424));
}
function warnIfNoSiteIdSelection() {
  return configure_async(this, null, function* () {
    const timeout = (0,common/* setTimeout */.wg)(() => configure_async(null, null, function* () {
      const siteId = yield (0,loadable/* load */.Hh)(current_page/* currentSiteId */.OI);
      if (siteId === "default") {
        (0,common/* logError */.vV)(
          "Warning: No site ID was selected within 30 seconds. In the multi-site mode a site ID must be selected before Scrivito can render content. Forgot to use Scrivito.unstable_selectSiteId?"
        );
      }
    }), 3e4);
    yield (0,loadable/* load */.Hh)(unstable_multi_site_mode/* getUnstableSelectedSiteId */.MT);
    clearTimeout(timeout);
  });
}
function getIamAuthLocation(iamAuthLocation) {
  if (typeof iamAuthLocation === "string") return iamAuthLocation;
  const origin = (0,common/* currentOrigin */.u4)();
  return origin ? `${origin}/auth` : void 0;
}
(0,common/* onReset */.Nj)(resetConfiguration);

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/trusted_ui_origins.ts

var trusted_ui_origins_async = (__this, __arguments, generator) => {
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

function checkIfTrustedOrigin(origin) {
  return trusted_ui_origins_async(this, null, function* () {
    var _a, _b;
    if (origin === window.location.origin || originMatches(origin, "https://*.scrivito.com")) {
      return true;
    }
    const configuration = yield getConfiguration();
    const adoptUi = configuration.adoptUi;
    if (typeof adoptUi === "string" && originMatches(origin, adoptUi)) {
      return true;
    }
    const unstableOrigins = (_b = (_a = configuration.unstable) == null ? void 0 : _a.trustedUiOrigins) != null ? _b : [];
    const origins = [...unstableOrigins, ...getLocalOrigins()];
    return origins.some((trustedOrigin) => originMatches(origin, trustedOrigin));
  });
}
function originMatches(origin, pattern) {
  const patternParts = pattern.split("//*");
  if (patternParts.length !== 2) return origin === pattern;
  const [patternUrlProtocol, hostSuffix] = patternParts;
  const originUrl = new URL(origin);
  return originUrl.protocol === patternUrlProtocol && hostSuffix.startsWith(".") && originUrl.host.endsWith(hostSuffix);
}
function getLocalOrigins() {
  var _a, _b;
  return (_b = (_a = window.localStorage.getItem("SCRIVITO_TRUSTED_UI_ORIGINS")) == null ? void 0 : _a.split(" ")) != null ? _b : [];
}

// EXTERNAL MODULE: ./scrivito_sdk/app_ui_protocol/index.ts + 3 modules
var app_ui_protocol = __webpack_require__(9305);
// EXTERNAL MODULE: ./scrivito_sdk/bridge/index.ts + 17 modules
var bridge = __webpack_require__(9564);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/establish_ui_connection.ts

var establish_ui_connection_async = (__this, __arguments, generator) => {
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




function establishUiConnection(uiWindow) {
  const promiseForMessagePort = (() => establish_ui_connection_async(null, null, function* () {
    const { port, origin } = yield (0,bridge/* connectTo */.m6)(
      uiWindow,
      (0,bridge/* postMessageLinkFor */.TB)(window),
      {
        clientVersion: (0,common/* getScrivitoVersion */.YX)(),
        clientCapabilities: ["adapterSpec"]
      }
    );
    const trusted = yield checkIfTrustedOrigin(origin);
    if (!trusted) {
      throw new common/* ScrivitoError */.aS(
        `Refusing to connect to Scrivito UI at unknown origin ${origin}.`
      );
    }
    return port;
  }))();
  return (0,bridge/* initializeAdapterClient */.V_)(app_ui_protocol/* uiAdapterDescription */.qk, promiseForMessagePort);
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/extract_text/child_node_list_to_array.ts

function childNodeListToArray(childNodes) {
  return Array.prototype.slice.call(childNodes);
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/extract_text/node_to_text.ts


const IGNORE_NODE = ["HEAD", "SCRIPT"];
function nodeToText(node) {
  const nodeName = node.nodeName;
  if (IGNORE_NODE.indexOf(nodeName) > -1) return "";
  if (nodeName === "#text") return node.textContent || "";
  return childNodeListToArray(node.childNodes).map(
    (child) => INLINE_NODES.includes(child.nodeName) ? nodeToText(child) : ` ${nodeToText(child)} `
  ).join("");
}
const INLINE_NODES = [
  "#text",
  "A",
  "ABBR",
  "B",
  "BDI",
  "BDO",
  "CITE",
  "CODE",
  "DATA",
  "DFN",
  "EM",
  "I",
  "KBD",
  "MARK",
  "Q",
  "RP",
  "RT",
  "RUBY",
  "S",
  "SAMP",
  "SMALL",
  "SPAN",
  "STRONG",
  "SUB",
  "SUP",
  "TIME",
  "U",
  "VAR",
  "WBR"
];

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
  if (!htmlToText) throw new common/* InternalError */.Gd();
  if (html === "") return "";
  const text = htmlToText(html);
  return (0,common/* pruneString */.M4)(text);
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/has_component.ts
var has_component = __webpack_require__(9708);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/initialize_content.ts
var initialize_content = __webpack_require__(838);
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
    return __webpack_require__.e(/* import() */ 723).then(__webpack_require__.bind(__webpack_require__, 9745));
  });
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/navigation_state.ts
var navigation_state = __webpack_require__(9286);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/refetch_external_data_on_window_focus.ts




function refetchExternalDataOnWindowFocus() {
  if (ui_adapter/* uiAdapter */.B) {
    ui_adapter/* uiAdapter */.B.windowFocusStream().subscribe(data_integration/* invalidateExternalData */.R7);
  } else {
    (0,common/* observeWindowFocus */.LD)();
    (0,common/* subscribeWindowFocus */.VC)(data_integration/* invalidateExternalData */.R7);
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/app_url_for_redirect_to_cloud_ui.ts



function appUrlForRedirectToCloudUi() {
  if (isProbablyCloudUi()) return null;
  const currentLocation = (0,common/* currentHref */.pb)();
  if (ui_adapter/* uiAdapter */.B) return currentLocation;
  return (0,common/* appUrlFromPackagedUiUrl */.Y3)(currentLocation) || null;
}
function isProbablyCloudUi() {
  const parentFrame = window.parent;
  if (parentFrame === window) return false;
  return getFrameHost(parentFrame) !== window.location.host;
}
function getFrameHost(frame) {
  try {
    return frame.location.host;
  } catch (e) {
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/redirect_to_cloud_ui.ts

function assignLocationCloudUi(cloudUiOrigin, tenant, url) {
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
      assignLocationCloudUi(cloudUiUrl, tenant, appUrlForUi);
      (0,navigation_state/* forceNavigationStateNotResponsible */.aM)();
    }
  }
}

// EXTERNAL MODULE: ./scrivito_sdk/link_resolution/index.ts + 6 modules
var link_resolution = __webpack_require__(3558);
// EXTERNAL MODULE: ./scrivito_sdk/react/has_component.ts
var react_has_component = __webpack_require__(580);
// EXTERNAL MODULE: ./scrivito_sdk/realm/initial_content_registry.ts
var initial_content_registry = __webpack_require__(6830);
;// CONCATENATED MODULE: ./scrivito_sdk/initialize_sdk_for_browser.ts

var initialize_sdk_for_browser_async = (__this, __arguments, generator) => {
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



























function initializeSdk() {
  return initialize_sdk_for_browser_async(this, null, function* () {
    (0,client/* setupRegisterVerificator */.HG)();
    initializeAssetUrlBase();
    (0,common/* setOriginProvider */.cN)(common/* windowLocationOrigin */.e_);
    (0,realm/* setCurrentSiteIdHandler */.kI)(current_page/* currentSiteId */.OI);
    (0,current_page_data/* setNavigationStateProvider */.tj)(navigation_state/* getCurrentNavigationState */.$0);
    setHtmlToTextConverter(htmlToTextForBrowser);
    initializeUiRedirect();
    const parentWindow = window.parent;
    const insideIFrame = parentWindow !== window;
    const windowName = window.name;
    const insideUi = insideIFrame && (0,editing_context/* initializeEditingContextFromBrowsingContext */.a_)(windowName);
    if (!insideUi) {
      (0,data/* useReplicationStrategy */.B5)(data/* ObjBackendReplication */.sX);
    } else {
      const uiAdapterClient = establishUiConnection(parentWindow);
      (0,ui_adapter/* setUiAdapter */.U)(uiAdapterClient);
      (0,client/* replaceCmsRetrieval */.Ep)(uiAdapterClient);
      client/* cmsRestApi */.gd.rejectRequests();
      (0,models/* setBinaryHandler */.mv)(uiAdapterClient);
      (0,models/* setCopyObjHandler */.d4)(uiAdapterClient);
      (0,link_resolution/* setUrlResolutionHandler */.I8)(
        (url) => uiAdapterClient.getResolvedUrl(url) || null
      );
      (0,link_resolution/* setupWriteMonitorNotification */.IW)(() => void 0);
      (0,data/* setContentUpdateHandler */.L_)(uiAdapterClient);
      (0,data/* setObjStreamReplicationEndpoint */.JL)(uiAdapterClient);
      (0,data/* useReplicationStrategy */.B5)(data/* ObjStreamReplication */.aM);
      const editingSupport = yield loadEditingSupport();
      editingSupport.installDndHandler();
      editingSupport.installScrollHandler();
      editingSupport.setModeIndicators();
      editingSupport.reloadIfContextChangesFrom(windowName);
      (0,document_title/* observeDocumentTitle */.g)();
      (0,initial_content_registry/* setInitialContentFor */.l)(initialize_content/* initialContentFor */.hF);
    }
    init();
    initOfflineMode();
    (0,has_component/* setHasComponentHandler */.A)(react_has_component/* hasComponent */.I);
    (0,data_integration/* setCurrentLanguageHandler */._L)(currentLanguage);
    refetchExternalDataOnWindowFocus();
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/get_instance_id.ts


function getInstanceId() {
  const configuredTenant = (0,common/* tryGetConfiguredTenant */.YY)();
  if (configuredTenant) return configuredTenant;
  throw new common/* ScrivitoError */.aS(
    "Function invoked before calling 'Scrivito.configure'"
  );
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/select_image_from_content_browser.ts

var select_image_from_content_browser_async = (__this, __arguments, generator) => {
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






function selectImageFromContentBrowser() {
  return select_image_from_content_browser_async(this, null, function* () {
    const configuration = yield getConfiguration();
    const adoptUi = configuration.adoptUi;
    const uiDomain = typeof adoptUi === "string" ? adoptUi : "https://edit.scrivito.com";
    const selectImageUrl = `${uiDomain}/${getInstanceId()}/selectImage~`;
    const uiWindow = window.open(selectImageUrl, "_blank");
    if (!uiWindow) throw new Error("Failed to open UI window");
    const message = yield (0,bridge/* postMessageLinkFor */.TB)(window).incomingMessages.filter((event) => event.remoteWindow === uiWindow).map((event) => event.data).filter(app_ui_protocol/* isSelectedObjMessage */.aG).waitForFirst();
    uiWindow.close();
    const selectedId = message.objId;
    if (!selectedId) return null;
    return yield (0,loadable/* load */.Hh)(() => realm/* Obj */.OH.onAllSites().get(selectedId));
  });
}

// EXTERNAL MODULE: ./scrivito_sdk/react/index.ts + 41 modules
var react = __webpack_require__(1479);
// EXTERNAL MODULE: ./scrivito_sdk/react_connect/index.ts + 7 modules
var react_connect = __webpack_require__(3602);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/can_edit.ts
var can_edit = __webpack_require__(5057);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/can_write.ts



function canWrite() {
  if (!ui_adapter/* uiAdapter */.B) return false;
  return ui_adapter/* uiAdapter */.B.canWrite((0,models/* currentWorkspaceId */.o_)()) || false;
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/configure_content_browser.ts
var configure_content_browser = __webpack_require__(349);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/crop_aspect_ratios.ts
var crop_aspect_ratios = __webpack_require__(6942);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/configure_obj_class_for_content_type.ts
var configure_obj_class_for_content_type = __webpack_require__(2726);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/preview_sizes.ts
var preview_sizes = __webpack_require__(9641);
// EXTERNAL MODULE: ./scrivito_sdk/import_from.ts
var import_from = __webpack_require__(5606);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/current_editor.ts



function currentEditor() {
  if (!ui_adapter/* uiAdapter */.B) return null;
  const userData = ui_adapter/* uiAdapter */.B.currentEditor();
  const teamsData = ui_adapter/* uiAdapter */.B.currentEditorTeams();
  const Editor = (0,import_from/* importFrom */.eW)("editingSupport", "Editor");
  if (!Editor) return null;
  return userData && teamsData ? new Editor(userData, teamsData) : null;
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/current_workspace.ts



function currentWorkspace() {
  var _a, _b;
  return new models/* Workspace */.aR(
    (_b = (_a = ui_adapter/* uiAdapter */.B) == null ? void 0 : _a.currentWorkspace()) != null ? _b : { id: (0,models/* currentWorkspaceId */.o_)(), title: "" }
  );
}

// EXTERNAL MODULE: ./scrivito_sdk/models/current_workspace_id.ts
var current_workspace_id = __webpack_require__(5794);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/menu.ts + 2 modules
var menu = __webpack_require__(5788);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/menu/menu_registry.ts
var menu_registry = __webpack_require__(1121);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/extend_menu.ts




function extendMenu(menuCallback) {
  if (!ui_adapter/* uiAdapter */.B) return;
  (0,menu_registry/* registerMenuCallback */.m)(menuCallback);
  (0,menu/* updateMenuExtensions */.xi)();
}

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
    if (!extract) return;
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
  if (objOrWidget instanceof models/* BasicWidget */.$R) return "";
  const text = objOrWidget.metadata().get("text");
  if (typeof text !== "string") return "";
  return (0,common/* pruneString */.M4)(text);
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/extract_text/extract_widgetlist.ts


function extractWidgetlist(widgetlist, collector) {
  for (const widget of widgetlist) {
    extractTextFromBasicObjOrWidget(widget, collector);
    if (collector.isMaxLengthReached()) break;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/extract_text/extract_attribute.ts






function extractAttribute(objOrWidget, schema, attribute, collector) {
  if (attribute === "blob:text") {
    return collector.push(extractBlobText(objOrWidget));
  }
  const definition = schema.attribute(attribute);
  if (!definition) return;
  const [attributeType] = definition;
  switch (attributeType) {
    case "html":
      collector.push(removeHtmlTags(objOrWidget.get(attribute, "html")));
      break;
    case "string":
      collector.push((0,common/* pruneString */.M4)(objOrWidget.get(attribute, "string")));
      break;
    case "widget": {
      const widget = objOrWidget.get(attribute, "widget");
      if (widget) extractTextFromBasicObjOrWidget(widget, collector);
      break;
    }
    case "widgetlist":
      extractWidgetlist(objOrWidget.get(attribute, "widgetlist"), collector);
      break;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/extract_text/extract_text_from_basic_obj_or_widget.ts



function extractTextFromBasicObjOrWidget(objOrWidget, collector) {
  const schema = (0,realm/* schemaFromBasicObjOrWidget */.e6)(objOrWidget);
  if (!schema) return;
  for (const attribute of schema.extractTextAttributes()) {
    extractAttribute(objOrWidget, schema, attribute, collector);
    if (collector.isMaxLengthReached()) break;
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
  checkExtractText(obj);
  const basicObj = (0,realm/* unwrapAppClass */.zo)(obj);
  const maxLength = options && options.length ? options.length : 1e9;
  return extractTextFromBasicObj(basicObj, maxLength);
}
function checkExtractText(obj, options) {
  if (!(0,models/* isWrappingBasicObj */.mD)(obj)) {
    (0,common/* throwInvalidArgumentsError */.Ht)(
      "extractText",
      "'obj' must be an instance of 'Obj'.",
      { docPermalink: "js-sdk/extractText" }
    );
  }
  if ((options == null ? void 0 : options.length) && !(Number.isInteger(options.length) || options.length > 0)) {
    (0,common/* throwInvalidArgumentsError */.Ht)(
      "extractText",
      "'length' must be a positive integer.",
      { docPermalink: "js-sdk/extractText" }
    );
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/is_editor_logged_in.ts


function isEditorLoggedIn() {
  return !!ui_adapter/* uiAdapter */.B;
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/navigate_to.ts
var navigate_to = __webpack_require__(3721);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/open_dialog.ts


function openDialog(name) {
  if (ui_adapter/* uiAdapter */.B) ui_adapter/* uiAdapter */.B.openCustomDialog(name);
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/content_dump.ts






function generateContentDump(data, contentStateId) {
  return stringify({
    version: (0,common/* getScrivitoVersion */.YX)(),
    csid: contentStateId,
    recording: (0,loadable/* generateRecording */.PN)(data)
  });
}
function loadContentDump(contentDump) {
  const parsed = parse(contentDump);
  if (!parsed) {
    (0,common/* logError */.vV)("could not preload: parsing dump failed");
    return;
  }
  if (!isContentDumpFromThisVersion(parsed)) {
    (0,common/* logError */.vV)(
      `could not preload: dump is from version ${String(parsed.version)}, this is version ${(0,common/* getScrivitoVersion */.YX)()}`
    );
    return;
  }
  (0,state/* withBatchedUpdates */.I7)(() => {
    (0,data/* setContentStateId */.YR)((0,models/* currentObjSpaceId */.eb)(), parsed.csid);
    (0,loadable/* loadRecording */.oB)(parsed.recording);
  });
}
function stringify(contentDump) {
  return JSON.stringify(contentDump);
}
function parse(stringifiedContentDump) {
  const parsed = parseJsonObject(stringifiedContentDump);
  if (parsed && isMaybeContentDump(parsed)) return parsed;
}
function parseJsonObject(text) {
  if (text.charAt(0) !== "{") return;
  try {
    return JSON.parse(text);
  } catch (e) {
    return;
  }
}
function isMaybeContentDump(parsed) {
  return !!parsed.version;
}
function isContentDumpFromThisVersion(dump) {
  return dump.version === (0,common/* getScrivitoVersion */.YX)();
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





function preload(preloadDump) {
  return preload_async(this, null, function* () {
    if (isVisitorAuthenticationEnabled()) return { dumpLoaded: false };
    const dumpLoaded = !isUserLoggedIn();
    if (dumpLoaded) loadContentDump(preloadDump);
    yield (0,loadable/* load */.Hh)(current_page/* currentPage */.F2);
    return { dumpLoaded };
  });
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/auth_groups.ts
var auth_groups = __webpack_require__(1579);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/scale_down_binary.ts
var scale_down_binary = __webpack_require__(6409);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/site_mapping.ts
var site_mapping = __webpack_require__(648);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/render_page.ts

var render_page_async = (__this, __arguments, generator) => {
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











function renderPage(obj, render) {
  return render_page_async(this, null, function* () {
    (0,data/* assertNotUsingInMemoryTenant */.C_)("Scrivito.renderPage");
    checkRenderPage(obj, render);
    const objSpaceId = (0,models/* currentObjSpaceId */.eb)();
    const page = (0,realm/* unwrapAppClass */.zo)(obj);
    ensureSiteIsPresent(page, common/* ArgumentError */.c1);
    yield (0,data/* trackContentStateId */.Zt)(objSpaceId);
    const contentStateId = (0,data/* getContentStateId */.Qb)(objSpaceId);
    const siteId = ensureSiteIsPresent(page);
    const { result, usedData } = yield (0,loadable/* load */.Hh)(
      () => (0,loadable/* reportUsedData */.kE)(
        () => (0,data_integration/* disableExternalDataLoading */.Qt)(() => {
          const baseUrl = (0,site_mapping/* baseUrlForSite */.ne)(siteId);
          if (!baseUrl) {
            throw new common/* ScrivitoError */.aS(
              `The obj "${page.id()}" cannot be rendered because the baseUrlForSite callback did not return a URL for its site "${siteId}".`
            );
          }
          const sitePath = `/${page.id()}`;
          return (0,current_page_data/* withCurrentPageContext */.OU)(
            { page, siteId, baseUrl, sitePath },
            () => {
              (0,routing/* ensureRoutingDataAvailable */.I)(page);
              return (0,scale_down_binary/* usePrerenderScaling */.iv)(render);
            }
          );
        })
      )
    );
    return {
      result,
      preloadDump: generateContentDump(usedData, contentStateId)
    };
  });
}
function ensureSiteIsPresent(page, errorClass = common/* ScrivitoError */.aS) {
  const siteId = page.siteId();
  if (siteId) return siteId;
  throw new errorClass(
    `The obj "${page.id()}" cannot be rendered because it does not have a site ID.`
  );
}
function checkRenderPage(obj, render) {
  if (!(0,models/* isWrappingBasicObj */.mD)(obj)) {
    (0,common/* throwInvalidArgumentsError */.Ht)(
      "renderPage",
      "'obj' must be an instance of 'Obj'.",
      { docPermalink: "js-sdk/renderPage" }
    );
  }
  if (typeof render !== "function") {
    (0,common/* throwInvalidArgumentsError */.Ht)("renderPage", "'render' must be a function.", {
      docPermalink: "js-sdk/renderPage"
    });
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/update_content.ts



function updateContent() {
  return (0,data/* updateContent */.le)((0,models/* currentObjSpaceId */.eb)());
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/url_for.ts
var url_for = __webpack_require__(9857);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/get_details_page_url.ts
var get_details_page_url = __webpack_require__(2117);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/url_for_data_item.ts






function urlForDataItem(dataItem) {
  (0,data/* assertNotUsingInMemoryTenant */.C_)("Scrivito.urlForDataItem");
  const obj = dataItem.obj();
  const siteId = (0,current_page/* currentSiteId */.OI)();
  if (obj) {
    if ((0,has_component/* hasComponent */.I)(dataItem.dataClassName()) || obj.isBinary()) {
      return (0,url_for/* urlFor */.d)(obj);
    }
    return (0,get_details_page_url/* getDetailsPageUrl */.p)(dataItem, obj.siteId() || siteId);
  }
  return siteId ? (0,get_details_page_url/* getDetailsPageUrl */.p)(dataItem, siteId) : null;
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/validation_results_stub.ts


function validationResultsFor(model, attributeName) {
  const loadedFn = (0,import_from/* importFrom */.eW)("editingSupport", "validationResultsFor");
  if (!loadedFn) return [];
  return loadedFn(model, attributeName);
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/ui_context.ts


function uiContext() {
  var _a;
  return ((_a = ui_adapter/* uiAdapter */.B) == null ? void 0 : _a.getUiContext()) || null;
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/editor_language.ts


function editorLanguage() {
  var _a;
  return ((_a = ui_adapter/* uiAdapter */.B) == null ? void 0 : _a.getUiLanguage()) || null;
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/replace_internal_links.ts
var replace_internal_links = __webpack_require__(7440);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/provide_content_class.ts




function provideObjClass(name, definition) {
  if (name === "Obj") {
    throw new common/* ArgumentError */.c1('"Obj" is not a valid Obj class name');
  }
  if ((0,data_integration/* isExternalDataClassProvided */.Wq)(name)) {
    throw new common/* ArgumentError */.c1(`Class with name ${name} already exists`);
  }
  return (0,realm/* registerObjClass */.Hk)(name, definition);
}
function provideWidgetClass(name, definition) {
  return (0,realm/* registerWidgetClass */.C4)(name, definition);
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/provide_editing_config.ts
var provide_editing_config = __webpack_require__(1303);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/is_on_current_path.ts





function isOnCurrentPath(page) {
  var _a;
  (0,data/* assertNotUsingInMemoryTenant */.C_)("Scrivito.isOnCurrentPath");
  checkIsOnCurrentPath(page);
  const currentPath = (_a = (0,current_page/* currentPage */.F2)()) == null ? void 0 : _a.path();
  const path = page.path();
  if (!currentPath || !path || !currentPath.startsWith(path)) return false;
  if (currentPath === path || path === "/") return true;
  return currentPath.charAt(path.length) === "/";
}
function checkIsOnCurrentPath(page) {
  if (!(0,models/* isWrappingBasicObj */.mD)(page)) {
    (0,common/* throwInvalidArgumentsError */.Ht)(
      "isOnCurrentPath",
      "'obj' must be an instance of 'Obj'.",
      { docPermalink: "js-sdk/isOnCurrentPath" }
    );
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/perform_with_iam_token.ts

var perform_with_iam_token_async = (__this, __arguments, generator) => {
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

function performWithIamToken(audience, callback) {
  return perform_with_iam_token_async(this, null, function* () {
    return (0,client/* withLoginHandler */.yB)(
      client/* loginRedirectHandler */.E2,
      () => (0,client/* getTokenProvider */.R)({ audience }).authorizeAbstract(callback)
    );
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/public_api.ts





















































;// CONCATENATED MODULE: ./sdk_for_browser.ts



initializeSdk();

/******/ 	return __webpack_exports__;
/******/ })()
;
});