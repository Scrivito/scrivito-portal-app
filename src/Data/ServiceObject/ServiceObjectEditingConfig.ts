import { provideEditingConfig } from 'scrivito'
import { ServiceObject } from './ServiceObjectDataClass'

provideEditingConfig(ServiceObject, {
  title: 'Service object',
  attributes: {
    picture: { title: 'Picture' },

    // TODO: Remove the following attributes, once #11338 is resolved:
    carrier: { title: 'Carrier' },
    category: { title: 'Category' },
    customer: { title: 'Customer' },
    information: { title: 'Information' },
    installedAt: { title: 'Installed at' },
    isCarrier: { title: 'Am I the carrier?' },
    isCustomer: { title: 'Am I the customer?' },
    isSupplier: { title: 'Am I the supplier?' },
    keyword: { title: 'Keyword' },
    locationCity: { title: 'Location: city' },
    locationCountry: { title: 'Location country' },
    locationPostalCode: { title: 'Location: postal code' },
    locationStreet: { title: 'Location: street' },
    modelNumber: { title: 'Model number' },
    number: { title: 'Number' },
    parentId: { title: 'Parent service object' },
    product: { title: 'Product name' },
    productType: { title: 'Product type' },
    responsibleAgent: { title: 'Responsible agent' },
    serialNumber: { title: 'Serial number' },
    status: { title: 'Status' },
    supplier: { title: 'Supplier' },
    type: { title: 'Type' },
    warrantyEndsAt: { title: 'Warranty ends at' },
  },
})
