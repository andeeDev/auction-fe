import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { decreaseProductCount, deleteFromCart, increaseProductCount } from '../../../logic/orderSlice';
import { ProductRowProps } from '../../../utils/types/props';
import { IProduct } from '../../../utils/types/types';

export default function ProductRow({ cartItem }: ProductRowProps) {
    const dispatch = useDispatch();
    const { title, price, mainImg } = cartItem.product;

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

    return <div className={'light-shadow my-4 flex w-full items-center justify-between rounded'}>
        <div className={'flex items-center'}>
            <div className={'p-4'}>
                <Image width={75} height={75} src={mainImg}
                       alt={title} />
            </div>
            <div className={'flex flex-col'}>
                <span>{title}</span>
                <span>$ {price}</span>
            </div>
        </div>
        <div className={'flex items-center'}>
            <span className={'mr-2 text-lg'}>$ {totalPrice}</span>
            <button onClick={increaseProduct(cartItem.product)}
                    className={'mr-2 h-12 w-12 rounded-full bg-slate-100 text-3xl hover:bg-slate-200'}>
                <span>+</span>
            </button>
            <input type={'number'} disabled={true}
                   className={'mr-2 h-12 w-12 rounded-full bg-slate-100 text-center text-xl'}
                   value={cartItem.amount} />
            <button onClick={decreaseProduct(cartItem.product)}
                    className={'mr-2 h-12 w-12 rounded-full bg-slate-100 text-3xl hover:bg-slate-200'}>
                <span>-</span>
            </button>
            <button onClick={deleteProduct(cartItem.product)}
                    className={'mr-2 rounded-full bg-slate-100 p-3 hover:bg-slate-200'}>
                <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'
                     xmlns='http://www.w3.org/2000/svg'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                          d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'></path>
                </svg>
            </button>
        </div>
    </div>;
}