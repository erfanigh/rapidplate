import { Response } from "express";
import jwt from 'jsonwebtoken';
import { domain } from "../global/index.js";

export const setCookie = (res: Response, body: { [key: string]: any }) => {
    const COOKIE_MAX_AGE_DAYS = 10;
    const expirationDate = new Date();
    const daysInSeconds = COOKIE_MAX_AGE_DAYS * (24 * 60 * 60);
    const daysInMilliSeconds = daysInSeconds * 1000;
    const jwtToken = jwt.sign(body, process.env.COOKIE_SECRET, {
        expiresIn: daysInMilliSeconds
    });
    
    expirationDate.setDate(expirationDate.getDate() + COOKIE_MAX_AGE_DAYS);
    
    res.cookie('token', jwtToken, { 
        expires: expirationDate,
        maxAge: daysInMilliSeconds,
        domain: new URL(domain).hostname,
        path: '/'
    })
}
