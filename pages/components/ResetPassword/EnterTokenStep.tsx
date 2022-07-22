import {
    useGetPasswordResetTokenMutation,
} from '../../../logic/services/services';
import { toast } from 'react-toastify';
import { Messages } from '../../../utils/Messages';
import { ErrorHelper } from '../../../utils/ErrorHelper';
import { ExportTokenProps } from '../../../utils/interfaces';

export default function EnterTokenStep({
                                           styles,
                                           labelStyles,
                                           handleInputData,
                                           formData,
                                           onSuccess,
                                           setToken,
                                           children,
                                       }: ExportTokenProps) {
    const [getPasswordResetToken] = useGetPasswordResetTokenMutation();
    const sendResetToken = async () => {
        try {
            const response = await getPasswordResetToken({ email: formData.email, code: formData.code.toString() });
            if ('data' in response) {
                setToken(response.data.token);
                onSuccess();
            }
            if ('error' in response) {
                toast(ErrorHelper.getResponseError(response));
            }
        } catch (e) {
            toast(Messages.SomethingWentWrong);
        }
    };

    return (
        <div className={'flex justify-center'}>
            <div className={'w-[50%]'}>
                <label className={labelStyles}>
                    Enter your code
                </label>
                <input
                    className='mb-2 w-full appearance-none rounded-md py-2 pl-2 text-sm leading-6 text-slate-900 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    type='text' name={'code'} aria-label={'code'} placeholder={'Code'}
                    onChange={handleInputData('code')}
                    value={formData.code} />
                <div className={'flex justify-between'}>
                    {children}
                    <button className={`${styles}`} onClick={sendResetToken}>Get token
                    </button>
                </div>
            </div>
        </div>
    );
}
