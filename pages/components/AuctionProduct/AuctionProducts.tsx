import { Routes } from '../../../utils/Routes';
import ProductCard from '../Products/ProductCard';
import CardButton from '../CardButton';
import { AuctionProductsProps } from '../../../utils/types/props';
import { IAuctionProduct } from '../../../utils/types/types';


export default function AuctionProducts({ products }: AuctionProductsProps) {
    return (
        <div className={'flex flex-wrap gap-4'}>
            {
                products.map(({ id, title, mainImg, startPrice: price }: IAuctionProduct) => {

                        return <ProductCard key={id}
                                            title={title}
                                            mainImg={mainImg}
                                            href={`${Routes.auctionProduct}/${id}`}>
                            <span className={'inline-flex items-center text-base'}>$ {price}</span>
                            <CardButton link={`${Routes.auctionProduct}/${id}`} linkText={'View'}>View</CardButton>
                        </ProductCard>;
                    },
                )
            }
        </div>
    );
}