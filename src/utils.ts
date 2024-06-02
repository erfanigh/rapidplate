import fs from 'fs';
import path from 'path';

export const isDirExist = (_path: string) => Boolean(
    fs.existsSync(path.join(process.cwd(), _path))
);