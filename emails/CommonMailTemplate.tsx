import React from 'react';

interface MailPropType {
    otp ?: number;
    items ?: Item[];
    householdName ?: string;
    isVerification ?: boolean;
    dailyDigest ?: boolean;
}

interface Item {
    name: string;
    quantity: number;
    category: string;
    expiryDate: Date;
}

const Logo = () => (
  <svg
    width="30px"
    height="30px"
    viewBox="0 0 64 64"
    data-name="Layer 1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    fill="#000000"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      <defs>
        <style>{".cls-1{fill:#ffb300;}.cls-2{fill:#0074ff;}"}</style>
      </defs>
      <title />
      <path
        className="cls-1"
        d="M39.25,58.57H24.75a2,2,0,0,1-2-2V40.67a2,2,0,0,1,2-2h14.5a2,2,0,0,1,2,2v15.9A2,2,0,0,1,39.25,58.57Zm-12.5-4h10.5V42.67H26.75Z"
      />
      <path
        className="cls-2"
        d="M48.41,58.57H15.59a2,2,0,0,1-2-2V30.51H5.73A2,2,0,0,1,4.48,27L30.75,5.87a2,2,0,0,1,2.5,0L59.52,27a2,2,0,0,1-1.25,3.56H50.41v9.37a2,2,0,0,1-4,0V28.51a2,2,0,0,1,2-2h4.17L32,10,11.42,26.51h4.17a2,2,0,0,1,2,2V54.57H46.41V50.76a2,2,0,1,1,4,0v5.81A2,2,0,0,1,48.41,58.57Z"
      />
    </g>
  </svg>
);

const CommonMailTemplate = (MailProps: MailPropType ) => {

    return (
        <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <header style={{
                width: "100%",
                padding: "20px",
                textAlign: "center",
                backgroundColor: "#f8f9fa"
            }}>
                <Logo />
            </header>

            <div style={{
                padding: "30px",
                fontFamily: "Arial, sans-serif",
                maxWidth: "600px",
                margin: "0 auto"
            }}>
                {
                    MailProps.isVerification && 
                    <h1 style={{
                        color: "#0074ff",
                        fontSize: "24px",
                        marginBottom: "20px",
                        textAlign: "center"
                    }}>
                        WELCOME TO SHELF LIFE
                    </h1>
                }

                <p style={{
                    fontSize: "16px",
                    color: "#333",
                    marginBottom: "15px",
                    lineHeight: "1.6"
                }}>
                    Household Name : { MailProps.householdName }
                </p>

                <p style={{
                    fontSize: "16px",
                    color: "#333",
                    marginBottom: "15px",
                    lineHeight: "1.6"
                }}>
                   {
                        MailProps.isVerification ? 
                        `Here's your verification code : ` :
                        `Here's the list of items that are expiring : `
                   }  
                </p>

                {
                    MailProps.isVerification && MailProps.otp && 
                    <>
                        <p style={{
                            fontSize: "32px",
                            fontWeight: "bold",
                            color: "#0074ff",
                            textAlign: "center",
                            padding: "20px",
                            backgroundColor: "#f0f9ff",
                            borderRadius: "8px",
                            border: "2px dashed #0074ff",
                            letterSpacing: "8px",
                            margin: "20px 0"
                        }}>
                            {MailProps.otp}
                        </p>
                        <p style={{
                            fontSize: "14px",
                            color: "#666",
                            textAlign: "center",
                            marginTop: "10px",
                            marginBottom: "0"
                        }}>
                            Expires in 10 minutes
                        </p>
                    </>
                }

            </div>

            {/* TABLE OF ITEMS */}
            {MailProps.dailyDigest && MailProps.items && MailProps.items.length > 0 && (
                <table style={{ 
                    width: "100%", 
                    borderCollapse: "collapse", 
                    marginTop: "20px",
                    fontFamily: "Arial, sans-serif"
                }}>
                    <thead>
                        <tr style={{ backgroundColor: "#0074ff", color: "white" }}>
                            <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Item Name</th>
                            <th style={{ padding: "12px", textAlign: "center", border: "1px solid #ddd" }}>Quantity</th>
                            <th style={{ padding: "12px", textAlign: "center", border: "1px solid #ddd" }}>Category</th>
                            <th style={{ padding: "12px", textAlign: "center", border: "1px solid #ddd" }}>Expiry Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MailProps.items.map((item, index) => (
                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white" }}>
                                <td style={{ padding: "12px", border: "1px solid #ddd" }}>{item.name}</td>
                                <td style={{ padding: "12px", textAlign: "center", border: "1px solid #ddd" }}>{item.quantity}</td>
                                <td style={{ padding: "12px", textAlign: "center", border: "1px solid #ddd" }}>{item.category}</td>
                                <td style={{ padding: "12px", textAlign: "center", border: "1px solid #ddd" }}>
                                    {new Date(item.expiryDate).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Signature */}
            <div style={{
                marginTop: "30px",
                padding: "20px",
                borderTop: "2px solid #e5e7eb",
                textAlign: "center",
                fontFamily: "Arial, sans-serif"
            }}>
                <p style={{
                    margin: "0 0 10px 0",
                    fontSize: "14px",
                    color: "#666"
                }}>
                    Best regards,
                </p>
                <p style={{
                    margin: "0 0 5px 0",
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#0074ff"
                }}>
                    The ShelfLife Team
                </p>
                <p style={{
                    margin: "0",
                    fontSize: "12px",
                    color: "#999"
                }}>
                    Track your food, reduce waste, save money.
                </p>
            </div>
        </div>
    )

};

export default CommonMailTemplate;
