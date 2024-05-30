import * as Scrivito from 'scrivito'
import { ensureString } from '../../utils/ensureString'

// @ts-expect-error Temporarily added for migration
window.migrateDataLabelWidgets = migrateDataLabelWidgets

async function migrateDataLabelWidgets() {
  const objs = await Scrivito.load(() =>
    Scrivito.Obj.onAllSites()
      .where('_objClass', 'equals', 'DataLabelWidget')
      .take(),
  )

  console.log(`Updating ${objs.length} objs with DataLabelWidgets.`)

  for (const obj of objs) {
    console.log('  Updating', obj.id())
    await updateObj(obj)
    console.log('  ✅ Finished', obj.id())
  }

  console.log(`✅ Finished ${objs.length} objs with DataLabelWidgets.`)
}

async function updateObj(obj: Scrivito.Obj) {
  await Promise.all(obj.widgets().map(updateWidget))

  return obj.finishSaving()
}

async function updateWidget(widget: Scrivito.Widget) {
  if (widget.objClass() !== 'DataLabelWidget') return
  const attributeName = widget.get('attributeName')
  if (!attributeName || typeof attributeName !== 'string') return

  const dataClass = await findDataClassName(widget.container())
  if (!dataClass) {
    throw new Error(`No data class found for widget ${widget.id()}`)
  }

  // @ts-expect-error until out of private beta
  const datalocator = new Scrivito.DataLocator({
    class: dataClass,
    field: attributeName,
    via_ref: 'single',
  })

  widget.update({
    attributeName: '',
    data: datalocator,
  })
}

async function findDataClassName(
  item: Scrivito.Obj | Scrivito.Widget,
): Promise<string | null> {
  const data = item.get('data')
  if (data instanceof Scrivito.DataLocator) {
    // @ts-expect-error until out of private beta
    const dataLocatorClass: string | null = data.class()
    if (dataLocatorClass) return dataLocatorClass
  }

  if (item instanceof Scrivito.Widget) {
    return findDataClassName(item.container())
  }

  // @ts-expect-error hacky way to access DataItem class name
  const dataParam: string[] | null = item._scrivitoPrivateContent.dataParam()
  if (dataParam) return ensureString(dataParam[0])

  const parent = await Scrivito.load(() => item.parent())
  if (parent) return findDataClassName(parent)

  return null
}

// @ts-expect-error Temporarily added for migration
window.findDataClassName = findDataClassName
