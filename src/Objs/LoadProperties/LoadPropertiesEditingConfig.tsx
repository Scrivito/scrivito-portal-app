import { Obj, provideEditingConfig } from 'scrivito'
import { LoadProperties } from './LoadPropertiesObjClass'

provideEditingConfig(LoadProperties, {
  propertiesGroups: () => [
    {
      title: 'More conditions',
      properties: [
        'someStringAttr',
        Obj.get('123')?.get('someStringAttr') === 'someValue'
          ? null
          : 'conditionalAttr',
      ].filter((p): p is string => typeof p === 'string'),
      key: 'more-conditions-group',
    },
    {
      title: 'Custom component',
      component: () => <div>My custom component</div>,
      key: 'custom-component-group',
    },
  ],
})
