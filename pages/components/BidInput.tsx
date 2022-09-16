import CountDownTimer from './auction/timer/CountDownTimer';
import { BidInputProps } from '../../utils/types/props';

export default function BidInput({
                                     isProductSold,
                                     createdByUserProduct,
                                     bidPrice,
                                     changeInputType,
                                     makeBid,
                                     sellTil,
                                 }: BidInputProps) {

    return <div className={'ml-8'}>
        <h2 className={'mb-2 text-sm'}>Do you want to buy an item. Enter your price now</h2>
        <CountDownTimer dateTime={sellTil} />
        <div
            className={'group relative flex w-full items-center justify-center'}>
            {
                isProductSold ? <p>This product was sold</p> : createdByUserProduct ?
                    <div className={'font-semibold'}>You can't make a bid on own product</div> :
                    <>
                        <div
                            className='group relative flex items-center justify-center'>
                            <input
                                placeholder='Enter the sum'
                                type={'number'}
                                value={bidPrice.toString()}
                                onChange={changeInputType}
                                className='flex flex-none appearance-none rounded border border-transparent p-3 pr-10 leading-tight text-gray-700 shadow outline-none placeholder:text-gray-600 focus:border-gray-400 focus:outline-none'
                                required
                            />
                            <span
                                className='absolute right-0 flex rounded bg-transparent p-2 text-base text-gray-600'>
                                                          <svg fill='none' stroke='currentColor' strokeLinecap='round'
                                                               strokeLinejoin='round' strokeWidth='2'
                                                               viewBox='0 0 24 24'
                                                               className='h-6 w-6'>
                                                        <path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                                                        </svg>
                                                 </span>
                        </div>
                        <button
                            className={'ml-4 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700'}
                            onClick={makeBid}
                        >
                            Make bid
                        </button>
                    </>
            }
        </div>
    </div>;
}