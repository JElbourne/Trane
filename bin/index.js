#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const yargs = require('yargs');

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

// Get all the args from input using Yargs
const argv = yargs.argv;
const command = argv._[0];

yargs.commandDir('../lib/cmds')
    .demandCommand()
    .help()
    .argv