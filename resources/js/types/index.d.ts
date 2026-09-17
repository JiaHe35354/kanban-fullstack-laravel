export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface Subtask {
    id: number;
    task_id: number;
    title: string;
    is_completed: boolean;
}

export interface Task {
    id: number;
    column_id: number;
    title: string;
    description: string;
    position: number;
    subtasks?: Subtask[];
}

export interface Column {
    id: number;
    board_id: number;
    name: string;
    color: string;
    tasks?: Task[];
}

export interface Board {
    id: number;
    user_id: number;
    name: string;
    columns?: Column[];
}

export interface SidebarBoard {
    id: number;
    name: string;
}

export interface BoardContextType {
    activeBoard: Board | null;
}

export interface FlashMessages {
    success?: string | null;
    error?: string | null;
}

export interface SharedProps extends PageProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        } | null;
    };
    boards: Board[];
    flash: FlashMessages;
    [key: string]: unknown;
}

/// <reference types="vite/client" />

declare module '*.svg' {
    import type React from 'react';
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}
