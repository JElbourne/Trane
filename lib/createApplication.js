const {
    printMsg,
    copyTemplate,
    mkdir,
    cd,
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
    const serverPath = path + '/server';

    // First create the Angular App with ng command
    printMsg(`Creating New App with the name ${appName}, please wait...`, 1, 0);
    // run with execSync and output to parent stdio.
    execSync(`ng new ${appName}`, { stdio:[0,1,2] });
    
    // Installing express and body-parser packages
    printMsg(`Installing express and body-parser packages, please wait...`, 1, 0);        
    execSync(`npm install --save express body-parser --prefix ${path}`, { stdio:[0,1,2] });
    
    // Copy the server.js template file into new directory.
    printMsg(`creating base server files`, 0, 0);
    mkdir(serverPath);
    copyTemplate('js/server.js', serverPath + '/server.js');    
    mkdir(serverPath + '/routes');
    copyTemplate('js/routes/api.js', serverPath + '/routes/api.js');
    
    printMsg(`building angular app into dist folder`, 0, 0);
    cd(path);
    execSync(`ng build`, { stdio:[0,1,2] });

    // Exit the command process
    exit(0);
}