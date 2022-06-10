import Link from 'next/link';

export default function Header() {
    return (
        <header className={'w-full'}>
            <nav className={'flex justify-between m-auto my-3 max-w-4xl'}>
                <div className={'flex'}>
                    <svg className='w-6 h-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'
                         stroke='currentColor' strokeWidth={2}>
                        <path strokeLinecap='round' strokeLinejoin='round'
                              d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' />
                    </svg>
                    <h2 className={'font-bold ml-1'}>Web store</h2>
                </div>
                <ul className={'flex'}>
                    <li>
                        <Link href={'#'}>Log in</Link>
                    </li>
                    <li className={'ml-2'}>
                        <Link href={'#'}>Sign up</Link>
                    </li>
                </ul>
            </nav>
        </header>);
}