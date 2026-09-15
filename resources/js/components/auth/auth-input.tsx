import InputError from '../ui/input-error';

interface AuthInputProps {
    id: string;
    label: string;
    type?: React.HTMLInputTypeAttribute;
    autoComplete?: string;
    value: string;
    error?: string;
    onChange: (value: string) => void;
}

export default function AuthInput({
    id,
    label,
    type = 'text',
    autoComplete,
    value,
    error,
    onChange,
}: AuthInputProps) {
    return (
        <div className="formControl">
            <label htmlFor={id} className="authLabel">
                {label}
            </label>

            <input
                className="authInput"
                id={id}
                type={type}
                autoComplete={autoComplete}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />

            <InputError message={error} />
        </div>
    );
}
