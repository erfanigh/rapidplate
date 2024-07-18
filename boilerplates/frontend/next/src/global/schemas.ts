import * as Yup from 'yup';

export const userSchema = {
    usr_name: Yup.string().required().max(50),
    usr_password: Yup.string().required(),
}