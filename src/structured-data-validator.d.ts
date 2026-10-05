declare module '@adobe/structured-data-validator/src/types/*.js' {
  export interface PathElement {
    type?: string | string[]
    index?: number
    length?: number
    property?: string
  }

  export interface StructuredDataIssue {
    issueMessage: string
    severity: 'ERROR' | 'WARNING'
    path: PathElement[]
    fieldNames?: string[]
  }

  export type Condition = (
    data: Record<string, unknown>,
  ) => StructuredDataIssue | StructuredDataIssue[] | null

  export default class Validator {
    constructor(options: {
      dataFormat: string
      path: PathElement[]
      type?: string
    })
    path: PathElement[]
    getConditions(data?: unknown): Condition[]
    required(name: string, type?: string, ...opts: unknown[]): Condition
    recommended(name: string, type?: string, ...opts: unknown[]): Condition
    validate(data: Record<string, unknown>): StructuredDataIssue[]
  }
}
