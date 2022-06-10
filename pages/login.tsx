import Link from 'next/link';

export default function Login() {
    return (
        <div className={'unauthorized-background'}>
            <form className={'unauthorized-form'}>
                <h3 className={'mb-4 text-3xl font-bold sm:mb-2 sm:text-base'}>Sign-in</h3>
                <label htmlFor='login' className={'flex flex-col mb-2 text-xl font-semibold sm:text-sm'}>
                    Login
                </label>
                <input id='login' className={'p-2 mb-2 text-xl rounded border border-gray-800 sm:text-sm'}
                       placeholder={'Enter your email login'}
                       name='login' />

                <label htmlFor='password' className={'flex flex-col mb-2 text-xl font-semibold sm:text-sm'}>
                    Email
                </label>
                <input className={'p-2 mb-10 text-xl rounded border border-gray-800 sm:mb-6  sm:text-sm'} id='password'
                       name='password'
                       placeholder={'Enter the password'} />

                <button
                    className={'p-3 mb-4 w-full text-xl font-bold bg-amber-400 hover:bg-amber-300 rounded sm:p-1 sm:text-base '}
                    type={'submit'}>Log In
                </button>

                <p className={'pl-2 mb-2 text-lg sm:text-sm'}>
                    Don't have an account yet?
                    <Link href={'/register'}>
                        <a className={'pl-1 text-sky-300'}>Register</a>
                    </Link> now
                </p>

                <p className={'inline-block pl-2 mb-2 text-lg sm:text-sm'}>
                    Your account is not verified. Click
                    <Link href={'/confirm'}>
                        <a className={'pl-1 text-sky-300'}>here</a>
                    </Link> to continue
                </p>
            </form>
        </div>
    );
}
