import * as Yup from 'yup';

export const adminUserSchema = {
    email: Yup.string().required().max(50),
    password: Yup.string().required(),
}