import * as React from 'react'
import Fuse from 'fuse.js'
import { SingleIcon } from './SingleIcon'
import { bootstrapIcons } from './bootstrapIcons'

interface IconSearchResultsProps {
  searchValue: string
  setWidgetIcon: (event: React.BaseSyntheticEvent, icon: string) => void
  currentIcon: string
}
export const IconSearchResults: React.FC<IconSearchResultsProps> = ({
  searchValue,
  setWidgetIcon,
  currentIcon,
}) => {
  const fuse = React.useMemo(() => {
    const fuseOptions = {
      threshold: 0.2,
    }
    return new Fuse(bootstrapIcons, fuseOptions)
  }, [])

  if (!searchValue.length) return null

  const results = fuse.search(searchValue)

  return (
    <div id="search-results">
      <div className="scrivito_detail_label">
        <span>{`Search for '${searchValue}'`}</span>
      </div>
      <div className="icon-grid">
        {results.map((result, index) => {
          const icon = result.item
          return (
            <SingleIcon
              key={`${icon}${index}`}
              icon={icon}
              currentIcon={currentIcon}
              setWidgetIcon={setWidgetIcon}
            />
          )
        })}
      </div>
    </div>
  )
}
