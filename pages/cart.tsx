import { CartItem, clearCart, selectCart } from '../logic/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductRow from './components/ProductRow/ProductRow';
import { useCreateOrderMutation } from '../logic/services/services';
import { Routes } from '../utils/Routes';
import Loader from './components/Loader/Loader';
import { useRouter } from 'next/router';
import PrivateRoute from './components/PrivateRoute';
import { selectUserExists } from '../logic/authSlice';
import { toast } from 'react-toastify';

export default function Cart() {
    const cart: CartItem[] = useSelector(selectCart);

    const isUserExists: boolean = useSelector(selectUserExists);

    const dispatch = useDispatch();
    const { push } = useRouter();

    const [createOrder, { isLoading, isError }] = useCreateOrderMutation();

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        toast('Toasted');
    }

    const createOrderRequest = async () => {
        const products = cart.map((cartItem: CartItem) => {
            return { amount: cartItem.amount, productId: cartItem.product.id };
        });
        await createOrder({ products });
        if (!isError) {
            dispatch(clearCart());
            return await push(Routes.orders);
        }
    };

    const totalPrice: string = cart.reduce((acc, val) => {
        return acc + (val.amount * val.product?.price);
    }, 0).toFixed(2);

    return (
        <div className={'m-auto max-w-5xl'}>
            <div className={'m-6'}>
                <div className={'flex justify-between'}>
                    <span className={'p-2 text-lg'}>Cart Items</span>
                    <span className={'flex items-baseline p-2 text-white bg-sky-500 hover:bg-sky-600 rounded'}>
                        <PrivateRoute href={Routes.orders}>Previous orders</PrivateRoute>
                    </span>
                </div>
                {cart.length ? <div>
                        <div className={'rounded'}>
                            {cart.map((product: CartItem) => <ProductRow key={product.product.id} cartItem={product} />)}
                        </div>
                        <div className={'flex justify-between mb-4 text-lg font-semibold'}>
                            <div>Total Price</div>
                            <div>$ {totalPrice}</div>
                        </div>
                        <button disabled={!isUserExists}
                                onClick={createOrderRequest}
                                className={'p-3 w-full text-xl font-bold bg-amber-400 hover:bg-amber-300 disabled:bg-slate-300 rounded sm:p-1 sm:text-base'}>
                            Make an order
                        </button>
                    </div> :
                    <div className={'mt-4 mb-8 text-xl font-semibold text-center'}>You haven't add any thing to the
                        card</div>}
                <div>
                </div>
            </div>
        </div>
    );
}
