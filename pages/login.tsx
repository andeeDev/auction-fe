import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { setCredentials } from '../logic/authSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useLoginMutation } from '../logic/services/services';
import { Routes } from '../utils/Routes';
import { ErrorHelper } from '../utils/ErrorHelper';
import { toast } from 'react-toastify';
import { Messages } from '../utils/Messages';
import { LoginRequest } from '../utils/types/api';

export default function Login() {
    const dispatch = useDispatch();
    const { push } = useRouter();
    const [formState, setFormState] = useState<LoginRequest>({
        email: '',
        password: '',
    });

    const [login, { isLoading }] = useLoginMutation();
    const handleChange = ({
                              target: { name, value },
                          }: ChangeEvent<HTMLInputElement>) =>
        setFormState((prev) => ({ ...prev, [name]: value }));


    const loginRequest = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const result = await login(formState);
            if ('data' in result) {
                dispatch(setCredentials(result.data));
                return await push(Routes.root);
            }
            if ('error' in result) {
                toast(ErrorHelper.getResponseError(result));
            }
        } catch (err) {
            toast(Messages.SomethingWentWrong);
        }
    };

    return (
        <div className={'unauthorized-background'}>

            <form className={'unauthorized-form'}>
                <h3 className={'mb-4 text-3xl font-bold sm:mb-2 sm:text-base'}>Sign-in</h3>
                <label htmlFor='email' className={'mb-2 flex flex-col text-xl font-semibold sm:text-sm'}>
                    Email
                </label>
                <input id='email' className={'mb-2 rounded border border-gray-800 p-2 text-xl sm:text-sm'}
                       placeholder={'Enter your email'}
                       onChange={handleChange}
                       name='email' />

                <label htmlFor='password' className={'mb-2 flex flex-col text-xl font-semibold sm:text-sm'}>
                    Password
                </label>
                <input className={'mb-10 rounded border border-gray-800 p-2 text-xl sm:mb-6  sm:text-sm'} id='password'
                       name='password'
                       onChange={handleChange}
                       placeholder={'Enter the password'} />

                <button
                    className={'mb-4 w-full rounded bg-amber-400 p-3 text-xl font-bold hover:bg-amber-300 sm:p-1 sm:text-base '}
                    disabled={isLoading}
                    onClick={loginRequest}>Log In
                </button>

                <p className={'mb-2 pl-2 text-lg sm:text-sm'}>
                    Don't have an account yet?
                    <Link href={Routes.register}>
                        <a className={'pl-1 text-sky-300'}>Register</a>
                    </Link> now
                </p>

                <p className={'mb-2 inline-block pl-2 text-lg sm:text-sm'}>
                    Your account is not verified. Click
                    <Link href={Routes.confirm}>
                        <a className={'pl-1 text-sky-300'}>here</a>
                    </Link> to continue
                </p>

                <p className={'mb-2 inline-block pl-2 text-lg sm:text-sm'}>
                    Change password
                    <Link href={Routes.reset}>
                        <a className={'pl-1 text-sky-300'}>here</a>
                    </Link>
                </p>
            </form>
        </div>
    );
}
