export function getJrPlatformConfig() {
  return {
    unstable: {
      trustedUiOrigins: [
        'http://localhost:8090',
        'https://*.scrivito-ui.pages.dev',
      ],
    },
  }
}
