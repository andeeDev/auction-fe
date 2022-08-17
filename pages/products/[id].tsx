import CategoryBar from '../components/CategoryBar';
import Image from 'next/image';
import { useGetSingleProductQuery } from '../../logic/services/services';
import { useRouter } from 'next/router';
import Loader from '../components/Loader/Loader';
import CardButton from '../components/CardButton';
import ErrorComponent from '../components/ErrorComponent';
import { Routes } from '../../utils/Routes';
import { CartItem, IProduct } from '../../utils/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, selectCart } from '../../logic/orderSlice';


export default function SingleProduct() {
    const router = useRouter();
    const dispatch = useDispatch();

    const cart: CartItem[] = useSelector(selectCart);

    const { data: product, isError, isLoading } = useGetSingleProductQuery(router.query.id as string);


    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <ErrorComponent />;
    }

    const addProductToCart = (product: IProduct) => () => {
        dispatch(addProduct(product));
    };
    const { id, title, mainImg, price, description } = product;
    const isAddedToCart = cart.some(({ product: cartProduct }: CartItem) => cartProduct.id === id);

    return (
        <div>
            <div className={'m-auto grid max-w-5xl grid-cols-6 justify-center gap-4'}>
                <CategoryBar />
                <div className={'col-span-5 mt-4 self-end'}>
                    <h2 className={'mb-8 text-center text-xl font-bold'}>Product information</h2>
                    <div>
                        <div className={'flex gap-8 '}>
                            <Image width={200} height={200}
                                   alt={title}
                                   src={mainImg} />
                            <div className={'ml-8 flex flex-col gap-4'}>
                                <div className={'flex gap-4'}>
                                    <span>{title}</span>
                                    <span>$ {price}</span>
                                </div>
                                <CardButton
                                    displayLink={isAddedToCart}
                                    link={Routes.cart}
                                    linkText={'Check cart'}
                                    handle={addProductToCart(product)}
                                >Buy</CardButton>
                                <div>
                                    <h3 className={'mb-2 text-sm uppercase'}>Description</h3>
                                    <p className={'text-sm'}>{description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
