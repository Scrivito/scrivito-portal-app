import { ArgumentError } from 'scrivito_sdk/common';
import { DataClass, DataItem } from 'scrivito_sdk/data_integration';
import { ObjClass, Schema, WidgetClass } from 'scrivito_sdk/realm';

export function getClassName(
  subject: string | ObjClass | WidgetClass | DataClass | DataItem,
): string {
  if (typeof subject === 'string') return subject;

  if (subject instanceof DataClass) {
    const name = subject.name();
    if (!name) throw new ArgumentError('Anonymous data classes have no name');
    return name;
  }

  if (subject instanceof DataItem) {
    const name = subject.dataClassName();
    if (!name) {
      throw new ArgumentError('Invalid class name, class or instance');
    }

    return name;
  }

  const className = Schema.forClass(subject)?.name();

  if (typeof className !== 'string') {
    throw new ArgumentError('Invalid class name, class or instance');
  }

  return className;
}
