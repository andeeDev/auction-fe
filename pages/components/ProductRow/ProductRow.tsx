import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { decreaseProductCount, deleteFromCart, increaseProductCount } from '../../../logic/orderSlice';
import { IProduct } from '../../../utils/interfaces';

export default function ProductRow({ cartItem }) {
    const dispatch = useDispatch();
    const { title, price } = cartItem.product;

    const increaseProduct = (product: IProduct) => () => {
        dispatch(increaseProductCount(product));
    };

    const decreaseProduct = (product: IProduct) => () => {
        dispatch(decreaseProductCount(product));
    };

    const deleteProduct = (product: IProduct) => () => {
        dispatch(deleteFromCart(product));
    };
    const totalPrice: string = (cartItem.product.price * cartItem.amount).toFixed(2);

    return <div className={'flex justify-between items-center my-4 w-full rounded light-shadow'}>
        <div className={'flex items-center'}>
            <div className={'p-4'}>
                <Image width={75} height={75} src='https://m.media-amazon.com/images/I/31QVBbn69oL._AC_SX342_.jpg' />
            </div>
            <div className={'flex flex-col'}>
                <span>{title}</span>
                <span>$ {price}</span>
            </div>
        </div>
        <div className={'flex items-center'}>
            <span className={'mr-2 text-lg'}>$ {totalPrice}</span>
            <button onClick={increaseProduct(cartItem.product)}
                    className={'mr-2 w-12 h-12 text-3xl bg-slate-100 hover:bg-slate-200 rounded-full'}>
                <span>+</span>
            </button>
            <input type={'number'} disabled={true}
                   className={'mr-2 w-12 h-12 text-xl text-center bg-slate-100 rounded-full'}
                   value={cartItem.amount} />
            <button onClick={decreaseProduct(cartItem.product)}
                    className={'mr-2 w-12 h-12 text-3xl bg-slate-100 hover:bg-slate-200 rounded-full'}>
                <span>-</span>
            </button>
            <button onClick={deleteProduct(cartItem.product)}
                    className={'p-3 mr-2 bg-slate-100 hover:bg-slate-200 rounded-full'}>
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'
                     xmlns='http://www.w3.org/2000/svg'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                          d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'></path>
                </svg>
            </button>
        </div>
    </div>;
}