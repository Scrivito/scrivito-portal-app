import { SyncFunctionComponent } from './provide_component';

export function withDisplayName<Props>(
  name: string,
  component: SyncFunctionComponent<Props>
) {
  component.displayName = name;

  return component;
}
