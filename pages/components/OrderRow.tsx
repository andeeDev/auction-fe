import Image from 'next/image';

export default function OrderRow({ cartItem }) {
    const { title, price } = cartItem.product;

    const totalPrice: string = (cartItem.product.price * cartItem.amount).toFixed(2);

    return <div className={' mb-2 w-full rounded border '}>
        <div className={'flex justify-between items-center'}>
            <div className={'flex justify-center items-center'}>
                <div className={'p-4'}>
                    <Image width={75} height={75}
                           src='https://m.media-amazon.com/images/I/31QVBbn69oL._AC_SX342_.jpg' alt={title} />
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