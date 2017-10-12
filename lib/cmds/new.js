const path = require('path');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const {
    confirm,
    emptyDirectory,
    createAppName,
    removeDirectory,
    printMsg,
    exit
    } = require('../utils');
const {createApplication} = require('../createApplication');

exports.command = 'new <name>'

exports.describe = 'create a new MEAN application using the supplied <name>.'

exports.builder = {}

exports.handler = function (argv) {
  const destinationName = argv.name;

  // Path
  const destinationPath = destinationName || '.';
  
  // App name
  const appName = createAppName(path.resolve(destinationName)) || 'hello-world';

  // Initial setup of the terminal window
  // Clear screen
  clear();
  console.log(
      // Change to yellow
      chalk.yellow(
          // Create ASCII logo for Trane
          figlet.textSync('Trane', { horizontalLayout: 'full' })
      )
  );

  emptyDirectory(destinationPath, (empty) => {
    if (empty) {
      createApplication(appName, destinationPath);
    } else {
      replaceExistingDirectory(appName, destinationPath);
    }
  });

  const replaceExistingDirectory = (appName, destinationPath) => {
    confirm(`The destination, ${destinationPath}, is not empty, continue? [y/N] `, (ok) => {
      if (ok) {
        process.stdin.destroy();
        printMsg(`Removing the existing directory ${destinationPath}, please wait...`, 1, 0);                  
        removeDirectory(destinationPath);
        printMsg(`complete.`, 0, 0);                          
        createApplication(appName, destinationPath);
      } else {
        console.error('aborting');
        exit(1);
      }
    });
  }
}