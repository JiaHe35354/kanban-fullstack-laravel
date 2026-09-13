import { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';

import { useBoard } from '@/contexts/board-context';
import type { ModalProps } from '@/types';
import Modal from '@/components/ui/modal';
import IconCross from '@/components/icons/icon-cross';
import { formatName } from '@/lib/utils';
import { store } from '@/actions/App/Http/Controllers/ColumnController';

interface NewColumn {
    id: string;
    name: string;
}

export default function AddColumnModal({ isOpen, onClose }: ModalProps) {
    const form = useForm<{
        columns: NewColumn[];
    }>({
        columns: [],
    });

    const { activeBoard } = useBoard();

    const [submitted, setSubmitted] = useState(false);

    const existingColumnCount = activeBoard?.columns?.length ?? 0;
    const maxNewColumnCount = 5 - existingColumnCount;

    const canAddColumn = form.data.columns.length < maxNewColumnCount;

    const canRemoveColumn = form.data.columns.length > 1;

    useEffect(() => {
        if (!isOpen || !activeBoard) return;

        const maxNewColumns = 5 - activeBoard.columns.length;

        form.setData('columns', [
            {
                id: crypto.randomUUID(),
                name: '',
            },
        ]);

        setSubmitted(false);
        form.clearErrors();
    }, [isOpen, activeBoard]);

    const hasEmptyColumn = form.data.columns.some(
        (column) => !column.name.trim(),
    );

    const handleAddColumn = () => {
        if (!canAddColumn) return;

        form.setData('columns', [
            ...form.data.columns,
            {
                id: crypto.randomUUID(),
                name: '',
            },
        ]);

        setSubmitted(false);
    };

    const handleRemoveColumn = (id: string) => {
        if (!canRemoveColumn) return;

        form.setData(
            'columns',
            form.data.columns.filter((column) => column.id !== id),
        );

        setSubmitted(false);
    };

    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();

        setSubmitted(true);

        if (!activeBoard || hasEmptyColumn) return;

        form.post(store(activeBoard).url, {
            onSuccess: () => {
                onClose();
            },
        });
    }

    return (
        <Modal
            title="Add New Column"
            isOpen={isOpen}
            onClose={onClose}
            isLoading={form.processing}
        >
            <form onSubmit={handleSubmit} className="modalForm">
                <div className="formControl">
                    <p className="formLabel">Board Name</p>
                    <p className="mt-[0.6rem] text-[1.3rem] font-medium text-main">
                        {formatName(activeBoard.name)}
                    </p>
                </div>

                <div className="rowsWrapper">
                    <p className="formLabel">Columns</p>

                    {activeBoard?.columns?.map((column) => (
                        <div
                            key={column.id}
                            className="text-[1.3rem] font-medium text-main"
                        >
                            <input
                                type="text"
                                className="formInput cursor-not-allowed hover:border-medium-grey-25"
                                value={formatName(column.name)}
                                disabled
                            />
                        </div>
                    ))}

                    {form.data.columns.map((column) => (
                        <div key={column.id} className="formRow">
                            <div className="inputWrapper">
                                <input
                                    type="text"
                                    className="formInput"
                                    value={column.name}
                                    onChange={(e) => {
                                        form.setData(
                                            'columns',
                                            form.data.columns.map((item) =>
                                                item.id === column.id
                                                    ? {
                                                          ...item,
                                                          name: e.target.value,
                                                      }
                                                    : item,
                                            ),
                                        );

                                        setSubmitted(false);
                                    }}
                                />

                                {submitted && !column.name.trim() && (
                                    <p className="errorText">Can't be empty</p>
                                )}
                            </div>

                            {canRemoveColumn && (
                                <button
                                    type="button"
                                    className="formCloseBtn"
                                    onClick={() =>
                                        handleRemoveColumn(column.id)
                                    }
                                    disabled={form.processing}
                                >
                                    <IconCross />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {canAddColumn && (
                    <button
                        type="button"
                        className="btn btnSecondary"
                        onClick={handleAddColumn}
                        disabled={form.processing}
                    >
                        +Add New Column
                    </button>
                )}

                <button
                    type="submit"
                    className="btn btnPrimary"
                    disabled={form.processing}
                >
                    {form.processing ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </Modal>
    );
}
