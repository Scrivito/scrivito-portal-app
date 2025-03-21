// @rewire
import { InternalError } from 'scrivito_sdk/common';

import { LoadableData } from 'scrivito_sdk/loadable';
import { getCollection } from 'scrivito_sdk/loadable/loadable_collection';
import { withBatchedUpdates } from 'scrivito_sdk/state';

type RecordName = string;
type RecordKey = unknown;
type RecordValue = unknown;

type DataRecord = [RecordName, RecordKey, RecordValue];
export type DataRecording = DataRecord[];

/** load the data stored in the recording */
export function loadRecording(recording: DataRecording): void {
  withBatchedUpdates(() => recording.forEach(loadDataFromRecord));
}

function loadDataFromRecord([name, key, value]: DataRecord): void {
  const loadableData = getCollection(name).get(key);

  loadableData.set(value);
}

export function generateRecording(
  datas: Array<LoadableData<unknown>>
): DataRecording {
  return datas.map(generateRecord);
}

function generateRecord(data: LoadableData<unknown>): DataRecord {
  const affiliation = data.getAffiliation();

  if (!affiliation) {
    // Tried to record a LoadableData without affiliation
    throw new InternalError();
  }

  return [affiliation.collectionName, affiliation.key, data.get()];
}
