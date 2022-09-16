import { useResetPasswordMutation } from '../../../logic/services/services';
import { toast } from 'react-toastify';
import { Messages } from '../../../utils/Messages';
import { Routes } from '../../../utils/Routes';
import { useRouter } from 'next/router';
import { ErrorHelper } from '../../../utils/ErrorHelper';
import { ResetPasswordStepProps } from '../../../utils/types/props';

export default function ResetPasswordStep({
                                              styles,
                                              labelStyles,
                                              formData,
                                              handleInputData,
                                              children,
                                          }: ResetPasswordStepProps) {
    const [resetPasswordRequest] = useResetPasswordMutation();

    const { push } = useRouter();

    const resetPassword = async () => {
        try {
            const response = await resetPasswordRequest({
                email: formData.email,
                token: formData.token,
                password: formData.password,
            });
            if ('data' in response) {
                toast(response.data?.message);
                await push(Routes.login);
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
            <div className={'min-w-[50%]'}>
                <label className={labelStyles}>
                    Enter your password
                </label>

                <input
                    className='mb-2 w-full appearance-none rounded-md py-2 pl-2 text-sm leading-6 text-slate-900 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    type='text' name={'password'} aria-label={'password'} placeholder={'Password'}
                    value={formData.password} onChange={handleInputData('password')} />
                <div className={'flex justify-between'}>
                    {children}
                    <button className={styles} onClick={resetPassword}>Send code</button>
                </div>
            </div>
        </div>
    );
}
