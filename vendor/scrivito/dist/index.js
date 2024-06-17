/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 1729:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ absoluteUrl)
/* harmony export */ });
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6275);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(urijs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9853);



function absoluteUrl(url) {
  const uri = urijs__WEBPACK_IMPORTED_MODULE_0__(url);
  if (uri.normalizeProtocol().protocol() === "data")
    return url;
  return uri.absoluteTo((0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .currentHref */ .RO)()).toString();
}


/***/ }),

/***/ 4113:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ getAuthGroups),
/* harmony export */   t: () => (/* binding */ provideAuthGroups)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9853);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2757);



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

/***/ 4821:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _i: () => (/* binding */ basicNavigateTo),
/* harmony export */   jc: () => (/* binding */ isLatestNavigateToCallId),
/* harmony export */   oA: () => (/* binding */ getNextNavigateToCallId)
/* harmony export */ });
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6275);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(urijs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_browser_location__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(125);
/* harmony import */ var scrivito_sdk_app_support_change_location__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2836);
/* harmony import */ var scrivito_sdk_app_support_destination_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(941);
/* harmony import */ var scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3420);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9853);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6664);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9880);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(105);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2757);











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
          (0,scrivito_sdk_app_support_change_location__WEBPACK_IMPORTED_MODULE_2__/* .changeLocation */ .zF)(routingTarget.url);
          break;
        case "local":
          navigateToResource(routingTarget.resource);
          break;
        case "crossSite":
          (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_5__/* .assignLocation */ .Hz)(routingTarget.url);
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
  const obj = scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_7__/* .BasicObj */ .Jj.get(objId);
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


/***/ }),

/***/ 8459:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ basicUrlFor),
/* harmony export */   P: () => (/* binding */ basicUrlForObj)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3420);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9853);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9880);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(105);

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

/***/ 125:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  U2: () => (/* binding */ get),
  pj: () => (/* binding */ getHistoryChangesCount),
  JY: () => (/* binding */ getHistoryState),
  XB: () => (/* binding */ isCurrentHistoryState),
  VF: () => (/* binding */ push),
  gx: () => (/* binding */ replace),
  k6: () => (/* binding */ useHistory)
});

// UNUSED EXPORTS: createInitialHistory, reset

;// CONCATENATED MODULE: external "history"
const external_history_namespaceObject = require("history");
// EXTERNAL MODULE: external "urijs"
var external_urijs_ = __webpack_require__(6275);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(9853);
// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(2757);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/browser_location.ts





let browser_location_history;
let unlistenToHistory;
let lastAction;
function useHistory(historyToUse) {
  if (historyToUse.createHref({ pathname: "/" }) !== "/") {
    throw new common/* ArgumentError */.ir(
      `Expected a history without a preconfigured basename. For further details, see: ${(0,common/* docUrl */.m0)("js-sdk/useHistory")}`
    );
  }
  if (historyToUse === browser_location_history) {
    return;
  }
  const isFirstHistory = !browser_location_history;
  listenToHistory(historyToUse);
  browser_location_history = historyToUse;
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
  const uri = new external_urijs_(resource);
  getHistory().push({
    pathname: uri.pathname(),
    search: uri.search(),
    hash: uri.hash()
  });
}
function replace(resource) {
  const uri = new external_urijs_(resource);
  getHistory().replace({
    pathname: uri.pathname(),
    search: uri.search(),
    hash: uri.hash()
  });
}
function isCurrentHistoryState(historyState) {
  return historyState.historyChangesCount === getHistoryChangesCount();
}
function browser_location_reset() {
  browser_location_history = void 0;
  lastAction = void 0;
  unlistenToHistory = void 0;
  historyChangesCountState.clear();
}
function createInitialHistory() {
  return (0,external_history_namespaceObject.createBrowserHistory)();
}
function ensureHistory() {
  if (!browser_location_history) {
    useHistory(createInitialHistory());
  }
}
function getHistory() {
  ensureHistory();
  return browser_location_history;
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
const historyChangesCountState = (0,state/* createStateContainer */.JH)();
function isHistoryV4(historyToCheck) {
  return historyToCheck.hasOwnProperty("length");
}
(0,common/* onReset */.rj)(browser_location_reset);


/***/ }),

/***/ 8083:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ canEdit),
/* harmony export */   r: () => (/* binding */ canEditObjWithId)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3218);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9853);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6664);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9880);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(105);






function canEdit(obj) {
  checkCanEditArguments(obj);
  return canEditObjWithId((0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__/* .unwrapAppClass */ .bM)(obj).id());
}
function canEditObjWithId(objId) {
  const ui = scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__/* .uiAdapter */ .k;
  if (!ui)
    return false;
  return (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_2__/* .loadWithDefault */ .n4)(false, () => ui.canEdit((0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__/* .currentWorkspaceId */ .tV)(), objId)) || false;
}
const checkCanEditArguments = (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .checkArgumentsFor */ .PJ)("canEdit", [["obj", scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__/* .ObjType */ .Bt]], {
  docPermalink: "js-sdk/canEdit"
});


/***/ }),

/***/ 2836:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   nL: () => (/* binding */ redirectToUrl),
/* harmony export */   oL: () => (/* binding */ openInNewWindow),
/* harmony export */   zF: () => (/* binding */ changeLocation)
/* harmony export */ });
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6275);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(urijs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3218);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9853);
/* harmony import */ var _routing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3420);





function redirectToUrl(url) {
  if (scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .uiAdapter */ .k)
    changeLocation(url);
  else
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .replaceLocation */ .DR)(url);
}
function changeLocation(url) {
  if (scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .uiAdapter */ .k) {
    scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .uiAdapter */ .k.navigateToExternalUrl(url);
  } else {
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .assignLocation */ .Hz)(url);
  }
}
function openInNewWindow(url) {
  if (scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .uiAdapter */ .k && (0,_routing__WEBPACK_IMPORTED_MODULE_3__/* .isLocalUri */ .m4)(urijs__WEBPACK_IMPORTED_MODULE_0__(url))) {
    scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .uiAdapter */ .k.openInNewUiWindow(convertToAbsoluteLocalUrl(url));
  } else {
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .openWindow */ .xw)(url, "_blank");
  }
}
function convertToAbsoluteLocalUrl(url) {
  const origin = (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .currentOrigin */ .ZJ)();
  if (origin === void 0)
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .InternalError */ .AQ();
  return new urijs__WEBPACK_IMPORTED_MODULE_0__(url).origin(origin).toString();
}


/***/ }),

/***/ 934:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ configureContentBrowser),
/* harmony export */   e: () => (/* binding */ getContentBrowserConfiguration)
/* harmony export */ });
/* harmony import */ var lodash_es_intersection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4999);
/* harmony import */ var lodash_es_mapValues__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(785);
/* harmony import */ var scrivito_sdk_app_support_absolute_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1729);
/* harmony import */ var scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3218);
/* harmony import */ var scrivito_sdk_app_support_ui_adapter_compatible_value__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8493);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9853);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9880);

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
  if (!scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .uiAdapter */ .k) {
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
      scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .uiAdapter */ .k.configureContentBrowser(
        (0,scrivito_sdk_app_support_ui_adapter_compatible_value__WEBPACK_IMPORTED_MODULE_2__/* .uiAdapterCompatibleValue */ .f)({ baseQuery })
      );
    }
  }
}
function isFilterBuilder(maybeFilterBuilder) {
  return typeof maybeFilterBuilder === "function";
}
function removeUnionSubTypeIndexesFromKey(message) {
  return message.replace(/key 'filters.\d/, "key 'filters");
}
const checkConfigure = (() => {
  if (process.env.NODE_ENV !== "development")
    return () => {
    };
  const SearchFieldType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.union */ .pC.union([scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String, scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.list */ .pC.list(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String)]);
  const SearchOperatorType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.enums */ .pC.enums.of(
    (0,lodash_es_intersection__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)(scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .OPERATORS */ .fP, [
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
      type: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.enums */ .pC.enums.of(["radioButton"]),
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
      type: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.enums */ .pC.enums.of(["checkbox"]),
      options: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.dict */ .pC.dict(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String, CheckboxOptionType)
    },
    "CheckboxFilterDefinition"
  );
  const TreeFilterType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.declare */ .pC.declare("TreeFilterDefinition");
  TreeFilterType.define(
    FilterNodeType.extend({
      type: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.enums */ .pC.enums.of(["tree"])),
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
  DynamicOrStaticFiltersType.dispatch = (v) => scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Function */ .pC.Function.is(v) ? DynamicOrStaticFiltersType.meta.types[0] : DynamicOrStaticFiltersType.meta.types[1];
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
  return (0,lodash_es_mapValues__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(contentBrowserFilters, (_a) => {
    var item = __objRest(_a, []);
    const { icon, options } = item;
    const hasCustomIcon = icon && !icon.match(/^\w+$/);
    if (icon)
      item.icon = hasCustomIcon ? (0,scrivito_sdk_app_support_absolute_url__WEBPACK_IMPORTED_MODULE_0__/* .absoluteUrl */ .G)(icon) : icon;
    if (options)
      item.options = copyWithAbsoluteUrls(options);
    return item;
  });
}
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .onReset */ .rj)(() => {
  filters = void 0;
  filtersBuilder = void 0;
});


/***/ }),

/***/ 917:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ configureObjClassForContentType),
/* harmony export */   r: () => (/* binding */ getObjClassForContentTypeMapping)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9853);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2757);



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
  // either */*, or
  // type/* (type without / and *), or
  // type/subtype (subtype without ; and *)
  // Note: Intentionally no */subtype
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

/***/ 852:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ setConstraintsValidationCallback),
/* harmony export */   j: () => (/* binding */ getConstraintsValidationCallback)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9853);


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
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .onReset */ .rj)(() => constraintsValidationCallback = void 0);


/***/ }),

/***/ 9754:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ shouldContentTagsForEmptyAttributesBeSkipped),
/* harmony export */   g: () => (/* binding */ skipContentTagsForEmptyAttributes)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2757);


const contentTagsForEmptyAttributes = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_0__/* .createStateContainer */ .JH)();
function skipContentTagsForEmptyAttributes() {
  contentTagsForEmptyAttributes.set(false);
}
function shouldContentTagsForEmptyAttributesBeSkipped() {
  return contentTagsForEmptyAttributes.get() === false;
}


/***/ }),

/***/ 3626:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ currentAppSpace)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_editing_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6993);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9880);



function currentAppSpace() {
  const currentObjSpace = (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__/* .objSpaceScope */ .hA)((0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__/* .currentObjSpaceId */ .GD)());
  return (0,scrivito_sdk_app_support_editing_context__WEBPACK_IMPORTED_MODULE_0__/* .isComparisonActive */ .rl)() ? currentObjSpace : currentObjSpace.and(scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__/* .excludeDeletedObjs */ .E2);
}


/***/ }),

/***/ 4106:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OO: () => (/* binding */ isCurrentPage),
/* harmony export */   U: () => (/* binding */ withDefaultSiteContext),
/* harmony export */   WX: () => (/* binding */ currentPageParams),
/* harmony export */   lo: () => (/* binding */ currentPage),
/* harmony export */   lx: () => (/* binding */ currentSiteId),
/* harmony export */   ou: () => (/* binding */ setCustomComponentSiteId),
/* harmony export */   pd: () => (/* binding */ withForbiddenSiteContext)
/* harmony export */ });
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6275);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(urijs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_current_page_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4185);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9853);
/* harmony import */ var scrivito_sdk_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4433);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9880);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(105);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2757);








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
  const customComponentSiteId = customComponentSiteIdState.get();
  if (customComponentSiteId !== void 0)
    return customComponentSiteId;
  return (_d = (_c = currentSiteContext.current()) != null ? _c : (_b = (_a = (0,scrivito_sdk_app_support_current_page_data__WEBPACK_IMPORTED_MODULE_1__/* .getCurrentRoute */ .rk)()) == null ? void 0 : _a.siteData) == null ? void 0 : _b.siteId) != null ? _d : null;
}
function withDefaultSiteContext(fn) {
  return currentSiteContext.runWith("default", fn);
}
function withForbiddenSiteContext(message, fn) {
  return forbiddenSiteContext.runWith(message, fn);
}
const customComponentSiteIdState = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_6__/* .createStateContainer */ .JH)();
function setCustomComponentSiteId(siteId) {
  customComponentSiteIdState.set(siteId);
}


/***/ }),

/***/ 4185:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Mw: () => (/* binding */ withCurrentPageContext),
/* harmony export */   fW: () => (/* binding */ getNotFoundErrorPageState),
/* harmony export */   "if": () => (/* binding */ getCurrentPageData),
/* harmony export */   rk: () => (/* binding */ getCurrentRoute)
/* harmony export */ });
/* unused harmony export setNavigationStateProvider */
/* harmony import */ var scrivito_sdk_app_support_current_app_space__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3626);
/* harmony import */ var scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3420);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9853);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6664);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9880);

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

/***/ 941:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   W: () => (/* binding */ recognizeDestinationUnavailable),
/* harmony export */   Y: () => (/* binding */ generateDestinationUnavailable)
/* harmony export */ });
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6275);
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

/***/ 384:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ setEditingConfigFor),
/* harmony export */   x: () => (/* binding */ getEditingConfigFor)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9853);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2757);



class EditingConfigStore {
  constructor() {
    this.store = {};
    this.updateCounter = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__/* .createStateContainer */ .JH)();
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
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .onReset */ .rj)(() => editingConfigStore.clear());


/***/ }),

/***/ 6993:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DG: () => (/* binding */ isInPlaceEditingActive),
/* harmony export */   rl: () => (/* binding */ isComparisonActive)
/* harmony export */ });
/* unused harmony exports initializeEditingContextFromBrowsingContext, setIsInPlaceEditingActive, setIsComparisonActive */
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9853);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9880);



let inPlaceEditingActive = false;
let comparisonActive = false;
function initializeEditingContextFromBrowsingContext(browsingContextName) {
  const editingContext = editingContextFromBrowsingContext(browsingContextName);
  if (!editingContext.workspaceId) {
    setCurrentWorkspaceId("published");
    return false;
  }
  setCurrentWorkspaceId(editingContext.workspaceId);
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
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .onReset */ .rj)(() => {
  inPlaceEditingActive = false;
  comparisonActive = false;
});


/***/ }),

/***/ 925:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ getExtensionsUrl),
/* harmony export */   W: () => (/* binding */ setExtensionsUrl)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9853);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2757);



const extensionsUrl = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__/* .createStateContainer */ .JH)();
function setExtensionsUrl(url) {
  extensionsUrl.set(url);
}
function getExtensionsUrl() {
  const url = extensionsUrl.get();
  if (url)
    return new URL(url, (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .currentOrigin */ .ZJ)()).toString();
}


/***/ }),

/***/ 7538:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ getForcedEditorLanguage),
/* harmony export */   n: () => (/* binding */ setForcedEditorLanguage)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2757);


const forcedEditorLanguage = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_0__/* .createStateContainer */ .JH)();
function setForcedEditorLanguage(language) {
  forcedEditorLanguage.set(language);
}
function getForcedEditorLanguage() {
  return forcedEditorLanguage.get();
}


/***/ }),

/***/ 3449:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ getClassName)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9853);
/* harmony import */ var scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9528);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(105);




function getClassName(subject) {
  var _a;
  if (typeof subject === "string")
    return subject;
  if (subject instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__/* .DataClass */ .Gd) {
    return subject.name();
  }
  if (subject instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__/* .DataItem */ .zw) {
    return subject.dataClassName();
  }
  const className = (_a = scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_2__/* .Schema */ .V_.forClass(subject)) == null ? void 0 : _a.name();
  if (typeof className !== "string") {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ArgumentError */ .ir("Invalid class name, class or instance");
  }
  return className;
}


/***/ }),

/***/ 1021:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ getComparisonRange)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3218);
/* harmony import */ var scrivito_sdk_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9001);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9880);




function getComparisonRange() {
  var _a;
  return ((_a = scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__/* .uiAdapter */ .k) == null ? void 0 : _a.comparisonRange()) || [scrivito_sdk_client__WEBPACK_IMPORTED_MODULE_1__/* .PUBLISHED_SPACE */ .Bm, (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__/* .currentObjSpaceId */ .GD)()];
}


/***/ }),

/***/ 7879:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ getEditorAuthToken)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_treat_localhost_like__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5828);
/* harmony import */ var scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3218);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9853);




function getEditorAuthToken(audience) {
  var _a;
  const data = (_a = scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .uiAdapter */ .k) == null ? void 0 : _a.getEditorAuthToken({
    audience,
    treatLocalhostLike: (0,scrivito_sdk_app_support_treat_localhost_like__WEBPACK_IMPORTED_MODULE_0__/* .getTreatLocalhostLike */ .X)()
  });
  if (!data)
    return;
  if ("error" in data)
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .ScrivitoError */ .Ix(data.error);
  return data.token;
}


/***/ }),

/***/ 5369:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ getInitialContentDumpUrl),
/* harmony export */   h: () => (/* binding */ setInitialContentDumpUrl)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9853);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2757);



const initialContentDumpUrl = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__/* .createStateContainer */ .JH)();
function setInitialContentDumpUrl(url) {
  try {
    new URL(url);
  } catch (e) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ArgumentError */ .ir(
      "'initialContentDumpUrl' must be an absolute URL with protocol"
    );
  }
  initialContentDumpUrl.set(url);
}
function getInitialContentDumpUrl() {
  return initialContentDumpUrl.get();
}


/***/ }),

/***/ 4625:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WS: () => (/* binding */ initialContentFor),
/* harmony export */   k9: () => (/* binding */ initializeContentForWidget),
/* harmony export */   vI: () => (/* binding */ initializeContentForObj)
/* harmony export */ });
/* harmony import */ var lodash_es_isEmpty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6016);
/* harmony import */ var scrivito_sdk_app_support_editing_config_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(384);
/* harmony import */ var scrivito_sdk_app_support_present_ui_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4712);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6664);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9880);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(105);







function initialContentFor(className, attributeName) {
  var _a;
  const initialContent = (_a = (0,scrivito_sdk_app_support_editing_config_store__WEBPACK_IMPORTED_MODULE_0__/* .getEditingConfigFor */ .x)(className)) == null ? void 0 : _a.initialContent;
  if (initialContent) {
    const attributeContent = initialContent[attributeName];
    if (typeof attributeContent === "function") {
      return attributeContent();
    }
    if (isWidget(attributeContent)) {
      return (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__/* .wrapInAppClass */ .pz)(attributeContent._scrivitoPrivateContent.copy());
    }
    if (isWidgetlist(attributeContent)) {
      return attributeContent.map((widget) => {
        const basicWidget = widget._scrivitoPrivateContent;
        const copy = basicWidget.copy();
        return (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__/* .wrapInAppClass */ .pz)(copy);
      });
    }
    return attributeContent;
  }
}
function isWidgetlist(maybeWidgetlist) {
  return Array.isArray(maybeWidgetlist) && maybeWidgetlist.every(isWidget);
}
function isWidget(maybeWidget) {
  return !!maybeWidget && maybeWidget._scrivitoPrivateContent instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__/* .BasicWidget */ .E8;
}
function initializeContentForObj(objId) {
  return (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_2__/* .load */ .zD)(() => scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__/* .BasicObj */ .Jj.get(objId)).then((basicObj) => {
    if (basicObj) {
      initializeContentFor(basicObj);
      initializeContentFromHook(basicObj);
    }
  });
}
function initializeContentForWidget(objId, widgetId) {
  return (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_2__/* .load */ .zD)(() => scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__/* .BasicObj */ .Jj.get(objId)).then((basicObj) => {
    if (!basicObj)
      return;
    return (0,scrivito_sdk_app_support_present_ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .presentUiAdapter */ .K)().finishReplicatingObj((0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__/* .currentObjSpaceId */ .GD)(), objId).then(() => {
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
  const schema = (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__/* .schemaFromBasicObjOrWidget */ .cv)(basicContent);
  if (!schema)
    return;
  const initialAttributes = {};
  Object.keys(schema.attributes()).forEach((attributeName) => {
    const typeInfo = schema.attributes()[attributeName];
    const currentValue = basicContent.get(attributeName, typeInfo);
    if ((0,lodash_es_isEmpty__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)(currentValue)) {
      const initialValue = initialContentFor(objClassName, attributeName);
      if (initialValue !== void 0) {
        initialAttributes[attributeName] = initialValue;
      }
    }
  });
  const attributesWithTypeInfo = (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__/* .unwrapAppAttributes */ .dz)(
    initialAttributes,
    schema,
    objClassName
  );
  basicContent.update(attributesWithTypeInfo);
}
function initializeContentFromHook(content) {
  var _a;
  const callback = (_a = (0,scrivito_sdk_app_support_editing_config_store__WEBPACK_IMPORTED_MODULE_0__/* .getEditingConfigFor */ .x)(content.objClass())) == null ? void 0 : _a.initialize;
  if (callback)
    callback((0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__/* .wrapInAppClass */ .pz)(content));
}


/***/ }),

/***/ 4417:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Jc: () => (/* binding */ isPageEditable),
/* harmony export */   TP: () => (/* binding */ isLayoutEditable),
/* harmony export */   q6: () => (/* binding */ enableLayoutEditing),
/* harmony export */   rl: () => (/* binding */ wantsLayoutEditing)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3218);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2757);



const isEnabled = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__/* .createStateContainer */ .JH)();
function enableLayoutEditing() {
  isEnabled.set(true);
}
function wantsLayoutEditing() {
  return !!isEnabled.get();
}
function isLayoutEditable() {
  var _a;
  if (!wantsLayoutEditing())
    return true;
  return !!((_a = scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__/* .uiAdapter */ .k) == null ? void 0 : _a.isLayoutEditable());
}
function isPageEditable() {
  var _a;
  if (!wantsLayoutEditing())
    return true;
  return !!((_a = scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__/* .uiAdapter */ .k) == null ? void 0 : _a.isPageEditable());
}


/***/ }),

/***/ 7700:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ unmountLegacyExtension),
/* harmony export */   x: () => (/* binding */ legacyRenderExtension)
/* harmony export */ });
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5648);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9853);



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
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .onReset */ .rj)(() => legacyExtensionElement = void 0);


/***/ }),

/***/ 2619:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  d7: () => (/* binding */ getMenuHandler),
  Js: () => (/* binding */ getMenuPatch),
  ff: () => (/* binding */ updateMenuExtensions)
});

// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(2757);
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

// EXTERNAL MODULE: ../node_modules/lodash-es/mapValues.js + 3 modules
var mapValues = __webpack_require__(785);
// EXTERNAL MODULE: ../node_modules/lodash-es/pick.js + 2 modules
var pick = __webpack_require__(7883);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/absolute_url.ts
var absolute_url = __webpack_require__(1729);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(9853);
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
    this.patch.insertIds = Array.from(
      new Set(this.patch.insertIds).add(customMenuItem.id)
    );
    this.patch.items[customMenuItem.id] = __spreadValues(__spreadValues(__spreadValues({}, (0,pick/* default */.Z)(customMenuItem, "description", "group", "position", "title")), (0,mapValues/* default */.Z)((0,pick/* default */.Z)(customMenuItem, "enabled"), (v) => !!v)), iconPatch(customMenuItem.icon));
  }
  modify(menuItem, ...excessArgs) {
    checkMenuModifyArguments(menuItem, ...excessArgs);
    this.patch.modifyItems[menuItem.id] = __spreadValues(__spreadValues(__spreadValues({}, this.patch.modifyItems[menuItem.id]), (0,pick/* default */.Z)(menuItem, "group", "position", "title")), iconPatch(menuItem.icon));
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
var menu_registry = __webpack_require__(3827);
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
  (0,menu_registry/* getMenuCallbacks */.A)().forEach(
    (menuCallback) => menuCallback.call(null, builder)
  );
}
function getCounter() {
  return counterState.get();
}


/***/ }),

/***/ 3827:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getMenuCallbacks),
/* harmony export */   L: () => (/* binding */ registerMenuCallback)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9853);


let menuCallbacks = [];
function registerMenuCallback(menuCallback) {
  menuCallbacks.push(menuCallback);
}
function getMenuCallbacks() {
  return menuCallbacks;
}
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .onReset */ .rj)(() => menuCallbacks = []);


/***/ }),

/***/ 6528:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ navigateTo)
/* harmony export */ });
/* unused harmony export navigateToAsync */
/* harmony import */ var lodash_es_isEmpty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6016);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6275);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(urijs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_basic_navigate_to__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4821);
/* harmony import */ var scrivito_sdk_app_support_url_for_data_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4136);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9853);
/* harmony import */ var scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9528);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6664);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9880);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(105);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2757);

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
    const callId = (0,scrivito_sdk_app_support_basic_navigate_to__WEBPACK_IMPORTED_MODULE_1__/* .getNextNavigateToCallId */ .oA)();
    (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_8__/* .failIfFrozen */ .un)("navigateTo");
    if (target === null)
      return;
    const navigateToOptions = getNavigateToOptions(options);
    if (target instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_4__/* .DataItem */ .zw) {
      yield navigateToDataItem(target, navigateToOptions, callId);
    } else {
      navigateToTarget(target, callId, navigateToOptions);
    }
  });
}
function navigateToTarget(target, callId, options) {
  return __async(this, null, function* () {
    try {
      const evaluatedTarget = yield (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_5__/* .load */ .zD)(
        () => typeof target === "function" ? target() : target
      );
      const basicTarget = (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_7__/* .unwrapAppClass */ .bM)(evaluatedTarget);
      if (!isBasicTarget(basicTarget))
        return;
      return (0,scrivito_sdk_app_support_basic_navigate_to__WEBPACK_IMPORTED_MODULE_1__/* .basicNavigateTo */ ._i)(
        yield getRoutingTarget(basicTarget, options),
        callId
      );
    } catch (e) {
      if ((0,scrivito_sdk_app_support_basic_navigate_to__WEBPACK_IMPORTED_MODULE_1__/* .isLatestNavigateToCallId */ .jc)(callId))
        (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .throwNextTick */ .a6)(e);
    }
  });
}
function navigateToDataItem(dataItem, options, callId) {
  return __async(this, null, function* () {
    const url = yield (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_5__/* .load */ .zD)(() => (0,scrivito_sdk_app_support_url_for_data_item__WEBPACK_IMPORTED_MODULE_2__/* .urlForDataItem */ .n)(dataItem));
    if (!url)
      return;
    const uri = urijs__WEBPACK_IMPORTED_MODULE_0__(url);
    const { queryParameters } = options;
    if (queryParameters) {
      const params = new URLSearchParams(uri.query());
      Object.entries(queryParameters).forEach(([key, value]) => {
        if (params.get(key) === value) {
          throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .ArgumentError */ .ir(
            "The data ID is the same as the URL query param"
          );
        }
      });
      uri.addQuery(queryParameters);
    }
    if (options.hash)
      uri.hash(options.hash);
    return (0,scrivito_sdk_app_support_basic_navigate_to__WEBPACK_IMPORTED_MODULE_1__/* .basicNavigateTo */ ._i)({ url: uri.resource() }, callId);
  });
}
function getRoutingTarget(basicTarget, options) {
  return __async(this, null, function* () {
    const routingTarget = yield (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_5__/* .load */ .zD)(
      () => extractRoutingTarget(basicTarget, options.queryParameters, options.hash)
    );
    if (!routingTarget) {
      throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .ArgumentError */ .ir(
        "The link provided to navigateTo has no destination."
      );
    }
    return routingTarget;
  });
}
function isBasicTarget(target) {
  return target instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_6__/* .BasicObj */ .Jj || target instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_6__/* .BasicLink */ .AM;
}
function getNavigateToOptions(options) {
  if (!options)
    return { hash: null, queryParameters: void 0 };
  const _a = options, { hash, params } = _a, convenienceParams = __objRest(_a, ["hash", "params"]);
  return {
    hash: hash || null,
    queryParameters: __spreadValues(__spreadValues({}, convenienceParams), params)
  };
}
function extractRoutingTarget(target, query, hash) {
  if (target instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_6__/* .BasicLink */ .AM) {
    return extractRoutingTargetForLink(target, query, hash);
  }
  return { objId: target.id(), query, hash };
}
function extractRoutingTargetForLink(link, queryParameters, hashToApply) {
  if (link.isExternal())
    return { url: link.url() };
  const hash = hashToApply || link.hash();
  const query = queryParameters && !(0,lodash_es_isEmpty__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z)(queryParameters) ? queryParameters : link.queryParameters();
  const linkObj = link.obj();
  const objId = linkObj instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_6__/* .BasicObj */ .Jj ? linkObj.id() : link.objId();
  return objId ? { objId, query, hash } : void 0;
}


/***/ }),

/***/ 6752:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   lT: () => (/* binding */ getCurrentNavigationState)
/* harmony export */ });
/* unused harmony exports forceNavigationStateNotResponsible, setRecognizedSiteId, resetRecognizedSiteId */
/* harmony import */ var scrivito_sdk_app_support_basic_navigate_to__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4821);
/* harmony import */ var scrivito_sdk_app_support_browser_location__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(125);
/* harmony import */ var scrivito_sdk_app_support_change_location__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2836);
/* harmony import */ var scrivito_sdk_app_support_current_app_space__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3626);
/* harmony import */ var scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3420);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9853);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6664);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9880);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(105);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2757);

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
    (0,scrivito_sdk_app_support_change_location__WEBPACK_IMPORTED_MODULE_2__/* .redirectToUrl */ .nL)(maybeBinaryUrl);
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
  return (
    // if the browser URL is unchanged
    newState.historyState.location === oldState.historyState.location && // and was previously recognized as a page
    oldState.locationRoute.objId && // but now suddenly turns into "404"
    !newState.locationRoute.objId && // then consider the page to have "moved" (assuming it still exists)
    (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_7__/* .getObjFrom */ .R2)((0,scrivito_sdk_app_support_current_app_space__WEBPACK_IMPORTED_MODULE_3__/* .currentAppSpace */ .q)(), oldState.locationRoute.objId)
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
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_5__/* .onReset */ .rj)(() => {
  forceNotResponsible = false;
  resetRecognizedSiteId();
});


/***/ }),

/***/ 4712:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ presentUiAdapter)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9853);
/* harmony import */ var _ui_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3218);



function presentUiAdapter() {
  if (!_ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .uiAdapter */ .k)
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .InternalError */ .AQ();
  return _ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .uiAdapter */ .k;
}


/***/ }),

/***/ 9434:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ configurePreviewSizes),
/* harmony export */   F: () => (/* binding */ getPreviewSizes)
/* harmony export */ });
/* harmony import */ var lodash_es_uniqBy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7782);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9853);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2757);




const state = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__/* .createStateContainer */ .JH)();
function configurePreviewSizes(previewSizes) {
  checkConfigurePreviewSizes(previewSizes);
  if (!previewSizes.length) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ArgumentError */ .ir(
      'No sizes has been provided for "configurePreviewSizes"'
    );
  }
  if ((0,lodash_es_uniqBy__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(previewSizes, "width").length !== previewSizes.length) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ArgumentError */ .ir('A "width" must be unique for sizes');
  }
  if (!previewSizes.every(validatePreviewSizeWidth)) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ArgumentError */ .ir('A "width" must be a positive integer');
  }
  state.set(previewSizes);
}
function validatePreviewSizeWidth(previewSize) {
  const width = previewSize == null ? void 0 : previewSize.width;
  if (!width)
    return true;
  return (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .isValidInteger */ .eZ)(width) && width > 0;
}
function getPreviewSizes() {
  return state.get();
}
const PreviewSizeType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .tcomb["interface"] */ .pC["interface"](
  {
    title: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .tcomb.String */ .pC.String,
    width: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .tcomb.Number */ .pC.Number),
    description: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .tcomb.String */ .pC.String),
    icon: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .tcomb.String */ .pC.String)
  },
  "PreviewSize"
);
const checkConfigurePreviewSizes = (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .checkArgumentsFor */ .PJ)(
  "configurePreviewSizes",
  [["previewSizes", scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .tcomb.list */ .pC.list(PreviewSizeType)]],
  { docPermalink: "js-sdk/configurePreviewSizes" }
);


/***/ }),

/***/ 5037:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ getAttributeEditingOptionsFor),
/* harmony export */   u: () => (/* binding */ provideEditingConfig)
/* harmony export */ });
/* harmony import */ var lodash_es_uniqBy__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7782);
/* harmony import */ var scrivito_sdk_app_support_editing_config_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(384);
/* harmony import */ var scrivito_sdk_app_support_get_class_name__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3449);
/* harmony import */ var scrivito_sdk_app_support_validations_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8142);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9853);
/* harmony import */ var scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9528);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9880);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(105);

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








function provideEditingConfig(subject, editingConfig, ...excessArgs) {
  checkProvideEditingConfig(subject, editingConfig, ...excessArgs);
  (0,scrivito_sdk_app_support_editing_config_store__WEBPACK_IMPORTED_MODULE_0__/* .setEditingConfigFor */ .o)((0,scrivito_sdk_app_support_get_class_name__WEBPACK_IMPORTED_MODULE_1__/* .getClassName */ .g)(subject), editingConfig);
}
function getAttributeEditingOptionsFor(className, attributeName, attributeType) {
  var _a;
  const attributes = ((_a = (0,scrivito_sdk_app_support_editing_config_store__WEBPACK_IMPORTED_MODULE_0__/* .getEditingConfigFor */ .x)(className)) == null ? void 0 : _a.attributes) || {};
  const attribute = attributes[attributeName];
  const options = attribute ? attribute.options : void 0;
  if (!options)
    return;
  let invalidOptions = options;
  if (attributeType === "html") {
    const _b = options, { allowedTags, showHtmlSource, toolbar } = _b, rest = __objRest(_b, ["allowedTags", "showHtmlSource", "toolbar"]);
    invalidOptions = rest;
  } else if (attributeType === "string") {
    const _c = options, { multiLine } = _c, rest = __objRest(_c, ["multiLine"]);
    invalidOptions = rest;
  }
  if (Object.keys(invalidOptions).length === 0)
    return options;
  (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .nextTick */ .Y3)(() => throwInvalidOptions(invalidOptions));
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
  const EnumValueLocalizationType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb["interface"] */ .pC["interface"]({
    value: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String,
    title: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String
  });
  const HtmlToolbarButtonType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.enums */ .pC.enums.of([
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
  const PropertiesGroupDescriptionType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb["interface"] */ .pC["interface"]({
    title: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String,
    properties: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.list */ .pC.list(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.union */ .pC.union([scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String, scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Array */ .pC.Array])),
    enabled: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Boolean */ .pC.Boolean),
    key: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String)
  });
  const RegisteredComponentGroupDescriptionType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb["interface"] */ .pC["interface"]({
    title: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String,
    component: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String,
    properties: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.list */ .pC.list(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.union */ .pC.union([scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String, scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Array */ .pC.Array]))),
    enabled: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Boolean */ .pC.Boolean),
    key: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String)
  });
  const LivingComponentGroupDescriptionType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb["interface"] */ .pC["interface"]({
    title: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String,
    component: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.union */ .pC.union([scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Function */ .pC.Function, scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Object */ .pC.Object]),
    properties: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.list */ .pC.list(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.union */ .pC.union([scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String, scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Array */ .pC.Array]))),
    enabled: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Boolean */ .pC.Boolean),
    key: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String
  });
  const ComponentGroupDescriptionType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.union */ .pC.union([
    RegisteredComponentGroupDescriptionType,
    LivingComponentGroupDescriptionType
  ]);
  const PropertiesGroupType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.union */ .pC.union([
    PropertiesGroupDescriptionType,
    ComponentGroupDescriptionType
  ]);
  const HtmlToolbarButtonsType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.refinement */ .pC.refinement(
    scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.list */ .pC.list(HtmlToolbarButtonType),
    (list) => list.length > 0,
    "NonemptyArray"
  );
  const AttributeDataContextConfigKeyType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.refinement */ .pC.refinement(
    scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String,
    scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_4__/* .isValidDataIdentifier */ .m3,
    "DataIdentifier"
  );
  const AttributeDataContextConfigType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.dict */ .pC.dict(
    scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String,
    scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.union */ .pC.union([scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.dict */ .pC.dict(AttributeDataContextConfigKeyType, scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String), scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String])
  );
  const AttributesEditingConfigType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.dict */ .pC.dict(
    scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String,
    scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb["interface"] */ .pC["interface"]({
      title: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String),
      description: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String),
      values: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.list */ .pC.list(EnumValueLocalizationType)),
      options: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(
        scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb["interface"] */ .pC["interface"]({
          allowedTags: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.list */ .pC.list(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String)),
          multiLine: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Boolean */ .pC.Boolean),
          toolbar: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(HtmlToolbarButtonsType),
          showHtmlSource: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Boolean */ .pC.Boolean)
        })
      )
    })
  );
  const PropertiesGroupsType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.refinement */ .pC.refinement(
    scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.list */ .pC.list(PropertiesGroupType),
    haveGroupsUniqueKey,
    "Unique key as a group identifier for faster rendering (like keys in React do)"
  );
  const InitialContentType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.dict */ .pC.dict(
    scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String,
    scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.union */ .pC.union([
      scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_5__/* .LinkType */ .Un,
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Boolean */ .pC.Boolean,
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Date */ .pC.Date,
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Function */ .pC.Function,
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Nil */ .pC.Nil,
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Number */ .pC.Number,
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String,
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.list */ .pC.list(scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_5__/* .LinkType */ .Un),
      scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_5__/* .WidgetType */ .l9,
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.list */ .pC.list(scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_5__/* .WidgetType */ .l9),
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.list */ .pC.list(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String)
    ])
  );
  const DataClassType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.refinement */ .pC.refinement(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Object */ .pC.Object, isDataClass, "DataClass");
  function isDataClass(maybeDataClass) {
    return maybeDataClass instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_4__/* .DataClass */ .Gd;
  }
  const DataItemType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.refinement */ .pC.refinement(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Object */ .pC.Object, isDataItem, "DataItem");
  function isDataItem(maybeDataItem) {
    return maybeDataItem instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_4__/* .DataItem */ .zw;
  }
  const EditingConfigType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb["interface"] */ .pC["interface"]({
    attributeDataContext: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(AttributeDataContextConfigType),
    attributes: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(AttributesEditingConfigType),
    description: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String),
    descriptionForContent: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Function */ .pC.Function),
    hideInSelectionDialogs: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Boolean */ .pC.Boolean),
    initialContent: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(InitialContentType),
    initialize: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Function */ .pC.Function),
    initializeCopy: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Function */ .pC.Function),
    properties: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(
      scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.union */ .pC.union([scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.list */ .pC.list(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.union */ .pC.union([scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String, scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Array */ .pC.Array])), scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Function */ .pC.Function])
    ),
    propertiesGroups: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.union */ .pC.union([PropertiesGroupsType, scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Function */ .pC.Function])),
    thumbnail: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String),
    thumbnailForContent: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Function */ .pC.Function),
    title: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String),
    titleForContent: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.Function */ .pC.Function),
    validations: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_app_support_validations_config__WEBPACK_IMPORTED_MODULE_2__/* .ValidationsConfigType */ .nN)
  });
  const docPermalink = "js-sdk/provideEditingConfig";
  return {
    checkProvideEditingConfig: (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .checkArgumentsFor */ .PJ)(
      "provideEditingConfig",
      [
        [
          "subject",
          scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.union */ .pC.union([
            scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.String */ .pC.String,
            scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_6__/* .ObjClassType */ .Qi,
            scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_6__/* .WidgetClassType */ .c6,
            DataClassType,
            DataItemType
          ])
        ],
        ["editingConfig", EditingConfigType]
      ],
      { docPermalink }
    ),
    throwInvalidOptions: (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .checkArgumentsFor */ .PJ)(
      "provideEditingConfig",
      [["options", scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .tcomb.struct */ .pC.struct({})]],
      { docPermalink }
    )
  };
})();
function haveGroupsUniqueKey(groups) {
  const groupsWithKey = groups.filter((group) => !!group.key);
  return (0,lodash_es_uniqBy__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)(groupsWithKey, "key").length === groupsWithKey.length;
}


/***/ }),

/***/ 8926:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ replaceInternalLinks),
/* harmony export */   y: () => (/* binding */ resolveHtmlUrls)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_basic_url_for__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8459);
/* harmony import */ var scrivito_sdk_app_support_current_app_space__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3626);
/* harmony import */ var scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3420);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9853);
/* harmony import */ var scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9528);
/* harmony import */ var scrivito_sdk_link_resolution__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7688);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9880);

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

/***/ 3420:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  kx: () => (/* binding */ ensureRoutingDataAvailable),
  BC: () => (/* binding */ generateDestination),
  N2: () => (/* binding */ generateDestinationForId),
  nu: () => (/* binding */ generateUrl),
  cr: () => (/* binding */ generateUrlWithCanonicalOrigin),
  ZK: () => (/* binding */ initRouting),
  BH: () => (/* binding */ isDestinationUnavailableRecognized),
  m4: () => (/* binding */ isLocalUri),
  QF: () => (/* binding */ isNotResponsibleRoute),
  Kh: () => (/* binding */ isObjNotFoundRoute),
  jh: () => (/* binding */ recognize)
});

// UNUSED EXPORTS: generateLocalPath

// EXTERNAL MODULE: external "urijs"
var external_urijs_ = __webpack_require__(6275);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_page_data.ts
var current_page_data = __webpack_require__(4185);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/destination_types.ts
var destination_types = __webpack_require__(941);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(9853);
// EXTERNAL MODULE: ./scrivito_sdk/data/index.ts + 28 modules
var data = __webpack_require__(4433);
// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 27 modules
var loadable = __webpack_require__(6664);
// EXTERNAL MODULE: ./scrivito_sdk/models/index.ts + 38 modules
var models = __webpack_require__(9880);
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
(0,common/* onReset */.rj)(clearPermalinkCache);

// EXTERNAL MODULE: ./scrivito_sdk/app_support/routing/homepage_callback.ts
var homepage_callback = __webpack_require__(4273);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_app_space.ts
var current_app_space = __webpack_require__(3626);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/unstable_multi_site_mode.ts
var unstable_multi_site_mode = __webpack_require__(48);
// EXTERNAL MODULE: ./scrivito_sdk/realm/index.ts + 22 modules
var realm = __webpack_require__(105);
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
var site_mapping = __webpack_require__(6701);
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
  return (currentRoute == null ? void 0 : currentRoute.sitePath) || uri.origin() === (0,common/* currentOrigin */.ZJ)() ? { type: "local", resource: uri.resource() } : { type: "crossSite", url: uri.toString() };
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
  return currentRoute.sitePath || uri.origin() === (0,common/* currentOrigin */.ZJ)() ? { type: "local", resource: uri.resource() } : { type: "crossSite", url: uri.toString() };
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
  return uri.is("relative") || uri.origin() === (0,common/* currentOrigin */.ZJ)();
}


/***/ }),

/***/ 4273:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ homepageFromCallback),
/* harmony export */   i: () => (/* binding */ setHomepageCallback)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_current_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4106);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9853);



let homepageCallback;
function setHomepageCallback(callback) {
  homepageCallback = callback;
}
function homepageFromCallback() {
  if (!homepageCallback)
    return null;
  return (0,scrivito_sdk_app_support_current_page__WEBPACK_IMPORTED_MODULE_0__/* .withDefaultSiteContext */ .U)(homepageCallback);
}
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .onReset */ .rj)(() => homepageCallback = void 0);


/***/ }),

/***/ 4428:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BN: () => (/* binding */ scaleDownBinary),
/* harmony export */   R4: () => (/* binding */ usePrerenderScaling),
/* harmony export */   kY: () => (/* binding */ isInitialUrlAvailable)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9853);


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
  const width = Math.max((0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .screen */ .NE)().width * (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .devicePixelRatio */ .KL)(), prerenderWidth);
  return binary.optimizeFor({ width });
}


/***/ }),

/***/ 6601:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  a: () => (/* binding */ registerScrollTarget),
  z: () => (/* binding */ scrollIntoView)
});

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(9853);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/navigation_state.ts
var navigation_state = __webpack_require__(6752);
// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 27 modules
var loadable = __webpack_require__(6664);
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

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/scroll_into_view.ts



function registerScrollTarget(targetId, element, onReveal) {
  const targetKey = keyFor(targetId);
  const id = (0,common/* randomHex */.Q4)();
  const reveal = () => {
    (0,common/* scrollElementIntoView */.bx)(element, {
      // See https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView for details
      // * Chrome and Firefox support all options
      // * Safari supports the most important options: "block" and "inline" (tested with Safari 12.1.1)
      // * Edge: Unknown
      behavior: "smooth",
      block: "center",
      inline: "center"
    });
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
(0,common/* onReset */.rj)(() => {
  scrollTargetRegistry = {};
  requestedTargetId = "";
});


/***/ }),

/***/ 6701:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Rc: () => (/* binding */ recognizeSiteAndPath),
/* harmony export */   Vz: () => (/* binding */ initSiteMapping),
/* harmony export */   XY: () => (/* binding */ baseUrlForSite)
/* harmony export */ });
/* unused harmony export reset */
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6275);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(urijs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_current_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4106);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9853);




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
        const origin = (_b = (_a2 = config.origin) != null ? _a2 : (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .currentOrigin */ .ZJ)()) != null ? _b : throwNoOrigin();
        baseUrl = `${origin}/${basePath.replace(/^\/+/, "")}`;
      }
      return baseUrl;
    }
  };
  siteForUrlCallback = (url) => {
    const uri = new urijs__WEBPACK_IMPORTED_MODULE_0__(url);
    const origin = uri.origin();
    if (origin !== config.origin && origin !== (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .currentOrigin */ .ZJ)())
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
    normalizedUrl.origin((_a = (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .currentOrigin */ .ZJ)()) != null ? _a : throwNoOrigin());
  }
  normalizedUrl.normalizePath();
  return normalizedUrl;
}
function siteForUrl(url) {
  const result = (0,scrivito_sdk_app_support_current_page__WEBPACK_IMPORTED_MODULE_1__/* .withForbiddenSiteContext */ .pd)(
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
  const errorMessage = `Unexpected return value from ${callbackName}: got ${(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .prettyPrint */ .xr)(
    actual
  )}, expected type ${expectedType}. ${SEE_CONFIGURE}`;
  (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .throwNextTick */ .a6)(new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .ArgumentError */ .ir(errorMessage));
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
  throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .ScrivitoError */ .Ix(
    "Cannot use routing before Scrivito.configure was called."
  );
}
function throwNoOrigin() {
  throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .ScrivitoError */ .Ix(
    `Cannot compute an absolute URL without a configured origin or base URL. ${SEE_CONFIGURE}`
  );
}
function isSiteForUrlResult(maybeSiteForUrlResult) {
  const siteForUrlResult = maybeSiteForUrlResult;
  if (siteForUrlResult === void 0)
    return true;
  return typeof (siteForUrlResult == null ? void 0 : siteForUrlResult.siteId) === "string" && typeof (siteForUrlResult == null ? void 0 : siteForUrlResult.baseUrl) === "string";
}
const SEE_CONFIGURE = `Visit ${(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .docUrl */ .m0)(
  "js-sdk/configure"
)} for more information.`;
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .onReset */ .rj)(reset);


/***/ }),

/***/ 5828:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ setTreatLocalhostLike),
/* harmony export */   X: () => (/* binding */ getTreatLocalhostLike)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9853);


let treatLocalhostLike;
function setTreatLocalhostLike(url) {
  treatLocalhostLike = url;
}
function getTreatLocalhostLike() {
  return treatLocalhostLike;
}
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .onReset */ .rj)(() => treatLocalhostLike = void 0);


/***/ }),

/***/ 3218:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ uiAdapter)
/* harmony export */ });
/* unused harmony export setUiAdapter */
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9853);


let uiAdapter;
function setUiAdapter(newUiAdapter) {
  uiAdapter = newUiAdapter;
}
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .onReset */ .rj)(() => setUiAdapter(void 0));


/***/ }),

/***/ 8493:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ uiAdapterCompatibleValue)
/* harmony export */ });
/* harmony import */ var lodash_es_isDate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7826);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9880);

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
      if ((0,lodash_es_isDate__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(value))
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
  return v._scrivitoPrivateContent instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_0__/* .BasicObjSearch */ .be;
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

/***/ 48:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IC: () => (/* binding */ isGlobalOrFromUnstableSelectedSite),
/* harmony export */   IN: () => (/* binding */ getUnstableSelectedSiteId),
/* harmony export */   Ly: () => (/* binding */ useUnstableMultiSiteMode),
/* harmony export */   NV: () => (/* binding */ setUnstableMultiSiteMode),
/* harmony export */   gq: () => (/* binding */ unstable_selectSiteId),
/* harmony export */   iY: () => (/* binding */ getUnstableSiteIdForObjId),
/* harmony export */   tB: () => (/* binding */ recognizeUnstableMultiSitePermalink)
/* harmony export */ });
/* unused harmony exports UnstableMultiSiteModeOperationError, resetUnstableMultiSiteMode */
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9853);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6664);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9880);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(105);





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
    const obj = scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__/* .BasicObj */ .Jj.get(objId);
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
  // the site id is not actually "loaded",
  // we are just waiting for the application to set it
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
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .onReset */ .rj)(resetUnstableMultiSiteMode);


/***/ }),

/***/ 590:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ urlFor)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_basic_url_for__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8459);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9853);
/* harmony import */ var scrivito_sdk_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4433);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9880);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(105);






function urlFor(target, options, ...excessArgs) {
  (0,scrivito_sdk_data__WEBPACK_IMPORTED_MODULE_2__/* .assertNotUsingInMemoryTenant */ .VJ)("Scrivito.urlFor");
  checkUrlFor(target, options, ...excessArgs);
  let query;
  let hash;
  if (options) {
    query = options.query;
    hash = options.hasOwnProperty("hash") ? options.hash : options.fragment;
  }
  return (0,scrivito_sdk_app_support_basic_url_for__WEBPACK_IMPORTED_MODULE_0__/* .basicUrlFor */ .M)((0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__/* .unwrapAppClass */ .bM)(target), { query, hash });
}
const TargetType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.union */ .pC.union([scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__/* .ObjType */ .Bt, scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__/* .LinkType */ .Un, scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__/* .BinaryType */ .pf]);
const OptionsType = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb["interface"] */ .pC["interface"]({
  query: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.String */ .pC.String),
  hash: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.String */ .pC.String),
  fragment: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.String */ .pC.String)
  // deprecated
});
const checkUrlFor = (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .checkArgumentsFor */ .PJ)(
  "urlFor",
  [
    ["target", TargetType],
    ["options", scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.maybe */ .pC.maybe(OptionsType)]
  ],
  {
    docPermalink: "js-sdk/urlFor"
  }
);


/***/ }),

/***/ 4136:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* binding */ urlForDataItem)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_basic_url_for__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8459);
/* harmony import */ var scrivito_sdk_app_support_current_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4106);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9853);
/* harmony import */ var scrivito_sdk_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4433);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9880);






function urlForDataItem(dataItem) {
  (0,scrivito_sdk_data__WEBPACK_IMPORTED_MODULE_3__/* .assertNotUsingInMemoryTenant */ .VJ)("Scrivito.urlForDataItem");
  const obj = dataItem.obj();
  if (obj) {
    return getDetailsPageUrl(dataItem, obj.siteId() || (0,scrivito_sdk_app_support_current_page__WEBPACK_IMPORTED_MODULE_1__/* .currentSiteId */ .lx)());
  }
  const siteId = (0,scrivito_sdk_app_support_current_page__WEBPACK_IMPORTED_MODULE_1__/* .currentSiteId */ .lx)();
  return siteId ? getDetailsPageUrl(dataItem, siteId) : null;
}
function getDetailsPageUrl(dataItem, siteId) {
  const dataClassName = dataItem.dataClassName();
  const detailsPage = (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .getDetailsPageForDataParam */ .UI)(dataClassName, siteId);
  if (!detailsPage)
    return null;
  const query = `${(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .parameterizeDataClass */ .CA)(dataClassName)}=${dataItem.id()}`;
  return (0,scrivito_sdk_app_support_basic_url_for__WEBPACK_IMPORTED_MODULE_0__/* .basicUrlForObj */ .P)(detailsPage, { query });
}


/***/ }),

/***/ 9099:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* binding */ User)
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

/***/ 8142:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bI: () => (/* binding */ VALIDATION_SEVERITY_LEVELS),
/* harmony export */   eK: () => (/* binding */ isContentValidationCallback),
/* harmony export */   nN: () => (/* binding */ ValidationsConfigType),
/* harmony export */   np: () => (/* binding */ getValidationCallback),
/* harmony export */   tj: () => (/* binding */ isAttributeValidationConstraintsWithOptions)
/* harmony export */ });
/* unused harmony export isAttributeValidationCallback */
/* harmony import */ var scrivito_sdk_app_support_constraints_validation_callback__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(852);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9853);



const VALIDATION_SEVERITY_LEVELS = [
  "error",
  "warning",
  "info"
];
const ConstraintsConfig = scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb["interface"] */ .pC["interface"]({
  severity: scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.maybe */ .pC.maybe(scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .tcomb.enums */ .pC.enums.of(VALIDATION_SEVERITY_LEVELS))
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
  return (0,scrivito_sdk_app_support_constraints_validation_callback__WEBPACK_IMPORTED_MODULE_0__/* .getConstraintsValidationCallback */ .j)()(constraints);
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

/***/ 2996:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  HT: () => (/* reexport */ adapter_description_GET),
  H8: () => (/* reexport */ adapter_description_SEND),
  M: () => (/* reexport */ adapter_description_STREAM),
  Sp: () => (/* reexport */ createAdapterConnection),
  oc: () => (/* reexport */ linkViaPort),
  XP: () => (/* reexport */ startAdapterMessageServer)
});

// UNUSED EXPORTS: RemoteAdapterError, anticipatedMessageLink, connectTo, createAdapterClient, createAdapterMessageClient, createAdapterProxy, postMessageLinkFor, wrapWithLogging

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(9853);
// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 27 modules
var loadable = __webpack_require__(6664);
// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(2757);
;// CONCATENATED MODULE: ./scrivito_sdk/bridge/adapter_client.ts





function createAdapterClient(description, connection) {
  const adapterState = createStateContainer();
  const adapterClient = {};
  Object.keys(description).forEach((methodName) => {
    const methodType = description[methodName];
    if (methodType === GET) {
      adapterClient[methodName] = (...params) => {
        const methodNameAsGet = methodName;
        const state = adapterState.subState(methodNameAsGet).subState(computeCacheKey(params));
        const data = new LoadableData({
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

;// CONCATENATED MODULE: ./scrivito_sdk/bridge/adapter_description.ts

const adapter_description_GET = "GET";
const adapter_description_SEND = "SEND";
const adapter_description_STREAM = "STREAM";

;// CONCATENATED MODULE: ./scrivito_sdk/bridge/adapter_connection.ts




function createAdapterConnection(description, adapter) {
  return {
    stream(methodName, ...params) {
      const method = adapter[methodName];
      const methodType = description[methodName];
      if (methodType === adapter_description_GET) {
        return (0,loadable/* loadAndObserve */.DU)(() => method.call(adapter, ...params));
      }
      if (methodType === adapter_description_STREAM) {
        const result = method.call(adapter, ...params);
        return result;
      }
      throw new common/* InternalError */.AQ();
    },
    send(methodName, ...params) {
      const method = adapter[methodName];
      const promise = new Promise((resolve) => {
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
    incomingMessages: new Streamable((subscriber) => {
      function listener(event) {
        if (event.source === null)
          return;
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

;// CONCATENATED MODULE: ./scrivito_sdk/bridge/stream_demux.ts


class stream_demux_StreamDemux {
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
    return new Streamable((subscriber) => {
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
class RemoteAdapterError extends (/* unused pure expression or super */ null && (ScrivitoError)) {
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

;// CONCATENATED MODULE: ./scrivito_sdk/bridge/messages.ts

function messages_isAdapterMessage(data) {
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
function messages_isResponseMessage(message) {
  return message.verb === "RESPOND" && typeof message.sequence === "number";
}
function messages_isErrorMessage(message) {
  return message.verb === "ERROR";
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
    this.incomingMessages = portLink.incomingMessages.map((message) => message.data).filter(messages_isAdapterMessage);
    this.incomingChannels = new stream_demux_StreamDemux(
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
    this.incomingChannels.streamWithId(channel).filter(isCloseStreamMessage).waitForFirst().then(() => subscription.unsubscribe()).catch((error) => {
      subscription.unsubscribe();
      if (error instanceof common/* EndOfStreamError */.dL) {
        return;
      }
      throw error;
    });
  }
  adapterStreamForInvocation(invocation) {
    if (isMatchingAdapterInvocation(this.description, adapter_description_GET, invocation)) {
      return this.adapterConnection.stream(
        invocation.methodName,
        ...invocation.params
      );
    }
    if (isMatchingAdapterInvocation(this.description, adapter_description_STREAM, invocation)) {
      return this.adapterConnection.stream(
        invocation.methodName,
        ...invocation.params
      );
    }
  }
  handleSendMessage(message) {
    const invocation = invocationFrom(message);
    if (!isMatchingAdapterInvocation(this.description, adapter_description_SEND, invocation)) {
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
    incomingMessages: anticipatedStream(
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
  const requestId = randomId();
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
  }).filter(isPresent).waitForFirst();
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

/***/ 9001:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Sl: () => (/* reexport */ ApiClient),
  XF: () => (/* reexport */ ClientError),
  oq: () => (/* reexport */ JrRestApi),
  Bm: () => (/* reexport */ PUBLISHED_SPACE),
  Ij: () => (/* reexport */ RequestFailedError),
  Jh: () => (/* reexport */ TokenAuthorizationProvider),
  h_: () => (/* reexport */ VisitorAuthenticationProvider),
  $V: () => (/* reexport */ clientConfig),
  i3: () => (/* reexport */ cmsRestApi),
  Qw: () => (/* reexport */ cmsRetrieval),
  cC: () => (/* reexport */ createRestApiClient),
  rd: () => (/* reexport */ fetchJson),
  yU: () => (/* reexport */ getBrowserTokenProvider),
  B2: () => (/* reexport */ getIamAuthUrl),
  H0: () => (/* reexport */ getWorkspaceChanges),
  cm: () => (/* reexport */ getWorkspaceId),
  IN: () => (/* reexport */ isDataLocatorOperatorFilter),
  P7: () => (/* reexport */ isEmptySpaceId),
  gg: () => (/* reexport */ isExistentObjJson),
  J8: () => (/* reexport */ isUnavailableObjJson),
  hV: () => (/* reexport */ isWidgetAttributeJson),
  O6: () => (/* reexport */ isWidgetlistAttributeJson),
  Hn: () => (/* reexport */ isWorkspaceObjSpaceId),
  AL: () => (/* reexport */ retrieveObj),
  A2: () => (/* reexport */ setLoggedInIndicatorParam),
  _i: () => (/* reexport */ useDefaultPriority),
  dx: () => (/* reexport */ withEachAttributeJson)
});

// UNUSED EXPORTS: MissingWorkspaceError, OP_CODES, fetchBrowserToken, injectBrowserToken, isComparisonRange, isObjSpaceId, objSpaceIdsEqual, replaceCmsRetrieval, retrieveObjFieldDiffs, setIdentityProvider, setupRegisterVerificator

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
class ApiClient {
  constructor(fetchCallback, options) {
    this.fetchCallback = fetchCallback;
    this.options = options;
  }
  fetch(path, options) {
    return this.fetchCallback(path, __spreadValues(__spreadValues({}, this.options), options));
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

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(9853);
;// CONCATENATED MODULE: ./scrivito_sdk/client/fetch_with_timeout.ts

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
    const timer = (0,common/* setTimeout */.iK)(() => abortController.abort(), 15e3);
    const fetchOptions = options || {};
    fetchOptions.signal = abortController.signal;
    try {
      return yield fetch(resource, fetchOptions);
    } catch (error) {
      throw new RequestFailedError(getErrorMessage(error));
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


class ClientError extends common/* ScrivitoError */.Ix {
  constructor(message, code, details, httpStatus) {
    super(message);
    this.message = message;
    this.code = code;
    this.details = details;
    this.httpStatus = httpStatus;
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/cms_rest_api/parse_or_throw_request_failed_error.ts


function parseOrThrowRequestFailedError(jsonText) {
  try {
    return JSON.parse(jsonText);
  } catch (_error) {
    throw new RequestFailedError(jsonText);
  }
}

// EXTERNAL MODULE: ../node_modules/lodash-es/isObject.js
var isObject = __webpack_require__(6743);
;// CONCATENATED MODULE: ./scrivito_sdk/client/is_error_response.ts


function isErrorResponse(parsedResponse) {
  if (!(0,isObject/* default */.Z)(parsedResponse))
    return false;
  const errorType = typeof parsedResponse.error;
  const codeType = typeof parsedResponse.code;
  const details = parsedResponse.details;
  return errorType === "string" && (codeType === "string" || codeType === "undefined") && ((0,isObject/* default */.Z)(details) || details === void 0);
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
function parseResponse(response) {
  return parse_response_async(this, null, function* () {
    const responseText = yield (0,common/* registerAsyncTask */.ro)(() => response.text());
    const httpStatus = response.status;
    if (httpStatus >= 200 && httpStatus < 300) {
      if (!responseText.length)
        return null;
      return parseOrThrowRequestFailedError(responseText);
    }
  });
}
function throwOnError(response) {
  return parse_response_async(this, null, function* () {
    const httpStatus = response.status;
    if (httpStatus >= 200 && httpStatus < 300)
      return response;
    const responseText = yield (0,common/* registerAsyncTask */.ro)(() => response.text());
    if (httpStatus >= 400 && httpStatus < 500) {
      const {
        message: originalMessage,
        code,
        details
      } = parseErrorResponse(responseText);
      const message2 = (0,common/* uniqueErrorMessage */.th)(originalMessage);
      if (httpStatus === 403)
        throw new AccessDeniedError(message2, code, details);
      throw new ClientError(message2, code, details, httpStatus);
    }
    const parsedResponse = parseOrThrowRequestFailedError(responseText);
    const message = httpStatus === 500 && isErrorResponse(parsedResponse) ? parsedResponse.error : responseText;
    throw new RequestFailedError((0,common/* uniqueErrorMessage */.th)(message));
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
    return (0,common/* waitMs */.OH)(timeToWait);
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
    if (retriesAreDisabled)
      return request();
    const backoff = new ExponentialBackoff();
    while (true) {
      const response = yield request();
      if (response.status !== 429)
        return response;
      if (limitedRetries && backoff.numberOfRetries() > 19)
        throw new Error();
      yield backoff.nextDelay();
    }
  });
}
function retryOnRequestFailed(request) {
  return retry_async(this, null, function* () {
    if (retriesAreDisabled)
      return request();
    const backoff = new ExponentialBackoff();
    while (true) {
      try {
        return yield request();
      } catch (error) {
        if (!(error instanceof RequestFailedError))
          throw error;
        if (limitedRetries && backoff.numberOfRetries() > 5)
          throw error;
        (0,common/* logError */.H)(`"${String(error)}". Retrying the request...`);
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
      return fetchJson(url, fetch_json_spreadProps(fetch_json_spreadValues({}, options), {
        headers: fetch_json_spreadProps(fetch_json_spreadValues({}, options.headers), {
          "Content-Type": "application/json; charset=utf-8"
        }),
        body: JSON.stringify(data),
        data: void 0
      }));
    }
    const params = options == null ? void 0 : options.params;
    if (params) {
      return fetchJson(encodeParameters(url, params), fetch_json_spreadProps(fetch_json_spreadValues({}, options), {
        params: void 0
      }));
    }
    const plainRequest = (authorization) => {
      var _a2, _b;
      return fetchWithTimeout(
        url,
        authorization ? fetch_json_spreadProps(fetch_json_spreadValues({}, options), {
          headers: fetch_json_spreadProps(fetch_json_spreadValues({}, options == null ? void 0 : options.headers), { Authorization: authorization }),
          credentials: (_a2 = options == null ? void 0 : options.credentials) != null ? _a2 : "omit"
        }) : fetch_json_spreadProps(fetch_json_spreadValues({}, options), { credentials: (_b = options == null ? void 0 : options.credentials) != null ? _b : "include" })
      );
    };
    const authProvider = options == null ? void 0 : options.authProvider;
    const authorizedRequest = authProvider ? () => authProvider.authorize(plainRequest) : plainRequest;
    const isIdempotent = (_a = options == null ? void 0 : options.isIdempotent) != null ? _a : (options == null ? void 0 : options.method) !== "POST";
    const nonIdempotentRequest = () => fetch_json_async(this, null, function* () {
      return parseResponse(
        yield throwOnError(yield requestWithRateLimitRetry(authorizedRequest))
      );
    });
    return isIdempotent ? retryOnRequestFailed(nonIdempotentRequest) : nonIdempotentRequest();
  });
}
function encodeParameters(url, params) {
  const apiUrl = new URL(url);
  for (const [name, value] of Object.entries(params)) {
    if (typeof value === "string")
      apiUrl.searchParams.append(name, value);
  }
  return apiUrl.toString();
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
    if (!loginHandler)
      return fn();
    try {
      return yield fn();
    } catch (error) {
      if (loginHandler && isAuthMissingClientError(error)) {
        return loginHandler(error.details.visit);
      }
      throw error;
    }
  });
}
function isAuthMissingClientError(error) {
  return error instanceof ClientError && error.code === "auth_missing" && "visit" in error.details && typeof error.details.visit === "string";
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




let providerCache = {};
function getBrowserTokenProvider(audience) {
  return providerCache[audience] || initStoredAuthProvider(audience);
}
function initStoredAuthProvider(audience) {
  providerCache[audience] = new TokenAuthorizationProvider(
    () => fetchBrowserToken({ audience })
  );
  return getBrowserTokenProvider(audience);
}
function injectBrowserToken(audience, token) {
  getBrowserTokenProvider(audience).injectToken(token);
}
function fetchBrowserToken(_0) {
  return browser_token_async(this, arguments, function* ({
    audience,
    origin
  }) {
    const instanceId = yield (0,common/* fetchConfiguredTenant */.Kc)();
    const authLocation = yield getIamAuthUrl();
    try {
      const response = yield fetchJson(
        `${authLocation}/instance/${instanceId}/token`,
        { params: { audience, origin } }
      );
      assertTokenResponse(response);
      return response.access_token;
    } catch (error) {
      throw resolveLocationInAuthError(error, authLocation);
    }
  });
}
function resolveLocationInAuthError(error, authLocation) {
  if (!isAuthMissingClientError(error))
    return error;
  return new ClientError(error.message, error.code, {
    visit: error.details.visit.replace("$JR_AUTH_LOCATION", authLocation)
  });
}
function assertTokenResponse(response) {
  if (response && typeof response === "object" && "access_token" in response && typeof response.access_token === "string") {
    return;
  }
  throw new common/* InternalError */.AQ();
}
(0,common/* onReset */.rj)(() => providerCache = {});

;// CONCATENATED MODULE: ./scrivito_sdk/client/join_paths.ts

function joinPaths(startPath, endPath) {
  if (endPath === "")
    return startPath;
  return `${startPath}/${endPath.replace(/^\//, "")}`;
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


function loginRedirectHandler(visit) {
  return login_redirect_handler_async(this, null, function* () {
    (0,common/* assignLocation */.Hz)(yield authenticationUrl(visit));
    return (0,common/* never */.Fi)();
  });
}
let identityProvider;
function setIdentityProvider(idp) {
  identityProvider = idp;
}
function getIdentityProvider() {
  return identityProvider;
}
let loggedInParamName;
function setLoggedInIndicatorParam(paramName) {
  loggedInParamName = paramName;
}
function authenticationUrl(visit) {
  return login_redirect_handler_async(this, null, function* () {
    let authUrl = visit.replace("$RETURN_TO", encodeURIComponent(returnToUrl()));
    const iamAuthLocation = (yield clientConfig.fetch()).iamAuthLocation;
    if (!iamAuthLocation)
      throw new common/* InternalError */.AQ();
    authUrl = authUrl.replace("$JR_API_LOCATION/iam/auth", iamAuthLocation);
    if (!identityProvider)
      return authUrl;
    const authUrlWithIdp = new URL(authUrl);
    authUrlWithIdp.searchParams.set("idp", identityProvider);
    return authUrlWithIdp.toString();
  });
}
function returnToUrl() {
  const url = new URL((0,common/* currentHref */.RO)());
  if (loggedInParamName)
    url.searchParams.set(loggedInParamName, "");
  return url.toString();
}
(0,common/* onReset */.rj)(() => loggedInParamName = void 0);

;// CONCATENATED MODULE: ./scrivito_sdk/client/create_rest_api_client.ts

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
    (url, fetchOptions) => create_rest_api_client_async(this, null, function* () {
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
    method: verb,
    params,
    unstable_forceCookie
  } = {}) {
    var _a, _b;
    const method = (_a = verb == null ? void 0 : verb.toUpperCase()) != null ? _a : "GET";
    const config = yield clientConfig.fetch();
    const handler = loginHandler != null ? loginHandler : config.loginHandler === "redirect" ? loginRedirectHandler : void 0;
    const authProvider = unstable_forceCookie ? void 0 : (_b = config.iamAuthProvider) != null ? _b : getBrowserTokenProvider(audience || new URL(url).origin);
    return withLoginHandler(
      handler,
      () => fetchJson(url, { data, authProvider, headers, params, method })
    );
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/get_client_version.ts


function getClientVersion() {
  const clientVersion = "jssdk/1.29.0-dev-1-g77baba215982";
  if (!clientVersion)
    throw new common/* InternalError */.AQ();
  return clientVersion;
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/verificator_functions.ts


let registry = {};
function verificator_functions_fetch(verificatorId, verificatorUrl) {
  let deferred = registry[verificatorId];
  if (!deferred) {
    deferred = new common/* Deferred */.BH();
    registry[verificatorId] = deferred;
    (0,common/* loadJs */.Vp)(verificatorUrl);
  }
  return deferred.promise;
}
function setupRegisterVerificator() {
  window._scrivitoRegisterVerificator = (verificatorId, verificatorFunction) => registry[verificatorId].resolve(verificatorFunction);
}
(0,common/* onReset */.rj)(() => registry = {});

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
        const responseText = yield (0,common/* registerAsyncTask */.ro)(
          () => response.clone().text()
        );
        const { details, code } = parseErrorResponse(responseText);
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
      const promise = verificator_functions_fetch(
        verificator.id,
        verificator.url
      ).then(
        (compute) => new Promise((resolve) => {
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
function isChallenge(maybeChallenge) {
  return !!maybeChallenge.verificator;
}
function currentAuthorization() {
  if (!verification)
    return;
  if (verification.expiresAfter < /* @__PURE__ */ new Date()) {
    verification = void 0;
    return;
  }
  return verification.authorization;
}
(0,common/* onReset */.rj)(() => {
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







class MissingWorkspaceError extends common/* ScrivitoError */.Ix {
}
let requestsAreDisabled;
let fallbackPriority;
function useDefaultPriority(priority) {
  fallbackPriority = priority;
}
class CmsRestApi {
  constructor() {
    this.initDeferred = new common/* Deferred */.BH();
  }
  init({
    apiBaseUrl,
    authorizationProvider,
    priority,
    accessAsEditor,
    analyticsProvider
  }) {
    this.url = `${apiBaseUrl}/perform`;
    this.authorizationProvider = authorizationProvider != null ? authorizationProvider : PublicAuthentication;
    this.priority = priority;
    this.accessAsEditor = accessAsEditor;
    this.analyticsProvider = analyticsProvider;
    this.initDeferred.resolve();
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
        requestParams: void 0,
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
    var _a;
    if (this.authorizationProvider) {
      if (this.authorizationProvider.currentState) {
        return `[API] ${(_a = this.authorizationProvider.currentState()) != null ? _a : "null"}`;
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
      authorizationProvider
    }) {
      yield this.ensureEnabledAndInitialized();
      try {
        return yield withLoginHandler(
          loginRedirectHandler,
          () => fetchJson(this.url, {
            method: method === "POST" ? "POST" : "PUT",
            headers: this.getHeaders(),
            data: cms_rest_api_spreadValues({
              path,
              verb: method,
              params: requestParams
            }, this.analyticsProvider && this.analyticsProvider()),
            authProvider: this.getAuthorizationProviderForRequest(
              authorizationProvider
            ),
            credentials: "omit"
          })
        );
      } catch (error) {
        throw error instanceof ClientError && error.code === "precondition_not_met.workspace_not_found" ? new MissingWorkspaceError() : error;
      }
    });
  }
  getHeaders() {
    let headers = {
      "Scrivito-Client": getClientVersion()
    };
    const priorityWithFallback = this.priority || fallbackPriority;
    if (priorityWithFallback === "background") {
      headers = cms_rest_api_spreadProps(cms_rest_api_spreadValues({}, headers), {
        "Scrivito-Priority": priorityWithFallback
      });
    }
    if (this.accessAsEditor) {
      headers = cms_rest_api_spreadProps(cms_rest_api_spreadValues({}, headers), {
        "Scrivito-Access-As": "editor"
      });
    }
    return headers;
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
  getAuthorizationProviderForRequest(authorizationProvider) {
    if (authorizationProvider === void 0) {
      if (!this.authorizationProvider)
        throw new common/* InternalError */.AQ();
      return this.authorizationProvider;
    }
    if (authorizationProvider === null)
      return void 0;
    return authorizationProvider;
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
(0,common/* onReset */.rj)(resetCmsRestApi);

;// CONCATENATED MODULE: ./scrivito_sdk/client/request_failed_error.ts


class RequestFailedError extends common/* ScrivitoError */.Ix {
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/obj_json.ts


const OP_CODES = (/* unused pure expression or super */ null && (["eq", "neq"]));
const OPERATOR_FILTER_OP_CODES = ["neq"];
function isDataLocatorOperatorFilter(filter) {
  return (0,isObject/* default */.Z)(filter) && "field" in filter && typeof filter.field === "string" && "operator" in filter && typeof filter.operator === "string" && OPERATOR_FILTER_OP_CODES.includes(
    filter.operator
  ) && "value" in filter && typeof filter.value === "string";
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
  const endpoint = `${spaceType}s/${(0,common/* assumePresence */.VV)(spaceId)}/objs/mget`;
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
    // Question: Why the magic batchSize: 17?
    // Answer: Retrieval of up to 100 Objs is a common use-case (see ObjSearch)
    // With a batchSize of 17, this leads to 6 concurrent requests, which is
    // the concurrent request limit in many browsers for HTTP/1.
    // This ensures maximum parallel loading.
    { batchSize: 17 }
  );
}
(0,common/* onReset */.rj)(() => batchRetrievals = {});

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
    if (!iamAuthLocation)
      throw new common/* InternalError */.AQ();
    return joinPaths(iamAuthLocation, path);
  });
}
const JrRestApi = createRestApiClient("https://api.justrelate.com");

;// CONCATENATED MODULE: ./scrivito_sdk/client/config.ts


const clientConfig = new common/* ConfigStore */.JU();

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
      if (response.status === 401) {
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
        const token = yield this.idToken;
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

class TokenAuthorizationProvider {
  constructor(fetchToken) {
    this.fetchToken = fetchToken;
  }
  authorize(request) {
    return token_authorization_provider_async(this, null, function* () {
      const backoff = new ExponentialBackoff();
      let fetchedTokenBefore = false;
      while (true) {
        if (!this.fetchTokenPromise) {
          this.fetchTokenPromise = (() => token_authorization_provider_async(this, null, function* () {
            if (fetchedTokenBefore)
              yield backoff.nextDelay();
            fetchedTokenBefore = true;
            return this.fetchToken();
          }))();
        }
        const tokenPromise = this.fetchTokenPromise;
        const token = yield tokenPromise;
        const response = token === null ? yield request() : yield request(`Bearer ${token}`);
        if (response.status !== 401)
          return response;
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

;// CONCATENATED MODULE: ./scrivito_sdk/client/index.ts
























/***/ }),

/***/ 9853:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ir: () => (/* reexport */ ArgumentError),
  gh: () => (/* reexport */ BatchRetrieval),
  R0: () => (/* reexport */ BlobType),
  JU: () => (/* reexport */ ConfigStore),
  AY: () => (/* reexport */ ContextContainer),
  BH: () => (/* reexport */ deferred_Deferred),
  nj: () => (/* reexport */ EmptyContinueIterable),
  dL: () => (/* reexport */ EndOfStreamError),
  Tv: () => (/* reexport */ FileType),
  AQ: () => (/* reexport */ InternalError),
  tT: () => (/* reexport */ NonNegativeInteger),
  nH: () => (/* reexport */ PositiveInteger),
  Ix: () => (/* reexport */ ScrivitoError),
  s8: () => (/* reexport */ ScrivitoPromise),
  fU: () => (/* reexport */ streamable_Streamable),
  xQ: () => (/* reexport */ Subject),
  W9: () => (/* reexport */ TransIterator),
  Hz: () => (/* reexport */ assignLocation),
  VV: () => (/* reexport */ assumePresence),
  eV: () => (/* reexport */ camelCase),
  M0: () => (/* reexport */ cdnAssetUrlBase),
  PJ: () => (/* reexport */ checkArgumentsFor),
  xk: () => (/* reexport */ classify),
  jB: () => (/* reexport */ clickPositionWithinElement),
  Xq: () => (/* reexport */ collectAndSchedule),
  W0: () => (/* reexport */ collectInListAndSchedule),
  dJ: () => (/* reexport */ computeAncestorPaths),
  mz: () => (/* reexport */ computeCacheKey),
  RO: () => (/* reexport */ currentHref),
  ZJ: () => (/* reexport */ currentOrigin),
  r2: () => (/* reexport */ deserializeAsDate),
  ld: () => (/* reexport */ deserializeAsInteger),
  KL: () => (/* reexport */ devicePixelRatio),
  m0: () => (/* reexport */ docUrl),
  r_: () => (/* reexport */ ensureUrlHasProtocol),
  fS: () => (/* reexport */ equals),
  Fe: () => (/* reexport */ equalsBestEffort),
  W: () => (/* reexport */ extractFromIterator),
  Kw: () => (/* reexport */ extractTitleAndDescription),
  Kc: () => (/* reexport */ fetchConfiguredTenant),
  xH: () => (/* reexport */ formatDateToString),
  pR: () => (/* reexport */ getConfiguredTenant),
  Me: () => (/* reexport */ getDocument),
  fp: () => (/* reexport */ getFromLocalStorage),
  ux: () => (/* reexport */ getScrivitoVersion),
  aZ: () => (/* reexport */ getScrollHeight),
  WS: () => (/* reexport */ window_proxy_innerHeight),
  iS: () => (/* reexport */ isAttributeValidationReportEntry),
  q2: () => (/* reexport */ isCamelCase),
  O2: () => (/* reexport */ isEmptyValue),
  Dw: () => (/* reexport */ isModifierClick),
  EN: () => (/* reexport */ isPresent),
  GI: () => (/* reexport */ isStringArray),
  mb: () => (/* reexport */ isSystemAttribute),
  ix: () => (/* reexport */ isValidDateString),
  RY: () => (/* reexport */ isValidFloat),
  eZ: () => (/* reexport */ isValidInteger),
  Yc: () => (/* reexport */ loadCss),
  Vp: () => (/* reexport */ loadJs),
  H: () => (/* reexport */ logError),
  Fi: () => (/* reexport */ never),
  Y3: () => (/* reexport */ nextTick),
  rj: () => (/* reexport */ onReset),
  xw: () => (/* reexport */ openWindow),
  bY: () => (/* reexport */ window_proxy_pageXOffset),
  XO: () => (/* reexport */ window_proxy_pageYOffset),
  CA: () => (/* reexport */ parameterizeDataClass),
  sp: () => (/* reexport */ parseStringToDate),
  xr: () => (/* reexport */ prettyPrint),
  sH: () => (/* reexport */ promiseAndFinally),
  t0: () => (/* reexport */ propsAreEqual),
  o8: () => (/* reexport */ pruneString),
  Q4: () => (/* reexport */ randomHex),
  kb: () => (/* reexport */ randomId),
  ro: () => (/* reexport */ registerAsyncTask),
  H5: () => (/* reexport */ reload),
  bZ: () => (/* reexport */ removeFromLocalStorage),
  sy: () => (/* reexport */ renameTo),
  g_: () => (/* reexport */ replaceHistoryState),
  DR: () => (/* reexport */ replaceLocation),
  fX: () => (/* reexport */ runAndCatchException),
  NE: () => (/* reexport */ screen),
  bx: () => (/* reexport */ scrollElementIntoView),
  X5: () => (/* reexport */ scrollTo),
  G8: () => (/* reexport */ sentenceCase),
  _h: () => (/* reexport */ setConfiguredTenant),
  _m: () => (/* reexport */ setInLocalStorage),
  Zi: () => (/* reexport */ setIntervalAndTrackId),
  kx: () => (/* reexport */ setOriginProvider),
  iK: () => (/* reexport */ setTimeoutAndTrackId),
  pC: () => (/* reexport */ external_tcomb_validation_namespaceObject),
  P2: () => (/* reexport */ throttle_throttle),
  dg: () => (/* reexport */ throwInvalidArgumentsError),
  a6: () => (/* reexport */ throwNextTick),
  Sy: () => (/* reexport */ transformContinueIterable),
  _Q: () => (/* reexport */ tryGetConfiguredTenant),
  It: () => (/* reexport */ underscore),
  th: () => (/* reexport */ uniqueErrorMessage),
  Dc: () => (/* reexport */ wait),
  OH: () => (/* reexport */ waitMs)
});

// UNUSED EXPORTS: BehaviorSubject, anticipatedStream, appUrlFromPackagedUiUrl, cleanUniqueErrorMessage, currentHash, detectUniqueErrorMessage, enableUniqueErrors, fetchMaybeTenant, getChildPath, hasTenantConfigurationBeenSet, isConfiguredWithoutTenant, isLocalhostUrl, isUnderscore, resetConfiguredTenant, setNextTickScheduler, setRegisterAsyncTaskHandler, setScrivitoPromise, sliceFromIterable, windowLocationOrigin

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

// EXTERNAL MODULE: ../node_modules/lodash-es/flatten.js
var flatten = __webpack_require__(5519);
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

// EXTERNAL MODULE: ../node_modules/lodash-es/isObjectLike.js
var isObjectLike = __webpack_require__(973);
// EXTERNAL MODULE: ../node_modules/lodash-es/_baseGetTag.js + 2 modules
var _baseGetTag = __webpack_require__(1129);
// EXTERNAL MODULE: ../node_modules/lodash-es/_getPrototype.js
var _getPrototype = __webpack_require__(4217);
;// CONCATENATED MODULE: ../node_modules/lodash-es/isPlainObject.js




var objectTag = "[object Object]";
var funcProto = Function.prototype, objectProto = Object.prototype;
var funcToString = funcProto.toString;
var isPlainObject_hasOwnProperty = objectProto.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function isPlainObject(value) {
  if (!(0,isObjectLike/* default */.Z)(value) || (0,_baseGetTag/* default */.Z)(value) != objectTag) {
    return false;
  }
  var proto = (0,_getPrototype/* default */.Z)(value);
  if (proto === null) {
    return true;
  }
  var Ctor = isPlainObject_hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
/* harmony default export */ const lodash_es_isPlainObject = (isPlainObject);

;// CONCATENATED MODULE: ../node_modules/lodash-es/isElement.js



function isElement(value) {
  return (0,isObjectLike/* default */.Z)(value) && value.nodeType === 1 && !lodash_es_isPlainObject(value);
}
/* harmony default export */ const lodash_es_isElement = (isElement);

// EXTERNAL MODULE: ../node_modules/lodash-es/isObject.js
var isObject = __webpack_require__(6743);
;// CONCATENATED MODULE: ./scrivito_sdk/common/pretty_print.ts



function prettyPrint(input) {
  try {
    if (typeof input === "function") {
      return printFunction(input);
    }
    if ((0,isObject/* default */.Z)(input)) {
      return printObject(input);
    }
    return printTruncated(input);
  } catch (_e) {
    return "";
  }
}
function printObject(object) {
  const basicContent = object._scrivitoPrivateContent;
  if (basicContent && typeof basicContent.toPrettyPrint === "function") {
    return basicContent.toPrettyPrint();
  }
  if (lodash_es_isElement(object)) {
    return `[object HTMLElement ${printTruncated(
      object.outerHTML
    )}]`;
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

;// CONCATENATED MODULE: external "tcomb-validation"
const external_tcomb_validation_namespaceObject = require("tcomb-validation");
;// CONCATENATED MODULE: ./scrivito_sdk/common/tcomb.ts


external_tcomb_validation_namespaceObject.struct.strict = true;
external_tcomb_validation_namespaceObject["interface"].strict = true;
external_tcomb_validation_namespaceObject.fail = (message) => {
  throw new TypeError(message);
};


;// CONCATENATED MODULE: ./scrivito_sdk/common/check_arguments_for.ts








function noop() {
}
let skipCheckArguments = false;
function setSkipCheckArguments(value) {
  skipCheckArguments = value;
}
function checkArgumentsFor(functionName, argumentsDefinitions, options) {
  if (process.env.NODE_ENV !== "development" || skipCheckArguments)
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
  const errors = (0,flatten/* default */.Z)(
    argumentsDefinitions.map(([argumentName, argumentType], index) => {
      const givenArgument = givenArguments[index];
      const validation = external_tcomb_validation_namespaceObject.validate(givenArgument, argumentType);
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
  if (error.expected === external_tcomb_validation_namespaceObject.Nil) {
    return `Unexpected ${subjectDescription}.`;
  }
  return `Unexpected value for ${subjectDescription}: got ${prettyPrint(
    error.actual
  )}, expected type ${external_tcomb_validation_namespaceObject.getTypeName(error.expected)}.`;
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


class deferred_Deferred {
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
  then(onfulfilled, onrejected) {
    return this.promise.then(onfulfilled, onrejected);
  }
}

// EXTERNAL MODULE: external "urijs"
var external_urijs_ = __webpack_require__(6275);
;// CONCATENATED MODULE: ./scrivito_sdk/common/ensure_url_has_protocol.ts


function ensureUrlHasProtocol(url) {
  let uri;
  try {
    uri = external_urijs_(url);
  } catch (e) {
    return url;
  }
  if (!uri.protocol() && url.match(/^[^/@]+@[^/@]+$/)) {
    return `mailto:${url}`;
  }
  if (!(uri.protocol() || url.startsWith("/")) && url.includes(".")) {
    const hostname = getHostname(url);
    if (hostname && !hostname.includes("_")) {
      return `https://${url}`;
    }
  }
  return url;
}
function getHostname(urlString) {
  let url;
  try {
    url = new URL(`https://${urlString}`);
  } catch (e) {
    return;
  }
  return url.hostname;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/tcomb_refinements.ts


const PositiveInteger = external_tcomb_validation_namespaceObject.refinement(
  external_tcomb_validation_namespaceObject.Integer,
  (i) => i > 0,
  "PositiveInteger"
);
const NonNegativeInteger = external_tcomb_validation_namespaceObject.refinement(
  external_tcomb_validation_namespaceObject.Integer,
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
  const version = "1.29.0-dev-1-g77baba215982";
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


const BlobType = external_tcomb_validation_namespaceObject["interface"](
  {
    size: external_tcomb_validation_namespaceObject.Number,
    type: external_tcomb_validation_namespaceObject.String
  },
  { name: "Blob", strict: false }
);
const FileType = BlobType.extend(
  {
    name: external_tcomb_validation_namespaceObject.String
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

;// CONCATENATED MODULE: ./scrivito_sdk/common/reset_callbacks.ts

const resetCallbacks = [];
function onReset(callback) {
  if (process.env.NODE_ENV !== "development")
    return;
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

// EXTERNAL MODULE: ../node_modules/lodash-es/debounce.js + 1 modules
var debounce = __webpack_require__(5381);
;// CONCATENATED MODULE: ../node_modules/lodash-es/throttle.js



var FUNC_ERROR_TEXT = "Expected a function";
function throttle(func, wait, options) {
  var leading = true, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if ((0,isObject/* default */.Z)(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return (0,debounce/* default */.Z)(func, wait, {
    "leading": leading,
    "maxWait": wait,
    "trailing": trailing
  });
}
/* harmony default export */ const lodash_es_throttle = (throttle);

;// CONCATENATED MODULE: ./scrivito_sdk/common/throttle.ts


let throttleDisabled = false;
function throttle_throttle(fn, ms, options) {
  return throttleDisabled ? fn : lodash_es_throttle(fn, ms, options);
}
function disableThrottle() {
  throttleDisabled = true;
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
function isValidFloat(value) {
  return typeof value === "number" && isFinite(value);
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

;// CONCATENATED MODULE: ./scrivito_sdk/common/assume_presence.ts


function assumePresence(value) {
  if (value === void 0 || value === null)
    throw new InternalError();
  return value;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/scrivito_promise.ts

let ScrivitoPromise = Promise;
function setScrivitoPromise(PromiseClass) {
  ScrivitoPromise = PromiseClass;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/app_url_from_packaged_ui_url.ts


function appUrlFromPackagedUiUrl(uiUrl) {
  const uri = new URI(uiUrl);
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


class streamable_Streamable {
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
    return new streamable_Streamable(
      (subscriber) => this.subscribe({
        next: (value) => subscriber.next(fn(value)),
        complete: () => subscriber.complete()
      })
    );
  }
  filter(test) {
    return new streamable_Streamable(
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
    return new streamable_Streamable((subscriber) => {
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
          if (!resolved)
            reject(new EndOfStreamError());
        }
      });
    });
  }
  /** Transforms this stream, so that it completes, when the passed-in stream
   * emits its first value or completes.
   */
  takeUntil(until) {
    return new streamable_Streamable((subscriber) => {
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


class Subject extends streamable_Streamable {
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
class BehaviorSubject extends (/* unused pure expression or super */ null && (Subject)) {
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

;// CONCATENATED MODULE: ./scrivito_sdk/common/config_store.ts


class ConfigStore {
  constructor() {
    this.configDeferred = new deferred_Deferred();
  }
  set(config) {
    if (this.storedConfig !== void 0)
      throw new InternalError();
    this.configDeferred.resolve(config);
    this.storedConfig = { config };
  }
  get() {
    if (this.storedConfig === void 0)
      throw new InternalError();
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

// EXTERNAL MODULE: ../node_modules/lodash-es/isEmpty.js
var isEmpty = __webpack_require__(6016);
;// CONCATENATED MODULE: ./scrivito_sdk/common/is_empty_value.ts


function isEmptyValue(value) {
  return value === null || (typeof value === "string" || Array.isArray(value)) && (0,isEmpty/* default */.Z)(value);
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

;// CONCATENATED MODULE: ./scrivito_sdk/common/register_async_task.ts

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
let registerHandler;
function registerAsyncTask(task) {
  return __async(this, null, function* () {
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

function timeout_noop() {
}
let trackTimeoutId = timeout_noop;
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

;// CONCATENATED MODULE: ./scrivito_sdk/common/local_storage.ts


function getFromLocalStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}
function setInLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
  }
}
function removeFromLocalStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
  }
}
onReset(() => {
  try {
    localStorage.clear();
  } catch (e) {
  }
});

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
  if (!configuredTenant)
    throw new InternalError();
  return configuredTenant;
}
function fetchConfiguredTenant() {
  return configured_tenant_async(this, null, function* () {
    const resolvedTenant = yield deferredConfiguredTenant;
    if (!resolvedTenant)
      throw new InternalError();
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
  if (!originProvider)
    throw new InternalError();
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

;// CONCATENATED MODULE: ./scrivito_sdk/common/index.ts
































































/***/ }),

/***/ 4433:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  hO: () => (/* reexport */ FacetQuery),
  kI: () => (/* reexport */ IN_MEMORY_TENANT),
  Tk: () => (/* reexport */ IdBatchCollection),
  hH: () => (/* reexport */ IdBatchQuery),
  kt: () => (/* reexport */ ObjBackendReplication),
  VJ: () => (/* reexport */ assertNotUsingInMemoryTenant),
  gU: () => (/* reexport */ configureForLazyWidgets),
  ZN: () => (/* reexport */ createObjData),
  Qc: () => (/* reexport */ disableObjReplication),
  Id: () => (/* reexport */ failIfPerformanceConstraint),
  uw: () => (/* reexport */ findWidgetPlacement),
  Dk: () => (/* reexport */ getContentStateId),
  Mu: () => (/* reexport */ getFieldDiff),
  L7: () => (/* reexport */ obj_data_store_getObjData),
  N1: () => (/* reexport */ getObjQuery),
  kb: () => (/* reexport */ getObjQueryCount),
  lY: () => (/* reexport */ getObjVersion),
  mG: () => (/* reexport */ getWidgetModification),
  zQ: () => (/* reexport */ isUsingInMemoryTenant),
  P3: () => (/* reexport */ isWidgetlistDiff),
  vr: () => (/* reexport */ objReplicationPool),
  qe: () => (/* reexport */ runWithPerformanceConstraint),
  Bg: () => (/* reexport */ setContentStateId),
  D7: () => (/* reexport */ suggest),
  PD: () => (/* reexport */ trackContentStateId),
  x0: () => (/* reexport */ updateContent),
  c9: () => (/* reexport */ useInMemoryTenant),
  Lo: () => (/* reexport */ useReplicationStrategy)
});

// UNUSED EXPORTS: ObjData, ObjStreamReplication, REMOVE_THIS_KEY, ReplicationCache, clearObjDataCache, createObjReplicationProcess, diffObjJson, diffWidgetJson, hasObjContentDiff, isAttributeModified, setContentUpdateHandler, setObjStreamReplicationEndpoint

// EXTERNAL MODULE: ./scrivito_sdk/client/index.ts + 37 modules
var client = __webpack_require__(9001);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(9853);
// EXTERNAL MODULE: ../node_modules/lodash-es/difference.js + 1 modules
var difference = __webpack_require__(6553);
// EXTERNAL MODULE: ../node_modules/lodash-es/isEmpty.js
var isEmpty = __webpack_require__(6016);
// EXTERNAL MODULE: ../node_modules/lodash-es/isEqual.js
var lodash_es_isEqual = __webpack_require__(6285);
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






function obj_patch_patchObjJson(primitiveObj, patch) {
  if (!primitiveObj)
    return patch;
  return patchJson(primitiveObj, patch);
}
function obj_patch_diffObjJson(fromObjJson, toObjJson) {
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
  const patch = obj_patch_diffObjJson(objJsonA, objJsonB);
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
  const keysOfAOnly = (0,difference/* default */.Z)(keysOfA, keysOfB);
  keysOfAOnly.forEach((key) => {
    handler(key, objectA[key], objectB[key], false);
  });
  keysOfB.forEach((key) => {
    handler(key, objectA[key], objectB[key], true);
  });
}
function buildUpdatedWidgetPool(widgetPool, widgetPoolPatch) {
  if (!widgetPoolPatch || (0,isEmpty/* default */.Z)(widgetPoolPatch))
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
      if (!(0,isEmpty/* default */.Z)(widgetPatch))
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
      if (!(0,isEmpty/* default */.Z)(widgetPoolPatch)) {
        patch._widget_pool = widgetPoolPatch;
      }
    } else {
      const patchValue = buildPatchEntry(valueInA, valueInB, () => {
        if (!(0,lodash_es_isEqual/* default */.Z)(valueInA, valueInB))
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
(0,common/* onReset */.rj)(() => {
  objReplicationPool.clearCache();
  objReplicationPool.clearWriteCallbacks();
});

;// CONCATENATED MODULE: ./scrivito_sdk/data/performance_constraint.ts


const constraint = new common/* ContextContainer */.AY();
function failIfPerformanceConstraint(message) {
  if (constraint.current())
    throw new common/* InternalError */.AQ(message);
}
function runWithPerformanceConstraint(fn) {
  return constraint.runWith(true, fn);
}

// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 27 modules
var loadable = __webpack_require__(6664);
// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(2757);
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
      return (0,client/* retrieveObj */.AL)(objSpaceId, objId, "widgetless");
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
    if (!(0,client/* isExistentObjJson */.gg)(baseObjJson))
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
  /** Get a top-level attribute from the Obj.
   *
   * If you are sure that no widgets are involved (key is not a widget or a widgetlist attribute),
   * you could use getAttributeWithoutWidgetData instead, which is faster.
   */
  getAttribute(key) {
    if ((0,common/* isSystemAttribute */.mb)(key))
      return this.getAttributeWithoutWidgetData(key);
    if (!this.ensureAvailable())
      return;
    const valueFromBase = getSubReader(key, this.baseData).get();
    return valueFromBase !== void 0 ? valueFromBase : getSubReader(key, this.widgetData).get();
  }
  /** Get a top-level attribute from the Obj, which is not a widget or a widgetlist */
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
  // for test purposes only
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
  // for test purposes only
  isAvailable() {
    return this.baseData.isAvailable();
  }
  update(objPatch) {
    const newState = obj_patch_patchObjJson(this.get(), objPatch);
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
    baseCollection.get([objSpaceId, objId]).set(yield (0,client/* retrieveObj */.AL)(objSpaceId, objId, "widgetless"));
  }));
}
function idsFromCollection(collection) {
  return collection.dangerouslyGetRawValues().map((objJson) => objJson._id).filter(common/* isPresent */.EN);
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
  return key === "_widget_pool" || !(0,common/* isSystemAttribute */.mb)(key) && Array.isArray(value) && (value[0] === "widget" || value[0] === "widgetlist");
}
(0,common/* onReset */.rj)(() => configuredForLazyWidgets = false);

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
    return workspace_content_updater_async(this, null, function* () {
      if (this.updating)
        return this.updating;
      const from = this.getContentStateId();
      if (!from)
        return;
      this.updating = (0,common/* promiseAndFinally */.sH)(
        (0,client/* getWorkspaceChanges */.H0)(this.workspaceId, from).then(
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
    });
  }
  applyChanges(objs) {
    objs.forEach((json) => {
      const objId = (0,client/* isUnavailableObjJson */.J8)(json) ? json._deleted : json._id;
      const objReplication = objReplicationPool.get(
        ["workspace", this.workspaceId],
        objId
      );
      objReplication.notifyBackendState(json);
    });
  }
  initializeContentStateId() {
    return workspace_content_updater_async(this, null, function* () {
      if (this.getContentStateId())
        return;
      const response = yield (0,client/* getWorkspaceChanges */.H0)(this.workspaceId);
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




const contentStateIds = (0,state/* createStateContainer */.JH)();
let contentUpdateHandler;
let workspaceContentUpdaters = {};
function setContentUpdateHandler(handler) {
  contentUpdateHandler = handler;
}
function getContentStateId(objSpaceId) {
  if ((0,client/* isEmptySpaceId */.P7)(objSpaceId))
    return "";
  const workspaceId = (0,client/* getWorkspaceId */.cm)(objSpaceId);
  const contentStateId = contentUpdateHandler ? contentUpdateHandler.getContentStateId(workspaceId) : getState(workspaceId).get();
  return contentStateId || "";
}
function setContentStateId(workspaceId, contentStateId) {
  if (!contentUpdateHandler) {
    workspaceContentUpdaterFor(workspaceId).setContentStateIdOrThrowIfTracking(
      contentStateId
    );
  }
}
function trackContentStateId(workspaceId) {
  return content_updater_async(this, null, function* () {
    if (!contentUpdateHandler) {
      return workspaceContentUpdaterFor(workspaceId).trackContentStateId();
    }
  });
}
function updateContent(workspaceId) {
  return content_updater_async(this, null, function* () {
    if (!contentUpdateHandler) {
      return workspaceContentUpdaterFor(workspaceId).updateContent();
    }
  });
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
(0,common/* onReset */.rj)(resetContentUpdater);

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
class InMemoryTenantUnsupportedOperationError extends common/* ScrivitoError */.Ix {
  constructor(description) {
    super(`${description} is not supported when using the in-memory tenant`);
  }
}
(0,common/* onReset */.rj)(() => inMemoryTenant = false);

;// CONCATENATED MODULE: ./scrivito_sdk/data/facet_query.ts






const loadableCollection = new loadable/* LoadableCollection */.X2({
  recordedAs: "facetquery",
  loadElement: ([objSpaceId, facet, query]) => ({
    loader: () => client/* cmsRetrieval */.Qw.retrieveFacetQuery(
      (0,client/* getWorkspaceId */.cm)(objSpaceId),
      buildRequestParams(facet, query)
    ),
    invalidation: () => (0,loadable/* loadableWithDefault */.qu)(void 0, () => getContentStateId(objSpaceId)) || ""
  })
});
const EMPTY_RESULT = { facets: [[]] };
class FacetQuery {
  constructor(objSpaceId, attribute, options, query) {
    if (!(0,client/* isEmptySpaceId */.P7)(objSpaceId)) {
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
  if (!(0,isEmpty/* default */.Z)(query)) {
    params.query = query;
  }
  return params;
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/suggest.ts




const suggest_loadableCollection = new loadable/* LoadableCollection */.X2({
  recordedAs: "suggest",
  loadElement: ([objSpaceId, params]) => ({
    loader: () => client/* cmsRetrieval */.Qw.retrieveSuggest((0,client/* getWorkspaceId */.cm)(objSpaceId), params),
    invalidation: () => (0,loadable/* loadableWithDefault */.qu)("", () => getContentStateId(objSpaceId))
  })
});
function suggest(objSpaceId, prefix, options, fromSearch) {
  assertNotUsingInMemoryTenant("Search API");
  const results = [];
  if (!(0,client/* isWorkspaceObjSpaceId */.Hn)(objSpaceId))
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
  const widgetPool = objData._widget_pool;
  if (!widgetPool)
    return placement;
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
    if (!jsonValue)
      return false;
    if ((0,common/* isSystemAttribute */.mb)(attributeName))
      return false;
    const attributeJson = jsonValue;
    if (!(0,client/* isWidgetAttributeJson */.hV)(attributeJson) && !(0,client/* isWidgetlistAttributeJson */.O6)(attributeJson)) {
      return false;
    }
    const attributeValue = attributeJson[1];
    if (Array.isArray(attributeValue)) {
      const widgetIds = attributeJson[1];
      if (!widgetIds)
        return false;
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
  (0,loadable/* load */.zD)(() => obj_data_store_getObjData(objSpaceId, objId));
}
function createObjData(objSpaceId, objId, attributes) {
  const objData = obj_data_store_objDataFor(objSpaceId, objId);
  objData.set(attributes);
  return objData;
}
function setObjData(objSpaceId, objId, primitiveObj) {
  obj_data_store_objDataFor(objSpaceId, objId).set(primitiveObj);
}
function obj_data_store_getObjData(objSpaceId, objId) {
  const objData = obj_data_store_objDataFor(objSpaceId, objId);
  if (!objData.ensureAvailable())
    return;
  return objData;
}
function obj_data_store_objDataFor(objSpaceId, objId) {
  return new ObjData(objSpaceId, objId);
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/get_obj_version.ts



function getObjVersion(objSpaceId, objId) {
  return (0,loadable/* withoutLoading */.vk)(
    () => obj_data_store_objDataFor(objSpaceId, objId).getAttribute("_version") || ""
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
    this.performThrottledReplication = (0,common/* throttle */.P2)(
      () => this.performReplication(),
      1e3
    );
  }
  start() {
    (0,client/* retrieveObj */.AL)(this.objSpaceId, this.objId, "full").then((data) => {
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
        if ((0,client/* isUnavailableObjJson */.J8)(newBackendState)) {
          this.updateLocalState(newBackendState);
        } else {
          this.updateLocalState(
            obj_patch_patchObjJson(
              this.localState,
              obj_patch_diffObjJson(this.backendState, newBackendState)
            )
          );
        }
        this.backendState = newBackendState;
      }
    }
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
      return finishSavingPromise.catch(() => Promise.reject());
    });
  }
  finishReplicating() {
    throw new common/* InternalError */.AQ();
  }
  replicationMessageStream() {
    throw new common/* InternalError */.AQ();
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
    return obj_backend_replication_async(this, null, function* () {
      const patch = obj_patch_diffObjJson(this.backendState, localState);
      return (0,isEmpty/* default */.Z)(patch) ? (
        // bang:
        // given the localState is not blank, the diff may be empty only if the
        // backendState is similar (equal?) to the localState, i.e. not blank
        Promise.resolve(this.backendState)
      ) : this.replicatePatchToBackend(patch);
    });
  }
  replicatePatchToBackend(patch) {
    const id = (0,client/* getWorkspaceId */.cm)(this.objSpaceId);
    if (id === "published")
      throw new common/* InternalError */.AQ();
    return client/* cmsRestApi */.i3.put(`workspaces/${id}/objs/${this.objId}`, {
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
      obj_patch_patchObjJson(
        this.backendState,
        obj_patch_diffObjJson(replicatedState, this.getLocalObjJson())
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
  // For test purpose only.
  isRequestInFlight() {
    return this.replicationActive;
  }
}
function isEqualState(stateA, stateB) {
  return (0,isEmpty/* default */.Z)(obj_patch_diffObjJson(stateA, stateB));
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
class version_archive_VersionArchive {
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
      if (data === lastArchivedData)
        return this.currentVersion;
      this.currentVersion++;
    }
    const newVersionNumber = this.currentVersion;
    this.archive[newVersionNumber] = data;
    return newVersionNumber;
  }
  /** find the data for a version */
  retrieveVersion(version) {
    if (!this.archive.hasOwnProperty(version))
      throw new VersionNotFoundError();
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
class VersionNotFoundError extends (/* unused pure expression or super */ null && (ScrivitoError)) {
}

;// CONCATENATED MODULE: ./scrivito_sdk/replication/replication_agent.ts



class replication_agent_ReplicationAgent {
  constructor(localState, mergeFunction, currentlyMyTurn) {
    this.localState = localState;
    this.mergeFunction = mergeFunction;
    this.currentlyMyTurn = currentlyMyTurn;
    this.outgoingMessages = new Subject();
    this.acknowledgedVersions = new Subject();
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



class replication_process_ReplicationProcess {
  constructor(localState, remoteMessages, merge, active) {
    this.localState = localState;
    this.remoteMessages = remoteMessages;
    this.outgoingMessages = new BehaviorSubject(void 0);
    this.stateChangeCausedByAgent = new ContextContainer();
    this.replicatedVersions = new BehaviorSubject(
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
    const currentVersion = this.agent.currentVersion();
    return this.replicatedVersions.filter(isPresent).filter((version) => version >= currentVersion).waitForFirst().then(() => void 0);
  }
  replicationMessages() {
    return new Streamable((observer) => {
      this.ensureStarted();
      const subscription = this.outgoingMessages.filter(isPresent).subscribe(observer);
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







function obj_replication_process_createObjReplicationProcess(objSpaceId, objId, incomingMessages, role) {
  const batchedMessages = new Streamable(
    (subscriber) => incomingMessages.subscribe(
      (message) => addBatchUpdate(() => subscriber.next(message))
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
    get: () => loadableWithDefault(void 0, () => objData.get()),
    set: (value) => {
      if (value !== void 0)
        objData.set(value);
    },
    changes: loadAndObserve(() => objData.get()).map(() => {
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
  total: void 0
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
    return this.response().total;
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
  var _a;
  if ((0,client/* isEmptySpaceId */.P7)(objSpaceId))
    return 0;
  return (_a = batchCollection.getQueryCount([objSpaceId, params])) != null ? _a : 0;
}
function getObjQuery(objSpaceId, params, batchSize) {
  assertNotUsingInMemoryTenant("Search API");
  if ((0,client/* isEmptySpaceId */.P7)(objSpaceId))
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
  const workspaceId = (0,client/* getWorkspaceId */.cm)(objSpaceId);
  return client/* cmsRetrieval */.Qw.retrieveObjQuery(workspaceId, requestParams).then((response) => {
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
    throw new InternalError();
  }
  return objReplicationEndpoint;
}

;// CONCATENATED MODULE: ./scrivito_sdk/data/obj_field_diffs_data.ts





const obj_field_diffs_data_loadableCollection = new loadable/* LoadableCollection */.X2({
  loadElement: ([from, to, objId]) => ({
    loader: () => client/* cmsRetrieval */.Qw.retrieveObjFieldDiffs(from, to, objId),
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
  return (0,client/* isWorkspaceObjSpaceId */.Hn)(objSpaceId) ? getObjVersion(objSpaceId, objId) : "";
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

/***/ 9528:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Gd: () => (/* reexport */ DataClass),
  wJ: () => (/* reexport */ DataConnectionError),
  zw: () => (/* reexport */ DataItem),
  Cc: () => (/* reexport */ DataScope),
  Vb: () => (/* reexport */ EmptyDataScope),
  Zv: () => (/* reexport */ ExternalDataClass),
  HP: () => (/* reexport */ ExternalDataItem),
  Gc: () => (/* reexport */ allCustomAttributesOfTypeString),
  KP: () => (/* reexport */ allExternalDataClasses),
  ED: () => (/* reexport */ applyDataLocator),
  kn: () => (/* reexport */ assertValidDataIdentifier),
  P7: () => (/* reexport */ computePlaceholders),
  Pd: () => (/* reexport */ createRestApiConnection),
  ae: () => (/* reexport */ dataContextFromQueryParams),
  Cz: () => (/* reexport */ deserializeDataStackElement),
  m0: () => (/* reexport */ disableExternalDataLoading),
  KT: () => (/* reexport */ getDataClassOrThrow),
  DT: () => (/* reexport */ getDataContextParameters),
  MW: () => (/* reexport */ getDataContextQuery),
  d$: () => (/* reexport */ getGlobalDataItems),
  Fv: () => (/* reexport */ isDataItemPojo),
  aG: () => (/* reexport */ isSinglePlaceholder),
  l: () => (/* reexport */ isSingletonDataClass),
  m3: () => (/* reexport */ isValidDataIdentifier),
  C8: () => (/* reexport */ provideExternalDataItem),
  ot: () => (/* reexport */ registerDataClassSchema),
  O0: () => (/* reexport */ replacePlaceholdersWithData),
  ZV: () => (/* reexport */ setExternalDataConnection)
});

// UNUSED EXPORTS: ExternalDataScope, ObjDataScope, getDataContextValue, isDataScopePojo, isValidDataId

// EXTERNAL MODULE: ./scrivito_sdk/realm/index.ts + 22 modules
var realm = __webpack_require__(105);
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

// EXTERNAL MODULE: ../node_modules/lodash-es/isObject.js
var isObject = __webpack_require__(6743);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(9853);
// EXTERNAL MODULE: ../node_modules/lodash-es/mapValues.js + 3 modules
var mapValues = __webpack_require__(785);
// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 27 modules
var loadable = __webpack_require__(6664);
// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(2757);
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



function registerDataClassSchema(dataClassName, attributes) {
  const schemata = data_class_schema_spreadValues({}, schemataState.get());
  schemata[dataClassName] = wrapInCallback(attributes);
  schemataState.set(schemata);
}
function getDataClassSchema(dataClassName) {
  return schemataCollection.get(dataClassName).getWithDefault({});
}
function getNormalizedDataClassSchema(dataClassName) {
  return (0,mapValues/* default */.Z)(
    getDataClassSchema(dataClassName),
    normalizeDataAttributeDefinition
  );
}
function unregisterDataClassSchema(dataClassName) {
  const schemata = data_class_schema_spreadValues({}, schemataState.get());
  delete schemata[dataClassName];
  schemataState.set(schemata);
}
const schemataState = (0,state/* createStateContainer */.JH)();
const schemataCollection = new loadable/* LoadableCollection */.X2({
  recordedAs: "dataClassSchema",
  loadElement: (dataClassName) => ({
    loader() {
      var _a;
      const callback = (_a = schemataState.get()) == null ? void 0 : _a[dataClassName];
      return callback ? callback() : Promise.resolve({});
    }
  })
});
function normalizeDataAttributeDefinition(definition) {
  return typeof definition === "string" ? [definition, {}] : definition;
}
function wrapInCallback(attributes) {
  if (attributes instanceof Function)
    return attributes;
  if (attributes instanceof Promise)
    return () => attributes;
  return () => Promise.resolve(attributes);
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/data_identifier.ts


function assertValidDataIdentifier(key) {
  if (!isValidDataIdentifier(key)) {
    throw new common/* ArgumentError */.ir(`Invalid data identifier "${key}"`);
  }
}
function isValidDataIdentifier(key) {
  return (key === "_id" || !!key.match(/^[a-z]([a-z0-9]|_(?!_)){0,49}$/i)) && key.slice(-1) !== "_";
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




class DataClass {
  /** @public */
  attributeDefinitions() {
    return getNormalizedDataClassSchema(this.name());
  }
}
class DataScope {
  /** @public */
  dataItemAttribute() {
    const attributeName = this.attributeName();
    if (!attributeName)
      return null;
    const dataItem = this.dataItem();
    if (!dataItem)
      return null;
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
  /** @public */
  getError() {
    return;
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
    return __async(this, null, function* () {
      return this._dataItem.update({ [this._attributeName]: value });
    });
  }
}
const DEFAULT_LIMIT = 20;
class DataItem {
  /** @public */
  attributeDefinitions() {
    return (0,common/* assumePresence */.VV)(this.dataClass()).attributeDefinitions();
  }
}
class DataScopeError extends common/* ScrivitoError */.Ix {
  /** @internal */
  constructor(message) {
    super(message);
    this.message = message;
  }
}
function assertValidDataItemAttributes(attributes) {
  if (!(0,isObject/* default */.Z)(attributes)) {
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
          `Tried to create ${attributeName}: ${String(
            attributeValue
          )} in a context of ${attributeName}: ${JSON.stringify(filterValue)}`
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
function itemPojoToScopePojo({
  _class,
  _id
}) {
  return { _class, filters: { _id } };
}
function itemIdFromFilters(filters) {
  const id = filters == null ? void 0 : filters._id;
  if (typeof id === "string")
    return id;
}

// EXTERNAL MODULE: ./scrivito_sdk/client/index.ts + 37 modules
var client = __webpack_require__(9001);
;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/data_id.ts

function isValidDataId(id) {
  return typeof id === "string" && (!!id.match(/^\d+(-\d+)*$/) || !!id.match(/^[a-f0-9]{8,}(-[a-f0-9]{8,})*$/i));
}

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




function assertValidNumericId(id) {
  if (id < 0 || !Number.isSafeInteger(id)) {
    throw new common/* ArgumentError */.ir(
      `Numeric IDs must be a non-negative "safe" integer: ${id.toString()}`
    );
  }
}
function assertValidResultItem(resultItem) {
  if (!(0,isObject/* default */.Z)(resultItem)) {
    throw new common/* ArgumentError */.ir("A result item must be an object");
  }
  const { _id: id } = autocorrectResultItemId(resultItem);
  if (!isValidDataId(id)) {
    throw new common/* ArgumentError */.ir(
      '"_id" key missing or invalid (must be numeric or hex)'
    );
  }
}
function assertValidIndexResultWithUnknownEntries(result) {
  if (!(0,isObject/* default */.Z)(result)) {
    throw new common/* ArgumentError */.ir("An index result must be an object");
  }
  const { results, continuation, count } = result;
  if (!Array.isArray(results)) {
    throw new common/* ArgumentError */.ir("Results of an index result must be an array");
  }
  if (typeof continuation === "string") {
    if (continuation.length === 0) {
      throw new common/* ArgumentError */.ir(
        "Continuation of an index result must be a non-empty string, null or undefined"
      );
    }
  } else if (continuation !== null && continuation !== void 0) {
    throw new common/* ArgumentError */.ir(
      "Continuation of an index result must be a string, null or undefined"
    );
  }
  if (typeof count !== "number" && typeof count !== "string" && count !== null && count !== void 0) {
    throw new common/* ArgumentError */.ir(
      "Count of an index result must be a non-negative integer, null or undefined"
    );
  }
}
function autocorrectResultItemId(resultItem) {
  if (isResultItemWithId(resultItem))
    return resultItem;
  if (isResultItemWithNumericId(resultItem)) {
    const _a = resultItem, { _id } = _a, rest2 = __objRest(_a, ["_id"]);
    assertValidNumericId(_id);
    return external_data_connection_spreadValues({ _id: _id.toString() }, rest2);
  }
  if (isResultItemConvenienceNumericId(resultItem)) {
    const _b = resultItem, { id: id2 } = _b, rest2 = __objRest(_b, ["id"]);
    assertValidNumericId(id2);
    return external_data_connection_spreadValues({ _id: id2.toString() }, rest2);
  }
  const _c = resultItem, { id } = _c, rest = __objRest(_c, ["id"]);
  return external_data_connection_spreadValues({ _id: id }, rest);
}
function isResultItemWithId(resultItem) {
  return typeof resultItem._id === "string";
}
function isResultItemWithNumericId(resultItem) {
  return typeof resultItem._id === "number";
}
function isResultItemConvenienceNumericId(resultItem) {
  return typeof resultItem.id === "number";
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
    throw new common/* ArgumentError */.ir(`Missing data class with name ${name}`);
  }
  return connection;
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




function createRestApiConnection(restApi) {
  const apiClient = restApi instanceof client/* ApiClient */.Sl ? restApi : (0,client/* createRestApiClient */.cC)(restApi);
  return {
    create: (data) => create_rest_api_connection_async(this, null, function* () {
      const response = yield apiClient.fetch("/", {
        method: "post",
        data
      });
      assertResultDoesNotContainObjectValues(response);
      return response;
    }),
    index: (params) => create_rest_api_connection_async(this, null, function* () {
      const response = yield apiClient.fetch("/", {
        params: toClientParams(params)
      });
      assertIndexResponseResultsDoNotContainObjectValues(response);
      return response;
    }),
    get: (id) => create_rest_api_connection_async(this, null, function* () {
      const response = yield apiClient.fetch(id);
      if (response !== null)
        assertResultDoesNotContainObjectValues(response);
      return response;
    }),
    update: (id, data) => create_rest_api_connection_async(this, null, function* () {
      const response = yield apiClient.fetch(id, {
        method: "patch",
        data
      });
      assertResultDoesNotContainObjectValues(response);
      return response;
    }),
    delete: (id) => apiClient.fetch(id, { method: "delete" })
  };
}
function assertResultDoesNotContainObjectValues(result) {
  if (!(0,isObject/* default */.Z)(result)) {
    throw new common/* ArgumentError */.ir("A result must be an object");
  }
  Object.entries(result).forEach(([key, value]) => {
    if (!isSimpleValue(value) && (Array.isArray(value) && !value.every(isSimpleValue) || !Array.isArray(value))) {
      throw new common/* ArgumentError */.ir(
        `Result values can only be of type string, number, boolean or array of these types. Invalid property: ${key}`
      );
    }
  });
}
function assertIndexResponseResultsDoNotContainObjectValues(response) {
  assertValidIndexResultWithUnknownEntries(response);
  response.results.forEach((result) => {
    if (typeof result === "number" || typeof result === "string")
      return;
    assertResultDoesNotContainObjectValues(result);
  });
}
function isSimpleValue(value) {
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value === null || value === void 0;
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
    const { opCode, value } = filters[name];
    const key = opCode === "eq" ? name : [name, opCode].join(".");
    params[key] = value;
  });
  return params;
}
function toClientOrderParam(orderSpec) {
  if (orderSpec.length) {
    return orderSpec.map((order) => order.join(".")).join(",");
  }
}

// EXTERNAL MODULE: ../node_modules/lodash-es/isEmpty.js
var isEmpty = __webpack_require__(6016);
// EXTERNAL MODULE: ../node_modules/lodash-es/isDate.js + 1 modules
var isDate = __webpack_require__(7826);
;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/data_attribute.ts








const serializers = {
  boolean: serializeBooleanAttribute,
  date: serializeDateAttribute,
  enum: serializeEnumAttribute,
  number: serializeNumberAttribute,
  reference: serializeReferenceAttribute,
  string: serializeStringAttribute
};
function serializeDataAttribute(dataClassName, attributeName, value) {
  assertNoTypedObject(dataClassName, attributeName, value);
  const attributeDefinition = getAttributeDefinition(
    dataClassName,
    attributeName
  );
  if (attributeDefinition) {
    const attributeType = getAttributeType(attributeDefinition);
    const serializer = serializers[attributeType];
    return serializer(dataClassName, attributeName, value, attributeDefinition);
  }
  return value != null ? value : null;
}
function deserializeDataAttribute(dataClassName, attributeName, value) {
  assertNoTypedObject(dataClassName, attributeName, value);
  const attributeDefinition = getAttributeDefinition(
    dataClassName,
    attributeName
  );
  if (attributeDefinition) {
    const attributeType = getAttributeType(attributeDefinition);
    const deserializer = deserializers[attributeType];
    return deserializer(
      dataClassName,
      attributeName,
      value,
      attributeDefinition
    );
  }
  return value != null ? value : null;
}
function serializeBooleanAttribute(dataClassName, attributeName, value) {
  if (typeof value === "boolean")
    return value;
  throwTypeMismatch(dataClassName, attributeName, "a boolean", value);
}
function serializeDateAttribute(dataClassName, attributeName, value) {
  if (value === null || typeof value === "string" && isISO8601(value)) {
    return value;
  }
  if ((0,isDate/* default */.Z)(value))
    return value.toISOString();
  throwTypeMismatch(
    dataClassName,
    attributeName,
    "an instance of Date, an ISO8601 date string or null",
    value
  );
}
function serializeEnumAttribute(dataClassName, attributeName, value, attributeDefinition) {
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
function serializeNumberAttribute(dataClassName, attributeName, value) {
  if (value === null || typeof value === "number")
    return value;
  throwTypeMismatch(dataClassName, attributeName, "a number or null", value);
}
function serializeReferenceAttribute(dataClassName, attributeName, value, attributeDefinition) {
  if (value === null || isValidDataId(value))
    return value;
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
function serializeStringAttribute(dataClassName, attributeName, value) {
  if (typeof value === "string")
    return value;
  throwTypeMismatch(dataClassName, attributeName, "a string", value);
}
const deserializers = {
  boolean: deserializeBooleanAttribute,
  date: deserializeDateAttribute,
  enum: deserializeEnumAttribute,
  number: deserializeNumberAttribute,
  reference: deserializeReferenceAttribute,
  string: deserializeStringAttribute
};
function deserializeBooleanAttribute(dataClassName, attributeName, value) {
  if (typeof value === "boolean") {
    return value;
  }
  logTypeMismatch(dataClassName, attributeName, "a boolean", value);
  return false;
}
function deserializeDateAttribute(dataClassName, attributeName, value) {
  if (typeof value === "string" && isISO8601(value)) {
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
function deserializeEnumAttribute(dataClassName, attributeName, value, attributeDefinition) {
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
function deserializeReferenceAttribute(dataClassName, attributeName, value, attributeDefinition) {
  if (isValidDataId(value)) {
    return getDataClassOrThrow(
      getReferencedClassName(getAttributeConfig(attributeDefinition))
    ).get(value) || null;
  }
  logTypeMismatch(dataClassName, attributeName, "a valid data ID", value);
  return null;
}
function deserializeNumberAttribute(dataClassName, attributeName, value) {
  if (typeof value === "number") {
    return value;
  }
  logTypeMismatch(dataClassName, attributeName, "a number", value);
  return null;
}
function deserializeStringAttribute(dataClassName, attributeName, value) {
  if (typeof value === "string") {
    return value;
  }
  logTypeMismatch(dataClassName, attributeName, "a string", value);
  return "";
}
function getAttributeType(attributeDefinition) {
  return typeof attributeDefinition === "string" ? attributeDefinition : attributeDefinition[0];
}
function getAttributeConfig(attributeDefinition) {
  if (typeof attributeDefinition !== "string") {
    return attributeDefinition[1];
  }
}
function isISO8601(value) {
  return !Number.isNaN(Date.parse(value)) && new Date(value).toISOString() === value;
}
function getAttributeDefinition(dataClassName, attributeName) {
  return getDataClassSchema(dataClassName)[attributeName];
}
function getEnumValues(attributeConfig) {
  if (attributeConfig && isEnumAttributeConfig(attributeConfig)) {
    return attributeConfig.values;
  }
  throw new common/* ArgumentError */.ir(
    'Enum attribute config is missing the "values" property'
  );
}
function isEnumAttributeConfig(config) {
  return "values" in config && Array.isArray(config.values);
}
function getReferencedClassName(attributeConfig) {
  if (attributeConfig && isReferenceAttributeConfig(attributeConfig)) {
    return attributeConfig.to;
  }
  throw new common/* ArgumentError */.ir(
    'Reference attribute config is missing the "to" property'
  );
}
function isReferenceAttributeConfig(attributeConfig) {
  return !!(attributeConfig && "to" in attributeConfig && typeof attributeConfig.to === "string");
}
function assertNoTypedObject(dataClassName, attributeName, value) {
  if (Array.isArray(value)) {
    assertNoTypedObject(dataClassName, attributeName, value[0]);
  }
  if ((0,isObject/* default */.Z)(value) && value.hasOwnProperty("type")) {
    throw new common/* ArgumentError */.ir(
      `Value for attribute "${attributeName}" of data class "${dataClassName}" contains an object with property "type"`
    );
  }
}
function logTypeMismatch(dataClassName, attributeName, expected, actual) {
  if (actual === null || actual === void 0)
    return;
  (0,common/* logError */.H)(typeMismatchMessage(dataClassName, attributeName, expected, actual));
}
function throwTypeMismatch(dataClassName, attributeName, expected, actual) {
  throw new common/* ArgumentError */.ir(
    typeMismatchMessage(dataClassName, attributeName, expected, actual)
  );
}
function typeMismatchMessage(dataClassName, attributeName, expected, actual) {
  return `Expected attribute "${attributeName}" of data class "${dataClassName}" to be ${expected}", but got ${JSON.stringify(actual)}`;
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/disable_external_data_loading.ts


const isLoadingDisabled = new common/* ContextContainer */.AY();
function disableExternalDataLoading(fn) {
  return isLoadingDisabled.runWith(true, fn);
}
function isExternalDataLoadingDisabled() {
  return isLoadingDisabled.current() || false;
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/external_data.ts

var external_data_defProp = Object.defineProperty;
var external_data_getOwnPropSymbols = Object.getOwnPropertySymbols;
var external_data_hasOwnProp = Object.prototype.hasOwnProperty;
var external_data_propIsEnum = Object.prototype.propertyIsEnumerable;
var external_data_defNormalProp = (obj, key, value) => key in obj ? external_data_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var external_data_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (external_data_hasOwnProp.call(b, prop))
      external_data_defNormalProp(a, prop, b[prop]);
  if (external_data_getOwnPropSymbols)
    for (var prop of external_data_getOwnPropSymbols(b)) {
      if (external_data_propIsEnum.call(b, prop))
        external_data_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var external_data_async = (__this, __arguments, generator) => {
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
  loadableCollection.get([dataClass, dataId]).set(handleExternalData(data, dataId));
}
function getExternalData(dataClass, dataId) {
  if (isExternalDataLoadingDisabled())
    return void 0;
  return loadableCollection.get([dataClass, dataId]).get();
}
const loadableCollection = new loadable/* LoadableCollection */.X2({
  loadElement: ([dataClass, dataId]) => ({
    loader: () => external_data_async(void 0, null, function* () {
      if (!isValidDataId(dataId)) {
        throw new common/* ArgumentError */.ir(`Invalid data ID "${dataId}"`);
      }
      const connection = getExternalDataConnectionOrThrow(dataClass);
      let unknownValue;
      try {
        unknownValue = yield connection.get(dataId);
      } catch (error) {
        if (error instanceof client/* ClientError */.XF && error.httpStatus === 404) {
          return null;
        }
        throw error;
      }
      return handleExternalData(unknownValue, dataId);
    })
  })
});
function handleExternalData(data, _id) {
  if (data === null)
    return null;
  if (isExternalData(data))
    return filterValidDataIdentifiers(external_data_spreadValues({ _id }, data));
  throw new common/* ArgumentError */.ir("External data must be an object or null");
}
function isExternalData(data) {
  return (0,isObject/* default */.Z)(data) && typeof data !== "function" && !Array.isArray(data);
}
function filterValidDataIdentifiers(data) {
  const filteredData = {};
  Object.entries(data).forEach(([key, value]) => {
    if (isValidDataIdentifier(key))
      filteredData[key] = value;
  });
  return filteredData;
}

// EXTERNAL MODULE: ./scrivito_sdk/data/index.ts + 28 modules
var data = __webpack_require__(4433);
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
      (filters, [name, valueOrSpec]) => {
        if (!name)
          return filters;
        if (typeof valueOrSpec === "string") {
          return index_params_spreadProps(index_params_spreadValues({}, filters), {
            [name]: {
              operator: "equals",
              opCode: "eq",
              value: valueOrSpec
            }
          });
        }
        return index_params_spreadProps(index_params_spreadValues({}, filters), {
          [name]: index_params_spreadProps(index_params_spreadValues({}, valueOrSpec), {
            opCode: valueOrSpec.operator === "notEquals" ? "neq" : "eq"
          })
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
function countExternalData(dataClass, filters, search) {
  var _a;
  return (_a = batchCollection.getQueryCount([
    dataClass,
    filters,
    search,
    void 0,
    true
  ])) != null ? _a : null;
}
function getExternalDataQuery({
  _class: dataClass,
  filters,
  search,
  order,
  limit
}) {
  if (isExternalDataLoadingDisabled())
    return new common/* EmptyContinueIterable */.nj();
  const batchSize = limit != null ? limit : DEFAULT_LIMIT;
  const idQuery = new data/* IdBatchQuery */.hH(
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
class DataConnectionError extends common/* ScrivitoError */.Ix {
  constructor(message) {
    super(message);
    this.message = message;
  }
}
function loadBatch(_0, _1, _2) {
  return external_data_query_async(this, arguments, function* ([dataClass, filters, search, order, count], continuation, batchSize) {
    var _a;
    const indexCallback = getIndexCallback(dataClass);
    const result = yield indexCallback(
      new IndexParams(continuation, {
        filters,
        search,
        order,
        limit: batchSize,
        count: !!count
      })
    );
    if (result instanceof DataConnectionError)
      throw result;
    assertValidIndexResultWithUnknownEntries(result);
    const dataIds = handleResults(result.results, dataClass);
    return {
      continuation: (_a = result.continuation) != null ? _a : void 0,
      results: dataIds,
      total: autocorrectAndValidateCount(result.count)
    };
  });
}
function handleResults(results, dataClass) {
  return results.map((idOrItem) => {
    if (typeof idOrItem === "number") {
      assertValidNumericId(idOrItem);
      return handleDataId(dataClass, idOrItem.toString());
    }
    if (typeof idOrItem === "string") {
      assertValidDataId(idOrItem);
      return handleDataId(dataClass, idOrItem);
    }
    assertValidResultItem(idOrItem);
    return handleResultItem(dataClass, idOrItem);
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
  const _a = autocorrectResultItemId(resultItem), { _id: id } = _a, data = external_data_query_objRest(_a, ["_id"]);
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
  const _a = autocorrectResultItemId(idOrItem), { _id: id } = _a, data = external_data_query_objRest(_a, ["_id"]);
  return { id, data };
}
function autocorrectAndValidateCount(resultCount) {
  if (resultCount === void 0 || resultCount === null)
    return;
  const count = Number(resultCount);
  if (count >= 0 && (0,common/* isValidInteger */.eZ)(count))
    return count;
  throw new common/* ArgumentError */.ir(
    "Count of an index result must be a non-negative integer"
  );
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
  /** @internal */
  forAttribute(attributeName) {
    return new ExternalDataScope(this, attributeName);
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
      if (filters) {
        assertNoAttributeFilterConflicts(attributes, filters);
      }
      const dataClassName = this.dataClassName();
      const serializedAttributes = yield serializeAttributes(
        dataClassName,
        attributes
      );
      const dataForCallback = external_data_class_spreadValues(external_data_class_spreadValues({}, serializedAttributes), filters);
      const createCallback = this.getCreateCallback();
      const resultItem = yield createCallback(dataForCallback);
      assertValidResultItem(resultItem);
      const _a = autocorrectResultItemId(resultItem), { _id: id } = _a, dataFromCallback = external_data_class_objRest(_a, ["_id"]);
      setExternalData(
        dataClassName,
        id,
        !(0,isEmpty/* default */.Z)(dataFromCallback) && dataFromCallback || dataForCallback
      );
      notifyExternalDataWrite(dataClassName);
      return new ExternalDataItem(this._dataClass, id);
    });
  }
  get(id) {
    const { filters, search } = this._params;
    if (!search && !filters)
      return this._dataClass.get(id);
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
    const id = this.itemIdFromFilters();
    if (id && this.hasSingleFilter()) {
      const item = this.get(id);
      return item ? [item] : [];
    }
    try {
      return this.takeUnsafe();
    } catch (error) {
      if (isCommunicationError(error))
        return [];
      throw error;
    }
  }
  transform({ filters, search, order, limit }) {
    return new ExternalDataScope(this._dataClass, this._attributeName, {
      filters: combineFilters(this._params.filters, filters),
      search: combineSearches(this._params.search, search),
      order: order || this._params.order,
      limit: limit != null ? limit : this._params.limit
    });
  }
  objSearch() {
    return;
  }
  getError() {
    try {
      this.takeUnsafe();
    } catch (error) {
      if (isCommunicationError(error))
        return new DataScopeError(error.message);
    }
  }
  count() {
    const { filters, search } = this._params;
    return countExternalData(this.dataClassName(), filters, search);
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
  takeUnsafe() {
    var _a;
    return (0,common/* extractFromIterator */.W)(
      this.getIterator(),
      (_a = this._params.limit) != null ? _a : DEFAULT_LIMIT
    );
  }
  getCreateCallback() {
    const className = this.dataClassName();
    const createCallback = getConnection(className).create;
    if (!createCallback) {
      throw new common/* ArgumentError */.ir(
        `No create callback defined for data class "${className}"`
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
    if (!externalData)
      return null;
    return deserializeDataAttribute(
      this.dataClassName(),
      attributeName,
      externalData[attributeName]
    );
  }
  update(attributes) {
    return external_data_class_async(this, null, function* () {
      assertValidDataItemAttributes(attributes);
      const externalData = yield (0,loadable/* load */.zD)(() => this.getExternalData());
      if (!externalData) {
        throw new common/* ArgumentError */.ir(`Missing data with ID ${this._dataId}`);
      }
      const dataClassName = this.dataClassName();
      const serializedAttributes = yield serializeAttributes(
        dataClassName,
        attributes
      );
      const updateCallback = this.getUpdateCallback();
      const response = yield updateCallback(this._dataId, serializedAttributes);
      setExternalData(dataClassName, this._dataId, external_data_class_spreadValues(external_data_class_spreadValues(external_data_class_spreadValues({}, externalData), serializedAttributes), response || {}));
      this.notifyWrite();
    });
  }
  delete() {
    return external_data_class_async(this, null, function* () {
      const deleteCallback = this.getDeleteCallback();
      yield deleteCallback(this._dataId);
      setExternalData(this.dataClassName(), this._dataId, null);
      this.notifyWrite();
    });
  }
  /** @internal */
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
function serializeAttributes(dataClassName, attributes) {
  return external_data_class_async(this, null, function* () {
    return (0,loadable/* load */.zD)(
      () => (0,mapValues/* default */.Z)(
        attributes,
        (value, attributeName) => serializeDataAttribute(dataClassName, attributeName, value)
      )
    );
  });
}
function isCommunicationError(error) {
  return error instanceof client/* ClientError */.XF || error instanceof DataConnectionError;
}

// EXTERNAL MODULE: ./scrivito_sdk/models/index.ts + 38 modules
var models = __webpack_require__(9880);
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
  "stringlist",
  "reference"
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
  /** @internal */
  forAttribute(attributeName) {
    return new ObjDataScope(this, attributeName);
  }
}
function getDataObj(dataClass, dataId) {
  return (0,models/* getObjFrom */.R2)(objClassScope(dataClass).and(models/* excludeDeletedObjs */.E2), dataId);
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
  dataItem() {
    const id = this.itemIdFromFilters();
    if (id)
      return this._dataClass.get(id);
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
  transform({ filters, search, order, limit }) {
    return new ObjDataScope(this._dataClass, this._attributeName, {
      filters: combineFilters(
        this._params.filters,
        this.normalizeFilters(filters)
      ),
      search: combineSearches(this._params.search, search),
      order: order || this._params.order,
      limit: limit != null ? limit : this._params.limit
    });
  }
  limit() {
    return this._params.limit;
  }
  normalizeFilters(convenienceFilters) {
    if (!convenienceFilters)
      return;
    const filters = {};
    Object.keys(convenienceFilters).forEach((name) => {
      const valueOrSpec = convenienceFilters[name];
      if (typeof valueOrSpec === "string") {
        return filters[name] = valueOrSpec;
      }
      const { operator, value } = valueOrSpec;
      if (operator === "equals") {
        return filters[name] = value;
      }
      if (operator === "notEquals") {
        return filters[name] = { operator, value };
      }
      throw new common/* ArgumentError */.ir(`Unknown filter operator "${operator}"`);
    });
    return filters;
  }
  objSearch() {
    return new realm/* ObjSearch */.d_(this.getSearch());
  }
  /** @internal */
  toPojo() {
    return obj_data_class_spreadValues({
      _class: this._dataClass.name()
    }, this._params);
  }
  getSearch() {
    let initialSearch = this.objClassScope().and(models/* excludeDeletedObjs */.E2).search();
    const { filters, search: searchTerm, order: givenOrder } = this._params;
    if (searchTerm) {
      initialSearch = initialSearch.and("*", "matches", searchTerm);
    }
    if (givenOrder) {
      const order = givenOrder.filter(([attributeName]) => !!attributeName);
      if (order.length)
        initialSearch = initialSearch.order(order);
    }
    if (!filters)
      return initialSearch;
    return Object.keys(filters).filter((name) => !!name).reduce(
      (search, name) => this.applyFilter(search, name, filters[name]),
      initialSearch
    );
  }
  applyFilter(search, name, valueOrSpec) {
    if (typeof valueOrSpec === "string") {
      return this.applyFilter(search, name, {
        operator: "equals",
        value: valueOrSpec
      });
    }
    const { operator, value } = valueOrSpec;
    if (operator === "equals") {
      return search.and(name, "equals", value);
    }
    if (operator === "notEquals") {
      return search.andNot(name, "equals", value);
    }
    throw new common/* ArgumentError */.ir(`Unknown filter operator "${operator}"`);
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
  itemIdFromFilters() {
    return itemIdFromFilters(this._params.filters);
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
    return (0,realm/* wrapInAppClass */.pz)(this.getExistingObj());
  }
  /** @internal */
  getBasicObj() {
    if (this._obj === void 0) {
      this._obj = getDataObj(this._dataClass, this._dataId);
    }
    return this._obj;
  }
  get(attributeName) {
    const obj = this.getBasicObj();
    if (!obj)
      return null;
    const typeInfo = getAttributeTypeInfo(this.dataClassName(), attributeName);
    if (!typeInfo)
      return null;
    const [attributeType, attributeConfig] = typeInfo;
    if (SUPPORTED_ATTRIBUTE_TYPES.includes(attributeType)) {
      return attributeType === "reference" ? getReference(obj, attributeName, attributeConfig) : obj.get(attributeName, typeInfo);
    }
    return null;
  }
  update(attributes) {
    const obj = this.getExistingObj();
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
  getExistingObj() {
    const obj = this.getBasicObj();
    if (!obj) {
      throw new common/* ArgumentError */.ir(`Missing obj with ID ${this._dataId}`);
    }
    return obj;
  }
}
function getAttributeTypeInfo(className, attributeName) {
  return getSchema(className).attribute(attributeName);
}
function isObjDataClassProvided(className) {
  return !!(0,realm/* getClass */.ll)(className);
}
function getSchema(className) {
  const objClass = (0,realm/* getClass */.ll)(className);
  if (!objClass) {
    throw new common/* ArgumentError */.ir(`Class ${className} does not exist`);
  }
  const schema = realm/* Schema */.V_.forClass(objClass);
  if (!schema) {
    throw new common/* ArgumentError */.ir(`Class ${className} has no schema`);
  }
  return schema;
}
function objClassScope(dataClass) {
  return (0,models/* objSpaceScope */.hA)((0,models/* currentObjSpaceId */.GD)()).and(
    (0,models/* restrictToObjClass */.lD)(dataClass.name())
  );
}
function prepareAttributes(attributes, className) {
  const preparedAttributes = {};
  Object.keys(attributes).forEach((attributeName) => {
    const typeInfo = getAttributeTypeInfo(className, attributeName);
    if (!typeInfo) {
      throw new common/* ArgumentError */.ir(
        `Attribute ${attributeName} of class ${className} does not exist`
      );
    }
    const [attributeType, attributeConfig] = typeInfo;
    if (!SUPPORTED_ATTRIBUTE_TYPES.includes(attributeType)) {
      throw new common/* ArgumentError */.ir(
        `Attribute ${attributeName} of class ${className} has unsupported type ${attributeType}`
      );
    }
    const attributeValue = attributes[attributeName];
    preparedAttributes[attributeName] = [
      attributeType === "reference" ? prepareReferenceValue(attributeValue, attributeConfig) : attributeValue,
      typeInfo
    ];
  });
  return preparedAttributes;
}
function getReference(obj, attributeName, attributeConfig) {
  if (!attributeConfig)
    return null;
  const referenceObj = obj.get(attributeName, "reference");
  if (!(referenceObj instanceof models/* BasicObj */.Jj))
    return null;
  const referenceObjClass = referenceObj.objClass();
  if (referenceObjClass !== getValidReferenceClass(attributeConfig)) {
    return null;
  }
  const dataClass = getObjDataClass(referenceObjClass);
  if (!dataClass)
    return null;
  return dataClass.get(referenceObj.id());
}
function prepareReferenceValue(attributeValue, attributeConfig) {
  return attributeValue instanceof DataItem && attributeValue.dataClassName() === getValidReferenceClass(attributeConfig) ? (0,realm/* unwrapAppClass */.bM)(attributeValue.obj()) : null;
}
function getValidReferenceClass(attributeConfig) {
  if (attributeConfig) {
    const { validClasses } = attributeConfig;
    if (validClasses.length === 1)
      return validClasses[0];
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/get_data_class.ts




function getDataClass(dataClassName) {
  return getExternalDataClass(dataClassName) || getObjDataClass(dataClassName);
}
function getDataClassOrThrow(dataClassName) {
  const dataClass = getDataClass(dataClassName);
  if (dataClass)
    return dataClass;
  throw new common/* ArgumentError */.ir(`No "${dataClassName}" found`);
}
function getObjDataClass(dataClassName) {
  if (isObjDataClassProvided(dataClassName)) {
    return new ObjDataClass(dataClassName);
  }
}
function getExternalDataClass(dataClassName) {
  if (isExternalDataClassProvided(dataClassName)) {
    return new ExternalDataClass(dataClassName);
  }
}

// EXTERNAL MODULE: external "urijs"
var external_urijs_ = __webpack_require__(6275);
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
      throw new common/* ArgumentError */.ir("Cannot create items from an empty data scope");
    });
  }
  get(_id) {
    return null;
  }
  take() {
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
    return 0;
  }
  getError() {
    return this.params.error;
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
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/data_stack.ts

var data_stack_getOwnPropSymbols = Object.getOwnPropertySymbols;
var data_stack_hasOwnProp = Object.prototype.hasOwnProperty;
var data_stack_propIsEnum = Object.prototype.propertyIsEnumerable;
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
function isDataScopePojo(element) {
  return !isDataItemPojo(element);
}
function deserializeDataStackElement(element, attributeName) {
  return isDataItemPojo(element) ? deserializeDataItem(element) : deserializeDataScope(element, attributeName);
}
function findItemInDataStack(dataClassName, dataStack) {
  const itemElements = dataStack.filter(isDataItemPojo);
  return itemElements.find((element) => element._class === dataClassName);
}
function findScopeInDataStack(dataClassName, dataStack) {
  const element = dataStack.find((el) => el._class === dataClassName);
  if (element && isDataScopePojo(element))
    return element;
}
function deserializeDataScope(_a, attributeName) {
  var _b = _a, { _class: dataClassName } = _b, dataScopeParams = data_stack_objRest(_b, ["_class"]);
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
    const forAttribute = attributeName || "_attribute" in dataScopeParams && dataScopeParams._attribute;
    const dataScope = forAttribute ? dataClass.forAttribute(forAttribute) : dataClass.all();
    return dataScope.transform(dataScopeParams);
  }
}
function deserializeDataItem({
  _class: dataClass,
  _id: dataId
}) {
  return getDataClassOrThrow(dataClass).get(dataId) || void 0;
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
  if (itemPojo)
    return itemPojoToScopePojo(itemPojo);
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
  if (dataStack.length === 0)
    return;
  const target = getObj(objOrLink);
  if (!target)
    return;
  let params = {};
  [target, ...target.ancestors()].forEach((obj) => {
    const dataParam = obj == null ? void 0 : obj.dataParam();
    if (!dataParam)
      return;
    const [dataClass] = dataParam;
    if (!dataClass)
      return;
    const itemElement = findItemInDataStack(dataClass, dataStack);
    params = data_context_spreadValues(data_context_spreadValues({}, params), dataContextParamsForElement(itemElement, dataClass));
  });
  if (Object.keys(params).length > 0)
    return params;
}
function dataContextParamsForElement(stackElement, dataClass) {
  if (stackElement && stackElement._class === dataClass) {
    return {
      [(0,common/* parameterizeDataClass */.CA)(dataClass)]: stackElement._id
    };
  }
}
function findItemElementInDataStackAndGlobalData(dataClassName, dataStack) {
  return findItemInDataStack(dataClassName, dataStack) || findItemInGlobalData(dataClassName);
}
function findScopeElementInDataStackAndGlobalData(dataClassName, dataStack, viaRef) {
  if (viaRef === "multi") {
    const scopePojo = findScopeInDataStack(dataClassName, dataStack);
    if (scopePojo)
      return scopePojo;
  }
  const itemPojo = findItemInDataStack(dataClassName, dataStack);
  if (itemPojo)
    return itemPojoToScopePojo(itemPojo);
  return findScopeInGlobalData(dataClassName);
}
function dataContextFromQueryParams(obj, params) {
  const dataParam = obj.dataParam();
  if (!dataParam)
    return;
  const [dataClassName] = dataParam;
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
  const dataId = params[(0,common/* parameterizeDataClass */.CA)(dataClassName)];
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

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/compute_placeholders.ts






function computePlaceholders(from) {
  if (from instanceof DataItem) {
    return dataItemToDataContext(from);
  }
  if (from instanceof models/* BasicObj */.Jj) {
    return basicObjToDataContext(from);
  }
  return from;
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
  const _class = dataItem.dataClassName();
  const _id = dataItem.id();
  const externalData = dataItem.getExternalData();
  return externalData ? externalDataToDataContext(externalData, _class, _id) : { _class, _id };
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/apply_data_locator.ts










function applyDataLocator(dataStack, dataLocator) {
  if (!dataLocator)
    return new EmptyDataScope();
  const className = dataLocator.class();
  if (className === null)
    return new EmptyDataScope();
  try {
    const viaRef = dataLocator.viaRef();
    return viaRef ? findMatchingDataScopeOrThrow(
      className,
      dataStack,
      viaRef,
      dataLocator.field()
    ) : applyDataLocatorDefinition(className, dataStack, dataLocator);
  } catch (error) {
    if (error instanceof common/* ArgumentError */.ir) {
      return new EmptyDataScope({ error: new DataScopeError(error.message) });
    }
    throw error;
  }
}
function applyDataLocatorDefinition(className, dataStack, dataLocator) {
  const field = dataLocator.field();
  const dataClass = getDataClassOrThrow(className);
  let dataScope = field ? dataClass.forAttribute(field) : dataClass.all();
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
  if ((0,client/* isDataLocatorOperatorFilter */.IN)(filter)) {
    return applyOperatorFilter(scope, filter);
  }
  if ((0,models/* isDataLocatorValueViaFilter */.pX)(filter)) {
    return applyValueViaFilter(scope, filter, dataStack);
  }
  return applyValueFilter(scope, filter);
}
function applyOperatorFilter(scope, { field, operator, value }) {
  return scope.transform({
    filters: {
      [field]: {
        operator: operator === "neq" ? "notEquals" : "equals",
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
  var _a;
  const viaDataItem = findMatchingDataItemOrThrow(viaClass, dataStack);
  if (viaField === "_id") {
    return applyValueFilter(scope, { field, value: viaDataItem.id() });
  }
  if (field === "_id") {
    const value = viaDataItem.get(viaField);
    const dataClass = (_a = scope.dataClass()) != null ? _a : void 0;
    if (value === null) {
      return new EmptyDataScope({
        dataClass,
        isDataItem: true
      });
    }
    if (!isValidDataId(value)) {
      return new EmptyDataScope({
        dataClass,
        isDataItem: true,
        error: new common/* ArgumentError */.ir(
          `${JSON.stringify(value)} is not a valid data ID`
        )
      });
    }
    return applyValueFilter(scope, { field, value });
  }
  throw new common/* ArgumentError */.ir("Irregular relationship");
}
function findMatchingDataItemOrThrow(viaClass, dataStack) {
  const element = findItemElementInDataStackAndGlobalData(viaClass, dataStack);
  if (!element)
    throw new common/* ArgumentError */.ir(`No ${viaClass} item found`);
  const item = deserializeDataStackElement(element);
  if (item instanceof DataItem)
    return item;
  throw new common/* ArgumentError */.ir(`No ${viaClass} item with ID ${element._id} found`);
}
function findMatchingDataScopeOrThrow(className, dataStack, viaRef, attributeName) {
  const element = findScopeElementInDataStackAndGlobalData(
    className,
    dataStack,
    viaRef
  );
  if (!element)
    throw new common/* ArgumentError */.ir(`No ${className} scope found`);
  const scope = deserializeDataStackElement(element, attributeName);
  if (scope instanceof DataScope)
    return scope;
  throw new common/* ArgumentError */.ir(`No ${className} scope found`);
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/singleton_data_classes.ts


const stateContainer = (0,state/* createStateContainer */.JH)();
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
function provideExternalDataItem(name, connection) {
  const dataClass = new ExternalDataClass(name);
  const updateCallback = connection.update;
  setExternalDataConnection(name, provide_external_data_item_spreadValues({
    get: (id) => provide_external_data_item_async(this, null, function* () {
      return isIdValid(id) ? connection.get() : null;
    }),
    index: (params) => provide_external_data_item_async(this, null, function* () {
      return readAndFilterItem(params, dataClass);
    })
  }, updateCallback && {
    update: (id, data) => provide_external_data_item_async(this, null, function* () {
      return isIdValid(id) ? updateCallback(data) : null;
    })
  }));
  registerSingletonDataClass(name);
  const dataItem = dataClass.getUnchecked(SINGLE_ID);
  provideGlobalData(dataItem);
  return dataItem;
}
function isIdValid(id) {
  return id === SINGLE_ID;
}
function readAndFilterItem(params, dataClass) {
  return provide_external_data_item_async(this, null, function* () {
    const dataItem = yield (0,loadable/* load */.zD)(() => dataClass.get(SINGLE_ID));
    if (!dataItem)
      return { results: [] };
    const filters = params.filters();
    const doesMatch = yield (0,loadable/* load */.zD)(
      () => Object.keys(filters).every((name) => {
        const { value } = filters[name];
        return name === "_id" || typeof value === "string" && consideredEqual(dataItem.get(name), value);
      })
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




const PLACEHOLDERS = /__([a-z](?:[a-z0-9]|\.[a-z]|(\._id)|_(?!_)){0,100})__/gi;
const SINGLE_PLACEHOLDER = /^__([a-z](?:[a-z0-9]|\.[a-z]|(\._id)|_(?!_)){0,100})__$/i;
function isSinglePlaceholder(text) {
  return !!text.match(SINGLE_PLACEHOLDER);
}
function replacePlaceholdersWithData(text, {
  placeholders,
  dataStack,
  transform
} = {}) {
  return text.replace(PLACEHOLDERS, (placeholder, identifier) => {
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
      placeholder,
      dataStack: dataStack || []
    });
  }
  return replaceLegacyPlaceholder({ identifier, placeholder, placeholders });
}
function replaceQualifiedPlaceholder({
  dataClassName,
  attributeName,
  placeholder,
  dataStack
}) {
  const dataItem = getDataItem(dataClassName, dataStack);
  if (dataItem === "loading")
    return "";
  if (!dataItem)
    return placeholder;
  const attributeValue = dataItem.get(attributeName);
  if (typeof attributeValue !== "string")
    return "";
  return attributeValue;
}
function getDataItem(dataClassName, dataStack) {
  return (0,loadable/* loadableWithDefault */.qu)("loading", () => {
    var _a;
    const element = findItemElementInDataStackAndGlobalData(
      dataClassName,
      dataStack
    );
    if (element)
      return (_a = getDataClass(dataClassName)) == null ? void 0 : _a.get(element._id);
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

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/index.ts
























/***/ }),

/***/ 3705:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u$: () => (/* binding */ importFrom)
/* harmony export */ });
/* unused harmony exports provideLoadedEditingModule, isEditingModuleBeingLoaded */
/* harmony import */ var scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3218);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6664);



const moduleLoaders = {
  reactEditing: () => __webpack_require__.e(/* import() */ 622).then(__webpack_require__.bind(__webpack_require__, 1622)),
  editingSupport: () => __webpack_require__.e(/* import() */ 599).then(__webpack_require__.bind(__webpack_require__, 8599))
};
const loadableModules = new scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_1__/* .LoadableCollection */ .X2({
  loadElement: (moduleName) => ({ loader: moduleLoaders[moduleName] })
});
function importFrom(moduleName, symbol) {
  if (!scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__/* .uiAdapter */ .k)
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

/***/ 7688:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  RY: () => (/* reexport */ OBJ_ID_PATTERN),
  gu: () => (/* reexport */ finishLinkResolutionFor),
  fq: () => (/* reexport */ formatInternalLinks),
  J2: () => (/* reexport */ startLinkResolutionFor)
});

// UNUSED EXPORTS: setUrlResolutionHandler, setupWriteMonitorNotification

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

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(9853);
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

// EXTERNAL MODULE: ./scrivito_sdk/client/index.ts + 37 modules
var client = __webpack_require__(9001);
// EXTERNAL MODULE: ./scrivito_sdk/data/index.ts + 28 modules
var data = __webpack_require__(4433);
// EXTERNAL MODULE: ../node_modules/lodash-es/isEqual.js
var isEqual = __webpack_require__(6285);
// EXTERNAL MODULE: ../node_modules/lodash-es/escape.js + 1 modules
var lodash_es_escape = __webpack_require__(8485);
// EXTERNAL MODULE: ../node_modules/lodash-es/toString.js + 1 modules
var lodash_es_toString = __webpack_require__(7304);
// EXTERNAL MODULE: ../node_modules/lodash-es/_basePropertyOf.js
var _basePropertyOf = __webpack_require__(1739);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_unescapeHtmlChar.js


var htmlUnescapes = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'"
};
var unescapeHtmlChar = (0,_basePropertyOf/* default */.Z)(htmlUnescapes);
/* harmony default export */ const _unescapeHtmlChar = (unescapeHtmlChar);

;// CONCATENATED MODULE: ../node_modules/lodash-es/unescape.js



var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reHasEscapedHtml = RegExp(reEscapedHtml.source);
function unescape_unescape(string) {
  string = (0,lodash_es_toString/* default */.Z)(string);
  return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, _unescapeHtmlChar) : string;
}
/* harmony default export */ const lodash_es_unescape = (unescape_unescape);

// EXTERNAL MODULE: external "urijs"
var external_urijs_ = __webpack_require__(6275);
;// CONCATENATED MODULE: ./scrivito_sdk/link_resolution/content_conversion/resolve_html_url.ts





function resolveHtmlUrl(encodedUrl) {
  const url = lodash_es_unescape(encodedUrl);
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
  return (0,lodash_es_escape/* default */.Z)(newUrl.href());
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

// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 27 modules
var loadable = __webpack_require__(6664);
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
    const convertedDataWithoutLoading = (0,loadable/* loadableWithDefault */.qu)(
      void 0,
      convertValue
    );
    if (convertedDataWithoutLoading !== void 0) {
      if (!(0,isEqual/* default */.Z)(convertedDataWithoutLoading, attributeDataToConvert)) {
        update(objData, attributeName, widgetId, convertedDataWithoutLoading);
      }
      return;
    }
    return (0,loadable/* load */.zD)(convertValue).then((convertedData) => {
      if ((0,isEqual/* default */.Z)(convertedData, attributeDataToConvert))
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
  });
}
function hasDataToConvertBeenChangedConcurrently(attributeData, objData, attributeName, widgetId) {
  const currentAttributeData = widgetId ? objData.getWidgetAttribute(widgetId, attributeName) : objData.getAttribute(attributeName);
  return !(0,isEqual/* default */.Z)(attributeData, currentAttributeData);
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
    throw new InternalError();
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
    return link_resolution_async(this, null, function* () {
      const promise = this.getDataAndPerformResolution(objId);
      const priorPromise = this.cache[objId];
      const combinedPromise = priorPromise ? Promise.all([priorPromise, promise]).then(() => void 0) : promise;
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
        yield (0,loadable/* load */.zD)(() => (0,data/* getObjData */.L7)(this.objSpaceId, objId))
      );
    });
  }
}
function notifyLinkResolutionIsActive(promise) {
  if (!notifyWriteMonitor) {
    throw new common/* InternalError */.AQ();
  }
  notifyWriteMonitor(promise);
}
function performResolution(objData) {
  return link_resolution_async(this, null, function* () {
    if (!objData)
      return;
    const objJson = objData.get();
    if (!objJson)
      return;
    const workers = [];
    (0,client/* withEachAttributeJson */.dx)(objJson, (attributeJson, attributeName, widgetId) => {
      if (!isAnyLinkResolutionAttributeJson(attributeJson))
        return;
      workers.push(runWorker(attributeJson, objData, attributeName, widgetId));
    });
    if (workers.length)
      yield Promise.all(workers);
  });
}
(0,common/* onReset */.rj)(link_resolution_reset);

;// CONCATENATED MODULE: ./scrivito_sdk/link_resolution/index.ts






/***/ }),

/***/ 6664:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  X2: () => (/* reexport */ LoadableCollection),
  of: () => (/* reexport */ LoadableData),
  aj: () => (/* reexport */ LoadingSubscriber),
  IE: () => (/* reexport */ load_handler_capture),
  oR: () => (/* reexport */ generateRecording),
  _$: () => (/* reexport */ isCurrentlyCapturing),
  zD: () => (/* reexport */ load_load),
  DU: () => (/* reexport */ loadAndObserve),
  Mh: () => (/* reexport */ loadRecording),
  n4: () => (/* reexport */ loadWithDefault),
  wV: () => (/* reexport */ loadable_function_loadableFunction),
  qu: () => (/* reexport */ loadableWithDefault),
  kV: () => (/* reexport */ reportUsedData),
  zL: () => (/* reexport */ run_and_catch_errors_while_loading_runAndCatchErrorsWhileLoading),
  vk: () => (/* reexport */ withoutLoading)
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

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(9853);
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
  if (meta.error !== void 0)
    throw meta.error;
}

// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(2757);
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
  // trigger loading the data.
  // does nothing if the data is already loading, or no loading is needed.
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

// EXTERNAL MODULE: ../node_modules/lodash-es/toNumber.js + 2 modules
var toNumber = __webpack_require__(7062);
;// CONCATENATED MODULE: ../node_modules/lodash-es/toFinite.js


var INFINITY = 1 / 0, MAX_INTEGER = 17976931348623157e292;
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = (0,toNumber/* default */.Z)(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}
/* harmony default export */ const lodash_es_toFinite = (toFinite);

;// CONCATENATED MODULE: ../node_modules/lodash-es/toInteger.js


function toInteger(value) {
  var result = lodash_es_toFinite(value), remainder = result % 1;
  return result === result ? remainder ? result - remainder : result : 0;
}
/* harmony default export */ const lodash_es_toInteger = (toInteger);

;// CONCATENATED MODULE: ../node_modules/lodash-es/before.js


var FUNC_ERROR_TEXT = "Expected a function";
function before(n, func) {
  var result;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  n = lodash_es_toInteger(n);
  return function() {
    if (--n > 0) {
      result = func.apply(this, arguments);
    }
    if (n <= 1) {
      func = void 0;
    }
    return result;
  };
}
/* harmony default export */ const lodash_es_before = (before);

;// CONCATENATED MODULE: ../node_modules/lodash-es/once.js


function once(func) {
  return lodash_es_before(2, func);
}
/* harmony default export */ const lodash_es_once = (once);

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
  const runCallbackOnce = lodash_es_once(callback);
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
(0,common/* onReset */.rj)(() => {
  processIndex = {};
  loadingSubscriptions = {};
});

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/not_loaded_error.ts


class NotLoadedError extends common/* ScrivitoError */.Ix {
  constructor() {
    super("Data is not yet loaded.");
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/loadable_data.ts









class LoadableData {
  // state is the stateContainer where the LoadableData should store its state.
  constructor(options) {
    var _a;
    this.stateContainer = (_a = options.state) != null ? _a : (0,state/* createStateContainer */.JH)();
    this.id = this.stateContainer.id();
    this.affiliation = options.affiliation;
    this.invalidation = options.invalidation;
    this.processFactory = () => createLoaderProcess(options, this.stateContainer);
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
    if (!this.checkIfAvailableState(state))
      return theDefault;
    notifyUsage(this.id, this);
    return state.value;
  }
  /** Similar to LoadableData#get, but if the data is not available,
   * throws a NotLoadedError (instead of returning undefined).
   */
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
  // set the data to a value. this makes the value available.
  set(value) {
    this.stateContainer.set({
      value,
      meta: { version: this.currentVersion() }
    });
    notifyDataWasSet(this.id);
  }
  // set the data to an error.
  setError(error) {
    this.stateContainer.set({
      meta: { error, version: this.currentVersion() }
    });
    notifyDataWasSet(this.id);
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
  /** get a LoadableData instance from this collection */
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
  /** this method is "dangerous" - it can be very, very bad for performance
   * use with care, and only if you know precisely what you are doing.
   *
   * it returns all current loaded data inside the collection,
   * but does not trigger any loading.
   */
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

/***/ 43:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GD: () => (/* binding */ currentObjSpaceId),
/* harmony export */   f$: () => (/* binding */ isCurrentWorkspacePublished),
/* harmony export */   tV: () => (/* binding */ currentWorkspaceId)
/* harmony export */ });
/* unused harmony exports setCurrentWorkspaceId, resetCurrentWorkspaceId */
/* harmony import */ var scrivito_sdk_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9001);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9853);



let objSpaceId = scrivito_sdk_client__WEBPACK_IMPORTED_MODULE_0__/* .PUBLISHED_SPACE */ .Bm;
function currentObjSpaceId() {
  return objSpaceId;
}
function isCurrentWorkspacePublished() {
  return objSpaceId === scrivito_sdk_client__WEBPACK_IMPORTED_MODULE_0__/* .PUBLISHED_SPACE */ .Bm;
}
function currentWorkspaceId() {
  return objSpaceId[1];
}
function setCurrentWorkspaceId(id) {
  objSpaceId = id === "published" ? PUBLISHED_SPACE : ["workspace", id];
}
function resetCurrentWorkspaceId() {
  objSpaceId = scrivito_sdk_client__WEBPACK_IMPORTED_MODULE_0__/* .PUBLISHED_SPACE */ .Bm;
}
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .onReset */ .rj)(resetCurrentWorkspaceId);


/***/ }),

/***/ 9880:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  cO: () => (/* reexport */ BasicField),
  AM: () => (/* reexport */ BasicLink),
  Jj: () => (/* reexport */ BasicObj),
  be: () => (/* reexport */ BasicObjSearch),
  E8: () => (/* reexport */ BasicWidget),
  Kb: () => (/* reexport */ Binary),
  pf: () => (/* reexport */ BinaryType),
  s4: () => (/* reexport */ DataLocator),
  jS: () => (/* reexport */ FULL_TEXT_OPERATORS),
  eJ: () => (/* reexport */ FutureBinary),
  Un: () => (/* reexport */ LinkType),
  LG: () => (/* reexport */ MetadataCollection),
  fP: () => (/* reexport */ OPERATORS),
  d4: () => (/* reexport */ ObjSearchType),
  Bt: () => (/* reexport */ ObjType),
  AZ: () => (/* reexport */ ObjUnavailable),
  l9: () => (/* reexport */ WidgetType),
  j$: () => (/* reexport */ Workspace),
  T8: () => (/* reexport */ allSitesAndGlobal),
  e3: () => (/* reexport */ copyObjViaHandler),
  Yz: () => (/* reexport */ createObjFromFileIn),
  f_: () => (/* reexport */ createObjIn),
  GD: () => (/* reexport */ current_workspace_id/* currentObjSpaceId */.GD),
  tV: () => (/* reexport */ current_workspace_id/* currentWorkspaceId */.tV),
  Ti: () => (/* reexport */ emptyScope),
  E2: () => (/* reexport */ excludeDeletedObjs),
  U2: () => (/* reexport */ excludeGlobal),
  TW: () => (/* reexport */ getAllObjsByValueFrom),
  UI: () => (/* reexport */ getDetailsPageForDataParam),
  HG: () => (/* reexport */ getObjBy),
  nG: () => (/* reexport */ getObjByPath),
  R2: () => (/* reexport */ getObjFrom),
  nl: () => (/* reexport */ getObjIncludingUnavailableFrom),
  Wd: () => (/* reexport */ getPlacementModificationInfos),
  cS: () => (/* reexport */ getRootObjFrom),
  pX: () => (/* reexport */ isDataLocatorValueViaFilter),
  hA: () => (/* reexport */ objSpaceScope),
  $u: () => (/* reexport */ objSpaceScopeExcludingDeleted),
  EZ: () => (/* reexport */ restrictToContent),
  lD: () => (/* reexport */ restrictToObjClass),
  mz: () => (/* reexport */ restrictToSite),
  L8: () => (/* reexport */ restrictToSiteAndGlobal),
  W1: () => (/* reexport */ setWantsAutoAttributeConversion),
  Nv: () => (/* reexport */ updateReferences),
  OW: () => (/* reexport */ versionOnSite),
  s1: () => (/* reexport */ versionsOnAllSites),
  Fh: () => (/* reexport */ wantsAutoAttributeConversion)
});

// UNUSED EXPORTS: BasicObjFacetValue, isCurrentWorkspacePublished, isDataLocatorValueFilter, isDataLocatorValueVia, normalizedRestriction, resetCurrentWorkspaceId, restrictToGlobal, serializeAttributes, setBinaryHandler, setCopyObjHandler, setCurrentWorkspaceId

// EXTERNAL MODULE: ../node_modules/lodash-es/mapValues.js + 3 modules
var mapValues = __webpack_require__(785);
// EXTERNAL MODULE: ./scrivito_sdk/client/index.ts + 37 modules
var client = __webpack_require__(9001);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(9853);
// EXTERNAL MODULE: ../node_modules/lodash-es/intersection.js + 2 modules
var intersection = __webpack_require__(4999);
// EXTERNAL MODULE: ../node_modules/lodash-es/pick.js + 2 modules
var pick = __webpack_require__(7883);
// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(2757);
;// CONCATENATED MODULE: ./scrivito_sdk/models/auto_convert.ts


const autoConvertAttributes = (0,state/* createStateContainer */.JH)();
function setWantsAutoAttributeConversion(value) {
  autoConvertAttributes.set(value);
}
function wantsAutoAttributeConversion() {
  return !!autoConvertAttributes.get();
}
function autoConvertToReference(value) {
  if (!wantsAutoAttributeConversion())
    return value;
  const singleValue = autoConvertToSingle(value);
  if (backendValueType(singleValue) !== "link")
    return singleValue;
  const objId = singleValue[1].obj_id;
  if (!objId)
    return singleValue;
  return ["reference", objId];
}
function autoConvertToReferencelist(value) {
  if (!wantsAutoAttributeConversion())
    return value;
  const listValue = autoConvertToList(value);
  if (backendValueType(listValue) !== "linklist")
    return listValue;
  const objIds = listValue[1].map(({ obj_id }) => obj_id).filter((id) => !!id);
  return ["referencelist", objIds];
}
function autoConvertToLink(value) {
  if (!wantsAutoAttributeConversion())
    return value;
  const singleValue = autoConvertToSingle(value);
  if (backendValueType(singleValue) !== "reference")
    return singleValue;
  return ["link", linkForReference(singleValue[1])];
}
function autoConvertToLinklist(value) {
  if (!wantsAutoAttributeConversion())
    return value;
  const listValue = autoConvertToList(value);
  if (backendValueType(listValue) !== "referencelist")
    return listValue;
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
  if (!targetType)
    return value;
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
  if (!targetType)
    return value;
  const singleValue = value[1];
  return singleValue ? [targetType, [singleValue]] : value;
}
function backendValueType(value) {
  return Array.isArray(value) ? value[0] : void 0;
}

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
var scrivito_sdk_data = __webpack_require__(4433);
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
    if ((0,client/* isWorkspaceObjSpaceId */.Hn)(this.objSpaceId) || (0,client/* isEmptySpaceId */.P7)(this.objSpaceId)) {
      return new BasicObjSearch(this.objSpaceId).includeDeleted();
    }
    throw new common/* InternalError */.AQ();
  }
  create(id, attributes) {
    const objClass = attributes._obj_class;
    if (!objClass)
      throw new common/* InternalError */.AQ();
    if ((0,client/* isEmptySpaceId */.P7)(this.objSpaceId)) {
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
    return new DataLocator(value[1] || { class: null });
  }
  return new DataLocator({ class: null });
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
    if (values.includes(valueFromBackend))
      return valueFromBackend;
  }
  return null;
}
function deserializeMultienumValue(value, typeInfo) {
  if (isBackendValueOfType("stringlist", value)) {
    const [, { values }] = typeInfo;
    return (0,intersection/* default */.Z)(value[1], values);
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
  const linkParams = (0,pick/* default */.Z)(
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

// EXTERNAL MODULE: ../node_modules/lodash-es/difference.js + 1 modules
var difference = __webpack_require__(6553);
// EXTERNAL MODULE: ../node_modules/lodash-es/isDate.js + 1 modules
var isDate = __webpack_require__(7826);
// EXTERNAL MODULE: ../node_modules/lodash-es/isEmpty.js
var isEmpty = __webpack_require__(6016);
// EXTERNAL MODULE: ../node_modules/lodash-es/isObject.js
var isObject = __webpack_require__(6743);
// EXTERNAL MODULE: external "urijs"
var external_urijs_ = __webpack_require__(6275);
// EXTERNAL MODULE: ./scrivito_sdk/link_resolution/index.ts + 8 modules
var link_resolution = __webpack_require__(7688);
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
    return (0,scrivito_sdk_data/* getObjQueryCount */.kb)(this.objSpaceId(), this.queryParams()) || 0;
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
  if (!BOOSTABLE_OPERATORS.includes(operator)) {
    throw new common/* ArgumentError */.ir(
      `Boosting operator "${operator}" is invalid. ${explainValidOperators([
        "contains",
        "containsPrefix"
      ])}`
    );
  }
}
function assertNegatableOperator(operator) {
  if (!NEGATABLE_OPERATORS.includes(operator)) {
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
  if ((0,isDate/* default */.Z)(value))
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
  if (!OPERATORS.includes(operator)) {
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
  const invalidOptions = (0,difference/* default */.Z)(Object.keys(options), VALID_FACET_OPTIONS);
  if (invalidOptions.length) {
    throw new common/* ArgumentError */.ir(
      `Invalid facet options: ${(0,common/* prettyPrint */.xr)(
        invalidOptions
      )}. Valid options: ${VALID_FACET_OPTIONS.join()}`
    );
  }
  return options;
}

// EXTERNAL MODULE: ../node_modules/lodash-es/isEqual.js
var isEqual = __webpack_require__(6285);
// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 27 modules
var loadable = __webpack_require__(6664);
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

;// CONCATENATED MODULE: ./scrivito_sdk/models/future_binary.ts






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
  into(target, ...excessArgs) {
    checkInto(target, ...excessArgs);
    (0,state/* failIfFrozen */.un)("Changing CMS content");
    return this.intoId(target._scrivitoPrivateContent.id());
  }
  /** @internal */
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
  /** @internal */
  constructor(_binaryId, objSpaceId = client/* PUBLISHED_SPACE */.Bm) {
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
  /** @internal */
  keys() {
    const data = this.getData();
    if (data)
      return Object.keys(data).map(common/* camelCase */.eV);
    return [];
  }
  /** @internal */
  contentLength() {
    const length = this.get("contentLength");
    if (typeof length !== "number")
      return 0;
    return length;
  }
  /** @internal */
  contentType() {
    const type = this.get("contentType");
    if (typeof type !== "string")
      return "";
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
    loader: () => client/* cmsRetrieval */.Qw.retrieveBinaryMetadata(id, { accessVia: objSpaceId })
  })
});
function deserializeMetadata(response) {
  const backendMetadata = response.meta_data;
  if (!(0,isObject/* default */.Z)(backendMetadata)) {
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
    loader: () => client/* cmsRetrieval */.Qw.retrieveBinaryUrls(binaryId, transformation, {
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
  /** @internal */
  constructor(_id, _objSpaceId = client/* PUBLISHED_SPACE */.Bm, transformation = {}) {
    this._id = _id;
    this._objSpaceId = _objSpaceId;
    this._transformation = transformation || void 0;
    this._loadableData = binary_loadableCollection.get(
      [this._id, this._transformation],
      this._objSpaceId
    );
  }
  /** @internal */
  static upload(source, options, ...excessArgs) {
    checkUpload(source, options, ...excessArgs);
    if (!common/* FileType */.Tv.is(source)) {
      if (!(options && options.filename)) {
        throw new common/* ArgumentError */.ir(
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
    return !(0,common/* equals */.fS)(this._objSpaceId, client/* PUBLISHED_SPACE */.Bm);
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
    return this.isTransformed() && !(0,isEmpty/* default */.Z)(this._transformation);
  }
  /** @internal */
  isRaw() {
    return !this.isTransformed();
  }
  url() {
    (0,scrivito_sdk_data/* assertNotUsingInMemoryTenant */.VJ)("Binary#url");
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
  /** @internal */
  extname() {
    if (this.raw().filename().indexOf(".") > -1) {
      const parts = this.raw().filename().split(/[.\\]+/);
      if (parts.length > 1)
        return parts[parts.length - 1].toLowerCase();
    }
    return "";
  }
  /** @internal */
  equals(binary) {
    return this.id() === binary.id() && (0,common/* equals */.fS)(this._objSpaceId, binary.objSpaceId()) && (0,isEqual/* default */.Z)(this.definition(), binary.definition());
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
      throw new common/* ScrivitoError */.Ix(
        `"${fieldName}" is not available for transformed images. Use "Scrivito.Binary#raw" to access the untransformed version of the image.`
      );
    }
  }
  /** @internal */
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
  (value) => common/* BlobType */.R0.is(value) || common/* FileType */.Tv.is(value),
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

;// CONCATENATED MODULE: external "speakingurl"
const external_speakingurl_namespaceObject = require("speakingurl");
;// CONCATENATED MODULE: ./scrivito_sdk/models/convert_to_slug.ts


function convertToSlug(input) {
  if (typeof input !== "string") {
    return "";
  }
  return external_speakingurl_namespaceObject(input);
}

// EXTERNAL MODULE: ./scrivito_sdk/models/current_workspace_id.ts
var current_workspace_id = __webpack_require__(43);
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
  // Accessible for test purposes only (otherwise better inlined)
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
  // For test purpose only.
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
    if (children.length === 0)
      return [];
    const childOrder = this.get("childOrder", "referencelist");
    const idsOrder = childOrder.map((reference) => reference.id());
    return children.map((child) => {
      const index = idsOrder.indexOf(child.id());
      return [index === -1 ? children.length : index, child];
    }).sort(([a], [b]) => a - b).map(([, child]) => child);
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
  delete() {
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
  deleteWidget(widget) {
    const widgetOrWidgetlistField = this.fieldContainingWidget(widget);
    if (!widgetOrWidgetlistField)
      return;
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
      if ((0,client/* isWidgetlistAttributeJson */.O6)(attributeJson))
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
function basic_obj_getObjByPath(objSpaceId, siteId, path) {
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
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/data_locator.ts


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
    if (typeof viaRef === "boolean")
      return "multi";
    return viaRef;
  }
  /** @internal */
  query() {
    if (this._viaRef)
      return;
    if (this._query)
      return [...this._query];
  }
  /** @internal */
  orderBy() {
    if (this._viaRef)
      return;
    if (this._order_by)
      return [...this._order_by];
  }
  /** @internal */
  size() {
    if (this._viaRef)
      return;
    return this._size;
  }
  /** @internal */
  transform(params) {
    var _a, _b, _c, _d;
    return new DataLocator({
      class: params.class === null ? null : (_a = params.class) != null ? _a : this._class,
      field: params.field === null ? void 0 : (_b = params.field) != null ? _b : this._field,
      query: params.query ? normalizeTransformQuery(params.query) : this.query(),
      order_by: params.order_by || this.orderBy(),
      size: params.size === null ? void 0 : (_c = params.size) != null ? _c : this._size,
      via_ref: (_d = params.viaRef) != null ? _d : this._viaRef
    });
  }
  /** @internal */
  isSingleItem() {
    var _a;
    return this._viaRef === "single" || !!((_a = this._query) == null ? void 0 : _a.some(
      (filter) => isDataLocatorValueFilter(filter) && filter.field === "_id"
    ));
  }
  /** @internal */
  toPojo() {
    if (this._class === null)
      return null;
    if (this._viaRef) {
      return {
        class: this._class,
        field: this._field,
        via_ref: this._viaRef
      };
    }
    return {
      class: this._class,
      field: this._field,
      query: this.query(),
      order_by: this.orderBy(),
      size: this._size
    };
  }
}
function isDataLocatorEqFilter(filter) {
  return (0,isObject/* default */.Z)(filter) && "field" in filter && typeof filter.field === "string" && "operator" in filter && filter.operator === "eq" && "value" in filter && typeof filter.value === "string";
}
function isDataLocatorValueFilter(filter) {
  return (0,isObject/* default */.Z)(filter) && typeof filter.field === "string" && !filter.operator && typeof filter.value === "string";
}
function isDataLocatorValueViaFilter(filter) {
  return (0,isObject/* default */.Z)(filter) && typeof filter.field === "string" && isDataLocatorValueVia(filter.value_via);
}
function isDataLocatorValueVia(valueVia) {
  return (0,isObject/* default */.Z)(valueVia) && typeof valueVia.class === "string" && typeof valueVia.field === "string";
}
function normalizeTransformQuery(transformQuery) {
  return transformQuery.map((filter) => {
    if (isDataLocatorEqFilter(filter)) {
      const { field, value } = filter;
      return { field, value };
    }
    return filter;
  });
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
  if (value instanceof DataLocator)
    return value.toPojo();
  throwInvalidAttributeValue(value, name, "A DataLocator.");
}
function serializeDateAttributeValue(value, name) {
  if ((0,isDate/* default */.Z)(value))
    return (0,common/* formatDateToString */.xH)(value);
  if ((0,common/* isValidDateString */.ix)(value))
    return value;
  throwInvalidAttributeValue(value, name, "A Date.");
}
function serializeEnumAttributeValue(value, name, { values }) {
  if (values.includes(value))
    return value;
  const e = `Valid attribute values are contained in its "values" array [${values.join()}].`;
  throwInvalidAttributeValue(value, name, e);
}
function serializeFloatAttributeValue(value, name) {
  if ((0,common/* isValidFloat */.RY)(value))
    return value;
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
  if (typeof value === "string")
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
  const forbiddenValues = (0,difference/* default */.Z)(value, values);
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
  return typeof value === "string" || value instanceof BasicObj || value instanceof ObjUnavailable;
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
  return typeof value === "string" || typeof value === "number";
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
  if (!(0,isObject/* default */.Z)(value))
    return false;
  if ((0,isEmpty/* default */.Z)(Object.values(value).filter(Boolean)))
    return false;
  const invalidKeys = (0,difference/* default */.Z)(
    Object.keys(value),
    ["hash", "obj_id", "query", "rel", "target", "title", "url"]
  );
  return (0,isEmpty/* default */.Z)(invalidKeys);
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
    const containingField = this.containingField();
    return containingField ? containingField.getContainer() : this.obj();
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
      (0,mapValues/* default */.Z)(this.attributesToBeSaved, copyNormalizedValue)
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
  return (0,mapValues/* default */.Z)(content.getData(), (value, name) => {
    if (value && !(0,common/* isSystemAttribute */.mb)(name) && typeof value === "object") {
      if ((0,client/* isWidgetAttributeJson */.hV)(value)) {
        const widget = getContentValueUsingInternalName(content, name, [
          "widget"
        ]);
        return ["widget", widget ? serializeAttributes(widget) : null];
      }
      if ((0,client/* isWidgetlistAttributeJson */.O6)(value)) {
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
  return (0,mapValues/* default */.Z)(attributes, (attributeValue, name) => {
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
            `Unexpected result from mapping function passed to updateReferences (must be string or undefined): ${String(
              newId
            )}`
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
    yield Promise.all(workers);
  });
}
function getWorkers(objJson, obj, fn) {
  const workers = [];
  (0,client/* withEachAttributeJson */.dx)(objJson, (jsonToUpdate, attributeName, widgetId) => {
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
  return objSpaceScopeExcludingDeleted((0,current_workspace_id/* currentObjSpaceId */.GD)()).search().and("_dataParam", "equals", dataParam).and("_siteId", "equals", siteId).first();
}

;// CONCATENATED MODULE: ./scrivito_sdk/models/index.ts





































/***/ }),

/***/ 762:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $g: () => (/* binding */ getComponentForId),
/* harmony export */   A7: () => (/* binding */ getLayoutComponentForAppClass),
/* harmony export */   Ji: () => (/* binding */ areLayoutComponentsStored),
/* harmony export */   LL: () => (/* binding */ getDataErrorComponent),
/* harmony export */   YK: () => (/* binding */ getComponentForAppClass),
/* harmony export */   e3: () => (/* binding */ registerComponentForAppClass),
/* harmony export */   mO: () => (/* binding */ registerComponentForId),
/* harmony export */   rI: () => (/* binding */ registerDataErrorComponent),
/* harmony export */   tJ: () => (/* binding */ registerLayoutComponentForAppClass)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9853);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2757);



const registry = /* @__PURE__ */ new Map();
const componentsChangesCounterState = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__/* .createStateContainer */ .JH)();
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
const layoutsChangesCounterState = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__/* .createStateContainer */ .JH)();
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
const layoutComponentsStoredState = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__/* .createStateContainer */ .JH)();
function areLayoutComponentsStored() {
  var _a;
  return (_a = layoutComponentsStoredState.get()) != null ? _a : false;
}
function getLayoutChangesCounterState(className) {
  return layoutsChangesCounterState.subState(className);
}
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .onReset */ .rj)(() => {
  registry.clear();
  layoutRegistry.clear();
});


/***/ }),

/***/ 402:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j: () => (/* binding */ AutomaticDataContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4073);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_react_data_context_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(349);
/* harmony import */ var scrivito_sdk_react_hooks_use_data_locator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7907);
/* harmony import */ var scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6519);





const AutomaticDataContext = (0,scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_3__/* .connect */ .$j)(function AutomaticDataContext2({
  content,
  children
}) {
  const data = content.get("data", "datalocator");
  const dataScope = (0,scrivito_sdk_react_hooks_use_data_locator__WEBPACK_IMPORTED_MODULE_2__/* .useDataLocator */ .$)(data);
  if (data.class() === null)
    return children;
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(scrivito_sdk_react_data_context_container__WEBPACK_IMPORTED_MODULE_1__/* .PushOntoDataStack */ .ec, { data: dataScope }, children);
});


/***/ }),

/***/ 101:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ WidgetTagContext),
/* harmony export */   x: () => (/* binding */ WidgetContent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4073);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_editing_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6993);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9853);
/* harmony import */ var scrivito_sdk_react_component_registry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(762);
/* harmony import */ var scrivito_sdk_react_components_automatic_data_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(402);
/* harmony import */ var scrivito_sdk_react_components_widget_tag__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9508);
/* harmony import */ var scrivito_sdk_react_connect_and_memoize__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2394);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(105);

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
        return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(scrivito_sdk_react_components_widget_tag__WEBPACK_IMPORTED_MODULE_5__/* .WidgetTag */ .D, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "content_error" }, "Widget could not be rendered due to application error."));
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
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(scrivito_sdk_react_components_automatic_data_context__WEBPACK_IMPORTED_MODULE_4__/* .AutomaticDataContext */ .j, { content: widget }, react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    widgetComponent,
    widgetComponentProps
  ));
}
const WidgetTagContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext({});


/***/ }),

/***/ 9508:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ WidgetTag)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4073);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_import_from__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3705);
/* harmony import */ var scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6519);

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
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(WidgetTagWithEditing, __spreadValues({ tag: Tag }, otherProps));
  }
);


/***/ }),

/***/ 2394:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ connectAndMemoize)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_react_memo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4249);
/* harmony import */ var scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6519);



function connectAndMemoize(component) {
  const connectedComponent = (0,scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_1__/* .connect */ .$j)(component);
  if ((0,scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_1__/* .isClassComponent */ .q1)(connectedComponent))
    return connectedComponent;
  const memoizedComponent = (0,scrivito_sdk_react_memo__WEBPACK_IMPORTED_MODULE_0__/* .memo */ .X)(connectedComponent);
  memoizedComponent.displayName = (0,scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_1__/* .displayNameFromComponent */ .r0)(connectedComponent);
  return memoizedComponent;
}


/***/ }),

/***/ 349:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Et: () => (/* binding */ usePlaceholders),
/* harmony export */   Fs: () => (/* binding */ ProvidePlaceholders),
/* harmony export */   K7: () => (/* binding */ useDataStack),
/* harmony export */   SO: () => (/* binding */ useLastDataStackElement),
/* harmony export */   ec: () => (/* binding */ PushOntoDataStack),
/* harmony export */   uv: () => (/* binding */ useDataContextContainer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4073);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9528);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(105);




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
function useLastDataStackElement() {
  var _a;
  const dataStack = (_a = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataStackReactContext)) == null ? void 0 : _a.dataStack;
  return dataStack && dataStack[0];
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
    if (data instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__/* .DataItem */ .zw) {
      return {
        _class: data.dataClassName(),
        _id: data.id()
      };
    }
    return data instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__/* .DataScope */ .Cc ? data.toPojo() : data;
  }
}
function ProvidePlaceholders({
  source,
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
    if (source instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__/* .DataScope */ .Cc) {
      return {
        dataStack: [source.toPojo(), ...dataStack],
        placeholders: {}
      };
    }
    const placeholders = (0,scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__/* .computePlaceholders */ .P7)((0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_2__/* .unwrapAppClass */ .bM)(source));
    const { _class, _id } = placeholders;
    const stackElement = _class && _id && { _class, _id };
    return {
      dataStack: stackElement ? [stackElement, ...dataStack] : dataStack,
      placeholders
    };
  }
}


/***/ }),

/***/ 7907:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ useDataLocator)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9528);
/* harmony import */ var scrivito_sdk_react_data_context_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(349);



function useDataLocator(dataLocator) {
  const dataStack = (0,scrivito_sdk_react_data_context_container__WEBPACK_IMPORTED_MODULE_1__/* .useDataStack */ .K7)() || [];
  return (0,scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_0__/* .applyDataLocator */ .ED)(dataStack, dataLocator);
}


/***/ }),

/***/ 5408:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ useLayoutAwareInPlaceEditing)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4073);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_layout_editing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4417);
/* harmony import */ var scrivito_sdk_react_in_place_editing_enabled_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9824);
/* harmony import */ var scrivito_sdk_react_is_inside_layout_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7110);





function useLayoutAwareInPlaceEditing() {
  const inPlaceEditingEnabled = react__WEBPACK_IMPORTED_MODULE_0__.useContext(scrivito_sdk_react_in_place_editing_enabled_context__WEBPACK_IMPORTED_MODULE_2__/* .InPlaceEditingEnabledContext */ .q);
  const isInsideLayoutContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(scrivito_sdk_react_is_inside_layout_context__WEBPACK_IMPORTED_MODULE_3__/* .IsInsideLayoutContext */ .d);
  return inPlaceEditingEnabled && (isInsideLayoutContext && (0,scrivito_sdk_app_support_layout_editing__WEBPACK_IMPORTED_MODULE_1__/* .isLayoutEditable */ .TP)() || !isInsideLayoutContext && (0,scrivito_sdk_app_support_layout_editing__WEBPACK_IMPORTED_MODULE_1__/* .isPageEditable */ .Jc)());
}


/***/ }),

/***/ 9824:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ InPlaceEditingEnabledContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4073);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const InPlaceEditingEnabledContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(true);


/***/ }),

/***/ 2250:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  gH: () => (/* reexport */ AttributeValue),
  iX: () => (/* reexport */ BackgroundImageTag),
  H1: () => (/* reexport */ ChildListTag),
  jq: () => (/* reexport */ ContentTag),
  Ck: () => (/* reexport */ CurrentPage),
  IP: () => (/* reexport */ Extensions),
  Du: () => (/* reexport */ ImageTag),
  ZM: () => (/* reexport */ InPlaceEditingOff),
  IR: () => (/* reexport */ LinkTag),
  zp: () => (/* reexport */ NotFoundErrorPage),
  TE: () => (/* reexport */ RestoreInPlaceEditing),
  xp: () => (/* reexport */ widget_content/* WidgetContent */.x),
  Dc: () => (/* reexport */ widget_tag/* WidgetTag */.D),
  $g: () => (/* reexport */ component_registry/* getComponentForId */.$g),
  wh: () => (/* reexport */ provideComponent),
  $3: () => (/* reexport */ provideDataErrorComponent),
  YP: () => (/* reexport */ provideLayoutComponent),
  RM: () => (/* reexport */ registerComponent),
  kB: () => (/* reexport */ showExtension),
  mV: () => (/* reexport */ useAttributeDefinition),
  et: () => (/* reexport */ useData),
  pU: () => (/* reexport */ useDataItem),
  $W: () => (/* reexport */ use_data_locator/* useDataLocator */.$),
  g7: () => (/* reexport */ useDataScope),
  XD: () => (/* reexport */ useResolvedHtmlValue),
  SI: () => (/* reexport */ useResolvedStringValue),
  SU: () => (/* reexport */ useUrlFor)
});

// UNUSED EXPORTS: memo

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(4073);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/get_class_name.ts
var get_class_name = __webpack_require__(3449);
// EXTERNAL MODULE: ./scrivito_sdk/react/component_registry.ts
var component_registry = __webpack_require__(762);
// EXTERNAL MODULE: ./scrivito_sdk/react/components/widget_tag.tsx
var widget_tag = __webpack_require__(9508);
// EXTERNAL MODULE: ./scrivito_sdk/react/memo.ts
var memo = __webpack_require__(4249);
// EXTERNAL MODULE: ./scrivito_sdk/react_connect/index.ts + 7 modules
var react_connect = __webpack_require__(6519);
// EXTERNAL MODULE: ./scrivito_sdk/realm/index.ts + 22 modules
var realm = __webpack_require__(105);
;// CONCATENATED MODULE: ./scrivito_sdk/react/provide_component.ts








function provideComponent(classNameOrClass, component, options, ...excessArgs) {
  (0,realm/* checkProvideComponent */.aQ)(classNameOrClass, component, ...excessArgs);
  const className = (0,get_class_name/* getClassName */.g)(classNameOrClass);
  if (isComponentMissingName(component)) {
    component.displayName = className;
  }
  const connectedComponent = (0,react_connect/* connect */.$j)(component, options);
  const wrappedComponent = wrapComponent(connectedComponent);
  (0,component_registry/* registerComponentForAppClass */.e3)(className, wrappedComponent);
}
function wrapComponent(component) {
  const wrappedComponent = (0,react_connect/* isClassComponent */.q1)(component) ? wrapClassComponent(component) : wrapFunctionComponent(component);
  wrappedComponent.displayName = (0,react_connect/* displayNameFromComponent */.r0)(component);
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
  return (0,react_connect/* getElementType */.BG)(rendered) === widget_tag/* WidgetTag */.D ? rendered : external_react_.createElement(widget_tag/* WidgetTag */.D, { children: rendered });
}
function isComponentMissingName(component) {
  return !component.displayName && (!component.name || component.name === "_class" || component.name.substring(0, 6) === "class_");
}

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(9853);
// EXTERNAL MODULE: ./scrivito_sdk/react/connect_and_memoize.ts
var connect_and_memoize = __webpack_require__(2394);
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
  (0,component_registry/* registerComponentForId */.mO)(componentId, (0,react_connect/* connect */.$j)(component));
}

// EXTERNAL MODULE: ../node_modules/lodash-es/isObject.js
var isObject = __webpack_require__(6743);
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
  return new Promise((resolve, reject) => {
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
var scale_down_binary = __webpack_require__(4428);
// EXTERNAL MODULE: ./scrivito_sdk/models/index.ts + 38 modules
var models = __webpack_require__(9880);
;// CONCATENATED MODULE: external "tcomb-react"
const external_tcomb_react_namespaceObject = require("tcomb-react");
;// CONCATENATED MODULE: ./scrivito_sdk/react/tcomb.ts



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
  attachment: common/* tcomb.maybe */.pC.maybe(common/* tcomb.enums */.pC.enums.of(["fixed", "scroll"])),
  clip: common/* tcomb.maybe */.pC.maybe(common/* tcomb.enums */.pC.enums.of(["border-box"])),
  color: common/* tcomb.maybe */.pC.maybe(common/* tcomb.enums */.pC.enums.of(["transparent"])),
  origin: common/* tcomb.maybe */.pC.maybe(common/* tcomb.enums */.pC.enums.of(["padding-box"])),
  position: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String),
  repeat: common/* tcomb.maybe */.pC.maybe(common/* tcomb.enums */.pC.enums.of(["no-repeat"])),
  size: common/* tcomb.maybe */.pC.maybe(common/* tcomb.enums */.pC.enums.of(["contain", "cover"]))
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
const BackgroundImageTag = (0,react_connect/* connect */.$j)(
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
      return /* @__PURE__ */ external_react_.createElement(
        Tag,
        __spreadProps(__spreadValues({}, passThroughProps), {
          style: calculateCSSProperties(style, this.binaryToUrl)
        })
      );
    }
    binaryToUrl(binary) {
      const { initialUrl, highResUrlToDecode } = (0,scale_down_binary/* scaleDownBinary */.BN)(binary);
      const decodedBackgroundUrl = highResUrlToDecode && this.decoder.getBackgroundImage(highResUrlToDecode);
      return decodedBackgroundUrl || `url(${initialUrl})`;
    }
  }, _a.displayName = "Scrivito.BackgroundImageTag", _a.propTypes = (0,external_tcomb_react_namespaceObject.propTypes)(
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
  if ((0,isObject/* default */.Z)(style)) {
    const _a2 = style, { background } = _a2, otherStyles = __objRest(_a2, ["background"]);
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
  return typeof background.image === "string";
}
function assertNoBackgroundRelatedProperties(style) {
  if ((0,isObject/* default */.Z)(style)) {
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
var current_page = __webpack_require__(4106);
// EXTERNAL MODULE: ./scrivito_sdk/import_from.ts
var import_from = __webpack_require__(3705);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/basic_url_for.ts
var basic_url_for = __webpack_require__(8459);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/change_location.ts
var change_location = __webpack_require__(2836);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/navigate_to.ts
var navigate_to = __webpack_require__(6528);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/ui_adapter.ts
var ui_adapter = __webpack_require__(3218);
// EXTERNAL MODULE: ./scrivito_sdk/data_integration/index.ts + 25 modules
var data_integration = __webpack_require__(9528);
// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 27 modules
var loadable = __webpack_require__(6664);
// EXTERNAL MODULE: ./scrivito_sdk/react/data_context_container.tsx
var data_context_container = __webpack_require__(349);
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












const LinkTag = (0,react_connect/* connect */.$j)(function LinkTag2(props) {
  const dataStack = (0,data_context_container/* useDataStack */.K7)();
  const placeholders = (0,data_context_container/* usePlaceholders */.Et)();
  checkLinkTagProps(props);
  const customProps = link_tag_spreadValues({}, props);
  delete customProps.children;
  delete customProps.to;
  delete customProps.params;
  return /* @__PURE__ */ external_react_.createElement(
    "a",
    link_tag_spreadProps(link_tag_spreadValues({}, customProps), {
      href: getHref(),
      target: getTarget(),
      rel: getRel(),
      onClick
    }),
    props.children
  );
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
    return __async(this, null, function* () {
      if (props.onClick) {
        props.onClick(e);
        if (e.defaultPrevented)
          return;
      }
      e.preventDefault();
      const destination = yield (0,loadable/* load */.zD)(getDestination);
      if (!destination)
        return;
      const target = getTarget();
      const { to, href, queryParameters } = destination;
      if (target === "_blank" || (0,common/* isModifierClick */.Dw)(e)) {
        return (0,change_location/* openInNewWindow */.oL)(href);
      }
      if (target === "_top" && ui_adapter/* uiAdapter */.k) {
        return navigateAppTo(to, queryParameters);
      }
      if (target) {
        return (0,common/* openWindow */.xw)(href, target);
      }
      navigateAppTo(to, queryParameters);
    });
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
        placeholders,
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
      queryParameters = link_tag_spreadValues(link_tag_spreadValues({}, (0,data_integration/* getDataContextParameters */.DT)(basicObjOrLink, dataStack)), queryParameters);
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





const ChildItem = (0,react_connect/* connect */.$j)(function ChildItem2(props) {
  const appObj = (0,realm/* wrapInAppClass */.pz)(props.child);
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






const ChildListTag = (0,react_connect/* connect */.$j)(
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
    const childComponents = orderedChildren.map((child) => /* @__PURE__ */ external_react_.createElement(ChildItem, { key: child.id(), child, renderChild }));
    const ChildListTagWithEditing = (0,import_from/* importFrom */.u$)(
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
var content_tags_for_empty_attributes = __webpack_require__(9754);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/editing_context.ts
var editing_context = __webpack_require__(6993);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/get_comparison_range.ts
var get_comparison_range = __webpack_require__(1021);
// EXTERNAL MODULE: ../node_modules/lodash-es/escape.js + 1 modules
var lodash_es_escape = __webpack_require__(8485);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/browser_location.ts + 1 modules
var browser_location = __webpack_require__(125);
// EXTERNAL MODULE: external "urijs"
var external_urijs_ = __webpack_require__(6275);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/routing.ts + 2 modules
var routing = __webpack_require__(3420);
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
  const isModifier = (0,common/* isModifierClick */.Dw)(e);
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
var replace_internal_links = __webpack_require__(8926);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/scroll_into_view.ts + 1 modules
var scroll_into_view = __webpack_require__(6601);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/can_edit.ts
var can_edit = __webpack_require__(8083);
// EXTERNAL MODULE: ./scrivito_sdk/react/components/content_tag/widget_content.tsx
var widget_content = __webpack_require__(101);
// EXTERNAL MODULE: ./scrivito_sdk/react/hooks/use_layout_aware_in_place_editing.ts
var use_layout_aware_in_place_editing = __webpack_require__(5408);
;// CONCATENATED MODULE: ./scrivito_sdk/react/components/content_tag/widget_value.tsx









const WidgetValue = (0,react_connect/* connect */.$j)(function WidgetValue2({
  field,
  widgetProps
}) {
  const isInPlaceEditingEnabled = (0,use_layout_aware_in_place_editing/* useLayoutAwareInPlaceEditing */.M)();
  if ((0,editing_context/* isComparisonActive */.rl)())
    throw new common/* InternalError */.AQ("Not yet implemented");
  if (!(0,editing_context/* isInPlaceEditingActive */.DG)() || !(0,can_edit/* canEditObjWithId */.r)(field.obj().id())) {
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
const WidgetValueContent = (0,react_connect/* connect */.$j)(function WidgetValueContent2({
  field,
  widgetProps,
  isInPlaceEditingEnabled
}) {
  const widget = field.get();
  if (widget) {
    return /* @__PURE__ */ external_react_.createElement(
      widget_content/* WidgetContent */.x,
      {
        key: widget.id(),
        widget,
        widgetProps,
        fieldType: "widget"
      }
    );
  }
  if (!isInPlaceEditingEnabled)
    return null;
  const WidgetPlaceholder = (0,import_from/* importFrom */.u$)("reactEditing", "WidgetPlaceholder");
  return WidgetPlaceholder ? /* @__PURE__ */ external_react_.createElement(WidgetPlaceholder, { field }) : null;
});

;// CONCATENATED MODULE: ./scrivito_sdk/react/components/content_tag/widgetlist_value.tsx










const WidgetlistValue = (0,react_connect/* connect */.$j)(function WidgetlistValue2({
  field,
  widgetProps
}) {
  const isInPlaceEditingEnabled = (0,use_layout_aware_in_place_editing/* useLayoutAwareInPlaceEditing */.M)();
  if ((0,editing_context/* isComparisonActive */.rl)()) {
    return /* @__PURE__ */ external_react_.createElement(
      WidgetlistValueContentForComparison,
      {
        field,
        widgetProps
      }
    );
  }
  if (!(0,editing_context/* isInPlaceEditingActive */.DG)() || !(0,can_edit/* canEditObjWithId */.r)(field.obj().id())) {
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
const WidgetlistValueContentForComparison = (0,react_connect/* connect */.$j)(
  function WidgetlistValueContentForComparison2({
    field,
    widgetProps
  }) {
    return /* @__PURE__ */ external_react_.createElement(external_react_.Fragment, null, (0,models/* getPlacementModificationInfos */.Wd)(field, (0,get_comparison_range/* getComparisonRange */.N)()).map(
      (info) => /* @__PURE__ */ external_react_.createElement(
        widget_content/* WidgetContent */.x,
        {
          key: calculateKey(info.widget.id(), info.modification),
          widget: info.widget,
          widgetProps,
          placementModification: info.modification,
          fieldType: "widgetlist"
        }
      )
    ));
    function calculateKey(widgetId, modification) {
      return `${widgetId}-${modification != null ? modification : "unmodified"}`;
    }
  }
);
const WidgetlistValueContent = (0,react_connect/* connect */.$j)(function WidgetlistValueContent2({
  field,
  widgetProps,
  isInPlaceEditingEnabled
}) {
  const widgets = field.get();
  if (widgets.length) {
    return /* @__PURE__ */ external_react_.createElement(external_react_.Fragment, null, widgets.map((widget) => /* @__PURE__ */ external_react_.createElement(
      widget_content/* WidgetContent */.x,
      {
        key: widget.id(),
        widget,
        widgetProps,
        fieldType: "widgetlist"
      }
    )));
  }
  if (!isInPlaceEditingEnabled)
    return null;
  const WidgetlistPlaceholder = (0,import_from/* importFrom */.u$)(
    "reactEditing",
    "WidgetlistPlaceholder"
  );
  return WidgetlistPlaceholder ? /* @__PURE__ */ external_react_.createElement(WidgetlistPlaceholder, { field }) : null;
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



















const AttributeValue = (0,react_connect/* connect */.$j)(
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
  return (0,isObject/* default */.Z)(maybeCustomInnerHtml) && typeof maybeCustomInnerHtml.__html === "string";
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
  const diffContent = (0,editing_context/* isComparisonActive */.rl)() ? field.getHtmlDiffContent((0,get_comparison_range/* getComparisonRange */.N)()) : void 0;
  const handleClickOnHtml = (e) => {
    const obj = field.obj();
    const linkTarget = findClickTarget(e);
    if (!linkTarget)
      return null;
    if (isOpenInNewWindow(linkTarget)) {
      handleOpenInNewWindow(e, linkTarget);
    } else {
      if (isCrossSiteTargetUrl(linkTarget.openInCurrentWindow, obj)) {
        (0,common/* assignLocation */.Hz)(linkTarget.openInCurrentWindow);
      } else {
        handleOpenInCurrentWindow(e, linkTarget);
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
      __html: (0,replace_internal_links/* replaceInternalLinks */.q)(
        diffContent || (0,data_integration/* replacePlaceholdersWithData */.O0)(field.get(), {
          placeholders,
          dataStack,
          transform: lodash_es_escape/* default */.Z
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
  const placeholders = dataContextContainer == null ? void 0 : dataContextContainer.placeholders;
  const dataStack = dataContextContainer == null ? void 0 : dataContextContainer.dataStack;
  return customChildren != null ? customChildren : {
    children: (0,data_integration/* replacePlaceholdersWithData */.O0)(field.get(), {
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
function isCrossSiteTargetUrl(url, currentPage) {
  var _a;
  return ((_a = (0,routing/* recognize */.jh)(url).siteData) == null ? void 0 : _a.siteId) !== currentPage.siteId();
}
function handleOpenInNewWindow(e, { openInNewWindow: url }) {
  if (ui_adapter/* uiAdapter */.k) {
    e.preventDefault();
    (0,change_location/* openInNewWindow */.oL)(url);
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












const ContentTagWithElementCallback = (0,react_connect/* connect */.$j)(function ContentTagWithElementCallback2(_a) {
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
  const isInPlaceEditingEnabled = (0,use_layout_aware_in_place_editing/* useLayoutAwareInPlaceEditing */.M)();
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
  if ((!(0,editing_context/* isInPlaceEditingActive */.DG)() || !isInPlaceEditingEnabled) && !(0,editing_context/* isComparisonActive */.rl)() && (0,common/* isEmptyValue */.O2)(field.get()) && (0,content_tags_for_empty_attributes/* shouldContentTagsForEmptyAttributesBeSkipped */.a)()) {
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
  return /* @__PURE__ */ external_react_.createElement(data_context_container/* ProvidePlaceholders */.Fs, { source: dataContext }, attributeValue);
});
function getField(content, attribute) {
  const field = realm/* Schema */.V_.basicFieldFor(content, attribute);
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
const ContentTag = (0,react_connect/* connect */.$j)(
  ContentTagWithElementCallback
);
ContentTag.displayName = "Scrivito.ContentTag";
function isDataContextObject(dataContext) {
  return !!dataContext && !(dataContext instanceof data_integration/* DataItem */.zw) && !(dataContext instanceof data_integration/* DataScope */.Cc) && !(dataContext instanceof realm/* Obj */.eG);
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_page_data.ts
var current_page_data = __webpack_require__(4185);
// EXTERNAL MODULE: ./scrivito_sdk/react/components/automatic_data_context.tsx
var automatic_data_context = __webpack_require__(402);
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
  if (currentNavigationState.historyState.historyChangesCount === 0) {
    return false;
  }
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
(0,common/* onReset */.rj)(() => previousNavigationState = void 0);

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

// EXTERNAL MODULE: ./scrivito_sdk/react/is_inside_layout_context.tsx
var is_inside_layout_context = __webpack_require__(7110);
;// CONCATENATED MODULE: ./scrivito_sdk/react/components/current_page/details_page_data_context.tsx






const DetailsPageDataContext = (0,react_connect/* connect */.$j)(function DetailsPageDataContext2({
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
  return /* @__PURE__ */ external_react_.createElement(data_context_container/* ProvidePlaceholders */.Fs, { source: dataContext }, children);
});
function renderDataError() {
  const DataErrorComponent = (0,component_registry/* getDataErrorComponent */.LL)();
  return DataErrorComponent ? /* @__PURE__ */ external_react_.createElement(DataErrorComponent, null) : /* @__PURE__ */ external_react_.createElement(external_react_.Fragment, null, "Data Not Found");
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_app_space.ts
var current_app_space = __webpack_require__(3626);
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
  return /* @__PURE__ */ external_react_.createElement(PageLayout, { page: nextPage, params, layoutIndex });
}
function getNextPage(page, layoutIndex) {
  const path = page.path();
  if (path) {
    const ancestorPaths = (0,common/* computeAncestorPaths */.dJ)(path);
    if (layoutIndex >= ancestorPaths.length)
      return;
    const ancestorPath = ancestorPaths[layoutIndex];
    if (ancestorPath === path)
      return page;
    return getAncestorOf(page, ancestorPath);
  }
  if (layoutIndex === 0)
    return page;
}
function getAncestorOf(page, ancestorPath) {
  const siteId = page.siteId();
  if (!siteId)
    throw new common/* InternalError */.AQ();
  return (0,loadable/* loadWithDefault */.n4)(
    "loading",
    () => (0,models/* getObjByPath */.nG)((0,current_app_space/* currentAppSpace */.q)().and((0,models/* restrictToSite */.mz)(siteId)), ancestorPath)
  );
}
const PageLayout = (0,react_connect/* connect */.$j)(function PageLayout2({
  page,
  params,
  layoutIndex
}) {
  const Component = page && (0,component_registry/* getLayoutComponentForAppClass */.A7)(page.objClass());
  return /* @__PURE__ */ external_react_.createElement(DetailsPageDataContext, { page, params }, /* @__PURE__ */ external_react_.createElement(LayoutIndexContext.Provider, { value: layoutIndex + 1 }, Component ? /* @__PURE__ */ external_react_.createElement(Component, { page: (0,realm/* wrapInAppClass */.pz)(page) }) : /* @__PURE__ */ external_react_.createElement(CurrentPage, null)));
});

;// CONCATENATED MODULE: ./scrivito_sdk/react/components/current_page.tsx












const CurrentPage = (0,react_connect/* connect */.$j)(
  function CurrentPage2() {
    const pageData = (0,current_page_data/* getCurrentPageData */["if"])();
    if (!pageData)
      return null;
    const { currentPage, navigationState } = pageData;
    if (!currentPage)
      return null;
    return /* @__PURE__ */ external_react_.createElement(
      CurrentPageWithLayout,
      {
        currentPage,
        navigationState
      }
    );
  }
);
const CurrentPageWithLayout = (0,react_connect/* connect */.$j)(function CurrentPageWithLayout2({
  currentPage,
  navigationState
}) {
  var _a, _b;
  const params = external_urijs_.parseQuery((_b = (_a = navigationState == null ? void 0 : navigationState.locationRoute) == null ? void 0 : _a.query) != null ? _b : "");
  const layout = useLayout(currentPage, params);
  if (layout)
    return layout === "loading" ? null : layout;
  const PageComponent = getComponentForPageClass(currentPage.objClass());
  return /* @__PURE__ */ external_react_.createElement(DetailsPageDataContext, { page: currentPage, params }, /* @__PURE__ */ external_react_.createElement(automatic_data_context/* AutomaticDataContext */.j, { content: currentPage }, /* @__PURE__ */ external_react_.createElement(is_inside_layout_context/* IsInsideLayoutContext */.d.Provider, { value: false }, /* @__PURE__ */ external_react_.createElement(PageScroll, { navigationState }), PageComponent && /* @__PURE__ */ external_react_.createElement(PageComponent, { page: (0,realm/* wrapInAppClass */.pz)(currentPage), params }))));
});
CurrentPage.displayName = "Scrivito.CurrentPage";

// EXTERNAL MODULE: external "react-dom"
var external_react_dom_ = __webpack_require__(5648);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/legacy_render_extension.ts
var legacy_render_extension = __webpack_require__(7700);
;// CONCATENATED MODULE: ./scrivito_sdk/react/components/extensions.tsx





let onShowExtension;
function showExtension(reactElement) {
  if (!onShowExtension)
    return (0,legacy_render_extension/* legacyRenderExtension */.x)(reactElement);
  onShowExtension(reactElement);
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
(0,common/* onReset */.rj)(() => onShowExtension = void 0);

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









const ImageTag = (0,react_connect/* connect */.$j)(function ImageTag2(_a) {
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
    return fullWidth2 === null ? null : /* @__PURE__ */ external_react_.createElement(
      "img",
      image_tag_spreadProps(image_tag_spreadValues({
        src: scaledSrc(decoder, content),
        width: fullWidth2
      }, htmlOptions), {
        onLoad: load,
        ref: setEagerIfComplete
      })
    );
  }
  const binary = getBinary(content, attribute);
  if (binary === void 0)
    return null;
  if (binary === null) {
    return /* @__PURE__ */ external_react_.createElement(
      ContentTag,
      image_tag_spreadValues({
        attribute,
        content,
        tag: "img",
        src: imagePlaceholder,
        "data-scrivito-image-placeholder": true,
        width
      }, htmlOptions)
    );
  }
  const fullWidth = getFullWidth(binary, width, isLazy);
  return fullWidth === null ? null : /* @__PURE__ */ external_react_.createElement(
    ContentTagWithElementCallback,
    image_tag_spreadProps(image_tag_spreadValues({
      attribute,
      content,
      width: fullWidth,
      tag: "img",
      src: scaledSrc(decoder, binary)
    }, htmlOptions), {
      onLoad: load,
      elementCallback: setEagerIfComplete
    })
  );
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
  return typeof metadataWidth === "number" ? metadataWidth : null;
}
function getBinary(content, attribute) {
  const field = realm/* Schema */.V_.basicFieldFor(content, attribute);
  if (!field) {
    if (realm/* Schema */.V_.forInstance(content)) {
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

// EXTERNAL MODULE: ./scrivito_sdk/react/in_place_editing_enabled_context.ts
var in_place_editing_enabled_context = __webpack_require__(9824);
;// CONCATENATED MODULE: ./scrivito_sdk/react/components/in_place_editing.tsx




function InPlaceEditingOff({ children }) {
  return (0,editing_context/* isInPlaceEditingActive */.DG)() ? /* @__PURE__ */ external_react_.createElement(in_place_editing_enabled_context/* InPlaceEditingEnabledContext */.q.Provider, { children, value: false }) : children;
}
function RestoreInPlaceEditing({
  children
}) {
  return (0,editing_context/* isInPlaceEditingActive */.DG)() ? /* @__PURE__ */ external_react_.createElement(in_place_editing_enabled_context/* InPlaceEditingEnabledContext */.q.Provider, { children, value: true }) : children;
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/components/not_found_error_page.tsx






const NotFoundErrorPage = (0,react_connect/* connect */.$j)(function NotFoundErrorPage2({ children }) {
  const navigationState = (0,current_page_data/* getNotFoundErrorPageState */.fW)();
  if (!navigationState)
    return null;
  if (!(0,browser_location/* isCurrentHistoryState */.XB)(navigationState.historyState))
    return null;
  return /* @__PURE__ */ external_react_.createElement(external_react_.Fragment, null, /* @__PURE__ */ external_react_.createElement(PageScroll, { navigationState }), children || /* @__PURE__ */ external_react_.createElement("div", null, /* @__PURE__ */ external_react_.createElement("h1", null, "The page you were looking for doesn't exist."), /* @__PURE__ */ external_react_.createElement("p", null, "You may have mistyped the address or the page may have moved.")));
});
NotFoundErrorPage.displayName = "Scrivito.NotFoundErrorPage";

;// CONCATENATED MODULE: ./scrivito_sdk/react/hooks/use_data.ts



function useData() {
  const lastElement = (0,data_context_container/* useLastDataStackElement */.SO)();
  if (!lastElement)
    return new data_integration/* EmptyDataScope */.Vb();
  const scopeOrItem = (0,data_integration/* deserializeDataStackElement */.Cz)(lastElement);
  if (!scopeOrItem)
    return new data_integration/* EmptyDataScope */.Vb();
  if (scopeOrItem instanceof data_integration/* DataItem */.zw) {
    return scopeOrItem.dataClass().all().transform({ filters: { _id: scopeOrItem.id() } });
  }
  return scopeOrItem;
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/hooks/use_data_item.ts


function useDataItem() {
  return useData().dataItem() || void 0;
}

// EXTERNAL MODULE: ./scrivito_sdk/react/hooks/use_data_locator.ts
var use_data_locator = __webpack_require__(7907);
;// CONCATENATED MODULE: ./scrivito_sdk/react/hooks/use_data_scope.ts


function useDataScope() {
  const data = useData();
  return data.isDataItem() ? void 0 : data;
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
var url_for = __webpack_require__(590);
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
  const dataStack = (0,data_context_container/* useDataStack */.K7)();
  const query = addDataContextQueryTo(
    options == null ? void 0 : options.query,
    dataStack,
    (0,realm/* unwrapAppClass */.bM)(target)
  );
  return (0,url_for/* urlFor */.u)(target, use_url_for_spreadProps(use_url_for_spreadValues({}, options), { query }));
}
function addDataContextQueryTo(givenQuery, dataStack, target) {
  if (target instanceof models/* Binary */.Kb || !dataStack)
    return givenQuery;
  return (0,data_integration/* getDataContextQuery */.MW)((0,realm/* unwrapAppClass */.bM)(target), dataStack, givenQuery);
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/hooks/use_resolved_value.ts





function useResolvedHtmlValue(text) {
  return useResolvedValue(text, lodash_es_escape/* default */.Z);
}
function useResolvedStringValue(text) {
  return useResolvedValue(text);
}
function useResolvedValue(text, transform) {
  const dataContextContainer = (0,data_context_container/* useDataContextContainer */.uv)();
  const dataStack = dataContextContainer == null ? void 0 : dataContextContainer.dataStack;
  const placeholders = dataContextContainer == null ? void 0 : dataContextContainer.placeholders;
  return (0,replace_internal_links/* replaceInternalLinks */.q)(
    (0,data_integration/* replacePlaceholdersWithData */.O0)(text, {
      dataStack,
      placeholders,
      transform
    }),
    { dataStack }
  );
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/index.ts





























/***/ }),

/***/ 7110:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ IsInsideLayoutContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4073);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const IsInsideLayoutContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(true);


/***/ }),

/***/ 4249:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ memo)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4073);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9853);



function memo(Component) {
  return react__WEBPACK_IMPORTED_MODULE_0__.memo(Component, scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .propsAreEqual */ .t0);
}


/***/ }),

/***/ 6519:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  $j: () => (/* reexport */ connect),
  r0: () => (/* reexport */ displayNameFromComponent),
  kU: () => (/* reexport */ finishLoading),
  BG: () => (/* reexport */ getElementType),
  q1: () => (/* reexport */ isClassComponent)
});

// UNUSED EXPORTS: Hibernation, forwardElementTypeProps

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(4073);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(9853);
// EXTERNAL MODULE: ./scrivito_sdk/data/index.ts + 28 modules
var data = __webpack_require__(4433);
// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 27 modules
var loadable = __webpack_require__(6664);
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
    deferred = new common/* Deferred */.BH();
    (0,common/* nextTick */.Y3)(updateLoadingState);
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
      throw new common/* InternalError */.AQ();
    }
    loadingCount -= 1;
    unregisterHasBeenCalled = true;
    if (loadingCount === 0) {
      (0,common/* nextTick */.Y3)(updateLoadingState);
    }
  };
}
function updateLoadingState() {
  if (deferred && loadingCount === 0) {
    deferred.resolve();
    deferred = void 0;
  }
}
(0,common/* onReset */.rj)(() => {
  deferred = void 0;
  loadingCount = 0;
});

// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(2757);
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
    throw new common/* ArgumentError */.ir(
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
      const loaderComponent = options == null ? void 0 : options.loading;
      const _scrivitoRenderWhileLoading = loaderComponent ? () => external_react_.createElement(loaderComponent, props) : this._scrivitoRenderWhileLoading;
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
  const loaderComponent = options == null ? void 0 : options.loading;
  const connectedComponent = (props) => (
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useConnectedRender(
      () => functionalComponent(props),
      loaderComponent ? () => external_react_.createElement(loaderComponent, props) : void 0
    )
  );
  connectedComponent._isScrivitoConnectedComponent = true;
  connectedComponent.displayName = displayNameFromComponent(functionalComponent);
  return connectedComponent;
}
function useConnectedRender(originalRender, loaderComponent) {
  const forceUpdate = useForceUpdate();
  const connectorRef = external_react_.useRef();
  if (!connectorRef.current) {
    connectorRef.current = new ComponentConnector({
      forceUpdate,
      _scrivitoRenderWhileLoading: loaderComponent
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
    this.loadingSubscriber = new loadable/* LoadingSubscriber */.aj();
  }
  componentDidMount() {
    var _a;
    if (this.context === void 0) {
      throw new common/* InternalError */.AQ();
    }
    this.stateSubscriber = (0,state/* createSyncSubscriber */.GS)(
      () => (0,state/* withUnfrozenState */.dY)(() => this.component.forceUpdate()),
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
    if ((0,loadable/* isCurrentlyCapturing */._$)()) {
      return runWithFrozenState(originalRender);
    }
    const captured = (0,loadable/* capture */.IE)(
      () => (0,state/* trackStateAccess */.cC)(
        () => (0,data/* runWithPerformanceConstraint */.qe)(() => runWithFrozenState(originalRender))
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
  const run = (0,loadable/* runAndCatchErrorsWhileLoading */.zL)(
    () => (0,state/* withFrozenState */.sc)(
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
  const awakenessRef = React.useRef();
  if (awakenessRef.current === void 0 && !awake)
    return null;
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

/***/ 105:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  rU: () => (/* reexport */ Link),
  eG: () => (/* reexport */ Obj),
  Qi: () => (/* reexport */ ObjClassType),
  JB: () => (/* reexport */ ObjFacetValue),
  d_: () => (/* reexport */ ObjSearch),
  V_: () => (/* reexport */ Schema),
  $L: () => (/* reexport */ Widget),
  c6: () => (/* reexport */ WidgetClassType),
  Cn: () => (/* reexport */ allObjClasses),
  OY: () => (/* reexport */ allWidgetClasses),
  aQ: () => (/* reexport */ checkProvideComponent),
  iq: () => (/* reexport */ checkProvideDataErrorComponent),
  gj: () => (/* reexport */ checkProvideLayoutComponent),
  r$: () => (/* reexport */ createObjClass),
  Zv: () => (/* reexport */ createWidgetClass),
  pw: () => (/* reexport */ enableStrictSearchOperators),
  ll: () => (/* reexport */ getClass),
  Gf: () => (/* reexport */ isBinaryBasicObj),
  Hn: () => (/* reexport */ isObjClass),
  Je: () => (/* reexport */ provideObjClass),
  We: () => (/* reexport */ provideWidgetClass),
  cv: () => (/* reexport */ schemaFromBasicObjOrWidget),
  RO: () => (/* reexport */ setCurrentSiteIdHandler),
  dz: () => (/* reexport */ unwrapAppAttributes),
  bM: () => (/* reexport */ unwrapAppClass),
  pz: () => (/* reexport */ wrapInAppClass)
});

// UNUSED EXPORTS: checkProvideDataItem

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(9853);
// EXTERNAL MODULE: ./scrivito_sdk/models/index.ts + 38 modules
var models = __webpack_require__(9880);
// EXTERNAL MODULE: ../node_modules/lodash-es/mapValues.js + 3 modules
var mapValues = __webpack_require__(785);
// EXTERNAL MODULE: ../node_modules/lodash-es/pickBy.js + 5 modules
var pickBy = __webpack_require__(2611);
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
var initial_content_registry = __webpack_require__(5158);
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
    const basicWidget = models/* BasicWidget */.E8.createWithUnknownValues(basicAttributes);
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
      `Invalid attribute "_objClass". "new ${String(
        attributes._objClass
      )}" will automatically set the CMS object class correctly.`
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
  return Object.keys(mapping).find((klass) => mapping[klass] === modelClass) || null;
}
function appClassFor(name, baseClass) {
  const appClass = getClass(name);
  return appClass && baseClass.isPrototypeOf(appClass) ? appClass : baseClass;
}
function allObjClasses() {
  return (0,pickBy/* default */.Z)(
    mapping,
    (modelClass) => Obj.isPrototypeOf(modelClass)
  );
}
function allWidgetClasses() {
  return (0,pickBy/* default */.Z)(
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
(0,common/* onReset */.rj)(() => mapping = {});

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
  return (0,mapValues/* default */.Z)(appAttributes, (value, name) => {
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
(0,common/* onReset */.rj)(() => strictSearchOperators = false);

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
  /** @internal */
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
  /** @internal */
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
  (searchOperator) => models/* FULL_TEXT_OPERATORS */.jS.indexOf(searchOperator) === -1,
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
    [["operator", common/* tcomb.maybe */.pC.maybe(common/* tcomb.enums */.pC.enums.of(models/* FULL_TEXT_OPERATORS */.jS))]],
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
      // Bang: objClassNameForCreate above ensures that it's a subclass of Obj
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
      `Invalid attribute "_objClass". "${String(
        attributes._objClass
      )}.create" will automatically set the CMS object class correctly.`
    );
  }
}
function assertValidFile(file) {
  if (!common/* FileType */.Tv.is(file)) {
    if (common/* BlobType */.R0.is(file)) {
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
  /** @internal */
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
  /** @deprecated Use `Obj#delete` instead */
  destroy() {
    this.delete();
  }
  delete() {
    this._scrivitoPrivateContent.delete();
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

// EXTERNAL MODULE: ../node_modules/lodash-es/difference.js + 1 modules
var difference = __webpack_require__(6553);
// EXTERNAL MODULE: ../node_modules/lodash-es/isEmpty.js
var isEmpty = __webpack_require__(6016);
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
  const unknownAttrs = (0,difference/* default */.Z)(Object.keys(attributes), ALLOWED_ATTRIBUTES);
  if (!(0,isEmpty/* default */.Z)(unknownAttrs)) {
    throw new common/* ArgumentError */.ir(
      `Unexpected attributes ${(0,common/* prettyPrint */.xr)(unknownAttrs)}. Available attributes: ${(0,common/* prettyPrint */.xr)(ALLOWED_ATTRIBUTES)}`
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
          common/* tcomb.enums */.pC.enums.of([
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
            common/* tcomb.enums */.pC.enums.of(["enum", "multienum"]),
            common/* tcomb.interface */.pC["interface"]({
              values: common/* tcomb.list */.pC.list(common/* tcomb.String */.pC.String)
            })
          ]),
          common/* tcomb.tuple */.pC.tuple([
            common/* tcomb.enums */.pC.enums.of(["reference", "referencelist"]),
            common/* tcomb.interface */.pC["interface"]({
              only: common/* tcomb.union */.pC.union([common/* tcomb.String */.pC.String, common/* tcomb.list */.pC.list(common/* tcomb.String */.pC.String)])
            })
          ]),
          common/* tcomb.tuple */.pC.tuple([
            common/* tcomb.enums */.pC.enums.of(["widget"]),
            common/* tcomb.interface */.pC["interface"]({
              only: common/* tcomb.union */.pC.union([common/* tcomb.String */.pC.String, common/* tcomb.list */.pC.list(common/* tcomb.String */.pC.String)])
            })
          ]),
          common/* tcomb.tuple */.pC.tuple([
            common/* tcomb.enums */.pC.enums.of(["widgetlist"]),
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
        ["component", common/* tcomb.irreducible */.pC.irreducible("React component", isFunction)]
      ],
      {
        docPermalink: "js-sdk/provideComponent"
      }
    ),
    checkProvideLayoutComponent: (0,common/* checkArgumentsFor */.PJ)(
      "provideLayoutComponent",
      [
        ["objClass", ObjClassType],
        ["component", common/* tcomb.irreducible */.pC.irreducible("React component", isFunction)]
      ],
      {
        docPermalink: "js-sdk/provideLayoutComponent"
      }
    ),
    checkProvideDataErrorComponent: (0,common/* checkArgumentsFor */.PJ)(
      "provideDataErrorComponent",
      [["component", common/* tcomb.irreducible */.pC.irreducible("React component", isFunction)]],
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
    checkProvideDataItem: (0,common/* checkArgumentsFor */.PJ)(
      "provideDataItem",
      [
        ["name", common/* tcomb.String */.pC.String],
        [
          "connection",
          common/* tcomb.interface */.pC["interface"]({
            get: common/* tcomb.Function */.pC.Function,
            update: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Function */.pC.Function)
          })
        ]
      ],
      {
        docPermalink: "js-sdk/provideDataItem"
      }
    )
  };
})();
function isFunction(fn) {
  return typeof fn === "function";
}
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
  if (ATTRIBUTE_TYPES_WHITELIST.includes(attributeType))
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

/***/ 5158:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ setInitialContentFor),
/* harmony export */   W: () => (/* binding */ initialContentFor)
/* harmony export */ });

let initialContentForFn = () => void 0;
function setInitialContentFor(value) {
  initialContentForFn = value;
}
function initialContentFor(className, attributeName) {
  return initialContentForFn(className, attributeName);
}


/***/ }),

/***/ 2757:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  NB: () => (/* reexport */ addBatchUpdate),
  dF: () => (/* reexport */ createAsyncSubscriber),
  JH: () => (/* reexport */ createStateContainer),
  GS: () => (/* reexport */ createSyncSubscriber),
  un: () => (/* reexport */ failIfFrozen),
  N7: () => (/* reexport */ observe),
  M5: () => (/* reexport */ observeSync),
  cC: () => (/* reexport */ trackStateAccess),
  tH: () => (/* reexport */ withBatchedUpdates),
  sc: () => (/* reexport */ withFrozenState),
  dY: () => (/* reexport */ withUnfrozenState)
});

// UNUSED EXPORTS: StateChangePreventedError, StateReference, createNotificationCounter, listenerCount, resetGlobalState

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(9853);
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

;// CONCATENATED MODULE: ./scrivito_sdk/state/copy_on_write_store.ts


class CopyOnWriteStore {
  constructor(value, copy) {
    this.value = value;
    this.copy = copy;
    this.valueForReading = new common/* ContextContainer */.AY();
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
    this.scheduleNotify = (0,common/* collectAndSchedule */.Xq)(common/* nextTick */.Y3, () => this.notify());
  }
  /** This method is exposed to other packages as
   * part of the StateSubscriber interface.
   */
  subscribeChanges(stateReference) {
    if (!this.activeReference)
      this.subscriberSet.add(this);
    this.activeReference = stateReference;
    if (this.hasChanges())
      this.listener();
  }
  /** This method is exposed to other packages as
   * part of the StateSubscriber interface.
   */
  unsubscribe() {
    if (!this.activeReference)
      return;
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
function resetSubscribers() {
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
      throw new common/* InternalError */.AQ();
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
(0,common/* onReset */.rj)(resetGlobalState);

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

/***/ 4073:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 5648:
/***/ ((module) => {

module.exports = require("react-dom");

/***/ }),

/***/ 6275:
/***/ ((module) => {

module.exports = require("urijs");

/***/ }),

/***/ 6544:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ _ListCache)
});

;// CONCATENATED MODULE: ../node_modules/lodash-es/_listCacheClear.js

function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
/* harmony default export */ const _listCacheClear = (listCacheClear);

// EXTERNAL MODULE: ../node_modules/lodash-es/eq.js
var eq = __webpack_require__(2494);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_assocIndexOf.js


function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if ((0,eq/* default */.Z)(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
/* harmony default export */ const _assocIndexOf = (assocIndexOf);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_listCacheDelete.js


var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = _assocIndexOf(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
/* harmony default export */ const _listCacheDelete = (listCacheDelete);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_listCacheGet.js


function listCacheGet(key) {
  var data = this.__data__, index = _assocIndexOf(data, key);
  return index < 0 ? void 0 : data[index][1];
}
/* harmony default export */ const _listCacheGet = (listCacheGet);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_listCacheHas.js


function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}
/* harmony default export */ const _listCacheHas = (listCacheHas);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_listCacheSet.js


function listCacheSet(key, value) {
  var data = this.__data__, index = _assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
/* harmony default export */ const _listCacheSet = (listCacheSet);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_ListCache.js






function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = _listCacheClear;
ListCache.prototype["delete"] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;
/* harmony default export */ const _ListCache = (ListCache);


/***/ }),

/***/ 2628:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getNative_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(615);
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9700);



var Map = (0,_getNative_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(_root_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, "Map");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Map);


/***/ }),

/***/ 6080:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ _MapCache)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_getNative.js + 4 modules
var _getNative = __webpack_require__(615);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_nativeCreate.js


var nativeCreate = (0,_getNative/* default */.Z)(Object, "create");
/* harmony default export */ const _nativeCreate = (nativeCreate);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_hashClear.js


function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}
/* harmony default export */ const _hashClear = (hashClear);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_hashDelete.js

function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
/* harmony default export */ const _hashDelete = (hashDelete);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_hashGet.js


var HASH_UNDEFINED = "__lodash_hash_undefined__";
var objectProto = Object.prototype;
var _hashGet_hasOwnProperty = objectProto.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? void 0 : result;
  }
  return _hashGet_hasOwnProperty.call(data, key) ? data[key] : void 0;
}
/* harmony default export */ const _hashGet = (hashGet);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_hashHas.js


var _hashHas_objectProto = Object.prototype;
var _hashHas_hasOwnProperty = _hashHas_objectProto.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? data[key] !== void 0 : _hashHas_hasOwnProperty.call(data, key);
}
/* harmony default export */ const _hashHas = (hashHas);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_hashSet.js


var _hashSet_HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = _nativeCreate && value === void 0 ? _hashSet_HASH_UNDEFINED : value;
  return this;
}
/* harmony default export */ const _hashSet = (hashSet);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_Hash.js






function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = _hashClear;
Hash.prototype["delete"] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;
/* harmony default export */ const _Hash = (Hash);

// EXTERNAL MODULE: ../node_modules/lodash-es/_ListCache.js + 6 modules
var _ListCache = __webpack_require__(6544);
// EXTERNAL MODULE: ../node_modules/lodash-es/_Map.js
var _Map = __webpack_require__(2628);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_mapCacheClear.js




function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new _Hash(),
    "map": new (_Map/* default */.Z || _ListCache/* default */.Z)(),
    "string": new _Hash()
  };
}
/* harmony default export */ const _mapCacheClear = (mapCacheClear);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_isKeyable.js

function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
/* harmony default export */ const _isKeyable = (isKeyable);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_getMapData.js


function getMapData(map, key) {
  var data = map.__data__;
  return _isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
/* harmony default export */ const _getMapData = (getMapData);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_mapCacheDelete.js


function mapCacheDelete(key) {
  var result = _getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
/* harmony default export */ const _mapCacheDelete = (mapCacheDelete);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_mapCacheGet.js


function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}
/* harmony default export */ const _mapCacheGet = (mapCacheGet);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_mapCacheHas.js


function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}
/* harmony default export */ const _mapCacheHas = (mapCacheHas);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_mapCacheSet.js


function mapCacheSet(key, value) {
  var data = _getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
/* harmony default export */ const _mapCacheSet = (mapCacheSet);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_MapCache.js






function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype["delete"] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;
/* harmony default export */ const _MapCache = (MapCache);


/***/ }),

/***/ 9584:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getNative_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(615);
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9700);



var Set = (0,_getNative_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(_root_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, "Set");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Set);


/***/ }),

/***/ 6803:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ _SetCache)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_MapCache.js + 14 modules
var _MapCache = __webpack_require__(6080);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_setCacheAdd.js

var HASH_UNDEFINED = "__lodash_hash_undefined__";
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}
/* harmony default export */ const _setCacheAdd = (setCacheAdd);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_setCacheHas.js

function setCacheHas(value) {
  return this.__data__.has(value);
}
/* harmony default export */ const _setCacheHas = (setCacheHas);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_SetCache.js




function SetCache(values) {
  var index = -1, length = values == null ? 0 : values.length;
  this.__data__ = new _MapCache/* default */.Z();
  while (++index < length) {
    this.add(values[index]);
  }
}
SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
SetCache.prototype.has = _setCacheHas;
/* harmony default export */ const _SetCache = (SetCache);


/***/ }),

/***/ 7992:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ _Stack)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_ListCache.js + 6 modules
var _ListCache = __webpack_require__(6544);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_stackClear.js


function stackClear() {
  this.__data__ = new _ListCache/* default */.Z();
  this.size = 0;
}
/* harmony default export */ const _stackClear = (stackClear);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_stackDelete.js

function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
/* harmony default export */ const _stackDelete = (stackDelete);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_stackGet.js

function stackGet(key) {
  return this.__data__.get(key);
}
/* harmony default export */ const _stackGet = (stackGet);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_stackHas.js

function stackHas(key) {
  return this.__data__.has(key);
}
/* harmony default export */ const _stackHas = (stackHas);

// EXTERNAL MODULE: ../node_modules/lodash-es/_Map.js
var _Map = __webpack_require__(2628);
// EXTERNAL MODULE: ../node_modules/lodash-es/_MapCache.js + 14 modules
var _MapCache = __webpack_require__(6080);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_stackSet.js




var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof _ListCache/* default */.Z) {
    var pairs = data.__data__;
    if (!_Map/* default */.Z || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new _MapCache/* default */.Z(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
/* harmony default export */ const _stackSet = (stackSet);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_Stack.js







function Stack(entries) {
  var data = this.__data__ = new _ListCache/* default */.Z(entries);
  this.size = data.size;
}
Stack.prototype.clear = _stackClear;
Stack.prototype["delete"] = _stackDelete;
Stack.prototype.get = _stackGet;
Stack.prototype.has = _stackHas;
Stack.prototype.set = _stackSet;
/* harmony default export */ const _Stack = (Stack);


/***/ }),

/***/ 6972:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9700);


var Symbol = _root_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z.Symbol;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Symbol);


/***/ }),

/***/ 9957:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ _arrayIncludes)
});

;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseFindIndex.js

function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}
/* harmony default export */ const _baseFindIndex = (baseFindIndex);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseIsNaN.js

function baseIsNaN(value) {
  return value !== value;
}
/* harmony default export */ const _baseIsNaN = (baseIsNaN);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_strictIndexOf.js

function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1, length = array.length;
  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}
/* harmony default export */ const _strictIndexOf = (strictIndexOf);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseIndexOf.js




function baseIndexOf(array, value, fromIndex) {
  return value === value ? _strictIndexOf(array, value, fromIndex) : _baseFindIndex(array, _baseIsNaN, fromIndex);
}
/* harmony default export */ const _baseIndexOf = (baseIndexOf);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_arrayIncludes.js


function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && _baseIndexOf(array, value, 0) > -1;
}
/* harmony default export */ const _arrayIncludes = (arrayIncludes);


/***/ }),

/***/ 3115:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function arrayIncludesWith(array, value, comparator) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (arrayIncludesWith);


/***/ }),

/***/ 6985:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ _arrayLikeKeys)
});

;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseTimes.js

function baseTimes(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
/* harmony default export */ const _baseTimes = (baseTimes);

// EXTERNAL MODULE: ../node_modules/lodash-es/isArguments.js + 1 modules
var isArguments = __webpack_require__(9691);
// EXTERNAL MODULE: ../node_modules/lodash-es/isArray.js
var isArray = __webpack_require__(1266);
// EXTERNAL MODULE: ../node_modules/lodash-es/isBuffer.js + 1 modules
var isBuffer = __webpack_require__(7730);
// EXTERNAL MODULE: ../node_modules/lodash-es/_isIndex.js
var _isIndex = __webpack_require__(9490);
// EXTERNAL MODULE: ../node_modules/lodash-es/isTypedArray.js + 1 modules
var isTypedArray = __webpack_require__(4555);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_arrayLikeKeys.js







var objectProto = Object.prototype;
var _arrayLikeKeys_hasOwnProperty = objectProto.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = (0,isArray/* default */.Z)(value), isArg = !isArr && (0,isArguments/* default */.Z)(value), isBuff = !isArr && !isArg && (0,isBuffer/* default */.Z)(value), isType = !isArr && !isArg && !isBuff && (0,isTypedArray/* default */.Z)(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? _baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || _arrayLikeKeys_hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    (0,_isIndex/* default */.Z)(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
/* harmony default export */ const _arrayLikeKeys = (arrayLikeKeys);


/***/ }),

/***/ 6333:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function arrayMap(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (arrayMap);


/***/ }),

/***/ 4207:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function arrayPush(array, values) {
  var index = -1, length = values.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (arrayPush);


/***/ }),

/***/ 2441:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4178);


function baseAssignValue(object, key, value) {
  if (key == "__proto__" && _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z) {
    (0,_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseAssignValue);


/***/ }),

/***/ 8273:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ _baseFlatten)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayPush.js
var _arrayPush = __webpack_require__(4207);
// EXTERNAL MODULE: ../node_modules/lodash-es/_Symbol.js
var _Symbol = __webpack_require__(6972);
// EXTERNAL MODULE: ../node_modules/lodash-es/isArguments.js + 1 modules
var isArguments = __webpack_require__(9691);
// EXTERNAL MODULE: ../node_modules/lodash-es/isArray.js
var isArray = __webpack_require__(1266);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_isFlattenable.js




var spreadableSymbol = _Symbol/* default */.Z ? _Symbol/* default */.Z.isConcatSpreadable : void 0;
function isFlattenable(value) {
  return (0,isArray/* default */.Z)(value) || (0,isArguments/* default */.Z)(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
/* harmony default export */ const _isFlattenable = (isFlattenable);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseFlatten.js



function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1, length = array.length;
  predicate || (predicate = _isFlattenable);
  result || (result = []);
  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        (0,_arrayPush/* default */.Z)(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}
/* harmony default export */ const _baseFlatten = (baseFlatten);


/***/ }),

/***/ 7795:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _castPath_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(445);
/* harmony import */ var _toKey_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7344);



function baseGet(object, path) {
  path = (0,_castPath_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(path, object);
  var index = 0, length = path.length;
  while (object != null && index < length) {
    object = object[(0,_toKey_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(path[index++])];
  }
  return index && index == length ? object : void 0;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseGet);


/***/ }),

/***/ 4084:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _arrayPush_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4207);
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1266);



function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return (0,_isArray_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(object) ? result : (0,_arrayPush_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(result, symbolsFunc(object));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseGetAllKeys);


/***/ }),

/***/ 1129:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ _baseGetTag)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_Symbol.js
var _Symbol = __webpack_require__(6972);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_getRawTag.js


var objectProto = Object.prototype;
var _getRawTag_hasOwnProperty = objectProto.hasOwnProperty;
var nativeObjectToString = objectProto.toString;
var symToStringTag = _Symbol/* default */.Z ? _Symbol/* default */.Z.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = _getRawTag_hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
  try {
    value[symToStringTag] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}
/* harmony default export */ const _getRawTag = (getRawTag);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_objectToString.js

var _objectToString_objectProto = Object.prototype;
var _objectToString_nativeObjectToString = _objectToString_objectProto.toString;
function objectToString(value) {
  return _objectToString_nativeObjectToString.call(value);
}
/* harmony default export */ const _objectToString = (objectToString);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseGetTag.js




var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var _baseGetTag_symToStringTag = _Symbol/* default */.Z ? _Symbol/* default */.Z.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return _baseGetTag_symToStringTag && _baseGetTag_symToStringTag in Object(value) ? _getRawTag(value) : _objectToString(value);
}
/* harmony default export */ const _baseGetTag = (baseGetTag);


/***/ }),

/***/ 121:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ _baseIsEqual)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_Stack.js + 5 modules
var _Stack = __webpack_require__(7992);
// EXTERNAL MODULE: ../node_modules/lodash-es/_SetCache.js + 2 modules
var _SetCache = __webpack_require__(6803);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_arraySome.js

function arraySome(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}
/* harmony default export */ const _arraySome = (arraySome);

// EXTERNAL MODULE: ../node_modules/lodash-es/_cacheHas.js
var _cacheHas = __webpack_require__(6213);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_equalArrays.js




var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new _SetCache/* default */.Z() : void 0;
  stack.set(array, other);
  stack.set(other, array);
  while (++index < arrLength) {
    var arrValue = array[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!_arraySome(other, function(othValue2, othIndex) {
        if (!(0,_cacheHas/* default */.Z)(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack["delete"](array);
  stack["delete"](other);
  return result;
}
/* harmony default export */ const _equalArrays = (equalArrays);

// EXTERNAL MODULE: ../node_modules/lodash-es/_Symbol.js
var _Symbol = __webpack_require__(6972);
// EXTERNAL MODULE: ../node_modules/lodash-es/_root.js
var _root = __webpack_require__(9700);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_Uint8Array.js


var Uint8Array = _root/* default */.Z.Uint8Array;
/* harmony default export */ const _Uint8Array = (Uint8Array);

// EXTERNAL MODULE: ../node_modules/lodash-es/eq.js
var eq = __webpack_require__(2494);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_mapToArray.js

function mapToArray(map) {
  var index = -1, result = Array(map.size);
  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
/* harmony default export */ const _mapToArray = (mapToArray);

// EXTERNAL MODULE: ../node_modules/lodash-es/_setToArray.js
var _setToArray = __webpack_require__(3592);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_equalByTag.js







var _equalByTag_COMPARE_PARTIAL_FLAG = 1, _equalByTag_COMPARE_UNORDERED_FLAG = 2;
var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]";
var symbolProto = _Symbol/* default */.Z ? _Symbol/* default */.Z.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
        return false;
      }
      return true;
    case boolTag:
    case dateTag:
    case numberTag:
      return (0,eq/* default */.Z)(+object, +other);
    case errorTag:
      return object.name == other.name && object.message == other.message;
    case regexpTag:
    case stringTag:
      return object == other + "";
    case mapTag:
      var convert = _mapToArray;
    case setTag:
      var isPartial = bitmask & _equalByTag_COMPARE_PARTIAL_FLAG;
      convert || (convert = _setToArray/* default */.Z);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= _equalByTag_COMPARE_UNORDERED_FLAG;
      stack.set(object, other);
      var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object);
      return result;
    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}
/* harmony default export */ const _equalByTag = (equalByTag);

// EXTERNAL MODULE: ../node_modules/lodash-es/_baseGetAllKeys.js
var _baseGetAllKeys = __webpack_require__(4084);
// EXTERNAL MODULE: ../node_modules/lodash-es/_getSymbols.js + 1 modules
var _getSymbols = __webpack_require__(2519);
// EXTERNAL MODULE: ../node_modules/lodash-es/keys.js
var keys = __webpack_require__(2017);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_getAllKeys.js




function getAllKeys(object) {
  return (0,_baseGetAllKeys/* default */.Z)(object, keys/* default */.Z, _getSymbols/* default */.Z);
}
/* harmony default export */ const _getAllKeys = (getAllKeys);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_equalObjects.js


var _equalObjects_COMPARE_PARTIAL_FLAG = 1;
var objectProto = Object.prototype;
var _equalObjects_hasOwnProperty = objectProto.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & _equalObjects_COMPARE_PARTIAL_FLAG, objProps = _getAllKeys(object), objLength = objProps.length, othProps = _getAllKeys(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : _equalObjects_hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack["delete"](object);
  stack["delete"](other);
  return result;
}
/* harmony default export */ const _equalObjects = (equalObjects);

// EXTERNAL MODULE: ../node_modules/lodash-es/_getTag.js + 3 modules
var _getTag = __webpack_require__(2084);
// EXTERNAL MODULE: ../node_modules/lodash-es/isArray.js
var isArray = __webpack_require__(1266);
// EXTERNAL MODULE: ../node_modules/lodash-es/isBuffer.js + 1 modules
var isBuffer = __webpack_require__(7730);
// EXTERNAL MODULE: ../node_modules/lodash-es/isTypedArray.js + 1 modules
var isTypedArray = __webpack_require__(4555);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseIsEqualDeep.js









var _baseIsEqualDeep_COMPARE_PARTIAL_FLAG = 1;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
var _baseIsEqualDeep_objectProto = Object.prototype;
var _baseIsEqualDeep_hasOwnProperty = _baseIsEqualDeep_objectProto.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = (0,isArray/* default */.Z)(object), othIsArr = (0,isArray/* default */.Z)(other), objTag = objIsArr ? arrayTag : (0,_getTag/* default */.Z)(object), othTag = othIsArr ? arrayTag : (0,_getTag/* default */.Z)(other);
  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;
  var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
  if (isSameTag && (0,isBuffer/* default */.Z)(object)) {
    if (!(0,isBuffer/* default */.Z)(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new _Stack/* default */.Z());
    return objIsArr || (0,isTypedArray/* default */.Z)(object) ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack) : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & _baseIsEqualDeep_COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && _baseIsEqualDeep_hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && _baseIsEqualDeep_hasOwnProperty.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new _Stack/* default */.Z());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new _Stack/* default */.Z());
  return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}
/* harmony default export */ const _baseIsEqualDeep = (baseIsEqualDeep);

// EXTERNAL MODULE: ../node_modules/lodash-es/isObjectLike.js
var isObjectLike = __webpack_require__(973);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseIsEqual.js



function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !(0,isObjectLike/* default */.Z)(value) && !(0,isObjectLike/* default */.Z)(other)) {
    return value !== value && other !== other;
  }
  return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}
/* harmony default export */ const _baseIsEqual = (baseIsEqual);


/***/ }),

/***/ 4329:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ _baseIteratee)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_Stack.js + 5 modules
var _Stack = __webpack_require__(7992);
// EXTERNAL MODULE: ../node_modules/lodash-es/_baseIsEqual.js + 8 modules
var _baseIsEqual = __webpack_require__(121);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseIsMatch.js



var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length, length = index, noCustomizer = !customizer;
  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0], objValue = object[key], srcValue = data[1];
    if (noCustomizer && data[2]) {
      if (objValue === void 0 && !(key in object)) {
        return false;
      }
    } else {
      var stack = new _Stack/* default */.Z();
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === void 0 ? (0,_baseIsEqual/* default */.Z)(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
        return false;
      }
    }
  }
  return true;
}
/* harmony default export */ const _baseIsMatch = (baseIsMatch);

// EXTERNAL MODULE: ../node_modules/lodash-es/isObject.js
var isObject = __webpack_require__(6743);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_isStrictComparable.js


function isStrictComparable(value) {
  return value === value && !(0,isObject/* default */.Z)(value);
}
/* harmony default export */ const _isStrictComparable = (isStrictComparable);

// EXTERNAL MODULE: ../node_modules/lodash-es/keys.js
var keys = __webpack_require__(2017);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_getMatchData.js



function getMatchData(object) {
  var result = (0,keys/* default */.Z)(object), length = result.length;
  while (length--) {
    var key = result[length], value = object[key];
    result[length] = [key, value, _isStrictComparable(value)];
  }
  return result;
}
/* harmony default export */ const _getMatchData = (getMatchData);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_matchesStrictComparable.js

function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
  };
}
/* harmony default export */ const _matchesStrictComparable = (matchesStrictComparable);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseMatches.js




function baseMatches(source) {
  var matchData = _getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || _baseIsMatch(object, source, matchData);
  };
}
/* harmony default export */ const _baseMatches = (baseMatches);

// EXTERNAL MODULE: ../node_modules/lodash-es/_baseGet.js
var _baseGet = __webpack_require__(7795);
;// CONCATENATED MODULE: ../node_modules/lodash-es/get.js


function get(object, path, defaultValue) {
  var result = object == null ? void 0 : (0,_baseGet/* default */.Z)(object, path);
  return result === void 0 ? defaultValue : result;
}
/* harmony default export */ const lodash_es_get = (get);

// EXTERNAL MODULE: ../node_modules/lodash-es/hasIn.js + 2 modules
var hasIn = __webpack_require__(9340);
// EXTERNAL MODULE: ../node_modules/lodash-es/_isKey.js
var _isKey = __webpack_require__(2988);
// EXTERNAL MODULE: ../node_modules/lodash-es/_toKey.js
var _toKey = __webpack_require__(7344);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseMatchesProperty.js








var _baseMatchesProperty_COMPARE_PARTIAL_FLAG = 1, _baseMatchesProperty_COMPARE_UNORDERED_FLAG = 2;
function baseMatchesProperty(path, srcValue) {
  if ((0,_isKey/* default */.Z)(path) && _isStrictComparable(srcValue)) {
    return _matchesStrictComparable((0,_toKey/* default */.Z)(path), srcValue);
  }
  return function(object) {
    var objValue = lodash_es_get(object, path);
    return objValue === void 0 && objValue === srcValue ? (0,hasIn/* default */.Z)(object, path) : (0,_baseIsEqual/* default */.Z)(srcValue, objValue, _baseMatchesProperty_COMPARE_PARTIAL_FLAG | _baseMatchesProperty_COMPARE_UNORDERED_FLAG);
  };
}
/* harmony default export */ const _baseMatchesProperty = (baseMatchesProperty);

// EXTERNAL MODULE: ../node_modules/lodash-es/identity.js
var identity = __webpack_require__(8553);
// EXTERNAL MODULE: ../node_modules/lodash-es/isArray.js
var isArray = __webpack_require__(1266);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseProperty.js

function baseProperty(key) {
  return function(object) {
    return object == null ? void 0 : object[key];
  };
}
/* harmony default export */ const _baseProperty = (baseProperty);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_basePropertyDeep.js


function basePropertyDeep(path) {
  return function(object) {
    return (0,_baseGet/* default */.Z)(object, path);
  };
}
/* harmony default export */ const _basePropertyDeep = (basePropertyDeep);

;// CONCATENATED MODULE: ../node_modules/lodash-es/property.js





function property(path) {
  return (0,_isKey/* default */.Z)(path) ? _baseProperty((0,_toKey/* default */.Z)(path)) : _basePropertyDeep(path);
}
/* harmony default export */ const lodash_es_property = (property);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseIteratee.js






function baseIteratee(value) {
  if (typeof value == "function") {
    return value;
  }
  if (value == null) {
    return identity/* default */.Z;
  }
  if (typeof value == "object") {
    return (0,isArray/* default */.Z)(value) ? _baseMatchesProperty(value[0], value[1]) : _baseMatches(value);
  }
  return lodash_es_property(value);
}
/* harmony default export */ const _baseIteratee = (baseIteratee);


/***/ }),

/***/ 5106:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ _baseKeys)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_isPrototype.js
var _isPrototype = __webpack_require__(6337);
// EXTERNAL MODULE: ../node_modules/lodash-es/_overArg.js
var _overArg = __webpack_require__(5246);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_nativeKeys.js


var nativeKeys = (0,_overArg/* default */.Z)(Object.keys, Object);
/* harmony default export */ const _nativeKeys = (nativeKeys);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseKeys.js



var objectProto = Object.prototype;
var _baseKeys_hasOwnProperty = objectProto.hasOwnProperty;
function baseKeys(object) {
  if (!(0,_isPrototype/* default */.Z)(object)) {
    return _nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (_baseKeys_hasOwnProperty.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
/* harmony default export */ const _baseKeys = (baseKeys);


/***/ }),

/***/ 434:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ _basePickBy)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_baseGet.js
var _baseGet = __webpack_require__(7795);
// EXTERNAL MODULE: ../node_modules/lodash-es/_baseAssignValue.js
var _baseAssignValue = __webpack_require__(2441);
// EXTERNAL MODULE: ../node_modules/lodash-es/eq.js
var eq = __webpack_require__(2494);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_assignValue.js



var objectProto = Object.prototype;
var _assignValue_hasOwnProperty = objectProto.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(_assignValue_hasOwnProperty.call(object, key) && (0,eq/* default */.Z)(objValue, value)) || value === void 0 && !(key in object)) {
    (0,_baseAssignValue/* default */.Z)(object, key, value);
  }
}
/* harmony default export */ const _assignValue = (assignValue);

// EXTERNAL MODULE: ../node_modules/lodash-es/_castPath.js + 3 modules
var _castPath = __webpack_require__(445);
// EXTERNAL MODULE: ../node_modules/lodash-es/_isIndex.js
var _isIndex = __webpack_require__(9490);
// EXTERNAL MODULE: ../node_modules/lodash-es/isObject.js
var isObject = __webpack_require__(6743);
// EXTERNAL MODULE: ../node_modules/lodash-es/_toKey.js
var _toKey = __webpack_require__(7344);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseSet.js






function baseSet(object, path, value, customizer) {
  if (!(0,isObject/* default */.Z)(object)) {
    return object;
  }
  path = (0,_castPath/* default */.Z)(path, object);
  var index = -1, length = path.length, lastIndex = length - 1, nested = object;
  while (nested != null && ++index < length) {
    var key = (0,_toKey/* default */.Z)(path[index]), newValue = value;
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return object;
    }
    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : void 0;
      if (newValue === void 0) {
        newValue = (0,isObject/* default */.Z)(objValue) ? objValue : (0,_isIndex/* default */.Z)(path[index + 1]) ? [] : {};
      }
    }
    _assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}
/* harmony default export */ const _baseSet = (baseSet);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_basePickBy.js




function basePickBy(object, paths, predicate) {
  var index = -1, length = paths.length, result = {};
  while (++index < length) {
    var path = paths[index], value = (0,_baseGet/* default */.Z)(object, path);
    if (predicate(value, path)) {
      _baseSet(result, (0,_castPath/* default */.Z)(path, object), value);
    }
  }
  return result;
}
/* harmony default export */ const _basePickBy = (basePickBy);


/***/ }),

/***/ 1739:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function basePropertyOf(object) {
  return function(key) {
    return object == null ? void 0 : object[key];
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (basePropertyOf);


/***/ }),

/***/ 5428:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8553);
/* harmony import */ var _overRest_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6086);
/* harmony import */ var _setToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5615);




function baseRest(func, start) {
  return (0,_setToString_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)((0,_overRest_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(func, start, _identity_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z), func + "");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseRest);


/***/ }),

/***/ 6818:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseUnary);


/***/ }),

/***/ 6213:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function cacheHas(cache, key) {
  return cache.has(key);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cacheHas);


/***/ }),

/***/ 445:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ _castPath)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/isArray.js
var isArray = __webpack_require__(1266);
// EXTERNAL MODULE: ../node_modules/lodash-es/_isKey.js
var _isKey = __webpack_require__(2988);
// EXTERNAL MODULE: ../node_modules/lodash-es/_MapCache.js + 14 modules
var _MapCache = __webpack_require__(6080);
;// CONCATENATED MODULE: ../node_modules/lodash-es/memoize.js


var FUNC_ERROR_TEXT = "Expected a function";
function memoize(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || _MapCache/* default */.Z)();
  return memoized;
}
memoize.Cache = _MapCache/* default */.Z;
/* harmony default export */ const lodash_es_memoize = (memoize);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_memoizeCapped.js


var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
  var result = lodash_es_memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
/* harmony default export */ const _memoizeCapped = (memoizeCapped);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_stringToPath.js


var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = _memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46) {
    result.push("");
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
  });
  return result;
});
/* harmony default export */ const _stringToPath = (stringToPath);

// EXTERNAL MODULE: ../node_modules/lodash-es/toString.js + 1 modules
var lodash_es_toString = __webpack_require__(7304);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_castPath.js





function castPath(value, object) {
  if ((0,isArray/* default */.Z)(value)) {
    return value;
  }
  return (0,_isKey/* default */.Z)(value, object) ? [value] : _stringToPath((0,lodash_es_toString/* default */.Z)(value));
}
/* harmony default export */ const _castPath = (castPath);


/***/ }),

/***/ 4178:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getNative_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(615);


var defineProperty = function() {
  try {
    var func = (0,_getNative_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defineProperty);


/***/ }),

/***/ 8786:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (freeGlobal);


/***/ }),

/***/ 615:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ _getNative)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/isFunction.js
var isFunction = __webpack_require__(1757);
// EXTERNAL MODULE: ../node_modules/lodash-es/_root.js
var _root = __webpack_require__(9700);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_coreJsData.js


var coreJsData = _root/* default */.Z["__core-js_shared__"];
/* harmony default export */ const _coreJsData = (coreJsData);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_isMasked.js


var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
/* harmony default export */ const _isMasked = (isMasked);

// EXTERNAL MODULE: ../node_modules/lodash-es/isObject.js
var isObject = __webpack_require__(6743);
// EXTERNAL MODULE: ../node_modules/lodash-es/_toSource.js
var _toSource = __webpack_require__(3650);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseIsNative.js





var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto = Function.prototype, objectProto = Object.prototype;
var funcToString = funcProto.toString;
var _baseIsNative_hasOwnProperty = objectProto.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString.call(_baseIsNative_hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!(0,isObject/* default */.Z)(value) || _isMasked(value)) {
    return false;
  }
  var pattern = (0,isFunction/* default */.Z)(value) ? reIsNative : reIsHostCtor;
  return pattern.test((0,_toSource/* default */.Z)(value));
}
/* harmony default export */ const _baseIsNative = (baseIsNative);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_getValue.js

function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
/* harmony default export */ const _getValue = (getValue);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_getNative.js



function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : void 0;
}
/* harmony default export */ const _getNative = (getNative);


/***/ }),

/***/ 4217:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _overArg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5246);


var getPrototype = (0,_overArg_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(Object.getPrototypeOf, Object);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getPrototype);


/***/ }),

/***/ 2519:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ _getSymbols)
});

;// CONCATENATED MODULE: ../node_modules/lodash-es/_arrayFilter.js

function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
/* harmony default export */ const _arrayFilter = (arrayFilter);

// EXTERNAL MODULE: ../node_modules/lodash-es/stubArray.js
var stubArray = __webpack_require__(4699);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_getSymbols.js



var objectProto = Object.prototype;
var propertyIsEnumerable = objectProto.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray/* default */.Z : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return _arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
/* harmony default export */ const _getSymbols = (getSymbols);


/***/ }),

/***/ 2084:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ _getTag)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_getNative.js + 4 modules
var _getNative = __webpack_require__(615);
// EXTERNAL MODULE: ../node_modules/lodash-es/_root.js
var _root = __webpack_require__(9700);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_DataView.js



var DataView = (0,_getNative/* default */.Z)(_root/* default */.Z, "DataView");
/* harmony default export */ const _DataView = (DataView);

// EXTERNAL MODULE: ../node_modules/lodash-es/_Map.js
var _Map = __webpack_require__(2628);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_Promise.js



var Promise = (0,_getNative/* default */.Z)(_root/* default */.Z, "Promise");
/* harmony default export */ const _Promise = (Promise);

// EXTERNAL MODULE: ../node_modules/lodash-es/_Set.js
var _Set = __webpack_require__(9584);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_WeakMap.js



var WeakMap = (0,_getNative/* default */.Z)(_root/* default */.Z, "WeakMap");
/* harmony default export */ const _WeakMap = (WeakMap);

// EXTERNAL MODULE: ../node_modules/lodash-es/_baseGetTag.js + 2 modules
var _baseGetTag = __webpack_require__(1129);
// EXTERNAL MODULE: ../node_modules/lodash-es/_toSource.js
var _toSource = __webpack_require__(3650);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_getTag.js








var mapTag = "[object Map]", objectTag = "[object Object]", promiseTag = "[object Promise]", setTag = "[object Set]", weakMapTag = "[object WeakMap]";
var dataViewTag = "[object DataView]";
var dataViewCtorString = (0,_toSource/* default */.Z)(_DataView), mapCtorString = (0,_toSource/* default */.Z)(_Map/* default */.Z), promiseCtorString = (0,_toSource/* default */.Z)(_Promise), setCtorString = (0,_toSource/* default */.Z)(_Set/* default */.Z), weakMapCtorString = (0,_toSource/* default */.Z)(_WeakMap);
var getTag = _baseGetTag/* default */.Z;
if (_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag || _Map/* default */.Z && getTag(new _Map/* default */.Z()) != mapTag || _Promise && getTag(_Promise.resolve()) != promiseTag || _Set/* default */.Z && getTag(new _Set/* default */.Z()) != setTag || _WeakMap && getTag(new _WeakMap()) != weakMapTag) {
  getTag = function(value) {
    var result = (0,_baseGetTag/* default */.Z)(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? (0,_toSource/* default */.Z)(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;
        case mapCtorString:
          return mapTag;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag;
        case weakMapCtorString:
          return weakMapTag;
      }
    }
    return result;
  };
}
/* harmony default export */ const _getTag = (getTag);


/***/ }),

/***/ 9490:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

var MAX_SAFE_INTEGER = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isIndex);


/***/ }),

/***/ 2988:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1266);
/* harmony import */ var _isSymbol_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1585);



var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
function isKey(value, object) {
  if ((0,_isArray_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(value)) {
    return false;
  }
  var type = typeof value;
  if (type == "number" || type == "symbol" || type == "boolean" || value == null || (0,_isSymbol_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isKey);


/***/ }),

/***/ 6337:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

var objectProto = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
  return value === proto;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isPrototype);


/***/ }),

/***/ 2582:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _freeGlobal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8786);


var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var freeProcess = moduleExports && _freeGlobal_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z.process;
var nodeUtil = function() {
  try {
    var types = freeModule && freeModule.require && freeModule.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (nodeUtil);


/***/ }),

/***/ 5246:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (overArg);


/***/ }),

/***/ 6086:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ _overRest)
});

;// CONCATENATED MODULE: ../node_modules/lodash-es/_apply.js

function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
/* harmony default export */ const _apply = (apply);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_overRest.js


var nativeMax = Math.max;
function overRest(func, start, transform) {
  start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return _apply(func, this, otherArgs);
  };
}
/* harmony default export */ const _overRest = (overRest);


/***/ }),

/***/ 9700:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _freeGlobal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8786);


var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = _freeGlobal_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z || freeSelf || Function("return this")();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (root);


/***/ }),

/***/ 3592:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function setToArray(set) {
  var index = -1, result = Array(set.size);
  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setToArray);


/***/ }),

/***/ 5615:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ _setToString)
});

;// CONCATENATED MODULE: ../node_modules/lodash-es/constant.js

function constant(value) {
  return function() {
    return value;
  };
}
/* harmony default export */ const lodash_es_constant = (constant);

// EXTERNAL MODULE: ../node_modules/lodash-es/_defineProperty.js
var _defineProperty = __webpack_require__(4178);
// EXTERNAL MODULE: ../node_modules/lodash-es/identity.js
var identity = __webpack_require__(8553);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseSetToString.js




var baseSetToString = !_defineProperty/* default */.Z ? identity/* default */.Z : function(func, string) {
  return (0,_defineProperty/* default */.Z)(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": lodash_es_constant(string),
    "writable": true
  });
};
/* harmony default export */ const _baseSetToString = (baseSetToString);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_shortOut.js

var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
/* harmony default export */ const _shortOut = (shortOut);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_setToString.js



var setToString = _shortOut(_baseSetToString);
/* harmony default export */ const _setToString = (setToString);


/***/ }),

/***/ 7344:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _isSymbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1585);


var INFINITY = 1 / 0;
function toKey(value) {
  if (typeof value == "string" || (0,_isSymbol_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toKey);


/***/ }),

/***/ 3650:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

var funcProto = Function.prototype;
var funcToString = funcProto.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toSource);


/***/ }),

/***/ 5381:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ lodash_es_debounce)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/isObject.js
var isObject = __webpack_require__(6743);
// EXTERNAL MODULE: ../node_modules/lodash-es/_root.js
var _root = __webpack_require__(9700);
;// CONCATENATED MODULE: ../node_modules/lodash-es/now.js


var now = function() {
  return _root/* default */.Z.Date.now();
};
/* harmony default export */ const lodash_es_now = (now);

// EXTERNAL MODULE: ../node_modules/lodash-es/toNumber.js + 2 modules
var toNumber = __webpack_require__(7062);
;// CONCATENATED MODULE: ../node_modules/lodash-es/debounce.js




var FUNC_ERROR_TEXT = "Expected a function";
var nativeMax = Math.max, nativeMin = Math.min;
function debounce(func, wait, options) {
  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = (0,toNumber/* default */.Z)(wait) || 0;
  if ((0,isObject/* default */.Z)(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax((0,toNumber/* default */.Z)(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs, thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = lodash_es_now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(lodash_es_now());
  }
  function debounced() {
    var time = lodash_es_now(), isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
/* harmony default export */ const lodash_es_debounce = (debounce);


/***/ }),

/***/ 6553:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ lodash_es_difference)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_SetCache.js + 2 modules
var _SetCache = __webpack_require__(6803);
// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayIncludes.js + 4 modules
var _arrayIncludes = __webpack_require__(9957);
// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayIncludesWith.js
var _arrayIncludesWith = __webpack_require__(3115);
// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayMap.js
var _arrayMap = __webpack_require__(6333);
// EXTERNAL MODULE: ../node_modules/lodash-es/_baseUnary.js
var _baseUnary = __webpack_require__(6818);
// EXTERNAL MODULE: ../node_modules/lodash-es/_cacheHas.js
var _cacheHas = __webpack_require__(6213);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseDifference.js







var LARGE_ARRAY_SIZE = 200;
function baseDifference(array, values, iteratee, comparator) {
  var index = -1, includes = _arrayIncludes/* default */.Z, isCommon = true, length = array.length, result = [], valuesLength = values.length;
  if (!length) {
    return result;
  }
  if (iteratee) {
    values = (0,_arrayMap/* default */.Z)(values, (0,_baseUnary/* default */.Z)(iteratee));
  }
  if (comparator) {
    includes = _arrayIncludesWith/* default */.Z;
    isCommon = false;
  } else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = _cacheHas/* default */.Z;
    isCommon = false;
    values = new _SetCache/* default */.Z(values);
  }
  outer:
    while (++index < length) {
      var value = array[index], computed = iteratee == null ? value : iteratee(value);
      value = comparator || value !== 0 ? value : 0;
      if (isCommon && computed === computed) {
        var valuesIndex = valuesLength;
        while (valuesIndex--) {
          if (values[valuesIndex] === computed) {
            continue outer;
          }
        }
        result.push(value);
      } else if (!includes(values, computed, comparator)) {
        result.push(value);
      }
    }
  return result;
}
/* harmony default export */ const _baseDifference = (baseDifference);

// EXTERNAL MODULE: ../node_modules/lodash-es/_baseFlatten.js + 1 modules
var _baseFlatten = __webpack_require__(8273);
// EXTERNAL MODULE: ../node_modules/lodash-es/_baseRest.js
var _baseRest = __webpack_require__(5428);
// EXTERNAL MODULE: ../node_modules/lodash-es/isArrayLikeObject.js
var isArrayLikeObject = __webpack_require__(1004);
;// CONCATENATED MODULE: ../node_modules/lodash-es/difference.js





var difference = (0,_baseRest/* default */.Z)(function(array, values) {
  return (0,isArrayLikeObject/* default */.Z)(array) ? _baseDifference(array, (0,_baseFlatten/* default */.Z)(values, 1, isArrayLikeObject/* default */.Z, true)) : [];
});
/* harmony default export */ const lodash_es_difference = (difference);


/***/ }),

/***/ 2494:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function eq(value, other) {
  return value === other || value !== value && other !== other;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (eq);


/***/ }),

/***/ 8485:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ lodash_es_escape)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_basePropertyOf.js
var _basePropertyOf = __webpack_require__(1739);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_escapeHtmlChar.js


var htmlEscapes = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var escapeHtmlChar = (0,_basePropertyOf/* default */.Z)(htmlEscapes);
/* harmony default export */ const _escapeHtmlChar = (escapeHtmlChar);

// EXTERNAL MODULE: ../node_modules/lodash-es/toString.js + 1 modules
var lodash_es_toString = __webpack_require__(7304);
;// CONCATENATED MODULE: ../node_modules/lodash-es/escape.js



var reUnescapedHtml = /[&<>"']/g, reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
function escape_escape(string) {
  string = (0,lodash_es_toString/* default */.Z)(string);
  return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, _escapeHtmlChar) : string;
}
/* harmony default export */ const lodash_es_escape = (escape_escape);


/***/ }),

/***/ 5519:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseFlatten_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8273);


function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? (0,_baseFlatten_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(array, 1) : [];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (flatten);


/***/ }),

/***/ 9340:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ lodash_es_hasIn)
});

;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseHasIn.js

function baseHasIn(object, key) {
  return object != null && key in Object(object);
}
/* harmony default export */ const _baseHasIn = (baseHasIn);

// EXTERNAL MODULE: ../node_modules/lodash-es/_castPath.js + 3 modules
var _castPath = __webpack_require__(445);
// EXTERNAL MODULE: ../node_modules/lodash-es/isArguments.js + 1 modules
var isArguments = __webpack_require__(9691);
// EXTERNAL MODULE: ../node_modules/lodash-es/isArray.js
var isArray = __webpack_require__(1266);
// EXTERNAL MODULE: ../node_modules/lodash-es/_isIndex.js
var _isIndex = __webpack_require__(9490);
// EXTERNAL MODULE: ../node_modules/lodash-es/isLength.js
var isLength = __webpack_require__(7018);
// EXTERNAL MODULE: ../node_modules/lodash-es/_toKey.js
var _toKey = __webpack_require__(7344);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_hasPath.js







function hasPath(object, path, hasFunc) {
  path = (0,_castPath/* default */.Z)(path, object);
  var index = -1, length = path.length, result = false;
  while (++index < length) {
    var key = (0,_toKey/* default */.Z)(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && (0,isLength/* default */.Z)(length) && (0,_isIndex/* default */.Z)(key, length) && ((0,isArray/* default */.Z)(object) || (0,isArguments/* default */.Z)(object));
}
/* harmony default export */ const _hasPath = (hasPath);

;// CONCATENATED MODULE: ../node_modules/lodash-es/hasIn.js



function hasIn(object, path) {
  return object != null && _hasPath(object, path, _baseHasIn);
}
/* harmony default export */ const lodash_es_hasIn = (hasIn);


/***/ }),

/***/ 8553:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function identity(value) {
  return value;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (identity);


/***/ }),

/***/ 4999:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ lodash_es_intersection)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayMap.js
var _arrayMap = __webpack_require__(6333);
// EXTERNAL MODULE: ../node_modules/lodash-es/_SetCache.js + 2 modules
var _SetCache = __webpack_require__(6803);
// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayIncludes.js + 4 modules
var _arrayIncludes = __webpack_require__(9957);
// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayIncludesWith.js
var _arrayIncludesWith = __webpack_require__(3115);
// EXTERNAL MODULE: ../node_modules/lodash-es/_baseUnary.js
var _baseUnary = __webpack_require__(6818);
// EXTERNAL MODULE: ../node_modules/lodash-es/_cacheHas.js
var _cacheHas = __webpack_require__(6213);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseIntersection.js







var nativeMin = Math.min;
function baseIntersection(arrays, iteratee, comparator) {
  var includes = comparator ? _arrayIncludesWith/* default */.Z : _arrayIncludes/* default */.Z, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array(othLength), maxLength = Infinity, result = [];
  while (othIndex--) {
    var array = arrays[othIndex];
    if (othIndex && iteratee) {
      array = (0,_arrayMap/* default */.Z)(array, (0,_baseUnary/* default */.Z)(iteratee));
    }
    maxLength = nativeMin(array.length, maxLength);
    caches[othIndex] = !comparator && (iteratee || length >= 120 && array.length >= 120) ? new _SetCache/* default */.Z(othIndex && array) : void 0;
  }
  array = arrays[0];
  var index = -1, seen = caches[0];
  outer:
    while (++index < length && result.length < maxLength) {
      var value = array[index], computed = iteratee ? iteratee(value) : value;
      value = comparator || value !== 0 ? value : 0;
      if (!(seen ? (0,_cacheHas/* default */.Z)(seen, computed) : includes(result, computed, comparator))) {
        othIndex = othLength;
        while (--othIndex) {
          var cache = caches[othIndex];
          if (!(cache ? (0,_cacheHas/* default */.Z)(cache, computed) : includes(arrays[othIndex], computed, comparator))) {
            continue outer;
          }
        }
        if (seen) {
          seen.push(computed);
        }
        result.push(value);
      }
    }
  return result;
}
/* harmony default export */ const _baseIntersection = (baseIntersection);

// EXTERNAL MODULE: ../node_modules/lodash-es/_baseRest.js
var _baseRest = __webpack_require__(5428);
// EXTERNAL MODULE: ../node_modules/lodash-es/isArrayLikeObject.js
var isArrayLikeObject = __webpack_require__(1004);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_castArrayLikeObject.js


function castArrayLikeObject(value) {
  return (0,isArrayLikeObject/* default */.Z)(value) ? value : [];
}
/* harmony default export */ const _castArrayLikeObject = (castArrayLikeObject);

;// CONCATENATED MODULE: ../node_modules/lodash-es/intersection.js





var intersection = (0,_baseRest/* default */.Z)(function(arrays) {
  var mapped = (0,_arrayMap/* default */.Z)(arrays, _castArrayLikeObject);
  return mapped.length && mapped[0] === arrays[0] ? _baseIntersection(mapped) : [];
});
/* harmony default export */ const lodash_es_intersection = (intersection);


/***/ }),

/***/ 9691:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ lodash_es_isArguments)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_baseGetTag.js + 2 modules
var _baseGetTag = __webpack_require__(1129);
// EXTERNAL MODULE: ../node_modules/lodash-es/isObjectLike.js
var isObjectLike = __webpack_require__(973);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseIsArguments.js



var argsTag = "[object Arguments]";
function baseIsArguments(value) {
  return (0,isObjectLike/* default */.Z)(value) && (0,_baseGetTag/* default */.Z)(value) == argsTag;
}
/* harmony default export */ const _baseIsArguments = (baseIsArguments);

;// CONCATENATED MODULE: ../node_modules/lodash-es/isArguments.js



var objectProto = Object.prototype;
var isArguments_hasOwnProperty = objectProto.hasOwnProperty;
var propertyIsEnumerable = objectProto.propertyIsEnumerable;
var isArguments = _baseIsArguments(function() {
  return arguments;
}()) ? _baseIsArguments : function(value) {
  return (0,isObjectLike/* default */.Z)(value) && isArguments_hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
/* harmony default export */ const lodash_es_isArguments = (isArguments);


/***/ }),

/***/ 1266:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

var isArray = Array.isArray;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isArray);


/***/ }),

/***/ 609:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1757);
/* harmony import */ var _isLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7018);



function isArrayLike(value) {
  return value != null && (0,_isLength_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(value.length) && !(0,_isFunction_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(value);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isArrayLike);


/***/ }),

/***/ 1004:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(609);
/* harmony import */ var _isObjectLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(973);



function isArrayLikeObject(value) {
  return (0,_isObjectLike_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(value) && (0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(value);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isArrayLikeObject);


/***/ }),

/***/ 7730:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ lodash_es_isBuffer)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_root.js
var _root = __webpack_require__(9700);
;// CONCATENATED MODULE: ../node_modules/lodash-es/stubFalse.js

function stubFalse() {
  return false;
}
/* harmony default export */ const lodash_es_stubFalse = (stubFalse);

;// CONCATENATED MODULE: ../node_modules/lodash-es/isBuffer.js



var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer = moduleExports ? _root/* default */.Z.Buffer : void 0;
var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
var isBuffer = nativeIsBuffer || lodash_es_stubFalse;
/* harmony default export */ const lodash_es_isBuffer = (isBuffer);


/***/ }),

/***/ 7826:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ lodash_es_isDate)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_baseGetTag.js + 2 modules
var _baseGetTag = __webpack_require__(1129);
// EXTERNAL MODULE: ../node_modules/lodash-es/isObjectLike.js
var isObjectLike = __webpack_require__(973);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseIsDate.js



var dateTag = "[object Date]";
function baseIsDate(value) {
  return (0,isObjectLike/* default */.Z)(value) && (0,_baseGetTag/* default */.Z)(value) == dateTag;
}
/* harmony default export */ const _baseIsDate = (baseIsDate);

// EXTERNAL MODULE: ../node_modules/lodash-es/_baseUnary.js
var _baseUnary = __webpack_require__(6818);
// EXTERNAL MODULE: ../node_modules/lodash-es/_nodeUtil.js
var _nodeUtil = __webpack_require__(2582);
;// CONCATENATED MODULE: ../node_modules/lodash-es/isDate.js




var nodeIsDate = _nodeUtil/* default */.Z && _nodeUtil/* default */.Z.isDate;
var isDate = nodeIsDate ? (0,_baseUnary/* default */.Z)(nodeIsDate) : _baseIsDate;
/* harmony default export */ const lodash_es_isDate = (isDate);


/***/ }),

/***/ 6016:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseKeys_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5106);
/* harmony import */ var _getTag_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2084);
/* harmony import */ var _isArguments_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9691);
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1266);
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(609);
/* harmony import */ var _isBuffer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7730);
/* harmony import */ var _isPrototype_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6337);
/* harmony import */ var _isTypedArray_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4555);









var mapTag = "[object Map]", setTag = "[object Set]";
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if ((0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(value) && ((0,_isArray_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(value) || typeof value == "string" || typeof value.splice == "function" || (0,_isBuffer_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(value) || (0,_isTypedArray_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)(value) || (0,_isArguments_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)(value))) {
    return !value.length;
  }
  var tag = (0,_getTag_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if ((0,_isPrototype_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(value)) {
    return !(0,_baseKeys_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isEmpty);


/***/ }),

/***/ 6285:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseIsEqual_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(121);


function isEqual(value, other) {
  return (0,_baseIsEqual_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(value, other);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isEqual);


/***/ }),

/***/ 1757:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseGetTag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1129);
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6743);



var asyncTag = "[object AsyncFunction]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!(0,_isObject_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(value)) {
    return false;
  }
  var tag = (0,_baseGetTag_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isFunction);


/***/ }),

/***/ 7018:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isLength);


/***/ }),

/***/ 6743:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isObject);


/***/ }),

/***/ 973:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function isObjectLike(value) {
  return value != null && typeof value == "object";
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isObjectLike);


/***/ }),

/***/ 1585:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseGetTag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1129);
/* harmony import */ var _isObjectLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(973);



var symbolTag = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || (0,_isObjectLike_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(value) && (0,_baseGetTag_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(value) == symbolTag;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isSymbol);


/***/ }),

/***/ 4555:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ lodash_es_isTypedArray)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_baseGetTag.js + 2 modules
var _baseGetTag = __webpack_require__(1129);
// EXTERNAL MODULE: ../node_modules/lodash-es/isLength.js
var isLength = __webpack_require__(7018);
// EXTERNAL MODULE: ../node_modules/lodash-es/isObjectLike.js
var isObjectLike = __webpack_require__(973);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseIsTypedArray.js




var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
function baseIsTypedArray(value) {
  return (0,isObjectLike/* default */.Z)(value) && (0,isLength/* default */.Z)(value.length) && !!typedArrayTags[(0,_baseGetTag/* default */.Z)(value)];
}
/* harmony default export */ const _baseIsTypedArray = (baseIsTypedArray);

// EXTERNAL MODULE: ../node_modules/lodash-es/_baseUnary.js
var _baseUnary = __webpack_require__(6818);
// EXTERNAL MODULE: ../node_modules/lodash-es/_nodeUtil.js
var _nodeUtil = __webpack_require__(2582);
;// CONCATENATED MODULE: ../node_modules/lodash-es/isTypedArray.js




var nodeIsTypedArray = _nodeUtil/* default */.Z && _nodeUtil/* default */.Z.isTypedArray;
var isTypedArray = nodeIsTypedArray ? (0,_baseUnary/* default */.Z)(nodeIsTypedArray) : _baseIsTypedArray;
/* harmony default export */ const lodash_es_isTypedArray = (isTypedArray);


/***/ }),

/***/ 2017:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _arrayLikeKeys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6985);
/* harmony import */ var _baseKeys_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5106);
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(609);




function keys(object) {
  return (0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(object) ? (0,_arrayLikeKeys_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(object) : (0,_baseKeys_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(object);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (keys);


/***/ }),

/***/ 785:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ lodash_es_mapValues)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_baseAssignValue.js
var _baseAssignValue = __webpack_require__(2441);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_createBaseFor.js

function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
/* harmony default export */ const _createBaseFor = (createBaseFor);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseFor.js


var baseFor = _createBaseFor();
/* harmony default export */ const _baseFor = (baseFor);

// EXTERNAL MODULE: ../node_modules/lodash-es/keys.js
var keys = __webpack_require__(2017);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseForOwn.js



function baseForOwn(object, iteratee) {
  return object && _baseFor(object, iteratee, keys/* default */.Z);
}
/* harmony default export */ const _baseForOwn = (baseForOwn);

// EXTERNAL MODULE: ../node_modules/lodash-es/_baseIteratee.js + 10 modules
var _baseIteratee = __webpack_require__(4329);
;// CONCATENATED MODULE: ../node_modules/lodash-es/mapValues.js




function mapValues(object, iteratee) {
  var result = {};
  iteratee = (0,_baseIteratee/* default */.Z)(iteratee, 3);
  _baseForOwn(object, function(value, key, object2) {
    (0,_baseAssignValue/* default */.Z)(result, key, iteratee(value, key, object2));
  });
  return result;
}
/* harmony default export */ const lodash_es_mapValues = (mapValues);


/***/ }),

/***/ 7883:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ lodash_es_pick)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_basePickBy.js + 2 modules
var _basePickBy = __webpack_require__(434);
// EXTERNAL MODULE: ../node_modules/lodash-es/hasIn.js + 2 modules
var hasIn = __webpack_require__(9340);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_basePick.js



function basePick(object, paths) {
  return (0,_basePickBy/* default */.Z)(object, paths, function(value, path) {
    return (0,hasIn/* default */.Z)(object, path);
  });
}
/* harmony default export */ const _basePick = (basePick);

// EXTERNAL MODULE: ../node_modules/lodash-es/flatten.js
var flatten = __webpack_require__(5519);
// EXTERNAL MODULE: ../node_modules/lodash-es/_overRest.js + 1 modules
var _overRest = __webpack_require__(6086);
// EXTERNAL MODULE: ../node_modules/lodash-es/_setToString.js + 3 modules
var _setToString = __webpack_require__(5615);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_flatRest.js




function flatRest(func) {
  return (0,_setToString/* default */.Z)((0,_overRest/* default */.Z)(func, void 0, flatten/* default */.Z), func + "");
}
/* harmony default export */ const _flatRest = (flatRest);

;// CONCATENATED MODULE: ../node_modules/lodash-es/pick.js



var pick = _flatRest(function(object, paths) {
  return object == null ? {} : _basePick(object, paths);
});
/* harmony default export */ const lodash_es_pick = (pick);


/***/ }),

/***/ 2611:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ lodash_es_pickBy)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayMap.js
var _arrayMap = __webpack_require__(6333);
// EXTERNAL MODULE: ../node_modules/lodash-es/_baseIteratee.js + 10 modules
var _baseIteratee = __webpack_require__(4329);
// EXTERNAL MODULE: ../node_modules/lodash-es/_basePickBy.js + 2 modules
var _basePickBy = __webpack_require__(434);
// EXTERNAL MODULE: ../node_modules/lodash-es/_baseGetAllKeys.js
var _baseGetAllKeys = __webpack_require__(4084);
// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayPush.js
var _arrayPush = __webpack_require__(4207);
// EXTERNAL MODULE: ../node_modules/lodash-es/_getPrototype.js
var _getPrototype = __webpack_require__(4217);
// EXTERNAL MODULE: ../node_modules/lodash-es/_getSymbols.js + 1 modules
var _getSymbols = __webpack_require__(2519);
// EXTERNAL MODULE: ../node_modules/lodash-es/stubArray.js
var stubArray = __webpack_require__(4699);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_getSymbolsIn.js





var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbolsIn = !nativeGetSymbols ? stubArray/* default */.Z : function(object) {
  var result = [];
  while (object) {
    (0,_arrayPush/* default */.Z)(result, (0,_getSymbols/* default */.Z)(object));
    object = (0,_getPrototype/* default */.Z)(object);
  }
  return result;
};
/* harmony default export */ const _getSymbolsIn = (getSymbolsIn);

// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayLikeKeys.js + 1 modules
var _arrayLikeKeys = __webpack_require__(6985);
// EXTERNAL MODULE: ../node_modules/lodash-es/isObject.js
var isObject = __webpack_require__(6743);
// EXTERNAL MODULE: ../node_modules/lodash-es/_isPrototype.js
var _isPrototype = __webpack_require__(6337);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_nativeKeysIn.js

function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
/* harmony default export */ const _nativeKeysIn = (nativeKeysIn);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseKeysIn.js




var objectProto = Object.prototype;
var _baseKeysIn_hasOwnProperty = objectProto.hasOwnProperty;
function baseKeysIn(object) {
  if (!(0,isObject/* default */.Z)(object)) {
    return _nativeKeysIn(object);
  }
  var isProto = (0,_isPrototype/* default */.Z)(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !_baseKeysIn_hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
/* harmony default export */ const _baseKeysIn = (baseKeysIn);

// EXTERNAL MODULE: ../node_modules/lodash-es/isArrayLike.js
var isArrayLike = __webpack_require__(609);
;// CONCATENATED MODULE: ../node_modules/lodash-es/keysIn.js




function keysIn(object) {
  return (0,isArrayLike/* default */.Z)(object) ? (0,_arrayLikeKeys/* default */.Z)(object, true) : _baseKeysIn(object);
}
/* harmony default export */ const lodash_es_keysIn = (keysIn);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_getAllKeysIn.js




function getAllKeysIn(object) {
  return (0,_baseGetAllKeys/* default */.Z)(object, lodash_es_keysIn, _getSymbolsIn);
}
/* harmony default export */ const _getAllKeysIn = (getAllKeysIn);

;// CONCATENATED MODULE: ../node_modules/lodash-es/pickBy.js





function pickBy(object, predicate) {
  if (object == null) {
    return {};
  }
  var props = (0,_arrayMap/* default */.Z)(_getAllKeysIn(object), function(prop) {
    return [prop];
  });
  predicate = (0,_baseIteratee/* default */.Z)(predicate);
  return (0,_basePickBy/* default */.Z)(object, props, function(value, path) {
    return predicate(value, path[0]);
  });
}
/* harmony default export */ const lodash_es_pickBy = (pickBy);


/***/ }),

/***/ 4699:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function stubArray() {
  return [];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stubArray);


/***/ }),

/***/ 7062:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ lodash_es_toNumber)
});

;// CONCATENATED MODULE: ../node_modules/lodash-es/_trimmedEndIndex.js

var reWhitespace = /\s/;
function trimmedEndIndex(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {
  }
  return index;
}
/* harmony default export */ const _trimmedEndIndex = (trimmedEndIndex);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseTrim.js


var reTrimStart = /^\s+/;
function baseTrim(string) {
  return string ? string.slice(0, _trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
}
/* harmony default export */ const _baseTrim = (baseTrim);

// EXTERNAL MODULE: ../node_modules/lodash-es/isObject.js
var isObject = __webpack_require__(6743);
// EXTERNAL MODULE: ../node_modules/lodash-es/isSymbol.js
var isSymbol = __webpack_require__(1585);
;// CONCATENATED MODULE: ../node_modules/lodash-es/toNumber.js




var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if ((0,isSymbol/* default */.Z)(value)) {
    return NAN;
  }
  if ((0,isObject/* default */.Z)(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = (0,isObject/* default */.Z)(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = _baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
/* harmony default export */ const lodash_es_toNumber = (toNumber);


/***/ }),

/***/ 7304:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ lodash_es_toString)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_Symbol.js
var _Symbol = __webpack_require__(6972);
// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayMap.js
var _arrayMap = __webpack_require__(6333);
// EXTERNAL MODULE: ../node_modules/lodash-es/isArray.js
var isArray = __webpack_require__(1266);
// EXTERNAL MODULE: ../node_modules/lodash-es/isSymbol.js
var isSymbol = __webpack_require__(1585);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseToString.js





var INFINITY = 1 / 0;
var symbolProto = _Symbol/* default */.Z ? _Symbol/* default */.Z.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if ((0,isArray/* default */.Z)(value)) {
    return (0,_arrayMap/* default */.Z)(value, baseToString) + "";
  }
  if ((0,isSymbol/* default */.Z)(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
/* harmony default export */ const _baseToString = (baseToString);

;// CONCATENATED MODULE: ../node_modules/lodash-es/toString.js


function toString_toString(value) {
  return value == null ? "" : _baseToString(value);
}
/* harmony default export */ const lodash_es_toString = (toString_toString);


/***/ }),

/***/ 7782:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ lodash_es_uniqBy)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_baseIteratee.js + 10 modules
var _baseIteratee = __webpack_require__(4329);
// EXTERNAL MODULE: ../node_modules/lodash-es/_SetCache.js + 2 modules
var _SetCache = __webpack_require__(6803);
// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayIncludes.js + 4 modules
var _arrayIncludes = __webpack_require__(9957);
// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayIncludesWith.js
var _arrayIncludesWith = __webpack_require__(3115);
// EXTERNAL MODULE: ../node_modules/lodash-es/_cacheHas.js
var _cacheHas = __webpack_require__(6213);
// EXTERNAL MODULE: ../node_modules/lodash-es/_Set.js
var _Set = __webpack_require__(9584);
;// CONCATENATED MODULE: ../node_modules/lodash-es/noop.js

function noop() {
}
/* harmony default export */ const lodash_es_noop = (noop);

// EXTERNAL MODULE: ../node_modules/lodash-es/_setToArray.js
var _setToArray = __webpack_require__(3592);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_createSet.js




var INFINITY = 1 / 0;
var createSet = !(_Set/* default */.Z && 1 / (0,_setToArray/* default */.Z)(new _Set/* default */.Z([, -0]))[1] == INFINITY) ? lodash_es_noop : function(values) {
  return new _Set/* default */.Z(values);
};
/* harmony default export */ const _createSet = (createSet);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseUniq.js







var LARGE_ARRAY_SIZE = 200;
function baseUniq(array, iteratee, comparator) {
  var index = -1, includes = _arrayIncludes/* default */.Z, length = array.length, isCommon = true, result = [], seen = result;
  if (comparator) {
    isCommon = false;
    includes = _arrayIncludesWith/* default */.Z;
  } else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : _createSet(array);
    if (set) {
      return (0,_setToArray/* default */.Z)(set);
    }
    isCommon = false;
    includes = _cacheHas/* default */.Z;
    seen = new _SetCache/* default */.Z();
  } else {
    seen = iteratee ? [] : result;
  }
  outer:
    while (++index < length) {
      var value = array[index], computed = iteratee ? iteratee(value) : value;
      value = comparator || value !== 0 ? value : 0;
      if (isCommon && computed === computed) {
        var seenIndex = seen.length;
        while (seenIndex--) {
          if (seen[seenIndex] === computed) {
            continue outer;
          }
        }
        if (iteratee) {
          seen.push(computed);
        }
        result.push(value);
      } else if (!includes(seen, computed, comparator)) {
        if (seen !== result) {
          seen.push(computed);
        }
        result.push(value);
      }
    }
  return result;
}
/* harmony default export */ const _baseUniq = (baseUniq);

;// CONCATENATED MODULE: ../node_modules/lodash-es/uniqBy.js



function uniqBy(array, iteratee) {
  return array && array.length ? _baseUniq(array, (0,_baseIteratee/* default */.Z)(iteratee, 2)) : [];
}
/* harmony default export */ const lodash_es_uniqBy = (uniqBy);


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
/******/ 			return "" + chunkId + ".js";
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
/******/ 		// data-webpack is not used as build has no uniqueName
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url) { script = s; break; }
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
/******/ 		
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
/******/ 			458: 0
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
/******/ 		var chunkLoadingGlobal = (typeof self !== 'undefined' ? self : global)["webpackChunk"] = (typeof self !== 'undefined' ? self : global)["webpackChunk"] || [];
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
  ArgumentError: () => (/* reexport */ common/* ArgumentError */.ir),
  BackgroundImageTag: () => (/* reexport */ react/* BackgroundImageTag */.iX),
  Binary: () => (/* reexport */ models/* Binary */.Kb),
  ChildListTag: () => (/* reexport */ react/* ChildListTag */.H1),
  ClientError: () => (/* reexport */ client/* ClientError */.XF),
  ContentTag: () => (/* reexport */ react/* ContentTag */.jq),
  CurrentPage: () => (/* reexport */ react/* CurrentPage */.Ck),
  DataConnectionError: () => (/* reexport */ data_integration/* DataConnectionError */.wJ),
  DataLocator: () => (/* reexport */ models/* DataLocator */.s4),
  Extensions: () => (/* reexport */ react/* Extensions */.IP),
  FutureBinary: () => (/* reexport */ models/* FutureBinary */.eJ),
  ImageTag: () => (/* reexport */ react/* ImageTag */.Du),
  InPlaceEditingOff: () => (/* reexport */ react/* InPlaceEditingOff */.ZM),
  Link: () => (/* reexport */ realm/* Link */.rU),
  LinkTag: () => (/* reexport */ react/* LinkTag */.IR),
  NotFoundErrorPage: () => (/* reexport */ react/* NotFoundErrorPage */.zp),
  Obj: () => (/* reexport */ realm/* Obj */.eG),
  ObjFacetValue: () => (/* reexport */ realm/* ObjFacetValue */.JB),
  ObjSearch: () => (/* reexport */ realm/* ObjSearch */.d_),
  RestoreInPlaceEditing: () => (/* reexport */ react/* RestoreInPlaceEditing */.TE),
  ScrivitoError: () => (/* reexport */ common/* ScrivitoError */.Ix),
  Widget: () => (/* reexport */ realm/* Widget */.$L),
  WidgetTag: () => (/* reexport */ react/* WidgetTag */.Dc),
  canEdit: () => (/* reexport */ can_edit/* canEdit */.J),
  canWrite: () => (/* reexport */ canWrite),
  configure: () => (/* reexport */ configure),
  configureContentBrowser: () => (/* reexport */ configure_content_browser/* configureContentBrowser */.Z),
  configureObjClassForContentType: () => (/* reexport */ configure_obj_class_for_content_type/* configureObjClassForContentType */.h),
  configurePreviewSizes: () => (/* reexport */ preview_sizes/* configurePreviewSizes */.E),
  connect: () => (/* reexport */ react_connect/* connect */.$j),
  createObjClass: () => (/* reexport */ realm/* createObjClass */.r$),
  createRestApiClient: () => (/* reexport */ client/* createRestApiClient */.cC),
  createWidgetClass: () => (/* reexport */ realm/* createWidgetClass */.Zv),
  currentEditor: () => (/* reexport */ currentEditor),
  currentLanguage: () => (/* reexport */ currentLanguage),
  currentPage: () => (/* reexport */ current_page/* currentPage */.lo),
  currentPageParams: () => (/* reexport */ current_page/* currentPageParams */.WX),
  currentSiteId: () => (/* reexport */ current_page/* currentSiteId */.lx),
  currentUser: () => (/* reexport */ currentUser),
  currentWorkspace: () => (/* reexport */ currentWorkspace),
  currentWorkspaceId: () => (/* reexport */ current_workspace_id/* currentWorkspaceId */.tV),
  editorLanguage: () => (/* reexport */ editorLanguage),
  ensureUserIsLoggedIn: () => (/* reexport */ ensureUserIsLoggedIn),
  extendMenu: () => (/* reexport */ extendMenu),
  extractText: () => (/* reexport */ extractText),
  finishLoading: () => (/* reexport */ react_connect/* finishLoading */.kU),
  getClass: () => (/* reexport */ realm/* getClass */.ll),
  getInstanceId: () => (/* reexport */ getInstanceId),
  isComparisonActive: () => (/* reexport */ editing_context/* isComparisonActive */.rl),
  isCurrentPage: () => (/* reexport */ current_page/* isCurrentPage */.OO),
  isEditorLoggedIn: () => (/* reexport */ isEditorLoggedIn),
  isInPlaceEditingActive: () => (/* reexport */ editing_context/* isInPlaceEditingActive */.DG),
  isOnCurrentPath: () => (/* reexport */ isOnCurrentPath),
  isUserLoggedIn: () => (/* reexport */ isUserLoggedIn),
  load: () => (/* reexport */ loadable/* load */.zD),
  logout: () => (/* reexport */ logout),
  navigateTo: () => (/* reexport */ navigate_to/* navigateTo */.T),
  openDialog: () => (/* reexport */ openDialog),
  preload: () => (/* reexport */ preload),
  provideAuthGroups: () => (/* reexport */ auth_groups/* provideAuthGroups */.t),
  provideComponent: () => (/* reexport */ react/* provideComponent */.wh),
  provideDataClass: () => (/* reexport */ provideDataClass),
  provideDataErrorComponent: () => (/* reexport */ react/* provideDataErrorComponent */.$3),
  provideDataItem: () => (/* reexport */ provideDataItem),
  provideEditingConfig: () => (/* reexport */ provide_editing_config/* provideEditingConfig */.u),
  provideLayoutComponent: () => (/* reexport */ react/* provideLayoutComponent */.YP),
  provideObjClass: () => (/* reexport */ realm/* provideObjClass */.Je),
  provideWidgetClass: () => (/* reexport */ realm/* provideWidgetClass */.We),
  registerComponent: () => (/* reexport */ react/* registerComponent */.RM),
  renderPage: () => (/* reexport */ renderPage),
  resolveHtmlUrls: () => (/* reexport */ replace_internal_links/* resolveHtmlUrls */.y),
  setVisitorIdToken: () => (/* reexport */ setVisitorIdToken),
  uiContext: () => (/* reexport */ uiContext),
  unstable_selectSiteId: () => (/* reexport */ unstable_multi_site_mode/* unstable_selectSiteId */.gq),
  updateContent: () => (/* reexport */ updateContent),
  updateMenuExtensions: () => (/* reexport */ menu/* updateMenuExtensions */.ff),
  urlFor: () => (/* reexport */ url_for/* urlFor */.u),
  urlForDataItem: () => (/* reexport */ url_for_data_item/* urlForDataItem */.n),
  useAttributeDefinition: () => (/* reexport */ react/* useAttributeDefinition */.mV),
  useData: () => (/* reexport */ react/* useData */.et),
  useDataItem: () => (/* reexport */ react/* useDataItem */.pU),
  useDataLocator: () => (/* reexport */ react/* useDataLocator */.$W),
  useDataScope: () => (/* reexport */ react/* useDataScope */.g7),
  useHistory: () => (/* reexport */ browser_location/* useHistory */.k6),
  useResolvedHtmlValue: () => (/* reexport */ react/* useResolvedHtmlValue */.XD),
  useResolvedStringValue: () => (/* reexport */ react/* useResolvedStringValue */.SI),
  useUrlFor: () => (/* reexport */ react/* useUrlFor */.SU),
  validationResultsFor: () => (/* reexport */ validationResultsFor)
});

// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_page.ts
var current_page = __webpack_require__(4106);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(9853);
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
var initialize_content = __webpack_require__(4625);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/node_adapter.ts


let nodeAdapter;
function setNodeAdapter(adapter) {
  nodeAdapter = adapter;
}
function isRunningInBrowser() {
  return nodeAdapter === void 0;
}
(0,common/* onReset */.rj)(() => nodeAdapter = void 0);

// EXTERNAL MODULE: ./scrivito_sdk/client/index.ts + 37 modules
var client = __webpack_require__(9001);
// EXTERNAL MODULE: ./scrivito_sdk/data/index.ts + 28 modules
var data = __webpack_require__(4433);
;// CONCATENATED MODULE: external "html-to-text"
const external_html_to_text_namespaceObject = require("html-to-text");
;// CONCATENATED MODULE: ./scrivito_sdk/node_support/html_to_text_for_node.ts


function htmlToTextForNode(html) {
  return (0,external_html_to_text_namespaceObject.htmlToText)(html, htmlToTextOptions);
}
const htmlToTextOptions = {
  tags: {
    "": { format: "block" },
    a: { format: "inline" },
    h1: { format: "block" },
    h2: { format: "block" },
    h3: { format: "block" },
    h4: { format: "block" },
    h5: { format: "block" },
    h6: { format: "block" },
    img: { format: "skip" },
    table: { format: "block" },
    ul: { format: "block" }
  },
  wordwrap: false
};

;// CONCATENATED MODULE: ./scrivito_sdk/node_support/fetch_iam_token.ts

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

function fetchIamToken(apiKey) {
  return __async(this, null, function* () {
    const response = yield (0,client/* fetchJson */.rd)("https://api.justrelate.com/iam/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(
          `${encodeURIComponent(apiKey.clientId)}:${encodeURIComponent(
            apiKey.clientSecret
          )}`
        )}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "grant_type=client_credentials",
      isIdempotent: true
    });
    return response.access_token;
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/node_support/api_key_authorization_provider.ts

var api_key_authorization_provider_async = (__this, __arguments, generator) => {
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


class ApiKeyAuthorizationProvider {
  constructor(apiKey) {
    const authProvider = isIamTokenAuth(apiKey) ? new client/* TokenAuthorizationProvider */.Jh(() => fetchIamToken(apiKey)) : new LegacyApiKeyAuthorizationProvider(apiKey);
    this.authorize = authProvider.authorize.bind(authProvider);
  }
}
class LegacyApiKeyAuthorizationProvider {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  authorize(request) {
    return api_key_authorization_provider_async(this, null, function* () {
      return request(`Basic ${btoa(`api_token:${this.apiKey}`)}`);
    });
  }
}
function isIamTokenAuth(apiKey) {
  return typeof apiKey !== "string";
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/browser_location.ts + 1 modules
var browser_location = __webpack_require__(125);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/analytics_provider.ts



let loadId = generateLoadId();
function browserAnalyticsProvider() {
  return {
    loadId,
    urlPath: new URL((0,common/* currentHref */.RO)()).pathname,
    nav: (0,browser_location/* getHistoryChangesCount */.pj)()
  };
}
function nodeAnalyticsProvider() {
  return { loadId };
}
function generateLoadId() {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}
(0,common/* onReset */.rj)(() => loadId = generateLoadId());

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/asset_url_base.ts

var asset_url_base_async = (__this, __arguments, generator) => {
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

const config = new common/* ConfigStore */.JU();
function getAssetUrlBase() {
  return config.get();
}
function assetLoadingReady() {
  return asset_url_base_async(this, null, function* () {
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
(0,common/* onReset */.rj)(resetAssetUrlBase);

// EXTERNAL MODULE: ./scrivito_sdk/app_support/content_tags_for_empty_attributes.ts
var content_tags_for_empty_attributes = __webpack_require__(9754);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_app_space.ts
var current_app_space = __webpack_require__(3626);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/ui_adapter.ts
var ui_adapter = __webpack_require__(3218);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/logged_in_state.ts




let loggedInState;
const USER_IS_LOGGED_IN_PARAM_NAME = "__scrivitoUserIsLoggedIn";
function initializeLoggedInState() {
  (0,client/* setLoggedInIndicatorParam */.A2)(USER_IS_LOGGED_IN_PARAM_NAME);
  const url = new URL((0,common/* currentHref */.RO)());
  const searchParams = url.searchParams;
  if (searchParams.has(USER_IS_LOGGED_IN_PARAM_NAME)) {
    loggedInState = true;
    setFlagInLocalStorage();
    searchParams.delete(USER_IS_LOGGED_IN_PARAM_NAME);
    (0,common/* replaceHistoryState */.g_)({}, "", url.toString());
    return;
  }
  loggedInState = (0,common/* getFromLocalStorage */.fp)(isUserLoggedInStorageKey()) !== null;
}
function isInLoggedInState() {
  if (loggedInState === void 0) {
    throw new common/* ScrivitoError */.Ix("not configured");
  }
  return loggedInState;
}
function changeLoggedInState(state) {
  if (state) {
    setFlagInLocalStorage();
  } else {
    (0,common/* removeFromLocalStorage */.bZ)(isUserLoggedInStorageKey());
  }
  (0,common/* reload */.H5)();
}
function setFlagInLocalStorage() {
  if (!ui_adapter/* uiAdapter */.k)
    (0,common/* setInLocalStorage */._m)(isUserLoggedInStorageKey(), "");
}
function isUserLoggedInStorageKey() {
  return `SCRIVITO.${(0,common/* getConfiguredTenant */.pR)()}.IS_USER_LOGGED_IN`;
}
(0,common/* onReset */.rj)(() => loggedInState = void 0);

// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 27 modules
var loadable = __webpack_require__(6664);
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
    const tenant = yield (0,common/* fetchConfiguredTenant */.Kc)();
    return `iam/instances/${tenant}/userinfo`;
  });
}
function setUserInfo(userinfo) {
  loadableUserInfo.set(userinfo);
}
const loadableUserInfo = new loadable/* LoadableData */.of({
  loader: () => user_info_async(void 0, null, function* () {
    return client/* JrRestApi */.oq.getWithoutLogin(yield getUserInfoPath());
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
function startPollingLoggedUser() {
  if (userLoggedInStatusInterval)
    return;
  userLoggedInStatusInterval = (0,common/* setInterval */.Zi)(fetchLoggedUser, 6e4);
}
function fetchLoggedUser() {
  return user_logged_in_status_async(this, null, function* () {
    yield client/* JrRestApi */.oq.get(yield getUserInfoPath());
  });
}
function disableUserIsLoggedInPoll() {
  if (userLoggedInStatusInterval)
    clearInterval(userLoggedInStatusInterval);
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
  ensureUserIsLoggedIn() {
    ensureUserIsLoggedInAsync();
  },
  iamAuthProvider() {
    return void 0;
  },
  loginHandler() {
    return "redirect";
  }
};
function ensureUserIsLoggedInAsync() {
  return anonymous_visitor_auth_handler_async(this, null, function* () {
    yield fetchLoggedUser();
    changeLoggedInState(true);
  });
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/get_editor_auth_token.ts
var get_editor_auth_token = __webpack_require__(7879);
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
    const userData = (0,common/* assumePresence */.VV)(ui_adapter/* uiAdapter */.k).currentEditor();
    if (!userData)
      return;
    return __spreadProps(__spreadValues({}, userData), { id: userData.id.replace(/^scrivito:/, "") });
  },
  isUserLoggedIn() {
    return true;
  },
  ensureUserIsLoggedIn() {
  },
  iamAuthProvider() {
    return new client/* TokenAuthorizationProvider */.Jh(
      () => inside_ui_auth_handler_async(this, null, function* () {
        return (0,common/* assumePresence */.VV)(yield (0,loadable/* load */.zD)(get_editor_auth_token/* getEditorAuthToken */.Q));
      })
    );
  },
  loginHandler() {
    return void 0;
  }
};

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
    if (!userInfo)
      return;
    const { sub: id, name, email, picture } = userInfo;
    return { id, name, email, picture: picture || null };
  },
  isUserLoggedIn() {
    verifyUserIsLoggedIn();
    startPollingLoggedUser();
    return true;
  },
  ensureUserIsLoggedIn() {
  },
  iamAuthProvider() {
    return void 0;
  },
  loginHandler() {
    return "redirect";
  }
};
function verifyUserIsLoggedIn() {
  return logged_in_visitor_auth_handler_async(this, null, function* () {
    const user = yield Promise.race([
      (0,loadable/* load */.zD)(loggedInVisitorAuthHandler.getUserData),
      (0,common/* wait */.Dc)(30)
    ]);
    if (!user)
      changeLoggedInState(false);
  });
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/user.ts
var user = __webpack_require__(9099);
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
  return userData ? new user/* User */.n(userData) : null;
}
function isUserLoggedIn() {
  return authHandler().isUserLoggedIn();
}
function ensureUserIsLoggedIn() {
  return authHandler().ensureUserIsLoggedIn();
}
function getIamAuthProvider() {
  return authHandler().iamAuthProvider();
}
function getLoginHandler() {
  return authHandler().loginHandler();
}
function logout(returnTo) {
  logoutAsync(returnTo);
}
function logoutAsync(returnTo) {
  return current_user_async(this, null, function* () {
    const url = yield (0,client/* getIamAuthUrl */.B2)("logout");
    (0,common/* assignLocation */.Hz)(
      returnTo ? `${url}?return_to=${encodeURIComponent(returnTo)}` : url
    );
  });
}
function authHandler() {
  if (nodeAdapter)
    return nodeAdapter.nodeAuthHandler;
  if (ui_adapter/* uiAdapter */.k)
    return insideUiAuthHandler;
  if (isInLoggedInState())
    return loggedInVisitorAuthHandler;
  return anonymousVisitorAuthHandler;
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/extensions_url.ts
var extensions_url = __webpack_require__(925);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/forced_editor_language.ts
var forced_editor_language = __webpack_require__(7538);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/initial_content_dump_url.ts
var initial_content_dump_url = __webpack_require__(5369);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/layout_editing.ts
var layout_editing = __webpack_require__(4417);
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
  return __webpack_require__.e(/* import() */ 527).then(__webpack_require__.bind(__webpack_require__, 4527));
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/routing.ts + 2 modules
var routing = __webpack_require__(3420);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/treat_localhost_like.ts
var treat_localhost_like = __webpack_require__(5828);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/unstable_multi_site_mode.ts
var unstable_multi_site_mode = __webpack_require__(48);
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
  provider = new client/* VisitorAuthenticationProvider */.h_();
  const timeoutId = (0,common/* setTimeout */.iK)(() => {
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
(0,common/* onReset */.rj)(resetVisitorAuthentication);

// EXTERNAL MODULE: ./scrivito_sdk/bridge/index.ts + 14 modules
var bridge = __webpack_require__(2996);
// EXTERNAL MODULE: ./scrivito_sdk/models/index.ts + 38 modules
var models = __webpack_require__(9880);
// EXTERNAL MODULE: ./scrivito_sdk/realm/index.ts + 22 modules
var realm = __webpack_require__(105);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/constraints_validation_callback.ts
var constraints_validation_callback = __webpack_require__(852);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/configure.ts



























const OriginValue = common/* tcomb.refinement */.pC.refinement(common/* tcomb.String */.pC.String, isOrigin, "Origin String");
function isOrigin(origin) {
  try {
    return new URL(origin).origin === origin;
  } catch (e) {
    return false;
  }
}
const AllowedConfiguration = common/* tcomb.interface */.pC["interface"]({
  tenant: common/* tcomb.String */.pC.String,
  adoptUi: common/* tcomb.maybe */.pC.maybe(common/* tcomb.union */.pC.union([common/* tcomb.Boolean */.pC.Boolean, OriginValue])),
  autoConvertAttributes: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Boolean */.pC.Boolean),
  baseUrlForSite: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Function */.pC.Function),
  constraintsValidation: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Function */.pC.Function),
  endpoint: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String),
  extensionsUrl: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String),
  homepage: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Function */.pC.Function),
  origin: common/* tcomb.maybe */.pC.maybe(OriginValue),
  routingBasePath: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String),
  siteForUrl: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Function */.pC.Function),
  visitorAuthentication: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Boolean */.pC.Boolean),
  apiKey: common/* tcomb.maybe */.pC.maybe(
    common/* tcomb.union */.pC.union([
      common/* tcomb.String */.pC.String,
      common/* tcomb.interface */.pC["interface"]({
        clientId: common/* tcomb.String */.pC.String,
        clientSecret: common/* tcomb.String */.pC.String
      })
    ])
  ),
  unstable: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Object */.pC.Object),
  priority: common/* tcomb.maybe */.pC.maybe(common/* tcomb.enums */.pC.enums.of(["foreground", "background"])),
  editorLanguage: common/* tcomb.maybe */.pC.maybe(common/* tcomb.enums */.pC.enums.of(["en", "de"])),
  strictSearchOperators: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Boolean */.pC.Boolean),
  optimizedWidgetLoading: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Boolean */.pC.Boolean),
  contentTagsForEmptyAttributes: common/* tcomb.maybe */.pC.maybe(common/* tcomb.Boolean */.pC.Boolean),
  iamAuthLocation: common/* tcomb.maybe */.pC.maybe(common/* tcomb.String */.pC.String),
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
  if (configuration.apiKey && isRunningInBrowser()) {
    (0,common/* throwInvalidArgumentsError */.dg)(
      PUBLIC_FUNCTION_NAME,
      'The option "apiKey" is only available under Node.js.',
      CHECK_ARGUMENTS_OPTIONS
    );
  }
  const routingConfiguration = getCheckedRoutingConfiguration(configuration);
  setConfiguration(configuration);
  const unofficialConfiguration = configuration.unstable;
  const getUnstableSiteIdForObj = unofficialConfiguration == null ? void 0 : unofficialConfiguration.getSiteIdForObj;
  if (getUnstableSiteIdForObj) {
    (0,unstable_multi_site_mode/* setUnstableMultiSiteMode */.NV)(getUnstableSiteIdForObj);
  }
  if (configuration.tenant === data/* IN_MEMORY_TENANT */.kI) {
    (0,data/* useInMemoryTenant */.c9)();
    (0,realm/* setCurrentSiteIdHandler */.RO)(() => data/* IN_MEMORY_TENANT */.kI);
    (0,data/* disableObjReplication */.Qc)();
  } else {
    const tenant = configuration.tenant;
    (0,common/* setConfiguredTenant */._h)(tenant);
    if (isRunningInBrowser())
      initializeLoggedInState();
    configureAssetUrlBase(
      (_a = unofficialConfiguration == null ? void 0 : unofficialConfiguration.assetUrlBase) != null ? _a : (0,common/* cdnAssetUrlBase */.M0)()
    );
    client/* clientConfig */.$V.set({
      iamAuthLocation: getIamAuthLocation(configuration.iamAuthLocation),
      iamAuthProvider: getIamAuthProvider(),
      loginHandler: getLoginHandler()
    });
    const treatLocalhostLike = configuration.treatLocalhostLike;
    if (treatLocalhostLike)
      (0,treat_localhost_like/* setTreatLocalhostLike */.J)(treatLocalhostLike);
    if (ui_adapter/* uiAdapter */.k) {
      configureWithUi(tenant, ui_adapter/* uiAdapter */.k);
    } else {
      configureWithoutUi(configuration);
    }
  }
  (0,routing/* initRouting */.ZK)(routingConfiguration);
  configureConstraintsValidationCallback(configuration);
  if (configuration.contentTagsForEmptyAttributes === false) {
    (0,content_tags_for_empty_attributes/* skipContentTagsForEmptyAttributes */.g)();
  }
  if (configuration.strictSearchOperators)
    (0,realm/* enableStrictSearchOperators */.pw)();
  (0,models/* setWantsAutoAttributeConversion */.W1)(!!configuration.autoConvertAttributes);
  (0,forced_editor_language/* setForcedEditorLanguage */.n)(configuration.editorLanguage || null);
  (0,extensions_url/* setExtensionsUrl */.W)(configuration.extensionsUrl || void 0);
  if (unofficialConfiguration == null ? void 0 : unofficialConfiguration.layoutEditing)
    (0,layout_editing/* enableLayoutEditing */.q6)();
  if (unofficialConfiguration == null ? void 0 : unofficialConfiguration.initialContentDumpUrl) {
    (0,initial_content_dump_url/* setInitialContentDumpUrl */.h)(unofficialConfiguration.initialContentDumpUrl);
  }
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
  configDeferred = new common/* Deferred */.BH();
  client/* clientConfig */.$V.reset();
}
function configureWithUi(tenant, uiAdapterClient) {
  uiAdapterClient.configureTenant({
    tenant
  });
  if ((0,unstable_multi_site_mode/* useUnstableMultiSiteMode */.Ly)())
    warnIfNoSiteIdSelection();
  setAppAdapter(uiAdapterClient);
  loadEditingAssets();
}
function configureWithoutUi({
  endpoint,
  tenant,
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
  endpoint: configuredEndpoint,
  tenant,
  visitorAuthentication,
  priority,
  apiKey
}) {
  const endpoint = configuredEndpoint || "api.scrivito.com";
  client/* cmsRestApi */.i3.init({
    apiBaseUrl: `${endpoint.startsWith("http") ? endpoint : `https://${endpoint}`}/tenants/${tenant}`,
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
    return (0,client/* getBrowserTokenProvider */.yU)("https://api.justrelate.com");
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
  if (origin !== void 0 && !isOrigin(origin)) {
    (0,common/* throwInvalidArgumentsError */.dg)(
      PUBLIC_FUNCTION_NAME,
      `Unexpected value: '${origin}' is not a valid origin.`,
      CHECK_ARGUMENTS_OPTIONS
    );
  }
  return { homepageCallback, origin, routingBasePath };
}
function configureConstraintsValidationCallback(configuration) {
  const constraintsValidationCallback = configuration.constraintsValidation;
  if (constraintsValidationCallback) {
    (0,constraints_validation_callback/* setConstraintsValidationCallback */.a)(constraintsValidationCallback);
  }
}
function setAppAdapter(uiAdapterClient) {
  importUiInterface().then(({ startAppAdapter }) => {
    const channel = new MessageChannel();
    startAppAdapter((0,bridge/* linkViaPort */.oc)(channel.port1));
    uiAdapterClient.setAppAdapter(channel.port2);
  });
}
function importUiInterface() {
  return __webpack_require__.e(/* import() */ 158).then(__webpack_require__.bind(__webpack_require__, 2487));
}
function warnIfNoSiteIdSelection() {
  const timeout = (0,common/* setTimeout */.iK)(
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
function getIamAuthLocation(iamAuthLocation) {
  if (typeof iamAuthLocation === "string")
    return iamAuthLocation;
  const origin = (0,common/* currentOrigin */.ZJ)();
  return origin ? `${origin}/auth` : void 0;
}
(0,common/* onReset */.rj)(resetConfiguration);

;// CONCATENATED MODULE: ./scrivito_sdk/node_support/node_auth_handler.ts

var node_auth_handler_async = (__this, __arguments, generator) => {
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




const nodeAuthHandler = {
  getUserData() {
    refuse();
  },
  isUserLoggedIn() {
    refuse();
  },
  ensureUserIsLoggedIn() {
    refuse();
  },
  iamAuthProvider() {
    return new client/* TokenAuthorizationProvider */.Jh(() => node_auth_handler_async(this, null, function* () {
      const configuration = yield getConfiguration();
      const key = configuration.apiKey;
      return typeof key === "object" ? fetchIamToken(key) : null;
    }));
  },
  loginHandler() {
    return void 0;
  }
};
function refuse() {
  throw new common/* ScrivitoError */.Ix("Only available in browser");
}

;// CONCATENATED MODULE: ./scrivito_sdk/node_support/node_adapter.ts



const node_adapter_nodeAdapter = {
  ApiKeyAuthorizationProvider: ApiKeyAuthorizationProvider,
  nodeAuthHandler: nodeAuthHandler
};

// EXTERNAL MODULE: ./scrivito_sdk/realm/initial_content_registry.ts
var initial_content_registry = __webpack_require__(5158);
;// CONCATENATED MODULE: ./scrivito_sdk/initialize_sdk_for_node.ts












function initializeSdk() {
  (0,common/* setOriginProvider */.kx)(() => void 0);
  (0,realm/* setCurrentSiteIdHandler */.RO)(current_page/* currentSiteId */.lx);
  (0,data/* useReplicationStrategy */.Lo)(data/* ObjBackendReplication */.kt);
  setHtmlToTextConverter(htmlToTextForNode);
  (0,client/* useDefaultPriority */._i)("background");
  (0,initial_content_registry/* setInitialContentFor */.T)(initialize_content/* initialContentFor */.WS);
  setNodeAdapter(node_adapter_nodeAdapter);
}

// EXTERNAL MODULE: ./scrivito_sdk/react/index.ts + 40 modules
var react = __webpack_require__(2250);
// EXTERNAL MODULE: ./scrivito_sdk/data_integration/index.ts + 25 modules
var data_integration = __webpack_require__(9528);
// EXTERNAL MODULE: ./scrivito_sdk/react_connect/index.ts + 7 modules
var react_connect = __webpack_require__(6519);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/can_edit.ts
var can_edit = __webpack_require__(8083);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/can_write.ts



function canWrite() {
  if (!ui_adapter/* uiAdapter */.k)
    return false;
  return ui_adapter/* uiAdapter */.k.canWrite((0,models/* currentWorkspaceId */.tV)()) || false;
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/configure_content_browser.ts
var configure_content_browser = __webpack_require__(934);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/configure_obj_class_for_content_type.ts
var configure_obj_class_for_content_type = __webpack_require__(917);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/preview_sizes.ts
var preview_sizes = __webpack_require__(9434);
// EXTERNAL MODULE: ./scrivito_sdk/import_from.ts
var import_from = __webpack_require__(3705);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/current_editor.ts



function currentEditor() {
  if (!ui_adapter/* uiAdapter */.k)
    return null;
  const userData = ui_adapter/* uiAdapter */.k.currentEditor();
  const teamsData = ui_adapter/* uiAdapter */.k.currentEditorTeams();
  const Editor = (0,import_from/* importFrom */.u$)("editingSupport", "Editor");
  if (!Editor)
    return null;
  return userData && teamsData ? new Editor(userData, teamsData) : null;
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/current_workspace.ts



function currentWorkspace() {
  var _a, _b;
  return new models/* Workspace */.j$(
    (_b = (_a = ui_adapter/* uiAdapter */.k) == null ? void 0 : _a.currentWorkspace()) != null ? _b : { id: (0,models/* currentWorkspaceId */.tV)(), title: "" }
  );
}

// EXTERNAL MODULE: ./scrivito_sdk/models/current_workspace_id.ts
var current_workspace_id = __webpack_require__(43);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/menu.ts + 2 modules
var menu = __webpack_require__(2619);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/menu/menu_registry.ts
var menu_registry = __webpack_require__(3827);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/extend_menu.ts





function extendMenu(menuCallback, ...excessArgs) {
  checkExtendMenuArguments(menuCallback, ...excessArgs);
  if (!ui_adapter/* uiAdapter */.k)
    return;
  (0,menu_registry/* registerMenuCallback */.L)(menuCallback);
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

// EXTERNAL MODULE: ./scrivito_sdk/app_support/editing_context.ts
var editing_context = __webpack_require__(6993);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/is_editor_logged_in.ts


function isEditorLoggedIn() {
  return !!ui_adapter/* uiAdapter */.k;
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/navigate_to.ts
var navigate_to = __webpack_require__(6528);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/open_dialog.ts



function openDialog(name, ...excessArgs) {
  checkOpenDialogArguments(name, ...excessArgs);
  if (ui_adapter/* uiAdapter */.k) {
    ui_adapter/* uiAdapter */.k.openCustomDialog(name);
  }
}
const checkOpenDialogArguments = (0,common/* checkArgumentsFor */.PJ)(
  "openDialog",
  [["name", common/* tcomb.String */.pC.String]],
  {
    docPermalink: "js-sdk/openDialog"
  }
);

// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(2757);
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
      `could not preload: dump is from version ${String(parsed.version)}, this is version ${(0,common/* getScrivitoVersion */.ux)()}`
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
var auth_groups = __webpack_require__(4113);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_page_data.ts
var current_page_data = __webpack_require__(4185);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/scale_down_binary.ts
var scale_down_binary = __webpack_require__(4428);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/site_mapping.ts
var site_mapping = __webpack_require__(6701);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/render_page.ts













function renderPage(obj, render, ...excessArgs) {
  (0,data/* assertNotUsingInMemoryTenant */.VJ)("Scrivito.renderPage");
  checkRenderPage(obj, render, ...excessArgs);
  const objSpaceId = (0,models/* currentObjSpaceId */.GD)();
  const page = (0,realm/* unwrapAppClass */.bM)(obj);
  const workspaceId = (0,client/* getWorkspaceId */.cm)(objSpaceId);
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

// EXTERNAL MODULE: ./scrivito_sdk/app_support/url_for.ts
var url_for = __webpack_require__(590);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/url_for_data_item.ts
var url_for_data_item = __webpack_require__(4136);
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
var replace_internal_links = __webpack_require__(8926);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/provide_data_class.ts


function provideDataClass(name, params) {
  (0,data_integration/* assertValidDataIdentifier */.kn)(name);
  if ("restApi" in params) {
    return provideDataClass(name, {
      connection: (0,data_integration/* createRestApiConnection */.Pd)(params.restApi),
      attributes: params.attributes
    });
  }
  (0,data_integration/* setExternalDataConnection */.ZV)(name, params.connection);
  if (params.attributes)
    (0,data_integration/* registerDataClassSchema */.ot)(name, params.attributes);
  return new data_integration/* ExternalDataClass */.Zv(name);
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/provide_data_item.ts


function provideDataItem(name, connectionOrGet) {
  if (typeof connectionOrGet === "function") {
    return provideDataItem(name, { get: connectionOrGet });
  }
  (0,data_integration/* assertValidDataIdentifier */.kn)(name);
  return (0,data_integration/* provideExternalDataItem */.C8)(name, connectionOrGet);
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/provide_editing_config.ts
var provide_editing_config = __webpack_require__(5037);
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

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/get_instance_id.ts


function getInstanceId() {
  const configuredTenant = (0,common/* tryGetConfiguredTenant */._Q)();
  if (configuredTenant)
    return configuredTenant;
  throw new common/* ScrivitoError */.Ix(
    "Function invoked before calling 'Scrivito.configure'"
  );
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/current_language.ts




function currentLanguage() {
  var _a, _b;
  const siteId = (0,current_page/* currentSiteId */.lx)();
  if (!siteId)
    return null;
  return (_b = (_a = (0,models/* getRootObjFrom */.cS)((0,current_app_space/* currentAppSpace */.q)().and((0,models/* restrictToSite */.mz)(siteId)))) == null ? void 0 : _a.language()) != null ? _b : null;
}

;// CONCATENATED MODULE: ./scrivito_sdk/public_api.ts
















































;// CONCATENATED MODULE: ./sdk_for_node.ts



initializeSdk();

})();

exports.ArgumentError = __webpack_exports__.ArgumentError;
exports.BackgroundImageTag = __webpack_exports__.BackgroundImageTag;
exports.Binary = __webpack_exports__.Binary;
exports.ChildListTag = __webpack_exports__.ChildListTag;
exports.ClientError = __webpack_exports__.ClientError;
exports.ContentTag = __webpack_exports__.ContentTag;
exports.CurrentPage = __webpack_exports__.CurrentPage;
exports.DataConnectionError = __webpack_exports__.DataConnectionError;
exports.DataLocator = __webpack_exports__.DataLocator;
exports.Extensions = __webpack_exports__.Extensions;
exports.FutureBinary = __webpack_exports__.FutureBinary;
exports.ImageTag = __webpack_exports__.ImageTag;
exports.InPlaceEditingOff = __webpack_exports__.InPlaceEditingOff;
exports.Link = __webpack_exports__.Link;
exports.LinkTag = __webpack_exports__.LinkTag;
exports.NotFoundErrorPage = __webpack_exports__.NotFoundErrorPage;
exports.Obj = __webpack_exports__.Obj;
exports.ObjFacetValue = __webpack_exports__.ObjFacetValue;
exports.ObjSearch = __webpack_exports__.ObjSearch;
exports.RestoreInPlaceEditing = __webpack_exports__.RestoreInPlaceEditing;
exports.ScrivitoError = __webpack_exports__.ScrivitoError;
exports.Widget = __webpack_exports__.Widget;
exports.WidgetTag = __webpack_exports__.WidgetTag;
exports.canEdit = __webpack_exports__.canEdit;
exports.canWrite = __webpack_exports__.canWrite;
exports.configure = __webpack_exports__.configure;
exports.configureContentBrowser = __webpack_exports__.configureContentBrowser;
exports.configureObjClassForContentType = __webpack_exports__.configureObjClassForContentType;
exports.configurePreviewSizes = __webpack_exports__.configurePreviewSizes;
exports.connect = __webpack_exports__.connect;
exports.createObjClass = __webpack_exports__.createObjClass;
exports.createRestApiClient = __webpack_exports__.createRestApiClient;
exports.createWidgetClass = __webpack_exports__.createWidgetClass;
exports.currentEditor = __webpack_exports__.currentEditor;
exports.currentLanguage = __webpack_exports__.currentLanguage;
exports.currentPage = __webpack_exports__.currentPage;
exports.currentPageParams = __webpack_exports__.currentPageParams;
exports.currentSiteId = __webpack_exports__.currentSiteId;
exports.currentUser = __webpack_exports__.currentUser;
exports.currentWorkspace = __webpack_exports__.currentWorkspace;
exports.currentWorkspaceId = __webpack_exports__.currentWorkspaceId;
exports.editorLanguage = __webpack_exports__.editorLanguage;
exports.ensureUserIsLoggedIn = __webpack_exports__.ensureUserIsLoggedIn;
exports.extendMenu = __webpack_exports__.extendMenu;
exports.extractText = __webpack_exports__.extractText;
exports.finishLoading = __webpack_exports__.finishLoading;
exports.getClass = __webpack_exports__.getClass;
exports.getInstanceId = __webpack_exports__.getInstanceId;
exports.isComparisonActive = __webpack_exports__.isComparisonActive;
exports.isCurrentPage = __webpack_exports__.isCurrentPage;
exports.isEditorLoggedIn = __webpack_exports__.isEditorLoggedIn;
exports.isInPlaceEditingActive = __webpack_exports__.isInPlaceEditingActive;
exports.isOnCurrentPath = __webpack_exports__.isOnCurrentPath;
exports.isUserLoggedIn = __webpack_exports__.isUserLoggedIn;
exports.load = __webpack_exports__.load;
exports.logout = __webpack_exports__.logout;
exports.navigateTo = __webpack_exports__.navigateTo;
exports.openDialog = __webpack_exports__.openDialog;
exports.preload = __webpack_exports__.preload;
exports.provideAuthGroups = __webpack_exports__.provideAuthGroups;
exports.provideComponent = __webpack_exports__.provideComponent;
exports.provideDataClass = __webpack_exports__.provideDataClass;
exports.provideDataErrorComponent = __webpack_exports__.provideDataErrorComponent;
exports.provideDataItem = __webpack_exports__.provideDataItem;
exports.provideEditingConfig = __webpack_exports__.provideEditingConfig;
exports.provideLayoutComponent = __webpack_exports__.provideLayoutComponent;
exports.provideObjClass = __webpack_exports__.provideObjClass;
exports.provideWidgetClass = __webpack_exports__.provideWidgetClass;
exports.registerComponent = __webpack_exports__.registerComponent;
exports.renderPage = __webpack_exports__.renderPage;
exports.resolveHtmlUrls = __webpack_exports__.resolveHtmlUrls;
exports.setVisitorIdToken = __webpack_exports__.setVisitorIdToken;
exports.uiContext = __webpack_exports__.uiContext;
exports.unstable_selectSiteId = __webpack_exports__.unstable_selectSiteId;
exports.updateContent = __webpack_exports__.updateContent;
exports.updateMenuExtensions = __webpack_exports__.updateMenuExtensions;
exports.urlFor = __webpack_exports__.urlFor;
exports.urlForDataItem = __webpack_exports__.urlForDataItem;
exports.useAttributeDefinition = __webpack_exports__.useAttributeDefinition;
exports.useData = __webpack_exports__.useData;
exports.useDataItem = __webpack_exports__.useDataItem;
exports.useDataLocator = __webpack_exports__.useDataLocator;
exports.useDataScope = __webpack_exports__.useDataScope;
exports.useHistory = __webpack_exports__.useHistory;
exports.useResolvedHtmlValue = __webpack_exports__.useResolvedHtmlValue;
exports.useResolvedStringValue = __webpack_exports__.useResolvedStringValue;
exports.useUrlFor = __webpack_exports__.useUrlFor;
exports.validationResultsFor = __webpack_exports__.validationResultsFor;
Object.defineProperty(exports, "__esModule", { value: true });
/******/ })()
;