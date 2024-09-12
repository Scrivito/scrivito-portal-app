import * as React from 'react'
import * as Scrivito from 'scrivito'
import { isEmpty } from 'lodash-es'
import { AllIcons } from './AllIcons'
import { IconSearch } from './IconSearch'
import { IconSearchResults } from './IconSearchResults'
import './IconEditorTab.scss'

interface IconEditorTabProps {
  widget: Scrivito.Widget
}

export const IconEditorTab: React.FC<IconEditorTabProps> = ({ widget }) => {
  const [searchValue, setSearchValue] = React.useState('')
  const currentIcon = widget.get('icon') as string
  const color = 'gold' // getIconColor(widget)
  const uiContext = Scrivito.uiContext()
  if (!uiContext) return null

  return (
    <div className={`scrivito_${uiContext.theme}`}>
      <div className="neoletter-form-icon-editor-tab">
        <div className="scrivito_detail_content">
          <div className="scrivito_detail_label">
            <span>Preview</span>
          </div>
          <div className="icon-editor-preview">
            <i
              className={`bs-icon ${currentIcon}`}
              style={{
                color: color,
              }}
            ></i>
          </div>

          {Scrivito.canWrite() && (
            <>
              <IconSearch
                searchValue={searchValue}
                setSearchValue={(newSearchValue) => {
                  if (searchValue !== newSearchValue) {
                    setSearchValue(newSearchValue)
                  }
                }}
              />
              <IconSearchResults
                currentIcon={currentIcon}
                searchValue={searchValue}
                setWidgetIcon={setWidgetIcon}
              />
              <AllIcons
                currentIcon={currentIcon}
                hide={!isEmpty(searchValue)}
                setWidgetIcon={setWidgetIcon}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )

  function setWidgetIcon(event: React.BaseSyntheticEvent, icon: string): void {
    event.preventDefault()
    event.stopPropagation()
    widget.update({ icon })
  }
}
