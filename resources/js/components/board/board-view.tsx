import { TaskModalProvider } from '@/contexts/task-modal-context';
import ColumnList from '../column/column-list';
import TaskModalsHost from '../task/modals/task-modals-host';

export default function BoardView() {
    return (
        <TaskModalProvider>
            <div className="h-full overflow-x-auto overflow-y-auto p-[1.5rem_0_1.5rem_1.5rem] tb:p-[2.5rem_0_2.5rem_2.5rem]">
                <ColumnList />
            </div>

            <TaskModalsHost />
        </TaskModalProvider>
    );
}
