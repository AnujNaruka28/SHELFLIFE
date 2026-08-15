export interface MailSenderOptions {
    emails: string[];
    otp?: number;
    householdName?: string;
    items?: Array<{
        name: string;
        quantity: number;
        category: string;
        expiryDate: Date;
    }>;
    isVerification?: boolean;
    dailyDigest?: boolean;
    subject?: string;
}