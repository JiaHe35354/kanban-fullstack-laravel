import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';

import Modal from '@/components/ui/modal';
import FormField from '@/components/ui/form-field';
import DynamicInputList, {
    type DynamicItem,
} from '@/components/ui/dynamic-input-list';
import StatusDropDown from '@/components/ui/status-drop-down';
import { useBoard } from '@/contexts/board-context';
import type { ModalProps } from '@/types';
import { useTaskModal } from '@/contexts/task-modal-context';
import { update } from '@/actions/App/Http/Controllers/TaskController';

interface TaskSubtaskForm {
    id: string;
    title: string;
}

interface EditTaskForm {
    title: string;
    description: string;
    column_id: number;
    subtasks: TaskSubtaskForm[];
}

export default function EditTaskModal({ isOpen, onClose }: ModalProps) {
    const { activeTask } = useTaskModal();
    const { activeBoard } = useBoard();

    const columns = activeBoard?.columns ?? [];

    const [submitted, setSubmitted] = useState(false);

    const form = useForm<EditTaskForm>({
        title: '',
        description: '',
        column_id: 0,
        subtasks: [],
    });

    const items: DynamicItem[] = form.data.subtasks.map((subtask) => ({
        id: subtask.id,
        value: subtask.title,
    }));

    // Populate initial state whenever the selected task changes
    useEffect(() => {
        if (!isOpen || !activeTask) return;

        form.setData({
            title: activeTask.title,
            description: activeTask.description,
            column_id: activeTask.column_id,
            subtasks: activeTask.subtasks?.map((subtask) => ({
                id: String(subtask.id),
                title: subtask.title,
            })),
        });

        setSubmitted(false);
        form.clearErrors();
    }, [isOpen, activeTask]);

    if (!activeTask) return null;

    const isTitleEmpty = !form.data.title.trim();
    const hasEmptySubtasks = form.data.subtasks.some((s) => !s.title.trim());

    // Check if form contents have actually changed from the original task state
    const isTitleChanged = form.data.title !== activeTask.title;

    const isDescriptionChanged =
        form.data.description !== (activeTask.description ?? '');

    const isStatusChanged = form.data.column_id !== activeTask.column_id;

    const originalSubtasks = activeTask.subtasks;

    const areSubtasksChanged =
        form.data.subtasks.length !== originalSubtasks?.length ||
        form.data.subtasks.some((subtask, index) => {
            const original = originalSubtasks[index];

            return (
                String(original?.id) !== subtask.id ||
                subtask.title !== original?.title
            );
        });

    const isDataChanged =
        isTitleChanged ||
        isDescriptionChanged ||
        isStatusChanged ||
        areSubtasksChanged;

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        form.setData('title', e.target.value);
        form.clearErrors('title');
        setSubmitted(false);
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        form.setData('description', e.target.value);
        form.clearErrors('description');
    };

    const handleAddSubtask = () => {
        form.setData('subtasks', [
            ...form.data.subtasks,
            {
                id: crypto.randomUUID(),
                title: '',
            },
        ]);

        setSubmitted(false);
    };

    const handleUpdateSubtask = (id: string, value: string) => {
        const subtasks = form.data.subtasks.map((subtask) =>
            subtask.id === id ? { ...subtask, title: value } : subtask,
        );

        form.setData('subtasks', subtasks);
        form.clearErrors();

        setSubmitted(false);
    };

    const handleRemoveSubtask = (id: string) => {
        form.setData(
            'subtasks',
            form.data.subtasks.filter((subtask) => subtask.id !== id),
        );

        form.clearErrors();
        setSubmitted(false);
    };

    const handleClose = () => {
        if (form.processing) return;

        form.clearErrors();
        setSubmitted(false);

        onClose();
    };

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        setSubmitted(true);

        if (!activeBoard || isTitleEmpty || hasEmptySubtasks) return;

        form.put(
            update({
                board: activeBoard.id,
                task: activeTask.id,
            }).url,
            {
                onSuccess: () => {
                    onClose();
                },
            },
        );
    };

    const selectedColumn = columns.find(
        (column) => column.id === form.data.column_id,
    );

    return (
        <Modal
            title="Edit Task"
            isOpen={isOpen}
            onClose={handleClose}
            isLoading={form.processing}
        >
            <form onSubmit={handleSubmit} className="modalForm">
                <FormField
                    label="Title"
                    labelName="title"
                    error={
                        form.errors.title ||
                        (submitted && isTitleEmpty
                            ? 'The title field is required.'
                            : null)
                    }
                    inputProps={{
                        type: 'text',
                        value: form.data.title,
                        onChange: handleTitleChange,
                        disabled: form.processing,
                    }}
                />

                <FormField
                    label="Description"
                    labelName="description"
                    isTextArea
                    error={form.errors.description}
                    textAreaProps={{
                        value: form.data.description,
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
                    fieldName="subtasks"
                    submitted={submitted}
                    onChange={handleUpdateSubtask}
                    onRemove={handleRemoveSubtask}
                    onAdd={handleAddSubtask}
                    maxItems={10}
                    disabled={form.processing}
                />

                <div className="formControl">
                    <label className="formLabel">Status</label>

                    <StatusDropDown
                        value={selectedColumn?.name ?? ''}
                        options={columns.map((col) => ({
                            id: col.id,
                            name: col.name,
                        }))}
                        onChange={(columnId) =>
                            form.setData('column_id', columnId)
                        }
                        disabled={form.processing}
                    />
                </div>

                <button
                    type="submit"
                    disabled={!isDataChanged || form.processing}
                    className="btn btnPrimary"
                >
                    {form.processing ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </Modal>
    );
}
