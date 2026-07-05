import z from "zod";

const householdSchema = z.object({
    name: z.string().min(3).max(30).refine((val: string) => val.trim().length > 0, "Household name cannot be empty"),
});

const joinHouseHoldSchema = z.object({
    inviteCode: z
        .string()
        .length(6, "Invite code must be 6 characters")
        .transform((val) => val.trim().toUpperCase()),
});

const houseHoldMembersParamsSchema = z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid household id"),
});

export { householdSchema, joinHouseHoldSchema, houseHoldMembersParamsSchema };
