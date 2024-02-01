import { configureContentBrowser, Obj } from 'scrivito'
import { DATA_OBJ_CLASSES } from '../Objs/dataObjClasses'

export function configureScrivitoContentBrowser() {
  configureContentBrowser({
    filters: ({ _validObjClasses }) => {
      if (_validObjClasses) {
        switch (_validObjClasses.length) {
          case 0:
            return defaultFilters()
          case 1:
            return filterForObjClass(_validObjClasses[0])
          default:
            return filtersForObjClasses(_validObjClasses)
        }
      }

      return defaultFilters()
    },
  })
}

interface FilterOption {
  field: string
  icon: string
  title: string
  value: string
}

function filterForObjClass(objClass: string) {
  return {
    _objClass: {
      options: {
        [objClass]: {
          ...filterOptionForObjClass(objClass),
          selected: true,
        },
      },
    },
  }
}

function filtersForObjClasses(objClasses: string[]) {
  return {
    _objClass: {
      options: {
        All: {
          title: 'All',
          icon: 'folder',
          field: '_objClass',
          value: objClasses,
          selected: true,
        },
        ...objClasses.reduce(
          (result, value) => {
            result[value] = filterOptionForObjClass(value)
            return result
          },
          {} as { [key: string]: FilterOption },
        ),
      },
    },
  }
}

function defaultFilters() {
  return {
    _objClass: {
      options: {
        All: {
          title: 'All',
          icon: 'folder',
          query: Obj.all(),
          selected: true,
        },
        Image: filterOptionForObjClass('Image'),
        Pages: {
          title: 'Pages',
          icon: 'sheet',
          field: '_objClass',
          value: PAGES,
          options: PAGES.reduce(
            (result, value) => {
              result[value] = filterOptionForObjClass(value)
              return result
            },
            {} as { [key: string]: FilterOption },
          ),
        },
        Download: filterOptionForObjClass('Download'),
        Video: filterOptionForObjClass('Video'),
        Data: {
          title: 'Data',
          field: '_objClass',
          value: DATA_OBJ_CLASSES,
          options: DATA_OBJ_CLASSES.reduce(
            (result, value) => {
              result[value] = filterOptionForObjClass(value)
              return result
            },
            {} as { [key: string]: FilterOption },
          ),
        },
      },
    },
    _modification: {
      title: 'Changed',
      type: 'checkbox' as const,
      expanded: true,
      field: '_modification',
      options: {
        New: {
          value: 'new',
        },
        Edited: {
          value: 'edited',
        },
      },
    },
  }
}

function filterOptionForObjClass(
  objClass: keyof typeof FILTER_PRESENTATIONS | string,
): FilterOption {
  const filterPresentation = isFilterPresentationsKey(objClass)
    ? FILTER_PRESENTATIONS[objClass]
    : {
        title: objClass,
        icon: 'question',
      }

  return { field: '_objClass', value: objClass, ...filterPresentation }
}

function isFilterPresentationsKey(
  objClass: string,
): objClass is keyof typeof FILTER_PRESENTATIONS {
  return Object.keys(FILTER_PRESENTATIONS).includes(objClass)
}

// Icons are listed at https://www.scrivito.com/js-sdk/configureContentBrowser#filter-definition
const FILTER_PRESENTATIONS = {
  Download: { title: 'Downloads', icon: 'pdf' },
  Homepage: { title: 'Homepage', icon: 'inbox' },
  Image: { title: 'Images', icon: 'image' },
  Invoice: { title: 'Invoice', icon: 'certificate' },
  Page: { title: 'Standard pages', icon: 'sheet' },
  Product: { title: 'Products', icon: 'suitcase' },
  ProductCategory: { title: 'Product categories', icon: 'relation' },
  ProductsOverview: { title: 'Products overviews', icon: 'relation' },
  Video: { title: 'Videos', icon: 'video' },
}

const PAGES = [
  'Page',
  'Homepage',
  'Product',
  'ProductCategory',
  'ProductsOverview',
]
