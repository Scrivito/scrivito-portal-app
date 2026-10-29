import { Obj, Widget } from 'scrivito_sdk/realm';

interface CustomComponentProps {
  attributeName?: string;
  readOnly: boolean;
}

/** @public */
export interface CustomPageComponentProps extends CustomComponentProps {
  obj: Obj;
  page: Obj;
}

/** @public */
export interface CustomWidgetComponentProps extends CustomComponentProps {
  widget: Widget;
}
