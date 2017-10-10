#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const figlet = require('figlet');
const inquirer = require('inquirer');
const Preferences = require('preferences');
const _ = require('lodash');
const fs = require('fs');
const yargs = require('yargs');

const newApp = require('../lib/newapp');

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

if (command === "new") {
    newApp.create(argv);
}