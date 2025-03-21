export function withDisplayName<Props>(
  name: string,
  component: React.FunctionComponent<Props>
) {
  component.displayName = name;

  return component;
}
