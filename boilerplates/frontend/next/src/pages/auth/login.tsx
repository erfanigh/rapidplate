import { userSchema } from '../../../../shared/schemas';
import MainLayout from '../../components/mainLayout';
import AuthLoginForm from '../../components/forms/authLoginForm';
import { baseurl } from '../../global/baseurl';
import { apiEndpoints } from '@/global/global';
import { useState } from 'react';
import { useFormHandler } from '@erfangharib/use-form-handler';

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { send } = useFormHandler({
        endPoint: `${baseurl}${apiEndpoints.auth.login}`,
        validationSchema: userSchema,
        axiosConfigs: {
            withCredentials: true,
        },
        onSubmit() {
            setIsLoading(true)
        },
        onFailure() {
            setIsLoading(false)
        },
        onValidationError() {
            setIsLoading(false)
        },
        onSuccess() {
            setTimeout(() => {
                location.replace('/');
            }, 1000);
        },
    });

    return (
        <MainLayout title='ورود' description='ورود' robots='noindex,nofollow'>
            <AuthLoginForm 
                isSignup={false} 
                send={send} 
                isLoading={isLoading}
                inputs={userSchema} 
            />
        </MainLayout>
    );
}

export default Login;
