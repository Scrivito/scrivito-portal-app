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
  getIamTokenFetcher,
  getLoginHandler,
  isUserLoggedIn,
} from 'scrivito_sdk/app_support/current_user';
import { setExtensionsUrl } from 'scrivito_sdk/app_support/extensions_url';
import { setForcedEditorLanguage } from 'scrivito_sdk/app_support/forced_editor_language';
import { setInitialContentDumpUrl } from 'scrivito_sdk/app_support/initial_content_dump_url';
import { loadEditingAssets } from 'scrivito_sdk/app_support/load_editing_assets';
import { initializeLoggedInState } from 'scrivito_sdk/app_support/logged_in_state';
import {
  isRunningInBrowser,
  nodeAdapter,
} from 'scrivito_sdk/app_support/node_adapter';
import {
  type ResponsiveBreakpoints,
  configureResponsiveBreakpoints,
} from 'scrivito_sdk/app_support/responsive_breakpoints';
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
import type { ForcedEditorLanguage } from 'scrivito_sdk/app_ui_protocol';
import {
  Priority,
  clientConfig,
  cmsRestApi,
  getTokenProvider,
} from 'scrivito_sdk/client';
import {
  Deferred,
  ScrivitoError,
  cdnAssetUrlBase,
  currentOrigin,
  logError,
  onReset,
  setConfiguredTenant,
  setTimeout,
  throwInvalidArgumentsError,
} from 'scrivito_sdk/common';
import {
  IN_MEMORY_TENANT,
  configureForLazyWidgets,
  disableObjReplication,
  useInMemoryTenant,
} from 'scrivito_sdk/data';
import { activateDataIntegration } from 'scrivito_sdk/data_integration';
import { load } from 'scrivito_sdk/loadable';
import {
  enforceBoundedQueries,
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

import {
  ConstraintsValidationCallback,
  setConstraintsValidationCallback,
} from './constraints_validation_callback';

export interface IamApiKey {
  clientId: string;
  clientSecret: string;
}

/** @deprecated Use InstanceIdConfiguration instead */
interface TenantConfiguration {
  /** @deprecated Use `instanceId` instead */
  tenant: string;
  instanceId?: never;
}

interface InstanceIdConfiguration {
  tenant?: never;
  instanceId: string;
}

export type Configuration = (TenantConfiguration | InstanceIdConfiguration) &
  BaseConfiguration;

interface BaseConfiguration {
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
  responsiveBreakpoints?: ResponsiveBreakpoints;

  activateDataIntegration?: boolean;

  /** @internal */
  unstable?: {
    assetUrlBase?: string;
    enforceBoundedQueries?: boolean;
    getSiteIdForObj?: SiteIdForObjCallback;
    trustedUiOrigins?: string[];
    initialContentDumpUrl?: string;
    allowOfflineMode?: boolean;
  };
}

let configDeferred = new Deferred<Configuration>();
let currentConfiguration: Configuration | undefined;

/** @public */
export function configure(configuration: Configuration): void;

/** @internal */
export function configure(configuration: Readonly<Configuration>): void {
  checkConfigure(configuration);

  const routingConfiguration = getCheckedRoutingConfiguration(configuration);

  setConfiguration(configuration);

  const unofficialConfiguration = configuration.unstable;

  const getUnstableSiteIdForObj = unofficialConfiguration?.getSiteIdForObj;
  if (getUnstableSiteIdForObj) {
    setUnstableMultiSiteMode(getUnstableSiteIdForObj);
  }

  const instanceId = getConfiguredInstanceId(configuration);

  if (instanceId === IN_MEMORY_TENANT) {
    useInMemoryTenant();
    setCurrentSiteIdHandler(() => IN_MEMORY_TENANT);
    disableObjReplication();
  } else {
    setConfiguredTenant(instanceId);

    if (isRunningInBrowser()) initializeLoggedInState();

    configureAssetUrlBase(
      unofficialConfiguration?.assetUrlBase ?? cdnAssetUrlBase(),
    );

    clientConfig.set({
      iamAuthLocation: getIamAuthLocation(configuration.iamAuthLocation),
      iamTokenFetcher: getIamTokenFetcher(),
      loginHandler: getLoginHandler(),
    });

    const treatLocalhostLike = configuration.treatLocalhostLike;
    if (treatLocalhostLike) setTreatLocalhostLike(treatLocalhostLike);

    if (uiAdapter) {
      configureWithUi(instanceId, uiAdapter);
    } else {
      configureWithoutUi(configuration);
    }
  }

  initRouting(routingConfiguration);
  configureConstraintsValidationCallback(configuration);

  if (configuration.responsiveBreakpoints) {
    configureResponsiveBreakpoints(configuration.responsiveBreakpoints);
  }

  if (configuration.contentTagsForEmptyAttributes === false) {
    skipContentTagsForEmptyAttributes();
  }

  if (configuration.strictSearchOperators) enableStrictSearchOperators();
  if (configuration.activateDataIntegration) activateDataIntegration();

  setWantsAutoAttributeConversion(!!configuration.autoConvertAttributes);
  setForcedEditorLanguage(configuration.editorLanguage || null);
  setExtensionsUrl(configuration.extensionsUrl || undefined);

  if (unofficialConfiguration?.enforceBoundedQueries) {
    enforceBoundedQueries();
  }

  if (unofficialConfiguration?.initialContentDumpUrl) {
    setInitialContentDumpUrl(unofficialConfiguration.initialContentDumpUrl);
  }
}

export function getConfiguration(): Promise<Configuration> {
  return configDeferred.promise;
}

export function tryGetConfiguration(): Configuration | undefined {
  return currentConfiguration;
}

// exported for test purpose only
export function setConfiguration(configuration: Configuration): void {
  if (!configDeferred.isPending()) {
    throw new ScrivitoError('Scrivito.configure has already been called.');
  }

  currentConfiguration = configuration;
  configDeferred.resolve(configuration);
}

// For test purpose only
export function resetConfiguration(): void {
  configDeferred = new Deferred();
  currentConfiguration = undefined;
  clientConfig.reset();
}

function checkConfigure(configuration: Configuration) {
  if (
    !(
      configuration &&
      typeof configuration == 'object' &&
      getConfiguredInstanceId(configuration)
    )
  ) {
    throwInvalidConfigurationError(
      "The param 'tenant' or 'instanceId' is required.",
    );
  }

  if (configuration.apiKey && isRunningInBrowser()) {
    throwInvalidConfigurationError(
      "The option 'apiKey' is only available under Node.js.",
    );
  }

  if (configuration.origin && !isOrigin(configuration.origin)) {
    throwInvalidConfigurationError(
      "The option 'origin' is must be a valid origin string.",
    );
  }

  if (
    configuration.adoptUi &&
    !(
      typeof configuration.adoptUi === 'boolean' ||
      isOrigin(configuration.adoptUi)
    )
  ) {
    throwInvalidConfigurationError(
      "The option 'adoptUi' is must be an origin string.",
    );
  }
}

function throwInvalidConfigurationError(message: string) {
  throwInvalidArgumentsError('configure', message, {
    docPermalink: 'js-sdk/configure',
  });
}

function isOrigin(origin: string) {
  try {
    return new URL(origin).origin === origin;
  } catch {
    return false;
  }
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
  optimizedWidgetLoading,
  visitorAuthentication,
  priority,
  apiKey,
}: Configuration) {
  if (optimizedWidgetLoading) configureForLazyWidgets(true);

  configureCmsRestApi({
    endpoint,
    visitorAuthentication,
    priority,
    apiKey,
  });
}

function configureCmsRestApi({
  endpoint: configuredEndpoint,
  visitorAuthentication,
  priority,
  apiKey,
}: {
  endpoint?: string;
  visitorAuthentication?: boolean;
  priority?: Priority;
  apiKey?: string | IamApiKey;
}) {
  const endpoint = configuredEndpoint || 'api.scrivito.com';

  cmsRestApi.init({
    apiBaseUrl: endpoint.startsWith('http') ? endpoint : `https://${endpoint}`,
    authorizationProvider: getCmsAuthProvider(apiKey, visitorAuthentication),
    analyticsProvider: isRunningInBrowser()
      ? browserAnalyticsProvider
      : nodeAnalyticsProvider,
    priority,
  });
}

function getCmsAuthProvider(
  apiKey?: string | IamApiKey,
  visitorAuthentication?: boolean,
) {
  if (nodeAdapter && apiKey) {
    return new nodeAdapter.ApiKeyAuthorizationProvider(apiKey);
  }

  if (isRunningInBrowser() && isUserLoggedIn()) {
    return getTokenProvider({ audience: 'https://api.justrelate.com' });
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

      throwInvalidConfigurationError(
        `The '${presentKey}' cannot be combined with the "baseUrlForSite" option`,
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

    throwInvalidConfigurationError(
      `Unexpected value for argument 'configuration': a value for '${missingKey}' is required if '${presentKey}' is present.`,
    );
  }

  if (origin !== undefined && !isOrigin(origin)) {
    throwInvalidConfigurationError(
      `Unexpected value: '${origin}' is not a valid origin.`,
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

async function setAppAdapter(uiAdapterClient: UiAdapterClient) {
  const { startAppAdapter } = await importUiInterface();
  const port = startAppAdapter();
  uiAdapterClient.setAppAdapter(port);
}

/** exported for test purposes only */
export function importUiInterface() {
  return import('scrivito_sdk/ui_interface');
}

async function warnIfNoSiteIdSelection() {
  const timeout = setTimeout(async () => {
    const siteId = await load(currentSiteId);
    if (siteId === 'default') {
      logError(
        'Warning: No site ID was selected within 30 seconds.' +
          ' In the multi-site mode a site ID must be selected before Scrivito can render content.' +
          ' Forgot to use Scrivito.unstable_selectSiteId?',
      );
    }
  }, 30000);

  await load(getUnstableSelectedSiteId);
  clearTimeout(timeout);
}

function getIamAuthLocation(iamAuthLocation: string | undefined) {
  if (typeof iamAuthLocation === 'string') return iamAuthLocation;

  const origin = currentOrigin();

  return origin ? `${origin}/auth` : undefined;
}

export function getConfiguredInstanceId(configuration: Configuration) {
  return 'tenant' in configuration && typeof configuration.tenant === 'string'
    ? configuration.tenant
    : configuration.instanceId;
}

onReset(resetConfiguration);
