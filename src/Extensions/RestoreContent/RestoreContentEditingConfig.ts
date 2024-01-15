import { currentPageParams, extendMenu, canWrite, openDialog } from 'scrivito'

extendMenu((menu) => {
  if (currentPageParams().restoreContent !== null) return

  menu.insert({
    enabled: canWrite(),
    id: 'restoreContent',
    onClick: () => openDialog('RestoreContent'),
    position: { before: 'system.create' },
    title: 'Restore initial content',
  })
})
