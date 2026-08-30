import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import IconCross from '@/components/icons/icon-cross';

interface ModalProps {
    title?: string;
    isOpen: boolean;
    onClose: () => void;
    isLoading?: boolean;
    children: ReactNode;
}

const Modal = forwardRef<{ showModal: () => void; close: () => void }, ModalProps>(
    function Modal({ title, isOpen, onClose, isLoading = false, children }, ref) {
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

        useImperativeHandle(ref, () => ({
            showModal: () => dialogRef.current?.showModal(),
            close: () => dialogRef.current?.close(),
        }));

        const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
            if (isLoading) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const isInDialog =
                rect.top <= e.clientY &&
                e.clientY <= rect.top + rect.height &&
                rect.left <= e.clientX &&
                e.clientX <= rect.left + rect.width;

            if (!isInDialog) {
                onClose();
            }
        };

        if (!mounted) return null;
        const modalRoot = document.getElementById('modal-root');
        if (!modalRoot) return null;

        return createPortal(
            <dialog
                ref={dialogRef}
                className="relative mx-auto w-[48rem] max-w-[90%] border-none rounded-[0.8rem] bg-background p-[2rem_2.2rem] tb:p-[3.5rem_3rem] backdrop:bg-black/50"
                onClick={handleBackdropClick}
                onCancel={(e) => {
                    if (isLoading) e.preventDefault();
                    else onClose();
                }}
            >
                {title && (
                    <div className="flex items-center justify-between mb-[2.4rem]">
                        <h3 className="text-[1.8rem] font-bold text-main">{title}</h3>
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={onClose}
                            className="tb:hidden text-muted hover:text-main cursor-pointer"
                            aria-label="Close modal"
                        >
                            <IconCross className="size-[1.5rem]" />
                        </button>
                    </div>
                )}
                {children}
            </dialog>,
            modalRoot
        );
    }
);

export default Modal;