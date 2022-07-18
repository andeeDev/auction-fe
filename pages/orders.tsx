import { useGetOrderHistoryQuery } from '../logic/services/services';
import Loader from './components/Loader/Loader';
import OrderRow from './components/OrderRow';
import ErrorComponent from './components/ErrorComponent';

export default function Orders() {

    const { data: orders, isLoading, isError } = useGetOrderHistoryQuery('');

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <ErrorComponent />;
    }


    return (
        <div className={'m-auto max-w-5xl'}>
            <div className={'m-6'}>
                {orders.length === 0 &&
                    <span className={'block m-auto w-64 text-lg font-bold'}>Sorry. You don't have orders yet. Please by a product to see here your orders</span>}
                {
                    orders.map((order) => {
                        const price = order.orderProducts.reduce((acc, item) => {
                            return acc + item.product.price * item.amount;
                        }, 0).toFixed(2);
                        return (
                            <div key={order.id} className={'p-4 mb-12 rounded-lg light-shadow'}>
                                <div className={'rounded'}>
                                    {order.orderProducts.map((cartItem) => {
                                        return <OrderRow key={order.id + cartItem.orderId + cartItem.product.id}
                                                         cartItem={cartItem} />;
                                    })}
                                </div>
                                <div className={'flex justify-between mb-4 text-lg font-semibold'}>
                                    <div>Total Price</div>
                                    <div>$ {price}</div>
                                </div>
                                <div></div>
                            </div>);
                    })
                }
            </div>
        </div>
    );
}
