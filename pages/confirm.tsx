import ReactCodeInput from 'react-code-input';
import { ChangeEvent, useState } from 'react';
import { useConfirmMutation } from '../logic/services/fetchProducts';
import { setCredentials } from '../logic/authSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function Confirm() {
    const dispatch = useDispatch();
    const { push } = useRouter();

    //const [isPinCodeValid, setIsPinCodeValid] = useState(true);
    const [pinCode, setPinCode] = useState('');
    //const [btnIsPressed, setBtnIsPressed] = useState(false);

    const [confirm, { isLoading, isError }] = useConfirmMutation();

    /*   const checkPinCode = () => {
           const isPinCodeValid = pinCode === CORRECT_PIN_CODE;

           setBtnIsPressed(true);
           setIsPinCodeValid(isPinCodeValid);
           if (!isPinCodeValid) setPinCode('');
       };*/

    const [email, setEmail] = useState('');

    const handleEmail = ({
                             target: { value },
                         }: ChangeEvent<HTMLInputElement>) => setEmail(value);

    const handlePinChange = pinCode => {
        setPinCode(pinCode);
        // setBtnIsPressed(false);
    };

    const confirmAccount = async (event) => {
        event.preventDefault();
        try {
            const result = await confirm({ email, code: pinCode });
            if ('data' in result) {
                dispatch(setCredentials(result.data));
                return await push('/');
            }
        } catch (e) {
            toast('Some error' + e.message);
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
                <div className={'flex justify-center mb-4'}>
                    <input className={'p-2 rounded border'} onChange={handleEmail} type={'text'} name={'email'}
                           placeholder={'Enter email'} />
                </div>
                <div className={'flex justify-center mb-4'}>
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
