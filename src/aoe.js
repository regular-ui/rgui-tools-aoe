'use strict';

let fs = require('fs');
let exec = require('child_process').exec;
let execSync = require('child_process').execSync;
let chalk = require('chalk');
let aoe = {};
let UI_LIST = require('../list.js');

// Sync

aoe.execOneSync = function(command, options) {
    if(options.debug || options.verbose)
        console.log('$', chalk.blue(command));
    if(options.debug)
        return;

    try {
        console.log(execSync(command).toString().trim());
    } catch (err) {}
}

aoe.execSync = function(command, options) {
    if(options.cddir)
        command = 'cd {repo};' + command;
    UI_LIST.map((item) => {
        if(!fs.existsSync(item.repo))
            return console.error(`error: '${item.repo}' cannot be found`);
        aoe.execOneSync(command.replace(/\{(\w+)\}/g, (m, $1) => item[$1]), options);
    });
}

// Async

aoe.execOne = function(command, options) {
    return new Promise((resolve, reject) => {
        if(options.debug || options.verbose)
            console.log('$', chalk.blue(command));
        if(options.debug)
            return resolve(command);

        exec(command, (err, stdout, stderr) => {
            stdout && console.log(stdout.trim());
            stderr && console.error(stderr.trim());
            if(err)
                return reject(stderr);
            else
                return resolve(stdout);
        });
    });
}

aoe.exec = function(command, options) {
    if(options.cddir)
        command = 'cd {repo};' + command;
    return Promise.all(UI_LIST.map((item) => {
        if(!fs.existsSync(item.repo))
            return console.error(`error: '${item.repo}' cannot be found`);
        aoe.execOne(command.replace(/\{(\w+)\}/g, (m, $1) => item[$1]), options);
    }));
}

module.exports = aoe;
