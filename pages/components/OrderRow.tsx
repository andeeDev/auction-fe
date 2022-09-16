import Image from 'next/image';
import { OrderRowProps } from '../../utils/types/props';

export default function OrderRow({ cartItem }: OrderRowProps) {
    const { title, price, mainImg } = cartItem.product;

    const totalPrice: string = (cartItem.product.price * cartItem.amount).toFixed(2);

    return <div className={' mb-2 w-full rounded border '}>
        <div className={'flex items-center justify-between'}>
            <div className={'flex items-center justify-center'}>
                <div className={'p-4'}>
                    <Image width={75} height={75}
                           src={mainImg} alt={title} />
                </div>
                <div className={'flex flex-col'}>
                    <span>{title}</span>
                    <span>$ {price}</span>
                </div>
            </div>
            <div className={'text-lg font-bold'}>{cartItem.amount}</div>
            <div className={'mr-4 text-lg font-bold'}>$ {totalPrice}</div>
        </div>
    </div>;
}