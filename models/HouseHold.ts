import { model, Schema } from "mongoose";
import type { IHouseHold } from "../types/HouseHolds.ts";


const HouseHoldSchema = new Schema<IHouseHold>({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        trim: true,
    },
    members: {
        type: [Schema.Types.ObjectId], 
        ref: "User",
        minlength: 1,
    },
    inviteCode: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 6,
    },
    wasteScore: {
        type: Number,
        min: 0,
        max: 100
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const HouseHold = model<IHouseHold>("HouseHold", HouseHoldSchema);

export default HouseHold;