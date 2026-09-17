import BoardView from '@/components/board/board-view';
import { BoardProvider } from '@/contexts/board-context';
import { ThemeProvider } from '@/contexts/theme-context';
import AppLayout from '@/layouts/app-layout';
import type { Board } from '@/types';
import { Head } from '@inertiajs/react';

interface BoardsShowProps {
    activeBoard: Board | null;
}

export default function BoardsShow({ activeBoard }: BoardsShowProps) {
    return (
        <>
            <Head title={activeBoard.name} />
            <ThemeProvider>
                <BoardProvider value={{ activeBoard }}>
                    <AppLayout>{activeBoard && <BoardView />}</AppLayout>
                </BoardProvider>
            </ThemeProvider>
        </>
    );
}
