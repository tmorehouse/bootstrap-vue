module.exports = api => {
  const isDocs = api.env('docs')

  let presets = []
  if (!isDocs) {
    presets.push(['@babel/env', { useBuiltIns: 'entry', corejs: { version: 2 } }])
  }

  return {
    presets,
    env: {
      es: {
        plugins: [['@babel/plugin-transform-modules-commonjs', { loose: true }]]
      },
      esm: {
        presets: [['@babel/env', { modules: false }]]
      },
      test: {
        presets: [['@babel/env', { targets: { node: 'current' } }]]
      }
    }
  }
}
