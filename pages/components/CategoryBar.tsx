import { useGetCategoriesQuery } from '../../logic/services/services';
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
        <nav className={'mild-shadow flex flex-col rounded-md'}>
            <ul>
                {data.map(({ id, title }) =>
                    (
                        <li key={id} className={'cursor-pointer border-b'}><Link href={{
                            pathname: `${Routes.categories}/[id]${Routes.singleProduct}`,
                            query: { id: id },
                        }}><a className={'box-border block w-full p-2 hover:bg-slate-100'}>{title}</a></Link></li>
                    ),
                )}
            </ul>
        </nav>
    </aside>;
}