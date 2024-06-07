#!/usr/bin/env node

import fs from 'fs';
import fsExtra from 'fs-extra';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { T_ProjectTechQuestions } from './cli.js';

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

const BOILERPLATE_DIR_NAME = 'boilerplates';
const packageName = 'rapidplate';
const boilerplatesDirPath = path.join(__dirname, '..', BOILERPLATE_DIR_NAME)

process.title = packageName;

const isDirectory = (_path: string) => {
    return !/\.[0-9a-z]+$/i.test(_path);
}

const deletePathPartsFromEnd = (_path: string, deleteCount: number) => {
    let result = _path;
    let index = 0;
    
    while (index < deleteCount) {
        const lastPartIndex = _path.indexOf(path.parse(result).name)
        result = result.substring(0, lastPartIndex-1)
        index++;
    }

    return result;
}

// TODO write comment for this part
function handleUnderscoredFiles (
    tech: T_ProjectTechQuestions, 
    alias: { [key: string]: string },
    projectName: string
) {
    const findFiles = (dirPath: string) => {
        if(!fs.existsSync(dirPath))
            throw new Error(`no file/folder exist with this dirPath\n\t${dirPath}`);

        if(path.parse(dirPath).name === 'src')
            return;
        
        if(path.parse(dirPath).name.startsWith("_")) {
            const index = dirPath.indexOf(BOILERPLATE_DIR_NAME);
            let relativePath = dirPath.substring(index + BOILERPLATE_DIR_NAME.length + 1);
            
            if(!dirPath.includes('_global') && !dirPath.includes(tech.techName))
                return;
            
            // skip if project type does'nt have any global file/folder
            if(relativePath !== '_global' && !relativePath.includes(tech.projectType))
                return;

            // replace folder name with the alias (e.g.):
            // frontend -> client
            // backend -> api
            relativePath = relativePath.replace(tech.projectType, alias[tech.projectType])

            let dest = path.join(
                __dirname, 
                '..', 
                projectName, 
                relativePath
            );

            if(isDirectory(dest)) 
                // delete underscored folder name
                dest = deletePathPartsFromEnd(dest, 1)
            else {
                dest = deletePathPartsFromEnd(dest, 2)
                dest = path.join(dest, path.parse(relativePath).name)
            }

            return fsExtra.copySync(dirPath, dest);
        }
        
        if(!fs.statSync(dirPath).isDirectory())
            return;

        const folders = fs.readdirSync(dirPath)

        folders.forEach((val) => {
            findFiles(path.join(dirPath, val))
        })
    }

    findFiles(boilerplatesDirPath)
}

async function bootstrap() {
    const runCli = (await import('./cli.js')).default;
    const alias = {
        backend: 'api',
        frontend: 'client',
    }
    const { 
        mainQuestions, 
        projectTechQuestions 
    } = await runCli();

    fs.mkdirSync(mainQuestions.projectName, { recursive: true })

    projectTechQuestions.forEach((val) => {
        const src = path.join(boilerplatesDirPath, val.projectType, val.techName);
        const dest = path.join(
            __dirname, 
            '..', 
            mainQuestions.projectName, 
            projectTechQuestions.length > 1 
                ? alias[val.projectType] 
                : ''
        );

        fsExtra.mkdirSync(dest, { recursive: true });

        fsExtra.copy(src, dest, (err) => {
            if(err) throw err;
        })

        handleUnderscoredFiles(val, alias, mainQuestions.projectName);
    })
}

bootstrap();