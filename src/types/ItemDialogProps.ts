import type { Item } from "./Item";

export interface ItemDialogProps {
    title: string;
    children: React.ReactNode;
    mode: 'create' | 'edit';
    onSuccess?: () => void;
    item?: Item;
}