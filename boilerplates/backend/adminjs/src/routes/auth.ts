import { authLoginController, authLoginPage } from "../controllers/authController.js";
import { parseForm } from "../middlewares/parseForm.js";
import { validateReqBody } from "../middlewares/validateReqBody.js";
import { isTokenValid } from "../middlewares/isTokenValid.js";
import { T_Router } from "../types/T_Router.js";
import { adminUserSchema } from "../global/schemas.js";

export const authRouter: T_Router = { 
    baseRoute: '/', 
    routes: [
        {
            route: '/api/auth/login',
            method: 'post',
            handlers: [
                parseForm(),
                isTokenValid({ 
                    reversedAuthRoutes: ['/login'],
                }), 
                validateReqBody(adminUserSchema),
                authLoginController
            ]
        },
        {
            route: '/auth/login',
            method: 'get',
            handlers: [
                isTokenValid({ 
                    reversedAuthRoutes: ['/login'],
                    invalidTokenCallback: (req, res) => {
                        res.redirect('/')
                    }
                }), 
                authLoginPage
            ]
        },
    ]
}