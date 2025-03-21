export interface WorkspaceData {
  id: string;
  title: string;
}

/** @public */
export class Workspace {
  /** @internal */
  constructor(
    /** @internal */
    private readonly workspaceData: WorkspaceData
  ) {}

  id(): string {
    return this.workspaceData.id;
  }

  title(): string {
    return this.workspaceData.title;
  }
}
