#!/usr/bin/env node

import fs from 'fs';
import fsExtra from 'fs-extra';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

const packageName = 'rapidplate';
const boilerplatesDirPath = path.join(__dirname, '..', 'boilerplates')

process.title = packageName;

const copyFiles = (
    projectName: string, 
    techName: string, 
    boilerplateType: string, 
    dirName: string
) => {
    const src = path.join(boilerplatesDirPath, boilerplateType, techName);
    const dest = path.join(__dirname, '..', projectName, dirName);

    fsExtra.mkdirSync(dest, { recursive: true });

    fsExtra.copy(src, dest, (err) => {
        if(err) throw err;
    })
}

async function bootstrap() {
    const runCli = (await import('./cli.js')).default;
    const alias = {
        'backend': 'api',
        'frontend': 'client',
        'fullstack': '',
    }
    const { 
        mainQuestions, 
        projectTechQuestions 
    } = await runCli();

    fs.mkdirSync(mainQuestions.projectName, { recursive: true })

    projectTechQuestions.forEach((val) => {
        copyFiles(
            mainQuestions.projectName, 
            val.techName,
            val.projectType,
            projectTechQuestions.length > 1 
                ? alias[val.projectType] 
                : ''
        )
    })
}

bootstrap();