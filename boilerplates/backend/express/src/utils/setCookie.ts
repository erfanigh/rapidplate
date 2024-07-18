import { domain } from "../global/index.js";
import { Response } from "express";
import jwt from 'jsonwebtoken';

export const setCookie = (res: Response, payload: { [key: string]: any }) => {
    const COOKIE_MAX_AGE_DAYS = 10;
    const expirationDate = new Date();
    const daysInSeconds = COOKIE_MAX_AGE_DAYS * (24 * 60 * 60);
    const jwtToken = 
        payload 
        ? jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: daysInSeconds
        })
        : ''
    
    expirationDate.setDate(expirationDate.getDate() + COOKIE_MAX_AGE_DAYS);

    res.cookie('token', jwtToken, { 
        expires: expirationDate,
        maxAge: daysInSeconds,
        domain: new URL(domain).hostname,
        path: '/',
        httpOnly: process.env.NODE_ENV === 'production'
    })
}
