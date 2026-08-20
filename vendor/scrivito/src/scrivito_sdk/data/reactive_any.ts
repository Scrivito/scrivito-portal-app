import { createStateContainer } from 'scrivito_sdk/state';

export class ReactiveAny {
  private count = createStateContainer<number>();

  isAnyTrue(): boolean {
    return (this.count.get() ?? 0) > 0;
  }

  memberChanged(oldValue: boolean | undefined, newValue: boolean): void {
    if (oldValue === newValue) return;
    const current = this.count.get() ?? 0;
    this.count.set(current + (newValue ? 1 : -1));
  }
}
