/** @public */
export class ScrivitoError extends Error {
  __proto__?: Error;

  constructor(message?: string) {
    // 'Error' breaks prototype chain here
    super(message);

    // restore prototype chain
    // see: https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
    const correctPrototype = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, correctPrototype);
    } else {
      this.__proto__ = correctPrototype;
    }
  }

  get name() {
    return this.constructor.name;
  }
}

/** @public */
export class ArgumentError extends ScrivitoError {
  constructor(message: string) {
    super(message);
  }
}

export class InternalError extends ScrivitoError {
  constructor(message?: string) {
    super(message ?? 'Scrivito internal error');
  }
}
