import { TimerProps } from '../../../../utils/interfaces';
import { useEffect, useState } from 'react';
import ExpiredNotice from './ExpiredNotice';
import Counter from './Counter';

const useCountDown = (dateTime: string) => {
    const countDownDate: number = new Date(dateTime).getTime();
    const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (countDown % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [days, hours, minutes, seconds];
};

export default function CountDownTimer({ dateTime }: TimerProps) {
    const [days, hours, minutes, seconds] = useCountDown(dateTime);

    console.log('days', days + hours + minutes + seconds);

    return days + hours + minutes + seconds <= 0 ? <ExpiredNotice /> :
        <Counter
            config={{ days, hours, minutes, seconds }}
        />;
}