export default {
  directory: 'dist-ssr',
  port: 8080,
  rewrite: [{ from: '(/[^.]+)', to: '$1.html' }],
  spa: 'index.html',
  spaAssetTestFs: true,
  staticMaxage: 31536000,
}
