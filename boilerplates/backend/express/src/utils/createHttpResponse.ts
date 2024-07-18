import { T_HttpErrorObj } from '../types/T_HttpErrorObj.js'
import { getReasonPhrase } from "http-status-codes";

export const createHttpResponse = (
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