interface EmptyBoardProps {
    onOpenCreateBoard: () => void;
}

export default function EmptyBoard({ onOpenCreateBoard }: EmptyBoardProps) {
    return (
        <div className="flex items-center justify-center">
            <div className="text-center">
                <p className="mb-[3.2rem] text-[1.8rem] font-semibold text-muted">
                    There are no boards available. Create a new board to get
                    started.
                </p>
                <button onClick={onOpenCreateBoard} className="addBtn">
                    + Create New Board
                </button>
            </div>
        </div>
    );
}
