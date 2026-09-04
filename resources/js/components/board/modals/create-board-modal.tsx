import { useState } from 'react';

import Modal from '@/components/ui/modal';
import FormField from '@/components/ui/form-field';
import DynamicInputList, {
    type DynamicItem,
} from '@/components/ui/dynamic-input-list';
import type { ModalProps } from '../../../types/index';

export default function CreateBoardModal({ isOpen, onClose }: ModalProps) {
    const [boardName, setBoardName] = useState('');
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [columns, setColumns] = useState<DynamicItem[]>([
        { id: crypto.randomUUID(), value: '' },
    ]);
    const [submitted, setSubmitted] = useState(false);

    const isBoardNameInvalid = !boardName.trim();
    const hasEmptyCol = columns.some((c) => !c.value.trim());

    const getErrorMessage = () => {
        if (!submitted) return null;

        if (isBoardNameInvalid) return "Can't be empty";

        if (isDuplicate) return 'Name already used';

        return null;
    };

    const resetForm = () => {
        setSubmitted(false);
        setBoardName('');
        setIsDuplicate(false);
        setColumns([{ id: crypto.randomUUID(), value: '' }]);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleBoardNameChange = (e) => {
        setBoardName(e.target.value);
        setIsDuplicate(false);
    };

    const handleAddColumn = () => {
        setColumns((prev) => [...prev, { id: crypto.randomUUID(), value: '' }]);
        setSubmitted(false);
    };

    const handleUpdateColumn = (id: string, value: string) => {
        setColumns((prev) =>
            prev.map((col) => (col.id === id ? { ...col, value: value } : col)),
        );
    };

    const handleRemoveColumn = (id: string) => {
        setColumns((prev) => prev.filter((col) => col.id !== id));
    };

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        setSubmitted(true);

        if (isBoardNameInvalid || hasEmptyCol) return;

        // Dispatch action

        onClose();
    };

    return (
        <Modal title="Add New Board" isOpen={isOpen} onClose={handleClose}>
            <form onSubmit={handleSubmit} className="modalForm">
                <FormField
                    label="Name"
                    labelName="name"
                    error={getErrorMessage()}
                    inputProps={{
                        value: boardName,
                        placeholder: 'e.g. Web Design',
                        onChange: handleBoardNameChange,
                    }}
                />

                <DynamicInputList
                    label="Columns"
                    addButtonText="+ Add New Column"
                    items={columns}
                    submitted={submitted}
                    onChange={handleUpdateColumn}
                    onRemove={handleRemoveColumn}
                    onAdd={handleAddColumn}
                />

                <button
                    type="submit"
                    className="mt-[1rem] w-full cursor-pointer rounded-[2rem] bg-main-purple py-[1.2rem] text-[1.3rem] font-bold text-white transition-colors hover:bg-purple-hover"
                >
                    Create New Board
                </button>
            </form>
        </Modal>
    );
}
