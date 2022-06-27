import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { setCredentials } from '../logic/authSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useLoginMutation } from '../logic/services/fetchProducts';
import AlertMessage from './components/AlertMessage/AlertMessage';
import { LoginRequest } from '../utils/interfaces';
import { Routes } from '../utils/Routes';

export default function Login() {
    const dispatch = useDispatch();
    const { push } = useRouter();
    const [formState, setFormState] = useState<LoginRequest>({
        email: '',
        password: '',
    });

    const [login, { isLoading, isError }] = useLoginMutation();
    const [errorMessage, setErrorMessage] = useState('');
    const handleChange = ({
                              target: { name, value },
                          }: ChangeEvent<HTMLInputElement>) =>
        setFormState((prev) => ({ ...prev, [name]: value }));


    const handleErrorRequest = (result: any) => {
        let resMessage: string = result?.error?.data.message;
        if (Array.isArray(resMessage)) {
            resMessage = resMessage[0];
        }
        setErrorMessage(resMessage);
    };

    const loginRequest = async (event) => {
        event.preventDefault();
        try {
            const result = await login(formState);
            if (result.data) {
                dispatch(setCredentials(result.data));
                return await push(Routes.root);
            }
            handleErrorRequest(result);
        } catch (err) {
            setErrorMessage('Something went wrong');
            console.log(err);
        }
    };

    return (
        <div className={'unauthorized-background'}>

            <form className={'unauthorized-form'}>
                <AlertMessage errorMessage={errorMessage} isError={isError} />
                <h3 className={'mb-4 text-3xl font-bold sm:mb-2 sm:text-base'}>Sign-in</h3>
                <label htmlFor='email' className={'flex flex-col mb-2 text-xl font-semibold sm:text-sm'}>
                    Email
                </label>
                <input id='email' className={'p-2 mb-2 text-xl rounded border border-gray-800 sm:text-sm'}
                       placeholder={'Enter your email'}
                       onChange={handleChange}
                       name='email' />

                <label htmlFor='password' className={'flex flex-col mb-2 text-xl font-semibold sm:text-sm'}>
                    Password
                </label>
                <input className={'p-2 mb-10 text-xl rounded border border-gray-800 sm:mb-6  sm:text-sm'} id='password'
                       name='password'
                       onChange={handleChange}
                       placeholder={'Enter the password'} />

                <button
                    className={'p-3 mb-4 w-full text-xl font-bold bg-amber-400 hover:bg-amber-300 rounded sm:p-1 sm:text-base '}
                    onClick={loginRequest}>Log In
                </button>

                <p className={'pl-2 mb-2 text-lg sm:text-sm'}>
                    Don't have an account yet?
                    <Link href={Routes.register}>
                        <a className={'pl-1 text-sky-300'}>Register</a>
                    </Link> now
                </p>

                <p className={'inline-block pl-2 mb-2 text-lg sm:text-sm'}>
                    Your account is not verified. Click
                    <Link href={Routes.confirm}>
                        <a className={'pl-1 text-sky-300'}>here</a>
                    </Link> to continue
                </p>
            </form>
        </div>
    );
}
