let treatLocalhostLike: string | undefined;

export function setTreatLocalhostLike(url: string): void {
  treatLocalhostLike = url;
}

export function getTreatLocalhostLike(): string | undefined {
  return treatLocalhostLike;
}

// For test purposes only
export function resetTreatLocalhostLike(): void {
  treatLocalhostLike = undefined;
}
