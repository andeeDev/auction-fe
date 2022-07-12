import CategoryBar from '../../components/CategoryBar';
import Products from '../../components/Products/Products';
import { useGetCategoryProductsQuery } from '../../../logic/services/fetchProducts';
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
        <div className={'grid grid-cols-6 gap-4 justify-center m-auto max-w-5xl'}>
            <CategoryBar />
            <main className={'col-span-5 self-end mt-4'}>
                <Products products={data} />
            </main>
        </div>
    );
}
