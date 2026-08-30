import BoardView from '@/components/board/board-view';
import { BoardProvider } from '@/contexts/board-context';
import AppLayout from '@/layouts/app-layout';
import type { Board } from '@/types';

interface BoardsShowProps {
    activeBoard: Board | null;
}

export default function BoardsShow({ activeBoard }: BoardsShowProps) {
    console.log(activeBoard);

    return (
        <BoardProvider value={{ activeBoard }}>
            <AppLayout>{activeBoard && <BoardView />}</AppLayout>
        </BoardProvider>
    );
}
