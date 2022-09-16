import Link from 'next/link';
import { Routes } from '../utils/Routes';
import { useRegisterMutation } from '../logic/services/services';
import { ChangeEvent, FormEvent, useState } from 'react';
import { setCredentials } from '../logic/authSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { ErrorHelper } from '../utils/ErrorHelper';
import { Messages } from '../utils/Messages';
import { LoginRequest } from '../utils/types/api';

export default function Register() {
    const dispatch = useDispatch();
    const { push } = useRouter();
    const [register] = useRegisterMutation();
    /*const [errorMessage, setErrorMessage] = useState('');*/

    const [formState, setFormState] = useState<LoginRequest>({
        email: '',
        password: '',
    });

    const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) =>
        setFormState(prev => ({ ...prev, [name]: value }));

    const handleRegister = async (event: FormEvent<HTMLElement>) => {
        event.preventDefault();
        try {
            const result = await register(formState);
            if ('data' in result) {
                dispatch(setCredentials(result.data));
                return await push(Routes.confirm);
            }
            if ('error' in result) {
                toast(ErrorHelper.getResponseError(result));
            }
        } catch (err: unknown) {
            toast(Messages.SomethingWentWrong);
        }
    };

    return (
        <div className={'unauthorized-background'}>
            <form className={'unauthorized-form'}>
                <h3 className={'mb-4 text-3xl font-bold sm:mb-2 sm:text-base'}>Sign-up</h3>
                <label htmlFor='email' className={'mb-2 flex flex-col text-xl font-semibold sm:text-sm'}>
                    Email
                </label>
                <input
                    onChange={handleChange}
                    id='email'
                    className={'mb-2 rounded border border-gray-800 p-2 text-xl sm:text-sm'}
                    placeholder={'Enter your email'}
                    name='email'
                />

                <label htmlFor='password' className={'mb-2 flex flex-col text-xl font-semibold sm:text-sm'}>
                    Password
                </label>
                <input
                    onChange={handleChange}
                    className={'mb-10 rounded border border-gray-800 p-2 text-xl sm:mb-6 sm:text-sm'}
                    id='password'
                    name='password'
                    placeholder={'Enter the password'}
                />

                <button onClick={handleRegister} className='button' type={'submit'}>
                    Register
                </button>

                <p className={'mb-2 pl-2 text-lg sm:text-sm'}>
                    Already have an account.
                    <Link href={Routes.login}>
                        <a className={'pl-1 text-sky-300'}>Click</a>
                    </Link>
                    to continue
                </p>

                <p className={'mb-2 inline-block pl-2 text-lg sm:text-sm'}>
                    Your account is not verified. Click
                    <Link href={Routes.confirm}>
                        <a className={'pl-1 text-sky-300'}>here</a>
                    </Link>
                    to continue
                </p>
            </form>
        </div>
    );
}
