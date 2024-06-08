import fs from 'fs';
import path from 'path';
import fsExtra from 'fs-extra';
import { handleUnderscoredFiles } from './handleUnderscoredFiles.js';
import { boilerplatesDirPath } from '../global.js';
import { T_Cli } from '../cli.js';

const alias = {
    backend: 'api',
    frontend: 'client',
}

export const generateBoilerplates = (args: T_Cli) => {
    fs.mkdirSync(args.mainQuestions.projectName, { recursive: true })
    
    args.projectTechQuestions.forEach((val) => {
        const src = path.join(boilerplatesDirPath, val.projectType, val.techName ?? '');
        const dest = path.join(
            __dirname, 
            '..', 
            args.mainQuestions.projectName, 
            args.projectTechQuestions.length > 1 
                ? alias[val.projectType] 
                : ''
        );

        fsExtra.mkdirSync(dest, { recursive: true });
        fsExtra.copySync(src, dest)

        handleUnderscoredFiles(val, alias, args.mainQuestions.projectName);
    })
}