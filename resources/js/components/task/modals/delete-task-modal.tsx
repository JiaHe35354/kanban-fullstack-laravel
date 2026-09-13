import { useState } from 'react';
import { router } from '@inertiajs/react';

import ConfirmModal from '@/components/ui/confirm-modal';
import type { ModalProps } from '@/types';
import { useTaskModal } from '@/contexts/task-modal-context';
import { destroy } from '@/actions/App/Http/Controllers/TaskController';
import { useBoard } from '@/contexts/board-context';

export default function DeleteTaskModal({ isOpen, onClose }: ModalProps) {
    const { activeBoard } = useBoard();
    const { activeTask } = useTaskModal();

    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    async function handleDeleteTask() {
        if (!activeTask) return;

        setIsDeleting(true);
        setDeleteError(null);

        router.delete(destroy({ board: activeBoard.id, task: activeTask.id }), {
            onSuccess: () => {
                onClose();
            },
            onError: () => {
                setDeleteError('Failed to delete task. Please try again.');
            },
            onFinish: () => {
                setIsDeleting(false);
            },
        });
    }

    return (
        <ConfirmModal
            title="Delete this task?"
            isOpen={isOpen}
            onClose={onClose}
            isLoading={isDeleting}
        >
            <section>
                <p className="deleteText">
                    {`Are you sure you want to delete the "${activeTask?.title}" task and its subtasks? This action cannot be 
                    reversed.`}
                </p>

                {deleteError && (
                    <p className="mb-2 formErrorText">{deleteError}</p>
                )}

                <div className="btnGroup">
                    <button
                        type="button"
                        className="btn btnDanger"
                        disabled={isDeleting}
                        onClick={handleDeleteTask}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>

                    <button
                        type="button"
                        className="btn btnSecondary"
                        disabled={isDeleting}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </section>
        </ConfirmModal>
    );
}
