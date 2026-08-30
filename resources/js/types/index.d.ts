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

export interface SharedProps {
    boards: Board[];
    [key: string]: unknown;
}

/// <reference types="vite/client" />

declare module '*.svg' {
    import type React from 'react';
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}
