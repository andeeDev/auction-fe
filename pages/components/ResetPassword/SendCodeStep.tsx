import { useSendResetPasswordCodeMutation } from '../../../logic/services/services';
import { toast } from 'react-toastify';
import { Messages } from '../../../utils/Messages';
import { ErrorHelper } from '../../../utils/ErrorHelper';


export default function SendCodeStep({ styles, labelStyles, onSuccess, formData, handleInputData }) {
    const [sendResetPasswordCode] = useSendResetPasswordCodeMutation();
    const sendCode = async () => {
        try {
            const response = await sendResetPasswordCode({ email: formData.email });
            if ('data' in response) {
                toast(Messages.SuccessfullySent);
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
        <div className={'flex justify-center mt-2'}>
            <div className={'min-w-[50%]'}>
                <div className={'w-full'}>
                    <label className={labelStyles}>
                        Enter your email
                    </label>
                    <input
                        className='py-2 pl-2 mb-2 w-full text-sm leading-6 text-slate-900 rounded-md focus:outline-none ring-1 focus:ring-2 ring-slate-200 focus:ring-blue-500 shadow-sm appearance-none'
                        type='text' name={'email'} aria-label={'Email'} value={formData.email} placeholder={'Email'}
                        onChange={handleInputData('email')} />
                </div>
                <button className={`${styles} w-full mb-2`} onClick={sendCode}>Send code</button>
            </div>
        </div>
    );
}