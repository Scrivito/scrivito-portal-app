export function phoneNumberToTelUri(phoneNumber: string): string {
  return `tel:${phoneNumber.replace(/[^+\d]/g, '')}`
}
