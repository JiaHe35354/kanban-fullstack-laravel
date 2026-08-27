import type { SVGProps } from 'react';

export default function IconChevronDown(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="10"
            height="7"
            viewBox="0 0 10 7"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                d="m1 1 4 4 4-4"
            />
        </svg>
    );
}
