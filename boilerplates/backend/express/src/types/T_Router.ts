import { Request, Response, NextFunction } from 'express'

export type T_RequestHandler = (req: Request, res: Response, next: NextFunction) => void;
export type T_ErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => void;

export type T_Router = {
    baseRoute: string;
    routes: Array<{
        route: string; 
        method: 'get' | 'post' | 'delete' | 'put' | 'head';
        handlers: T_RequestHandler[]
    }>
}