export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    householdId?: string;
    profileImage?: {
        secure_url?: string;
        public_id?: string;
    };
    role: "admin" | "member" | "user";
    createdAt: Date;
    updatedAt: Date;
}
