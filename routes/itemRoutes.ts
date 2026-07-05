import { Router } from "express";
import { createItem, deleteItem, getItems, updateItem, updateItemStatus } from "../controllers/item.js";
import { auth, canModifyItem } from "../middlewares/AUTH.js";
import validate from "../middlewares/validate.js";
import {
    getItemsQuerySchema,
    itemParamsSchema,
    itemSchema,
    updateItemSchema,
    updateItemStatusSchema,
} from "../validations/item.validation.js";

const itemRouter = Router();

itemRouter.get("/items", auth, validate(getItemsQuerySchema, "query"), getItems);
itemRouter.post("/items", auth, validate(itemSchema), createItem);
itemRouter.put("/items/:id", auth, validate(itemParamsSchema, "params"), canModifyItem, validate(updateItemSchema), updateItem);
itemRouter.delete("/items/:id", auth, validate(itemParamsSchema, "params"), canModifyItem, deleteItem);
itemRouter.patch(
    "/items/:id/status",
    auth,
    validate(itemParamsSchema, "params"),
    canModifyItem,
    validate(updateItemStatusSchema),
    updateItemStatus,
);

export default itemRouter;
