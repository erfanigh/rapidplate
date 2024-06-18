import { NextFunction, Request, Response } from 'express';
import formidable from 'formidable';
import PersistentFile from 'formidable/PersistentFile.js';
import { getReasonPhrase } from 'http-status-codes';
import { uploadsDirPath } from '../global/index.js';

type T_ExpectedMimeTypes = (
    `image/${string}` |
    `video/${string}` |
    `application/${string}`
)
export interface T_ParseFormArgs {
    fileName?: string;
    maxFileSize: number;
    uploadDir: string;
    expectedMimeTypes?: T_ExpectedMimeTypes[];
}

export function parseForm(args?: T_ParseFormArgs) {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const {
            fileName = '',
            maxFileSize = 30 * 1000 * 1000,
            expectedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'],
            uploadDir = uploadsDirPath
        } = args ?? {};

        const form = formidable({
            uploadDir,
            maxFileSize: maxFileSize,
            keepExtensions: true,
            multiples: true,
            filename: fileName
                ? (name: string, ext: string): string => {
                    if (fileName === null) return name + ext;
                    else if (fileName.match(/\w+\.\w+/)) return fileName;
                    else throw new Error(`fileName format is not expected ${fileName}`);
                }
                : undefined,
            filter: ({ mimetype }): boolean => {
                console.log(mimetype);
                
                if (expectedMimeTypes.some((type) => type === mimetype)) {
                    return true;
                } else {
                    res.status(415).send(
                        expectedMimeTypes.length !== 0
                            ? `Only ${expectedMimeTypes.map((type) => type.match(/\w+$/)?.[0])} formats are allowed!`
                            : 'File upload are not allowed!'
                    );
                    return false;
                }
            },
        });
        new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
                if(res.headersSent) return;

                if (err && err?.httpCode) {
                    console.log(err, err?.httpCode);
                    
                    return res.status(err?.httpCode).send({
                        statusCode: err?.httpCode,
                        error: getReasonPhrase(err?.httpCode),
                    });
                }
    
                req.body = {
                    ...createFilesLinks(files),
                    ...convertDataTypes(fields),
                }
    
                resolve(next());
            });
        });
    }
}

const createFilesLinks = (files: Object): Object => {
    // convert all files name to internal link
    // path include directory name in uploads dir
    // (e.g.) convert "file.jpg" -> "/api/uploads/portfolios/file.jpg"
    let filesLinks = {};
    Object.entries(files).forEach(
        ([property, value]: [string, PersistentFile]) => {
            filesLinks[property] = value?.[0]?.newFilename
        }
    );
    return filesLinks;
};
const convertDataTypes = (object: { [key: string]: any }) => {
    Object.entries(object).forEach(([name, v]: [string, string]) => {
        /**
         * all data in frontend convert to string
         * and we have some non-string values (e.g boolean)
         * this code recognize that the string include ("true" | "false" | "123") or not
         * and convert them to the target data type
         */

        v = Array.isArray(v) ? v?.[0] : v;
        // "123": true , "f123": false
        const IS_NUMBER = /^[0-9]+$/.test(v);
        // "false": true , "something": false
        const IS_BOOL = /^(true|false)$/i.test(v);

        if (IS_BOOL) object[name] = v.toLowerCase() === 'true';
        else if (IS_NUMBER) object[name] = parseInt(v);
        else if (v === 'null') object[name] = null;
        else object[name] = v;
    });

    return object;
};
