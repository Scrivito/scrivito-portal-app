import { provideObjClass } from 'scrivito'

export const Dropdown = provideObjClass('Dropdown', {
  attributes: {
    childOrder: 'referencelist',
    hideInNavigation: 'boolean',
    layoutIgnoreTopLevelLayout: 'boolean',
    title: 'string',
  },
})

export type DropdownInstance = InstanceType<typeof Dropdown>

export function isDropdown(input: unknown): input is DropdownInstance {
  return input instanceof Dropdown
}
