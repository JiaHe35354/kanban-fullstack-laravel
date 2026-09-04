import type { MouseEvent } from 'react';

export function handleDialogBackdropClick(
    e: MouseEvent<HTMLDialogElement>,
    onClose: () => void,
    isLoading: boolean = false,
) {
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
}
