import AppLayout from '@/layouts/app-layout';
import type { board } from '@/types';

interface BoardsIndexProps {
    boards: board[];
}

export default function BoardsIndex({ boards }: BoardsIndexProps) {
    console.log(boards);

    return <AppLayout>Content</AppLayout>;
}
