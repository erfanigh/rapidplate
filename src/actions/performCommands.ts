import { exec } from 'child_process';

const commands = [
    'git init'
]

export const performCommands = async (projectName: string) => {
    console.log('\nPerformed Commands:');

    for (let index = 0; index < commands.length; index++) {
        const cmd = commands[index];
        const baseCmd = `cd ${projectName}`;

        await new Promise((resolve) => {
            exec(`${baseCmd} && ${cmd}`, (error, stdout, stderr) => {
                if(error || stderr) 
                    return console.error(error || stderr);
                
                console.log('-', cmd);
                resolve(null);
            })
        })
    }
}