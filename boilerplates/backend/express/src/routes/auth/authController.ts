import { createHttpError } from "../../utils/createHttpError.js";
import { usersModel } from "../../database/models/usersModel.js";
import { T_User } from "../../../shared/types/T_User.js";
import { dbClient } from "../../database/dbClient.js";
import { setCookie } from "../../utils/setCookie.js";
import { Request, Response } from "express";
import { and, eq } from "drizzle-orm";
import md5 from "md5";

export const authController = async (req: Request, res: Response) => {
    const { body } = req;
    const user = (
        await dbClient
        .select()
        .from(usersModel)
        .where(and(
            eq(usersModel.usr_username, body.usr_username),
            eq(usersModel.usr_password, md5(body.usr_password.toString())),
        ))
    ) as T_User[];
    
    if(user.length > 0) {
        setCookie(res, { usr_username: user[0].usr_username });
        return res.json('user logged in successfully');
    }
    
    res.status(404).send(
        createHttpError(404, { 
            title: 'no user found with this information' 
        })
    );
}