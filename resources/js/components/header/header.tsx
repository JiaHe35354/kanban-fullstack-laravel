import IconChevronDown from '../icons/icon-chevron-down';
import IconPlus from '../icons/icon-plus';

import HeaderLogo from './header-logo';
import HeaderMenuButton from './header-menu-button';

// import { BoardStateContext } from '@/context/board/BoardProvider';
// import NewTaskModal from './modal/NewTaskModal';
// import EditBoardModal from './modal/EditBoardModal';
// import DeleteBoardModal from './modal/DeleteBoardModal';
// import AddTaskMobileIcon from '@/assets/icon-add-task-mobile.svg';
// import HeaderMenuButton from './HeaderMenuButton';
// import SkeletonTitle from '../ui/skeletons/SkeletonTitle';

// import classes from './Header.module.css';
// import '@/app/globals.css';

interface HeaderProps {
    isOpen: boolean;
    onToggleSidebar: () => void;
}

export default function Header({ isOpen, onToggleSidebar }: HeaderProps) {
    // const { activeBoard, boards, isBoardLoading } =
    //     useContext(BoardStateContext);

    // const newTaskModal = useRef();
    // const editBoardModal = useRef();
    // const deleteBoardModal = useRef();

    // function handleOpenNewTask() {
    //     newTaskModal.current.open();
    // }

    // function handleOpenEditBoard() {
    //     editBoardModal.current.open();
    // }

    // function handleOpenDeleteBoard() {
    //     if (!activeBoard) return;

    //     deleteBoardModal.current.open(activeBoard.id);
    // }

    return (
        <>
            {/* <NewTaskModal ref={newTaskModal} />
            <EditBoardModal ref={editBoardModal} />
            <DeleteBoardModal ref={deleteBoardModal} /> */}

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
                            Platform Launch
                        </h1>

                        <IconChevronDown
                            className={`transition-[var(--transition)] tb:hidden ${isOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    <div className="flex shrink-0 items-center">
                        <button
                            type="button"
                            className="plusBtn flex items-center justify-center border-none bg-main-purple font-[inherit] tb:addBtn"
                            // onClick={handleOpenNewTask}
                            // disabled={
                            //     !activeBoard || error || boards.length === 0
                            // }
                        >
                            <IconPlus className="block h-[1.2rem] w-[1.2rem] tb:hidden" />
                            <span className="hidden tb:inline">
                                + Add New Tasks
                            </span>
                        </button>

                        <HeaderMenuButton
                        // error={error}
                        // onOpenDelete={handleOpenDeleteBoard}
                        // onOpenEdit={handleOpenEditBoard}
                        />
                    </div>
                </div>
            </header>
        </>
    );
}
