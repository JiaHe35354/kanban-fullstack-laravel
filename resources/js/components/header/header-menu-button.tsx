import { useEffect, useRef, useState } from 'react';
import { usePage } from '@inertiajs/react';

import type { SharedProps } from '@/types';
import DeleteBoardModal from '../board/modals/delete-board-modal';
import EditBoardModal from '../board/modals/edit-board-modal';
import IconVerticalEllipsis from '../icons/icon-vertical-ellipsis';

export default function HeaderMenuButton() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);

    const { boards = [] } = usePage<SharedProps>().props;

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

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <>
            <EditBoardModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
            />

            <DeleteBoardModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
            />

            <div className="relative">
                <button
                    ref={buttonRef}
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={isMenuOpen}
                    aria-controls="board-options-menu"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    disabled={boards.length === 0}
                    className="flex cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent px-[0.8rem] py-[1rem] transition-[var(--transition)] hover:bg-[rgba(99,95,199,0.3)] focus-visible:bg-[rgba(99,95,199,0.3)]"
                >
                    <IconVerticalEllipsis className="text-muted" />
                </button>

                {isMenuOpen && (
                    <ul
                        ref={menuRef}
                        role="menu"
                        id="board-options-menu"
                        className={`absolute top-[6.2rem] right-0 z-10 flex w-[19rem] list-none flex-col gap-[2.2rem] rounded-[0.8rem] bg-background p-[2rem] text-[1.3rem] font-medium text-muted transition-[var(--transition)] ${
                            isMenuOpen
                                ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
                                : 'pointer-events-none -translate-y-[1rem] scale-90 opacity-0'
                        } `}
                    >
                        <li className="cursor-pointer hover:opacity-[0.8]">
                            <button
                                className="font-inherit cursor-pointer border-none bg-transparent font-[inherit] text-[inherit] text-inherit transition-[var(--transition)]"
                                type="button"
                                onClick={() => {
                                    setIsEditOpen(true);
                                    setIsMenuOpen(false);
                                }}
                            >
                                Edit Board
                            </button>
                        </li>
                        <li
                            className={`cursor-pointer text-red hover:opacity-[0.8]`}
                        >
                            <button
                                className="font-inherit cursor-pointer border-none bg-transparent font-[inherit] text-[inherit] text-inherit transition-[var(--transition)]"
                                type="button"
                                onClick={() => {
                                    setIsDeleteOpen(true);
                                    setIsMenuOpen(false);
                                }}
                            >
                                Delete Board
                            </button>
                        </li>
                    </ul>
                )}
            </div>
        </>
    );
}
