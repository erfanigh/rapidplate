import { authLoginController } from './authController.js';
import { validateReqBody } from '../../middlewares/validateReqBody.js';
import { parseForm } from '../../middlewares/parseForm.js';
import { setCookie } from '../../utils/setCookie.js';
import { T_Router } from '../../types/T_Router.js';
import { userSchema } from '../../database/schemas.js';

export const authRouter: T_Router = { 
    baseRoute: '/auth', 
    routes: [
        {
            route: '/login',
            method: 'post',
            handlers: [
                parseForm(),
                validateReqBody(userSchema),
                authLoginController
            ]
        },
        {
            route: '/delete-cookie',
            method: 'delete',
            handlers: [
                parseForm(),
                (req, res) => {
                    setCookie(res, null)
                    res.send('cookie cleared')
                }
            ]
        },
    ]
}