import TaskList from '../task/task-list';

export default function Column({ column }) {
    return (
        <li className="flex h-full w-[24rem] shrink-0 flex-col pb-[5rem] tb:w-[28rem]">
            <div className="mb-[1.5rem] flex shrink-0 items-center gap-[1.2rem] tb:mb-[2.5rem]">
                <span
                    className="inline-block size-[1.5rem] shrink-0 rounded-full"
                    style={{ backgroundColor: column.color }}
                />
                <p className="truncate text-[1.2rem] font-bold tracking-[2.4px] text-muted uppercase">{`${column.name} (${column.tasks.length})`}</p>
            </div>

            <div className="h-full min-h-[80vh]">
                <TaskList tasks={column.tasks} />
            </div>
        </li>
    );
}
