import { provideEditingConfig } from 'scrivito'
import { EventPage } from './EventPageObjClass'
import { SectionWidget } from '../../Widgets/SectionWidget/SectionWidgetClass'
import { HeadlineWidget } from '../../Widgets/HeadlineWidget/HeadlineWidgetClass'
import { ColumnContainerWidget } from '../../Widgets/ColumnContainerWidget/ColumnContainerWidgetClass'
import { ColumnWidget } from '../../Widgets/ColumnWidget/ColumnWidgetClass'
import { DataLabelWidget } from '../../Widgets/DataLabelWidget/DataLabelWidgetClass'

provideEditingConfig(EventPage, {
  title: 'Event',
  attributes: {
    endDate: {
      title: 'End date',
    },
    startDate: {
      title: 'Start date',
    },
    title: {
      title: 'Title',
    },
  },
  properties: ['title', 'startDate', 'endDate'],
  initialContent: {
    body: [
      new SectionWidget({
        content: [
          new HeadlineWidget({ headline: '__EventPage.title__' }),
          new ColumnContainerWidget({
            columns: [
              new ColumnWidget({
                content: [
                  new DataLabelWidget({
                    label: 'Start date',
                    showAs: 'datetime',
                    datetimeFormat: 'date',
                  }),
                ],
              }),
              new ColumnWidget({
                content: [
                  new DataLabelWidget({
                    label: 'End date',
                    showAs: 'datetime',
                    datetimeFormat: 'date',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
    endDate: () => addDays(8),
    startDate: () => addDays(7),
    title: 'Annual Innovation Summit',
  },
})

function addDays(days: number): Date {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date
}
