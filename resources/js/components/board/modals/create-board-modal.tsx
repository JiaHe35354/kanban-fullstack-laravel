import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

import Modal from '@/components/ui/modal';
import FormField from '@/components/ui/form-field';
import DynamicInputList, {
    type DynamicItem,
} from '@/components/ui/dynamic-input-list';
import { store } from '@/actions/App/Http/Controllers/BoardController';
import type { ModalProps } from '../../../types/index';

export default function CreateBoardModal({ isOpen, onClose }: ModalProps) {
    const form = useForm({
        name: '',
        columns: [''],
    });

    const [columnIds, setColumnIds] = useState<string[]>([crypto.randomUUID()]);
    const [submitted, setSubmitted] = useState(false);

    const items: DynamicItem[] = form.data.columns.map((value, index) => ({
        id: columnIds[index],
        value,
    }));

    const handleClose = () => {
        if (form.processing) return;

        form.reset();
        form.clearErrors();
        setSubmitted(false);
        setColumnIds([crypto.randomUUID()]);

        onClose();
    };

    const handleBoardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        form.setData('name', e.target.value);
        form.clearErrors('name');
    };

    const handleAddColumn = () => {
        form.setData('columns', [...form.data.columns, '']);

        setColumnIds((prev) => [...prev, crypto.randomUUID()]);

        setSubmitted(false);
    };

    const handleUpdateColumn = (id: string, value: string) => {
        const index = columnIds.indexOf(id);

        if (index === -1) return;

        const newColumns = [...form.data.columns];
        newColumns[index] = value;

        form.setData('columns', newColumns);
        form.clearErrors(`columns.${index}`);
    };

    const handleRemoveColumn = (id: string) => {
        const index = columnIds.indexOf(id);

        if (index === -1) return;

        const newColumnIds = columnIds.filter((columnId) => columnId !== id);
        const newColumns = form.data.columns.filter(
            (_, columnIndex) => columnIndex !== index,
        );

        setColumnIds(newColumnIds);
        form.setData('columns', newColumns);
        form.clearErrors();
    };

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();

        setSubmitted(true);

        form.post(store().url, {
            onSuccess: () => {
                handleClose();
            },
        });
    };

    return (
        <Modal
            title="Add New Board"
            isOpen={isOpen}
            onClose={handleClose}
            isLoading={form.processing}
        >
            <form onSubmit={handleSubmit} className="modalForm">
                <FormField
                    label="Name"
                    labelName="name"
                    error={form.errors.name}
                    inputProps={{
                        value: form.data.name,
                        placeholder: 'e.g. Web Design',
                        onChange: handleBoardNameChange,
                        disabled: form.processing,
                    }}
                />

                <DynamicInputList
                    label="Columns"
                    addButtonText="+ Add New Column"
                    items={items}
                    errors={form.errors}
                    submitted={submitted}
                    onChange={handleUpdateColumn}
                    onRemove={handleRemoveColumn}
                    onAdd={handleAddColumn}
                    disabled={form.processing}
                    fieldName="columns"
                />

                <button type="submit" className="btn btnPrimary">
                    {form.processing ? 'Creating...' : 'Create New Board'}
                </button>
            </form>
        </Modal>
    );
}
