// @rewire
import {
  ExponentialBackoff,
  JrRestApi,
  RequestFailedError,
} from 'scrivito_sdk/client';
import { ScrivitoError, fetchConfiguredTenant } from 'scrivito_sdk/common';

interface IngestUploadPermission {
  uploadId: string;
  putUrl: string;
}

/** @public */
export async function uploadFile(source: Blob): Promise<string> {
  const permission = await requestUploadPermission();
  await uploadToIngestService(permission, source);
  return getFileId(permission.uploadId);
}

async function requestUploadPermission(): Promise<IngestUploadPermission> {
  return (await JrRestApi.get(
    `${await getIngestServiceBasePath()}/upload-permission`,
  )) as IngestUploadPermission;
}

async function uploadToIngestService(
  permission: IngestUploadPermission,
  blob: Blob,
): Promise<void> {
  const maxRetries = 3;
  const backoff = new ExponentialBackoff();

  while (backoff.numberOfRetries() <= maxRetries) {
    let response: Response | undefined;

    try {
      response = await fetch(permission.putUrl, { method: 'PUT', body: blob });
    } catch {
      // retry network errors
    }

    if (response) {
      if (response.ok) return;

      if (response.status < 500 && response.status !== 429) {
        throw new ScrivitoError(
          `Binary upload failed with status ${response.status}`,
        );
      }
    }

    await backoff.nextDelay();
  }

  throw new RequestFailedError('Binary upload failed after maximum retries');
}

async function getFileId(uploadId: string): Promise<string> {
  const {
    results: [result],
  } = (await JrRestApi.get(`${await getIngestServiceBasePath()}/file`, {
    params: { upload_id: uploadId },
  })) as { results: { id: string }[] };

  return result.id;
}

async function getIngestServiceBasePath() {
  return `ingest/instance/${await fetchConfiguredTenant()}`;
}
