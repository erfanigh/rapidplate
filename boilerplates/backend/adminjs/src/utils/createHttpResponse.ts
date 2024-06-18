import { getReasonPhrase } from "http-status-codes";

export type T_HttpResponseObj = {
    title: string;
    statusCode: number;
    errors?: any;
}

export const createHttpResponse = (
    statusCode: number, 
    options?: { title?: string, errors?: any }
): T_HttpResponseObj => {
    const { title, errors } = options ?? {};
    const error = {
        title: title ?? getReasonPhrase(statusCode),
        statusCode,
        errors
    }
    return error;
}