// @rewire
import { WidgetPoolJson } from 'scrivito_sdk/client/obj_json';
import { InternalError, randomHex } from 'scrivito_sdk/common';

export function generateWidgetId(widgetPool: WidgetPoolJson = {}): string {
  for (let i = 0; i < 10; i++) {
    const id = randomHex();

    if (!widgetPool[id]) return id;
  }

  // Could not generate a new unused widget id.
  // (winning the lottery 5 times in a row is more likely)
  throw new InternalError();
}
