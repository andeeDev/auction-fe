import Products from './components/Products/Products';
import CategoryBar from './components/CategoryBar';
import { useFetchProductsQuery } from '../logic/services/services';
import Loader from './components/Loader/Loader';
import ErrorComponent from './components/ErrorComponent';

export default function Home() {
    const { data, isError, isLoading } = useFetchProductsQuery('');

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <ErrorComponent />;
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
