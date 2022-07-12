import Image from 'next/image';
import Link from 'next/link';
import ProductButton from '../ProductButton';

export default function Product({ product, href }) {
    const { title, price, mainImg } = product;

    return (
        <div className={'flex flex-col p-2 w-40 hover:bg-slate-200 rounded-md light-shadow'}>
            <Link href={href} passHref>
                <div className={'mb-4'}>
                    <Image className={'cursor-pointer'} width={140} height={140}
                           alt={title}
                           src={mainImg} />
                </div>
            </Link>
            <Link href={href} passHref>
                <span className={'pb-2 text-base cursor-pointer'}>{title}</span>
            </Link>
            <div className={'flex justify-between py-1'}>
                <span className={'inline-flex items-center text-base'}>$ {price}</span>
                <ProductButton product={product} />
            </div>
        </div>
    );
}
