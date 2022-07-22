import Image from 'next/image';
import Link from 'next/link';
import ProductButton from '../ProductButton';
import { ProductProps } from '../../../utils/interfaces';

export default function Product({ product, href }: ProductProps) {
    const { title, price, mainImg } = product;

    return (
        <div className={'light-shadow flex w-40 flex-col rounded-md p-2 hover:bg-slate-200'}>
            <Link href={href} passHref>
                <div className={'mb-4'}>
                    <Image className={'cursor-pointer'} width={140} height={140}
                           alt={title}
                           src={mainImg} />
                </div>
            </Link>
            <Link href={href} passHref>
                <span className={'cursor-pointer pb-2 text-base'}>{title}</span>
            </Link>
            <div className={'flex justify-between py-1'}>
                <span className={'inline-flex items-center text-base'}>$ {price}</span>
                <ProductButton product={product} />
            </div>
        </div>
    );
}
