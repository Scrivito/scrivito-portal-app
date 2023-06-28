import * as Scrivito from 'scrivito'
import { Notification } from './NotificationObjClass'
import { MultilineStringEditor } from '../../Components/MultilineStringEditor'

Scrivito.provideEditingConfig(Notification, {
  title: 'Notification',
  attributes: {
    createdAt: { title: 'Created at', description: 'Format: YYYY-MM-DD' },
    details: { title: 'Details' },
    title: { title: 'Title' },
  },
  titleForContent: (obj) => obj.get('title'),
  properties: ['title', 'createdAt'],
  propertiesGroups: [
    {
      title: 'Multiline attributes',
      key: 'multiline-attributes',

      // Cast is a working around for issue #9925
      // TODO: remove work around
      component: (({ obj }: { obj: InstanceType<typeof Notification> }) => (
        <>
          <MultilineStringEditor
            content={obj}
            attribute="details"
            title="Details"
          />
        </>
      )) as unknown as null,
    },
  ],
  initialContent: {
    icon: 'bi-info-circle',
    createdAt: () => new Date().toLocaleDateString('en-CA'),
  },
})
