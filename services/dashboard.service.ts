import type { Types } from "mongoose";
import Item from "../models/Item.js";

const getItemsByHouseholdIdExpiringIn24hours = async (houseId: Types.ObjectId) => {

    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const items = await Item.find({
        householdId: houseId,
        expiryDate: {
            $gte: now,
            $lte: tomorrow,
        },
        status: { $nin: ["wasted", "used"] }
    }).populate("addedBy updatedBy", "name email");

    return items;
}

const getAllItemsByHouseholdId = async (houseId: Types.ObjectId) => {

    const allItems = await Item.find({
        householdId: houseId
    }).populate("addedBy updatedBy", "name email");

    return allItems;
 
}

const getUsersRankings = async (houseId: Types.ObjectId) => {
    
    const items = Item.aggregate([

        {
            $match: {
                householdId: houseId
            },
        },

        {
            $group: {
                _id: "$usedBy",
                useScore: {
                    $sum: {
                        $cond: [
                            {
                                $ne: ["$usedBy", null]
                            },
                            1,
                            0
                        ]
                    }
                },
                wasteScore: {
                    $sum : {
                        $cond: [
                            {
                                $ne: ["$wastedBy", null]
                            },
                            1,
                            0
                        ]
                    }
                }
            }
        },
        
        {
            $addFields: {
                score: {
                    $subtract: ["$useScore", "$wasteScore"]
                }
            }
        },

        {
            $match: {
                _id: { $ne: null }
            }
        },
        
        {
            $sort: {
                score: -1
            }
        },

        {
            $setWindowFields: {
                sortBy: {
                    score: -1
                },
                output: {
                    rank: {
                        $rank: {}
                    }
                }
            }
        },

        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "user"
            }
        },

        {
            $project: {
                userId: "$_id",
                userName: { $arrayElemAt: ["$user.name", 0] },
                avatarUrl: { $arrayElemAt: ["$user.profileImage.secure_url", 0] },
                useScore: 1,
                wasteScore: 1,
                score: 1,
                rank: 1
            }
        }

    ])
    
    return items;
}

const getNotifications = async (houseId: Types.ObjectId) => {

    const itemsExpired = await Item.find({
        householdId: houseId,
        status: "expired"
    });

    return itemsExpired;
    
}

export {
    getItemsByHouseholdIdExpiringIn24hours,
    getAllItemsByHouseholdId,
    getUsersRankings,
    getNotifications
}
