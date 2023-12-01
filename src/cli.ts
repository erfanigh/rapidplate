import inquirer from "inquirer";

export type T_Cli = {
    projectName: string;
    authorName: string;
}

const runCli = async (): Promise<T_Cli> => {
    const PROJECT_NAME = 'projectName';
    const AUTHOR_NAME = 'authorName';
    
    return await inquirer
        .prompt([
            {
                type: "input",
                name: PROJECT_NAME,
                message: "Project Name:",
            },
            {
                type: "input",
                name: AUTHOR_NAME,
                message: "Author Name:",
            },
        ])
};

export default runCli;