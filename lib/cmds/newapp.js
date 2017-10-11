const { printMsg, printErr, directoryExists, cd } = require('../utils');
const { execSync }  = require('child_process');

exports.command = 'new <appName>'

exports.describe = 'create a new MEAN application using the supplied <appName>.'

exports.builder = {}

exports.handler = function (argv) {
    const appName = argv.appName
    
    // Check if the directory already exists
    if (directoryExists(appName)) {
        // Directory Exists, so we tell the user.
        printErr(`Directory already exists with the name ${appName}!`, 1, 1);
        // Exit the command process
        process.exit();
    } else {
        // Create the MEAN app 

        // First create the Angular App with ng command
        printMsg(`Creating New App with the name ${appName}, please wait...`, 1, 2);
        // run with execSync and output to parent stdio.
        execSync(`ng new ${appName}`, { stdio:[0,1,2] });
        
        // Change directory into the new app directory
        printMsg(`Changing process directory to: /${appName}`, 0, 0);               
        cd(appName)

        // Installing express and body-parser packages
        printMsg(`Installing express and body-parser packages, please wait...`, 1, 1);        
        execSync(`npm install --save express body-parser`, { stdio:[0,1,2] });
        
        // Copy the server.js template file into new directory.
        printMsg(`create server.js (bytes)`, 0, 0);
        
        // Exit the command process
        process.exit();
    }
}