// @ts-ignore
import nodemailer from "nodemailer";
import ENV from "../validations/env.validation.js";

const transporter = nodemailer.createTransport({
    host: ENV.SMTP_HOST,
    port: parseInt(ENV.SMTP_PORT || '587'),
    secure: ENV.SMTP_PORT === '465',
    auth: {
        user: ENV.SMTP_USER,
        pass: ENV.SMTP_PASS
    },
    tls: {
        rejectUnauthorized: false // Allow self-signed certificates
    },
    connectionTimeout: 30000, // 30 seconds
    greetingTimeout: 10000,   // 10 seconds
    socketTimeout: 10000      // 10 seconds
});

export default transporter;