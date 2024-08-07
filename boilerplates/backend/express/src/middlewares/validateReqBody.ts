import { createHttpResponse } from "../utils/createHttpResponse.js";
import { NextFunction, Request, Response } from "express";
import * as Yup from 'yup';

type T_ValidateReqBody = (schema: Yup.ObjectShape) => T_ValidateReqBodyReturn;
type T_ValidateReqBodyReturn = (req: Request, res: Response, next: NextFunction) => void;

export const validateReqBody: T_ValidateReqBody = (schema) => {
    return (req, res, next) => {
        if(!schema) 
            throw new Error('no schema passed in `validateReqBody`');

        Yup
        .object(schema)
        .validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch(({ errors }) => {
            res.status(400).send(createHttpResponse(400, { errors }))
            console.log(errors);
        })
    }
}