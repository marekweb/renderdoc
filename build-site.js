const fs = require('fs-extra');
const path = require('path');
const scanTree = require('./scan-tree');
const render = require('./render');
const { debounce, defaults } = require('lodash');

function buildSitePublicApi(options = {}) {
  options = Object.assign(
    {},
    {
      rootDir: process.cwd(),
      sourceDir: 'pages',
      buildDir: 'build',
      defaultLayout: 'Page',
      staticDir: 'public',
      componentsDir: 'components'
    },
    options
  );

  if (options.watch) {
    const chokidar = require('chokidar');
    const pathsToWatch = [
      options.sourceDir,
      options.componentsDir,
      options.staticDir
    ].map(p => path.join(options.rootDir, p));
    const handleWatchChange = debounce(function() {
      console.log('change detected, triggering build');
      triggerBuildFromWatch(options);
    }, 100);
    chokidar.watch(pathsToWatch).on('all', handleWatchChange);

    if (options.serve) {
      const express = require('express');
      const app = express();
      app.use(express.static(path.join(options.rootDir, options.buildDir)));
      const port = options.port || '8080';
      console.log('We are going to listen on ' + port);
      app.listen(port);
    }

    return Promise.resolve();
  }

  return doOneSiteBuild(options);
}

function doOneSiteBuild(options) {
  const { buildDir, staticDir, sourceDir, defaultLayout } = options;
  console.log('Building source:', sourceDir);
  return fs
    .emptyDir(buildDir)
    .then(async function() {
      const exists = await fs.exists(staticDir);
      if (exists) {
        return fs.copy(staticDir, buildDir, { recursive: true });
      }
    })
    .then(async function() {
      console.log('=>', process.cwd(), sourceDir);
      let sourceDirStat;
      try {
        sourceDirStat = await fs.stat(sourceDir);
      } catch (err) {
        if (err.code === 'ENOENT') {
          throw new Error(`Does not exist: ${sourceDir}`);
        }
        throw err;
      }
      if (sourceDirStat.isDirectory()) {
        // It's a directory so we scan it recursively
        scanTree(sourceDir, buildDir);
      } else {
        // It's a single file
        return [
          {
            sourcePath: sourceDir,
            destinationPath: path.join(buildDir, sourceDir)
          }
        ];
      }
    })
    .then(files => {
      console.log('files', files);
      const filesPromises = files.map(async file => {
        const output = await render(
          file.sourcePath,
          'components',
          defaultLayout
        );
        // console.log(`${file.sourcePath} -> ${file.destinationPath}`);
        // const destinationPath = path.join(buildDir, file.destinationPath);
        const destinationPath = file.destinationPath;
        await fs.ensureDir(path.dirname(file.destinationPath));
        await fs.writeFile(destinationPath, output);
        return 'wrote ' + file.sourcePath;
      });

      return Promise.all(filesPromises);
    });
}

let buildInProgress;
let newBuildTriggered;
function triggerBuildFromWatch(options) {
  console.log('triggerBuildFromWatch');
  if (buildInProgress) {
    newBuildTriggered = true;
    return buildInProgress;
  } else {
    buildInProgress = doOneSiteBuild(options)
      .then(() => {
        console.log('build finished');
        if (newBuildTriggered) {
          newBuildTriggered = false;
          buildInProgress = null;
          return triggerBuildFromWatch(options);
        }
      })
      .catch(err => {
        console.log('Error in triggerBuildFromWatch');
        console.error(err);
      });
  }

  return buildInProgress;
}

module.exports = buildSitePublicApi;
