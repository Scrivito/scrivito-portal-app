// @rewire
export function randomHex(): string {
  let hex = Math.floor(Math.random() * Math.pow(16, 8)).toString(16);
  while (hex.length < 8) {
    hex = `0${hex}`;
  }
  return hex;
}

export function randomId(): string {
  return randomHex() + randomHex();
}
