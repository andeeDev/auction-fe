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
            <div className={'m-auto grid max-w-5xl grid-cols-6 justify-center gap-4'}>
                <CategoryBar />
                <div className={'col-span-5 mt-4 self-end'}>
                    <Products products={data} />
                </div>
            </div>
        </div>
    );
}
