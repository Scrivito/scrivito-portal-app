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
          className={backgroundClassName(backgroundColor)}
        />
      </h1>
    </div>
  )
})

function backgroundClassName(backgroundColor: string): string {
  switch (backgroundColor) {
    case 'primary':
      return 'bg-portal-primary text-on-portal-primary'
    case 'secondary':
      return 'bg-portal-secondary text-on-portal-secondary'
    case 'white':
      return 'bg-portal-white text-on-portal-white'
    case 'light-grey':
      return 'bg-portal-light-grey text-on-portal-light-grey'
    case 'middle-grey':
      return 'bg-portal-middle-grey text-on-portal-middle-grey'
    case 'dark-grey':
      return 'bg-portal-dark-grey text-on-portal-dark-grey'
    case 'success':
      return 'bg-portal-success text-on-portal-success'
    case 'info':
      return 'bg-portal-info text-on-portal-info'
    case 'warning':
      return 'bg-portal-warning text-on-portal-warning'
    case 'danger':
      return 'bg-portal-danger text-on-portal-danger'
    case 'transparent':
      return ''
    default:
      throw new Error(`Unknown backgroundColor: ${backgroundColor}`)
  }
}
