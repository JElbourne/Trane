#!/usr/bin/env node

const yargs = require('yargs');

yargs.commandDir('../lib/cmds')
    .demandCommand(1, 'You need at least one command before moving on')
    .recommendCommands()
    .help()
    .argv