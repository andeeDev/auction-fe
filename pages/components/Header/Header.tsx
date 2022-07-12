import Link from 'next/link';
import { Routes } from '../../../utils/Routes';
import PrivateRoute from '../PrivateRoute';

export default function Header() {
    return (
        <header className={'w-full border'}>
            <nav className={'flex justify-between px-3 m-auto my-3 max-w-5xl '}>
                <div className={'flex'}>
                    <Link href={Routes.root} passHref>
                        <div className={'flex cursor-pointer'}>
                            <svg className='w-8 h-8' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'
                                 stroke='currentColor' strokeWidth={2}>
                                <path strokeLinecap='round' strokeLinejoin='round'
                                      d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' />
                            </svg>
                            <h2 className={'ml-1 text-xl font-bold'}>Web store</h2>
                        </div>
                    </Link>
                </div>
                <ul className={'flex'}>
                    <li>
                        <PrivateRoute href={Routes.profile}>
                            <svg className='w-8 h-8 cursor-pointer' fill='none' stroke='currentColor'
                                 viewBox='0 0 24 24'
                                 xmlns='http://www.w3.org/2000/svg'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                                      d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                            </svg>
                        </PrivateRoute>
                    </li>
                    <li className={'ml-2'}>
                        <Link href={Routes.cart} passHref>
                            <svg className='w-8 h-8 cursor-pointer' fill='none' stroke='currentColor'
                                 viewBox='0 0 24 24'
                                 xmlns='http://www.w3.org/2000/svg'>
                                <path strokeLinecap={'round'} strokeLinejoin='round' strokeWidth='2'
                                      d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'></path>
                            </svg>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>);
}