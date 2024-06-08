import path from "path";

export const BOILERPLATE_DIR_NAME = 'boilerplates';
export const packageName = 'rapidplate';
export const boilerplatesDirPath = path.join(process.cwd(), BOILERPLATE_DIR_NAME)
export const invalidCharsRegex = /[<>:"/\\|?*\x00-\x1F]/