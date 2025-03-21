import { getHistoryChangesCount } from 'scrivito_sdk/app_support/browser_location';
import { AnalyticsData } from 'scrivito_sdk/client';
import { currentHref, onReset } from 'scrivito_sdk/common';

let loadId = generateLoadId();

export function browserAnalyticsProvider(): AnalyticsData {
  return {
    loadId,
    urlPath: new URL(currentHref()).pathname,
    nav: getHistoryChangesCount(),
  };
}

export function nodeAnalyticsProvider(): AnalyticsData {
  return { loadId };
}

function generateLoadId() {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

onReset(() => (loadId = generateLoadId()));
