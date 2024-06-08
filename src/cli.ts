import inquirer from "inquirer";
import { isDirExist } from "./utils.js";
import { invalidCharsRegex } from "./global.js";

export type T_ProjectTechQuestions = {
    techName?: string
    projectType: string;
}

export type T_Cli = {
    mainQuestions: {
        projectName: string;
        projectType: string;
    }
    projectTechQuestions: T_ProjectTechQuestions[]
}

const enum promptNames {
    PROJECT_NAME = 'projectName',
    AUTHOR_NAME  = 'authorName',
    PROJECT_TYPE = 'projectType',
    CONFIG_TERMINAL_KEEPER = 'configTerminalKeeper',
}

const enum projectTypes {
    FULLSTACK = 'fullstack',
    BACKEND = 'backend',
    FRONTEND = 'frontend',
    NODEJS_APP = 'nodejs-app',
    TELEGRAM_BOT = 'telegram-bot',
}

const backendQuestion = {
    type: "list",
    name: 'techName',
    message: "Backend:",
    loop: false,
    choices: [
        { name: ' Express.js', value: 'express' },
    ]
}
const frontendQuestion = {
    type: "list",
    name: 'techName',
    message: "Frontend:",
    loop: false,
    choices: [
        { name: ' Next', value: 'next' },
        { name: ' React', value: 'react' },
        { name: ' Vue', value: 'vue' },
        // { name: 'Nuxt', value: 'nuxt' },
    ]
}

const runCli = async (): Promise<T_Cli> => {
    const mainQuestions = await inquirer.prompt([
        {
            type: "input",
            name: promptNames.PROJECT_NAME,
            message: "Project Name:",
            validate(input) {
                const dirExist = isDirExist(input);
                
                if(invalidCharsRegex.test(input)) 
                    return `\`${input}\` project name must not include ASCII control characters!`;
                
                if(dirExist) 
                    return `\`${input}\` directory already exist!`;
                
                return true;
            }
        },
        {
            type: "list",
            name: promptNames.PROJECT_TYPE,
            message: "Project Type:",
            loop: false,
            choices: [
                { name: ' Full Stack (e.g. express & next)', value: projectTypes.FULLSTACK },
                { name: ' Backend Only', value: projectTypes.BACKEND },
                { name: ' Frontend Only', value: projectTypes.FRONTEND },
                { name: ' Nodejs App', value: projectTypes.NODEJS_APP },
                { name: ' Telegram Bot (with telegraf.js)', value: projectTypes.TELEGRAM_BOT },
            ]
        },
    ])

    const _projectTechQuestions: { [key in projectTypes]: () => Promise<T_ProjectTechQuestions[]> } = {
        fullstack: async () => {
            return [
                (await _projectTechQuestions.backend())[0],
                (await _projectTechQuestions.frontend())[0]
            ];
        },
        backend: async () => [{ 
            ...await inquirer.prompt([ backendQuestion ]),
            projectType: projectTypes.BACKEND
        }],
        frontend: async () => [{
            ...await inquirer.prompt([ frontendQuestion ]),
            projectType: projectTypes.FRONTEND
        }],
        'nodejs-app': async () => [{ projectType:  projectTypes.NODEJS_APP }],
        'telegram-bot': async () => [{ projectType:  projectTypes.TELEGRAM_BOT }],
    }

    const projectTechQuestions = await _projectTechQuestions[mainQuestions.projectType]()

    return {
        mainQuestions,
        projectTechQuestions
    }
};

export default runCli;