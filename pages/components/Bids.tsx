import { BidsProps } from '../../utils/types/props';

export default function Bids({ bids }: BidsProps) {
    if (bids.length === 0) {
        return <div className={'font-semibold'}>No bids were made on this product! You can be the first one!</div>;
    }

    return <table className={'w-full table-auto'}>
        <thead>
        <tr>
            <th className={'px-6 py-4 text-left text-sm font-medium text-gray-900'}>User</th>
            <th className={'px-6 py-4 text-left text-sm font-medium text-gray-900'}>Price</th>
        </tr>
        </thead>
        <tbody className={'h-24'}>
        {
            bids.map(({ id, userId, price }) => {
                return (
                    <tr key={id}
                        data-tooltip-target='tooltip-default'
                        className={`border-b bg-white transition duration-300 ease-in-out first-of-type:bg-green-100 hover:bg-gray-100`}>
                        <td className={'whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'}>{userId}</td>
                        <td className={'whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900'}>$ {price} </td>
                    </tr>
                );
            })}
        </tbody>
    </table>;
}




