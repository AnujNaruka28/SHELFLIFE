import { Router } from "express";
import {
    createHousehold,
    existingHousehold,
    getHouseholdMembers,
    joinHousehold,
    leaveHouseholdController,
} from "../controllers/household.js";
import { auth } from "../middlewares/AUTH.js";
import {
    houseHoldMembersParamsSchema,
    householdSchema,
    joinHouseHoldSchema,
} from "../validations/household.validation.js";
import validate from "../middlewares/validate.js";

const householdRouter = Router();

householdRouter.post("/households", auth, validate(householdSchema), createHousehold);
householdRouter.post("/households/join", auth, validate(joinHouseHoldSchema), joinHousehold);
householdRouter.post("/households/leave", auth, leaveHouseholdController);
householdRouter.get("/households/me", auth, existingHousehold);
householdRouter.get(
    "/households/:id/members",
    auth,
    validate(houseHoldMembersParamsSchema, "params"),
    getHouseholdMembers,
);

export default householdRouter;
