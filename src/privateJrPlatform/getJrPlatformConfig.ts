export function getJrPlatformConfig(
  additionalUnstableConfig: Record<string, string> = {},
) {
  return {
    unstable: {
      initialContentDumpUrl:
        'https://v6-content.scrivito-portal-app.pages.dev/index.json',
      trustedUiOrigins: [
        'http://localhost:8090',
        'https://*.scrivito-ui.pages.dev',
      ],
      widgetHighlighting: true,
      ...additionalUnstableConfig,
    },
  }
}
