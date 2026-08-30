export default function TaskCard({ task }) {
    return (
        <div>
            <li className="group list-none rounded-[0.8rem] bg-background shadow-[var(--card-shadow)]">
                <button className="font-inherit color-inherit w-full cursor-pointer border-none bg-transparent p-[1.8rem_1.2rem] text-start tb:p-[2.3rem_1.8rem]">
                    <h3 className="mb-[0.8rem] line-clamp-3 overflow-hidden text-[1.4rem] font-bold text-main transition-[var(--transition)] group-hover:text-main-purple tb:text-[1.5rem]">
                        {task.title}
                    </h3>
                    <p className="text-[1.2rem] font-bold text-muted">
                        2 of 3 subtasks
                    </p>
                </button>
            </li>
        </div>
    );
}
