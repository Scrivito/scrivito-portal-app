import { DataClassAttributes } from '../types'
import { localStorageServiceObjectDataClass } from './LocalStorage/localStorageServiceObjectDataClass'
import { pisaServiceObjectDataClass } from './Pisa/pisaServiceObjectDataClass'

const attributes: DataClassAttributes = {
  carrier: 'string',
  customer: 'string',
  information: 'string',
  keyword: 'string',
  locationCity: 'string',
  locationCountry: 'string', // TODO: convert to enum, once fully available
  locationPostalCode: 'string',
  locationStreet: 'string',
  modelNumber: 'string',
  number: 'string',
  parentId: 'string', // TODO: convert to reference, once fully available
  product: 'string',
  responsibleAgent: 'string', // TODO: convert to reference, once fully available
  serialNumber: 'string',
  status: 'string', // TODO: convert to enum, once fully available
  supplier: 'string',
}

export const ServiceObject = import.meta.env.ENABLE_PISA
  ? pisaServiceObjectDataClass(attributes)
  : localStorageServiceObjectDataClass(attributes)
