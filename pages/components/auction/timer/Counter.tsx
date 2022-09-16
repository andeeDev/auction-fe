import { CounterConfigProps } from '../../../../utils/interfaces';

export default function Counter({ config }: CounterConfigProps) {
    const { days, hours, minutes, seconds } = config;

    const styles = 'text-center text-3xl pb-4';

    if (days === 0) {
        return <div className={styles}>{`Time left: ${hours}:${minutes}:${seconds}`}</div>;
    }

    return <div className={styles}>{`Time left ${days} days, ${hours}:${minutes}:${seconds}`}</div>;
}