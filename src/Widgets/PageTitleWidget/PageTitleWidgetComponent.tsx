import { ContentTag, currentPage, provideComponent } from 'scrivito'
import { applyTextStyle } from '../propertiesGroups/textStyle/applyTextStyle'
import { PageTitleWidget } from './PageTitleWidgetClass'

provideComponent(PageTitleWidget, ({ widget }) => {
  const backgroundColor = widget.get('backgroundColor') || 'primary'

  return (
    <div className="header-caption">
      <h1 className="h3" style={applyTextStyle(widget)}>
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
