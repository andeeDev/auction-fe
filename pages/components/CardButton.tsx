import Link from 'next/link';
import { ProductButtonProps } from '../../utils/interfaces';
import { cardButtonStyles } from '../../utils/styles';


export default function CardButton({ displayLink = true, handle, link, linkText, children }: ProductButtonProps) {
    if (displayLink) {
        return <Link href={link}><a
            className={cardButtonStyles}>{linkText}</a>
        </Link>;
    }

    return <button className={cardButtonStyles} onClick={handle}>{children}</button>;
}
