import CategoryBar from './components/CategoryBar';
import { useGetAuctionProductsQuery } from '../logic/services/services';
import Loader from './components/Loader/Loader';
import ErrorComponent from './components/ErrorComponent';
import AuctionProducts from './components/AuctionProduct/AuctionProducts';

export default function Auction() {
    const { data, isError, isLoading } = useGetAuctionProductsQuery('');

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
                    <AuctionProducts products={data} />
                </div>
            </div>
        </div>
    );
}
