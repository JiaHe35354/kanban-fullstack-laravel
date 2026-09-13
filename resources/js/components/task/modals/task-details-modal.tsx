import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { router } from '@inertiajs/react';

import { useTaskModal } from '@/contexts/task-modal-context';
import type { ModalProps } from '@/types';
import { getSubtaskStats } from '@/util/taskHelper';
import StatusDropDown from '@/components/ui/status-drop-down';
import { handleDialogBackdropClick } from '@/util/dialog';
import MenuButton from '@/components/ui/menu-button';
import IconCross from '@/components/icons/icon-cross';
import { updateStatus } from '@/actions/App/Http/Controllers/TaskController';
import { useBoard } from '@/contexts/board-context';

export default function TaskDetailsModal({ isOpen, onClose }: ModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        if (isOpen && !dialog.open) {
            dialog.showModal();
        } else if (!isOpen && dialog.open) {
            dialog.close();
        }
    }, [isOpen]);

    const { activeBoard } = useBoard();
    const {
        activeTask,
        columns,
        currentColumn,
        updateActiveTask,
        closeTaskModal,
    } = useTaskModal();

    const { total, completed } = getSubtaskStats(activeTask?.subtasks);

    function handleStatusChange(newColumnId: number) {
        if (!activeTask || !activeBoard) return;

        if (newColumnId === currentColumn?.id) return;

        setIsLoading(true);
        setError(null);

        router.patch(
            updateStatus({ board: activeBoard.id, task: activeTask.id }).url,
            {
                column_id: newColumnId,
            },
            {
                preserveScroll: true,

                onSuccess: () => {
                    updateActiveTask({
                        column_id: newColumnId,
                    });
                },

                onError: () => {
                    setError('Failed to move task. Please try again.');
                },

                onFinish: () => {
                    setIsLoading(false);
                },
            },
        );
    }

    function handleToggleSubtask(subtaskId: number) {
        if (!activeTask) return;

        setIsLoading(true);
        setError(null);

        try {
            // Call Inertia request or context method to toggle subtask completion
        } catch (err) {
            setError('Failed to update subtask.');
        } finally {
            setIsLoading(false);
        }
    }

    if (!mounted) return null;

    const modalRoot = document.getElementById('modal-root');

    if (!modalRoot) return null;

    return createPortal(
        <dialog
            ref={dialogRef}
            className="modal"
            onClick={(e) => handleDialogBackdropClick(e, onClose, isLoading)}
            // onCancel={(e) => {
            //     isLoading ? e.preventDefault() : onClose();
            // }}
        >
            <header className="mt-[2rem] mb-[2.6rem] flex items-center justify-between gap-[2.5rem] tb:mt-0">
                <h4 className="color-main text-[1.8rem] font-bold break-words">
                    {activeTask?.title}
                </h4>

                <div>
                    <MenuButton disabled={isLoading} />
                </div>
            </header>

            {activeTask && (
                <section>
                    <p className="mb-[2.6rem] max-h-[10.6rem] overflow-y-auto pr-[1rem] text-[1.3rem] leading-[1.6] [word-break:break-word] text-muted [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-medium-grey">
                        {activeTask.description || 'No description provided.'}
                    </p>

                    <fieldset className="border-none">
                        <legend className="formLabel">
                            Subtasks ({completed} of {total})
                        </legend>

                        <ul className="mb-[2.6rem] flex list-none flex-col gap-[0.8rem]">
                            {activeTask.subtasks?.map((subtask) => (
                                <li
                                    key={subtask.id}
                                    className="grid cursor-pointer grid-cols-[1em_auto] items-center gap-[2rem] rounded-[0.5rem] bg-background-secondary p-[1.5rem_1.3rem] text-[1.2rem] font-medium text-main transition-[var(--transition)] hover:bg-main-purple-25"
                                >
                                    <input
                                        type="checkbox"
                                        id={`subtask-${subtask.id}`}
                                        checked={subtask.is_completed}
                                        disabled={isLoading}
                                        onChange={() =>
                                            handleToggleSubtask(subtask.id)
                                        }
                                        className="checkbox"
                                    />
                                    <label
                                        htmlFor={`subtask-${subtask.id}`}
                                        className="subtaskLabel"
                                    >
                                        {subtask.title}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </fieldset>

                    <div className="flex flex-col gap-[0.8rem]">
                        <h5 className="text-[1.2rem] font-medium text-label">
                            Current Status
                        </h5>

                        <StatusDropDown
                            value={currentColumn?.name}
                            options={columns}
                            onChange={(newColumnId) =>
                                handleStatusChange(newColumnId)
                            }
                            disabled={isLoading}
                        />
                    </div>

                    {error && <p className="formErrorText">{error}</p>}
                </section>
            )}

            <button
                type="button"
                className="absolute top-[1rem] right-[1rem] flex items-center justify-center rounded-[0.5rem] border-none bg-medium-grey-25 p-[0.5rem] text-main tb:sr-only"
                onClick={() => {
                    dialogRef.current?.close();
                    closeTaskModal();
                }}
                aria-label="Close task details"
            >
                <IconCross />
            </button>
        </dialog>,
        modalRoot,
    );
}
