import { useEffect, useState } from 'react';

import { useBoard } from '@/contexts/board-context';
import type { ModalProps } from '@/types';
import type { DynamicItem } from '@/components/ui/dynamic-input-list';
import Modal from '@/components/ui/modal';
import FormField from '@/components/ui/form-field';
import DynamicInputList from '@/components/ui/dynamic-input-list';

export default function EditBoardModal({ isOpen, onClose }: ModalProps) {
    const { activeBoard } = useBoard();

    const [boardName, setBoardName] = useState('');
    const [cols, setCols] = useState<DynamicItem[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [isDuplicate, setIsDuplicate] = useState(false);
    // const [formError, setFormError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Sync state whenever the modal opens or activeBoard changes
    useEffect(() => {
        if (isOpen && activeBoard) {
            setBoardName(activeBoard.name || '');

            const initialCols = (activeBoard.columns || []).map((col) => ({
                id: String(col.id),
                value: col.name || '',
            }));

            setCols(initialCols);
            setSubmitted(false);
            setIsDuplicate(false);
            // setFormError(null);
        }
    }, [isOpen, activeBoard]);

    const originalColumns = activeBoard?.columns || [];

    const isNameChanged = boardName !== activeBoard?.name;
    const areColumnsChanged =
        cols.length !== originalColumns.length ||
        cols.some((col, index) => {
            const original = originalColumns[index];

            return (
                col.value.trim() !== original?.name ||
                col.id !== String(original?.id)
            );
        });

    const isDataChanged = isNameChanged || areColumnsChanged;
    const isNameEmpty = !boardName.trim();
    const hasEmptyColumn = cols.some((c) => !c.value.trim());

    function handleAddColumn() {
        setCols((prev) => [...prev, { id: crypto.randomUUID(), value: '' }]);
        setSubmitted(false);
    }

    function handleUpdateColumn(id: string, value: string) {
        setCols((prev) =>
            prev.map((col) => (col.id === id ? { ...col, value } : col)),
        );
        setSubmitted(false);
    }

    function handleRemoveColumn(id: string) {
        setCols((prev) => prev.filter((col) => col.id !== id));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);

        if (isNameEmpty || hasEmptyColumn || !activeBoard) return;

        // try {
        //     await editBoard({
        //         boardId: activeBoard.id,
        //         name: boardName,
        //         columns: cols,
        //     });

        //     dialog.current.close();
        // } catch (err) {
        //     if (err.message === 'BOARD_EXISTS') {
        //         setIsDuplicate(true);
        //     } else {
        //         setFormError('Failed to update board. Please try again.');
        //     }
        // }
    }

    return (
        <Modal title="Edit Board" isOpen={isOpen} onClose={onClose}>
            <form className="modalForm" onSubmit={handleSubmit}>
                <FormField
                    label="Board Name"
                    labelName="boardName"
                    inputProps={{
                        type: 'text',
                        value: boardName,
                        onChange: (e) => {
                            setBoardName(e.target.value);

                            if (isDuplicate) setIsDuplicate(false);
                        },
                    }}
                />

                <DynamicInputList
                    label="Board Columns"
                    addButtonText="+ Add New Column"
                    items={cols}
                    onChange={handleUpdateColumn}
                    onRemove={handleRemoveColumn}
                    onAdd={handleAddColumn}
                    maxItems={5}
                    submitted={submitted}
                    disabled={isSubmitting}
                />

                <button
                    type="submit"
                    className="btn btnPrimary"
                    disabled={!isDataChanged || isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </Modal>
    );
}
