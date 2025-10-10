import type { DataVariables } from 'scrivito_sdk/editing_support/data_variables';
import {
  BasicAttributeValue,
  BasicAttributeValueForUpdate,
  CmsAttributeType,
} from 'scrivito_sdk/models';
import { AttributeEditingOptions } from './editing_config';

export type { CmsAttributeType } from 'scrivito_sdk/models';
export type { ContentBrowserResult } from 'scrivito_sdk/editing_support';

export type DomMode = 'None' | 'Replace';

type DataVariablesEditingOptions = { dataVariables?: DataVariables };

export type EditingOptions = AttributeEditingOptions &
  DataVariablesEditingOptions;

export interface AbstractEditorClass<Type extends CmsAttributeType> {
  new ({
    controller,
  }: {
    controller: EditController<Type>;
  }): AbstractEditorInterface<Type>;

  canEdit({ type, tag }: { type: CmsAttributeType; tag: string }): boolean;
}

export declare class AbstractEditorInterface<Type extends CmsAttributeType> {
  onClick: () => void;
  constructor(args: { controller: EditController<Type> });
  contentDidChange(): void;
  editorWillBeActivated(): void;
  editorWillBeDeactivated(): void;
  editorDomWasMounted(element: Element): void;
  editorDomWasUnmounted(): void;
}

export interface EditController<Type extends CmsAttributeType> {
  getContent(): BasicAttributeValue<Type>;
  setContent(val: BasicAttributeValueForUpdate<Type>): void;
  setDomMode(domMode: DomMode): void;
  validObjClasses(): readonly string[] | undefined;
  options(): Readonly<EditingOptions> | undefined;
}
