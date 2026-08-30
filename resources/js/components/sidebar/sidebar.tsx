import { Link } from '@inertiajs/react';
import { useBoard } from '@/contexts/board-context';

import CreateBoardModal from '@/components/board/modals/create-board-modal';
import type { Board } from '@/types';
import IconBoard from '../icons/icon-board';
import IconHideSidebar from '../icons/icon-hide-sidebar';
import IconLogout from '../icons/icon-logout';
import { useState } from 'react';

interface SidebarProps {
    boards: Board[];
    onHide?: () => void;
}

export default function Sidebar({ boards, onHide }: SidebarProps) {
    const { activeBoard } = useBoard();
    const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);

    return (
        <>
            <CreateBoardModal
                isOpen={isCreateBoardOpen}
                onClose={() => setIsCreateBoardOpen(false)}
            />

            <nav className="bg-background text-muted tb:pb-[3rem] flex h-full flex-col justify-between overflow-y-auto pb-[1.5rem] pt-[2rem]">
                <div className="flex-1 pr-[2.5rem]">
                    <h2 className="mb-[2rem] pl-[3rem] text-[1.2rem] font-bold uppercase tracking-[2.4px]">
                        All boards ({boards?.length ?? 0})
                    </h2>

                    <ul className="list-none">
                        {boards.map((board) => {
                            const isActive = board.id === activeBoard?.id;

                            return (
                                <li key={board.id}>
                                    <Link
                                        href={`/boards/${board.id}`}
                                        preserveScroll
                                        className={`boardBtn ${isActive ? 'bg-main-purple rounded-r-[50px] text-white' : ''}`}
                                    >
                                        <IconBoard className="shrink-0" />
                                        <span className="truncate text-left">
                                            {board.name}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <button
                        onClick={() => setIsCreateBoardOpen(true)}
                        className="text-main-purple hover:text-purple-hover min-[46.25em]:mb-0 mb-[3.2rem] mt-[1.5rem] flex cursor-pointer items-center gap-[1rem] border-none bg-transparent pl-[3rem] font-[inherit] text-[1.5rem] font-bold transition-[var(--transition)]"
                    >
                        <IconBoard className="shrink-0" />+ Create New Board
                    </button>
                </div>

                <div className="mt-auto shrink-0 pt-[2rem]">
                    {/* <ThemeToggle /> */}

                    {onHide && (
                        <button
                            className="text-muted hover:text-main-purple tb:flex mt-[0.8rem] hidden w-[calc(100%-1.5rem)] cursor-pointer items-center gap-[1.5rem] border-none bg-transparent p-[1.5rem] font-[inherit] text-[1.5rem] font-bold transition-[var(--transition)] hover:rounded-r-[50px] hover:bg-[var(--bg-sidebar-hover)] lg:w-[calc(100%-2.5rem)] lg:pl-[2.5rem]"
                            onClick={onHide}
                        >
                            <IconHideSidebar /> Hide Sidebar
                        </button>
                    )}

                    <button className="text-main-purple hover:text-purple-hover mt-4 flex cursor-pointer items-center gap-4 border-none bg-transparent pl-[2.5rem] font-[inherit] text-[1.5rem] font-semibold transition-[var(--transition)]">
                        <IconLogout className="h-[1.8rem] w-[1.8rem]" />{' '}
                        <span>Log out</span>
                    </button>
                </div>
            </nav>
        </>
    );
}
