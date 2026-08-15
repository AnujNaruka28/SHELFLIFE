import CommonMailTemplate from "../emails/CommonMailTemplate.js";
import { MailSenderOptions } from "./MailSenderOptions.js";
import ENV from "../validations/env.validation.js";
import transporter from "../config/nodemailer.js";


async function mailSender(options: MailSenderOptions) {
    try {
        console.log('Email config check:', {
            host: ENV.SMTP_HOST,
            port: ENV.SMTP_PORT,
            user: ENV.SMTP_USER,
            from: ENV.SMTP_FROM
        });

        const htmlContent = CommonMailTemplate({
            isVerification: options.isVerification || false,
            otp: options.otp,
            householdName: options.householdName,
            dailyDigest: options.dailyDigest || false,
            items: options.items,
        });

        const subject = options.subject || (options.isVerification ? "Verify your ShelfLife account" : "ShelfLife Daily Reminder");

        console.log('Sending emails to:', options.emails);

        for (const email of options.emails) {
            try {
                const info = await transporter.sendMail({
                    from: ENV.SMTP_FROM,
                    to: email,
                    subject: subject,
                    html: htmlContent,
                });
                console.log('Email sent successfully to:', email, 'Response:', info.messageId);
            } catch (emailError) {
                console.error('Failed to send email to:', email, 'Error:', emailError);
                throw emailError;
            }
        }

        console.log('All emails sent successfully');
        return { success: true, message: "Emails sent successfully" };
    } catch (err) {
        console.error("Error sending emails:", err);
        return { success: false, message: "Failed to send emails", error: err };
    }
}

export default mailSender;