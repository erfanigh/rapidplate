import fs from 'fs';
import { join } from 'path';
import { T_Cli } from './cli.js';
import { getBoilerplates } from './boilerplates.js';
import { exec } from 'child_process';

export const generateBoilerplates = ({ authorName, projectName }: T_Cli) => {
    const addRootPath = (..._path: string[]) => {
        return join(process.cwd(), projectName, ..._path);
    }

    const { b_dirs, b_commands, b_files_arr } = getBoilerplates({ authorName, projectName });

    b_dirs.forEach((dir) => {
        fs.mkdirSync(addRootPath(dir), { recursive: true });
    });

    b_files_arr.forEach(({ file, path }) => {
        fs.writeFileSync(
            addRootPath(path, file.name), 
            file.content.join('\n')
        )
    })

    let i = 0;

    const runCommandsInQueue = () => {
        new Promise((resolve) => {
            if(i >= b_commands.length) return;
            
            let curCommand = b_commands[i];

            exec(`cd ${addRootPath()} && ${curCommand}`, () => {
                i++;
                resolve(runCommandsInQueue());
            })
        })
    }

    runCommandsInQueue();

    console.log('\nProject generated successfuly\nGet started by:\n  1. npm i\n  2. node run build\n  3. node run start');
}