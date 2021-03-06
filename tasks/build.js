#!/usr/bin/env node

var fs, spawn;

fs = require('fs-extra');
spawn = require('child_process').spawn;

function build(app, next) {
    var args, child, volume;

    volume = appRoot + '/volumes/' + app.id;
    fs.mkdirsSync(volume);

    args = [
        '-b', volume,
        '-f', app.get('flavor'),
        '-s', app.get('source'),
        '-v', app.get('version')
    ];
    child = spawn(appRoot + '/bin/build', args);

    child.on('close', function(code) {
        next();
    });
}

module.exports = exports = build;
