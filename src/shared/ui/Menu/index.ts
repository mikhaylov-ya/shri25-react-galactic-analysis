export type MenuItem = {
    id: string;
    label: string;
    onClick?: () => void;
    icon?: React.ReactNode;
}

export type MenuProps = {
    items: MenuItem[];
    itemWidth?: number;
    verticalGap?: number;
    initialTop?: number;
    className?: string;
    // Optional: Add onItemClick handler that receives the clicked item
    onItemClick?: (item: MenuItem["id"]) => void;
}