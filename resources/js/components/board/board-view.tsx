import { useState } from 'react';
import { router } from '@inertiajs/react';
import { DragDropProvider } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import { PointerSensor, PointerActivationConstraints } from '@dnd-kit/dom';
import { move } from '@dnd-kit/helpers';

import { updateStatus } from '@/actions/App/Http/Controllers/TaskController';
import { TaskModalProvider } from '@/contexts/task-modal-context';
import { useBoard } from '@/contexts/board-context';
import type { Task } from '@/types';
import ColumnList from '../column/column-list';
import TaskModalsHost from '../task/modals/task-modals-host';

export default function BoardView() {
    const { activeBoard } = useBoard();

    const [columnTaskIds, setColumnTaskIds] = useState<
        Record<string, number[]>
    >(() => {
        if (!activeBoard) {
            return {};
        }

        const initialColumnTaskIds: Record<string, number[]> = {};

        activeBoard.columns?.forEach((column) => {
            initialColumnTaskIds[`column-${column.id}`] =
                column.tasks?.map((task) => task.id) ?? [];
        });

        return initialColumnTaskIds;
    });

    const tasksById = new Map<number, Task>();

    activeBoard?.columns?.forEach((column) => {
        column.tasks?.forEach((task) => {
            tasksById.set(task.id, task);
        });
    });

    function handleDragOver(event: any) {
        const { source, target } = event.operation;

        if (!source || !target) return;

        if (source.type !== 'task') return;

        setColumnTaskIds((current) => move(current, event));
    }

    function handleDragEnd(event: any) {
        if (event.canceled) return;

        const { source, target } = event.operation;

        if (!source || !target) return;

        if (source.type !== 'task') return;

        if (!activeBoard) return;

        if (!isSortable(source)) {
            return;
        }

        const taskId = Number(source.id);
        const position = source.index;

        const columnId = Number(String(source.group).replace('column-', ''));

        router.patch(
            updateStatus({ board: activeBoard.id, task: taskId }).url,
            { column_id: columnId, position },
        );
    }

    if (!activeBoard) return null;

    return (
        <DragDropProvider
            sensors={(defaults) => [
                ...defaults.filter((sensor) => sensor !== PointerSensor),

                PointerSensor.configure({
                    // allow drags that start on the <button> covering the card
                    preventActivation: () => false,

                    activationConstraints(event) {
                        if (event.pointerType === 'touch') {
                            return [
                                new PointerActivationConstraints.Delay({
                                    value: 250,
                                    tolerance: 5,
                                }),
                            ];
                        }

                        // mouse/pen: only start dragging after moving 5px
                        return [
                            new PointerActivationConstraints.Distance({
                                value: 5,
                            }),
                        ];
                    },
                }),
            ]}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <TaskModalProvider>
                <div className="h-full overflow-x-auto overflow-y-auto p-[1.5rem_0_1.5rem_1.5rem] tb:p-[2.5rem_0_2.5rem_2.5rem]">
                    <ColumnList
                        activeBoard={activeBoard}
                        columnTaskIds={columnTaskIds}
                        tasksById={tasksById}
                    />
                </div>

                <TaskModalsHost />
            </TaskModalProvider>
        </DragDropProvider>
    );
}
