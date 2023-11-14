let enabled: boolean = false;

export function enableUniqueErrors() {
  enabled = true;
}

export function uniqueErrorMessage(originalMessage: string): string {
  return enabled ? `${originalMessage} #HoneybadgerUnique` : originalMessage;
}

export function detectUniqueErrorMessage(message: string): string | undefined {
  const match = message.match(/^(.*) #HoneybadgerUnique$/);

  return match ? match[1] : undefined;
}

export function cleanUniqueErrorMessage(message: string): string {
  return detectUniqueErrorMessage(message) ?? message;
}

// For test purposes only
export function resetUniqueErrors(): void {
  enabled = false;
}
