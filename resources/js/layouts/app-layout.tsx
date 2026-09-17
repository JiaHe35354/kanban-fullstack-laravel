import React, { useEffect, useImperativeHandle, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';

import Toaster from '@/components/ui/Toaster';
import Header from '@/components/header/Header';
import Sidebar from '@/components/sidebar/sidebar';
import type { SharedProps } from '@/types';
import { cn } from '@/lib/utils';
import CreateBoardModal from '@/components/board/modals/create-board-modal';
import EmptyBoard from '@/components/board/empty-board';
import ShowSidebar from '@/components/ui/show-sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { boards, flash } = usePage<SharedProps>().props;

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);

    useEffect(() => {
        if (flash.success) {
            toast(flash.success);
        }

        if (flash.error) {
            toast(flash.error);
        }
    }, [flash.success, flash.error]);

    function handleHideSidebar() {
        setIsSidebarOpen(false);
    }

    function handleShowSidebar() {
        setIsSidebarOpen(true);
    }

    function handleOpenCreateBoard() {
        setIsCreateBoardOpen(true);
    }

    function handleHideMobileSidebar() {
        setIsMobileSidebarOpen(false);
    }

    return (
        <>
            <CreateBoardModal
                isOpen={isCreateBoardOpen}
                onClose={() => setIsCreateBoardOpen(false)}
            />

            <div
                className={cn(
                    'grid h-screen grid-cols-1 grid-rows-[6.4rem_1fr] transition-[grid-template-columns] duration-300 ease-in tb:grid-rows-[8.2rem_1fr] lg:grid-rows-[9.7rem_1fr]',
                    isSidebarOpen
                        ? 'grid-cols-[23.1rem_1fr] lg:grid-cols-[30rem_1fr]'
                        : 'grid-cols-[0_1fr]',
                )}
            >
                <Header
                    boards={boards}
                    isSidebarOpen={isMobileSidebarOpen}
                    onToggleSidebar={() =>
                        setIsMobileSidebarOpen((prev) => !prev)
                    }
                />

                <aside className="relative col-start-1 col-end-2 row-start-2 -row-end-1 hidden overflow-visible border-r border-line bg-background tb:block">
                    <div
                        className={cn(
                            'sidebarBody',
                            isSidebarOpen ? 'sidebarOpen' : 'sidebarClose',
                        )}
                    >
                        <Sidebar
                            boards={boards}
                            onHide={handleHideSidebar}
                            onOpenCreateBoard={handleOpenCreateBoard}
                        />
                    </div>
                </aside>

                {isMobileSidebarOpen && (
                    <div className="tb:hidden">
                        <aside
                            className="fixed inset-x-0 top-[6.4rem] bottom-0 z-[900] fade-in bg-black/50"
                            onClick={handleHideMobileSidebar}
                        />
                        <div className="fixed top-[8.1rem] left-1/2 z-[1000] w-[26.4rem] -translate-x-1/2 fade-in overflow-hidden rounded-[0.8rem] bg-background">
                            <Sidebar
                                boards={boards}
                                onOpenCreateBoard={() => {
                                    handleOpenCreateBoard();
                                    handleHideMobileSidebar();
                                }}
                            />
                        </div>
                    </div>
                )}

                <main
                    className={cn(
                        'relative col-span-full row-start-2 -row-end-1 min-h-[80vh] w-full overflow-hidden bg-background-secondary tb:col-start-2 tb:-col-end-1',
                        boards.length === 0 && 'flex justify-center',
                    )}
                >
                    {boards.length === 0 && (
                        <EmptyBoard onOpenCreateBoard={handleOpenCreateBoard} />
                    )}

                    {boards.length > 0 && children}

                    {!isSidebarOpen && (
                        <ShowSidebar onShowSidebar={handleShowSidebar} />
                    )}
                </main>

                <Toaster />
            </div>
        </>
    );
}
