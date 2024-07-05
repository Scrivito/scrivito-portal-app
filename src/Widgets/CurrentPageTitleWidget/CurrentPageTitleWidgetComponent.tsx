import { ContentTag, currentPage, provideComponent } from 'scrivito'
import { CurrentPageTitleWidget } from './CurrentPageTitleWidgetClass'

provideComponent(CurrentPageTitleWidget, ({ widget }) => {
  const backgroundColor = widget.get('backgroundColor') || 'primary'

  return (
    <div className="header-caption">
      <h3 className="h3">
        <ContentTag
          content={currentPage()}
          attribute="title"
          tag="span"
          className={`bg-${backgroundColor}`}
        />
      </h3>
    </div>
  )
})
