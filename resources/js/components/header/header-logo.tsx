// import { useContext } from 'react';
// import { ThemeContext } from '@/context/ThemeContext';

export default function HeaderLogo() {
    // const { theme } = useContext(ThemeContext);

    // const desktopLogo =
    //     theme === 'light' ? '/assets/logo-dark.svg' : '/assets/logo-light.svg';

    return (
        <div className="w-[2.5rem] pl-[3rem] tb:w-[23rem] lg:w-[29.9rem] [&_img]:block">
            <picture>
                <source
                    width={152}
                    height={25}
                    srcSet="/assets/logo-dark.svg"
                    media="(min-width: 46.25em)"
                />
                <img
                    src="/assets/logo-mobile.svg"
                    alt="Kanban logo"
                    width={24}
                    height={25}
                />
            </picture>
        </div>
    );
}
