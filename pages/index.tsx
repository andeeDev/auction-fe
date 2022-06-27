import Products from './components/Products/Products';
import CategoryBar from './components/CategoryBar';
import { useFetchProductsQuery } from '../logic/services/fetchProducts';
import Loader from './components/Loader/Loader';

export default function Home() {
    const { data, isError, isLoading } = useFetchProductsQuery('');

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <span>Error</span>;
    }

    return (
        <div>
            <div className={'grid grid-cols-6 gap-4 justify-center m-auto max-w-5xl'}>
                <CategoryBar />
                <div className={'col-span-5 self-end mt-4'}>
                    <Products products={data} />
                </div>
            </div>
        </div>
    );
}
