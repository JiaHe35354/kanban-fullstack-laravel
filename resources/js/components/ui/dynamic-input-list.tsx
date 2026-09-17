import IconCross from '@/components/icons/icon-cross';
import { cn } from '@/lib/utils';

export interface DynamicItem {
    id: string;
    value: string;
}

interface DynamicInputListProps {
    label: string;
    addButtonText: string;
    items: DynamicItem[];
    errors?: Record<string, string>;
    onChange: (id: string, value: string) => void;
    onRemove: (id: string) => void;
    onAdd: () => void;
    maxItems?: number;
    disabled?: boolean;
    submitted?: boolean;
    fieldName: string;
}

export default function DynamicInputList({
    label,
    addButtonText,
    items,
    errors = {},
    fieldName,
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
                {items.map((item, index) => {
                    const localError =
                        submitted && !item.value.trim()
                            ? "Can't be empty"
                            : null;

                    const serverError = errors[`{fieldName}.${index}`];

                    const error = serverError ?? localError;
                    const isInvalid = Boolean(error);

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
                                    className={cn(
                                        'formInput',
                                        isInvalid && 'inputError',
                                    )}
                                />
                                {error && <p className="errorText">{error}</p>}
                            </div>

                            {items.length > 1 && (
                                <button
                                    type="button"
                                    disabled={disabled}
                                    onClick={() => onRemove(item.id)}
                                    className={cn(
                                        'formCloseBtn',
                                        isInvalid && 'formErrorBtn',
                                    )}
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
