import CommonMailTemplate from "../emails/CommonMailTemplate.js";
import { MailSenderOptions } from "./MailSenderOptions.js";
import ENV from "../validations/env.validation.js";
import transporter from "../config/nodemailer.js";


async function mailSender(options: MailSenderOptions) {
    try {
        const htmlContent = CommonMailTemplate({
            isVerification: options.isVerification || false,
            otp: options.otp,
            householdName: options.householdName,
            dailyDigest: options.dailyDigest || false,
            items: options.items,
        });

        const subject = options.subject || (options.isVerification ? "Verify your ShelfLife account" : "ShelfLife Daily Reminder");

        const emailPromises = options.emails.map(email =>
            transporter.sendMail({
                from: ENV.SMTP_FROM,
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