import * as nodemailer from "nodemailer";
import ENV from "../validations/env.validation.js";

const transporter = nodemailer.createTransport({
    host: ENV.SMTP_HOST,
    port: parseInt(ENV.SMTP_PORT || '587'),
    secure: ENV.SMTP_PORT === '465',
    auth: {
        user: ENV.SMTP_USER,
        pass: ENV.SMTP_PASS
    }
});

export default transporter;