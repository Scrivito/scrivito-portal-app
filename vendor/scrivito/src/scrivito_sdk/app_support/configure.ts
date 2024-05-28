// @rewire

import {
  browserAnalyticsProvider,
  nodeAnalyticsProvider,
} from 'scrivito_sdk/app_support/analytics_provider';
import { configureAssetUrlBase } from 'scrivito_sdk/app_support/asset_url_base';
import { skipContentTagsForEmptyAttributes } from 'scrivito_sdk/app_support/content_tags_for_empty_attributes';
import { currentAppSpace } from 'scrivito_sdk/app_support/current_app_space';
import { currentSiteId } from 'scrivito_sdk/app_support/current_page';
import {
  getIamAuthProvider,
  getLoginHandler,
  isUserLoggedIn,
} from 'scrivito_sdk/app_support/current_user';
import { setExtensionsUrl } from 'scrivito_sdk/app_support/extensions_url';
import { setForcedEditorLanguage } from 'scrivito_sdk/app_support/forced_editor_language';
import { setInitialContentDumpUrl } from 'scrivito_sdk/app_support/initial_content_dump_url';
import { enableLayoutEditing } from 'scrivito_sdk/app_support/layout_editing';
import { loadEditingAssets } from 'scrivito_sdk/app_support/load_editing_assets';
import { initializeLoggedInState } from 'scrivito_sdk/app_support/logged_in_state';
import {
  isRunningInBrowser,
  nodeAdapter,
} from 'scrivito_sdk/app_support/node_adapter';
import { initRouting } from 'scrivito_sdk/app_support/routing';
import { SiteMappingConfiguration } from 'scrivito_sdk/app_support/site_mapping';
import { setTreatLocalhostLike } from 'scrivito_sdk/app_support/treat_localhost_like';
import {
  UiAdapterClient,
  uiAdapter,
} from 'scrivito_sdk/app_support/ui_adapter';
import {
  SiteIdForObjCallback,
  getUnstableSelectedSiteId,
  setUnstableMultiSiteMode,
  useUnstableMultiSiteMode,
} from 'scrivito_sdk/app_support/unstable_multi_site_mode';
import { getVisitorAuthenticationProvider } from 'scrivito_sdk/app_support/visitor_authentication';
import { linkViaPort } from 'scrivito_sdk/bridge';
import {
  Priority,
  clientConfig,
  cmsRestApi,
  getBrowserTokenProvider,
} from 'scrivito_sdk/client';
import {
  Deferred,
  ScrivitoError,
  cdnAssetUrlBase,
  checkArgumentsFor,
  currentOrigin,
  logError,
  onReset,
  setConfiguredTenant,
  setTimeout,
  tcomb as t,
  throwInvalidArgumentsError,
} from 'scrivito_sdk/common';
import {
  IN_MEMORY_TENANT,
  configureForLazyWidgets,
  disableObjReplication,
  useInMemoryTenant,
} from 'scrivito_sdk/data';
import { load } from 'scrivito_sdk/loadable';
import {
  getRootObjFrom,
  restrictToSite,
  setWantsAutoAttributeConversion,
} from 'scrivito_sdk/models';
import {
  Obj,
  enableStrictSearchOperators,
  setCurrentSiteIdHandler,
  unwrapAppClass,
} from 'scrivito_sdk/realm';
import type { ForcedEditorLanguage } from 'scrivito_sdk/ui_interface/app_adapter';
import {
  ConstraintsValidationCallback,
  setConstraintsValidationCallback,
} from './constraints_validation_callback';

export interface IamApiKey {
  clientId: string;
  clientSecret: string;
}

export interface Configuration {
  tenant: string;
  adoptUi?: boolean | string;
  autoConvertAttributes?: boolean;
  baseUrlForSite?: SiteMappingConfiguration['baseUrlForSite'];
  endpoint?: string;
  constraintsValidation?: ConstraintsValidationCallback;
  homepage?: () => Obj | null;
  origin?: string;
  routingBasePath?: string;
  siteForUrl?: SiteMappingConfiguration['siteForUrl'];
  visitorAuthentication?: boolean;
  apiKey?: string | IamApiKey;
  priority?: Priority;
  editorLanguage?: ForcedEditorLanguage;
  extensionsUrl?: string;
  strictSearchOperators?: boolean;
  optimizedWidgetLoading?: boolean;
  contentTagsForEmptyAttributes?: boolean;
  iamAuthLocation?: string;
  treatLocalhostLike?: string;

  /** @internal */
  unstable?: {
    assetUrlBase?: string;
    getSiteIdForObj?: SiteIdForObjCallback;
    useRailsAuth?: boolean;
    trustedUiOrigins?: string[];
    layoutEditing?: true;
    initialContentDumpUrl?: string;
  };
}

const OriginValue = t.refinement(t.String, isOrigin, 'Origin String');

function isOrigin(origin: string) {
  try {
    return new URL(origin).origin === origin;
  } catch {
    return false;
  }
}

const AllowedConfiguration = t.interface({
  tenant: t.String,
  adoptUi: t.maybe(t.union([t.Boolean, OriginValue])),
  autoConvertAttributes: t.maybe(t.Boolean),
  baseUrlForSite: t.maybe(t.Function),
  constraintsValidation: t.maybe(t.Function),
  endpoint: t.maybe(t.String),
  extensionsUrl: t.maybe(t.String),
  homepage: t.maybe(t.Function),
  origin: t.maybe(OriginValue),
  routingBasePath: t.maybe(t.String),
  siteForUrl: t.maybe(t.Function),
  visitorAuthentication: t.maybe(t.Boolean),
  apiKey: t.maybe(
    t.union([
      t.String,
      t.interface({
        clientId: t.String,
        clientSecret: t.String,
      }),
    ])
  ),
  unstable: t.maybe(t.Object),
  priority: t.maybe(t.enums.of(['foreground', 'background'])),
  editorLanguage: t.maybe(t.enums.of(['en', 'de'])),
  strictSearchOperators: t.maybe(t.Boolean),
  optimizedWidgetLoading: t.maybe(t.Boolean),
  contentTagsForEmptyAttributes: t.maybe(t.Boolean),
  iamAuthLocation: t.maybe(t.String),
  treatLocalhostLike: t.maybe(t.String),
});

const PUBLIC_FUNCTION_NAME = 'configure';
const CHECK_ARGUMENTS_OPTIONS = { docPermalink: 'js-sdk/configure' };
const checkConfigure = checkArgumentsFor(
  PUBLIC_FUNCTION_NAME,
  [['configuration', AllowedConfiguration]],
  CHECK_ARGUMENTS_OPTIONS
);

let configDeferred = new Deferred<Configuration>();

/** @public */
export function configure(configuration: Configuration): void;

/** @internal */
export function configure(
  configuration: Readonly<Configuration>,
  ...excessArgs: never[]
): void {
  checkConfigure(configuration, ...excessArgs);
  if (configuration.apiKey && isRunningInBrowser()) {
    throwInvalidArgumentsError(
      PUBLIC_FUNCTION_NAME,
      'The option "apiKey" is only available under Node.js.',
      CHECK_ARGUMENTS_OPTIONS
    );
  }

  const routingConfiguration = getCheckedRoutingConfiguration(configuration);

  setConfiguration(configuration);

  const unofficialConfiguration = configuration.unstable;

  const getUnstableSiteIdForObj = unofficialConfiguration?.getSiteIdForObj;
  if (getUnstableSiteIdForObj) {
    setUnstableMultiSiteMode(getUnstableSiteIdForObj);
  }

  if (configuration.tenant === IN_MEMORY_TENANT) {
    useInMemoryTenant();
    setCurrentSiteIdHandler(() => IN_MEMORY_TENANT);
    disableObjReplication();
  } else {
    const tenant = configuration.tenant;
    setConfiguredTenant(tenant);

    if (isRunningInBrowser()) initializeLoggedInState();

    configureAssetUrlBase(
      unofficialConfiguration?.assetUrlBase ?? cdnAssetUrlBase()
    );

    clientConfig.set({
      iamAuthLocation: getIamAuthLocation(configuration.iamAuthLocation),
      iamAuthProvider: getIamAuthProvider(),
      loginHandler: getLoginHandler(),
    });

    const treatLocalhostLike = configuration.treatLocalhostLike;
    if (treatLocalhostLike) setTreatLocalhostLike(treatLocalhostLike);

    if (uiAdapter) {
      configureWithUi(tenant, uiAdapter);
    } else {
      configureWithoutUi(configuration);
    }
  }

  initRouting(routingConfiguration);
  configureConstraintsValidationCallback(configuration);

  if (configuration.contentTagsForEmptyAttributes === false) {
    skipContentTagsForEmptyAttributes();
  }

  if (configuration.strictSearchOperators) enableStrictSearchOperators();
  setWantsAutoAttributeConversion(!!configuration.autoConvertAttributes);
  setForcedEditorLanguage(configuration.editorLanguage || null);
  setExtensionsUrl(configuration.extensionsUrl || undefined);

  if (unofficialConfiguration?.layoutEditing) enableLayoutEditing();

  if (unofficialConfiguration?.initialContentDumpUrl) {
    setInitialContentDumpUrl(unofficialConfiguration.initialContentDumpUrl);
  }
}

export function getConfiguration(): Promise<Configuration> {
  return configDeferred.promise;
}

// exported for test purpose only
export function setConfiguration(configuration: Configuration): void {
  if (!configDeferred.isPending()) {
    throw new ScrivitoError('Scrivito.configure has already been called.');
  }

  configDeferred.resolve(configuration);
}

// For test purpose only
export function resetConfiguration(): void {
  configDeferred = new Deferred();
  clientConfig.reset();
}

function configureWithUi(tenant: string, uiAdapterClient: UiAdapterClient) {
  uiAdapterClient.configureTenant({
    tenant,
  });

  if (useUnstableMultiSiteMode()) warnIfNoSiteIdSelection();

  setAppAdapter(uiAdapterClient);

  loadEditingAssets();
}

function configureWithoutUi({
  endpoint,
  tenant,
  optimizedWidgetLoading,
  visitorAuthentication,
  priority,
  apiKey,
}: Configuration) {
  if (optimizedWidgetLoading) configureForLazyWidgets(true);

  configureCmsRestApi({
    endpoint,
    tenant,
    visitorAuthentication,
    priority,
    apiKey,
  });
}

function configureCmsRestApi({
  endpoint: configuredEndpoint,
  tenant,
  visitorAuthentication,
  priority,
  apiKey,
}: {
  endpoint?: string;
  tenant: string;
  visitorAuthentication?: boolean;
  priority?: Priority;
  apiKey?: string | IamApiKey;
}) {
  const endpoint = configuredEndpoint || 'api.scrivito.com';

  cmsRestApi.init({
    apiBaseUrl: `${
      endpoint.startsWith('http') ? endpoint : `https://${endpoint}`
    }/tenants/${tenant}`,
    authorizationProvider: getCmsAuthProvider(apiKey, visitorAuthentication),
    analyticsProvider: isRunningInBrowser()
      ? browserAnalyticsProvider
      : nodeAnalyticsProvider,
    priority,
  });
}

function getCmsAuthProvider(
  apiKey?: string | IamApiKey,
  visitorAuthentication?: boolean
) {
  if (nodeAdapter && apiKey) {
    return new nodeAdapter.ApiKeyAuthorizationProvider(apiKey);
  }

  if (isRunningInBrowser() && isUserLoggedIn()) {
    return getBrowserTokenProvider('https://api.justrelate.com');
  }

  return getVisitorAuthenticationProvider(visitorAuthentication);
}

function getCheckedRoutingConfiguration({
  homepage,
  origin,
  routingBasePath,
  baseUrlForSite,
  siteForUrl,
}: Configuration) {
  const homepageCallback = homepage
    ? () => unwrapAppClass(homepage())
    : () => getRootObjFrom(currentAppSpace().and(restrictToSite('default')));

  if (baseUrlForSite && siteForUrl) {
    if (routingBasePath || origin) {
      const presentKey = routingBasePath ? 'routingBasePath' : 'origin';

      throwInvalidArgumentsError(
        PUBLIC_FUNCTION_NAME,
        `The '${presentKey}' cannot be combined with the "baseUrlForSite" option`,
        CHECK_ARGUMENTS_OPTIONS
      );
    }

    return {
      homepageCallback,
      baseUrlForSite,
      siteForUrl,
    };
  }

  if (baseUrlForSite || siteForUrl) {
    const presentKey = siteForUrl ? 'siteForUrl' : 'baseUrlForSite';
    const missingKey = siteForUrl ? 'baseUrlForSite' : 'siteForUrl';
    throwInvalidArgumentsError(
      PUBLIC_FUNCTION_NAME,
      `Unexpected value for argument 'configuration': a value for '${missingKey}' is required if '${presentKey}' is present.`,
      CHECK_ARGUMENTS_OPTIONS
    );
  }

  if (origin !== undefined && !isOrigin(origin)) {
    throwInvalidArgumentsError(
      PUBLIC_FUNCTION_NAME,
      `Unexpected value: '${origin}' is not a valid origin.`,
      CHECK_ARGUMENTS_OPTIONS
    );
  }

  return { homepageCallback, origin, routingBasePath };
}

function configureConstraintsValidationCallback(configuration: Configuration) {
  const constraintsValidationCallback = configuration.constraintsValidation;

  if (constraintsValidationCallback) {
    setConstraintsValidationCallback(constraintsValidationCallback);
  }
}

function setAppAdapter(uiAdapterClient: UiAdapterClient) {
  importUiInterface().then(({ startAppAdapter }) => {
    const channel = new MessageChannel();
    startAppAdapter(linkViaPort(channel.port1));
    uiAdapterClient.setAppAdapter(channel.port2);
  });
}

/** exported for test purposes only */
export function importUiInterface() {
  return import('scrivito_sdk/ui_interface');
}

function warnIfNoSiteIdSelection() {
  const timeout = setTimeout(
    () =>
      load(currentSiteId).then((siteId) => {
        if (siteId === 'default') {
          logError(
            'Warning: No site ID was selected within 30 seconds.' +
              ' In the multi-site mode a site ID must be selected before Scrivito can render content.' +
              ' Forgot to use Scrivito.unstable_selectSiteId?'
          );
        }
      }),
    30000
  );

  load(getUnstableSelectedSiteId).then(() => clearTimeout(timeout));
}

function getIamAuthLocation(iamAuthLocation: string | undefined) {
  if (typeof iamAuthLocation === 'string') return iamAuthLocation;

  const origin = currentOrigin();

  return origin ? `${origin}/auth` : undefined;
}

onReset(resetConfiguration);
