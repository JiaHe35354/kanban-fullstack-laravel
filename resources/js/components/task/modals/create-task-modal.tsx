import React, { useMemo } from 'react';
import { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';

import Modal from '@/components/ui/modal';
import FormField from '@/components/ui/form-field';
import DynamicInputList, {
    type DynamicItem,
} from '@/components/ui/dynamic-input-list';
import type { ModalProps } from '@/types';
import { useBoard } from '@/contexts/board-context';
import StatusDropDown from '@/components/ui/status-drop-down';
import { store } from '@/actions/App/Http/Controllers/TaskController';

interface CreateTaskFormData {
    title: string;
    description: string;
    subtasks: string[];
    column_id: number;
}

export default function CreateTaskModal({ isOpen, onClose }: ModalProps) {
    const { activeBoard } = useBoard();
    const columns = useMemo(() => activeBoard?.columns ?? [], [activeBoard]);

    const [submitted, setSubmitted] = useState(false);
    const [subtaskIds, setSubtaskIds] = useState<string[]>([
        crypto.randomUUID(),
    ]);

    const form = useForm<CreateTaskFormData>({
        title: '',
        description: '',
        subtasks: [''],
        column_id: columns[0]?.id ?? 0,
    });
    console.log(form.data.column_id);

    const items: DynamicItem[] = form.data.subtasks.map((value, index) => ({
        id: subtaskIds[index],
        value,
    }));

    // Set the first column when the board/columns become available.
    useEffect(() => {
        if (columns.length > 0 && !form.data.column_id) {
            form.setData('column_id', columns[0].id);
        }
    }, [columns, form.data.column_id]);

    const selectedColumn =
        columns.find((column) => column.id === form.data.column_id) ??
        columns[0];

    const handleClose = () => {
        if (form.processing) return;

        form.reset();
        form.clearErrors();

        setSubmitted(false);
        setSubtaskIds([crypto.randomUUID()]);

        if (columns.length > 0) {
            form.setData('column_id', columns[0].id);
        }

        onClose();
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        form.setData('title', e.target.value);
        form.clearErrors('title');
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        form.setData('description', e.target.value);
        form.clearErrors('description');
    };

    const handleAddSubtask = () => {
        form.setData('subtasks', [...form.data.subtasks, '']);

        setSubtaskIds((prev) => [...prev, crypto.randomUUID()]);

        setSubmitted(false);
    };

    const handleUpdateSubtask = (id: string, value: string) => {
        const index = subtaskIds.indexOf(id);

        if (index === -1) return;

        const newSubtasks = [...form.data.subtasks];

        newSubtasks[index] = value;

        form.setData('subtasks', newSubtasks);
        form.clearErrors(`subtasks.${index}`);
    };

    const handleRemoveSubtask = (id: string) => {
        const index = subtaskIds.indexOf(id);

        if (index === -1) return;

        const newSubtaskIds = subtaskIds.filter(
            (subtaskId) => subtaskId !== id,
        );
        const newSubtasks = form.data.subtasks.filter(
            (_, subtaskIndex) => subtaskIndex !== index,
        );

        setSubtaskIds(newSubtaskIds);
        form.setData('subtasks', newSubtasks);
        form.clearErrors();
    };

    const isTitleInvalid = !form.data.title.trim();
    const hasEmptySubtasks = form.data.subtasks.some((s) => !s.trim());

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        setSubmitted(true);

        if (!activeBoard) return;

        if (isTitleInvalid || hasEmptySubtasks) return;

        form.post(store({ board: activeBoard.id }).url, {
            onSuccess: () => {
                handleClose();
            },
        });
    };

    return (
        <Modal title="Add New Task" isOpen={isOpen} onClose={handleClose}>
            <form onSubmit={handleSubmit} className="modalForm">
                <FormField
                    label="Title"
                    labelName="title"
                    error={form.errors.title}
                    inputProps={{
                        value: form.data.title,
                        placeholder: 'e.g. Take coffee break',
                        onChange: handleTitleChange,
                        disabled: form.processing,
                    }}
                />

                <FormField
                    label="Description"
                    labelName="description"
                    error={form.errors.description}
                    isTextArea
                    textAreaProps={{
                        value: form.data.description,
                        placeholder:
                            "e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little.",
                        onChange: handleDescriptionChange,
                        rows: 4,
                        disabled: form.processing,
                    }}
                />

                <DynamicInputList
                    label="Subtasks"
                    addButtonText="+ Add New Subtask"
                    items={items}
                    errors={form.errors}
                    submitted={submitted}
                    onChange={handleUpdateSubtask}
                    onRemove={handleRemoveSubtask}
                    onAdd={handleAddSubtask}
                    maxItems={10}
                    disabled={form.processing}
                    fieldName="subtasks"
                />

                <div className="formControl">
                    <label htmlFor="status" className="formLabel">
                        Status
                    </label>

                    <StatusDropDown
                        value={selectedColumn?.name ?? ''}
                        options={columns}
                        onChange={(columnId) => {
                            form.setData('column_id', columnId);
                        }}
                        disabled={form.processing}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btnPrimary"
                    disabled={form.processing}
                >
                    {form.processing ? 'Creating...' : 'Create Task'}
                </button>
            </form>
        </Modal>
    );
}
