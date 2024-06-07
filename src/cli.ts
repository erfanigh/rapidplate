import inquirer from "inquirer";
import { isDirExist } from "./utils.js";

export type T_ProjectTechQuestions = {
    techName: string
    projectType: string;
}

export type T_Cli = {
    mainQuestions: {
        projectName: string;
        authorName: string;
        configTerminalKeeper: boolean;
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

const invalidCharsRegex = /[<>:"/\\|?*\x00-\x1F]/

const backendQuestion = {
    type: "list",
    name: 'techName',
    message: "Backend:",
    loop: false,
    choices: [
        { name: 'Express.js', value: 'express' },
    ]
}
const frontendQuestion = {
    type: "list",
    name: 'techName',
    message: "Frontend:",
    loop: false,
    choices: [
        { name: 'Next', value: 'next' },
        { name: 'React', value: 'react' },
        { name: 'Vue', value: 'vue' },
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
            type: "input",
            name: promptNames.AUTHOR_NAME,
            message: "Author Name (e.g. github user name):",
        },
        {
            type: "confirm",
            name: promptNames.CONFIG_TERMINAL_KEEPER,
            message: "Add Terminal Keeper Config:",
        },
        {
            type: "list",
            name: promptNames.PROJECT_TYPE,
            message: "Project Type:",
            loop: false,
            choices: [
                { name: 'Full Stack (e.g. express & next)', value: 'fullstack' },
                { name: 'Backend Only', value: 'backend', },
                { name: 'Frontend Only', value: 'frontend', },
                { name: 'Nodejs App', value: 'nodejs-app', },
            ]
        },
    ])

    const _projectTechQuestions = {
        fullstack: async () => {
            return [
                (await _projectTechQuestions.backend())[0],
                (await _projectTechQuestions.frontend())[0]
            ];
        },
        backend: async (): Promise<T_ProjectTechQuestions[]> => [{ 
            ...await inquirer.prompt([ backendQuestion ]),
            projectType: 'backend'
        }],
        frontend: async (): Promise<T_ProjectTechQuestions[]> => [{
            ...await inquirer.prompt([ frontendQuestion ]),
            projectType: 'frontend'
        }],
    }

    const projectTechQuestions = await _projectTechQuestions[mainQuestions.projectType]()

    return {
        mainQuestions,
        projectTechQuestions
    }
};

export default runCli;