import { useGetCategoriesQuery } from '../../logic/services/fetchProducts';
import Loader from './Loader/Loader';
import Link from 'next/link';
import { Routes } from '../../utils/Routes';

export default function CategoryBar() {
    const { data, isError, isLoading } = useGetCategoriesQuery('');

    if (isLoading) {
        return <Loader />;
    }
    if (isError) {
        return <div></div>;
    }

    return <aside className={'col-span-1 m-4 text-sm '}>
        <nav className={'flex flex-col rounded-md mild-shadow'}>
            <ul>
                {data.map(({ id, title }) =>
                    (
                        <li key={id} className={'border-b cursor-pointer'}><Link href={{
                            pathname: `${Routes.categories}/[id]${Routes.singleProduct}`,
                            query: { id: id },
                        }}><a className={'box-border block p-2 w-full hover:bg-slate-100'}>{title}</a></Link></li>
                    ),
                )}
            </ul>
        </nav>
    </aside>;
}