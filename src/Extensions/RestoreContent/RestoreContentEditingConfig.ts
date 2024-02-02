import { currentPageParams, extendMenu, canWrite, openDialog } from 'scrivito'
import icon from 'bootstrap-icons/icons/stars.svg'

extendMenu((menu) => {
  if (currentPageParams().restoreContent !== null) return

  menu.insert({
    enabled: canWrite(),
    icon,
    id: 'restoreContent',
    onClick: () => openDialog('RestoreContent'),
    position: { before: 'system.create' },
    title: 'Restore initial content',
  })
})
