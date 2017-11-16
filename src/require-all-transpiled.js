const requireAll = require('require-all');
const babelRegister = require('babel-register');

module.exports = function transpiledRequireAll(directoryPath) {
  babelRegister({
    presets: [
      // require.resolve('babel-preset-env'), // `env` adds lots of unnecessary things like transpiling await/async
      require.resolve('babel-preset-import-export'),
      require.resolve('babel-preset-react')
    ]
  });

  const modules = requireAll({
    dirname: directoryPath,
    filter: /(.*)\.jsx?$/,
    resolve(module) {
      if (module.__esModule && module.default) {
        return module.default;
      }
      return module;
    }
  });

  babelRegister({
    extension: []
  });

  return modules;
};
