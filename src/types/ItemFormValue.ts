export interface ItemFormValue {
    name: string;
    category: "produce" | "dairy" | "meat" | "pantry" | "frozen" | "other";
    expiryDate: string;
    quantity: number;
    barcode?: string;
}