// @ts-check

import * as path from "path";
import fs from 'fs-extra'

const addRootPath = (_path = '') => {
    if (_path === '' && !_path) throw 'no path specified on `addRootPath`';
    return path.join(process.cwd(), _path);
}
const logError = (condition = false, message = '') => {
    if(condition) {
        console.error(message + '\n');
        process.exit(1)
    }
}

;(async () => {
    const isWatch = process.argv[2] === '--watch';
    const swcMainFilePath = addRootPath('node_modules/@swc/cli/bin/swc.js');
    const swcOpts = `src -d dist ${isWatch ? '-w' : ''} --copy-files -C module.type=es6`.split(' ');

    fs.removeSync(addRootPath('./dist'));

    logError(
        !fs.existsSync(addRootPath('src')), 
        'No `src` folder exist at root level'
    )
    logError(
        !fs.existsSync(swcMainFilePath), 
        'local SWC package not found. please install SWC and run script again. \nnpm i -D @swc/cli @swc/core'
    )
    
    // add args to process and run swc cli manualy 
    swcOpts.forEach((opt) => {
        process.argv.push(opt)
    });

    await import('../node_modules/@swc/cli/bin/swc.js');
})()