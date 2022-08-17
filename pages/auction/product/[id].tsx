import CategoryBar from '../../components/CategoryBar';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGetAuctionProductQuery, useMakeBidMutation } from '../../../logic/services/services';
import Loader from '../../components/Loader/Loader';
import ErrorComponent from '../../components/ErrorComponent';
import Bids from '../../components/Bids';
import { ChangeEventHandler, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { Messages } from '../../../utils/Messages';
import { ErrorHelper } from '../../../utils/ErrorHelper';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../logic/authSlice';
import BidInput from '../../components/BidInput';

export default function AuctionProduct() {
    const router = useRouter();
    const [bidPrice, setBidPrice] = useState('');
    const { id: userId } = useSelector(selectCurrentUser);

    const { data: product, isError, isLoading } = useGetAuctionProductQuery(router.query.id as string);

    const [makeBidRequest] = useMakeBidMutation();

    const resetStateInput = () => {
        setBidPrice('');
    };
    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <ErrorComponent />;
    }

    const { id, title, mainImg, description, creatorId, buyerId, sellTil, bids } = product;

    const createdByUserProduct = () => {
        return creatorId === userId;
    };

    const checkBidPrice = () => {
        const priceNumber = parseFloat(bidPrice);
        const previousBidPrice = bids[0]?.price;

        return priceNumber <= previousBidPrice;
    };

    const makeBid = async () => {
        if (bidPrice === '' || parseFloat(bidPrice) <= 0) {
            return toast('Your price must be a number more than 0');
        }
        if (checkBidPrice()) {
            return toast('Your price should be bigger than previous bid price');
        }


        try {
            const response = await makeBidRequest({
                id,
                price: parseFloat(bidPrice),
            });
            if ('data' in response) {
                resetStateInput();
                toast(Messages.SuccessfullySent);
            }
            if ('error' in response) {
                toast(ErrorHelper.getResponseError(response));
            }
        } catch (e) {
            toast(Messages.SomethingWentWrong);
        }
    };

    const isProductSold: () => boolean = () => {
        return buyerId !== null || Date.now() > Date.parse(sellTil);
    };

    const changeInputType: ChangeEventHandler<HTMLInputElement> = (e: FormEvent<HTMLInputElement>) => {
        setBidPrice(e.currentTarget.value);
    };

    return (
        <div>
            <div className={'m-auto grid max-w-5xl grid-cols-6 justify-center gap-4'}>
                <CategoryBar />
                <div className={'col-span-5 mt-4 self-end'}>
                    <h2 className={'mb-8 text-center text-xl font-bold'}>Product information</h2>
                    <div className={'flex'}>
                        <div>
                            <Image width={200} height={200}
                                   alt={title}
                                   src={mainImg} />
                            <div className={''}>
                                <h3 className={'mb-2 text-sm uppercase'}>Description</h3>
                                <p className={'text-sm'}>{description}</p>
                            </div>
                        </div>

                        <div className={'flex flex-col gap-8'}>
                            <BidInput
                                isProductSold={isProductSold()}
                                createdByUserProduct={createdByUserProduct()}
                                bidPrice={bidPrice}
                                changeInputType={changeInputType}
                                makeBid={makeBid} />
                            <div className={'ml-8 flex flex-col gap-4'}>
                                <div className={'flex gap-4'}>
                                    <span>{title}</span>
                                </div>
                                <div className={'inline-block h-96 min-w-full overflow-y-auto'}>
                                    <Bids bids={bids} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}