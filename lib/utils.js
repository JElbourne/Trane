const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const mkdirp = require('mkdirp');
const readline = require('readline')

const MODE_0666 = parseInt('0666', 8);
const MODE_0755 = parseInt('0755', 8);

const _exit = process.exit;

/**
 * echo str > path.
 *
 * @param {String} path
 * @param {String} str
 */

const write = (path, str, mode) => {
  fs.writeFileSync(path, str, { mode: mode || MODE_0666 })
  console.log('   \x1b[36mcreate\x1b[0m : ' + path)
}

const exit = (code) => {
  // flush output for Node.js Windows pipe bug
  // https://github.com/joyent/node/issues/6247 is just one bug example
  // https://github.com/visionmedia/mocha/issues/333 has a good discussion
  function done () {
    if (!(draining--)) _exit(code);
  }

  var draining = 0;
  var streams = [process.stdout, process.stderr];

  exit.exited = true;

  streams.forEach(function (stream) {
    // submit empty write request and wait for completion
    draining += 1;
    stream.write('', done);
  });

  done();
}



module.exports = {
  exit: exit,
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

  /**
   * Check if the given directory `path` is empty.
   *
   * @param {String} path
   * @param {Function} fn
   */

  emptyDirectory: (path, fn) => {
    fs.readdir(path, function (err, files) {
      if (err && err.code !== 'ENOENT') throw err
      fn(!files || !files.length)
    })
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

  /**
   * Prompt for confirmation on STDOUT/STDIN
   *
   * @param {String} msg
   * @param {Function} callback
   */

  confirm: (msg, callback) => {
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    rl.question(msg, function (input) {
      rl.close()
      callback(/^y|yes|ok|true$/i.test(input))
    })
  },

  /**
   * cd -p.
   *
   * @param {String} directoryName
   */

  cd: (directoryName) => {
    try {
      process.chdir(directoryName);
    }
    catch (err) {
      console.log('cd: ' + err);
    }
  },

  /**
   * mkdir -p.
   *
   * @param {String} path
   * @param {Function} callback
   */

  mkdir: (path, callback) => {
    mkdirp(path, MODE_0755, function (err) {
      if (err) throw err
      console.log('   \x1b[36mcreate\x1b[0m : ' + path)
      callback && callback()
    })
  },

  /**
   * Copy file from template directory.
   *
   * @param {String} from
   * @param {to} to
   */

  copyTemplate: (from, to) => {
    from = path.join(__dirname, '..', 'templates', from)
    write(to, fs.readFileSync(from, 'utf-8'))
  },

  /**
   * Create an app name from a directory path, fitting npm naming requirements.
   *
   * @param {String} pathName
   */

  createAppName: (pathName) => {
    return path.basename(pathName)
      .replace(/[^A-Za-z0-9.()!~*'-]+/g, '-')
      .replace(/^[-_.]+|-+$/g, '')
      .toLowerCase()
  }
};