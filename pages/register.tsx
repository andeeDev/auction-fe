import Link from 'next/link';

export default function Register() {
    return (
        <div className={'unauthorized-background'}>
            <form
                className={'unauthorized-form'}
            >
                <h3 className={'mb-4 text-3xl font-bold sm:mb-2 sm:text-base'}>Sign-up</h3>
                <label htmlFor='email' className={'flex flex-col mb-2 text-xl font-semibold sm:text-sm'}>
                    Email
                </label>
                <input id='email' className={'p-2 mb-2 text-xl rounded border border-gray-800 sm:text-sm'}
                       placeholder={'Enter your email'}
                       name='email' />

                <label htmlFor='password' className={'flex flex-col mb-2 text-xl font-semibold sm:text-sm'}>
                    Password
                </label>
                <input className={'p-2 mb-10 text-xl rounded border border-gray-800 sm:mb-6 sm:text-sm'} id='password'
                       name='password'
                       placeholder={'Enter the password'} />

                <button
                    className='button'
                    type={'submit'}>Log In
                </button>

                <p className={'pl-2 mb-2 text-lg sm:text-sm'}>
                    Already have an account.
                    <Link href={'/login'}>
                        <a className={'pl-1 text-sky-300'}>Click</a>
                    </Link> to continue
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
