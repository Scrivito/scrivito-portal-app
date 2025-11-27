import {
  AttributeJson,
  CustomAttributeJsonMapping,
  HtmlAttributeJson,
  LinkAttributeJson,
  LinklistAttributeJson,
  ObjJson,
  ReferenceAttributeJson,
  ReferencelistAttributeJson,
  withEachAttributeJson,
} from 'scrivito_sdk/client';
import { ScrivitoError, equals, throwNextTick } from 'scrivito_sdk/common';
import { OBJ_ID_PATTERN } from 'scrivito_sdk/link_resolution';
import { load, loadableWithDefault } from 'scrivito_sdk/loadable';
import { BasicObj } from 'scrivito_sdk/models';

type UnsafeMapping = (currentId: string) => string | undefined | unknown;
type Mapping = (currentId: string) => string;

export function updateReferences(
  obj: BasicObj,
  unsafeMapping: UnsafeMapping
): Promise<void> {
  return updateReferencesWithSafeMapping(obj, (currentId: string) => {
    let newId;

    try {
      newId = loadableWithDefault(undefined, () => unsafeMapping(currentId));
    } catch (error) {
      throwNextTick(error);
    }

    if (newId !== undefined) {
      if (typeof newId !== 'string') {
        throwNextTick(
          new ScrivitoError(
            `Unexpected result from mapping function passed to updateReferences (must be string or undefined): ${String(
              newId
            )}`
          )
        );
      } else if (!newId.match(/^[a-f0-9]{16}$/)) {
        throwNextTick(
          new ScrivitoError(
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

async function updateReferencesWithSafeMapping(
  obj: BasicObj,
  mapping: Mapping
) {
  const objJson = await load(() => obj.getData());
  if (!objJson) return;

  const workers = getWorkers(objJson, obj, mapping);
  if (!workers.length) return;

  await Promise.all(workers);
}

function getWorkers(
  objJson: ObjJson,
  obj: BasicObj,
  fn: Mapping
): Array<Promise<void>> {
  const workers: Array<Promise<void>> = [];

  withEachAttributeJson(objJson, (jsonToUpdate, attributeName, widgetId) => {
    const convert = getConversion(jsonToUpdate);
    if (!convert) return;

    const worker = (async () => {
      const newJson = await load(() => convert(jsonToUpdate, fn));
      const currentJson = widgetId
        ? obj.getWidgetAttribute(widgetId, attributeName)
        : obj.getAttributeData(attributeName);

      if (!equals(currentJson, jsonToUpdate)) return;

      const patch = { [attributeName]: newJson };
      if (widgetId) {
        obj.objData.update({
          _widget_pool: {
            [widgetId]: patch,
          },
        });
      } else {
        obj.objData.update(patch);
      }
    })();

    workers.push(worker);
  });

  return workers;
}

type Conversion<T> = (json: T, m: Mapping) => T;

function getConversion(
  json: AttributeJson
): Conversion<AttributeJson> | undefined {
  return CONVERSIONS[json[0]];
}

const CONVERSIONS: Partial<{
  [key in keyof CustomAttributeJsonMapping]: Conversion<
    CustomAttributeJsonMapping[key]
  >;
}> = {
  html: convertHtml,
  link: convertLink,
  linklist: convertLinklist,
  reference: convertReference,
  referencelist: convertReferencelist,
};

function convertHtml(
  attributeJson: HtmlAttributeJson,
  mapping: Mapping
): HtmlAttributeJson {
  return [
    'html',
    attributeJson[1].replace(
      OBJ_ID_PATTERN,
      (internalLinkUrl) => `objid:${mapping(internalLinkUrl.slice(6, 22))}`
    ),
  ];
}

function convertLink(
  attributeJson: LinkAttributeJson,
  mapping: Mapping
): LinkAttributeJson {
  const linkJson = attributeJson[1];
  const { obj_id } = linkJson;
  if (!obj_id) return attributeJson;

  return ['link', { ...linkJson, obj_id: mapping(obj_id) }];
}

function convertLinklist(
  attributeJson: LinklistAttributeJson,
  mapping: Mapping
): LinklistAttributeJson {
  return [
    'linklist',
    attributeJson[1].map((linkJson) => {
      const { obj_id } = linkJson;
      if (!obj_id) return linkJson;

      return { ...linkJson, obj_id: mapping(obj_id) };
    }),
  ];
}

function convertReference(
  attributeJson: ReferenceAttributeJson,
  mapping: Mapping
): ReferenceAttributeJson {
  return ['reference', mapping(attributeJson[1])];
}

function convertReferencelist(
  attributeJson: ReferencelistAttributeJson,
  mapping: Mapping
): ReferencelistAttributeJson {
  return ['referencelist', attributeJson[1].map(mapping)];
}
