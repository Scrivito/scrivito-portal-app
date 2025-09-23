import { uiContext, canWrite, connect, Widget } from 'scrivito'
import Draggable from 'react-draggable'
import { isEqual, times } from 'lodash-es'
import {
  ColumnWidget,
  ColumnWidgetInstance,
} from '../ColumnWidget/ColumnWidgetClass'
import { ColumnContainerWidgetInstance } from './ColumnContainerWidgetClass'
import './ColumnsEditorTab.scss'
import { Component, Fragment, createRef, useMemo } from 'react'

export function ColumnsEditorTab({
  widget,
}: {
  widget: ColumnContainerWidgetInstance
}) {
  const includedWidgetIds = calculateContentIds(calculateContents(widget))
  const { theme } = uiContext() || { theme: null }
  if (!theme) return null

  return (
    <div className={`scrivito_${theme}`}>
      <ColumnsEditor
        // reset component whenever a concurrent widget addition/deletion happened
        key={includedWidgetIds.join('-')}
        widget={widget}
        readOnly={!canWrite()}
        currentGrid={gridOfWidget(widget)}
      />
    </div>
  )
}

const ColumnsEditor = connect(
  ({
    widget,
    readOnly,
    currentGrid,
  }: {
    widget: ColumnContainerWidgetInstance
    readOnly: boolean
    currentGrid: number[]
  }) => {
    const originalContents = useMemo(() => calculateContents(widget), [widget])

    const disableResponsiveAdaption = widget.get('disableResponsiveAdaption')
    const isFlex = widget.get('layoutMode') === 'flex'
    const disableGutters = widget.get('disableGutters')

    function isActive(grid: number[]) {
      return isFlex
        ? isEqual(growFromGrid(grid), growOfWidget(widget))
        : isEqual(grid, currentGrid)
    }

    return (
      <div className="scrivito_detail_content">
        <Alignment
          alignment={widget.get('alignment')}
          setAlignment={(
            alignment?: 'start' | 'center' | 'end' | 'stretch',
          ) => {
            if (!readOnly) widget.update({ alignment })
          }}
          readOnly={readOnly}
        />
        <Switch
          className="two_valued"
          labels={['Grid', 'Flex']}
          onChange={() =>
            widget.update({ layoutMode: isFlex ? 'grid' : 'flex' })
          }
          title="Display mode"
          value={isFlex ? 1 : 0}
        />
        <div className="scrivito_detail_label">
          <span>Layout (desktop)</span>
        </div>
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

        <Switch
          labels={['No', 'Yes']}
          onChange={() =>
            widget.update({
              disableResponsiveAdaption: !disableResponsiveAdaption,
            })
          }
          title="Responsive adaption?"
          value={disableResponsiveAdaption ? 0 : 1}
        />

        <Switch
          labels={['No', 'Yes']}
          onChange={() => widget.update({ disableGutters: !disableGutters })}
          title="Show gutters?"
          description="Gutters are the spaces between columns in a layout."
          value={disableGutters ? 0 : 1}
          disabled={isFlex}
        />
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

    function adjustCols(newGrid: number[]) {
      if (!isEqual(currentGrid, newGrid)) {
        adjustNumberOfColumns(widget, newGrid.length)
        distributeContents(widget.get('columns'), originalContents)
        adjustColSize(widget.get('columns'), newGrid)
      }
    }
  },
)

function calculateContents(widget: ColumnContainerWidgetInstance) {
  return widget
    .get('columns')
    .map((column) => (column as ColumnWidgetInstance).get('content'))
}

function calculateContentIds(contents: Widget[][]) {
  return contents.map((content) => content.map((o) => o.id())).flat()
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
      onClick={() => adjustGrid(grid)}
    >
      {grid.map((colSize, index) => (
        <div className={`grid-col-${colSize}`} key={index} />
      ))}
    </button>
  )
}

function Alignment({
  alignment,
  setAlignment,
  readOnly,
}: {
  alignment: string | null
  setAlignment: (alignment?: 'start' | 'center' | 'end' | 'stretch') => void
  readOnly: boolean
}) {
  const initialClasses = readOnly
    ? ['gle-preview', 'p-0']
    : ['gle-preview', 'p-0', 'clickable']

  const startAlignmentClasses = [...initialClasses]
  const centerAlignmentClasses = [...initialClasses]
  const endAlignmentClasses = [...initialClasses]
  const stretchAlignmentClasses = [...initialClasses]

  switch (alignment) {
    case 'start':
      startAlignmentClasses.push('active')
      break
    case 'center':
      centerAlignmentClasses.push('active')
      break
    case 'end':
      endAlignmentClasses.push('active')
      break
    case 'stretch':
      stretchAlignmentClasses.push('active')
      break
    default:
      startAlignmentClasses.push('active')
      break
  }

  return (
    <Fragment>
      <div className="scrivito_detail_label">
        <span>Alignment</span>
      </div>
      <div className="item_content">
        <div className="gle-preview-list">
          <div className="gle-preview-group">
            <button
              className={startAlignmentClasses.join(' ')}
              title="Content top aligned"
              onClick={() => setAlignment('start')}
            >
              <div className="grid-col-12">
                <span className="alignment" />
              </div>
            </button>

            <button
              className={centerAlignmentClasses.join(' ')}
              title="Content center aligned"
              onClick={() => setAlignment('center')}
            >
              <div className="grid-col-12">
                <span className="alignment center" />
              </div>
            </button>

            <button
              className={endAlignmentClasses.join(' ')}
              title="Content bottom aligned"
              onClick={() => setAlignment('end')}
            >
              <div className="grid-col-12">
                <span className="alignment bottom" />
              </div>
            </button>

            <button
              className={stretchAlignmentClasses.join(' ')}
              title="Content stretch (full height) aligned"
              onClick={() => setAlignment('stretch')}
            >
              <div className="grid-col-12">
                <span className="alignment fullHeight" />
              </div>
            </button>
          </div>
        </div>
        <AlignmentDescription alignment={alignment} />
      </div>
    </Fragment>
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
                onClick={() =>
                  adjustGrow(currentGrow.filter((_, i) => i !== index))
                }
              />
            )}
            <button
              className="btn grid-button"
              title={flexGrow ? 'shrink column' : 'grow column'}
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

class GridLayoutEditor extends Component<
  GridLayoutEditorProps,
  { draggableGrid: number }
> {
  private gridRulerRef: React.RefObject<HTMLDivElement | null>

  constructor(props: GridLayoutEditorProps) {
    super(props)

    this.state = {
      draggableGrid: 0,
    }

    this.gridRulerRef = createRef()

    this.adjustNumberOfColumns = this.adjustNumberOfColumns.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.onDragStop = this.onDragStop.bind(this)
  }

  componentDidMount() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    const firstChild = this.gridRulerRef.current?.firstChild
    if (!firstChild || !(firstChild instanceof HTMLElement)) return

    const parentElement = this.gridRulerRef.current?.parentElement
    if (!parentElement) return
    const isSmallScreen = parentElement.offsetWidth <= 400
    const columnSpacing = isSmallScreen ? 0.25 : 10
    const draggableGrid =
      firstChild.getBoundingClientRect().width + columnSpacing

    if (this.state.draggableGrid !== draggableGrid) {
      this.setState({ draggableGrid })
    }
  }

  onDragStop({
    colIndex,
    deltaColSize,
  }: {
    colIndex: number
    deltaColSize: number
  }) {
    if (deltaColSize === 0) return

    const newGrid = [...this.props.currentGrid]

    const nextColIndex = colIndex + 1
    const previousColIndexValue = newGrid[colIndex]
    const previousColNextIndexValue = newGrid[nextColIndex]

    if (
      typeof previousColIndexValue !== 'number' ||
      typeof previousColNextIndexValue !== 'number'
    ) {
      return
    }

    newGrid[colIndex] = previousColIndexValue + deltaColSize
    newGrid[nextColIndex] = previousColNextIndexValue - deltaColSize

    this.props.adjustGrid(newGrid)
  }

  adjustNumberOfColumns(wantedCols: number) {
    if (wantedCols > 6 || wantedCols < 1) return

    if (wantedCols === 5) {
      this.props.adjustGrid([2, 2, 2, 2, 4])
      return
    }

    const newColSize = 12 / wantedCols
    this.props.adjustGrid(times(wantedCols).map(() => newColSize))
  }

  render() {
    const gridColumns = this.props.currentGrid.map((colSize, colIndex) => {
      const innerContent = [
        <div key="grid-label" className="grid-label">
          {colSize}
        </div>,
      ]

      const nextColSize = this.props.currentGrid[colIndex + 1]
      if (nextColSize) {
        const leftBound = -(colSize - 1)
        const rightBound = nextColSize - 1
        const nodeRef = createRef<HTMLDivElement>()

        innerContent.unshift(
          <Draggable
            disabled={this.props.readOnly}
            key="grid-handle"
            bounds={{
              left: this.state.draggableGrid * leftBound,
              right: this.state.draggableGrid * rightBound,
            }}
            axis="x"
            grid={[this.state.draggableGrid, 0]}
            position={{ x: 0, y: 0 }}
            onStop={(_e, { x }) =>
              this.onDragStop({
                colIndex,
                deltaColSize: Math.round(x / this.state.draggableGrid),
              })
            }
            nodeRef={nodeRef}
          >
            <div
              ref={nodeRef}
              className={this.props.readOnly ? '' : 'grid-handle'}
            />
          </Draggable>,
        )
      } else if (colIndex < 5 && !this.props.readOnly) {
        innerContent.unshift(
          <button
            key="grid-handle-plus"
            className="p-0 grid-handle grid-handle-plus"
            title="add a column"
            onClick={() =>
              this.adjustNumberOfColumns(this.props.currentGrid.length + 1)
            }
          />,
        )
      }

      if (this.props.currentGrid.length > 1 && !this.props.readOnly) {
        innerContent.push(
          <button
            key="grid-del"
            className="btn border-0 grid-del"
            title="delete column"
            onClick={() =>
              this.adjustNumberOfColumns(this.props.currentGrid.length - 1)
            }
          />,
        )
      }

      return (
        <div
          key={`grid-col-${colIndex}`}
          className={`grid-col-${colSize} noselect`}
        >
          {innerContent}
        </div>
      )
    })

    const gridColumnsClass = this.props.readOnly
      ? 'grid-columns'
      : 'grid-columns clickable'

    return (
      <div className="gle">
        <div className="grid-ruler" ref={this.gridRulerRef}>
          {times(12).map((index) => (
            <div key={index} className="grid-col" />
          ))}
        </div>
        <div className={gridColumnsClass}>{gridColumns}</div>
      </div>
    )
  }
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
function distributeContents(columns: Widget[], originalContents: Widget[][]) {
  columns.forEach((column, index) =>
    column.update({
      content:
        index < columns.length - 1
          ? originalContents[index] || []
          : originalContents.slice(index).flat(),
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

function AlignmentDescription({ alignment }: { alignment: string | null }) {
  if (alignment !== 'stretch') return null

  return (
    <div className="scrivito_notice_body">
      Stretch (full height) only works with one box widget inside a column.
    </div>
  )
}

function Switch({
  className,
  description,
  labels,
  onChange,
  title,
  value,
  disabled,
}: {
  className?: string
  description?: string
  labels: string[]
  onChange: () => void
  title: string
  value: number
  disabled?: boolean
}) {
  return (
    <div className={disabled ? 'scrivito_disabled' : undefined}>
      <div className="scrivito_detail_label">
        <span>{title}</span>
      </div>

      <div className="item_content">
        <div className="boolean_attribute_component">
          <label
            className={`scrivito_switch ${className || ''} ${value ? 'active' : ''}`}
            aria-label={labels[value]}
          >
            <input
              type="checkbox"
              className="btn-check"
              checked={!!value}
              onChange={onChange}
              disabled={disabled}
            />
            <div className="pill-wrapper">
              <div className="cell pill"></div>
            </div>
            <div className="cell left" aria-hidden>
              {labels[0]}
            </div>
            <div className="cell right" aria-hidden>
              {labels[1]}
            </div>
          </label>
        </div>
      </div>

      {description && (
        <div className="scrivito_notice_body">
          <span>{description}</span>
        </div>
      )}
    </div>
  )
}
