import { spawn } from 'child_process';
import fs from 'fs-extra';
import { join } from "path";
import { program } from 'commander';

program
    .description('Generate boilerplate project.')
    .option('-w, --watch', 'Watch for file changes')
    .argument('<buildPath>', 'Path that src folder located in')
    .parse(process.argv);

const options = program.opts();
const [buildPath] = program.args;

// build src dir into dist using swc
const addRootPath = (_path = '') => {
    if (_path === '' && !_path) throw 'no path specified on `addRootPath`';
    return join(buildPath, _path);
}

const logError = (condition = false, message = '') => {
    if (condition) {
        console.error(message + '\n');
        process.exit(1)
    }
}

const copyEnvFile = () => {
    fs.readFile(addRootPath('.env'), (err, data) => {
        if (err) return console.error('no env file found at root path');
        fs.writeFile(addRootPath('/dist/.env'), data, () => {
            console.log('env copied successfully!');
        })
    })
}

;(async function() {
    const swcMainFilePath = './node_modules/@swc/cli/bin/swc.js';
    const swcOpts = `${options.watch ? '-w' : ''} --copy-files -C module.type=es6`;
    const dirs = [
        `${addRootPath('src')} -d ${addRootPath('dist')}`,
    ];

    fs.removeSync(addRootPath('./dist'));

    logError(
        !fs.existsSync(addRootPath('src')),
        'No `src` folder exist at root level'
    )
    logError(
        !fs.existsSync(swcMainFilePath),
        'local SWC package not found. please install SWC and run script again. \nnpm i -D @swc/cli @swc/core'
    )

    dirs.forEach(val => {
        const childProcess = spawn('node', [swcMainFilePath, ...val.split(' '), ...swcOpts.split(' ')]);

        childProcess.stdout.on('data', (data) => {
            copyEnvFile();
            console.log(data.toString().replaceAll('\n', ''));
        });

        childProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
    });
})();
