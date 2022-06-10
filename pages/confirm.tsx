import ReactCodeInput from 'react-code-input';
import { useState } from 'react';

const CORRECT_PIN_CODE = '1111';

export default function Confirm() {
    const [isPinCodeValid, setIsPinCodeValid] = useState(true);
    const [pinCode, setPinCode] = useState('');
    const [btnIsPressed, setBtnIsPressed] = useState(false);

    const checkPinCode = () => {
        const isPinCodeValid = pinCode === CORRECT_PIN_CODE;

        setBtnIsPressed(true);
        setIsPinCodeValid(isPinCodeValid);
        if (!isPinCodeValid) setPinCode('');
    };

    const handlePinChange = pinCode => {
        setPinCode(pinCode);
        setBtnIsPressed(false);
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
                    <ReactCodeInput
                        type='number'
                        isValid={isPinCodeValid}
                        fields={4}
                        onChange={handlePinChange}
                        value={pinCode}
                        inputMode={'numeric'}
                        name={'code'}
                        {...props} />
                </div>
                <button className='button' type='submit'>Confirm your account</button>
            </form>
        </div>
    );
}
