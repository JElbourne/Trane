const files       = require('../lib/files');
const { execSync }  = require('child_process');

module.exports = {
    create: (argv) => {
        const appName = argv._[1]
        
        // Check if the directory already exists
        if (files.directoryExists(appName)) {
            // Directory Exists, so we tell the user.
            console.log(chalk.red(`Directory already exists with the name ${appName}!`));
            // Exit the command process
            process.exit();
        } else {
            console.log(`Creating New App with the name ${appName}.`);
            // Create the MEAN app 
            const dir = files.getCurrentDirectoryBase();       
            const ng = execSync(`ng new ${appName}`);
            //console.log(`child process ${JSON.stringify(ng)}`);

            // Exit the command process
            process.exit();
        }
    }
}