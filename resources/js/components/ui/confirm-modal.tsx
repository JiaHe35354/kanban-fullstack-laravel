import { handleDialogBackdropClick } from '@/util/dialog';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ConfirmModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    isLoading?: boolean;
    children: ReactNode;
}

export default function ConfirmModal({
    title,
    isOpen,
    onClose,
    isLoading = false,
    children,
}: ConfirmModalProps) {
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

    if (!mounted) return null;

    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return null;

    return createPortal(
        <dialog
            ref={dialogRef}
            className="modal"
            onClick={(e) => handleDialogBackdropClick(e, onClose, isLoading)}
            onCancel={(e) => {
                isLoading ? e.preventDefault() : onClose();
            }}
        >
            <div className="modalHeader">
                <h3 className="modalHeading headingDanger">{title}</h3>
            </div>
            {children}
        </dialog>,
        modalRoot,
    );
}
