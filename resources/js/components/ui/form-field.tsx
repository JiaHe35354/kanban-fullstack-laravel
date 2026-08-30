import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface FormFieldProps {
    label: string;
    error?: string | boolean;
    isTextArea?: boolean;
    inputProps?: InputHTMLAttributes<HTMLInputElement>;
    textAreaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export default function FormField({
    label,
    error,
    isTextArea = false,
    inputProps,
    textAreaProps,
}: FormFieldProps) {
    const inputStyles = `w-full rounded-[0.5rem] border-[1.6px] border-solid bg-background px-[1.5rem] py-[0.6rem] font-inherit text-[1.3rem] font-medium leading-[1.9] text-main cursor-pointer transition-all placeholder:opacity-50 hover:border-main-purple focus:border-main-purple focus:outline-main-purple ${
        error ? 'border-red' : 'border-[var(--medium-grey-25)]'
    }`;

    return (
        <div className="formControl">
            <label className="formLabel">{label}</label>

            <div className="inputWrapper">
                {isTextArea ? (
                    <textarea className="formTextarea" {...textAreaProps} />
                ) : (
                    <input className="formInput" {...inputProps} />
                )}
                {/* {typeof error === 'string' && error && (
                    <p className="pointer-events-none absolute top-1/2 right-[1.2rem] -translate-y-1/2 text-[1.3rem] text-red">
                        {error}
                    </p>
                )} */}
            </div>
        </div>
    );
}
