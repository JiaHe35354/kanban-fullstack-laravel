import { useTaskModal } from '@/contexts/task-modal-context';
import TaskDetailsModal from './task-details-modal';
import DeleteTaskModal from './delete-task-modal';
import EditTaskModal from './edit-task-modal';

export default function TaskModalsHost() {
    const { activeModal, closeTaskModal } = useTaskModal();

    return (
        <>
            <TaskDetailsModal
                isOpen={activeModal === 'details'}
                onClose={closeTaskModal}
            />

            <EditTaskModal
                isOpen={activeModal === 'edit'}
                onClose={closeTaskModal}
            />

            <DeleteTaskModal
                isOpen={activeModal === 'delete'}
                onClose={closeTaskModal}
            />
        </>
    );
}
