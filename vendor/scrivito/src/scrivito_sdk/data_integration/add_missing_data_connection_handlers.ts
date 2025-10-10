import { ScrivitoError } from 'scrivito_sdk/common';
import { UncheckedDataConnection } from 'scrivito_sdk/data_integration';

export function addMissingDataConnectionHandlers(
  connection: Partial<UncheckedDataConnection>,
  dataClass: string
): UncheckedDataConnection {
  return {
    get: connection.get || throwMissingCallbackError('get', dataClass),
    update: connection.update || throwMissingCallbackError('update', dataClass),
    index: connection.index || throwMissingCallbackError('index', dataClass),
    create: connection.create || throwMissingCallbackError('create', dataClass),
    delete: connection.delete || throwMissingCallbackError('delete', dataClass),
  };
}

export function throwMissingCallbackError(
  callbackName: keyof UncheckedDataConnection,
  dataClass: string
) {
  return () => {
    throw new ScrivitoError(
      `No "${callbackName}" callback function defined for data class "${dataClass}".`
    );
  };
}
