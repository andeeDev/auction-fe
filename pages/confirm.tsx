import ReactCodeInput from 'react-code-input';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useConfirmMutation } from '../logic/services/services';
import { setCredentials } from '../logic/authSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Messages } from '../utils/Messages';
import { ErrorHelper } from '../utils/ErrorHelper';

export default function Confirm() {
    const dispatch = useDispatch();
    const { push } = useRouter();

    const [pinCode, setPinCode] = useState('');

    const [confirm] = useConfirmMutation();

    const [email, setEmail] = useState('');

    const handleEmail = ({
                             target: { value },
                         }: ChangeEvent<HTMLInputElement>) => setEmail(value);

    const handlePinChange = (pinCode: string) => {
        setPinCode(pinCode);
    };

    const confirmAccount = async (event: FormEvent<HTMLElement>) => {
        event.preventDefault();
        try {
            const result = await confirm({ email, code: pinCode });
            if ('data' in result) {
                dispatch(setCredentials(result.data));
                return await push('/');
            }
            if ('error' in result) {
                toast(ErrorHelper.getResponseError(result));
            }
        } catch (e) {
            toast(Messages.SomethingWentWrong);
        }
    };

    const props = {
        inputStyle: {
            height: 'h-40',
            width: '26px',
            borderRadius: '3px',
            margin: '4px',
            border: '1px solid black',
        },
        inputStyleInvalid: {
            height: 'h-24',
            width: '26px',
            margin: '4px',
            borderRadius: '3px',
            border: '1px solid red',
        },
    };

    return (
        <div className={'unauthorized-background'}>
            <form className={'unauthorized-form'}>
                <div className={'mb-4 flex justify-center'}>
                    <input className={'rounded border p-2'} onChange={handleEmail} type={'text'} name={'email'}
                           placeholder={'Enter email'} />
                </div>
                <div className={'mb-4 flex justify-center'}>
                    <ReactCodeInput
                        type='number'
                        // isValid={isPinCodeValid}
                        fields={4}
                        onChange={handlePinChange}
                        value={pinCode}
                        inputMode={'numeric'}
                        name={'code'}
                        {...props} />
                </div>
                <button className='button' type='submit' onClick={confirmAccount}>Confirm your account</button>
            </form>
        </div>
    );
}
