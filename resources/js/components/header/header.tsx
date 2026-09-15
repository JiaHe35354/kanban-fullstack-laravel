import { useState } from 'react';
import { useBoard } from '@/contexts/board-context';

import type { Board } from '@/types';
import { cn, formatName } from '@/lib/utils';
import IconChevronDown from '../icons/icon-chevron-down';
import IconPlus from '../icons/icon-plus';
import CreateTaskModal from '../task/modals/create-task-modal';
import HeaderLogo from './header-logo';
import HeaderMenuButton from './header-menu-button';

interface HeaderProps {
    boards: Board[];
    isSidebarOpen: boolean;
    onToggleSidebar: () => void;
}

export default function Header({
    boards,
    isSidebarOpen,
    onToggleSidebar,
}: HeaderProps) {
    const { activeBoard } = useBoard();

    const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

    return (
        <>
            <CreateTaskModal
                isOpen={isCreateTaskModalOpen}
                onClose={() => setIsCreateTaskModalOpen(false)}
            />

            <header className="col-span-full row-start-1 row-end-2 flex items-center justify-between border-b border-line bg-background pr-[3rem] text-main">
                <HeaderLogo />

                <div className="hidden h-full w-[1px] bg-line tb:block"></div>

                <div className="flex w-full flex-1 items-center justify-between gap-[0.6rem] pl-1 tb:gap-[1rem] tb:pl-[3rem]">
                    <button
                        type="button"
                        onClick={onToggleSidebar}
                        className="flex min-w-0 items-center gap-[1rem] border-none bg-none font-[inherit] text-main"
                    >
                        <h1 className="ml-[1.2rem] max-w-[14rem] min-w-0 shrink truncate text-[1.8rem] font-bold min-[25em]:max-w-[18rem] min-[33.75em]:max-w-[25rem] tb:ml-0 tb:text-[2rem] lg:text-[2.4rem]">
                            {activeBoard
                                ? formatName(activeBoard?.name)
                                : 'No board found'}
                        </h1>

                        <IconChevronDown
                            className={cn(
                                'transition-[var(--transition)] tb:hidden',
                                isSidebarOpen && 'rotate-180',
                            )}
                        />
                    </button>

                    <div className="flex shrink-0 items-center">
                        <button
                            type="button"
                            className="font-inherit mr-[1.8rem] cursor-pointer rounded-[50px] border-none bg-main-purple px-[3rem] py-[1.5rem] text-[1.5rem] font-semibold text-white transition-[var(--transition)] hover:enabled:bg-purple-hover disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-main-purple-25"
                            onClick={() => setIsCreateTaskModalOpen(true)}
                            disabled={!activeBoard || boards.length === 0}
                        >
                            <IconPlus className="block h-[1.2rem] w-[1.2rem] tb:hidden" />
                            <span className="hidden tb:inline">
                                + Add New Tasks
                            </span>
                        </button>

                        <HeaderMenuButton boards={boards} />
                    </div>
                </div>
            </header>
        </>
    );
}
