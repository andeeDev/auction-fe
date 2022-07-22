import Product from './Product';
import { IProduct, ProductsProps } from '../../../utils/interfaces';
import { Routes } from '../../../utils/Routes';


export default function Products({ products }: ProductsProps) {
    return (
        <div className={'flex flex-wrap gap-4'}>
            {
                products.map((product: IProduct) =>
                    <Product key={product.id}
                             product={product}
                             href={`${Routes.singleProduct}/${product.id}`} />)
            }
        </div>
    );
}