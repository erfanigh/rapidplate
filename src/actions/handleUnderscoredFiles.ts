import { T_ProjectTechQuestions } from "../cli.js";
import fs from 'fs';
import fsExtra from 'fs-extra';
import path from 'path';
import { BOILERPLATE_DIR_NAME } from "../global.js";
import { boilerplatesDirPath } from "../index.js";

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
            fsExtra.copySync(dirPath, _destPath);
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