import { isEmpty, isFunction } from 'underscore';
import { getEditingConfigFor } from 'scrivito_sdk/app_support/editing_config_store';
import { presentUiAdapter } from 'scrivito_sdk/app_support/present_ui_adapter';
import { load } from 'scrivito_sdk/loadable';
import { BasicObj, BasicWidget, currentObjSpaceId } from 'scrivito_sdk/models';
import { schemaFromBasicObjOrWidget } from 'scrivito_sdk/realm';
import {
  AttributeValue,
  Widget,
  unwrapAppAttributes,
  wrapInAppClass,
} from 'scrivito_sdk/realm';

export function initialContentFor(
  className: string,
  attributeName: string
): AttributeValue | undefined {
  const initialContent = getEditingConfigFor(className)?.initialContent;

  if (initialContent) {
    const attributeContent = initialContent[attributeName];

    if (isFunction(attributeContent)) {
      return attributeContent();
    }

    if (isWidget(attributeContent)) {
      return wrapInAppClass(attributeContent._scrivitoPrivateContent!.copy());
    }

    if (isWidgetlist(attributeContent)) {
      return attributeContent.map((widget) => {
        const basicWidget = widget._scrivitoPrivateContent;
        const copy = basicWidget.copy();

        return wrapInAppClass(copy);
      });
    }

    return attributeContent;
  }
}

function isWidgetlist(
  maybeWidgetlist: AttributeValue
): maybeWidgetlist is Widget[] {
  return (
    Array.isArray(maybeWidgetlist) &&
    (maybeWidgetlist as unknown[]).every(isWidget)
  );
}

function isWidget(maybeWidget: unknown | Widget): maybeWidget is Widget {
  return (
    !!maybeWidget &&
    (maybeWidget as Widget)._scrivitoPrivateContent instanceof BasicWidget
  );
}

export function initializeContentForObj(objId: string): Promise<void> {
  return load(() => BasicObj.get(objId)).then((basicObj) => {
    if (basicObj) {
      initializeContentFor(basicObj);
      initializeContentFromHook(basicObj);
    }
  });
}

export function initializeContentForWidget(
  objId: string,
  widgetId: string
): Promise<void> {
  return load(() => BasicObj.get(objId)).then((basicObj) => {
    if (!basicObj) return;

    return presentUiAdapter()
      .finishReplicatingObj(currentObjSpaceId(), objId)
      .then(() => {
        const basicWidget = basicObj.widget(widgetId);

        if (basicWidget) {
          initializeContentFor(basicWidget);
          initializeContentFromHook(basicWidget);
        }
      });
  });
}

function initializeContentFor(basicContent: BasicObj | BasicWidget): void {
  const objClassName = basicContent.objClass();
  const schema = schemaFromBasicObjOrWidget(basicContent);
  if (!schema) return;

  const initialAttributes: { [index: string]: AttributeValue } = {};
  Object.keys(schema.attributes()).forEach((attributeName) => {
    const typeInfo = schema.attributes()[attributeName];

    const currentValue = basicContent.get(attributeName, typeInfo);

    if (isEmpty(currentValue)) {
      const initialValue = initialContentFor(objClassName, attributeName);

      if (initialValue) {
        initialAttributes[attributeName] = initialValue;
      }
    }
  });

  const attributesWithTypeInfo = unwrapAppAttributes(
    initialAttributes,
    schema,
    objClassName
  );
  basicContent.update(attributesWithTypeInfo);
}

function initializeContentFromHook(content: BasicObj | BasicWidget): void {
  const callback = getEditingConfigFor(content.objClass())?.initialize;
  if (callback) callback(wrapInAppClass(content));
}
