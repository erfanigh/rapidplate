import { RequestHandler } from "express";

export type T_Router = {
    baseRoute: string;
    routes: Array<{
        route: string; 
        method: 'get' | 'post' | 'delete' | 'put' | 'head';
        handlers: RequestHandler[]
    }>
}