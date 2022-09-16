import ProductCard from './ProductCard';
import { Routes } from '../../../utils/Routes';
import CardButton from '../CardButton';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, selectCart } from '../../../logic/orderSlice';
import { ProductsProps } from '../../../utils/types/props';
import { CartItem, IProduct } from '../../../utils/types/types';


export default function Products({ products }: ProductsProps) {
    const dispatch = useDispatch();

    const cart: CartItem[] = useSelector(selectCart);

    const addProductToCart = (product: IProduct) => () => {
        dispatch(addProduct(product));
    };

    return (
        <div className={'flex flex-wrap gap-4'}>
            {
                products.map((product: IProduct) => {
                        const { id, mainImg, title, price } = product;
                        const isAddedToCart = cart.some(({ product: cartProduct }: CartItem) => cartProduct.id === id);

                        return (<ProductCard key={id}
                                             title={title}
                                             mainImg={mainImg}
                                             href={`${Routes.singleProduct}/${id}`}>
                            <span className={'inline-flex items-center text-base'}>$ {price}</span>
                            <CardButton displayLink={isAddedToCart}
                                        link={Routes.cart}
                                        linkText={'Check cart'}
                                        handle={addProductToCart(product)}>Buy</CardButton>
                        </ProductCard>);
                    },
                )
            }
        </div>
    );
}