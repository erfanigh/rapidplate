import { T_Send } from "@erfanigh/use-form-handler";
import Form, { inputsAcceptedTypes } from "./form";

interface T_Props {
    send: T_Send;
    inputs: { [key: string]: any };
    className?: string;
    isSignup: boolean;
    isLoading: boolean;
}

const AuthLoginForm = ({ send, inputs, isSignup, isLoading }: T_Props) => {
    const title = (_isSignup = isSignup) => _isSignup ? 'ثبت نام' : 'ورود';
    const placeholders = {
        password: 'پسوورد',
        name: 'نام',
        username: 'نام کاربری',
    }

    return (
        <Form 
            isLoading={isLoading}
            send={send}
            id="loginForm"
            className="m-auto md:w-1/2 w-4/5"
            inputs={Object.entries(inputs).map(([key]) => {
                const pureKey = key.replace('usr_', '')
                return {
                    name: key,
                    placeholder: placeholders[pureKey],
                    type: inputsAcceptedTypes.includes(pureKey) ? pureKey : 'text'
                }
            })} 
            title={title(isSignup)}
        />
    );
}

export default AuthLoginForm;