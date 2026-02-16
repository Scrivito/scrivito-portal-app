import {
  canEdit,
  connect,
  isComparisonActive,
  uiContext,
  Widget,
} from 'scrivito'
import * as Slider from '@radix-ui/react-slider'
import { isEqual, times } from 'lodash-es'
import {
  ColumnWidget,
  ColumnWidgetInstance,
} from '../ColumnWidget/ColumnWidgetClass'
import { ColumnContainerWidgetInstance } from './ColumnContainerWidgetClass'
import './ColumnsEditor.scss'
import { useRef } from 'react'

export const ColumnsEditor = connect(function ColumnsEditor({
  widget,
}: {
  widget: ColumnContainerWidgetInstance
}) {
  const baselineRef = useRef<Widget[][]>([])
  const preserveBaselineRef = useRef(false)

  const { theme } = uiContext() || { theme: null }
  if (!theme) return null

  const readOnly = !canEdit(widget.obj()) || isComparisonActive()

  // Read unconditionally, so "connect" always tracks column contents and rerenders on external changes
  const currentContents = calculateContents(widget)

  if (preserveBaselineRef.current) {
    preserveBaselineRef.current = false
  } else {
    baselineRef.current = currentContents
  }

  const baselineKey = baselineRef.current
    .map((content) => content.map((w) => w.id()).join(','))
    .join('|')

  const currentGrid = gridOfWidget(widget)

  return (
    <div className={`scrivito_${theme}`}>
      <ColumnsLayoutEditor
        key={baselineKey}
        widget={widget}
        readOnly={readOnly}
        currentGrid={currentGrid}
        adjustCols={adjustCols}
      />
    </div>
  )

  function adjustCols(newGrid: number[]) {
    if (isEqual(currentGrid, newGrid)) return

    preserveBaselineRef.current = true
    adjustNumberOfColumns(widget, newGrid.length)
    distributeContents(widget.get('columns'), baselineRef.current)
    adjustColSize(widget.get('columns'), newGrid)
  }
})

const ColumnsLayoutEditor = connect(function ColumnsLayoutEditor({
  widget,
  readOnly,
  currentGrid,
  adjustCols,
}: {
  widget: ColumnContainerWidgetInstance
  readOnly: boolean
  currentGrid: number[]
  adjustCols: (newGrid: number[]) => void
}) {
  const isFlex = widget.get('layoutMode') === 'flex'

  function isActive(grid: number[]) {
    return isFlex
      ? isEqual(growFromGrid(grid), growOfWidget(widget))
      : isEqual(grid, currentGrid)
  }

  return (
    <div className="columns-editor-content">
      <div className="item_content">
        <div className="gle-preview-list">
          <div className="gle-preview-group">
            <PresetGrid
              isActive={isActive}
              adjustGrid={adjustGrid}
              readOnly={readOnly}
              title="1 column"
              grid={[12]}
            />
          </div>
          <div className="gle-preview-group">
            <PresetGrid
              isActive={isActive}
              adjustGrid={adjustGrid}
              readOnly={readOnly}
              title="2 columns"
              grid={[6, 6]}
            />
            <PresetGrid
              isActive={isActive}
              adjustGrid={adjustGrid}
              readOnly={readOnly}
              title="2 columns"
              grid={[3, 9]}
            />
            <PresetGrid
              isActive={isActive}
              adjustGrid={adjustGrid}
              readOnly={readOnly}
              title="2 columns"
              grid={[9, 3]}
            />
          </div>
          <div className="gle-preview-group">
            <PresetGrid
              isActive={isActive}
              adjustGrid={adjustGrid}
              readOnly={readOnly}
              title="3 columns"
              grid={[4, 4, 4]}
            />
            <PresetGrid
              isActive={isActive}
              adjustGrid={adjustGrid}
              readOnly={readOnly}
              title="3 columns"
              grid={[2, 8, 2]}
            />
            <PresetGrid
              isActive={isActive}
              adjustGrid={adjustGrid}
              readOnly={readOnly}
              title="3 columns"
              grid={[2, 5, 5]}
            />
            <PresetGrid
              isActive={isActive}
              adjustGrid={adjustGrid}
              readOnly={readOnly}
              title="3 columns"
              grid={[5, 5, 2]}
            />
          </div>
          <div className="gle-preview-group">
            <PresetGrid
              isActive={isActive}
              adjustGrid={adjustGrid}
              readOnly={readOnly}
              title="4 columns"
              grid={[3, 3, 3, 3]}
            />
            <PresetGrid
              isActive={isActive}
              adjustGrid={adjustGrid}
              readOnly={readOnly}
              title="4 columns"
              grid={[2, 4, 4, 2]}
            />
          </div>
          <div className="gle-preview-group">
            <PresetGrid
              isActive={isActive}
              adjustGrid={adjustGrid}
              readOnly={readOnly}
              title="5 columns"
              grid={[2, 2, 2, 2, 4]}
            />
          </div>
          <div className="gle-preview-group">
            <PresetGrid
              isActive={isActive}
              adjustGrid={adjustGrid}
              readOnly={readOnly}
              title="6 columns"
              grid={[2, 2, 2, 2, 2, 2]}
            />
          </div>
        </div>
        {isFlex ? (
          <FlexLayoutEditor
            currentGrow={growOfWidget(widget)}
            adjustGrow={adjustGrow}
            readOnly={readOnly}
          />
        ) : (
          <GridLayoutEditor
            currentGrid={currentGrid}
            adjustGrid={adjustGrid}
            readOnly={readOnly}
          />
        )}
      </div>
    </div>
  )

  function adjustGrid(newGrid: number[]) {
    if (readOnly) return
    adjustCols(newGrid)
    adjustFlexGrowFromGrid(widget.get('columns'), newGrid)
  }

  function adjustGrow(newGrow: boolean[]) {
    if (readOnly) return
    const newGrid =
      newGrow.length === 5
        ? [2, 2, 2, 2, 4]
        : newGrow.map(() => 12 / newGrow.length)
    adjustCols(newGrid)
    adjustFlexGrow(widget.get('columns'), newGrow)
  }
})

function calculateContents(widget: ColumnContainerWidgetInstance) {
  return widget
    .get('columns')
    .map((column) => (column as ColumnWidgetInstance).get('content'))
}

function PresetGrid({
  isActive,
  adjustGrid,
  title,
  grid,
  readOnly,
}: {
  adjustGrid: (newGrid: number[]) => void
  isActive: (grid: number[]) => boolean
  grid: number[]
  readOnly: boolean
  title: string
}) {
  const classNames = ['gle-preview', 'p-0']
  if (!readOnly) classNames.push('clickable')
  if (isActive(grid)) classNames.push('active')

  return (
    <button
      className={classNames.join(' ')}
      title={title}
      disabled={readOnly}
      onClick={() => adjustGrid(grid)}
    >
      {grid.map((colSize, index) => (
        <div className={`grid-col-${colSize}`} key={index} />
      ))}
    </button>
  )
}

function FlexLayoutEditor({
  readOnly,
  adjustGrow,
  currentGrow,
}: {
  readOnly: boolean
  adjustGrow: (newGrow: boolean[]) => void
  currentGrow: boolean[]
}) {
  return (
    <div className="gle flex-layout">
      <div className={`grid-columns ${readOnly ? '' : 'clickable'}`}>
        {currentGrow.map((flexGrow, index) => (
          <div
            key={index}
            className={`grid-col grid-col-${flexGrow ? 'grow' : 'shrink'}`}
          >
            {!readOnly && currentGrow.length > 1 && (
              <button
                className="btn grid-del"
                title="delete column"
                disabled={readOnly}
                onClick={() =>
                  adjustGrow(currentGrow.filter((_, i) => i !== index))
                }
              />
            )}
            <button
              className="btn grid-button"
              title={flexGrow ? 'shrink column' : 'grow column'}
              disabled={readOnly}
              onClick={() =>
                adjustGrow(currentGrow.map((v, i) => (i === index ? !v : v)))
              }
            />
          </div>
        ))}

        {!readOnly && currentGrow.length < 6 && (
          <button
            className="p-0 grid-handle grid-handle-plus"
            title="add a column"
            disabled={readOnly}
            onClick={() => adjustGrow([...currentGrow, true])}
          />
        )}
      </div>
    </div>
  )
}
interface GridLayoutEditorProps {
  currentGrid: number[]
  adjustGrid: (newGrid: number[]) => void
  readOnly: boolean
}

function GridLayoutEditor({
  currentGrid,
  adjustGrid,
  readOnly,
}: GridLayoutEditorProps) {
  function adjustNumberOfColumns(wantedCols: number) {
    if (wantedCols > 6 || wantedCols < 1) return

    if (wantedCols === 5) {
      adjustGrid([2, 2, 2, 2, 4])
      return
    }

    const newColSize = 12 / wantedCols
    adjustGrid(times(wantedCols).map(() => newColSize))
  }

  return (
    <div className="gle">
      <div className="grid-ruler">
        {times(12).map((index) => (
          <div key={index} className="grid-col" />
        ))}
      </div>
      <div className={readOnly ? 'grid-columns' : 'grid-columns clickable'}>
        {currentGrid.map((colSize, colIndex) => (
          <div
            key={`grid-col-${colIndex}`}
            className={`grid-col-${colSize} noselect`}
          >
            {colIndex === currentGrid.length - 1 &&
            colIndex < 5 &&
            !readOnly ? (
              <button
                className="p-0 grid-handle grid-handle-plus"
                title="add a column"
                onClick={() => adjustNumberOfColumns(currentGrid.length + 1)}
              />
            ) : null}
            <div className="grid-label">{colSize}</div>
            {currentGrid.length > 1 && !readOnly ? (
              <button
                className="btn border-0 grid-del"
                title="delete column"
                onClick={() => adjustNumberOfColumns(currentGrid.length - 1)}
              />
            ) : null}
          </div>
        ))}
        {!readOnly && currentGrid.length > 1 && (
          <GridSlider currentGrid={currentGrid} adjustGrid={adjustGrid} />
        )}
      </div>
    </div>
  )
}

function GridSlider({
  currentGrid,
  adjustGrid,
}: {
  currentGrid: number[]
  adjustGrid: (newGrid: number[]) => void
}) {
  const boundaries = gridToBoundaries(currentGrid)

  function handleBoundaryChange(index: number, value: number) {
    const min = (boundaries[index - 1] || 0) + 1
    const max = (boundaries[index + 1] || 12) - 1
    if (value < min || value > max) return
    adjustGrid(boundariesToGrid(boundaries.with(index, value)))
  }

  return boundaries.map((value, index) => (
    <Slider.Root
      key={index}
      className="grid-slider"
      max={12}
      onValueChange={([v]: number[]) => handleBoundaryChange(index, v || 0)}
      value={[value]}
    >
      <Slider.Thumb className="grid-handle" />
    </Slider.Root>
  ))
}

function gridOfWidget(containerWidget: ColumnContainerWidgetInstance) {
  return containerWidget
    .get('columns')
    .map((column) => (column as ColumnWidgetInstance).get('colSize') || 1)
}

function growOfWidget(containerWidget: ColumnContainerWidgetInstance) {
  return containerWidget
    .get('columns')
    .map((column) => (column as ColumnWidgetInstance).get('flexGrow'))
}

function adjustNumberOfColumns(
  containerWidget: ColumnContainerWidgetInstance,
  desiredLength: number,
) {
  const columns = containerWidget.get('columns')
  if (columns.length === desiredLength) return

  const newColumns = times(desiredLength).map(
    (index) => columns[index] || new ColumnWidget({}),
  )

  // store results, to receive IDs for new ColumnWidgets
  containerWidget.update({ columns: newColumns })
}

/**
 * Copy first n - 1 columns and merge last columns into one
 */
function distributeContents(columns: Widget[], baseline: Widget[][]) {
  columns.forEach((column, index) =>
    column.update({
      content:
        index < columns.length - 1
          ? baseline[index] || []
          : baseline.slice(index).flat(),
    }),
  )
}

function adjustColSize(columns: Widget[], newGrid: number[]) {
  columns.forEach((column, index) => {
    column.update({ colSize: newGrid[index] })
  })
}

function adjustFlexGrow(columns: Widget[], newGrow: boolean[]) {
  columns.forEach((column, index) => {
    column.update({ flexGrow: newGrow[index] })
  })
}

function adjustFlexGrowFromGrid(columns: Widget[], grid: number[]) {
  const flexGrow = growFromGrid(grid)
  columns.forEach((column, index) =>
    column.update({ flexGrow: flexGrow[index] }),
  )
}

function growFromGrid(grid: number[]) {
  const max = Math.max(...grid)
  return grid.map((colSize) => colSize === max)
}

function gridToBoundaries(columnWidths: number[]) {
  let cumulativeWidth = 0
  return columnWidths.slice(0, -1).map((width) => (cumulativeWidth += width))
}

function boundariesToGrid(boundaries: number[]) {
  return [...boundaries, 12].map((edge, i, edges) => edge - (edges[i - 1] ?? 0))
}
