import { TailSpin } from 'react-loader-spinner';

export default function Loader() {
    return (
        <TailSpin wrapperClass={'flex justify-center'} color='black' height={80} width={80} />
    );
}