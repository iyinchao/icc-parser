const typescript = require('@rollup/plugin-typescript');
const { getResolve } = require('./utils');

const resolve = getResolve(__dirname, '../');

module.exports = {
  input: resolve('src/index.ts'),
  output: [
    {
      format: 'cjs',
      sourcemap: true,
      file: resolve('lib/index.js')
    },
    {
      format: 'es',
      sourcemap: true,
      file: resolve('lib/index.esm.js'),
    }
  ],
  plugins: [
    typescript({
      declarationDir: resolve('lib'),
    })
  ]
}
