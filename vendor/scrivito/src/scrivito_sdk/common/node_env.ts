export let nodeEnv: string | undefined = process.env.NODE_ENV;

/** For test purposes only */
export function setNodeEnv(value: 'development' | 'production') {
  nodeEnv = value;
}
