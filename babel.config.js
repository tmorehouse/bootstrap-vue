module.exports = api => {
  const isDocs = api.env('docs')

  let presets = []
  if (!isDocs) {
    presets.push(['@babel/env', { useBuiltIns: 'entry', corejs: { version: 2 } }])
  }

  return {
    presets,
    env: {
      // Legacy es build
      es: {
        plugins: [['@babel/plugin-transform-modules-commonjs', { loose: true }]]
      },
      // ESM Modular Build
      esm: {
        presets: [['@babel/env', { modules: false }]]
      },
      // CJS Modular Build
      cjs: {
       plugins: [['@babel/plugin-transform-modules-commonjs', { loose: true }]]
      },
      // Test suites
      test: {
        presets: [['@babel/env', { targets: { node: 'current' } }]]
      }
    }
  }
}
