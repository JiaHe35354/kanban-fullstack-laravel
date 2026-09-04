import {
    createContext,
    type ReactNode,
    useContext,
    useMemo,
    useState,
} from 'react';

import type { Column, Task } from '@/types';
import { useBoard } from './board-context';

type ModalType = 'details' | 'edit' | 'delete' | null;

interface TaskModalContextType {
    activeTask: Task | null;
    activeModal: ModalType;
    currentColumn: Column | null;
    columns: Column[];
    openTaskDetails: (task: Task) => void;
    openEditTask: (task?: Task) => void;
    openDeleteTask: (task?: Task) => void;
    closeTaskModal: () => void;
}

const TaskModalContext = createContext<TaskModalContextType | undefined>(
    undefined,
);

export function TaskModalProvider({ children }: { children: ReactNode }) {
    const { activeBoard } = useBoard();
    const columns = useMemo(() => activeBoard?.columns || [], [activeBoard]);

    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    const currentColumn = useMemo(() => {
        if (!activeTask) return null;

        return columns.find((col) => col.id === activeTask.column_id) ?? null;
    }, [columns, activeTask]);

    const openTaskDetails = (task: Task) => {
        setActiveTask(task);
        setActiveModal('details');
    };

    const openEditTask = (task?: Task) => {
        if (task) setActiveTask(task);

        setActiveModal('edit');
    };

    const openDeleteTask = (task?: Task) => {
        if (task) setActiveTask(task);

        setActiveModal('delete');
    };

    const closeTaskModal = () => {
        setActiveTask(null);
        setActiveModal(null);
    };

    const value = useMemo(
        () => ({
            activeTask,
            activeModal,
            currentColumn,
            columns,
            openTaskDetails,
            openEditTask,
            openDeleteTask,
            closeTaskModal,
        }),
        [activeTask, activeModal, currentColumn, columns],
    );

    return (
        <TaskModalContext.Provider value={value}>
            {children}
        </TaskModalContext.Provider>
    );
}

export function useTaskModal() {
    const context = useContext(TaskModalContext);

    if (!context) {
        throw new Error('useTaskModal must be used within a TaskModalProvider');
    }

    return context;
}
