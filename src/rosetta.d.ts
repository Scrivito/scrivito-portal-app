type DotPath<T> = {
  [K in keyof T & string]: T[K] extends Record<string, unknown>
    ? `${K}.${DotPath<T[K]>}`
    : K
}[keyof T & string]

export interface Rosetta<T> {
  locale(lang?: string): string
  set(lang: string, table: T): void
  table(lang: string): T | void
  t<X extends Record<string, unknown> | unknown[]>(
    key: DotPath<T> | (string | number)[],
    params?: X,
    lang?: string,
  ): string
}

declare function rosetta<T>(dict?: Record<string, T>): Rosetta<T>
export = rosetta
