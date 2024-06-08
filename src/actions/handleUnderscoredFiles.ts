import { T_ProjectTechQuestions } from "../cli.js";
import fs from 'fs';
import fsExtra from 'fs-extra';
import path from 'path';
import { BOILERPLATE_DIR_NAME } from "../global.js";
import { boilerplatesDirPath } from "../index.js";
import { deletePathPartsFromEnd } from "../utils.js";
import { pathToFileURL } from "url";

// TODO write description
const resolveDestPath = (
    dirPath: string,
    tech: T_ProjectTechQuestions, 
    destPath: string,
    currentAlias: string
) => {
    const index = dirPath.indexOf(BOILERPLATE_DIR_NAME);
    let relativePath = dirPath.substring(index + BOILERPLATE_DIR_NAME.length + 1);

    // replace folder name with the alias (e.g.):
    // frontend -> client
    // backend -> api
    relativePath = relativePath.replace(tech.projectType, currentAlias)
    relativePath = relativePath.replace('_global', '')

    let dest = path.join(destPath, relativePath);

    return dest
}

// TODO write comment for this part
export async function handleUnderscoredFiles (
    tech: T_ProjectTechQuestions, 
    destPath: string,
    currentAlias: string
) {
    const findFiles = async (dirPath: string) => {
        if(!fs.existsSync(dirPath))
            throw new Error(`no file/folder exist with this dirPath\n\t${dirPath}`);

        if(path.parse(dirPath).name === 'src')
            return;

        const _destPath = resolveDestPath(dirPath, tech, destPath, currentAlias);

        if(_destPath && path.parse(dirPath).name.startsWith("_")) {
            // filter dynamic files
            const filterFn = (src: string) => {
                return !path.parse(src).name.startsWith('d_');
            }
            fsExtra.copySync(dirPath, _destPath, { filter: filterFn });
        }
        
        if(_destPath && path.parse(dirPath).name.startsWith("d_") && dirPath.endsWith('.js')) {
            const dynamicFile = (await import(pathToFileURL(dirPath).href)).default;
            
            if(typeof dynamicFile !== 'function')
                throw new Error(`invalid dynamic file. function must be default exported. \nPath: ${dirPath}\n`);

            const dynamicFileResult = dynamicFile(tech.projectType, tech.techName);
            
            if(typeof dynamicFileResult['data'] !== 'string' || !dynamicFileResult['fileType']?.match(/\.([0-9a-z]+)(?:[\?#]|$)/i))
                throw new Error('invalid dynamic file. return value must be type of { data: string, fileType: `.${string}` }');
            
            const newFilePath = path.join(
                deletePathPartsFromEnd(_destPath, 1), 
                path.parse(dirPath).name.replace('d_', '') + dynamicFileResult['fileType']
            );
            
            fs.writeFileSync(newFilePath, dynamicFileResult['data']);
        }

        if(!fs.statSync(dirPath).isDirectory())
            return;

        const folders = fs.readdirSync(dirPath)

        folders.forEach((val) => {
            findFiles(path.join(dirPath, val))
        })
    }

    // TODO fix this part
    await findFiles(path.join(boilerplatesDirPath, tech.projectType))
    await findFiles(path.join(boilerplatesDirPath, '_global'))
}