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
      '@auth': path.resolve(__dirname, 'src/auth/index.ts'),
      '@wallet': path.resolve(__dirname, 'src/wallet/index.ts'),
      '@burrow': path.resolve(__dirname, 'src/burrow/index.ts'),
      '@burrow-operation': path.resolve(__dirname, 'src/burrow-operation/index.ts'),
      '@storage': path.resolve(__dirname, 'src/storage/index.ts'),
      '@form': path.resolve(__dirname, 'src/form/index.ts'),
      '@cfmm-operation': path.resolve(__dirname, 'src/cfmm-operation/index.ts'),
      '@burrow-matadata-operation': path.resolve(
        __dirname,
        'src/burrow-metadata-operation/index.ts',
      ),
    },
  },
}
