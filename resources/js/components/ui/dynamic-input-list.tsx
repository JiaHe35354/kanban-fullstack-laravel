import IconCross from '@/components/icons/icon-cross';

export interface DynamicItem {
    id: string;
    value: string;
}

interface DynamicInputListProps {
    label: string;
    addButtonText: string;
    items: DynamicItem[];
    onChange: (id: string, value: string) => void;
    onRemove: (id: string) => void;
    onAdd: () => void;
    maxItems?: number;
    disabled?: boolean;
    submitted?: boolean;
}

export default function DynamicInputList({
    label,
    addButtonText,
    items,
    onChange,
    onRemove,
    onAdd,
    maxItems = 5,
    disabled = false,
    submitted = false,
}: DynamicInputListProps) {
    return (
        <div className="formControl">
            <label className="formLabel">{label}</label>

            <div className="rowsWrapper">
                {items.map((item) => {
                    const isInvalid = submitted && !item.value.trim();

                    return (
                        <div key={item.id} className="formRow">
                            <div className="inputWrapper">
                                <input
                                    type="text"
                                    value={item.value}
                                    disabled={disabled}
                                    onChange={(e) =>
                                        onChange(item.id, e.target.value)
                                    }
                                    className={`formInput ${
                                        isInvalid ? 'inputError' : ''
                                    }`}
                                />
                                {isInvalid && (
                                    <p className="errorText">Can't be empty</p>
                                )}
                            </div>

                            {items.length > 1 && (
                                <button
                                    type="button"
                                    disabled={disabled}
                                    onClick={() => onRemove(item.id)}
                                    className={`formCloseBtn ${isInvalid ? 'formErrorBtn' : ''}`}
                                >
                                    <IconCross />
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {items.length < maxItems && (
                <button
                    type="button"
                    disabled={disabled}
                    onClick={onAdd}
                    className="btn btnSecondary"
                >
                    {addButtonText}
                </button>
            )}
        </div>
    );
}
