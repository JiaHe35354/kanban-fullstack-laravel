import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
    type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import IconCross from '@/components/icons/icon-cross';

interface ModalProps {
    title?: string;
    isOpen: boolean;
    onClose: () => void;
    isLoading?: boolean;
    children: ReactNode;
}

export default function Modal({
    title,
    isOpen,
    onClose,
    isLoading = false,
    children,
}: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen && !dialog.open) {
            dialog.showModal();
        } else if (!isOpen && dialog.open) {
            dialog.close();
        }
    }, [isOpen]);

    // useImperativeHandle(ref, () => ({
    //     showModal: () => dialogRef.current?.showModal(),
    //     close: () => dialogRef.current?.close(),
    // }));

    const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if (isLoading) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const isClickOutside =
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom;

        if (isClickOutside) {
            onClose();
        }
    };

    if (!mounted || !isOpen) return null;

    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return null;

    return createPortal(
        <dialog
            ref={dialogRef}
            className="modal"
            onClick={handleBackdropClick}
            onCancel={(e) => {
                isLoading ? e.preventDefault() : onClose();
            }}
        >
            {title && (
                <div className="modalHeader">
                    <h3 className="modalHeading">{title}</h3>
                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={onClose}
                        className="modalCloseBtn"
                        aria-label="Close modal"
                    >
                        <IconCross />
                    </button>
                </div>
            )}
            {children}
        </dialog>,
        modalRoot,
    );
}
