import type { Request, Response } from "express";
import type { CustomRequest } from "../types/CustomRequest.ts";
import { getAllItemsByHouseholdId, getItemsByHouseholdIdExpiringIn24hours, getUsersRankings } from "../services/dashboard.service.js";
import { badRequest, error, noContent, success } from "../utils/response.js";

const stats = async (req: Request, res: Response) => {
    const householdId = (req as CustomRequest).user?.householdId;
    if (!householdId) return badRequest(res, "No house exists for current user.");

    let allItems: Awaited<ReturnType<typeof getAllItemsByHouseholdId>>;
    try {
        allItems = await getAllItemsByHouseholdId(householdId);
    } catch (err) {
        return error(res, "Failed to fetch items by household id.", err);
    }

    const statsCounts = {
        fresh: 0,
        expiring: 0,
        expired: 0,
        wasted: 0,
        used: 0,
    };

    const statsMap: Record<string, keyof typeof statsCounts> = {
        fresh: "fresh",
        "expiring-soon": "expiring",
        expired: "expired",
        wasted: "wasted",
        used: "used",
    };

    allItems.forEach((item) => {
        const key = statsMap[item.status];
        if (key) statsCounts[key]++;
    });

    return success(res, "Stats fetched successfully.", {
        totalItems: allItems.length,
        wasteScore:
            allItems.length === 0 ? 0 : (statsCounts.wasted / allItems.length) * 100,
        ...statsCounts,
    });
};

const expiring = async (req: Request, res: Response) => {
    const householdId = (req as CustomRequest).user?.householdId;

    if (!householdId) return badRequest(res, "No house exists for current user.");

    let itemsExpiring: Awaited<ReturnType<typeof getItemsByHouseholdIdExpiringIn24hours>>;
    try {
        itemsExpiring = await getItemsByHouseholdIdExpiringIn24hours(householdId);
    } catch (err) {
        return error(res, "Failed to fetch expiring items.", err);
    }

    if (itemsExpiring.length === 0) return noContent(res);

    return success(res, "Expiring Items Fetched Successfully.", itemsExpiring);
};

const leaderboard = async (req: Request, res: Response) => {
        
    const householdId = (req as CustomRequest).user?.householdId;

    if (!householdId) return badRequest(res, "No house exists for current user.");
    
    let leaderboardData: Awaited<ReturnType<typeof getUsersRankings>>;
    try {
        leaderboardData = await getUsersRankings(householdId);
    } catch (err) {
        return error(res, "Failed to fetch leaderboard data.", err);
    }

    if (leaderboardData.length === 0) return noContent(res);

    return success(res, "Leaderboard Data Fetched Successfully.", leaderboardData);

}

export { stats, expiring, leaderboard };
