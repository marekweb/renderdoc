const globby = require('globby');
const path = require('path');

require('babel-register')({
  presets: [
    // require.resolve('babel-preset-env'), // `env` adds lots of unnecessary things like transpiling await/async
    require.resolve('babel-preset-import-export'),
    require.resolve('babel-preset-react')
  ]
});

function loadEntireDirectory(directoryPath) {
  const globPath = path.join(directoryPath, '/*.js');

  // return Promise.resolve();
  return globby(globPath).then(modulePaths => {
    const result = {};

    for (let i = 0; i < modulePaths.length; i++) {
      const modulePath = modulePaths[i];

      // We can rely on '.js' here because we use '*.js' in the glob.
      // But in the future, maybe this should accept other extensions (I'm thinking of jsx).
      const name = path.basename(modulePath, '.js');
      const resolvedModulePath = path.resolve(modulePath);
      delete require.cache[resolvedModulePath];
      let loadedModule = require(resolvedModulePath);
      if (loadedModule.__esModule) {
        loadedModule = loadedModule.default;
      }
      result[name] = loadedModule;
    }

    return result;
  });
}

module.exports = loadEntireDirectory;
