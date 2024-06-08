import fs from 'fs';
import path from 'path';

export const isDirExist = (_path: string) => Boolean(
    fs.existsSync(path.join(process.cwd(), _path))
);

export const deletePathPartsFromEnd = (_path: string, deleteCount: number) => {
    let result = _path;
    let index = 0;
    
    while (index < deleteCount) {
        const lastPartIndex = _path.indexOf(path.parse(result).name)
        result = result.substring(0, lastPartIndex-1)
        index++;
    }

    return result;
}