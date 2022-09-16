import { useDispatch, useSelector } from 'react-redux';
import { logout, selectCurrentUser } from '../logic/authSlice';
import { useRouter } from 'next/router';
import { Routes } from '../utils/Routes';

export default function Profile() {
    const dispatch = useDispatch();
    const { push } = useRouter();
    const user = useSelector(selectCurrentUser);

    const logoutUser = async () => {
        dispatch(logout());
        await push(Routes.root);
    };

    return (
        <>
            <div className={'unauthorized-background'}>
                <div className={'flex flex-col'}>
                    <div className={'mb-2'}>Profile page</div>
                    <label>
                        Name
                        <input
                            className='mb-2 w-full appearance-none rounded-md py-2 pl-2 text-sm leading-6 text-slate-900 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            type='text'
                            name={'name'}
                            aria-label={user.name}
                            value={user.name ? user.name : ''}
                            disabled={true}
                        />
                    </label>
                    <label>
                        Email
                        <input
                            className='mb-4 w-full appearance-none rounded-md py-2 pl-2 text-sm leading-6 text-slate-900 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            type='text'
                            name={'email'}
                            aria-label={user.email}
                            value={user.email}
                            disabled={true}
                        />
                    </label>
                    <button className={'rounded bg-blue-100 p-1'} onClick={logoutUser}>
                        Log out
                    </button>
                </div>
            </div>
        </>
    );
}
