import { ChangeEvent, useState } from 'react';
import { useCreateAuctionProductMutation } from '../../logic/services/services';
import { Routes } from '../../utils/Routes';
import { toast } from 'react-toastify';
import { ErrorHelper } from '../../utils/ErrorHelper';
import { Messages } from '../../utils/Messages';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuctionProductCreateFormRequest } from '../../utils/types/api';


export default function CreateAuctionForm() {
    const [formState, setFormState] = useState({
        title: '',
        description: '',
        startPrice: '',
        mainImg: '',
        category: '',
    });

    const [sellTil, onChangeSellTil] = useState<Date>(new Date());

    const { push } = useRouter();

    const { register } = useForm();

    const [createAuctionProduct] = useCreateAuctionProductMutation();

    const inputs = [
        'title',
        'description',
        'startPrice',
        'mainImg',
        'category',
    ];

    const handleChange = ({
                              target: { name, value },
                          }: ChangeEvent<HTMLInputElement>) =>
        setFormState((prev) => ({ ...prev, [name]: value }));


    const getFormState = (): AuctionProductCreateFormRequest => {
        return {
            ...formState,
            startPrice: parseFloat(formState.startPrice),
            sellTil: sellTil.toISOString(),
        };
    };

    const createProduct = async () => {
        try {
            const result = await createAuctionProduct(getFormState());
            if ('data' in result) {
                toast(Messages.SuccessfullySent);
                return await push(Routes.auction);
            }
            if ('error' in result) {
                toast(ErrorHelper.getResponseError(result));
            }
        } catch (err) {
            toast(Messages.SomethingWentWrong);
        }
    };

    return <div className={''}>
        <h2 className={'mb-4 text-lg font-semibold'}>Create Auction product</h2>
        {
            inputs.map((item: string) => {
                return <>
                    <label htmlFor={item}>{item}</label>
                    <input id={item}
                           {...register(item, { required: true })}
                           className={'mb-2 rounded border border-gray-800 p-2 text-xl sm:text-sm'}
                           placeholder={`Enter your ${item}`}
                           onChange={handleChange}
                           name={item} />
                </>;
            })
        }
        <label htmlFor={'sellTill'}>Until time</label>
        <DatePicker selected={sellTil}
                    onChange={(date: Date) => onChangeSellTil(date)}
                    showTimeSelect
                    dateFormat='Pp'
                    name='sellTill'
                    id='sellTill'
                    className={'mb-2 rounded border border-gray-800 p-2 text-xl sm:text-sm'}
        />
        <button className='button' type='submit' onClick={createProduct}>Create Product</button>
    </div>;
}
