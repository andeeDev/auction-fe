import { useDispatch, useSelector } from 'react-redux';
import { logout, selectCurrentUser } from '../logic/authSlice';
import { useRouter } from 'next/router';
import { Routes } from '../utils/Routes';

export default function Profile() {
    const dispatch = useDispatch();
    const { push } = useRouter();
    const user = useSelector(selectCurrentUser);

    const logoutUser = () => {
        dispatch(logout());
        push(Routes.root);
    };
    
    return (
        <>
            <div className={'unauthorized-background'}>
                <div className={'flex flex-col'}>
                    <div className={'mb-2'}>Profile page</div>
                    <label>
                        Name
                        <input
                            className='py-2 pl-2 mb-2 w-full text-sm leading-6 text-slate-900 rounded-md focus:outline-none ring-1 focus:ring-2 ring-slate-200 focus:ring-blue-500 shadow-sm appearance-none'
                            type='text' name={'name'} aria-label={user.name} value={user.name ? user.name : ''}
                            disabled={true} />
                    </label>
                    <label>
                        Email
                        <input
                            className='py-2 pl-2 mb-4 w-full text-sm leading-6 text-slate-900 rounded-md focus:outline-none ring-1 focus:ring-2 ring-slate-200 focus:ring-blue-500 shadow-sm appearance-none'
                            type='text' name={'email'} aria-label={user.email} value={user.email} disabled={true} />
                    </label>
                    <button className={'p-1 bg-blue-100 rounded'} onClick={logoutUser}>Log out</button>
                </div>
            </div>
        </>
    );
}
