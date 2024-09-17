import * as Scrivito from 'scrivito'
import { ensureString } from '../utils/ensureString'

// @ts-expect-error Temporarily added for migration
window.migrateAttributeNameToData = migrateAttributeNameToData

const WIDGET_CLASSES = [
  'DataFormBooleanWidget',
  'DataFormHiddenFieldWidget',
  'DataFormInputFieldWidget',
  'DataFormNumberWidget',
  'DataFormOptionsWidget',
  'DataFormUploadWidget',
]

async function migrateAttributeNameToData() {
  const objs = await Scrivito.load(() =>
    Scrivito.Obj.onAllSites()
      .where('_objClass', 'equals', WIDGET_CLASSES)
      .take(),
  )

  console.log(`Updating ${objs.length} objs.`)

  for (const obj of objs) {
    console.log('  Updating', obj.id())
    await updateObj(obj)
    console.log('  ✅ Finished', obj.id())
  }

  console.log(`✅ Finished ${objs.length} objs.`)
}

async function updateObj(obj: Scrivito.Obj) {
  await Promise.all(obj.widgets().map(updateWidget))

  return obj.finishSaving()
}

async function updateWidget(widget: Scrivito.Widget) {
  if (!WIDGET_CLASSES.includes(widget.objClass())) return
  const attributeName = widget.get('attributeName')
  if (!attributeName || typeof attributeName !== 'string') return

  const dataClass = await findDataClassName(widget.container())
  if (!dataClass) {
    throw new Error(`No data class found for widget ${widget.id()}`)
  }

  // @ts-expect-error until out of private beta
  const datalocator = new Scrivito.DataLocator({
    class: dataClass.name,
    field: attributeName,
    via_ref: dataClass.viaRef,
  })

  widget.update({
    attributeName: '',
    data: datalocator,
  })
}

async function findDataClassName(
  item: Scrivito.Obj | Scrivito.Widget,
  isSingle: boolean = false,
): Promise<{ name: string; viaRef: 'single' | 'multi' } | null> {
  const data = item.get('data')
  if (data instanceof Scrivito.DataLocator) {
    // @ts-expect-error until out of private beta
    const dataLocatorClass: string | null = data.class()
    if (dataLocatorClass) {
      return { name: dataLocatorClass, viaRef: isSingle ? 'single' : 'multi' }
    }
  }

  if (item instanceof Scrivito.Widget) {
    return findDataClassName(
      item.container(),
      iteratesOverData(item) || isSingle,
    )
  }

  // @ts-expect-error hacky way to access DataItem class name
  const dataParam: string[] | null = item._scrivitoPrivateContent.dataParam()
  if (dataParam) {
    return { name: ensureString(dataParam[0]), viaRef: 'single' }
  }

  const parent = await Scrivito.load(() => item.parent())
  if (parent) return findDataClassName(parent)

  return null
}

/** Should return true, if `iteratesOver: 'data'` is used */
function iteratesOverData(item: Scrivito.Widget) {
  return ['DataWidget', 'DataColumnListWidget'].includes(item.objClass())
}

// @ts-expect-error Temporarily added for migration
window.findDataClassName = findDataClassName
