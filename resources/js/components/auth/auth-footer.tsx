import { Link } from '@inertiajs/react';

interface AuthFooterProps {
    question: string;
    linkText: string;
    href: string;
}

export default function AuthFooter({
    question,
    linkText,
    href,
}: AuthFooterProps) {
    return (
        <p className="mt-8 text-center text-[1.5rem] text-medium-grey">
            {question}{' '}
            <Link
                href={href}
                className="hover:color-purple-hover focus:color-purple-hover font-bold text-main-purple transition-all hover:underline focus:underline focus:outline-none"
            >
                {linkText}
            </Link>
        </p>
    );
}
