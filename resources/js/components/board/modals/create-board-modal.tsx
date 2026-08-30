import { useState } from 'react';
import Modal from '@/components/ui/modal';
import FormField from '@/components/ui/form-field';
import DynamicInputList, {
    type DynamicItem,
} from '@/components/ui/dynamic-input-list';

export default function NewBoardModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [columns, setColumns] = useState<DynamicItem[]>([
        { id: crypto.randomUUID(), value: 'Todo' },
        { id: crypto.randomUUID(), value: 'Doing' },
    ]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        if (!name.trim() || columns.some((c) => !c.value.trim())) return;

        // Dispatch action
        onClose();
    };

    return (
        <Modal title="Add New Board" isOpen={isOpen} onClose={onClose}>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-[1.2rem]"
            >
                <FormField
                    label="Board Name"
                    error={
                        submitted && !name.trim() ? "Can't be empty" : undefined
                    }
                    inputProps={{
                        value: name,
                        placeholder: 'e.g. Web Design',
                        onChange: (e) => setName(e.target.value),
                    }}
                />

                <DynamicInputList
                    label="Board Columns"
                    addButtonText="+ Add New Column"
                    items={columns}
                    submitted={submitted}
                    onChange={(id, val) =>
                        setColumns((prev) =>
                            prev.map((c) =>
                                c.id === id ? { ...c, value: val } : c,
                            ),
                        )
                    }
                    onRemove={(id) =>
                        setColumns((prev) => prev.filter((c) => c.id !== id))
                    }
                    onAdd={() =>
                        setColumns((prev) => [
                            ...prev,
                            { id: crypto.randomUUID(), value: '' },
                        ])
                    }
                />

                <button
                    type="submit"
                    className="bg-main-purple hover:bg-purple-hover mt-[1rem] w-full cursor-pointer rounded-[2rem] py-[1.2rem] text-[1.3rem] font-bold text-white transition-colors"
                >
                    Create New Board
                </button>
            </form>
        </Modal>
    );
}
