import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, selectCart } from '../../logic/orderSlice';
import { Routes } from '../../utils/Routes';
import { CartItem, IProduct, ProductButtonProps } from '../../utils/interfaces';

export default function ProductButton({ product }: ProductButtonProps) {
    const dispatch = useDispatch();

    const cart: CartItem[] = useSelector(selectCart);

    const addProductToCart = (product: IProduct) => () => {
        dispatch(addProduct(product));
    };

    const isAddedToCart = cart.some((cartProduct: CartItem) => cartProduct.product.id === product.id);

    const styles = 'py-2 px-2 text-base min-w-[50%] text-white bg-sky-500 hover:bg-sky-600 rounded text-center';
    return <>
        {isAddedToCart ?
            <Link href={Routes.cart}><a
                className={styles}>Check
                cart</a></Link> :
            <button className={styles}
                    onClick={addProductToCart(product)}>Buy
            </button>}
    </>;
}
