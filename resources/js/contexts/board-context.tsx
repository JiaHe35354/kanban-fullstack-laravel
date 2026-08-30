import { createContext, useContext, type ReactNode } from 'react';

import type { BoardContextType } from '@/types';

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export function BoardProvider({
    children,
    value,
}: {
    children: ReactNode;
    value: BoardContextType;
}) {
    return (
        <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
    );
}

export function useBoard() {
    const context = useContext(BoardContext);

    if (!context) throw new Error('useBoard must be used within BoardProvider');

    return context;
}
