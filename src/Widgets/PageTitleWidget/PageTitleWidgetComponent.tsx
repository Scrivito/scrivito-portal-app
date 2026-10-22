import { ContentTag, currentPage, provideComponent } from 'scrivito'
import { PageTitleWidget } from './PageTitleWidgetClass'

provideComponent(PageTitleWidget, ({ widget }) => (
  <div className="header-caption">
    <h1 className="h3">
      {/* The title comes from the page, the design from the widget — so the design has to be
          given as a value rather than read from the content being rendered. */}
      <ContentTag
        design={widget.get('design')}
        content={currentPage()}
        attribute="title"
        tag="span"
      />
    </h1>
  </div>
))
