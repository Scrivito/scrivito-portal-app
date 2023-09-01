// @rewire
/** redirects from a Packaged UI location to the equivalent Cloud UI location */
export function redirectToCloudUi(
  cloudUiOrigin: string,
  tenant: string,
  url: string
) {
  window.parent.location.replace(`${cloudUiOrigin}/${tenant}~${url}`);
}
