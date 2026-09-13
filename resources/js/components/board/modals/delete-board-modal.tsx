import { useState } from 'react';
import { router } from '@inertiajs/react';

import { destroy } from '@/actions/App/Http/Controllers/BoardController';
import { useBoard } from '@/contexts/board-context';
import ConfirmModal from '@/components/ui/confirm-modal';
import type { ModalProps } from '@/types';

export default function DeleteBoardModal({ isOpen, onClose }: ModalProps) {
    const { activeBoard } = useBoard();

    const [isDeleting, setIsDeleting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    function handleDeleteBoard() {
        if (!activeBoard) return;

        setIsDeleting(true);
        setFormError(null);

        router.delete(destroy(activeBoard.id), {
            onSuccess: () => {
                onClose();
            },
            onError: () => {
                setFormError('Failed to delete board. Please try again.');
            },
            onFinish: () => {
                setIsDeleting(false);
            },
        });
    }

    return (
        <ConfirmModal
            title="Delete this board?"
            isOpen={isOpen}
            onClose={onClose}
            isLoading={isDeleting}
        >
            <section>
                <p className="deleteText">
                    {`Are you sure you want to delete the "${activeBoard?.name}" board? This action will permanently remove the board, all its columns, tasks, and subtasks.`}
                </p>

                {formError && <p className="mb-2 formErrorText">{formError}</p>}

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
