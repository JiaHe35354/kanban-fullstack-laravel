import { useEffect, useRef, useState } from 'react';

import IconVerticalEllipsis from '../icons/icon-vertical-ellipsis';
import { useTaskModal } from '@/contexts/task-modal-context';
import { cn } from '@/lib/utils';

interface MenuButtonProps {
    disabled?: boolean;
}

interface DropdownPosition {
    top: number;
    left: number;
}

export default function MenuButton({ disabled }: MenuButtonProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [dropdownPos, setDropdownPos] = useState<DropdownPosition | null>(
        null,
    );

    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);

    const { openEditTask, openDeleteTask } = useTaskModal();

    function toggleMenu(e: React.MouseEvent<HTMLButtonElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        const dropdownOffset = 18;
        const dropdownWidth = 192;

        setDropdownPos({
            top: rect.bottom + dropdownOffset,
            left: rect.left + rect.width / 2 - dropdownWidth / 2,
        });

        setIsMenuOpen((prev) => !prev);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const targetNode = event.target as Node;

            if (
                menuRef.current &&
                !menuRef.current.contains(targetNode) &&
                buttonRef.current &&
                !buttonRef.current.contains(targetNode)
            ) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                className="flex cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent px-[0.8rem] py-[1rem] transition-[var(--transition)] outline-none hover:bg-[rgba(99,95,199,0.1)]"
                aria-haspopup="menu"
                aria-expanded={isMenuOpen}
                aria-controls="options-menu"
                onClick={toggleMenu}
                disabled={disabled}
            >
                <IconVerticalEllipsis className="text-muted" />
            </button>

            <ul
                ref={menuRef}
                role="menu"
                id="options-menu"
                className={cn(
                    'fixed z-10 flex w-[19.2rem] list-none flex-col gap-[2.2rem] rounded-[0.8rem] bg-background p-[2rem] text-[1.3rem] font-medium text-muted shadow-[0_2px_5px_rgba(130,143,163,0.2)] transition-[var(--transition)]',
                    isMenuOpen
                        ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
                        : 'pointer-events-none -translate-y-[1rem] scale-90 opacity-0',
                )}
                style={
                    dropdownPos
                        ? {
                              top: dropdownPos.top,
                              left: dropdownPos.left,
                          }
                        : undefined
                }
                onClick={(e) => e.stopPropagation()}
            >
                <li className="w-full cursor-pointer hover:opacity-80">
                    <button
                        type="button"
                        className="font-inherit cursor-pointer border-none bg-transparent text-inherit transition-[var(--transition)]"
                        onClick={() => {
                            setIsMenuOpen(false);
                            openEditTask();
                        }}
                    >
                        Edit Task
                    </button>
                </li>
                <li className="w-full cursor-pointer text-red hover:text-red hover:opacity-80">
                    <button
                        type="button"
                        className="font-inherit cursor-pointer border-none bg-transparent text-inherit transition-[var(--transition)]"
                        onClick={() => {
                            setIsMenuOpen(false);
                            openDeleteTask();
                        }}
                    >
                        Delete Task
                    </button>
                </li>
            </ul>
        </div>
    );
}
