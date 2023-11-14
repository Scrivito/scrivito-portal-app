import * as URI from 'urijs';

import * as BrowserLocation from 'scrivito_sdk/app_support/browser_location';
import { changeLocation } from 'scrivito_sdk/app_support/change_location';
import {
  CrossSiteDestination,
  DestinationUnavailable,
  LocalDestination,
  RemoteDestination,
  generateDestinationUnavailable,
} from 'scrivito_sdk/app_support/destination_types';
import {
  Hash,
  generateDestination,
  generateDestinationForId,
  isLocalUri,
} from 'scrivito_sdk/app_support/routing';
import { QueryParameters, logError, redirectTo } from 'scrivito_sdk/common';
import { load } from 'scrivito_sdk/loadable';
import { BasicObj } from 'scrivito_sdk/models';
import { isBinaryBasicObj } from 'scrivito_sdk/realm';
import { failIfFrozen } from 'scrivito_sdk/state';

export type RoutingTarget = UrlRoutingTarget | ObjIdRoutingTarget;

interface UrlRoutingTarget {
  url: string;
}

interface ObjIdRoutingTarget {
  objId: string;
  query?: QueryParameters;
  hash?: Hash;
}

let latestCallId = 0;

export function getNextNavigateToCallId(): number {
  latestCallId++;

  return latestCallId;
}

export function isLatestNavigateToCallId(callId: number): boolean {
  return latestCallId === callId;
}

export function basicNavigateTo(
  target: RoutingTarget,
  callId = getNextNavigateToCallId()
): Promise<void> {
  failIfFrozen('basicNavigateTo');

  return load(() => destinationForTarget(target)).then((routingTarget) => {
    if (isLatestNavigateToCallId(callId)) {
      switch (routingTarget.type) {
        case 'remote':
          changeLocation(routingTarget.url);
          break;
        case 'local':
          navigateToResource(routingTarget.resource);
          break;
        case 'crossSite':
          navigateCrossSiteTo(routingTarget.url);
          break;
        case 'unavailable':
          logError(
            `Could not navigate to Obj ${routingTarget.objId}, no URL found`
          );
      }
    }
  });
}

type NavigationDestination =
  | CrossSiteDestination
  | DestinationUnavailable
  | LocalDestination
  | RemoteDestination;

function destinationForTarget(target: RoutingTarget): NavigationDestination {
  if (isUrlRoutingTarget(target)) return destinationForUrl(target.url);

  const { objId, query, hash } = target;
  const obj = BasicObj.get(objId);
  if (!obj) return generateDestinationForId({ objId, query, hash });

  if (isBinaryBasicObj(obj)) {
    const blob = obj.get('blob', ['binary']);
    if (!blob) return generateDestinationUnavailable({ objId });

    return { type: 'remote', url: blob.url() };
  }

  return generateDestination({ obj, query, hash });
}

function navigateToResource(resource: string): void {
  const currentResource = BrowserLocation.get();

  if (resource === currentResource) {
    BrowserLocation.replace(resource);
  } else {
    BrowserLocation.push(resource);
  }
}

function isUrlRoutingTarget(
  routingTarget: RoutingTarget
): routingTarget is UrlRoutingTarget {
  return !!(routingTarget as UrlRoutingTarget).url;
}

function destinationForUrl(url: string) {
  const uri = URI(url);

  return isLocalUri(uri)
    ? { type: 'local' as const, resource: uri.resource() }
    : { type: 'remote' as const, url };
}

function navigateCrossSiteTo(url: string) {
  const uri = new URI(url);

  if (isLocalUri(uri)) {
    navigateToResource(uri.resource());
  } else {
    redirectTo(url);
  }
}
