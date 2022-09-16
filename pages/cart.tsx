import { clearCart, selectCart } from '../logic/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductRow from './components/ProductRow/ProductRow';
import { useCreateOrderMutation } from '../logic/services/services';
import { Routes } from '../utils/Routes';
import Loader from './components/Loader/Loader';
import { useRouter } from 'next/router';
import PrivateRoute from './components/PrivateRoute';
import { selectUserExists, setCredentials } from '../logic/authSlice';
import { toast } from 'react-toastify';
import { CartItem, CartProductInfo } from '../utils/interfaces';
import { Messages } from '../utils/Messages';

export default function Cart() {
    const cart: CartItem[] = useSelector(selectCart);

    const isUserExists: boolean = useSelector(selectUserExists);

    const dispatch = useDispatch();
    const { push } = useRouter();

    const [createOrder] = useCreateOrderMutation();

    const createOrderRequest = async () => {
        const products: CartProductInfo[] = cart.map((cartItem: CartItem) => {
            return { amount: cartItem.amount, productId: cartItem.product.id };
        });
        const result = await createOrder({ products });
        if ('data' in result) {
            dispatch(clearCart());
            return await push(Routes.orders);
        }
        if ('error' in result) {
            toast(Messages.SuccessfullySent);
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
                    <span className={'flex items-baseline rounded bg-sky-500 p-2 text-white hover:bg-sky-600'}>
                        <PrivateRoute href={Routes.orders}>Previous orders</PrivateRoute>
                    </span>
                </div>
                {cart.length ? <div>
                        <div className={'rounded'}>
                            {cart.map((product: CartItem) => <ProductRow key={product.product.id} cartItem={product} />)}
                        </div>
                        <div className={'mb-4 flex justify-between text-lg font-semibold'}>
                            <div>Total Price</div>
                            <div>$ {totalPrice}</div>
                        </div>
                        <button disabled={!isUserExists}
                                onClick={createOrderRequest}
                                className={'w-full rounded bg-amber-400 p-3 text-xl font-bold hover:bg-amber-300 disabled:bg-slate-300 sm:p-1 sm:text-base'}>
                            Make an order
                        </button>
                    </div> :
                    <div className={'mt-4 mb-8 text-center text-xl font-semibold'}>You haven't add any thing to the
                        card</div>}
                <div>
                </div>
            </div>
        </div>
    );
}
