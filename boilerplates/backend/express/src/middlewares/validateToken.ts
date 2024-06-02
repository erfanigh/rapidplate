import { createHttpResponse } from "../utils/createHttpResponse.js";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

interface T_Options {
    /** check for token non-existence on paths */
    reversedAuthRoutes?: string[]
    /** disable authentication on paths */
    disabledAuthRoutes?: string[]
    invalidTokenCallback?: (req: Request, res: Response, next: NextFunction) => void
}

const isRouteIncluded = (
    routes: string[], 
    includedRoute: string,
    shouldSatisfyAll: boolean = true
) => {
    const method = shouldSatisfyAll ? 'every' : 'some';
    return (
        routes.length !== 0
        ? routes[method]((val) => {
            return includedRoute.includes(val);
        })
        : false
    )
}

export function isTokenValid(options?: T_Options) {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const send403 = () => res.status(403).send(createHttpResponse(403));

        const { 
            reversedAuthRoutes = [], 
            disabledAuthRoutes = [],
            invalidTokenCallback = send403,
        } = options ?? {};
        const { token } = req?.cookies ?? {};
        const isReversedAuthRoute = isRouteIncluded(reversedAuthRoutes, req.url);
        const isDisabledAuthRoute = isRouteIncluded(disabledAuthRoutes, req.url, false);
    
        if(isDisabledAuthRoute)
            return next();

        if(invalidTokenCallback && typeof invalidTokenCallback !== 'function')
            throw new Error('invalidTokenCallback must be typeof function');

        try {
            // run if token is valid
            jwt.verify(token, process.env.COOKIE_SECRET)

            if(isReversedAuthRoute) invalidTokenCallback(req, res, next);
            else next();
        } 
        catch (err) {
            // run if token is **NOT** valid
            console.log('Invalid Token', token);

            if(isReversedAuthRoute) next();
            else invalidTokenCallback(req, res, next);
        }
    }
}