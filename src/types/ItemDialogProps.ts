import type { Item } from "./Item";
import type { ItemFormValue } from "./ItemFormValue";

export interface ItemDialogProps {
    title: string;
    children: React.ReactNode;
    mode: 'create' | 'edit';
    onSuccess?: () => void;
    item?: Item;
    initialData?: ItemFormValue | null;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}