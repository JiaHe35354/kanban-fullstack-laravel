import { useEffect, useState } from 'react';
import type { DynamicItem } from '@/components/ui/dynamic-input-list';

interface BoardColumn {
    id: number | string;
    name: string;
}

export function useBoardColumns(columns: BoardColumn[] = [], isOpen = false) {
    const [items, setItems] = useState<DynamicItem[]>([]);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        setItems(
            columns.map((column) => ({
                id: String(column.id),
                value: column.name,
            })),
        );

        setSubmitted(false);
    }, [isOpen, columns]);

    const hasEmptyColumns = items.some((item) => !item.value.trim());

    const areColumnsChanged =
        items.length !== columns.length ||
        items.some((item, index) => {
            const original = columns[index];

            return item.value.trim() !== original?.name;
        });

    const addColumn = () => {
        setItems((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                value: '',
            },
        ]);

        setSubmitted(false);
    };

    const updateColumn = (id: string, value: string) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, value } : item)),
        );

        setSubmitted(false);
    };

    const removeColumn = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));

        setSubmitted(false);
    };

    const resetColumns = () => {
        setItems(
            columns.map((column) => ({
                id: String(column.id),
                value: column.name,
            })),
        );

        setSubmitted(false);
    };

    const submit = () => {
        setSubmitted(true);

        return !hasEmptyColumns;
    };

    return {
        items,
        submitted,
        hasEmptyColumns,
        areColumnsChanged,
        addColumn,
        updateColumn,
        removeColumn,
        resetColumns,
        submit,
    };
}
