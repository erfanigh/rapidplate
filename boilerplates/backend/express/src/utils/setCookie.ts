import { T_User } from "../../../shared/types/T_User.js";
import { domain } from "../global/global.js";
import { Response } from "express";
import jwt from 'jsonwebtoken';

export const setCookie = (res: Response, body: { usr_username: T_User['usr_username'] }) => {
    const COOKIE_MAX_AGE_DAYS = 10;
    const expirationDate = new Date();
    const daysInSeconds = COOKIE_MAX_AGE_DAYS * (24 * 60 * 60);
    const daysInMilliSeconds = daysInSeconds * 1000;
    const jwtToken = 
        body 
        ? jwt.sign(body, process.env.SECRET_KEY, {
            expiresIn: daysInMilliSeconds
        })
        : ''
    
    expirationDate.setDate(expirationDate.getDate() + COOKIE_MAX_AGE_DAYS);

    res.cookie('token', jwtToken, { 
        expires: expirationDate,
        maxAge: daysInMilliSeconds,
        domain: new URL(domain).hostname,
        path: '/',
        httpOnly: process.env.NODE_ENV === 'development'
    })
}
