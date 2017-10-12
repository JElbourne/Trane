const {
    printMsg,
    copyTemplate,
    exit
    } = require('./utils');

const { execSync }  = require('child_process');

/**
 * Create application at the given directory `path`.
 *
 * @param {String} path
 */

exports.createApplication = (appName, path) => {
    // Create the MEAN app

    // First create the Angular App with ng command
    printMsg(`Creating New App with the name ${appName}, please wait...`, 1, 0);
    // run with execSync and output to parent stdio.
    execSync(`ng new ${appName}`, { stdio:[0,1,2] });
    
    // Change directory into the new app directory
    // printMsg(`Changing process directory to: /${appName}`, 0, 0);               
    // cd(appName)

    // Installing express and body-parser packages
    printMsg(`Installing express and body-parser packages, please wait...`, 1, 0);        
    execSync(`npm install --save express body-parser --prefix ${path}`, { stdio:[0,1,2] });
    
    // Copy the server.js template file into new directory.
    printMsg(`create server.js (bytes)`, 0, 0);
    copyTemplate('js/server.js', path + '/server.js')
    
    // mkdir(path + '/routes', function () {
    //     copyTemplate('js/routes/index.js', path + '/routes/index.js')
    //     copyTemplate('js/routes/users.js', path + '/routes/users.js')
    //     complete()
    //   })
    // Exit the command process
    exit(0);
}