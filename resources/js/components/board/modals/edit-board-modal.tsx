import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';

import { useBoard } from '@/contexts/board-context';
import type { ModalProps } from '@/types';
import type { DynamicItem } from '@/components/ui/dynamic-input-list';
import Modal from '@/components/ui/modal';
import FormField from '@/components/ui/form-field';
import DynamicInputList from '@/components/ui/dynamic-input-list';
import { update } from '@/actions/App/Http/Controllers/BoardController';

interface BoardColumnForm {
    id: string;
    name: string;
}

export default function EditBoardModal({ isOpen, onClose }: ModalProps) {
    const form = useForm<{
        name: string;
        columns: BoardColumnForm[];
    }>({
        name: '',
        columns: [],
    });

    const { activeBoard } = useBoard();

    const [submitted, setSubmitted] = useState(false);

    const items: DynamicItem[] = form.data.columns.map((column) => ({
        id: column.id,
        value: column.name,
    }));

    // Sync state whenever the modal opens or activeBoard changes
    useEffect(() => {
        if (!isOpen || !activeBoard) return;

        form.setData({
            name: activeBoard.name,
            columns: (activeBoard.columns ?? []).map((column) => ({
                id: String(column.id),
                name: column.name,
            })),
        });

        setSubmitted(false);
        form.clearErrors();
    }, [isOpen, activeBoard]);

    const isNameChanged = form.data.name !== activeBoard?.name;

    const originalColumns = activeBoard?.columns ?? [];
    const areColumnsChanged =
        form.data.columns.length !== originalColumns.length ||
        form.data.columns.some((column, index) => {
            const original = originalColumns[index];

            return column.name.trim() !== original?.name;
        });

    const isDataChanged = isNameChanged || areColumnsChanged;

    const isNameEmpty = !form.data.name.trim();
    const hasEmptyColumn = form.data.columns.some(
        (column) => !column.name.trim(),
    );

    function handleAddColumn() {
        form.setData('columns', [
            ...form.data.columns,
            {
                id: crypto.randomUUID(),
                name: '',
            },
        ]);

        setSubmitted(false);
    }

    function handleUpdateColumn(id: string, value: string) {
        const index = form.data.columns.findIndex(
            (column) => String(column.id) === id,
        );

        if (index === -1) return;

        const columns = [...form.data.columns];

        columns[index] = {
            ...columns[index],
            name: value,
        };

        form.setData('columns', columns);

        form.clearErrors(`columns.${index}`);
        setSubmitted(false);
    }

    function handleRemoveColumn(id: string) {
        const columns = form.data.columns.filter((column) => column.id !== id);

        form.setData('columns', columns);
        form.clearErrors();
        setSubmitted(false);
    }

    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();

        setSubmitted(true);

        if (isNameEmpty || hasEmptyColumn || !activeBoard) return;

        form.put(update(activeBoard).url, {
            onSuccess: () => {
                onClose();
            },
        });
    }

    return (
        <Modal
            title="Edit Board"
            isOpen={isOpen}
            onClose={onClose}
            isLoading={form.processing}
        >
            <form className="modalForm" onSubmit={handleSubmit}>
                <FormField
                    label="Board Name"
                    labelName="boardName"
                    error={
                        form.errors.name ||
                        (submitted && !form.data.name.trim()
                            ? 'The name field is required.'
                            : null)
                    }
                    inputProps={{
                        type: 'text',
                        value: form.data.name,
                        onChange: (e) => {
                            form.setData('name', e.target.value);
                        },
                        disabled: form.processing,
                    }}
                />

                <DynamicInputList
                    label="Board Columns"
                    addButtonText="+ Add New Column"
                    items={items}
                    errors={form.errors}
                    onChange={handleUpdateColumn}
                    onRemove={handleRemoveColumn}
                    onAdd={handleAddColumn}
                    maxItems={5}
                    submitted={submitted}
                    disabled={form.processing}
                />

                <button
                    type="submit"
                    className="btn btnPrimary"
                    disabled={!isDataChanged || form.processing}
                >
                    {form.processing ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </Modal>
    );
}
