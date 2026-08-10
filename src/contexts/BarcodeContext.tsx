import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ProductData {
    name: string;
    quantity: number;
    barcode: string;
}

interface BarcodeContextType {
    scannedData: ProductData | null;
    setScannedData: (data: ProductData | null) => void;
    clearScannedData: () => void;
}

const BarcodeContext = createContext<BarcodeContextType | undefined>(undefined);

export const BarcodeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [scannedData, setScannedData] = useState<ProductData | null>(null);

    const clearScannedData = () => setScannedData(null);

    return (
        <BarcodeContext.Provider value={{ scannedData, setScannedData, clearScannedData }}>
            {children}
        </BarcodeContext.Provider>
    );
};

export const useBarcode = () => {
    const context = useContext(BarcodeContext);
    if (context === undefined) {
        throw new Error('useBarcode must be used within a BarcodeProvider');
    }
    return context;
};
