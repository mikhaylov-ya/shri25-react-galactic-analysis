export type ButtonProps = {
    color: "green" | "black" | "orange" | "lightgreen" | "purple";
    label: string;
    disabled?: boolean;
    loading?: boolean;
    onClick: (() => Promise<void>) | (() => void);
    revert?: () => void;
}
