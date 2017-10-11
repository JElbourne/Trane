const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = {
  getCurrentDirectoryBase : () => {
    return path.basename(process.cwd());
  },

  directoryExists : (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },

  printMsg : (message, preBlankLines, postBlankLines) => {
    // Prints a message to the screen in a positive color font
    // Can specify how many blank lines will be places pre and post message
    for (var i = 0; i < preBlankLines; i++) {console.log()}
    console.log(chalk.yellow.bold("> [trane] " + message));
    for (var i = 0; i < postBlankLines; i++) {console.log()}
  },

  printErr : (message, preBlankLines, postBlankLines) => {
    // Prints a error to the screen in a red color font
    // Can specify how many blank lines will be places pre and post message
    for (var i = 0; i < preBlankLines; i++) {console.log()}
    console.log(chalk.red.bold("> [trane] " + message));
    for (var i = 0; i < postBlankLines; i++) {console.log()}
  },

  cd: (directoryName) => {
    try {
      process.chdir(directoryName);
    }
    catch (err) {
      console.log('cd: ' + err);
    }
  }
};