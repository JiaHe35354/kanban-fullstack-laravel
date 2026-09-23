import { cn } from '@/lib/utils';
import type { Task } from '@/types';
import TaskCard from './task-card';

interface TaskListProps {
    tasksById: Map<number, Task>;
    taskIds: number[];
    columnId: number;
}

export default function TaskList({
    tasksById,
    taskIds,
    columnId,
}: TaskListProps) {
    return (
        <ul
            className={cn(
                'flex h-full min-h-[80vh] flex-1 list-none flex-col gap-[1.5rem] tb:gap-[2.2rem]',
                taskIds.length === 0 && 'border-2 border-dashed border-line',
            )}
        >
            {taskIds.map((taskId, index) => {
                const task = tasksById.get(taskId);

                if (!task) return null;

                return (
                    <TaskCard
                        key={task.id}
                        task={task}
                        index={index}
                        columnId={columnId}
                    />
                );
            })}
        </ul>
    );
}
