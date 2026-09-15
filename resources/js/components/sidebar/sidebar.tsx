import { useState } from 'react';
import { Link, router } from '@inertiajs/react';

import { useBoard } from '@/contexts/board-context';
import type { Board } from '@/types';
import { cn, formatName } from '@/lib/utils';
import { show } from '@/actions/App/Http/Controllers/BoardController';
import { destroy } from '@/actions/App/Http/Controllers/LoginController';
import IconBoard from '../icons/icon-board';
import IconHideSidebar from '../icons/icon-hide-sidebar';
import IconLogout from '../icons/icon-logout';

interface SidebarProps {
    boards: Board[];
    onCreateBoard: () => void;
    onHide?: () => void;
}

export default function Sidebar({
    boards,
    onCreateBoard,
    onHide,
}: SidebarProps) {
    const { activeBoard } = useBoard();

    const handleLogout = () => {
        router.post(destroy().url);
    };

    return (
        <nav className="flex h-full flex-col justify-between overflow-y-auto bg-background pt-[2rem] pb-[1.5rem] text-muted tb:pb-[3rem]">
            <div className="flex-1 pr-[2.5rem]">
                <h2 className="mb-[2rem] pl-[3rem] text-[1.2rem] font-bold tracking-[2.4px] uppercase">
                    All boards ({boards?.length ?? 0})
                </h2>

                <ul className="list-none">
                    {boards.map((board) => {
                        const isActive = board.id === activeBoard?.id;

                        return (
                            <li key={board.id}>
                                <Link
                                    href={show(board).url}
                                    preserveScroll
                                    className={cn(
                                        'boardBtn',
                                        isActive &&
                                            'rounded-r-[50px] bg-main-purple text-white',
                                    )}
                                >
                                    <IconBoard className="shrink-0" />
                                    <span className="truncate text-left">
                                        {formatName(board.name)}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <button
                    onClick={onCreateBoard}
                    className="mt-[1.5rem] mb-[3.2rem] flex cursor-pointer items-center gap-[1rem] border-none bg-transparent pl-[3rem] font-[inherit] text-[1.5rem] font-bold text-main-purple transition-[var(--transition)] hover:text-purple-hover min-[46.25em]:mb-0"
                >
                    <IconBoard className="shrink-0" />+ Create New Board
                </button>
            </div>

            <div className="mt-auto shrink-0 pt-[2rem]">
                {/* <ThemeToggle /> */}

                {onHide && (
                    <button
                        className="mt-[0.8rem] hidden w-[calc(100%-1.5rem)] cursor-pointer items-center gap-[1.5rem] border-none bg-transparent p-[1.5rem] font-[inherit] text-[1.5rem] font-bold text-muted transition-[var(--transition)] hover:rounded-r-[50px] hover:bg-[var(--bg-sidebar-hover)] hover:text-main-purple tb:flex lg:w-[calc(100%-2.5rem)] lg:pl-[2.5rem]"
                        onClick={onHide}
                    >
                        <IconHideSidebar /> Hide Sidebar
                    </button>
                )}

                <button
                    onClick={handleLogout}
                    className="mt-4 flex cursor-pointer items-center gap-4 border-none bg-transparent pl-[2.5rem] font-[inherit] text-[1.5rem] font-semibold text-main-purple transition-[var(--transition)] hover:text-purple-hover"
                >
                    <IconLogout className="h-[1.8rem] w-[1.8rem]" />{' '}
                    <span>Log out</span>
                </button>
            </div>
        </nav>
    );
}
