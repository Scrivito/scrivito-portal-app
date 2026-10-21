import {
  ContentTag,
  currentPage,
  designProps,
  provideComponent,
} from 'scrivito'
import { PageTitleWidget } from './PageTitleWidgetClass'

provideComponent(PageTitleWidget, ({ widget }) => (
  <div className="header-caption">
    <h1 className="h3">
      <ContentTag
        {...designProps(widget.get('design'))}
        content={currentPage()}
        attribute="title"
        tag="span"
      />
    </h1>
  </div>
))
