import { Obj, provideEditingConfig } from 'scrivito'
import { LoadProperties } from './LoadPropertiesObjClass'

provideEditingConfig(LoadProperties, {
  properties: [
    'someStringAttr',
    Obj.get('123')?.get('someStringAttr') === 'someValue'
      ? null
      : 'conditionalAttr',
  ].filter((p): p is string => typeof p === 'string'),
})
