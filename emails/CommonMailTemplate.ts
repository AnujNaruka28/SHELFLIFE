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
    const logoSvg = `
    <svg width="30px" height="30px" viewBox="0 0 64 64" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <defs>
                <style>.cls-1{fill:#ffb300;}.cls-2{fill:#0074ff;}</style>
            </defs>
            <title></title>
            <path class="cls-1" d="M39.25,58.57H24.75a2,2,0,0,1-2-2V40.67a2,2,0,0,1,2-2h14.5a2,2,0,0,1,2,2v15.9A2,2,0,0,1,39.25,58.57Zm-12.5-4h10.5V42.67H26.75Z"></path>
            <path class="cls-2" d="M48.41,58.57H15.59a2,2,0,0,1-2-2V30.51H5.73A2,2,0,0,1,4.48,27L30.75,5.87a2,2,0,0,1,2.5,0L59.52,27a2,2,0,0,1-1.25,3.56H50.41v9.37a2,2,0,0,1-4,0V28.51a2,2,0,0,1,2-2h4.17L32,10,11.42,26.51h4.17a2,2,0,0,1,2,2V54.57H46.41V50.76a2,2,0,1,1,4,0v5.81A2,2,0,0,1,48.41,58.57Z"></path>
        </g>
    </svg>`;

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

    const messageText = MailProps.isVerification 
        ? "Here's your verification code : " 
        : "Here's the list of items that are expiring : ";

    const html = `
        <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <header style="width: 100%; padding: 20px; text-align: center; background-color: #f8f9fa;">
                ${logoSvg}
            </header>

            <div style="padding: 30px; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                ${verificationSection}

                <p style="font-size: 16px; color: #333; margin-bottom: 15px; line-height: 1.6;">
                    Household Name : ${MailProps.householdName || ''}
                </p>

                <p style="font-size: 16px; color: #333; margin-bottom: 15px; line-height: 1.6;">
                    ${messageText}
                </p>

                ${otpSection}
            </div>

            ${itemsTableHtml}

            <div style="margin-top: 30px; padding: 20px; border-top: 2px solid #e5e7eb; text-align: center; font-family: Arial, sans-serif;">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
                    Best regards,
                </p>
                <p style="margin: 0 0 5px 0; font-size: 16px; font-weight: bold; color: #0074ff;">
                    The ShelfLife Team
                </p>
                <p style="margin: 0; font-size: 12px; color: #999;">
                    Track your food, reduce waste, save money.
                </p>
            </div>
        </div>
    `;

    return html.trim();
}

export default CommonMailTemplate;
