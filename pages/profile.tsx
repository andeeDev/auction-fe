import { useDispatch } from 'react-redux';
import { logout } from '../logic/authSlice';
import { useRouter } from 'next/router';
import { Routes } from '../utils/Routes';

export default function Profile() {
    const dispatch = useDispatch();
    const { push } = useRouter();

    const logoutUser = () => {
        dispatch(logout());
        push(Routes.root);
    };
    return (
        <>
            <div className={'unauthorized-background'}>
                <div>Profile page</div>
                <button onClick={logoutUser}>log out</button>
            </div>
        </>
    );
}
