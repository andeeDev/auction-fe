import { ChangeEvent, useState } from 'react';
import SendCodeStep from '../components/ResetPassword/SendCodeStep';
import EnterTokenStep from '../components/ResetPassword/EnterTokenStep';
import ResetPasswordStep from '../components/ResetPassword/ResetPasswordStep';

export default function Password() {
    const [step, setstep] = useState(1);

    const [formData, setFormData] = useState({
        email: '',
        code: '',
        token: '',
        password: '',
    });

    const nextStep: () => void = () => {
        setstep(step + 1);
    };

    // function for going to previous step by decreasing step state by 1
    const prevStep: () => void = () => {
        setstep(step - 1);
    };

    const handleInputData = (input: string) => (e: ChangeEvent<HTMLInputElement>) => {
        // input value from the form
        const { value } = e.target;
        //updating for data state taking previous state and then adding new value to create new object
        setFormData(prevState => ({
            ...prevState,
            [input]: value,
        }));
    };

    const setToken = (value: string) => {
        setFormData(prevState => ({
            ...prevState,
            token: value,
        }));
    };

    const styles = 'py-2 px-2 text-base min-w-[40%] text-white bg-sky-500 hover:bg-sky-600 rounded text-center';
    const labelStyles = 'pb-2';
    const previousButtonComponent = (
        <button className={styles} onClick={prevStep}>
            Previous step
        </button>
    );
    const multiStepComponentMap = {
        1: (
            <SendCodeStep
                labelStyles={labelStyles}
                styles={styles}
                onSuccess={nextStep}
                handleInputData={handleInputData}
                formData={formData}
            />
        ),
        2: (
            <EnterTokenStep
                labelStyles={labelStyles}
                styles={styles}
                onSuccess={nextStep}
                handleInputData={handleInputData}
                formData={formData}
                setToken={setToken}
            >
                {previousButtonComponent}
            </EnterTokenStep>
        ),
        3: (
            <ResetPasswordStep
                labelStyles={labelStyles}
                styles={styles}
                formData={formData}
                handleInputData={handleInputData}
            >
                {previousButtonComponent}
            </ResetPasswordStep>
        ),
    };

    return <div className={'m-auto max-w-5xl'}>{multiStepComponentMap[step]}</div>;
}
