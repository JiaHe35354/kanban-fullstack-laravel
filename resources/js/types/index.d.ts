export interface board {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    user_id: number;
}

export interface SharedProps {
    boards: board[];
    [key: string]: unknown;
}

/// <reference types="vite/client" />

declare module '*.svg' {
    import type React from 'react';
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}
