import z from "zod";

const itemCategories = z.enum(["produce", "dairy", "meat", "pantry", "frozen", "other"]);
const itemStatuses = z.enum(["fresh", "expiring-soon", "expired", "used", "wasted"]);

const itemSchema = z.object({
    name: z.string().min(2).max(30).refine((val: string) => val.trim().length > 0, "Item name cannot be empty"),
    quantity: z.coerce.number().min(1),
    category: itemCategories,
    expiryDate: z.coerce.date(),
});

const updateItemSchema = z.object({
    name: z.string().min(2).max(30).optional(),
    quantity: z.coerce.number().min(1).optional(),
    category: itemCategories.optional(),
    expiryDate: z.coerce.date().optional(),
}).refine((val) => Object.keys(val).length > 0, "At least one field must be provided for updating item.");

const updateItemStatusSchema = z.object({
    status: z.enum(["used", "wasted"]),
});

const getItemsQuerySchema = z.object({
    status: itemStatuses.optional(),
    category: itemCategories.optional(),
});

const itemParamsSchema = z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid item id"),
});

export { itemSchema, updateItemSchema, updateItemStatusSchema, getItemsQuerySchema, itemParamsSchema };
