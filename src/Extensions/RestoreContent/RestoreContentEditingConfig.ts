import { currentPageParams, extendMenu, canWrite, openDialog } from 'scrivito'

extendMenu((menu) => {
  if (currentPageParams().restoreContent !== null) return

  menu.insert({
    enabled: canWrite(),
    icon: 'https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/stars.svg',
    id: 'restoreContent',
    onClick: () => openDialog('RestoreContent'),
    position: { before: 'system.create' },
    title: 'Restore initial content',
  })
})
