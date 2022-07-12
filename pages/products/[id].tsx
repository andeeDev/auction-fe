import CategoryBar from '../components/CategoryBar';
import Image from 'next/image';
import { useGetSingleProductQuery } from '../../logic/services/fetchProducts';
import { useRouter } from 'next/router';
import Loader from '../components/Loader/Loader';
import ProductButton from '../components/ProductButton';
import ErrorComponent from '../components/ErrorComponent';


export default function SingleProduct() {
    const router = useRouter();

    const { data: product, isError, isLoading } = useGetSingleProductQuery(router.query.id as string);

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <ErrorComponent />;
    }


    return (
        <div>
            <div className={'grid grid-cols-6 gap-4 justify-center m-auto max-w-5xl'}>
                <CategoryBar />
                <div className={'col-span-5 self-end mt-4'}>
                    <h2 className={'mb-8 text-xl font-bold text-center'}>Product information</h2>
                    <div>
                        <div className={'flex gap-8 '}>
                            <Image width={200} height={200}
                                   alt={product.title}
                                   src={product.mainImg} />
                            <div className={'flex flex-col gap-4 ml-8'}>
                                <div className={'flex gap-4'}>
                                    <span>{product.title}</span>
                                    <span>$ {product.price}</span>
                                </div>
                                <ProductButton product={product} />
                                <div>
                                    <h3 className={'mb-2 text-sm uppercase'}>Description</h3>
                                    <p className={'text-sm'}>{product.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
