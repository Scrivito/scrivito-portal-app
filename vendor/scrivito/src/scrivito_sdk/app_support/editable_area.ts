import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { EditableArea } from 'scrivito_sdk/app_ui_protocol';

export function getEditableArea(): EditableArea | undefined {
  return uiAdapter?.getEditableArea();
}
