import { CustomMenuItem, MenuBuilder } from 'scrivito_sdk/ui_interface';

export class MenuHandlerBuilder implements MenuBuilder {
  private onClick: (() => void) | undefined;

  constructor(private readonly id: string) {}

  insert(customMenuItem?: CustomMenuItem): void {
    if (customMenuItem && customMenuItem.id === this.id) {
      this.onClick = customMenuItem.onClick;
    }
  }

  modify(): void {
    // Do nothing
  }

  remove(): void {
    // Do nothing
  }

  getHandler(): (() => void) | undefined {
    return this.onClick;
  }
}
