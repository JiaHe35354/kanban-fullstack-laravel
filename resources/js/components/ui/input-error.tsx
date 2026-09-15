interface InputErrorProps {
    message?: string;
}

export default function InputError({ message }: InputErrorProps) {
    if (!message) return null;

    return <p className="mt-2 text-[1.3rem] text-red">{message}</p>;
}
