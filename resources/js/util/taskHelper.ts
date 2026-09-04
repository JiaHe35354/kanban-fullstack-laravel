import type { Subtask } from '@/types';

export function getSubtaskStats(subtasks?: Subtask[]) {
    if (!subtasks || subtasks.length === 0) {
        return { total: 0, completed: 0 };
    }

    return {
        total: subtasks.length,
        completed: subtasks.filter((s) => s?.is_completed).length,
    };
}
