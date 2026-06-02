export function generatePreloadDumpScript(preloadDump: string): string {
  const escapedContent = preloadDump.replace(/<\/script/gi, '<\\/script')
  return `<script type="text/plain" id="preload-dump">${escapedContent}</script>`
}
