const path = require('path');

const {
    confirm,
    emptyDirectory,
    createAppName,
    exit
    } = require('../utils');
const {createApplication} = require('../createApplication');

exports.command = 'new <destinationName>'

exports.describe = 'create a new MEAN application using the supplied <appName>.'

exports.builder = {}

exports.handler = function (argv) {
  const destinationName = argv.destinationName;

  // Path
  const destinationPath = destinationName || '.';
  
  // App name
  const appName = createAppName(path.resolve(destinationName)) || 'hello-world';

  emptyDirectory(destinationPath, (empty) => {
    if (empty || program.force) {
      createApplication(appName, destinationPath);
    } else {
      confirm('destination is not empty, continue? [y/N] ', (ok) => {
        if (ok) {
          process.stdin.destroy();
          createApplication(appName, destinationPath);
        } else {
          console.error('aborting');
          exit(1);
        }
      });
    }
  });
}