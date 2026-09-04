import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface FormFieldProps {
    label: string;
    labelName: string;
    error?: string | boolean | null;
    isTextArea?: boolean;
    inputProps?: InputHTMLAttributes<HTMLInputElement>;
    textAreaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export default function FormField({
    label,
    labelName,
    error,
    isTextArea = false,
    inputProps,
    textAreaProps,
}: FormFieldProps) {
    return (
        <div className="formControl">
            <label className="formLabel" htmlFor={labelName}>
                {label}
            </label>

            <div className="inputWrapper">
                {isTextArea ? (
                    <textarea
                        className={`formTextarea ${error ? 'inputError' : ''}`}
                        id={labelName}
                        name={labelName}
                        {...textAreaProps}
                    />
                ) : (
                    <input
                        className={`formInput ${error ? 'inputError' : ''}`}
                        id={labelName}
                        name={labelName}
                        {...inputProps}
                    />
                )}

                {typeof error === 'string' && error !== '' && (
                    <p className="errorText">{error}</p>
                )}
            </div>
        </div>
    );
}
