import Link from 'next/link';
import { Routes } from '../utils/Routes';
import { useRegisterMutation } from '../logic/services/fetchProducts';
import { ChangeEvent, useState } from 'react';
import { LoginRequest } from '../utils/interfaces';
import { setCredentials } from '../logic/authSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

export default function Register() {
    const dispatch = useDispatch();
    const { push } = useRouter();
    const [register, { isLoading, isError }] = useRegisterMutation();

    const [formState, setFormState] = useState<LoginRequest>({
        email: '',
        password: '',
    });

    const handleChange = ({
                              target: { name, value },
                          }: ChangeEvent<HTMLInputElement>) =>
        setFormState((prev) => ({ ...prev, [name]: value }));

    const handleRegister = async () => {

        event.preventDefault();
        try {
            const result = await register(formState);
            console.log('result', result);
            if (result.data) {
                dispatch(setCredentials(result.data));
                return await push(Routes.confirm);
            }
            // handleErrorRequest(result);
        } catch (err) {
            // setErrorMessage('Something went wrong');
            console.log(err);
        }
    };

    return (
        <div className={'unauthorized-background'}>
            <form
                className={'unauthorized-form'}
            >
                <h3 className={'mb-4 text-3xl font-bold sm:mb-2 sm:text-base'}>Sign-up</h3>
                <label htmlFor='email' className={'flex flex-col mb-2 text-xl font-semibold sm:text-sm'}>
                    Email
                </label>
                <input onChange={handleChange} id='email'
                       className={'p-2 mb-2 text-xl rounded border border-gray-800 sm:text-sm'}
                       placeholder={'Enter your email'}
                       name='email' />

                <label htmlFor='password' className={'flex flex-col mb-2 text-xl font-semibold sm:text-sm'}>
                    Password
                </label>
                <input onChange={handleChange}
                       className={'p-2 mb-10 text-xl rounded border border-gray-800 sm:mb-6 sm:text-sm'} id='password'
                       name='password'
                       placeholder={'Enter the password'} />

                <button
                    onClick={handleRegister}
                    className='button'
                    type={'submit'}>Register
                </button>

                <p className={'pl-2 mb-2 text-lg sm:text-sm'}>
                    Already have an account.
                    <Link href={Routes.login}>
                        <a className={'pl-1 text-sky-300'}>Click</a>
                    </Link> to continue
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
