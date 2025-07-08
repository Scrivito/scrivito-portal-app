import { ContentTag, currentPage, provideComponent } from 'scrivito'
import { PageTitleWidget } from './PageTitleWidgetClass'

provideComponent(PageTitleWidget, ({ widget }) => {
  const backgroundColor = widget.get('backgroundColor') || 'primary'

  return (
    <div className="header-caption">
      <h1 className="h3">
        <ContentTag
          content={currentPage()}
          attribute="title"
          tag="span"
          className={`bg-${backgroundColor}`}
        />
      </h1>
    </div>
  )
})
