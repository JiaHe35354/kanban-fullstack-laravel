import { cn } from '@/lib/utils';
import TaskCard from './task-card';

export default function TaskList({ tasks }) {
    return (
        <ul
            className={cn(
                'flex h-full min-h-[80vh] flex-1 list-none flex-col gap-[1.5rem] tb:gap-[2.2rem]',
                tasks.length === 0 && 'border-2 border-dashed border-line',
            )}
        >
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </ul>
    );
}
