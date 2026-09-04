import React from 'react';
import { useEffect, useState } from 'react';

import Modal from '@/components/ui/modal';
import FormField from '@/components/ui/form-field';
import DynamicInputList, {
    type DynamicItem,
} from '@/components/ui/dynamic-input-list';
import { useBoard } from '@/contexts/board-context';
import StatusDropDown from '@/components/ui/status-drop-down';
import type { ModalProps } from '@/types';

export default function CreateTaskModal({ isOpen, onClose }: ModalProps) {
    const { activeBoard } = useBoard();
    const columns = activeBoard?.columns ?? [];

    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subtasks: [{ id: crypto.randomUUID(), value: '' }] as DynamicItem[],
        status: '',
    });

    // Sync initial status when activeBoard columns load or update
    useEffect(() => {
        if (columns.length > 0 && !formData.status) {
            setFormData((prev) => ({ ...prev, status: String(columns[0].id) }));
        }
    }, [columns, formData.status]);

    const isTitleInvalid = !formData.title.trim();
    const hasEmptySubtasks = formData.subtasks.some((s) => !s.value.trim());

    const resetForm = () => {
        setSubmitted(false);
        setFormData({
            title: '',
            description: '',
            subtasks: [{ id: crypto.randomUUID(), value: '' }],
            status: columns[0]?.id ? String(columns[0].id) : '',
        });
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, title: e.target.value }));
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        setFormData((prev) => ({ ...prev, description: e.target.value }));
    };

    const handleAddSubtask = () => {
        setFormData((prev) => ({
            ...prev,
            subtasks: [
                ...prev.subtasks,
                { id: crypto.randomUUID(), value: '' },
            ],
        }));
    };

    const handleUpdateSubtask = (id: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            subtasks: prev.subtasks.map((item) =>
                item.id === id ? { ...item, value } : item,
            ),
        }));
    };

    const handleRemoveSubtask = (id: string) => {
        setFormData((prev) => ({
            ...prev,
            subtasks: prev.subtasks.filter((item) => item.id !== id),
        }));
    };

    // const getErrorMessage = () => {
    //     if (!submitted) return null;

    //     if (isTitleInvalid) return "Can't be empty";

    //     // if (isDuplicate) return 'Name already used';

    //     return null;
    // };

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        setSubmitted(true);

        if (isTitleInvalid || hasEmptySubtasks) return;

        const payload = {
            title: formData.title,
            description: formData.description,
            status: formData.status,
            subtasks: formData.subtasks.map((s) => ({ title: s.value })),
        };

        // Dispatch backend action here

        handleClose();
    };

    const selectedColumn =
        columns.find((c) => String(c.id) === formData.status) || columns[0];

    return (
        <Modal title="Add New Task" isOpen={isOpen} onClose={handleClose}>
            <form onSubmit={handleSubmit} className="modalForm">
                <FormField
                    label="Title"
                    labelName="title"
                    error={
                        submitted && isTitleInvalid ? "Can't be empty" : null
                    }
                    inputProps={{
                        value: formData.title,
                        placeholder: 'e.g. Take coffee break',
                        onChange: handleTitleChange,
                    }}
                />

                <FormField
                    label="Description"
                    labelName="description"
                    isTextArea
                    // error={getErrorMessage()}
                    textAreaProps={{
                        value: formData.description,
                        placeholder:
                            "e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little.",
                        onChange: handleDescriptionChange,
                        rows: 4,
                    }}
                />

                <DynamicInputList
                    label="Subtasks"
                    addButtonText="+ Add New Subtask"
                    items={formData.subtasks}
                    submitted={submitted}
                    onChange={handleUpdateSubtask}
                    onRemove={handleRemoveSubtask}
                    onAdd={handleAddSubtask}
                />

                <div className="formControl">
                    <label className="formLabel">Status</label>

                    <StatusDropDown
                        value={selectedColumn?.name ?? ''}
                        options={columns.map((col) => ({
                            id: String(col.id),
                            name: col.name,
                        }))}
                        onChange={(statusId) =>
                            setFormData((prev) => ({
                                ...prev,
                                status: statusId,
                            }))
                        }
                    />
                </div>

                <button type="submit" className="btn btnPrimary">
                    Create Task
                </button>
            </form>
        </Modal>
    );
}
