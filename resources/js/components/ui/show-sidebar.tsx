import IconShowSidebar from '@/components/icons/icon-show-sidebar';

interface ShowSidebarProps {
    onShowSidebar: () => void;
}

export default function ShowSidebar({ onShowSidebar }: ShowSidebarProps) {
    return (
        <button className="showBtn hidden tb:block" onClick={onShowSidebar}>
            <IconShowSidebar className="absolute top-1/2 left-1/2 -translate-1/2 text-white" />
        </button>
    );
}
