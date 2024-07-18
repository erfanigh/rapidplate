import fs from 'fs';
import path from 'path';
import fsExtra from 'fs-extra';
import { handleUnderscoredFiles } from './handleUnderscoredFiles.js';
import { boilerplatesDirPath } from '../index.js';
import { T_Cli } from '../cli.js';
import { alias } from '../global.js';

// TODO make this more simple
export const generateBoilerplates = async (args: T_Cli) => {
    const projName = args.mainQuestions.projectName.trim();
    fs.mkdirSync(path.join(process.cwd(), projName), { recursive: true })
    
    for (let index = 0; index < args.projectTechQuestions.length; index++) {
        const val = args.projectTechQuestions[index];
        const isMultipleTech = args.projectTechQuestions.length > 1;
        const currentAlias = isMultipleTech ? alias[val.projectType] : '';
        const src = path.join(boilerplatesDirPath, val.projectType, val.techName ?? '');
        const dest = path.join(
            process.cwd(), 
            projName, 
            currentAlias
        );

        fsExtra.mkdirSync(dest, { recursive: true });
        fsExtra.copySync(src, dest)

        await handleUnderscoredFiles(
            args.mainQuestions.projectName,
            val, 
            path.join(dest, isMultipleTech ? '..' : ''),
            currentAlias
        );
    }
}