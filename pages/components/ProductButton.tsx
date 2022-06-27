import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, CartItem, selectCart } from '../../logic/orderSlice';
import { Routes } from '../../utils/Routes';

export default function ProductButton({ product }) {
    const dispatch = useDispatch();

    const cart: CartItem[] = useSelector(selectCart);

    const addProductToCart = (product) => () => {
        dispatch(addProduct(product));
    };

    const isAddedToCart = cart.some((cartProduct: CartItem) => cartProduct.product.id === product.id);

    const styles: string = 'py-2 px-2 text-base min-w-[50%] text-white bg-sky-500 hover:bg-sky-600 rounded text-center';
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
