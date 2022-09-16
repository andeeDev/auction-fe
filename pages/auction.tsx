import CategoryBar from './components/CategoryBar';
import { useGetAuctionProductsQuery } from '../logic/services/services';
import Loader from './components/Loader/Loader';
import ErrorComponent from './components/ErrorComponent';
import AuctionProducts from './components/AuctionProduct/AuctionProducts';
import { Routes } from '../utils/Routes';
import CardButton from './components/CardButton';

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
                <div className={'col-span-5 mt-4 self-end '}>
                    <div className={'mb-4 flex items-center justify-between pr-40'}>
                        <span className={'text-lg font-semibold'}>Auction Products</span>
                        <CardButton
                            link={Routes.createAuctionProduct}
                            linkText={'Create Product'}
                            displayLink
                        >Create Product</CardButton>
                    </div>
                    <AuctionProducts products={data} />
                </div>
            </div>
        </div>
    );
}
