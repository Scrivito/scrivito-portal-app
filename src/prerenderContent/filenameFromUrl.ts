const preferIndex =
  // https://developers.cloudflare.com/pages/configuration/build-configuration/
  process.env.CF_PAGES === '1' ||
  // https://docs.aws.amazon.com/codebuild/latest/userguide/use-codebuild-agent.html
  !!process.env.CODEBUILD_BUILD_ID

export function filenameFromUrl(url: string): string {
  const { pathname } = new URL(url)
  if (pathname === '/') return '/index.html'

  return preferIndex ? `${pathname}/index.html` : `${pathname}.html`
}
