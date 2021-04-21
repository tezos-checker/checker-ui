const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@shared/ui': path.resolve(__dirname, 'src/shared-ui/index.ts'),
      '@shared/utils': path.resolve(__dirname, 'src/shared-utils/index.ts'),
      '@theme': path.resolve(__dirname, 'src/theme/index.ts'),
      '@pages': path.resolve(__dirname, 'src/pages/index.ts'),
      '@config': path.resolve(__dirname, 'src/config/index.ts'),
      '@api': path.resolve(__dirname, 'src/api/index.ts'),
    },
  },
}
