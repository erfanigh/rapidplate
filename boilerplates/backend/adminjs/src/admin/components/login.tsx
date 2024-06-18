import useFormHandler from "@erfangharib/use-form-handler";
import Form from "./form";
import { adminUserSchema } from '../../global/schemas';

const AuthLoginForm = () => {
    const inputs = [
        {
            name: 'email',
            type: 'email',
            className: 'input',
            placeholder: 'ایمیل'
        },
        {
            name: 'password',
            type: 'password',
            placeholder: 'پسوورد',
            className: 'input'
        },
    ]

    const { send } = useFormHandler({
        endPoint: `/api/auth/login`,
        validationSchema: adminUserSchema,
        axiosConfigs: {
            withCredentials: true,
        },
        onSuccess() {
            setTimeout(() => {
                location.replace('/');
            }, 1000);
        },
    });

    return (
        <Form
            send={send}
            id="loginForm"
            className={`m-auto md:w-[30%] w-4/5 h-screen f-center`}
            inputs={inputs}
            title={"ورود به پنل ادمین"}
        />
    );
};

export default AuthLoginForm;