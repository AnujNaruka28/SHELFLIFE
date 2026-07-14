interface MailPropType {
    otp?: number;
    items?: Item[];
    householdName?: string;
    isVerification?: boolean;
    dailyDigest?: boolean;
}

interface Item {
    name: string;
    quantity: number;
    category: string;
    expiryDate: Date;
}

function CommonMailTemplate(MailProps: MailPropType): string {
    const logoHtml = `
        <div style="text-align: center;">
            <div style="font-size: 36px; font-weight: bold; margin-bottom: 10px;">
                <span style="color: #ffb300;">Shelf</span><span style="color: #0074ff;">Life</span>
            </div>
            <div style="font-size: 12px; color: #666; letter-spacing: 2px; text-transform: uppercase;">
                Track Your Food, Reduce Waste
            </div>
        </div>
    `;

    let itemsTableHtml = '';
    if (MailProps.dailyDigest && MailProps.items && MailProps.items.length > 0) {
        const rows = MailProps.items.map((item, index) => {
            const bgColor = index % 2 === 0 ? '#f9f9f9' : 'white';
            return `
                <tr style="background-color: ${bgColor};">
                    <td style="padding: 12px; border: 1px solid #ddd;">${item.name}</td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">${item.quantity}</td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">${item.category}</td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">${new Date(item.expiryDate).toLocaleDateString()}</td>
                </tr>
            `;
        }).join('');

        itemsTableHtml = `
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-family: Arial, sans-serif;">
                <thead>
                    <tr style="background-color: #0074ff; color: white;">
                        <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Item Name</th>
                        <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">Quantity</th>
                        <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">Category</th>
                        <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">Expiry Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        `;
    }

    const verificationSection = MailProps.isVerification ? `
        <h1 style="color: #0074ff; font-size: 24px; margin-bottom: 20px; text-align: center;">
            WELCOME TO SHELF LIFE
        </h1>
    ` : '';

    const otpSection = (MailProps.isVerification && MailProps.otp) ? `
        <p style="font-size: 32px; font-weight: bold; color: #0074ff; text-align: center; padding: 20px; background-color: #f0f9ff; border-radius: 8px; border: 2px dashed #0074ff; letter-spacing: 8px; margin: 20px 0;">
            ${MailProps.otp}
        </p>
        <p style="font-size: 14px; color: #666; text-align: center; margin-top: 10px; margin-bottom: 0;">
            Expires in 10 minutes
        </p>
    ` : '';

    const householdNameSection = MailProps.householdName ? `
        <p style="font-size: 16px; color: #333; margin-bottom: 15px; line-height: 1.6;">
            Household Name : ${MailProps.householdName}
        </p>
    ` : '';

    const messageText = MailProps.isVerification 
        ? "Here's your verification code : " 
        : "Here's the list of items that are expiring : ";

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ShelfLife</title>
        </head>
        <body style="margin: 0; padding: 0; width: 100%; background-color: #ffffff; font-family: Arial, sans-serif;">
            <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="margin: 0; padding: 0;">
                <!-- Header with Logo -->
                <tr>
                    <td style="padding: 20px; text-align: center; background-color: #f8f9fa;">
                        ${logoHtml}
                    </td>
                </tr>
                
                <!-- Main Content -->
                <tr>
                    <td style="padding: 30px; font-family: Arial, sans-serif;">
                        <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="max-width: 600px; margin: 0 auto;">
                            <tr>
                                <td>
                                    ${verificationSection}
                                    ${householdNameSection}
                                    <p style="font-size: 16px; color: #333; margin-bottom: 15px; line-height: 1.6;">
                                        ${messageText}
                                    </p>
                                    ${otpSection}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                
                <!-- Items Table -->
                ${itemsTableHtml ? `
                <tr>
                    <td style="padding: 0 30px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="max-width: 600px; margin: 0 auto;">
                            <tr>
                                <td>
                                    ${itemsTableHtml}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                ` : ''}
                
                <!-- Footer -->
                <tr>
                    <td style="padding: 30px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="max-width: 600px; margin: 0 auto;">
                            <tr>
                                <td style="padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; font-family: Arial, sans-serif;">
                                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
                                        Best regards,
                                    </p>
                                    <p style="margin: 0 0 5px 0; font-size: 16px; font-weight: bold; color: #0074ff;">
                                        The ShelfLife Team
                                    </p>
                                    <p style="margin: 0; font-size: 12px; color: #999;">
                                        Track your food, reduce waste, save money.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;

    return html.trim();
}

export default CommonMailTemplate;
