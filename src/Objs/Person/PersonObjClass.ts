import { provideObjClass } from 'scrivito'

export const Person = provideObjClass('Person', {
  attributes: {
    email: 'string',
    employeeId: 'string',
    fax: 'string',
    image: ['reference', { only: ['Image'] }],
    jobTitle: 'string',
    name: 'string',
    telephone: 'string',
  },
})

export type PersonInstance = InstanceType<typeof Person>

export function isPerson(input: unknown): input is PersonInstance {
  return input instanceof Person
}
