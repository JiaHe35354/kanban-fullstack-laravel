import { usePage } from '@inertiajs/react';
import { useBoard } from '@/contexts/board-context';
import type { SharedProps } from '@/types';

import Column from './column';

export default function ColumnList() {
    const { activeBoard } = useBoard();
    const { boards } = usePage<SharedProps>().props;

    return (
        <ul className="flex h-max min-h-full w-max min-w-full list-none gap-[1.8rem] pr-[1.5rem] tb:gap-[2.5rem] tb:pr-[2.5rem]">
            {activeBoard?.columns?.map((column) => (
                <Column key={column.id} column={column} />
            ))}

            {boards.length > 0 && (
                <li className="mt-[3rem] flex h-[80vh] w-[24rem] shrink-0 flex-col items-center justify-center rounded-[0.8rem] bg-tertiary pb-[5rem] tb:mt-[4rem] tb:w-[28rem]">
                    <button
                        className="font-inherit cursor-pointer border-none bg-transparent text-[2.4rem] font-bold text-muted transition-all duration-200 ease-in hover:text-main-purple"
                        // onClick={handleOpenModal}
                    >
                        + New Column
                    </button>
                </li>
            )}
        </ul>
    );
}
