import { canEdit, isComparisonActive, uiContext } from 'scrivito'
import { DimensionEditor } from './DimensionEditor'
import { HomepageInstance } from '../../Objs/Homepage/HomepageObjClass'

export function SiteBorderRadiusEditor({ page }: { page: HomepageInstance }) {
  const { theme } = uiContext() || { theme: null }
  if (!theme) return null

  const readOnly = !canEdit(page) || isComparisonActive()

  return (
    <div
      className={`site-border-radius-editor scrivito_detail_content scrivito_${theme}`}
    >
      <div className="row">
        <div className="col-auto">
          <DimensionEditor
            onUpdate={(value) => page.update({ siteBorderRadius: value })}
            placeholder="1"
            readOnly={readOnly}
            units={['px']}
            value={page.get('siteBorderRadius')}
          />
          <div className="scrivito_notice_body">
            Applies to elements such as cards, buttons, and forms throughout the
            site. Set to 0 to disable rounded corners.
            <br />
            Default: 8.5px
          </div>
        </div>
      </div>
    </div>
  )
}
