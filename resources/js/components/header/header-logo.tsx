import { useTheme } from '@/contexts/theme-context';

export default function HeaderLogo() {
    const { theme } = useTheme();

    const desktopLogo =
        theme === 'light' ? '/assets/logo-dark.svg' : '/assets/logo-light.svg';

    return (
        <div className="w-[2.5rem] pl-[3rem] tb:w-[23rem] lg:w-[29.9rem] [&_img]:block">
            <picture>
                <source
                    width={152}
                    height={25}
                    srcSet={desktopLogo}
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
