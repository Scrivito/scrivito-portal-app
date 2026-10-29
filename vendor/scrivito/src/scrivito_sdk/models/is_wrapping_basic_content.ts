import { isWrapping } from 'scrivito_sdk/common';
import { BasicLink } from 'scrivito_sdk/models/basic_link';
import { BasicObj } from 'scrivito_sdk/models/basic_obj';
import { BasicWidget } from 'scrivito_sdk/models/basic_widget';

export function isWrappingBasicContent(subject: unknown): boolean {
  return isWrappingBasicObj(subject) || isWrappingBasicWidget(subject);
}

export function isWrappingBasicObj(subject: unknown): boolean {
  return isWrapping(subject, BasicObj);
}

export function isWrappingBasicWidget(subject: unknown): boolean {
  return isWrapping(subject, BasicWidget);
}

export function isWrappingBasicLink(subject: unknown): boolean {
  return isWrapping(subject, BasicLink);
}
