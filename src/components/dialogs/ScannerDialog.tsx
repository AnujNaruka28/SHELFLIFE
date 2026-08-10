import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import CTAButton from "../common/CTAButton";
import { AnimatePresence, motion } from "motion/react";
import BarcodeScanner from "react-qr-barcode-scanner";
import { toast } from "react-toastify";
import { useBarcode } from "../../contexts/BarcodeContext";
import { API_OPEN_FOOD_FACTS } from "../../lib/apis";

const ScannerDialog = ({ children } : { children: React.ReactNode }) => {

    const [open,setOpen] = useState<boolean>(false);
    const [scanner,setScanner] = useState<boolean>(false);
    const [barcode,setBarcode] = useState<string>('');
    const { setScannedData } = useBarcode();

    const handleOpen = () => {
      setOpen(true);
      setScanner(true);
    }

    const handleClose = () => {
      setOpen(false);
      setScanner(false);
    }

    const fetchProductData = async (barcode: string) => {
        try {
            const response = await fetch(
              API_OPEN_FOOD_FACTS.product(barcode)
            );
            const data = await response.json();
            
            if (data.status === 1 && data.product) {
                return {
                    name: data.product.product_name || '',
                    quantity: data.product.serving_quantity || 1,
                    barcode: barcode
                };
            }
            return null;
        } catch (error) {
            console.error('Error fetching product data:', error);
            return null;
        }
    };

    const handleScan = async (barcode: string) => {
        console.log('Scanned:', barcode);
        
        const productData = await fetchProductData(barcode);
        
        if (productData) {
            toast.success('Product data fetched successfully');
            setScannedData(productData);
        } else {
            toast.warning('Product not found in database, using barcode only');
            setScannedData({
                name: '',
                quantity: 1,
                barcode: barcode
            });
        }
        
        handleClose();
    }

    const childWithOnClick = React.cloneElement(children as React.ReactElement, {
        onClick: handleOpen
    } as any)

    return (
       <>
       {childWithOnClick}
      <AnimatePresence>
        {open && (
          <Dialog
            open={open}
            onClose={handleClose}
            className="border border-border"
            maxWidth="md"
            fullWidth
            sx={{
              '& .MuiPaper-root': {
                borderRadius: 0
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <DialogTitle className="text-center text-foreground">Scan Item Barcode</DialogTitle>
              <DialogContent className="flex flex-col gap-4">
                {
                    scanner && (
                        <BarcodeScanner
                        onUpdate={(_,res) => {
                            if(res) handleScan(res.getText());
                        }}
                        onError={(err) => {
                            console.error('Scanner error:', err);
                        }}
                        />
                    )
                }
                <FormControl>
                  <OutlinedInput
                    placeholder="Enter barcode manually"
                    id="barcode"
                    name="barcode"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && barcode) {
                        handleScan(barcode);
                      }
                    }}
                  />
                </FormControl>
              </DialogContent>
              <DialogActions
                sx={{
                  justifyContent: 'center',
                  gap: 2
                }}
              >
                <CTAButton
                  text="Use"
                  onClick={() => barcode && handleScan(barcode)}
                  className="px-4 py-2"
                  disabled={!barcode}
                />
                <CTAButton
                  text="Cancel"
                  onClick={handleClose}
                  className="px-4 py-2"
                />
              </DialogActions>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
       </>
    )
}

export default ScannerDialog;