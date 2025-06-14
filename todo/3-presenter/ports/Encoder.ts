export type Encoder<T> = {
  encode: (x: T) => string
  decode: (x: string) => T
}
