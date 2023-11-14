export type ObjUnavailableReason =
  | 'forbidden'
  | 'nonexistent'
  | 'notLoaded'
  | 'unavailable';

export class ObjUnavailable {
  constructor(
    private readonly _id: string,
    private readonly _reason: ObjUnavailableReason
  ) {}

  id(): string {
    return this._id;
  }

  isForbidden(): boolean {
    return this._reason === 'forbidden';
  }

  isNonexistent(): boolean {
    return this._reason === 'nonexistent';
  }

  isNotLoaded(): boolean {
    return this._reason === 'notLoaded';
  }

  // For test purpose only.
  reason(): ObjUnavailableReason {
    return this._reason;
  }
}
