export interface UserData {
  id: string;
  name: string;
  email: string;
  picture: string | null;
}

/** @public */
export class User {
  /** @internal */
  constructor(
    /** @internal */
    private readonly userData: UserData
  ) {}

  id(): string {
    return this.userData.id;
  }

  name(): string {
    return this.userData.name;
  }

  email(): string {
    return this.userData.email;
  }

  picture(): string | null {
    return this.userData.picture;
  }
}
