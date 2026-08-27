import type { SVGProps } from 'react';

export default function IconVerticalEllipsis(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="5"
            height="20"
            viewBox="0 0 5 20"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd">
                <circle cx="2.308" cy="2.308" r="2.308" />
                <circle cx="2.308" cy="10" r="2.308" />
                <circle cx="2.308" cy="17.692" r="2.308" />
            </g>
        </svg>
    );
}
