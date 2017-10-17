const replaceExt = require('replace-ext');
const globby = require('globby');
const path = require('path');

const excludeList = ['index.html', '404.html'];

function makePrettyUrl(filePath) {
  for (let i = 0; i < excludeList.length; i++) {
    if (filePath.endsWith(excludeList[i])) {
      return filePath;
    }
  }

  return replaceExt(filePath, '/index.html');
}

module.exports = function scanTree(directoryPath) {
  return globby('**/*.html', { cwd: directoryPath }).then(results => {
    return results.map(sourcePath => {
      return {
        sourcePath,
        destinationPath: makePrettyUrl(sourcePath)
      };
    });
  });
};
