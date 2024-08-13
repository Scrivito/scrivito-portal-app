import { DataClassAttributes } from '../types'
import { localStorageServiceObjectDataClass } from './LocalStorage/localStorageServiceObjectDataClass'
import { pisaServiceObjectDataClass } from './Pisa/pisaServiceObjectDataClass'

const attributes: DataClassAttributes = {
  carrier: 'string',
  customer: 'string',
  information: 'string',
  installedAt: 'date',
  keyword: 'string',
  locationCity: 'string',
  locationCountry: 'string', // TODO: convert to enum, once fully available
  locationPostalCode: 'string',
  locationStreet: 'string',
  modelNumber: 'string',
  number: 'string',
  product: 'string',
  serialNumber: 'string',
  status: 'string', // TODO: convert to enum, once fully available
  supplier: 'string',
  warrentyEndsAt: 'date',
}

export const ServiceObject = import.meta.env.ENABLE_PISA
  ? pisaServiceObjectDataClass(attributes)
  : localStorageServiceObjectDataClass(attributes)
