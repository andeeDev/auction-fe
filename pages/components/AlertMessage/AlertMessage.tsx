import { useEffect, useState } from 'react';

export default function AlertMessage({ isError, errorMessage }) {
    const [hasError, setError] = useState(isError);
    const [errMessage, setErrorMessage] = useState(errorMessage);
    useEffect(() => {
        if (isError !== hasError) {
            setError(isError);
        }
        if (errMessage !== errorMessage) {
            setErrorMessage(errorMessage);
        }
    }, [isError, errorMessage]);

    const isHiddenClass: string = hasError ? '' : ' hidden';
    const classes = 'relative py-3 px-4 text-red-700 bg-red-100 rounded border border-red-400 ' + isHiddenClass;

    const handleClick = () => {
        setError(false);
    };

    return (
        <div className={classes} role='alert'>
            <strong className='font-bold'>Holy smokes!</strong>
            <span className='block sm:inline'>Something seriously bad happened. {errMessage}</span>
            <span className='absolute inset-y-0 right-0 py-3 px-4'>
            <svg className='w-6 h-6 text-red-500 fill-current' onClick={handleClick} role='button'
                 xmlns='http://www.w3.org/2000/svg'
                 viewBox='0 0 20 20'><title>Close</title><path
                d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' /></svg>
        </span>
        </div>);
}