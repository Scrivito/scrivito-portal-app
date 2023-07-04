import { getScrivitoVersion, logError } from 'scrivito_sdk/common';
import { setContentStateId } from 'scrivito_sdk/data';
import {
  DataRecording,
  LoadableData,
  generateRecording,
  loadRecording,
} from 'scrivito_sdk/loadable';
import { currentWorkspaceId } from 'scrivito_sdk/models';
import { withBatchedUpdates } from 'scrivito_sdk/state';

interface MaybeContentDump {
  version: unknown;
}

interface ContentDump {
  version: string;
  csid: string;
  recording: DataRecording;
}

/** dump the content of all provided LoadableData instances */
export function generateContentDump(
  data: Array<LoadableData<unknown>>,
  contentStateId: string
): string {
  return stringify({
    version: getScrivitoVersion(),
    csid: contentStateId,
    recording: generateRecording(data),
  });
}

/** load the data from the content dump string into the SDK */
export function loadContentDump(contentDump: string): void {
  const parsed = parse(contentDump);
  if (!parsed) {
    logError('could not preload: parsing dump failed');
    return;
  }
  if (!isContentDumpFromThisVersion(parsed)) {
    logError(
      'could not preload: ' +
        `dump is from version ${parsed.version}` +
        `, this is version ${getScrivitoVersion()}`
    );
    return;
  }

  withBatchedUpdates(() => {
    setContentStateId(currentWorkspaceId(), parsed.csid);
    loadRecording(parsed.recording);
  });
}

function stringify(contentDump: ContentDump): string {
  return JSON.stringify(contentDump);
}

function parse(stringifiedContentDump: string): MaybeContentDump | undefined {
  const parsed = parseJsonObject(stringifiedContentDump);

  if (parsed && isMaybeContentDump(parsed)) return parsed;
}

function parseJsonObject(text: string): object | undefined {
  if (text.charAt(0) !== '{') return;

  try {
    return JSON.parse(text) as object;
  } catch (error) {
    return;
  }
}

function isMaybeContentDump(parsed: object): parsed is MaybeContentDump {
  return !!(parsed as MaybeContentDump).version;
}

function isContentDumpFromThisVersion(
  dump: MaybeContentDump
): dump is ContentDump {
  return dump.version === getScrivitoVersion();
}
