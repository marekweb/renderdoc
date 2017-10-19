const replaceExt = require('replace-ext');
const globby = require('globby');
const path = require('path');

const excludeList = ['index.html', '404.html'];

/**
 * @param {string} filePath 
 */
function makePrettyUrl(filePath) {
  for (let i = 0; i < excludeList.length; i++) {
    if (filePath.endsWith(excludeList[i])) {
      return filePath;
    }
  }

  return replaceExt(filePath, '/index.html');
}

/**
 * @param {string} directoryPath
 * @param {string} destinationPath
 */
module.exports = function scanTree(directoryPath, destinationPath) {
  // destinationPath is used to make absolute paths for each scanned file.
  // So we use directoryPath to prefix the source paths, and destinationPath to prefix destination paths.
  return globby('**/*.html', { cwd: directoryPath }).then(results => {
    return results.map(sourcePath => {
      return {
        sourcePath: path.join(directoryPath, file.sourcePath),
        destinationPath: makePrettyUrl(sourcePath)
      };
    });
  });
};
