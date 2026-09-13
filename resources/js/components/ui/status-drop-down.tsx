import { useEffect, useRef, useState } from 'react';

import IconChevronDown from '../icons/icon-chevron-down';
import { disable } from '../../routes/two-factor/index';
import { formatName } from '@/lib/utils';

export interface StatusOption {
    id: number;
    name: string;
}

interface StatusDropDownProps {
    value?: string;
    options: StatusOption[];
    onChange: (id: number) => void;
    disabled?: boolean;
}

export default function StatusDropDown({
    value,
    options,
    onChange,
    disabled = false,
}: StatusDropDownProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownPos, setDropdownPos] = useState<{
        top: number;
        left: number;
        width: number;
    } | null>(null);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setMenuOpen(false);
            }
        }

        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);

    function toggleMenu() {
        if (disabled || !buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const dropdownOffset = 10;

        setDropdownPos({
            top: rect.bottom + dropdownOffset,
            left: rect.left,
            width: rect.width,
        });

        setMenuOpen((prev) => !prev);
    }

    function handleSelect(option: StatusOption, e: React.MouseEvent) {
        e.stopPropagation();

        onChange(option.id);
        setMenuOpen(false);
    }

    return (
        <div className="relative" ref={containerRef}>
            <button
                ref={buttonRef}
                type="button"
                className="font-inherit flex w-full cursor-pointer items-center justify-between gap-[1rem] rounded-[0.5rem] border-[1.6px] border-solid border-medium-grey-25 bg-transparent px-[1.5rem] py-[1.2rem] text-[1.3rem] text-main transition-[var(--transition)] hover:border-main-purple focus:border-main-purple focus:outline-main-purple"
                disabled={disabled}
                onClick={toggleMenu}
            >
                <span className="truncate">{formatName(value)}</span>
                <span>
                    <IconChevronDown />
                </span>
            </button>

            {!disabled && menuOpen && dropdownPos && (
                <ul
                    className="pointer-events-auto fixed z-[1000] flex list-none flex-col gap-[1.5rem] rounded-[0.5rem] bg-background p-[1.8rem_1.5rem] text-[1.3rem] font-medium text-muted shadow-[0_-1px_5px_rgba(130,143,163,0.2)]"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        top: dropdownPos.top,
                        left: dropdownPos.left,
                        width: dropdownPos.width,
                    }}
                >
                    {options.map((option) => (
                        <li key={option.id}>
                            <button
                                type="button"
                                className="font-inherit w-full cursor-pointer truncate border-none bg-transparent text-left text-[1.3rem] text-muted transition-[var(--transition)] hover:text-main"
                                onClick={(e) => handleSelect(option, e)}
                            >
                                {formatName(option.name)}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
