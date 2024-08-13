import { provideEditingConfig } from 'scrivito'
import { ServiceObject } from './ServiceObjectDataClass'

provideEditingConfig(ServiceObject, {
  title: 'Service object',
  attributes: {
    _id: { title: 'Service object ID' },
    carrier: { title: 'Carrier' },
    customer: { title: 'Customer' },
    information: { title: 'Information' },
    installedAt: { title: 'Installed at' },
    isCarrier: { title: 'Is carrier?' },
    isCustomer: { title: 'Is customer?' },
    isSupplier: { title: 'Is supplier?' },
    keyword: { title: 'Keyword' },
    locationCity: { title: 'Location (city)' },
    locationCountry: { title: 'Location (country)' },
    locationPostalCode: { title: 'Location (postal code)' },
    locationStreet: { title: 'Location (street)' },
    modelNumber: { title: 'Model number' },
    number: { title: 'Number' },
    parentId: { title: 'Parent service object (ID)' },
    picture: { title: 'Picture' },
    product: { title: 'Product' },
    responsibleAgent: { title: 'Responsible agent (ID)' },
    serialNumber: { title: 'Serial number' },
    status: { title: 'Status' },
    supplier: { title: 'Supplier' },
    warrantyEndsAt: { title: 'Warranty ends at' },
  },
})
