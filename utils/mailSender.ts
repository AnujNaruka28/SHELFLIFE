import { renderToString } from "react-dom/server";
import React from "react";
import CommonMailTemplate from "../emails/CommonMailTemplate.js";
import { Resend } from "resend";
import ENV from "../validations/env.validation.js";

const resend = new Resend(ENV.RESEND_API_KEY);

interface MailSenderOptions {
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

async function mailSender(options: MailSenderOptions) {
    try {
        const htmlContent = renderToString(
            React.createElement(CommonMailTemplate, {
                isVerification: options.isVerification || false,
                otp: options.otp,
                householdName: options.householdName,
                dailyDigest: options.dailyDigest || false,
                items: options.items,
            })
        );

        const subject = options.subject || (options.isVerification ? "Verify your ShelfLife account" : "ShelfLife Daily Reminder");

        const emailPromises = options.emails.map(email =>
            resend.emails.send({
                from: "ShelfLife <shelflife.eco@gmail.com>",
                to: email,
                subject: subject,
                html: htmlContent,
            })
        );

        await Promise.all(emailPromises);
        
        return { success: true, message: "Emails sent successfully" };
    } catch (err) {
        console.error("Error sending emails:", err);
        return { success: false, message: "Failed to send emails", error: err };
    }
}

export default mailSender;