import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';

import Sidebar from '@/components/sidebar/sidebar';
import IconShowSidebar from '@/components/icons/icon-show-sidebar';
import type { SharedProps } from '@/types';
import Header from '@/components/header/Header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { boards } = usePage<SharedProps>().props;

    // const modal = useRef();

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    // function handleSelectBoard(boardId) {
    //     selectBoard(boardId);

    //     if (isMobile) setIsMobileSidebarOpen(false);
    // }

    // function handleOpenModal() {
    //     if (isMobile) setIsMobileSidebarOpen(false);

    //     //Wait for DOM update:
    //     requestAnimationFrame(() => {
    //         modal.current.open();
    //     });
    // }

    function handleHideSidebar() {
        setIsSidebarOpen(false);
    }

    function handleShowSidebar() {
        setIsSidebarOpen(true);
    }

    function handleHideMobileSidebar() {
        setIsMobileSidebarOpen(false);
    }

    // const Spinner = (
    //     <div className={classes.centerLoading}>
    //         <div className={classes.spinnerWrapper}>
    //             <div className="spinner"></div>
    //             <p>Loading</p>
    //         </div>
    //     </div>
    // );

    // if (error && boards.length === 0) {
    //     return (
    //         <div className={classes.errorOverlay}>
    //             <div className={classes.errorCard}>
    //                 <h2>Oops! Something went wrong</h2>
    //                 <p className={classes.text}>{error}</p>
    //                 <button
    //                     className="addBtn"
    //                     onClick={() => {
    //                         loadBoards();
    //                     }}
    //                 >
    //                     Please Try Again
    //                 </button>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <>
            {/* <NewBoardModal ref={modal} /> */}

            <div
                className={`grid h-screen grid-cols-1 grid-rows-[6.4rem_1fr] transition-[grid-template-columns] duration-300 ease-in tb:grid-rows-[8.2rem_1fr] lg:grid-rows-[9.7rem_1fr] ${
                    isSidebarOpen
                        ? 'grid-cols-[23.1rem_1fr] lg:grid-cols-[30rem_1fr]'
                        : 'grid-cols-[0_1fr]'
                }`}
            >
                <Header
                    isOpen={isMobileSidebarOpen}
                    onToggleSidebar={() =>
                        setIsMobileSidebarOpen((prev) => !prev)
                    }
                />

                <aside className="relative col-start-1 col-end-2 row-start-2 -row-end-1 hidden overflow-visible border-r border-line bg-background tb:block">
                    <div
                        className={`sidebarBody ${
                            isSidebarOpen ? 'sidebarOpen' : 'sidebarClose'
                        }`}
                    >
                        <Sidebar
                            // onSelectBoard={handleSelectBoard}
                            boards={boards}
                            onHide={handleHideSidebar}
                            // onOpenModal={handleOpenModal}
                            // isMobile={isMobile}
                        />
                    </div>
                </aside>

                {isMobileSidebarOpen && (
                    <div className="tb:hidden">
                        <aside
                            className={`fixed inset-x-0 top-[6.4rem] bottom-0 z-[900] bg-black/50 ${
                                isMobileSidebarOpen ? 'fade-in' : 'fade-out'
                            }`}
                            onClick={handleHideMobileSidebar}
                        />
                        <div className="fixed top-[8.1rem] left-1/2 z-[1000] w-[26.4rem] -translate-x-1/2 fade-in overflow-hidden rounded-[0.8rem] bg-background">
                            <Sidebar boards={boards} />
                        </div>
                    </div>
                )}

                <main
                    className={`class="col-span-full min-h-[80vh]" relative row-start-2 -row-end-1 w-full overflow-hidden bg-background-secondary tb:col-start-2 tb:-col-end-1 ${boards.length === 0 ? 'flex justify-center' : ''} `}
                >
                    {/* {error ? (
                        <div className={classes.centerEmpty}>
                            <div className={classes.emptyContent}>
                                <h2>Board Load Failed</h2>
                                <p className={classes.text}>{error}</p>
                                <button
                                    className="addBtn"
                                    onClick={() => loadBoardData(activeBoardId)}
                                >
                                    Retry Loading Columns
                                </button>
                            </div>
                        </div>
                    ) : ( */}

                    {boards.length === 0 && (
                        <div className="flex items-center justify-center">
                            <div className="text-center">
                                <p className="mb-[3.2rem] text-[1.8rem] font-semibold text-muted">
                                    There are no boards available. Create a new
                                    board to get started.
                                </p>
                                <button
                                    className="addBtn"
                                    // onClick={handleOpenModal}
                                >
                                    + Create New Board
                                </button>
                            </div>
                        </div>
                    )}

                    {boards.length > 0 && children}

                    {!isSidebarOpen && (
                        <button
                            className="showBtn hidden tb:block"
                            onClick={handleShowSidebar}
                        >
                            <IconShowSidebar className="absolute top-1/2 left-1/2 -translate-1/2 text-white" />
                        </button>
                    )}
                </main>
            </div>
        </>
    );
}
