import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Prevent unAuthenticated user from entering specific urls
*/
export function middleware(request: NextRequest) {
    const currentDate = new Date();
    const token = (
        request
        .cookies
        ?.['_parsed']
        ?.get('token')
        ?.value
    )
    
    const { pathname, href } = new URL(request.url);
    const isExcludedRoutes = pathname === '/auth/login';
    const isMainRoute = pathname === '/';
    let isValidToken = false;

    try {
        const decodedToken = jwt.decode(token) as JwtPayload;
        const expire = Number(decodedToken?.exp ?? 0);
        isValidToken = expire * 1000 > currentDate.getTime();
    } catch(err) {
        console.log(err);
    }

    if(isValidToken) {
        if(isExcludedRoutes) return NextResponse.error();
        return NextResponse.next();
    } else {
        if(isMainRoute) return NextResponse.redirect(`${href}auth/login`);
        if(isExcludedRoutes) return NextResponse.next();
        
        return NextResponse.error()
    }
}

export const config = {
    matcher: [
        '/auth/:path*',
        '/',
    ],
}