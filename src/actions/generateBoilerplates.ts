import fs from 'fs';
import path from 'path';
import fsExtra from 'fs-extra';
import { handleUnderscoredFiles } from './handleUnderscoredFiles.js';
import { boilerplatesDirPath } from '../index.js';
import { T_Cli } from '../cli.js';
import { alias } from '../global.js';

// TODO make this more simple
export const generateBoilerplates = (args: T_Cli) => {
    fs.mkdirSync(path.join(process.cwd(), args.mainQuestions.projectName), { recursive: true })
    
    args.projectTechQuestions.forEach((val) => {
        const isMultipleTech = args.projectTechQuestions.length > 1;
        const currentAlias = isMultipleTech ? alias[val.projectType] : '';
        const src = path.join(boilerplatesDirPath, val.projectType, val.techName ?? '');
        const dest = path.join(
            process.cwd(), 
            args.mainQuestions.projectName, 
            currentAlias
        );

        fsExtra.mkdirSync(dest, { recursive: true });
        fsExtra.copySync(src, dest)

        handleUnderscoredFiles(
            val, 
            path.join(dest, isMultipleTech ? '..' : ''),
            currentAlias
        );
    })
}