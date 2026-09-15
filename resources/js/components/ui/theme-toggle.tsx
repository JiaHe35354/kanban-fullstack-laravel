import { useTheme } from '@/contexts/theme-context';
import IconDarkTheme from '../icons/icon-dark-theme';
import IconLightTheme from '../icons/icon-light-theme';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <fieldset
            className="mx-auto grid h-[4.8rem] w-[23.5rem] grid-cols-[1fr_4rem_1fr] items-center gap-[1rem] rounded-lg border-none bg-background-secondary px-[4rem] lg:w-[25rem]"
            aria-label="theme toggle"
            role="radiogroup"
        >
            <label
                htmlFor="light"
                className="flex cursor-pointer items-center justify-center"
            >
                <IconLightTheme />
                <span className="sr-only">Light theme</span>
            </label>

            <div
                className="group relative h-[2rem] cursor-pointer"
                data-theme={theme}
            >
                <div className='"absolute opacity-0" top-[0.1rem] left-[0.1rem] flex gap-[0.2rem]'>
                    <input
                        type="radio"
                        name="theme"
                        id="light"
                        className="left-[0.5rem] h-[1.8rem] w-[1.8rem]"
                        value="light"
                        checked={theme === 'light'}
                        onChange={() => setTheme('light')}
                    />
                    <input
                        type="radio"
                        name="theme"
                        id="dark"
                        className="right-[calc(100%-2rem)] h-[1.8rem] w-[1.8rem]"
                        value="dark"
                        checked={theme === 'dark'}
                        onChange={() => setTheme('dark')}
                    />
                </div>
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 block h-full w-full rounded-[2rem] bg-main-purple transition-[var(--transition)] group-hover:bg-purple-hover"
                ></span>
                <span
                    aria-hidden="true"
                    className="absolute top-[0.25rem] left-[0.3rem] h-[1.5rem] w-[1.5rem] rounded-full bg-white transition-all duration-150 ease-in-out group-data-[theme=dark]:left-[calc(100%-1.8rem)]"
                ></span>
            </div>

            <label
                htmlFor="dark"
                className="flex cursor-pointer items-center justify-center"
            >
                <IconDarkTheme />
                <span className="sr-only">Dark theme</span>
            </label>
        </fieldset>
    );
}
