const files       = require('../files');
const { execSync }  = require('child_process');
const chalk = require('chalk');

exports.command = 'new <appName>'

exports.describe = 'create a new MEAN application using the supplied <appName>.'

exports.builder = {}

exports.handler = function (argv) {
    const appName = argv.appName
    
    // Check if the directory already exists
    if (files.directoryExists(appName)) {
        // Directory Exists, so we tell the user.
        console.log(chalk.red(`Directory already exists with the name ${appName}!`));
        // Exit the command process
        process.exit();
    } else {
        console.log(chalk.yellow.bold(`Creating New App with the name ${appName}, please wait...`));
        // Create the MEAN app 

        // First create the Angular App with ng command
        // run with execSync and output to parent stdio.
        const ng = execSync(`ng new ${appName}`, { stdio:[0,1,2] });

        // Exit the command process
        process.exit();
    }
}