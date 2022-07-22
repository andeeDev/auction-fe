import CategoryBar from '../../components/CategoryBar';
import Products from '../../components/Products/Products';
import { useGetCategoryProductsQuery } from '../../../logic/services/services';
import Loader from '../../components/Loader/Loader';
import { useRouter } from 'next/router';
import ErrorComponent from '../../components/ErrorComponent';

export default function CategoryProducts() {
    const router = useRouter();

    const { data, isError, isLoading } = useGetCategoryProductsQuery(router.query.id as string);

    if (isError) {
        return <ErrorComponent />;
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className={'m-auto grid max-w-5xl grid-cols-6 justify-center gap-4'}>
            <CategoryBar />
            <main className={'col-span-5 mt-4 self-end'}>
                <Products products={data} />
            </main>
        </div>
    );
}
