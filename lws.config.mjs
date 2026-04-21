export default {
  directory: 'dist-ssr',
  port: 8080,
  rewrite: [{ from: '/:path', to: '/:path.html' }],
  spa: 'index.html',
  spaAssetTestFs: true,
  staticMaxage: 31536000,
}
