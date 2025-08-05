export function getJrPlatformConfig() {
  return {
    unstable: {
      initialContentDumpUrl:
        'https://energy-content.scrivito-portal-app.pages.dev/index.json',
      trustedUiOrigins: [
        'http://localhost:8090',
        'https://*.scrivito-ui.pages.dev',
      ],
    },
  }
}
