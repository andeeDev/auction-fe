import Image from 'next/image';
import Link from 'next/link';
import ProductButton from '../ProductButton';

export default function Product({ product, href }) {
    const { title, price } = product;

    return (
        <div className={'flex flex-col p-2 w-40 hover:bg-slate-200 rounded-md light-shadow'}>
            <Link href={href}>
                <div className={'mb-4'}>
                    <Image className={'cursor-pointer'} width={140} height={140}
                           src={'https://m.media-amazon.com/images/I/31QVBbn69oL._AC_SX342_.jpg'} />
                </div>
            </Link>
            <Link href={href}>
                <span className={'pb-2 text-base cursor-pointer'}>{title}</span>
            </Link>
            <div className={'flex justify-between py-1'}>
                <span className={'inline-flex items-center text-base'}>$ {price}</span>
                <ProductButton product={product} />
            </div>
        </div>
    );
}
