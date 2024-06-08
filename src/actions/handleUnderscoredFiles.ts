import { T_ProjectTechQuestions } from "../cli.js";
import fs from 'fs';
import fsExtra from 'fs-extra';
import path from 'path';
import { deletePathPartsFromEnd, isDirectory } from "../utils.js";
import { BOILERPLATE_DIR_NAME, boilerplatesDirPath } from "../global.js";

// TODO write comment for this part
export function handleUnderscoredFiles (
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
            
            if(tech.techName && !dirPath.includes('_global') && !dirPath.includes(tech.techName))
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

        if(!isDirectory(dirPath))
            return;

        const folders = fs.readdirSync(dirPath)

        folders.forEach((val) => {
            findFiles(path.join(dirPath, val))
        })
    }

    findFiles(boilerplatesDirPath)
}