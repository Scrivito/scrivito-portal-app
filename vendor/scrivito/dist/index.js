/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 3617:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   r: () => (/* binding */ absoluteUrl)
/* harmony export */ });
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4066);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(urijs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5204);



function absoluteUrl(url) {
  const uri = urijs__WEBPACK_IMPORTED_MODULE_0__(url);
  if (uri.normalizeProtocol().protocol() === "data")
    return url;
  return uri.absoluteTo((0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .currentHref */ .pb)()).toString();
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
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4066);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(urijs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_browser_location__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7478);
/* harmony import */ var scrivito_sdk_app_support_change_location__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2354);
/* harmony import */ var scrivito_sdk_app_support_destination_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7550);
/* harmony import */ var scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7183);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5204);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5688);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4360);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7461);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1946);











let latestCallId = 0;
function getNextNavigateToCallId() {
  latestCallId++;
  return latestCallId;
}
function isLatestNavigateToCallId(callId) {
  return latestCallId === callId;
}
function basicNavigateTo(target, callId = getNextNavigateToCallId()) {
  (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_9__/* .failIfFrozen */ .q2)("basicNavigateTo");
  return (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_6__/* .load */ .Hh)(() => destinationForTarget(target)).then((routingTarget) => {
    if (isLatestNavigateToCallId(callId)) {
      switch (routingTarget.type) {
        case "remote":
          (0,scrivito_sdk_app_support_change_location__WEBPACK_IMPORTED_MODULE_2__/* .changeLocation */ .Uc)(routingTarget.url);
          break;
        case "local":
          navigateToResource(routingTarget.resource);
          break;
        case "crossSite":
          (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_5__/* .assignLocation */ .dT)(routingTarget.url);
          break;
        case "unavailable":
          (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_5__/* .logError */ .vV)(
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
  const obj = scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_7__/* .BasicObj */ .kI.get(objId);
  if (!obj)
    return (0,scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_4__/* .generateDestinationForId */ .yW)({ objId, query, hash });
  if ((0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_8__/* .isBinaryBasicObj */ .Xg)(obj)) {
    const blob = obj.get("blob", ["binary"]);
    if (!blob)
      return (0,scrivito_sdk_app_support_destination_types__WEBPACK_IMPORTED_MODULE_3__/* .generateDestinationUnavailable */ .c)({ objId });
    return { type: "remote", url: blob.url() };
  }
  return (0,scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_4__/* .generateDestination */ .uT)({ obj, query, hash });
}
function navigateToResource(resource) {
  const currentResource = scrivito_sdk_app_support_browser_location__WEBPACK_IMPORTED_MODULE_1__/* .get */ .Jt();
  if (resource === currentResource) {
    scrivito_sdk_app_support_browser_location__WEBPACK_IMPORTED_MODULE_1__/* .replace */ .HC(resource);
  } else {
    scrivito_sdk_app_support_browser_location__WEBPACK_IMPORTED_MODULE_1__/* .push */ .VC(resource);
  }
}
function isUrlRoutingTarget(routingTarget) {
  return !!routingTarget.url;
}
function destinationForUrl(url) {
  const uri = urijs__WEBPACK_IMPORTED_MODULE_0__(url);
  return (0,scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_4__/* .isLocalUri */ .S$)(uri) ? { type: "local", resource: uri.resource() } : { type: "remote", url };
}


/***/ }),

/***/ 5112:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ basicUrlFor),
/* harmony export */   a: () => (/* binding */ basicUrlForObj)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7183);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5204);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4360);
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
  if (target instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__/* .BasicLink */ .Re)
    return urlForLink(target, options);
  if (target instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__/* .Binary */ .yI)
    return target.url();
  return basicUrlForObj(target, options);
}
function basicUrlForObj(obj, options) {
  if ((0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_3__/* .isBinaryBasicObj */ .Xg)(obj)) {
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

/***/ 7478:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Jt: () => (/* binding */ get),
  lQ: () => (/* binding */ getHistoryChangesCount),
  GL: () => (/* binding */ getHistoryState),
  zE: () => (/* binding */ isCurrentHistoryState),
  VC: () => (/* binding */ push),
  HC: () => (/* binding */ replace),
  W6: () => (/* binding */ useHistory)
});

// UNUSED EXPORTS: createInitialHistory, reset

;// CONCATENATED MODULE: external "history"
const external_history_namespaceObject = require("history");
// EXTERNAL MODULE: external "urijs"
var external_urijs_ = __webpack_require__(4066);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(5204);
// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(1946);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/browser_location.ts





let browser_location_history;
let unlistenToHistory;
let lastAction;
function useHistory(historyToUse) {
  if (historyToUse.createHref({ pathname: "/" }) !== "/") {
    throw new common/* ArgumentError */.c1(
      `Expected a history without a preconfigured basename. For further details, see: ${(0,common/* docUrl */.yJ)("js-sdk/useHistory")}`
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
const historyChangesCountState = (0,state/* createStateContainer */.Ld)();
function isHistoryV4(historyToCheck) {
  return historyToCheck.hasOwnProperty("length");
}
(0,common/* onReset */.Nj)(browser_location_reset);


/***/ }),

/***/ 5057:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ canEditObjWithId),
/* harmony export */   p: () => (/* binding */ canEdit)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5460);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5204);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5688);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4360);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7461);






function canEdit(obj) {
  checkCanEditArguments(obj);
  return canEditObjWithId((0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__/* .unwrapAppClass */ .zo)(obj).id());
}
function canEditObjWithId(objId) {
  const ui = scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__/* .uiAdapter */ .B;
  if (!ui)
    return false;
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
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4066);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(urijs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5460);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5204);
/* harmony import */ var _routing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7183);





function redirectToUrl(url) {
  if (scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .uiAdapter */ .B)
    changeLocation(url);
  else
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .replaceLocation */ ._0)(url);
}
function changeLocation(url) {
  if (scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .uiAdapter */ .B) {
    scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .uiAdapter */ .B.navigateToExternalUrl(url);
  } else {
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .assignLocation */ .dT)(url);
  }
}
function openInNewWindow(url) {
  if (scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .uiAdapter */ .B && (0,_routing__WEBPACK_IMPORTED_MODULE_3__/* .isLocalUri */ .S$)(urijs__WEBPACK_IMPORTED_MODULE_0__(url))) {
    scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .uiAdapter */ .B.openInNewUiWindow(convertToAbsoluteLocalUrl(url));
  } else {
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .openWindow */ .D1)(url, "_blank");
  }
}
function convertToAbsoluteLocalUrl(url) {
  const origin = (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .currentOrigin */ .u4)();
  if (origin === void 0)
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .InternalError */ .Gd();
  return new urijs__WEBPACK_IMPORTED_MODULE_0__(url).origin(origin).toString();
}


/***/ }),

/***/ 349:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ getContentBrowserConfiguration),
/* harmony export */   w: () => (/* binding */ configureContentBrowser)
/* harmony export */ });
/* harmony import */ var lodash_es_mapValues__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5796);
/* harmony import */ var scrivito_sdk_app_support_absolute_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3617);
/* harmony import */ var scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5460);
/* harmony import */ var scrivito_sdk_app_support_ui_adapter_compatible_value__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7283);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5204);

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
  if (!scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .uiAdapter */ .B) {
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
      scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .uiAdapter */ .B.configureContentBrowser(
        (0,scrivito_sdk_app_support_ui_adapter_compatible_value__WEBPACK_IMPORTED_MODULE_2__/* .uiAdapterCompatibleValue */ .n)({ baseQuery })
      );
    }
  }
}
function isFilterBuilder(maybeFilterBuilder) {
  return typeof maybeFilterBuilder === "function";
}
function copyWithAbsoluteUrls(contentBrowserFilters) {
  return (0,lodash_es_mapValues__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)(contentBrowserFilters, (_a) => {
    var item = __objRest(_a, []);
    const { icon, options } = item;
    const hasCustomIcon = icon && !icon.match(/^\w+$/);
    if (icon)
      item.icon = hasCustomIcon ? (0,scrivito_sdk_app_support_absolute_url__WEBPACK_IMPORTED_MODULE_0__/* .absoluteUrl */ .r)(icon) : icon;
    if (options)
      item.options = copyWithAbsoluteUrls(options);
    return item;
  });
}
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .onReset */ .Nj)(() => {
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
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5204);
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
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5204);


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

/***/ 1048:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ currentAppSpace)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_editing_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1616);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4360);



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
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4066);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(urijs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_current_page_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5634);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5204);
/* harmony import */ var scrivito_sdk_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1091);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4360);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7461);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1946);








function currentPage() {
  var _a;
  (0,scrivito_sdk_data__WEBPACK_IMPORTED_MODULE_3__/* .assertNotUsingInMemoryTenant */ .C_)("Scrivito.currentPage");
  const page = (_a = (0,scrivito_sdk_app_support_current_page_data__WEBPACK_IMPORTED_MODULE_1__/* .getCurrentPageData */ .Vd)()) == null ? void 0 : _a.currentPage;
  return page ? (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__/* .wrapInAppClass */ .Dy)(page) : null;
}
function isCurrentPage(page) {
  var _a;
  (0,scrivito_sdk_data__WEBPACK_IMPORTED_MODULE_3__/* .assertNotUsingInMemoryTenant */ .C_)("Scrivito.isCurrentPage");
  checkIsCurrentPage(page);
  return ((_a = currentPage()) == null ? void 0 : _a.id()) === page.id();
}
function currentPageParams() {
  var _a;
  (0,scrivito_sdk_data__WEBPACK_IMPORTED_MODULE_3__/* .assertNotUsingInMemoryTenant */ .C_)("Scrivito.currentPageParams");
  return urijs__WEBPACK_IMPORTED_MODULE_0__.parseQuery(((_a = (0,scrivito_sdk_app_support_current_page_data__WEBPACK_IMPORTED_MODULE_1__/* .getCurrentRoute */ .$V)()) == null ? void 0 : _a.query) || "");
}
const currentSiteContext = new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .ContextContainer */ .hl();
const forbiddenSiteContext = new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .ContextContainer */ .hl();
function currentSiteId() {
  var _a, _b, _c, _d;
  const errorMessage = forbiddenSiteContext.current();
  if (errorMessage)
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .ScrivitoError */ .aS(errorMessage);
  const customComponentSiteId = customComponentSiteIdState.get();
  if (customComponentSiteId !== void 0)
    return customComponentSiteId;
  return (_d = (_c = currentSiteContext.current()) != null ? _c : (_b = (_a = (0,scrivito_sdk_app_support_current_page_data__WEBPACK_IMPORTED_MODULE_1__/* .getCurrentRoute */ .$V)()) == null ? void 0 : _a.siteData) == null ? void 0 : _b.siteId) != null ? _d : null;
}
function withDefaultSiteContext(fn) {
  return currentSiteContext.runWith("default", fn);
}
function withForbiddenSiteContext(message, fn) {
  return forbiddenSiteContext.runWith(message, fn);
}
const customComponentSiteIdState = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_6__/* .createStateContainer */ .Ld)();
function setCustomComponentSiteId(siteId) {
  customComponentSiteIdState.set(siteId);
}
function checkIsCurrentPage(obj) {
  if (!(0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .isWrappingBasicObj */ .mD)(obj)) {
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .throwInvalidArgumentsError */ .Ht)(
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
/* harmony export */   uR: () => (/* binding */ getNotFoundErrorPageState)
/* harmony export */ });
/* unused harmony export setNavigationStateProvider */
/* harmony import */ var scrivito_sdk_app_support_current_app_space__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1048);
/* harmony import */ var scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7183);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5204);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5688);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4360);

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
    if (!navigationState)
      return void 0;
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
  if (navigationContext.current())
    return;
  const navigationState = (_a = getCurrentPageData()) == null ? void 0 : _a.navigationState;
  if (!navigationState)
    return;
  if (!(0,scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_1__/* .isObjNotFoundRoute */ .UO)(navigationState.locationRoute))
    return;
  return navigationState;
}


/***/ }),

/***/ 7550:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ recognizeDestinationUnavailable),
/* harmony export */   c: () => (/* binding */ generateDestinationUnavailable)
/* harmony export */ });
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4066);
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

/***/ 2295:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ setEditingConfigFor),
/* harmony export */   u: () => (/* binding */ getEditingConfigFor)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5204);
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
/* harmony export */   gY: () => (/* binding */ isComparisonActive)
/* harmony export */ });
/* unused harmony exports initializeEditingContextFromBrowsingContext, setIsInPlaceEditingActive, setIsComparisonActive */
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5204);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4360);



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
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5204);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1946);



const extensionsUrl = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__/* .createStateContainer */ .Ld)();
function setExtensionsUrl(url) {
  extensionsUrl.set(url);
}
function getExtensionsUrl() {
  const url = extensionsUrl.get();
  if (url)
    return new URL(url, (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .currentOrigin */ .u4)()).toString();
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
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5204);
/* harmony import */ var scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9800);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7461);




function getClassName(subject) {
  var _a;
  if (typeof subject === "string")
    return subject;
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
/* harmony import */ var scrivito_sdk_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(853);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4360);




function getComparisonRange() {
  var _a;
  return ((_a = scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__/* .uiAdapter */ .B) == null ? void 0 : _a.comparisonRange()) || [scrivito_sdk_client__WEBPACK_IMPORTED_MODULE_1__/* .PUBLISHED_SPACE */ .M1, (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__/* .currentObjSpaceId */ .eb)()];
}


/***/ }),

/***/ 2117:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ getDetailsPageUrl)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_basic_url_for__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5112);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5204);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4360);




function getDetailsPageUrl(dataItem, siteId) {
  const dataClassName = dataItem.dataClassName();
  const detailsPage = (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__/* .getDetailsPageForDataParam */ .mM)(dataClassName, siteId);
  if (!detailsPage)
    return null;
  const query = `${(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .parameterizeDataClass */ .gi)(dataClassName)}=${dataItem.id()}`;
  return (0,scrivito_sdk_app_support_basic_url_for__WEBPACK_IMPORTED_MODULE_0__/* .basicUrlForObj */ .a)(detailsPage, { query });
}


/***/ }),

/***/ 2109:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ getEditorAuthToken)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_treat_localhost_like__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5302);
/* harmony import */ var scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5460);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5204);




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
  if (!data)
    return;
  if ("error" in data)
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .ScrivitoError */ .aS(data.error);
  return data.token;
}


/***/ }),

/***/ 9708:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ setHasComponentHandler),
/* harmony export */   I: () => (/* binding */ hasComponent)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5204);


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
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5204);
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
/* harmony import */ var lodash_es_isEmpty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1865);
/* harmony import */ var scrivito_sdk_app_support_editing_config_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2295);
/* harmony import */ var scrivito_sdk_app_support_present_ui_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7272);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5688);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4360);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7461);







function initialContentFor(className, attributeName) {
  var _a;
  const initialContent = (_a = (0,scrivito_sdk_app_support_editing_config_store__WEBPACK_IMPORTED_MODULE_0__/* .getEditingConfigFor */ .u)(className)) == null ? void 0 : _a.initialContent;
  if (initialContent) {
    const attributeContent = initialContent[attributeName];
    if (typeof attributeContent === "function") {
      return attributeContent();
    }
    if (isWidget(attributeContent)) {
      return (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__/* .wrapInAppClass */ .Dy)(attributeContent._scrivitoPrivateContent.copy());
    }
    if (isWidgetlist(attributeContent)) {
      return attributeContent.map((widget) => {
        const basicWidget = widget._scrivitoPrivateContent;
        const copy = basicWidget.copy();
        return (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__/* .wrapInAppClass */ .Dy)(copy);
      });
    }
    return attributeContent;
  }
}
function isWidgetlist(maybeWidgetlist) {
  return Array.isArray(maybeWidgetlist) && maybeWidgetlist.every(isWidget);
}
function isWidget(maybeWidget) {
  return !!maybeWidget && maybeWidget._scrivitoPrivateContent instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__/* .BasicWidget */ .$R;
}
function initializeContentForObj(objId) {
  return (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_2__/* .load */ .Hh)(() => scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__/* .BasicObj */ .kI.get(objId)).then((basicObj) => {
    if (basicObj) {
      initializeContentFor(basicObj);
      initializeContentFromHook(basicObj);
    }
  });
}
function initializeContentForWidget(objId, widgetId) {
  return (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_2__/* .load */ .Hh)(() => scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__/* .BasicObj */ .kI.get(objId)).then((basicObj) => {
    if (!basicObj)
      return;
    return (0,scrivito_sdk_app_support_present_ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .presentUiAdapter */ .H)().finishReplicatingObj((0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__/* .currentObjSpaceId */ .eb)(), objId).then(() => {
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
  const schema = (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__/* .schemaFromBasicObjOrWidget */ .e6)(basicContent);
  if (!schema)
    return;
  const initialAttributes = {};
  Object.keys(schema.attributes()).forEach((attributeName) => {
    const typeInfo = schema.attributes()[attributeName];
    const currentValue = basicContent.get(attributeName, typeInfo);
    if ((0,lodash_es_isEmpty__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)(currentValue)) {
      const initialValue = initialContentFor(objClassName, attributeName);
      if (initialValue !== void 0) {
        initialAttributes[attributeName] = initialValue;
      }
    }
  });
  const attributesWithTypeInfo = (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__/* .unwrapAppAttributes */ .OE)(
    initialAttributes,
    schema,
    objClassName
  );
  basicContent.update(attributesWithTypeInfo);
}
function initializeContentFromHook(content) {
  var _a;
  const callback = (_a = (0,scrivito_sdk_app_support_editing_config_store__WEBPACK_IMPORTED_MODULE_0__/* .getEditingConfigFor */ .u)(content.objClass())) == null ? void 0 : _a.initialize;
  if (callback)
    callback((0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_4__/* .wrapInAppClass */ .Dy)(content));
}


/***/ }),

/***/ 263:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BJ: () => (/* binding */ isLayoutEditable),
/* harmony export */   OY: () => (/* binding */ enableLayoutEditing),
/* harmony export */   _F: () => (/* binding */ wantsLayoutEditing),
/* harmony export */   m9: () => (/* binding */ isPageEditable)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5460);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1946);



const isEnabled = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__/* .createStateContainer */ .Ld)();
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
  return !!((_a = scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__/* .uiAdapter */ .B) == null ? void 0 : _a.isLayoutEditable());
}
function isPageEditable() {
  var _a;
  if (!wantsLayoutEditing())
    return true;
  return !!((_a = scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__/* .uiAdapter */ .B) == null ? void 0 : _a.isPageEditable());
}


/***/ }),

/***/ 9398:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ unmountLegacyExtension),
/* harmony export */   b: () => (/* binding */ legacyRenderExtension)
/* harmony export */ });
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5301);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5204);



let legacyExtensionElement;
function legacyRenderExtension(extension) {
  if (legacyExtensionElement) {
    react_dom__WEBPACK_IMPORTED_MODULE_0__.render(extension, legacyExtensionElement);
  } else {
    legacyExtensionElement = legacyReplaceDOMWithExtension(
      (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .getDocument */ .YE)(),
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
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .onReset */ .Nj)(() => legacyExtensionElement = void 0);


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

// EXTERNAL MODULE: ../node_modules/lodash-es/mapValues.js
var mapValues = __webpack_require__(5796);
// EXTERNAL MODULE: ../node_modules/lodash-es/pick.js + 3 modules
var pick = __webpack_require__(6913);
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
    this.patch.items[customMenuItem.id] = __spreadValues(__spreadValues(__spreadValues({}, (0,pick/* default */.A)(customMenuItem, "description", "group", "position", "title")), (0,mapValues/* default */.A)((0,pick/* default */.A)(customMenuItem, "enabled"), (v) => !!v)), iconPatch(customMenuItem.icon));
  }
  modify(menuItem) {
    this.patch.modifyItems[menuItem.id] = __spreadValues(__spreadValues(__spreadValues({}, this.patch.modifyItems[menuItem.id]), (0,pick/* default */.A)(menuItem, "group", "position", "title")), iconPatch(menuItem.icon));
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
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5204);


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
/* harmony import */ var lodash_es_isEmpty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1865);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4066);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(urijs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_basic_navigate_to__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4572);
/* harmony import */ var scrivito_sdk_app_support_url_for_data_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5164);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5204);
/* harmony import */ var scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9800);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5688);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4360);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7461);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1946);

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
    (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_8__/* .failIfFrozen */ .q2)("navigateTo");
    if (target === null)
      return;
    const navigateToOptions = getNavigateToOptions(options);
    if (target instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_4__/* .DataItem */ .sO) {
      yield navigateToDataItem(target, navigateToOptions, callId);
    } else {
      navigateToTarget(target, callId, navigateToOptions);
    }
  });
}
function navigateToTarget(target, callId, options) {
  return __async(this, null, function* () {
    try {
      const evaluatedTarget = yield (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_5__/* .load */ .Hh)(
        () => typeof target === "function" ? target() : target
      );
      const basicTarget = (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_7__/* .unwrapAppClass */ .zo)(evaluatedTarget);
      if (!isBasicTarget(basicTarget))
        return;
      return (0,scrivito_sdk_app_support_basic_navigate_to__WEBPACK_IMPORTED_MODULE_1__/* .basicNavigateTo */ .vU)(
        yield getRoutingTarget(basicTarget, options),
        callId
      );
    } catch (e) {
      if ((0,scrivito_sdk_app_support_basic_navigate_to__WEBPACK_IMPORTED_MODULE_1__/* .isLatestNavigateToCallId */ .Dn)(callId))
        (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .throwNextTick */ .JL)(e);
    }
  });
}
function navigateToDataItem(dataItem, options, callId) {
  return __async(this, null, function* () {
    const url = yield (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_5__/* .load */ .Hh)(() => (0,scrivito_sdk_app_support_url_for_data_item__WEBPACK_IMPORTED_MODULE_2__/* .urlForDataItem */ .y)(dataItem));
    if (!url)
      return;
    const uri = urijs__WEBPACK_IMPORTED_MODULE_0__(url);
    const { queryParameters } = options;
    if (queryParameters) {
      const params = new URLSearchParams(uri.query());
      Object.entries(queryParameters).forEach(([key, value]) => {
        if (params.get(key) === value) {
          throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .ArgumentError */ .c1(
            "The data ID is the same as the URL query param"
          );
        }
      });
      uri.addQuery(queryParameters);
    }
    if (options.hash)
      uri.hash(options.hash);
    return (0,scrivito_sdk_app_support_basic_navigate_to__WEBPACK_IMPORTED_MODULE_1__/* .basicNavigateTo */ .vU)({ url: uri.resource() }, callId);
  });
}
function getRoutingTarget(basicTarget, options) {
  return __async(this, null, function* () {
    const routingTarget = yield (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_5__/* .load */ .Hh)(
      () => extractRoutingTarget(basicTarget, options.queryParameters, options.hash)
    );
    if (!routingTarget) {
      throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__/* .ArgumentError */ .c1(
        "The link provided to navigateTo has no destination."
      );
    }
    return routingTarget;
  });
}
function isBasicTarget(target) {
  return target instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_6__/* .BasicObj */ .kI || target instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_6__/* .BasicLink */ .Re;
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
  if (target instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_6__/* .BasicLink */ .Re) {
    return extractRoutingTargetForLink(target, query, hash);
  }
  return { objId: target.id(), query, hash };
}
function extractRoutingTargetForLink(link, queryParameters, hashToApply) {
  if (link.isExternal())
    return { url: link.url() };
  const hash = hashToApply || link.hash();
  const query = queryParameters && !(0,lodash_es_isEmpty__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A)(queryParameters) ? queryParameters : link.queryParameters();
  const linkObj = link.obj();
  const objId = linkObj instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_6__/* .BasicObj */ .kI ? linkObj.id() : link.objId();
  return objId ? { objId, query, hash } : void 0;
}


/***/ }),

/***/ 9286:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $0: () => (/* binding */ getCurrentNavigationState)
/* harmony export */ });
/* unused harmony exports forceNavigationStateNotResponsible, setRecognizedSiteId, resetRecognizedSiteId */
/* harmony import */ var scrivito_sdk_app_support_basic_navigate_to__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4572);
/* harmony import */ var scrivito_sdk_app_support_browser_location__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7478);
/* harmony import */ var scrivito_sdk_app_support_change_location__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2354);
/* harmony import */ var scrivito_sdk_app_support_current_app_space__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1048);
/* harmony import */ var scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7183);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5204);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5688);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4360);
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
  if (typeof locationRoute === "string")
    return locationRoute;
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
  if (!route.objId)
    return route;
  const obj = (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_7__/* .getObjFrom */ .ED)(
    (0,scrivito_sdk_app_support_current_app_space__WEBPACK_IMPORTED_MODULE_3__/* .currentAppSpace */ .p)().and((0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_7__/* .restrictToSiteAndGlobal */ .y7)(route.siteData.siteId)),
    route.objId
  );
  if (!obj)
    return __spreadProps(__spreadValues({}, route), { objId: void 0 });
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
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5204);
/* harmony import */ var _ui_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5460);



function presentUiAdapter() {
  if (!_ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .uiAdapter */ .B)
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .InternalError */ .Gd();
  return _ui_adapter__WEBPACK_IMPORTED_MODULE_1__/* .uiAdapter */ .B;
}


/***/ }),

/***/ 9641:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ getPreviewSizes),
/* harmony export */   t: () => (/* binding */ configurePreviewSizes)
/* harmony export */ });
/* harmony import */ var lodash_es_uniqBy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(390);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5204);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1946);




const state = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__/* .createStateContainer */ .Ld)();
function configurePreviewSizes(previewSizes) {
  if (!previewSizes.length) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ArgumentError */ .c1(
      'No sizes has been provided for "configurePreviewSizes"'
    );
  }
  if ((0,lodash_es_uniqBy__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(previewSizes, "width").length !== previewSizes.length) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ArgumentError */ .c1('A "width" must be unique for sizes');
  }
  if (!previewSizes.every(validatePreviewSizeWidth)) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ArgumentError */ .c1('A "width" must be a positive integer');
  }
  state.set(previewSizes);
}
function validatePreviewSizeWidth(previewSize) {
  const width = previewSize == null ? void 0 : previewSize.width;
  if (!width)
    return true;
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
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5204);
/* harmony import */ var scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9800);
/* harmony import */ var scrivito_sdk_link_resolution__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(248);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4360);

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
  if (!obj)
    return (0,scrivito_sdk_app_support_routing__WEBPACK_IMPORTED_MODULE_2__/* .generateUrl */ .Jv)({ objId, query, hash });
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
  Jv: () => (/* binding */ generateUrl),
  xu: () => (/* binding */ generateUrlWithCanonicalOrigin),
  VJ: () => (/* binding */ initRouting),
  hZ: () => (/* binding */ isDestinationUnavailableRecognized),
  S$: () => (/* binding */ isLocalUri),
  tV: () => (/* binding */ isNotResponsibleRoute),
  UO: () => (/* binding */ isObjNotFoundRoute),
  vA: () => (/* binding */ recognize)
});

// UNUSED EXPORTS: generateLocalPath

// EXTERNAL MODULE: external "urijs"
var external_urijs_ = __webpack_require__(4066);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_page_data.ts
var current_page_data = __webpack_require__(5634);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/destination_types.ts
var destination_types = __webpack_require__(7550);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(5204);
// EXTERNAL MODULE: ./scrivito_sdk/data/index.ts + 29 modules
var data = __webpack_require__(1091);
// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 29 modules
var loadable = __webpack_require__(5688);
// EXTERNAL MODULE: ./scrivito_sdk/models/index.ts + 44 modules
var models = __webpack_require__(4360);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/permalink_cache.ts





let cache = {};
let cacheContentStateId;
const cacheDisabled = new common/* ContextContainer */.hl();
function cacheObjForPermalink(obj, permalink, siteId) {
  if (cacheDisabled.current())
    return;
  if (!(0,common/* equals */.aI)(obj.objSpaceId(), (0,models/* currentObjSpaceId */.eb)())) {
    throw new common/* InternalError */.Gd();
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
    return usesOldStyleRouting(siteId) ? (_a = (0,homepage_callback/* homepageFromCallback */.Q)()) == null ? void 0 : _a.id() : (_b = (0,models/* getRootObjFrom */.Mp)((0,current_app_space/* currentAppSpace */.p)().and((0,models/* restrictToSite */.rs)(siteId)))) == null ? void 0 : _b.id();
  }
  return (_d = extractObjIdFromPath(path)) != null ? _d : (_c = recognizePermalink(path, siteId)) == null ? void 0 : _c.id();
}
function generatePermalinkPath(obj, siteId) {
  if (obj.isDeleted())
    return;
  const permalink = obj.permalink();
  if (!permalink)
    return;
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
  if (objId)
    return (_a = (0,models/* getObjFrom */.ED)(scope, objId)) != null ? _a : void 0;
  if (usesUnstableMultiSiteModeForSite(siteId)) {
    return (0,unstable_multi_site_mode/* recognizeUnstableMultiSitePermalink */.mu)(path, scope);
  }
  return (_b = (0,models/* getObjBy */.Z0)(scope, "_permalink", path)) != null ? _b : void 0;
}
function isHomepage(obj, siteId) {
  if (!usesOldStyleRouting(siteId))
    return obj.path() === "/";
  const homepage = (0,loadable/* loadableWithDefault */.s4)(null, homepage_callback/* homepageFromCallback */.Q);
  return homepage && homepage.id() === obj.id();
}
function generateSlug(basicObj) {
  const obj = (0,realm/* wrapInAppClass */.Dy)(basicObj);
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
  return (currentRoute == null ? void 0 : currentRoute.sitePath) || uri.origin() === (0,common/* currentOrigin */.u4)() ? { type: "local", resource: uri.resource() } : { type: "crossSite", url: uri.toString() };
}
function generateUrlWithCanonicalOrigin(options) {
  var _a, _b, _c, _d;
  const siteId = (_c = options.obj.siteId()) != null ? _c : (_b = (_a = (0,current_page_data/* getCurrentRoute */.$V)()) == null ? void 0 : _a.siteData) == null ? void 0 : _b.siteId;
  if (!siteId)
    return unavailableFor(options).fallbackUrl;
  return (_d = canonicalUrlForSite(siteId, options)) != null ? _d : unavailableFor(options).fallbackUrl;
}
function canonicalUrlForSite(siteId, options) {
  const baseUrl = (0,site_mapping/* baseUrlForSite */.ne)(siteId);
  return baseUrl && joinUri(
    baseUrl,
    generateRoutingPath(options.obj, siteId),
    options
  ).toString();
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
  const uri = joinUri(currentRoute.siteData.baseUrl, `/${objId}`, options);
  return currentRoute.sitePath || uri.origin() === (0,common/* currentOrigin */.u4)() ? { type: "local", resource: uri.resource() } : { type: "crossSite", url: uri.toString() };
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
  const destinationUnavailable = (0,destination_types/* recognizeDestinationUnavailable */.R)(uri);
  if (destinationUnavailable) {
    const { objId, query: query2 } = destinationUnavailable;
    return {
      objId,
      sitePath: null,
      query: query2
    };
  }
  const recognized = (0,site_mapping/* recognizeSiteAndPath */.y1)(uri);
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
function isLocalUri(uri) {
  return uri.is("relative") || uri.origin() === (0,common/* currentOrigin */.u4)();
}


/***/ }),

/***/ 827:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ homepageFromCallback),
/* harmony export */   m: () => (/* binding */ setHomepageCallback)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_current_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7639);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5204);



let homepageCallback;
function setHomepageCallback(callback) {
  homepageCallback = callback;
}
function homepageFromCallback() {
  if (!homepageCallback)
    return null;
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
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5204);


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

/***/ 3648:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  a: () => (/* binding */ registerScrollTarget),
  R: () => (/* binding */ scrollIntoView)
});

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(5204);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/navigation_state.ts
var navigation_state = __webpack_require__(9286);
// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 29 modules
var loadable = __webpack_require__(5688);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/get_current_page_id.ts



function getCurrentPageId() {
  return (0,loadable/* loadableWithDefault */.s4)(
    void 0,
    () => {
      var _a, _b;
      return (_b = (_a = (0,navigation_state/* getCurrentNavigationState */.$0)()) == null ? void 0 : _a.locationRoute) == null ? void 0 : _b.objId;
    }
  );
}

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/scroll_into_view.ts



function registerScrollTarget(targetId, element, onReveal) {
  const targetKey = keyFor(targetId);
  const id = (0,common/* randomHex */.nw)();
  const reveal = () => {
    (0,common/* scrollElementIntoView */.hT)(element, {
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
(0,common/* onReset */.Nj)(() => {
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
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4066);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(urijs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_current_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7639);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5204);




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
        const origin = (_b = (_a2 = config.origin) != null ? _a2 : (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .currentOrigin */ .u4)()) != null ? _b : throwNoOrigin();
        baseUrl = `${origin}/${basePath.replace(/^\/+/, "")}`;
      }
      return baseUrl;
    }
  };
  siteForUrlCallback = (url) => {
    const uri = new urijs__WEBPACK_IMPORTED_MODULE_0__(url);
    const origin = uri.origin();
    if (origin !== config.origin && origin !== (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .currentOrigin */ .u4)())
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
  return {
    siteData: { siteId: result.siteId, baseUrl: result.baseUrl },
    sitePath: determineSitePath(result.baseUrl, url)
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
    normalizedUrl.origin((_a = (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .currentOrigin */ .u4)()) != null ? _a : throwNoOrigin());
  }
  normalizedUrl.normalizePath();
  return normalizedUrl;
}
function siteForUrl(url) {
  const result = (0,scrivito_sdk_app_support_current_page__WEBPACK_IMPORTED_MODULE_1__/* .withForbiddenSiteContext */ .wj)(
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
  return new urijs__WEBPACK_IMPORTED_MODULE_0__(url).query("").hash("").href();
}
function removeTrailingSlashes(input) {
  return input.replace(/([^/]|^)\/+$/, "$1");
}
function reportUnexpectedReturnValue(callbackName, actual, expectedType) {
  const errorMessage = `Unexpected return value from ${callbackName}: got ${(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .prettyPrint */ .aO)(
    actual
  )}, expected type ${expectedType}. ${SEE_CONFIGURE}`;
  (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .throwNextTick */ .JL)(new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .ArgumentError */ .c1(errorMessage));
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
  throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .ScrivitoError */ .aS(
    "Cannot use routing before Scrivito.configure was called."
  );
}
function throwNoOrigin() {
  throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .ScrivitoError */ .aS(
    `Cannot compute an absolute URL without a configured origin or base URL. ${SEE_CONFIGURE}`
  );
}
function isSiteForUrlResult(maybeSiteForUrlResult) {
  const siteForUrlResult = maybeSiteForUrlResult;
  if (siteForUrlResult === void 0)
    return true;
  return typeof (siteForUrlResult == null ? void 0 : siteForUrlResult.siteId) === "string" && typeof (siteForUrlResult == null ? void 0 : siteForUrlResult.baseUrl) === "string";
}
const SEE_CONFIGURE = `Visit ${(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .docUrl */ .yJ)(
  "js-sdk/configure"
)} for more information.`;
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__/* .onReset */ .Nj)(reset);


/***/ }),

/***/ 5302:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ setTreatLocalhostLike),
/* harmony export */   d: () => (/* binding */ getTreatLocalhostLike)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5204);


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
/* harmony export */   B: () => (/* binding */ uiAdapter)
/* harmony export */ });
/* unused harmony export setUiAdapter */
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5204);


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
/* harmony import */ var lodash_es_isDate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9231);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4360);

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
      if ((0,lodash_es_isDate__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(value))
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
  return v._scrivitoPrivateContent instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_0__/* .BasicObjSearch */ .Ei;
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
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5204);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5688);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4360);
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
    if (obj)
      return getSiteIdForObj(obj);
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
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5204);
/* harmony import */ var scrivito_sdk_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1091);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4360);
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

/***/ 5164:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ urlForDataItem)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_app_support_current_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7639);
/* harmony import */ var scrivito_sdk_app_support_get_details_page_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2117);
/* harmony import */ var scrivito_sdk_app_support_has_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9708);
/* harmony import */ var scrivito_sdk_app_support_url_for__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9857);
/* harmony import */ var scrivito_sdk_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1091);






function urlForDataItem(dataItem) {
  (0,scrivito_sdk_data__WEBPACK_IMPORTED_MODULE_4__/* .assertNotUsingInMemoryTenant */ .C_)("Scrivito.urlForDataItem");
  const obj = dataItem.obj();
  const siteId = (0,scrivito_sdk_app_support_current_page__WEBPACK_IMPORTED_MODULE_0__/* .currentSiteId */ .OI)();
  if (obj) {
    if ((0,scrivito_sdk_app_support_has_component__WEBPACK_IMPORTED_MODULE_2__/* .hasComponent */ .I)(dataItem.dataClassName()) || obj.isBinary()) {
      return (0,scrivito_sdk_app_support_url_for__WEBPACK_IMPORTED_MODULE_3__/* .urlFor */ .d)(obj);
    }
    return (0,scrivito_sdk_app_support_get_details_page_url__WEBPACK_IMPORTED_MODULE_1__/* .getDetailsPageUrl */ .p)(dataItem, obj.siteId() || siteId);
  }
  return siteId ? (0,scrivito_sdk_app_support_get_details_page_url__WEBPACK_IMPORTED_MODULE_1__/* .getDetailsPageUrl */ .p)(dataItem, siteId) : null;
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

/***/ 2577:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  fG: () => (/* reexport */ adapter_description_GET),
  JV: () => (/* reexport */ adapter_description_SEND),
  dY: () => (/* reexport */ adapter_description_STREAM),
  Mf: () => (/* reexport */ createAdapterConnection),
  KA: () => (/* reexport */ linkViaPort),
  UK: () => (/* reexport */ startAdapterMessageServer)
});

// UNUSED EXPORTS: RemoteAdapterError, anticipatedMessageLink, connectTo, createAdapterClient, createAdapterMessageClient, createAdapterProxy, postMessageLinkFor, wrapWithLogging

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(5204);
// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 29 modules
var loadable = __webpack_require__(5688);
// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(1946);
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
        const data = createLoadableData({
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
        return (0,loadable/* loadAndObserve */.eX)(() => method.call(adapter, ...params));
      }
      if (methodType === adapter_description_STREAM) {
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
      if (error instanceof common/* EndOfStreamError */.d1) {
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

/***/ 853:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  MZ: () => (/* reexport */ ClientError),
  HY: () => (/* reexport */ EMPTY_SPACE),
  hm: () => (/* reexport */ JrRestApi),
  M1: () => (/* reexport */ PUBLISHED_SPACE),
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
  yd: () => (/* reexport */ retrieveObj),
  If: () => (/* reexport */ setLoggedInIndicatorParam),
  bj: () => (/* reexport */ useDefaultPriority),
  Yy: () => (/* reexport */ withEachAttributeJson)
});

// UNUSED EXPORTS: ApiClient, DEFAULT_OP_CODES, MissingWorkspaceError, OP_CODES, RELATIONAL_OPERATOR_FILTER_OP_CODES, fetchBrowserToken, injectBrowserToken, isComparisonRange, isDataLocatorOperatorCode, isDataLocatorValueFilter, isObjSpaceId, objSpaceIdsEqual, replaceCmsRetrieval, retrieveObjFieldDiffs, setIdentityProvider, setupRegisterVerificator

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
  if (!options)
    return;
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
    const mergedOptions = __spreadValues(__spreadValues({}, this.options), options);
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

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(5204);
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

;// CONCATENATED MODULE: ./scrivito_sdk/client/is_error_response.ts


function isErrorResponse(parsedResponse) {
  if (!(0,common/* isObject */.Gv)(parsedResponse))
    return false;
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
    const responseText = yield (0,common/* registerAsyncTask */.lK)(() => response.text());
    if (httpStatus >= 400 && httpStatus < 500) {
      const {
        message: originalMessage,
        code,
        details
      } = parseErrorResponse(responseText);
      const message2 = (0,common/* uniqueErrorMessage */.hf)(originalMessage);
      if (httpStatus === 403)
        throw new AccessDeniedError(message2, code, details);
      throw new ClientError(message2, code, details, httpStatus);
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

;// CONCATENATED MODULE: ./scrivito_sdk/client/join_paths.ts

function joinPaths(startPath, endPath) {
  if (endPath === "")
    return startPath;
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
    (0,common/* assignLocation */.dT)(yield authenticationUrl(visit));
    return (0,common/* never */.Zm)();
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
      throw new common/* InternalError */.Gd();
    authUrl = authUrl.replace("$JR_API_LOCATION/iam/auth", iamAuthLocation);
    if (!identityProvider)
      return authUrl;
    const authUrlWithIdp = new URL(authUrl);
    authUrlWithIdp.searchParams.set("idp", identityProvider);
    return authUrlWithIdp.toString();
  });
}
function returnToUrl() {
  const url = new URL((0,common/* currentHref */.pb)());
  if (loggedInParamName)
    url.searchParams.set(loggedInParamName, "");
  return url.toString();
}
(0,common/* onReset */.Nj)(() => {
  identityProvider = void 0;
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
    authViaAccount,
    authViaInstance
  } = {}) {
    var _a;
    const method = (_a = verb == null ? void 0 : verb.toUpperCase()) != null ? _a : "GET";
    const config = yield clientConfig.fetch();
    const handler = loginHandler != null ? loginHandler : config.loginHandler === "redirect" ? loginRedirectHandler : void 0;
    const authProvider = getTokenProvider(create_rest_api_client_spreadValues(create_rest_api_client_spreadValues({
      audience: audience || new URL(url).origin
    }, authViaAccount && { authViaAccount }), authViaInstance && { authViaInstance }));
    return withLoginHandler(
      handler,
      () => fetchJson(url, { data, authProvider, headers, params, method })
    );
  });
}

;// CONCATENATED MODULE: ./scrivito_sdk/client/get_client_version.ts


function getClientVersion() {
  const clientVersion = "jssdk/1.29.0-dev-1-gf1d807accd93";
  if (!clientVersion)
    throw new common/* InternalError */.Gd();
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
  if (!verification)
    return;
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
    this.initDeferred = new common/* Deferred */.cY();
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
        throw new common/* InternalError */.Gd("Unexpected CMS backend access.");
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
          yield (0,common/* wait */.uk)(2);
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
        throw new common/* InternalError */.Gd();
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
(0,common/* onReset */.Nj)(resetCmsRestApi);

;// CONCATENATED MODULE: ./scrivito_sdk/client/request_failed_error.ts


class RequestFailedError extends common/* ScrivitoError */.aS {
  constructor(message, details) {
    super(message);
    this.details = details;
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


const PUBLISHED_SPACE = ["workspace", "published"];
const EMPTY_SPACE = ["empty"];
function getWorkspaceId(spaceId) {
  if (!isWorkspaceObjSpaceId(spaceId))
    throw new common/* InternalError */.Gd();
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




const batchRetrieval = new common/* BatchRetrieval */.vL(
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
      throw new common/* InternalError */.Gd();
    return joinPaths(iamAuthLocation, path);
  });
}
const JrRestApi = createRestApiClient("https://api.justrelate.com");

;// CONCATENATED MODULE: ./scrivito_sdk/client/config.ts


const clientConfig = new common/* ConfigStore */.s9();

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
  if (cachedProvider)
    return cachedProvider;
  const newProvider = new TokenAuthorizationProvider(() => token_manager_async(this, null, function* () {
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
  if (!isExistentObjJson(objJson))
    return;
  Object.keys(objJson).forEach((attrName) => {
    if (!(0,common/* isSystemAttribute */.iI)(attrName)) {
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
        if ((0,common/* isSystemAttribute */.iI)(widgetAttrName))
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

/***/ 5204:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  c1: () => (/* reexport */ ArgumentError),
  Oh: () => (/* reexport */ AsyncTaskTracker),
  vL: () => (/* reexport */ BatchRetrieval),
  s9: () => (/* reexport */ ConfigStore),
  hl: () => (/* reexport */ ContextContainer),
  cY: () => (/* reexport */ deferred_Deferred),
  l6: () => (/* reexport */ EmptyContinueIterable),
  d1: () => (/* reexport */ EndOfStreamError),
  Gd: () => (/* reexport */ InternalError),
  aS: () => (/* reexport */ ScrivitoError),
  RE: () => (/* reexport */ streamable_Streamable),
  B7: () => (/* reexport */ Subject),
  fk: () => (/* reexport */ TransIterator),
  dT: () => (/* reexport */ assignLocation),
  W3: () => (/* reexport */ assumePresence),
  xQ: () => (/* reexport */ camelCase),
  IH: () => (/* reexport */ cdnAssetUrlBase),
  H5: () => (/* reexport */ clickPositionWithinElement),
  Lu: () => (/* reexport */ collectAndSchedule),
  OV: () => (/* reexport */ collectInListAndSchedule),
  FQ: () => (/* reexport */ computeAncestorPaths),
  xn: () => (/* reexport */ computeCacheKey),
  pb: () => (/* reexport */ currentHref),
  u4: () => (/* reexport */ currentOrigin),
  uS: () => (/* reexport */ deserializeAsDate),
  w0: () => (/* reexport */ deserializeAsInteger),
  Y5: () => (/* reexport */ devicePixelRatio),
  yJ: () => (/* reexport */ docUrl),
  cZ: () => (/* reexport */ ensureUrlHasProtocol),
  aI: () => (/* reexport */ equals),
  uw: () => (/* reexport */ equalsBestEffort),
  _Q: () => (/* reexport */ extractFromIterator),
  PX: () => (/* reexport */ extractTitleAndDescription),
  lT: () => (/* reexport */ fetchConfiguredTenant),
  A: () => (/* reexport */ formatDateToString),
  Ly: () => (/* reexport */ getConfiguredTenant),
  YE: () => (/* reexport */ getDocument),
  zM: () => (/* reexport */ getFromLocalStorage),
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
  Gv: () => (/* reexport */ is_object_isObject),
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
  Nj: () => (/* reexport */ onReset),
  D1: () => (/* reexport */ openWindow),
  BA: () => (/* reexport */ window_proxy_pageXOffset),
  kA: () => (/* reexport */ window_proxy_pageYOffset),
  gi: () => (/* reexport */ parameterizeDataClass),
  Qf: () => (/* reexport */ parseStringToDate),
  aO: () => (/* reexport */ prettyPrint),
  Qk: () => (/* reexport */ promiseAndFinally),
  Pi: () => (/* reexport */ propsAreEqual),
  M4: () => (/* reexport */ pruneString),
  nw: () => (/* reexport */ randomHex),
  zE: () => (/* reexport */ randomId),
  lK: () => (/* reexport */ registerAsyncTask),
  yQ: () => (/* reexport */ reload),
  n5: () => (/* reexport */ removeFromLocalStorage),
  K5: () => (/* reexport */ renameTo),
  G$: () => (/* reexport */ replaceHistoryState),
  _0: () => (/* reexport */ replaceLocation),
  Bd: () => (/* reexport */ runAndCatchException),
  nj: () => (/* reexport */ screen),
  hT: () => (/* reexport */ scrollElementIntoView),
  VG: () => (/* reexport */ scrollTo),
  o3: () => (/* reexport */ sentenceCase),
  rK: () => (/* reexport */ setConfiguredTenant),
  Yz: () => (/* reexport */ setInLocalStorage),
  yb: () => (/* reexport */ setIntervalAndTrackId),
  cN: () => (/* reexport */ setOriginProvider),
  wg: () => (/* reexport */ setTimeoutAndTrackId),
  nF: () => (/* reexport */ throttle_throttle),
  Ht: () => (/* reexport */ throwInvalidArgumentsError),
  JL: () => (/* reexport */ throwNextTick),
  YB: () => (/* reexport */ transformContinueIterable),
  YY: () => (/* reexport */ tryGetConfiguredTenant),
  z9: () => (/* reexport */ underscore),
  hf: () => (/* reexport */ uniqueErrorMessage),
  uk: () => (/* reexport */ wait),
  Cu: () => (/* reexport */ waitMs)
});

// UNUSED EXPORTS: BehaviorSubject, anticipatedStream, appUrlFromPackagedUiUrl, classify, cleanUniqueErrorMessage, currentHash, detectUniqueErrorMessage, enableUniqueErrors, fetchMaybeTenant, getChildPath, hasTenantConfigurationBeenSet, isConfiguredWithoutTenant, isLocalhostUrl, isUnderscore, resetConfiguredTenant, setNextTickScheduler, setRegisterAsyncTaskHandler, sliceFromIterable, windowLocationOrigin

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

// EXTERNAL MODULE: external "urijs"
var external_urijs_ = __webpack_require__(4066);
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
var isObjectLike = __webpack_require__(4146);
// EXTERNAL MODULE: ../node_modules/lodash-es/_baseGetTag.js + 2 modules
var _baseGetTag = __webpack_require__(5583);
// EXTERNAL MODULE: ../node_modules/lodash-es/_getPrototype.js
var _getPrototype = __webpack_require__(7815);
;// CONCATENATED MODULE: ../node_modules/lodash-es/isPlainObject.js




var objectTag = "[object Object]";
var funcProto = Function.prototype, objectProto = Object.prototype;
var funcToString = funcProto.toString;
var isPlainObject_hasOwnProperty = objectProto.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function isPlainObject(value) {
  if (!(0,isObjectLike/* default */.A)(value) || (0,_baseGetTag/* default */.A)(value) != objectTag) {
    return false;
  }
  var proto = (0,_getPrototype/* default */.A)(value);
  if (proto === null) {
    return true;
  }
  var Ctor = isPlainObject_hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
/* harmony default export */ const lodash_es_isPlainObject = (isPlainObject);

;// CONCATENATED MODULE: ../node_modules/lodash-es/isElement.js



function isElement(value) {
  return (0,isObjectLike/* default */.A)(value) && value.nodeType === 1 && !lodash_es_isPlainObject(value);
}
/* harmony default export */ const lodash_es_isElement = (isElement);

;// CONCATENATED MODULE: ./scrivito_sdk/common/pretty_print.ts



function prettyPrint(input) {
  try {
    if (typeof input === "function") {
      return printFunction(input);
    }
    if (is_object_isObject(input)) {
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
  const version = "1.29.0-dev-1-gf1d807accd93";
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
var debounce = __webpack_require__(8783);
// EXTERNAL MODULE: ../node_modules/lodash-es/isObject.js
var isObject = __webpack_require__(5221);
;// CONCATENATED MODULE: ../node_modules/lodash-es/throttle.js



var FUNC_ERROR_TEXT = "Expected a function";
function throttle(func, wait, options) {
  var leading = true, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if ((0,isObject/* default */.A)(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return (0,debounce/* default */.A)(func, wait, {
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
var isEmpty = __webpack_require__(1865);
;// CONCATENATED MODULE: ./scrivito_sdk/common/is_empty_value.ts


function isEmptyValue(value) {
  return value === null || (typeof value === "string" || Array.isArray(value)) && (0,isEmpty/* default */.A)(value);
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

;// CONCATENATED MODULE: ./scrivito_sdk/common/is_object.ts

function is_object_isObject(arg) {
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
      if (!this.onDone)
        this.onDone = new deferred_Deferred();
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
      if (this.onDone)
        yield this.onDone;
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
  return is_object_isObject(subject) && "_scrivitoPrivateContent" in subject && subject._scrivitoPrivateContent instanceof basicClass;
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/is_blob.ts


function isBlob(subject) {
  return is_object_isObject(subject) && "size" in subject && typeof subject.size === "number" && "type" in subject && typeof subject.type === "string";
}
function isFile(subject) {
  return isBlob(subject) && "name" in subject && typeof subject.name === "string";
}

;// CONCATENATED MODULE: ./scrivito_sdk/common/index.ts

































































/***/ }),

/***/ 1091:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  gD: () => (/* reexport */ FacetQuery),
  hQ: () => (/* reexport */ IN_MEMORY_TENANT),
  O2: () => (/* reexport */ IdBatchCollection),
  UX: () => (/* reexport */ IdBatchQuery),
  sX: () => (/* reexport */ ObjBackendReplication),
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
  ZA: () => (/* reexport */ suggest),
  Zt: () => (/* reexport */ trackContentStateId),
  le: () => (/* reexport */ updateContent),
  mG: () => (/* reexport */ useInMemoryTenant),
  B5: () => (/* reexport */ useReplicationStrategy)
});

// UNUSED EXPORTS: ObjData, ObjStreamReplication, REMOVE_THIS_KEY, ReplicationCache, clearObjDataCache, createObjReplicationProcess, diffObjJson, diffWidgetJson, hasObjContentDiff, isAttributeModified, setContentUpdateHandler, setObjStreamReplicationEndpoint

// EXTERNAL MODULE: ./scrivito_sdk/client/index.ts + 38 modules
var client = __webpack_require__(853);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(5204);
// EXTERNAL MODULE: ../node_modules/lodash-es/difference.js + 1 modules
var difference = __webpack_require__(5435);
// EXTERNAL MODULE: ../node_modules/lodash-es/isEmpty.js
var isEmpty = __webpack_require__(1865);
// EXTERNAL MODULE: ../node_modules/lodash-es/isEqual.js
var lodash_es_isEqual = __webpack_require__(1900);
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
  return !(0,common/* isSystemAttribute */.iI)(attributeName) || attributeName === "_obj_class";
}
function eachKeyFrom(objectA, objectB, handler) {
  const keysOfA = Object.keys(objectA);
  const keysOfB = Object.keys(objectB);
  const keysOfAOnly = (0,difference/* default */.A)(keysOfA, keysOfB);
  keysOfAOnly.forEach((key) => {
    handler(key, objectA[key], objectB[key], false);
  });
  keysOfB.forEach((key) => {
    handler(key, objectA[key], objectB[key], true);
  });
}
function buildUpdatedWidgetPool(widgetPool, widgetPoolPatch) {
  if (!widgetPoolPatch || (0,isEmpty/* default */.A)(widgetPoolPatch))
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
      if (!(0,isEmpty/* default */.A)(widgetPatch))
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
      if (!(0,isEmpty/* default */.A)(widgetPoolPatch)) {
        patch._widget_pool = widgetPoolPatch;
      }
    } else {
      const patchValue = buildPatchEntry(valueInA, valueInB, () => {
        if (!(0,lodash_es_isEqual/* default */.A)(valueInA, valueInB))
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
  if (constraint.current())
    throw new common/* InternalError */.Gd(message);
}
function runWithPerformanceConstraint(fn) {
  return constraint.runWith(true, fn);
}

// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 29 modules
var loadable = __webpack_require__(5688);
// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(1946);
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
    loader: () => __async(void 0, null, function* () {
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
    if (!(0,client/* isExistentObjJson */.MV)(baseObjJson))
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
    if ((0,common/* isSystemAttribute */.iI)(key))
      return this.getAttributeWithoutWidgetData(key);
    if (!this.ensureAvailable())
      return;
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
    (0,state/* failIfFrozen */.q2)("Changing CMS content");
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
  constructor(workspaceId, contentState) {
    this.workspaceId = workspaceId;
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
      if (this.updating)
        return this.updating;
      const from = this.getContentStateId();
      if (!from)
        return;
      this.updating = (0,common/* promiseAndFinally */.Qk)(
        (0,client/* getWorkspaceChanges */.X5)(this.workspaceId, from).then(
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
      const objId = (0,client/* isUnavailableObjJson */.a8)(json) ? json._deleted : json._id;
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
      const response = yield (0,client/* getWorkspaceChanges */.X5)(this.workspaceId);
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
  if ((0,client/* isEmptySpaceId */.dQ)(objSpaceId))
    return "";
  const workspaceId = (0,client/* getWorkspaceId */.LD)(objSpaceId);
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
  if (!(0,isEmpty/* default */.A)(query)) {
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
  if (!(0,client/* isWorkspaceObjSpaceId */.Qk)(objSpaceId))
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
    if ((0,common/* isSystemAttribute */.iI)(attributeName))
      return false;
    const attributeJson = jsonValue;
    if (!(0,client/* isWidgetAttributeJson */.Xj)(attributeJson) && !(0,client/* isWidgetlistAttributeJson */.zt)(attributeJson)) {
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
  (0,loadable/* load */.Hh)(() => obj_data_store_getObjData(objSpaceId, objId));
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
  return (0,loadable/* withoutLoading */.J6)(
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
    this.performThrottledReplication = (0,common/* throttle */.nF)(
      () => this.performReplication(),
      1e3
    );
  }
  start() {
    (0,client/* retrieveObj */.yd)(this.objSpaceId, this.objId, "full").then((data) => {
      (0,state/* addBatchUpdate */.Rs)(() => {
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
        if ((0,client/* isUnavailableObjJson */.a8)(newBackendState)) {
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
      return (0,isEmpty/* default */.A)(patch) ? (
        // bang:
        // given the localState is not blank, the diff may be empty only if the
        // backendState is similar (equal?) to the localState, i.e. not blank
        Promise.resolve(this.backendState)
      ) : this.replicatePatchToBackend(patch);
    });
  }
  replicatePatchToBackend(patch) {
    const id = (0,client/* getWorkspaceId */.LD)(this.objSpaceId);
    if (id === "published")
      throw new common/* InternalError */.Gd();
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
  return (0,isEmpty/* default */.A)(obj_patch_diffObjJson(stateA, stateB));
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
    if (index === 0)
      return this.loadBatch(params, void 0, batchSize);
    const previousBatch = this.getBatch(params, batchSize, index - 1);
    return (0,loadable/* load */.Hh)(() => previousBatch.continuationForNextBatch()).then(
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
    if (offset && offset > 0)
      throwNotSupported("offset");
    if (orderBy && orderBy.length > 0)
      throwNotSupported("order");
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
    if (operator !== "equals")
      throwNotSupported(`operator ${operator}`);
    if (typeof field !== "string")
      throwNotSupported("multiple fields");
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
    if (Array.isArray(value))
      value = value[0];
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
  if ((0,client/* isEmptySpaceId */.dQ)(objSpaceId))
    return 0;
  return (_a = batchCollection.getQueryCount([objSpaceId, params])) != null ? _a : 0;
}
function getObjQuery(objSpaceId, params, batchSize) {
  assertNotUsingInMemoryTenant("Search API");
  if ((0,client/* isEmptySpaceId */.dQ)(objSpaceId))
    return new common/* EmptyContinueIterable */.l6();
  const idQuery = new IdBatchQuery(
    (batchNumber) => batchCollection.getBatch([objSpaceId, params], batchSize, batchNumber)
  );
  return (0,common/* transformContinueIterable */.YB)(
    idQuery,
    (iterator) => iterator.map((id) => obj_data_store_getObjData(objSpaceId, id)).takeWhile(common/* isPresent */.Wo).filter((objData) => !objData.isUnavailable())
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
  const workspaceId = (0,client/* getWorkspaceId */.LD)(objSpaceId);
  return client/* cmsRetrieval */.g2.retrieveObjQuery(workspaceId, requestParams).then((response) => {
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





const obj_field_diffs_data_loadableCollection = (0,loadable/* createLoadableCollection */.rL)({
  loadElement: ([from, to, objId]) => ({
    loader: () => client/* cmsRetrieval */.g2.retrieveObjFieldDiffs(from, to, objId),
    invalidation: () => `${getVersion(from, objId)}:${getVersion(to, objId)}`
  })
});
function getFieldDiff(from, to, attributeName, objId, widgetId) {
  const fieldDiffs = getFieldDiffs(from, to, objId, widgetId);
  const typeAndDiff = fieldDiffs[(0,common/* underscore */.z9)(attributeName)];
  if (!typeAndDiff)
    return null;
  return typeAndDiff[1];
}
function getFieldDiffs(from, to, objId, widgetId) {
  if ((0,common/* equals */.aI)(from, to))
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

/***/ 3664:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ throwMissingCallbackError),
/* harmony export */   j: () => (/* binding */ addMissingDataConnectionHandlers)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5204);


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
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ScrivitoError */ .aS(
      `No ${callbackName} callback defined for data class "${dataClass}"`
    );
  };
}


/***/ }),

/***/ 1514:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ setCurrentLanguageHandler),
/* harmony export */   a: () => (/* binding */ currentLanguage)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5204);


let currentLanguageHandler;
function currentLanguage() {
  if (!currentLanguageHandler) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .InternalError */ .Gd();
  }
  return currentLanguageHandler();
}
function setCurrentLanguageHandler(func) {
  currentLanguageHandler = func;
}


/***/ }),

/***/ 3561:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ir: () => (/* binding */ deserializeDataAttribute),
/* harmony export */   VB: () => (/* binding */ serializeDataAttribute),
/* harmony export */   y8: () => (/* binding */ isReferenceAttributeConfig)
/* harmony export */ });
/* harmony import */ var lodash_es_isDate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9231);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5204);
/* harmony import */ var scrivito_sdk_data_integration_data_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8001);
/* harmony import */ var scrivito_sdk_data_integration_data_class_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(135);
/* harmony import */ var scrivito_sdk_data_integration_data_id__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5596);
/* harmony import */ var scrivito_sdk_data_integration_get_data_class__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(512);







const serializers = {
  boolean: serializeBooleanAttribute,
  date: serializeDateAttribute,
  enum: serializeEnumAttribute,
  number: serializeNumberAttribute,
  reference: serializeReferenceAttribute,
  string: serializeStringAttribute
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
    return serializer(dataClassName, attributeName, value, attributeDefinition);
  }
  return value != null ? value : null;
}
function deserializeDataAttribute({
  dataClassName,
  attributeName,
  value,
  attributes
}) {
  assertNoTypedObject(dataClassName, attributeName, value);
  const attributeDefinition = attributes[attributeName];
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
  if (value === null || typeof value === "string" && (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .isISO8601 */ .p1)(value)) {
    return value;
  }
  if ((0,lodash_es_isDate__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)(value))
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
  if (value === null || (0,scrivito_sdk_data_integration_data_id__WEBPACK_IMPORTED_MODULE_5__/* .isValidDataId */ .o)(value))
    return value;
  if (value instanceof scrivito_sdk_data_integration_data_class__WEBPACK_IMPORTED_MODULE_1__/* .DataItem */ .sO && value.dataClassName() === getReferencedClassName(getAttributeConfig(attributeDefinition))) {
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
  if (isEmptyStringOrNull(value))
    return null;
  if (typeof value === "string" && (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .isISO8601 */ .p1)(value)) {
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
  if (isEmptyStringOrNull(value))
    return null;
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
  if (isEmptyStringOrNull(value))
    return null;
  if ((0,scrivito_sdk_data_integration_data_id__WEBPACK_IMPORTED_MODULE_5__/* .isValidDataId */ .o)(value)) {
    return (0,scrivito_sdk_data_integration_get_data_class__WEBPACK_IMPORTED_MODULE_3__/* .getDataClassOrThrow */ .sf)(
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
  if ((0,scrivito_sdk_data_integration_data_class_schema__WEBPACK_IMPORTED_MODULE_2__/* .isEnumAttributeConfig */ .Od)(attributeConfig)) {
    return attributeConfig.values.map(
      (valueOrConfig) => typeof valueOrConfig === "string" ? valueOrConfig : valueOrConfig.value
    );
  }
  throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ArgumentError */ .c1(
    'Enum attribute config is missing the "values" property'
  );
}
function getReferencedClassName(attributeConfig) {
  if (attributeConfig && isReferenceAttributeConfig(attributeConfig)) {
    return attributeConfig.to;
  }
  throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ArgumentError */ .c1(
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
  if ((0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .isObject */ .Gv)(value) && value.hasOwnProperty("_type")) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ArgumentError */ .c1(
      `Value for attribute "${attributeName}" of data class "${dataClassName}" contains an object with property "_type"`
    );
  }
}
function logTypeMismatch(dataClassName, attributeName, expected, actual) {
  if (actual === null || actual === void 0)
    return;
  (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .logError */ .vV)(typeMismatchMessage(dataClassName, attributeName, expected, actual));
}
function throwTypeMismatch(dataClassName, attributeName, expected, actual) {
  throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ArgumentError */ .c1(
    typeMismatchMessage(dataClassName, attributeName, expected, actual)
  );
}
function typeMismatchMessage(dataClassName, attributeName, expected, actual) {
  return `Expected attribute "${attributeName}" of data class "${dataClassName}" to be ${expected}, but got ${JSON.stringify(actual)}`;
}


/***/ }),

/***/ 8001:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $v: () => (/* binding */ itemPojoToScopePojo),
/* harmony export */   Hd: () => (/* binding */ assertValidDataItemAttributes),
/* harmony export */   IE: () => (/* binding */ combineSearches),
/* harmony export */   Zc: () => (/* binding */ combineFilters),
/* harmony export */   Zk: () => (/* binding */ scopePojoToItemPojo),
/* harmony export */   Zz: () => (/* binding */ DataScopeError),
/* harmony export */   bA: () => (/* binding */ DataClass),
/* harmony export */   bq: () => (/* binding */ DataScope),
/* harmony export */   dB: () => (/* binding */ isFilterOperator),
/* harmony export */   eH: () => (/* binding */ DEFAULT_LIMIT),
/* harmony export */   mX: () => (/* binding */ itemIdFromFilters),
/* harmony export */   sO: () => (/* binding */ DataItem),
/* harmony export */   ws: () => (/* binding */ isOperatorSpec)
/* harmony export */ });
/* unused harmony export DataItemAttribute */
/* harmony import */ var lodash_es_isEqual__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1900);
/* harmony import */ var lodash_es_mapValues__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5796);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5204);
/* harmony import */ var scrivito_sdk_data_integration_data_class_schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(135);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4360);

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





class DataClass {
  /** @public */
  attributeDefinitions() {
    return (0,scrivito_sdk_data_integration_data_class_schema__WEBPACK_IMPORTED_MODULE_1__/* .getNormalizedDataAttributeDefinitions */ .m8)(this.name());
  }
  /** @internal */
  title() {
    return (0,scrivito_sdk_data_integration_data_class_schema__WEBPACK_IMPORTED_MODULE_1__/* .getDataClassTitle */ .nx)(this.name());
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
  /** @internal */
  normalizeFilters(filters) {
    if (!filters)
      return;
    return (0,lodash_es_mapValues__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(filters, (valueOrSpec, attributeName) => {
      if (isAndOperatorSpec(valueOrSpec))
        return valueOrSpec;
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
      throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ArgumentError */ .c1(
        `Invalid filter value for "${attributeName}": ${JSON.stringify(
          valueOrSpec
        )}`
      );
    });
  }
  attributesFromFilters(filters) {
    if (!filters)
      return;
    const initialAttributes = {};
    return Object.keys(filters).reduce((attributes, name) => {
      const filter = filters[name];
      const specs = isOperatorSpec(filter) ? [filter] : filter.value;
      specs.forEach((spec) => {
        if (spec.operator === "equals")
          attributes[name] = spec.value;
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
    return __async(this, null, function* () {
      return this._dataItem.update({ [this._attributeName]: value });
    });
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
}
class DataScopeError extends scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ScrivitoError */ .aS {
  /** @internal */
  constructor(message) {
    super(message);
    this.message = message;
  }
}
function assertValidDataItemAttributes(attributes) {
  if (!(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .isObject */ .Gv)(attributes)) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ArgumentError */ .c1("Data item attributes must be an object");
  }
  if (!Object.keys(attributes).every(scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__/* .isValidDataIdentifier */ .Wf)) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ArgumentError */ .c1(
      "Keys of data item attributes must be valid data identifiers"
    );
  }
}
function combineFilters(currFilters, nextFilters) {
  if (!currFilters)
    return nextFilters;
  if (!nextFilters)
    return currFilters;
  let combinedFilters = __spreadValues({}, currFilters);
  Object.keys(nextFilters).forEach((attributeName) => {
    if (attributeName in combinedFilters && !(0,lodash_es_isEqual__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)(combinedFilters[attributeName], nextFilters[attributeName])) {
      const currentFilter = combinedFilters[attributeName];
      const nextFilter = nextFilters[attributeName];
      combinedFilters = __spreadProps(__spreadValues({}, combinedFilters), {
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
  if (id)
    return { _class, _id: id };
}
function itemIdFromFilters(filters) {
  var _a;
  const id = (_a = filters == null ? void 0 : filters._id) == null ? void 0 : _a.value;
  if (typeof id === "string")
    return id;
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
  return (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .isObject */ .Gv)(spec) && "operator" in spec && isFilterOperator(spec.operator) && "value" in spec && (spec.value === null || ["string", "number", "boolean"].includes(typeof spec.value));
}
function isAndOperatorSpec(spec) {
  return (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .isObject */ .Gv)(spec) && "operator" in spec && spec.operator === "and" && "value" in spec && Array.isArray(spec.value) && spec.value.every(isOperatorSpec);
}


/***/ }),

/***/ 135:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $b: () => (/* binding */ getDataAttributeDefinitions),
/* harmony export */   Od: () => (/* binding */ isEnumAttributeConfig),
/* harmony export */   h$: () => (/* binding */ registerDataClassSchema),
/* harmony export */   m8: () => (/* binding */ getNormalizedDataAttributeDefinitions),
/* harmony export */   nx: () => (/* binding */ getDataClassTitle),
/* harmony export */   ud: () => (/* binding */ extractDataClassSchemaResponse)
/* harmony export */ });
/* unused harmony export unregisterDataClassSchema */
/* harmony import */ var lodash_es_mapValues__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5796);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5204);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5688);
/* harmony import */ var scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1946);

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




function isDataAttributeType(attributeType) {
  return typeof attributeType === "string" && ["boolean", "date", "enum", "number", "reference", "string"].includes(
    attributeType
  );
}
function registerDataClassSchema(dataClassName, schema) {
  const schemata = __spreadValues({}, schemataState.get());
  schemata[dataClassName] = wrapInCallback(schema);
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
  return (0,lodash_es_mapValues__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(
    getDataAttributeDefinitions(dataClassName),
    normalizeDataAttributeDefinition
  );
}
function unregisterDataClassSchema(dataClassName) {
  const schemata = __spreadValues({}, schemataState.get());
  delete schemata[dataClassName];
  schemataState.set(schemata);
  invalidateSchemataCollection();
}
const schemataState = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_2__/* .createStateContainer */ .Ld)();
const counterState = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_2__/* .createStateContainer */ .Ld)();
const schemataCollection = (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_1__/* .createLoadableCollection */ .rL)({
  name: "dataClassSchema",
  loadElement: (dataClassName) => ({
    loader() {
      return __async(this, null, function* () {
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
  if (typeof definition === "string")
    return [definition, {}];
  const [type, config] = definition;
  if (type === "enum")
    return [type, normalizeEnumValueConfig(config)];
  return [...definition];
}
function normalizeEnumValueConfig({ title, values }) {
  const config = {
    values: values.map(
      (value) => typeof value === "string" ? { value, title: value } : value
    )
  };
  if (title)
    config.title = title;
  return config;
}
function wrapInCallback(schema) {
  if (schema instanceof Function)
    return schema;
  return () => Promise.resolve(schema);
}
function extractDataClassSchemaResponse(input) {
  const response = {
    attributes: {},
    title: void 0
  };
  if (!(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .isObject */ .Gv)(input)) {
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .logError */ .vV)(
      `Invalid schema response: expected an object: ${JSON.stringify(input)}`
    );
    return response;
  }
  if (!("attributes" in input)) {
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .logError */ .vV)(
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
  if (!(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .isObject */ .Gv)(input)) {
    (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .logError */ .vV)(
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
        const definition = extractDataAttributeDefinitionWithConfig(
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
function extractDataAttributeDefinitionWithConfig(attributeName, definition) {
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
  if (attributeType === "enum") {
    if (isEnumAttributeConfig(maybeConfig)) {
      return [attributeType, maybeConfig];
    }
    logSchemaError(
      attributeName,
      maybeConfig,
      'Invalid "enum" attribute config.'
    );
  } else if (attributeType === "reference") {
    const config = isReferenceAttributeConfig(maybeConfig) ? maybeConfig : void 0;
    if (config) {
      return [attributeType, config];
    }
    logSchemaError(
      attributeName,
      maybeConfig,
      'Invalid "reference" attribute config.'
    );
  } else {
    const config = isLocalizedAttributeConfig(maybeConfig) ? maybeConfig : void 0;
    if (config) {
      return [attributeType, config];
    }
    logSchemaError(attributeName, maybeConfig, "Invalid localization.");
  }
}
function isEnumAttributeConfig(config) {
  return (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .isObject */ .Gv)(config) && titleIsValidOrNotPresent(config) && "values" in config && Array.isArray(config.values) && config.values.every(
    (valueOrConfig) => typeof valueOrConfig === "string" && valueOrConfig.length || isLocalizedEnumValueConfig(valueOrConfig)
  );
}
function isLocalizedEnumValueConfig(config) {
  return (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .isObject */ .Gv)(config) && "value" in config && typeof config.value === "string" && !!config.value.length && titleIsValidOrNotPresent(config);
}
function isReferenceAttributeConfig(config) {
  return (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .isObject */ .Gv)(config) && "to" in config && typeof config.to === "string" && titleIsValidOrNotPresent(config) && (!("reverseTitle" in config) || typeof config.reverseTitle === "string");
}
function isLocalizedAttributeConfig(config) {
  return (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .isObject */ .Gv)(config) && (!Object.keys(config).length || titleIsValidOrNotPresent(config));
}
function titleIsValidOrNotPresent(object) {
  return !("title" in object) || typeof object.title === "string";
}
function logSchemaError(attributeName, actual, details) {
  (0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .logError */ .vV)(
    `Invalid schema definition for attribute "${attributeName}": ${JSON.stringify(
      actual
    )}${details ? `
Details: ${details}` : ""}`
  );
}


/***/ }),

/***/ 7824:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ DataConnectionError)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5204);


class DataConnectionError extends scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ScrivitoError */ .aS {
  constructor(message) {
    super(message);
    this.message = message;
  }
}


/***/ }),

/***/ 5596:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ isValidDataId)
/* harmony export */ });

function isValidDataId(id) {
  return typeof id === "string" && (!!id.match(/^\d+(-\d+)*$/) || !!id.match(/^[a-f0-9]{8,}(-[a-f0-9]{8,})*$/i));
}


/***/ }),

/***/ 1032:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ disableExternalDataLoading),
/* harmony export */   c: () => (/* binding */ isExternalDataLoadingDisabled)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5204);


const isLoadingDisabled = new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ContextContainer */ .hl();
function disableExternalDataLoading(fn) {
  return isLoadingDisabled.runWith(true, fn);
}
function isExternalDataLoadingDisabled() {
  return isLoadingDisabled.current() || false;
}


/***/ }),

/***/ 4962:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Gf: () => (/* binding */ ExternalDataClass),
  FU: () => (/* binding */ ExternalDataItem),
  VU: () => (/* binding */ allExternalDataClasses),
  D5: () => (/* binding */ isExternalDataClassProvided)
});

// UNUSED EXPORTS: ExternalDataScope

// EXTERNAL MODULE: ../node_modules/lodash-es/mapValues.js
var mapValues = __webpack_require__(5796);
// EXTERNAL MODULE: ./scrivito_sdk/client/index.ts + 38 modules
var client = __webpack_require__(853);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(5204);
// EXTERNAL MODULE: ./scrivito_sdk/data_integration/data_attribute.ts
var data_attribute = __webpack_require__(3561);
// EXTERNAL MODULE: ./scrivito_sdk/data_integration/data_class.ts
var data_class = __webpack_require__(8001);
// EXTERNAL MODULE: ./scrivito_sdk/data_integration/data_class_schema.ts
var data_class_schema = __webpack_require__(135);
// EXTERNAL MODULE: ./scrivito_sdk/data_integration/data_connection_error.ts
var data_connection_error = __webpack_require__(7824);
// EXTERNAL MODULE: ./scrivito_sdk/data_integration/disable_external_data_loading.ts
var disable_external_data_loading = __webpack_require__(1032);
// EXTERNAL MODULE: ./scrivito_sdk/data_integration/external_data_connection.ts + 1 modules
var external_data_connection = __webpack_require__(5481);
// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 29 modules
var loadable = __webpack_require__(5688);
;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/external_data.ts




function setExternalData(dataClass, dataId, data) {
  loadableCollection.get([dataClass, dataId]).set(data);
}
function getExternalData(dataClass, dataId) {
  if ((0,disable_external_data_loading/* isExternalDataLoadingDisabled */.c)())
    return void 0;
  return loadableCollection.get([dataClass, dataId]).get();
}
const loadableCollection = (0,loadable/* createLoadableCollection */.rL)({
  name: "externaldata",
  loadElement: ([dataClass, dataId]) => ({
    loader: () => (0,external_data_connection/* getViaDataConnection */.F_)(dataClass, dataId)
  })
});
function findInExternalDataOfflineStore(selector) {
  return loadableCollection.findValuesInOfflineStore(selector);
}

// EXTERNAL MODULE: ./scrivito_sdk/data/index.ts + 29 modules
var data = __webpack_require__(1091);
// EXTERNAL MODULE: ./scrivito_sdk/data_integration/index.ts + 13 modules
var data_integration = __webpack_require__(9800);
;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/external_data_offline_query.ts

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


function queryExternalDataOfflineStore(_0) {
  return __async(this, arguments, function* ([
    wantedDataClass,
    filters,
    search,
    order,
    _count
  ]) {
    const collection = yield findInExternalDataOfflineStore(
      (data, [dataClass, id]) => {
        if (data === null)
          return false;
        if (dataClass !== wantedDataClass)
          return false;
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
  if (order === void 0 || order.length === 0)
    return collection;
  return collection.sort(
    (resultA, resultB) => compareDataForSorting(order, resultA, resultB)
  );
}
function withSearch(collection, searchTerm) {
  if (!searchTerm)
    return collection;
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
  if (!filters)
    return true;
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
  if (typeof valueA === "number")
    return -1;
  if (typeof valueB === "number")
    return 1;
  if (typeof valueA === "string")
    return 1;
  if (typeof valueB === "string")
    return -1;
  return 0;
}
function attributeValue(id, data, attribute) {
  if (!data)
    return null;
  const rawValue = attribute === "_id" ? id : data.customData[attribute];
  return rawValue === void 0 ? null : rawValue;
}
function throwNotSupported(description) {
  throw new data_integration/* DataConnectionError */.BA(`Not supported: ${description}`);
}

// EXTERNAL MODULE: ./scrivito_sdk/data_integration/index_params.ts
var index_params = __webpack_require__(5941);
// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(1946);
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
  if ((0,disable_external_data_loading/* isExternalDataLoadingDisabled */.c)())
    return new common/* EmptyContinueIterable */.l6();
  validateFilters(dataClass, filters, attributes);
  const batchSize = limit != null ? limit : data_class/* DEFAULT_LIMIT */.eH;
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
  (0,mapValues/* default */.A)(filters, (filterValue, filterName) => {
    const operatorSpecs = (0,data_class/* isOperatorSpec */.ws)(filterValue) ? [filterValue] : filterValue.value;
    operatorSpecs.forEach((operatorSpec) => {
      const actualValue = (0,data_class/* isOperatorSpec */.ws)(operatorSpec) ? operatorSpec.value : operatorSpec;
      (0,data_attribute/* serializeDataAttribute */.VB)({
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
    const result = yield (0,external_data_connection/* indexViaDataConnection */.hi)(
      dataClass,
      new index_params/* DataConnectionIndexParams */.Dx(continuation, {
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











class ExternalDataClass extends data_class/* DataClass */.bA {
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
  return (0,external_data_connection/* hasExternalDataConnection */.oJ)(name);
}
function allExternalDataClasses() {
  return (0,external_data_connection/* getExternalDataConnectionNames */.Ke)().map(
    (name) => new ExternalDataClass(name)
  );
}
class ExternalDataScope extends data_class/* DataScope */.bq {
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
      (0,data_class/* assertValidDataItemAttributes */.Hd)(attributes);
      const { filters } = this._params;
      const dataClassName = this.dataClassName();
      const dataAttributeDefinitions = yield loadAttributesOrThrow(dataClassName);
      const serializedAttributes = serializeAttributes(
        dataClassName,
        attributes,
        dataAttributeDefinitions
      );
      const dataForCallback = __spreadValues(__spreadValues({}, serializedAttributes), this.attributesFromFilters(filters));
      const data = yield (0,external_data_connection/* createViaDataConnection */.ZH)(dataClassName, dataForCallback);
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
    const attributes = (0,data_class_schema/* getDataAttributeDefinitions */.$b)(this.dataClassName());
    if (!attributes)
      return [];
    const id = this.itemIdFromFilters();
    if (id && this.hasSingleFilter()) {
      if (this.limit() === 0)
        return [];
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
        filters: (0,data_class/* combineFilters */.Zc)(
          this._params.filters,
          this.normalizeFilters(filters)
        ),
        search: (0,data_class/* combineSearches */.IE)(this._params.search, search),
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
    const attributes = (0,data_class_schema/* getDataAttributeDefinitions */.$b)(dataClassName);
    if (!attributes)
      return null;
    return handleCommunicationError(
      () => countExternalData(dataClassName, filters, search, attributes)
    );
  }
  limit() {
    return this._params.limit;
  }
  /** @internal */
  toPojo() {
    return __spreadValues({
      _class: this.dataClassName(),
      _attribute: this._attributeName
    }, this._params);
  }
  takeUnsafe(attributes) {
    var _a;
    return (0,common/* extractFromIterator */._Q)(
      this.getIterator(attributes),
      (_a = this._params.limit) != null ? _a : data_class/* DEFAULT_LIMIT */.eH
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
    return (0,data_class/* itemIdFromFilters */.mX)(this._params.filters);
  }
  hasSingleFilter() {
    const { filters, search } = this._params;
    return filters && Object.keys(filters).length === 1 && !search;
  }
}
class ExternalDataItem extends data_class/* DataItem */.sO {
  constructor(_dataClass, _dataId) {
    super();
    this._dataClass = _dataClass;
    this._dataId = _dataId;
  }
  /** Returns an item if its schema is loaded. Returns null otherwise. */
  /** Triggers schema loading, thus requires a loading context. */
  static build(dataClass, dataId) {
    const attributes = (0,data_class_schema/* getDataAttributeDefinitions */.$b)(dataClass.name());
    return attributes ? new ExternalDataItem(dataClass, dataId) : null;
  }
  /** Returns an item for an already loaded schema */
  static buildWithLoadedAttributes(dataClass, dataId, attributes) {
    if (!attributes)
      throw new common/* InternalError */.Gd();
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
    if (!externalData)
      return null;
    const dataClassName = this.dataClassName();
    const attributes = (0,data_class_schema/* getDataAttributeDefinitions */.$b)(dataClassName);
    const { customData } = externalData;
    return attributes ? (0,data_attribute/* deserializeDataAttribute */.Ir)({
      dataClassName,
      attributeName,
      value: customData[attributeName],
      attributes
    }) : null;
  }
  getRaw(attributeName) {
    var _a;
    return (_a = this.getExternalData()) == null ? void 0 : _a.customData[attributeName];
  }
  update(attributes) {
    return external_data_class_async(this, null, function* () {
      (0,data_class/* assertValidDataItemAttributes */.Hd)(attributes);
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
      const updatedData = yield (0,external_data_connection/* updateViaDataConnection */.EH)(
        this.dataClassName(),
        this._dataId,
        serializedAttributes
      );
      setExternalData(dataClassName, this._dataId, {
        systemData: externalData.systemData,
        customData: __spreadValues(__spreadValues({}, externalData.customData), updatedData)
      });
      this.notifyWrite();
    });
  }
  delete() {
    return external_data_class_async(this, null, function* () {
      yield (0,external_data_connection/* deleteViaDataConnection */.cq)(this.dataClassName(), this._dataId);
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
  notifyWrite() {
    notifyExternalDataWrite(this.dataClassName());
  }
}
function serializeAttributes(dataClassName, attributes, dataAttributeDefinitions) {
  return (0,mapValues/* default */.A)(
    attributes,
    (value, attributeName) => (0,data_attribute/* serializeDataAttribute */.VB)({
      dataClassName,
      attributeName,
      value,
      attributes: dataAttributeDefinitions
    })
  );
}
function isCommunicationError(error) {
  return error instanceof client/* ClientError */.MZ || error instanceof data_connection_error/* DataConnectionError */.B;
}
function handleCommunicationError(request) {
  try {
    return request();
  } catch (error) {
    if (isCommunicationError(error))
      throw new data_class/* DataScopeError */.Zz(error.message);
    throw error;
  }
}
function loadAttributesOrThrow(dataClassName) {
  return external_data_class_async(this, null, function* () {
    const attributes = yield (0,loadable/* load */.Hh)(
      () => (0,data_class_schema/* getDataAttributeDefinitions */.$b)(dataClassName)
    );
    if (!attributes)
      throw new common/* InternalError */.Gd();
    return attributes;
  });
}


/***/ }),

/***/ 5481:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ZH: () => (/* binding */ createViaDataConnection),
  cq: () => (/* binding */ deleteViaDataConnection),
  Ke: () => (/* binding */ getExternalDataConnectionNames),
  F_: () => (/* binding */ getViaDataConnection),
  oJ: () => (/* binding */ hasExternalDataConnection),
  hi: () => (/* binding */ indexViaDataConnection),
  kz: () => (/* binding */ setExternalDataConnection),
  EH: () => (/* binding */ updateViaDataConnection)
});

// EXTERNAL MODULE: ./scrivito_sdk/client/index.ts + 38 modules
var client = __webpack_require__(853);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(5204);
// EXTERNAL MODULE: ../node_modules/lodash-es/memoize.js
var memoize = __webpack_require__(3920);
// EXTERNAL MODULE: ./scrivito_sdk/data_integration/add_missing_data_connection_handlers.ts
var add_missing_data_connection_handlers = __webpack_require__(3664);
;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/anticipated_data_connection.ts

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


function anticipatedDataConnection(connectionPromise, dataClass) {
  const getCompleteConnection = (0,memoize/* default */.A)(
    () => __async(this, null, function* () {
      return (0,add_missing_data_connection_handlers/* addMissingDataConnectionHandlers */.j)(yield connectionPromise, dataClass);
    })
  );
  return {
    get: (...args) => __async(this, null, function* () {
      return (yield getCompleteConnection()).get(...args);
    }),
    index: (...args) => __async(this, null, function* () {
      return (yield getCompleteConnection()).index(...args);
    }),
    create: (...args) => __async(this, null, function* () {
      return (yield getCompleteConnection()).create(...args);
    }),
    update: (...args) => __async(this, null, function* () {
      return (yield getCompleteConnection()).update(...args);
    }),
    delete: (...args) => __async(this, null, function* () {
      return (yield getCompleteConnection()).delete(...args);
    })
  };
}

// EXTERNAL MODULE: ./scrivito_sdk/data_integration/data_connection_error.ts
var data_connection_error = __webpack_require__(7824);
// EXTERNAL MODULE: ./scrivito_sdk/data_integration/data_id.ts
var data_id = __webpack_require__(5596);
// EXTERNAL MODULE: ./scrivito_sdk/models/index.ts + 44 modules
var models = __webpack_require__(4360);
// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(1946);
;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/external_data_connection.ts

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
  if (!(0,data_id/* isValidDataId */.o)(id)) {
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
  } else if (continuation !== null && continuation !== void 0) {
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
  if (resultCount === void 0 || resultCount === null)
    return;
  if (typeof resultCount !== "number" && typeof resultCount !== "string") {
    throw new common/* ArgumentError */.c1(
      "Count of an index result must be a non-negative integer, null or undefined"
    );
  }
  const count = Number(resultCount);
  if (count >= 0 && (0,common/* isValidInteger */.zh)(count))
    return count;
  throw new common/* ArgumentError */.c1(
    "Count of an index result must be a non-negative integer"
  );
}
function assertValidDataId(dataId) {
  if (!(0,data_id/* isValidDataId */.o)(dataId)) {
    throw new common/* ArgumentError */.c1(
      "Strings in results of an index result must be valid data IDs"
    );
  }
}
const connectionsState = (0,state/* createStateContainer */.Ld)();
function setExternalDataConnection(name, partialConnection) {
  const connection = anticipatedDataConnection(partialConnection, name);
  connectionsState.set(__spreadProps(__spreadValues({}, connectionsState.get()), {
    [name]: connection
  }));
}
function hasExternalDataConnection(name) {
  return !!getExternalDataConnection(name);
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
    throw new common/* ArgumentError */.c1(`Missing data class with name ${name}`);
  }
  return connection;
}
function getViaDataConnection(name, id) {
  return external_data_connection_async(this, null, function* () {
    if (!(0,data_id/* isValidDataId */.o)(id)) {
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
    if (response === null)
      return null;
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
    if (result instanceof data_connection_error/* DataConnectionError */.B)
      throw result;
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
    return __spreadValues(__spreadValues({}, data), filteredData);
  });
}
function deleteViaDataConnection(name, id) {
  return getExternalDataConnectionOrThrow(name).delete(id);
}


/***/ }),

/***/ 512:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D5: () => (/* binding */ getDataClass),
/* harmony export */   Q$: () => (/* binding */ getObjDataClass),
/* harmony export */   sf: () => (/* binding */ getDataClassOrThrow)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5204);
/* harmony import */ var scrivito_sdk_data_integration_external_data_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4962);
/* harmony import */ var scrivito_sdk_data_integration_obj_data_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8083);




function getDataClass(dataClassName) {
  return getExternalDataClass(dataClassName) || getObjDataClass(dataClassName) || null;
}
function getDataClassOrThrow(dataClassName) {
  const dataClass = getDataClass(dataClassName);
  if (dataClass)
    return dataClass;
  throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__/* .ArgumentError */ .c1(`No "${dataClassName}" found`);
}
function getObjDataClass(dataClassName) {
  if (dataClassName === "Obj" || (0,scrivito_sdk_data_integration_obj_data_class__WEBPACK_IMPORTED_MODULE_2__/* .isObjDataClassProvided */ .Be)(dataClassName)) {
    return new scrivito_sdk_data_integration_obj_data_class__WEBPACK_IMPORTED_MODULE_2__/* .ObjDataClass */ .wS(dataClassName);
  }
}
function getExternalDataClass(dataClassName) {
  if ((0,scrivito_sdk_data_integration_external_data_class__WEBPACK_IMPORTED_MODULE_1__/* .isExternalDataClassProvided */ .D5)(dataClassName)) {
    return new scrivito_sdk_data_integration_external_data_class__WEBPACK_IMPORTED_MODULE_1__/* .ExternalDataClass */ .Gf(dataClassName);
  }
}


/***/ }),

/***/ 9800:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  bA: () => (/* reexport */ data_class/* DataClass */.bA),
  BA: () => (/* reexport */ data_connection_error/* DataConnectionError */.B),
  sO: () => (/* reexport */ data_class/* DataItem */.sO),
  bq: () => (/* reexport */ data_class/* DataScope */.bq),
  Ao: () => (/* reexport */ EmptyDataScope),
  Gf: () => (/* reexport */ external_data_class/* ExternalDataClass */.Gf),
  FU: () => (/* reexport */ external_data_class/* ExternalDataItem */.FU),
  zv: () => (/* reexport */ SINGLETON_DATA_ID),
  Ey: () => (/* reexport */ activateDataIntegration),
  u5: () => (/* reexport */ allCustomAttributesOfTypeString),
  VU: () => (/* reexport */ external_data_class/* allExternalDataClasses */.VU),
  ZJ: () => (/* reexport */ applyDataLocator),
  gk: () => (/* reexport */ basicObjToDataContext),
  En: () => (/* reexport */ createRestApiConnectionForClass),
  _f: () => (/* reexport */ dataContextFromQueryParams),
  A_: () => (/* reexport */ dataItemToDataContext),
  bU: () => (/* reexport */ deserializeDataItem),
  w1: () => (/* reexport */ deserializeDataScope),
  uw: () => (/* reexport */ deserializeDataStackElement),
  Qt: () => (/* reexport */ disable_external_data_loading/* disableExternalDataLoading */.Q),
  ud: () => (/* reexport */ data_class_schema/* extractDataClassSchemaResponse */.ud),
  dw: () => (/* reexport */ findItemInGlobalData),
  sf: () => (/* reexport */ get_data_class/* getDataClassOrThrow */.sf),
  nx: () => (/* reexport */ data_class_schema/* getDataClassTitle */.nx),
  K1: () => (/* reexport */ getDataContextParameters),
  qD: () => (/* reexport */ getDataContextQuery),
  iW: () => (/* reexport */ getGlobalDataItems),
  m8: () => (/* reexport */ data_class_schema/* getNormalizedDataAttributeDefinitions */.m8),
  BF: () => (/* reexport */ isDataIntegrationActive),
  o3: () => (/* reexport */ isDataItemPojo),
  Wq: () => (/* reexport */ external_data_class/* isExternalDataClassProvided */.D5),
  VI: () => (/* reexport */ isMultiItemDataScopePojo),
  y8: () => (/* reexport */ data_attribute/* isReferenceAttributeConfig */.y8),
  Uq: () => (/* reexport */ isSingleItemElement),
  G7: () => (/* reexport */ isSinglePlaceholder),
  Qk: () => (/* reexport */ isSingletonDataClass),
  wc: () => (/* reexport */ provideExternalDataItem),
  $T: () => (/* reexport */ registerExternalDataClass),
  V8: () => (/* reexport */ replacePlaceholdersWithData),
  Zk: () => (/* reexport */ data_class/* scopePojoToItemPojo */.Zk),
  _L: () => (/* reexport */ current_language/* setCurrentLanguageHandler */._)
});

// UNUSED EXPORTS: ExternalDataScope, ObjDataScope, getDataClass, getDataContextValue, isValidDataId

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

// EXTERNAL MODULE: ./scrivito_sdk/data_integration/data_class.ts
var data_class = __webpack_require__(8001);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(5204);
;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/create_rest_api_connection.ts

var create_rest_api_connection_defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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

function createRestApiConnectionForClass(apiClient) {
  return {
    create: (data) => __async(this, null, function* () {
      return apiClient.fetch("", { method: "post", data });
    }),
    index: (params) => __async(this, null, function* () {
      return apiClient.fetch("", { params: toClientParams(params) });
    }),
    get: (id) => __async(this, null, function* () {
      return apiClient.fetch(id);
    }),
    update: (id, data) => __async(this, null, function* () {
      return apiClient.fetch(id, { method: "patch", data });
    }),
    delete: (id) => apiClient.fetch(id, { method: "delete" })
  };
}
function toClientParams(params) {
  return __spreadProps(create_rest_api_connection_spreadValues({}, toClientFilterParam(params.filters())), {
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
  if (typeof value === "string")
    return value;
  if (value === null)
    return "";
  return JSON.stringify(value);
}
function assertNoConflicts(specs) {
  if (specs.length < 2)
    return;
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

// EXTERNAL MODULE: ./scrivito_sdk/data_integration/get_data_class.ts
var get_data_class = __webpack_require__(512);
// EXTERNAL MODULE: ./scrivito_sdk/data_integration/obj_data_class.ts
var obj_data_class = __webpack_require__(8083);
// EXTERNAL MODULE: external "urijs"
var external_urijs_ = __webpack_require__(4066);
// EXTERNAL MODULE: ./scrivito_sdk/data_integration/data_id.ts
var data_id = __webpack_require__(5596);
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


class EmptyDataScope extends data_class/* DataScope */.bq {
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
      throw new data_class/* DataScopeError */.Zz(this.params.error.message);
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
var __objRest = (source, exclude) => {
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
  if (element && isDataScopePojo(element))
    return element;
}
function deserializeDataScope(_a) {
  var _b = _a, {
    _class: dataClassName
  } = _b, dataScopeParams = __objRest(_b, [
    "_class"
  ]);
  if (dataClassName) {
    const dataClass = (0,get_data_class/* getDataClassOrThrow */.sf)(dataClassName);
    if ("isEmpty" in dataScopeParams) {
      const error = dataScopeParams._error ? new data_class/* DataScopeError */.Zz(dataScopeParams._error) : void 0;
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
  return (0,get_data_class/* getDataClassOrThrow */.sf)(dataClass).get(dataId) || void 0;
}

// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(1946);
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
    ([dataClassName, dataId]) => (0,get_data_class/* getDataClassOrThrow */.sf)(dataClassName).get(dataId)
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
    return (0,data_class/* itemPojoToScopePojo */.$v)(itemPojo);
}

// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 29 modules
var loadable = __webpack_require__(5688);
// EXTERNAL MODULE: ./scrivito_sdk/models/index.ts + 44 modules
var models = __webpack_require__(4360);
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
    if (scopePojo)
      return scopePojo;
  }
  const itemPojo = findItemInDataStack(dataClassName, dataStack);
  if (itemPojo)
    return (0,data_class/* itemPojoToScopePojo */.$v)(itemPojo);
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
  if (!(0,data_id/* isValidDataId */.o)(dataId))
    return "unavailable";
  const dataClass = (0,get_data_class/* getDataClass */.D5)(dataClassName);
  if (!dataClass)
    return;
  const dataItem = (0,loadable/* loadWithDefault */.qt)("loading", () => dataClass.get(dataId));
  if (dataItem === "loading")
    return "loading";
  if (!dataItem)
    return "unavailable";
  return dataItemToDataContext(dataItem);
}
function dataItemToDataContext(dataItem) {
  if (dataItem instanceof obj_data_class/* ObjDataItem */.DP) {
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
  if (typeof dataId === "string" && dataId.length > 0)
    return dataId;
}
function getDataIdOfFirstDataItem(dataClassName) {
  const [firstDataItem] = (0,get_data_class/* getDataClassOrThrow */.sf)(dataClassName).all().transform({ limit: 1 }).take();
  if (firstDataItem)
    return firstDataItem.id();
}
function getObj(objOrLink) {
  if (objOrLink instanceof models/* BasicObj */.kI)
    return objOrLink;
  if (objOrLink.isInternal()) {
    const obj = objOrLink.obj();
    if (obj instanceof models/* BasicObj */.kI)
      return obj;
  }
}
function getDataContextValue(identifier, context) {
  if (!(0,models/* isValidDataIdentifier */.Wf)(identifier))
    return void 0;
  const value = context[identifier];
  if (isValidDataContextValue(value))
    return value;
  (0,common/* throwNextTick */.JL)(
    new common/* ArgumentError */.c1(
      `Expected a data context value to be a string or undefined, but got ${value}`
    )
  );
}

// EXTERNAL MODULE: ./scrivito_sdk/data_integration/external_data_class.ts + 3 modules
var external_data_class = __webpack_require__(4962);
// EXTERNAL MODULE: ./scrivito_sdk/data_integration/data_class_schema.ts
var data_class_schema = __webpack_require__(135);
// EXTERNAL MODULE: ./scrivito_sdk/data_integration/external_data_connection.ts + 1 modules
var external_data_connection = __webpack_require__(5481);
;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/register_external_data_class.ts

var register_external_data_class_async = (__this, __arguments, generator) => {
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


function registerExternalDataClass(name, params) {
  return register_external_data_class_async(this, null, function* () {
    const { connection, schema } = yield params;
    (0,external_data_connection/* setExternalDataConnection */.kz)(name, connection);
    (0,data_class_schema/* registerDataClassSchema */.h$)(name, schema);
  });
}

// EXTERNAL MODULE: ./scrivito_sdk/data_integration/data_connection_error.ts
var data_connection_error = __webpack_require__(7824);
// EXTERNAL MODULE: ./scrivito_sdk/client/index.ts + 38 modules
var client = __webpack_require__(853);
// EXTERNAL MODULE: ./scrivito_sdk/data_integration/index_params.ts
var index_params = __webpack_require__(5941);
;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/apply_data_locator.ts











function applyDataLocator(dataStack, dataLocator) {
  if (!dataLocator)
    return new EmptyDataScope();
  const className = dataLocator.class();
  if (className === null)
    return new EmptyDataScope();
  try {
    const viaRef = dataLocator.viaRef();
    const sourceDataScope = viaRef ? findMatchingDataScopeOrThrow(className, dataStack, viaRef) : (0,get_data_class/* getDataClassOrThrow */.sf)(className).all();
    return applyDataLocatorDefinition(sourceDataScope, dataStack, dataLocator);
  } catch (error) {
    if (error instanceof common/* ArgumentError */.c1) {
      return new EmptyDataScope({ error: new data_class/* DataScopeError */.Zz(error.message) });
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
  const [fullOperator] = Object.entries(index_params/* operatorToOpCode */.oK).find(([_, val]) => val === operator) || [];
  return scope.transform({
    filters: {
      [field]: {
        operator: (0,data_class/* isFilterOperator */.dB)(fullOperator) ? fullOperator : "equals",
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
    if (!(0,data_id/* isValidDataId */.o)(value)) {
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
  if (!element)
    throw new common/* ArgumentError */.c1(`No ${viaClass} item found`);
  const item = deserializeDataStackElement(element);
  if (item instanceof data_class/* DataItem */.sO)
    return item;
  throw new common/* ArgumentError */.c1(`No ${viaClass} item with ID ${element._id} found`);
}
function findMatchingDataScopeOrThrow(className, dataStack, viaRef) {
  const element = findScopeElementInDataStackAndGlobalData(
    className,
    dataStack,
    viaRef
  );
  if (!element)
    throw new common/* ArgumentError */.c1(`No ${className} scope found`);
  const scope = deserializeDataStackElement(element);
  if (scope instanceof data_class/* DataScope */.bq)
    return scope;
  throw new common/* ArgumentError */.c1(`No ${className} scope found`);
}

// EXTERNAL MODULE: ./scrivito_sdk/data_integration/add_missing_data_connection_handlers.ts
var add_missing_data_connection_handlers = __webpack_require__(3664);
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
        if (!filter)
          return false;
        return name === "_id" || valueMatchesFilter(dataItem.get(name), filter);
      })
    );
    return { results: doesMatch ? [SINGLETON_DATA_ID] : [] };
  });
}
function valueMatchesFilter(itemValue, filter) {
  if ((0,index_params/* isAndFilterSpec */.pR)(filter)) {
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
  const areEqual = areValuesEqual(filterValue, itemValue);
  return opCode === "neq" ? !areEqual : areEqual;
}
const RELATIONAL_OPERATOR_COMPARATORS = {
  gt: (a, b) => a > b,
  lt: (a, b) => a < b,
  gte: (a, b) => a >= b,
  lte: (a, b) => a <= b
};
function assertStringOrNumber(arg) {
  if (typeof arg === "string" || typeof arg === "number")
    return;
  throw new common/* ArgumentError */.c1(`Must be a string or number, but got ${String(arg)}`);
}
function areValuesEqual(filterValue, itemValue) {
  if (filterValue === itemValue)
    return true;
  if (filterValue === null || filterValue === "null")
    return itemValue == null;
  return filterValue === "true" && itemValue === true || filterValue === "false" && itemValue === false;
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
function provideExternalDataItem(dataClass, paramsPromise) {
  return provide_external_data_item_async(this, null, function* () {
    const name = dataClass.name();
    const { connection, schema } = yield paramsPromise;
    const getCallback = () => provide_external_data_item_async(this, null, function* () {
      return (yield connection).get();
    });
    const updateCallback = (data) => provide_external_data_item_async(this, null, function* () {
      const { update } = yield connection;
      if (update)
        return update(data);
      (0,add_missing_data_connection_handlers/* throwMissingCallbackError */.O)("update", name)();
    });
    const dataConnection = provide_external_data_item_spreadValues({
      get: (id) => provide_external_data_item_async(this, null, function* () {
        return isSingletonDataId(id) ? getCallback() : null;
      }),
      index: (params) => provide_external_data_item_async(this, null, function* () {
        const dataItem = yield (0,loadable/* load */.Hh)(() => dataClass.get(SINGLETON_DATA_ID));
        if (!dataItem)
          return { results: [] };
        return filterExternalDataItem(dataItem, params.filters());
      })
    }, updateCallback && {
      update: (id, data) => provide_external_data_item_async(this, null, function* () {
        return isSingletonDataId(id) ? updateCallback(data) : null;
      })
    });
    registerExternalDataClass(
      name,
      (() => provide_external_data_item_async(this, null, function* () {
        return {
          connection: Promise.resolve(dataConnection),
          schema
        };
      }))()
    );
    registerSingletonDataClass(name);
    provideGlobalData(dataClass.getUnchecked(SINGLETON_DATA_ID));
  });
}
function isSingletonDataId(id) {
  return id === SINGLETON_DATA_ID;
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
  if (!isDataIntegrationActive())
    return text;
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
  if (dataItem === "loading" || !dataItem)
    return "";
  const attributeValue = dataItem.get(attributeName);
  if (typeof attributeValue !== "string")
    return "";
  return attributeValue;
}
function getDataItem(dataClassName, dataStack) {
  return (0,loadable/* loadableWithDefault */.s4)("loading", () => {
    var _a;
    const element = findItemElementInDataStackAndGlobalData(
      dataClassName,
      dataStack
    );
    if (element)
      return (_a = (0,get_data_class/* getDataClass */.D5)(dataClassName)) == null ? void 0 : _a.get(element._id);
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

// EXTERNAL MODULE: ./scrivito_sdk/data_integration/disable_external_data_loading.ts
var disable_external_data_loading = __webpack_require__(1032);
// EXTERNAL MODULE: ./scrivito_sdk/data_integration/data_attribute.ts
var data_attribute = __webpack_require__(3561);
// EXTERNAL MODULE: ./scrivito_sdk/data_integration/current_language.ts
var current_language = __webpack_require__(1514);
;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/index.ts


























/***/ }),

/***/ 5941:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dx: () => (/* binding */ DataConnectionIndexParams),
/* harmony export */   oK: () => (/* binding */ operatorToOpCode),
/* harmony export */   pR: () => (/* binding */ isAndFilterSpec)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_data_integration_data_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8001);

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
        if (!name)
          return filters;
        return __spreadProps(__spreadValues({}, filters), {
          [name]: (0,scrivito_sdk_data_integration_data_class__WEBPACK_IMPORTED_MODULE_0__/* .isOperatorSpec */ .ws)(operatorSpec) ? __spreadProps(__spreadValues({}, operatorSpec), {
            opCode: operatorToOpCode[operatorSpec.operator]
          }) : {
            operator: "and",
            value: operatorSpec.value.map((spec) => __spreadProps(__spreadValues({}, spec), {
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


/***/ }),

/***/ 8083:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Be: () => (/* binding */ isObjDataClassProvided),
/* harmony export */   DP: () => (/* binding */ ObjDataItem),
/* harmony export */   wS: () => (/* binding */ ObjDataClass)
/* harmony export */ });
/* unused harmony exports SUBPAGES_CHILD_ORDER_LIMIT, ObjDataScope */
/* harmony import */ var scrivito_sdk_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(853);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5204);
/* harmony import */ var scrivito_sdk_data_integration_data_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8001);
/* harmony import */ var scrivito_sdk_data_integration_get_data_class__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(512);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4360);
/* harmony import */ var scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7461);

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
class ObjDataClass extends scrivito_sdk_data_integration_data_class__WEBPACK_IMPORTED_MODULE_2__/* .DataClass */ .bA {
  constructor(_name) {
    super();
    this._name = _name;
  }
  name() {
    return this._name;
  }
  create(attributes) {
    return __async(this, null, function* () {
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
  return (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .getObjFrom */ .ED)(objClassScope(dataClass).and(scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .excludeDeletedObjs */ .cb), dataId);
}
class ObjDataScope extends scrivito_sdk_data_integration_data_class__WEBPACK_IMPORTED_MODULE_2__/* .DataScope */ .bq {
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
    return __async(this, null, function* () {
      if (this.isBuiltInClass()) {
        throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .ArgumentError */ .c1(
          "Cannot create data items using the built-in Obj class"
        );
      }
      const obj = (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .createObjIn */ .ZU)(
        this.objClassScope(),
        prepareAttributes(
          __spreadValues(__spreadValues({}, attributes), this.attributesFromFilters(this._params.filters)),
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
    const search = this.getSearch();
    const parentObj = this.parentObj();
    const limit = (_a = this._params.limit) != null ? _a : scrivito_sdk_data_integration_data_class__WEBPACK_IMPORTED_MODULE_2__/* .DEFAULT_LIMIT */ .eH;
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
        filters: (0,scrivito_sdk_data_integration_data_class__WEBPACK_IMPORTED_MODULE_2__/* .combineFilters */ .Zc)(
          this._params.filters,
          this.normalizeFilters(filters)
        ),
        search: (0,scrivito_sdk_data_integration_data_class__WEBPACK_IMPORTED_MODULE_2__/* .combineSearches */ .IE)(this._params.search, search),
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
    if (!(0,scrivito_sdk_client__WEBPACK_IMPORTED_MODULE_0__/* .isEmptySpaceId */ .dQ)(search.objSpaceId())) {
      return new scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__/* .ObjSearch */ .G5(search);
    }
  }
  /** @internal */
  toPojo() {
    return __spreadValues({
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
  getInitialSearch() {
    return (this.isBuiltInClass() ? currentObjScope() : this.objClassScope()).and(scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .excludeDeletedObjs */ .cb).search();
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
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .ArgumentError */ .c1(`Unknown filter operator "${operator}"`);
  }
  applySubpagesFilter(search) {
    const parentObj = this.parentObj();
    const siteId = parentObj == null ? void 0 : parentObj.siteId();
    const parentPath = parentObj == null ? void 0 : parentObj.path();
    if (!siteId || !parentPath) {
      return (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .objSpaceScope */ .aG)(scrivito_sdk_client__WEBPACK_IMPORTED_MODULE_0__/* .EMPTY_SPACE */ .HY).search();
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
    return (0,scrivito_sdk_data_integration_data_class__WEBPACK_IMPORTED_MODULE_2__/* .itemIdFromFilters */ .mX)(this._params.filters);
  }
  parentObj() {
    var _a, _b;
    const parentId = (_b = (_a = this._params.filters) == null ? void 0 : _a._obj_parent_id) == null ? void 0 : _b.value;
    if (typeof parentId === "string") {
      return (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .getObjFrom */ .ED)(currentObjScope().and(scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .excludeDeletedObjs */ .cb), parentId);
    }
  }
}
class ObjDataItem extends scrivito_sdk_data_integration_data_class__WEBPACK_IMPORTED_MODULE_2__/* .DataItem */ .sO {
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
    return (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__/* .wrapInAppClass */ .Dy)(this.getOrThrow());
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
    if (!obj)
      return null;
    const typeInfo = getAttributeTypeInfo(obj.objClass(), attributeName);
    if (!typeInfo)
      return null;
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
    return __async(this, null, function* () {
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
      throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .ArgumentError */ .c1(`Missing obj with ID ${this._dataId}`);
    }
    return obj;
  }
}
function getAttributeTypeInfo(className, attributeName) {
  return getSchema(className).attribute(attributeName);
}
function isObjDataClassProvided(className) {
  return !!(0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__/* .getRealmClass */ .an)(className);
}
function getSchema(className) {
  const objClass = (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__/* .getRealmClass */ .an)(className);
  if (!objClass) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .ArgumentError */ .c1(`Class ${className} does not exist`);
  }
  const schema = scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__/* .Schema */ .Sj.forClass(objClass);
  if (!schema) {
    throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .ArgumentError */ .c1(`Class ${className} has no schema`);
  }
  return schema;
}
function objClassScope(dataClass) {
  return currentObjScope().and((0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .restrictToObjClass */ .Lw)(dataClass.name()));
}
function prepareAttributes(attributes, className) {
  const preparedAttributes = {};
  Object.keys(attributes).forEach((attributeName) => {
    const attributeValue = attributes[attributeName];
    if ((0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .isSystemAttribute */ .iI)(attributeName)) {
      preparedAttributes[attributeName] = attributeValue;
    } else {
      const typeInfo = getAttributeTypeInfo(className, attributeName);
      if (!typeInfo) {
        throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .ArgumentError */ .c1(
          `Attribute ${attributeName} of class ${className} does not exist`
        );
      }
      const [attributeType, attributeConfig] = typeInfo;
      if (!SUPPORTED_ATTRIBUTE_TYPES.includes(attributeType)) {
        throw new scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .ArgumentError */ .c1(
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
  if (!attributeConfig)
    return null;
  const referenceObj = obj.get(attributeName, "reference");
  if (!(referenceObj instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .BasicObj */ .kI))
    return null;
  const referenceObjClass = referenceObj.objClass();
  if (referenceObjClass !== getValidReferenceClass(attributeConfig)) {
    return null;
  }
  const dataClass = (0,scrivito_sdk_data_integration_get_data_class__WEBPACK_IMPORTED_MODULE_3__/* .getObjDataClass */ .Q$)(referenceObjClass);
  if (!dataClass)
    return null;
  return dataClass.get(referenceObj.id());
}
function prepareReferenceValue(attributeValue, attributeConfig) {
  return attributeValue instanceof scrivito_sdk_data_integration_data_class__WEBPACK_IMPORTED_MODULE_2__/* .DataItem */ .sO && attributeValue.dataClassName() === getValidReferenceClass(attributeConfig) ? (0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_5__/* .unwrapAppClass */ .zo)(attributeValue.obj()) : null;
}
function getValidReferenceClass(attributeConfig) {
  if (attributeConfig) {
    const { validClasses } = attributeConfig;
    if (validClasses.length === 1)
      return validClasses[0];
  }
}
function attributeDefinitions(dataClassName) {
  if (isBuiltInClass(dataClassName))
    return {};
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
  return (0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .objSpaceScope */ .aG)((0,scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_4__/* .currentObjSpaceId */ .eb)());
}
function isBuiltInClass(dataClassName) {
  return dataClassName === "Obj";
}


/***/ }),

/***/ 5606:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eW: () => (/* binding */ importFrom)
/* harmony export */ });
/* unused harmony exports provideLoadedEditingModule, isEditingModuleBeingLoaded */
/* harmony import */ var scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5460);
/* harmony import */ var scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5688);



const moduleLoaders = {
  reactEditing: () => __webpack_require__.e(/* import() */ 358).then(__webpack_require__.bind(__webpack_require__, 1358)),
  editingSupport: () => __webpack_require__.e(/* import() */ 993).then(__webpack_require__.bind(__webpack_require__, 3695))
};
const loadableModules = (0,scrivito_sdk_loadable__WEBPACK_IMPORTED_MODULE_1__/* .createLoadableCollection */ .rL)({
  loadElement: (moduleName) => ({ loader: moduleLoaders[moduleName] })
});
function importFrom(moduleName, symbol) {
  if (!scrivito_sdk_app_support_ui_adapter__WEBPACK_IMPORTED_MODULE_0__/* .uiAdapter */ .B)
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

/***/ 248:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  lx: () => (/* reexport */ OBJ_ID_PATTERN),
  HQ: () => (/* reexport */ finishLinkResolutionFor),
  wx: () => (/* reexport */ formatInternalLinks),
  AF: () => (/* reexport */ startLinkResolutionFor)
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
var common = __webpack_require__(5204);
;// CONCATENATED MODULE: ./scrivito_sdk/link_resolution/resolve_url.ts


function resolveUrl(url) {
  if (!urlResolutionHandler)
    throw new common/* InternalError */.Gd();
  return urlResolutionHandler(url);
}
let urlResolutionHandler;
function setUrlResolutionHandler(handler) {
  urlResolutionHandler = handler;
}

// EXTERNAL MODULE: ./scrivito_sdk/client/index.ts + 38 modules
var client = __webpack_require__(853);
// EXTERNAL MODULE: ./scrivito_sdk/data/index.ts + 29 modules
var data = __webpack_require__(1091);
// EXTERNAL MODULE: ../node_modules/lodash-es/isEqual.js
var isEqual = __webpack_require__(1900);
// EXTERNAL MODULE: ../node_modules/lodash-es/escape.js + 1 modules
var lodash_es_escape = __webpack_require__(8134);
// EXTERNAL MODULE: ../node_modules/lodash-es/toString.js + 1 modules
var lodash_es_toString = __webpack_require__(2624);
// EXTERNAL MODULE: ../node_modules/lodash-es/_basePropertyOf.js
var _basePropertyOf = __webpack_require__(9008);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_unescapeHtmlChar.js


var htmlUnescapes = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'"
};
var unescapeHtmlChar = (0,_basePropertyOf/* default */.A)(htmlUnescapes);
/* harmony default export */ const _unescapeHtmlChar = (unescapeHtmlChar);

;// CONCATENATED MODULE: ../node_modules/lodash-es/unescape.js



var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reHasEscapedHtml = RegExp(reEscapedHtml.source);
function unescape_unescape(string) {
  string = (0,lodash_es_toString/* default */.A)(string);
  return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, _unescapeHtmlChar) : string;
}
/* harmony default export */ const lodash_es_unescape = (unescape_unescape);

// EXTERNAL MODULE: external "urijs"
var external_urijs_ = __webpack_require__(4066);
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
  return (0,lodash_es_escape/* default */.A)(newUrl.href());
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

// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 29 modules
var loadable = __webpack_require__(5688);
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
      if (!(0,isEqual/* default */.A)(convertedDataWithoutLoading, attributeDataToConvert)) {
        update(objData, attributeName, widgetId, convertedDataWithoutLoading);
      }
      return;
    }
    return (0,loadable/* load */.Hh)(convertValue).then((convertedData) => {
      if ((0,isEqual/* default */.A)(convertedData, attributeDataToConvert))
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
  return !(0,isEqual/* default */.A)(attributeData, currentAttributeData);
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
    if (!objData)
      return;
    const objJson = objData.get();
    if (!objJson)
      return;
    const workers = [];
    (0,client/* withEachAttributeJson */.Yy)(objJson, (attributeJson, attributeName, widgetId) => {
      if (!isAnyLinkResolutionAttributeJson(attributeJson))
        return;
      workers.push(runWorker(attributeJson, objData, attributeName, widgetId));
    });
    if (workers.length)
      yield Promise.all(workers);
  });
}
(0,common/* onReset */.Nj)(link_resolution_reset);

;// CONCATENATED MODULE: ./scrivito_sdk/link_resolution/index.ts






/***/ }),

/***/ 5688:
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
  mn: () => (/* reexport */ waitUntilWritingFinished),
  J6: () => (/* reexport */ withoutLoading)
});

// UNUSED EXPORTS: CaptureReport, NotAvailableOfflineError, NotLoadedError, countOfflineStoreEntries, flushLoadableStreams, loadAllUntil, loadEntireIterable, loadableMapReduce, setOfflineMode

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
var common = __webpack_require__(5204);
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





function load_load(loadableFunction) {
  checkLoad(loadableFunction);
  return observeAndLoad(
    () => (0,state/* withFrozenState */.Ij)(
      {
        contextName: "Scrivito.load",
        message: "Use an async callback: Scrivito.load(/* ... */).then(/* ... */)."
      },
      loadableFunction
    )
  ).filter((observed) => !observed.meta.incomplete && !observed.meta.outdated).waitForFirst().then(getValueOrThrowError);
}
function checkLoad(loadableFunction) {
  if (typeof loadableFunction !== "function") {
    (0,common/* throwInvalidArgumentsError */.Ht)(
      "Scrivito.load",
      "Use an async callback: Scrivito.load(/* ... */).then(/* ... */).",
      { docPermalink: "js-sdk/load" }
    );
  }
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/loader_callback_process.ts



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
    onChange && onChange();
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
        (0,state/* addBatchUpdate */.Rs)(() => {
          effect();
          this.currentLoad = void 0;
          this.onChange && this.onChange();
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
    throw new common/* InternalError */.Gd();
  }
  return version;
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/offline_handling.ts

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
      loader: () => __async(this, null, function* () {
        return (yield isInOfflineMode) ? offlineLoader() : loader();
      })
    };
  }
  const offlineEntry = params.offlineEntry;
  if (!offlineEntry)
    return { loader };
  return {
    loader: () => __async(this, null, function* () {
      return (yield isInOfflineMode) ? loadFromEntry(offlineEntry) : loader();
    }),
    onChange: (0,common/* collectAndSchedule */.Lu)(common/* nextTick */.dY, () => __async(this, null, function* () {
      if (isEnabled && !(yield isInOfflineMode)) {
        storeIntoEntry(loadable, offlineEntry);
      }
    }))
  };
}
function storeIntoEntry(loadable, offlineEntry) {
  return __async(this, null, function* () {
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
  return __async(this, null, function* () {
    const data = yield offlineEntry.read();
    if (data === void 0) {
      throw new NotAvailableOfflineError(
        `missing: ${offlineEntry.debugIdentifier()})}`
      );
    }
    return data;
  });
}

// EXTERNAL MODULE: ../node_modules/lodash-es/toNumber.js + 2 modules
var toNumber = __webpack_require__(2886);
;// CONCATENATED MODULE: ../node_modules/lodash-es/toFinite.js


var INFINITY = 1 / 0, MAX_INTEGER = 17976931348623157e292;
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = (0,toNumber/* default */.A)(value);
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
    this.scheduleNextState = (0,common/* collectAndSchedule */.Lu)(
      state/* addBatchUpdate */.Rs,
      (state) => {
        if (!this.isStreamOpen())
          return;
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
const flushSubject = new common/* Subject */.B7();
function flushLoadableStreams() {
  flushSubject.next();
}
function enqueueFlush(callback) {
  const runCallbackOnce = lodash_es_once(callback);
  (0,common/* waitMs */.Cu)(UNSUBSCRIBE_DELAY).then(runCallbackOnce);
  flushSubject.waitForFirst().then(runCallbackOnce);
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
          if (!response)
            return;
          const wrappedData = yield response.json();
          const [data, key] = wrappedData;
          if (selector(data, key))
            return wrappedData;
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
        if (writingBeingPaused)
          yield writingBeingPaused.promise;
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
    const scrivitoCaches = yield openAllScrivitoCaches();
    yield Promise.all(
      scrivitoCaches.map((cache) => offline_store_async(this, null, function* () {
        const cacheKeys = yield cache.keys();
        yield Promise.all(
          cacheKeys.map((cacheKey) => offline_store_async(this, null, function* () {
            return cache.delete(cacheKey);
          }))
        );
      }))
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
      scrivitoCaches.map((cache) => offline_store_async(this, null, function* () {
        return (yield cache.keys()).length;
      }))
    );
    return cacheSizes.reduce((sum, size) => sum + size, 0);
  });
}
function openAllScrivitoCaches() {
  return offline_store_async(this, null, function* () {
    const cacheNames = yield caches.keys();
    const scrivitoCacheNames = cacheNames.filter(
      (name) => name.startsWith(CACHE_PREFIX)
    );
    return Promise.all(
      scrivitoCacheNames.map((cacheName) => caches.open(cacheName))
    );
  });
}
let writingBeingPaused;
function pauseAllWriting() {
  if (!writingBeingPaused)
    writingBeingPaused = new Deferred();
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
  if (metaHasBeenInvalidated(meta, invalidation))
    return "outdated";
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
  if (firstCaptured.isAllDataLoaded())
    secondCaptured.forwardToCurrent();
  return secondCaptured.result;
}

;// CONCATENATED MODULE: ./scrivito_sdk/loadable/dejitter_state_stream.ts


function dejitterStateStream(stream) {
  return new common/* Streamable */.RE((observer) => {
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
  const functionState = (0,state/* createStateContainer */.Ld)();
  return (...args) => {
    if (!isCurrentlyCapturing())
      return fn(...args);
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
    if (!currentState)
      return [];
    return Object.keys(currentState).map((key) => currentState[key]).filter(common/* isPresent */.Wo).filter(isAvailableState).map((state) => state.value);
  }
  findValuesInOfflineStore(selector) {
    return loadable_collection_async(this, null, function* () {
      if (!this.offlineStore)
        throw new common/* InternalError */.Gd();
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
  if (!found)
    throw new common/* InternalError */.Gd();
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
/* harmony export */   o_: () => (/* binding */ currentWorkspaceId)
/* harmony export */ });
/* unused harmony exports setCurrentWorkspaceId, resetCurrentWorkspaceId */
/* harmony import */ var scrivito_sdk_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(853);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5204);



let objSpaceId = scrivito_sdk_client__WEBPACK_IMPORTED_MODULE_0__/* .PUBLISHED_SPACE */ .M1;
function currentObjSpaceId() {
  return objSpaceId;
}
function isCurrentWorkspacePublished() {
  return objSpaceId === scrivito_sdk_client__WEBPACK_IMPORTED_MODULE_0__/* .PUBLISHED_SPACE */ .M1;
}
function currentWorkspaceId() {
  return objSpaceId[1];
}
function setCurrentWorkspaceId(id) {
  objSpaceId = id === "published" ? PUBLISHED_SPACE : ["workspace", id];
}
function resetCurrentWorkspaceId() {
  objSpaceId = scrivito_sdk_client__WEBPACK_IMPORTED_MODULE_0__/* .PUBLISHED_SPACE */ .M1;
}
(0,scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__/* .onReset */ .Nj)(resetCurrentWorkspaceId);


/***/ }),

/***/ 4360:
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
  rB: () => (/* reexport */ copyObjViaHandler),
  fK: () => (/* reexport */ createObjFromFileIn),
  ZU: () => (/* reexport */ createObjIn),
  eb: () => (/* reexport */ current_workspace_id/* currentObjSpaceId */.eb),
  o_: () => (/* reexport */ current_workspace_id/* currentWorkspaceId */.o_),
  Kp: () => (/* reexport */ emptyScope),
  cb: () => (/* reexport */ excludeDeletedObjs),
  S$: () => (/* reexport */ excludeGlobal),
  eF: () => (/* reexport */ getAllObjsByValueFrom),
  mM: () => (/* reexport */ getDetailsPageForDataParam),
  Z0: () => (/* reexport */ getObjBy),
  ud: () => (/* reexport */ getObjByPath),
  ED: () => (/* reexport */ getObjFrom),
  B9: () => (/* reexport */ getObjIncludingUnavailableFrom),
  t3: () => (/* reexport */ getPlacementModificationInfos),
  Mp: () => (/* reexport */ getRootObjFrom),
  gP: () => (/* reexport */ isDataLocatorValueViaFilter),
  Wf: () => (/* reexport */ isValidDataIdentifier),
  kq: () => (/* reexport */ isWrappingBasicContent),
  fZ: () => (/* reexport */ isWrappingBasicLink),
  mD: () => (/* reexport */ isWrappingBasicObj),
  aG: () => (/* reexport */ objSpaceScope),
  Wr: () => (/* reexport */ objSpaceScopeExcludingDeleted),
  Vg: () => (/* reexport */ restrictToContent),
  Lw: () => (/* reexport */ restrictToObjClass),
  rs: () => (/* reexport */ restrictToSite),
  y7: () => (/* reexport */ restrictToSiteAndGlobal),
  F1: () => (/* reexport */ setWantsAutoAttributeConversion),
  s8: () => (/* reexport */ updateReferences),
  $9: () => (/* reexport */ versionOnSite),
  GY: () => (/* reexport */ versionsOnAllSites),
  rF: () => (/* reexport */ wantsAutoAttributeConversion)
});

// UNUSED EXPORTS: BasicObjFacetValue, CMS_ATTRIBUTE_TYPES, OPERATORS, isCurrentWorkspacePublished, isDataLocatorValueOrOperatorFilter, isDataLocatorValueVia, isWrappingBasicWidget, normalizedRestriction, resetCurrentWorkspaceId, restrictToGlobal, serializeAttributes, setBinaryHandler, setCopyObjHandler, setCurrentWorkspaceId

// EXTERNAL MODULE: ../node_modules/lodash-es/mapValues.js
var mapValues = __webpack_require__(5796);
// EXTERNAL MODULE: ./scrivito_sdk/client/index.ts + 38 modules
var client = __webpack_require__(853);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(5204);
// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayMap.js
var _arrayMap = __webpack_require__(7148);
// EXTERNAL MODULE: ../node_modules/lodash-es/_SetCache.js + 2 modules
var _SetCache = __webpack_require__(2764);
// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayIncludes.js + 4 modules
var _arrayIncludes = __webpack_require__(3560);
// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayIncludesWith.js
var _arrayIncludesWith = __webpack_require__(537);
// EXTERNAL MODULE: ../node_modules/lodash-es/_baseUnary.js
var _baseUnary = __webpack_require__(7869);
// EXTERNAL MODULE: ../node_modules/lodash-es/_cacheHas.js
var _cacheHas = __webpack_require__(3515);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseIntersection.js







var nativeMin = Math.min;
function baseIntersection(arrays, iteratee, comparator) {
  var includes = comparator ? _arrayIncludesWith/* default */.A : _arrayIncludes/* default */.A, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array(othLength), maxLength = Infinity, result = [];
  while (othIndex--) {
    var array = arrays[othIndex];
    if (othIndex && iteratee) {
      array = (0,_arrayMap/* default */.A)(array, (0,_baseUnary/* default */.A)(iteratee));
    }
    maxLength = nativeMin(array.length, maxLength);
    caches[othIndex] = !comparator && (iteratee || length >= 120 && array.length >= 120) ? new _SetCache/* default */.A(othIndex && array) : void 0;
  }
  array = arrays[0];
  var index = -1, seen = caches[0];
  outer:
    while (++index < length && result.length < maxLength) {
      var value = array[index], computed = iteratee ? iteratee(value) : value;
      value = comparator || value !== 0 ? value : 0;
      if (!(seen ? (0,_cacheHas/* default */.A)(seen, computed) : includes(result, computed, comparator))) {
        othIndex = othLength;
        while (--othIndex) {
          var cache = caches[othIndex];
          if (!(cache ? (0,_cacheHas/* default */.A)(cache, computed) : includes(arrays[othIndex], computed, comparator))) {
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
var _baseRest = __webpack_require__(414);
// EXTERNAL MODULE: ../node_modules/lodash-es/isArrayLikeObject.js
var isArrayLikeObject = __webpack_require__(7861);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_castArrayLikeObject.js


function castArrayLikeObject(value) {
  return (0,isArrayLikeObject/* default */.A)(value) ? value : [];
}
/* harmony default export */ const _castArrayLikeObject = (castArrayLikeObject);

;// CONCATENATED MODULE: ../node_modules/lodash-es/intersection.js





var intersection = (0,_baseRest/* default */.A)(function(arrays) {
  var mapped = (0,_arrayMap/* default */.A)(arrays, _castArrayLikeObject);
  return mapped.length && mapped[0] === arrays[0] ? _baseIntersection(mapped) : [];
});
/* harmony default export */ const lodash_es_intersection = (intersection);

// EXTERNAL MODULE: ../node_modules/lodash-es/pick.js + 3 modules
var pick = __webpack_require__(6913);
;// CONCATENATED MODULE: ./scrivito_sdk/models/auto_convert.ts


let autoConvertAttributes = false;
function setWantsAutoAttributeConversion(value) {
  autoConvertAttributes = value;
}
function wantsAutoAttributeConversion() {
  return !!autoConvertAttributes;
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

// EXTERNAL MODULE: ./scrivito_sdk/data/index.ts + 29 modules
var scrivito_sdk_data = __webpack_require__(1091);
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
    if (!objData)
      return new ObjUnavailable(id, "notLoaded");
    if (!objData.isUnavailable())
      return new BasicObj(objData);
    if (objData.isForbidden())
      return new ObjUnavailable(id, "forbidden");
    return new ObjUnavailable(id, "nonexistent");
  }
  search() {
    return new BasicObjSearch(
      (0,client/* isRevisionObjSpaceId */.g7)(this.objSpaceId) ? client/* EMPTY_SPACE */.HY : this.objSpaceId
    ).includeDeleted();
  }
  create(id, attributes) {
    const objClass = attributes._obj_class;
    if (!objClass)
      throw new common/* InternalError */.Gd();
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
    if (values.includes(valueFromBackend))
      return valueFromBackend;
  }
  return null;
}
function deserializeMultienumValue(value, typeInfo) {
  if (isBackendValueOfType("stringlist", value)) {
    const [, { values }] = typeInfo;
    return lodash_es_intersection(value[1], values);
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
  return (0,common/* isValidFloat */.Rq)(floatValue) ? floatValue : null;
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
  const linkParams = (0,pick/* default */.A)(
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
var difference = __webpack_require__(5435);
// EXTERNAL MODULE: ../node_modules/lodash-es/isDate.js + 1 modules
var isDate = __webpack_require__(9231);
// EXTERNAL MODULE: ../node_modules/lodash-es/isEmpty.js
var isEmpty = __webpack_require__(1865);
// EXTERNAL MODULE: ../node_modules/lodash-es/isEqual.js
var isEqual = __webpack_require__(1900);
// EXTERNAL MODULE: ../node_modules/lodash-es/_baseIteratee.js + 10 modules
var _baseIteratee = __webpack_require__(146);
;// CONCATENATED MODULE: ../node_modules/lodash-es/negate.js

var FUNC_ERROR_TEXT = "Expected a function";
function negate(predicate) {
  if (typeof predicate != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  return function() {
    var args = arguments;
    switch (args.length) {
      case 0:
        return !predicate.call(this);
      case 1:
        return !predicate.call(this, args[0]);
      case 2:
        return !predicate.call(this, args[0], args[1]);
      case 3:
        return !predicate.call(this, args[0], args[1], args[2]);
    }
    return !predicate.apply(this, args);
  };
}
/* harmony default export */ const lodash_es_negate = (negate);

// EXTERNAL MODULE: ../node_modules/lodash-es/pickBy.js + 5 modules
var pickBy = __webpack_require__(1737);
;// CONCATENATED MODULE: ../node_modules/lodash-es/omitBy.js




function omitBy(object, predicate) {
  return (0,pickBy/* default */.A)(object, lodash_es_negate((0,_baseIteratee/* default */.A)(predicate)));
}
/* harmony default export */ const lodash_es_omitBy = (omitBy);

// EXTERNAL MODULE: external "urijs"
var external_urijs_ = __webpack_require__(4066);
// EXTERNAL MODULE: ./scrivito_sdk/link_resolution/index.ts + 8 modules
var link_resolution = __webpack_require__(248);
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
      return (0,common/* extractFromIterator */._Q)(this.iterator(), count);
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
  if ((0,isDate/* default */.A)(value))
    return convertDate(value, operator);
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
  const invalidOptions = (0,difference/* default */.A)(Object.keys(options), VALID_FACET_OPTIONS);
  if (invalidOptions.length) {
    throw new common/* ArgumentError */.c1(
      `Invalid facet options: ${(0,common/* prettyPrint */.aO)(
        invalidOptions
      )}. Valid options: ${VALID_FACET_OPTIONS.join()}`
    );
  }
  return options;
}

// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 29 modules
var loadable = __webpack_require__(5688);
// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(1946);
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
  into(target) {
    checkInto(target);
    (0,state/* failIfFrozen */.q2)("Changing CMS content");
    return this.intoId(target._scrivitoPrivateContent.id());
  }
  /** @internal */
  intoId(targetId) {
    if (!binaryHandler)
      throw new common/* InternalError */.Gd();
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
        throw new common/* InternalError */.Gd();
      binaryPromise = binaryHandler.uploadBinary(
        targetId,
        this.source,
        this.filename,
        this.contentType
      );
    }
    return binaryPromise.then(({ id }) => new Binary(id, (0,current_workspace_id/* currentObjSpaceId */.eb)()));
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
  constructor(_binaryId, objSpaceId = client/* PUBLISHED_SPACE */.M1) {
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
      return Object.keys(data).map(common/* camelCase */.xQ);
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
  const raw = new Binary(binaryId, PUBLISHED_SPACE).raw();
  if (transformation) {
    return raw.optimizeFor(transformation);
  }
  return raw;
}
class Binary {
  /** @internal */
  constructor(_id, _objSpaceId = client/* PUBLISHED_SPACE */.M1, transformation = {}) {
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
    return !(0,common/* equals */.aI)(this._objSpaceId, client/* PUBLISHED_SPACE */.M1);
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
    return this.isTransformed() && !(0,isEmpty/* default */.A)(this._transformation);
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
    return this.id() === binary.id() && (0,common/* equals */.aI)(this._objSpaceId, binary.objSpaceId()) && (0,isEqual/* default */.A)(this.definition(), binary.definition());
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
  if (options) {
    if ("contentType" in options && typeof options.contentType !== "string") {
      (0,common/* throwInvalidArgumentsError */.Ht)(
        "Binary.upload",
        "'options.contentType' must be a 'String'.",
        { docPermalink: "js-sdk/Binary-static-upload" }
      );
    }
    if ("filename" in options && typeof options.filename !== "string") {
      (0,common/* throwInvalidArgumentsError */.Ht)(
        "Binary.upload",
        "'options.filename' must be a 'String'.",
        { docPermalink: "js-sdk/Binary-static-upload" }
      );
    }
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
    if (!data)
      return null;
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
    return this.sortByChildOrder(this.children());
  }
  sortByChildOrder(objs) {
    if (objs.length === 0)
      return [];
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
    if (parentPath === null || siteId === null)
      return [];
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
      if (!Array.isArray(attributeValue))
        throw new common/* InternalError */.Gd();
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
    return other instanceof BasicObj && this.id() === other.id() && (0,common/* equals */.aI)(this.objSpaceId(), other.objSpaceId());
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
    return convertToSlug(title);
  }
  getWidgetData(id) {
    return this.objData.getWidget(id);
  }
  startLinkResolution() {
    if (!(0,scrivito_sdk_data/* isUsingInMemoryTenant */.xX)()) {
      (0,link_resolution/* startLinkResolutionFor */.AF)((0,current_workspace_id/* currentWorkspaceId */.o_)(), this.id());
    }
  }
  finishLinkResolution() {
    return (0,link_resolution/* finishLinkResolutionFor */.HQ)((0,current_workspace_id/* currentWorkspaceId */.o_)(), this.id());
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
      if ((0,common/* isSystemAttribute */.iI)(attributeName))
        return;
      const attributeJson = attrDictValue;
      if ((0,client/* isWidgetlistAttributeJson */.zt)(attributeJson))
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
    const placement = (0,scrivito_sdk_data/* findWidgetPlacement */.fT)(data, widgetId);
    if (!placement)
      return;
    const attributeName = (0,common/* camelCase */.xQ)(placement.attributeName);
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
  childOrder() {
    return this.get("childOrder", "referencelist");
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
  return objSpaceScopeExcludingDeleted((0,current_workspace_id/* currentObjSpaceId */.eb)());
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
    const scope = objSpaceScopeExcludingDeleted((0,current_workspace_id/* currentObjSpaceId */.eb)());
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
    return otherLink instanceof BasicLink && (0,isEqual/* default */.A)(
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
    return lodash_es_omitBy(
      this.attributes,
      (attribute) => attribute === null || attribute === void 0
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
    if (typeof viaRef === "boolean")
      return "multi";
    return viaRef;
  }
  /** @internal */
  query() {
    if (this._query)
      return [...this._query];
  }
  /** @internal */
  orderBy() {
    if (this._order_by)
      return [...this._order_by];
  }
  /** @internal */
  size() {
    return this._size;
  }
  /** @internal */
  toPojo() {
    if (this._class === null)
      return null;
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
  if ((0,common/* isEmptyValue */.Po)(serializedEntry[1]))
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
  if ((0,isDate/* default */.A)(value))
    return (0,common/* formatDateToString */.A)(value);
  if ((0,common/* isValidDateString */.Qr)(value))
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
  if ((0,common/* isValidFloat */.Rq)(value))
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
  if ((0,common/* isValidInteger */.zh)(value))
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
  if (!(0,common/* isStringArray */.Bo)(value)) {
    throwInvalidAttributeValue(
      value,
      name,
      `An array with values from ${(0,common/* prettyPrint */.aO)(values)}.`
    );
  }
  const forbiddenValues = (0,difference/* default */.A)(value, values);
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
  if (!(0,common/* isObject */.Gv)(value))
    return false;
  if ((0,isEmpty/* default */.A)(Object.values(value).filter(Boolean)))
    return false;
  const invalidKeys = (0,difference/* default */.A)(
    Object.keys(value),
    ["hash", "obj_id", "query", "rel", "target", "title", "url"]
  );
  return (0,isEmpty/* default */.A)(invalidKeys);
}
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
      (0,mapValues/* default */.A)(this.attributesToBeSaved, copyNormalizedValue)
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
    (0,common/* underscore */.z9)(attributeName),
    typeInfo
  );
}
function getContentValueUsingInternalName(content, internalAttributeName, typeInfo) {
  const rawValue = content.getAttributeData(internalAttributeName, typeInfo[0]);
  return deserialize(content, rawValue, typeInfo);
}
function serializeAttributes(content) {
  return (0,mapValues/* default */.A)(content.getData(), (value, name) => {
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
  return (0,mapValues/* default */.A)(attributes, (attributeValue, name) => {
    if ((0,common/* isSystemAttribute */.iI)(name)) {
      if (Array.isArray(attributeValue))
        return attributeValue;
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
  return __async(this, null, function* () {
    const objJson = yield (0,loadable/* load */.Hh)(() => obj.getData());
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
  (0,client/* withEachAttributeJson */.Yy)(objJson, (jsonToUpdate, attributeName, widgetId) => {
    const convert = getConversion(jsonToUpdate);
    if (!convert)
      return;
    const worker = (0,loadable/* load */.Hh)(() => convert(jsonToUpdate, fn)).then((newJson) => {
      const currentJson = widgetId ? obj.getWidgetAttribute(widgetId, attributeName) : obj.getAttributeData(attributeName);
      if (!(0,common/* equals */.aI)(currentJson, jsonToUpdate))
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
      link_resolution/* OBJ_ID_PATTERN */.lx,
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
    if ((0,current_workspace_id/* isCurrentWorkspacePublished */.bW)()) {
      throw new common/* ScrivitoError */.aS("The published content cannot be modified.");
    }
    (0,state/* failIfFrozen */.q2)("Changing CMS content");
    if (!copyObjHandler)
      throw new common/* InternalError */.Gd();
    const toObjSpaceId = (0,current_workspace_id/* currentObjSpaceId */.eb)();
    const newObjId = yield copyObjHandler.copyObj({
      fromObjId: fromObj.id(),
      fromObjSpaceId: fromObj.objSpaceId(),
      toObjSpaceId
    });
    const newObj = yield (0,loadable/* load */.Hh)(
      () => getObjFrom(objSpaceScope(toObjSpaceId), newObjId)
    );
    if (!newObj)
      throw new common/* InternalError */.Gd();
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
  if (!(0,scrivito_sdk_data/* isWidgetlistDiff */.M_)(diff) || !diff.content) {
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

;// CONCATENATED MODULE: ./scrivito_sdk/models/index.ts







































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
/* harmony export */   e_: () => (/* binding */ areLayoutComponentsStored),
/* harmony export */   oC: () => (/* binding */ getLayoutComponentForAppClass)
/* harmony export */ });
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5204);
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
  if (!layoutComponentsStoredState.get()) {
    layoutComponentsStoredState.set(true);
  }
}
const layoutComponentsStoredState = (0,scrivito_sdk_state__WEBPACK_IMPORTED_MODULE_1__/* .createStateContainer */ .Ld)();
function areLayoutComponentsStored() {
  var _a;
  return (_a = layoutComponentsStoredState.get()) != null ? _a : false;
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4924);
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
  if (data.class() === null)
    return children;
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(scrivito_sdk_react_data_context_container__WEBPACK_IMPORTED_MODULE_1__/* .PushOntoDataStack */ .NN, { data: dataScope }, children);
});


/***/ }),

/***/ 92:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ WidgetTagContext),
/* harmony export */   i: () => (/* binding */ WidgetContent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4924);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_editing_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1616);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5204);
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

/***/ 2934:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ WidgetTag)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4924);
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
    if (!WidgetTagWithEditing)
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Tag, __spreadValues({}, otherProps));
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



function connectAndMemoize(component) {
  const connectedComponent = (0,scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_1__/* .connect */ .Ng)(component);
  if ((0,scrivito_sdk_react_connect__WEBPACK_IMPORTED_MODULE_1__/* .isClassComponent */ .Gf)(connectedComponent))
    return connectedComponent;
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
/* harmony export */   _W: () => (/* binding */ useLastDataStackElement),
/* harmony export */   iH: () => (/* binding */ useDataContextContainer),
/* harmony export */   sT: () => (/* binding */ ProvidePlaceholders),
/* harmony export */   t0: () => (/* binding */ useClosestMultiItemElement)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4924);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9800);
/* harmony import */ var scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4360);
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
  return dataStack && dataStack.find((element) => !("isBackground" in element));
}
function useClosestMultiItemElement(dataClassName) {
  var _a, _b;
  return (_b = (_a = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataStackReactContext)) == null ? void 0 : _a.dataStack) == null ? void 0 : _b.find(
    (element) => {
      return (0,scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__/* .isMultiItemDataScopePojo */ .VI)(element) && (dataClassName === void 0 || element._class === dataClassName);
    }
  );
}
function useClosestSingleItemElement(dataClassName) {
  var _a, _b;
  return (_b = (_a = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataStackReactContext)) == null ? void 0 : _a.dataStack) == null ? void 0 : _b.find(
    (element) => {
      return (0,scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__/* .isSingleItemElement */ .Uq)(element) && (dataClassName === void 0 && !("isBackground" in element) || element._class === dataClassName);
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
    if (data instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__/* .DataItem */ .sO) {
      return {
        _class: data.dataClassName(),
        _id: data.id()
      };
    }
    return data instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__/* .DataScope */ .bq ? data.toPojo() : data;
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
    if (source instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__/* .DataScope */ .bq) {
      return {
        dataStack: [source.toPojo(), ...dataStack],
        placeholders: {}
      };
    }
    const placeholders = computePlaceholders((0,scrivito_sdk_realm__WEBPACK_IMPORTED_MODULE_3__/* .unwrapAppClass */ .zo)(source));
    const { _class, _id } = placeholders;
    const stackElement = _class && _id && __spreadValues({ _class, _id }, isBackground && { isBackground });
    return {
      dataStack: stackElement ? [stackElement, ...dataStack] : dataStack,
      placeholders
    };
  }
}
function computePlaceholders(from) {
  if (from instanceof scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__/* .DataItem */ .sO) {
    return (0,scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__/* .dataItemToDataContext */ .A_)(from);
  }
  if (from instanceof scrivito_sdk_models__WEBPACK_IMPORTED_MODULE_2__/* .BasicObj */ .kI) {
    return (0,scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_1__/* .basicObjToDataContext */ .gk)(from);
  }
  return from;
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
/* harmony import */ var scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9800);
/* harmony import */ var scrivito_sdk_react_data_context_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4686);



function useDataLocator(dataLocator) {
  const dataStack = (0,scrivito_sdk_react_data_context_container__WEBPACK_IMPORTED_MODULE_1__/* .useDataStack */ .CW)() || [];
  return (0,scrivito_sdk_data_integration__WEBPACK_IMPORTED_MODULE_0__/* .applyDataLocator */ .ZJ)(dataStack, dataLocator);
}


/***/ }),

/***/ 5163:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ useLayoutAwareInPlaceEditing)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4924);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_app_support_layout_editing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(263);
/* harmony import */ var scrivito_sdk_react_in_place_editing_enabled_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5180);
/* harmony import */ var scrivito_sdk_react_is_inside_layout_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5478);





function useLayoutAwareInPlaceEditing() {
  const inPlaceEditingEnabled = react__WEBPACK_IMPORTED_MODULE_0__.useContext(scrivito_sdk_react_in_place_editing_enabled_context__WEBPACK_IMPORTED_MODULE_2__/* .InPlaceEditingEnabledContext */ .F);
  const isInsideLayoutContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(scrivito_sdk_react_is_inside_layout_context__WEBPACK_IMPORTED_MODULE_3__/* .IsInsideLayoutContext */ .G);
  return inPlaceEditingEnabled && (isInsideLayoutContext && (0,scrivito_sdk_app_support_layout_editing__WEBPACK_IMPORTED_MODULE_1__/* .isLayoutEditable */ .BJ)() || !isInsideLayoutContext && (0,scrivito_sdk_app_support_layout_editing__WEBPACK_IMPORTED_MODULE_1__/* .isPageEditable */ .m9)());
}


/***/ }),

/***/ 5180:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ InPlaceEditingEnabledContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4924);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const InPlaceEditingEnabledContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(true);


/***/ }),

/***/ 9955:
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
  CY: () => (/* reexport */ InPlaceEditingOff),
  bI: () => (/* reexport */ LinkTag),
  zK: () => (/* reexport */ NotFoundErrorPage),
  R$: () => (/* reexport */ RestoreInPlaceEditing),
  i1: () => (/* reexport */ widget_content/* WidgetContent */.i),
  zG: () => (/* reexport */ widget_tag/* WidgetTag */.z),
  K8: () => (/* reexport */ component_registry/* getComponentForId */.K8),
  IS: () => (/* reexport */ has_component/* hasComponent */.I),
  lo: () => (/* reexport */ provideComponent),
  NX: () => (/* reexport */ provideDataErrorComponent),
  nq: () => (/* reexport */ provideLayoutComponent),
  Nj: () => (/* reexport */ registerComponent),
  FM: () => (/* reexport */ showExtension),
  rj: () => (/* reexport */ useAttributeDefinition),
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
var external_react_ = __webpack_require__(4924);
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

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(5204);
// EXTERNAL MODULE: ./scrivito_sdk/react/connect_and_memoize.ts
var connect_and_memoize = __webpack_require__(6031);
// EXTERNAL MODULE: ./scrivito_sdk/realm/index.ts + 21 modules
var realm = __webpack_require__(7461);
;// CONCATENATED MODULE: ./scrivito_sdk/react/provide_layout_component.ts







function provideLayoutComponent(objClass, component) {
  if (!(0,realm/* isObjClass */.I6)(objClass)) {
    (0,common/* throwInvalidArgumentsError */.Ht)(
      "provideLayoutComponent",
      "A layout component must be provided only for Objs",
      { docPermalink: "js-sdk/provideLayoutComponent" }
    );
  }
  const className = (0,get_class_name/* getClassName */.u)(objClass);
  if (isComponentMissingName(component))
    component.displayName = className;
  (0,component_registry/* registerLayoutComponentForAppClass */.X5)(className, (0,connect_and_memoize/* connectAndMemoize */.M)(component));
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
    this.loadingRegistry[imageUrl] = (0,common/* promiseAndFinally */.Qk)(
      promise,
      () => delete this.loadingRegistry[imageUrl]
    );
  }
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/scale_down_binary.ts
var scale_down_binary = __webpack_require__(6409);
// EXTERNAL MODULE: ./scrivito_sdk/models/index.ts + 44 modules
var models = __webpack_require__(4360);
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
// EXTERNAL MODULE: ./scrivito_sdk/data_integration/index.ts + 13 modules
var data_integration = __webpack_require__(9800);
// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 29 modules
var loadable = __webpack_require__(5688);
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
      onClick
    }),
    children
  );
  function getHref() {
    var _a2;
    return ((_a2 = getDestination()) == null ? void 0 : _a2.href) || "#";
  }
  function getTarget() {
    if (props.target)
      return props.target;
    if (props.to instanceof realm/* Link */.N_) {
      return (0,realm/* unwrapAppClass */.zo)(props.to).target() || void 0;
    }
  }
  function getRel() {
    if ("rel" in props)
      return props.rel;
    if (props.to instanceof realm/* Link */.N_) {
      return (0,realm/* unwrapAppClass */.zo)(props.to).rel() || void 0;
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
      const destination = yield (0,loadable/* load */.Hh)(getDestination);
      if (!destination)
        return;
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
    if (!props.to)
      return null;
    if (props.to instanceof data_integration/* DataItem */.sO) {
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
    if (!url)
      return null;
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
      queryParameters = link_tag_spreadValues(link_tag_spreadValues({}, (0,data_integration/* getDataContextParameters */.K1)(basicObjOrLink, dataStack)), queryParameters);
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
    if (!parent)
      return null;
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
// EXTERNAL MODULE: ../node_modules/lodash-es/escape.js + 1 modules
var lodash_es_escape = __webpack_require__(8134);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/browser_location.ts + 1 modules
var browser_location = __webpack_require__(7478);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_page_data.ts
var current_page_data = __webpack_require__(5634);
// EXTERNAL MODULE: external "urijs"
var external_urijs_ = __webpack_require__(4066);
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
    const uri = external_urijs_(url);
    if (!(0,routing/* isLocalUri */.S$)(uri)) {
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
var replace_internal_links = __webpack_require__(7440);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/scroll_into_view.ts + 1 modules
var scroll_into_view = __webpack_require__(3648);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/can_edit.ts
var can_edit = __webpack_require__(5057);
// EXTERNAL MODULE: ./scrivito_sdk/react/components/content_tag/widget_content.tsx
var widget_content = __webpack_require__(92);
// EXTERNAL MODULE: ./scrivito_sdk/react/hooks/use_layout_aware_in_place_editing.ts
var use_layout_aware_in_place_editing = __webpack_require__(5163);
;// CONCATENATED MODULE: ./scrivito_sdk/react/components/content_tag/widget_value.tsx









const WidgetValue = (0,react_connect/* connect */.Ng)(function WidgetValue2({
  field,
  widgetProps
}) {
  const isInPlaceEditingEnabled = (0,use_layout_aware_in_place_editing/* useLayoutAwareInPlaceEditing */.E)();
  if ((0,editing_context/* isComparisonActive */.gY)())
    throw new common/* InternalError */.Gd("Not yet implemented");
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
  if (!isInPlaceEditingEnabled)
    return null;
  const WidgetPlaceholder = (0,import_from/* importFrom */.eW)("reactEditing", "WidgetPlaceholder");
  return WidgetPlaceholder ? /* @__PURE__ */ external_react_.createElement(WidgetPlaceholder, { field }) : null;
});

;// CONCATENATED MODULE: ./scrivito_sdk/react/components/content_tag/widgetlist_value.tsx










const WidgetlistValue = (0,react_connect/* connect */.Ng)(function WidgetlistValue2({
  field,
  widgetProps
}) {
  const isInPlaceEditingEnabled = (0,use_layout_aware_in_place_editing/* useLayoutAwareInPlaceEditing */.E)();
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
    return /* @__PURE__ */ external_react_.createElement(external_react_.Fragment, null, (0,models/* getPlacementModificationInfos */.t3)(field, (0,get_comparison_range/* getComparisonRange */.d)()).map(
      (info) => /* @__PURE__ */ external_react_.createElement(
        widget_content/* WidgetContent */.i,
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
  if (!isInPlaceEditingEnabled)
    return null;
  const WidgetlistPlaceholder = (0,import_from/* importFrom */.eW)(
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


















const AttributeValue = (0,react_connect/* connect */.Ng)(
  withDisplayName(
    "Scrivito.ContentTag.AttributeValue",
    (props) => {
      const dataContextContainer = (0,data_context_container/* useDataContextContainer */.iH)();
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
    if (!linkTarget)
      return null;
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
        diffContent || (0,data_integration/* replacePlaceholdersWithData */.V8)(field.get(), {
          placeholders,
          dataStack,
          transform: lodash_es_escape/* default */.A
        }),
        { dataStack }
      )
    },
    onClick: handleClickOnHtml
  };
}
function renderPropsForString(field, customChildren, dataContextContainer) {
  if ((0,editing_context/* isComparisonActive */.gY)()) {
    const diffContent = field.getHtmlDiffContent((0,get_comparison_range/* getComparisonRange */.d)());
    if (diffContent) {
      return { dangerouslySetInnerHTML: { __html: diffContent } };
    }
  }
  const placeholders = dataContextContainer == null ? void 0 : dataContextContainer.placeholders;
  const dataStack = dataContextContainer == null ? void 0 : dataContextContainer.dataStack;
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
  if (!baseUrl)
    return false;
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
    elementCallback
  } = _b, customProps = content_tag_objRest(_b, [
    "content",
    "attribute",
    "tag",
    "dataContext",
    "widgetProps",
    "elementCallback"
  ]);
  const isInPlaceEditingEnabled = (0,use_layout_aware_in_place_editing/* useLayoutAwareInPlaceEditing */.E)();
  if (!content)
    return null;
  let field = getField(content, attribute);
  if (!field)
    return null;
  if ((0,editing_context/* isComparisonActive */.gY)()) {
    const [fromField, toField] = getFieldsForComparison(field);
    if (shouldComparisonBeSkipped(fromField, toField))
      return null;
    field = toField || fromField;
    if (!field)
      return null;
  }
  if ((!(0,editing_context/* isInPlaceEditingActive */.HD)() || !isInPlaceEditingEnabled) && !(0,editing_context/* isComparisonActive */.gY)() && (0,common/* isEmptyValue */.Po)(field.get()) && (0,content_tags_for_empty_attributes/* shouldContentTagsForEmptyAttributesBeSkipped */.C)()) {
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
  if (!dataContext)
    return attributeValue;
  return /* @__PURE__ */ external_react_.createElement(data_context_container/* ProvidePlaceholders */.sT, { source: dataContext }, attributeValue);
});
function getField(content, attribute) {
  const field = realm/* Schema */.Sj.basicFieldFor(content, attribute);
  if (field)
    return field;
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
  if (!widgetProps)
    return;
  const fieldType = field.type();
  if (!(fieldType === "widget" || fieldType === "widgetlist")) {
    (0,common/* throwNextTick */.JL)(
      new common/* ArgumentError */.c1(
        'The prop "widgetProps" is only allowed for widget and widgetlist attributes'
      )
    );
  }
}
function shouldComparisonBeSkipped(fromField, toField) {
  return (0,common/* isEmptyValue */.Po)(fromField == null ? void 0 : fromField.get()) && (0,common/* isEmptyValue */.Po)(toField == null ? void 0 : toField.get()) && (0,content_tags_for_empty_attributes/* shouldContentTagsForEmptyAttributesBeSkipped */.C)();
}
const ContentTag = (0,react_connect/* connect */.Ng)(
  ContentTagWithElementCallback
);
ContentTag.displayName = "Scrivito.ContentTag";
function isDataContextObject(dataContext) {
  return !!dataContext && !(dataContext instanceof data_integration/* DataItem */.sO) && !(dataContext instanceof data_integration/* DataScope */.bq) && !(dataContext instanceof realm/* Obj */.OH);
}

// EXTERNAL MODULE: ./scrivito_sdk/react/components/automatic_data_context.tsx
var automatic_data_context = __webpack_require__(843);
;// CONCATENATED MODULE: ./scrivito_sdk/react/scroll_window.ts




let previousNavigationState;
function notifyScrollWindow(navigationState) {
  if (!(0,browser_location/* isCurrentHistoryState */.zE)(navigationState.historyState))
    return;
  if (shouldScroll(navigationState))
    (0,common/* scrollTo */.VG)(0, 0);
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
  if ((0,routing/* isObjNotFoundRoute */.UO)(route))
    return true;
  if ((0,routing/* isNotResponsibleRoute */.tV)(route))
    return false;
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

// EXTERNAL MODULE: ./scrivito_sdk/react/is_inside_layout_context.tsx
var is_inside_layout_context = __webpack_require__(5478);
;// CONCATENATED MODULE: ./scrivito_sdk/react/components/current_page/details_page_data_context.tsx






const DetailsPageDataContext = (0,react_connect/* connect */.Ng)(function DetailsPageDataContext2({
  page,
  params,
  children
}) {
  if (!page)
    return children;
  const dataContext = (0,data_integration/* dataContextFromQueryParams */._f)(page, params);
  if (dataContext === "loading")
    return null;
  if (dataContext === "unavailable")
    return renderDataError();
  if (!dataContext)
    return children;
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
  if (!page)
    return children;
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
;// CONCATENATED MODULE: ./scrivito_sdk/react/components/current_page/use_layout.tsx












const LayoutIndexContext = external_react_.createContext(0);
function useLayout(page, params) {
  const layoutIndex = external_react_.useContext(LayoutIndexContext);
  if (!(0,component_registry/* areLayoutComponentsStored */.e_)())
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
    const ancestorPaths = (0,common/* computeAncestorPaths */.FQ)(path);
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
    throw new common/* InternalError */.Gd();
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
  return /* @__PURE__ */ external_react_.createElement(PageDataContext, { page }, /* @__PURE__ */ external_react_.createElement(DetailsPageDataContext, { page, params }, /* @__PURE__ */ external_react_.createElement(LayoutIndexContext.Provider, { value: layoutIndex + 1 }, Component ? /* @__PURE__ */ external_react_.createElement(Component, { page: (0,realm/* wrapInAppClass */.Dy)(page) }) : /* @__PURE__ */ external_react_.createElement(CurrentPage, null))));
});

;// CONCATENATED MODULE: ./scrivito_sdk/react/components/current_page.tsx













const CurrentPage = (0,react_connect/* connect */.Ng)(
  function CurrentPage2() {
    const pageData = (0,current_page_data/* getCurrentPageData */.Vd)();
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
const CurrentPageWithLayout = (0,react_connect/* connect */.Ng)(function CurrentPageWithLayout2({
  currentPage,
  navigationState
}) {
  var _a, _b;
  const params = external_urijs_.parseQuery((_b = (_a = navigationState == null ? void 0 : navigationState.locationRoute) == null ? void 0 : _a.query) != null ? _b : "");
  const layout = useLayout(currentPage, params);
  if (layout)
    return layout === "loading" ? null : layout;
  const PageComponent = getComponentForPageClass(currentPage.objClass());
  return /* @__PURE__ */ external_react_.createElement(PageDataContext, { page: currentPage }, /* @__PURE__ */ external_react_.createElement(DetailsPageDataContext, { page: currentPage, params }, /* @__PURE__ */ external_react_.createElement(automatic_data_context/* AutomaticDataContext */.T, { content: currentPage }, /* @__PURE__ */ external_react_.createElement(is_inside_layout_context/* IsInsideLayoutContext */.G.Provider, { value: false }, /* @__PURE__ */ external_react_.createElement(PageScroll, { navigationState }), PageComponent && /* @__PURE__ */ external_react_.createElement(
    PageComponent,
    {
      page: (0,realm/* wrapInAppClass */.Dy)(currentPage),
      params
    }
  )))));
});
CurrentPage.displayName = "Scrivito.CurrentPage";

// EXTERNAL MODULE: external "react-dom"
var external_react_dom_ = __webpack_require__(5301);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/legacy_render_extension.ts
var legacy_render_extension = __webpack_require__(9398);
;// CONCATENATED MODULE: ./scrivito_sdk/react/components/extensions.tsx





let onShowExtension;
function showExtension(reactElement) {
  if (!onShowExtension)
    return (0,legacy_render_extension/* legacyRenderExtension */.b)(reactElement);
  onShowExtension(reactElement);
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
  if (content instanceof models/* Binary */.yI) {
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
  const { initialUrl, highResUrlToDecode } = (0,scale_down_binary/* scaleDownBinary */.s1)(binary);
  const decodedImg = highResUrlToDecode && (decoder == null ? void 0 : decoder.getImage(highResUrlToDecode));
  return decodedImg || initialUrl;
}
function getFullWidth(binary, width, isLazy) {
  if (isLazy && !(0,scale_down_binary/* isInitialUrlAvailable */.js)(binary))
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
  if (attributeType === "binary")
    return field.get();
  if (attributeType === "reference") {
    const referenced = field.get();
    if (!(referenced instanceof models/* BasicObj */.kI))
      return null;
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




function InPlaceEditingOff({ children }) {
  return (0,editing_context/* isInPlaceEditingActive */.HD)() ? /* @__PURE__ */ external_react_.createElement(in_place_editing_enabled_context/* InPlaceEditingEnabledContext */.F.Provider, { children, value: false }) : children;
}
function RestoreInPlaceEditing({
  children
}) {
  return (0,editing_context/* isInPlaceEditingActive */.HD)() ? /* @__PURE__ */ external_react_.createElement(in_place_editing_enabled_context/* InPlaceEditingEnabledContext */.F.Provider, { children, value: true }) : children;
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/components/not_found_error_page.tsx






const NotFoundErrorPage = (0,react_connect/* connect */.Ng)(function NotFoundErrorPage2({ children }) {
  const navigationState = (0,current_page_data/* getNotFoundErrorPageState */.uR)();
  if (!navigationState)
    return null;
  if (!(0,browser_location/* isCurrentHistoryState */.zE)(navigationState.historyState))
    return null;
  return /* @__PURE__ */ external_react_.createElement(external_react_.Fragment, null, /* @__PURE__ */ external_react_.createElement(PageScroll, { navigationState }), children || /* @__PURE__ */ external_react_.createElement("div", null, /* @__PURE__ */ external_react_.createElement("h1", null, "The page you were looking for doesn't exist."), /* @__PURE__ */ external_react_.createElement("p", null, "You may have mistyped the address or the page may have moved.")));
});
NotFoundErrorPage.displayName = "Scrivito.NotFoundErrorPage";

;// CONCATENATED MODULE: ./scrivito_sdk/react/hooks/use_data.ts



function useData() {
  const lastElement = (0,data_context_container/* useLastDataStackElement */._W)();
  if (!lastElement)
    return new data_integration/* EmptyDataScope */.Ao();
  const scopeOrItem = (0,data_integration/* deserializeDataStackElement */.uw)(lastElement);
  if (!scopeOrItem)
    return new data_integration/* EmptyDataScope */.Ao();
  if (scopeOrItem instanceof data_integration/* DataItem */.sO) {
    return scopeOrItem.dataClass().all().transform({ filters: { _id: scopeOrItem.id() } });
  }
  return scopeOrItem;
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/hooks/use_data_item.ts



function useDataItem(dataClassName) {
  const stackElement = (0,data_context_container/* useClosestSingleItemElement */.OW)(dataClassName) || dataClassName && (0,data_integration/* findItemInGlobalData */.dw)(dataClassName);
  if (!stackElement)
    return;
  if ((0,data_integration/* isDataItemPojo */.o3)(stackElement))
    return (0,data_integration/* deserializeDataItem */.bU)(stackElement);
  const itemPojo = (0,data_integration/* scopePojoToItemPojo */.Zk)(stackElement);
  if (itemPojo)
    return (0,data_integration/* deserializeDataItem */.bU)(itemPojo);
}

// EXTERNAL MODULE: ./scrivito_sdk/react/hooks/use_data_locator.ts
var use_data_locator = __webpack_require__(3726);
;// CONCATENATED MODULE: ./scrivito_sdk/react/hooks/use_data_scope.ts



function useDataScope(dataClassName) {
  const stackElement = (0,data_context_container/* useClosestMultiItemElement */.t0)(dataClassName);
  if (stackElement)
    return (0,data_integration/* deserializeDataScope */.w1)(stackElement);
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
  if (target instanceof models/* Binary */.yI || !dataStack)
    return givenQuery;
  return (0,data_integration/* getDataContextQuery */.qD)((0,realm/* unwrapAppClass */.zo)(target), dataStack, givenQuery);
}

;// CONCATENATED MODULE: ./scrivito_sdk/react/hooks/use_resolved_value.ts





function useResolvedHtmlValue(text) {
  return useResolvedValue(text, lodash_es_escape/* default */.A);
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

// EXTERNAL MODULE: ./scrivito_sdk/react/has_component.ts
var has_component = __webpack_require__(580);
;// CONCATENATED MODULE: ./scrivito_sdk/react/index.ts






























/***/ }),

/***/ 5478:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ IsInsideLayoutContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4924);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const IsInsideLayoutContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(true);


/***/ }),

/***/ 9576:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ memo)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4924);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrivito_sdk_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5204);



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
var external_react_ = __webpack_require__(4924);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(5204);
// EXTERNAL MODULE: ./scrivito_sdk/data/index.ts + 29 modules
var data = __webpack_require__(1091);
// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 29 modules
var loadable = __webpack_require__(5688);
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
  const connectorRef = external_react_.useRef();
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

// EXTERNAL MODULE: ./scrivito_sdk/models/index.ts + 44 modules
var models = __webpack_require__(4360);
// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(5204);
// EXTERNAL MODULE: ../node_modules/lodash-es/mapValues.js
var mapValues = __webpack_require__(5796);
// EXTERNAL MODULE: ../node_modules/lodash-es/pickBy.js + 5 modules
var pickBy = __webpack_require__(1737);
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
    if (!schema)
      return null;
    const typeInfo = schema.attribute(attributeName);
    if (!typeInfo)
      return null;
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
      throw new common/* ArgumentError */.c1(
        "Use a specific class (like TextWidget or ImageWidget) to create a Widget."
      );
    }
    assertValidAttributes(attributes);
    const schema = Schema.forInstance(this);
    if (!schema)
      throw new common/* InternalError */.Gd();
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
  return (0,pickBy/* default */.A)(
    mapping,
    (modelClass) => Obj.isPrototypeOf(modelClass)
  );
}
function allWidgetClasses() {
  return (0,pickBy/* default */.A)(
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
    if (!internalValue.hasDestination())
      return null;
    return buildAppClassInstance(internalValue, Link);
  }
  if (internalValue instanceof models/* ObjUnavailable */.Wk)
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
  return (0,mapValues/* default */.A)(appAttributes, (value, name) => {
    if ((0,common/* isSystemAttribute */.iI)(name))
      return [value];
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
  const appClassName = objClassNameFor(model.constructor);
  if (!appClassName) {
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
  if (Array.isArray(value))
    return value.map((v) => unwrapAppClass(v));
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
  createFromFile(file, attributes = {}) {
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
    return (0,models/* createObjFromFileIn */.fK)(
      this.scope().and((0,models/* restrictToObjClass */.Lw)(objClassName)),
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
      (0,models/* getObjFrom */.ED)(this.getScopeRestrictedToSameClass(scope), id)
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











function currentSiteContext(objClass) {
  const siteId = currentSiteId();
  if (!siteId)
    return new BasicSiteContext(objClass, (0,models/* emptyScope */.Kp)());
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
    return (0,models/* copyObjViaHandler */.rB)(this._scrivitoPrivateContent).then(
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

// EXTERNAL MODULE: ../node_modules/lodash-es/difference.js + 1 modules
var difference = __webpack_require__(5435);
// EXTERNAL MODULE: ../node_modules/lodash-es/isEmpty.js
var isEmpty = __webpack_require__(1865);
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
  const unknownAttrs = (0,difference/* default */.A)(Object.keys(attributes), ALLOWED_ATTRIBUTES);
  if (!(0,isEmpty/* default */.A)(unknownAttrs)) {
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
  if (!obj)
    return null;
  return unwrapAppClass(obj).id();
}

;// CONCATENATED MODULE: ./scrivito_sdk/realm/app_class_api_check.ts


function validateAttributeDefinitions(attributeDefinitions, target) {
  Object.entries(attributeDefinitions).forEach(([name, definition]) => {
    assertCustomAttributeName(name, target);
    const [attributeType, attributeTypeOptions] = definition;
    if (attributeType === "widgetlist" && typeof attributeTypeOptions !== "string") {
      assertWidgetlistDefinition(name, attributeTypeOptions, target);
    }
  });
}
function assertWidgetlistDefinition(name, options, target) {
  if (options.maximum !== void 0) {
    const { maximum } = options;
    if (Number.isInteger(maximum) && maximum > 0)
      return;
    (0,common/* throwInvalidArgumentsError */.Ht)(
      target,
      `invalid value "${maximum}" supplied to ${name}: The "maximum" must be a positive integer.`,
      { docPermalink: `'js-sdk/${target}'` }
    );
  }
}
function assertCustomAttributeName(name, target) {
  if (isCustomAttributeName(name))
    return;
  (0,common/* throwInvalidArgumentsError */.Ht)(
    target,
    `attribute name "${name}" is invalid. Must be a string (alphanumeric, starting with a lower-case character).`,
    { docPermalink: `'js-sdk/${target}'` }
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
    if (schema.isBinary())
      return;
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
  if (ATTRIBUTE_TYPES_WHITELIST.includes(attributeType))
    return;
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
  if (!className)
    return;
  const objClass = getRealmClass(className);
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
    throw new common/* InternalError */.Gd();
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

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(5204);
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
    if (subscriber.hasChanges())
      subscriber.notify();
  });
}
const notifyAsyncSubscribers = (0,common/* collectAndSchedule */.Lu)(
  common/* nextTick */.dY,
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

/***/ 4924:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 5301:
/***/ ((module) => {

module.exports = require("react-dom");

/***/ }),

/***/ 4066:
/***/ ((module) => {

module.exports = require("urijs");

/***/ }),

/***/ 5080:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ _ListCache)
});

;// CONCATENATED MODULE: ../node_modules/lodash-es/_listCacheClear.js

function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
/* harmony default export */ const _listCacheClear = (listCacheClear);

// EXTERNAL MODULE: ../node_modules/lodash-es/eq.js
var eq = __webpack_require__(1920);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_assocIndexOf.js


function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if ((0,eq/* default */.A)(array[length][0], key)) {
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

/***/ 1879:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getNative_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2695);
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3013);



var Map = (0,_getNative_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(_root_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A, "Map");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Map);


/***/ }),

/***/ 2905:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ _MapCache)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_getNative.js + 4 modules
var _getNative = __webpack_require__(2695);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_nativeCreate.js


var nativeCreate = (0,_getNative/* default */.A)(Object, "create");
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
var _ListCache = __webpack_require__(5080);
// EXTERNAL MODULE: ../node_modules/lodash-es/_Map.js
var _Map = __webpack_require__(1879);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_mapCacheClear.js




function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new _Hash(),
    "map": new (_Map/* default */.A || _ListCache/* default */.A)(),
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

/***/ 4409:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getNative_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2695);
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3013);



var Set = (0,_getNative_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(_root_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A, "Set");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Set);


/***/ }),

/***/ 2764:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ _SetCache)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_MapCache.js + 14 modules
var _MapCache = __webpack_require__(2905);
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
  this.__data__ = new _MapCache/* default */.A();
  while (++index < length) {
    this.add(values[index]);
  }
}
SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
SetCache.prototype.has = _setCacheHas;
/* harmony default export */ const _SetCache = (SetCache);


/***/ }),

/***/ 4474:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ _Stack)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_ListCache.js + 6 modules
var _ListCache = __webpack_require__(5080);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_stackClear.js


function stackClear() {
  this.__data__ = new _ListCache/* default */.A();
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
var _Map = __webpack_require__(1879);
// EXTERNAL MODULE: ../node_modules/lodash-es/_MapCache.js + 14 modules
var _MapCache = __webpack_require__(2905);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_stackSet.js




var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof _ListCache/* default */.A) {
    var pairs = data.__data__;
    if (!_Map/* default */.A || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new _MapCache/* default */.A(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
/* harmony default export */ const _stackSet = (stackSet);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_Stack.js







function Stack(entries) {
  var data = this.__data__ = new _ListCache/* default */.A(entries);
  this.size = data.size;
}
Stack.prototype.clear = _stackClear;
Stack.prototype["delete"] = _stackDelete;
Stack.prototype.get = _stackGet;
Stack.prototype.has = _stackHas;
Stack.prototype.set = _stackSet;
/* harmony default export */ const _Stack = (Stack);


/***/ }),

/***/ 3145:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3013);


var Symbol = _root_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.Symbol;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Symbol);


/***/ }),

/***/ 3560:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ _arrayIncludes)
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

/***/ 537:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
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

/***/ 1829:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ _arrayLikeKeys)
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
var isArguments = __webpack_require__(3102);
// EXTERNAL MODULE: ../node_modules/lodash-es/isArray.js
var isArray = __webpack_require__(2105);
// EXTERNAL MODULE: ../node_modules/lodash-es/isBuffer.js + 1 modules
var isBuffer = __webpack_require__(7603);
// EXTERNAL MODULE: ../node_modules/lodash-es/_isIndex.js
var _isIndex = __webpack_require__(4161);
// EXTERNAL MODULE: ../node_modules/lodash-es/isTypedArray.js + 1 modules
var isTypedArray = __webpack_require__(7975);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_arrayLikeKeys.js







var objectProto = Object.prototype;
var _arrayLikeKeys_hasOwnProperty = objectProto.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = (0,isArray/* default */.A)(value), isArg = !isArr && (0,isArguments/* default */.A)(value), isBuff = !isArr && !isArg && (0,isBuffer/* default */.A)(value), isType = !isArr && !isArg && !isBuff && (0,isTypedArray/* default */.A)(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? _baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || _arrayLikeKeys_hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    (0,_isIndex/* default */.A)(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
/* harmony default export */ const _arrayLikeKeys = (arrayLikeKeys);


/***/ }),

/***/ 7148:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
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

/***/ 6872:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
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

/***/ 840:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6803);


function baseAssignValue(object, key, value) {
  if (key == "__proto__" && _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A) {
    (0,_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(object, key, {
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

/***/ 2574:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ _baseFlatten)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayPush.js
var _arrayPush = __webpack_require__(6872);
// EXTERNAL MODULE: ../node_modules/lodash-es/_Symbol.js
var _Symbol = __webpack_require__(3145);
// EXTERNAL MODULE: ../node_modules/lodash-es/isArguments.js + 1 modules
var isArguments = __webpack_require__(3102);
// EXTERNAL MODULE: ../node_modules/lodash-es/isArray.js
var isArray = __webpack_require__(2105);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_isFlattenable.js




var spreadableSymbol = _Symbol/* default */.A ? _Symbol/* default */.A.isConcatSpreadable : void 0;
function isFlattenable(value) {
  return (0,isArray/* default */.A)(value) || (0,isArguments/* default */.A)(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
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
        (0,_arrayPush/* default */.A)(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}
/* harmony default export */ const _baseFlatten = (baseFlatten);


/***/ }),

/***/ 2209:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ _baseForOwn)
});

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
var keys = __webpack_require__(7382);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseForOwn.js



function baseForOwn(object, iteratee) {
  return object && _baseFor(object, iteratee, keys/* default */.A);
}
/* harmony default export */ const _baseForOwn = (baseForOwn);


/***/ }),

/***/ 8374:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _castPath_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8502);
/* harmony import */ var _toKey_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6589);



function baseGet(object, path) {
  path = (0,_castPath_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(path, object);
  var index = 0, length = path.length;
  while (object != null && index < length) {
    object = object[(0,_toKey_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(path[index++])];
  }
  return index && index == length ? object : void 0;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseGet);


/***/ }),

/***/ 5423:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _arrayPush_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6872);
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2105);



function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return (0,_isArray_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(object) ? result : (0,_arrayPush_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(result, symbolsFunc(object));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseGetAllKeys);


/***/ }),

/***/ 5583:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ _baseGetTag)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_Symbol.js
var _Symbol = __webpack_require__(3145);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_getRawTag.js


var objectProto = Object.prototype;
var _getRawTag_hasOwnProperty = objectProto.hasOwnProperty;
var nativeObjectToString = objectProto.toString;
var symToStringTag = _Symbol/* default */.A ? _Symbol/* default */.A.toStringTag : void 0;
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
var _baseGetTag_symToStringTag = _Symbol/* default */.A ? _Symbol/* default */.A.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return _baseGetTag_symToStringTag && _baseGetTag_symToStringTag in Object(value) ? _getRawTag(value) : _objectToString(value);
}
/* harmony default export */ const _baseGetTag = (baseGetTag);


/***/ }),

/***/ 7688:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ _baseIsEqual)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_Stack.js + 5 modules
var _Stack = __webpack_require__(4474);
// EXTERNAL MODULE: ../node_modules/lodash-es/_SetCache.js + 2 modules
var _SetCache = __webpack_require__(2764);
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
var _cacheHas = __webpack_require__(3515);
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
  var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new _SetCache/* default */.A() : void 0;
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
        if (!(0,_cacheHas/* default */.A)(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
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
var _Symbol = __webpack_require__(3145);
// EXTERNAL MODULE: ../node_modules/lodash-es/_root.js
var _root = __webpack_require__(3013);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_Uint8Array.js


var Uint8Array = _root/* default */.A.Uint8Array;
/* harmony default export */ const _Uint8Array = (Uint8Array);

// EXTERNAL MODULE: ../node_modules/lodash-es/eq.js
var eq = __webpack_require__(1920);
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
var _setToArray = __webpack_require__(95);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_equalByTag.js







var _equalByTag_COMPARE_PARTIAL_FLAG = 1, _equalByTag_COMPARE_UNORDERED_FLAG = 2;
var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]";
var symbolProto = _Symbol/* default */.A ? _Symbol/* default */.A.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
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
      return (0,eq/* default */.A)(+object, +other);
    case errorTag:
      return object.name == other.name && object.message == other.message;
    case regexpTag:
    case stringTag:
      return object == other + "";
    case mapTag:
      var convert = _mapToArray;
    case setTag:
      var isPartial = bitmask & _equalByTag_COMPARE_PARTIAL_FLAG;
      convert || (convert = _setToArray/* default */.A);
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
var _baseGetAllKeys = __webpack_require__(5423);
// EXTERNAL MODULE: ../node_modules/lodash-es/_getSymbols.js + 1 modules
var _getSymbols = __webpack_require__(7198);
// EXTERNAL MODULE: ../node_modules/lodash-es/keys.js
var keys = __webpack_require__(7382);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_getAllKeys.js




function getAllKeys(object) {
  return (0,_baseGetAllKeys/* default */.A)(object, keys/* default */.A, _getSymbols/* default */.A);
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
var _getTag = __webpack_require__(8056);
// EXTERNAL MODULE: ../node_modules/lodash-es/isArray.js
var isArray = __webpack_require__(2105);
// EXTERNAL MODULE: ../node_modules/lodash-es/isBuffer.js + 1 modules
var isBuffer = __webpack_require__(7603);
// EXTERNAL MODULE: ../node_modules/lodash-es/isTypedArray.js + 1 modules
var isTypedArray = __webpack_require__(7975);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseIsEqualDeep.js









var _baseIsEqualDeep_COMPARE_PARTIAL_FLAG = 1;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
var _baseIsEqualDeep_objectProto = Object.prototype;
var _baseIsEqualDeep_hasOwnProperty = _baseIsEqualDeep_objectProto.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = (0,isArray/* default */.A)(object), othIsArr = (0,isArray/* default */.A)(other), objTag = objIsArr ? arrayTag : (0,_getTag/* default */.A)(object), othTag = othIsArr ? arrayTag : (0,_getTag/* default */.A)(other);
  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;
  var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
  if (isSameTag && (0,isBuffer/* default */.A)(object)) {
    if (!(0,isBuffer/* default */.A)(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new _Stack/* default */.A());
    return objIsArr || (0,isTypedArray/* default */.A)(object) ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack) : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & _baseIsEqualDeep_COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && _baseIsEqualDeep_hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && _baseIsEqualDeep_hasOwnProperty.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new _Stack/* default */.A());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new _Stack/* default */.A());
  return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}
/* harmony default export */ const _baseIsEqualDeep = (baseIsEqualDeep);

// EXTERNAL MODULE: ../node_modules/lodash-es/isObjectLike.js
var isObjectLike = __webpack_require__(4146);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseIsEqual.js



function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !(0,isObjectLike/* default */.A)(value) && !(0,isObjectLike/* default */.A)(other)) {
    return value !== value && other !== other;
  }
  return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}
/* harmony default export */ const _baseIsEqual = (baseIsEqual);


/***/ }),

/***/ 146:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ _baseIteratee)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_Stack.js + 5 modules
var _Stack = __webpack_require__(4474);
// EXTERNAL MODULE: ../node_modules/lodash-es/_baseIsEqual.js + 8 modules
var _baseIsEqual = __webpack_require__(7688);
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
      var stack = new _Stack/* default */.A();
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === void 0 ? (0,_baseIsEqual/* default */.A)(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
        return false;
      }
    }
  }
  return true;
}
/* harmony default export */ const _baseIsMatch = (baseIsMatch);

// EXTERNAL MODULE: ../node_modules/lodash-es/isObject.js
var isObject = __webpack_require__(5221);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_isStrictComparable.js


function isStrictComparable(value) {
  return value === value && !(0,isObject/* default */.A)(value);
}
/* harmony default export */ const _isStrictComparable = (isStrictComparable);

// EXTERNAL MODULE: ../node_modules/lodash-es/keys.js
var keys = __webpack_require__(7382);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_getMatchData.js



function getMatchData(object) {
  var result = (0,keys/* default */.A)(object), length = result.length;
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
var _baseGet = __webpack_require__(8374);
;// CONCATENATED MODULE: ../node_modules/lodash-es/get.js


function get(object, path, defaultValue) {
  var result = object == null ? void 0 : (0,_baseGet/* default */.A)(object, path);
  return result === void 0 ? defaultValue : result;
}
/* harmony default export */ const lodash_es_get = (get);

// EXTERNAL MODULE: ../node_modules/lodash-es/hasIn.js + 2 modules
var hasIn = __webpack_require__(1085);
// EXTERNAL MODULE: ../node_modules/lodash-es/_isKey.js
var _isKey = __webpack_require__(3858);
// EXTERNAL MODULE: ../node_modules/lodash-es/_toKey.js
var _toKey = __webpack_require__(6589);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseMatchesProperty.js








var _baseMatchesProperty_COMPARE_PARTIAL_FLAG = 1, _baseMatchesProperty_COMPARE_UNORDERED_FLAG = 2;
function baseMatchesProperty(path, srcValue) {
  if ((0,_isKey/* default */.A)(path) && _isStrictComparable(srcValue)) {
    return _matchesStrictComparable((0,_toKey/* default */.A)(path), srcValue);
  }
  return function(object) {
    var objValue = lodash_es_get(object, path);
    return objValue === void 0 && objValue === srcValue ? (0,hasIn/* default */.A)(object, path) : (0,_baseIsEqual/* default */.A)(srcValue, objValue, _baseMatchesProperty_COMPARE_PARTIAL_FLAG | _baseMatchesProperty_COMPARE_UNORDERED_FLAG);
  };
}
/* harmony default export */ const _baseMatchesProperty = (baseMatchesProperty);

// EXTERNAL MODULE: ../node_modules/lodash-es/identity.js
var identity = __webpack_require__(9064);
// EXTERNAL MODULE: ../node_modules/lodash-es/isArray.js
var isArray = __webpack_require__(2105);
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
    return (0,_baseGet/* default */.A)(object, path);
  };
}
/* harmony default export */ const _basePropertyDeep = (basePropertyDeep);

;// CONCATENATED MODULE: ../node_modules/lodash-es/property.js





function property(path) {
  return (0,_isKey/* default */.A)(path) ? _baseProperty((0,_toKey/* default */.A)(path)) : _basePropertyDeep(path);
}
/* harmony default export */ const lodash_es_property = (property);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseIteratee.js






function baseIteratee(value) {
  if (typeof value == "function") {
    return value;
  }
  if (value == null) {
    return identity/* default */.A;
  }
  if (typeof value == "object") {
    return (0,isArray/* default */.A)(value) ? _baseMatchesProperty(value[0], value[1]) : _baseMatches(value);
  }
  return lodash_es_property(value);
}
/* harmony default export */ const _baseIteratee = (baseIteratee);


/***/ }),

/***/ 9471:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ _baseKeys)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_isPrototype.js
var _isPrototype = __webpack_require__(2975);
// EXTERNAL MODULE: ../node_modules/lodash-es/_overArg.js
var _overArg = __webpack_require__(4999);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_nativeKeys.js


var nativeKeys = (0,_overArg/* default */.A)(Object.keys, Object);
/* harmony default export */ const _nativeKeys = (nativeKeys);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseKeys.js



var objectProto = Object.prototype;
var _baseKeys_hasOwnProperty = objectProto.hasOwnProperty;
function baseKeys(object) {
  if (!(0,_isPrototype/* default */.A)(object)) {
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

/***/ 2492:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ _basePickBy)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_baseGet.js
var _baseGet = __webpack_require__(8374);
// EXTERNAL MODULE: ../node_modules/lodash-es/_baseAssignValue.js
var _baseAssignValue = __webpack_require__(840);
// EXTERNAL MODULE: ../node_modules/lodash-es/eq.js
var eq = __webpack_require__(1920);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_assignValue.js



var objectProto = Object.prototype;
var _assignValue_hasOwnProperty = objectProto.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(_assignValue_hasOwnProperty.call(object, key) && (0,eq/* default */.A)(objValue, value)) || value === void 0 && !(key in object)) {
    (0,_baseAssignValue/* default */.A)(object, key, value);
  }
}
/* harmony default export */ const _assignValue = (assignValue);

// EXTERNAL MODULE: ../node_modules/lodash-es/_castPath.js + 2 modules
var _castPath = __webpack_require__(8502);
// EXTERNAL MODULE: ../node_modules/lodash-es/_isIndex.js
var _isIndex = __webpack_require__(4161);
// EXTERNAL MODULE: ../node_modules/lodash-es/isObject.js
var isObject = __webpack_require__(5221);
// EXTERNAL MODULE: ../node_modules/lodash-es/_toKey.js
var _toKey = __webpack_require__(6589);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseSet.js






function baseSet(object, path, value, customizer) {
  if (!(0,isObject/* default */.A)(object)) {
    return object;
  }
  path = (0,_castPath/* default */.A)(path, object);
  var index = -1, length = path.length, lastIndex = length - 1, nested = object;
  while (nested != null && ++index < length) {
    var key = (0,_toKey/* default */.A)(path[index]), newValue = value;
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return object;
    }
    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : void 0;
      if (newValue === void 0) {
        newValue = (0,isObject/* default */.A)(objValue) ? objValue : (0,_isIndex/* default */.A)(path[index + 1]) ? [] : {};
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
    var path = paths[index], value = (0,_baseGet/* default */.A)(object, path);
    if (predicate(value, path)) {
      _baseSet(result, (0,_castPath/* default */.A)(path, object), value);
    }
  }
  return result;
}
/* harmony default export */ const _basePickBy = (basePickBy);


/***/ }),

/***/ 9008:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function basePropertyOf(object) {
  return function(key) {
    return object == null ? void 0 : object[key];
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (basePropertyOf);


/***/ }),

/***/ 414:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9064);
/* harmony import */ var _overRest_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3352);
/* harmony import */ var _setToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6151);




function baseRest(func, start) {
  return (0,_setToString_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)((0,_overRest_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(func, start, _identity_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A), func + "");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseRest);


/***/ }),

/***/ 7869:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseUnary);


/***/ }),

/***/ 8417:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ _baseUniq)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_SetCache.js + 2 modules
var _SetCache = __webpack_require__(2764);
// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayIncludes.js + 4 modules
var _arrayIncludes = __webpack_require__(3560);
// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayIncludesWith.js
var _arrayIncludesWith = __webpack_require__(537);
// EXTERNAL MODULE: ../node_modules/lodash-es/_cacheHas.js
var _cacheHas = __webpack_require__(3515);
// EXTERNAL MODULE: ../node_modules/lodash-es/_Set.js
var _Set = __webpack_require__(4409);
;// CONCATENATED MODULE: ../node_modules/lodash-es/noop.js

function noop() {
}
/* harmony default export */ const lodash_es_noop = (noop);

// EXTERNAL MODULE: ../node_modules/lodash-es/_setToArray.js
var _setToArray = __webpack_require__(95);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_createSet.js




var INFINITY = 1 / 0;
var createSet = !(_Set/* default */.A && 1 / (0,_setToArray/* default */.A)(new _Set/* default */.A([, -0]))[1] == INFINITY) ? lodash_es_noop : function(values) {
  return new _Set/* default */.A(values);
};
/* harmony default export */ const _createSet = (createSet);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseUniq.js







var LARGE_ARRAY_SIZE = 200;
function baseUniq(array, iteratee, comparator) {
  var index = -1, includes = _arrayIncludes/* default */.A, length = array.length, isCommon = true, result = [], seen = result;
  if (comparator) {
    isCommon = false;
    includes = _arrayIncludesWith/* default */.A;
  } else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : _createSet(array);
    if (set) {
      return (0,_setToArray/* default */.A)(set);
    }
    isCommon = false;
    includes = _cacheHas/* default */.A;
    seen = new _SetCache/* default */.A();
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


/***/ }),

/***/ 3515:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function cacheHas(cache, key) {
  return cache.has(key);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cacheHas);


/***/ }),

/***/ 8502:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ _castPath)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/isArray.js
var isArray = __webpack_require__(2105);
// EXTERNAL MODULE: ../node_modules/lodash-es/_isKey.js
var _isKey = __webpack_require__(3858);
// EXTERNAL MODULE: ../node_modules/lodash-es/memoize.js
var memoize = __webpack_require__(3920);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_memoizeCapped.js


var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
  var result = (0,memoize/* default */.A)(func, function(key) {
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
var lodash_es_toString = __webpack_require__(2624);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_castPath.js





function castPath(value, object) {
  if ((0,isArray/* default */.A)(value)) {
    return value;
  }
  return (0,_isKey/* default */.A)(value, object) ? [value] : _stringToPath((0,lodash_es_toString/* default */.A)(value));
}
/* harmony default export */ const _castPath = (castPath);


/***/ }),

/***/ 6803:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getNative_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2695);


var defineProperty = function() {
  try {
    var func = (0,_getNative_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defineProperty);


/***/ }),

/***/ 3840:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (freeGlobal);


/***/ }),

/***/ 2695:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ _getNative)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/isFunction.js
var isFunction = __webpack_require__(7730);
// EXTERNAL MODULE: ../node_modules/lodash-es/_root.js
var _root = __webpack_require__(3013);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_coreJsData.js


var coreJsData = _root/* default */.A["__core-js_shared__"];
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
var isObject = __webpack_require__(5221);
// EXTERNAL MODULE: ../node_modules/lodash-es/_toSource.js
var _toSource = __webpack_require__(7657);
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
  if (!(0,isObject/* default */.A)(value) || _isMasked(value)) {
    return false;
  }
  var pattern = (0,isFunction/* default */.A)(value) ? reIsNative : reIsHostCtor;
  return pattern.test((0,_toSource/* default */.A)(value));
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

/***/ 7815:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _overArg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4999);


var getPrototype = (0,_overArg_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(Object.getPrototypeOf, Object);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getPrototype);


/***/ }),

/***/ 7198:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ _getSymbols)
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
var stubArray = __webpack_require__(6793);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_getSymbols.js



var objectProto = Object.prototype;
var propertyIsEnumerable = objectProto.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray/* default */.A : function(object) {
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

/***/ 8056:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ _getTag)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_getNative.js + 4 modules
var _getNative = __webpack_require__(2695);
// EXTERNAL MODULE: ../node_modules/lodash-es/_root.js
var _root = __webpack_require__(3013);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_DataView.js



var DataView = (0,_getNative/* default */.A)(_root/* default */.A, "DataView");
/* harmony default export */ const _DataView = (DataView);

// EXTERNAL MODULE: ../node_modules/lodash-es/_Map.js
var _Map = __webpack_require__(1879);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_Promise.js



var Promise = (0,_getNative/* default */.A)(_root/* default */.A, "Promise");
/* harmony default export */ const _Promise = (Promise);

// EXTERNAL MODULE: ../node_modules/lodash-es/_Set.js
var _Set = __webpack_require__(4409);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_WeakMap.js



var WeakMap = (0,_getNative/* default */.A)(_root/* default */.A, "WeakMap");
/* harmony default export */ const _WeakMap = (WeakMap);

// EXTERNAL MODULE: ../node_modules/lodash-es/_baseGetTag.js + 2 modules
var _baseGetTag = __webpack_require__(5583);
// EXTERNAL MODULE: ../node_modules/lodash-es/_toSource.js
var _toSource = __webpack_require__(7657);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_getTag.js








var mapTag = "[object Map]", objectTag = "[object Object]", promiseTag = "[object Promise]", setTag = "[object Set]", weakMapTag = "[object WeakMap]";
var dataViewTag = "[object DataView]";
var dataViewCtorString = (0,_toSource/* default */.A)(_DataView), mapCtorString = (0,_toSource/* default */.A)(_Map/* default */.A), promiseCtorString = (0,_toSource/* default */.A)(_Promise), setCtorString = (0,_toSource/* default */.A)(_Set/* default */.A), weakMapCtorString = (0,_toSource/* default */.A)(_WeakMap);
var getTag = _baseGetTag/* default */.A;
if (_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag || _Map/* default */.A && getTag(new _Map/* default */.A()) != mapTag || _Promise && getTag(_Promise.resolve()) != promiseTag || _Set/* default */.A && getTag(new _Set/* default */.A()) != setTag || _WeakMap && getTag(new _WeakMap()) != weakMapTag) {
  getTag = function(value) {
    var result = (0,_baseGetTag/* default */.A)(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? (0,_toSource/* default */.A)(Ctor) : "";
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

/***/ 4161:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
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

/***/ 3858:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2105);
/* harmony import */ var _isSymbol_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8418);



var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
function isKey(value, object) {
  if ((0,_isArray_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(value)) {
    return false;
  }
  var type = typeof value;
  if (type == "number" || type == "symbol" || type == "boolean" || value == null || (0,_isSymbol_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isKey);


/***/ }),

/***/ 2975:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

var objectProto = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
  return value === proto;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isPrototype);


/***/ }),

/***/ 8369:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _freeGlobal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3840);


var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var freeProcess = moduleExports && _freeGlobal_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.process;
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

/***/ 4999:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (overArg);


/***/ }),

/***/ 3352:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ _overRest)
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

/***/ 3013:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _freeGlobal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3840);


var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = _freeGlobal_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A || freeSelf || Function("return this")();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (root);


/***/ }),

/***/ 95:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
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

/***/ 6151:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ _setToString)
});

;// CONCATENATED MODULE: ../node_modules/lodash-es/constant.js

function constant(value) {
  return function() {
    return value;
  };
}
/* harmony default export */ const lodash_es_constant = (constant);

// EXTERNAL MODULE: ../node_modules/lodash-es/_defineProperty.js
var _defineProperty = __webpack_require__(6803);
// EXTERNAL MODULE: ../node_modules/lodash-es/identity.js
var identity = __webpack_require__(9064);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseSetToString.js




var baseSetToString = !_defineProperty/* default */.A ? identity/* default */.A : function(func, string) {
  return (0,_defineProperty/* default */.A)(func, "toString", {
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

/***/ 6589:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _isSymbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8418);


var INFINITY = 1 / 0;
function toKey(value) {
  if (typeof value == "string" || (0,_isSymbol_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toKey);


/***/ }),

/***/ 7657:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
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

/***/ 8783:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ lodash_es_debounce)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/isObject.js
var isObject = __webpack_require__(5221);
// EXTERNAL MODULE: ../node_modules/lodash-es/_root.js
var _root = __webpack_require__(3013);
;// CONCATENATED MODULE: ../node_modules/lodash-es/now.js


var now = function() {
  return _root/* default */.A.Date.now();
};
/* harmony default export */ const lodash_es_now = (now);

// EXTERNAL MODULE: ../node_modules/lodash-es/toNumber.js + 2 modules
var toNumber = __webpack_require__(2886);
;// CONCATENATED MODULE: ../node_modules/lodash-es/debounce.js




var FUNC_ERROR_TEXT = "Expected a function";
var nativeMax = Math.max, nativeMin = Math.min;
function debounce(func, wait, options) {
  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = (0,toNumber/* default */.A)(wait) || 0;
  if ((0,isObject/* default */.A)(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax((0,toNumber/* default */.A)(options.maxWait) || 0, wait) : maxWait;
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

/***/ 5435:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ lodash_es_difference)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_SetCache.js + 2 modules
var _SetCache = __webpack_require__(2764);
// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayIncludes.js + 4 modules
var _arrayIncludes = __webpack_require__(3560);
// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayIncludesWith.js
var _arrayIncludesWith = __webpack_require__(537);
// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayMap.js
var _arrayMap = __webpack_require__(7148);
// EXTERNAL MODULE: ../node_modules/lodash-es/_baseUnary.js
var _baseUnary = __webpack_require__(7869);
// EXTERNAL MODULE: ../node_modules/lodash-es/_cacheHas.js
var _cacheHas = __webpack_require__(3515);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseDifference.js







var LARGE_ARRAY_SIZE = 200;
function baseDifference(array, values, iteratee, comparator) {
  var index = -1, includes = _arrayIncludes/* default */.A, isCommon = true, length = array.length, result = [], valuesLength = values.length;
  if (!length) {
    return result;
  }
  if (iteratee) {
    values = (0,_arrayMap/* default */.A)(values, (0,_baseUnary/* default */.A)(iteratee));
  }
  if (comparator) {
    includes = _arrayIncludesWith/* default */.A;
    isCommon = false;
  } else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = _cacheHas/* default */.A;
    isCommon = false;
    values = new _SetCache/* default */.A(values);
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
var _baseFlatten = __webpack_require__(2574);
// EXTERNAL MODULE: ../node_modules/lodash-es/_baseRest.js
var _baseRest = __webpack_require__(414);
// EXTERNAL MODULE: ../node_modules/lodash-es/isArrayLikeObject.js
var isArrayLikeObject = __webpack_require__(7861);
;// CONCATENATED MODULE: ../node_modules/lodash-es/difference.js





var difference = (0,_baseRest/* default */.A)(function(array, values) {
  return (0,isArrayLikeObject/* default */.A)(array) ? _baseDifference(array, (0,_baseFlatten/* default */.A)(values, 1, isArrayLikeObject/* default */.A, true)) : [];
});
/* harmony default export */ const lodash_es_difference = (difference);


/***/ }),

/***/ 1920:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function eq(value, other) {
  return value === other || value !== value && other !== other;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (eq);


/***/ }),

/***/ 8134:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ lodash_es_escape)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_basePropertyOf.js
var _basePropertyOf = __webpack_require__(9008);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_escapeHtmlChar.js


var htmlEscapes = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var escapeHtmlChar = (0,_basePropertyOf/* default */.A)(htmlEscapes);
/* harmony default export */ const _escapeHtmlChar = (escapeHtmlChar);

// EXTERNAL MODULE: ../node_modules/lodash-es/toString.js + 1 modules
var lodash_es_toString = __webpack_require__(2624);
;// CONCATENATED MODULE: ../node_modules/lodash-es/escape.js



var reUnescapedHtml = /[&<>"']/g, reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
function escape_escape(string) {
  string = (0,lodash_es_toString/* default */.A)(string);
  return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, _escapeHtmlChar) : string;
}
/* harmony default export */ const lodash_es_escape = (escape_escape);


/***/ }),

/***/ 1085:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ lodash_es_hasIn)
});

;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseHasIn.js

function baseHasIn(object, key) {
  return object != null && key in Object(object);
}
/* harmony default export */ const _baseHasIn = (baseHasIn);

// EXTERNAL MODULE: ../node_modules/lodash-es/_castPath.js + 2 modules
var _castPath = __webpack_require__(8502);
// EXTERNAL MODULE: ../node_modules/lodash-es/isArguments.js + 1 modules
var isArguments = __webpack_require__(3102);
// EXTERNAL MODULE: ../node_modules/lodash-es/isArray.js
var isArray = __webpack_require__(2105);
// EXTERNAL MODULE: ../node_modules/lodash-es/_isIndex.js
var _isIndex = __webpack_require__(4161);
// EXTERNAL MODULE: ../node_modules/lodash-es/isLength.js
var isLength = __webpack_require__(5966);
// EXTERNAL MODULE: ../node_modules/lodash-es/_toKey.js
var _toKey = __webpack_require__(6589);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_hasPath.js







function hasPath(object, path, hasFunc) {
  path = (0,_castPath/* default */.A)(path, object);
  var index = -1, length = path.length, result = false;
  while (++index < length) {
    var key = (0,_toKey/* default */.A)(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && (0,isLength/* default */.A)(length) && (0,_isIndex/* default */.A)(key, length) && ((0,isArray/* default */.A)(object) || (0,isArguments/* default */.A)(object));
}
/* harmony default export */ const _hasPath = (hasPath);

;// CONCATENATED MODULE: ../node_modules/lodash-es/hasIn.js



function hasIn(object, path) {
  return object != null && _hasPath(object, path, _baseHasIn);
}
/* harmony default export */ const lodash_es_hasIn = (hasIn);


/***/ }),

/***/ 9064:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function identity(value) {
  return value;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (identity);


/***/ }),

/***/ 3102:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ lodash_es_isArguments)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_baseGetTag.js + 2 modules
var _baseGetTag = __webpack_require__(5583);
// EXTERNAL MODULE: ../node_modules/lodash-es/isObjectLike.js
var isObjectLike = __webpack_require__(4146);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseIsArguments.js



var argsTag = "[object Arguments]";
function baseIsArguments(value) {
  return (0,isObjectLike/* default */.A)(value) && (0,_baseGetTag/* default */.A)(value) == argsTag;
}
/* harmony default export */ const _baseIsArguments = (baseIsArguments);

;// CONCATENATED MODULE: ../node_modules/lodash-es/isArguments.js



var objectProto = Object.prototype;
var isArguments_hasOwnProperty = objectProto.hasOwnProperty;
var propertyIsEnumerable = objectProto.propertyIsEnumerable;
var isArguments = _baseIsArguments(function() {
  return arguments;
}()) ? _baseIsArguments : function(value) {
  return (0,isObjectLike/* default */.A)(value) && isArguments_hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
/* harmony default export */ const lodash_es_isArguments = (isArguments);


/***/ }),

/***/ 2105:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

var isArray = Array.isArray;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isArray);


/***/ }),

/***/ 54:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7730);
/* harmony import */ var _isLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5966);



function isArrayLike(value) {
  return value != null && (0,_isLength_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(value.length) && !(0,_isFunction_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(value);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isArrayLike);


/***/ }),

/***/ 7861:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(54);
/* harmony import */ var _isObjectLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4146);



function isArrayLikeObject(value) {
  return (0,_isObjectLike_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(value) && (0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(value);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isArrayLikeObject);


/***/ }),

/***/ 7603:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ lodash_es_isBuffer)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_root.js
var _root = __webpack_require__(3013);
;// CONCATENATED MODULE: ../node_modules/lodash-es/stubFalse.js

function stubFalse() {
  return false;
}
/* harmony default export */ const lodash_es_stubFalse = (stubFalse);

;// CONCATENATED MODULE: ../node_modules/lodash-es/isBuffer.js



var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer = moduleExports ? _root/* default */.A.Buffer : void 0;
var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
var isBuffer = nativeIsBuffer || lodash_es_stubFalse;
/* harmony default export */ const lodash_es_isBuffer = (isBuffer);


/***/ }),

/***/ 9231:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ lodash_es_isDate)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_baseGetTag.js + 2 modules
var _baseGetTag = __webpack_require__(5583);
// EXTERNAL MODULE: ../node_modules/lodash-es/isObjectLike.js
var isObjectLike = __webpack_require__(4146);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseIsDate.js



var dateTag = "[object Date]";
function baseIsDate(value) {
  return (0,isObjectLike/* default */.A)(value) && (0,_baseGetTag/* default */.A)(value) == dateTag;
}
/* harmony default export */ const _baseIsDate = (baseIsDate);

// EXTERNAL MODULE: ../node_modules/lodash-es/_baseUnary.js
var _baseUnary = __webpack_require__(7869);
// EXTERNAL MODULE: ../node_modules/lodash-es/_nodeUtil.js
var _nodeUtil = __webpack_require__(8369);
;// CONCATENATED MODULE: ../node_modules/lodash-es/isDate.js




var nodeIsDate = _nodeUtil/* default */.A && _nodeUtil/* default */.A.isDate;
var isDate = nodeIsDate ? (0,_baseUnary/* default */.A)(nodeIsDate) : _baseIsDate;
/* harmony default export */ const lodash_es_isDate = (isDate);


/***/ }),

/***/ 1865:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseKeys_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9471);
/* harmony import */ var _getTag_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8056);
/* harmony import */ var _isArguments_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3102);
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2105);
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(54);
/* harmony import */ var _isBuffer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7603);
/* harmony import */ var _isPrototype_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2975);
/* harmony import */ var _isTypedArray_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7975);









var mapTag = "[object Map]", setTag = "[object Set]";
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if ((0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(value) && ((0,_isArray_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(value) || typeof value == "string" || typeof value.splice == "function" || (0,_isBuffer_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(value) || (0,_isTypedArray_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)(value) || (0,_isArguments_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)(value))) {
    return !value.length;
  }
  var tag = (0,_getTag_js__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if ((0,_isPrototype_js__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A)(value)) {
    return !(0,_baseKeys_js__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A)(value).length;
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

/***/ 1900:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseIsEqual_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7688);


function isEqual(value, other) {
  return (0,_baseIsEqual_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(value, other);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isEqual);


/***/ }),

/***/ 7730:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseGetTag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5583);
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5221);



var asyncTag = "[object AsyncFunction]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!(0,_isObject_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(value)) {
    return false;
  }
  var tag = (0,_baseGetTag_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isFunction);


/***/ }),

/***/ 5966:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isLength);


/***/ }),

/***/ 5221:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isObject);


/***/ }),

/***/ 4146:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function isObjectLike(value) {
  return value != null && typeof value == "object";
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isObjectLike);


/***/ }),

/***/ 8418:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseGetTag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5583);
/* harmony import */ var _isObjectLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4146);



var symbolTag = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || (0,_isObjectLike_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(value) && (0,_baseGetTag_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(value) == symbolTag;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isSymbol);


/***/ }),

/***/ 7975:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ lodash_es_isTypedArray)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_baseGetTag.js + 2 modules
var _baseGetTag = __webpack_require__(5583);
// EXTERNAL MODULE: ../node_modules/lodash-es/isLength.js
var isLength = __webpack_require__(5966);
// EXTERNAL MODULE: ../node_modules/lodash-es/isObjectLike.js
var isObjectLike = __webpack_require__(4146);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseIsTypedArray.js




var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
function baseIsTypedArray(value) {
  return (0,isObjectLike/* default */.A)(value) && (0,isLength/* default */.A)(value.length) && !!typedArrayTags[(0,_baseGetTag/* default */.A)(value)];
}
/* harmony default export */ const _baseIsTypedArray = (baseIsTypedArray);

// EXTERNAL MODULE: ../node_modules/lodash-es/_baseUnary.js
var _baseUnary = __webpack_require__(7869);
// EXTERNAL MODULE: ../node_modules/lodash-es/_nodeUtil.js
var _nodeUtil = __webpack_require__(8369);
;// CONCATENATED MODULE: ../node_modules/lodash-es/isTypedArray.js




var nodeIsTypedArray = _nodeUtil/* default */.A && _nodeUtil/* default */.A.isTypedArray;
var isTypedArray = nodeIsTypedArray ? (0,_baseUnary/* default */.A)(nodeIsTypedArray) : _baseIsTypedArray;
/* harmony default export */ const lodash_es_isTypedArray = (isTypedArray);


/***/ }),

/***/ 7382:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _arrayLikeKeys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1829);
/* harmony import */ var _baseKeys_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9471);
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(54);




function keys(object) {
  return (0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(object) ? (0,_arrayLikeKeys_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(object) : (0,_baseKeys_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(object);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (keys);


/***/ }),

/***/ 5796:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseAssignValue_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(840);
/* harmony import */ var _baseForOwn_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2209);
/* harmony import */ var _baseIteratee_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(146);




function mapValues(object, iteratee) {
  var result = {};
  iteratee = (0,_baseIteratee_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(iteratee, 3);
  (0,_baseForOwn_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(object, function(value, key, object2) {
    (0,_baseAssignValue_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(result, key, iteratee(value, key, object2));
  });
  return result;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mapValues);


/***/ }),

/***/ 3920:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MapCache_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2905);


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
  memoized.cache = new (memoize.Cache || _MapCache_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)();
  return memoized;
}
memoize.Cache = _MapCache_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (memoize);


/***/ }),

/***/ 6913:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ lodash_es_pick)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_basePickBy.js + 2 modules
var _basePickBy = __webpack_require__(2492);
// EXTERNAL MODULE: ../node_modules/lodash-es/hasIn.js + 2 modules
var hasIn = __webpack_require__(1085);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_basePick.js



function basePick(object, paths) {
  return (0,_basePickBy/* default */.A)(object, paths, function(value, path) {
    return (0,hasIn/* default */.A)(object, path);
  });
}
/* harmony default export */ const _basePick = (basePick);

// EXTERNAL MODULE: ../node_modules/lodash-es/_baseFlatten.js + 1 modules
var _baseFlatten = __webpack_require__(2574);
;// CONCATENATED MODULE: ../node_modules/lodash-es/flatten.js


function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? (0,_baseFlatten/* default */.A)(array, 1) : [];
}
/* harmony default export */ const lodash_es_flatten = (flatten);

// EXTERNAL MODULE: ../node_modules/lodash-es/_overRest.js + 1 modules
var _overRest = __webpack_require__(3352);
// EXTERNAL MODULE: ../node_modules/lodash-es/_setToString.js + 3 modules
var _setToString = __webpack_require__(6151);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_flatRest.js




function flatRest(func) {
  return (0,_setToString/* default */.A)((0,_overRest/* default */.A)(func, void 0, lodash_es_flatten), func + "");
}
/* harmony default export */ const _flatRest = (flatRest);

;// CONCATENATED MODULE: ../node_modules/lodash-es/pick.js



var pick = _flatRest(function(object, paths) {
  return object == null ? {} : _basePick(object, paths);
});
/* harmony default export */ const lodash_es_pick = (pick);


/***/ }),

/***/ 1737:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ lodash_es_pickBy)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayMap.js
var _arrayMap = __webpack_require__(7148);
// EXTERNAL MODULE: ../node_modules/lodash-es/_baseIteratee.js + 10 modules
var _baseIteratee = __webpack_require__(146);
// EXTERNAL MODULE: ../node_modules/lodash-es/_basePickBy.js + 2 modules
var _basePickBy = __webpack_require__(2492);
// EXTERNAL MODULE: ../node_modules/lodash-es/_baseGetAllKeys.js
var _baseGetAllKeys = __webpack_require__(5423);
// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayPush.js
var _arrayPush = __webpack_require__(6872);
// EXTERNAL MODULE: ../node_modules/lodash-es/_getPrototype.js
var _getPrototype = __webpack_require__(7815);
// EXTERNAL MODULE: ../node_modules/lodash-es/_getSymbols.js + 1 modules
var _getSymbols = __webpack_require__(7198);
// EXTERNAL MODULE: ../node_modules/lodash-es/stubArray.js
var stubArray = __webpack_require__(6793);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_getSymbolsIn.js





var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbolsIn = !nativeGetSymbols ? stubArray/* default */.A : function(object) {
  var result = [];
  while (object) {
    (0,_arrayPush/* default */.A)(result, (0,_getSymbols/* default */.A)(object));
    object = (0,_getPrototype/* default */.A)(object);
  }
  return result;
};
/* harmony default export */ const _getSymbolsIn = (getSymbolsIn);

// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayLikeKeys.js + 1 modules
var _arrayLikeKeys = __webpack_require__(1829);
// EXTERNAL MODULE: ../node_modules/lodash-es/isObject.js
var isObject = __webpack_require__(5221);
// EXTERNAL MODULE: ../node_modules/lodash-es/_isPrototype.js
var _isPrototype = __webpack_require__(2975);
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
  if (!(0,isObject/* default */.A)(object)) {
    return _nativeKeysIn(object);
  }
  var isProto = (0,_isPrototype/* default */.A)(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !_baseKeysIn_hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
/* harmony default export */ const _baseKeysIn = (baseKeysIn);

// EXTERNAL MODULE: ../node_modules/lodash-es/isArrayLike.js
var isArrayLike = __webpack_require__(54);
;// CONCATENATED MODULE: ../node_modules/lodash-es/keysIn.js




function keysIn(object) {
  return (0,isArrayLike/* default */.A)(object) ? (0,_arrayLikeKeys/* default */.A)(object, true) : _baseKeysIn(object);
}
/* harmony default export */ const lodash_es_keysIn = (keysIn);

;// CONCATENATED MODULE: ../node_modules/lodash-es/_getAllKeysIn.js




function getAllKeysIn(object) {
  return (0,_baseGetAllKeys/* default */.A)(object, lodash_es_keysIn, _getSymbolsIn);
}
/* harmony default export */ const _getAllKeysIn = (getAllKeysIn);

;// CONCATENATED MODULE: ../node_modules/lodash-es/pickBy.js





function pickBy(object, predicate) {
  if (object == null) {
    return {};
  }
  var props = (0,_arrayMap/* default */.A)(_getAllKeysIn(object), function(prop) {
    return [prop];
  });
  predicate = (0,_baseIteratee/* default */.A)(predicate);
  return (0,_basePickBy/* default */.A)(object, props, function(value, path) {
    return predicate(value, path[0]);
  });
}
/* harmony default export */ const lodash_es_pickBy = (pickBy);


/***/ }),

/***/ 6793:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function stubArray() {
  return [];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stubArray);


/***/ }),

/***/ 2886:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ lodash_es_toNumber)
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
var isObject = __webpack_require__(5221);
// EXTERNAL MODULE: ../node_modules/lodash-es/isSymbol.js
var isSymbol = __webpack_require__(8418);
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
  if ((0,isSymbol/* default */.A)(value)) {
    return NAN;
  }
  if ((0,isObject/* default */.A)(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = (0,isObject/* default */.A)(other) ? other + "" : other;
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

/***/ 2624:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ lodash_es_toString)
});

// EXTERNAL MODULE: ../node_modules/lodash-es/_Symbol.js
var _Symbol = __webpack_require__(3145);
// EXTERNAL MODULE: ../node_modules/lodash-es/_arrayMap.js
var _arrayMap = __webpack_require__(7148);
// EXTERNAL MODULE: ../node_modules/lodash-es/isArray.js
var isArray = __webpack_require__(2105);
// EXTERNAL MODULE: ../node_modules/lodash-es/isSymbol.js
var isSymbol = __webpack_require__(8418);
;// CONCATENATED MODULE: ../node_modules/lodash-es/_baseToString.js





var INFINITY = 1 / 0;
var symbolProto = _Symbol/* default */.A ? _Symbol/* default */.A.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if ((0,isArray/* default */.A)(value)) {
    return (0,_arrayMap/* default */.A)(value, baseToString) + "";
  }
  if ((0,isSymbol/* default */.A)(value)) {
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

/***/ 390:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseIteratee_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(146);
/* harmony import */ var _baseUniq_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8417);



function uniqBy(array, iteratee) {
  return array && array.length ? (0,_baseUniq_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(array, (0,_baseIteratee_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(iteratee, 2)) : [];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (uniqBy);


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
/******/ 			677: 0
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
  getDataClass: () => (/* reexport */ get_data_class/* getDataClass */.D5),
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
  preload: () => (/* reexport */ preload),
  provideAuthGroups: () => (/* reexport */ auth_groups/* provideAuthGroups */.E),
  provideComponent: () => (/* reexport */ react/* provideComponent */.lo),
  provideDataClass: () => (/* reexport */ provideDataClass),
  provideDataErrorComponent: () => (/* reexport */ react/* provideDataErrorComponent */.NX),
  provideDataItem: () => (/* reexport */ provideDataItem),
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
  unstable_selectSiteId: () => (/* reexport */ unstable_multi_site_mode/* unstable_selectSiteId */.yG),
  updateContent: () => (/* reexport */ updateContent),
  updateMenuExtensions: () => (/* reexport */ menu/* updateMenuExtensions */.xi),
  urlFor: () => (/* reexport */ url_for/* urlFor */.d),
  urlForDataItem: () => (/* reexport */ url_for_data_item/* urlForDataItem */.y),
  useAttributeDefinition: () => (/* reexport */ react/* useAttributeDefinition */.rj),
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

// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_page.ts
var current_page = __webpack_require__(7639);
// EXTERNAL MODULE: ./scrivito_sdk/models/index.ts + 44 modules
var models = __webpack_require__(4360);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_app_space.ts
var current_app_space = __webpack_require__(1048);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/current_language.ts




function currentLanguage() {
  var _a, _b;
  const siteId = (0,current_page/* currentSiteId */.OI)();
  if (!siteId)
    return null;
  return (_b = (_a = (0,models/* getRootObjFrom */.Mp)((0,current_app_space/* currentAppSpace */.p)().and((0,models/* restrictToSite */.rs)(siteId)))) == null ? void 0 : _a.language()) != null ? _b : null;
}

// EXTERNAL MODULE: ./scrivito_sdk/common/index.ts + 62 modules
var common = __webpack_require__(5204);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/extract_text/remove_html_tags.ts


let htmlToText;
function setHtmlToTextConverter(converter) {
  htmlToText = converter;
}
function removeHtmlTags(html) {
  if (!htmlToText)
    throw new common/* InternalError */.Gd();
  if (html === "")
    return "";
  const text = htmlToText(html);
  return (0,common/* pruneString */.M4)(text);
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/has_component.ts
var has_component = __webpack_require__(9708);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/initialize_content.ts
var initialize_content = __webpack_require__(838);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/node_adapter.ts


let nodeAdapter;
function setNodeAdapter(adapter) {
  nodeAdapter = adapter;
}
function node_adapter_isRunningInBrowser() {
  return nodeAdapter === void 0;
}
(0,common/* onReset */.Nj)(() => nodeAdapter = void 0);

// EXTERNAL MODULE: ./scrivito_sdk/client/index.ts + 38 modules
var client = __webpack_require__(853);
// EXTERNAL MODULE: ./scrivito_sdk/data/index.ts + 29 modules
var data = __webpack_require__(1091);
// EXTERNAL MODULE: ./scrivito_sdk/data_integration/index.ts + 13 modules
var data_integration = __webpack_require__(9800);
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
    const response = yield (0,client/* fetchJson */.x6)("https://api.justrelate.com/iam/token", {
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
    const authProvider = isIamTokenAuth(apiKey) ? new client/* TokenAuthorizationProvider */.Or(() => fetchIamToken(apiKey)) : new LegacyApiKeyAuthorizationProvider(apiKey);
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
var browser_location = __webpack_require__(7478);
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

const config = new common/* ConfigStore */.s9();
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
(0,common/* onReset */.Nj)(resetAssetUrlBase);

// EXTERNAL MODULE: ./scrivito_sdk/app_support/content_tags_for_empty_attributes.ts
var content_tags_for_empty_attributes = __webpack_require__(5015);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/ui_adapter.ts
var ui_adapter = __webpack_require__(5460);
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
  loggedInState = (0,common/* getFromLocalStorage */.zM)(isUserLoggedInStorageKey()) !== null;
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
    (0,common/* removeFromLocalStorage */.n5)(isUserLoggedInStorageKey());
  }
  (0,common/* reload */.yQ)();
}
function setFlagInLocalStorage() {
  if (!ui_adapter/* uiAdapter */.B)
    (0,common/* setInLocalStorage */.Yz)(isUserLoggedInStorageKey(), "");
}
function isUserLoggedInStorageKey() {
  return `SCRIVITO.${(0,common/* getConfiguredTenant */.Ly)()}.IS_USER_LOGGED_IN`;
}
(0,common/* onReset */.Nj)(() => loggedInState = void 0);

// EXTERNAL MODULE: ./scrivito_sdk/loadable/index.ts + 29 modules
var loadable = __webpack_require__(5688);
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
  loader: () => user_info_async(void 0, null, function* () {
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
  if (userLoggedInStatusInterval)
    return;
  userLoggedInStatusInterval = (0,common/* setInterval */.yb)(fetchLoggedInUser, 6e4);
}
function fetchLoggedInUser() {
  return user_logged_in_status_async(this, null, function* () {
    yield client/* JrRestApi */.hm.get(yield getUserInfoPath());
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
  iamTokenFetcher() {
    return void 0;
  },
  loginHandler() {
    return "redirect";
  }
};
function ensureUserIsLoggedInAsync() {
  return anonymous_visitor_auth_handler_async(this, null, function* () {
    yield fetchLoggedInUser();
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
    if (!userData)
      return;
    return __spreadProps(__spreadValues({}, userData), { id: userData.id.replace(/^scrivito:/, "") });
  },
  isUserLoggedIn() {
    return true;
  },
  ensureUserIsLoggedIn() {
  },
  iamTokenFetcher() {
    return (params) => inside_ui_auth_handler_async(this, null, function* () {
      return (0,common/* assumePresence */.W3)(yield (0,loadable/* load */.Hh)(() => (0,get_editor_auth_token/* getEditorAuthToken */.d)(params)));
    });
  },
  loginHandler() {
    return void 0;
  }
};

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
  setOfflineMode(
    (() => offline_mode_async(this, null, function* () {
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
    (0,common/* setInLocalStorage */.Yz)(getOfflineModeStorageKey(), "true");
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
    (0,common/* removeFromLocalStorage */.n5)(getOfflineModeStorageKey());
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
  if (offlineMode === void 0)
    offlineMode = calculateOfflineMode(config);
  return offlineMode;
}
function calculateOfflineMode(config) {
  var _a;
  if (!((_a = config.unstable) == null ? void 0 : _a.allowOfflineMode))
    return false;
  if (!!uiAdapter || !isRunningInBrowser())
    return false;
  return !!getOfflineModeFromStorage();
}
function getOfflineModeFromStorage() {
  return getFromLocalStorage(getOfflineModeStorageKey());
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
    if (!userInfo)
      return;
    const { sub: id, name, email, picture } = userInfo;
    return { id, name, email, picture: picture || null };
  },
  isUserLoggedIn() {
    verifyUserIsLoggedIn();
    if (!getOfflineMode())
      startPollingLoggedInUser();
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
    if (!user)
      changeLoggedInState(false);
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
function ensureUserIsLoggedIn() {
  return authHandler().ensureUserIsLoggedIn();
}
function getIamTokenFetcher() {
  return authHandler().iamTokenFetcher();
}
function getLoginHandler() {
  return authHandler().loginHandler();
}
function logout(returnTo) {
  if (!ui_adapter/* uiAdapter */.B)
    logoutAsync(returnTo);
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
  if (nodeAdapter)
    return nodeAdapter.nodeAuthHandler;
  if (ui_adapter/* uiAdapter */.B)
    return insideUiAuthHandler;
  if (isInLoggedInState())
    return loggedInVisitorAuthHandler;
  return anonymousVisitorAuthHandler;
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/extensions_url.ts
var extensions_url = __webpack_require__(2026);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/forced_editor_language.ts
var forced_editor_language = __webpack_require__(5584);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/initial_content_dump_url.ts
var initial_content_dump_url = __webpack_require__(8261);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/layout_editing.ts
var layout_editing = __webpack_require__(263);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/load_editing_assets.ts



function loadEditingAssets() {
  loadEditingCss();
  importEditors().then(({ initializeEditors }) => {
    initializeEditors();
  });
}
function loadEditingCss() {
  (0,common/* loadCss */.qg)(`${getAssetUrlBase()}/scrivito_editing.css`, (0,common/* getDocument */.YE)());
}
function importEditors() {
  return __webpack_require__.e(/* import() */ 296).then(__webpack_require__.bind(__webpack_require__, 296));
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/routing.ts + 2 modules
var routing = __webpack_require__(7183);
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
  if (ui_adapter/* uiAdapter */.B)
    return;
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

// EXTERNAL MODULE: ./scrivito_sdk/bridge/index.ts + 14 modules
var bridge = __webpack_require__(2577);
// EXTERNAL MODULE: ./scrivito_sdk/realm/index.ts + 21 modules
var realm = __webpack_require__(7461);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/constraints_validation_callback.ts
var constraints_validation_callback = __webpack_require__(1728);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/configure.ts




























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
    if (node_adapter_isRunningInBrowser())
      initializeLoggedInState();
    configureAssetUrlBase(
      (_a = unofficialConfiguration == null ? void 0 : unofficialConfiguration.assetUrlBase) != null ? _a : (0,common/* cdnAssetUrlBase */.IH)()
    );
    client/* clientConfig */.yO.set({
      iamAuthLocation: getIamAuthLocation(configuration.iamAuthLocation),
      iamTokenFetcher: getIamTokenFetcher(),
      loginHandler: getLoginHandler()
    });
    const treatLocalhostLike = configuration.treatLocalhostLike;
    if (treatLocalhostLike)
      (0,treat_localhost_like/* setTreatLocalhostLike */.X)(treatLocalhostLike);
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
  if (configuration.strictSearchOperators)
    (0,realm/* enableStrictSearchOperators */.w5)();
  if (configuration.activateDataIntegration)
    (0,data_integration/* activateDataIntegration */.Ey)();
  (0,models/* setWantsAutoAttributeConversion */.F1)(!!configuration.autoConvertAttributes);
  (0,forced_editor_language/* setForcedEditorLanguage */.T)(configuration.editorLanguage || null);
  (0,extensions_url/* setExtensionsUrl */.s)(configuration.extensionsUrl || void 0);
  if (unofficialConfiguration == null ? void 0 : unofficialConfiguration.layoutEditing)
    (0,layout_editing/* enableLayoutEditing */.OY)();
  if (unofficialConfiguration == null ? void 0 : unofficialConfiguration.initialContentDumpUrl) {
    (0,initial_content_dump_url/* setInitialContentDumpUrl */.d)(unofficialConfiguration.initialContentDumpUrl);
  }
}
function configure_getConfiguration() {
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
  if (configuration.apiKey && node_adapter_isRunningInBrowser()) {
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
  if ((0,unstable_multi_site_mode/* useUnstableMultiSiteMode */.DZ)())
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
    (0,data/* configureForLazyWidgets */.D9)(true);
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
  client/* cmsRestApi */.gd.init({
    apiBaseUrl: `${endpoint.startsWith("http") ? endpoint : `https://${endpoint}`}/tenants/${tenant}`,
    authorizationProvider: getCmsAuthProvider(apiKey, visitorAuthentication),
    analyticsProvider: node_adapter_isRunningInBrowser() ? browserAnalyticsProvider : nodeAnalyticsProvider,
    priority
  });
}
function getCmsAuthProvider(apiKey, visitorAuthentication) {
  if (nodeAdapter && apiKey) {
    return new nodeAdapter.ApiKeyAuthorizationProvider(apiKey);
  }
  if (node_adapter_isRunningInBrowser() && isUserLoggedIn()) {
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
  importUiInterface().then(({ startAppAdapter }) => {
    const channel = new MessageChannel();
    startAppAdapter((0,bridge/* linkViaPort */.KA)(channel.port1));
    uiAdapterClient.setAppAdapter(channel.port2);
  });
}
function importUiInterface() {
  return __webpack_require__.e(/* import() */ 993).then(__webpack_require__.bind(__webpack_require__, 1107));
}
function warnIfNoSiteIdSelection() {
  const timeout = (0,common/* setTimeout */.wg)(
    () => (0,loadable/* load */.Hh)(current_page/* currentSiteId */.OI).then((siteId) => {
      if (siteId === "default") {
        (0,common/* logError */.vV)(
          "Warning: No site ID was selected within 30 seconds. In the multi-site mode a site ID must be selected before Scrivito can render content. Forgot to use Scrivito.unstable_selectSiteId?"
        );
      }
    }),
    3e4
  );
  (0,loadable/* load */.Hh)(unstable_multi_site_mode/* getUnstableSelectedSiteId */.MT).then(() => clearTimeout(timeout));
}
function getIamAuthLocation(iamAuthLocation) {
  if (typeof iamAuthLocation === "string")
    return iamAuthLocation;
  const origin = (0,common/* currentOrigin */.u4)();
  return origin ? `${origin}/auth` : void 0;
}
(0,common/* onReset */.Nj)(resetConfiguration);

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
    return;
  },
  isUserLoggedIn() {
    return false;
  },
  ensureUserIsLoggedIn() {
    refuse();
  },
  iamTokenFetcher() {
    return () => node_auth_handler_async(this, null, function* () {
      const configuration = yield configure_getConfiguration();
      const key = configuration.apiKey;
      return typeof key === "object" ? fetchIamToken(key) : null;
    });
  },
  loginHandler() {
    return;
  }
};
function refuse() {
  throw new common/* ScrivitoError */.aS("Only available in browser");
}

;// CONCATENATED MODULE: ./scrivito_sdk/node_support/node_adapter.ts



const node_adapter_nodeAdapter = {
  ApiKeyAuthorizationProvider: ApiKeyAuthorizationProvider,
  nodeAuthHandler: nodeAuthHandler
};

// EXTERNAL MODULE: ./scrivito_sdk/react/has_component.ts
var react_has_component = __webpack_require__(580);
// EXTERNAL MODULE: ./scrivito_sdk/realm/initial_content_registry.ts
var initial_content_registry = __webpack_require__(6830);
;// CONCATENATED MODULE: ./scrivito_sdk/initialize_sdk_for_node.ts
















function initializeSdk() {
  (0,common/* setOriginProvider */.cN)(() => void 0);
  (0,realm/* setCurrentSiteIdHandler */.kI)(current_page/* currentSiteId */.OI);
  (0,data/* useReplicationStrategy */.B5)(data/* ObjBackendReplication */.sX);
  setHtmlToTextConverter(htmlToTextForNode);
  (0,client/* useDefaultPriority */.bj)("background");
  (0,initial_content_registry/* setInitialContentFor */.l)(initialize_content/* initialContentFor */.hF);
  setNodeAdapter(node_adapter_nodeAdapter);
  (0,has_component/* setHasComponentHandler */.A)(react_has_component/* hasComponent */.I);
  (0,data_integration/* setCurrentLanguageHandler */._L)(currentLanguage);
}

// EXTERNAL MODULE: ./scrivito_sdk/react/index.ts + 39 modules
var react = __webpack_require__(9955);
// EXTERNAL MODULE: ./scrivito_sdk/react_connect/index.ts + 7 modules
var react_connect = __webpack_require__(3602);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/can_edit.ts
var can_edit = __webpack_require__(5057);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/can_write.ts



function canWrite() {
  if (!ui_adapter/* uiAdapter */.B)
    return false;
  return ui_adapter/* uiAdapter */.B.canWrite((0,models/* currentWorkspaceId */.o_)()) || false;
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/configure_content_browser.ts
var configure_content_browser = __webpack_require__(349);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/configure_obj_class_for_content_type.ts
var configure_obj_class_for_content_type = __webpack_require__(2726);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/preview_sizes.ts
var preview_sizes = __webpack_require__(9641);
// EXTERNAL MODULE: ./scrivito_sdk/import_from.ts
var import_from = __webpack_require__(5606);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/current_editor.ts



function currentEditor() {
  if (!ui_adapter/* uiAdapter */.B)
    return null;
  const userData = ui_adapter/* uiAdapter */.B.currentEditor();
  const teamsData = ui_adapter/* uiAdapter */.B.currentEditorTeams();
  const Editor = (0,import_from/* importFrom */.eW)("editingSupport", "Editor");
  if (!Editor)
    return null;
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
  if (!ui_adapter/* uiAdapter */.B)
    return;
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
  if (objOrWidget instanceof models/* BasicWidget */.$R)
    return "";
  const text = objOrWidget.metadata().get("text");
  if (typeof text !== "string")
    return "";
  return (0,common/* pruneString */.M4)(text);
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
      collector.push((0,common/* pruneString */.M4)(objOrWidget.get(attribute, "string")));
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
  const schema = (0,realm/* schemaFromBasicObjOrWidget */.e6)(objOrWidget);
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

// EXTERNAL MODULE: ./scrivito_sdk/app_support/editing_context.ts
var editing_context = __webpack_require__(1616);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/is_editor_logged_in.ts


function isEditorLoggedIn() {
  return !!ui_adapter/* uiAdapter */.B;
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/navigate_to.ts
var navigate_to = __webpack_require__(3721);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/open_dialog.ts


function openDialog(name) {
  if (ui_adapter/* uiAdapter */.B)
    ui_adapter/* uiAdapter */.B.openCustomDialog(name);
}

// EXTERNAL MODULE: ./scrivito_sdk/state/index.ts + 13 modules
var state = __webpack_require__(1946);
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
    (0,data/* setContentStateId */.YR)((0,models/* currentWorkspaceId */.o_)(), parsed.csid);
    (0,loadable/* loadRecording */.oB)(parsed.recording);
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
    if (isVisitorAuthenticationEnabled())
      return { dumpLoaded: false };
    const dumpLoaded = !isUserLoggedIn();
    if (dumpLoaded)
      loadContentDump(preloadDump);
    yield (0,loadable/* load */.Hh)(current_page/* currentPage */.F2);
    return { dumpLoaded };
  });
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/auth_groups.ts
var auth_groups = __webpack_require__(1579);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/current_page_data.ts
var current_page_data = __webpack_require__(5634);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/scale_down_binary.ts
var scale_down_binary = __webpack_require__(6409);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/site_mapping.ts
var site_mapping = __webpack_require__(648);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/render_page.ts













function renderPage(obj, render) {
  (0,data/* assertNotUsingInMemoryTenant */.C_)("Scrivito.renderPage");
  checkRenderPage(obj, render);
  const objSpaceId = (0,models/* currentObjSpaceId */.eb)();
  const page = (0,realm/* unwrapAppClass */.zo)(obj);
  const workspaceId = (0,client/* getWorkspaceId */.LD)(objSpaceId);
  ensureSiteIsPresent(page, common/* ArgumentError */.c1);
  return (0,data/* trackContentStateId */.Zt)(workspaceId).then(() => {
    const contentStateId = (0,data/* getContentStateId */.Qb)(objSpaceId);
    const siteId = ensureSiteIsPresent(page);
    return (0,loadable/* load */.Hh)(
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
    ).then(({ result, usedData }) => {
      return {
        result,
        preloadDump: generateContentDump(usedData, contentStateId)
      };
    });
  });
}
function ensureSiteIsPresent(page, errorClass = common/* ScrivitoError */.aS) {
  const siteId = page.siteId();
  if (siteId)
    return siteId;
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
  return (0,data/* updateContent */.le)((0,models/* currentWorkspaceId */.o_)());
}

// EXTERNAL MODULE: ./scrivito_sdk/app_support/url_for.ts
var url_for = __webpack_require__(9857);
// EXTERNAL MODULE: ./scrivito_sdk/app_support/url_for_data_item.ts
var url_for_data_item = __webpack_require__(5164);
;// CONCATENATED MODULE: ./scrivito_sdk/app_support/validation_results_stub.ts


function validationResultsFor(model, attributeName) {
  const loadedFn = (0,import_from/* importFrom */.eW)("editingSupport", "validationResultsFor");
  if (!loadedFn)
    return [];
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
// EXTERNAL MODULE: ../node_modules/lodash-es/memoize.js
var memoize = __webpack_require__(3920);
// EXTERNAL MODULE: ./scrivito_sdk/data_integration/current_language.ts
var current_language = __webpack_require__(1514);
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






const fetchSchema = (0,memoize/* default */.A)(function(apiClient) {
  return fetch_schema_async(this, null, function* () {
    const siteLanguage = yield (0,loadable/* load */.Hh)(current_language/* currentLanguage */.a);
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
    return (0,data_integration/* extractDataClassSchemaResponse */.ud)(response);
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
  return {
    schema: {
      attributes: attributes || (() => create_rest_api_schema_async(this, null, function* () {
        return (yield fetchSchema(apiClient)).attributes;
      })),
      title: title || (() => create_rest_api_schema_async(this, null, function* () {
        return (yield fetchSchema(apiClient)).title;
      }))
    }
  };
}

;// CONCATENATED MODULE: ./scrivito_sdk/data_integration/provide_data_class.ts

var provide_data_class_defProp = Object.defineProperty;
var provide_data_class_getOwnPropSymbols = Object.getOwnPropertySymbols;
var provide_data_class_hasOwnProp = Object.prototype.hasOwnProperty;
var provide_data_class_propIsEnum = Object.prototype.propertyIsEnumerable;
var provide_data_class_defNormalProp = (obj, key, value) => key in obj ? provide_data_class_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var provide_data_class_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (provide_data_class_hasOwnProp.call(b, prop))
      provide_data_class_defNormalProp(a, prop, b[prop]);
  if (provide_data_class_getOwnPropSymbols)
    for (var prop of provide_data_class_getOwnPropSymbols(b)) {
      if (provide_data_class_propIsEnum.call(b, prop))
        provide_data_class_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
  (0,data_integration/* registerExternalDataClass */.$T)(
    name,
    (() => provide_data_class_async(this, null, function* () {
      return desugar(yield Promise.resolve(params));
    }))()
  );
  return new data_integration/* ExternalDataClass */.Gf(name);
}
function desugar(params) {
  return provide_data_class_async(this, null, function* () {
    var _a;
    if ("restApi" in params) {
      const apiClient = yield createApiClient(Promise.resolve(params.restApi));
      return provide_data_class_spreadValues({
        connection: Promise.resolve((0,data_integration/* createRestApiConnectionForClass */.En)(apiClient))
      }, createRestApiSchema(
        { attributes: params.attributes, title: params.title },
        apiClient
      ));
    }
    return {
      connection: Promise.resolve(params.connection),
      schema: { attributes: (_a = params.attributes) != null ? _a : {}, title: params.title }
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

var provide_data_item_defProp = Object.defineProperty;
var provide_data_item_getOwnPropSymbols = Object.getOwnPropertySymbols;
var provide_data_item_hasOwnProp = Object.prototype.hasOwnProperty;
var provide_data_item_propIsEnum = Object.prototype.propertyIsEnumerable;
var provide_data_item_defNormalProp = (obj, key, value) => key in obj ? provide_data_item_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var provide_data_item_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (provide_data_item_hasOwnProp.call(b, prop))
      provide_data_item_defNormalProp(a, prop, b[prop]);
  if (provide_data_item_getOwnPropSymbols)
    for (var prop of provide_data_item_getOwnPropSymbols(b)) {
      if (provide_data_item_propIsEnum.call(b, prop))
        provide_data_item_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
  const dataClass = new data_integration/* ExternalDataClass */.Gf(name);
  const resolvedParams = typeof params === "function" ? Promise.resolve({ get: params }) : Promise.resolve(params);
  (0,data_integration/* provideExternalDataItem */.wc)(
    dataClass,
    (() => provide_data_item_async(this, null, function* () {
      return provide_data_item_desugar(yield resolvedParams);
    }))()
  );
  return dataClass.getUnchecked(data_integration/* SINGLETON_DATA_ID */.zv);
}
function provide_data_item_desugar(params) {
  return provide_data_item_async(this, null, function* () {
    var _a;
    if (typeof params === "function") {
      return {
        connection: Promise.resolve({ get: params }),
        schema: { attributes: {} }
      };
    }
    if ("restApi" in params) {
      const apiClient = yield provide_data_item_createApiClient(Promise.resolve(params.restApi));
      return provide_data_item_spreadValues({
        connection: Promise.resolve(createRestApiConnectionForItem(apiClient))
      }, createRestApiSchema(
        { attributes: params.attributes, title: params.title },
        apiClient
      ));
    }
    if ("connection" in params) {
      return {
        connection: Promise.resolve(params.connection),
        schema: { attributes: (_a = params.attributes) != null ? _a : {}, title: params.title }
      };
    }
    return {
      connection: Promise.resolve(params),
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
    get: () => provide_data_item_async(this, null, function* () {
      return apiClient.fetch("");
    }),
    update: (data) => provide_data_item_async(this, null, function* () {
      return apiClient.fetch("", { method: "patch", data });
    })
  };
}

// EXTERNAL MODULE: ./scrivito_sdk/data_integration/get_data_class.ts
var get_data_class = __webpack_require__(512);
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
  if (!currentPath || !path || !currentPath.startsWith(path))
    return false;
  if (currentPath === path || path === "/")
    return true;
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

;// CONCATENATED MODULE: ./scrivito_sdk/app_support/get_instance_id.ts


function getInstanceId() {
  const configuredTenant = (0,common/* tryGetConfiguredTenant */.YY)();
  if (configuredTenant)
    return configuredTenant;
  throw new common/* ScrivitoError */.aS(
    "Function invoked before calling 'Scrivito.configure'"
  );
}

;// CONCATENATED MODULE: ./scrivito_sdk/public_api.ts



















































;// CONCATENATED MODULE: ./sdk_for_node.ts



initializeSdk();

exports.ArgumentError = __webpack_exports__.ArgumentError;
exports.BackgroundImageTag = __webpack_exports__.BackgroundImageTag;
exports.Binary = __webpack_exports__.Binary;
exports.ChildListTag = __webpack_exports__.ChildListTag;
exports.ClientError = __webpack_exports__.ClientError;
exports.ContentTag = __webpack_exports__.ContentTag;
exports.CurrentPage = __webpack_exports__.CurrentPage;
exports.DataClass = __webpack_exports__.DataClass;
exports.DataConnectionError = __webpack_exports__.DataConnectionError;
exports.DataItem = __webpack_exports__.DataItem;
exports.DataLocator = __webpack_exports__.DataLocator;
exports.DataScope = __webpack_exports__.DataScope;
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
exports.getDataClass = __webpack_exports__.getDataClass;
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
exports.unstable_deleteOfflineStore = __webpack_exports__.unstable_deleteOfflineStore;
exports.unstable_enableOfflineStore = __webpack_exports__.unstable_enableOfflineStore;
exports.unstable_enterOfflineMode = __webpack_exports__.unstable_enterOfflineMode;
exports.unstable_isInOfflineMode = __webpack_exports__.unstable_isInOfflineMode;
exports.unstable_isOfflineStoreEnabled = __webpack_exports__.unstable_isOfflineStoreEnabled;
exports.unstable_leaveOfflineMode = __webpack_exports__.unstable_leaveOfflineMode;
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