import { useState } from 'react';

import ConfirmModal from '@/components/ui/confirm-modal';
import type { ModalProps } from '@/types';
import { useTaskModal } from '@/contexts/task-modal-context';

export default function DeleteTaskModal({ isOpen, onClose }: ModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    const { activeTask } = useTaskModal();

    async function handleDeleteBoard() {
        // if (!activeBoard) return;

        // setIsDeleting(true);
        // setFormError(null);

        // try {
        //     // Add your deletion logic here
        //     onClose();
        // } catch (err) {
        //     setFormError('Failed to delete board. Please try again.');
        // } finally {
        //     setIsDeleting(false);
        // }
        console.log('delete task');
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
                        onClick={handleDeleteBoard}
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
