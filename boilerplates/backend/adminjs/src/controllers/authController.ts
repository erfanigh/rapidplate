import { createHttpResponse } from "../utils/createHttpResponse.js";
import { Request, Response } from "express";
import { setCookie } from "../utils/setCookie.js";
import { AdminUsers } from "../db/models/AdminUsers.js";
import { admin } from "../app.js";
import md5 from "md5";

export const authLoginPage = async (req: Request, res: Response) => {
    const login = await admin.renderLogin({ action: admin.options.loginPath, errorMessage: "invalidCredentials" });
    res.send(login)
}
export const authLoginController = async (req: Request, res: Response) => {
    const { password, email } = req.body;

    const user = await AdminUsers.findOne({
        where: {
            email,
            password: md5(String(password))
        }
    });

    if(user?.dataValues) {
        setCookie(res, { email: user.dataValues.email });
        return res.json('user logged in successfully');
    }
    
    res.status(404).send(
        createHttpResponse(404, { 
            title: 'هیچ کاربری با این مشخصات یافت نشد' 
        })
    );
}