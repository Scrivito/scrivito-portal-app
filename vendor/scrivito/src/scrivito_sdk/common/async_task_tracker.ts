import { Deferred } from 'scrivito_sdk/common';

export class AsyncTaskTracker {
  private onDone: undefined | Deferred;
  private taskCounter = 0;

  async registerTask<T>(task: () => Promise<T>): Promise<T> {
    if (!this.onDone) this.onDone = new Deferred();
    this.taskCounter++;

    try {
      return await task();
    } finally {
      this.taskCounter--;

      if (this.taskCounter === 0) {
        this.onDone?.resolve();
        this.onDone = undefined;
      }
    }
  }

  async waitForRegisteredTasks(): Promise<void> {
    if (this.onDone) await this.onDone;
  }

  hasRegisteredTasks(): boolean {
    return this.taskCounter > 0;
  }
}
