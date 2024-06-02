import { T_HttpErrorObj } from '../../../shared/types/T_HttpErrorObj.js'
import { getReasonPhrase } from "http-status-codes";

export const createHttpError = (
    statusCode: number, 
    options?: { title?: string, errors?: any }
): T_HttpErrorObj => {
    const { title, errors } = options ?? {};
    const error = {
        title: title ?? getReasonPhrase(statusCode),
        statusCode,
        errors
    }
    return error;
}