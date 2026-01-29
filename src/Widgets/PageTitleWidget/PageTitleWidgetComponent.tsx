import { ContentTag, currentPage, provideComponent, WidgetTag } from 'scrivito'
import { applyTextStyle } from '../propertiesGroups/textStyle/applyTextStyle'
import { applyPadding } from '../propertiesGroups/padding/applyPadding'
import { PageTitleWidget } from './PageTitleWidgetClass'

provideComponent(PageTitleWidget, ({ widget }) => {
  const backgroundColor = widget.get('backgroundColor') || 'primary'

  return (
    <WidgetTag style={applyPadding(widget)}>
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
    </WidgetTag>
  )
})
