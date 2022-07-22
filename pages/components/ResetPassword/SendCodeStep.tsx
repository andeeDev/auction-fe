import { useSendResetPasswordCodeMutation } from '../../../logic/services/services';
import { toast } from 'react-toastify';
import { Messages } from '../../../utils/Messages';
import { ErrorHelper } from '../../../utils/ErrorHelper';
import { SendCodeStepProps } from '../../../utils/interfaces';


export default function SendCodeStep({ styles, labelStyles, onSuccess, formData, handleInputData }: SendCodeStepProps) {
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
        <div className={'mt-2 flex justify-center'}>
            <div className={'min-w-[50%]'}>
                <div className={'w-full'}>
                    <label className={labelStyles}>
                        Enter your email
                    </label>
                    <input
                        className='mb-2 w-full appearance-none rounded-md py-2 pl-2 text-sm leading-6 text-slate-900 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        type='text' name={'email'} aria-label={'Email'} value={formData.email} placeholder={'Email'}
                        onChange={handleInputData('email')} />
                </div>
                <button className={`${styles} mb-2 w-full`} onClick={sendCode}>Send code</button>
            </div>
        </div>
    );
}