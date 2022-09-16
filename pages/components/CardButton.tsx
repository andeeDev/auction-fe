import Link from 'next/link';
import { cardButtonStyles } from '../../utils/styles';
import { ProductButtonProps } from '../../utils/types/props';


export default function CardButton({ displayLink = true, handle, link, linkText, children }: ProductButtonProps) {
    if (displayLink) {
        return <Link href={link}><a
            className={cardButtonStyles}>{linkText}</a>
        </Link>;
    }

    return <button className={cardButtonStyles} onClick={handle}>{children}</button>;
}
