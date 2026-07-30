import type { NextFunction, Request, Response } from "express";
import { deleteItemById, findItems, saveItem, updateItemById, updateItemStatusById, updateWasteScoreByHouseholdId, checkItemIsValid } from "../services/item.service.js";
import { badRequest, error, noContent, success } from "../utils/response.js";
import type { CustomRequest } from "../types/CustomRequest.ts";

const computeItemStatus = (expiryDate: Date | string): "expired" | "expiring-soon" | "fresh" => {
    const expiryTimestamp = new Date(expiryDate);
    const now = new Date();
    const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

    if (now > expiryTimestamp) return "expired";
    if (expiryTimestamp <= threeDaysLater) return "expiring-soon";
    return "fresh";
};

const getItems = async (req: Request, res: Response, next: NextFunction) => {
    const { category, status, page, limit } = req.query as { category?: string; status?: string; page?: string; limit?: string };
    const householdId = (req as CustomRequest).user?.householdId;

    if (!householdId) return badRequest(res, "User must belong to a household.");

    const filters: Record<string, string> = {};

    if (category) filters.category = category;
    if (status) filters.status = status;

    const pageInt = parseInt(page || "1");
    const limitInt = parseInt(limit || "10");

    const itemsFiltered = await findItems(householdId, filters, pageInt, limitInt);

    if (itemsFiltered instanceof Error) return next(itemsFiltered);
    if (itemsFiltered.items.length === 0) return noContent(res);

    return success(res, "Items Fetched Successfully.", {
        data: itemsFiltered.items,
        total: itemsFiltered.total,
        page: pageInt,
        pages: Math.ceil(itemsFiltered.total / limitInt),
    });
};

const createItem = async (req: Request, res: Response, next: NextFunction) => {
    const { name, quantity, category, expiryDate } = req.body;

    const addedBy = (req as CustomRequest).user?._id;
    const householdId = (req as CustomRequest).user?.householdId;

    if (!addedBy) return badRequest(res, "User not found.");
    if (!householdId) return badRequest(res, "User must belong to a household to add items.");

    const item = {
        name,
        quantity,
        category,
        expiryDate,
        householdId,
        status: computeItemStatus(expiryDate),
        addedBy,
    };

    const savedItem = await saveItem(item);

    if (savedItem instanceof Error) return next(savedItem);

    return success(res, "Item Created Successfully.", savedItem);
};

const updateItem = async (req: Request, res: Response, next: NextFunction) => {
    const { name, quantity, category, expiryDate } = req.body;
    const id = req.params.id;
    const updatedBy = (req as CustomRequest).user?._id;

    const isItemValid = await checkItemIsValid(id as string);
    if (!isItemValid) return error(res, "Item is either used, wasted or expired.");

    const updatedItem = await updateItemById(id as string, {
        name,
        quantity,
        category,
        expiryDate,
        updatedBy,
    });

    if (updatedItem instanceof Error) return next(updatedItem);
    if (!updatedItem) return error(res, "Item not found.");

    return success(res, "Item updated successfully.", updatedItem);
};

const deleteItem = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    if (await deleteItemById(id)) return noContent(res);

    return error(res, "Failed to delete Item");
};

const updateItemStatus = async (req: Request, res: Response, next: NextFunction) => {
    const { status } = req.body;
    const itemId = req.params.id as string;
    const updatedBy = (req as CustomRequest).user?._id;

    if (!updatedBy) return badRequest(res, "User not found.");

    const updatedItem = await updateItemStatusById(itemId, status, updatedBy);

    if (updatedItem instanceof Error) return next(updatedItem);
    if (!updatedItem) return error(res, "Item not found.");

    await updateWasteScoreByHouseholdId(updatedItem.householdId);
    return success(res, "Item use status updated successfully.", updatedItem);
};

export { getItems, createItem, updateItem, deleteItem, updateItemStatus };
