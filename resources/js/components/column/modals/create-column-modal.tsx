import { useEffect, useState } from 'react';

import DynamicInputList, {
    type DynamicItem,
} from '@/components/ui/dynamic-input-list';
import Modal from '@/components/ui/modal';
import { useBoard } from '@/contexts/board-context';
import type { ModalProps } from '@/types';

export default function CreateColumnModal({ isOpen, onClose }: ModalProps) {
    const { activeBoard } = useBoard();
    const columns = activeBoard?.columns ?? [];

    const [submitted, setSubmitted] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const [columnItems, setColumnItems] = useState<DynamicItem[]>([]);

    // Sync initial columns state when the modal opens or activeBoard updates
    useEffect(() => {
        if (isOpen && activeBoard) {
            setColumnItems(
                columns.map((c) => ({
                    id: String(c.id),
                    value: c.name,
                })),
            );
            setSubmitted(false);
            setFormError(null);
        }
    }, [isOpen, activeBoard, columns]);

    if (!activeBoard) return null;

    const hasEmptyColumns = columnItems.some((col) => !col.value.trim());

    // Check if columns have changed relative to activeBoard
    const areColumnsChanged =
        columnItems.length !== columns.length ||
        columnItems.some((col, index) => {
            const original = columns[index];

            return col.value !== original?.name;
        });

    const resetForm = () => {
        setSubmitted(false);
        setFormError(null);
        setColumnItems(
            columns.map((c) => ({
                id: String(c.id),
                value: c.name,
            })),
        );
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleAddColumn = () => {
        setColumnItems((prev) => [
            ...prev,
            { id: crypto.randomUUID(), value: '' },
        ]);
    };

    const handleUpdateColumn = (id: string, value: string) => {
        setColumnItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, value } : item)),
        );
        setSubmitted(false);
    };

    const handleRemoveColumn = (id: string) => {
        setColumnItems((prev) => prev.filter((item) => item.id !== id));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setFormError(null);

        if (hasEmptyColumns) return;

        setIsSaving(true);
        try {
            const payload = columnItems.map((col) => ({
                id: col.id,
                name: col.value,
            }));

            // Dispatch backend/Inertia action here
            // e.g., router.put(`/boards/${activeBoard.id}/columns`, { columns: payload });

            handleClose();
        } catch (err) {
            setFormError('Failed to update columns. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Modal title="Add New Column" isOpen={isOpen} onClose={handleClose}>
            <form onSubmit={handleSubmit} className="modalForm">
                <div className="formControl">
                    <span className="formLabel">Board Name</span>
                    <p className="mt-[0.6rem] text-[1.3rem] font-medium text-main">
                        {activeBoard.name}
                    </p>
                </div>

                <DynamicInputList
                    label="Columns"
                    addButtonText="+ Add New Column"
                    items={columnItems}
                    submitted={submitted}
                    onChange={handleUpdateColumn}
                    onRemove={handleRemoveColumn}
                    onAdd={handleAddColumn}
                    disabled={isSaving}
                />

                {formError && <p className="formErrorText">{formError}</p>}

                <button
                    type="submit"
                    disabled={!areColumnsChanged || isSaving}
                    className="btn btnPrimary"
                >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </Modal>
    );
}
