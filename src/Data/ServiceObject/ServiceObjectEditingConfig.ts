import { provideEditingConfig } from 'scrivito'
import { ServiceObject } from './ServiceObjectDataClass'

provideEditingConfig(ServiceObject, {
  title: 'Service object',
  attributes: {
    _id: { title: 'Service object ID' },
    keyword: { title: 'Keyword' },
    number: { title: 'Number' },
    serialNumber: { title: 'Serial number' },
    modelNumber: { title: 'Model number' },
    status: { title: 'Status' },
    responsibleAgent: { title: 'Responsible agent (ID)' },
    customer: { title: 'Customer' },
    isCustomer: { title: 'Is customer?' },
    carrier: { title: 'Carrier' },
    isCarrier: { title: 'Is carrier?' },
    supplier: { title: 'Supplier' },
    isSupplier: { title: 'Is supplier?' },
    product: { title: 'Product' },
    installedAt: { title: 'Installed at' },
    warrentyEndsAt: { title: 'Warranty ends at' },
    information: { title: 'Information' },
    locationStreet: { title: 'Location (street)' },
    locationPostalCode: { title: 'Location (postal code)' },
    locationCity: { title: 'Location (city)' },
    locationCountry: { title: 'Location (country)' },
    picture: { title: 'Picture' },
  },
})
