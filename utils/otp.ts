import otpGenerator from 'otp-generator';

const generateOTP = (): number => {
    return parseInt(otpGenerator.generate(6, { 
        upperCaseAlphabets: false, 
        specialChars: false,
        lowerCaseAlphabets: false,
        digits: true
    }));
};

const isOTPValid = (otpExpiry: Date): boolean => {
    return new Date() < otpExpiry;
};

export { generateOTP, isOTPValid };
